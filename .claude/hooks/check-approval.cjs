#!/usr/bin/env node
// Pre-edit approval gate.
// Scans last 10 user messages for approval phrase — approval persists across turns.
// Approves: do it | approved | approve | go ahead | proceed | execute it | ship it | fix | spin | run | launch | let's
// On any failure (missing input, missing transcript, parse error) we fall OPEN.

const fs = require('fs');

const APPROVAL_RE = /\b(do it|approved|approve|go ahead|proceed|execute it|ship it|fix|spin|run|launch|let'?s)\b/i;
const NO_APPROVAL_PATHS = [/graphify-out[/\\]/];

function emit(obj) {
  process.stdout.write(JSON.stringify(obj));
  process.exit(0);
}

function fallOpen(reason) {
  emit({ hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: `check-approval fell open: ${reason}.` } });
}

function allow() {
  emit({ hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: 'Approval detected. Edit allowed.' } });
}

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch (e) { fallOpen('could not parse hook input'); }

const transcriptPath = input && input.transcript_path;
if (!transcriptPath || !fs.existsSync(transcriptPath)) { fallOpen('transcript path missing'); }

const filePath = (input && input.tool_input && (input.tool_input.file_path || input.tool_input.path)) || '';
if (NO_APPROVAL_PATHS.some(re => re.test(filePath))) { allow(); }

let recentUserTexts = [];
try {
  const lines = fs.readFileSync(transcriptPath, 'utf8').trim().split('\n');
  for (let i = lines.length - 1; i >= 0 && recentUserTexts.length < 10; i--) {
    let msg;
    try { msg = JSON.parse(lines[i]); } catch { continue; }
    if (msg.type !== 'user' || !msg.message) continue;
    const content = msg.message.content;
    let text = '';
    if (typeof content === 'string') { text = content; }
    else if (Array.isArray(content)) {
      text = content.filter(c => c && c.type === 'text' && typeof c.text === 'string').map(c => c.text).join('\n');
    }
    if (text && text.trim()) recentUserTexts.push(text.trim());
  }
} catch (e) { fallOpen('could not read transcript'); }

if (recentUserTexts.length === 0) { fallOpen('no user messages found'); }

if (APPROVAL_RE.test(recentUserTexts.join('\n'))) { allow(); }

emit({
  hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'deny',
    permissionDecisionReason: 'BLOCKED: no approval phrase in last 10 messages. Say: do it / approved / go ahead / proceed.'
  }
});
