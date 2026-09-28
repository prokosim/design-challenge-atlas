---
type: gap
id: GAP-004
title: Grip force measurement on real tool handles in the field
domain:
  - physical-ergonomics
gap_type:
  - poor_tool
  - expensive_tool
impact: medium
opportunity:
  - hardware
  - research
status: proposed
evidence_level: C
origin: core
last_verified: 2026-09-28
verified_by: ""
challenges:
  - "[[Excessive hand force]]"
metrics:
  - "[[Grip force]]"
methods:
  - "[[Grip pressure mapping]]"
tools_considered:
  - "[[Tekscan Grip System]]"
sources: []
---
## What should be measured

The grip force workers actually apply to a real tool handle during real work — including force distribution across the hand — to compare handle designs.

## Decision it would support

Handle diameter, shape, material and trigger force; whether a new design keeps forces within recommended limits ([[EN 1005-3]]).

## Current practice

Lab studies with custom-built instrumented handles, or thin-film pressure gloves.

## Why current tools are insufficient

- Instrumented handles are custom-built per tool — expensive and not comparable between studies.
- Pressure-mapping gloves measure normal force only, need careful calibration, drift, and change the grip interface they are measuring ([[Tekscan Grip System]]).

## What an ideal tool would do

- **Inputs:** force/pressure sensing built into a thin, standard handle sleeve or the tool itself.
- **Outputs:** calibrated grip force (N) and distribution over time, synchronised with task events.
- **Automation:** self-calibrating; comparison against population strength data.

## Evidence

Vendor documentation and sensor literature; needs a stronger source on field studies.
