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
