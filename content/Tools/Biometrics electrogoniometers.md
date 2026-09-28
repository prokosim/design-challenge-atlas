---
type: tool
id: TOOL-009
title: Biometrics electrogoniometers
vendor: Biometrics Ltd
url: "https://www.biometricsltd.com/goniometer.htm"
tool_type:
  - measurement-hardware
commercial_status: commercial
cost_level: quote-based
automation_level: semi-automatic
hardware_required: true
setting:
  - field
  - lab
inputs:
  - joint angle signal
outputs:
  - wrist flexion/extension and deviation angles
  - angular velocity
domain:
  - physical-ergonomics
status: proposed
evidence_level: A
origin: core
last_verified: 2026-09-28
verified_by: ""
measures:
  - "[[Wrist deviation angle]]"
  - "[[Wrist angular velocity]]"
supports_methods:
  - "[[Electrogoniometry]]"
sources:
  - "[[Hansson et al 2009]]"
---
## What it does

Twin-axis flexible electrogoniometers (e.g. SG65/SG75 for the wrist, wired or wireless) with portable data loggers aimed at workplace ergonomics. Stated accuracy about ±2° over ±90°.

## Limitations

- One joint per sensor; skin movement and axis crosstalk (especially with forearm rotation).
- Sensors are delicate.
