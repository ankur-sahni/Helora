# Workflow: Bug Fix

Streamlined sequence for defect resolution. Faster than feature workflow — no product-owner phase.

---

## Phase 1: Reproduce & Scope (COO + Researcher)

```
COO assesses: is this a known issue? (check canonical anti-patterns)
researcher
→ Reproduces the bug (or confirms reproduction steps)
→ Identifies root cause (not just symptom)
→ Maps affected files
→ Returns: root cause analysis + affected scope
```

**Key question before planning**: Is this a symptom or the root cause?
If root cause is in a shared utility → dependency-analyst maps blast radius.

---

## Phase 2: Plan

```
planner
→ Minimal fix plan (do NOT refactor surrounding code)
→ Includes regression test addition
→ Confidence score
```

Rule: The fix scope must be tightly bounded. If fixing properly requires a larger refactor, flag it separately — don't combine.

---

## Phase 3: Implement & Test (Parallel)

```
[TRACK A]                     [TRACK B]
implementer                   tester
→ Applies minimal fix         → Confirms bug is reproducible via test
→ Adds regression test        → Runs test after fix to confirm resolved
```

Security auto-trigger: if bug was a security vulnerability → security agent audits fix.

---

## Phase 4: Review

```
reviewer
→ Confirms fix addresses root cause (not just symptom)
→ Confirms no regressions introduced
→ Confirms regression test is adequate
```

---

## Phase 5: Close

```
memory-manager → if root cause was a systemic pattern, add to anti-patterns
docs-writer    → update runbook if this was an operational issue
observability  → log resolution for incident tracking
```

---

## Hotfix Path (P0/P1 bugs only)

Compressed sequence for critical production issues:

```
1. researcher (root cause only — 10 min max)
2. planner (minimal fix plan — no refactoring)
3. implementer + security (parallel if auth/data involved)
4. tester (regression test)
5. reviewer (expedited — 1 critical check: does it fix the bug without new risk?)
6. deploy → watch for 10 min
7. post-mortem within 48h
```

## Related

- [[CLAUDE.md]] — Hard constraints all workflows must follow
- [[rules/coding-rules.md]] — Code standards during bugfix
- [[rules/project-rules.md]] — Pre-build gates apply even to fixes
- [[.claude/agents/implementer.md]] — Implementer executes fix
- [[.claude/agents/reviewer.md]] — Reviewer validates fix
- [[.claude/agents/dependency-analyst.md]] — Triggered when bug is in a shared utility
- [[.claude/memory/canonical/anti-patterns.md]] — Root cause may already be documented here; findings get added back
