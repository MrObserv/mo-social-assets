# Video Card System Standard

**Status: AMENDED v2.0 by Al's ruling 2026-09-15/20** (was REGISTERED by Control 2026-08-20, PI-2026-08-13-02). **One card type survives: LOWER THIRD, automated.** FULL CARD, FULL DIAGRAM HOLD and CORNER INSERT are retired.

**Why the system shrank, recorded because the reason is the lesson.** The four-type standard was ratified on 20 August and **never used once — Al added cards by hand in the editor instead, because the four-type process was too slow.** A standard that exists and is not followed is worse than none: the process looks covered when it is not. The replacement keeps only the part where automation genuinely beats the editor — name and term labels, which are repetitive and mechanical.

**Where the retired types went.** Under the live-deck format (Al, 2026-09-15), the teaching runs from a **live 16:9 deck presented on camera**, so what FULL CARD and FULL DIAGRAM HOLD did — cut to a full-frame card or diagram for a beat — is now **a slide, captured in the recording, zero post-production**. CORNER INSERT is retired outright, unused. The deck master is specced separately (one master, built to the worst case, not three variants).

**This document names tokens, never hexes.** The v1 standard was specified on three retired values from the pre-v3 dark palette, which is part of why it was rewritten rather than patched. For a value, read `design-tokens.json`.

## The one card type: LOWER THIRD

A strip across the lower third of frame, over the live video: speaker/label, the term being introduced, or a one-line reinforcement.

- **Surface:** dark tokens — `dark-ground` strip (or `dark-panel` where the video behind is dark), `teal-bright` accent, `teal` structural rule, `on-dark-body` text. The ring mark per `Logo_and_Marks_Standard.md`, resolved by name from the marks manifest, never by filename. The strip is video furniture, not writing, so it renders dark; the light rule applies to surfaces fronting written material.
- **Format:** 1920×1080 PNG, transparent everywhere except the strip.
- **Automated.** Built by the agent/PIL producer lane. The producer must consume `design-tokens.json` (via `mo_tokens.py`) and run `assert_no_retired` on its own source per `consumers.build_check` — the v1 card producer predates that rule.
- **Type:** Montserrat ExtraBold for the term/name, Space Mono for the kicker/label, DM Sans for the one-liner. Minimum rendered size on frame: nothing below 24px at 1920×1080.

## Timing (unchanged, locked)

- **`[CARD]` script cue** marks each lower third inline at the line it fires on (Codex §25.5.1). The cue now carries one type only; a `[CARD]` cue naming a retired type is a script error, not a render request.
- **ON at the line, OFF ~1.5s after** the line ends, burned via ffmpeg from the episode SRT.
- The Visual/Card Plan brief section survives, listing each lower third (content, trigger line). Full-frame beats now live in the deck's slide plan instead.

## What is explicitly out of scope

- **Full-frame cards and diagram holds** — deck slides now. See the deck master spec.
- **Hero face-from-video thumbnail** — still the §19.6 builder + matting path (`Hero_Thumbnail_Standard.md`). Unchanged by this amendment.
- **Terminal / OG packaging assets** — the agent/PIL lane blessing from PI-2026-08-13-02 stands, but those are covered by their own standards, not this one.

## QA gate (mandatory, two passes)

Open every lower third at full size against a video frame: strip legible over motion, nothing clips, correct tokens and fonts, ring mark not the retired eye mark, burns on at the right timecode and clears per the timing rule, §5 clean on all copy. Fresh-eyes second pass; only a pass that finds nothing ships.

## Changelog

### v2.0 — 2026-09-21 (ruling 2026-09-15/20)
Shrunk to LOWER THIRD only; FULL CARD and FULL DIAGRAM HOLD absorbed by the live deck, CORNER INSERT retired unused. Repointed off three retired hexes onto named tokens. Reason recorded: the four-type system was never used because it was too slow.

### v1.0 — 2026-08-20
Four-type system registered from the TT04 hand-build.
