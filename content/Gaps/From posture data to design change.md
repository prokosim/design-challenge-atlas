---
type: gap
id: GAP-005
title: From posture data to design change
domain:
  - physical-ergonomics
gap_type:
  - fragmented_workflow
  - missing_integration
impact: medium
opportunity:
  - software
  - automation
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
challenges:
  - "[[Awkward wrist posture]]"
metrics:
  - "[[Wrist deviation angle]]"
  - "[[RULA score]]"
methods:
  - "[[Inertial motion capture]]"
  - "[[Video-based pose estimation]]"
  - "[[Digital human simulation]]"
tools_considered:
  - "[[Xsens Analyze]]"
  - "[[TuMeke Risk Suite]]"
  - "[[Siemens Process Simulate Human]]"
sources:
  - "[[Agostinelli et al 2024]]"
---
## What should be measured

Not a new quantity — the gap is the **workflow**: from measured postures of real workers to a quantified comparison of *redesigned* tools or workstations.

## Decision it would support

Which design change (handle angle, work height, tool orientation) reduces wrist deviation and RULA score the most, before building it.

## Current practice

Postures are measured with IMU suits or video, exported, scored in a spreadsheet or separate tool, and then manually re-created in a digital human model to try design variants.

## Why current tools are insufficient

- Each step is a different tool with manual export/import.
- Video-based scoring is fast but its exact scores agree poorly with experts in real workplaces, especially for wrists ([[Agostinelli et al 2024]]).
- Measured data rarely flows back into CAD as a design constraint.

## What an ideal tool would do

- **Inputs:** field posture recordings + CAD of the current design.
- **Outputs:** risk scores for the current design and predicted scores for variants, traceable to the measurements.
- **Automation:** one pipeline from recording to design comparison.

## Evidence

Validation study of video-based tools; vendor documentation of export options.
