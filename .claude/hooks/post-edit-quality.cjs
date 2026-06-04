#!/usr/bin/env node
// PostToolUse(Edit|Write): edit log + guarded prettier format + secret scan. Fail-OPEN.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { SECRET_CONTENT_RE } = require('./lib/patterns.cjs');

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const ti = (input && input.tool_input) || {};
const fp = ti.file_path || ti.path;
if (!fp) process.exit(0);

// 1. Edit log (best-effort).
try {
  const logDir = path.join(root, '.claude', 'logs');
  fs.mkdirSync(logDir, { recursive: true });
  fs.appendFileSync(path.join(logDir, 'edits.jsonl'),
    JSON.stringify({ ts: new Date().toISOString(), tool: input.tool_name, file: fp }) + '\n');
} catch {}

// 2. Guarded prettier — only inside the ASM Next.js project, only if its prettier is present.
try {
  const asm = path.join(root, 'Projects', 'Clients', 'ankitsahnimakeover', 'ankitsahnimakeover-nextjs');
  const rel = path.relative(asm, fp);
  const inAsm = rel && !rel.startsWith('..') && !path.isAbsolute(rel);
  const ext = path.extname(fp).toLowerCase();
  const fmt = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.md', '.mdx', '.json'];
  const prettierJs = path.join(asm, 'node_modules', 'prettier', 'bin', 'prettier.cjs');
  if (inAsm && fmt.includes(ext) && fs.existsSync(prettierJs)) {
    execFileSync(process.execPath, [prettierJs, '--write', fp], { cwd: asm, stdio: 'ignore' });
  }
} catch {}

// 3. Secret scan (defense in depth) — block to push back to Claude.
// Skip docs/tests, where example tokens are legitimate (ignore-globs, like real scanners).
try {
  const ext = path.extname(fp).toLowerCase();
  const skip = ['.md', '.mdx', '.txt'].includes(ext) || /(^|[\\/])(tests?|__tests__)[\\/]|\.test\./i.test(fp);
  if (!skip && SECRET_CONTENT_RE.test(fs.readFileSync(fp, 'utf8'))) {
    process.stdout.write(JSON.stringify({
      decision: 'block',
      reason: `A secret-shaped string was written to ${fp}. Remove it and move the value to .env (gitignored).`,
    }));
  }
} catch {}
process.exit(0);
