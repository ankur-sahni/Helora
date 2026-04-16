# Observability Design

How the system monitors itself, detects problems, and produces a cost + health record.

---

## What Gets Logged

Every agent action emits a structured event:

```json
{
  "event_id": "uuid",
  "timestamp": "ISO8601",
  "agent_id": "planner",
  "task_id": "task-identifier",
  "session_id": "session-identifier",
  "action": "produced-implementation-plan",
  "cognition_mode": "planning",
  "model": "claude-sonnet-4-6",
  "tokens_in": 1240,
  "tokens_out": 890,
  "duration_ms": 4200,
  "outcome": "success",
  "confidence_score": 82,
  "notes": ""
}
```

---

## Alert Thresholds

| Metric | Warn | Stop / Escalate |
|--------|------|----------------|
| Agent confidence | < 70% | < 60% → council |
| Task budget used | > 80% | > 100% → hard stop |
| Consecutive test failures | 2 | 3 → researcher |
| Agent failure rate | 1 failure | 2 consecutive → investigate |
| Security finding | HIGH | CRITICAL → blocked |
| Task progress | - | > 5 agent calls, no completion → loop suspected |

---

## Log Storage

```
.claude/memory/agents/observability/
├── sessions/
│   └── [session-id].jsonl     # One event per line, per session
├── alerts/
│   └── [YYYY-MM-DD].md        # Human-readable alerts
└── metrics/
    └── summary.md             # Running totals updated per session
```

---

## Cost Tracking

Every session produces a cost record:

```
Session [id] | Date | Agents used | Total tokens | Est. cost
```

Aggregated weekly by Budget Tracker:
- Cost per task type (feature vs. bugfix vs. audit)
- Cost per agent (identify expensive agents)
- Cost per workflow phase (identify expensive phases)
- Trend over time (is cost growing?)

---

## Health Signals

### Green
- All tasks completing within budget
- Confidence scores averaging > 75%
- Security findings: LOW or none per week
- Council convened < 20% of tasks

### Yellow (investigate)
- Single task exceeds budget
- Confidence averaging 60–75%
- Repeated security findings of same class
- Council convened > 30% of tasks

### Red (act immediately)
- Multiple tasks hitting hard caps
- Confidence trending below 60%
- CRITICAL security finding shipped
- System in apparent loop (COO flag)

---

## Debug Replay

Every session log is a complete audit trail:
- Reconstruct exactly what happened, in what order
- Identify which agent made a wrong decision
- Identify where a cascade failure started
- Identify token spend concentrated in one step

Retrospective agent uses session logs as primary input for system improvement analysis.
