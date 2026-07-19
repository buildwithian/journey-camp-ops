---
title: "Implementation Decision Session Brief"
document_id: "TPL-01F890DB4A10"
status: "review-required"
owner_role: "Knowledge Management Lead"
reviewers: []
version: "0.2"
last_reviewed: "2026-07-20"
next_review: ""
programme: "general"
sensitivity: "internal"
content_layer: "standard"
source_references: []
---

# Implementation Decision Session Brief

This guide mirrors the live `Implementation Decision Session Brief!A1:N14` tab in the Journey V3 Leader Delegation and Readiness Tracker. Use the companion CSV as the local recovery/import template if the live Sheet needs to be rebuilt: [implementation-decision-session-brief.csv](implementation-decision-session-brief.csv).

## Purpose

The brief turns the active organizational implementation objective into a ten-step decision-session run sheet. It links IRA-001 through IRA-006 and LDC-001 through LDC-018 to meeting prompts, required authority, proof to capture and the exact tracker surfaces to update after accepted human decisions.

It does not appoint leaders, approve HR gates, run or accept a pilot, move restricted data, approve access, approve content, build, deploy, publish or close launch gates.

## Live Workbook Placement

- Live tab: `Implementation Decision Session Brief!A1:N14`
- Dashboard metric: `Dashboard!A30:C30`, which counts brief rows whose session status is not `Decision captured`.
- Tracker instructions: `Instructions!A38:B38` records the decision-session boundary.
- Resource Library evidence: `Quality Checks!A68:E68` records the live brief tab as complete, with owner/status dropdown validation preserved.

## Validation-Backed Fields

The live tab includes dropdown or validation controls for:

- Required authority.
- Facilitator role.
- Session status.
- Target date.

Use the live status dropdown values only:

- `Ready to schedule`
- `In session`
- `Decision captured`
- `Deferred`
- `Blocked until pilot run`
- `Blocked until prerequisites accepted`
- `Not approved / withheld`

Move a brief row to `Decision captured` only when the linked source-of-truth rows contain accountable human evidence and the update target has been actioned.

## Brief Rows

| Brief ID | Session block | IRA link | LDC rows | Session status |
| --- | --- | --- | --- | --- |
| IDSB-001 | Open authority and scope | IRA-001..IRA-006 | LDC-001..LDC-018 | Ready to schedule |
| IDSB-002 | Owners and governance | IRA-001 | LDC-001..LDC-003 | Ready to schedule |
| IDSB-003 | Human-review routing | IRA-002 | LDC-004..LDC-010 | Ready to schedule |
| IDSB-004 | Pilot planning | IRA-003 | LDC-011 | Ready to schedule |
| IDSB-005 | Pilot debrief path | IRA-003 | LDC-012 | Blocked until pilot run |
| IDSB-006 | Restricted data replacement | IRA-004 | LDC-013..LDC-014 | Ready to schedule |
| IDSB-007 | Website access model | IRA-005 | LDC-015 | Ready to schedule |
| IDSB-008 | Website content and copyright | IRA-006 | LDC-016 | Ready to schedule |
| IDSB-009 | Publication prerequisites | IRA-006 | LDC-017..LDC-018 | Blocked until prerequisites accepted |
| IDSB-010 | Close and update order | IRA-001..IRA-006 | LDC-001..LDC-018 | Ready to schedule |

## Operating Boundary

Use this brief during the first real leadership implementation decision session, after the meeting is scheduled and authorized attendees are present. Capture reviewer names, authority, decision dates, evidence links and conditions only in the approved live fields. Keep private reviewer contact details out of shared tracker fields.

The Drive copy remains the source of truth. Do not use this brief to change leader names, HR outcomes, pilot completion, restricted-data placement, access model, content approval, publication state or launch-gate status without accepted human evidence in the linked target rows.
