Run a fast session sync for the Ankit Sahni Makeover project. Complete in under 60 seconds. Read-only — no file writes, no code changes.

## Steps

### 1. Read state snapshot
Read `C:\Users\devin\.claude\projects\D--Learning-Ai-Automation-Ankur-Sahni-Learning-Project\memory\ankit_sahni_state.md` — instant context, no commands needed.

### 2. Git state (nextjs subrepo)
```powershell
Set-Location "D:\Learning\Ai Automation\Ankur Sahni Learning Project\Projects\Clients\ankitsahnimakeover\ankitsahnimakeover-nextjs"
git log --oneline -3
git status --short
```

### 3. Vercel live check
```powershell
try {
  $r = Invoke-WebRequest -Uri "https://ankitsahnimakeover.com" -Method HEAD -TimeoutSec 8 -UseBasicParsing
  Write-Host "VERCEL: GREEN ($($r.StatusCode))"
} catch {
  Write-Host "VERCEL: RED or UNREACHABLE"
}
```

### 4. Output this exact block

```
═══════════════════════════════════════════
  ASM SYNC — [TODAY'S DATE]
═══════════════════════════════════════════

VERCEL      [GREEN ✓ | RED ✗ | UNKNOWN]
LAST COMMIT [hash] — [message]
GIT STATUS  [clean | N uncommitted files]

RESUME POINT
  [Current Resume Point from ankit_sahni_state.md]

TOP 5 OPEN
  1. [from ankit_sahni_state.md]
  2. ...

BLOCKED ON ANKUR
  • [items from ankit_sahni_state.md]

LANDMINES
  • app/globals.css — use offset/limit, never read full
  • app/page.tsx — 687+ lines, don't add features
  • Approval hook: say "go ahead" / "approved" before any file write

═══════════════════════════════════════════
Ready. What do you want to tackle today?
```

Do NOT start any work until Ankur replies.

## Related
- [[.claude/commands/start.md]] — Start dev server
- [[Projects/Clients/ankitsahnimakeover/DONE_CHECKLIST.md]] — Master task list
- [[C:\Users\devin\.claude\projects\D--Learning-Ai-Automation-Ankur-Sahni-Learning-Project\memory\ankit_sahni_state.md]] — State snapshot (overwrite each session end)
- [[C:\Users\devin\.claude\projects\D--Learning-Ai-Automation-Ankur-Sahni-Learning-Project\memory\handover.md]] — Full session history
