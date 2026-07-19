---
title: "Implementation Session Pack"
document_id: "TPL-01F87A77E6C2"
status: "review-required"
owner_role: "Journey Lead"
reviewers: []
version: "0.2"
last_reviewed: "2026-07-20"
next_review: ""
programme: "general"
sensitivity: "internal"
content_layer: "standard"
source_references: []
---

# Implementation Session Pack

This guide mirrors the live `Implementation Session Pack!A5:N14` tab in the Journey V3 Leader Delegation and Readiness Tracker. Use the companion CSV as the local recovery/import template if the live Sheet needs to be rebuilt: [implementation-session-pack.csv](implementation-session-pack.csv).

## Purpose

The session pack turns the live Organizational Implementation Board into a leadership meeting sequence. It gives the team ten agenda rows for authority confirmation, owner appointment routing, human-review assignment, pilot planning, restricted-data approval, website access decisions, production prerequisite review, decision capture, communications routing and closing updates.

It does not appoint leaders, approve reviewer decisions, run a pilot, move restricted data, approve website access, build, deploy, publish or close launch gates.

## Live Workbook Placement

- Live tab: `Implementation Session Pack!A5:N14`
- Dashboard metric: `Dashboard!A28:C28`, which counts session rows whose status is not `Decision recorded`.
- Tracker instructions: `Instructions!A36:B36` records the non-automation and non-approval boundary.
- Resource Library evidence: `Quality Checks!A64:E64` records the live session pack as complete, with owner/status dropdown validation preserved.

## Status Values

Use only the live status dropdown values:

- `Ready to schedule`
- `In session`
- `Evidence captured`
- `Follow-up routed`
- `Decision recorded`
- `Blocked`
- `Review required`

Change a row to `Decision recorded` only when accountable human evidence exists and the linked source-of-truth update has been captured.

## Session Rows

| ID | Objective area | Linked OIB row | Follow-up owner role | Starting status | Non-approval boundary |
| --- | --- | --- | --- | --- | --- |
| ISP-001 | Open session and confirm authority | OIB-001..OIB-006 | Journey Lead | Ready to schedule | Does not create authority where it has not been granted. |
| ISP-002 | Appoint owners and governance fields | OIB-001 | Journey Lead | Ready to schedule | Does not enter real names until programme-owner confirmation and access rules are accepted. |
| ISP-003 | Complete seven human-review gates | OIB-002 | Oversight Lead | Ready to schedule | Does not approve HR-001 through HR-007 or record final sign-off. |
| ISP-004 | Plan pilot one real Journey cycle | OIB-003 | Journey Lead | Ready to schedule | Does not run the pilot or accept pilot findings. |
| ISP-005 | Approve restricted-data replacement pathway | OIB-004 | Administration Lead | Review required | Does not move or expose real names, participant, medical or financial data. |
| ISP-006 | Decide website access model | OIB-005 | Oversight Lead | Review required | Does not approve access, sharing, public navigation or publication. |
| ISP-007 | Confirm production website prerequisites | OIB-006 | Knowledge Management Lead | Blocked | Does not build, deploy, publish or close GATE-006. |
| ISP-008 | Capture decisions and conditions | OIB-001..OIB-006 | Oversight Lead | Ready to schedule | Does not treat discussion notes as approval. |
| ISP-009 | Route follow-up communications | OIB-001..OIB-006 | Communications Lead | Ready to schedule | Does not send messages or store private contact details. |
| ISP-010 | Close session and update dashboard | OIB-001..OIB-006 | Knowledge Management Lead | Ready to schedule | Does not close launch gates without required proof. |

## Operating Boundary

Keep names, contact details, participant information, medical data, financial data and private source evidence out of public or broadly shared files unless the relevant access and data-placement approvals are already recorded. The session pack is a meeting-control aid; Drive and the live Sheets remain the source of truth.
