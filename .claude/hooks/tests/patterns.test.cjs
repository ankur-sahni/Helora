const { test } = require('node:test');
const assert = require('node:assert');
const P = require('../lib/patterns.cjs');

test('secret paths match', () => {
  for (const p of ['/x/.env', 'a/.env.local', 'config/credentials.json', 'key.pem', 'server.key', '/home/.ssh/id_rsa']) {
    assert.ok(P.SECRET_PATH_RE.test(p), `should match ${p}`);
  }
});
test('non-secret paths do not match', () => {
  for (const p of ['src/Hero.tsx', 'README.md', 'environment.ts',
    'src/components/SecretMenu.tsx', 'lib/credentialStore.ts', 'utils/getCredentials.ts']) {
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
