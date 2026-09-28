---
type: tool
id: TOOL-008
title: Xsens Analyze
vendor: Xsens Technologies
url: "https://www.xsens.com/motion-capture/mvn-analyze"
tool_type:
  - measurement-hardware
  - analysis-software
commercial_status: commercial
cost_level: quote-based
automation_level: semi-automatic
hardware_required: true
setting:
  - field
  - lab
inputs:
  - inertial sensor data
outputs:
  - joint angles
  - segment kinematics
  - exports to ergonomic and DHM tools
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
  - "[[Inertial motion capture]]"
sources: []
---
## What it does

Inertial motion-capture suit (17 sensors) with analysis software; formerly *MVN Analyze*, brand now Xsens Technologies (previously Movella). Gives whole-body joint angles without cameras, exportable to digital human tools; add-ons provide ergonomic load reporting.

## Limitations

- Magnetic disturbance near steel structures, drift and calibration errors.
- Wrist accuracy depends on the hand segment setup (gloves optional).
- No external forces; data must still be translated into design changes — see [[From posture data to design change]].
