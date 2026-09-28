---
type: metric
id: MET-012
title: Wrist angular velocity
domain:
  - physical-ergonomics
metric_kind: quantitative
quantity: posture-motion
unit: "°/s"
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Electrogoniometry]]"
  - "[[Inertial motion capture]]"
standards:
  - "[[ISO 11228-3]]"
sources:
  - "[[Arvidsson et al 2021]]"
  - "[[Hansson et al 2009]]"
---
## Definition

How fast the wrist moves — usually the median angular velocity over a working day.

## Calculation

Derived from continuous goniometer or IMU angle signals.

## Targets and thresholds

A proposed action level is a median wrist velocity of **20 °/s** over the day ([[Arvidsson et al 2021]]). It is a research proposal and has been debated — treat it as indicative.

## Validity and limits

Requires continuous measurement; cannot be estimated by eye.
