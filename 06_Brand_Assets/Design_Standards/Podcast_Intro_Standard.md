# Podcast Intro Standard (Signal Drop cold-open)

**Status:** PROPOSED by Growth 2026-06-25, pending Control registration in `00_Design_Standards_Index.md` + System Changelog. Direction chosen by Al: Option 1, the signal waveform. Built on the v2.0 brand (`Brand_Design_System_v2.md`) and matched to the `Shortform_Bookend_Standard.md` look (navy canvas, teal grid, Space Mono wordmark, Montserrat display, lens dot).

**What it is:** a ~7 second animated cold-open that plays once at the head of every Signal Drop video (YouTube long-form, Spotify video) with a 9:16 variant for Shorts. Wordmark + series name only; no episode number, tagline, or headshot.

**Playable references:** `podcast_intro_signal_drop_16x9.html` (master) and `podcast_intro_signal_drop_9x16.html` (Shorts). Open in a browser, press R to replay. Screen-record the window at 1920x1080 (or 1080x1920 for the vertical) for a clean capture, or rebuild in a motion tool from the timeline below.
**Audio:** see `Podcast_Intro_Audio_Brief.md` for the commission brief + royalty-free sourcing shortlist.

## Canvas + brand tokens
- **16:9 master:** 1920x1080, 30fps. **9:16 variant:** 1080x1920 (see safe zones).
- **Background:** navy `#0D2127`.
- **Grid:** teal `#2F9E8D` lines at ~16% opacity, ~80px cell on the 1920 master (static).
- **Accent:** teal `#2F9E8D` (bars, dot, rule). **Eyebrow:** bright teal `#74DDCD`.
- **Title:** white `#FFFFFF`.
- **Lens dot:** small teal circle beneath the title (the §19.6/bookend lens mark, simplified).

## Type
- **Wordmark / eyebrow:** Space Mono, uppercase, letterspacing ~0.5em, bright teal. Text: `MASTERING OBSERVABILITY`.
- **Title:** Montserrat 800, white, letterspacing ~0.15em. Text: `Signal Drop`.
- (Matches the bookend family: mono caps wordmark + Montserrat display.)

## Timeline (30fps; frames in brackets)
1. **0.0-0.3s [0-9]** Navy + grid up (grid can be static from frame 0).
2. **0.3-2.2s [9-66]** Waveform: 11 teal bars, centred, ~26vw / ~460px tall, animating heights like an equaliser (ease-in-out, staggered delays). This is the "signal".
3. **2.2-2.8s [66-84]** Bars collapse: scaleX toward centre to a thin teal seam, opacity easing out (ease-in). The signal "drops" to a point.
4. **2.7-3.8s [81-114]** Lockup reveal (ease-out): eyebrow `MASTERING OBSERVABILITY` fades up; `Signal Drop` rises +2.2vw and fades in; teal lens dot fades in beneath.
5. **3.8-6.0s [114-180]** Hold the lockup.
6. **6.0-7.0s [180-210]** Hold or fade to navy for the cut into content. (For a hard cut, end on the held lockup at ~6.0s.)

**Easing:** equaliser = ease-in-out; collapse = ease-in; reveal = ease-out (cubic-bezier(.16,.84,.44,1) works well).

## 9:16 variant (Shorts safe zones)
- Same sequence, vertical. Keep the **lockup (eyebrow + title + dot) inside the central 60% band** so platform UI (top clock, bottom caption/controls) never covers it.
- Waveform sits centred; reduce bar count to 7-9 so it does not crowd the narrow frame.
- Wordmark may ride a little higher; title stays dead-centre.

## Audio (brief, optional but recommended)
- A short **rising "signal" tone** under the waveform (2-3s), resolving with a **soft low thump on the title hit at ~2.7-2.8s** (frame 81), then a clean tail into the episode.
- Keep it understated, no stock "whoosh" cliche. Source royalty-free (Epidemic Sound / Artlist) or commission a 7s sting. Same sting every episode = recognition.
- If audio is not ready, ship visual-only; the title-hit frame is where audio should land when added.

## Production recipe
- **Fastest:** open `podcast_intro_signal_drop_16x9.html`, set the browser window to 1920x1080, press R, screen-record, trim. Add the audio sting in any editor.
- **Rebuild option (Canva / CapCut / After Effects):** recreate the timeline above with the tokens and type. The HTML is the motion reference.

## Deliverables + naming
- `podcast_intro_signal_drop_16x9.mp4` (master) and `podcast_intro_signal_drop_9x16.mp4` (Shorts), **re-rendered 2026-07-04 with the real brand fonts** (Montserrat ExtraBold + Space Mono) baked in, audio sting included (7s, H.264/AAC; PIL frames + ffmpeg). Repeatable via `render_podcast_intro.py`. The fallback-font 2026-06-25 originals are archived in `_fallbackfont_archive_2026-06-25/`.
- **Fonts: RESOLVED (2026-07-04).** Now rendered with the actual Montserrat + Space Mono TTFs from `06_Brand_Assets/fonts/`, so the wordmark and title are on-brand. The HTML references remain the motion source of truth.
- Audio: `podcast_intro_sting.wav` (+ `_2s`, `_hit_stem`). See `Podcast_Intro_Audio_Brief.md`.
- Keep source in `06_Brand_Assets/Design_Standards/` alongside this spec and the HTML references.

## Pairs with
- `Shortform_Bookend_Standard.md` (the 9:16 intro/outro bookends) and the §19.6 thumbnails. This cold-open is the *video-head* sting; the bookends remain the per-episode pre/post-roll. Keep all three on the same tokens.
- **Sibling ~7s video-head:** the Tech Tuesday intro (`Tech_Tuesday_Standard.md`; ~7s, 16:9 + 9:16; producers `render_tt_intro.py` / `render_tt_intro_v.py` + `tt_intro_sting.wav`). It is a distinct franchise (terminal / command-line motif, not the Signal Drop waveform) but the same ~7s animated cold-open family, registered alongside this standard 2026-07-11 (GR-2026-07-06-01).
