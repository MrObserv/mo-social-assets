# Video Card System Standard

**Status: REGISTERED by Control 2026-08-20** (PI-2026-08-13-02, Al 2026-08-13). Codifies the video card system stood up for TT04 so it is a repeatable standard, not a per-episode hand-build.

**What it is.** The on-screen card / overlay system burned onto Tech Tuesday (and other video) episodes to carry visual variety and re-hook beats. Built on the **dark visual-asset surface** (§24.11): navy `#0a0e17` canvas, mint `#64ffda` accent, teal `#14a3a8` structural rules — the same house style as `Tech_Tuesday_Standard.md` and the §19.6 thumbnails.

## The four card types
1. **FULL CARD** — full-frame card that replaces the video (title beat, quote, key definition, or a named-parts list). The video cuts to it for the beat.
2. **FULL DIAGRAM HOLD** — a full-frame hold on a diagram (concept/flow or architecture, per `Diagram_Standard.md` / `Architecture_Diagram_Standard.md`), held while the point is explained.
3. **LOWER THIRD** — a strip across the lower third (speaker/label, term being introduced, or a one-line reinforcement) over the live video.
4. **CORNER INSERT** — a small card in a corner (a stat, a term, a callout) over the live video.

## Format + timing
- **1920x1080 PNGs**, transparent where the card is an overlay (lower third / corner insert), full-frame for FULL CARD / FULL DIAGRAM HOLD.
- **Built via PIL** (the agent/PIL producer stood up for TT04) and **burned onto the video via ffmpeg from the episode SRT** (the card is placed against the transcript timecode of its trigger line).
- **Timing rule (locked): card ON at the line, OFF ~1.5s after.** The card appears as the triggering line is spoken and holds ~1.5s past the end of the line, then clears (except FULL DIAGRAM HOLD, which holds for the explained beat).

## Script + brief integration
- **`[CARD]` script cue.** The script marks each card inline with a `[CARD]` cue (type + content), placed at the line it fires on (Codex §25.5.1).
- **Visual/Card Plan (required brief section).** Every video episode brief carries a Visual/Card Plan listing each card (type, content, trigger line), which flows into the `[CARD]` cues and the re-hook cadence (§19.5 rule 8 / §1.5 — a card change is a natural pattern-interrupt roughly every 2 minutes).

## Producer + packaging-art lane (reconciliation, PI-2026-08-13-02)
- The **agent/PIL path is blessed** for building the video cards AND for **no-headshot terminal / OG packaging assets** (square episode art, OG cards) — the agent now produces these directly.
- The **hero face-from-video thumbnail is NOT in this lane**: it still runs through the §19.6 builder + the matting path (`Hero_Thumbnail_Standard.md` / `Hero_Thumbnail_REVERSE_ENGINEER_SPEC_2026-07-24.md`). The card system does not touch the hero-thumbnail matting rule.

## MANDATORY two-pass brand QA gate
Same discipline as `Tech_Tuesday_Standard.md` / `Diagram_Standard.md`: open every card at full size; nothing clips or collides; correct palette/fonts/motif; card burns on at the right timecode and clears per the timing rule; §5 clean on all card copy.

---
**Registered in `00_Design_Standards_Index.md`.** Routed to Control (standard/producer) + Voice Codex (§1.5 + §19.5 `[CARD]` cue) + Growth (dark-theme companion diagram variants).
