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
