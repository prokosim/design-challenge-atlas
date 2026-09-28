---
type: tool
id: TOOL-006
title: Siemens Process Simulate Human
vendor: Siemens Digital Industries Software
url: "https://www.dex.siemens.com/plm/tecnomatix/process-simulate-human"
tool_type:
  - simulation
commercial_status: commercial
cost_level: quote-based
automation_level: semi-automatic
hardware_required: false
setting:
  - desktop
inputs:
  - CAD model
  - process data
  - optional motion capture
outputs:
  - reach and vision analyses
  - RULA / NIOSH / OWAS / EAWS scores
  - posture and strength predictions
domain:
  - physical-ergonomics
  - manufacturing
status: proposed
evidence_level: A
origin: core
last_verified: 2026-09-28
verified_by: ""
measures:
  - "[[Reach distance]]"
  - "[[RULA score]]"
  - "[[Wrist deviation angle]]"
supports_methods:
  - "[[Digital human simulation]]"
sources:
  - "[[He et al 2024]]"
---
## What it does

Digital human simulation in the Tecnomatix portfolio, built on the former **Jack** technology. Places scalable manikins in CAD scenes and runs ergonomic analyses: reach, vision, RULA, NIOSH lifting, OWAS, EAWS, fatigue and more.

## Limitations

- Posture realism depends on the analyst and on posture prediction.
- Physical ergonomics only: attention, decision-making and reaction time are not simulated — see [[Predicting emergency response time before a prototype exists]].
- Expensive and requires specialist training.
