---
type: tool
id: TOOL-004
title: NASA TLX iOS app
vendor: NASA Ames Research Center
url: "https://apps.apple.com/us/app/nasa-tlx/id1168110608"
tool_type:
  - survey-platform
commercial_status: free
cost_level: free
automation_level: semi-automatic
hardware_required: false
setting:
  - field
  - lab
inputs:
  - participant ratings
outputs:
  - weighted TLX score
  - subscale ratings
domain:
  - cognitive-ergonomics
status: proposed
evidence_level: A
origin: core
last_verified: 2026-09-28
verified_by: ""
measures:
  - "[[NASA-TLX score]]"
supports_methods:
  - "[[Workload questionnaire]]"
sources:
  - "[[Hart and Staveland 1988]]"
---
## What it does

NASA's official app for administering the Task Load Index, including the pairwise weighting. Works offline; studies can be set up by QR code; results exported by e-mail or file. NASA also provides an official paper-and-pencil version ([NASA TLX page](https://www.nasa.gov/human-systems-integration-division/nasa-task-load-index-tlx/)).

## Limitations

- iOS only; not updated for a long time (v1.0.3); users report export problems.
- Retrospective questionnaire — cannot give continuous, real-time workload.
