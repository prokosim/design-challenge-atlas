---
type: gap
id: GAP-003
title: Predicting emergency response time before a prototype exists
domain:
  - usability
  - safety
  - cognitive-ergonomics
gap_type:
  - missing_tool
  - missing_integration
impact: high
opportunity:
  - research
  - software
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
challenges:
  - "[[User error in critical interaction]]"
  - "[[Poor discoverability of controls]]"
  - "[[Unreachable controls]]"
metrics:
  - "[[Time to first correct action]]"
methods:
  - "[[Digital human simulation]]"
tools_considered:
  - "[[Siemens Process Simulate Human]]"
  - "[[IPS IMMA]]"
sources:
  - "[[He et al 2024]]"
---
## What should be measured

How long an operator would need, from an alarm, to find, reach and actuate the right control (e.g. the emergency stop) — **in the CAD phase**, before a physical prototype exists.

## Decision it would support

Where to place and how to mark emergency controls; comparing panel layouts early, when changes are cheap.

## Current practice

Reach and visibility are checked with [[Digital human simulation]]; the *time* to respond is only measured later in [[Usability testing]] on a prototype. [[ISO 13850]] requires the stop to be identifiable and accessible but gives no time target.

## Why current tools are insufficient

- Digital human tools simulate the body (reach, posture, vision cones), not perception, attention and decision-making; cognitive digital human modelling is far less developed ([[He et al 2024]]).
- Visual-search and reaction-time models exist in research but are not integrated with CAD/DHM workflows.

## What an ideal tool would do

- **Inputs:** CAD panel layout, colours/markings, operator position, alarm type.
- **Outputs:** predicted distribution of time to first correct action for a user population, with the bottleneck (search, decision or movement).
- **Automation:** runs as an analysis inside the DHM tool.

## Evidence

Based on the DHM literature review and on vendor documentation of the analyses offered.
