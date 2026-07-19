## 2026-07-18T13:10:40+00:00

- Added Owner Evidence Review as the safer path toward real leader-name entry: source row ranges and role areas are visible, but source-derived names stay out of the shared tracker until authorized review.
- Kept `Leader Roster` names blank and `GATE-001` not started; evidence review is preparation, not appointment or decision-rights approval.
- Recorded that copying names from the private workbook into the shared Sheet requires explicit authorized approval.

## 2026-07-18T13:00:12+00:00

- Added a Launch Gates control tab as the weekly control surface for the six remaining human-gated outcomes.
- Kept every gate open unless current evidence proves human approval, pilot completion, restricted-data approval, website access approval or production publication approval.
- Used dropdown-backed gate status values so future leadership updates are structured and auditable.

## 2026-07-18T12:53:35+00:00

- Created a production website publication gate checklist to prepare TASK-015 and TASK-016 for future approval-controlled website work.
- Kept production publishing blocked; the checklist is readiness evidence only and does not approve access, content, copyright or deployment.
- Linked the checklist beside DEC-004 and DEC-006 so website decisions remain traceable to explicit gate evidence.

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

## ADR-014: Area-by-area website access review before DEC-004

- Date: 2026-07-18
- Status: accepted
- Decision: Add a validation-backed Website Access Review matrix to decide public, protected, restricted or withheld treatment for each website area before closing the production access-model decision.
- Rationale: The future website mixes public explanation, leader resources, current management data, review evidence, participant administration, medical/safeguarding workflows, finance tools and media. Area-level decisions reduce the risk that a single broad access choice accidentally exposes private data, review-gated content or third-party material.

## ADR-015: Access-review prototype remains non-production

- Date: 2026-07-18
- Status: accepted
- Decision: Mirror the Website Access Review structure in the local and Drive raw HTML prototype using synthetic data only, while keeping production publishing blocked.
- Rationale: The user wants a single website-shaped operating hub, but the access model, authority, content review and copyright gates are still open. A synthetic prototype helps leaders review the workflow without broadening access or turning draft content into a public site.

## ADR-016: Governance authority review before HR-005

- Date: 2026-07-18
- Status: accepted
- Decision: Add a validation-backed Governance Authority Review matrix before approving final decision rights, operating authority, escalation paths or role authority.
- Rationale: HR-005 controls whether proposed leaders and operating roles can become live authority. A separate review matrix makes the required final approver, operating owner and non-approval notes explicit while preventing synthetic roles, private source evidence or prototype workflows from becoming accidental authority.

## ADR-017: Human review routing before sign-off

- Date: 2026-07-18
- Status: accepted
- Decision: Add a validation-backed Human Review Routing queue before any HR-001 through HR-007 sign-off is entered.
- Rationale: The open review gates need named qualified reviewers, target dates and packet movement before final outcomes can be responsibly recorded. A routing queue makes those operational steps visible while keeping approval authority in the `Human Review` sign-off fields.

## ADR-018: Owner appointment routing before roster entry

- Date: 2026-07-18
- Status: accepted
- Decision: Add a validation-backed Owner Appointment Routing queue before entering real leader names into `Leader Roster`.
- Rationale: The appointment step requires authorized source review, programme-owner confirmation, backup coverage and HR-005 authority approval. A routing queue makes those dependencies visible while keeping source-derived names and final appointments out of shared records until approved.

## ADR-019: Pilot cycle plan before GATE-003

- Date: 2026-07-18
- Status: accepted
- Decision: Add a validation-backed Pilot Cycle Plan queue before closing the pilot Journey cycle launch gate.
- Rationale: A real pilot needs owner/date confirmation, focused walkthroughs, non-sensitive observation logging, debrief and approved-change routing. The queue makes those steps explicit while preserving the rule that no pilot evidence, restricted-data approval or launch-gate closure can be synthesized by automation.

## ADR-020: Gate evidence checklist before launch-gate closure

- Date: 2026-07-19
- Status: accepted
- Decision: Add a gate evidence checklist package before moving any remaining launch gate to complete.
- Rationale: The six launch gates need explicit proof, not status optimism. A checklist makes evidence requirements concrete while preserving the rule that owner appointments, human-review decisions, pilot evidence, real-data replacement, access model approval and production publication remain human-gated.

## ADR-021: Leadership review schedule before gate execution

- Date: 2026-07-19
- Status: accepted
- Decision: Add a leadership review schedule before treating open launch gates as executable or closable.
- Rationale: The next stage needs real people to meet, review evidence, assign dates and record outputs. A schedule turns the evidence checklist into a practical meeting flow while keeping actual owner appointments, review decisions, pilot execution, restricted-data approval, access approval and production publishing under human authority.

## ADR-022: Leadership review outputs register before tracker updates

- Date: 2026-07-19
- Status: accepted
- Decision: Add a leadership review outputs register before treating scheduled review meetings as completed or using them to update gate trackers.
- Rationale: Review meetings need a traceable output, evidence link and follow-up owner role before downstream trackers change. This preserves a clean audit chain while keeping actual owner appointments, authority approvals, review decisions, pilot evidence, restricted-data approval, access approval and production publishing under human authority.

## ADR-023: Leadership review agenda before live meeting execution

- Date: 2026-07-19
- Status: accepted
- Decision: Add a leadership review agenda before running scheduled review sessions or treating schedule rows as executable.
- Rationale: The review process needs prompts, required evidence, decision boundaries, expected outputs and time boxes before humans can safely use the control tracker. The agenda makes meetings executable while preserving that owner appointments, authority approvals, review decisions, pilot evidence, restricted-data approval, access approval and production publishing remain human-gated.


## ADR-024: Leadership review communications before review execution

- Date: 2026-07-19
- Status: accepted
- Decision: Add a validation-backed leadership review communications queue before treating scheduled reviews, reviewer requests, pilot debriefs, restricted-data review, website access review or publication prerequisites as actively routed.
- Rationale: The open gates need real outreach, responses and evidence capture, but shared trackers must not store contact details or turn message-sending into approval. A role-only communications queue makes the next human action visible while preserving that named owners, reviewer decisions, pilot evidence, restricted-data approval, access approval and production publishing remain human-gated.


## ADR-025: Message templates before leadership-review outreach

- Date: 2026-07-19
- Status: accepted
- Decision: Add reusable role-only message templates before leaders send the communication queue items.
- Rationale: The review queue needs consistent wording that makes boundaries explicit. A template pack helps human senders request reviews, meetings, pilot debriefs, access decisions and publication prerequisite checks without storing contacts, sending messages automatically or implying approval.
