---
type: gap
id: GAP-001
title: Real-time cognitive workload measurement in the field
domain:
  - cognitive-ergonomics
gap_type:
  - poor_tool
  - missing_tool
impact: high
opportunity:
  - research
  - hardware
  - ai
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
challenges:
  - "[[Excessive cognitive workload]]"
  - "[[User error in critical interaction]]"
metrics:
  - "[[Real-time cognitive workload]]"
  - "[[NASA-TLX score]]"
methods:
  - "[[Physiological workload measurement]]"
  - "[[Workload questionnaire]]"
tools_considered:
  - "[[Emotiv EPOC X]]"
  - "[[Tobii Pro Glasses 3]]"
  - "[[NASA TLX iOS app]]"
sources:
  - "[[Tao et al 2019]]"
  - "[[Charles and Nixon 2019]]"
  - "[[Diarra Theurel and Paty 2025]]"
  - "[[Ronca et al 2025]]"
  - "[[Peysakhovich et al 2015]]"
---
## What should be measured

The operator's mental workload **continuously, during real work** — so designers can see *which moment* of an interaction (an alarm, a mode change, an emergency) overloads people.

## Decision it would support

Which information to show, hide or automate at peak moments; whether a new HMI reduces workload compared with the old one in real operation, not just in a lab.

## Current practice

A [[Workload questionnaire]] (NASA-TLX) after the task, sometimes combined with lab measurements of heart rate or pupil size.

## Why current tools are insufficient

- Questionnaires are retrospective: peaks are averaged away.
- Physiological signals are confounded by physical effort, emotion, heat and lighting; no single measure is valid across tasks ([[Tao et al 2019]], [[Charles and Nixon 2019]], [[Diarra Theurel and Paty 2025]]).
- Consumer EEG headsets separate workload levels only marginally in dynamic tasks ([[Ronca et al 2025]]); pupil size depends on light ([[Peysakhovich et al 2015]]).

## What an ideal tool would do

- **Inputs:** unobtrusive wearable signals plus task/event context from the machine.
- **Outputs:** a validated workload time-line aligned with task events, with an uncertainty band.
- **Automation:** automatic artefact rejection and minimal per-person calibration.

## Evidence

Three systematic reviews (2019–2025) and a 2025 real-world benchmark agree that no single field-ready measure exists.
