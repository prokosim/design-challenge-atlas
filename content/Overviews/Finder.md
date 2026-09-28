---
title: Finder
description: "A guided path: design challenge → what to measure → how → with which tool → where no tool exists."
generated: true
---

> [!abstract] Generated page
> A guided path: design challenge → what to measure → how → with which tool → where no tool exists.
> This page is rebuilt automatically from note properties — do not edit it by hand. Change the underlying notes instead.

## Step 1 — What are you trying to evaluate?

Pick the area your design problem belongs to, then the challenge that fits best.

### Usability

- [[Low perceived usability]] → measure: [[SUS score]], [[Task completion time]]
- [[Poor discoverability of controls]] → measure: [[Time to first fixation]], [[Time to first correct action]], [[Task success rate]]
- [[User error in critical interaction]] → measure: [[Use error rate]], [[Task success rate]], [[Time to first correct action]], [[Error recovery time]]

### Cognitive ergonomics

- [[Excessive cognitive workload]] → measure: [[NASA-TLX score]], [[Real-time cognitive workload]]
- [[Low operator trust in automation]] → measure: —

### Physical ergonomics

- [[Awkward wrist posture]] → measure: [[Wrist deviation angle]], [[Wrist angular velocity]], [[RULA score]]
- [[Excessive hand force]] → measure: [[Grip force]]
- [[Hand-arm vibration exposure]] → measure: [[Daily vibration exposure A(8)]]
- [[Unreachable controls]] → measure: [[Reach distance]]

### Safety

- [[Hand-arm vibration exposure]] → measure: [[Daily vibration exposure A(8)]]
- [[Low operator trust in automation]] → measure: —
- [[Unreachable controls]] → measure: [[Reach distance]]
- [[User error in critical interaction]] → measure: [[Use error rate]], [[Task success rate]], [[Time to first correct action]], [[Error recovery time]]

*No challenges yet in:* accessibility, logistics, manufacturing, sustainability. [[How to contribute|Add one →]]

## Step 2 — What do you want to measure?

If you already know the kind of quantity, start here. Each metric page lists methods, tools and known gaps.

| Quantity | Metric | How to measure | Tools | Tool coverage |
| --- | --- | --- | --- | --- |
| time | [[Error recovery time]] | [[Video-based behaviour coding]], [[Usability testing]] | [[Noldus The Observer XT]] | 🟠 known gap |
| time | [[Task completion time]] | [[Usability testing]], [[Video-based behaviour coding]] | [[Noldus The Observer XT]], [[UserTesting]] | 🟢 covered |
| time | [[Time to first correct action]] | [[Usability testing]], [[Video-based behaviour coding]], [[Eye-tracking study]] | [[Noldus The Observer XT]] | 🟠 known gap |
| errors | [[Use error rate]] | [[Usability testing]], [[Video-based behaviour coding]] | [[Noldus The Observer XT]] | 🟠 known gap |
| success | [[Task success rate]] | [[Usability testing]] | [[Noldus The Observer XT]], [[UserTesting]] | 🟢 covered |
| force | [[Grip force]] | [[Grip pressure mapping]] | [[Tekscan Grip System]] | 🟠 known gap |
| posture motion | [[RULA score]] | [[Observational ergonomic assessment]], [[Digital human simulation]], [[Video-based pose estimation]] | [[IPS IMMA]], [[Siemens Process Simulate Human]], [[TuMeke Risk Suite]] | 🟠 known gap |
| posture motion | [[Wrist angular velocity]] | [[Electrogoniometry]], [[Inertial motion capture]] | [[Biometrics electrogoniometers]], [[Xsens Analyze]] | 🟢 covered |
| posture motion | [[Wrist deviation angle]] | [[Electrogoniometry]], [[Observational ergonomic assessment]], [[Inertial motion capture]], [[Video-based pose estimation]], [[Digital human simulation]] | [[Biometrics electrogoniometers]], [[Siemens Process Simulate Human]], [[TuMeke Risk Suite]], [[Xsens Analyze]] | 🟠 known gap |
| vibration | [[Daily vibration exposure A(8)]] | [[Hand-arm vibration measurement]] | [[Svantek SV 106D]] | 🟢 covered |
| reach space | [[Reach distance]] | [[Digital human simulation]] | [[IPS IMMA]], [[Siemens Process Simulate Human]] | 🟢 covered |
| workload | [[NASA-TLX score]] | [[Workload questionnaire]] | [[LimeSurvey]], [[NASA TLX iOS app]] | 🟠 known gap |
| workload | [[Real-time cognitive workload]] | [[Physiological workload measurement]], [[Eye-tracking study]] | [[Emotiv EPOC X]], [[Tobii Pro Glasses 3]] | 🟠 known gap |
| attention | [[Time to first fixation]] | [[Eye-tracking study]] | [[Tobii Pro Glasses 3]], [[Tobii Pro Lab]] | 🟢 covered |
| satisfaction | [[SUS score]] | [[Standardized usability questionnaire]] | [[LimeSurvey]] | 🟢 covered |

## Step 3 — No adequate tool?

If the path ends in 🔴 or 🟠, check the [[Gap register]]. If your case is not there, [report a tool gap](https://github.com/prokosim/design-challenge-atlas/issues/new?template=report-gap.yml) — gaps are one of the most valuable things you can contribute.
