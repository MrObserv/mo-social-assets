# Hero Thumbnail POC - 2026-07-30 (NOT SHIPPED / NOT LIVE)

Built by the `build-hero-thumbnail-poc` scheduled task per
`06_Brand_Assets/Design_Standards/Hero_Thumbnail_REVERSE_ENGINEER_SPEC_2026-07-24.md`.

Producer: `00_Command_Center/hero_thumbnail.py` (source of truth, on G:).

These renders are PROOF-OF-CONCEPT only, using a stand-in headshot
(Ep23's `23_headshot_clean.png`, an opaque navy-backdrop photo, colour-keyed
by the producer's fallback matting path) because no fresh Gemini cutout or
raw video was supplied for this run. Do not treat these as final Ep24/Ep25
assets, and do not wire this producer into `episode_asset_watcher_v5.py`
until Growth ratifies the standard.

Files:
- `25_thumbnail_hero_1280x720_LAYOUT_B_POC.png` - Layout B (explainer), Ep25 blast-radius data
- `25_thumbnail_hero_qa_LAYOUT_B_POC.png` - QA contact sheet (full + 160x90)
- `24_thumbnail_hero_1280x720_LAYOUT_A_POC.png` - Layout A (simple), Ep24 hook/keyword
- `24_thumbnail_hero_qa_LAYOUT_A_POC.png` - QA contact sheet (full + 160x90)
- `ep25_diagram_sample.json` - sample --diagram config (also on G: as hero_thumbnail_sample_diagram_ep25.json)

Known POC limitation: faint mint speckling on the shirt/beard in both
renders is a colour-key matting artefact of the stand-in Ep23 photo (which
was never meant to be alpha-cut), not a producer bug -- a genuine Gemini
alpha PNG has no uniform backdrop to mis-key and will not show it.
