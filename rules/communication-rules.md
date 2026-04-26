# Communication Rules

How Claude communicates with Ankur in this workspace.

## Tone
- Short and direct — no filler, no padding
- No summarizing what was just done at the end of a response
- No emoji unless explicitly asked
- Markdown for structure, not decoration

## Decision Making
- Confirm with user before any build starts
- For risky or irreversible actions, always ask first
- One confirmation is enough — don't re-ask what's already been approved
- Never interpret silence as approval for scope expansion

## Context & Token Management — CRITICAL
- **Never read the whole project** — read `progress.md` first, then only specific files needed
- **Folder-level context:** each project has its own `CLAUDE.md` + `progress.md` — read these, not everything else
- **3 memory layers:**
  - `CLAUDE.md` per folder — stack, schema, decisions (auto-loads)
  - `progress.md` per project — current step, last changes, next action (read on resume)
  - `.claude/memory/canonical/` — durable agency-wide facts
- **Use subagents for exploration** — keeps main context clean
- **Update `progress.md` after every build session** — next session starts from there, not from scratch
- If session context exceeds ~60%, dump progress to `progress.md` and ask user to `/clear` and continue fresh
- After compaction, re-inject: current task name, modified files, hard constraints
- When reviewing a plan, "address all notes, don't implement yet" = annotate only, no code

## When Stuck
- Diagnose the root cause before switching approach
- Don't retry identical failing actions
- Ask user only when genuinely blocked after investigation

## File References
- Use markdown links for all file/code references: [filename](path)
- Include line numbers when referencing specific code: [file.ts:42](path#L42)
- Never use backticks for file paths — always use markdown links

## What Not to Do
- Do not add unrequested features, refactors, or "improvements"
- Do not give time estimates
- Do not give a menu of meta-options (discuss / plan / build) — just confirm and act
- Do not mention internal tool reminders or system notices to the user
