---
type: tool
id: TOOL-007
title: IPS IMMA
vendor: Industrial Path Solutions
url: "https://industrialpathsolutions.se/ips-imma/"
tool_type:
  - simulation
commercial_status: commercial
cost_level: quote-based
automation_level: automatic
hardware_required: false
setting:
  - desktop
inputs:
  - CAD model
  - task description
outputs:
  - collision-free manikin motion
  - ergonomic assessment scores
domain:
  - physical-ergonomics
  - manufacturing
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
measures:
  - "[[Reach distance]]"
  - "[[RULA score]]"
supports_methods:
  - "[[Digital human simulation]]"
sources: []
---
## What it does

Digital human modelling tool (Intelligently Moving Manikins) that *automatically* generates collision-free motion for families of manikins representing anthropometric diversity. Developed with Fraunhofer-Chalmers Centre. Secondary literature reports ergonomic assessments such as RULA, REBA, OWAS and EAWS.

## Limitations

- Vendor does not publish a full list of assessment methods.
- Focused on assembly and manufacturing; cognition is not modelled.
