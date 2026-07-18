---
title: "Website Operating Hub Requirements"
document_id: "STRATEGY-WEBSITE-HUB-REQUIREMENTS"
status: "draft"
owner_role: "Oversight Lead"
reviewers: []
version: "0.1"
last_reviewed: "2026-07-18"
next_review: ""
programme: "general"
sensitivity: "internal"
content_layer: "core"
source_references: []
---

# Website Operating Hub Requirements

## Purpose

Define the functional requirements for the future Journey website and private operating hub. This translates the Alpha-inspired benchmark into Journey-owned product requirements without copying third-party content.

## Product Layers

1. Public explanation layer: explains The Journey, target participants, rhythm, core events and how a local team starts.
2. Leader resource layer: organizes guides, templates, videos, session packs, event packs and safety material.
3. Current Journey management layer: shows dates, owners, tasks, decisions, blockers, risks and event readiness.
4. Google Drive source-of-truth layer: links every approved resource to the consolidated Drive copy or Google Sheet.
5. Review and governance layer: exposes content status, human-review gates and decision records.

## Core Website Modules

- Home and Start a Journey.
- Programme map.
- Leader dashboard.
- Resource library.
- Session library.
- Event packs.
- Team and role assignments.
- Operations templates.
- Safety and safeguarding review area.
- Quality and improvement.
- Consolidated Drive index.

## Leader Dashboard Requirements

- Add leader names without committing private contact details.
- Assign one accountable owner and optional supporting roles per workstream.
- Show status, priority, due date, dependencies and readiness for each task.
- Link each task to its resource, template, source register row and Drive file.
- Show open decisions and human-review items.
- Filter by event, owner role, status and due date.
- Export or sync to Google Sheets while Drive remains the working source of truth.

## Resource Library Requirements

- Every resource has a canonical asset ID, title, owner role, target Drive folder, website section, status and source count.
- Draft and review-required content is visually distinct from approved content.
- Historical examples are labelled and separated from canonical guidance.
- Sensitive operational templates use synthetic example data.
- Third-party media and benchmark references are linked only where copyright review permits.

## Data Entities

- Leader.
- Role.
- Workstream.
- Task.
- Milestone.
- Event.
- Resource.
- Template.
- Source reference.
- Decision.
- Human review item.
- Risk.
- Communication.
- Drive file.

## Acceptance Criteria

- A new Journey Lead can find the current Journey dashboard in one click.
- A functional lead can see only the workstreams and templates relevant to their role.
- Every resource links to a consolidated Drive file or a planned Drive target.
- No private participant, medical, finance or contact data is stored in public site content.
- Validation can detect missing resource IDs, broken internal links, invalid statuses and sensitive tracked files.
- Google Drive and Google Sheets remain the source of truth until a custom platform is explicitly approved.
