# Obiter MVP - FastAPI on AWS Lambda

A serverless FastAPI application deployed on AWS Lambda using Terraform infrastructure as code.

## Project Structure

```
obiter-mvp/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── README.md              # This file
│   ├── infrastructure/         # Terraform infrastructure code
│   │   ├── main.tf            # Main Terraform configuration
│   │   ├── variables.tf       # Terraform variables
│   │   ├── outputs.tf         # Terraform outputs
│   │   ├── terraform.tfvars.example  # Example variables file
│   │   └── terraform.tfstate* # Terraform state files
│   ├── scripts/               # Deployment and utility scripts
│   │   ├── deploy.sh          # Deployment script
│   │   ├── test-api.sh        # Basic API testing script
│   │   ├── test-project-api.sh # Project API testing script
│   │   └── destroy.sh         # Infrastructure cleanup script
│   └── docs/                  # Documentation
│       └── DEPLOYMENT.md      # Detailed deployment guide
└── project-api.yml            # API specification
```

## Quick Start

### Prerequisites

- AWS CLI configured with appropriate permissions
- Terraform installed
- Python 3.12+ installed

### Deployment

1. **Configure AWS credentials:**
   ```bash
   aws configure
   ```

2. **Deploy the infrastructure:**
   ```bash
   cd backend/scripts
   ./deploy.sh
   ```

3. **Test the basic API:**
   ```bash
   ./test-api.sh
   ```

4. **Test the Project API:**
   ```bash
   ./test-project-api.sh
   ```

## 📋 **API Endpoints**

### **Project Management**
- **POST** `/api/1/project` - Create a new project
- **GET** `/api/1/project?projectId={id}` - Retrieve project details

### **Example Usage**

**Create a new project:**
```bash
curl -X POST "https://slbq98s1h4.execute-api.ap-southeast-2.amazonaws.com/dev/api/1/project" \
  -H "Content-Type: application/json" \
  -H "userId: user-12345" \
  -d '{
    "name": "Slip and Fall Investigation",
    "incidentDate": "2025-09-03",
    "premisesLiability": "Storefront Entrance",
    "caseNo": "CASE-2025-001",
    "witnesses": ["John Doe", "Jane Smith"]
  }'
```

**Retrieve a project:**
```bash
curl -X GET "https://slbq98s1h4.execute-api.ap-southeast-2.amazonaws.com/dev/api/1/project?projectId=your-project-id" \
  -H "userId: user-12345"
```

### Manual Deployment

If you prefer to deploy manually:

```bash
cd backend/infrastructure
terraform init
terraform plan
terraform apply
```

## 🌐 **Live API Endpoints**

- **Main API**: `https://slbq98s1h4.execute-api.ap-southeast-2.amazonaws.com/dev/`
- **Response**: `{"message": "Hello, World!"}`
- **CORS**: Fully configured for web applications

### **API Documentation**
- **Swagger UI**: `https://slbq98s1h4.execute-api.ap-southeast-2.amazonaws.com/dev/docs`
- **ReDoc**: `https://slbq98s1h4.execute-api.ap-southeast-2.amazonaws.com/dev/redoc`
- **OpenAPI JSON**: `https://slbq98s1h4.execute-api.ap-southeast-2.amazonaws.com/dev/openapi.json`

## 🏗️ **Infrastructure**

The infrastructure includes:

- **AWS Lambda**: Python 3.12 runtime with FastAPI
- **API Gateway**: RESTful API with CORS support
- **DynamoDB**: NoSQL database for project storage
- **Lambda Layers**: Python dependencies packaged separately
- **S3 Bucket**: For storing deployment packages
- **CloudWatch Logs**: For monitoring and debugging
- **IAM Roles**: Proper permissions for Lambda execution

### **AWS Resources Created**
- **Lambda Function**: `obiter-mvp-api`
- **DynamoDB Table**: `obiter-mvp-projects`
- **API Gateway**: `obiter-mvp-api`
- **S3 Bucket**: `obiter-mvp-lambda-deployments-*`
- **CloudWatch Log Groups**: Lambda and API Gateway logs

## Development

### Local Development

1. **Set up Python environment:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Run locally:**
   ```bash
   uvicorn main:app --reload
   ```

### Adding Dependencies

1. Add new dependencies to `backend/requirements.txt`
2. Run `terraform apply` to rebuild the Lambda layer
3. The deployment will automatically update

## 📊 **Monitoring**

- **CloudWatch Logs**: `/aws/lambda/obiter-mvp-api`
- **API Gateway Logs**: `/aws/apigateway/obiter-mvp-api`
- **DynamoDB Metrics**: Available in CloudWatch console

### **Testing Scripts**
- **Basic API Test**: `./scripts/test-api.sh`
- **Project API Test**: `./scripts/test-project-api.sh`
- **Destroy Infrastructure**: `./scripts/destroy.sh`

## 🗑️ **Cleanup**

To destroy all resources:

```bash
cd backend/scripts
./destroy.sh
```

Or manually:
```bash
cd backend/infrastructure
terraform destroy
```

## 🚀 **Current Deployment Status**

✅ **Deployed and Working**
- **Region**: `ap-southeast-2` (Sydney)
- **API Gateway URL**: `https://slbq98s1h4.execute-api.ap-southeast-2.amazonaws.com/dev`
- **DynamoDB Table**: `obiter-mvp-projects`
- **Lambda Function**: `obiter-mvp-api`

## 🔧 **Troubleshooting**

See `docs/DEPLOYMENT.md` for detailed troubleshooting guide.

## 📝 **API Specification**

The API follows the OpenAPI 3.0 specification defined in `../project-api.yml`. Key features:

- **Project Management**: Create and retrieve legal investigation projects
- **DynamoDB Integration**: Persistent storage for project data
- **Input Validation**: Pydantic models for request/response validation
- **Error Handling**: Comprehensive error responses
- **CORS Support**: Cross-origin resource sharing enabled