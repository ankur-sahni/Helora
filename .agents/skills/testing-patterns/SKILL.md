# Skill: Testing Patterns

How tests are structured and written in this system. Follow these patterns consistently.

---

## Test Hierarchy

```
Unit tests        → pure functions, isolated logic, no I/O
Integration tests → service + real DB (test DB), no mocks on internal layers
E2E tests         → full stack, from HTTP request to response
```

**Rule**: Mock external services (third-party APIs, email, payment). Never mock internal layers — if internal mocking is needed, the design is wrong.

## File Naming

```
src/services/user.ts          → src/services/user.test.ts
src/routes/auth.ts            → src/routes/auth.test.ts
src/utils/format.ts           → src/utils/format.test.ts
```

Test file lives next to the file it tests.

## Test Structure (Arrange-Act-Assert)

```typescript
describe('UserService.createUser', () => {
  it('creates a user with hashed password', async () => {
    // Arrange
    const input = { email: 'test@example.com', password: 'plaintext' }

    // Act
    const user = await userService.createUser(input)

    // Assert
    expect(user.email).toBe(input.email)
    expect(user.password).not.toBe(input.password)
    expect(user.password).toMatch(/^\$2[aby]\$/)
  })

  it('throws ConflictError for duplicate email', async () => {
    await createUser({ email: 'exists@example.com' })
    await expect(
      userService.createUser({ email: 'exists@example.com', password: 'x' })
    ).rejects.toThrow(ConflictError)
  })
})
```

## Test Data

- Use factories, not hardcoded objects
- Factories produce minimal valid objects — tests add only what they test
- Each test cleans up its own data (or uses transactions that rollback)

## What to Test

| Scenario | Test it |
|----------|---------|
| Happy path | Always |
| Validation failures | Always |
| Not found | Always |
| Unauthorized / forbidden | Always |
| Edge cases (empty, null, max) | When non-trivial |
| Implementation details | Never |

## What NOT to Test

- Return type shapes that TypeScript already enforces
- Framework behavior (Express routing, ORM query construction)
- Things you have to stub so heavily the test proves nothing

## Integration Test Setup

```typescript
beforeAll(async () => {
  await db.migrate.latest() // fresh schema
})

afterEach(async () => {
  await db.seed.run() // reset to known state
})

afterAll(async () => {
  await db.destroy()
})
```

## Flaky Test Protocol

If a test is flaky (passes/fails without code changes):
1. Isolate it immediately — add `.skip` with a `// FLAKY:` comment
2. Open a ticket to fix it
3. Never merge code where flaky tests hide real failures
