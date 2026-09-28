---
type: metric
id: MET-014
title: Daily vibration exposure A(8)
domain:
  - physical-ergonomics
  - safety
metric_kind: threshold
quantity: vibration
unit: "m/s²"
status: proposed
evidence_level: A
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Hand-arm vibration measurement]]"
standards:
  - "[[ISO 5349-1]]"
  - "[[EU Directive 2002-44-EC]]"
sources: []
---
## Definition

Hand-arm vibration exposure normalised to an 8-hour working day.

## Calculation

`A(8) = a_hv · √(T / 8 h)`, where a_hv is the vibration total value (root-sum-of-squares of the three frequency-weighted axes) and T the daily exposure time. For several tools: `A(8) = √( Σ a_hvi² · T_i / 8 h )` ([[ISO 5349-1]]).

## Targets and thresholds

EU action value **2.5 m/s²**, limit value **5 m/s²** ([[EU Directive 2002-44-EC]]).

## Validity and limits

Exposure time T is often estimated rather than measured; measurement uncertainty is considerable.
