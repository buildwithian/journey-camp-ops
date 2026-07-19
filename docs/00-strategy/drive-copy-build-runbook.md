---
title: "Drive Copy Build Runbook"
document_id: "STRATEGY-DRIVE-COPY-RUNBOOK"
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
  - "PROJECT-HANDOFF.md"
  - "RUN_LOG.md"
---

# Drive Copy Build Runbook

## Purpose

Provide the current repeatable runbook for maintaining the clean Journey V3 Drive copy, native Google Sheets, native Google Docs and operating hub prototype. The Drive copy is the practical source of truth; the local repository remains the audit trail, template source and recovery package.

## Current Live Assets

- Journey V3 root folder: https://drive.google.com/drive/folders/1ozuTBQmr3b_Cd2VWYRXeF66aGtBy3Ygr
- START HERE Doc: https://docs.google.com/document/d/1yjYo1yQr59q7SwS5g_xzr8ldLKQAXlB3_mGzE41RGw8/edit
- Resource Library Index Sheet: https://docs.google.com/spreadsheets/d/1Yhva4WVNvBwzjZqKpG5tgmHymSNTMs5BBi3u2WCaVf0/edit
- Leader Delegation and Readiness Tracker Sheet: https://docs.google.com/spreadsheets/d/1G7DDdtDafQILPNAi7izYmlmlc7zxDibOhErycwcxv5A/edit
- Operating Hub Prototype HTML: https://drive.google.com/file/d/13Qa-9QxZlA7e9U7qXHiwHp3i7mg5kDEi/view

## Operating Rule

Make changes in the live Drive/Sheets source of truth first when they affect operations, then mirror recoverable templates and audit notes in the local repository. Do not copy restricted source records, private names, participant data, medical details, banking/payment details, reviewer conditions or credentials into public files or prototype content.

## Update Sequence

1. Identify the live surface to change: Resource Library Index, Leader Delegation tracker, START HERE, review packet Docs, template Docs or operating hub prototype.
2. Read the current live range or document text before writing.
3. Copy existing formatting, dropdown validation and row conventions from the nearest prior row or tab.
4. Write only role-based, blank, pending or blocked scaffolding unless accountable human evidence already exists.
5. Verify exact readback ranges, formulas, dropdown validations, Drive parent, file ID, modified time or document text as applicable.
6. Create or update local recovery artifacts such as CSV, Markdown guide, prototype HTML or tests.
7. Update RUN_LOG, DECISIONS, PROJECT-HANDOFF, NEXT-STAGE-IMPLEMENTATION, GOOGLE-DRIVE-IMPORT-MANIFEST and codex-state.json.
8. Run local validations, repair failures, commit the completed slice and confirm a clean tree.

## Current Sheet Surfaces

- Resource Library Index quality checks currently record readiness through the operating hub build backlog prototype refresh.
- Leader Delegation tracker includes Launch Gates, Owner Evidence Review, Website Access Review, Governance Authority Review, Owner Appointment Routing, Human Review Routing, Pilot Log, Pilot Cycle Plan, Gate Evidence Checklist, Leadership Review Schedule, Leadership Review Outputs, Leadership Review Agenda, Leadership Review Communications, Website Content Review, Leadership Decision Capture and Website Build Backlog.
- Dashboard rows 23 through 25 track website content reviews, leadership decisions and website build backlog items that remain pending or blocked.

## Website And Prototype Sync

1. Keep the prototype self-contained with no external URL dependencies.
2. Mirror `site/index.html` to `site/operating-hub-prototype.html` after every prototype change.
3. Update `tests/test_site_prototype.py` with marker strings for any new view, filters, metrics or key row IDs.
4. Replace the existing Drive HTML artifact in place so the file ID remains stable.
5. Record modified time, byte size and Resource Library quality row in the audit trail.
6. Treat the prototype as synthetic until DEC-004, HR-005, HR-007, DEC-005, content approval and DEC-006 are accepted.

## Permission And Privacy Gates

- Owner appointments and real names require GATE-001 and DEC-003 evidence.
- Human-review outcomes require qualified reviewer name, authority, decision, date and conditions in the live tracker.
- Restricted data requires accountable data-owner approval of storage location, access group, field purpose and retention.
- Website access requires DEC-004 and area-level Website Access Review decisions.
- Alpha or third-party references require HR-007 copyright/legal approval before copying, embedding or publishing media or wording.
- Production publication requires DEC-006, approved version, production URL, rollback owner, validation evidence and publication authority.

## Validation Commands

- `python3 tools/validate.py`
- `python3 tests/test_site_prototype.py`
- `node --check` against the extracted prototype script after HTML changes
- bundled Python `tests/test_spreadsheets.py`
- `python3 -c` JSON and CSV sentinels for any newly created local artifact
- `git diff --check`
- source-original tracking check with `git ls-files` against protected source patterns

## Non-Approval Boundary

This runbook does not grant Google Drive permissions, approve owner names, approve human-review gates, run a pilot, migrate restricted data, approve website access, approve third-party use, build a production site, deploy, publish, broaden sharing or close launch gates. It defines the repeatable maintenance path for the prepared Journey V3 operating system.
