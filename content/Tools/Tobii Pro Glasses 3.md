---
type: tool
id: TOOL-001
title: Tobii Pro Glasses 3
vendor: Tobii AB
url: "https://www.tobii.com/products/eye-trackers/wearables/tobii-pro-glasses-3"
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
  - gaze
  - scene video
outputs:
  - gaze position
  - pupil diameter
  - head motion (IMU)
  - scene video
domain:
  - usability
  - cognitive-ergonomics
status: proposed
evidence_level: A
origin: core
last_verified: 2026-09-28
verified_by: ""
measures:
  - "[[Time to first fixation]]"
  - "[[Real-time cognitive workload]]"
supports_methods:
  - "[[Eye-tracking study]]"
sources:
  - "[[Onkhar Dodou and de Winter 2023]]"
---
## What it does

Wearable eye tracker for real-world settings: binocular gaze at 50 or 100 Hz, pupil measurement, head-motion sensors and a wide-angle scene camera. Metrics such as fixations and [[Time to first fixation]] are computed in analysis software, e.g. [[Tobii Pro Lab]].

## Limitations

- Needs per-participant calibration; around 1¾ h battery per recording.
- Accuracy drops in dynamic conditions ([[Onkhar Dodou and de Winter 2023]]).
- Pupil size as a workload index is confounded by lighting — it is listed under [[Real-time cognitive workload]] only as a partial, insufficient option.
