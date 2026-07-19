---
title: "Google Drive Consolidation And Resource Library Plan"
document_id: "STRATEGY-DRIVE-CONSOLIDATION"
status: "review-required"
owner_role: "Knowledge Management Lead"
reviewers: ["Oversight Lead", "Accountable data owner"]
version: "0.2"
last_reviewed: "2026-07-19"
next_review: ""
programme: "general"
sensitivity: "internal"
content_layer: "core"
source_references:
  - "Journey V3 root"
  - "Resource Library Index"
  - "Leader Delegation and Readiness Tracker"
  - "GOOGLE-DRIVE-IMPORT-MANIFEST.md"
  - "Drive Copy Build Runbook"
---

# Google Drive Consolidation And Resource Library Plan

## Purpose

Define the current plan for maintaining the cleaned Journey V3 Drive library and resource index after the first consolidation pass. This refresh replaces the original future-tense copy plan with a live maintenance plan for summarized, improved, review-gated templates.

## Current Consolidation State

- A Journey V3 root folder exists as the trusted destination for the clean copy.
- START HERE gives leaders a single entrypoint into the review and operating surfaces.
- Resource Library Index tracks canonical resources, source provenance, access groups and quality checks.
- Leader Delegation and Readiness Tracker holds tasks, decisions, event readiness, launch gates, review routing, content review, leadership decision capture and the website build backlog.
- Core, programme/event, operations/control and library/provenance/media packs were consolidated into native Google Docs, native Google Sheets or folder-backed packs.
- Original source files remain untouched and are not committed into the public/release repository.

## Live Drive Structure

| Area | Current role |
| --- | --- |
| Journey V3 root | Source-of-truth doorway and START HERE location |
| 01 Strategy and Runbooks | Strategy references, runbooks, requirements and import manifest |
| 02 Canonical Resources | Consolidated packs 00 through 18, grouped by Journey operating purpose |
| 03 Google Sheets Trackers | Resource Library Index and Leader Delegation tracker |
| 04 Website Operating Hub | Non-production HTML prototype and website planning surfaces |
| 05 Human Review and Governance | Review packets, owner appointment, pilot evidence, access and publication gates |

## Canonical Resource Principles

- One canonical resource should exist for each operating purpose, even when several historical folders informed it.
- Each canonical resource keeps a stable Drive link and a source reference trail.
- Summaries should be practical and role-oriented rather than archival dumps.
- Historical examples stay labelled as examples, not operating instructions.
- Sensitive material stays restricted, synthetic or withheld until a qualified owner approves its use.
- Google Sheets are preferred for live trackers, checklists and delegated operating queues.
- Google Docs are preferred for guides, decision templates, review packets and runbooks.

## Duplicate Handling

1. Treat the private source archive as read-only evidence.
2. Use source inventory, duplicate groups, conversion queue and source notes to understand provenance.
3. Consolidate repeated templates into one improved canonical template per purpose.
4. Preserve meaningful local variation as optional notes or local-example rows, not as competing canonical files.
5. Record source-reference IDs privately where source detail is sensitive.
6. Mark superseded, historical, review-required and approved states visibly in the Resource Library Index.
7. Do not delete or overwrite originals during consolidation.

## Template Improvement Standard

Every maintained template should include:

- Clear title, purpose, owner role, review status and version.
- Instructions or an opening use section.
- Synthetic example data only.
- Role, status, priority and date fields where operationally useful.
- Frozen headers, filters and validation lists for spreadsheet-based templates.
- Source-reference and current Drive link fields where relevant.
- Review date and next-review fields.
- Explicit non-approval boundary when the template touches human gates, private data, copyright, safety, legal, medical, theology, finance or publication.

## Access And Data Boundaries

- Public or broadly shared areas may contain only approved Journey-owned summary content.
- Protected leader areas may contain operating guides, templates and dashboard summaries after access approval.
- Restricted authenticated areas are required for participant, medical, safeguarding, finance, reviewer-condition and unresolved gate evidence.
- Real names, contact details, private availability, participant data, banking/payment data, medical details, emergency contacts and credentials must not be copied into public files or synthetic templates.
- Restricted-data replacement requires accountable data-owner approval of storage location, access group, field purpose and retention.

## Maintenance Sequence

1. Change the live Drive or Sheet source of truth first when the change affects operations.
2. Read the target document, row or folder metadata before writing.
3. Copy validation and formatting from nearby rows when extending Sheets.
4. Keep rows role-based, blank, pending or blocked unless human evidence exists.
5. Verify exact readback after each native Doc, Sheet or Drive update.
6. Mirror recoverable templates and audit notes in the local repository.
7. Update RUN_LOG, DECISIONS, PROJECT-HANDOFF, NEXT-STAGE-IMPLEMENTATION, GOOGLE-DRIVE-IMPORT-MANIFEST and codex-state.json.
8. Run local validations, repair failures, commit the completed slice and confirm a clean tree.

## Open Human Gates

The Drive copy is prepared, but organizational use remains gated by owner appointments, HR-001 through HR-007 reviews, pilot evidence, restricted-data approval, website access approval, content/media approval and publication authority. These gates are tracked in the live Leader Delegation and Readiness Tracker.

## Non-Approval Boundary

This plan does not approve Drive permissions, public sharing, owner names, human-review outcomes, restricted-data migration, website access, third-party content use, production build, deployment, publication, DEC-006/TASK-016 updates or launch-gate closure. It defines the maintenance standard for the prepared Journey V3 Drive copy.
