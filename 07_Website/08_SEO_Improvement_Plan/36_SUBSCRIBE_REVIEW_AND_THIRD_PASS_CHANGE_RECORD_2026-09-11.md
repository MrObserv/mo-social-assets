# /subscribe review, nav fixes and client names: change record, 2026-09-11 (third pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. Continues `35_HOME_AND_ADVISORY_CHANGE_RECORD_2026-09-10.md`, which covers the first two passes. Everything below is in the beehiiv DRAFT. This session published nothing.

**Trigger.** Al published the first two passes on 2026-09-11 (about 06:13 UTC) and then asked, in session, for four things:
1. **Client names:** take them off the site, in his words "worked with five tier one banks and one UAE government".
2. **Dynamic numbers:** can the front-page figures update themselves?
3. **Teal line:** push it up so it sits under the menu, replacing the thin grey line.
4. **Ring mark:** he likes it enough to use on LinkedIn and his other accounts.

Mid-session he added two more:

5. **Subscribe button:** the nav's Subscribe button does not land on /subscribe.
6. **/subscribe:** review the page against the new design and brand.

## 1. State found on the live site, after Al's publish

- **Desktop nav.** The name rendered as "MASTERINGOBSERVABILITY". beehiiv turns a line break in nav text into two spans inside a flex link, so the two words run together.
- **Phone nav.** The same run-together name was 201px wide, and nav text never wraps (`white-space: nowrap`). The row needed 440px in a 319px space, so Subscribe and the menu button sat off a 375px screen and phone visitors could not reach the menu.
- **Nav Subscribe.** It opened beehiiv's sign-up modal instead of going to /subscribe.
- **Client names.** Home and /advisory named three clients.
- **Teal line.** It sat about 40px below the nav, because the Home section had 40px of top padding.
- **/subscribe.** See section 4.

## 2. Rollback, captured before each change

| Item | Old value | Now |
|---|---|---|
| Desktop nav name item `205b54b6` | text "MASTERING", a hard break, "OBSERVABILITY" | one text run "MASTERING OBSERVABILITY" |
| Mobile nav name item `1b88eb75` | the same text, 12px, mobile only | deleted from the mobile navbar |
| Nav Subscribe `0ac46cf0`, shared by both navbars | onClick `action`, action `sign_up`, no href | onClick `link`, href `https://www.masteringobservability.com/subscribe`, action cleared |
| Home section `54185301` | padding `40px 20px 40px 20px` | `0px 20px 40px 20px` |
| Home block 1 `a8c280f7` | the published version: the Downloads original plus the `35_` §3 edits | `Pages/home/home_block1_hero_credibility.html` as now filed |
| /advisory block `06708471` | `C:\Users\alman\Downloads\advisory_page.html`, which matches the published block sentence for sentence (47 of 47) | `Pages/advisory/advisory_page.html` as now filed |
| /subscribe block `e8b6e875` | `Pages/subscribe/subscribe_page_live_2026-07-27.html`, whose SHA-256 was matched to the builder's stored code before the swap | `Pages/subscribe/subscribe_page.html` |
| /subscribe section `b5f77dd2` | padding `40px 20px 40px 20px`, background `#FFFFFF`, full-viewport height on | padding `0px 0px 0px 0px`, background `#F6F8F7`, full-viewport height still on (see section 5) |

Until Al publishes, the live site itself is the rollback for everything above. The earlier text of each `Pages/` file is also in Google Drive's version history.

## 3. Changes applied to the draft, each verified by a fresh builder reload

**3.1 Client names.**
- **Home block 1, bio:** now reads "across five tier-1 banks and one UAE government".
- **Home block 1, role cards:** retitled "A global tier-1 bank", "A UAE government platform" and "A tier-1 UK bank". Their descriptions are unchanged.
- **/advisory, credentials paragraph:** now opens "across five tier-1 banks and one UAE government" and refers to "a global bank", "a government platform" and "a UK bank's". No other copy changed on either page.
- **Check:** a search of every file in `Pages/` finds no client name.

**3.2 Teal line.**
- **Home:** block 1 no longer draws its own `.edge` line. Instead it carries one page-wide rule that turns the nav's bottom border into the same teal gradient at the same 55% strength. The rule targets `nav .navbar-list`, beehiiv's own class, and uses `border-image`. The line now sits on the nav and stays with it when the nav sticks. The Home section's top padding is 0, so the hero starts directly under the nav.
- **/advisory:** its block carries the same rule.
- **Other pages:** archive, posts and tags have no block to carry the rule, so they keep the grey hairline (open ruling 4).

**3.3 Nav.**
- **Desktop:** the name is one text run on one line.
- **Phones:** the name item is deleted, so phones show the ring mark, Subscribe and the menu button.
- **Subscribe:** shared by both navbars, it now links to /subscribe.
- **Measured** in beehiiv's draft preview at 375px: the phone nav row now fits exactly (319 of 319px).

**3.4 /subscribe.**
- **Block:** replaced with `Pages/subscribe/subscribe_page.html`; section 4 has the review and the design.
- **Section:** padding 0, background ground #F6F8F7.

## 4. /subscribe: review against the new design and brand

**Findings on the live page, last published 2026-07-27:**
1. **Built as a full HTML document,** so beehiiv renders it inside a frame (srcdoc).
   - Search engines can't read the copy: the page's crawlable text is only its title.
   - Every link opens inside the frame, so "Read a free chapter" loads the site inside a box on the page.
2. **Old visual system:**
   - navy panels on white;
   - #2F9E8D buttons with navy text;
   - ink #1a1a1a;
   - a 960px column;
   - centred cards with a thick teal top border.

   None of it matches the rebuilt Home.
3. **Site nav and footer are switched off** by a page setting, so the only brand on the page is an eyebrow. Visitors arriving from the new nav land on what reads as a different site.
4. **Voice Codex §5 breach:** "Engineers and SREs who carry the pager". There is also an em dash in the embedded document's `<title>`.
5. **Circular fallback:** "Form not showing? Subscribe here." links to /subscribe itself.
6. **Title styling:** "Metrics and Mayhem", where the site and the book use "Metrics & Mayhem".
7. **The signup form** (beehiiv form `ad0cdd4a`, embedded on no other live page) has its own theme:
   - a #2F9E8D button with navy text and square corners;
   - teal field borders and black labels;
   - a grey placeholder at roughly 2.5:1 contrast;
   - First name is a required field.

**What the new block does:**
- **Fragment, not a document.** beehiiv now renders it straight into the page (confirmed in the draft preview), so the copy is crawlable and links behave.
- **Home's web surface:** ground #F6F8F7, ink #16282D, deep teal #17695C buttons with white text, Montserrat, DM Sans and Space Mono, a 1120px column, and Home's own eyebrow, card and button styles.
- **Brand bar.** A slim bar with the ring mark and name, linking home, under the same teal gradient line. It stands in for the site nav, which stays off.
- **Hero:** copy on the left, the form in a white card on the right; one column on phones.
- **Cards:** "What lands in your inbox" as three numbered cards.
- **Book section:** on the tint band, with the cover image Home already uses and a deep teal "Read a free chapter" button to the canonical `/metrics-and-mayhem/free-chapter`.
- **Copy is kept verbatim**, except:
  - "carry the pager" is now "get the call" (Voice Codex §5);
  - "Metrics and Mayhem" is now "Metrics & Mayhem";
  - the eyebrow "Mastering Observability" is now "Vendor-neutral · Free", because the brand bar carries the name;
  - the fallback link now opens the form itself in a new tab;
  - new labels: "What you get", "The book" and the numbers 01 to 03;
  - "Unsubscribe in one click · No sharing, ever" is reused from Home's closing call to action.
- **The form is the same form, untouched.**

## 5. Verification

- **Builder changes:** each was confirmed by a fresh builder reload and a read-back of the stored document, with the values shown in section 2.
- **Stored code after the swaps:**
  - Home block 1: 14,730 characters. The rule and the tier-1 wording are present; no names, no `.edge` div.
  - /advisory: 18,257 characters. The rule and the tier-1 wording are present; no names; the fixed-fee offer is intact.
  - /subscribe: 13,988 characters, after a second swap that trimmed the form frame from 450px to 410px, balanced the headings and kept the footer links whole. `mm-sub`, "get the call" and the form are present; no "pager", no em dash.
  - The editor converts line endings to Windows style, so stored lengths exceed file lengths by the line count.
- **Draft preview** (beehiiv's own renderer, the private `draft_url` link from `get_page`), at 375px and desktop:
  - Home: the phone nav fits, and the teal line is under the nav.
  - /subscribe: it renders inline, with the form, cards, book section and footer.
- **/advisory length check.** Before the swap, the builder held 19,352 characters where the original with Windows line endings is 17,878. The published block matches the original sentence for sentence and in markup; the only difference is Cloudflare's email obfuscation. So nothing that was live was lost. The 1,474-character excess in the old draft is unexplained.
- **Full-viewport height.** This setting on the /subscribe section stayed on after being set off, because beehiiv kept its own value. Its effect is a minimum height of one screen, which only shows on screens taller than the page.
- **Housekeeping.** /advisory carries a second, empty Custom HTML block (`2e0f2e5f`) that renders nothing.
- **Live site:** unchanged by this session.

## 6. Open rulings, all Al's

1. **Publish** the nav (site-wide), Home, /advisory and /subscribe. Until then the live phone nav stays broken.
2. **The form's own theme.** Proposed: #17695C button with white text, weight 700 and 4px radius; #C9DCDC field borders with 4px radius; ink #16282D labels and input text; #63797D placeholder.
   - Not applied. `34_LEAD_MAGNET_FORM_CHANGE_RECORD_2026-09-07.md` records that this connector's form-theme writes reached live directly, despite the tool saying draft only.
   - It also ties to [BRAND] proposal 1 (button colour): the lead-magnet form follows the brand doc's #2F9E8D with navy text.
3. **Cadence and channel naming disagree between pages.**
   - Home says "One email a week", "every Friday since February 2024" and calls the podcast "Metrics & Mayhem".
   - /subscribe says "most weeks", "the Signal Drop podcast" and "Tech Tuesday every other week".
   - Which is right? Both pages should say the same.
4. **Teal line on the remaining pages.** Either accept the grey hairline on archive, posts and tags, or set the nav's own bottom line to a soft teal site-wide (one setting), keeping the gradient on Home, /advisory and /subscribe.
5. **Two-line lockup in the nav.** The prototype's stacked "MASTERING / OBSERVABILITY" with a grey second line is ready as an image (`Pages/brand/ring_mark/mo_lockup_light.png`).
   - It would replace the ring image and the text name on both navbars, and restore the name on phones.
   - It needs a test at 360px, because Subscribe and the menu button leave about 130px for it.
6. **"in your own words and at your own pace"** in the /subscribe book section reads oddly for a book. Left as written.
7. **Dynamic numbers:** section 7.
8. **Earlier rulings still stand.** From `35_` §4:
   - the free chapter link on Home;
   - the 561, 103, 147 and 36.2% figures;
   - the 47% to 82% statistic;
   - the missing inline signup;
   - the H1 space;
   - the hero differences.

   Client names are now answered.

## 7. Dynamic numbers: the answer, and a proposal

**The answer:**
- beehiiv has no live-count element for website pages. `{{active_subscriber_count}}` exists as a merge tag, but only in emails, posts and automations (beehiiv's article "Reserved beehiiv fields and merge tag examples", updated 2026-09-08). Nothing exposes open rate or post counts to a page.
- A page cannot fetch them itself without putting the API key in public HTML, which is ruled out.

**Proposal:**
- **The job:** once a week, a job reads the four figures through the beehiiv connector: subscribers and open rate from publication stats, and pieces published and Signal issues from post counts by tag.
- **The file:** it writes a small `stats.json` into the public `MrObserv/mo-social-assets` repo (confirmed public).
- **The page:** block 1 reads the file when the page loads and keeps today's figures as the fallback. No key ever touches the page.
- **Needs Al's go-ahead** for three things: a scheduled task, a public file, and a short script in block 1. The script should be tested on the draft first, because beehiiv frames full-document blocks and may treat blocks with scripts the same way.

**Alternatives:**
- Keep static figures and refresh them by hand monthly, with an "as of" date.
- Use rounded figures ("550+") that stay true for longer.
- `34_SATELLITE_HARVEST_2026-09-06.md` recommended showing no public subscriber count at all.

**Already stale:** "103 issues of The Signal" (issue 104 went out on 11 September). "147 pieces published" drifts with every post.

## 8. Ring mark pack for Al's accounts

All files are in `07_Website/Pages/brand/ring_mark/`.
- **Profile images** (circle-safe, mark at 60%):
  - `mo_ring_mark_avatar_light_{400,800,1024}.png` and `mo_ring_mark_avatar_dark_{400,800,1024}.png`;
  - "strong" 400px variants with firmer rings, which read better at feed sizes.
- **Favicon and app icons:** `mo_ring_mark_favicon_{32,180,192,512}.png`.
- **Transparent marks:** `mo_ring_mark_transparent_{light,dark}_{512,1024}.png`.
- **Masters:** SVGs for each surface (`mo_ring_mark_light.svg`, `mo_ring_mark_dark.svg`, and the two avatar SVGs).
- **Lockup:** `mo_lockup_light.png` and `mo_lockup_dark.png`, the two-line lockup at 4x, transparent.
- **Colours:** light surface #17695C with rgba(47,158,141,0.38) rings; dark surface #64FFDA with rgba(100,255,218,0.28) rings, matching the ratified asset surface.

[BRAND] proposal: adopt the ring mark as the cross-account avatar and record it in `Brand_Design_System_v2.md`. Today the mark exists only in the website nav.
