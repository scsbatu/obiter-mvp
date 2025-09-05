#!/bin/bash

# Test script for the deployed API
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

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Change to infrastructure directory
cd "$(dirname "$0")/../infrastructure"

# Get API Gateway URL from Terraform output
if [ -z "$API_URL" ]; then
    API_URL=$(terraform output -raw api_gateway_url 2>/dev/null || echo "")
fi

if [ -z "$API_URL" ]; then
    print_error "API Gateway URL not found. Please run 'terraform output api_gateway_url' to get the URL."
    print_error "Or set the API_URL environment variable: export API_URL='https://your-api-url'"
    exit 1
fi

print_status "Testing API at: $API_URL"

# Test GET request to root endpoint
print_status "Testing GET request to root endpoint..."
response=$(curl -s -w "\n%{http_code}" "$API_URL/")

# Extract status code (last line)
status_code=$(echo "$response" | tail -n 1)
response_body=$(echo "$response" | head -n -1 2>/dev/null || echo "$response" | sed '$d')

print_status "Status Code: $status_code"
print_status "Response Body: $response_body"

if [ "$status_code" = "200" ]; then
    print_status "✅ API is working correctly!"
else
    print_error "❌ API returned status code: $status_code"
    print_error "Response: $response_body"
fi

# Test OPTIONS request (CORS)
print_status "Testing OPTIONS request for CORS..."
options_response=$(curl -s -w "\n%{http_code}" -X OPTIONS "$API_URL/")
options_status=$(echo "$options_response" | tail -n 1)

if [ "$options_status" = "200" ]; then
    print_status "✅ CORS is configured correctly!"
else
    print_error "❌ CORS test failed with status: $options_status"
fi

# Test with curl verbose mode for debugging
print_status "Running detailed test with verbose output..."
echo "--- Detailed curl output ---"
curl -v "$API_URL/" 2>&1 | head -20
