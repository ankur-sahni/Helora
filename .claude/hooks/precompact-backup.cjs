#!/usr/bin/env node
// PreCompact: copy the session transcript to .claude/logs/transcripts/ before compaction. Fail-OPEN.

const fs = require('fs');
const path = require('path');

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }

try {
  const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const tp = input.transcript_path;
  if (tp && fs.existsSync(tp)) {
    const dir = path.join(root, '.claude', 'logs', 'transcripts');
    fs.mkdirSync(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sid = (input.session_id || 'session').slice(0, 8);
    fs.copyFileSync(tp, path.join(dir, `${sid}-${stamp}.jsonl`));
  }
} catch {}
process.exit(0);
