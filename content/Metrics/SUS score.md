---
type: metric
id: MET-009
title: SUS score
domain:
  - usability
metric_kind: derived
quantity: satisfaction
unit: "score 0–100"
status: proposed
evidence_level: A
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Standardized usability questionnaire]]"
standards:
  - "[[ISO 9241-11]]"
  - "[[ISO 25062]]"
sources:
  - "[[Brooke 1996]]"
  - "[[Lewis and Sauro 2018]]"
  - "[[Bangor Kortum and Miller 2009]]"
---
## Definition

Perceived usability measured with the 10-item System Usability Scale (5-point agreement, alternating positive and negative items).

## Calculation

Odd items: response − 1. Even items: 5 − response. Sum × 2.5 → 0–100. (The result is **not** a percentage.)

## Targets and thresholds

- **68** is the median of a large benchmark database — the centre of a "C" grade ([[Lewis and Sauro 2018]]).
- Adjective anchors: mean score ≈ 71 for "Good", ≈ 86 for "Excellent" ([[Bangor Kortum and Miller 2009]]).

## Validity and limits

Measures perception, not performance; a high SUS does not rule out critical use errors.
