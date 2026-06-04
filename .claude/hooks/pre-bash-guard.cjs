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
