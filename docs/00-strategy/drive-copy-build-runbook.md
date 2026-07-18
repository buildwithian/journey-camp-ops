---
title: "Drive Copy Build Runbook"
document_id: "STRATEGY-DRIVE-COPY-RUNBOOK"
status: "draft"
owner_role: "Knowledge Management Lead"
reviewers: []
version: "0.1"
last_reviewed: "2026-07-18"
next_review: ""
programme: "general"
sensitivity: "internal"
content_layer: "core"
source_references: []
---

# Drive Copy Build Runbook

## Purpose

Provide a repeatable runbook for creating the clean Journey Drive copy described in the consolidation plan.

## Preconditions

- `archive-register/source-inventory.csv` is current.
- `archive-register/drive-consolidation-map.csv` is reviewed.
- Sensitive source files have not been copied into public repository outputs.
- Google Drive owner and permission groups are approved.
- Copyright and expert-review boundaries are recorded.

## Build Steps

1. Create a new private top-level Google Drive folder named `Journey Operating System`.
2. Create the numbered folder structure from the consolidation plan.
3. Import the Google Sheets-ready workbook `Journey-Drive-Resource-Library-Index.xlsx` as a native Google Sheet.
4. Import the Google Sheets-ready workbook `Journey-Leader-Delegation-and-Readiness-Tracker.xlsx` as a native Google Sheet.
5. Create placeholder Google Docs for each canonical asset in `canonical-resource-register.csv`.
6. Link each Drive file back to the canonical resource register.
7. Move or copy only reviewed, non-sensitive, canonicalized outputs into the consolidated Drive copy.
8. Keep original source folders unchanged as the source archive.
9. Configure access groups for programme owners, leadership team, functional leads, helpers and external reviewers.
10. Run a privacy and permissions review before operational use.

## Quality Gates

- No real participant data in shared templates.
- No banking, medical, emergency contact or private balance records in public or broadly shared files.
- Every consolidated file has an owner role and review status.
- Every template has instructions and synthetic examples.
- Every website resource link resolves to a Drive file or a planned placeholder.
- Superseded and historical examples are labelled.

## Import Notes

For native Google Sheets, import the local `.xlsx` files rather than recreating a blank sheet manually. This preserves workbook structure, sheet names, formatting, filters and formulas more reliably.
