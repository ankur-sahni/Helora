# Workflow: Security Audit

Structured security review — for scheduled audits, pre-release checks, or post-incident reviews.

---

## Scope Definition (COO)

Before starting, define scope explicitly:
- What changed since last audit (git diff range)?
- What areas are in scope (auth, payments, data access, new endpoints)?
- What compliance requirements apply (GDPR, SOC2, PCI)?

---

## Phase 1: Automated Scans (Parallel)

```
[TRACK A]                    [TRACK B]                    [TRACK C]
Dependency audit             Secret scan                  SAST scan
pnpm audit                   grep -r for hardcoded        (if configured)
→ HIGH/CRITICAL CVEs         credentials, API keys        → code patterns
```

---

## Phase 2: Manual Audit (Security Agent)

```
security
→ Auth & authorization review
→ Input validation coverage
→ Data exposure analysis
→ Infrastructure configuration review
→ Third-party integration audit
```

Outputs: categorized findings (CRITICAL / HIGH / MEDIUM / LOW)

---

## Phase 3: Council Review (if CRITICAL findings)

If CRITICAL findings exist:
```
council/improvement → verifies findings are real (no false positives)
council/keenness    → identifies what else might be affected (blast radius of vuln)
```

---

## Phase 4: Remediation Planning

```
planner → creates prioritized fix plan
  → CRITICAL: fix immediately, block release
  → HIGH: fix this sprint
  → MEDIUM: fix next sprint, document
  → LOW: backlog with tracking ticket
```

---

## Phase 5: Fix + Re-Audit

```
implementer → applies fixes
security    → re-audits fixed items specifically
reviewer    → confirms fixes don't introduce new issues
```

---

## Phase 6: Documentation

```
docs-writer → updates security.md with:
  → Audit date, scope, findings summary
  → Remediation status
  → Remaining accepted risks (with rationale)

memory-manager → adds findings to canonical anti-patterns
```

---

## Audit Cadence

| Trigger | Depth |
|---------|-------|
| Every PR touching auth/payments | Automatic (security agent auto-trigger) |
| Pre-release | Full audit (this workflow) |
| Monthly | Dependency audit + secret scan |
| Post-incident | Full audit focused on incident area |
| New team member granted prod access | Auth + permissions review |
