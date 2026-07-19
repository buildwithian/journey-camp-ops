---
title: "Implementation Readiness Audit"
document_id: "TPL-01F88B2D4F9A"
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

# Implementation Readiness Audit

This guide mirrors the live `Implementation Readiness Audit!A1:N10` tab in the Journey V3 Leader Delegation and Readiness Tracker. Use the companion CSV as the local recovery/import template if the live Sheet needs to be rebuilt: [implementation-readiness-audit.csv](implementation-readiness-audit.csv).

## Purpose

The audit tab turns the user's next-stage objective into six requirement-level rows:

- Appoint owners and complete governance fields.
- Complete seven human-review gates.
- Pilot one real Journey cycle.
- Replace synthetic examples carefully.
- Approve the website access model.
- Build and publish the production website.

It does not appoint leaders, approve HR gates, run or accept a pilot, move restricted data, approve access, build, deploy, publish or close launch gates.

## Live Workbook Placement

- Live tab: `Implementation Readiness Audit!A1:N10`
- Dashboard metric: `Dashboard!A29:C29`, which counts audit rows whose current status is not `Decision recorded`.
- Tracker instructions: `Instructions!A37:B37` records the requirement-level audit boundary.
- Resource Library evidence: `Quality Checks!A66:E66` records the live audit tab as complete, with owner/status dropdown validation preserved.

## Status Values

Use only the live status dropdown values:

- `Ready to schedule`
- `In session`
- `Evidence captured`
- `Follow-up routed`
- `Decision recorded`
- `Blocked`
- `Review required`

Move an audit row to `Decision recorded` only when the linked source-of-truth rows contain accountable human evidence.

## Audit Rows

| Audit ID | Objective requirement | Current status | Accountable owner role | Decision captured? |
| --- | --- | --- | --- | --- |
| IRA-001 | Appoint owners and complete governance fields | Review required | Journey Lead | No |
| IRA-002 | Complete seven human-review gates | Review required | Oversight Lead | No |
| IRA-003 | Pilot one real Journey cycle | Ready to schedule | Journey Lead | No |
| IRA-004 | Replace synthetic examples carefully | Review required | Administration Lead | No |
| IRA-005 | Approve the website access model | Review required | Oversight Lead | No |
| IRA-006 | Build and publish the production website | Blocked | Knowledge Management Lead | No |

## Operating Boundary

Use this audit before changing OIB statuses, launch gates, owner names, HR outcomes, restricted-data placements, website access decisions or production publication state. It is a requirement-checking aid; Drive and the live Sheets remain the source of truth.
