---
type: metric
id: MET-002
title: Use error rate
domain:
  - usability
  - safety
metric_kind: kpi
quantity: errors
unit: "% of opportunities"
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Usability testing]]"
  - "[[Video-based behaviour coding]]"
standards:
  - "[[IEC 62366-1]]"
  - "[[ISO 9241-11]]"
  - "[[ISO 25062]]"
sources:
  - "[[Sauro errors in UX]]"
---
## Definition

How often users perform an action (or fail to act) that leads to a result different from what the designer intended or the user expected. [[IEC 62366-1]] calls this a *use error* and treats it as a design problem, not user carelessness.

## Calculation

Two common variants:

- **Per opportunity:** `errors observed ÷ (error opportunities per task × users)`. Example: 5 opportunities × 10 users = 50; 5 errors → 10 %.
- **Per user:** share of users who made at least one error.

Errors should also be classified (slip, lapse, mistake; critical vs non-critical).

## Targets and thresholds

No universal threshold. For hazard-related tasks every observed use error is analysed individually rather than compared against a rate.

## Validity and limits

- Counting opportunities requires a task analysis ([[Hierarchical task analysis]]).
- Detection and classification are manual today — see [[Automated use-error detection and classification]].
