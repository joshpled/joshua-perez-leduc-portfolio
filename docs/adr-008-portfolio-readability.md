# ADR 008: Make the portfolio easier to scan

Date: 2026-09-15

Follow-up: ADR 009 supersedes the proposed expandable-detail stage with the owner-approved swipeable gallery. This ADR records the first readability stage.

## Context

The portfolio repeats positioning in the hero, services, and company introduction. Large card gaps and image minimum heights make this especially slow to scan on phones. Project maturity appears after the technical details, and mobile navigation hides three useful section links.

## Decision

Ship readability in two separately reviewed stages. This first stage shortens repeated copy, reduces decorative spacing, places full maturity labels beneath project titles, and keeps all seven projects and every capability, stack, and challenge/solution block expanded. Services retain their three categories and nine examples. The approved logos, palette, fonts, and project imagery remain intact.

Use a two-column supporting-project grid, natural content heights, and uncropped images. Keep featured project text before imagery on mobile. Keep existing mobile navigation links visible and offset section anchors below the sticky header. Preserve native links and server-rendered markup without new dependencies or client state.

## Why

Visitors can identify the company, find relevant work, and distinguish a prototype from a working tool sooner. Less repetition leaves more attention for concrete evidence. Visible section links help mobile visitors jump directly to the information they need.

## Alternatives and tradeoffs

- Smaller body text would shorten the page at the cost of readability; reduce repeated text and empty space instead.
- Removing supporting projects would hide the breadth of the work; retain all seven.
- Expandable details can reduce initial reading length further, but add an interaction. They belong in the separately approved second stage, after this change merges.
- Two columns leave the seventh project's card alone in the last row. Comfortable line lengths and consistent card widths take priority over stretching one project to fill the row.
- Full screenshot proportions can make small interface text hard to read. The adjacent evidence explains the project independently of that image.

## Boundaries

Contact remains presentation-only with its existing placeholder and anchor. Adding contact delivery is separate work. Public product maturity is preserved exactly; no new business outcomes are claimed. Metadata, hosting, dependencies, and approved artwork are unchanged.

## Validation

Run typecheck, lint, and production build. Review desktop and mobile layouts, keyboard navigation, section anchors, horizontal overflow at 320px, and the preserved project evidence. Compare word count and mobile scroll length against the previous page; record measured results in the PR. Visual approval and merge remain owner gates.
