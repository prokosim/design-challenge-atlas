---
type: metric
id: MET-006
title: Time to first fixation
domain:
  - usability
  - cognitive-ergonomics
metric_kind: quantitative
quantity: attention
unit: ms
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
methods:
  - "[[Eye-tracking study]]"
standards: []
sources:
  - "[[Holmqvist et al 2011]]"
  - "[[Onkhar Dodou and de Winter 2023]]"
---
## Definition

Time from stimulus onset (e.g. an alarm, or the start of a search task) until the participant first looks at a given area of interest — for instance the emergency stop button.

## Calculation

Computed by eye-tracking analysis software from fixations mapped onto areas of interest. Depends on the fixation filter settings.

## Targets and thresholds

Relative: compare design variants, or compare against [[Time to first correct action]] to see whether delays come from *finding* or from *deciding/acting*.

## Validity and limits

- A fixation does not prove the element was recognised.
- Wearable trackers lose accuracy in dynamic conditions ([[Onkhar Dodou and de Winter 2023]]).
