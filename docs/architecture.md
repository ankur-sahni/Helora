# Architecture: AI Agency System

Complete blueprint of the multi-agent system design.

---

## System Overview

This is an AI-native organization — a multi-agent system where every function of a software company is staffed by specialized agents with defined roles, communication contracts, memory, and escalation paths.

**Core principle**: Structure IS behavior. Every architectural decision (who owns what, who writes where, who escalates to whom) directly determines what the system can and cannot do.

---

## Three-Dimensional Design

The system is designed across three simultaneous dimensions:

### Dimension 1: Execution Layers

```
┌─────────────────────────────────────────────────────┐
│  CONTROL LAYER                                       │
│  COO + Dispatcher + mandatory trigger rules          │
│  Owns: routing, quality gates, synthesis             │
│  Does NOT: implement, design, write code             │
├─────────────────────────────────────────────────────┤
│  INTELLIGENCE LAYER                                  │
│  All agent LLM calls with model tiering              │
│  Owns: reasoning, generation, evaluation             │
│  Does NOT: store state, manage memory                │
├─────────────────────────────────────────────────────┤
│  ORCHESTRATION LAYER                                 │
│  Workflow definitions + parallel execution tracks    │
│  Owns: sequence, parallelism, retry logic            │
│  Does NOT: make content decisions                    │
├─────────────────────────────────────────────────────┤
│  MEMORY LAYER                                        │
│  Short-term (in-context) + Long-term (canonical)     │
│  Owns: knowledge persistence, retrieval              │
│  Does NOT: validate business logic                   │
├─────────────────────────────────────────────────────┤
│  OBSERVABILITY LAYER                                 │
│  Structured event logging + metrics + alerts         │
│  Owns: audit trail, cost tracking, anomaly detection │
│  Does NOT: make routing or content decisions         │
├─────────────────────────────────────────────────────┤
│  INTEGRATION LAYER                                   │
│  Tools, APIs, external services                      │
│  Owns: external calls, file I/O, shell commands      │
│  Does NOT: decide what to call or when               │
├─────────────────────────────────────────────────────┤
│  TRIGGER LAYER                                       │
│  Mandatory auto-triggers + workflow initiators       │
│  Owns: when agents fire (not just who invokes them)  │
│  Does NOT: execute agent logic                       │
├─────────────────────────────────────────────────────┤
│  FEEDBACK LOOP                                       │
│  Retrospective agent + system self-improvement       │
│  Owns: system evolution, prompt improvement          │
│  Does NOT: self-modify without human approval        │
└─────────────────────────────────────────────────────┘
```

### Dimension 2: Agent Org Chart

```
                    HUMAN
                      │
                    COO (Opus)
                      │
              DISPATCHER (Haiku) ← routing audit
                      │
          ┌───────────┼───────────────┐
          │           │               │
    PRODUCT OWNER  ADVISORY COUNCIL  DOMAIN AGENTS
    (Sonnet)       (3x Sonnet)        │
                   Evolution          ├── Planner
                   Improvement        ├── Researcher
                   Keenness           ├── Implementer
                                      ├── Reviewer
                                      ├── Tester (Haiku)
                                      ├── Security
                                      ├── Dependency Analyst (Haiku)
                                      └── DevOps

    SYSTEM AGENTS (run alongside all workflows)
    ├── Memory Manager
    ├── Context Manager (Haiku)
    ├── Observability (Haiku)
    ├── Budget Tracker (Haiku)
    ├── Retrospective (Opus, periodic)
    └── Docs Writer (Haiku)
```

### Dimension 3: Cognitive Modes

| Mode | Agents | Triggered When |
|------|--------|---------------|
| Planning | COO, Planner, Product Owner | New task, novel problem |
| Execution | Implementer, Tester, Docs Writer | Clear plan exists |
| Reflection | Reviewer, Retrospective | Post-completion |
| Critique | Security, Improvement Council | Validation gates |
| Decision | COO, Full Council | Trade-offs, ambiguity, conflict |
| Memory Recall | All agents | Context gap detected |

---

## End-to-End Execution Flow

### Feature Development (simplified)

```
1. Human request → COO
2. COO routes + rationale → Dispatcher audits
3. [PARALLEL] Researcher maps codebase ‖ Dependency Analyst maps blast radius
4. Product Owner defines requirements (if user-facing)
5. Planner produces plan with confidence score
   → If confidence < 60%: Council convened
6. [PARALLEL] Implementer codes ‖ Tester preps scaffolding
7. Security auto-triggers (if applicable) → hard gate
8. Reviewer produces verdict
9. Tester final run
10. [PARALLEL] Docs Writer ‖ Memory Manager ‖ Observability logs
11. COO 6-point checklist → final output to human
```

---

## Failure Containment

| Failure | Detection | Response |
|---------|-----------|----------|
| Agent confidence < 60% | Confidence score | COO escalates to council |
| Security CRITICAL finding | Security agent verdict | Hard stop, surface to human |
| 3+ consecutive test failures | Tester pattern flag | Researcher investigates before retry |
| Budget > 80% | Budget tracker | COO warned, human decision |
| Canonical memory contradiction | Memory manager validation | Memory manager resolves, flags if uncertain |
| Council no consensus after 3 rounds | Round counter | COO surfaces disagreement to human |
| Agent deviation from plan | Implementer deviation log | Reviewer pays extra attention |

---

## Real-World Stack Mapping

| Layer | Tool Options |
|-------|-------------|
| Agent orchestration | Claude Code multi-agent teams, LangGraph |
| Short-term memory | In-context window, Redis |
| Long-term memory | `.claude/memory/` files, Pinecone, pgvector |
| Observability | LangSmith, OpenTelemetry, Datadog |
| Triggers | Webhooks, GitHub Actions, Temporal |
| Context compression | Claude Haiku (summarization) |
| Cost tracking | Custom (budget-tracker agent) + provider dashboards |

## Related

- [[progress.md]] — Active Architecture Decisions (Gemini default, Groq content, Supabase SOR, No Redis)
- [[CLAUDE.md]] — Governance layer above this architecture
- [[docs/agent-communication.md]] — Communication patterns between the 7 layers
- [[docs/memory-model.md]] — Memory as one of the 7 architecture layers
- [[.claude/agents/coo.md]] — COO implements the Control layer
- [[rules/agent-rules.md]] — Agent behavior rules within this architecture
- [[.claude/memory/canonical/architecture.md]] — Living decisions that implement this design
- [[.claude/memory/canonical/anti-patterns.md]] — Failures that shaped these architectural choices
