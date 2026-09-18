# Diagram Standard (blogs, lead magnets, book, slides)

**Canonical sources:** the book figure standard, `01_Book/Production/Metrics_Mayhem_Figure_Briefs.md` (the nine published figures, SVGs in `01_Book/Production/Figures/`), plus Voice Codex §17, §24.11 (dark visual guidance) and §24.15. Samples: `samples/diagram_sample_light.png`, `samples/diagram_sample_dark.png` (data figures) and `samples/diagram_concept_sample_dark.png` (concept/flow). Producers: `producers/mo_visual_kit.js diagram-sample` (data figures) and `producers/mo_diagram.js` (concept/flow; **takes `theme: 'dark' | 'light'`**, dark is the default, see "Two-surface diagram rule" below). **Both moved into `producers/` and both now read `design-tokens.json` through `mo-tokens.js`. Neither declares a colour.**

This standard is deliberately in line with `Blog_Thumbnail_Standard.md`: same navy palette, same mint/teal system, same "render is not shipping" QA discipline. A diagram and a thumbnail from the same post should read as the same brand.

## Where this sits in the MO brand (two surfaces, one identity)

MO runs two visual surfaces, and diagrams belong to the first. This is intentional, not drift:

- **Dark visual-asset surface:** social visuals, slide hero frames, podcast art. `dark-ground` canvas, `teal-bright` accent, the brand display face, one radial teal wash, ring mark. Built to stand out in a feed and to embed as an image. Diagrams share this surface exactly with `Blog_Thumbnail_Standard.md`.

  **Superseded 2026-09-11 by Brand Design System v3 and amended 2026-09-14:** the navy gradient, the bright-mint accent, the faint mint grid and the non-brand display face are all retired, and under the v3 mode rule **writing renders light** — so a blog or OG surface is light, not dark. The retired values are listed in `design-tokens.json` `colour.retired` and are deliberately not repeated here.
- **v2.0 web/email token surface (`Brand_Design_System_v2.md`):** light backgrounds, Montserrat headings, DM Sans body, teal `#2F9E8D`, ink `#16282D`. Used for the site, beehiiv post bodies, signature, in-body buttons.

The two surfaces share **DM Sans (body)** and **Space Mono (labels/eyebrows)**, so they read as one identity. A diagram uses the dark surface because it ships as an embedded image sitting next to the post's thumbnail, not as web body copy. When a figure is placed on a white page (print, lead-magnet PDF, book), use the light variant below, which leans to the v2.0-compatible neutrals. Token changes to the dark surface are proposed by Growth via `[BRAND]` and recorded in `Brand_Design_System_v2.md` + the System Changelog, same change-control as v2.0.

---

## Two diagram families

Every diagram is one of two families. Pick the family first, then the producer.

1. **Data figures.** Bars, lines, distributions: a number is the point. House idiom is Figure 1.1: neutral grey series, one accent element carrying the argument. Producer: `mo_visual_kit.js` (`diagramTheme` + the `diagramSample` pattern). Working canvas 1600x1080, export 2x, SVG kept as source.
2. **Concept / flow diagrams.** Boxes, bands, cards, spectrums, arrows: a relationship or a decision is the point (blast radius, layers, gates, before/after, who-owns-what). Producer: `producers/mo_diagram.js`. Canvas 1200x680, from `canvas.diagram_concept`.

The blast-radius embed that triggered this standard is family 2. Family 2 had no reusable producer, so it was hand-built and the text overflowed. That is now fixed: `mo_diagram.js` measures and wraps every string.

---

## Spec (shared)

- **Feel:** serious business book for C-suite technology leaders. Clean, authoritative, data-driven. Not startup-playful, not enterprise-boring.
- **Flat only:** no 3D, no drop shadows, no icons, no emojis, no stock humans, minimal chart junk. One insight per figure. (Gradients are allowed only as the navy canvas wash and the green→amber spectrum bar; never on text.)
- **Accent discipline:** neutral greys/teal carry the structure; a signal colour marks only the element the argument turns on. One accent idea per diagram.
- **Caption:** one sentence of meaning, one of source, beneath every figure in the post body. UK English, no em dashes.
- **Greyscale-safe:** every figure must still read with colour removed. Never encode meaning in colour alone; pair it with position, label, or order.

## Palette — read the token file, do not read this section for values

**There is no palette table in this standard any more.** Both diagram themes are
assembled from `design-tokens.json` at load. A table here would be a second
source of truth, and the last one drifted for three months while producers
carried their own hexes.

```powershell
node producers/mo_diagram.js tokens     # prints both assembled palettes
```

**Dark theme**, by token name: ground `dark-ground`, cards `dark-panel`, bands
`dark-motif`, primary accent `teal-bright`, structural accent `teal`, ink white,
body `on-dark-body`, labels `on-dark-soft`, connectors and hairlines
`dark-border`, low/safe `semantic-low`, high/caution `semantic-high`.

**Light theme**, by token name: ground `panel`, cards `panel`, bands `tint`,
primary accent `teal-deep`, structural accent `teal`, ink `ink`, body `muted`,
labels `soft`, connectors and hairlines `border`, low/safe `semantic-low`,
high/caution `semantic-high`.

One radial teal wash per canvas, opacity from `structure.wash`. **The faint mint
grid is retired** (Al, 2026-09-11) and no longer drawn in either theme.


**Print and book data figures** use the light theme above: ground `panel`, axis and gridlines `border` and `hairline`, labels `soft`, neutral bars `neutral-series`, accent `teal-deep`. The same light theme serves in-body concept diagrams, which is what `mo_diagram.js --theme light` renders. See "Two-surface diagram rule" further down.

**Three separate light palettes used to exist** — a print/book one, an in-body one, and the kit's own. They have been collapsed into the one light token set. If a light figure needs a value the token set does not carry, that is a CR against `design-tokens.json`, not a local addition.


Same semantics, same geometry, same text-fit rules as the dark table. Only the hexes change. Green still means low/safe and amber still means high/caution, so a figure re-rendered from dark to light carries the identical argument.

**Colour semantics are load-bearing.** Green = low blast radius / safe / go. Amber = high blast radius / caution / decide by hand. Teal/mint = structural, neutral, "always". Do not use green/amber decoratively; a reader should be able to infer safe-vs-risky from colour position without reading a word.

**Token provenance.** Every value now comes from `design-tokens.json`, which is the ratified set. The semantic pair this standard originally introduced — low/safe against high/caution — was ratified into v3 as `semantic-low` and `semantic-high`, in both modes, and the light-mode pair was darkened for AA in the 2026-09-11 contrast audit. Nothing here is ad-hoc any more, and nothing here is local.

**Contrast history worth keeping:** the light-mode label grey was darkened on 2026-09-01 (Al) because the previous value measured 4.07:1 on a tinted card and 4.43:1 on white, both under the 4.5:1 floor for normal text. It was chosen with margin rather than scraping the line, because antialiasing erodes a borderline ratio. The current value is `soft`; the measurements are in `Contrast_Audit_2026-09-11.md`. Retired values are named by role here on purpose — `assertNoRetired` scans whole file source including prose, and a standard that quotes a retired hex fails the build that reads it.

## Typography

The brand faces, from `type.display.family`, `type.body.family` and `type.label.family`: Montserrat ExtraBold (display, weight 800), DM Sans (body/labels), Space Mono (eyebrows, axis labels, footer). Body labels ~21–26px at the 1200-wide canvas; mono eyebrows 15–20px, letterspaced 2–3.

**The display face changed.** This standard previously named a non-brand display face that is not in `fonts.required`. It resolved to nothing and fell back silently, which is the same failure that produced a perfectly rendered blank card at exit code 0. **Run `node producers/mo_visual_kit.js preflight` before any diagram render** — `mo_diagram.js` has no font gate of its own, and preflight resolves every brand face and every mark before anything is written.

## Layout grammar (concept/flow)

The house composition, top to bottom:

- **Eyebrow:** mono caps, bright mint, top-left (the diagram's category, e.g. the post series name).
- **Title + optional subtitle:** white bold display + grey one-liner. One insight, plain English.
- **Cards / nodes:** rounded `dark-panel` / `panel` box (by theme) with a 6px coloured accent left-border, ~28px padding, hairline muted border. Inside: mono eyebrow (accent colour), bold white heading, grey wrapped body, 1.4–1.45 line-height. Body is always wrapped to the inner width, never a fixed string.
- **Spectrum bar** (when the point is a gradient of risk): green→amber, mono end-labels in the matching semantic colour.
- **Headline band** (the one-line takeaway): `dark-motif` / `tint` fill (by theme), accent border at 0.55 / 0.9 opacity, bold ink text.
- **Footer:** mono caps teal `MASTERING OBSERVABILITY · MASTERINGOBSERVABILITY.COM`, centered. (Cross-property surface = the house brand, realigned 2026-08-24 per the brand architecture; podcast/episode visuals keep `METRICS & MAYHEM`.)

Concept diagrams (icebergs, layers, staircases): same palette and flatness, horizontal tiers or simple silhouettes, accent on the waterline/gate/turning point only. The Trust-Gated maturity staircase in the slide system is the house stage-model pattern.

---

## The text-fit rule (mandatory, non-negotiable)

**Never hand-place a fixed text string in a diagram.** Every string is measured and wrapped to the width of the box it lives in. This is the rule the blast-radius miss broke, and it is now enforced in code.

- Build family-2 diagrams from `producers/mo_diagram.js`. Its `wpx()` measures glyph width, `wrap()` breaks text to a pixel width, and `card()` / `band()` / `paragraph()` return their own computed height so a box always contains its content and the next element lays out below it.
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
node producers/mo_visual_kit.js preflight
node producers/mo_diagram.js concept-sample --out <post-folder>/<slug>_<name>_1200x680.png
node producers/mo_diagram.js concept-sample --theme light --out <post-folder>/<slug>_<name>_light_1200x680.png
```
`--theme` takes `dark` (default) or `light`. Pick it from the destination: dark for a standalone asset, light for an in-body embed.

For a real (non-sample) diagram, write a short build script that requires `mo_diagram.js` and composes `card`/`band`/`spectrum`/`arrow`, or extend the CLI. Keep the geometry: 60px margins, 30px gutters, cards on a 3-up grid at ~340px.

**Picking the theme in a build script.** Three equivalent forms, all backed by the same helpers:

```js
const D = require('.../producers/mo_diagram.js');

// 1. per call
D.card(x, y, w, { theme: 'light', heading: '...', body: '...' });

// 2. per module (set once, then call the helpers as normal)
D.setTheme('light');

// 3. bound API (cleanest for a whole build script)
const L = D.themed('light');
L.card(x, y, w, { heading: '...', body: '...' });
L.render(L.canvas(1200, 680, inner), out);
```

Exports: `DARK`, `LIGHT`, `PALETTES`, `palette(name)`, `setTheme`, `getTheme`, `themed(name)`, alongside the original `C` (which still means the dark palette) and every original helper with its original signature.

**Data figure (family 1):** copy the `diagramSample` function in `mo_visual_kit.js`, swap the data and labels, keep the geometry discipline (axis 250px left, plot 1270px wide, bars ~180px), render both light and dark.

**Output location (mandatory).** `--out` writes into the post's own per-post folder under `04_Newsletter_and_Blog/<date>_<slug>/`, named `<slug>_<diagram-name>_1200x680.png` (data figures `_1600x1080`). Never a shared scratch folder. One diagram, one home, next to its post. (Same rule as `Blog_Thumbnail_Standard.md`.)

**Hosting + embed (beehiiv).** Diagrams embed the same way as OG cards: Al pushes the PNG to the `MrObserv/mo-social-assets` repo root via `push_asset.sh` (needs `$GH_TOKEN`, runs on Al's machine, never in the sandbox). The raw URL is `https://raw.githubusercontent.com/MrObserv/mo-social-assets/main/<filename>`. Then `save_image(raw_url)` to bring it into beehiiv media, and embed as an `imageBlock` node with a caption. beehiiv 404s if the file is not yet hosted, which doubles as the existence check.

---

## QA gate (render is not shipping): two passes minimum, always

**Shared gate (2026-07-31, GR-2026-07-30-03; hardened 2026-08-06, CR GR-2026-08-06-01):** this is the ONE canonical diagram QA gate, shared identically with `Architecture_Diagram_Standard.md` §6 — the Diagram (concept/flow) and Architecture standards operate as a single system, and **neither is ahead of the other: it is one gate, carried verbatim in both files.** Every diagram (blog, byte-size, architecture, estate, pipeline, client-facing) clears the SAME gate: **two self-passes + one independent fresh-eyes challenge**, against the **13-point challenge checklist** below. The 8-point checklist that lived here (alignment · spacing · connections · one-weight flow lines · notation honest · legibility/WCAG · §5 · one idea) was expanded to 13 on 2026-08-03 with the NatWest-baseline build-level lessons (glyph safety, corner/overlay integrity, containers hugging content, grid gutters, provenance). The `BLOG_PUBLISH_QA_GATE.md` diagram checks reference this gate.

**Passes.** Pass 1 (build + self-check), Pass 2 (fresh render + re-check), Pass 3 (independent fresh-eyes challenge, for anything client-facing or high-stakes; a subagent or a second reviewer). Only a pass that finds nothing ships.

**The 13-point challenge checklist (identical to `Architecture_Diagram_Standard.md` §6):**

1. **One idea, one direction.** Left to right (or bottom to top for a stack); single arrowheads; about seven components or fewer on the story.
2. **Notation is honest.** C4 / OTel grammar correct (where used); a reader who knows the standard is not misled.
3. **Alignment.** Elements on a grid; zone bottoms and tops aligned; icons and text a consistent size across the set.
4. **Spacing.** Even margins; no cramped or lopsided whitespace; labels clear of lines and icons.
5. **Connections.** Every arrowhead meets its target; boundaries drawn with margin, not spearing content; dashed vs solid used consistently and keyed.
6. **Colour and shape semantics** hold against the fixed key; flow lines one weight; no accidental emphasis.
7. **Legibility.** Readable at slide-thumbnail size; WCAG contrast at least 4.5:1 on any coloured fill; nothing cropped.
8. **§5 scan.** No em dashes (and no spaced-hyphen dash substitutes in titles), UK English, confirmed figures only, no vendor claim as fact.
9. **Glyph safety.** Every character used exists in the brand font; ticks, crosses and symbols are drawn shapes, not typed glyphs (see the no-symbol-glyph rule, `Architecture_Diagram_Standard.md` §4 / §2a). Do not trust the preview: renderers substitute a fallback font for a missing glyph.
10. **Corner and overlay integrity.** Header bands and overlays match the container radius; no notched or open corners; no mask erasing a border.
11. **Containers hug content; no dead bands.** No large empty band between a title and its body, or inside a container below its content; spare whitespace sits at the margins, not the interior.
12. **Grid gutters.** Dense grids and tables carry a comfortable left margin with the label text inset.
13. **Provenance shows.** Reference or non-estate items are visibly marked, never level with in-play items.

**No-symbol-glyph rule (`Architecture_Diagram_Standard.md` §4).** Symbols are drawn, not typed. The brand fonts (Montserrat, DM Sans, Space Mono) carry the Latin set plus a small mark set, but not `✓ ✕ ↻` and most symbols. Draw those as vector shapes. Applies to any diagram in either standard.

**Renderer caveat.** LibreOffice, browsers and `node`/sharp substitute a fallback font for any missing glyph and silently swap unavailable fonts, so a clean preview does not prove font-safety or glyph availability on the target machine. Check the font's actual character set, not just the render. This is why points 9 to 13 are verified in the build, not only by eye.

**No diagram ships on a single pass.** Every diagram is rendered, reviewed, corrected, then re-rendered and reviewed again with fresh eyes. This is mandatory, not reserved for high-stakes work. The reason is empirical: the blast-radius miss shipped because it was looked at once; and even the standard's own sample needed three passes (overflow, then ragged card heights, then a band/footer collision) before it was clean. First renders lie. Two passes is the floor, not the ceiling.

**Pass 1: build and self-check.** Render, open the PNG at full size, and check all six points below. Note every defect.

**Fix, then Pass 2: fresh-eyes re-check.** Re-render after the fixes and review again as if seeing it for the first time. New defects surface once the obvious ones are gone (equalising card heights created a footer collision that only pass 2 caught). If pass 2 finds anything, fix and add another pass. Only a pass that finds nothing ships. For a bespoke or high-stakes diagram, pass 2 is a fresh-eyes subagent triage review, not just a second look by the same builder.

The six render-time checks below are the fast self-check applied on every pass; they sit inside, and do not replace, the full 13-point challenge checklist above (the gate). Anything client-facing or high-stakes clears all 13, including the glyph-safety, corner/overlay, dead-band, grid-gutter and provenance points:

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

- **Light in-body variant** — for diagrams embedded in the blog / email BODY, and under the v3 mode rule this is the default for anything that accompanies writing. Ground `panel`, ink `ink`, `teal-deep` eyebrows, `semantic-low` / `semantic-high` accents, `tint` cards and callout band, one teal wash at 12 per cent. Matches the web and email surface so an in-body diagram does not read as a heavy dark slab in the article.
- **Dark-asset variant** — unchanged (§24.11 navy + mint), for OG cards, thumbnails, and social visuals.

Both variants hold the identical two-pass QA gate.

**The `theme` flag is IN the canonical producer (Control, 2026-08-23, closes GR-2026-07-15-01).** `producers/mo_diagram.js` takes `theme: 'dark' | 'light'`:

- **`theme: 'dark'` is the DEFAULT** and is unchanged. Use it for STANDALONE assets: OG cards, blog and YouTube thumbnails, social visuals, slide hero frames.
- **`theme: 'light'`** renders the in-body surface in the light palette table above. Use it for diagrams embedded in the blog or email BODY.

It is implemented as a **palette/token switch only**. Both themes run the identical drawing and text-fit helpers (`wpx`, `wrap`, `paragraph`, `card`, `cardRow`, `band`, `spectrum`, `arrow`, `footer`, `canvas`), so there is exactly one place a layout or wrapping bug can live and the two surfaces can never drift apart. Verified 2026-08-23 by rendering the `concept-sample` in both themes: identical geometry (`cardRow` height 244, `band` height 86 in both), and the dark PNG is byte-identical to the pre-change producer's output.

**Do NOT hand-build a bespoke light producer.** This is now a standard violation, not a shortcut. Light in-body diagrams were twice hand-built on top of these helpers as one-off scripts (most recently the 2026-08-23 AI SRE blog), which is exactly the ad-hoc pattern the text-fit rule exists to stop. There is one producer. Pass `theme: 'light'`. If the light palette needs a token the theme does not carry, **add it to `design-tokens.json` via a CR** — never to the producer. Adding a hex to the producer was the previous instruction here and it is now a defect: `mo-tokens.js` throws on an unknown token precisely so a local addition cannot happen quietly. Do not fork the file either.

Every original call signature and default is preserved, so anything that called the producer before 2026-08-23 is unaffected and keeps rendering dark.

---

**Last updated:** 2026-09-16 — repointed to Brand Design System v3.2.0. Both palette tables removed in favour of `design-tokens.json`; producer paths moved from `templates/` to `producers/`; the instruction to add hexes to the producer reversed; the non-brand display face corrected; the retired mint grid removed. No layout, geometry, text-fit or QA rule was weakened. Earlier note below.

**Previously updated:** 2026-08-23 (CR GR-2026-07-15-01, Control). The `theme: 'dark' | 'light'` flag is now folded into the canonical `mo_diagram.js` (then at `templates/`, moved to `producers/` on 2026-09-16), implemented as a palette/token switch over ONE shared set of drawing and text-fit helpers (no duplicated drawing code). Dark stays the default and is byte-identical to the previous producer; light renders the in-body blog/email surface. Added the light in-body palette table, the `--theme` CLI form, the build-script forms (`setTheme` / `themed`), and an explicit ban on hand-building bespoke light producers. The pre-theme producer is in git history rather than a `.bak` file beside the live one; a stale twin next to a producer is how two kits diverged. No prior rules weakened or removed. Earlier note below.

**2026-08-06** (CR GR-2026-08-06-01, canonical-sync) — carried the 2026-08-03 hardening of the shared QA gate into this file: the 8-point checklist became the **13-point challenge checklist** (glyph safety, corner/overlay integrity, containers-hug-content, grid gutters, provenance added), plus the **renderer caveat** and a reference to the **§4 no-symbol-glyph rule**. States explicitly that `Diagram_Standard.md` and `Architecture_Diagram_Standard.md` share ONE identical gate, neither ahead of the other. No prior rules weakened or removed. Earlier note below.

**2026-07-21** — registered the diagram-cadence-by-content-type rules (≥1 per Conviction blog, ≥2 light diagrams per byte-size) and the two-surface diagram rule (dark asset / light in-body), per GR-2026-07-13-01, GR-2026-07-15-01, GR-2026-07-16-11. Earlier note below.

**2026-07-01.** Expanded from the book-figure crib into a full brand standard: added the concept/flow family, the `mo_diagram.js` producer (with `cardRow` equal-height rows), the mandatory text-fit rule, colour semantics, and the QA gate, after a hand-built concept diagram shipped with overflowing text. Same day, on Al's instruction, made **two QA passes the mandatory floor for every diagram** (first renders lie: the sample itself took three passes to reach clean), and added the sandbox-build tooling note. Registration in `00_Design_Standards_Index.md` filed to Control.
