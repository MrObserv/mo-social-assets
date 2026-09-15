# Client names, nav fixes, teal line and a /subscribe rebuild in the beehiiv draft, 2026-09-11 (third pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. This is a new file for work done after Al published the first two passes at about 06:13 UTC. It adds to `2026-09-11_home-redesign-applied.md` and `2026-09-11_home-feed-and-nav.md` and corrects nothing in them.

**Scope taken:** Al's requests in session:
- remove client names ("five tier-1 banks and one UAE government");
- say whether the front-page figures can be dynamic;
- move the teal line up so it replaces the grey line under the menu;
- the ring mark for his other accounts;
- make the nav Subscribe button land on /subscribe;
- review /subscribe against the new design and brand.

**Read:**
- the live site after Al's publish (Home, /advisory and /subscribe), rendered locally and in the Browser pane;
- beehiiv's builder documents for those three pages and for both navbars;
- beehiiv's draft preview;
- beehiiv help: reserved fields and merge tags;
- subscribe form `ad0cdd4a`, read only;
- the prototype's lockup CSS.

By targeted search only:
- `34_LEAD_MAGNET_FORM_CHANGE_RECORD_2026-09-07.md`;
- Voice Codex v1.9.41 §5;
- `Shared_State_Contract.md` (Signal Drop).

**Produced:**
- `G:\My Drive\Metrics And Mayhem\07_Website\08_SEO_Improvement_Plan\36_SUBSCRIBE_REVIEW_AND_THIRD_PASS_CHANGE_RECORD_2026-09-11.md`: new. It holds the rollback, every change, the /subscribe review, the open rulings and the dynamic-numbers answer.
- `G:\My Drive\Metrics And Mayhem\07_Website\Pages\subscribe\subscribe_page.html`: new; the rebuilt /subscribe block.
- `G:\My Drive\Metrics And Mayhem\07_Website\Pages\subscribe\subscribe_page_live_2026-07-27.html`: new; the live code before the swap, its SHA-256 matched to the builder's stored code.
- `G:\My Drive\Metrics And Mayhem\07_Website\Pages\home\home_block1_hero_credibility.html`: edited for client names and the teal line on the nav.
- `G:\My Drive\Metrics And Mayhem\07_Website\Pages\advisory\advisory_page.html`: edited for client names and the teal line on the nav.
- `G:\My Drive\Metrics And Mayhem\07_Website\Pages\brand\ring_mark\`: new folder of 22 files: avatars, favicons, transparent marks, SVG masters and the two-line lockup on light and dark.
- `G:\My Drive\Metrics And Mayhem\07_Website\_inbound\2026-09-11_names-nav-subscribe.md`: this file.
- Outside the workspace: the Claude auto-memory note on this builder, updated with this pass's lessons.

**Changes applied to the beehiiv draft**, each confirmed by a fresh builder reload (details and rollback in `36_`):
- **Client names.** Home and /advisory now say "five tier-1 banks and one UAE government" and name no client. Nothing in `Pages/` names Standard Chartered, TAMM, Lloyds, NatWest, HSBC or Credit Suisse.
- **Nav fixes.** Al's 06:13 publish put two nav defects live:
  - a line break in nav text renders as two spans that run together, so the name read "MASTERINGOBSERVABILITY";
  - nav text never wraps, so on phones Subscribe and the menu button sat off screen and visitors could not reach the menu.

  Fixed in the draft:
  - desktop shows the name on one line;
  - phones show the ring mark only;
  - Subscribe now links to /subscribe instead of opening the sign-up modal.
- **Teal line.** It is now the nav's own bottom edge on Home and /advisory, drawn by a page-wide rule in each block. Home's section has no top padding.
- **/subscribe rebuilt:**
  - **What was wrong:** it was built as a full document inside a frame, so its copy was hidden from search engines and its links opened inside the frame. It used the old dark design, broke Voice Codex §5 (alerting vocabulary) and had a fallback link pointing at itself.
  - **What it is now:** an inline block on Home's web surface, with a slim brand bar standing in for the nav, which stays off.
  - **Copy:** kept, except the §5 fix and "Metrics & Mayhem".
  - **The form:** untouched.

**Live state checked:**
- beehiiv's draft preview, which uses the live renderer, at 375px and at desktop:
  - Home's phone nav fits (319 of 319px, against 440 in 319 live);
  - the teal line sits under the nav;
  - Home shows "five tier-1 banks";
  - /subscribe renders inline with its form.
- **Nothing is published.** The live phone nav stays broken until Al publishes.

**Proposals needing a change request,** numbered after the eight in the earlier files:
9. **[BRAND] The ring mark as Al's cross-account avatar, with the two-line lockup.** Record it in `Brand_Design_System_v2.md`. The files are in `Pages/brand/ring_mark/`.
10. **[BRAND] Subscribe form themes.** Form `ad0cdd4a` (/subscribe) and the lead-magnet form disagree with each other and with the web buttons (#17695C, white text). One decision covers both, together with proposal 1 (button colour). The connector's theme writes may go live directly (`34_`), so nothing was changed.
11. **Cadence and channel naming disagree across pages.** Home says one email every Friday and calls the podcast "Metrics & Mayhem". /subscribe says "most weeks", "the Signal Drop podcast" and "Tech Tuesday every other week".
12. **A pipeline for the front-page figures.** A weekly job would write a public `stats.json`, and block 1 would read it with today's figures as the fallback. It needs Al's go-ahead for a scheduled task and a public file. beehiiv offers no native option for web pages.

**Questions, all Al's:** listed in `36_` §6:
- publish;
- the form theme;
- cadence and naming;
- the teal line on archive, posts and tags;
- the lockup in the nav;
- one odd phrase on /subscribe;
- the dynamic figures.

The earlier rulings in `35_` §4 still stand, except client names, which are now answered.

**Not done, and why:**
- **Publish.** It's Al's.
- **The form's own theme.** Possible live write; it needs Al.
- **The teal line on archive, posts and tags.** No block reaches those pages, so it's a ruling.
- **The lockup in the nav.** The asset is ready; it needs a 360px test and Al's go-ahead.
- **Dynamic figures.** They need Al's go-ahead.
- **Reconciliation against `28_`, `29_` and `31_`.** Still not read.
- **/subscribe section height.** Its full-screen-height setting stayed on after being set off; this is harmless on normal screens.

**Lessons:**
- Nav text never wraps, and a line break in a nav item runs its words together on the live site. The builder canvas shows neither, so check navs in beehiiv's draft preview at 375px before Al publishes.
- The draft preview link from `get_page` renders the draft with the live renderer without a login.
- beehiiv puts a full-document Custom HTML block in a frame and hides it from crawlers; a fragment renders inline.
- `s5_lint.py` found 34 hits across the four files produced. All are the web sense of "page", except one deliberate quotation of the removed line in `36_`. Zero em dashes.

## Ops_Log line

Appended by this session directly to `00_Command_Center/Ops_Log.md` "Job runs" on 2026-09-11: the line beginning `| 2026-09-11 | website-build-satellite third pass (Al present) |`.
