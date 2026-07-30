# Diagram Standard (blogs, lead magnets, book, slides)

**Canonical sources:** the book figure standard, `01_Book/Production/Metrics_Mayhem_Figure_Briefs.md` (the nine published figures, SVGs in `01_Book/Production/Figures/`), plus Voice Codex §17, §24.11 (dark visual guidance) and §24.15. Samples: `samples/diagram_sample_light.png`, `samples/diagram_sample_dark.png` (data figures) and `samples/diagram_concept_sample_dark.png` (concept/flow). Producers: `templates/mo_visual_kit.js diagram-sample` (data figures) and `templates/mo_diagram.js` (concept/flow).

This standard is deliberately in line with `Blog_Thumbnail_Standard.md`: same navy palette, same mint/teal system, same "render is not shipping" QA discipline. A diagram and a thumbnail from the same post should read as the same brand.

## Where this sits in the MO brand (two surfaces, one identity)

MO runs two visual surfaces, and diagrams belong to the first. This is intentional, not drift:

- **Dark visual-asset surface (§24.11):** blog thumbnails, OG cards, diagrams, social visuals, slide hero frames. Navy `#0a0e17` canvas, bright mint `#64ffda`, Archivo Black display, faint mint grid, lens motif. Built to stand out in a feed and to embed as an image. Diagrams share this surface exactly with `Blog_Thumbnail_Standard.md`.
- **v2.0 web/email token surface (`Brand_Design_System_v2.md`):** light backgrounds, Montserrat headings, DM Sans body, teal `#2F9E8D`, ink `#16282D`. Used for the site, beehiiv post bodies, signature, in-body buttons.

The two surfaces share **DM Sans (body)** and **Space Mono (labels/eyebrows)**, so they read as one identity. A diagram uses the dark surface because it ships as an embedded image sitting next to the post's thumbnail, not as web body copy. When a figure is placed on a white page (print, lead-magnet PDF, book), use the light variant below, which leans to the v2.0-compatible neutrals. Token changes to the dark surface are proposed by Growth via `[BRAND]` and recorded in `Brand_Design_System_v2.md` + the System Changelog, same change-control as v2.0.

---

## Two diagram families

Every diagram is one of two families. Pick the family first, then the producer.

1. **Data figures.** Bars, lines, distributions: a number is the point. House idiom is Figure 1.1: neutral grey series, one accent element carrying the argument. Producer: `mo_visual_kit.js` (`diagramTheme` + the `diagramSample` pattern). Working canvas 1600x1080, export 2x, SVG kept as source.
2. **Concept / flow diagrams.** Boxes, bands, cards, spectrums, arrows: a relationship or a decision is the point (blast radius, layers, gates, before/after, who-owns-what). Producer: `templates/mo_diagram.js`. Canvas 1200x680 (matches the OG/embed frame).

The blast-radius embed that triggered this standard is family 2. Family 2 had no reusable producer, so it was hand-built and the text overflowed. That is now fixed: `mo_diagram.js` measures and wraps every string.

---

## Spec (shared)

- **Feel:** serious business book for C-suite technology leaders. Clean, authoritative, data-driven. Not startup-playful, not enterprise-boring.
- **Flat only:** no 3D, no drop shadows, no icons, no emojis, no stock humans, minimal chart junk. One insight per figure. (Gradients are allowed only as the navy canvas wash and the green→amber spectrum bar; never on text.)
- **Accent discipline:** neutral greys/teal carry the structure; a signal colour marks only the element the argument turns on. One accent idea per diagram.
- **Caption:** one sentence of meaning, one of source, beneath every figure in the post body. UK English, no em dashes.
- **Greyscale-safe:** every figure must still read with colour removed. Never encode meaning in colour alone; pair it with position, label, or order.

## Palette (dark variant, §24.11, the default for blog/slide)

| Token | Hex | Use |
|---|---|---|
| navy / navy2 / navy3 | `#0a0e17` `#0c1929` `#0e1f35` | canvas gradient |
| card bg | `#0e2038` | node/card fill |
| band bg | `#10233a` | headline-rule fill |
| bright mint | `#64ffda` | eyebrow, headline-band border, primary accent |
| mint | `#2dd4bf` | secondary accent |
| teal | `#14a3a8` | structural accent, brand footer |
| **green** | `#7bd88f` | **low / safe / success** (semantic) |
| **amber** | `#ffd166` | **high / caution / warning** (semantic) |
| white | `#ffffff` | primary ink |
| grey | `#9fb0bd` | body/label ink |
| arrow/muted | `#4a6272` | connectors, hairline borders |
| grid | mint @ ~3% | faint background grid |

**Light variant (print, lead-magnet PDFs, book):** white bg, ink `#1a1a1a`, axis `#c2c9cc`, gridlines `#e9ecec`, labels `#6c7a82`, neutral bars `#cccccc`, accent `#0d7377` or `#64ffda`. Used when the diagram sits on a white page.

**Colour semantics are load-bearing.** Green = low blast radius / safe / go. Amber = high blast radius / caution / decide by hand. Teal/mint = structural, neutral, "always". Do not use green/amber decoratively; a reader should be able to infer safe-vs-risky from colour position without reading a word.

**Token provenance.** navy, mint `#64ffda`, teal, white and grey are the established §24.11 / shared-token dark palette (same as the thumbnail standard). Amber `#ffd166` is the existing brand emphasis token, here given the fixed meaning "high / caution". Green `#7bd88f` is the one **new** token this standard introduces, as the semantic partner to amber ("low / safe"); it is filed for ratification into the dark-surface token set so it does not read as an ad-hoc colour. Until ratified, use it only for the safe/low end of a risk pairing.

## Typography

Archivo Black (display), DM Sans (body/labels), Space Mono (eyebrows, EXAMPLES/axis labels, footer). In the sandbox these fall back to Liberation Sans / DejaVu; the fallbacks are acceptable for drafts, the branded fonts for final. Body labels ~21–26px at the 1200-wide canvas; mono eyebrows 15–20px, letterspaced 2–3.

## Layout grammar (concept/flow)

The house composition, top to bottom:

- **Eyebrow:** mono caps, bright mint, top-left (the diagram's category, e.g. the post series name).
- **Title + optional subtitle:** white bold display + grey one-liner. One insight, plain English.
- **Cards / nodes:** rounded `#0e2038` box with a 6px coloured accent left-border, ~28px padding, hairline muted border. Inside: mono eyebrow (accent colour), bold white heading, grey wrapped body, 1.4–1.45 line-height. Body is always wrapped to the inner width, never a fixed string.
- **Spectrum bar** (when the point is a gradient of risk): green→amber, mono end-labels in the matching semantic colour.
- **Headline band** (the one-line takeaway): `#10233a` fill, mint 0.55-opacity border, bold white text.
- **Footer:** mono caps teal `METRICS & MAYHEM · MASTERINGOBSERVABILITY.COM`, centered.

Concept diagrams (icebergs, layers, staircases): same palette and flatness, horizontal tiers or simple silhouettes, accent on the waterline/gate/turning point only. The Trust-Gated maturity staircase in the slide system is the house stage-model pattern.

---

## The text-fit rule (mandatory, non-negotiable)

**Never hand-place a fixed text string in a diagram.** Every string is measured and wrapped to the width of the box it lives in. This is the rule the blast-radius miss broke, and it is now enforced in code.

- Build family-2 diagrams from `templates/mo_diagram.js`. Its `wpx()` measures glyph width, `wrap()` breaks text to a pixel width, and `card()` / `band()` / `paragraph()` return their own computed height so a box always contains its content and the next element lays out below it.
- If you must write a bespoke diagram, `require('./mo_diagram.js')` and use `paragraph`, `card`, `band`, `spectrum`, `arrow`, `label`. Do not re-invent fixed `<text>` placement.
- Wrapping errs generous: `wpx` slightly over-estimates width so text fits rather than clips. If a heading still runs long, shorten the words, do not shrink the font below the spec.
- One message per box. If a card needs more than ~4 body lines, the diagram is doing too much: split it or cut copy.

## Text rules (§5, house voice)

All diagram copy is Allan-voiced output and obeys Codex §5 exactly:

- UK English. **No em dashes** (`grep -c "—"` must return 0).
- **No alerting vocabulary.** Never "page/paged/pager/paging". The human *gets the call* / *is called*. On-call, rota, PagerDuty are fine as product nouns.
- Defensible numbers only. No pricing, no named customers, no unverified claims.
- Run `python3 00_Command_Center/s5_lint.py` on the caption + any copy doc. (Note: s5_lint flags the literal word "page"; reword, e.g. "single map" not "one-page map".)

---

## Production

**Concept / flow (family 2):**
```
node templates/mo_diagram.js concept-sample --out <post-folder>/<slug>_<name>_1200x680.png
```
For a real (non-sample) diagram, write a short build script that requires `mo_diagram.js` and composes `card`/`band`/`spectrum`/`arrow`, or extend the CLI. Keep the geometry: 60px margins, 30px gutters, cards on a 3-up grid at ~340px.

**Data figure (family 1):** copy the `diagramSample` function in `mo_visual_kit.js`, swap the data and labels, keep the geometry discipline (axis 250px left, plot 1270px wide, bars ~180px), render both light and dark.

**Output location (mandatory).** `--out` writes into the post's own per-post folder under `04_Newsletter_and_Blog/<date>_<slug>/`, named `<slug>_<diagram-name>_1200x680.png` (data figures `_1600x1080`). Never a shared scratch folder. One diagram, one home, next to its post. (Same rule as `Blog_Thumbnail_Standard.md`.)

**Hosting + embed (beehiiv).** Diagrams embed the same way as OG cards: Al pushes the PNG to the `MrObserv/mo-social-assets` repo root via `push_asset.sh` (needs `$GH_TOKEN`, runs on Al's machine, never in the sandbox). The raw URL is `https://raw.githubusercontent.com/MrObserv/mo-social-assets/main/<filename>`. Then `save_image(raw_url)` to bring it into beehiiv media, and embed as an `imageBlock` node with a caption. beehiiv 404s if the file is not yet hosted, which doubles as the existence check.

---

## QA gate (render is not shipping): two passes minimum, always

**No diagram ships on a single pass.** Every diagram is rendered, reviewed, corrected, then re-rendered and reviewed again with fresh eyes. This is mandatory, not reserved for high-stakes work. The reason is empirical: the blast-radius miss shipped because it was looked at once; and even the standard's own sample needed three passes (overflow, then ragged card heights, then a band/footer collision) before it was clean. First renders lie. Two passes is the floor, not the ceiling.

**Pass 1: build and self-check.** Render, open the PNG at full size, and check all six points below. Note every defect.

**Fix, then Pass 2: fresh-eyes re-check.** Re-render after the fixes and review again as if seeing it for the first time. New defects surface once the obvious ones are gone (equalising card heights created a footer collision that only pass 2 caught). If pass 2 finds anything, fix and add another pass. Only a pass that finds nothing ships. For a bespoke or high-stakes diagram, pass 2 is a fresh-eyes subagent triage review, not just a second look by the same builder.

The six checks, applied on every pass:

1. **Render and open it.** Actually view the PNG at full size. Never ship a diagram you have not looked at.
2. **Nothing exits any box.** No text touches or crosses a border; no element runs off-canvas (check the bottom edge against the footer specifically).
3. **Even spacing + aligned grid.** Consistent margins, gutters and padding. Ragged card bottoms are a defect: equalise a row to its tallest card (`cardRow`). Colliding elements are a defect.
4. **Squint / 300px test.** Shrink to ~300px wide: the one insight still reads, the accent still marks the point, the brand is recognisable.
5. **Greyscale test.** Meaning survives with colour removed.
6. **§5 clean + caption.** No em dashes, no alerting vocab, UK English; caption names a source. `s5_lint` passes.

One insight test: cover the title; the figure should still make its point.

**Tooling note (why builds run from the sandbox):** the OneDrive-synced workspace can hand `node` a byte-stale or NUL-padded view of a just-edited `.js`, so a diagram build may throw a spurious `SyntaxError`. Build and iterate the producer in the sandbox outputs dir, then `cp` the known-good file back to `templates/`, and confirm `LC_ALL=C grep -aPc '\x00'` returns 0 on the canonical copy before relying on it.

---

## Diagram cadence + surface by content type (registered 2026-07-21; GR-2026-07-13-01, GR-2026-07-15-01, GR-2026-07-16-11)

**How many diagrams, and on which surface, by content type:**

- **Conviction / opinion blogs (Deep Dives, thesis posts):** at least ONE concept/flow (family 2) diagram at the core-concept beat, built via `mo_diagram.js`, two-pass QA, embedded as a beehiiv imageBlock with caption + alt. A definitional or decision post that ships with no diagram is a `BLOG_PUBLISH_QA_GATE.md` failure. (GR-2026-07-13-01.)
- **Byte-size Explainers ("What Is X?"):** at least TWO light in-body diagrams that explain the mechanism — a technical / principle diagram is required; a business-flow diagram is optional / additional. Both held to the FULL two-pass + fresh-eyes QA gate, the same bar as thumbnails. Byte-sizes are EXEMPT from pull-quotes (Block Q) and carry the diagrams instead. (GR-2026-07-16-11; **supersedes** the earlier byte-size ≥1-diagram rule GR-2026-07-15-02.)

**Two-surface diagram rule (GR-2026-07-15-01).** A diagram renders on the surface that matches where it lives, not always dark:

- **Light in-body variant** — for diagrams embedded in the blog / email BODY. Light background (`#ffffff`→`#f1f6fa`), dark ink `#12233d`, teal eyebrows, darkened semantic accents (green `#2f9e57` / amber `#b8790a`), light tinted cards + callout band. Matches the v2.0 web/email surface so an in-body diagram does not read as a heavy dark slab in the article.
- **Dark-asset variant** — unchanged (§24.11 navy + mint), for OG cards, thumbnails, and social visuals.

The producer carries a `theme: dark|light` flag; pick the theme from the destination. Both variants hold the identical two-pass QA gate. Growth built the light theme (`mo_diagram_light.js`) and re-rendered the five blog diagrams to it; folding the `theme` flag into the canonical `templates/mo_diagram.js` is a Control code task tracked on GR-2026-07-15-01.

---

**Last updated:** 2026-07-21 — registered the diagram-cadence-by-content-type rules (≥1 per Conviction blog, ≥2 light diagrams per byte-size) and the two-surface diagram rule (dark asset / light in-body), per GR-2026-07-13-01, GR-2026-07-15-01, GR-2026-07-16-11. Earlier note below.

**2026-07-01.** Expanded from the book-figure crib into a full brand standard: added the concept/flow family, the `mo_diagram.js` producer (with `cardRow` equal-height rows), the mandatory text-fit rule, colour semantics, and the QA gate, after a hand-built concept diagram shipped with overflowing text. Same day, on Al's instruction, made **two QA passes the mandatory floor for every diagram** (first renders lie: the sample itself took three passes to reach clean), and added the sandbox-build tooling note. Registration in `00_Design_Standards_Index.md` filed to Control.
