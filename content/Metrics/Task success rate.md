---
type: metric
id: MET-001
title: Task success rate
domain:
  - usability
  - safety
metric_kind: kpi
quantity: success
unit: "%"
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Usability testing]]"
standards:
  - "[[ISO 9241-11]]"
  - "[[ISO 25062]]"
  - "[[IEC 62366-1]]"
sources:
  - "[[Lewis and Sauro 2018]]"
---
## Definition

The share of task attempts in which the user reaches the task goal without outside help. The main measure of *effectiveness* in [[ISO 9241-11]].

## Calculation

`successful attempts ÷ all attempts × 100 %`. Define beforehand what counts as success (goal reached? within a time limit? without critical errors?) and whether partial success is scored.

## Targets and thresholds

Set per task and risk. For safety-critical tasks (e.g. stopping a machine in an emergency) the practical target is that **every** participant succeeds, and every failure is analysed for its root cause (the approach of [[IEC 62366-1]]).

## Validity and limits

- Small samples give wide confidence intervals — report them.
- Says nothing about *how hard* success was; combine with [[Task completion time]] and [[Use error rate]].
