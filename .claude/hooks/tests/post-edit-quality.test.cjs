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

test('blocks when a secret-shaped token is present in source', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pq-'));
  const f = path.join(dir, 'leak.ts');
  fs.writeFileSync(f, 'const token = "sk-abcdefghijklmnopqrstuvwxyz123456";');
  const r = run(f, dir);
  assert.strictEqual(r.decision, 'block');
  assert.ok(/secret/i.test(r.reason));
});

test('does not block docs/tests that legitimately contain example tokens', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pq-'));
  const f = path.join(dir, 'guide.md');
  fs.writeFileSync(f, 'Example: `sk-abcdefghijklmnopqrstuvwxyz123456`');
  assert.strictEqual(run(f, dir), null);
});
