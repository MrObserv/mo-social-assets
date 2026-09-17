# Brand findings from the demo lab, verified, 2026-09-16 (eleventh pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. This is a new file for work done after `2026-09-16_nav-demos-item.md`. It adds to that file and corrects nothing in it.

**Scope taken:** the demo lab session sent two brand findings to "route through Al, not requests to edit anything". They were verified read-only, and nothing was edited.

**Read:**
- `06_Brand_Assets/Design_Standards/design-tokens.json`, in two copies that give the same values for everything below:
  - on G: at version 3.1.0, updated 2026-09-11;
  - in the repo `mo-social-assets` at version 3.1.7, updated 2026-09-14.
- `06_Brand_Assets/Design_Standards/marks/`: the on_light and small_on_light ring marks.
- The page sources in `07_Website/Pages/`, the live pages, and the live favicon and nav mark.
- `08_SEO_Improvement_Plan/42_MARK_AND_FONT_DEFECT_WORK_ORDER_2026-09-14.md`, from Content Management.

## 1. Retired colours: confirmed, and live

**The tokens:**
- soft is now #5A6E72, replacing #63797D;
- semantic-high is #8F6109, replacing the old caution #A8720B;
- ground is #F6F8F7, replacing the cream #F5F3EC.

**Contrast, measured.** WCAG 2.1 AA needs 4.5:1 for body text.

| Colour | On ground #F6F8F7 | On white | On tint #EAF6F3 |
|---|---|---|---|
| #63797D, retired | 4.32, fails | 4.60 | 4.16, fails |
| #5A6E72, soft | 5.04 | 5.37 | 4.86 |
| #A8720B, retired | 3.88, fails | 4.14, fails | 3.74, fails |
| #8F6109, semantic-high | 5.07 | 5.41 | 4.89 |

**In the page sources.** Occurrence counts in brackets.
- **#63797D:**
  - Home blocks 1 (2), 2 (1) and 3 (1);
  - `home_feed_heading` (1), `advisory_page` (1), `book_page` (1), `podcast_header` (1), `subscribe_page` (1);
  - all eight OG card sources (home 2, the rest 1 each);
  - `home/post_feed_settings.md` (3, notes).
- **#A8720B:** Home block 1 (5), blocks 2 and 3 (1 each), `advisory_page` (1), `og_home` (4), `og_advisory` (3).
- **#F5F3EC:** `metrics_mayhem_hub.html` and its `_PASTE.txt` copy (1 each).

**Live, counted in the rendered pages:**

| Page | #63797D | #A8720B | #F5F3EC |
|---|---|---|---|
| Home | 31 | 14 | 0 |
| Archive | 39 | 0 | 0 |
| Advisory | 2 | 2 | 0 |
| Podcast | 5 | 0 | 0 |
| Book | 2 | 0 | 0 |
| Subscribe | 2 | 0 | 0 |
| Metrics & Mayhem hub | 0 | 0 | 2 |
| Free chapter | 0 | 0 | 0 |

The live counts are higher than the sources because beehiiv's own blocks also carry the colour in their settings: the Home and Archive post feeds' dates, the Archive search box, and the Podcast feeds.

**Also found, beyond the demo lab's list:**
- **Dark ring mark files.** In `Pages/brand/ring_mark`, `mo_ring_mark_dark.svg`, `mo_ring_mark_avatar_dark.svg` and the dark PNGs built from them use the retired #0A0E17 and #64FFDA.
- **The Subscribe rollback copy.** `subscribe_page_live_2026-07-27.html` carries the retired #1a1a1a, which is expected in a rollback copy.

## 2. The ring mark: what is live

**The manifest.** The `marks` block in design-tokens.json defines the variants:
- **on_light:** two 1px rings at 0.38 opacity around a solid centre, drawn on a 24-unit grid;
- **small_on_light:** one 2px ring and a larger centre;
- **the rule:** below 40px, use the small variant.

**What is live:**
- **Site nav mark:** a 52px PNG shown at 26px on desktop and phone. It is the full two-ring mark (1,570 bytes, the same size as `06_Brand_Assets/marks/mo_ring_mark_52.png`). At 26px the rule calls for small_on_light.
- **Favicon:** beehiiv serves the publication logo, `mo_ring_mark_104.png` (a 1200px upload), as the favicon. It is the full two-ring mark, shown at 16 to 32px, where the rule calls for the small variant. The tokens file notes that the favicon rebuild is owed, from small_on_dark.
- **The PNGs in `Pages/brand/ring_mark`:**
  - the light avatars and favicons are the on_light SVG drawn larger, so the 1px rings scale up with it, to about 9px wide in the 400px avatar. That is why they read as thick;
  - the 32px favicon uses the two-ring mark below the crossover.
- **OG cards:** the mark is drawn at 34px on the 1200px canvas. LinkedIn shows a card at about 552px wide, so the mark appears at about 16px, in the full variant.

## 3. Proposals for Al

Each needs a change request or Al's yes. None has been started.

19. **[Website] Palette refresh.** In the draft, swap #63797D for #5A6E72, #A8720B for #8F6109, and #F5F3EC for #F6F8F7. This covers the page sources and beehiiv's own block settings: the Home and Archive feeds, the Archive search box, and the Podcast feeds. Verify, then Al publishes. This fixes an accessibility failure, not only drift.
20. **[Website] Re-render the share cards.** Re-render the eight OG cards with the current tokens and upload them again. Uploads go live at once, so this needs Al's yes. The same pass should apply the small-mark rule at the card's displayed size, and settle the question of a wash on light cards raised in `42_MARK_AND_FONT_DEFECT` D5.
21. **[Brand] Nav mark and favicon.** Replace the 26px nav mark with small_on_light, and the favicon with the small variant. The favicon is beehiiv's publication logo, which may also appear in emails, so it is Al's call.
22. **[Brand] Dark ring mark files.** Either rebuild the dark variants in `Pages/brand/ring_mark` from the canonical on_dark and small_on_dark marks, or retire them in favour of `06_Brand_Assets/Design_Standards/marks/`.
23. **[Records] Numbering.** Two files in `08_SEO_Improvement_Plan` now start with `42_`: this satellite's Home record, and Content Management's mark and font work order. Neither has been renamed.

## Not done, and why

- **Any edit.** The findings came in to be routed through Al.
- **The post-page plan in `41_`** still names #63797D for the byline and dates. It will use #5A6E72 when that work resumes.

## Lessons

- **The token copies can disagree.** The canonical tokens file is `06_Brand_Assets/Design_Standards/design-tokens.json`, and on 2026-09-16 the G: copy lagged the repo copy (3.1.0 against 3.1.7). Read its retired list before choosing any colour.
- **Marks resolve by name.** The tokens' `marks` block is a manifest: look a mark up by its name, and use the small variant below 40px.

## Ops_Log line

Appended by this session directly to `00_Command_Center/Ops_Log.md` "Job runs" on 2026-09-16: the line beginning `| 2026-09-16 | website-build-satellite eleventh pass (demo lab findings) |`.
