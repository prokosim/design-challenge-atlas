---
type: metric
id: MET-011
title: Wrist deviation angle
domain:
  - physical-ergonomics
metric_kind: quantitative
quantity: posture-motion
unit: degrees
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Electrogoniometry]]"
  - "[[Observational ergonomic assessment]]"
  - "[[Inertial motion capture]]"
  - "[[Video-based pose estimation]]"
  - "[[Digital human simulation]]"
standards:
  - "[[ISO 11226]]"
  - "[[ISO 11228-3]]"
sources:
  - "[[Delleman and Dul 2007]]"
  - "[[McAtamney and Corlett 1993]]"
  - "[[Hansson et al 2009]]"
---
## Definition

Angle of the wrist away from neutral: flexion/extension and radial/ulnar deviation, measured during the task.

## Calculation

From continuous measurement: angle percentiles over the task (e.g. 10th, 50th, 90th). From observation: the angle band of the worst posture.

## Targets and thresholds

- [[ISO 11226]] gives **no numeric wrist limits** — only "avoid extreme positions" ([[Delleman and Dul 2007]]).
- RULA scores wrist flexion/extension above 15° higher, and adds a point for deviation ([[McAtamney and Corlett 1993]]) — a scoring band, not a validated limit.
- Exposure varies strongly within one job title, so measure rather than estimate ([[Hansson et al 2009]]).

## Validity and limits

Video-based estimation is weakest at the hands and wrists ([[Agostinelli et al 2024]]).
