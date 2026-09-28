---
type: metric
id: MET-008
title: Real-time cognitive workload
domain:
  - cognitive-ergonomics
metric_kind: derived
quantity: workload
unit: index (device-specific)
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Physiological workload measurement]]"
  - "[[Eye-tracking study]]"
standards: []
sources:
  - "[[Tao et al 2019]]"
  - "[[Charles and Nixon 2019]]"
  - "[[Peysakhovich et al 2015]]"
---
## Definition

A continuous estimate of mental workload *during* a task, derived from physiological signals (EEG, heart-rate variability, pupil diameter, skin conductance).

## Calculation

Device- and model-specific: signals are windowed (often ≥ 10 s), features extracted and mapped to a workload index after per-person calibration.

## Targets and thresholds

None established.

## Validity and limits

- No single signal is valid across tasks; physical activity, emotion, heat and light confound the measures ([[Tao et al 2019]], [[Peysakhovich et al 2015]]).
- This is the central problem described in [[Real-time cognitive workload measurement in the field]].
