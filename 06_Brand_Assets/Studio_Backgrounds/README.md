# Studio Backgrounds (v2.0 brand)

**Created:** 2026-06-18. Riverside virtual backgrounds for the Metrics & Mayhem podcast, repainted to the v2.0 brand (see `../Slide_System/Slide_Design_System.md`). These supersede the v1.0-palette set in `03_Podcast/Studio_Backgrounds/`, which was built before the 2026-06-15 brand update.

## What changed from the old set

Palette and fonts only; layout and the Shorts-safe logic are unchanged and still good.

- Navy base `#0a0e17` → `#0D2127` (v2.0 navy).
- Mint/teal accents `#64ffda` / `#0d7377` → `#74DDCD` (bright teal) and `#2F9E8D` (teal).
- Display font Lato stand-in → **Montserrat ExtraBold/Bold**; mono → **Space Mono**; body → **DM Sans**. The real brand fonts now, pulled from `../fonts/`.

## Files

| File | Use |
|---|---|
| `studio_bg_v1_broadcast_set.png` | **Default.** Cleanest and most minimal. Use unless there's a reason not to. |
| `studio_bg_v2_on_air_studio.png` | Set-piece feel, acoustic-panel verticals. Season openers / broadcast-flavoured. |
| `studio_bg_v3_signal_architecture.png` | Observability-themed: dot lattice, waveform, bracket frame. Technical episodes. |
| `build_studio_backgrounds.py` | Generator (Pillow). v2.0 tokens and brand fonts at the top; edit and rerun. |

All three are 1920x1080, ~80-110 KB, well inside Riverside's limits (PNG/JPG, under 4 MB, max 4096px long edge, record at 1080p not 4K).

## The two rules that still hold

- **Brand survives the Shorts crop.** The lens mark + SIGNAL DROP wordmark live in the top-centre column (x 656-1264, y 30-190), which is the only region a 9:16 Short keeps. Side-gutter lockups appear in the wide shot and are cropped from Shorts; that's fine.
- **Light yourself, not the backdrop.** Key light on the face, slight backlight so segmentation finds your edge (avoid a pure-black top). Sit head-and-shoulders, crown a third down. Test a 10-second clip at 1080p before recording.

## Upload to Riverside

Studio visual-effects panel → Backgrounds → upload tile → pick one PNG. Riverside shows the preview mirrored (text reads backwards while recording); the recording itself is not mirrored, so do not flip the file.

Full recording brief: `03_Podcast/Studio_Backgrounds/signal_drop_riverside_background_brief.md` (still accurate except the palette, which this set updates).
