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
- **One radial teal wash per canvas**, 10 to 22 per cent. Never two. **20 per cent on dark, 12 per cent on light** — values in `design-tokens.json` `structure.wash`, never hardcoded in a producer. Amended 2026-09-14 by Al, reversing "never on light": the original rule was written before anyone had rendered a light card, and a light card with no wash reads flat. Three alternatives were built and rejected — a flat `tint` field, the `signal_line` motif as the card graphic, and a white panel on `tint`.

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
- **Lens wash** is texture. One per canvas, both modes — 20 per cent on dark, 12 per cent on light.

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

### 3.3.0 — 2026-09-18 · ruled by Al
**The Signal carries its issue number.** The newsletter eyebrow becomes a template, `THE SIGNAL · NO. {issue}`, and `mo_visual_kit.js blogthumb` requires `--issue` for surface `the_signal` — it composes the eyebrow rather than accepting one. `eyebrowFor()` throws below the 101 anchor, so a restart at "01" fails a render instead of shipping.

The defect this closes: `--eyebrow` was free text and its gate proved only that an eyebrow had been PASSED. A hand-typed `THE SIGNAL` satisfied it and shipped a numberless card. Presence, not correctness — the same failure class as the eyebrow that once defaulted to THE OBSERVABILITY DIGEST.

The number is checkable rather than remembered: issue 101 is 2026-08-21 and the cadence is weekly, so 2026-09-18 is 105. Corroborated at 102 = 2026-08-28 by a live first comment.

**Resolved the same day, after Al ruled.** `The_Signal_Card_Standard.md` is rewritten against v3 and now sits in this tree, naming tokens and quoting no hex at all. `thumbnail_builder.py` is repointed onto `design-tokens.json` via `mo_tokens.py` (v1.5.0), the masthead is light, the dark masthead is retired, and `ISSUE NNN` is the single vocabulary. The Python is verified statically but NOT executed — there was no interpreter available — so its first invocation is the real test; the runbook carries three commands, two of which must fail.

No colour value changed.

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

## 10a. Profile banners

Four surfaces: LinkedIn personal 1584×396, LinkedIn company 1128×191, X 1500×500, YouTube channel art 2560×1440.

A banner cannot be art-directed, because the platform crops it per device and drops an avatar through it. **Design the safe area, then let the rest bleed.** Nothing carrying meaning sits outside it. Safe-area and avatar-exclusion geometry is in `design-tokens.json` under `safe_areas`.

**Mode follows the platform's chrome, not the asset.** LinkedIn is light — its chrome is white and the banner abuts it. X and YouTube are dark, because a light banner inside a dark player or a dimmed timeline reads as a rendering fault.

**Lockup splits by lane.** LinkedIn carries the house lockup: it is the professional and writing surface. X and YouTube carry **Metrics & Mayhem** — they front the podcast.

**YouTube is the only centred composition in the system.** Its crop is symmetrical, so the composition has to be, and the channel name is the title — a claim gets cropped to nonsense on a TV.

**QA, all four:** render, then crop to the safe area and check it still says something. If the cropped version is meaningless, the banner is wrong.

## 10b. Business card

85 × 55 mm UK, 91 × 61 mm with 3 mm bleed, 300 dpi, CMYK. Geometry in `design-tokens.json` under `print.business_card`.

**Dark front, light back** — the pairing already ratified for ebooks, for the same reason. The front is identity and can afford to be a solid object; the back carries information and has to be read in bad light by someone who has just met you. Print has no chrome to answer the mode question, so the object's own logic decides: one side to be recognised, one side to be used.

Front: teal edge band bleeding off three sides, ring mark top left, name in Montserrat 900 at 18pt, teal rule, house wordmark in Space Mono. Back: kicker, one line of positioning in Montserrat 800 at 9pt, contact block, optional 11 mm QR reserve pointing at `/signal` rather than the home page.

**Two print risks.** Navy needs a rich black build (60/40/40/100) or it goes muddy on a default 4-colour conversion. Teal sits outside CMYK gamut and will dull — proof it or spot-match it. 400 gsm uncoated, matt or soft-touch; gloss fights the navy. No spot UV, no foil, no rounded corners.

**Deliberate deviation.** The system sets a 12pt print floor. A card cannot hold it — 12pt contact details on 85 mm leave no room for a name. The floor here is **5pt, and 6pt for anything typed into a phone**. Written down with its reason so it is an exception rather than a drift. QA: print one at actual size and hand it to someone over 45 in a dim room.

## 10c. Claims

`claim-bank.json`, v1.0.0. Twenty-two claims, each with a gear, a hinge and its permitted surfaces.

Every component spec says *one claim, twelve words or fewer* and then leaves the producer to invent one. **A claim comes from the bank; a new claim is a CR, not a production decision.** The Voice Codex governs prose; this governs the line that gets the most impressions and the least review.

Rules: twelve words maximum, under eight better. One hinge per claim. Four runs then rest for a quarter, because overuse turns a line into a slogan and a slogan is the opposite of a practitioner talking. Two claims carry conditions — **C06** never runs without its source named on the same surface, **C21** is channel-limited.

Every line was lifted from shipped posts, the advisory page, the deck masters or the book, so each has already passed the Codex in context. Nothing in the bank is newly invented copy.

## 10d. Marks manifest

**Resolve a mark by name from `marks` in `design-tokens.json`. Never by searching the tree.** A search of `06_Brand_Assets` finds `logo-master.svg` and `favicon.svg`, both of which predate the ring mark — which is exactly why the ring mark could not be found: it existed only at `07_Website/Pages/home/mo_ring_mark.svg`, inside a website page folder, and was never in the brand assets tree at all.

Canonical files now live at `06_Brand_Assets/Design_Standards/marks/`. Six files: ring mark and signal line, each on light and on dark, plus a small ring variant per mode.

**The ring mark has a crossover at 40px.** Below it, use the small variant — the hairline rings vanish at favicon and avatar sizes, so the small variant carries a 2px ring and a larger centre. Absolute minimum 16px. `favicon.svg` predates all of this and is owed a rebuild from `mo_ring_mark_small_on_dark.svg`.

**The signal line's breach segment must actually breach the dashed threshold.** It is a diagram, not a squiggle.

## 10e. Photography

Headshot grade is `photography.headshot_grade` in the token file: saturation 0.78, brightness 0.95. Desaturated and slightly pulled down so the subject sits under the type rather than competing with it. Applied by the producer, never baked into the source file. Cut out or feather-masked against the dark ground; no square photo blocks.

This was previously a brand decision living in a JavaScript literal inside `mo_visual_kit.js` — the same class of problem as a hardcoded palette.

## 10f. Failure modes — read this before changing anything

Every entry below actually happened in this system, most of them during the build of v3. They are written down because each one was found by a human noticing, not by a check. **The rule is the same every time: if a check reads something other than the artefact that ships, it is theatre.**

### F1. A single-source rule does not create a single source

v3 declared `design-tokens.json` canonical and left every copy of the palette in place. Stating the rule changed nothing. **A single source exists when the copies are deleted and the build fails if one returns.** That is why `assertNoRetired` exists and why it belongs in a build rather than a checklist.

### F2. Checking the source instead of the artefact

`assertNoRetired` read the producer's own source. Marks are base64-embedded at render time, so four retired hexes shipped with a green build. **Check the composed render, not the inputs.** `assertRenderClean` decodes every `data:` URI and now lives inside `renderPng` so it cannot be skipped.

### F3. A fallback is a silent failure

A font-family stack means a missing Montserrat renders as Liberation Sans and nothing complains. An unknown token returning `undefined` renders as transparent and nothing complains. **Every resolver in this system throws instead of falling back:** unknown token, unlisted mark, missing mark file, missing font face, unpermitted mode, surface in neither lockup lane.

### F4. Embedding is not installing

`@font-face` in an SVG does nothing — librsvg ignores it and renders through fontconfig. Three byte-identical renders proved it. **Confirm the mechanism before optimising the implementation.**

### F5. A mirrored tree drifts the moment you update one copy

`mo-social-assets` mirrors `06_Brand_Assets` and got none of v3 — and it is the tree Buffer publishes from. The system that warned about copies was itself copied. **One tree is canonical; the other is a build output, never hand-edited.**

### F6. An asset resolved by search returns the wrong asset

The ring mark could not be found because it lived only in a website page folder. Searching `06_Brand_Assets` returns `logo-master.svg` and `favicon.svg`, both pre-ring-mark, and returns them confidently. **Resolve by name from a manifest. If it is not listed, it does not exist.**

### F7. Undocumented values are invisible until measured

`#5f6d75`, `#16333B`, `#6c7a82` and eight more were load-bearing and in no table. One of them, `#6c7a82` at 4.43:1, was failing AA on every shipped light figure. **Measure before assuming; a value nobody wrote down is a value nobody checked.**

### F8. A spec nobody can produce from gets invented at production time

Every component said *one claim, twelve words or fewer* and left the words to whoever was building the asset. That is voice drift with a process behind it. **If a spec requires a judgement, supply the bank the judgement draws from** — hence `claim-bank.json`.

### F9. Renumbering breaks cross-references, and checking the number is not checking the link

Inserting a section and bumping the next one produced two sections numbered 07 on a page arguing for single-source rigour. Fixing that then produced a worse version: the chip's **label** was renumbered and its **href** was not, so "07 Failure modes" scrolled to the changelog and the new section was unreachable.

The verification script compared numeric prefixes and reported clean, because the numbers were the only thing it looked at. **That is F2 again** — checking a property of the artefact instead of the artefact's behaviour.

**After any renumber, resolve every link:** assert each href matches a real id, no two point at the same target, and no section is orphaned. Numbers are labels; hrefs are the thing that works.

### F9b. A loader written against an unshipped shape

`mo_visual_kit.v3.js` resolved marks through `T.mark("ring_mark", variant)`. The token file **committed to the repo** still carried the older descriptive `marks["ring-mark"]` block with no file paths and no crossover. The producer was correct against a manifest that existed only in the export folder, so committing it would have thrown on first run.

The same turn also declared a `canonical_dir` of `Design_Standards/marks/` while the repo's marks already lived at `06_Brand_Assets/marks/` — which would have created the second marks directory the manifest exists to prevent.

**A contract has two sides. Changing the reader without shipping the writer is the same defect as changing the writer without the reader** — and it is invisible locally, because both halves are correct in the folder you are looking at. Check the shape against the tree that will run it, not the one you just wrote.

### F9c. Correcting a field to a second wrong value

`marks.canonical_dir` first pointed at `Design_Standards/marks/` when the repo's marks lived at `06_Brand_Assets/marks/`. That was corrected — to `06_Brand_Assets/marks/`, just as the eleven new variants were committed to `Design_Standards/marks/`. The declaration was wrong, then corrected, then wrong again in the opposite direction, and both times it was written from reasoning rather than from the tree.

Resolution kept working throughout, because the loader derives the path from `__dirname` and never reads `canonical_dir`. **A declaration nothing consumes cannot fail loudly** — which is why it drifted twice without a single error. Either something reads it or it should not exist.

### F10. A mechanical read of a rule can overrule a human decision

The mode rule was applied literally and flipped the blog card to light, contradicting the approved master. **The rendered master outranks a rule derived from it.** When they disagree, the design is right and the rule needs a clause.

### F10b. Asserting the state of a system instead of reading it

This file said `mo-social-assets` "carries none of v3". Reading the repo showed it carries nearly all of v3 — the standard, the token file, the migration, the audit, all three producers. The claim was written from the shape of the problem rather than from the tree, and then ratified and shipped, where it sat as a false statement in a canonical file.

**It is the same error as F7, one level up: a value nobody measured is a value nobody checked — and that applies to claims about repositories, not just hexes.** The real gap was narrower and elsewhere: three mark files instead of eleven, and a token file two revisions behind its own loaders.

### F11. Deviations must be written with their reason

The business card cannot hold the 12pt print floor. Recorded as a 5pt floor *with the reason*, so in six months it reads as a decision rather than a mistake. **An undocumented exception becomes indistinguishable from drift.**

---

**The check on the checks.** Before adding a QA point, ask whether a human has to remember it. If so, it is not a check — it is a hope. Convert it into something that throws.

## 11. Consumers

**A producer that defines a hex is a defect.** `mo-tokens.js` and `mo_tokens.py` are the read path; both throw on an unknown token and both expose `assertNoRetired` so a build fails on a retired hex rather than shipping one.

**Two producers now consume this file end to end.** v3 stopped being a document
on 2026-09-12 and stopped being a partial system on 2026-09-16.

| Producer | Status |
|---|---|
| `producers/mo_visual_kit.js` | **Consuming** since 2026-09-12. Declares no colour. |
| `producers/mo_diagram.js` | **Consuming** since 2026-09-16. Declares no colour but white. |
| `templates/mo_diagram.js` | **DUPLICATE, filed for deletion 2026-09-21.** 14 retired hits; nothing points at it. Same class as the mo_visual_kit.js duplicate deleted 09-14. |
| `templates/long_form_pdf/reference_strategy_template.html` | Not consuming |
| `Slide_System/mo_slide_template.js` | **SUPERSEDED 2026-06-15** (Slide_Design_System.md v2.0); FAB teaser deck only. Never repoint. |
| `08_Revenue/.../_deck_source/build_deck.js` | **CONSUMING** since 2026-09-21 (v2.1.0). The LIVE deck producer; was in no standard and off this list while its superseded predecessor sat on it. |
| `00_Command_Center/thumbnail_builder.py` | **CONSUMING** since 2026-09-18 |
| `templates/mo_quote_card.js` | Not consuming |
| `templates/render_arch_kit.py` | Not consuming |

Live status is in `design-tokens.json` `consumers.status`, which is the one
that gets updated. This table is a summary and will drift; that file will not.

**A retired-hit count is not a scope estimate.** This table used to carry one
per producer, and `mo_diagram.js` was listed at 10. The real repoint was
**eleven retired values plus fourteen with no v3 equivalent** — fourteen mapping
decisions, one of which needed a new token. Before repointing anything on this
list, count against `colour.retired` rather than trusting a number here.

## 12. The two trees

`mo-social-assets` mirrors `06_Brand_Assets` in full and carries none of v3. It is the tree Buffer pulls from, so **the copy that renders published assets is the one still on the retired palette.** GR-2026-08-24-04 logged this drift for a single file; it is the whole system.

**RULED (Al, 2026-09-14): `mo-social-assets` is canonical.** The opposite way
round from the recommendation that stood here. The working copy under OneDrive
is where editing happens, because that is where node and the fonts are, but it
is not authoritative: a file that exists only there does not exist. Recorded in
`06_Brand_Assets/SYNC.md`, which also states the failure mode this leaves open
— the working copy drifts through ordinary work, and `git status --porcelain`
in the clone is the cheap check.

Measured 2026-09-16: the working copy was at tokens 3.1.0 and still held two
producers deleted from the repo on 09-14. The drift is not hypothetical.

## 13. Still owed

1. ~~**Make one producer consume the token file end to end.**~~ **DONE** —
   `mo_visual_kit.js` 2026-09-12, `mo_diagram.js` 2026-09-16,
   `thumbnail_builder.py` 2026-09-18. Still owed, in
   rough order of exposure: `tt_thumbnail_builder.py`,
   `sd_terminal_square.py`, `render_arch_kit.py`, `render_carousel.py`,
   `mo_quote_card.js`, the long-form PDF template, the
   podcast renderers. (`mo_slide_template.js` came OFF this list 2026-09-21: superseded, not owed.)

   **One unratified value is outstanding:** `dark-border` was added in 3.2.0
   because the dark set had no border or hairline token and a repointed diagram
   needed one. It is the only invented hex in the v3 work. See
   `colour.dark_border_provenance`.
2. Strip the palette tables out of the per-asset standards and point them here.
3. Amend `Architecture_Diagram_Standard.md` §2 and §4 for the Space Mono kicker reversal.
4. Build the five new diagram patterns as `build_*` functions.
5. Build the quote card and move the carousel fully off Canva.
6. Dark and mono ring mark SVGs, favicon set, locked-up wordmark asset.
7. Move the eleven `.bak` files to `_archive/`.
8. Send a dark-mode email test to Outlook, Gmail and Apple Mail.
9. Add a quarterly performance note to the changelog: which variants won.
