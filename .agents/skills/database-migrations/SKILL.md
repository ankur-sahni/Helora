# Skill: Database Migrations

How database schema changes are managed. Follow this precisely — bad migrations can cause data loss.

---

## Golden Rules

1. **Migrations are permanent** — once merged, never modify an existing migration file
2. **Always backward-compatible** — new migration must not break the current running application
3. **Additive first** — add columns nullable, backfill data, then add constraints
4. **Test on a copy of prod schema** before deploying
5. **Every migration needs a down** — rollback must be possible

## Creating a Migration

```bash
pnpm db:migrate:new migration_name
# produces: migrations/[timestamp]_migration_name.ts
```

## Migration File Structure

```typescript
export async function up(db: Knex): Promise<void> {
  await db.schema.alterTable('users', (table) => {
    table.string('display_name').nullable() // nullable first
  })
}

export async function down(db: Knex): Promise<void> {
  await db.schema.alterTable('users', (table) => {
    table.dropColumn('display_name')
  })
}
```

## Adding a NOT NULL Column (safe pattern)

```typescript
// Migration 1: Add nullable
table.string('required_field').nullable()

// Migration 2 (separate, after backfill): Add constraint
table.string('required_field').notNullable().alter()
```

Never add a NOT NULL column without a default or a preceding backfill migration.

## Renaming a Column (safe pattern)

```typescript
// Step 1: Add new column
// Step 2: Deploy code that writes to both old + new
// Step 3: Backfill new column from old
// Step 4: Deploy code that reads from new only
// Step 5: Drop old column
```

Never rename directly — causes data loss if deployment fails mid-flight.

## Index Conventions

```typescript
// Single column
table.index('user_id')

// Composite (order matters for query planner)
table.index(['user_id', 'created_at'])

// Unique
table.unique(['email'])

// Partial index (use raw)
db.raw('CREATE INDEX CONCURRENTLY idx_name ON table (col) WHERE condition')
```

Use `CONCURRENTLY` for indexes on large tables — avoids table lock.

## Pre-Deploy Checklist

- [ ] Migration tested on a copy of current prod schema
- [ ] Down migration tested (rollback works)
- [ ] No locks on large tables (> 1M rows) — use `CONCURRENTLY` or batched updates
- [ ] Application code is backward-compatible with both pre- and post-migration schema
- [ ] Estimated migration runtime documented (use `EXPLAIN ANALYZE`)
