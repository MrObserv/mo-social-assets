# Mastering Observability Brand Design System v3.1

**Version:** 3.1.0. **Status:** ratified. **Date:** 2026-09-11. **Owner:** Growth. **Decisions by:** Al, 2026-09-11.

This file is canonical for every visual decision. It **supersedes** the colour and type tables in `Brand_Design_System_v2.md`, the "Shared brand tokens" block in the old index, the stale token lines in `Web_Design_Best_Practices.md`, and the palette and display face of `Long_Form_PDF_Standard.md` v1.0.

Per-asset standards keep their production rules, QA gates and output paths. They stop carrying their own palettes and reference this file instead. **One place to change a colour.**

Machine-readable companion: `design-tokens.json`. Producers read that file. They do not carry palettes.

---

## 1. Governance

Semantic versioning, one current version, a changelog entry per change, the previous version archived. Same discipline as the Voice Codex, because that one already works.

- **MAJOR** — a token or identity change. Every downstream producer and standard repointed in the same patch.
- **MINOR** — a new component or asset format inside the existing identity.
- **PATCH** — a clarification, a corrected value, a QA rule. No visual change to anything shipped.

**Five steps, per change.** Propose into the Growth inbox with a CR id. Record the old value in the changelog *before* applying. Apply here first, then every producer and standard in the same patch. Render one asset per affected component and look at it, full size and at the size it will really be seen. Bump the version and write the changelog row with date and who decided.

A brand change never lives only in a chat.

---

## 2. Modes

**Light (mode C) is the brand.** Dark (mode B) is not a second identity; it is what the brand does when the asset has to survive someone else's dark chrome.

**The test:** does this asset render inside someone else's dark UI?

| Dark | Everything else |
|---|---|
| YouTube thumbnails · square episode art · video cards and lower thirds · 9:16 bookends · studio and call backgrounds · deck opener, dividers and closer · ebook covers | Website · email · blog and OG cards · carousels · quote cards · all three diagram families · deck content slides · print and the book |

A light card in a dark player reads as a broken render, and a face only separates from a dark ground at 160px. That is a technical constraint, not a preference, which is why it does not get re-litigated.

**Deck punctuation budget:** three to five dark slides in a twenty-five slide deck. Never two dark slides in a row outside the open and close.

---

## 3. Tokens

### Light

| Token | Hex | Use |
|---|---|---|
| ground | **#F6F8F7** | Page and canvas ground |
| panel | **#FFFFFF** | Cards, zones, table cells |
| tint | **#EAF6F3** | Tinted panels, icon discs, table headers |
| ink | **#16282D** | Body text |
| navy | **#0D2127** | Headings, dark blocks inside light |
| muted | **#3B5257** | Secondary prose |
| soft | **#5A6E72** | Captions, meta, footers |
| teal | **#2F9E8D** | Graphic only: rules, borders, fills, icons |
| teal-deep | **#17695C** | Text, links, kickers, buttons |
| border | **#C9DCDC** | 1px hairlines |
| hairline | **#DCE7E5** | Internal dividers |
| semantic-high | **#8F6109** | Caution, breach, the thing the argument turns on |
| semantic-low | **#237A45** | Safe, healthy, resolved |
| neutral-series | **#CCD6D8** | Unaccented series in data figures |

### Dark

| Token | Hex | Use |
|---|---|---|
| dark-ground | **#0D2127** | Canvas |
| dark-panel | **#1C3C45** | Cards, ghost numerals, silhouette fill |
| dark-motif | **#13313A** | Terminal bodies, decorative rings |
| teal | **#2F9E8D** | Rules, buttons, accents |
| teal-bright | **#74DDCD** | Kickers, payoff words, chips |
| on-dark-body | **#D5E0E1** | Body text |
| on-dark-soft | **#9FB0BD** | Secondary text |
| semantic-high | **#FFD166** | Caution |
| semantic-low | **#7BD88F** | Safe |

### Rules that are not obvious

- **teal is not a text colour on light.** It measures 3.08:1 on ground. Text and links use teal-deep.
- **soft is light-mode only.** On dark use on-dark-soft.
- **Semantic pairs are mode-dependent.** Same meaning, different hex. Using #FFD166 on a light ground is a fail.
- **One radial teal wash per dark canvas**, 10 to 22 per cent. Never two, never on light.

### Retired, do not use

**#0a0e17** · **#64ffda** · **#0d7377** · **#2dd4bf** · **#F5F3EC** · **#FBFCFC** · **#63797D** · **#A8720B** · **#2F9E57** · **#5f6d75** · **#16333B** · Archivo Black · the faint mint grid.

**#5f6d75** was an undocumented grey in `Diagram_Standard.md` and `mo_diagram.js`, doing the same job as soft on the same grounds. Measured 5.01:1 against soft's 5.04:1 — a duplicate, not a distinct token. Folded into soft. **It passed AA, so the twelve shipped light diagrams are not re-rendered and the 2026-09-01 acceptance holds.** **#16333B** was an undocumented ghost-numeral navy, folded into dark-motif.

Shipped assets are not retrofitted. New renders use the new values.

---

## 4. Type

| Role | Face | Notes |
|---|---|---|
| Display | Montserrat 900 | Asset titles, H1, covers, slide titles. Tracking -1.5px to -4px. |
| Heading | Montserrat 800 | H2 to H4, card and slide titles. |
| Body | DM Sans 400 and 700 | Leading 1.65, measure capped around 64 characters. |
| Label | Space Mono 700 uppercase | Kickers, eyebrows, timestamps, figures, code. Tracking 4px at 12px, 1.5px at 10.5px. |

**Space Mono carries kickers on every surface**, including architecture diagrams. This reverses the code-only demotion in `Architecture_Diagram_Standard.md` §2 and §4, which must be amended (Al, 2026-09-11).

**Minimums.** 24px on a 1920 slide. 12pt in print. 16px in email body. 24px for the ring mark.

---

## 5. Structure

- **Radius** 3px chips, 4px buttons, 6px cards, 8px large panels. Nothing rounder.
- **Rules** 1px #C9DCDC. One weight. A heavier line must mean something.
- **Grid** 1120px content, 16 to 28px gutters, 18px card gap, 1px joined-cell gaps.
- **Section rhythm** 34 to 56px vertical padding, hairline divider between sections.
- **Buttons** solid #17695C with white text, radius 4, padding 11px 20px, DM Sans 700. On dark, #2F9E8D fill with navy text. Ghost buttons carry a border and are secondary only.

---

## 6. Marks

Full standard: `Logo_and_Marks_Standard.md`. In short:

- **Ring mark** identifies. Minimum 24px, clear space equal to the inner ring radius, three colour versions only.
- **Crosshair** is furniture. Document and diagram surfaces, top right, one per page, drawn never typed.
- **Lens wash** is texture. Dark surfaces only, one per canvas.

**Lockup by lane.** Podcast lane carries METRICS & MAYHEM. Everything else carries MASTERING OBSERVABILITY.

---

## 7. Motion

Derived from what the producers already do, so nothing shipping has to change to adopt them.

| Token | Value | Use |
|---|---|---|
| quick | 160ms | Hover, chip, tooltip |
| standard | 320ms | Most transitions |
| deliberate | 600ms | A card taking the frame |
| reveal | 1650ms | The scan-line name print |
| bumper | 2400ms | Signal Check |
| cold-open | 7000ms | Intro head |

**Two easings.** enter `cubic-bezier(0.2, 0, 0, 1)`, exit `cubic-bezier(0.4, 0, 1, 1)`. Leaving is always faster than arriving. Never linear except a cursor blink or a progress bar. No bounce, no overshoot, no spring.

**Reveal grammar.** Scan line for a name or title landing, once per piece. Type-on for terminal content only, 28ms a character with the block cursor. Rise and fade for everything else: 12px up, 320ms, enter easing, 60ms stagger. Cards on at the line, off 1.5s after; a diagram hold stays for the explained beat.

**30fps.** Every master 1920x1080 with a 1080x1920 cut. On the vertical cut everything sits inside the middle 60 per cent, the day chip is dropped and the underline centres.

---

## 8. Diagrams

Three families, eighteen patterns, one arrow grammar. Catalogue and reference renders live in the design system page; the rules live in `Diagram_Standard.md` and `Architecture_Diagram_Standard.md`, which share one QA gate.

**Family by intent.** A number is a data figure. A relationship or decision is concept and flow. A system is architecture.

**Mode by placement.** In body copy, light. Standalone in a feed, dark. Client-facing architecture, always light.

### Arrow grammar (new, QA point 14)

Boxes are nouns, arrows are verbs. **Five edge types and no sixth without a CR.**

1. **Solid** — a call or the main flow.
2. **Dashed** — telemetry, async, or secondary.
3. **Fan-out** — one trunk, a junction dot, then branches. Never N lines from one edge.
4. **Feedback** — routed below the spine, always labelled.
5. **Grey dashed** — planned, not yet live.

- One direction per diagram. Left to right, or bottom to top for a stack. Never both.
- One weight, one hue. 3px teal at the 1200 canvas.
- Single arrowhead, drawn as a polygon, 16px long, 18px at the base, 6px standoff from the target edge. Never a typed glyph.
- Bidirectional is two arrows with their own labels. A double head hides which way the dependency runs, which is usually the point.
- Orthogonal routing at 12px corner radius, or dead straight. Curves are for feedback loops only.
- Reroute before you cross. Two crossings is the ceiling; three means the layout is wrong.
- Labels ride the line in a ground-coloured chip, Space Mono caps, never rotated.
- **An unlabelled arrow is a defect**, not a style choice.
- Nine edges maximum against about seven components.

---

## 9. QA gates

**Rendering is not shipping.** Two self-passes minimum, fresh eyes on the second, an independent challenge for anything client-facing.

Diagrams clear the fourteen-point gate, carried verbatim in both diagram standards: one idea one direction · notation honest · alignment · spacing · connections · colour semantics · legibility and contrast · Codex §5 · glyph safety · corner and overlay integrity · containers hug content · grid gutters · provenance shows · **arrow grammar**.

**Contrast is measured, not asserted.** See `Contrast_Audit_2026-09-11.md`. Re-run it on any colour change before the change ships.

---

## 10. Changelog

### 3.1.0 — 2026-09-11 · ratified
The first ratified release of v3. Full surface coverage. Marks and motion added as foundations, neither of which had a standard anywhere. Email layout, dark-mode guidance and the text-only signature. Quote card specced for the producer. Video surfaces: full card, lower third, corner insert, title card, bookend, series badge, studio backgrounds. Contrast audit run for the first time; **six of twenty-six pairings failed AA**. soft #63797D, light caution #A8720B and light safe #2F9E57 replaced with **#5A6E72**, **#8F6109** and **#237A45**; the other three failures became usage rules. Canva retired. Arrow grammar ratified as QA point 14.

### 3.0.0 — 2026-09-11 · unratified draft state within the 3.1.0 cycle, not a separate release
System consolidated into one file after the website rebuild. Three surfaces collapsed into one palette with a light and a dark mode; **mode C ruled as the brand**, mode B scoped to the podcast and video lane plus deck punctuation. Five undocumented shades ratified. Space Mono confirmed as the single kicker face, reversing its architecture-surface demotion. Light slide ground moved from #F5F3EC to #F6F8F7; architecture ground from #FBFCFC to #F6F8F7. Diagram catalogue completed to eighteen patterns. Deck system built to eleven masters. Ebook surface rebuilt, superseding `Long_Form_PDF_Standard.md` v1.0. Square episode art: terminal to Tech Tuesday, waveform to Signal Drop, Metrics & Mayhem header on both, reversing the terminal element of the 21 July lock while keeping its headshot-free ruling. Four YouTube variants built, three approved.

### 2.0.1 — 2026-09-10
Website buttons ruled to #17695C with white text. Applied to Home; /advisory repaints under 3.1.0.

### 2.1.0 — 2026-07-31
White architecture surface ratified as a third surface (GR-2026-07-30-03). **Collapsed into light mode under 3.0.0.**

### 2.0.0 — 2026-06-24
v2.0 adopted. Montserrat, DM Sans and Space Mono replace Space Grotesk and Helvetica. Teal token set established.

---

## 11. Consumers

**A producer that defines a hex is a defect.** `mo-tokens.js` and `mo_tokens.py` are the read path; both throw on an unknown token and both expose `assertNoRetired` so a build fails on a retired hex rather than shipping one.

As of 2026-09-11, **nothing consumes this file yet.** Until one producer does, v3 is a document rather than a system and the next colour change costs the same manual sweep as the last one.

| Producer | Retired-token hits | Status |
|---|---|---|
| `templates/mo_diagram.js` | 10 | Not consuming. **Do this one first** — it already has a theme switch, so it is the smallest honest proof. |
| `templates/long_form_pdf/reference_strategy_template.html` | 13 | Not consuming |
| `Slide_System/mo_slide_template.js` | 8 | Not consuming |
| `templates/mo_visual_kit.js` | 2 | Not consuming |
| `tools/thumbnail_builder.py` | 2 | Not consuming |
| `templates/mo_quote_card.js` | 1 | Not consuming |
| `templates/render_arch_kit.py` | 1 | Not consuming |

## 12. The two trees

`mo-social-assets` mirrors `06_Brand_Assets` in full and carries none of v3. It is the tree Buffer pulls from, so **the copy that renders published assets is the one still on the retired palette.** GR-2026-08-24-04 logged this drift for a single file; it is the whole system.

**Owed decision (Al):** one tree is canonical and the other is a build output. Recommendation: `06_Brand_Assets` is canonical; `mo-social-assets` becomes a publish target written by a sync step and never hand-edited. A hand-synced twin is the same failure as a hand-synced Canva kit, at larger scale.

## 13. Still owed

1. **Make one producer consume the token file end to end.** Nothing else on this list matters until that exists. Then the rest: `mo_diagram.js`, `mo_visual_kit.js`, `thumbnail_builder.py`, `tt_thumbnail_builder.py`, `sd_terminal_square.py`, `render_arch_kit.py`, `render_carousel.py`, the podcast renderers.
2. Strip the palette tables out of the per-asset standards and point them here.
3. Amend `Architecture_Diagram_Standard.md` §2 and §4 for the Space Mono kicker reversal.
4. Build the five new diagram patterns as `build_*` functions.
5. Build the quote card and move the carousel fully off Canva.
6. Dark and mono ring mark SVGs, favicon set, locked-up wordmark asset.
7. Move the eleven `.bak` files to `_archive/`.
8. Send a dark-mode email test to Outlook, Gmail and Apple Mail.
9. Add a quarterly performance note to the changelog: which variants won.
