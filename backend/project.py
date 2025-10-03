import os
import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Header, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from boto3.dynamodb.conditions import Key
import boto3
from mangum import Mangum

app = FastAPI(
    title="Project API",
    version="1.0.0",
    description="API for managing legal investigation projects",
    root_path="/dev"  # This tells FastAPI that it's running behind a proxy with /dev prefix
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE_NAME', 'obiter-mvp-projects')
table = dynamodb.Table(table_name)

# Initialize S3
s3_client = boto3.client('s3')

# Pydantic Models
class ProjectRequest(BaseModel):
    name: str
    incidentDate: str
    premisesLiability: str
    caseNo: str
    witnesses: Optional[List[str]] = []

class ProjectEditRequest(BaseModel):
    id: str
    name: str
    incidentDate: str
    premisesLiability: str
    caseNo: str
    witnesses: Optional[List[str]] = []

class FileDetail(BaseModel):
    fileName: str
    originalFileName: Optional[str] = None
    uploadedDate: str
    noOfPages: int
    summary: str
    fileType: Optional[str] = None
    fileSize: Optional[float] = None
    title: Optional[str] = None
    subTitle: Optional[str] = None
    documentType: Optional[str] = None

class DocumentsSummary(BaseModel):
    total: int = 0
    pending: int = 0
    witnessStatements: int = 0
    expertReports: int = 0
    caseOverview: int = 0
    settlement: int = 0

class ProjectDetailResponse(BaseModel):
    id: str
    name: str
    incidentDate: str
    premisesLiability: str
    caseNo: str
    witnesses: List[str]
    createdDate: str
    documentsSummary: DocumentsSummary
    files: List[FileDetail] = []

class ProjectsResponse(BaseModel):
    projectId: str
    title: Optional[str] = None
    status: str = "In Progress"
    noOfDocuments: int = 0
    noOfAnalyses: int = 0
    createdAt: str
    fileType: Optional[str] = None
    fileSize: Optional[float] = None

class UploadRequest(BaseModel):
    projectId: str
    contentType: str = "application/pdf"

class UploadResponse(BaseModel):
    uploadUrl: str
    fileKey: str
    expiresIn: int

# Routes
@app.get("/")
async def hello():
    return {"message": "Hello, World!"}

@app.post("/api/1/project", response_model=ProjectDetailResponse)
async def create_project(
    project: ProjectRequest,
    userId: str = Header(..., description="ID of the user making the request"),
    correlationId: Optional[str] = Header(None, description="Correlation ID for request tracking")
):
    """
    Create a new project with incident details and witnesses.
    """
    try:
        # Generate unique project ID
        project_id = str(uuid.uuid4())
        created_date = datetime.utcnow().isoformat() + "Z"
        
        # Prepare project data for DynamoDB
        project_data = {
            "id": project_id,
            "userId": userId,
            "name": project.name,
            "incidentDate": project.incidentDate,
            "premisesLiability": project.premisesLiability,
            "caseNo": project.caseNo,
            "witnesses": project.witnesses,
            "createdDate": created_date,
            "documentsSummary": {
                "total": 0,
                "pending": 0,
                "witnessStatements": 0,
                "expertReports": 0,
                "caseOverview": 0,
                "settlement": 0
            },
            "files": []
        }
        
        # Save to DynamoDB
        table.put_item(Item=project_data)
        
        # Return the created project
        return ProjectDetailResponse(
            id=project_id,
            name=project.name,
            incidentDate=project.incidentDate,
            premisesLiability=project.premisesLiability,
            caseNo=project.caseNo,
            witnesses=project.witnesses,
            createdDate=created_date,
            documentsSummary=DocumentsSummary(),
            files=[]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create project: {str(e)}")

@app.get("/api/1/project", response_model=ProjectDetailResponse)
async def get_project(
    projectId: str = Query(..., description="ID of the project to retrieve"),
    userId: str = Header(..., description="ID of the user making the request"),
    correlationId: Optional[str] = Header(None, description="Correlation ID for request tracking")
):
    """
    Retrieve a project by ID along with document counts and detailed files.
    """
    try:
        # Get project from DynamoDB
        response = table.get_item(Key={"id": projectId})
        
        if "Item" not in response:
            raise HTTPException(status_code=404, detail="Project not found")
        
        project_data = response["Item"]
        
        # Return the project
        return ProjectDetailResponse(
            id=project_data["id"],
            name=project_data["name"],
            incidentDate=project_data["incidentDate"],
            premisesLiability=project_data["premisesLiability"],
            caseNo=project_data["caseNo"],
            witnesses=project_data.get("witnesses", []),
            createdDate=project_data["createdDate"],
            documentsSummary=DocumentsSummary(**project_data.get("documentsSummary", {})),
            files=[FileDetail(**file) for file in project_data.get("files", [])]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve project: {str(e)}")

@app.get("/api/1/projects", response_model=List[ProjectsResponse])
async def list_projects(
    userId: str = Header(..., description="ID of the user making the request"),
    correlationId: Optional[str] = Header(None, description="Correlation ID for request tracking")
):
    """
    Get all projects for the requesting user.
    """
    try:
        print(f"DEBUG: Querying projects for userId: {userId}")
        
        # Query DynamoDB GSI to fetch all projects for the user
        response = table.query(
            IndexName="userId-index",
            KeyConditionExpression=Key("userId").eq(userId)
        )

        items = response.get("Items", [])
        print(f"DEBUG: Found {len(items)} projects")

        results: List[ProjectsResponse] = []
        for item in items:
            print(f"DEBUG: Processing item: {item.get('id')} - {item.get('name')}")
            
            documents_summary = item.get("documentsSummary", {})
            total_docs = int(documents_summary.get("total", 0) or 0)
            
            # Calculate fileType and fileSize from files array
            files = item.get("files", [])
            print(f"DEBUG: Files array: {files}")
            
            file_type = None
            total_size_mb = 0.0
            
            if files:
                # Get the most recent file's type and sum all file sizes
                file_type = files[-1].get("fileType") if files else None
                for file_item in files:
                    file_size = file_item.get("fileSize")
                    if file_size:
                        if isinstance(file_size, (int, float)):
                            total_size_mb += float(file_size)
                        elif hasattr(file_size, 'to_eng_string'):  # Decimal type
                            total_size_mb += float(file_size.to_eng_string())

            project_response = ProjectsResponse(
                projectId=item.get("id"),
                title=item.get("name"),
                status="In Progress",
                noOfDocuments=total_docs,
                noOfAnalyses=0,
                createdAt=item.get("createdDate"),
                fileType=file_type,
                fileSize=round(total_size_mb, 2) if total_size_mb > 0 else None
            )
            
            print(f"DEBUG: Created response: {project_response}")
            results.append(project_response)

        return results

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list projects: {str(e)}")

@app.put("/api/1/project", response_model=ProjectDetailResponse)
async def edit_project(
    project: ProjectEditRequest,
    userId: str = Header(..., description="ID of the user making the request"),
    correlationId: Optional[str] = Header(None, description="Correlation ID for request tracking")
):
    """
    Edit an existing project by ID.
    """
    try:
        # First, check if the project exists and belongs to the user
        response = table.get_item(Key={"id": project.id})
        
        if "Item" not in response:
            raise HTTPException(status_code=404, detail="Project not found")
        
        existing_project = response["Item"]
        
        # Verify the project belongs to the requesting user
        if existing_project.get("userId") != userId:
            raise HTTPException(status_code=403, detail="Access denied: Project does not belong to user")
        
        # Prepare updated project data
        updated_project_data = {
            "id": project.id,
            "userId": userId,
            "name": project.name,
            "incidentDate": project.incidentDate,
            "premisesLiability": project.premisesLiability,
            "caseNo": project.caseNo,
            "witnesses": project.witnesses,
            "createdDate": existing_project["createdDate"],  # Keep original creation date
            "documentsSummary": existing_project.get("documentsSummary", {
                "total": 0,
                "pending": 0,
                "witnessStatements": 0,
                "expertReports": 0,
                "caseOverview": 0,
                "settlement": 0
            }),
            "files": existing_project.get("files", [])
        }
        
        # Update the project in DynamoDB
        table.put_item(Item=updated_project_data)
        
        # Return the updated project
        return ProjectDetailResponse(
            id=project.id,
            name=project.name,
            incidentDate=project.incidentDate,
            premisesLiability=project.premisesLiability,
            caseNo=project.caseNo,
            witnesses=project.witnesses,
            createdDate=existing_project["createdDate"],
            documentsSummary=DocumentsSummary(**updated_project_data["documentsSummary"]),
            files=[FileDetail(**file) for file in updated_project_data["files"]]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update project: {str(e)}")

@app.post("/api/1/project/upload", response_model=UploadResponse)
async def get_upload_url(
    upload_request: UploadRequest,
    userId: str = Header(..., description="ID of the user making the request"),
    correlationId: Optional[str] = Header(None, description="Correlation ID for request tracking")
):
    """
    Get presigned URL for file upload to S3.
    """
    try:
        # First, check if the project exists and belongs to the user
        response = table.get_item(Key={"id": upload_request.projectId})
        
        if "Item" not in response:
            raise HTTPException(status_code=404, detail="Project not found")
        
        project = response["Item"]
        
        # Verify the project belongs to the requesting user
        if project.get("userId") != userId:
            raise HTTPException(status_code=403, detail="Access denied: Project does not belong to user")
        
        # Build file key using a UUID filename under temp folder
        file_uuid = str(uuid.uuid4())
        extension = ".pdf" if (upload_request.contentType or "").lower() == "application/pdf" else ""
        file_key = f"projects/{userId}/{upload_request.projectId}/temp/{file_uuid}{extension}"
        
        # Get S3 bucket name from environment variable
        bucket_name = os.environ.get('S3_BUCKET_NAME', 'obiter-mvp-uploads')
        
        # Generate presigned URL for PUT operation
        presigned_url = s3_client.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': bucket_name,
                'Key': file_key,
                'ContentType': upload_request.contentType
            },
            ExpiresIn=3600  # 1 hour
        )
        
        return UploadResponse(
            uploadUrl=presigned_url,
            fileKey=file_key,
            expiresIn=3600
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate upload URL: {str(e)}")


handler = Mangum(app)