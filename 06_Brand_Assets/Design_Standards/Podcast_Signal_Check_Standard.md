# Podcast "Signal Check" Standard (Q&A segment bumper)

**Status:** REGISTERED by Control 2026-07-11 in `00_Design_Standards_Index.md` + System Changelog (GR-2026-07-10-01; BUILT by Growth 2026-07-10, brief PI-2026-07-08-04). **Still owed (BLOCKED here):** the 4 rendered binaries (`signal_check_16x9.mp4`, `signal_check_9x16.mp4`, `signal_check_still_16x9.png`, `signal_check_sting.wav`) cannot be written onto G: from a sandbox session; host them via `mo-social-assets/` from a connected-folder session (Al / Control). **Supersedes** the earlier `Podcast_QA_Transition_Standard.md` ("Your Questions" bumper): same job, rebranded into the Signal Drop family as **Signal Check** (Drop -> Check) and re-rendered with the real brand fonts. Sibling of `Podcast_Intro_Standard.md`.

**What it is:** a ~2.4s animated bumper that plays between the main Signal Drop body and the end-of-episode Q&A segment, on the spoken beat where Allan says "...Signal Check." (§19.5, transition wording being codified via PI-2026-07-08-03). It marks the gear change from the argument into the looser Q&A.

## Concept (why these choices)
Part of the Signal Drop brand family. Where the intro's waveform *collapses to a point* into "Signal Drop", Signal Check does the sibling gesture: the waveform **pulses up as a level check, then settles** to a steady teal seam and **resolves into the "Signal Check" wordmark**, with a **green `#7bd88f` confirm dot** = levels good, we are clear, into the questions. The green is the ratified good/safe token doing real work (not decoration), and it cues the Conversational-register "we good?" turn into the Q&A. Under the seam sits the **segment descriptor `YOUR QUESTIONS, ANSWERED`** (Space Mono caps, muted grey `#9FB7B3`) so the bumper says what the segment is; the descriptor text is a single constant (`SUBTITLE`) at the top of `render_signal_check.py`, easy to change.

## Brand tokens / type (Signal Drop video family, matches the intro)
- Ground navy `#0D2127`; faint grid `#102C30`.
- Waveform + settle seam: teal `#2F9E8D`. Eyebrow: bright teal / mint `#74DDCD`.
- Confirm dot: green `#7bd88f` (good/safe token).
- Eyebrow: Space Mono caps, letterspaced, `MASTERING OBSERVABILITY`. Wordmark: Montserrat ExtraBold, white, title-case `Signal Check` (matched to the intro's `Signal Drop`; brief wrote "SIGNAL CHECK" but title-case is the stronger family tie, easy to flip if Al prefers caps).

## Timeline (30fps, 2.4s)
1. **0.0-0.12s** grid + waveform appear.
2. **0.12-0.95s** waveform level-check: 11 bars (16:9) / 9 bars (9:16) animate like an equaliser.
3. **0.95-1.25s** bars settle to a uniform low level; a teal seam draws in across centre.
4. **1.15-1.60s** bars fade out, leaving the settled seam.
5. **1.18-1.52s** green confirm dot blooms on the seam.
6. **1.20-1.80s** lockup rises + fades in (eyebrow + `Signal Check`).
7. **1.80-2.12s** hold. **2.12-2.40s** fade to navy for the cut into the Q&A.
- **Audio:** rising level-check ticks under the waveform, a soft two-note confirm on the settle (~1.05s), warm low pad tail to silence. File `signal_check_sting.wav` (2.4s).

## Deliverables (rendered 2026-07-10; PIL frames + ffmpeg, H.264/AAC; real brand fonts baked)
- `signal_check_16x9.mp4` (1920x1080) — YouTube long-form / any video cut.
- `signal_check_9x16.mp4` (1080x1920) — Shorts / vertical chapters (lockup inside the central safe band).
- `signal_check_still_16x9.png` — the resolved end-frame, the **static fallback for the §19.6 audio-with-static format**.
- `signal_check_sting.wav` — the matching audio sting (works on the audio-first cut).
- Producers (reusable, this is a standing element, not a one-off): `render_signal_check.py` (video), `synth_signal_check_audio.py` (sting). Re-render any time via the sandbox, same convention as `render_podcast_intro.py`.

## Format home (Growth's answer to the brief's open question)
An animated bumper does **not** imply converting the Q&A to video. Signal Check is a multi-surface element:
- **Current audio-with-static episodes (§19.6):** use `signal_check_still_16x9.png` as the static image for the Q&A segment. The audio sting carries the beat. No video treatment required.
- **Shorts / chapters:** use `signal_check_9x16.mp4` as the Q&A chapter marker / Short opener.
- **Any future long-form video cut:** `signal_check_16x9.mp4` drops in at the Q&A. Ready when video is, not required now.

## QA (done 2026-07-10)
Frames viewed at full + thumbnail size (squint test): waveform reads as a live level-check, settle is clean, `Signal Check` is legible small, contrast holds, green confirm reads, and it is recognisably the Signal Drop family. Encoded mp4 frames verified (not just standalone renders).

## Pairs with
`Podcast_Intro_Standard.md` (cold-open) and `Podcast_Outro_Standard.md` / `Shortform_Bookend_Standard.md` — all on the navy/teal/Montserrat family.
