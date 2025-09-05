# AWS Lambda Deployment Guide

This guide explains how to deploy your FastAPI application to AWS Lambda using Terraform.

## Prerequisites

Before deploying, ensure you have the following installed and configured:

1. **AWS CLI** - Install from [AWS CLI documentation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. **Terraform** - Install from [Terraform documentation](https://learn.hashicorp.com/tutorials/terraform/install-cli)
3. **Python 3.12** - Your application uses Python 3.12

### AWS Configuration

Configure your AWS credentials:

```bash
aws configure
```

Enter your:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `ap-southeast-2`)
- Default output format (e.g., `json`)

## Project Structure

```
obiter-mvp/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── main.tf                  # Main Terraform configuration
├── variables.tf             # Terraform variables
├── outputs.tf               # Terraform outputs
├── deploy.sh                # Deployment script
├── terraform.tfvars.example # Example variables file
└── .gitignore              # Git ignore file
```

## Deployment Steps

### 1. Configure Variables

Copy the example variables file and customize it:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your preferred settings:

```hcl
aws_region = "ap-southeast-2"
project_name = "obiter-mvp"
environment = "dev"
```

### 2. Deploy Using the Script

Run the deployment script:

```bash
./deploy.sh
```

This script will:
- Check prerequisites
- Initialize Terraform
- Plan the deployment
- Ask for confirmation
- Apply the configuration
- Display the API Gateway URL

### 3. Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Initialize Terraform
terraform init

# Plan the deployment
terraform plan

# Apply the configuration
terraform apply
```

## What Gets Created

The Terraform configuration creates the following AWS resources:

1. **S3 Bucket** - Stores the Lambda deployment package
2. **IAM Role** - Permissions for the Lambda function
3. **Lambda Function** - Your FastAPI application
4. **API Gateway** - HTTP API endpoint
5. **CloudWatch Logs** - Application logging

## Testing Your Deployment

After deployment, you'll get an API Gateway URL. Test your API:

```bash
# Test the root endpoint
curl https://your-api-gateway-url.execute-api.ap-southeast-2.amazonaws.com/dev/

# Expected response
{"message": "Hello, World!"}
```

## Monitoring and Logs

- **CloudWatch Logs**: View logs in the AWS Console under CloudWatch > Log Groups
- **Lambda Metrics**: Monitor function performance in the Lambda console
- **API Gateway Metrics**: Track API usage in the API Gateway console

## Updating Your Application

To update your application:

1. Make changes to your code in the `backend/` directory
2. Run the deployment script again:
   ```bash
   ./deploy.sh
   ```

Terraform will detect changes and update the Lambda function.

## Cleanup

To remove all AWS resources:

```bash
terraform destroy
```

**Warning**: This will delete all resources created by Terraform. Make sure you want to remove everything before proceeding.

## Troubleshooting

### Common Issues

1. **AWS Credentials Not Found**
   - Run `aws configure` to set up credentials
   - Verify with `aws sts get-caller-identity`

2. **Permission Denied**
   - Ensure your AWS user has sufficient permissions
   - Required permissions: Lambda, API Gateway, S3, IAM, CloudWatch

3. **Lambda Function Timeout**
   - Increase timeout in `main.tf` if needed
   - Check CloudWatch logs for errors

4. **API Gateway 502 Error**
   - Check Lambda function logs
   - Verify the handler is correctly set to `main.handler`

### Useful Commands

```bash
# Check Terraform state
terraform show

# List all resources
terraform state list

# View outputs
terraform output

# Check AWS resources
aws lambda list-functions
aws apigateway get-rest-apis
```

## Cost Considerations

- **Lambda**: Pay per request and compute time
- **API Gateway**: Pay per API call
- **S3**: Minimal cost for storage
- **CloudWatch**: Pay for log storage

For development, costs should be minimal. Monitor usage in the AWS Billing console.

## Security Notes

- The current configuration uses public API Gateway (no authentication)
- For production, consider adding API keys, IAM authentication, or other security measures
- Review IAM permissions and follow the principle of least privilege
