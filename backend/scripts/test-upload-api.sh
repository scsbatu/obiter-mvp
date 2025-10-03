#!/bin/bash

# Test script for the upload API endpoint
# This script tests the POST /api/1/project/upload endpoint

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Testing Upload API Endpoint${NC}"
echo "=================================="

# Get the API Gateway URL from Terraform output
cd infrastructure
API_URL=$(terraform output -raw api_gateway_url 2>/dev/null || echo "")
cd ..

if [ -z "$API_URL" ]; then
    echo -e "${RED}Error: Could not get API Gateway URL from Terraform output${NC}"
    echo "Make sure you have deployed the infrastructure first with: ./scripts/deploy.sh"
    exit 1
fi

echo "API Gateway URL: $API_URL"
echo ""

# Test data
USER_ID="test-user-123"
PROJECT_ID="550e8400-e29b-41d4-a716-446655440000"
CORRELATION_ID="test-correlation-$(date +%s)"

echo -e "${YELLOW}Test 1: Get upload URL for existing project${NC}"
echo "----------------------------------------"

# First, create a project to test with
echo "Creating a test project..."
CREATE_RESPONSE=$(curl -s -X POST "$API_URL/api/1/project" \
  -H "Content-Type: application/json" \
  -H "userId: $USER_ID" \
  -H "correlationId: $CORRELATION_ID" \
  -d '{
    "name": "Test Project for Upload",
    "incidentDate": "2025-01-15",
    "premisesLiability": "Yes",
    "caseNo": "TEST-001",
    "witnesses": ["John Doe", "Jane Smith"]
  }')

echo "Create project response: $CREATE_RESPONSE"
echo ""

# Extract project ID from response
PROJECT_ID=$(echo "$CREATE_RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Created project ID: $PROJECT_ID"
echo ""

# Test upload endpoint
echo "Testing upload endpoint..."
UPLOAD_RESPONSE=$(curl -s -X POST "$API_URL/api/1/project/upload" \
  -H "Content-Type: application/json" \
  -H "userId: $USER_ID" \
  -H "correlationId: $CORRELATION_ID" \
  -d "{
    \"projectId\": \"$PROJECT_ID\"
  }")

echo "Upload response: $UPLOAD_RESPONSE"
echo ""

# Check if response contains uploadUrl
if echo "$UPLOAD_RESPONSE" | grep -q "uploadUrl"; then
    echo -e "${GREEN}✅ Upload URL generated successfully!${NC}"
    
    # Extract upload URL and file key
    UPLOAD_URL=$(echo "$UPLOAD_RESPONSE" | grep -o '"uploadUrl":"[^"]*"' | cut -d'"' -f4)
    FILE_KEY=$(echo "$UPLOAD_RESPONSE" | grep -o '"fileKey":"[^"]*"' | cut -d'"' -f4)
    EXPIRES_IN=$(echo "$UPLOAD_RESPONSE" | grep -o '"expiresIn":[0-9]*' | cut -d':' -f2)
    
    echo "Upload URL: $UPLOAD_URL"
    echo "File Key: $FILE_KEY"
    echo "Expires In: $EXPIRES_IN seconds"
else
    echo -e "${RED}❌ Failed to generate upload URL${NC}"
    echo "Response: $UPLOAD_RESPONSE"
fi

echo ""
echo -e "${YELLOW}Test 2: Test with non-existent project${NC}"
echo "----------------------------------------"

NON_EXISTENT_PROJECT_ID="00000000-0000-0000-0000-000000000000"
ERROR_RESPONSE=$(curl -s -X POST "$API_URL/api/1/project/upload" \
  -H "Content-Type: application/json" \
  -H "userId: $USER_ID" \
  -H "correlationId: $CORRELATION_ID" \
  -d "{
    \"projectId\": \"$NON_EXISTENT_PROJECT_ID\"
  }")

echo "Error response: $ERROR_RESPONSE"

if echo "$ERROR_RESPONSE" | grep -q "Project not found"; then
    echo -e "${GREEN}✅ Correctly handled non-existent project${NC}"
else
    echo -e "${RED}❌ Expected 'Project not found' error${NC}"
fi

echo ""
echo -e "${YELLOW}Test 3: Test with wrong user${NC}"
echo "----------------------------------------"

WRONG_USER_ID="wrong-user-456"
WRONG_USER_RESPONSE=$(curl -s -X POST "$API_URL/api/1/project/upload" \
  -H "Content-Type: application/json" \
  -H "userId: $WRONG_USER_ID" \
  -H "correlationId: $CORRELATION_ID" \
  -d "{
    \"projectId\": \"$PROJECT_ID\"
  }")

echo "Wrong user response: $WRONG_USER_RESPONSE"

if echo "$WRONG_USER_RESPONSE" | grep -q "Access denied"; then
    echo -e "${GREEN}✅ Correctly handled access denied${NC}"
else
    echo -e "${RED}❌ Expected 'Access denied' error${NC}"
fi

echo ""
echo -e "${YELLOW}Test 4: Test with missing userId header${NC}"
echo "----------------------------------------"

MISSING_HEADER_RESPONSE=$(curl -s -X POST "$API_URL/api/1/project/upload" \
  -H "Content-Type: application/json" \
  -H "correlationId: $CORRELATION_ID" \
  -d "{
    \"projectId\": \"$PROJECT_ID\"
  }")

echo "Missing header response: $MISSING_HEADER_RESPONSE"

if echo "$MISSING_HEADER_RESPONSE" | grep -q "Missing"; then
    echo -e "${GREEN}✅ Correctly handled missing userId header${NC}"
else
    echo -e "${RED}❌ Expected missing header error${NC}"
fi

echo ""
echo -e "${GREEN}Upload API testing completed!${NC}"
