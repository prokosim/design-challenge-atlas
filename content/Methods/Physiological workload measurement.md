---
type: method
id: MTH-008
title: Physiological workload measurement
domain:
  - cognitive-ergonomics
method_kind: instrumented-measurement
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
sources:
  - "[[Tao et al 2019]]"
  - "[[Charles and Nixon 2019]]"
  - "[[Diarra Theurel and Paty 2025]]"
---
## What it is

Estimating mental workload continuously from body signals: EEG, heart-rate variability, pupil diameter, electrodermal activity, respiration.

## How it works

1. Record one or more signals during the task.
2. Calibrate against known low/high workload conditions for each person.
3. Derive a workload index over time windows.

## Strengths

- Continuous, does not interrupt the task.

## Limitations

- No single measure is valid across tasks; physical activity, emotion, temperature and lighting confound the signals ([[Tao et al 2019]], [[Charles and Nixon 2019]]).
- Consumer-grade devices perform poorly in dynamic real-world tasks ([[Ronca et al 2025]]).
- This is why [[Real-time cognitive workload measurement in the field]] is recorded as a gap.
