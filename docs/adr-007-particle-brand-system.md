# ADR 007: Adopt the particle-dissolving brand system

**Date:** 2026-09-15
**Status:** Accepted

## Context

The website used an earlier smooth geometric `A` assembled from a small set of extracted assets. The owner supplied a complete professional brand kit with a new particle-dissolving `A`, official lockups, exact colors, companion fonts, favicon exports, and social artwork.

## Decision

Use the supplied production assets without redrawing them:

- `badge-primary.svg` anchors the hero.
- `horizontal-primary.svg` serves wide header and footer placements.
- `symbol-primary.svg` serves compact navigation.
- The supplied favicon, Apple touch icon, manifest, and share card populate site metadata.
- Barlow Condensed Bold and Inter are hosted locally from the kit with their license files.
- The website's core tokens use forest `#01291A`, cream `#FEFBF3`, and terracotta `#DE5726`.

## Why

The complete kit provides a consistent, scalable identity across browser chrome, page content, and shared links. Using the official outlined SVGs preserves the approved particle geometry and lettering at every screen density. Local fonts keep typography stable without adding a third-party request.

## Alternatives rejected

- Keeping the previous smooth mark would leave the site out of sync with the current company identity.
- Recreating the logo with live text or CSS would alter the approved lettering and particle placement.
- Using only PNG exports would make large hero and navigation placements less crisp than the supplied vectors.

## Consequences

The traced SVGs are larger than simplified hand-authored marks, but they preserve the approved artwork and remain sharper than raster replacements. Future updates must replace the official files as a set and retain their proportions, clear space, and internal geometry.
