Start the local development environment for active projects.

<!-- COMMENTED OUT (not needed right now):
- Next.js agency dashboard (port 3000): Start-Process with WorkingDirectory `d:\Learning\Ai Automation\Ankur Sahni Learning Project\Projects\Agency\agency-control-center`.
- n8n (port 5678): Start-Process pointing to the n8n binary.
-->

<!-- COMMENTED OUT (not needed right now):
- Check if Ankit Sahni Makeover static reference (port 8090) is running. If not, start Python HTTP server from `Projects/Clients/ankitsahnimakeover/ankitsahnimakeover (Remix)/` using PowerShell Start-Process with `-FilePath "python.exe"` and `-ArgumentList "-m", "http.server", "8090"`.
-->
1. Check if Ankit Sahni Makeover Next.js dev server (port 3001) is running. If not, start it using PowerShell Start-Process with WorkingDirectory `d:\Learning\Ai Automation\Ankur Sahni Learning Project\Projects\Clients\ankitsahnimakeover\ankitsahnimakeover-nextjs` and ArgumentList `"npm", "run", "dev", "--", "-p", "3001"`.
2. Wait for it to respond, then confirm it's up with its URL.

Use the startup commands from memory (feedback_start_servers.md).

## Related

- [[Projects/Clients/ankitsahnimakeover/ankitsahnimakeover-nextjs/CLAUDE.md]] — Next.js project context for port 3001
- [[.claude/commands/status.md]] — Run /status after /start to verify all services are up
- [[CLAUDE.md]] — Windows server startup rule: PowerShell Start-Process only
