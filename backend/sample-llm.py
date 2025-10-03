import json
import boto3
from io import BytesIO
from PyPDF2 import PdfReader
from langchain_aws import ChatBedrock
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnableSequence
import markdown

# AWS setup
s3_client = boto3.client('s3')
region = 'ap-southeast-2'


def read_pdf_from_s3(bucket_name, key):
    response = s3_client.get_object(Bucket=bucket_name, Key=key)
    content = response['Body'].read()
    pdf = PdfReader(BytesIO(content))
    text = ""
    for page in pdf.pages:
        text += page.extract_text() or ""
    return text

def read_instruction_files(bucket_name, prefix):
    response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
    all_text = ""
    for obj in response.get('Contents', []):
        key = obj['Key']
        if key.endswith('.txt'):
            obj_body = s3_client.get_object(Bucket=bucket_name, Key=key)['Body'].read().decode('utf-8')
            all_text += obj_body.strip() + "\n"
    return all_text

def save_report_to_s3(report_text, bucket_name, key):
    # Convert markdown to HTML
    html_content = markdown.markdown(report_text)

    # Wrap it in basic HTML structure
    html_template = f"""
    <html>
    <head>
        <title>Generated Report</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 40px;
                line-height: 1.6;
                background-color: #f8f9fa;
            }}
            h1, h2, h3 {{
                color: #343a40;
            }}
            strong {{
                color: #212529;
            }}
            blockquote {{
                border-left: 4px solid #ccc;
                margin: 1em 0;
                padding-left: 1em;
                color: #555;
                font-style: italic;
            }}
            ul, ol {{
                padding-left: 20px;
            }}
        </style>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """

    # Upload to S3
    s3_client.put_object(
        Bucket=bucket_name,
        Key=key,
        Body=html_template.encode('utf-8'),
        ContentType='text/html'
    )

def generate_report(pdf_text, final_instructions):
    llm = ChatBedrock(
        model_id="arn:aws:bedrock:ap-southeast-2:337393854581:inference-profile/apac.anthropic.claude-sonnet-4-20250514-v1:0",
        region_name="ap-southeast-2",
        provider="anthropic",
        model_kwargs={
            "max_tokens": 10000,
            "temperature": 0.2
        }
    )

    prompt = PromptTemplate(
        input_variables=["instructions", "pdf_text"],
        template="""
You are an AI assistant. Based on the following instructions and PDF content, generate a professional report.

Instructions:
{instructions}

PDF Content:
{pdf_text}

Your Report:"""
    )

    chain = prompt | llm
    report = chain.invoke({"instructions": final_instructions, "pdf_text": pdf_text})
    return report.content

def lambda_handler(event, context):
    try:
        # Directly call and print package information
        packages = list_packages()
        python_info = get_python_info()
        
        print("=== Installed Packages ===")
        print(json.dumps(packages, indent=2))
        
        print("\n=== Python Information ===")
        print(json.dumps(python_info, indent=2))
        
        # Get parameters from the event
        body = json.loads(event.get('body', '{}'))
        
        pdf_bucket = body.get('pdf_bucket', 'legal-case-analysis-guides')
        pdf_key = body.get('pdf_key', 'pdf/Comer v The King [2025] VSCA 8 (14 February 2025).pdf')
        instructions_bucket = body.get('instructions_bucket', 'legal-case-analysis-guides')
        instructions_prefix = body.get('instructions_prefix', 'instructions/')
        output_bucket = body.get('output_bucket', 'legal-case-analysis-guides')
        output_key = body.get('output_key', 'reports/generated_report.html')
        user_additional = body.get('user_instructions', '')

        # Read PDF
        pdf_text = read_pdf_from_s3(pdf_bucket, pdf_key)

        # Read instruction files
        base_instructions = read_instruction_files(instructions_bucket, instructions_prefix)

        # Combine instructions
        final_instructions = base_instructions + "\n" + user_additional.strip()

        # Generate report
        report_content = generate_report(pdf_text, final_instructions)

        # Save report to S3
        save_report_to_s3(report_content, output_bucket, output_key)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Report generated successfully',
                'output_location': f's3://{output_bucket}/{output_key}',
                'system_info': {
                    'python_info': python_info,
                    'installed_packages': packages
                }
            }),
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        print("System Information at error:")
        print(json.dumps({
            'python_info': python_info,
            'installed_packages': packages
        }, indent=2))
        
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e),
                'system_info': {
                    'python_info': python_info,
                    'installed_packages': packages
                }
            }),
            'headers': {
                'Content-Type': 'application/json'
            }
        } 