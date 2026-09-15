# Home share card live, seven page cards built, Book and Podcast pages rebuilt in the beehiiv draft, 2026-09-11 (sixth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. This is a new file for work done after `2026-09-11_share-metadata-and-first-card.md`. It adds to that file and corrects nothing in it.

**Scope taken:** Al, in session: "yes put it on home and build the other seven the ensure the book and the podcast page are all in line with the brand".

**Read:**
- the live Book and Podcast pages: desktop renders and saved page code;
- both pages' builder documents;
- Home's page settings panel in the builder;
- the publication settings (default thumbnail);
- the Claude Design card spec, as filed in `39_`.

**Produced:**
- `G:\My Drive\Metrics And Mayhem\07_Website\Pages\brand\og_cards\`: seven new cards, each as `og_<page>.html` plus `og_<page>_1200x630.png`, for subscribe, archive, advisory, podcast, book, free-chapter and metrics-and-mayhem.
- `G:\My Drive\Metrics And Mayhem\07_Website\Pages\book\book_page.html`: new; the rebuilt Book page.
- `G:\My Drive\Metrics And Mayhem\07_Website\Pages\podcast\podcast_header.html`: new; the Podcast page header.
- `G:\My Drive\Metrics And Mayhem\07_Website\08_SEO_Improvement_Plan\40_BOOK_AND_PODCAST_PAGES_CHANGE_RECORD_2026-09-11.md`: new.
- `G:\My Drive\Metrics And Mayhem\07_Website\08_SEO_Improvement_Plan\39_SHARE_CARDS_REVIEW_AND_PLAN_2026-09-11.md`: status updated.
- `G:\My Drive\Metrics And Mayhem\07_Website\_inbound\2026-09-11_book-podcast-and-cards.md`: this file.
- Outside the workspace:
  - the two pages' previous documents, kept as JSON rollbacks in Al's Chrome (localStorage `mo_book_rollback_2026-09-11` and `mo_podcast_rollback_2026-09-11` on app.beehiiv.com);
  - the Claude memory note, updated.

**Applied:**
- **Live, approved by Al:** the Home share card, set in both of Home's share image fields (X and Open Graph). Verified in `get_page` and in the live page's `og:image`.
- **Draft, Book:** the whole page is replaced by one Home-style block. The copy is kept, minus the placeholder testimonials and the contradictions (details in `40_` §3).
- **Draft, Podcast:**
  - a new header;
  - "Tech Tuesday" and "Signal clips" turned into Home-style section headings;
  - the three native feeds restyled in their own settings: brand fonts, colours and borders, and square episode art. The art stays dark, as the design system requires for podcast and video.
- **Verified:** both drafts by builder reload, by SHA-256 against the G: files (Book `34ccd28c…`, Podcast header `07b114f0…`), and in beehiiv's draft preview at 375px and 1440px.

**Live state:**
- Home's share image is live.
- The Book and Podcast pages are unchanged on the live site until Al publishes.
- **The live Book page still shows placeholder testimonials** ("[Name], CTO, [Financial Services Company]") until the rebuild is published.

**Proposals needing a change request,** numbered after the sixteen in the earlier files:
17. **[Content] Canonical links.** Two Amazon links are in use (`amzn.eu/d/09OJjYce` and `amzn.eu/d/0cAuR2K1`), and two LinkedIn addresses (`/in/allanmann1/` and `/in/allanmann/`). One of each should be canonical and used everywhere.
18. **[Content] Book FAQ.** Confirm whether the book has a dedicated chapter on regulated environments. The old FAQ promised one; the draft no longer does.

**Questions, all Al's:**
- Publish the Book and Podcast pages?
- Approve the seven cards?
- Which Amazon link and which LinkedIn address are canonical?
- Does the regulated-industries chapter exist?

**Not done, and why:**
- **The seven cards are not set on their pages.** They await Al's approval.
- **Publish.** It's Al's.
- **Post pages and the site theme.** Still a proposal (14, in the fourth-pass file).

**Lessons:**
- **Uploading a page's share image.** In the builder's Pages panel, open the page's "…" menu, then Settings, then the X and Open Graph image fields. These are file inputs that save automatically, and the result is live.
- **Where Custom HTML code lives.** Older blocks keep it in the `html` field; newer ones in `htmlOriginal`.
- **beehiiv's feed blocks** (`rss_feed`) carry their own font, colour and border settings, so they can be brought on brand without code.
- **Some builder pages mark themselves as changed when opened.** Wait for "Saved" before leaving, or the "Leave site?" prompt blocks navigation.

## Ops_Log line

Appended by this session directly to `00_Command_Center/Ops_Log.md` "Job runs" on 2026-09-11: the line beginning `| 2026-09-11 | website-build-satellite sixth pass (Al present) |`.
