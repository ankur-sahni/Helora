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
