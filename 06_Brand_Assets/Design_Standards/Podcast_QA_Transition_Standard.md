# Podcast Q&A Transition Standard ("Your Questions" bumper)

> **SUPERSEDED 2026-07-10 by `Podcast_Signal_Check_Standard.md`.** The Q&A bumper is now **"Signal Check"** (rebranded into the Signal Drop family per brief PI-2026-07-08-04), re-rendered with the real brand fonts and with a green confirm. This file is kept for lineage only; build from the Signal Check standard. Control to retire/replace the index row (GR-2026-07-10-01).

**Status:** PROPOSED by Growth 2026-06-25, pending Control registration in `00_Design_Standards_Index.md` + System Changelog. Sibling to `Podcast_Intro_Standard.md`; same v2.0 brand family. Marks the start of the §19.5 Q&A segment (Conversational register, after the practical habit).

**What it is:** a ~3.5s mid-episode bumper that signals the switch into the Q&A beat. Where the intro's waveform *collapses* into the title, this *reverses* the gesture: a teal pulse travels a signal line and resolves into a question mark, then the label "Your Questions". 16:9 master + 9:16 Shorts variant.

## Decisions (Al, 2026-06-25)
- **Label:** "Your Questions". **Motif:** pulse resolves into a "?". **Length:** 3.5s.

## Brand tokens / type
- Navy `#0D2127` canvas, teal `#2F9E8D` grid + line + "?" + dot, bright teal `#74DDCD` pulse + eyebrow, white label.
- Eyebrow: Space Mono caps, letterspaced (`MASTERING OBSERVABILITY · SIGNAL DROP`). Label: Montserrat 800, "Your Questions".

## Timeline (30fps)
1. **0.2-1.3s** Teal signal line draws; a bright mint pulse travels left to right along it.
2. **1.25-1.7s** Line fades; a teal "?" blooms (scale + fade) at centre.
3. **1.7-2.6s** Eyebrow + "Your Questions" rise and fade in (ease-out); teal dot.
4. **2.6-3.3s** Hold. **3.3-3.5s** quick fade for the cut back to content.
- **Audio:** ascending pulse ticks under the travel, a soft confirm bell + sub on the "?" bloom (~1.45s), short pad tail to silence. File: `podcast_qa_transition_sting.wav`.

## Deliverables (rendered 2026-06-25, audio baked in; PIL + ffmpeg, H.264/AAC)
- `podcast_qa_transition_16x9.mp4` (1920x1080), `podcast_qa_transition_9x16.mp4` (1080x1920), `podcast_qa_transition_sting.wav`.
- **Same font caveat as the intro:** rendered with fallback fonts (bold sans + mono); Montserrat/Space Mono unavailable in the render env. Colour/motion/layout/audio on-spec; re-render with brand fonts for final-final.

## Use
Drop at the head of the Q&A segment. Pairs with `Podcast_Intro_Standard.md` (cold-open) and `Shortform_Bookend_Standard.md`; all share the navy/teal/Montserrat family.
