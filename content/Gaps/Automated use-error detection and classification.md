---
type: gap
id: GAP-002
title: Automated use-error detection and classification
domain:
  - usability
  - safety
gap_type:
  - manual_process
  - missing_tool
impact: high
opportunity:
  - ai
  - software
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
challenges:
  - "[[User error in critical interaction]]"
metrics:
  - "[[Use error rate]]"
  - "[[Error recovery time]]"
  - "[[Time to first correct action]]"
methods:
  - "[[Video-based behaviour coding]]"
  - "[[Usability testing]]"
tools_considered:
  - "[[Noldus The Observer XT]]"
  - "[[UserTesting]]"
sources:
  - "[[MeasuringU 2026 AI usability problems]]"
---
## What should be measured

Every use error in a usability test — when it happened, what kind it was (slip, lapse, mistake; critical or not) and how the user recovered.

## Decision it would support

Which interface elements cause errors, whether a redesign reduced them, and — for safety-related products — whether residual use-related risk is acceptable ([[IEC 62366-1]]).

## Current practice

Researchers watch session videos and code events by hand in tools like [[Noldus The Observer XT]] — often several hours of coding per hour of video, ideally with two coders.

## Why current tools are insufficient

- Coding tools organise manual work but do not detect errors.
- Remote platforms flag "friction" (e.g. rage clicks) for screen-based products only, without an error taxonomy ([[UserTesting]]).
- General AI models give plausible but unvalidated and inconsistent interpretations of usability video ([[MeasuringU 2026 AI usability problems]]).
- For physical products (machine panels, medical devices) there is nothing.

## What an ideal tool would do

- **Inputs:** synchronised video, audio, machine/interface logs, the task model.
- **Outputs:** time-stamped, classified use errors with confidence scores, ready for human confirmation.
- **Automation:** proposes codes; the researcher confirms — with published agreement against expert coders.

## Evidence

Market scan (September 2026) found no product that detects *and* classifies use errors from usability-test video with published validation.
