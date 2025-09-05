import os
import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Header, Query
from pydantic import BaseModel, Field
import boto3
from mangum import Mangum

app = FastAPI(
    title="Project API",
    version="1.0.0",
    description="API for managing legal investigation projects",
    root_path="/dev"  # This tells FastAPI that it's running behind a proxy with /dev prefix
)

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE_NAME', 'obiter-mvp-projects')
table = dynamodb.Table(table_name)

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
    uploadedDate: str
    noOfPages: int
    summary: str

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

@app.put("/api/1/project/edit", response_model=ProjectDetailResponse)
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

handler = Mangum(app)