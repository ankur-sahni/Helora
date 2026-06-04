// Shared classification patterns for Claude Code hooks. One source of truth.

// Secret/key files — must never be written by the agent. Hard-deny.
const SECRET_PATH_RE = /(^|[\\/])\.env($|[.\\/])|\.env\.|(secret|credential)s?[^\\/]*$|\.pem$|\.key$|id_rsa/i;

// High-risk config/control files — require explicit confirm (ask).
const HIGH_RISK_PATH_RE = /(^|[\\/])\.claude[\\/]settings[^\\/]*\.json$|(^|[\\/])CLAUDE(\.local)?\.md$|\.config\.[cm]?[jt]s$|(^|[\\/])(n8n|workflows?)[\\/][^\\/]*\.json$/i;

// Secret-shaped content (defense in depth in PostToolUse).
const SECRET_CONTENT_RE = /\b(sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{36}|xox[baprs]-[A-Za-z0-9-]{10,}|AIza[0-9A-Za-z_-]{35})\b/;

// Destructive shell commands — confirm before running (ask).
const DESTRUCTIVE_BASH_RE = /\brm\s+(-[a-z]*[rf][a-z]*\s|[^|&;]*\s-[a-z]*[rf]\b)|\bRemove-Item\b[^|&;]*-Recurse|\bgit\s+reset\s+--hard\b|\bgit\s+push\b[^|&;]*\s(--force|-f)\b|\bgit\s+clean\s+-[a-z]*f|\b(drop|truncate)\s+table\b/i;

module.exports = { SECRET_PATH_RE, HIGH_RISK_PATH_RE, SECRET_CONTENT_RE, DESTRUCTIVE_BASH_RE };
