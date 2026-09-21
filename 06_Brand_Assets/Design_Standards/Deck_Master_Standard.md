# Deck Master Standard — the live teaching deck

**Status: REGISTERED 2026-09-21, from Al's rulings 2026-09-15/20 and the four calls of 2026-09-21.** Answers `46_DESIGN_ASK_VIDEO_DECK_2026-09-15.md`. **Producer:** `08_Revenue/Vendor_Engagement_Toolkit/_deck_source/build_deck.js` v2.1.0+ (pptxgenjs, token-consuming). **First use:** TT05, records 6 October.

**This document names tokens, never hexes.** For values, read `design-tokens.json` (3.3.1+).

## What this deck is

The deck is **presented live on camera and captured in the recording** — it is the teaching surface, not a post-production asset. It absorbs what FULL CARD and FULL DIAGRAM HOLD did under the retired four-type card system: a full-frame beat is now a slide, zero post-production. The only video overlay that survives is LOWER THIRD (`Video_Card_System_Standard.md` v2.0).

**Output is real `.pptx`.** That is what makes live presenting possible. Do not replace the producer with an SVG kit or an HTML deck.

## One master, built to the worst case

One master, not variants (Al). Every layout must survive the worst case simultaneously:

- **The camera zone.** Al is on frame during slides as a **corner insert, bottom-right**. The master reserves a **480×432px zone (25% × 40%) at bottom-right of the 1920×1080 frame**, on every layout. Content never enters it; the footer shortens to clear it. The zone is a master-level guide, not a per-slide decision.
- **Type floor: body 32px, labels may go to 24px** at 1920×1080. Body, bullets, headings ≥32px; diagram edge-labels, axis ticks, kickers and the footer may go to 24px, never below. The floor binds because slides ship through video compression, not as crisp exports.
- **Worst-case content:** the longest realistic title (two lines at the title size), 4-bullet body slides, and the densest TT diagram must all fit with the camera zone reserved. A slide that needs smaller type than the floor is a content problem — split it.

## Surface and slide grammar

- **Ground is light** (`ground`), matching the ruled mode for teaching material that fronts writing; dark (`dark-ground`) is permitted only for the title/section-divider slides the v2 slide system already uses. Max two grounds per deck.
- **Diagram slides are LIGHT to match** (Al, 2026-09-21). Produced by `producers/mo_diagram.js --theme light` — the canonical producer's ratified palette switch. **Hand-built light diagrams remain a standard violation** (`Diagram_Standard.md`). Embed the rendered PNG full-slide minus margins and camera zone; labels obey the 24px floor **at rendered size on the 1920×1080 frame**, so check after scaling, not in the diagram's own pixels.
- **Type:** Montserrat ExtraBold (titles), DM Sans (body), Space Mono (kickers, labels, footer) — from `fonts.required`, no substitutes.
- **Marks:** ring mark by name from the marks manifest, never by filename. House lockup (MASTERING OBSERVABILITY) — the teaching series is house lane.
- **Canvas:** flat ground plus one radial teal wash per `structure.wash`. No gradient, grid or glow.

## Proving the master

1. **Synthetic worst-case deck first** (Al, 2026-09-21): longest title, densest diagram, 4-line bullets, every layout, camera zone drawn as a visible guide box. Full-size review 26 Sep.
2. **TT05 is then built on the proven master.** The synthetic deck is the master's test fixture and stays in `_deck_source/` for regression after any master change.
3. Review at 100% on a 1920×1080 output, not in the PowerPoint editor thumbnail. Two passes, fresh-eyes second.

## QA gate

Every slide: nothing in the camera zone; body ≥32 / labels ≥24 at frame size; light diagrams from the canonical producer only; tokens and fonts correct; §5 clean copy; the producer's `assertNoRetired` self-gate passed (it runs on every build).

## Changelog

### 2026-09-21 — registered
From the 09-15 ask and the 09-21 calls: corner-insert camera zone, light diagrams via the existing `--theme light`, body 32 / labels 24, synthetic-then-TT05 proving order. Recorded: the ask assumed `mo_diagram.js` was dark-only and needed extending — it did not; the light theme has been canonical since 2026-08-23 and token-assembled since 2026-09-16.
