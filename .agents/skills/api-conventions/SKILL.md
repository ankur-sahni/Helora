# Skill: API Conventions

Reusable knowledge for designing and implementing API endpoints consistently.

---

## REST Endpoint Structure

```
METHOD /resource             → collection operations
METHOD /resource/:id         → single resource operations
METHOD /resource/:id/action  → resource-specific actions (non-CRUD)
```

## HTTP Methods

| Method | Use | Idempotent | Body |
|--------|-----|-----------|------|
| GET | Read | Yes | No |
| POST | Create / trigger action | No | Yes |
| PUT | Full replace | Yes | Yes |
| PATCH | Partial update | Yes | Yes |
| DELETE | Delete | Yes | No |

## Standard Response Shape

```typescript
// Success
{
  data: T,
  meta?: {
    page?: number,
    total?: number,
    [key: string]: unknown
  }
}

// Error
{
  error: {
    code: string,       // machine-readable: "VALIDATION_ERROR"
    message: string,    // human-readable
    details?: unknown   // optional structured context
  }
}
```

## HTTP Status Codes

| Code | When |
|------|------|
| 200 | Success (GET, PUT, PATCH) |
| 201 | Resource created (POST) |
| 204 | Success, no content (DELETE) |
| 400 | Validation error / bad request |
| 401 | Not authenticated |
| 403 | Authenticated but not authorized |
| 404 | Resource not found |
| 409 | Conflict (duplicate, state violation) |
| 422 | Valid syntax, business logic rejection |
| 429 | Rate limited |
| 500 | Server error (never expose internals) |

## Input Validation

- Validate at the route level with schema (Zod/Joi/equivalent) before business logic
- Return 400 with field-level error details for validation failures
- Never pass raw request body to database layer

## Auth Pattern

- All routes requiring auth: middleware runs before handler
- Auth middleware sets `req.user` — handlers read from there, never re-verify
- Public routes must be explicitly marked — default is protected

## Pagination

```typescript
// Request
GET /resource?page=1&limit=20&sort=createdAt&order=desc

// Response meta
{
  data: [...],
  meta: { page: 1, limit: 20, total: 150, pages: 8 }
}
```

## Versioning

- Version in path: `/v1/resource`
- Breaking changes require new version
- Deprecation notice header: `Deprecation: true`, `Sunset: [date]`

## Error Code Conventions

```
AUTH_*          Authentication/authorization errors
VALIDATION_*    Input validation failures
NOT_FOUND_*     Resource not found
CONFLICT_*      State/uniqueness conflicts
RATE_LIMIT_*    Rate limiting
INTERNAL_*      Server errors (generic — never expose details)
```
