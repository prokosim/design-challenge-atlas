---
type: metric
id: MET-015
title: Reach distance
domain:
  - physical-ergonomics
  - safety
metric_kind: quantitative
quantity: reach-space
unit: mm
status: proposed
evidence_level: C
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Digital human simulation]]"
standards:
  - "[[ISO 14738]]"
  - "[[EN 894-3]]"
sources: []
---
## Definition

Distance from the operator's normal working position to a control, compared with the functional reach of the smallest intended user — i.e. whether (and how comfortably) the control can be reached.

## Calculation

`reach margin = functional reach (e.g. 5th percentile user) − required reach`. Checked in CAD with digital manikins or on a physical mock-up.

## Targets and thresholds

Positive margin for the smallest intended user, following the dimensioning principles of [[ISO 14738]].

## Validity and limits

Static reach does not capture reaching under time pressure, with gloves or while avoiding a hazard.
