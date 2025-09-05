output "api_gateway_url" {
  description = "URL of the API Gateway"
  value       = "https://${aws_api_gateway_rest_api.api.id}.execute-api.${data.aws_region.current.name}.amazonaws.com/${aws_api_gateway_stage.api.stage_name}"
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.api.function_name
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.api.arn
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket for Lambda deployments"
  value       = aws_s3_bucket.lambda_deployments.bucket
}

output "api_gateway_stage_name" {
  description = "Name of the API Gateway stage"
  value       = aws_api_gateway_stage.api.stage_name
}

output "dynamodb_table_name" {
  description = "Name of the DynamoDB table for projects"
  value       = aws_dynamodb_table.projects.name
}

output "dynamodb_table_arn" {
  description = "ARN of the DynamoDB table for projects"
  value       = aws_dynamodb_table.projects.arn
}
