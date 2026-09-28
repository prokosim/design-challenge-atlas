---
type: tool
id: TOOL-012
title: TuMeke Risk Suite
vendor: TuMeke
url: "https://www.tumeke.io"
tool_type:
  - ai
  - analysis-software
commercial_status: commercial
cost_level: quote-based
automation_level: automatic
hardware_required: false
setting:
  - field
  - remote
inputs:
  - smartphone video
outputs:
  - RULA / REBA scores
  - NIOSH lifting results
  - joint angles
domain:
  - physical-ergonomics
status: proposed
evidence_level: A
origin: core
last_verified: 2026-09-28
verified_by: ""
measures:
  - "[[RULA score]]"
  - "[[Wrist deviation angle]]"
supports_methods:
  - "[[Video-based pose estimation]]"
sources:
  - "[[Agostinelli et al 2024]]"
---
## What it does

Turns smartphone or uploaded video into 3D pose estimates and computes ergonomic assessments such as RULA, REBA and the NIOSH lifting equation, with automatic reports.

## Limitations

- No independent accuracy data on the vendor page.
- Video pose estimation generally agrees poorly with experts on exact scores in real workplaces, especially for hands and wrists ([[Agostinelli et al 2024]]).
