---
type: case-study
id: CASE-002
title: Hand tool ergonomics
domain:
  - physical-ergonomics
  - safety
status: proposed
evidence_level: C
origin: core
last_verified: 2026-09-28
verified_by: ""
challenges:
  - "[[Excessive hand force]]"
  - "[[Awkward wrist posture]]"
  - "[[Hand-arm vibration exposure]]"
metrics:
  - "[[Grip force]]"
  - "[[Wrist deviation angle]]"
  - "[[Wrist angular velocity]]"
  - "[[RULA score]]"
  - "[[Daily vibration exposure A(8)]]"
standards:
  - "[[EN 1005-3]]"
  - "[[ISO 11228-3]]"
  - "[[ISO 11226]]"
  - "[[ISO 5349-1]]"
  - "[[EU Directive 2002-44-EC]]"
methods:
  - "[[Grip pressure mapping]]"
  - "[[Electrogoniometry]]"
  - "[[Inertial motion capture]]"
  - "[[Video-based pose estimation]]"
  - "[[Observational ergonomic assessment]]"
  - "[[Hand-arm vibration measurement]]"
  - "[[Digital human simulation]]"
tools:
  - "[[Tekscan Grip System]]"
  - "[[Biometrics electrogoniometers]]"
  - "[[Xsens Analyze]]"
  - "[[TuMeke Risk Suite]]"
  - "[[Svantek SV 106D]]"
gaps:
  - "[[Grip force measurement on real tool handles in the field]]"
  - "[[From posture data to design change]]"
sources: []
---
## Scenario

A manufacturer is redesigning the handle of a powered hand tool (e.g. a cordless drill-driver or small grinder) used for several hours a day on an assembly line. The brief:

> *"Make the new handle easier on the hand and wrist, and let workers use the tool longer within vibration limits."*

This is an illustrative case built from the Atlas content.

## Walk-through

1. **Challenges** — [[Excessive hand force]], [[Awkward wrist posture]], [[Hand-arm vibration exposure]].

2. **Design questions** — How much grip force does the current handle require? Does the handle angle force the wrist into deviation? How fast and how often does the wrist move? How long may a worker use the tool per day?

3. **What to measure** — [[Grip force]] · [[Wrist deviation angle]] · [[Wrist angular velocity]] · [[RULA score]] · [[Daily vibration exposure A(8)]].

4. **Standards** — [[EN 1005-3]] (force limits) · [[ISO 11228-3]] (repetitive upper-limb work, 2026 edition) · [[ISO 11226]] (static postures — notably *no* numeric wrist limits) · [[ISO 5349-1]] and [[EU Directive 2002-44-EC]] (vibration measurement, action value 2.5 m/s², limit 5 m/s²).

5. **Methods**
   - *Current tool, on the line:* [[Observational ergonomic assessment]] (RULA) for a quick screen; [[Electrogoniometry]] for accurate wrist angles and velocity; [[Inertial motion capture]] or [[Video-based pose estimation]] for whole-body context; [[Hand-arm vibration measurement]] on the handle.
   - *In the lab:* [[Grip pressure mapping]] on current and prototype handles.
   - *Redesign:* [[Digital human simulation]] to compare handle angles.

6. **Tools** — [[Tekscan Grip System]] · [[Biometrics electrogoniometers]] · [[Xsens Analyze]] · [[TuMeke Risk Suite]] · [[Svantek SV 106D]].

7. **Gaps hit along the way**
   - Grip force can be measured in the lab, but the pressure glove itself changes the grip and there is no standard way to measure on the real handle during real work → [[Grip force measurement on real tool handles in the field]].
   - Posture data from the line does not flow into the digital human model where handle variants are compared; each step uses a different tool → [[From posture data to design change]].

8. **Decision** — Handle diameter and angle chosen to minimise wrist deviation and required grip force; vibration damping target set so that A(8) stays below the action value for the planned daily use time.

## What we learned

For physical ergonomics, measurement tools exist for every metric — the gaps are in **field validity** and in **connecting measurement to redesign**, not in the absence of instruments.
