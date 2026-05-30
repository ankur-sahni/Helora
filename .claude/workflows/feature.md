# Workflow: Feature Development

Standard sequence for building a new feature. Follow this order.

---

## Phase 1: Intake & Routing (COO + Dispatcher)

```
COO receives request
  → Outputs routing rationale
  → Dispatcher audits (mandatory triggers? parallel opportunities?)
  → Routing confirmed or corrected
```

**Parallel gate**: Can anything in Phase 2 run simultaneously? Usually yes.

---

## Phase 2: Discovery (Parallel)

Run these two in PARALLEL:

```
[TRACK A]                          [TRACK B]
researcher                         dependency-analyst
→ Maps current codebase            → Maps blast radius
→ Returns research summary         → Returns dependency map + blast score
```

If blast score ≥ 7: escalate to council before Phase 3.

---

## Phase 3: Requirements (if user-facing)

```
product-owner
→ Reads researcher summary
→ Produces: user story + acceptance criteria + success metrics + risks
```

Skip if purely internal/infra change.

---

## Phase 4: Planning

```
planner
→ Reads: researcher summary + dependency map + product brief
→ Reads: canonical patterns + anti-patterns + decisions
→ Produces: implementation plan with confidence score
```

**Confidence gate**:
- ≥ 80%: proceed to Phase 5
- 60–79%: flag uncertainties, proceed with caution flags in plan
- < 60%: convene council before implementation

---

## Phase 5: Council (if triggered)

Run three council members IN PARALLEL:

```
[council/evolution] [council/improvement] [council/keenness]
    Round 1: Independent analysis (parallel)
    Round 2: Cross-read and respond (parallel, after all Round 1 outputs ready)
    Hard stop: consensus OR 3 rounds max
```

COO synthesizes council output → revised plan or green light.

---

## Phase 6: Implementation (Parallel with Test Prep)

```
[TRACK A]                          [TRACK B]
implementer                        tester
→ Follows plan step by step        → Reviews plan
→ Typecheck after each step        → Identifies test files to update
→ Reports deviations               → Prepares test scaffolding
```

Security auto-trigger check:
- If changes touch auth/payments/user data → security agent runs BEFORE review

---

## Phase 7: Review Gates (Sequential)

```
1. security (if triggered) → BLOCKED stops here
2. reviewer → verdict required
3. tester (final run) → all tests must pass
```

---

## Phase 8: Documentation & Memory

```
[PARALLEL]
docs-writer → updates relevant docs
memory-manager → writes durable decisions to canonical memory
observability → logs session metrics
budget-tracker → produces cost report
```

---

## Phase 9: COO Synthesis

```
COO runs 6-point checklist
→ Produces final synthesis output for human
→ Flags any watch points or follow-up items
```

---

## Abort Conditions

Stop the workflow immediately if:
- Security agent returns BLOCKED
- Implementer deviation risk = high and no plan update
- Budget tracker hits hard cap
- Same test fails 3+ times (trigger researcher before retry)

## Related

- [[CLAUDE.md]] — Hard constraints all workflows must follow
- [[rules/project-rules.md]] — Pre-build gates for features
- [[.claude/agents/planner.md]] — Planner executes Phase 4
- [[.claude/agents/implementer.md]] — Implementer executes Phase 6
- [[.claude/agents/reviewer.md]] — Reviewer gates Phase 7
- [[.claude/agents/security.md]] — Security auto-trigger in Phase 6 (auth/payments changes)
- [[.claude/agents/dependency-analyst.md]] — Phase 2 parallel track alongside Researcher
- [[.claude/agents/budget-tracker.md]] — Runs alongside all phases; hard-stops at cap
- [[docs/architecture.md]] — End-to-End Execution Flow this workflow implements
