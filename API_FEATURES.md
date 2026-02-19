# API Token Verification Features

## Overview
This document describes the new API token verification system that allows users to verify if their API tokens are valid and active.

## New API Endpoint

### POST /api/verify-token
Verifies if an API token is valid and returns detailed information about the token and associated user.

#### Request
```json
{
  "token": "ptr_your_api_token_here"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "message": "API token is valid",
  "code": "TOKEN_VALID",
  "token_info": {
    "id": 123,
    "name": "My API Token",
    "user_id": "uuid-here",
    "user_email": "user@example.com",
    "user_name": "John Doe",
    "last_used_at": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Error Responses

**400 - Bad Request**
```json
{
  "error": "API token is required",
  "code": "MISSING_TOKEN",
  "message": "Please provide an API token in the request body"
}
```

**400 - Invalid Format**
```json
{
  "error": "Invalid API token format",
  "code": "INVALID_TOKEN_FORMAT",
  "message": "Token must start with 'ptr_'"
}
```

**401 - Unauthorized**
```json
{
  "error": "Invalid or expired API token",
  "code": "INVALID_TOKEN",
  "message": "The provided API token is not valid or has expired"
}
```

**500 - Internal Server Error**
```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR",
  "message": "An unexpected error occurred while verifying the token"
}
```

## Features

### 1. Token Validation
- Checks if token exists and is not empty
- Validates token format (must start with "ptr_")
- Ensures token meets minimum length requirements
- Verifies token against database

### 2. Enhanced Error Handling
- Detailed error messages with error codes
- Specific validation error types
- User-friendly error descriptions
- Consistent error response format

### 3. Security Features
- Token format validation
- Database verification
- Rate limiting support
- Secure token handling

### 4. Response Information
- Token validity status
- User information (name, email)
- Token metadata (name, creation date)
- Last usage timestamp
- Request timestamp

## Usage Examples

### JavaScript/Node.js
```javascript
const verifyToken = async (token) => {
  const response = await fetch('/api/verify-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
  });
  
  const data = await response.json();
  return data;
};

// Usage
const token = 'ptr_your_token_here';
const result = await verifyToken(token);
console.log(result);
```

### Python
```python
import requests

def verify_token(token):
    url = 'https://your-domain.com/api/verify-token'
    payload = {'token': token}
    
    response = requests.post(url, json=payload)
    return response.json()

# Usage
token = 'ptr_your_token_here'
result = verify_token(token)
print(result)
```

### cURL
```bash
curl -X POST https://your-domain.com/api/verify-token \
  -H "Content-Type: application/json" \
  -d '{"token": "ptr_your_token_here"}'
```

## Integration Points

### 1. API Documentation
- Comprehensive API documentation at `/api-docs`
- Interactive testing tools
- Code examples in multiple languages
- Error code reference

### 2. Testing Interface
- Interactive token testing page at `/api-docs/test-token`
- Real-time token validation
- Detailed response display
- User-friendly error messages

### 3. Dashboard Integration
- API token management in user dashboard
- Token creation and regeneration
- Usage statistics and monitoring

## Security Considerations

### 1. Token Storage
- Tokens are hashed in the database
- Only token prefixes are stored for display
- Secure token generation using crypto.randomBytes

### 2. Validation
- Multiple validation layers
- Database-level verification
- Rate limiting protection
- Input sanitization

### 3. Access Control
- Token ownership verification
- User authentication required
- Secure session management

## Error Codes Reference

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `MISSING_TOKEN` | No token provided in request | 400 |
| `INVALID_TOKEN_TYPE` | Token is not a string | 400 |
| `INVALID_TOKEN_FORMAT` | Token doesn't start with "ptr_" | 400 |
| `TOKEN_TOO_SHORT` | Token is too short | 400 |
| `INVALID_TOKEN` | Token is invalid or expired | 401 |
| `INTERNAL_ERROR` | Server error during verification | 500 |

## Future Enhancements

### 1. Rate Limiting
- Implement per-token rate limiting
- Add rate limit headers to responses
- Configurable limits per user tier

### 2. Token Analytics
- Usage tracking and analytics
- Token performance metrics
- Abuse detection and prevention

### 3. Advanced Validation
- Token expiration checking
- IP address validation
- Device fingerprinting

### 4. Webhook Support
- Token verification webhooks
- Real-time token status updates
- Integration with external systems

## Testing

### Manual Testing
1. Use the interactive test page at `/api-docs/test-token`
2. Test with valid and invalid tokens
3. Verify error handling and response formats
4. Check security measures

### Automated Testing
1. Unit tests for validation logic
2. Integration tests for API endpoints
3. Security tests for token handling
4. Performance tests for response times

## Support

For questions or issues with the API token verification system:
1. Check the API documentation at `/api-docs`
2. Use the interactive testing tools
3. Review error codes and messages
4. Contact the development team

## Changelog

### v1.0.0 (Current)
- Initial API token verification endpoint
- Comprehensive error handling
- Interactive testing interface
- Complete API documentation
- Security validation features
