# Carousel Standard v3.0 (LinkedIn + Instagram)

**v3.0, 2026-10-12.** Rebuilt on the v3 system. The producer is `producers/mo_carousel.js`. `templates/render_carousel.py` is retired and refuses to run. The palette is `design-tokens.json`, read through `mo-tokens.js`: this file names colours by role and never by value, because `assertNoRetired` scans prose too.

**What it is:** a swipeable multi-slide post at 1080x1350 (4:5). One build serves both surfaces: a LinkedIn document (PDF) and an Instagram carousel (images). LinkedIn is primary.

---

## Rulings (2026-10-12, Design, for Content)

- **Mode: light.** `modeFor("carousel")` returns light and the producer throws if it ever stops. Brand v3 §2 lists carousels on the light side.
- **Lane: house, always.** Every carousel carries MASTERING OBSERVABILITY from `T.lockupFor("carousel")`, including an episode carousel such as a Signal Drop Hard Stop. Name the show in the cover eyebrow, which is copy, not a lockup. One template, one wordmark.
- **Attribution.** A point that draws on somebody else's work carries a `source` line: a short rule in the point's accent, then the line in DM Sans 32px, muted, under the body. The template places and sizes it; the copy supplies the words, literally (no "Source:" prefix is added on the slide; the alt text adds one unless the point gives its own `alt`).

## Scope: what we carousel (5 buckets)

Carousel only content that is genuinely list, step or framework shaped and reshapes something already published. Do not invent a carousel out of thin narrative.

1. **Episode Hard Stops**: a Signal Drop's Hard Stop and habit as a how-to.
2. **byte-size explainers**: "What is X" in five slides; routes to the byte-size blog.
3. **Event and field takeaways**: conference and customer-event reads.
4. **Book and framework concepts**: a chapter idea or a named framework; routes to the free chapter.
5. **Leadership and motivation picks**: principle-per-slide reshapes of the leadership and High Performance material.

**Do not carousel:** single quotes (that is a quote card), pure narrative or a reactive one-liner, or anything without a clean multi-part spine.

## Cadence

Two carousels a week, LinkedIn first, cross-posted to Instagram (Al, 2026-07-06). Carousel A from an [OET] bucket, Carousel B from [L&M].

---

## Format grammar (fixed, enforced)

**Cover, then 3 to 5 numbered points, then the CTA: 5 to 7 slides.** The producer throws outside that.

- **Cover:** kicker rule and mono eyebrow in teal-deep, ring mark top right, display hook (Montserrat ExtraBold, auto-fitted 96 to 80px, at most 4 lines), one-line sub in DM Sans 44px muted, SWIPE cue bottom left.
- **Point slides:** giant numeral (`01`..) and mono label in the point's accent, display head (80px, at most 3 lines), body (DM Sans 44px muted, at most 5 lines), optional source line. **Every point slide sits at one vertical position**, set by the tallest point, so the numeral does not jump on swipe.
- **CTA:** kicker and eyebrow, display head (96 to 80px), optional sub, a teal-deep button (radius 12, which is the 4px Brand v3 button radius at phone width), and the link line. Two renders: LinkedIn `LINK IN COMMENTS`, Instagram `LINK IN BIO`.
- **Chrome:** `n / N` counter top right on slides 2 onward; the house wordmark centred in the footer in teal-deep. (The Conway stopgap's footer was teal at 16px: under 3.3:1 and 5.5px on a phone. Both fixed.)

**Accent by meaning, never decoration.** `tone` is `problem` (semantic-high, amber), `neutral` (teal-deep) or `fix` (semantic-low, green).

## Gates (the producer throws; nothing here relies on remembering)

- **Text fit:** every string is measured with the per-face advance tables from the repo fonts (mo_diagram.js 2.0.0) and must sit inside its box and the canvas.
- **Size floor at phone width:** `canvas.floors.carousel`, judged at 375px: display 72, body 40, source 32, labels 26.
- **Contrast:** every string at least 4.5:1 against the actual ground under it, radial wash included.
- **Length:** head, body, hook and source line counts as above; point groups must fit the band between counter and footer.
- **Copy:** no em dashes, no double spaces, no empty fields.
- **Render:** `assertNoRetired` on the producer sources, `assertRenderClean` on every SVG, PNG byte 25 must be 2 or 6.

## Production

```
node 06_Brand_Assets/Design_Standards/producers/mo_carousel.js build <spec.json> --out <dir> [--variant both|linkedin|instagram]
node 06_Brand_Assets/Design_Standards/producers/mo_carousel.js check <spec.json>
node 06_Brand_Assets/Design_Standards/producers/mo_carousel.js sample --out <dir>
```

`check` runs every gate and writes nothing, so copy can be tested before a render.

```json
{
  "slug": "2026-10-13_carousel_example",
  "cover":  { "eyebrow": "SERIES OR SOURCE", "hook": "The hook.", "sub": "One line.", "alt": "optional" },
  "points": [
    { "tone": "problem", "label": "The problem", "head": "Under eight words",
      "body": "Two or three lines.", "source": "optional", "alt": "optional" }
  ],
  "cta": { "eyebrow": "ON THE BLOG", "head": "The piece it routes to", "sub": "optional",
           "button": "Read it", "alt": "optional; the link line is appended" }
}
```

**Out:** `<slug>_<n>_<name>_1080x1350.png` per slide, both CTA renders, `<slug>_linkedin_1080x1350.pdf` (cover, points, LinkedIn CTA), and `<slug>_manifest.json` with the alt text and gate results per slide, per variant.

- **Output location:** the piece's own folder, for example `04_Newsletter_and_Blog/<date>_<slug>/carousel/`. Never a shared dump.
- **Specs** live beside the output, not in the repo. The repo holds only `producers/samples/carousel_sample.json`, which is neutral placeholder copy.

## SEO, funnel, voice

- The target keyword leads the caption's first line, appears on the cover and sits in the hashtags. The carousel points at the indexed asset.
- The last slide is always the routed CTA, and the caption carries a CTA and link.
- UK English, no em dashes, `s5_lint` clean on slide text and caption. A carousel only reshapes published, defensible content. Alt text on every slide (the manifest carries it).

### Upload route

- **Host path:** slides and PDF go in `mo-social-assets/Carousels/`. Claude stages, Al pushes; delete any stale `*.lock` first. After the push, fetch-test each raw URL before staging Buffer.
- **LinkedIn (document):** `schedulingType: automatic`. One `document` asset: `url` the PDF, `title`, `thumbnailUrl` slide 1. Al pastes the first comment.
- **Instagram (carousel):** N images in order, each with `altText` from the manifest; `metadata.instagram = {type:"post", shouldShareToFeed:true}`.
- Both stage `saveToDraft: true`.

## Brand QA (two passes, fresh eyes on the second)

The gates catch fit, floor, contrast and structure. What they cannot judge is still a human pass:

1. Open every slide at full size, then at about 300px wide.
2. The cover hook and every head read at that size.
3. The accents say the right thing (problem, neutral, fix).
4. Caption: `s5_lint` clean, keyword first, CTA and link present.

---

**Last updated:** 2026-10-12, v3.0. v2 (2026-07-04, dark surface, `render_carousel.py`) is superseded; its scope, cadence, upload route and QA discipline carry over unchanged.
