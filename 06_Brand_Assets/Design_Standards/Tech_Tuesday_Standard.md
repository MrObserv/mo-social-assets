# Tech Tuesday Standard (series identity)

**Status: REGISTERED by Control 2026-07-10** in `00_Design_Standards_Index.md` + System Changelog (`GR-2026-07-06-01`; proposed by Growth 2026-07-06). First episode: "What is MCP?". Still owed (see the canonicalisation note at the foot of this file): relocate the render producers from `03_Podcast/Tech_Tuesday/tech_tuesday_v2/` into `templates/` (with the rename to the aspirational filenames below), add a Tech Tuesday template to the thumbnail producer, and settle the podcast-feed placement.

**What it is.** The visual + motion identity for **Tech Tuesday**, the MO technical teaching series (distinct from the Signal Drop podcast). Built on the **dark visual-asset surface** (§24.11): navy `#0a0e17` canvas, mint `#64ffda` accent, teal `#14a3a8` structural rules, Space Mono labels, Montserrat ExtraBold display. Its own signature is a **terminal / command-line motif** so it never blurs with Signal Drop's audio-waveform identity.

## Signature motif (what makes it Tech Tuesday)
- A mono command prompt `> tech_tuesday` and a **mint block cursor**.
- A **terminal-window chrome**: rounded rect, three muted traffic-light dots, a `~/mo/tech_tuesday` path titlebar, a divider, and a command inside the body (title card runs `> start --learn`, Spotify runs `> episode --open`).
- A **`TUE` day-chip** (mint pill, navy text, centred via glyph bbox).
- A faint **crosshair / lens** mark (the logo motif) and a subtle mint glow + vignette for depth.

## Palette + type
- Navy gradient `#090d15` → `#0f2137`, faint mint grid, vignette. Mint `#64ffda` = primary accent + cursor + chip + hero underline. Teal `#14a3a8` = wordmark rule + footer. White ink; grey `#bfced6` for taglines.
- **Display: Montserrat ExtraBold.** Labels/prompt/path/footer: Space Mono. Body: DM Sans. (Archivo Black parity with the thumbnail standard is a pending upgrade: the TTF is not in `06_Brand_Assets/fonts/` yet.)
- Semantic tokens unchanged from the dark-asset surface (amber `#ffd166` caution, green `#7bd88f` safe) — used only if meaning calls for them, not decoration.

## The asset set (producers regenerate all of these)
1. **Title card / intro end-frame — 1920x1080.** Wordmark top-left, terminal window with `> start --learn`, TECH (white) / TUESDAY (mint) hero, mint underline, `TUE` chip + tagline "ONE THING, EXPLAINED WELL.". Left-weighted editorial layout; crosshair top-right. The animated intro resolves onto this exact frame.
2. **YouTube thumbnail — 1280x720.** Real graded headshot bled off the right, feathered inner edge, **face-focus grading** (shirt/edges darkened so the face is the brightest element; §19.6/§24.15 gaze rule). Wordmark + `> tech_tuesday` prompt + `TUE` chip top-left; big white title (e.g. "WHAT IS MCP?") with a mint underline; `TECH TUESDAY` mono bottom-left.
3. **Spotify episode square — 1500x1500.** Terminal window, `TUE` chip, `EPISODE NN` eyebrow, big white title, mint underline, footer URL, a low-opacity giant ghost numeral (heritage nod, kept as texture, fully contained).
4. **Series badge — 1000x360.** The compact reusable lockup: `> tech_tuesday` with a mint cursor + `TUE` chip + "THE MO TEACHING SERIES". For section headers, end-cards, channel bugs, avatars.

## The intro (video head)
- **~7s, 30fps. 16:9 master (1920x1080) + 9:16 Shorts (1080x1920, centred, within the middle safe band; no chip, centred underline).**
- **Timeline:** 0.0-0.4 wordmark + terminal window fade in → 0.6-1.9 command `> start --learn` types out with a blinking mint cursor → ~2.5 enter/compile flash → **2.65-4.30 the TECH TUESDAY name prints in left-to-right on a mint scan line** (the deliberate reveal; underline draws in sync) → 4.3-4.8 tagline settles → hold to 7.0. Ends on the title card.
- **Audio (procedural, synthesised, no licensing):** per-character keystroke ticks under the typing, a low enter/compile thump on the hit, a rising scan-sweep under the reveal, a soft mint resolve chime (a fifth + octave) as the lockup lands, and a low hum bed throughout. Sting is reusable as `tt_intro_sting.wav`.

## SEO / metadata pattern (per episode)
Keyword-led YouTube + Spotify titles and descriptions, teaching register, canonical links block, defensible claims only (§11). Reference implementation: ep01 `ep01_mcp_metadata.md` (What is MCP?). The written **byte-size** companion (e.g. `/p/what-is-mcp`) is the crawlable search anchor the episode + socials point at.

## Producers (in `templates/`)
- `render_tech_tuesday.py` — the four static assets (run with `MO_FONTS` set to `06_Brand_Assets/fonts`; the YouTube producer expects a graded-source headshot as `hs.png` alongside).
- `render_tt_intro_16x9.py` / `render_tt_intro_9x16.py` — the intro frames + ffmpeg mux.
- `synth_tt_intro_audio.py` — the procedural sting (`tt_intro_sting.wav`).
- Rendered binaries (PNG/MP4/WAV) + the ep OG card are **hosted via the auto-sync repo** `mo-social-assets/` (raw.githubusercontent URL), not stored here, matching the canonical asset-hosting model.

**Canonicalisation still owed to Control (GR-2026-07-06-01):** register this file + producers in the Design index + changelog; add a Tech Tuesday template to the thumbnail producer (`mo_visual_kit.js`) so production thumbnails/Spotify art are generated not hand-built; register the intro alongside the Signal Drop intro; and settle the podcast-feed placement with Podcast Ideas (`ID-2026-07-05-03`).

## MANDATORY two-pass brand QA gate
No Tech Tuesday asset ships without it, run twice (fresh eyes on the second, subagent for bespoke/high-stakes): open every render at full size; nothing clips or collides; correct palette/fonts/motif; the `TUE` chip centred; on the thumbnail the **face is the brightest element** and the head is never cropped; squint test on the hook; §5 + keyword + CTA on the caption/metadata. Same discipline as `Diagram_Standard.md` and `Carousel_Standard.md`.

---
**Last updated:** 2026-07-06 (Growth). Direction locked by Al across iterations (terminal motif, scan-line reveal, face-focus thumbnail, centred 9:16 underline, no 9:16 chip, technical sting).
