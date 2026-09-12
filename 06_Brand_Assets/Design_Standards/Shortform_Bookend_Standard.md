# Short-Form Bookend Standard

**Canonical and locked:** Voice Codex §19.7 (vertical clip format, brand bookends). Production automation: the canonical builder `00_Command_Center/thumbnail_builder.py` (builder v1.2.0) emits the intro and outro bookends as part of the same run that produces the episode thumbnails; the episode-asset-watcher (v5.4) invokes it per episode when a clean headshot lands. The previous Node kit (`templates/mo_visual_kit.js bookends`) is retired and must not be used. Exemplar: the Ep 17 bookends.

**GENERIC / EVERGREEN bookends (PI-2026-07-30-03, Al decided 2026-07-30; retracts PI-2026-07-28-01).** The 9:16 bookends are **generic across all episodes** — one reusable intro and one reusable outro, brand furniture only, NOT rebuilt per episode. All per-episode content (episode title, subtitle, episode marker, and a named next-episode teaser) is dropped from the bookends; per-episode identity lives on the thumbnail / episode art, not the bookend. The spec below is updated to the generic model.

## Spec

- **Size:** 1080x1920 PNG, 9:16. Navy gradient canvas, mint grid pattern, centred composition, lens mark beneath the wordmark. Same brand family (fonts, palette, lens mark) as the §19.6 thumbnails.
- **Intro (1.0s pre-roll):** wordmark top (mono caps, mint, letterspaced), format badge, generic series line (display font, white, centred, uppercase), lens watermark, brand footer. **No per-episode title, subtitle, or episode marker** (generic/evergreen, PI-2026-07-30-03). **No CTA**, the viewer has not earned the right to be sold to yet.
- **Outro (1.5s post-roll):** "More signals" (white) / "soon." (mint) in display font, then **four CTA blocks in locked order (revised in v1.9.20):** THE BOOK (mandatory since 2026-06-01, carries the free-chapter line), FULL EPISODE (generic "on Spotify & Apple"), NEXT EPISODE (generic teaser only), FOLLOW THE SHOW. Each block: short mint rule, mono mint label, white bold line, grey detail line. Lens watermark, brand footer. The NEWSLETTER block was retired from the outro in v1.9.20 and now lives only in the §26.3 written Links Block.
- **NEXT EPISODE teaser:** always the generic "New Signal Drop every Friday" teaser (PI-2026-07-30-03 — the bookend no longer names a specific next episode title/number).
- **Filenames:** generic `bookend_intro.png`, `bookend_outro.png` (one reusable pair, not per-episode-slug), plus a `bookend_qa.png` eyeball sheet.
- **Safe zones:** keep the critical text (badge, title, CTA blocks) inside the central band; platform UI covers the vertical extremes. The wordmark top and URL footer are non-critical brand furniture.

## Production

```
python3 00_Command_Center/thumbnail_builder.py --episode N \
    --title "..." --subtitle "..." \
    --bookends-only --next-title "Next Episode Title" \
    --slug <episode_slug> --outdir <episode folder> --ship
```

A normal full run (with `--headshot` and `--quote`, without `--bookends-only`) emits the bookends alongside the YouTube, OG, and episode-art surfaces in one command. Use `--bookends-only` to re-render the bookends. **Because the bookends are now generic/evergreen (PI-2026-07-30-03), the per-episode `--title` / `--subtitle` / `--next-title` / `--slug` arguments no longer feed the bookend content — the intro/outro render the same reusable pair every time; render them once and reuse across episodes.** All layout lives in the builder's single CONFIG block; the episode-asset-watcher is the primary pipeline. If the watcher, this standard, and the builder ever drift, the Codex §19.7 wording wins and all three get fixed.

## QA

Eyeball `bookend_qa.png` against the Ep 17 bookends. Check the four CTA blocks are present and in the v1.9.20 order, the book block carries the free-chapter line, the NEXT EPISODE teaser is the generic "New Signal Drop every Friday" line (no named episode), the intro carries no per-episode title/marker and no CTA, and the critical text clears the platform UI overlays at 9:16 preview.
