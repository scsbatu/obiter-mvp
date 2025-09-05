#!/bin/bash

# Test script for Project API endpoints
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

# Get API Gateway URL from Terraform output
cd "$(dirname "$0")/../infrastructure"
API_URL=$(terraform output -raw api_gateway_url 2>/dev/null || echo "")

if [ -z "$API_URL" ]; then
    print_error "Could not get API Gateway URL from Terraform output"
    print_error "Make sure you're in the correct directory and Terraform has been applied"
    exit 1
fi

print_status "Testing Project API at: $API_URL"

# Test 1: Create a new project
print_test "1. Testing POST /api/1/project - Create new project"
PROJECT_RESPONSE=$(curl -s -X POST "$API_URL/api/1/project" \
  -H "Content-Type: application/json" \
  -H "userId: user-12345" \
  -H "correlationId: test-$(date +%s)" \
  -d '{
    "name": "Slip and Fall Investigation",
    "incidentDate": "2025-09-03",
    "premisesLiability": "Storefront Entrance",
    "caseNo": "CASE-2025-001",
    "witnesses": ["John Doe", "Jane Smith"]
  }')

# Check if the response contains an ID
if echo "$PROJECT_RESPONSE" | jq -e '.id' > /dev/null; then
    PROJECT_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.id')
    print_status "✅ Project created successfully with ID: $PROJECT_ID"
    echo "$PROJECT_RESPONSE" | jq .
else
    print_error "❌ Failed to create project"
    echo "$PROJECT_RESPONSE"
    exit 1
fi

echo ""

# Test 2: Retrieve the created project
print_test "2. Testing GET /api/1/project - Retrieve project"
GET_RESPONSE=$(curl -s -X GET "$API_URL/api/1/project?projectId=$PROJECT_ID" \
  -H "userId: user-12345" \
  -H "correlationId: test-$(date +%s)")

if echo "$GET_RESPONSE" | jq -e '.id' > /dev/null; then
    print_status "✅ Project retrieved successfully"
    echo "$GET_RESPONSE" | jq .
else
    print_error "❌ Failed to retrieve project"
    echo "$GET_RESPONSE"
    exit 1
fi

echo ""

# Test 3: Test with missing required fields
print_test "3. Testing POST /api/1/project - Missing required fields (should fail)"
ERROR_RESPONSE=$(curl -s -X POST "$API_URL/api/1/project" \
  -H "Content-Type: application/json" \
  -H "userId: user-12345" \
  -d '{
    "name": "Incomplete Project"
  }')

if echo "$ERROR_RESPONSE" | jq -e '.detail' > /dev/null; then
    print_status "✅ Validation error handled correctly"
    echo "$ERROR_RESPONSE" | jq .
else
    print_warning "⚠️  Expected validation error but got different response"
    echo "$ERROR_RESPONSE"
fi

echo ""

# Test 4: Test with missing userId header
print_test "4. Testing POST /api/1/project - Missing userId header (should fail)"
HEADER_ERROR_RESPONSE=$(curl -s -X POST "$API_URL/api/1/project" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Project",
    "incidentDate": "2025-09-03",
    "premisesLiability": "Test Location",
    "caseNo": "TEST-001"
  }')

if echo "$HEADER_ERROR_RESPONSE" | jq -e '.detail' > /dev/null; then
    print_status "✅ Missing header error handled correctly"
    echo "$HEADER_ERROR_RESPONSE" | jq .
else
    print_warning "⚠️  Expected header error but got different response"
    echo "$HEADER_ERROR_RESPONSE"
fi

echo ""

# Test 5: Test retrieving non-existent project
print_test "5. Testing GET /api/1/project - Non-existent project (should fail)"
NONEXISTENT_RESPONSE=$(curl -s -X GET "$API_URL/api/1/project?projectId=00000000-0000-0000-0000-000000000000" \
  -H "userId: user-12345")

if echo "$NONEXISTENT_RESPONSE" | jq -e '.detail' > /dev/null; then
    print_status "✅ Non-existent project error handled correctly"
    echo "$NONEXISTENT_RESPONSE" | jq .
else
    print_warning "⚠️  Expected not found error but got different response"
    echo "$NONEXISTENT_RESPONSE"
fi

echo ""

# Test 6: Test API documentation
print_test "6. Testing API documentation endpoint"
DOCS_RESPONSE=$(curl -s "$API_URL/docs" | head -5)

if echo "$DOCS_RESPONSE" | grep -q "swagger-ui"; then
    print_status "✅ API documentation is accessible"
    echo "Documentation available at: $API_URL/docs"
else
    print_warning "⚠️  API documentation might not be accessible"
fi

echo ""

# Test 7: Test OpenAPI JSON
print_test "7. Testing OpenAPI JSON endpoint"
OPENAPI_RESPONSE=$(curl -s "$API_URL/openapi.json" | jq -r '.info.title' 2>/dev/null || echo "")

if [ "$OPENAPI_RESPONSE" = "Project API" ]; then
    print_status "✅ OpenAPI JSON is accessible and correct"
else
    print_warning "⚠️  OpenAPI JSON might not be accessible or correct"
fi

echo ""

# Summary
print_status "🎉 All Project API tests completed!"
print_status "API Base URL: $API_URL"
print_status "API Documentation: $API_URL/docs"
print_status "OpenAPI JSON: $API_URL/openapi.json"
print_status "Created Project ID: $PROJECT_ID"
