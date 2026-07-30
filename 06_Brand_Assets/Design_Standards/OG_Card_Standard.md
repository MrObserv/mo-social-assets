# OG / Newsletter-Card Composition Standard

**Owner:** Growth (brand/design) · **Producer:** `00_Command_Center/thumbnail_builder.py` `compose_og()` · **Surface:** dark-asset (navy #0a0e17 + mint #64ffda, Montserrat ExtraBold / Space Mono / DM Sans) · **Registered:** 2026-07-11 (CR Control -> Growth OG design, layout **B — centred**, Al-approved).

The 1200x630 OG / social share / newsletter card carries the episode with no portrait. It had been art-directed by eye across many iterations and never settled; this standard fixes the composition as a system so `compose_og` renders it correctly every time instead of being nudged per request.

---

## The problem this fixes

The old OG left-aligned a narrow "Allan's Hard Stop" block high in a wide right column, with the title block pinned to a fixed top on the left. The two halves did not relate, the right column floated, and the vertical space was used poorly. Every fix was a manual nudge against a fresh render.

## The layout system (one optical axis, two anchored columns)

One grid, 60px margins. Three horizontal zones:

1. **Top band** — the lockup (lens mark + `METRICS & MAYHEM` wordmark) and the format badge, top-left. Standard §19.6 lockup.
2. **Content band** — `y = 140..500`. Everything lives here and is centred on the band's **midpoint (y = 320)**.
3. **Bottom band** — full-width footer rule + `EPISODE n • ALLAN MANN • MASTERINGOBSERVABILITY.COM` left, `MASTERINGOBSERVABILITY.COM` right, watermark lens bottom-right.

Inside the content band:

- **Left column = the episode title (the hero).** White (`ink`), Montserrat ExtraBold, uppercased, `/`-broken or soft-wrapped at 13 chars, sized by line count (92/84/76/64 for 1-4 lines) and stepped down to fit a 600px column. A mint accent tick (64x4) sits directly under it. The **whole title block is vertically centred on the band midpoint** — it never pins to a fixed top.
- **Vertical divider at x = 700 (~58%)** — a 1px mint rule at 32% opacity running the height of the band. This is the anchor: it makes the two columns read as one composition instead of two floating elements. It is the single most important element the old card lacked.
- **Right column = "Allan's Hard Stop" (the payoff).** A tracked teal (`teal_mid`) kicker `ALLAN'S HARD STOP`, a short centred tick beneath it, then the Hard Stop pull-quote in mint (DM Sans Bold, 32px, wrapped ~17 chars, sentence case as written). The **whole block is centred in its column (cx = 933) AND vertically centred on the same band midpoint** as the title, so the two columns sit on one optical axis and neither floats.

**Alignment decision (layout B, Al 2026-07-11):** the Hard Stop is **centred** in its column (kicker, tick, and quote all centred on cx). Layout A (left-aligned to the divider) was the alternative; B was chosen for symmetry.

## Hierarchy

White heavy title (hero) -> mint accent tick -> tracked teal kicker -> mint quote (payoff) -> teal footer. Two brand fonts do the work: Montserrat ExtraBold for the title, Space Mono for lockup/badge/kicker/footer, DM Sans for the quote. No third weight, no decorative effects.

## Canonical parameters

All live in `CONFIG["og"]` in `thumbnail_builder.py` (single source of layout truth — there are no magic numbers in the drawing code). Key values:

```
band            top 140, bottom 500  (midpoint 320 = the shared optical axis)
title           max_width 600; size_by_lines {1:92, 2:84, 3:76, 4:64}; colour ink
accent_line     64 x 4, 22px below the title
divider         x 700, y 150..500, mint @ 32% opacity, 1px
quote_block     cx 933; kicker "ALLAN'S HARD STOP" Space Mono 14, teal_mid, tracked 3;
                tick 34 x 3, 17px below kicker; quote DM Sans Bold 32, mint, wrap 17, line-height 1.3
watermark       88px lens, 45% opacity, bottom-right above the footer
```

Any change to these requires a `thumbnail_builder.py` edit in this file's lane (Growth proposes, Control edits the code) and a re-render QA.

## Where this sits in the MO brand

This is the **dark visual-asset surface** (navy + mint + Montserrat/Space Mono), the same surface as `Blog_Thumbnail_Standard`, the YouTube thumbnail, the square episode art, and social visuals — distinct from the v2.0 web/email token surface (`Brand_Design_System_v2.md`: Montserrat + teal #2F9E8D on a light background). Both share DM Sans + Space Mono so they read as one identity. See `Diagram_Standard.md` "two surfaces, one identity".

## QA gate (mandatory, two passes — codex §19.6)

Rendering is not shipping. Before an OG is used:

1. Render at full size and eyeball: title fits its column with no overflow; the Hard Stop clears the divider on both sides; the kicker tick reads as a separator, not an underline; both columns sit level on the band axis; footer and watermark clear.
2. Fresh-eyes second pass at the same size (a real second look, not the same glance). Only a pass that finds nothing ships.

First clean render: Ep 23 "The Curiosity You Stop Needing", 2026-07-11 (two passes).
