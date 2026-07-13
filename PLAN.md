# The Journey Operating System
## Autonomous Build Plan

**Project:** The Journey Operating System  
**Target release:** `v0.1.0`  
**Execution mode:** Sequential, autonomous, local-first  
**Primary workspace:** The current project folder opened in Codex  
**Source material:** All Journey files already contained in this project folder  
**Status:** Ready for implementation  

---

# 1. Mission

Convert the existing Journey files into a structured, maintainable and repeatable operating system that can eventually help a trained team launch and run The Journey in a new city or country.

The first release must remain simple. It should use:

- Git
- GitHub-compatible Markdown
- CSV and XLSX templates where structured data is required
- A static documentation site that can be built locally for free
- Automated validation scripts
- No paid infrastructure
- No custom database
- No participant management application
- No unnecessary web platform

The repository must become the editable source of truth. A custom platform can be considered only after the operating system has been tested successfully.

---

# 2. Primary outcome

Version `v0.1.0` is complete when the repository contains:

1. A clear explanation of what The Journey is.
2. A structured catalogue of the current source material.
3. A defined repository and documentation architecture.
4. A current-state audit showing what exists, what is partial and what is missing.
5. A minimum viable Journey Run Kit.
6. Standard role descriptions.
7. Reusable weekly session and major event structures.
8. Basic administration, finance, logistics and communications templates.
9. Draft safety and safeguarding material clearly marked for expert review.
10. A searchable static documentation site that builds locally.
11. Validation scripts that protect privacy, links, structure and file quality.
12. A clear backlog and roadmap for future development.
13. A clean Git history and release tag.

---

# 3. Non-negotiable operating rules

## 3.1 Protect the originals

- Never modify, rename, move, replace or delete the original Journey source files.
- Create an immutable source register and checksums before processing.
- Work from copies or extracted working files.
- Never overwrite an existing file without preserving provenance.
- Never remove a source file merely because it appears duplicated.
- Historical files must be classified and retained in the source register.

## 3.2 Protect personal and sensitive information

Never commit the following to Git:

- Participant names where they are not operationally necessary
- Email addresses
- Telephone numbers
- Identity numbers
- Home addresses
- Banking details
- Account numbers or payment references
- Individual balances
- Medical information
- Emergency contact details
- Signed consent forms
- Private photographs
- Unredacted participant trackers
- Raw source archives containing confidential records

Use redacted summaries and synthetic examples.

## 3.3 Preserve programme integrity

Do not invent or independently approve:

- Theology
- Safeguarding policy
- Legal compliance
- Insurance requirements
- Medical policy
- Copyright permission
- Governance authority
- Licensing terms
- International operating authority
- Mandatory programme changes

Where evidence is missing, create a human review item and continue with unaffected work.

## 3.4 Prefer simple and maintainable solutions

- Use Markdown for maintained written knowledge.
- Use CSV for simple structured lists.
- Use XLSX only where formulas, filters or structured tracking add clear value.
- Use Python standard libraries where practical.
- Avoid unnecessary frameworks.
- Do not introduce a database.
- Do not build a custom application in this release.
- Do not publish confidential content.
- Do not make the project dependent on one proprietary service.

## 3.5 Work sequentially

Complete phases in order.

At the end of every phase:

1. Run the phase validation.
2. Resolve all technical failures.
3. Rerun validation.
4. Update project state.
5. Update the run log.
6. Record decisions and assumptions.
7. Create the specified Git commit.
8. Confirm the working tree is clean.
9. Continue to the next phase automatically.

---

# 4. Autonomous error-resolution protocol

When an error occurs:

1. Capture the exact command, error message and affected file.
2. Diagnose whether the cause is:
   - Missing dependency
   - Permission issue
   - Invalid path
   - Filename encoding
   - Corrupt file
   - Unsupported format
   - Network restriction
   - Tool limitation
   - Invalid source content
   - Logic defect
3. Attempt the least destructive resolution.
4. Attempt at least two reasonable technical approaches before marking the issue unresolved.
5. Rerun the failing check after each fix.
6. Verify that the fix did not damage other outputs.
7. Record the resolution in `RUN_LOG.md`.
8. Add a regression test where practical.
9. Continue all unaffected work.

## Required fallback order

### ZIP and archive extraction

1. Native archive utility
2. Python `zipfile`
3. Filename encoding recovery
4. Individual file recovery
5. Record unrecoverable files and continue

### DOCX and PPTX

1. Installed document libraries
2. Direct Office Open XML parsing
3. LibreOffice headless conversion if installed
4. Text extraction from XML
5. Record failure and continue

### XLSX

1. `openpyxl` if installed
2. Direct workbook XML inspection
3. LibreOffice headless conversion if installed
4. Extract sheet names and cell content from XML
5. Record failure and continue

### PDF

1. Installed PDF text extraction library
2. Native text extraction utility if installed
3. Metadata-only classification
4. OCR only where the file is important and has no extractable text
5. Record failure and continue

### Missing Python packages

1. Check whether an equivalent package is already installed
2. Use Python standard library
3. Use direct XML parsing
4. Install into a local virtual environment if network access is available
5. Record the limitation and continue

### GitHub unavailable

1. Complete the repository locally
2. Preserve all commits and tags locally
3. Create `GITHUB_SETUP.md`
4. Record exact later push commands
5. Do not treat remote unavailability as a release blocker

## Stop conditions

Stop only if:

- Continuing could damage the original source files
- The active directory is not the intended project folder
- Sensitive data would be exposed outside the project
- The project lacks write access and no safe local fallback exists
- Disk space is insufficient and cannot be safely reclaimed
- A destructive operation would be required

All other issues must be isolated, recorded and worked around where possible.

---

# 5. Required project control files

Create and maintain:

- `README.md`
- `START-HERE.md`
- `AGENTS.md`
- `ROADMAP.md`
- `RUN_LOG.md`
- `DECISIONS.md`
- `HUMAN-REVIEW-REQUIRED.md`
- `KNOWN-LIMITATIONS.md`
- `codex-state.json`
- `SOURCE_PROVENANCE.md`
- `CURRENT-STATE-AUDIT.md`
- `MVP-SCOPE.md`

`codex-state.json` must always contain:

```json
{
  "project": "The Journey Operating System",
  "target_release": "v0.1.0",
  "current_phase": 0,
  "phase_status": "not_started",
  "source_root": "",
  "source_checksum_status": "not_checked",
  "files_inventoried": 0,
  "tests_passed": 0,
  "tests_failed": 0,
  "last_completed_task": "",
  "technical_blockers": [],
  "human_review_items": [],
  "last_updated": ""
}
```

---

# 6. Target repository architecture

Create this architecture unless a clearly better structure is justified and recorded:

```text
.
├── README.md
├── START-HERE.md
├── AGENTS.md
├── ROADMAP.md
├── RUN_LOG.md
├── DECISIONS.md
├── HUMAN-REVIEW-REQUIRED.md
├── KNOWN-LIMITATIONS.md
├── codex-state.json
├── docs/
│   ├── 01-foundations/
│   ├── 02-start-a-journey/
│   ├── 03-governance-and-roles/
│   ├── 04-leader-training/
│   ├── 05-participant-onboarding/
│   ├── 06-weekly-sessions/
│   │   ├── boys/
│   │   └── girls/
│   ├── 07-kickoff-camp/
│   ├── 08-compass-evening/
│   ├── 09-rite-of-passage/
│   │   ├── boys/
│   │   └── girls/
│   ├── 10-administration/
│   ├── 11-logistics-and-equipment/
│   ├── 12-finance/
│   ├── 13-communications/
│   ├── 14-safety-and-safeguarding/
│   ├── 15-quality-and-impact/
│   ├── 16-localisation/
│   └── 17-leader-support/
├── templates/
│   ├── administration/
│   ├── communications/
│   ├── events/
│   ├── finance/
│   ├── logistics/
│   ├── operations/
│   ├── roles/
│   ├── safety/
│   └── sessions/
├── examples/
├── archive-register/
├── backlog/
│   └── issues/
├── decisions/
├── tools/
├── tests/
└── site/
```

Do not commit raw confidential source files.

---

# 7. Documentation standard

Every canonical operating document must include front matter:

```yaml
---
title: ""
document_id: ""
status: "draft"
owner_role: ""
reviewers: []
version: "0.1"
last_reviewed: ""
next_review: ""
programme: "general"
sensitivity: "internal"
content_layer: "standard"
source_references: []
---
```

Allowed status values:

- `draft`
- `review-required`
- `approved`
- `deprecated`
- `historical-example`

Allowed content layers:

- `core`
- `standard`
- `local`

Every process must contain:

1. Purpose
2. Intended outcome
3. Accountable owner
4. Supporting roles
5. Timing
6. Inputs
7. Dependencies
8. Preparation timeline
9. Step-by-step process
10. Outputs
11. Risks
12. Controls
13. Communications
14. Evidence of completion
15. Post-activity review
16. Permitted adaptations
17. Related resources
18. Source references

---

# 8. Phase plan

# Phase 1: Secure and bootstrap the project

## Objectives

- Confirm the project root.
- Identify all Journey source folders and archives.
- Protect the original source.
- Initialise Git if required.
- Establish local working directories and project state.

## Actions

1. Inspect only the current project directory and its subdirectories.
2. Identify source folders and archives containing Journey material.
3. Exclude generated repository folders and temporary outputs.
4. Record source paths.
5. Create SHA256 checksums for archives and a deterministic manifest for folders.
6. Create `.work/` for temporary extraction and processing.
7. Add `.work/`, raw archives, sensitive exports and operating-system files to `.gitignore`.
8. Initialise Git if no repository exists.
9. Configure a repository-local Git identity if required.
10. Create all project control files.
11. Create the initial repository architecture.
12. Commit the bootstrap.

## Validation

- Original sources remain unchanged.
- Checksums or manifests exist.
- `.work/` is ignored.
- Raw source archives are not tracked.
- `codex-state.json` is valid.
- Git working tree is clean.

## Commit

`chore: bootstrap Journey operating system`

---

# Phase 2: Inventory and classify all source material

## Objectives

Create a complete, auditable catalogue of every current Journey file.

## Actions

For every file, capture:

- Inventory ID
- Relative path
- Filename
- Extension
- MIME type where available
- Size
- Modified date
- SHA256 checksum
- Year
- Programme
- Functional area
- Document status
- Sensitivity
- Proposed action
- Conversion priority
- Notes

Classify programme as:

- General
- Boys
- Girls
- Historical
- Unknown

Classify functional area as:

- Foundations
- Governance
- Roles
- Training
- Onboarding
- Weekly sessions
- Kickoff camp
- Compass Evening
- Rite of passage
- Celebration
- Administration
- Logistics
- Equipment
- Finance
- Communications
- Safety
- Quality
- Media
- Other

Detect:

- Exact duplicates
- Probable duplicates
- Empty files
- Empty folders
- Temporary Office files
- Corrupt files
- Password-protected files
- Files larger than 50 MB
- Files larger than 100 MB
- Files likely to contain personal or financial data

## Deliverables

- `archive-register/source-inventory.csv`
- `archive-register/source-inventory.json`
- `archive-register/duplicate-groups.csv`
- `archive-register/sensitive-file-register.csv`
- `archive-register/conversion-queue.csv`
- `SOURCE_AUDIT.md`
- Regeneratable inventory scripts
- Inventory tests

## Validation

- Every source file appears exactly once.
- Counts reconcile.
- Checksums are valid.
- Sensitive content is not reproduced in reports.
- Tests pass.

## Commit

`feat: catalogue and classify Journey source archive`

---

# Phase 3: Establish standards, templates and repository rules

## Objectives

Create the permanent information architecture and standards for future contributors and Codex sessions.

## Deliverables

- `AGENTS.md`
- `CONTRIBUTING.md`
- `DOCUMENT-STANDARDS.md`
- `NAMING-CONVENTIONS.md`
- `VERSIONING.md`
- `PRIVACY-AND-DATA-RULES.md`
- `CONTENT-STATUS-GUIDE.md`
- Folder index in every major directory
- Machine-readable front-matter schema
- Standard templates for:
  - Process
  - Role
  - Session
  - Event
  - Checklist
  - Communication
  - Risk assessment
  - Post-event review
  - Decision record
  - Training module
  - Launch milestone

## Validation

- Every major directory has an index.
- Templates pass schema validation.
- Required headings are present.
- Document IDs are unique.
- Naming checks pass.
- Internal links pass.

## Commit

`feat: establish Journey information architecture and standards`

---

# Phase 4: Extract, convert and normalise source knowledge

## Objectives

Create searchable, sanitised working knowledge from Word, PowerPoint, Excel and PDF files.

## Requirements

- Raw extracted text remains under `.work/`.
- Sanitised summaries may be committed.
- Preserve source provenance.
- Redact participant, financial and medical information.
- Do not invent missing content.
- Do not redistribute third-party videos.

## Deliverables

- Conversion pipeline
- Conversion report
- Conversion results register
- External link register
- Unreadable file register
- Sanitised reference notes
- Tests for conversion and redaction

Every reference note must include:

- Source inventory ID
- Original filename
- Original path
- Checksum
- Conversion method
- Conversion quality
- Classification
- Redaction status
- Summary
- Reusable content
- Conflicts or outdated content
- Candidate destination

## Validation

- Every convertible file has a result.
- Every failed file is recorded.
- Raw extraction remains ignored.
- Sanitised notes contain no detected personal information.
- Conversion totals reconcile with the inventory.

## Commit

`feat: extract and normalise Journey source knowledge`

---

# Phase 5: Produce the current-state audit and backlog

## Objectives

Assess what already exists and define the minimum viable operating system.

Assess:

1. Purpose and theology
2. Programme architecture
3. Boys’ curriculum
4. Girls’ curriculum
5. Launch process
6. Governance
7. Roles
8. Leader recruitment
9. Leader training
10. Participant onboarding
11. Weekly sessions
12. Kickoff camp
13. Compass Evening
14. Boys’ rite of passage
15. Girls’ rite of passage
16. Celebration
17. Administration
18. Finance
19. Logistics
20. Equipment
21. Communications
22. Safety
23. Safeguarding
24. Medical readiness
25. Privacy
26. Quality
27. Impact
28. Alumni
29. Localisation
30. Leader support
31. Knowledge management

Classify every area:

- Strong
- Partial
- Weak
- Missing

## Deliverables

- `CURRENT-STATE-AUDIT.md`
- `GAP-ANALYSIS.md`
- `MVP-SCOPE.md`
- `SYSTEMISATION-MATRIX.csv`
- Updated `ROADMAP.md`
- Prioritised issue backlog

## Prioritisation order

1. Child and participant safety
2. Current Journey continuity
3. Programme fidelity
4. Repeatability
5. Ease of use
6. Documentation gaps
7. Quality controls
8. Future expansion

## Validation

- Every system area has evidence.
- Every critical gap has an issue.
- The MVP does not depend on a custom platform.
- Safety and privacy remain high priority.

## Commit

`docs: audit Journey system and prioritise backlog`

---

# Phase 6: Build foundations, launch guidance and role model

## Objectives

Create the core documentation that explains The Journey and the leadership structure.

## Foundation documents

- Journey purpose
- Theory of change
- Programme principles
- Core, standard and locally adaptable elements
- Programme map
- Glossary

## Start-a-Journey documents

- Start a Journey guide
- Launch readiness checklist
- Launch timeline
- Minimum team requirements
- Minimum participant requirements
- Venue readiness criteria
- First Journey support model

## Governance and role documents

- Operating model
- Decision rights
- Responsibility matrix
- Escalation model
- Journey Lead
- Oversight Lead
- Administration Lead
- Logistics Lead
- Session Coordinator
- Camp Director
- Youth Track Lead
- Pastoral Lead
- Safety Lead
- Finance Lead
- Communications Lead

## Current implementation example

Record the current functional ownership only as an example:

- Paul: Administration
- Neil: Logistics
- Marvin: Session planning and attendance
- Ian: Oversight and Journey coordination
- Richard: Strategic guidance and transition support

Canonical documents must remain location-independent.

## Oversight definition

Oversight is accountable for:

- Ownership clarity
- Readiness
- Dependency management
- Live issue resolution
- Weekly session assurance
- Documentation
- Continuity
- Continuous improvement

Oversight is not the default executor for all operational work.

## Validation

- A new leader can understand the programme.
- A new team can identify required roles.
- Responsibility and accountability are clearly separated.
- Core and adaptable content is explicit.
- Unsupported governance decisions remain review items.

## Commit

`feat: define Journey foundations launch process and leadership model`

---

# Phase 7: Build the reusable programme and event packs

## Objectives

Turn historical content into reusable session and event systems.

## Weekly session structure

Create boys’ and girls’ session indexes and packs containing:

- Purpose
- Learning outcomes
- Biblical foundation
- Preparation timeline
- Room setup
- Roles
- Equipment
- Agenda
- Facilitator notes
- Activity instructions
- Discussion questions
- Father-child interaction
- Homework
- Safety notes
- Adaptation guidance
- Completion evidence
- Review
- Source references

## Event packs

Create reusable packs for:

- Kickoff camp
- Compass Evening
- Boys’ rite of passage
- Girls’ rite of passage
- Family celebration

Every pack must include:

- Purpose
- Outcomes
- Planning timeline
- Venue criteria
- Roles
- RACI
- Communications
- Leader briefing
- Equipment
- Food
- Accommodation
- Run sheet
- Activities
- Setup
- Transitions
- Breakdown
- Safety
- Emergency response
- Contingencies
- Budget categories
- Review
- Permitted adaptations

## Localisation rule

- Move completed location-specific documents into `examples/`.
- Canonical documents must explain how to create a local equivalent.
- Exact coordinates must never become the general Compass process.
- Historical programmes must be labelled as examples.

## Validation

- Every event follows the standard.
- Historical examples are separated.
- Venue-specific instructions are not presented as universal.
- Missing girls’ content is identified rather than invented.
- No participant data is included.

## Commit

`feat: create reusable Journey session and event packs`

---

# Phase 8: Build the lightweight operational toolkit

## Objectives

Create simple, reusable tools for administration, finance, logistics and communications.

## Administration templates

- Participant registration process
- Participant status tracker
- Leader register
- Attendance tracker
- Consent status tracker
- Medical-form status tracker
- Payment status tracker
- Waiting-list process
- Programme completion register
- Data retention guide
- Data access rules

## Logistics templates

- Equipment register
- Equipment checkout
- Equipment return
- Condition checklist
- Storage register
- Maintenance schedule
- Venue assessment
- Setup checklist
- Breakdown checklist
- Transport plan
- Catering calculator
- Purchasing tracker
- Supplier register
- Lost or damaged equipment process

## Finance templates

- Budget guide
- Budget template
- Cost calculator
- Payment schedule
- Subsidy tracker
- Donation tracker
- Expense register
- Reimbursement form
- Purchasing approval
- Final financial report
- Variance report

## Communications

- Communication model
- WhatsApp group structure
- Communication calendar
- Invitation
- Registration confirmation
- Payment reminder
- Session reminder
- Homework
- Camp information
- Packing list
- Directions
- Schedule change
- Emergency message
- Post-event follow-up
- Completion
- Alumni follow-up

## Oversight tracker

Create:

`templates/operations/Journey-Oversight-Tracker.xlsx`

Include:

- Calendar
- Milestones
- Tasks
- Owners
- Status
- Due dates
- Dependencies
- Risks
- Decisions
- Communications
- Event readiness
- Post-event actions

## Spreadsheet quality requirements

- Instructions sheet
- Clear sheet names
- Frozen headers
- Filters
- Data validation where useful
- No real personal data
- No broken formulas
- No excessive blank rows
- No repair warning when opened
- Version and review information

## Validation

- All spreadsheets open correctly.
- No formula errors exist.
- No real participant information exists.
- Templates contain instructions.
- Oversight tracker is usable independently.

## Commit

`feat: build Journey operational toolkit and oversight tracker`

---

# Phase 9: Add safety, quality controls and the documentation site

## Objectives

Create draft safety controls, quality tools, automated repository checks and a free local documentation portal.

## Safety documents

Create clearly marked drafts for:

- Safety framework
- Safeguarding policy
- Leader code of conduct
- Medical readiness
- Medication process
- Emergency response
- Incident reporting
- Transport safety
- Overnight camp safety
- Activity risk management
- Professional referral guidance
- Country legal review checklist

Every safety document must state:

> Draft requiring review by qualified safeguarding, legal, insurance and medical professionals before operational adoption.

## Safety templates

- Medical declaration
- Emergency contact form
- Medication register
- Venue risk assessment
- Activity risk assessment
- Incident report
- Emergency action card
- Leader safety briefing
- Safeguarding acknowledgement

## Activity risk sheets

Create draft sheets for:

- Hiking
- Night activities
- Water activities
- Blindfolded activities
- Fire
- Gas equipment
- Axes
- Knives
- Air rifles
- Archery
- Paintball
- Transport
- Overnight accommodation

## Quality and impact

Create:

- Journey readiness review
- Weekly session review
- Event quality checklist
- Participant feedback
- Leader feedback
- End-of-Journey report
- Three-month follow-up
- Impact measurement framework
- Alumni follow-up
- Continuous improvement process

## Automated checks

Create validation for:

- Personal data
- Secrets
- Large files
- Broken internal links
- Broken external links where network is available
- Required front matter
- Required headings
- Duplicate IDs
- Invalid filenames
- Invalid statuses
- Empty unexplained documents
- Spreadsheet formula errors
- Sensitive tracked files

Create one command:

```bash
python3 tools/validate.py
```

Also add a Makefile if useful, but the Python command must work independently.

## Static site

Build a local MkDocs site if dependencies are available.

If MkDocs cannot be installed:

1. Create a dependency file.
2. Create the full configuration.
3. Validate navigation and Markdown locally using project scripts.
4. Record the exact command needed to build later.
5. Continue the release.

The site must provide:

- Search when built
- Clear navigation
- Mobile-friendly structure
- No participant data
- No confidential records
- Visible status and review information
- Approved template downloads only

Do not publish automatically.

## Validation

- Repository checks pass.
- No personal information or secrets are tracked.
- Safety material is labelled correctly.
- Site builds where dependencies are available.
- Navigation contains no broken references.

## Commit

`feat: add safety quality automation and documentation portal`

---

# Phase 10: Final audit, repair and release

## Objectives

Resolve all technical errors and produce a clean first release.

## Actions

Run:

- Unit tests
- Integration tests
- Schema validation
- Link checks
- Privacy scan
- Secret scan
- Large-file scan
- Spreadsheet validation
- Site build
- Inventory reconciliation
- Git tracked-file review

Search all tracked content for:

- Personal information
- Banking information
- Medical information
- Passwords
- Keys
- Tokens
- Raw archives
- Temporary files
- Broken links
- Empty files
- Duplicate IDs
- Invalid front matter
- Unexplained placeholder text

Resolve every technical defect.

Downgrade unsupported `approved` documents to `review-required`.

Confirm the original source checksums still match.

## Final deliverables

- `RELEASE-NOTES.md`
- `FINAL-VALIDATION-REPORT.md`
- `HUMAN-REVIEW-REQUIRED.md`
- `KNOWN-LIMITATIONS.md`
- `NEXT-30-DAYS.md`
- `MAINTENANCE-GUIDE.md`
- `CODEX-USAGE-GUIDE.md`
- `PROJECT-HANDOFF.md`
- Safe release archive excluding:
  - `.git`
  - `.work`
  - Raw sources
  - Participant data
  - Confidential files

## Release conditions

Release only when:

- All resolvable technical tests pass.
- No tracked personal information is detected.
- No secrets are detected.
- No broken spreadsheet formulas remain.
- No invalid internal links remain.
- No source archive is tracked.
- Original checksums still match.
- The MVP Run Kit is clearly identifiable.
- Human-only decisions are isolated.
- Git history is logical.
- The working tree is clean.

## Final commit and tag

Commit:

`release: Journey operating system v0.1.0`

Tag:

`v0.1.0`

If a private GitHub remote is available, push the branch and tag. Otherwise record exact future push commands.

---

# 9. Human review categories

Only place genuinely human or expert decisions in `HUMAN-REVIEW-REQUIRED.md`:

- Safeguarding approval
- Legal review
- Insurance confirmation
- Medical review
- Theology approval
- Governance authority
- Copyright permission
- Final content ownership
- Final programme fidelity approval
- Local or country-specific regulatory requirements

Do not place ordinary technical defects in this file.

---

# 10. Overnight execution instructions

At the beginning:

1. Read this entire file.
2. Inspect the current project.
3. Create or update `codex-state.json`.
4. Establish a checkpoint for Phase 1.
5. Begin execution.

At the beginning of every phase:

1. Re-read this file.
2. Re-read `AGENTS.md`.
3. Re-read `codex-state.json`.
4. Review the previous phase validation.
5. Continue from the recorded state.

During execution:

- Do not ask questions.
- Do not wait for confirmation.
- Do not stop for ordinary technical errors.
- Make conservative assumptions.
- Record assumptions in `DECISIONS.md`.
- Record all work in `RUN_LOG.md`.
- Use tests and validation as the source of truth.
- Keep changes inside the project workspace.
- Continue until Phase 10 has been attempted.

At completion, provide a concise final report containing:

1. Phases completed
2. Outputs created
3. Tests passed
4. Technical issues resolved
5. Remaining technical limitations
6. Human review items
7. Site preview instructions
8. Validation command
9. Git status
10. Release tag status
