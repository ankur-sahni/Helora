# n8n Rules

Standards for building and managing n8n workflows in this agency.

## Naming Conventions
- Workflow names: `[Project] — [Function]` e.g. `Sahni — Appointment Reminder`
- Agent heartbeat workflows: `[agent-name]/heartbeat` e.g. `researcher/heartbeat`
- Agent task workflows: `[agent-name]/on-task-assigned` e.g. `coo/on-task-assigned`
- (Paperclip pattern: each agent = one heartbeat + one task-assigned workflow)
- Node names: descriptive action e.g. `Get Lead from Sheet`, `Send WhatsApp Message`
- No generic names like `HTTP Request` or `Function 1`

## Workflow Structure
- Every workflow starts with a clear trigger node (Webhook, Schedule, Manual)
- Add a sticky note at the top of every workflow explaining what it does and why
- Group related nodes visually — use n8n's sticky notes as section labels
- Keep workflows focused — one workflow, one responsibility

## Error Handling
- Every workflow must have an error branch or error trigger
- On failure: log to Google Sheets or send a Slack/WhatsApp alert
- Never let a workflow fail silently
- Test with real data before marking a workflow as production-ready

## Credentials
- Never hardcode API keys or tokens inside nodes
- Always use n8n's built-in Credentials manager
- Name credentials clearly: `[Service] — [Project]` e.g. `WhatsApp — Sahni`

## Testing
- Test every workflow manually before activating on a schedule
- Use n8n's built-in execution log to verify each node output
- Keep one inactive "test" copy of complex workflows before editing production

## Documentation
- Every active workflow must be listed in its project's `CLAUDE.md` under "Active Workflows"
- Document: trigger, what it does, frequency, dependencies

## Performance
- Avoid polling triggers where webhooks are available
- For scheduled workflows, stagger run times to avoid simultaneous execution
- Keep execution history retention at 100 executions (default) unless debugging

## Related

- [[rules/README.md]] — Rules index
- [[Projects/Clients/ankitsahnimakeover/CLAUDE.md]] — 7 n8n workflows planned for this client
- [[rules/coding-rules.md]] — Credential security: never hardcode
- [[rules/ai-rules.md]] — Model selection for automation tasks
