#!/bin/bash

# Destroy script for AWS Lambda infrastructure using Terraform
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

# Initialize Terraform (in case it hasn't been done)
print_status "Initializing Terraform..."
terraform init

# Show what will be destroyed
print_status "Planning infrastructure destruction..."
terraform plan -destroy -out=destroy-plan

# Ask for confirmation
echo ""
print_warning "⚠️  WARNING: This will DESTROY ALL AWS RESOURCES created by this Terraform configuration!"
print_warning "This includes:"
print_warning "  - Lambda Function"
print_warning "  - API Gateway"
print_warning "  - S3 Bucket and all objects"
print_warning "  - Lambda Layers"
print_warning "  - IAM Roles and Policies"
print_warning "  - CloudWatch Log Groups"
print_warning ""
print_warning "This action CANNOT be undone!"
echo ""
print_warning "Are you sure you want to continue? Type 'yes' to confirm:"
read -r response

if [[ "$response" != "yes" ]]; then
    print_status "Destruction cancelled."
    rm -f destroy-plan
    exit 0
fi

# Apply the destroy plan
print_status "Destroying infrastructure..."
terraform apply destroy-plan

print_status "✅ Infrastructure destruction completed successfully!"

# Clean up
rm -f destroy-plan

print_status "All AWS resources have been removed."
