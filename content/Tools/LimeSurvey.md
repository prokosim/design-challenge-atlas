---
type: tool
id: TOOL-005
title: LimeSurvey
vendor: LimeSurvey GmbH
url: "https://www.limesurvey.org"
tool_type:
  - survey-platform
commercial_status: open-source
cost_level: free
automation_level: semi-automatic
hardware_required: false
setting:
  - remote
  - lab
  - field
inputs:
  - questionnaire responses
outputs:
  - scored questionnaire results
domain:
  - usability
  - cognitive-ergonomics
status: proposed
evidence_level: B
origin: core
last_verified: 2026-09-28
verified_by: ""
measures:
  - "[[SUS score]]"
  - "[[NASA-TLX score]]"
supports_methods:
  - "[[Standardized usability questionnaire]]"
  - "[[Workload questionnaire]]"
sources: []
---
## What it does

Open-source survey platform (self-hosted Community Edition, or paid cloud). Standardised questionnaires such as SUS or raw NASA-TLX can be built from standard question types, with scoring in its expression language.

## Limitations

- No official validated SUS or NASA-TLX template: wording and scoring must be set up and checked by the researcher.
- Self-hosting means handling data protection, security and updates yourself.
