---
type: tool
id: TOOL-013
title: Emotiv EPOC X
vendor: Emotiv
url: "https://www.emotiv.com/products/epoc-x"
tool_type:
  - measurement-hardware
commercial_status: commercial
automation_level: automatic
hardware_required: true
setting:
  - lab
  - field
inputs:
  - "14-channel EEG"
outputs:
  - EEG signals
  - "performance metrics (stress, engagement, attention …)"
domain:
  - cognitive-ergonomics
status: proposed
evidence_level: A
origin: core
last_verified: 2026-09-28
verified_by: ""
measures:
  - "[[Real-time cognitive workload]]"
supports_methods:
  - "[[Physiological workload measurement]]"
sources:
  - "[[Ronca et al 2025]]"
---
## What it does

14-channel wireless EEG headset with saline electrodes. The vendor software provides "performance metrics" such as stress, engagement and attention — but no metric explicitly called workload.

## Limitations

- In a real-world benchmark it separated workload levels only marginally and suffered from artefacts in dynamic tasks ([[Ronca et al 2025]]).
- Needs per-person baselines; long analysis windows limit real-time use.
