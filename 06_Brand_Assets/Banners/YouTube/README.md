# YouTube channel art and avatar (v3 section 10a)

Built 2026-11-01 from design-tokens 3.5.0 and claim-bank.json, on Al's rulings of the same day: dark mode, centred, the channel name as the title, the Metrics & Mayhem lockup, claim C01, and the ring mark's small variant as the avatar.

**Files:** `youtube_channel_art_C01_2560x1440.png` (upload as the banner image), `youtube_avatar_800.png` (upload as the picture), `review_sheet_C01.png` (TV, desktop band, phone crop, avatar at 160, 48 and 36 px), `youtube_channel_art_C01.json` (every measured position).

**Reproduce:**

```
python build_youtube_channel_art.py ../../Design_Standards/producers . C01
```

Alternates are one argument away: C02, C15 or C22, the four claims the bank approves for banners.

## What is where

- **Safe area** 1546 x 423, centred: the whole composition. On a phone it is the entire banner. The desktop band is the middle 423 px at full width; a TV shows the whole file.
- **Kicker** ALLAN MANN in the label face, teal-bright, a teal rule either side.
- **Title** Mastering Observability in the display face at 120 px, white, display tracking; fitted to the safe width by measurement, never typed.
- **Claim** C01, body face, on-dark-body.
- **Lockup** METRICS & MAYHEM, label treatment, on-dark-soft.
- **Lens rings** the mark's ring ratio at 880 and 813 px, centred, teal-bright at the dark mark's opacity. They never enter the safe area (gated), so a phone never sees them and desktop sees them as arcs at the edges. They are decoration, not the mark.
- **Wash** one radial teal wash at the dark opacity from the token file, centred as the house producers draw it.
- **No mark inside the safe area.** A mark there would render under the 24 px floor on a phone, and the avatar, which sits under the banner on every channel page, already carries it.

## Gates

Ten, on the rendered pixels: each text element inside the safe area with a 40 px margin; title and claim centred to within 4 px (two-pass centring on measured ink); the rings outside the safe area; the title one line at 60 px or more; the claim approved for banners; the surface dark and podcast lane.

## Deviation, recorded

The LinkedIn banners are composed from the Node producer helpers through sharp. On this PC the Node font probe (`node mo_visual_kit.js preflight`) could not resolve Montserrat ExtraBold or DM Sans, so SVG text would have rendered in a fallback face. This build reads the same static TTFs in `06_Brand_Assets/fonts` through Pillow, and reads every colour, size, lane and mode through `mo_tokens.py`, the single read path. No hex is typed. When the Node fonts resolve, a sharp build from the same spec is the better home for this; the JSON records every position to reproduce it.

## Replaces

`06_Brand_Assets/youtube-banner.png` (February 2026): the retired eye mark, the retired mint and ground, a system sans, an em dash. Retire it once the new banner is live.
