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
