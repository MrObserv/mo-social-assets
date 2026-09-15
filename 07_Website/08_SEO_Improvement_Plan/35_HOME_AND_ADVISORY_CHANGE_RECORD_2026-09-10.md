# Home and advisory redesign: change record and rollback

**Written 2026-09-10 by the website build satellite (a Claude Code session on Al's PC, with Claude in Chrome and the beehiiv connector), per `07_Website/_WEBSITE_BUILD_BRIEF.md`.**
**Scope taken: option 1, the visual and structural redesign of Home, together with pack 32 P3 (the truncated `/advisory` block). Al set this on 2026-09-10: Home should look exactly like the prototype he approved on 2026-09-06 (`Own the Signal.html`, saved to his Downloads on 2026-09-10), starting with the two parts he could not get right in the builder, the nav bar and the post feed.**

**Status: nothing published.** Every change in section 3 lands in the beehiiv draft. Al holds Publish. The rollback values in section 2 were read before any change, per `03_CHANGE_CONTROL_SOP.md` step 2.

Source files: `07_Website/Pages/home/` and `07_Website/Pages/advisory/`, copied from Al's Downloads on 2026-09-10 with matching SHA-256 hashes. The Downloads originals are untouched and are the rollback for every edit made to the `Pages/` copies.

---

## 1. State found, live reads on 2026-09-10

| Surface | Published, what visitors see | Draft, staged by Al and not published |
|---|---|---|
| Home `7e4166fc-59b0-4c14-a667-f23eb2640b9f` | Old two-column layout with four feeds, H1s "Latest Articles" and "The Pod", an inline signup form, IBM Plex Sans and #2F8F8B | Block 1, block 3, one post feed, block 2, in that order. The old layout, all four feeds and the inline signup form are gone. One H1, block 1's "Own the signal. Rent the platform." |
| Advisory `b9ce0cab-6190-4823-a104-8f9c0effbdf1` | Old block, truncated in the footer at `<a href="https://amzn.eu/d/0cAuR2`, still reading "Health Check" | New block, complete through the closing tag |
| Nav bar, site-wide | IBM Plex Sans, #1F2A2E text, #F6F8F7 bar, #E6ECEB bottom border, no button | Not changed |

**Correction to an earlier reading in this session.** beehiiv's Publish can target this page only, or selected pages (beehiiv help, "Website Builder Orientation"), so the advisory repair can go live on its own. The nav bar is a global element and applies to every page once published. Both pages share one draft preview id, `ee4cf196-8984-4d52-b5cf-fcf92d325a98`; the preview renders only for a logged-in session and redirects to the live page otherwise.

Draft home, top to bottom: section `54185301-8433-4dcc-bf56-f47473673cdf`; embed `a8c280f7-769c-4e6a-b405-353b08916494` (block 1); embed `deb9370d-0f5c-4a08-9ab7-2082f2503b85` (block 3); post feed `fb1b3e9f-9c7a-464d-bb74-c14ac9e1fe90` (category blog, count 2, 2 columns, search on); embed `4df360d5-5ff2-4d53-8151-1971d63fa84d` (block 2). The embeds matched the source files apart from line endings.

**The feed settings exist.** Every one of the 42 values in `post_feed_settings.md` is present as an attribute on feed `fb1b3e9f`, so a plan limit is not why they were hard to set. beehiiv keeps the card's fonts and colours inside **Edit Post Card**, element by element, rather than in the block's main panel, which is the likely source of the confusion.

---

## 2. Rollback

### 2.1 Home, published version (page `updated_at` 2026-09-10T06:30:32Z)

Page record: meta_title "Mastering Observability | Practical Advice for IT Leaders"; meta_description "Independent thinking on observability, IT operations and leadership under pressure. Read Metrics & Mayhem or start with a focused assessment."; append_publication_name_to_title false; x_* and facebook_* null; show_navbar true; show_footer false.

Layout: section `e373aab3-e609-457b-87a2-921ffffd05ed` (background #F6F8F7FF, padding 20px, inner max 1280px) > container `eff48f0c-7d31-4b12-9fd0-8494da65c6e6` > columns `f7b1ed43-98ae-4422-b122-62e959b82bdf` (33fr 67fr; on mobile, column 2 first).

Column 1, container `6284381f-6f91-48ab-9ae1-17ad58a1d487` (solid 1px border, padding 10px):
1. H3 "Learning: Byte-Size Series" (IBM Plex Sans 700, 28px, mobile 24px, #2F8F8B bound to theme token `primary_color`)
2. Post feed `a9f9afa0-adc7-4844-bc2a-8d18308d0563`: categories articles, deep_dive, byte_size; count 4; offset 0; 1 column; gap 10px (mobile 9px); divider solid, colour bound to theme token `border_color`
3. Divider `d8866c8f-309c-4838-a3a6-01fb3260d779` (1px #E6ECEB, padding 12px 0)
4. H3 "Most Recent Signals" (same style, no token)
5. Post feed `5cc96306-8d02-4128-8079-2337c82f55ce`: category signal_drop; count 6; offset 1; 1 column; gap 10px; divider solid, colour bound to `border_color`
6. Button `9ef22b8b-7125-4509-8ce5-9780f8b727c6` "Read All" to `https://www.masteringobservability.com/archive` (IBM Plex Sans 14px, #2F8F8B background, white text, radius 0, arrow-up-right icon), inside container `995e9012-7785-4e5e-9a8b-ad51d4525e1d`

Column 2, container `87d9c4ed-7491-4656-9c6b-c4c50a743b33` (solid 1px border, gap 16px, centred):
1. H1 "Latest Articles" (IBM Plex Sans 700, 32px, #2F8F8B via `primary_color`, centred)
2. Post feed `0e938f43-aa6b-4c4e-b937-3c047e8262e5`: category blog; count 4; offset 0; 2 columns; gap 0px (mobile 16px); divider style none; no token binding
3. H1 "The Pod" (same style)
4. Podcast RSS feed `1272d953-4e56-414b-86cf-1faf5f915271` "Podcast Feed": `https://anchor.fm/s/10c269c08/podcast/rss`, latest 3, 3 columns, image radius 8px, title IBM Plex Sans 18px 700 #1F2A2E
5. Signup form `03b93cd1-e57b-4601-b036-f46e40fdc14a`: theme `7008ee13-1cff-4e2e-b5c7-109e166efc9d`, button "SUBSCRIBE" / "SUBSCRIBING...", IBM Plex Sans 14px, #2F8F8B background, white text, radius 0, input border #2F8F8B, placeholder "Enter email", width 400px, horizontal, terms of service on
6. Empty container `bc81c2ab-8b84-48ee-a553-432f1cf44987`, then columns `3673ec05-0fa3-4aac-af02-481fbbe830c6` (50/50) holding two empty containers, `2d3e492b-832e-4520-a6e7-93e6b1f4d0c4` and `13b95859-94dd-4a06-95ac-4a8033b0bd3d`

Post feed styling, identical on all three published feeds:

| Setting | Attribute | Live value |
|---|---|---|
| Title font, weight, size, colour, transform | `data-title-*` | IBM Plex Sans, 700, text-lg, #1F2A2EFF, normal-case |
| Subtitle font, size, colour | `data-subtitle-*` | IBM Plex Sans, text-sm, #1F2A2EFF |
| Author font, size, colour | `data-author-*` | IBM Plex Sans, text-xs, #1F2A2EFF (capitalize, images off) |
| Timestamp colour | `data-timestamp-text-color` | #1F2A2EFF (short_date) |
| Tags enabled, font, text, background, radius | `data-tag*` | true, IBM Plex Sans, #2F8F8BFF, #FFFFFFFF, 9999px |
| Card background, padding | `data-background`, `data-card-padding` | #F6F8F7FF, 0px |
| Divider colour, thickness | `data-divider-*` | #E6ECEBFF, 1px (style per feed, above) |
| Image enabled, radius, width | `data-image-*` | true, 0px, 100% |
| Card structure, read time | | Image Top, off |
| Load more background, border, radius, text colour, text | `data-paginate-button-*` | #2F8F8BFF, 1px solid #2F8F8BFF, 8px, #FFFFFFFF, "Load more" |
| Search input enabled, background, border, radius, text, placeholder | `data-input-*` | true, #F6F8F7FF, 1px solid #E6ECEBFF, 8px, #1F2A2EFF, #E6ECEBFF "Search" |
| Empty state background, text colour, text | `data-empty-state-*` | #F6F8F7FF, #1F2A2EFF, "No posts found" |
| Premium badge | `data-premium-*` | #2F8F8BFF background, white text |

### 2.2 Nav bar, as served on 2026-09-10

| Setting | Live value |
|---|---|
| Links | "Mastering Observability" logo text `/`, Home `/`, Advisory `/advisory`, Podcast `/metrics-and-mayhem/podcast`, The Book `/metrics-and-mayhem/book`, Tags `/tags` |
| Also present | search icon and account icon (left), Sign Up and Login (right) |
| Bar | background #F6F8F7FF, bottom border 1px solid #E6ECEBFF, padding 16px; outer nav background #ffffff |
| Logo text | IBM Plex Sans 700, 36px (mobile 27px), #1F2A2EFF |
| Link text | IBM Plex Sans 500, 16px (mobile 19.2px), #1F2A2EFF, padding 12px, radius 8px |
| Button | none |

### 2.3 Theme variables, as served on 2026-09-10

| Variable | Live value |
|---|---|
| `--wt-primary-color` | #2F8F8BFF |
| `--wt-text-on-primary-color` | #FFFFFFFF |
| `--wt-secondary-color` | #88d4f2 |
| `--wt-tertiary-color` | #65bfaf |
| `--wt-background-color` | #F6F8F7FF |
| `--wt-text-on-background-color` | #1F2A2EFF |
| `--wt-border-radius` | 6px |
| `--wt-header-font`, `--wt-body-font`, `--wt-button-font` | empty |

The theme is not being changed in this pass.

### 2.4 Advisory, page `b9ce0cab-6190-4823-a104-8f9c0effbdf1` (page `updated_at` 2026-09-09T07:31:28Z)

Published embed `06708471-3957-4085-a1c2-01fe3c74c06b` holds the OLD block: Space Grotesk and Inter, teal #5fd0c0, truncated in the footer at `<a href="https://amzn.eu/d/0cAuR2`, with the pitch line "Start with a fixed-fee Health Check, or book a call." A second embed, `2e0f2e5f-94d9-4cdd-8b94-5eb566acc635`, is empty in both versions. Metadata: meta_title "Observability Advisory: Maturity Assessments & Strategy"; show_navbar true; show_footer false. The old block is itself broken, so a revert restores a truncated block; it is recorded for completeness, not as a fallback.

### 2.5 Draft feed `fb1b3e9f`, before any change in this session

As 2.1's styling table, except: category blog, count 2, 2 columns, gap 24px, divider style none, search on.

Read on 2026-09-11 from the builder's own document (the TipTap node at position 3), which names the fields exactly: `postGroupType` latest, `postsAudience` free, `postsCategory` `["blog"]`, `postsCount` 2, `imageEnabled` true, `authorsEnabled` true, `inputEnabled` true, `titleFontFamily` IBM Plex Sans, `titleTextColor` #1F2A2EFF, `subtitleFontFamily` IBM Plex Sans, `tagFontFamily` IBM Plex Sans, `tagTextColor` #2F8F8BFF, `tagBackgroundColor` #FFFFFFFF, `tagBorderRadius` 9999px, `tagTransform` capitalize, `tagBadgeEnabled` false, `timestampsTextColor` #1F2A2EFF, `cardPadding` 0px, `borderStyle` none, `borderRadius` 8px, `gap` 24px, `mobileGap` 16px. The card layout (`cardStructure`), verbatim:

```
{"node":"div","children":[{"node":"image","children":[],"className":""},{"node":"div","children":[{"node":"tags","children":[],"className":""},{"node":"div","children":[{"node":"title","children":[],"className":""},{"node":"subtitle","children":[],"className":""},{"node":"premium","children":[],"className":""},{"node":"authors","children":[],"className":"text-xs"},{"node":"timestamp","children":[],"className":""}],"className":"flex flex-col gap-1"}],"className":"flex flex-col gap-2"}],"className":"flex flex-col gap-3 w-full w-full"}
```

Any colour the old theme had locked to a theme token was released for the fields changed in 3.3, so the explicit colours take effect.

### 2.6 Builder safety net

beehiiv's Version History, in the builder's top bar, restores earlier versions of the whole site or of a single page.

---

## 3. Changes, per Al's rulings on 2026-09-10

Al ruled four points in this session: build the feed as the prototype's text cards; make the nav bar exactly the prototype's; use the prototype's button colour (deep teal #17695C, white text) on the page, including the pasted blocks; and have the feed show the latest six across all writing.

### 3.1 Buttons in blocks 1 to 3. Applied to the draft 2026-09-11, verified by a fresh reload of the builder (all three embeds carry the new rule; the old rule appears nowhere on the page)

| Rule | Old (rollback) | New |
|---|---|---|
| `.mm-home .btn` | teal #2F9E8D, navy #0D2127 text, 16px, padding 15px 30px, border 0 | deep teal #17695C, white text, .94rem, padding 11px 20px, 1px transparent border; hover mixes 84% deep teal with the ground |
| `.mm-home .btn-ghost` | 1px solid #C9DCDC, padding 14px 29px, no hover | #C9DCDC on the shared 1px border; hover border rgba(47,158,141,.38) and background rgba(47,158,141,.10) |

This departs from `Brand_Design_System_v2.md` (teal #2F9E8D, navy text). Raised for the brand owner in the handoff; the brand doc is not edited here.

### 3.2 Section width in blocks 1 to 3. Applied to the draft 2026-09-11, verified by a fresh reload of the builder

Block 1 set `.mm-home .wrap` to 1140px and blocks 2 and 3 to 1040px. All three share the class, so the stylesheet that loads last (block 2) won across the whole page and block 1 rendered at 1040px. All three now carry the prototype's 1120px with 16px to 28px side padding, an identical rule in every block.

### 3.3 Post feed `fb1b3e9f-9c7a-464d-bb74-c14ac9e1fe90`, to the prototype's text cards. Applied to the draft 2026-09-11, verified by a fresh reload of the builder

This supersedes the image-card spec in `Pages/home/post_feed_settings.md`.

| Setting | Old (draft, 2.5) | New (prototype) |
|---|---|---|
| Content | latest, tag blog, count 2 | latest, tags blog, the-signal, byte_size, deep_dive, deep-dive or articles, count 6 |
| Image | on, radius 0px | off |
| Author | on, IBM Plex Sans text-xs #1F2A2E | off |
| Meta row | tags above the title, timestamp below it | tag, then date, on one line above the title |
| Tag | IBM Plex Sans, #2F8F8B text, #FFFFFF background, 9999px radius | Space Mono, uppercase, #17695C text, transparent, 1px rgba(47,158,141,.38) border, 2px radius |
| Timestamp | #1F2A2E | Space Mono, uppercase, #63797D |
| Title | IBM Plex Sans 700 text-lg #1F2A2E | Montserrat 700, about 19px, #16282D |
| Subtitle | IBM Plex Sans text-sm #1F2A2E | DM Sans, about 15px, #3B5257 |
| Card | #F6F8F7, padding 0 | #F6F8F7, padding 26px 26px 28px, gap 11px, white on hover where the builder allows |
| Grid | 2 columns, gap 24px, divider style none | 2 columns separated by 1px #DCE7E5 hairlines |
| Search and Load more | search on; Load more #2F8F8B | search off; no Load more (the prototype has a "Read the archive" button below, 3.4) |

Known limit: the prototype's first card spans both columns. The native block cannot do that, so all six cards are the same size.

**As applied.** Set directly on the builder's node rather than through the card panel: the fields in the table above, `readTimeEnabled` false, hover colours equal to the base colours, and a new `cardStructure` that puts tag and date on one line above the title, then title, then summary. Two further gaps against the prototype remain, because the native block has no setting for them: the tag shows as a pale tint chip (#EAF6F3, 2px radius) rather than an outlined one, and the date uses the site's default font rather than Space Mono. A small CSS addition in block 3 could close these and the lead-card gap; not done without Al's say-so.

**Fonts need a check in the builder panel before Publish.** The builder's document holds Montserrat, DM Sans and Space Mono on the feed, and the canvas renders the first two, but on 2026-09-11 the connector's `get_page` draft read the three font fields back empty (they had read "IBM Plex Sans" before). They were set directly on the node rather than through beehiiv's font picker, which may be what registers a font for the live render. Re-pick the three fonts in the feed's panel, then re-read.

**Second pass, 2026-09-11, after Al saw the thumbnail still showing.** The settings above did not change the canvas, because the feed's cards are drawn from beehiiv's card-editor document (`structureTiptapStateDraft` and `structureTiptapState` on the block), which overrides the block-level flags. That document was rebuilt to the prototype and verified by a fresh reload of the builder:
- **Removed:** the image (thumbnail) and the author line.
- **Meta row first:** tag, date, a middle dot and read time on one line. The tag is an outlined chip (1px #2F9E8D61 border, 2px radius, 2px 7px padding, transparent fill). All four are Space Mono 11px uppercase; the tag is #17695C and the rest #63797D. The read-time suffix is "min" (it was "min read").
- **Title:** Montserrat 700, 19px, #16282D, line height 122%. **Summary:** DM Sans 15px, #3B5257, line height 160%.
- **Card:** padding 26px 26px 28px, gap 11px, ground #F6F8F7, left-aligned.
- **Count 5, not 6:** one full-width lead card plus two rows of two, exactly as the prototype shows. With 6 the last card would sit alone.
- **Block 3 carries page-wide rules for the feed:** 1px #DCE7E5 hairlines between the cards, the first card full width with a 24px to 32px title, white on hover, and the feed aligned to the 1120px column. They hang off beehiiv's stable hooks (`post-root-element`, `grid`, `embla__slide` and the card layout's `data-json-path`), so if beehiiv renames them the feed falls back to its own styling.

This supersedes the "two further gaps" and the font concern above: the fonts now live in the card layout's own text styles, which is where beehiiv's card editor keeps them. Rollback for the card layout, as read before the change: Post Card (column, #C9DCDC background, 8px radius) > Header (tag chip on #F6F8F799 with a 24px radius, then the image at 300 x 200 with a 4px #E6ECEB border) > Content > Details (paid tag, date, dot, "min read" read time, all IBM Plex Sans 12px) > Titles (Montserrat 24px #0D2127 title, DM Sans 16px #3B5257 subtitle) > Authors (DM Sans 14px #63797D). beehiiv's Version History also holds it.

### 3.4 Feed heading and archive button. Folded into blocks 3 and 2; applied to the draft 2026-09-11, verified by a fresh reload of the builder

Rather than inserting two new embeds, the heading ("Recent writing" eyebrow and the H2 "The thinking, in public") now closes block 3, which sits directly above the feed, and the "Read the archive" ghost button to `/archive` now opens block 2, directly below it. Same look, two fewer blocks, no new block ids. The added styles use class names the blocks did not already use (`sh-*`, `sf-*`). The standalone drafts `Pages/home/home_feed_heading.html` and `home_feed_footer.html` are kept for reference only and are not on the page.

### 3.5 Nav bar, site-wide. Applied to the draft 2026-09-11, verified by a fresh reload of the navbar editor

| | Old (rollback, 2.2) | New (prototype) |
|---|---|---|
| Layout | two rows: search and account icons, centred 36px title, Sign Up and Login, links row beneath | one row, max width 1120px, min height 64px |
| Logo | text "Mastering Observability", IBM Plex Sans 700 36px | ring mark (`Pages/home/mo_ring_mark_104.png`, from `mo_ring_mark.svg`) beside a two-line "MASTERING / OBSERVABILITY" lockup: Montserrat 800, about 13px, uppercase, 0.06em tracking, second line #63797D at 600 |
| Links | Home, Advisory, Podcast, The Book, Tags | Writing `/archive`, Podcast `/metrics-and-mayhem/podcast`, Book `/metrics-and-mayhem/book`, Advisory `/advisory`; DM Sans about 14px #3B5257, hover #16282D |
| Button | none | Subscribe to `/subscribe`: #17695C, white DM Sans 700, padding 8px 15px, radius 4px |
| Removed | | Home, Tags, search icon, account icon, Sign Up, Login |
| Bar | #F6F8F7, bottom border #E6ECEB | #F6F8F7, bottom border #DCE7E5 |

The prototype's "Funnel view" toggle and its "PROTOTYPE" strip are review tools and are not carried over.

**As applied.** The global navbar was rebuilt through its own editor document, the same pattern as the page:
- One row (`rows` 1), background #F6F8F7, no drop shadow, content width 1120px, padding 12px 28px, gap 22px, a 1px #DCE7E5 line underneath. **Sticky, with a blurred background**, as the prototype's top bar.
- **Left:** a `logo` item showing the ring mark (media library asset `e654294e-ebf3-4507-a811-0cf6b0cf22fd`, a 52 x 52 PNG shown at 26px), then a separate link item, "MASTERING / OBSERVABILITY" on two lines, Montserrat 800, 13px, 0.8px tracking, #16282D; both link home. The name is its own item because beehiiv syncs the logo item's text between the desktop and mobile navbars.
- **Right:** Writing `/archive`, Podcast `/metrics-and-mayhem/podcast`, Book `/metrics-and-mayhem/book` and Advisory `/advisory`, in DM Sans 14.4px #3B5257 with #16282D on hover; then **Subscribe** as a `button` item in #17695C with white DM Sans 700 13.8px text, a 4px radius, 8px 15px padding and #3B8075 on hover. It keeps beehiiv's own Sign Up Modal action and the old Sign Up item's visibility (logged-out visitors).
- **Removed:** the search icon, the profile menu (Manage Profile, Logout), Login, Home, Tags and the whole second row.
- **One deviation from the prototype:** the prototype's second line, "OBSERVABILITY", is grey; beehiiv's nav text cannot carry its own colour, so both lines are ink.

**Phones.** beehiiv keeps a separate mobile navbar document, and it had been left half-synced: the old profile menu, search, Tags and Login sat in a hamburger, and Book was missing. It was rebuilt on 2026-09-11 and verified by a fresh reload in the mobile view: the ring mark and "MASTERING / OBSERVABILITY" on the left; on the right a visible Subscribe button and a hamburger holding Writing, Podcast, Book and Advisory; the same background, hairline and sticky blur as desktop. **Deliberate deviation:** the prototype hides its links at 980px and below and has no hamburger. Because this nav is global, dropping the links would leave phone visitors on post pages and `/advisory` with no navigation, so the hamburger stays. Removing it is a one-step change if Al prefers the prototype exactly.

The nav is global: once published it replaces the nav on every page, not only Home. Rollback: section 2.2, and beehiiv's site-wide Version History holds the previous navbar.

---

## 4. Open rulings for Al

1. **Free chapter link.** Block 3's "Get the free chapter" button (embed `deb9370d-0f5c-4a08-9ab7-2082f2503b85`) points at `/products/metrics-mayhem-chapter-4`. `00_Command_Center/Free_Chapter_Path_Canonical.md` requires every CTA to point at `/metrics-and-mayhem/free-chapter`, and says the product is never promoted directly in copy.
2. **Subscriber count.** "561" appears in block 1 (proof strip) and block 2 (closing line). `34_SATELLITE_HARVEST_2026-09-06.md` Q2 recommended no count on a public page; no ruling is recorded. The strip's other numbers also drift: "103 issues" goes out of date when The Signal 104 goes out (dated Fri 11 Sep), "147 pieces" read 148 on 2026-09-07, and "36.2%" matches no figure in the weekly reports (38.98% four-week on 2026-09-07).
3. **Client names.** Block 1 names Standard Chartered, TAMM and Lloyds (`34_` Q4, not yet ruled).
4. **Vendor statistic.** The 47% to 82% recovery figure in block 2 and on `/advisory` is Logz.io's Observability Pulse (`01_Book/Archive/metrics_mayhem_revised.md`). Codex §5 (no vendor numbers) and §7.4 allow a vendor statistic only when sourced and dated; it is dated, not sourced.
5. **Inline signup form.** The draft removes form `03b93cd1-e57b-4601-b036-f46e40fdc14a`, so every "Get The Signal" on Home goes to `/subscribe`. The prototype's hero has an email box at that point.
6. **Small markup fix.** Block 1's H1 is `Own the signal.<span>Rent the platform.</span>`, so its text reads "signal.Rent" to search engines and screen readers. A space before `<span>` fixes it with no visual change.
7. **Other hero differences from the prototype**, not changed without a ruling: the prototype's H1 is larger (up to about 74px, against 52px), its eyebrows are grey without the leading rule, and its proof strip reads "Leaders subscribed".
8. **Advisory buttons.** `/advisory` still uses teal #2F9E8D with navy text. For one consistent site it would move to deep teal as well.

---

## 5. Verify, SOP step 4, after Al publishes

- `get_page` published, Home: embeds and feed in the draft order; the feed carries the section 3.3 values.
- `get_page` published, advisory: embed `06708471-3957-4085-a1c2-01fe3c74c06b` ends with its closing `</div>` and contains no "Health Check".
- Live fetch: Home has exactly one H1 and six text cards; `/advisory` shows all five footer links; the new nav appears on Home, `/advisory` and a post page.
- Allow for lag: on 2026-09-11 `get_page` draft was unchanged seconds after a save the builder had confirmed, and current a few minutes later (`updated_at` 2026-09-11T04:42:39Z). Re-read after a pause, or reload the builder.

## 6. Not done, and why

- **Nothing published.** Al holds Publish.
- **Copy rulings in section 4 not actioned.** They are Al's.
- **Nav bar (3.5) applied to the draft on 2026-09-11** and verified by reload; not yet published. Once published it changes the nav on every page.
- **Feed fonts:** now set in the card layout itself; see 3.3, second pass.
- **`/advisory` (pack 32 P3) still unpublished.** Its repaired block sits complete in the draft, and beehiiv can publish that page on its own.
