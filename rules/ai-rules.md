# AI Rules

Standards for building AI-powered features using Claude API and other models.

## Model Selection
Load is distributed across providers to reduce cost and avoid rate limits.

| Use Case | Model | Provider |
|----------|-------|----------|
| Orchestration, complex reasoning, high-stakes decisions | claude-opus-4-6 | Anthropic |
| Coding, writing, analysis, chatbots | claude-sonnet-4-6 | Anthropic |
| Fast classification or routing | claude-haiku-4-5-20251001 | Anthropic |
| High-volume tasks, long context, summarization | gemini-2.0-flash | Google |
| Default for new features | claude-sonnet-4-6 | Anthropic |

## Provider Strategy — Cost Hierarchy (cheapest first)

| Priority | Provider | Model | Cost | Use When |
|----------|----------|-------|------|----------|
| 1st | **Ollama (local)** | gemma:e4b | Free | Simple tasks, classification, routing, drafts |
| 2nd | **Gemini** | gemini-2.0-flash | Near-free | Medium complexity, chatbots, n8n AI nodes |
| 3rd | **Anthropic** | claude-sonnet-4-6 | Pro plan only | Claude Code sessions only — no API calls in projects |
| 4th | **OpenAI** | — | Not active | Add only when specifically needed |

- Always try Ollama first for any task a small model can handle
- Escalate to Gemini when output quality from Ollama is insufficient
- Never call Anthropic API in project code — Pro plan is for Claude Code only
- Never hardcode a provider — use env vars so switching is a one-line change

## Budget Rules
- Gemini is the default API for all project builds until Anthropic API budget is available
- Do not add ANTHROPIC_API_KEY to .env until a separate API budget is allocated
- Prefer Gemini Flash (fast + cheap) over Pro models for high-volume tasks
- Any feature requiring >1000 API calls/day must have a cost estimate before building
- Monthly API spend target: keep under ₹2,000/month until first client revenue

## System Prompts
- Always inject full context at conversation start — never rely on model memory
- System prompt = role + constraints + user context + current state
- Keep system prompts focused — bloated prompts degrade output quality
- Version-control system prompts alongside the code that uses them

## Context Management
- For chatbots: include last 10-20 messages max to avoid context overflow
- For AI agents: summarize prior session state, don't replay full history
- Always define what the model should NOT do, not just what it should do

## API Usage
- Never expose API keys in frontend code — always route through a backend or n8n
- Use environment variables for all API keys: `ANTHROPIC_API_KEY`
- Set `max_tokens` explicitly — never leave it unset in production
- Handle rate limits and API errors gracefully — always have a fallback message

## Cost Management
- Log token usage for every significant API call
- Haiku for routing/classification, Sonnet for main tasks, Opus only when needed
- Cache repeated system prompts where possible
- Budget-tracker agent auto-escalates when task spend exceeds 80%

## Output Quality
- Always define output format in the prompt (JSON, markdown, plain text)
- Validate AI output before using it in automation logic
- For customer-facing text: review before sending, especially in early builds
- Never use raw AI output in financial, legal, or medical contexts without human review

## Prompt Files
- Store reusable prompts in `Projects/<project>/prompts/` as `.md` files
- Name clearly: `appointment-reminder-prompt.md`, `lead-qualification-prompt.md`
- Document the model, temperature, and max_tokens used with each prompt

## Related

- [[rules/README.md]] — Rules index
- [[rules/coding-rules.md]] — API key security rules aligned
- [[CLAUDE.md]] — Model routing: Haiku/Sonnet/Opus by task type
- [[.claude/agents/coo.md]] — COO applies model routing decisions
