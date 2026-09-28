---
type: metric
id: MET-007
title: NASA-TLX score
domain:
  - cognitive-ergonomics
  - usability
metric_kind: derived
quantity: workload
unit: "score 0–100"
status: proposed
evidence_level: A
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Workload questionnaire]]"
standards: []
sources:
  - "[[Hart and Staveland 1988]]"
  - "[[Hart 2006]]"
---
## Definition

Subjective workload rating from the NASA Task Load Index: six dimensions — mental demand, physical demand, temporal demand, performance, effort, frustration.

## Calculation

Each dimension rated 0–100 (steps of 5). **Weighted TLX:** 15 pairwise comparisons give each dimension a weight 0–5 (sum 15); overall = Σ(rating × weight) ÷ 15. **Raw TLX:** mean of the six ratings. Neither version is consistently more sensitive ([[Hart 2006]]).

## Targets and thresholds

No absolute cut-offs are defined by the method; use it to compare design variants or conditions.

## Validity and limits

- Retrospective and subjective; does not show peaks during the task.
- See [[Real-time cognitive workload]] for continuous alternatives and their problems.
