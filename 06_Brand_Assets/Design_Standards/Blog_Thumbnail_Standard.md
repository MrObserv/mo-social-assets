# Blog Thumbnail Standard

**Canonical:** Voice Codex §25.1 (blog production) and §24.11 (dark visual guidance). Sample: `samples/sample_blog_thumbnail.png`. Existing exemplar: `04_Newsletter_and_Blog/_Newsletter/thumbnail_secops_observability.svg`.

## Spec

- **Size:** 1200x630px (doubles as the OG image; always set OG title, description and image in Beehiiv).
- **Canvas:** navy gradient (`#0a0e17` to `#0c1929` to `#0e1f35`), faint mint grid pattern (~2% opacity), soft mint radial glow off one side.
- **Eyebrow:** mono caps, bright mint `#64ffda`, letterspaced, top left (e.g. THE OBSERVABILITY DIGEST, or the series name).
- **Title:** display font, white, bold, left-aligned, 2 lines preferred, 3 maximum. One insight, ≤12 words (§24.11).
- **Subtitle:** optional, one line, grey `#9fb0bd`, body font.
- **Footer:** mono caps, mid teal: METRICS & MAYHEM · MASTERINGOBSERVABILITY.COM.
- **Logo:** lens mark bottom right at 40-60% opacity (§24.11).
- **No:** icons, emojis, stock humans, gradients on text, more than one message.

## Production

`node templates/mo_visual_kit.js blogthumb --title "..." --sub "..." --eyebrow "..." --out <post-folder>/<slug>_og_1200x630.png`

**Output location (mandatory).** `--out` MUST write into the post's own per-post folder under `04_Newsletter_and_Blog/<date>_<slug>/`, named `<slug>_og_1200x630.png`. For old posts with no per-post folder (e.g. the six evergreen winners), use their established home, `07_Website/08_SEO_Improvement_Plan/01_Evergreen_Winners/og_cards/`. **Never** dump cards into a shared scratch folder (the old `06_Brand_Assets/blog_thumbnails_v2/` dump has been retired). One card, one home, next to its post.

## QA

Shrink to ~300px wide: title still legible, one message, brand recognisable. Check the OG render with LinkedIn Post Inspector before the launch sequence (§25.2).
