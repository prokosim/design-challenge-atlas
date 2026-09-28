---
type: method
id: MTH-013
title: Video-based pose estimation
domain:
  - physical-ergonomics
method_kind: instrumented-measurement
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
sources:
  - "[[Agostinelli et al 2024]]"
---
## What it is

AI models estimate body keypoints from ordinary video and compute posture scores such as RULA or REBA automatically.

## How it works

1. Record the task with a phone or camera.
2. Upload; the software estimates 2D/3D pose per frame.
3. Joint angles are mapped to the scoring method; a report is produced.

## Strengths

- No sensors on the worker; very fast; scalable.

## Limitations

- In real workplaces exact-score agreement with experts is low, risk-level agreement moderate ([[Agostinelli et al 2024]]).
- Occlusion and camera angle matter; hands and wrists are the weakest region; forces are not measured.
