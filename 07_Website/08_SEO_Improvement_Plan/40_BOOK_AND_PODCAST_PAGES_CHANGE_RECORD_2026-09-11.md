# Book and Podcast pages on the new brand, and the share cards: change record, 2026-09-11 (sixth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. Continues `39_SHARE_CARDS_REVIEW_AND_PLAN_2026-09-11.md`.

**Trigger.** Al, in session: "yes put it on home and build the other seven the ensure the book and the podcast page are all in line with the brand".

## 1. Home share card: live, approved

- **Uploaded** `Pages/brand/og_cards/og_home_1200x630.png` through Home's page settings in the builder, into both the X image field and the Open Graph image field, at about 14:13 UTC. beehiiv hosts it as `landscape_og_home_1200x630.png`.
- **Verified:** `get_page` shows both `x_image_url` and `facebook_image_url` set to it, and the live Home page's `og:image` is the new card.
- **Rollback:** clear both fields; they were blank before.

## 2. The other seven page cards: approved and live

- **Where:** `Pages/brand/og_cards/`, as `og_<page>.html` plus `og_<page>_1200x630.png`, for Subscribe, Archive, Advisory, Podcast, Book, Free chapter and Metrics & Mayhem.
- **Template:** the same as Home's (see `39_`).
- **Graphic:** Book, Free chapter and Metrics & Mayhem carry the book cover, the image the site already uses; Advisory carries the signal line.
- **QA:** all pass the design system's 300px test.
- **Set on 2026-09-11, 14:31 to 14:35 UTC,** after Al approved them ("approve the seven cards and set them"). Each was uploaded through its page's settings into both the X and the Open Graph image fields, as for Home. beehiiv hosts each as `landscape_og_<page>_1200x630.png`.
- **Rollback, the previous share images:**
  - Subscribe and Archive: none of their own; they fell back to the Advisory card.
  - Podcast: X `landscape_metrics_mayhem_1200x630.png`, Open Graph none (it fell back to the Advisory card).
  - Advisory: `landscape_advisory_og_card_1200x630.png` in both.
  - Book: `landscape_polish-this-1200x630-px-image_LTcpbJ6XTF29PP6j-yNm5Q__25I4LicSyy-FILVBhUErQ_2k.png` in both.
  - Free chapter: `landscape_free_chapter_og.png` in both.
  - Metrics & Mayhem: X `landscape_og_metrics_mayhem_landing_1200x630.png`, Open Graph `landscape_x_metrics_mayhem_landing_1200x630.png`.
- **Verified:** each page's `get_page` record, and the live `og:image` and `twitter:image` tags on all eight pages.
- **Fallback share image.** The publication's `default_thumbnail_url` is `featured_website.png`, yet pages without their own image showed the Advisory card, so that field is not what supplies the fallback. Once all eight cards are set, no key page depends on a fallback.

## 3. Book page `/metrics-and-mayhem/book` (draft)

**Review of the live page:**
- **Old theme:** charcoal #1F2A2E bands, IBM Plex Sans, the theme's #2F8F8B buttons, a centred layout. It has 11 sections and 8 Custom HTML blocks, 6 of which keep their code in the older `html` field.
- **Placeholder testimonials, live.** "What leaders say" shows "Testimonials from senior technical leaders (placeholder quotes)", attributed to "[Name], CTO, [Financial Services Company]" and two more like it, with em dashes.
- **Two author sections that disagree.** One says banking and government. The other adds large software organisations and says the podcast "interviews CTOs"; the podcast page says "Not interviews. Not news."
- **Buy links point to four places:**
  - `amzn.eu/d/09OJjYce` (the hero's Buy Now);
  - an Amazon search results page;
  - the bare `amazon.com`;
  - and elsewhere on the site, `amzn.eu/d/0cAuR2K1`.
- **Two LinkedIn addresses:** `/in/allanmann1/` and `/in/allanmann/`.
- **The FAQ's regulated-industries answer** promises "a dedicated chapter on observability in highly regulated environments". None of the 11 chapters listed is that chapter.
- **Smaller issues:**
  - an emoji link row;
  - "Get Chapter 4 for Free" goes to the product URL, not the canonical free chapter page.

**Changes, in the draft:**
- **The whole page is now one fragment block,** `Pages/book/book_page.html`, in the Home style. In order:
  - hero with the cover;
  - "The gap that no dashboard shows";
  - six take-aways;
  - who it is and is not for;
  - the three-move framework;
  - eleven chapters, with Chapter 4 highlighted and linked;
  - author;
  - FAQ, as eight open-and-close questions;
  - closing call to action.
- **Copy is kept, except:**
  - the placeholder testimonials are removed;
  - one author section, on the site's current wording ("five tier-1 banks and one UAE government");
  - the regulated-industries answer no longer promises a dedicated chapter;
  - every buy link goes to `amzn.eu/d/09OJjYce`, and every free chapter link to `/metrics-and-mayhem/free-chapter`;
  - LinkedIn is `/in/allanmann1/`;
  - "Buy Now" is now "Buy the book";
  - eyebrow labels are added.
- **Section:** padding 0 and the ground colour #F6F8F7. Full-viewport height stayed on, because beehiiv keeps it.
- **Rollback:**
  - the previous page document, saved as JSON in Al's Chrome (localStorage `mo_book_rollback_2026-09-11` on app.beehiiv.com);
  - the builder's version history;
  - the live page, until publish.
- **Verified:**
  - after a builder reload, the stored code matches the file (SHA-256 `34ccd28c…dd2dd`, 23,423 characters);
  - beehiiv's draft preview at 1440px and at 375px;
  - no sideways scrolling on phones.

## 4. Podcast page `/metrics-and-mayhem/podcast` (draft)

**Review of the live page:**
- **Old header:** the header block used IBM Plex Sans and outlined pill buttons.
- **Stray headings:**
  - a centred "Recorded and hosted by Allan Mann." set as a heading;
  - "Latest For Tech Tuesday" and "Signal Clips" in the theme font;
  - an empty paragraph.
- **Feeds:** IBM Plex Sans titles, with square episode art letterboxed in 16:9 frames.
- **Section:** set to full-viewport height, which leaves blank bands on tall screens.

**Changes, in the draft:**
- **New header** (`Pages/podcast/podcast_header.html`), in the Home style:
  - listen buttons: Spotify as the main one, then Apple, Amazon Music and YouTube;
  - a "What is a Signal Drop?" panel, carrying the recorded-by line and a "Get The Signal" link, which replaces the old "Subscribe to Newsletter" button;
  - a heading above the episodes, "The latest Signal Drops".
- **Headings tidied:** the recorded-by heading and the empty paragraph are removed. "Latest For Tech Tuesday" and "Signal Clips" become Home-style section headings, "Tech Tuesday" and "Signal clips".
- **Feeds restyled in their own settings:**
  - Montserrat titles, DM Sans subtitles, ink and soft colours;
  - white cards with #C9DCDC borders and 6px corners, and 4px image corners;
  - the episode feed shows square art (1:1, cover).
- **Art stays dark on purpose.** Episode art and YouTube thumbnails are mode B under the design system: they sit inside dark podcast and video apps.
- **Section:** the ground colour, top padding 0. Full-viewport height stayed on.
- **Rollback:**
  - the previous page document, as JSON in Al's Chrome (localStorage `mo_podcast_rollback_2026-09-11`);
  - version history;
  - the live page, until publish.
- **Verified:**
  - after a builder reload, the header matches the file (SHA-256 `07b114f0…8cba`, 7,090 characters);
  - the three feeds read back with the new styles;
  - beehiiv's draft preview at 375px and 1440px.

## 5. Open rulings, all Al's

1. **Done.** Al published the Book and Podcast pages and approved the seven cards on 2026-09-11. The live pages carry the new designs.
2. **Placeholder testimonials: gone.** Since Al published, the live Book page has no "[Name]" and no "placeholder quotes" (checked on the live page).
3. **Canonical Amazon link.** The Book page uses `amzn.eu/d/09OJjYce`; Subscribe and Advisory use `amzn.eu/d/0cAuR2K1`.
4. **Canonical LinkedIn address:** `/in/allanmann1/` or `/in/allanmann/`.
5. **The regulated-industries chapter.** If the book does have a dedicated chapter, restore that line in the FAQ.
