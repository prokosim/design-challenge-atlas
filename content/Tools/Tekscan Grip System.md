---
type: tool
id: TOOL-010
title: Tekscan Grip System
vendor: Tekscan Inc.
url: "https://www.tekscan.com/products-solutions/systems/grip-system"
tool_type:
  - measurement-hardware
  - analysis-software
commercial_status: commercial
cost_level: quote-based
automation_level: semi-automatic
hardware_required: true
setting:
  - lab
  - field
inputs:
  - hand pressure sensor data
outputs:
  - total grip force
  - peak pressures
  - pressure maps per hand region
domain:
  - physical-ergonomics
status: proposed
evidence_level: A
origin: core
last_verified: 2026-09-28
verified_by: ""
measures:
  - "[[Grip force]]"
supports_methods:
  - "[[Grip pressure mapping]]"
sources: []
---
## What it does

Thin (0.1 mm) pressure-sensor regions fitted to fingers and palm, with tethered or wireless electronics and software. Shows total force, peak pressure and force distribution over the hand while gripping a tool.

## Limitations

- Accuracy depends heavily on calibration.
- Measures normal force only (no shear); drift and hysteresis typical of thin-film sensors.
- The sensor changes the grip interface itself — see [[Grip force measurement on real tool handles in the field]].
