# OG / Share Card Standard v3

**Owner:** Design · **Mode:** light, mode C · **Lane:** house (`MASTERING OBSERVABILITY`) · **Tokens:** 3.5.0 · **Last updated:** 2026-10-16

The share card is what a link to one of our pages shows when it is posted or unfurled, and the same card when it is posted as an image. It has two cuts:

| Cut | Canvas key | Size | Built by |
|---|---|---|---|
| Wide | `og_card` | 1200×630 | a hand instance of `07_Website/Pages/brand/og_cards/og_book.html` (or a sibling in that folder) |
| TikTok | `og_card_tiktok` | 1080×1920 | `producers/mo_share_card.js` |

**This rewrite replaces the v1 standard in full.** v1 described a dark navy card from `00_Command_Center/thumbnail_builder.py` `compose_og()`, with a mint palette and a vertical divider, registered 2026-07-11. That card was retired when share cards moved to mode C. It survives only in git history. Nothing below inherits from it.

---

## 1. The wide card, 1200×630

**Source:** the templates in `07_Website/Pages/brand/og_cards/`. `og_book.html` is the one with a cover. `og_home.html` is the same design without one. A new card is a copy of the nearest template with the copy and image swapped. Nothing else changes.

**Anatomy, as built:**

- **Surround:** tint, with an inset panel (ground, a hairline border, radius 6) and one radial wash at top right.
- **Kicker:** a 70px rule in teal, then Space Mono 700 22px, letter-spaced 6, upper case, in teal-deep.
- **Headline:** Montserrat, 78px, line height 1.04. Two parts. The second part is set `display:block` in teal-deep, so the card reads as two lines.
- **Sub line:** DM Sans 28px, muted, at most 46 characters wide.
- **Cover** (with-cover variant): top right, 310px tall, radius 4, with the shadow `0 18 40` in navy at 22 per cent.
- **Footer:** a rule, `MASTERING OBSERVABILITY` left in soft, the domain and the ring mark right in teal-deep.

**Rendering:** in a browser at 1200×630, then saved as PNG. Every card in the folder carries a `_1200x630.png` beside its HTML.

**Known deviation, recorded rather than fixed:** these templates set the headline at weight 900. The tokens have said 800 since 3.1.1. Correcting the templates would change every wide card's pixels, including the two ebook cards whose hashes are pinned. It is left until the wide cards are next re-rendered for another reason.

## 2. The TikTok cut, 1080×1920

**Producer:** `06_Brand_Assets/Design_Standards/producers/mo_share_card.js`

```
node producers/mo_share_card.js build <spec.json> --out <dir> [--proof]
node producers/mo_share_card.js check <spec.json>
```

**In:** one spec JSON. `slug`, `kicker`, `head`, optional `head_em`, `sub`, `cover` (a path relative to the spec), and `alt`, which must end with "Link in bio."

**Out:** `<slug>_1080x1920.png` and `<slug>_1080x1920_manifest.json`, which records the alt text, the gate results, and the cover and ring sizes. With `--proof`, it also writes `proof/<slug>_1080x1920_proof.png`, showing the card under a mock of TikTok's interface.

**It extends the wide card. It does not fork it.** `og_book.html` is not touched. The 9:16 card keeps:

- the type roles: mono kicker with its rule, two-tone display headline with the second part in teal-deep, muted sub;
- the cover treatment: radius and shadow scaled from the 310px cover;
- the house wordmark.

**Where it departs, and why (Design, 2026-10-16):**

- **Chrome follows the TikTok carousel's** (Al, 15 Oct). There's no counter, and the ring mark and wordmark sit at the top of the safe box.
- **The domain line is dropped.** On the wide card it sits at the bottom edge, which is TikTok's caption zone, and the post caption already says "Link in bio".
- **One `LINK IN BIO` line**, in the carousel CTA's link-line treatment.
- **The ground is the feed ground** that `mo_social.js` draws (panel plus one wash), not a tint surround with an inset panel. There are two reasons:
  - the contrast gate measures against the ground it draws;
  - an inset panel would spend width that the 810px safe column does not have.

  It also matches the TikTok carousels these cards post beside.

**Layout is computed, not placed:**

- **Words:** one block, with the link line sitting 20px above the safe floor.
- **Headline:** set at the largest size, from 104px down, at which each part stays on one line, as the wide card sets it.
- **Cover:** takes the space between the brand row and the words, capped at 860px tall, and centred in it. So a longer sub shrinks the cover, never the type.
- **Too long:** if the words leave the cover smaller on a phone than it already is on the wide card (143px seen), the producer throws. That copy goes back to Content.

**Ring mark:** 88px, which is 31px on a 375px phone. That is under `marks.ring_mark.crossover_px` (40), so this producer uses the small variant: it picks by **displayed** size (`marks.ring_mark.display_rule`).

**Gates** (every one throws, listing each failure):

- **text fit:** every string within its measured box;
- **phone floors:** `canvas.floors.og_card_tiktok`, the carousel floors, because the card is full width at 375px;
- **contrast:** 4.5:1 against the real ground under each string;
- **safe box:** every string, the ring mark and the cover wholly inside `safe_areas.tiktok_photo.box` [120, 200, 930, 1520];
- **render:** `assertNoRetired` on the source, `assertRenderClean` on the SVG, and PNG byte 25 must be 2 or 6;
- **copy rules:** no em dash, no double space, and an alt line that ends "Link in bio."

## 3. Files

Cards for a campaign live together, as in `cards/2026-10-16_ebook_launch/`:

- the wide card's `.html` and its `_1200x630.png`;
- the TikTok cut's spec, `_1080x1920.json`, and its `_1080x1920.png`;
- `alt.json`, holding the alt text for every PNG in the folder.

## 4. QA, two passes

1. **Look at the render at full size.** Check:
   - the headline breaks where the copy means it to;
   - the cover is not cropped;
   - nothing crowds the brand row;
   - the link line is the last thing read.
2. **Look at the proof**, then take a second, fresh look at the card itself. Only a pass that finds nothing ships.
