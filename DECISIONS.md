## 2026-07-18T12:49:23+00:00

- Created pilot and restricted-data readiness packets to prepare TASK-013 and TASK-014 for human execution.
- Kept `TASK-013` not started and `TASK-014` review-required; no real pilot was run and no restricted data migration was authorized.
- Added communication rows for data replacement review and website access decision routing while leaving approval decisions with accountable human owners.

## 2026-07-18T12:43:05+00:00

- Created an owner appointment packet to support programme-owner completion of named leader assignments and authority decisions.
- Left `Leader Roster` names blank and kept `DEC-003` review-gated; the packet is preparation evidence, not approval evidence.
- Added communication rows for owner appointment, review packet routing and pilot readiness instead of sending messages or assigning real people without authority.

## 2026-07-18T12:37:16+00:00

- Added explicit human-review sign-off fields to the live tracker instead of relying only on free-text notes.
- Kept contact details out of the shared reviewer fields; only reviewer name, authority, decision, decision date and conditions/required changes should be recorded there.
- Maintained all HR-001 through HR-007 decisions as pending until qualified reviewers record outcomes.

# Decisions

## ADR-001: Repository-in-place with ignored originals

- Date: 2026-07-13
- Status: accepted
- Decision: Initialize Git in the current project folder and ignore original source folders and raw source spreadsheets.
- Rationale: The plan requires the current project folder as the primary workspace while protecting originals from modification and commits.

## ADR-002: Markdown and schema-first standards

- Date: 2026-07-13
- Status: accepted
- Decision: Canonical operating documents use required YAML front matter and predictable sections.
- Rationale: This matches the plan and keeps the first release maintainable without a custom platform.

## ADR-003: Commit sanitized notes without source body text

- Date: 2026-07-13
- Status: accepted
- Decision: Reference notes preserve provenance and classification but do not reproduce raw extracted content.
- Rationale: The source archive includes personal, financial and copyrighted material, so the MVP favours privacy-safe metadata until human review.

## ADR-004: Place historical examples in examples rather than moving originals

- Date: 2026-07-13
- Status: accepted
- Decision: Create sanitized example records under `examples/` while leaving original source files untouched.
- Rationale: The plan requires separating examples, but also forbids moving or modifying original source files.

## ADR-005: Alpha-inspired hub as product direction

- Date: 2026-07-18
- Status: accepted
- Decision: Use Alpha's public host and resource-hub pattern as inspiration for the future Journey operating website, while keeping Drive and Google Sheets as the operational source of truth until a custom platform is justified.
- Rationale: The benchmark shows a practical pattern for combining explanation, registration, resources, schedule, team access, promotion and guest workflows. Journey should adapt the operating pattern, not copy Alpha content or assets.

## ADR-006: Local static operating hub prototype

- Date: 2026-07-18
- Status: accepted
- Decision: Add a self-contained static HTML prototype for the future Journey operating hub, using synthetic local data and browser localStorage rather than external services.
- Rationale: The user asked for an Alpha-like single website that can expose resources, planning templates, leader assignment and delegated responsibility. A static prototype gives a concrete review surface without publishing confidential material or replacing Drive as the current source of truth.

## ADR-007: Journey V3 Drive folder as approved destination

- Date: 2026-07-18
- Status: accepted
- Decision: Use a new Google Drive folder named `Journey V3` as the trusted destination for the first Drive-native copy of the consolidated Journey operating resources.
- Rationale: The user approved creating a new destination folder, resolving the previous upload blocker while keeping original source files and confidential raw records out of Drive imports.

## ADR-008: Core resource packs before one-file-per-source migration

- Date: 2026-07-18
- Status: accepted
- Decision: Import the first canonical resource tranche as four consolidated native Google Docs under `02 Canonical Resources` before migrating every remaining template/source-derived asset.
- Rationale: The user wants a simpler, Alpha-inspired operating hub backed by Drive as source of truth. Consolidated pack Docs make the core workflow usable sooner, reduce duplication, and keep review-gated material out of broad access until qualified owners approve it.

## ADR-009: Programme/event packs as consolidated native Docs

- Date: 2026-07-18
- Status: accepted
- Decision: Import the leader training, participant onboarding, weekly session, kickoff camp, Compass evening and rite-of-passage resources as six consolidated native Google Docs under `02 Canonical Resources`.
- Rationale: These resources are operationally consumed as guided packs rather than raw source folders. Consolidating them reduces duplication, keeps Drive as the source of truth, and preserves review-required labels for girls, theological, safety and rite-of-passage content.

## ADR-010: Operations/control resources as folder-backed Doc and Sheet packs

- Date: 2026-07-18
- Status: accepted
- Decision: Represent administration, logistics, finance, communications, safety and quality canonical resources as one Drive folder each, containing a native guide Doc and a native Google Sheet starter workbook.
- Rationale: These resources are template sets, not single documents. Folder-backed packs keep each canonical resource link stable while preserving separate editable Docs and Sheets for the roles that run the work.

## ADR-011: Library/provenance/media resources as review-register packs

- Date: 2026-07-18
- Status: accepted
- Decision: Represent local examples, archive/provenance and approved-media canonical resources as folder-backed native guide Docs and registry Sheets rather than uploading original source files or media.
- Rationale: These resources depend on provenance, sensitivity, copyright, consent and historical-example context. Review-register packs make the library searchable without exposing raw or unapproved material.

## ADR-012: Organizational gates before production website work

- Date: 2026-07-18
- Status: accepted
- Decision: Treat named owner assignment, seven human-review gates, pilot-cycle evidence, real-data replacement controls and website access-model approval as launch-blocking tracker items before production website publishing.
- Rationale: The next stage depends on accountable people and human approval, not additional automatic consolidation. Tracking these gates in the live Drive Sheets prevents synthetic examples, draft governance or benchmark inspiration from becoming accidental operating approval.

## ADR-013: Review packets and pilot evidence before approval changes

- Date: 2026-07-18
- Status: accepted
- Decision: Create per-gate review packet Docs and a validation-backed Pilot Log before changing any human-review status or publishing the production website.
- Rationale: The next stage needs qualified reviewer outcomes and real pilot evidence. Packet and log artifacts make the work executable while preserving the rule that no safety, legal, medical, theology, authority, programme-content or copyright gate is auto-approved.
