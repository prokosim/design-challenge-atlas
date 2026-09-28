---
type: method
id: MTH-012
title: Inertial motion capture
domain:
  - physical-ergonomics
method_kind: instrumented-measurement
status: proposed
evidence_level: C
origin: core
last_verified: 2026-09-28
verified_by: ""
sources: []
---
## What it is

Body-worn inertial sensors (IMUs) reconstruct whole-body posture and movement without cameras.

## How it works

1. Worker wears a set of sensors (typically ~17) on body segments.
2. Short calibration pose.
3. Software computes joint angles over time; exports to ergonomic analysis or digital human tools.

## Strengths

- Whole body, field-capable, no line-of-sight needed.

## Limitations

- Drift and magnetic disturbance near steel; calibration errors; no external forces without extra sensors.
- Getting from joint angles to a design decision is still a manual chain — see [[From posture data to design change]].
