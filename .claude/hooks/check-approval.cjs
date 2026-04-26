#!/usr/bin/env node
// Pre-edit approval gate.
// Reads Claude Code transcript, checks the LAST user message for an approval phrase.
// Approves: do it | approved | approve | go ahead | proceed | execute it | ship it
// On any failure (missing input, missing transcript, parse error) we fall OPEN
// so the user is never locked out of editing if the hook itself breaks.

const fs = require('fs');

const APPROVAL_RE = /\b(do it|approved|approve|go ahead|proceed|execute it|ship it)\b/i;

function emit(obj) {
  process.stdout.write(JSON.stringify(obj));
  process.exit(0);
}

function fallOpen(reason) {
  emit({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      additionalContext: `check-approval fell open: ${reason}. Edit allowed but please verify approval was given.`
    }
  });
}

let input;
try {
  input = JSON.parse(fs.readFileSync(0, 'utf8'));
} catch (e) {
  fallOpen('could not parse hook input');
}

const transcriptPath = input && input.transcript_path;
if (!transcriptPath || !fs.existsSync(transcriptPath)) {
  fallOpen('transcript path missing');
}

let lastUserText = '';
try {
  const lines = fs.readFileSync(transcriptPath, 'utf8').trim().split('\n');
  for (let i = lines.length - 1; i >= 0; i--) {
    let msg;
    try { msg = JSON.parse(lines[i]); } catch { continue; }
    if (msg.type !== 'user' || !msg.message) continue;
    const content = msg.message.content;
    if (typeof content === 'string') {
      lastUserText = content;
    } else if (Array.isArray(content)) {
      lastUserText = content
        .filter(c => c && c.type === 'text' && typeof c.text === 'string')
        .map(c => c.text)
        .join('\n');
    }
    if (lastUserText && lastUserText.trim()) break;
  }
} catch (e) {
  fallOpen('could not read transcript');
}

if (APPROVAL_RE.test(lastUserText)) {
  emit({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      additionalContext: 'Approval detected in last user message. Edit allowed. Frontend (CSS/JSX/HTML/JS)? Take Playwright screenshots BEFORE and AFTER.'
    }
  });
}

emit({
  hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'deny',
    permissionDecisionReason: 'BLOCKED by check-approval hook: last user message has no approval phrase (do it / approved / go ahead / proceed / ship it). Present Plan + Execution Steps + Outcome and wait for explicit approval.'
  }
});
