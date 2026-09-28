---
type: metric
id: MET-003
title: Task completion time
domain:
  - usability
metric_kind: kpi
quantity: time
unit: s
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Usability testing]]"
  - "[[Video-based behaviour coding]]"
standards:
  - "[[ISO 9241-11]]"
  - "[[ISO 25062]]"
sources: []
---
## Definition

Time from the start of a task until the user reaches the goal. The most common measure of *efficiency* in [[ISO 9241-11]].

## Calculation

Measured per attempt, usually only for successful attempts. Task times are right-skewed; report the geometric mean or median rather than the arithmetic mean.

## Targets and thresholds

Set per task — e.g. against a benchmark, a previous design, or a time budget from the process.

## Validity and limits

- Think-aloud protocols slow users down.
- Fast is not always good: in safety-critical tasks speed can come with errors.
