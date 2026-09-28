---
type: metric
id: MET-004
title: Time to first correct action
domain:
  - usability
  - safety
metric_kind: kpi
quantity: time
unit: s
status: proposed
evidence_level: C
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Usability testing]]"
  - "[[Video-based behaviour coding]]"
  - "[[Eye-tracking study]]"
standards:
  - "[[ISO 13850]]"
  - "[[IEC 62366-1]]"
sources: []
---
## Definition

Time from a trigger (alarm, visual cue, instruction) until the user performs the first *correct* action — for example actuating the emergency stop. It captures detection, decision and movement in one number.

## Calculation

`t(first correct action) − t(trigger)`, coded from synchronised video or event logs. Wrong actions before the correct one are recorded separately as use errors.

## Targets and thresholds

No standard gives a numeric target. [[ISO 13850]] requires the emergency stop to be readily identifiable and accessible, but does not say how fast. Targets therefore come from the risk assessment (how fast must the hazard be stopped?).

## Validity and limits

- Strongly depends on how realistic the scenario is (surprise, stress).
- Can only be measured on a prototype today — see [[Predicting emergency response time before a prototype exists]].
