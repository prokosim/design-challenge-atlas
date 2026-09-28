---
type: method
id: MTH-009
title: Digital human simulation
domain:
  - physical-ergonomics
  - safety
method_kind: simulation
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
sources:
  - "[[He et al 2024]]"
---
## What it is

Placing virtual humans (manikins) of different body sizes into a CAD model of a product or workplace to check reach, clearance, vision and posture before anything is built.

## How it works

1. Import the CAD model.
2. Select manikins that represent the user population (e.g. 5th percentile female to 95th percentile male).
3. Position or animate them performing the task.
4. Run analyses: reach zones, vision cones, posture scores (e.g. [[RULA score]]).

## Strengths

- Early, before a prototype; cheap to test many variants.

## Limitations

- Results depend on posture realism and on the analyst.
- Models the body, not the mind: attention, decision-making and reaction under stress are largely not simulated ([[He et al 2024]]) — see [[Predicting emergency response time before a prototype exists]].
