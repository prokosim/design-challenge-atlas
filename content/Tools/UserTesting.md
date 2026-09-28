---
type: tool
id: TOOL-014
title: UserTesting
vendor: UserTesting
url: "https://www.usertesting.com"
tool_type:
  - testing-platform
  - ai
commercial_status: commercial
cost_level: quote-based
automation_level: semi-automatic
hardware_required: false
setting:
  - remote
inputs:
  - remote session video
  - screen interaction
outputs:
  - task success
  - task time
  - friction flags
  - AI summaries
domain:
  - usability
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
measures:
  - "[[Task success rate]]"
  - "[[Task completion time]]"
supports_methods:
  - "[[Usability testing]]"
sources: []
---
## What it does

Remote usability-testing platform for websites, apps and prototypes. Includes machine-learning *friction detection* that flags behaviours such as excessive clicking or scrolling, and AI-generated summaries of sessions.

## Limitations

- Aimed at screen-based digital products; not suited to physical machine panels.
- Flags friction, but does not classify use errors by a recognised taxonomy — see [[Automated use-error detection and classification]].
