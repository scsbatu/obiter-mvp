#!/bin/bash

# Deploy script for AWS Lambda using Terraform
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    print_error "Terraform is not installed. Please install it first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install it first."
    exit 1
fi

# Check AWS credentials
print_status "Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    print_error "AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

# Get AWS account ID and region
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=$(aws configure get region)

print_status "AWS Account ID: $AWS_ACCOUNT_ID"
print_status "AWS Region: $AWS_REGION"

# Change to infrastructure directory
cd "$(dirname "$0")/../infrastructure"

# Initialize Terraform
print_status "Initializing Terraform..."
terraform init

# Plan the deployment
print_status "Planning Terraform deployment..."
terraform plan -out=tfplan

# Ask for confirmation
echo ""
print_warning "This will create AWS resources. Do you want to continue? (y/N)"
read -r response
if [[ ! "$response" =~ ^[Yy]$ ]]; then
    print_status "Deployment cancelled."
    exit 0
fi

# Apply the plan
print_status "Applying Terraform configuration..."
terraform apply tfplan

# Get the API Gateway URL
API_URL=$(terraform output -raw api_gateway_url)
print_status "Deployment completed successfully!"
print_status "API Gateway URL: $API_URL"
print_status "Test your API: curl $API_URL"

# Clean up
rm -f tfplan
