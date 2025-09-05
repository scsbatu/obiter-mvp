# Obiter MVP

A serverless FastAPI application for legal investigation project management, deployed on AWS Lambda.

## 📁 **Project Structure**

```
obiter-mvp/
├── backend/                    # Main application code
│   ├── README.md              # Detailed documentation
│   ├── project.py             # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── infrastructure/        # Terraform infrastructure
│   ├── scripts/              # Deployment scripts
│   └── docs/                 # Additional documentation
└── project-api.yml           # OpenAPI specification
```

## 🚀 **Quick Start**

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Follow the detailed setup instructions in `backend/README.md`**

## 🌐 **Live API**

- **API Base URL**: `https://slbq98s1h4.execute-api.ap-southeast-2.amazonaws.com/dev`
- **Swagger UI**: `https://slbq98s1h4.execute-api.ap-southeast-2.amazonaws.com/dev/docs`
- **API Documentation**: See `backend/README.md` for complete details

## 📋 **Features**

- ✅ **Project Management**: Create and retrieve legal investigation projects
- ✅ **DynamoDB Storage**: Persistent NoSQL database
- ✅ **API Documentation**: Interactive Swagger UI
- ✅ **CORS Support**: Cross-origin resource sharing
- ✅ **Infrastructure as Code**: Terraform deployment
- ✅ **Serverless**: AWS Lambda + API Gateway

## 📖 **Documentation**

For detailed setup, deployment, and usage instructions, see:
- **[backend/README.md](backend/README.md)** - Complete documentation
- **[backend/docs/DEPLOYMENT.md](backend/docs/DEPLOYMENT.md)** - Deployment guide
- **[project-api.yml](project-api.yml)** - API specification