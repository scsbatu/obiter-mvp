import os
import json
import urllib.parse
from datetime import datetime
from typing import Tuple
from decimal import Decimal

import boto3
from PyPDF2 import PdfReader
from io import BytesIO
from langchain_aws import ChatBedrock
from langchain.prompts import PromptTemplate

TABLE_NAME = os.environ.get("DYNAMODB_TABLE_NAME")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)
s3_client = boto3.client("s3")


def _parse_key(key: str):
    # Expected: projects/{userId}/{projectId}/temp/<uuid>.pdf
    parts = key.split("/")
    if len(parts) < 5 or parts[0] != "projects" or parts[3] != "temp":
        return None, None, None
    # Extract the filename (last part) and remove .pdf extension to get UUID
    filename = parts[-1]
    return parts[1], parts[2], filename


def _extract_text_from_pdf(bucket: str, key: str) -> Tuple[str, int, str]:
    try:
        head = s3_client.head_object(Bucket=bucket, Key=key)
        content_type = head.get("ContentType", "application/pdf")

        obj = s3_client.get_object(Bucket=bucket, Key=key)
        content = obj["Body"].read()
        reader = PdfReader(BytesIO(content))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        pages_count = len(reader.pages)
        return text, pages_count, content_type
    except Exception:
        return "", 0, "application/pdf"


def _llm_extract_title_subtitle(pdf_text: str) -> Tuple[str, str]:
    try:
        if not pdf_text:
            return "", ""
        llm = ChatBedrock(
            model_id="arn:aws:bedrock:ap-southeast-2::inference-profile/apac.anthropic.claude-sonnet-4-20250514-v1:0",
            region_name="ap-southeast-2",
            provider="anthropic",
            model_kwargs={
                "max_tokens": 512,
                "temperature": 0.0,
            },
        )

        prompt = PromptTemplate(
            input_variables=["pdf_text"],
            template=(
                "You will be given the full text of a legal PDF.\n"
                "Return ONLY compact JSON with these keys exactly: \n"
                "- title (string)\n"
                "- subtitle (string, may be empty)\n"
                "- documentSummary (string, 2-3 sentences)\n"
                "- documentType (one of: witness_statement, court_document, contract, correspondence, expert_report, other)\n\n"
                "PDF:\n{pdf_text}\n\nJSON:"
            ),
        )

        chain = prompt | llm
        result = chain.invoke({"pdf_text": pdf_text[:6000]})
        content = result.content if hasattr(result, "content") else str(result)
        data = json.loads(content)
        title = (data.get("title", "") or "")[:256]
        subtitle = (data.get("subtitle", "") or "")[:256]
        return title, subtitle
    except Exception:
        # Fallback: simple heuristic from first lines
        lines = [ln.strip() for ln in (pdf_text or "").splitlines() if ln and ln.strip()]
        if not lines:
            return "", ""
        title = lines[0][:256]
        subtitle = lines[1][:256] if len(lines) > 1 else ""
        return title, subtitle


def handler(event, context):
    records = event.get("Records", [])
    for rec in records:
        s3 = rec.get("s3", {})
        obj = s3.get("object", {})
        bucket = s3.get("bucket", {}).get("name")
        key = urllib.parse.unquote_plus(obj.get("key", ""))
        size = int(obj.get("size", 0))

        user_id, project_id, s3_filename = _parse_key(key)
        if not project_id:
            continue

        # Extract original filename from S3 metadata or use a default
        original_filename = "uploaded_document.pdf"  # default fallback
        try:
            # Try to get original filename from S3 metadata
            head_response = s3_client.head_object(Bucket=bucket, Key=key)
            metadata = head_response.get("Metadata", {})
            original_filename = metadata.get("original-filename", s3_filename)
        except Exception:
            # If no metadata, use the S3 filename as fallback
            original_filename = s3_filename

        pdf_text, pages_count, content_type = _extract_text_from_pdf(bucket, key)
        title, subtitle = _llm_extract_title_subtitle(pdf_text)

        # Ask LLM for summary, type, and professional filename
        summary = ""
        doc_type = "other"
        professional_filename = original_filename  # fallback to original filename
        
        try:
            llm = ChatBedrock(
                model_id="arn:aws:bedrock:ap-southeast-2::inference-profile/apac.anthropic.claude-sonnet-4-20250514-v1:0",
                region_name="ap-southeast-2",
                provider="anthropic",
                model_kwargs={"max_tokens": 512, "temperature": 0.0},
            )
            follow_prompt = PromptTemplate(
                input_variables=["pdf_text", "original_filename"],
                template=(
                    "You are analyzing a legal document. Return ONLY valid JSON with these exact fields:\n\n"
                    "1. documentSummary: 2-3 sentence summary of the document's main content and purpose.\n"
                    "2. documentType: ONE of these exact values: witness_statement, court_document, contract, correspondence, expert_report, other\n"
                    "3. professionalFilename: Create a professional filename ending in .pdf\n"
                    "   - Format: [DocumentType]_[KeyInfo]_[Date].pdf\n"
                    "   - Use underscores, no spaces\n"
                    "   - Include names, case numbers, or key details\n"
                    "   - Max 50 characters total\n"
                    "   - Examples: Witness_Statement_JohnDoe_20250115.pdf, Court_Order_Case123_20250115.pdf\n\n"
                    "Original filename: {original_filename}\n"
                    "Document content:\n{pdf_text}\n\n"
                    "JSON response (no other text):\n"
                    "{{\n"
                    '  "documentSummary": "Summary here",\n'
                    '  "documentType": "witness_statement",\n'
                    '  "professionalFilename": "Witness_Statement_JohnDoe_20250115.pdf"\n'
                    "}}"
                ),
            )
            chain2 = follow_prompt | llm
            result2 = chain2.invoke({"pdf_text": pdf_text[:6000], "original_filename": original_filename})
            content2 = result2.content if hasattr(result2, "content") else str(result2)
            
            print(f"DEBUG: LLM Response: {content2}")
            
            data2 = json.loads(content2)
            summary = (data2.get("documentSummary", "") or "")[:1000]
            doc_type = (data2.get("documentType", "other") or "other")
            professional_filename = (data2.get("professionalFilename", original_filename) or original_filename)
            
            print(f"DEBUG: Parsed professional_filename: {professional_filename}")
            print(f"DEBUG: Original filename: {original_filename}")
        except Exception as e:
            print(f"DEBUG: LLM Error: {str(e)}")
            # Generate a simple fallback filename
            if doc_type and doc_type != "other":
                professional_filename = f"{doc_type.replace('_', '_').title()}_{datetime.utcnow().strftime('%Y%m%d')}.pdf"
            else:
                professional_filename = f"Document_{datetime.utcnow().strftime('%Y%m%d')}.pdf"

        # Convert size to MB with 2 decimal places
        file_size_mb = round(size / (1024 * 1024), 2)
        file_size_mb_decimal = Decimal(str(file_size_mb))

        file_record = {
            "fileName": professional_filename,
            "originalFileName": original_filename,
            "uploadedDate": datetime.utcnow().isoformat() + "Z",
            "noOfPages": pages_count,
            "summary": summary,
            "fileSize": file_size_mb_decimal,
            "s3Bucket": bucket,
            "s3Key": key,
            "title": title,
            "subTitle": subtitle,
            "fileType": content_type,
            "documentType": doc_type,
        }

        table.update_item(
            Key={"id": project_id},
            UpdateExpression=(
                "SET files = list_append(if_not_exists(files, :empty_list), :new_file), "
                "documentsSummary.#total = if_not_exists(documentsSummary.#total, :zero) + :one"
            ),
            ExpressionAttributeNames={
                "#total": "total",
            },
            ExpressionAttributeValues={
                ":new_file": [file_record],
                ":empty_list": [],
                ":zero": 0,
                ":one": 1,
            },
        )

    return {"statusCode": 200, "body": json.dumps({"message": "Processed"})}


