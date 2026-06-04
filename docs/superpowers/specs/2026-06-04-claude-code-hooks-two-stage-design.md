# Two-Stage Claude Code Hooks — Design Spec

**Date:** 2026-06-04
**Owner:** Ankur (policy) / CTO-Claude (architecture)
**Status:** Draft for review

## Goal

Move the project's Claude Code hook setup from a single blunt fail-closed approval
gate to the power-user **two-stage pattern**, and add desktop notifications so the
operator is not tied to the terminal. Research basis: official hooks reference,
`disler/claude-code-hooks-mastery` (canonical 3.7k-star reference), and the
"6 Production Patterns" field guide.

## Current state (the gaps)

- **Stage 1 only.** `.claude/hooks/check-approval.cjs` is a fail-closed `PreToolUse`
  gate on every `Edit|Write`: it denies unless an approval phrase appears in the last
  10 user messages. Blunt — power users gate on *danger*, not every edit.
- **Portability bug.** Wired as `node .claude/hooks/check-approval.cjs` (relative);
  breaks if cwd is not the repo root.
- **No Stage 2.** No format / secret-scan / type-check after edits.
- **No notification.** Operator must watch the terminal.

## Design principles (from best practices)

1. `PreToolUse` is the only hook that can block — use it for safety, nothing else.
2. Gate on danger (`.env`, destructive shell), not on routine edits.
3. Stage 2 runs after a successful edit: format first, then validate.
4. Everything is logged to `.claude/logs/` for an audit trail.
5. Fail-closed only where safety demands it; elsewhere fail-open to avoid friction.
6. Committed `settings.json` = shared safety + quality (agents inherit).
   `settings.local.json` (gitignored) = machine-specific notification.

## Re-analysis refinements (second pass, 2026-06-04)

These corrections came from a deeper read of the hooks reference and are load-bearing:

- **Exec form is mandatory.** The project path contains spaces (`Ai Automation`,
  `Ankur Sahni Learning Project`). All hook commands referencing
  `${CLAUDE_PROJECT_DIR}` use exec form (`command` + `args` array), never shell form.
  Shell-form tokenizing on the spaces is a prime suspect for current flakiness.
- **The current gate is false-open, not just over-strict.** `check-approval.cjs` scans
  every `type:"user"` message for the approval regex, but skill/tool text injected as
  user turns (the brainstorming skill text contains "proceed"/"go ahead") trips it.
  The repair must distinguish genuine user prompts from injected tool/skill content
  (e.g. ignore turns that are tool_result-bearing or skill payloads).
- **Use `if` conditions** to gate handler spawn (`"if": "Bash(rm *)"`) instead of
  spawning the guard on every Bash call and parsing inside.
- **Typed Notification matchers** — target `permission_prompt` (and optionally
  `idle_prompt`) rather than matching all notification types.
- **PostToolUse decision schema** — top-level `decision`/`reason` or exit-2+stderr,
  NOT `hookSpecificOutput.permissionDecision` (PreToolUse-only). Secret hit →
  `decision:"block"` so it pushes back hard.
- **Confirmed:** project `settings.json` and local `settings.local.json` hooks MERGE
  for the same event — both fire. Validates the committed/local split.
- **BurntToast** is the de-facto Windows toast path but needs `Install-Module
  BurntToast` (free, user-scope, no admin). Flag for approval; fall back to a native
  `SystemSounds` chime if the module is absent — never hard-depend on the install.
- **Optional add — `PreCompact` transcript backup** before compaction; cheap insurance
  given the handover protocol and long sessions.

## Architecture

### Stage 1 — PreToolUse (blocking)

**A. `Edit|Write` → `check-approval.cjs` (repaired)**
- Fix path: invoke via `${CLAUDE_PROJECT_DIR}`.
- **Hard-deny (no override):** any write whose `file_path` matches `.env`, `*.env*`,
  `*secret*`, `*credential*`, `*.pem`, `*.key`. Enforces keys-in-`.env`-only rule.
- **Approval-phrase gate, narrowed:** only required for high-risk paths
  (`.claude/settings*.json`, `CLAUDE.md`, `CLAUDE.local.md`, `*.config.*`,
  n8n workflow files). Routine source edits pass freely.
- Keeps the existing approval regex and last-10-messages scan for the narrowed set.

**B. `Bash` → `pre-bash-guard.cjs` (new)**
- Deny destructive commands unless an approval phrase is present:
  `rm -rf` / `rm ... -[rf]`, `git reset --hard`, `git push --force` / `-f`,
  `git clean -fd`, `Remove-Item -Recurse -Force`.
- Exit via `permissionDecision: "deny"` with a clear reason.

### Stage 2 — PostToolUse (non-blocking) on `Edit|Write` → `post-edit-quality.cjs` (new)

Reads hook JSON from stdin, extracts `tool_input.file_path`, then:
1. **Secret-scan** the written file for key-shaped strings (e.g. `sk-`, long hex/base64
   API tokens, `AKIA...`). If found, emit a loud `additionalContext` warning so it
   surfaces next to the tool result. (Stage 1 should have prevented the write; this is
   defense in depth.)
2. **Format:** if the file is inside the ASM Next.js project
   (`Projects/Clients/ankitsahnimakeover/ankitsahnimakeover-nextjs`) and has a
   prettier-relevant extension, run `npx prettier --write <file>`. Guarded so it never
   runs repo-wide in the mixed monorepo.
3. **Log:** append `{ts, tool, file_path}` to `.claude/logs/edits.json`.

PostToolUse cannot block; it uses top-level `decision`/`reason` or `additionalContext`
per the event schema (distinct from PreToolUse's `hookSpecificOutput.permissionDecision`).

### Notification (non-blocking, machine-specific → settings.local.json)

**A. `Notification` → `notify.ps1` (new)**
- Native Win10/11 toast (via `Windows.UI.Notifications`, no install) + system sound
  when Claude is blocked (`permission_prompt`, `idle_prompt`).

**B. `Stop` → quiet completion chime**
- `[System.Media.SystemSounds]::Asterisk.Play()` (or reuse `notify.ps1 -done`).

## Files

| Path | Change |
| --- | --- |
| `.claude/hooks/check-approval.cjs` | Repair: portable path, hard-deny secrets, narrow approval scope |
| `.claude/hooks/pre-bash-guard.cjs` | New: destructive-command gate |
| `.claude/hooks/post-edit-quality.cjs` | New: secret-scan + guarded prettier + edit log |
| `.claude/hooks/notify.ps1` | New: Windows toast + sound |
| `.claude/settings.json` | Add PreToolUse(Bash) + PostToolUse(Edit\|Write); fix Edit\|Write path |
| `.claude/settings.local.json` | Add Notification + Stop hooks |
| `.claude/logs/` | New dir, gitignored |
| `.gitignore` | Ignore `.claude/logs/` |

## Error handling

- Stage 1 stays **fail-closed** (deny on parse error / missing transcript) — a safety
  gate that falls open is worse than none.
- Stage 2 and Notification are **fail-open** (never block work on a format/toast error);
  they log and exit 0.
- Prettier/secret-scan wrapped so a missing binary or unreadable file degrades quietly.

## Testing / verification

- **Stage 1A:** attempt a write to a fake `.env` path → denied; edit a routine `.tsx`
  with no approval phrase → allowed; edit `CLAUDE.md` with no approval → denied,
  with "do it" present → allowed.
- **Stage 1B:** `rm -rf` / `git push --force` without approval → denied; with approval → allowed.
- **Stage 2:** edit a file in the nextjs project → prettier runs, log line appended;
  edit a file outside it → no prettier, log line still appended; write a file containing
  `sk-test123...` → warning surfaces.
- **Notification:** trigger a permission prompt → toast + sound; finish a turn → chime.
- Verify `/hooks` browser lists all five hooks.

## Out of scope (YAGNI)

- TTS / voice (free SAPI voice is robotic; toast+sound is enough).
- Prompt/agent-type hooks, CI GitHub-Action gates, type-check hook — can layer later.
- Touching the existing permissions allowlist.

## Decisions (locked 2026-06-04)

- Loudness: toast + sound on `permission_prompt`, quiet chime on `Stop`.
- **Notifications: install `BurntToast` (free, user-scope, no admin) for real toasts,
  with a native `SystemSounds` fallback if the module is absent.** Install command
  shown to Ankur before running, per check-before-install rule.
- **`PreCompact` transcript backup: included.** Copies the session transcript to
  `.claude/logs/transcripts/` before compaction. Fail-open.
- SessionStart persona injection (`inject-persona.cjs`) already shipped this session;
  the build extends the same `.claude/hooks/` + `settings.json` surface.
```
