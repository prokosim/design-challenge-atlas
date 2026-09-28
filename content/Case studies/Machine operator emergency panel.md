---
type: case-study
id: CASE-001
title: Machine operator emergency panel
domain:
  - usability
  - safety
  - cognitive-ergonomics
status: proposed
evidence_level: C
origin: core
last_verified: 2026-09-28
verified_by: ""
challenges:
  - "[[User error in critical interaction]]"
  - "[[Poor discoverability of controls]]"
  - "[[Excessive cognitive workload]]"
  - "[[Unreachable controls]]"
metrics:
  - "[[Time to first correct action]]"
  - "[[Use error rate]]"
  - "[[Task success rate]]"
  - "[[Time to first fixation]]"
  - "[[NASA-TLX score]]"
  - "[[Reach distance]]"
standards:
  - "[[ISO 13850]]"
  - "[[IEC 60204-1]]"
  - "[[ISO 14738]]"
  - "[[ISO 9241-11]]"
  - "[[IEC 62366-1]]"
methods:
  - "[[Hierarchical task analysis]]"
  - "[[Heuristic evaluation]]"
  - "[[Digital human simulation]]"
  - "[[Usability testing]]"
  - "[[Eye-tracking study]]"
  - "[[Workload questionnaire]]"
  - "[[Video-based behaviour coding]]"
tools:
  - "[[Siemens Process Simulate Human]]"
  - "[[Tobii Pro Glasses 3]]"
  - "[[Tobii Pro Lab]]"
  - "[[Noldus The Observer XT]]"
  - "[[NASA TLX iOS app]]"
gaps:
  - "[[Predicting emergency response time before a prototype exists]]"
  - "[[Automated use-error detection and classification]]"
  - "[[Real-time cognitive workload measurement in the field]]"
sources: []
---
## Scenario

A design team is redesigning the control panel of an industrial machine. The key question from the brief:

> *"Can the operator use the panel safely — in particular, stop the machine quickly and correctly in an emergency?"*

This is an illustrative case built from the Atlas content, showing how a designer moves along the chain.

## Walk-through

1. **Challenge** — The worry is [[User error in critical interaction]]: pressing the wrong button, or not finding the stop in time. Closely related: [[Poor discoverability of controls]], [[Unreachable controls]] and, at alarm time, [[Excessive cognitive workload]].

2. **Design questions** — Can every operator reach the emergency stop from every working position? How long from an alarm until the stop is pressed? Where do operators look first? Which steps cause errors? Is the alarm moment overloading?

3. **What to measure** — [[Reach distance]] · [[Time to first correct action]] · [[Time to first fixation]] · [[Use error rate]] · [[Task success rate]] · [[NASA-TLX score]].

4. **Standards** — [[ISO 13850]] and [[IEC 60204-1]] fix the *design conventions* (latching red actuator on yellow background, reset behaviour) but give **no response-time target**. [[ISO 14738]] guides reach dimensions. [[IEC 62366-1]] is borrowed as a process model for safety-related usability; [[ISO 9241-11]] frames the usability measures.

5. **Methods, in project order**
   - *Concept (CAD):* [[Hierarchical task analysis]] of the emergency task → [[Heuristic evaluation]] of the layout → [[Digital human simulation]] for reach and visibility with 5th–95th percentile manikins.
   - *Prototype:* scenario-based [[Usability testing]] with a surprise alarm, recorded on video and with wearable [[Eye-tracking study|eye tracking]]; [[Workload questionnaire]] after each scenario; errors coded with [[Video-based behaviour coding]].

6. **Tools** — [[Siemens Process Simulate Human]] (reach, vision) · [[Tobii Pro Glasses 3]] + [[Tobii Pro Lab]] (time to first fixation) · [[Noldus The Observer XT]] (errors, response times) · [[NASA TLX iOS app]] (workload).

7. **Gaps hit along the way**
   - In the CAD phase the team can check *whether* the stop is reachable and visible, but **not how long** operators will need → [[Predicting emergency response time before a prototype exists]].
   - Coding errors and response times from hours of video is the most time-consuming step → [[Automated use-error detection and classification]].
   - Workload is only known *after* each scenario, not at the alarm moment itself → [[Real-time cognitive workload measurement in the field]].

8. **Decision** — Layout variant chosen on reach margin and time to first fixation; final acceptance based on 100 % task success on the emergency scenario and root-cause analysis of every observed use error.

## What we learned

The chain works end to end for *physical* questions (reach, visibility). For the question that matters most — *how fast will a surprised operator react?* — the tooling stops at the prototype stage. That is exactly the kind of insight the Atlas is meant to surface.
