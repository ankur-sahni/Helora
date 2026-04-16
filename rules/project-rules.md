# Project Rules

Rules for how projects are structured, managed, and delivered in this agency.

## Project Structure
- All client/agency projects live in `Projects/` at the agency root
- Each project has its own `CLAUDE.md` for local context
- Global agents and memory live in the single `.claude/` at agency root
- Project-specific docs go in `Projects/<project-name>/docs/`

## Starting a New Project
1. Create folder: `Projects/<project-name>/`
2. Create `CLAUDE.md` with client brief, deliverables, constraints
3. Update `Projects/` index if one exists
4. Save project memory via `memory-manager`

## Before Building Anything — MANDATORY, NO EXCEPTIONS
1. **Confirm the stack** — ask what language, framework, tools to use. Never assume.
2. **Write the plan** — present a clear build plan before writing a single line of code
3. **Get explicit approval** — user must say yes to the plan before build starts
4. **Confirm twice on critical builds** — if the build touches multiple files or systems, confirm the plan AND the stack separately
- Never rush into building because the user said "yes start"
- "Yes" to starting a conversation is NOT "yes" to a specific implementation
- Planner produces plan → user approves → Implementer writes code. Always in this order.

## Delivery Standards
- Every deliverable must be testable before handoff
- UI/frontend changes: test in browser before reporting complete
- Document what was built in the project's `CLAUDE.md` under a "What's Built" section

## Project Priorities (current)
1. n8n local setup + scheduler (infrastructure foundation)
2. Lead generation system (agency growth)
3. Sahni Bridal Studio full digital build (first client)
