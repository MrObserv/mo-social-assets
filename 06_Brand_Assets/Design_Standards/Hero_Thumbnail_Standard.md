# Hero Thumbnail Standard (design brief for Control)

**Status: DRAFT BRIEF (Growth, 2026-07-13), filed to Control as `[BRAND]` for a reusable producer.** Direction from Al: produce vidIQ-grade YouTube thumbnails (expressive face + explainer/trace diagram + big punchy headline) but strictly on the MO **dark-asset surface**, never vidIQ's blue/orange/yellow. The defining requirement: **the face is pulled from the episode video automatically, not shot as a fresh headshot each time.**

## Two reference frames (what this standard resolves)
- **On-brand target (keep):** dark navy canvas, mint/teal vector trace diagram (INPUT to AI AGENT to RESULT), `> tech_tuesday` prompt + `TUE` chip + "METRICS & MAYHEM" eyebrow, huge "TRACE YOUR AI" headline with a mint payoff word, expressive cut-out of Al on the right. This is the look to codify.
- **Rejected (do not ship):** the ChatGPT/vidIQ-style version in warm blue/orange/yellow on a generic render-room background. Right energy, wrong palette and wrong (bespoke) face source. The producer must reproduce the first, never the second.

## What it is, and when to use it
The **hero** thumbnail is the high-impact, click-selling variant for YouTube: an expressive frame of Al lifted off the episode video, a glowing trace/flow diagram of the episode's core idea, and a two-line headline. It is a **sibling** to, not a replacement for, the existing Tech Tuesday **terminal-motif** thumbnail (`render_tech_tuesday.py` / the pending `tt_thumbnail_builder` template).

**Decision rule (hero vs terminal):**
- **Terminal-motif = the default.** Every standard weekly Tech Tuesday ships the clean terminal thumbnail: fast, series-consistent, low production.
- **Hero = the selective escalation.** Use it for flagship or launch episodes, high-search-competition topics, and any episode whose idea has a strong visual flow to show (a trace, a pipeline, a before/after). Keep it special: a guide of roughly one to two hero thumbnails a month, Al's call per episode. Over-use flattens the impact and the production cost is higher.
- Both live on the same dark-asset surface and share the brand furniture, so a channel of mixed hero + terminal still reads as one identity.

## Palette + type (non-negotiable)
- **Surface:** navy `#0a0e17` canvas (gradient `#090d15` to `#0f2137`), faint mint grid + vignette, exactly as `Diagram_Standard.md` / `Tech_Tuesday_Standard.md`.
- **Accents:** mint `#64ffda` = primary (headline payoff word, trace glow, cursor, chip, underline). Teal `#14a3a8` = structural rules, secondary trace lines, footer. White headline ink; grey `#bfced6` labels.
- **Semantic tokens** (amber `#ffd166` caution, green `#7bd88f` safe) only if the topic diagram genuinely carries that meaning (e.g. a RESULT tick), never as decoration.
- **Type:** Montserrat ExtraBold display (headline), Space Mono for the prompt / chip / eyebrow / footer labels. (Archivo Black parity pending the TTF, same note as the other dark-asset standards.)
- **Explicitly banned:** vidIQ blue/orange/yellow, warm skin-tone grading, stock "server room" backdrops, drop-shadowed 3D bevels outside the trace motif.

## The grid (1280x720, three zones)
A left-weighted editorial split, face on the right (the natural YouTube reading order, and it keeps the face clear of the bottom-right timestamp).

- **Zone A: Headline, left ~40%.** Brand eyebrow "METRICS & MAYHEM" (mono, mint rule under) top-left; `> tech_tuesday` prompt + mint block cursor and the `TUE` chip beneath it; then the headline filling the lower-left; a mint underline bar; the series wordmark ("TECH TUESDAY") mono at the very bottom-left.
- **Zone B: Trace diagram, centre ~30%.** The glowing vector motif (below), sitting between the headline and the face, slightly overlapping neither. It is the "explainer" that makes the thumbnail feel technical, not clickbait.
- **Zone C: Face, right ~34-40%.** The cut-out lifted from the video, bled off the right and bottom edges, feathered inner edge, gaze angled back toward the headline/diagram (§24.15 gaze rule). Head is **never** cropped at the top.
- **Safe margins:** keep all text and the diagram's labels inside a 48px margin; assume the bottom-right ~220x60 is covered by the YouTube duration stamp; keep the face and headline out of it.

## The trace-diagram motif (and how it varies per topic)
The signature "explainer" element: a left-to-right **flow** in glowing mint/teal vector, reading INPUT to [the work] to RESULT, with a thin looping ribbon labelled for the episode.

- **Default (AI/agent episodes):** `INPUT` node (mint ring) to flowing multi-strand ribbons into an `AI AGENT` box (wireframe cube, brain/circuit glyph, "DECISION" base label) to a `RESULT` box with a mint tick. A dotted top ribbon labelled "AI DECISION TRACE"; a dotted bottom ribbon labelled "CLEAR OBSERVABILITY". This is the exemplar.
- **Per-topic variants (a small reusable set, not bespoke each week):**
  - *Pipeline/flow topics:* swap the centre box label and the node names (e.g. `LOGS to COLLECTOR to BACKEND`).
  - *Comparison topics:* two parallel strands converging on a RESULT (correlation vs causation reuse).
  - *Maturity/ladder topics:* a stepped ribbon rising left-to-right.
  - The rule: **one flow, one glowing accent, labels swapped to the episode; never more than two ribbons.** The motif is built from a reusable vector kit so a new topic is a config change, not a redraw. Where the episode already has a `mo_diagram.js` concept diagram, the hero trace is its simplified, glowing cousin (same idea, thumbnail-legible at 320px).

## Production model: hybrid (the "vibe" question, resolved)
A flat vector render will not match the gloss of a diffusion-model image, and pure image-generation cannot render Al's real face or hold our palette reliably. So neither pure-code nor pure-ChatGPT is the answer. The model is **hybrid**, layered:

1. **Backdrop + trace art = image AI, palette-locked.** Generate the glossy hero backdrop and the glowing trace/flow art with an image model (Nano Banana Pro / Midjourney / equivalent), prompted hard to the cool cyan surface (navy `#0a0e17`, mint `#64ffda`, teal `#14a3a8`; explicitly NO orange/yellow/warm), with the right third left as empty negative space for the person. Produce a **small library of reusable backdrop plates** (3-5 topic variants) so this is not re-generated every week. Any residual colour drift is corrected in post to the exact tokens. This is where the vidIQ-grade depth and bloom come from.
2. **Face = real cut-out from the episode video** (the `face_from_video` pipeline below). Never generated: a lookalike face is not Al, and the whole point is that it is pulled from the episode like vidIQ does.
3. **Headline + brand furniture = code composite.** The Montserrat headline (one mint payoff word), the `> tech_tuesday` prompt, `TUE` chip, `METRICS & MAYHEM` eyebrow, underline and footer are drawn by the producer over the plate, so the type is pixel-exact and on-brand every time.

The result is AI vibe + Al's real face + exact brand + weekly repeatability. The flat-vector trace (the `mo_diagram.js` cousin) remains only as a **fallback** when no generated plate is available. **What we do not do:** hand the whole thumbnail to ChatGPT/vidIQ (drifts off-palette, cannot render Al's face) — image AI is used for the backdrop layer only, under our colour control.

**Tooling note:** vidIQ is connected (`vidiq_generate_thumbnail` / `vidiq_score_thumbnail`) and is useful for CTR scoring and title/thumb A/B ideas, but not for on-brand final art (it fights the palette). Use it to test, not to ship.

## Headline rules
- **Two lines maximum**, all-caps, Montserrat ExtraBold, left-aligned, filling the lower-left.
- **Short and punchy:** aim 2-4 words total ("TRACE YOUR AI"), hard cap ~18 characters per line so it stays huge and legible on mobile.
- **One mint payoff word.** The word carrying the click goes mint `#64ffda`; the rest is white. Pick the noun that is the promise ("AI", "MCP", "ROOT CAUSE"), not a filler word.
- **Mint underline bar** under the headline block, teal tick optional.
- **Squint test is law:** if the headline is not instantly readable at 320px wide, it fails.

## The face-from-video pipeline (the core of this standard)
Al does not want to shoot and grade a headshot for every episode. The producer must lift an expressive frame from the episode video and process it, the way vidIQ does. Pipeline for Control to build:

1. **Extract candidate frames.** Sample the episode video (every ~0.5s, or on scene-change), and score each frame for: a detected, front-ish face; eyes open; an expressive mouth (open/smiling/talking); an animated pose (gesturing hands are a bonus, as in the reference); sharpness (reject motion blur); and face size (large enough to fill Zone C). Output a **contact sheet of the top ~6 candidates** so Al can pick or approve, mirroring the "eyeball the QA sheet" discipline already in `Tech_Tuesday_Standard.md` and the thumbnail headshot rule.
2. **Cut out the background.** Remove the background to a clean alpha matte. Recommended: a local, offline library (`rembg`, human-segmentation model) so the producer runs headless in the pipeline; the ElevenLabs `remove_background` MCP tool is a viable alternative if a connector call is acceptable. Refine the matte edge (feather 2-3px) so hair does not fringe.
3. **Grade to our palette.** Apply **face-focus grading** (darken shoulders/shirt/edges so the face is the brightest element, §19.6), neutralise any warm cast from the room lighting toward our cooler surface, and add a **mint/teal rim-light** down the edge of the head/shoulder facing the diagram so the cut-out separates from the navy and ties into the palette. This is what makes a lifted video frame look designed, not pasted.
4. **Place + feather.** Bleed off the right and bottom, feathered inner edge, head never cropped, gaze toward the headline. A subtle mint contact-glow where the face meets the diagram.
5. **Fallback:** keep a tiny library of 3-4 pre-graded hero frames for episodes with no usable expressive frame (e.g. audio-only), but the **default and preference is fresh-from-episode**.

## Brand furniture (fixed, so hero reads as MO)
"METRICS & MAYHEM" mono eyebrow with a mint rule; `> tech_tuesday` prompt + mint block cursor; `TUE` day-chip (mint pill, navy text, centred via glyph bbox); "TECH TUESDAY" mono wordmark bottom-left; faint crosshair/lens mark. Same tokens as the terminal thumbnail, so the two variants are visibly one series.

## What Control builds (producer spec)
- **`templates/hero_thumbnail_builder.py`** (sibling to the TT thumbnail producer). **Inputs:** episode video path (or a chosen frame), headline string + which word is mint, and a topic key selecting the trace variant + node labels. **Output:** the 1280x720 hero PNG + a QA contact sheet (the 6 face candidates + the composed thumbnail). Fonts via `MO_FONTS`. Binaries hosted via the `mo-social-assets/` auto-sync repo (raw URL), matching the asset-hosting model.
- **`templates/face_from_video.py`** helper: the extract to score to cut-out to grade steps, reusable by other producers (Shorts covers, carousel covers).
- **Trace-motif kit:** a small reusable vector module (glow ribbons, wireframe box, node ring, tick) with a per-topic config, so variants are configuration not redraws.

## MANDATORY two-pass brand QA gate
No hero thumbnail ships without it, run twice (fresh eyes on the second; subagent for flagship): open at full size AND at 320px (mobile); nothing clips or collides; correct palette/fonts/motif; the `TUE` chip centred; **the face is the brightest element and the head is never cropped**; gaze toward the headline; the mint payoff word is the right word; the trace labels are legible and §5-clean; squint test on the headline; and the money check, that it does not read as vidIQ (no warm palette, no stock backdrop). Same discipline as `Diagram_Standard.md`, `Tech_Tuesday_Standard.md`, and `Carousel_Standard.md`.

## Open decisions flagged for Control
- **Frame-extraction method:** simple time-sampling + face/expression scoring (recommended, offline) vs a heavier expression-detection model. Start simple; the contact-sheet + human pick covers the quality gap.
- **Background-removal tool:** local `rembg` (recommended for a headless producer) vs the ElevenLabs `remove_background` connector. Control to pick per the pipeline's offline requirement.
- **Placement in the index:** register alongside `Tech_Tuesday_Standard.md` + `Blog_Thumbnail_Standard.md` on the dark-asset surface; add the hero option to the thumbnail producer so hero + terminal share one codebase.

---
**Author:** Growth, 2026-07-13. Direction: Al (vidIQ-grade impact, MO palette, face pulled from the video not shot each time). To be ratified + built by Control.
