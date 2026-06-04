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
