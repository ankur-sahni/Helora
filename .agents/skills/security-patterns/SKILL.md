# Skill: Security Patterns

Established security patterns. Follow these exactly — do not improvise.

---

## Authentication

### JWT Validation (required checks, in order)
1. Signature valid (RS256 — never HS256 for production)
2. `exp` not in the past
3. `nbf` not in the future (if present)
4. `iss` matches expected issuer
5. `aud` contains expected audience
6. Token not in revocation list (if applicable)

### Never
- Never trust `alg: none`
- Never accept `alg: HS256` on a public-key system
- Never store tokens in localStorage — use HttpOnly cookies or memory
- Never log tokens, even partially

## Input Sanitization

### Zod Schema Pattern
```typescript
// Always validate at boundary — before business logic
const schema = z.object({
  email: z.string().email().max(254),
  name: z.string().min(1).max(100).trim(),
})
const input = schema.parse(req.body) // throws ZodError on invalid
```

### Path Traversal Prevention
```typescript
// Never do: path.join(baseDir, userInput)
// Do: resolve and verify the result is within baseDir
const resolved = path.resolve(baseDir, userInput)
if (!resolved.startsWith(path.resolve(baseDir))) {
  throw new Error('Path traversal detected')
}
```

## Authorization

### Principle of Least Privilege
- Users access only their own resources by default
- Admin routes require explicit admin role check — not just auth check
- Resource ownership verified at query level, not just middleware

### Pattern: Resource Ownership Check
```typescript
const resource = await db.resource.findUnique({ where: { id } })
if (!resource) throw new NotFoundError()
if (resource.userId !== req.user.id) throw new ForbiddenError()
```

## Secrets Management

- Secrets live in environment variables only
- Environment variables validated with Zod schema at startup
- If startup validation fails: process exits — do not run with missing secrets
- Secret names in code: `process.env.SECRET_NAME` — never hardcoded strings

## Rate Limiting

- All public endpoints: rate limited
- Auth endpoints (login, register, password reset): stricter limits
- Rate limit by IP + by user ID (prevent account enumeration)

## SQL / NoSQL Injection

- ORM parameterized queries only
- If raw SQL is unavoidable: use `$1, $2` placeholders — never string interpolation
- Never construct query strings from user input

## Content Security

- CSP headers on all HTML responses
- CORS: explicit allowlist, never `*` in production
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (or `SAMEORIGIN` if framing needed)

## Dependency Security

Run before every merge:
```bash
npm audit --audit-level=high
# or
pnpm audit
```
Fix all HIGH and CRITICAL before merge. Document MEDIUM with a tracking ticket.
