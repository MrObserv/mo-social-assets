# Meeting Backgrounds (Teams / Zoom / Meet / NVIDIA Broadcast)

**Created:** 2026-06-18. Subtle, professional virtual backgrounds for everyday video calls and interviews. v2.0 brand. Quieter than the podcast Studio_Backgrounds: no SIGNAL DROP wordmark up top, no REC chip, no waveform. Just a calm navy field with the Metrics & Mayhem lens lockup bottom-left and masteringobservability.com bottom-right, so there's a little brand presence in every call without being a billboard.

## Files

| File | Use |
|---|---|
| `meeting_bg_v1_default.png` / `.jpg` | **Default.** Navy gradient, faint dot lattice, corner glow, lens + METRICS & MAYHEM bottom-left, URL bottom-right. |
| `meeting_bg_v2_minimal.png` / `.jpg` | Even quieter: same lockup, no dot lattice. Use for the most conservative rooms. |
| `build_meeting_bg.py` | Generator (Pillow, v2.0 tokens + brand fonts). Edit and rerun. |

1920x1080. **Use the JPG for NVIDIA Broadcast** (and anywhere a PNG is refused); PNG everywhere else.

## Why the branding sits where it does

- **Top-left lockup, bottom-right URL.** For a seated head-and-shoulders shot the body fills the centre and lower-centre (shoulders spread wide, mic dead-centre), so the bottom-left corner gets covered. The clear zones are the top corners and bottom-right. The lens + wordmark sits top-left; the URL stays bottom-right. (Earlier drafts put the lockup bottom-left; live NVIDIA Broadcast testing showed the shoulder covered it, hence the move to top-left.)
- **Mirroring:** Teams/Zoom/Meet show your self-view mirrored, so the text reads backwards to you while on the call. Other participants see it the right way round. Do not flip the file to compensate.
- **Subtle by design:** low-contrast lattice, restrained lockup. Reads as a branded office wall, not an ad.

## How to set it

- **Teams:** More → Background effects → Add new → pick the JPG.
- **Zoom:** Settings → Background & Effects → + → Add Image.
- **Google Meet:** in-call → bottom-right effects icon → upload.
- **NVIDIA Broadcast:** Camera → Background → Replacement → add the JPG (use JPG; Broadcast can refuse some PNGs).

Pairs with the podcast set in `Studio_Backgrounds/` and the wider brand in `Slide_System/`.
