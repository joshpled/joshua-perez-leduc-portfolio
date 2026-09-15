# ADR 009: Present projects in a swipeable gallery

Date: 2026-09-15

## Context and decision

After reviewing the first readability stage, the owner requested and approved a gallery-style swiping presentation. Replace the long project list with seven full-width project panels. Keep every existing description, capability, maturity label, stack, and featured challenge/solution block. This supersedes ADR 008's proposed expandable-detail stage.

Keep content server-rendered in `app/page.tsx`. A small `app/project-gallery.tsx` client wrapper adds native scroll navigation, project-name shortcuts, Previous/Next, and a position counter. No dependency is added. Use the existing project screenshots/icon artwork and the existing category icons for supporting project illustrations.

## Behavior and maintenance

- CSS scroll snapping supplies native swipe/trackpad behavior. Buttons request a scroll; the actual nearest slide determines selection and the counter.
- Left/Right and Home/End work when the track is focused. Tab remains normal. Arrow controls retain focus at the boundaries and use guarded `aria-disabled` behavior.
- Selection does not wrap and never advances automatically. Reduced motion uses instant scrolling.
- ResizeObserver fits the track to the active panel, including image/font loading and viewport resizing. Observe the panel, not the track, to avoid a feedback loop.
- Until hydration, all content stays accessible and native scroll remains usable. After hydration, offscreen panels are hidden from assistive technology and inert. Only the name/count is announced on selection.
- Keep names and rendered children in matching order. Do not remove maturity labels or use decorative category icons as evidence of a completed interface.
- Print lays out every panel vertically, including panels not currently selected.

## Tradeoffs and alternatives

The gallery reduces page length but exposes one project at a time. Named shortcuts make all seven projects discoverable and directly reachable. Longer case studies still require vertical reading on small screens because their evidence stays expanded.

A new carousel dependency is unnecessary for native scrolling and a small set of controls. A CSS-only gallery would lack a synchronized counter, adaptive height, and named navigation behavior. Hiding evidence behind a second interaction would add unnecessary complexity to the requested gallery.

## Validation

Verify all seven names, capability lists, stacks, maturity labels, and featured challenge/solution text against the parent readability branch. Check next/previous boundaries, direct selection, keyboard navigation, swipe synchronization, active-panel height, responsive resizing, reduced motion, no-JavaScript fallback, and print. Run typecheck, lint, production build, and browser checks before owner review.

Reference: [WAI carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).
