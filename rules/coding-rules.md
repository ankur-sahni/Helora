# Coding Rules

Standards for all code written in this agency and its projects.

## General
- Read before modifying — never edit a file you haven't read
- Edit existing files over creating new ones
- No speculative abstractions — build what the task requires, nothing more
- No backwards-compatibility hacks for code being actively replaced

## Security
- No command injection, XSS, SQL injection, or OWASP Top 10 vulnerabilities
- Validate at system boundaries (user input, external APIs) only
- Never commit secrets, API keys, or credentials to any file
- Auth, payments, and user data changes auto-trigger the security agent

## Error Handling
- No error handling for scenarios that cannot happen
- Trust internal code and framework guarantees
- Only catch errors at true system boundaries

## Comments & Documentation
- Only add comments where logic is not self-evident
- No docstrings, comments, or type annotations on code you didn't change
- No summarizing what you just did — the diff speaks for itself

## Dependencies
- Every new external dependency triggers a security audit
- Prefer existing dependencies over adding new ones
- Document why a dependency was chosen in the relevant project CLAUDE.md

## Deletion — NEVER WITHOUT DOUBLE CONFIRMATION
- NEVER delete any file, folder, database table, record, or code without asking first
- Ask once → user confirms → ask again "Are you sure? This cannot be undone" → only then delete
- Applies to: files, folders, git branches, DB tables, records, workflows, API keys
- When in doubt — do not delete. Ask instead.

## Git
- Never skip hooks (--no-verify)
- Never force push to main/master
- Create new commits rather than amending, unless explicitly asked
- Stage specific files — never `git add -A` without reviewing what's included
