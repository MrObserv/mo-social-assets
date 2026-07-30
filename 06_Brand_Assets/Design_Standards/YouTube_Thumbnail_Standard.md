# YouTube Thumbnail Standard

**Canonical and locked:** Voice Codex §19.6 (thumbnail best practices + checklist) and §24.15 (portrait gaze rule). The Codex checklist is mandatory; this is the crib sheet. Canonical exemplar: Ep 17 `17_thumbnail_youtube.png`. Sample: `samples/sample_yt_thumbnail.png`.

## Spec (the short version)

- **Size:** 1280x720, 16:9, sRGB, under 2MB.
- **Layout family (fixed):** navy gradient canvas, wordmark METRICS & MAYHEM + format badge (SIGNAL DROP / DEEP DIVE) in a top corner, headshot one side, title opposite, teal divider.
- **Headshot:** every YouTube thumbnail has one. Shot close, calm direct expression. Full head in frame with headroom, never cropped. Bleeds off the outer + top + bottom edges; feathered on the inner edge only. Graded toward the navy slate, desaturated backdrop, face the brightest element. Never a floating box or a cut-out.
- **Gaze (§24.15):** the gaze points into the content. Facing left → portrait left, title right. Facing right → portrait right, title left. Facing camera → either. Never mirror a portrait.
- **Title:** 3-5 words, all caps, bold, white, dominant. Teal subtitle optional and secondary.
- **One-second test:** legible at 160x90. Nothing important bottom-right (duration stamp).
- **Two outputs per episode:** 1280x720 YouTube (headshot) and 1200x630 Spotify/OG (no-headshot Signal Drop template — use the blog thumbnail generator).

## Production

`node templates/mo_visual_kit.js ytthumb --title "..." --sub "..." --badge "SIGNAL DROP" --headshot <clean-portrait.jpg> --out yt.png`

Supply a clean portrait (plain background, no text), ideally shot on a dark background from Riverside. The template grades and feathers it; it does not fix a bright background — prefer dark-background source photos, or tint per Codex §24.15 background-integration rules.

## QA (mandatory gate, §19.6)

Open the render at full size and at ~160x90 against the Ep 17 reference: head not clipped, face brightest, gaze into frame, text legible. Rendering is not shipping.
