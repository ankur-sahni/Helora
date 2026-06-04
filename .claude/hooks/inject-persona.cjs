#!/usr/bin/env node
// SessionStart: re-inject the co-founder/CTO persona as a high-salience reminder.
// Fail-open by design — a persona reminder must never block or break a session.

const fs = require('fs');
const path = require('path');

try {
  const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const persona = fs.readFileSync(path.join(root, '.claude', 'CTO.md'), 'utf8').trim();
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: `Your identity for this session — hold it:\n\n${persona}`
    }
  }));
} catch {
  // best-effort: if CTO.md is unreadable, stay silent rather than disrupt the session
}
process.exit(0);
