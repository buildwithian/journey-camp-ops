---
title: "Duplicate Resolution Queue"
document_id: "OPS-DUPLICATE-RESOLUTION-QUEUE"
status: "review-required"
owner_role: "Knowledge Management Lead"
reviewers: ["Programme governance authority", "Accountable data owner", "Website approving authority"]
version: "0.2"
last_reviewed: "2026-07-19"
next_review: ""
programme: "general"
sensitivity: "internal"
content_layer: "standard"
source_references:
  - "Duplicate Resolution Queue!A5:N12"
  - "Dashboard!A11:C11"
  - "Instructions!A9:B9"
  - "Resource Library Index Quality Checks!A56:E56"
---

# Duplicate Resolution Queue

## Purpose

Use this queue to review duplicate Journey V3 resources, select canonical targets and record approval requirements before any archive, rewrite, move, deletion, sharing or production-site change.

## Current Live-state Note

The live `Duplicate Resolution Queue` tab is populated with the eight rows from [duplicate-resolution-queue.csv](duplicate-resolution-queue.csv), linked into Resource Library Dashboard row 11, Instructions row 9 and Resource Library Index quality checks. Dashboard row 11 currently shows eight duplicate-resolution items pending.

## Privacy And Approval Rule

Do not use this queue to import restricted source data, copy private names, store contact details, broaden Drive permissions, delete source files or approve publication. Record only role-based ownership, source-evidence pointers, review status and the next update target until an accountable authority records a real decision.

## Status Values

- Review required
- Ready for review
- In progress
- Canonical selected
- Archive approved
- Changes required
- Deferred
- Do not consolidate

## Queue Coverage

The CSV template contains eight duplicate-resolution rows:

- DRQ-001 for strategy and runbook overlap.
- DRQ-002 for START HERE and launch routing overlap.
- DRQ-003 for owner and RACI template overlap.
- DRQ-004 for human review and sign-off packet overlap.
- DRQ-005 for pilot evidence and debrief template overlap.
- DRQ-006 for website access, content and publication overlap.
- DRQ-007 for restricted-data example and placement-rule overlap.
- DRQ-008 for communications and message template overlap.

## Operating Sequence

1. Review the source-evidence pointers for the duplicate area.
2. Confirm whether the listed canonical target should become the maintained source of truth.
3. Record the required approval authority before any status moves beyond `Review required`.
4. Move to `Canonical selected` only after reviewers agree which artifact should carry future updates.
5. Move to `Archive approved` only after the accountable authority explicitly approves the exact source files or folders to archive.
6. Keep Drive and Sheets as source of truth; local files remain recovery/import companions.

## Non-Approval Boundary

This queue supports duplicate review only. It does not delete, archive, move, rewrite or share source files; approve Alpha asset use; approve content, access, build, deployment or publication; authorize restricted-data movement; appoint leaders; send messages; or close launch gates.

## Related Resources

- duplicate-resolution-queue.csv
- strategy-review-queue.md
- website-build-backlog.md
- website-content-review.md
- launch-gate-review-pack.md
- ../../docs/00-strategy/google-drive-consolidation-and-resource-library-plan.md
- ../../docs/00-strategy/drive-copy-build-runbook.md
