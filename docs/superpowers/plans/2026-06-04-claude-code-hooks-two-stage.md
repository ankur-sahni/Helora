# Two-Stage Claude Code Hooks — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single fail-closed approval gate with the power-user two-stage hook system (PreToolUse safety + PostToolUse quality), add Windows notifications and a PreCompact transcript backup.

**Architecture:** Small Node `.cjs` hooks under `.claude/hooks/`, sharing one classification module. Stage 1 (`PreToolUse`) returns native `deny`/`ask`/`allow` decisions — no transcript parsing, which eliminates the current false-open/false-closed bug. Stage 2 (`PostToolUse`) secret-scans, formats (guarded prettier), and logs. Notifications run via PowerShell. Safety hooks fail-closed; quality/notification/backup hooks fail-open. Committed `settings.json` carries safety+quality; gitignored `settings.local.json` carries the machine-specific notification.

**Tech Stack:** Node 24 (built-in `node --test`), prettier 3.8.3 (already in the ASM project), PowerShell + optional BurntToast module.

---

## File Structure

| Path | Responsibility |
| --- | --- |
| `.claude/hooks/lib/patterns.cjs` | Shared regexes: secret paths, high-risk paths, secret content, destructive shell |
| `.claude/hooks/check-approval.cjs` | PreToolUse(Edit\|Write) path classifier → deny/ask/allow (rewritten) |
| `.claude/hooks/pre-bash-guard.cjs` | PreToolUse(Bash) destructive-command gate → ask |
| `.claude/hooks/post-edit-quality.cjs` | PostToolUse(Edit\|Write) secret-scan + guarded prettier + edit log |
| `.claude/hooks/precompact-backup.cjs` | PreCompact transcript backup |
| `.claude/hooks/notify.ps1` | Notification toast (BurntToast if present) + system sound |
| `.claude/hooks/inject-persona.cjs` | SessionStart persona re-injection (ALREADY SHIPPED — do not recreate) |
| `.claude/hooks/tests/*.test.cjs` | Node test-runner specs for each hook |
| `.claude/settings.json` | Wire PreToolUse(Bash), PostToolUse, PreCompact; fix Edit\|Write to exec form |
| `.claude/settings.local.json` | Add Notification hook |
| `.gitignore` | Ignore `.claude/logs/` |

---

## Task 0: Branch and commit the already-shipped persona work

**Files:** none created — git only.

- [ ] **Step 1: Create the feature branch**

Run:
```bash
git checkout -b chore/claude-config-hardening
```
Expected: `Switched to a new branch 'chore/claude-config-hardening'`

- [ ] **Step 2: Stage only the persona/config files (not unrelated ASM changes)**

Run:
```bash
git add .claude/CTO.md .claude/hooks/inject-persona.cjs .claude/settings.json CLAUDE.md CLAUDE.local.md docs/superpowers/specs/2026-06-04-claude-code-hooks-two-stage-design.md docs/superpowers/plans/2026-06-04-claude-code-hooks-two-stage.md
```

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(hooks): co-founder/CTO persona + SessionStart injection

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```
Expected: commit succeeds.

---

## Task 1: Shared classification patterns

**Files:**
- Create: `.claude/hooks/lib/patterns.cjs`
- Test: `.claude/hooks/tests/patterns.test.cjs`

- [ ] **Step 1: Write the failing test**

Create `.claude/hooks/tests/patterns.test.cjs`:
```js
const { test } = require('node:test');
const assert = require('node:assert');
const P = require('../lib/patterns.cjs');

test('secret paths match', () => {
  for (const p of ['/x/.env', 'a/.env.local', 'config/credentials.json', 'key.pem', 'server.key', '/home/.ssh/id_rsa']) {
    assert.ok(P.SECRET_PATH_RE.test(p), `should match ${p}`);
  }
});
test('non-secret paths do not match', () => {
  for (const p of ['src/Hero.tsx', 'README.md', 'environment.ts']) {
    assert.ok(!P.SECRET_PATH_RE.test(p), `should NOT match ${p}`);
  }
});
test('high-risk config paths match', () => {
  for (const p of ['.claude/settings.json', '.claude/settings.local.json', 'CLAUDE.md', 'CLAUDE.local.md', 'next.config.mjs', 'workflows/lead.json']) {
    assert.ok(P.HIGH_RISK_PATH_RE.test(p), `should match ${p}`);
  }
});
test('secret content matches real-shaped tokens', () => {
  assert.ok(P.SECRET_CONTENT_RE.test('const k="sk-abcdefghijklmnopqrstuvwxyz123456"'));
  assert.ok(P.SECRET_CONTENT_RE.test('AKIAIOSFODNN7EXAMPLE'));
  assert.ok(!P.SECRET_CONTENT_RE.test('sk-short'));
});
test('destructive shell matches', () => {
  for (const c of ['rm -rf build', 'rm  -fr /tmp', 'git reset --hard', 'git push origin main --force', 'git push -f', 'Remove-Item x -Recurse -Force']) {
    assert.ok(P.DESTRUCTIVE_BASH_RE.test(c), `should match ${c}`);
  }
  for (const c of ['npm test', 'git status', 'rm file.txt']) {
    assert.ok(!P.DESTRUCTIVE_BASH_RE.test(c), `should NOT match ${c}`);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test .claude/hooks/tests/patterns.test.cjs`
Expected: FAIL — `Cannot find module '../lib/patterns.cjs'`.

- [ ] **Step 3: Write the module**

Create `.claude/hooks/lib/patterns.cjs`:
```js
// Shared classification patterns for Claude Code hooks. One source of truth.

// Secret/key files — must never be written by the agent. Hard-deny.
const SECRET_PATH_RE = /(^|[\\/])\.env($|[.\\/])|\.env\.|(secret|credential)s?[^\\/]*$|\.pem$|\.key$|id_rsa/i;

// High-risk config/control files — require explicit confirm (ask).
const HIGH_RISK_PATH_RE = /(^|[\\/])\.claude[\\/]settings[^\\/]*\.json$|(^|[\\/])CLAUDE(\.local)?\.md$|\.config\.[cm]?[jt]s$|[\\/](n8n|workflows?)[\\/][^\\/]*\.json$/i;

// Secret-shaped content (defense in depth in PostToolUse).
const SECRET_CONTENT_RE = /\b(sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{36}|xox[baprs]-[A-Za-z0-9-]{10,}|AIza[0-9A-Za-z_-]{35})\b/;

// Destructive shell commands — confirm before running (ask).
const DESTRUCTIVE_BASH_RE = /\brm\s+(-[a-z]*[rf][a-z]*\s|[^|&;]*\s-[a-z]*[rf]\b)|\bRemove-Item\b[^|&;]*-Recurse|\bgit\s+reset\s+--hard\b|\bgit\s+push\b[^|&;]*\s(--force|-f)\b|\bgit\s+clean\s+-[a-z]*f|\b(drop|truncate)\s+table\b/i;

module.exports = { SECRET_PATH_RE, HIGH_RISK_PATH_RE, SECRET_CONTENT_RE, DESTRUCTIVE_BASH_RE };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test .claude/hooks/tests/patterns.test.cjs`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add .claude/hooks/lib/patterns.cjs .claude/hooks/tests/patterns.test.cjs
git commit -m "feat(hooks): shared classification patterns + tests

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Repair the Edit/Write gate (path classifier)

**Files:**
- Modify (full rewrite): `.claude/hooks/check-approval.cjs`
- Test: `.claude/hooks/tests/check-approval.test.cjs`

- [ ] **Step 1: Write the failing test**

Create `.claude/hooks/tests/check-approval.test.cjs`:
```js
const { test } = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

const HOOK = path.join(__dirname, '..', 'check-approval.cjs');
function run(input, raw) {
  const out = execFileSync(process.execPath, [HOOK], { input: raw !== undefined ? raw : JSON.stringify(input) });
  return JSON.parse(out.toString());
}
const dec = r => r.hookSpecificOutput.permissionDecision;

test('deny secret path', () => assert.strictEqual(dec(run({ tool_input: { file_path: 'D:/x/.env' } })), 'deny'));
test('ask high-risk config', () => assert.strictEqual(dec(run({ tool_input: { file_path: '.claude/settings.json' } })), 'ask'));
test('allow routine source', () => assert.strictEqual(dec(run({ tool_input: { file_path: 'src/components/Hero.tsx' } })), 'allow'));
test('allow when no file_path', () => assert.strictEqual(dec(run({ tool_input: {} })), 'allow'));
test('deny on unparseable input (fail-closed)', () => assert.strictEqual(dec(run(null, 'not json')), 'deny'));
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test .claude/hooks/tests/check-approval.test.cjs`
Expected: FAIL — current `check-approval.cjs` reads a transcript and denies, so `ask`/`allow` assertions fail.

- [ ] **Step 3: Rewrite the hook**

Replace the entire contents of `.claude/hooks/check-approval.cjs` with:
```js
#!/usr/bin/env node
// PreToolUse(Edit|Write): classify the target path and return a native decision.
//   secret/key path -> deny (no override; secrets live in .env only)
//   high-risk config -> ask (UI confirm)
//   everything else -> allow
// Fail-CLOSED: if input is unparseable, deny — a safety gate that falls open is worse than none.

const fs = require('fs');
const { SECRET_PATH_RE, HIGH_RISK_PATH_RE } = require('./lib/patterns.cjs');

function decide(decision, reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: decision, permissionDecisionReason: reason },
  }));
  process.exit(0);
}

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); }
catch { decide('deny', 'could not parse hook input (fail-closed)'); }

const ti = (input && input.tool_input) || {};
const fp = ti.file_path || ti.path || '';
if (!fp) decide('allow', 'no file_path to gate');
if (SECRET_PATH_RE.test(fp)) decide('deny', `Secret/key file is off-limits: ${fp}. Put secrets in .env (gitignored) only.`);
if (HIGH_RISK_PATH_RE.test(fp)) decide('ask', `High-risk config file (${fp}) — confirm this edit.`);
decide('allow', 'routine path');
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test .claude/hooks/tests/check-approval.test.cjs`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add .claude/hooks/check-approval.cjs .claude/hooks/tests/check-approval.test.cjs
git commit -m "fix(hooks): repair Edit/Write gate — path classifier, no transcript scan

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: Destructive-command Bash gate

**Files:**
- Create: `.claude/hooks/pre-bash-guard.cjs`
- Test: `.claude/hooks/tests/pre-bash-guard.test.cjs`

- [ ] **Step 1: Write the failing test**

Create `.claude/hooks/tests/pre-bash-guard.test.cjs`:
```js
const { test } = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

const HOOK = path.join(__dirname, '..', 'pre-bash-guard.cjs');
function run(command) {
  const out = execFileSync(process.execPath, [HOOK], { input: JSON.stringify({ tool_input: { command } }) }).toString();
  return out.trim() ? JSON.parse(out) : null;
}
test('ask on rm -rf', () => assert.strictEqual(run('rm -rf build').hookSpecificOutput.permissionDecision, 'ask'));
test('ask on force push', () => assert.strictEqual(run('git push origin main --force').hookSpecificOutput.permissionDecision, 'ask'));
test('no output on safe command', () => assert.strictEqual(run('npm test'), null));
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test .claude/hooks/tests/pre-bash-guard.test.cjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the hook**

Create `.claude/hooks/pre-bash-guard.cjs`:
```js
#!/usr/bin/env node
// PreToolUse(Bash): ask for confirmation before destructive commands. Fail-OPEN —
// a parse error must not block every shell command; native permissions still apply.

const fs = require('fs');
const { DESTRUCTIVE_BASH_RE } = require('./lib/patterns.cjs');

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }

const cmd = (input && input.tool_input && input.tool_input.command) || '';
if (DESTRUCTIVE_BASH_RE.test(cmd)) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'ask',
      permissionDecisionReason: `Destructive command — confirm before running:\n${cmd}`,
    },
  }));
}
process.exit(0);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test .claude/hooks/tests/pre-bash-guard.test.cjs`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add .claude/hooks/pre-bash-guard.cjs .claude/hooks/tests/pre-bash-guard.test.cjs
git commit -m "feat(hooks): destructive-command Bash gate

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: PostToolUse quality pass (secret-scan + format + log)

**Files:**
- Create: `.claude/hooks/post-edit-quality.cjs`
- Test: `.claude/hooks/tests/post-edit-quality.test.cjs`

- [ ] **Step 1: Write the failing test**

Create `.claude/hooks/tests/post-edit-quality.test.cjs`:
```js
const { test } = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');

const HOOK = path.join(__dirname, '..', 'post-edit-quality.cjs');
function run(file_path, projectDir) {
  const out = execFileSync(process.execPath, [HOOK], {
    input: JSON.stringify({ tool_name: 'Write', tool_input: { file_path } }),
    env: { ...process.env, CLAUDE_PROJECT_DIR: projectDir },
  }).toString();
  return out.trim() ? JSON.parse(out) : null;
}

test('logs the edit and stays silent on a clean file', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pq-'));
  const f = path.join(dir, 'note.txt');
  fs.writeFileSync(f, 'hello world');
  const r = run(f, dir);
  assert.strictEqual(r, null);
  const log = fs.readFileSync(path.join(dir, '.claude', 'logs', 'edits.jsonl'), 'utf8');
  assert.ok(log.includes('note.txt'));
});

test('blocks when a secret-shaped token is present', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pq-'));
  const f = path.join(dir, 'leak.txt');
  fs.writeFileSync(f, 'token = "sk-abcdefghijklmnopqrstuvwxyz123456"');
  const r = run(f, dir);
  assert.strictEqual(r.decision, 'block');
  assert.ok(/secret/i.test(r.reason));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test .claude/hooks/tests/post-edit-quality.test.cjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the hook**

Create `.claude/hooks/post-edit-quality.cjs`:
```js
#!/usr/bin/env node
// PostToolUse(Edit|Write): edit log + guarded prettier format + secret scan. Fail-OPEN.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { SECRET_CONTENT_RE } = require('./lib/patterns.cjs');

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const ti = (input && input.tool_input) || {};
const fp = ti.file_path || ti.path;
if (!fp) process.exit(0);

// 1. Edit log (best-effort).
try {
  const logDir = path.join(root, '.claude', 'logs');
  fs.mkdirSync(logDir, { recursive: true });
  fs.appendFileSync(path.join(logDir, 'edits.jsonl'),
    JSON.stringify({ ts: new Date().toISOString(), tool: input.tool_name, file: fp }) + '\n');
} catch {}

// 2. Guarded prettier — only inside the ASM Next.js project, only if its prettier is present.
try {
  const asm = path.join(root, 'Projects', 'Clients', 'ankitsahnimakeover', 'ankitsahnimakeover-nextjs');
  const rel = path.relative(asm, fp);
  const inAsm = rel && !rel.startsWith('..') && !path.isAbsolute(rel);
  const ext = path.extname(fp).toLowerCase();
  const fmt = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.md', '.mdx', '.json'];
  const prettierJs = path.join(asm, 'node_modules', 'prettier', 'bin', 'prettier.cjs');
  if (inAsm && fmt.includes(ext) && fs.existsSync(prettierJs)) {
    execFileSync(process.execPath, [prettierJs, '--write', fp], { cwd: asm, stdio: 'ignore' });
  }
} catch {}

// 3. Secret scan (defense in depth) — block to push back to Claude.
try {
  if (SECRET_CONTENT_RE.test(fs.readFileSync(fp, 'utf8'))) {
    process.stdout.write(JSON.stringify({
      decision: 'block',
      reason: `A secret-shaped string was written to ${fp}. Remove it and move the value to .env (gitignored).`,
    }));
  }
} catch {}
process.exit(0);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test .claude/hooks/tests/post-edit-quality.test.cjs`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add .claude/hooks/post-edit-quality.cjs .claude/hooks/tests/post-edit-quality.test.cjs
git commit -m "feat(hooks): PostToolUse quality pass — secret scan, format, edit log

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: PreCompact transcript backup

**Files:**
- Create: `.claude/hooks/precompact-backup.cjs`
- Test: `.claude/hooks/tests/precompact-backup.test.cjs`

- [ ] **Step 1: Write the failing test**

Create `.claude/hooks/tests/precompact-backup.test.cjs`:
```js
const { test } = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');

const HOOK = path.join(__dirname, '..', 'precompact-backup.cjs');

test('copies the transcript into .claude/logs/transcripts', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pc-'));
  const transcript = path.join(dir, 't.jsonl');
  fs.writeFileSync(transcript, '{"x":1}\n');
  execFileSync(process.execPath, [HOOK], {
    input: JSON.stringify({ session_id: 'abcdef12', transcript_path: transcript }),
    env: { ...process.env, CLAUDE_PROJECT_DIR: dir },
  });
  const backups = fs.readdirSync(path.join(dir, '.claude', 'logs', 'transcripts'));
  assert.strictEqual(backups.length, 1);
  assert.ok(backups[0].startsWith('abcdef12-'));
});

test('does nothing and exits 0 on bad input', () => {
  execFileSync(process.execPath, [HOOK], { input: 'not json' }); // must not throw
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test .claude/hooks/tests/precompact-backup.test.cjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the hook**

Create `.claude/hooks/precompact-backup.cjs`:
```js
#!/usr/bin/env node
// PreCompact: copy the session transcript to .claude/logs/transcripts/ before compaction. Fail-OPEN.

const fs = require('fs');
const path = require('path');

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }

try {
  const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const tp = input.transcript_path;
  if (tp && fs.existsSync(tp)) {
    const dir = path.join(root, '.claude', 'logs', 'transcripts');
    fs.mkdirSync(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sid = (input.session_id || 'session').slice(0, 8);
    fs.copyFileSync(tp, path.join(dir, `${sid}-${stamp}.jsonl`));
  }
} catch {}
process.exit(0);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test .claude/hooks/tests/precompact-backup.test.cjs`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add .claude/hooks/precompact-backup.cjs .claude/hooks/tests/precompact-backup.test.cjs
git commit -m "feat(hooks): PreCompact transcript backup

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: Windows notification script

**Files:**
- Create: `.claude/hooks/notify.ps1`

No automated test (PowerShell UI side-effect). Manual verification instead.

- [ ] **Step 1: Write the script**

Create `.claude/hooks/notify.ps1`:
```powershell
# Notification hook: system sound + toast (BurntToast if installed). Fail-open.
$ErrorActionPreference = 'SilentlyContinue'

$msg = 'Claude Code needs your attention'
try {
    $raw = [Console]::In.ReadToEnd()
    if ($raw) {
        $j = $raw | ConvertFrom-Json
        if ($j.message) { $msg = [string]$j.message }
    }
} catch {}

try { [System.Media.SystemSounds]::Asterisk.Play() } catch {}

try {
    if (Get-Module -ListAvailable -Name BurntToast) {
        Import-Module BurntToast
        New-BurntToastNotification -Text 'Claude Code', $msg
    }
} catch {}

exit 0
```

- [ ] **Step 2: Manually verify the sound + fallback path**

Run:
```powershell
'{"message":"Test notification"}' | powershell -NoProfile -ExecutionPolicy Bypass -File .claude/hooks/notify.ps1
```
Expected: a system sound plays; no error. (Toast appears only once BurntToast is installed — Task 6 Step 3.)

- [ ] **Step 3 (OPTIONAL — requires Ankur's approval to install): Install BurntToast for real toasts**

PAUSE and show Ankur this command before running (check-before-install rule):
```powershell
Install-Module BurntToast -Scope CurrentUser -Force
```
After install, re-run Step 2 — expected: a Windows toast titled "Claude Code" plus the sound. If Ankur declines, skip — the script already degrades to sound-only.

- [ ] **Step 4: Commit**

```bash
git add .claude/hooks/notify.ps1
git commit -m "feat(hooks): Windows notification script (toast + sound)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 7: Wire committed settings.json

**Files:**
- Modify: `.claude/settings.json`

- [ ] **Step 1: Replace the file contents**

The file currently has `PreToolUse` (Edit|Write, shell form) and `SessionStart`. Replace the entire file with:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "node", "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/check-approval.cjs"] }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "node", "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/pre-bash-guard.cjs"] }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "node", "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/post-edit-quality.cjs"] }
        ]
      }
    ],
    "SessionStart": [
      {
        "matcher": "startup|resume|clear|compact",
        "hooks": [
          { "type": "command", "command": "node", "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/inject-persona.cjs"] }
        ]
      }
    ],
    "PreCompact": [
      {
        "hooks": [
          { "type": "command", "command": "node", "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/precompact-backup.cjs"] }
        ]
      }
    ]
  }
}
```

- [ ] **Step 2: Verify it is valid JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('.claude/settings.json','utf8')); console.log('valid')"`
Expected: `valid`

- [ ] **Step 3: Commit**

```bash
git add .claude/settings.json
git commit -m "feat(hooks): wire two-stage gates + PreCompact in settings.json (exec form)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 8: Wire local notification + gitignore logs

**Files:**
- Modify: `.claude/settings.local.json` (add a `hooks` key alongside `permissions`)
- Modify: `.gitignore`

- [ ] **Step 1: Add the Notification hook**

In `.claude/settings.local.json`, add a top-level `"hooks"` key as a sibling of `"permissions"` (keep the existing permissions array unchanged):
```json
  "hooks": {
    "Notification": [
      {
        "matcher": "permission_prompt|idle_prompt",
        "hooks": [
          { "type": "command", "command": "powershell", "args": ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "${CLAUDE_PROJECT_DIR}/.claude/hooks/notify.ps1"] }
        ]
      }
    ]
  }
```

- [ ] **Step 2: Verify it is valid JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('.claude/settings.local.json','utf8')); console.log('valid')"`
Expected: `valid`

- [ ] **Step 3: Ignore the logs directory**

Append to `.gitignore`:
```
.claude/logs/
```

- [ ] **Step 4: Commit** (settings.local.json is gitignored, so only `.gitignore` is staged)

```bash
git add .gitignore
git commit -m "chore(hooks): ignore .claude/logs; local notification wired

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 9: Full verification

**Files:** none.

- [ ] **Step 1: Run the entire hook test suite**

Run: `node --test .claude/hooks/tests/*.test.cjs`
Expected: all suites PASS, 0 failures. (Node 24 treats a bare directory arg as a module — use the glob.)

- [ ] **Step 2: Smoke-test each PreToolUse decision end to end**

Run:
```bash
echo "{\"tool_input\":{\"file_path\":\"x/.env\"}}" | node .claude/hooks/check-approval.cjs
echo "{\"tool_input\":{\"file_path\":\"src/a.tsx\"}}" | node .claude/hooks/check-approval.cjs
echo "{\"tool_input\":{\"command\":\"rm -rf build\"}}" | node .claude/hooks/pre-bash-guard.cjs
```
Expected: first → `deny`; second → `allow`; third → `ask`.

- [ ] **Step 3: Confirm the hooks browser lists every hook**

In the Claude Code CLI, run `/hooks`. Expected entries: PreToolUse (Edit|Write, Bash), PostToolUse (Edit|Write), SessionStart, PreCompact, and (from local settings) Notification.

- [ ] **Step 4: Confirm clean working tree for this feature**

Run: `git status`
Expected: no uncommitted hook/settings files remain (unrelated pre-existing ASM changes may still show — leave them).

---

## Self-Review Notes

- **Spec coverage:** Stage 1A repaired gate (Task 2), Stage 1B Bash guard (Task 3), Stage 2 quality (Task 4), Notification (Tasks 6/8), PreCompact (Task 5), exec-form fix + merge split (Tasks 7/8), logs gitignored (Task 8). SessionStart persona shipped pre-plan (Task 0 commits it).
- **Design change vs spec:** Stage 1 uses native `deny`/`ask`/`allow` instead of the transcript approval-phrase scan — strictly better (removes the false-open/false-closed bug). Recorded here as the authoritative approach.
- **Dropped from spec:** the `Stop` completion chime — notifying on every turn-end is noise; `idle_prompt` already covers "Claude is waiting for you." Notification fires on `permission_prompt|idle_prompt` only.
- **Fail posture:** Edit/Write gate fails closed (deny); Bash guard, quality, backup, notification fail open.
```
