# Blog Thumbnail Standard

**Amended 2026-09-15.** The Spec block was rewritten wholesale against Brand Design System v3 rather than patched: it was stale in six places — the navy gradient, the retired mint grid, the retired bright-mint eyebrow colour, the retired dark-mode subtitle grey, the lens mark at 40–60 per cent, and a Production line pointing at a deleted kit. Patching the title bullet alone would have left five contradictions. (Retired values are named by role, not by hex: a retired hex written into a note that documents it is still a retired hex in the file, and `assertNoRetired` scans whole source including comments.)

**Canonical:** Voice Codex §25.1 (blog production) and §24.11 (dark visual guidance). Sample: `samples/sample_blog_thumbnail.png`. Existing exemplar: `04_Newsletter_and_Blog/_Newsletter/thumbnail_secops_observability.svg`.

## Spec

- **Size:** 1200x630. Doubles as the OG image; always set OG title, description and image in Beehiiv. `byte_size` and `monthly_digest` share this canvas via `surface_aliases`.
- **Mode:** light. Writing renders light, because the card and the page it opens are one reading surface. `blog_og` is dual-mode — the dark variant is only for an OG card fronting a non-writing asset. `byte_size` and `monthly_digest` are light only.
- **Canvas:** flat `ground` **#F6F8F7** with one radial teal wash in `teal` **#2F9E8D** at 12 per cent. Dark variant: `dark-ground` **#0D2127**, wash at 20 per cent. Never two washes. The navy gradient and the mint grid are retired.
- **Eyebrow:** mono caps, `teal-deep` **#17695C**, letterspaced, top left, preceded by a 70px `teal` rule. **Required, with no default** — a default that is right for one surface and wrong for four is how the wrong eyebrow ships. Vocabulary and the choice rule are in §Eyebrow below.
- **Title:** display face, `ink` **#16282D**, left-aligned, 2 lines preferred, 3 maximum. **Use the post's og:title.** Where the headline is long or buries the point, write a distilled line instead: one insight, 12 words or fewer. Card and share preview should say the same thing wherever the headline already is the insight. (Al, 2026-09-14.)
- **Subtitle:** optional, one line, `muted` **#3B5257**, body face.
- **Footer:** mono caps. Wordmark left in `soft` **#5A6E72**, domain right in `teal-deep` **#17695C**. The wordmark is resolved by `lockupFor(surface)`, never typed — blog, byte-size, Digest and newsletter are all house lane and carry MASTERING OBSERVABILITY. Podcast surfaces carry METRICS & MAYHEM.
- **Mark:** ring mark **top right at 80px**, resolved by name from the marks manifest with the 40px crossover applied (80 is above it, so the full variant is used). **Full opacity** — the mark carries its own ring opacity in the file, so a producer opacity double-applies it. The 40–60 per cent rule described the retired lens mark.

  It was bottom right at 44px until 2026-09-16. Two reasons it moved: 44px on a 1200 canvas renders near 20px at LinkedIn’s ~552px width, under the 24px floor in `Logo_and_Marks_Standard.md` §1; and 80px does not *fit* the footer band, which is 78px tall. Al ruled the size, Design chose the placement. Value lives in `marks.ring_mark.og_card_px`.
- **No:** icons, emoji, stock humans, gradients on text, more than one message.

## Eyebrow

| Surface | Eyebrow |
|---|---|
| Technical blog | `TECHNICAL` |
| Leadership blog | `LEADERSHIP` |
| Newsletter | `THE SIGNAL` |
| byte-size | `BYTE-SIZE` |
| Digest | `THE OBSERVABILITY DIGEST` |

**Which one, when a post is both technical and short** (Al, 2026-09-15): **length and treatment decide it, not topic.** Short and to the point is `BYTE-SIZE`. A larger technical explainer carrying diagrams is `TECHNICAL`. So `what-is-grafana-alloy` is `BYTE-SIZE` despite being a technical subject.

Required on every render. A missing eyebrow fails the render rather than guessing.

## Production

```
node producers/mo_visual_kit.js blogthumb \
  --surface <blog_og|byte_size|monthly_digest> \
  --eyebrow "LEADERSHIP" --title "..." [--sub "..."] \
  --out <post-folder>/<slug>_og_1200x630.png
```

The only kit is `06_Brand_Assets/Design_Standards/producers/mo_visual_kit.js`. `templates/mo_visual_kit.js` and `producers/mo_visual_kit.v3.js` were deleted 2026-09-14. Run `node mo_visual_kit.js preflight` first — it resolves every font and every mark and writes nothing.

`--surface` and `--eyebrow` are required and have no defaults.

**Output format.** PNG, truecolour, lossless. No `quality` option — in sharp, quality on a PNG implies `palette: true`, which quantised every card this kit produced before 2026-09-14 to 25–28 colours and banded the wash.

**Acceptance is colour type, not file size.** Read byte 25 of the PNG: colour type 2 or 6 passes, colour type 3 means a quantised producer is still in use. Measured output is 39–54KB — *smaller* than the 69–89KB indexed originals, because dither compresses worse than a smooth gradient. An earlier estimate of 290–575KB in this file was reasoned rather than measured, and was wrong in the wrong direction: a size check would have read as a failure when the fix had worked. 1MB remains a smoke alarm.

**Output location (mandatory).** `--out` MUST write into the post's own per-post folder under `04_Newsletter_and_Blog/<date>_<slug>/`, named `<slug>_og_1200x630.png`. For old posts with no per-post folder (e.g. the six evergreen winners), use their established home, `07_Website/08_SEO_Improvement_Plan/01_Evergreen_Winners/og_cards/`. **Never** dump cards into a shared scratch folder (the old `06_Brand_Assets/blog_thumbnails_v2/` dump has been retired). One card, one home, next to its post.

## QA

Shrink to ~300px wide: title still legible, one message, brand recognisable. Check the OG render with LinkedIn Post Inspector before the launch sequence (§25.2).
