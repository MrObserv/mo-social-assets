# Podcast Outro Standard (long-form 16:9 end-card)

**Status:** PROPOSED by Growth 2026-06-25, pending Control registration in `00_Design_Standards_Index.md` + System Changelog. Fills the gap: the `Shortform_Bookend_Standard.md` covers 9:16 intro/outro only; this is the **long-form (16:9)** animated outro for YouTube/Spotify video. Same v2.0 family as `Podcast_Intro_Standard.md`.

**Concept:** the bookend of the intro. The intro's waveform collapses INTO the title; the outro's waveform plays out and **settles to a flat line** ("the signal goes quiet"), which rises to become the end-card divider. Then the CTA stack builds and **holds as a YouTube end-card**.

## Decisions (Al, 2026-06-25)
- **Length:** ~5.4s animate + held end-card to ~20s total (room for YouTube end-screen subscribe + next-video). **Motif:** waveform settles to flat line. **Audio:** soft resolving music bed.
- **CTA set (top-down):** The Book (+ free chapter) / Follow the Show / Next Episode / Newsletter.

## Deviations from the codex outro (flagged, deliberate)
- **"Full Episode" block dropped**, irrelevant on the long-form (this IS the full episode). The codex-locked short-form order is THE BOOK / FULL EPISODE / NEXT EPISODE / FOLLOW THE SHOW (§19.7).
- **Newsletter block INCLUDED**, Al's call. Codex v1.9.20 retired NEWSLETTER from the outro (it lives in the §26.3 links block). Re-adding it here is a conscious exception for the long-form end-card, not drift. Flag to Control; if it should be codified, raise a [CODEX].
- The book block stays first + mandatory; "More signals soon." remains the close (audio outro verbatim per §19.5).

## Brand tokens / type / layout
- Navy `#0D2127` canvas, teal `#2F9E8D` grid + line + divider, bright teal `#74DDCD` eyebrow, white headline/CTA lines, muted grey-teal detail.
- Eyebrow: Space Mono caps. Headline "More signals soon." (Montserrat, white + "soon." mint). CTA blocks: mono mint label / white bold line / grey detail, left column (x<=~1040).
- **Right third (~x>1100) kept clear** for YouTube end-screen elements (subscribe + next-video). Keep critical text in the left ~55%.

## Timeline (30fps)
1. 0.3-2.0s waveform plays (equaliser). 2. 2.0-3.0s settles to a flat teal line. 3. 3.0-3.8s line rises + shrinks into the end-card divider. 4. 3.6-5.4s eyebrow, "More signals soon." headline, then the 4 CTA blocks fade/stagger in. 5. 5.4-20s hold (end-card).
- Audio: `podcast_outro_bed.wav` (~8.5s, normalised ~-6 dB). A short RESOLVING plucked cadence (signal ticks, a descending settle + soft sub on the flat-line, then a decaying G-C-E to a Cmaj pluck) that ends in silence. Deliberately NOT a sustained pad (the first version droned/hummed under the held card). The held end-card runs quiet after ~8s so a spoken outro or your own music can sit over it.

## Deliverables (rendered 2026-06-25, audio baked in; PIL + ffmpeg, H.264/AAC)
- `podcast_outro_16x9.mp4` (1920x1080, ~20s), `podcast_outro_bed.wav`.
- **Fonts: RESOLVED (2026-07-04).** Re-rendered with the real Montserrat + Space Mono TTFs (`06_Brand_Assets/fonts/`); repeatable via `render_podcast_outro.py`. Fallback-font original archived in `_fallbackfont_archive_2026-06-25/`.
- For YouTube: add the subscribe + next-video end-screen elements over the held card (last ~15s).

## Pairs with
`Podcast_Intro_Standard.md` (cold-open), `Podcast_QA_Transition_Standard.md` (Q&A bumper), `Shortform_Bookend_Standard.md` (9:16 bookends). One family across the whole show.
