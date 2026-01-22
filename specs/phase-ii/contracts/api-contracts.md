# API Contracts: Phase II - Full-Stack Web Todo Application

**Date**: 2026-01-18
**Feature**: Phase II - Full-Stack Web Todo Application
**Branch**: phase-ii-fullstack-web-app

## Base URL
`http://localhost:8000/api/v1` (development)
`https://[domain]/api/v1` (production)

## Authentication
All endpoints require authentication via JWT token in Authorization header:
`Authorization: Bearer <jwt_token>`

## Common Headers
- `Content-Type: application/json`
- `Accept: application/json`

## Error Response Format
```json
{
  "detail": "Human-readable error message"
}
```
OR for validation errors:
```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "Title cannot be empty",
      "type": "value_error"
    }
  ]
}
```

## API Endpoints

### List All Todos
**Endpoint**: `GET /todos`
**Description**: Retrieve all todos for the authenticated user
**Authentication**: Required
**Query Parameters**: None
**Response Codes**:
- `200 OK` - Successfully retrieved todos
- `401 Unauthorized` - Invalid or missing token
**Response Body**:
```json
[
  {
    "id": 1,
    "title": "Sample todo",
    "description": "Sample description",
    "completed": false,
    "created_at": "2026-01-18T10:30:00Z",
    "updated_at": "2026-01-18T10:30:00Z"
  }
]
```

### Create Todo
**Endpoint**: `POST /todos`
**Description**: Create a new todo
**Authentication**: Required
**Request Body**:
```json
{
  "title": "New todo title",
  "description": "Optional description"
}
```
**Response Codes**:
- `201 Created` - Successfully created todo
- `400 Bad Request` - Validation error (empty title, too long)
- `401 Unauthorized` - Invalid or missing token
**Response Body**:
```json
{
  "id": 1,
  "title": "New todo title",
  "description": "Optional description",
  "completed": false,
  "created_at": "2026-01-18T11:00:00Z",
  "updated_at": "2026-01-18T11:00:00Z"
}
```

### Get Single Todo
**Endpoint**: `GET /todos/{id}`
**Description**: Retrieve a specific todo by ID
**Authentication**: Required
**Parameters**:
- `id` (path): Todo ID (integer)
**Response Codes**:
- `200 OK` - Successfully retrieved todo
- `401 Unauthorized` - Invalid or missing token
- `404 Not Found` - Todo with specified ID does not exist
**Response Body**:
```json
{
  "id": 1,
  "title": "Sample todo",
  "description": "Sample description",
  "completed": false,
  "created_at": "2026-01-18T10:30:00Z",
  "updated_at": "2026-01-18T10:30:00Z"
}
```

### Update Todo
**Endpoint**: `PUT /todos/{id}` or `PATCH /todos/{id}`
**Description**: Update an existing todo
**Authentication**: Required
**Parameters**:
- `id` (path): Todo ID (integer)
**Request Body** (all fields optional for PATCH, required for PUT):
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```
**Response Codes**:
- `200 OK` - Successfully updated todo
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Invalid or missing token
- `404 Not Found` - Todo with specified ID does not exist
**Response Body**:
```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "created_at": "2026-01-18T10:30:00Z",
  "updated_at": "2026-01-18T11:30:00Z"
}
```

### Delete Todo
**Endpoint**: `DELETE /todos/{id}`
**Description**: Permanently delete a todo
**Authentication**: Required
**Parameters**:
- `id` (path): Todo ID (integer)
**Response Codes**:
- `204 No Content` - Successfully deleted todo
- `401 Unauthorized` - Invalid or missing token
- `404 Not Found` - Todo with specified ID does not exist
**Response Body**: None

## Validation Rules

### Title Field
- Required for creation (POST)
- Optional for updates (PUT/PATCH)
- Maximum length: 200 characters
- Minimum length: 1 character (after trimming)
- Cannot contain only whitespace

### Description Field
- Optional for all operations
- Maximum length: 2000 characters
- Can be null or empty string

### Completed Field
- Optional for updates (PUT/PATCH)
- Boolean type (true/false)
- Default value: false (on creation)

### ID Field
- Auto-generated on creation
- Read-only after creation
- Integer type
- Unique within system

## HTTP Status Code Decision Tree

**2xx Success Codes**
- **200 OK**: GET (single/list), PUT/PATCH (update)
- **201 Created**: POST (create) with Location header
- **204 No Content**: DELETE

**4xx Client Error Codes**
- **400 Bad Request**: Validation failure (empty title, too long, invalid type)
- **401 Unauthorized**: Missing or invalid JWT token
- **403 Forbidden**: Valid token but user doesn't own the resource
- **404 Not Found**: Resource doesn't exist (GET/PUT/DELETE non-existent ID)
- **422 Unprocessable Entity**: Request body doesn't match schema

**5xx Server Error Codes**
- **500 Internal Server Error**: Database connection failure, unexpected exceptions

## Request/Response Examples

### Valid Request: Create Todo
```
POST /api/v1/todos
Authorization: Bearer <valid-jwt-token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs"
}
```

### Valid Response: Todo Created
```
Status: 201 Created
Content-Type: application/json

{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, bread, eggs",
  "completed": false,
  "created_at": "2026-01-18T12:00:00Z",
  "updated_at": "2026-01-18T12:00:00Z"
}
```

### Valid Request: Update Todo
```
PUT /api/v1/todos/1
Authorization: Bearer <valid-jwt-token>
Content-Type: application/json

{
  "title": "Buy groceries - urgent",
  "completed": true
}
```

### Valid Response: Todo Updated
```
Status: 200 OK
Content-Type: application/json

{
  "id": 1,
  "title": "Buy groceries - urgent",
  "description": "Milk, bread, eggs",
  "completed": true,
  "created_at": "2026-01-18T12:00:00Z",
  "updated_at": "2026-01-18T12:15:00Z"
}
```

### Error Response: Validation Failure
```
Status: 400 Bad Request
Content-Type: application/json

{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "Title cannot be empty",
      "type": "value_error"
    }
  ]
}
```

### Error Response: Not Found
```
Status: 404 Not Found
Content-Type: application/json

{
  "detail": "Todo with id '999' not found"
}
```

## Security Considerations

### Authentication
- All endpoints require JWT token in Authorization header
- Token must be valid and not expired
- Token verification happens at FastAPI dependency level

### Authorization
- Users can only access their own todos
- User ID from token is compared with user_id in database record
- 403 Forbidden returned if user doesn't own the resource

### Input Validation
- All inputs validated at API layer using Pydantic models
- SQL injection prevented by ORM (no raw SQL)
- XSS prevented by JSON serialization

### Rate Limiting
- All API endpoints should implement rate limiting
- Recommended: 100 requests per minute per IP
- Configurable via environment variables

## Performance Guidelines

### Response Time Targets
- List todos: < 500ms (95th percentile)
- Create todo: < 200ms (95th percentile)
- Get single todo: < 100ms (95th percentile)
- Update todo: < 200ms (95th percentile)
- Delete todo: < 100ms (95th percentile)

### Caching Strategy
- Short-term caching (30 seconds) for list endpoints
- No caching for mutation endpoints (POST/PUT/DELETE)
- Cache invalidated after mutations

### Pagination
- Not required for Phase II (implemented in later phases)
- Default limit: 100 todos per request (hardcoded)

## CORS Policy

### Development
- Allow origins: `http://localhost:3000` (Next.js dev server)
- Allow methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
- Allow headers: Content-Type, Authorization
- Credentials: true (to allow JWT cookies if implemented)

### Production
- Allow origins: Specific frontend domain(s)
- Same methods and headers as development
- Credentials: false (JWT tokens sent via Authorization header)

## Versioning Strategy

### API Versioning
- Version in URL path: `/api/v1/`
- Semantic versioning for breaking changes
- Non-breaking changes within version allowed
- Deprecation policy: 6 months notice before removing endpoints

### Schema Evolution
- Backward-compatible changes allowed within version
- New optional fields allowed
- Required fields can only be added with new version
- Response format changes require new version

## Monitoring & Logging

### API Request Logging
- Log all requests with method, path, status, response time
- Do not log request/response bodies with sensitive data
- Include user ID for authorized requests
- Log level: INFO for successful requests, WARN for client errors, ERROR for server errors

### Error Logging
- Log full stack traces for 500 errors
- Include request ID for correlation
- Mask sensitive information in logs
- Log level: ERROR for all server errors

### Performance Monitoring
- Track response times by endpoint
- Monitor error rates
- Alert on performance degradation (>1 second response time)
- Metric collection via application performance monitoring tools

## Error Handling Strategy

### Client Errors (4xx)
- Return appropriate status code
- Include descriptive error message in response body
- Log at WARN level with request context
- Do not include stack traces in response

### Server Errors (5xx)
- Return generic error message to client
- Log full details including stack trace
- Log at ERROR level
- Return 500 status code

### Validation Errors
- Return 422 status code for schema validation
- Return 400 status code for business rule validation
- Include field-specific error details
- Log at INFO level (not error - client fault)

---

## API Compliance Checklist

### Required Endpoints Implemented
- [x] GET /todos - List all todos
- [x] POST /todos - Create new todo
- [x] GET /todos/{id} - Get single todo
- [x] PUT /todos/{id} - Update todo (full update)
- [x] PATCH /todos/{id} - Update todo (partial update)
- [x] DELETE /todos/{id} - Delete todo

### Required Fields Supported
- [x] Todo includes ID, title, description, completed status
- [x] Created and updated timestamps included
- [x] Proper validation on all fields
- [x] Error responses follow standard format

### Required HTTP Methods Used Correctly
- [x] GET for read operations (idempotent)
- [x] POST for create operations (non-idempotent)
- [x] PUT/PATCH for update operations (idempotent)
- [x] DELETE for delete operations (idempotent)

### Required Status Codes Returned
- [x] 200 OK for successful GET, PUT, PATCH
- [x] 201 Created for successful POST with Location header
- [x] 204 No Content for successful DELETE
- [x] 400 Bad Request for validation errors
- [x] 401 Unauthorized for missing/invalid auth
- [x] 404 Not Found for non-existent resources
- [x] 422 Unprocessable Entity for schema errors
- [x] 500 Internal Server Error for server issues

### Required Headers Supported
- [x] Content-Type: application/json for requests/responses
- [x] Authorization: Bearer <token> for authentication
- [x] Proper CORS headers for cross-origin requests
- [x] Appropriate cache headers for different endpoints

### Security Requirements Met
- [x] Authentication required for all endpoints
- [x] Authorization checks for user ownership
- [x] Input validation on all fields
- [x] No sensitive data exposed in responses
- [x] SQL injection prevention via ORM
- [x] Rate limiting considerations documented