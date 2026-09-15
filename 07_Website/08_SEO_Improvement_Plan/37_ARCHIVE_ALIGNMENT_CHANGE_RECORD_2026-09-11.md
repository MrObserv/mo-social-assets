# /archive aligned to the new direction: change record, 2026-09-11 (fourth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. Continues `36_SUBSCRIBE_REVIEW_AND_THIRD_PASS_CHANGE_RECORD_2026-09-11.md`. Everything below is in the beehiiv DRAFT. This session published nothing.

**Trigger.** Al, in session: "https://www.masteringobservability.com/archive i dont like this page, the thumbnails and the brand is not right review it and align to the new direction".

## 1. Review of the live /archive

The page was built from beehiiv's defaults and last changed on 2026-06-30.
- **Header:** "Archive" in IBM Plex Sans 500 at 48px, with beehiiv's stock line "All of our previous posts" underneath.
- **Cards:**
  - three columns;
  - a large thumbnail on the dark asset surface (the navy and mint OG cards), with tag pills floating over it: the first tag plus a "+7" overflow chip;
  - an author avatar and name on every card;
  - IBM Plex Sans titles and #1F2A2E text;
  - white cards with 8px corners.

  The thumbnails dominate the page, and a light site full of dark tiles reads as a different brand.
- **Search box:** the placeholder and icon are #E6ECEB on a pale ground, so they are barely visible. Square corners.
- **Load more:** #2F8F8B, which is beehiiv's theme teal, neither the brand's #2F9E8D nor the web's #17695C. Square corners.
- **Nav line:** grey hairline. The teal rule from the earlier passes only reached Home, /advisory and /subscribe.
- **Page title and description:** "The Observability Digest Archive", described as "every issue of the Observability Digest ... monthly observability signals". That describes one series, not the whole archive, and predates The Signal.
- **Where the styling comes from:** mostly the block's own settings. Some colours are linked to beehiiv's site theme (IBM Plex Sans, primary #2F8F8B, text #1F2A2E, borders #E6ECEB). The same theme styles post, tag and author pages; see section 4.

## 2. Rollback

- **Archive block `de6f159d`.** Its full previous settings are kept as JSON in Al's Chrome, under the localStorage key `mo_archive_rollback_2026-09-11` on app.beehiiv.com. The published page stays the live rollback until Al publishes.
  - **Settings changed, old value to new:**
    - layout: gap 24px to 0px; mobile gap 16px to 0px; columns 3 to 2; corner radius 8px to 0px; card padding 0px to 26px;
    - card border: colour #E6ECEBFF to #DCE7E5FF; style none to solid;
    - thumbnails on to off; authors on to off;
    - tag: text #2F8F8BFF to #17695CFF; capitalise to uppercase; badge off to on; background #FFFFFFFF to #EAF6F3FF; radius 9999px to 2px; font IBM Plex Sans to Space Mono;
    - title: text and hover #1F2A2EFF to #16282DFF; font IBM Plex Sans to Montserrat;
    - summary: text and hover #1F2A2EFF to #3B5257FF; font IBM Plex Sans to DM Sans;
    - timestamps #1F2A2EFF to #63797DFF; empty-state text #1F2A2EFF to #3B5257FF;
    - the card layout (`cardStructure`, `structureTiptapState`, `structureTiptapStateDraft`) replaced by the Home feed's text-only card.
  - **Theme links removed:** `tokens` went from the four theme-linked colours (search border, focus and background, Load more hover) to `{"color":"disabled"}`.
  - **Search:** max width 1280px to 1064px; max height 58px to 52px; border #E6ECEBFF to #C9DCDCFF; radius 0 to 4px; background #F6F8F7FF to #FFFFFFFF; text #1F2A2EFF to #16282DFF; placeholder and icon #E6ECEBFF to #63797DFF; focus #2F8F8BFF to #17695CFF.
  - **Load more:** background and border #2F8F8BFF to #17695CFF; hover #2F8F8BFF to #2D7A6EFF; text, hover text and icon to #FFFFFFFF; radius 0 to 4px; top margin 24px to 28px.
  - **Unchanged on purpose:** archive mode, 9 per page, all posts and all categories, search on, and the "Load more" wording.
- **Heading and paragraph** (container `d0399689`, "Archive" and "All of our previous posts") are replaced by Custom HTML block `b3f5f4d7`, which holds `Pages/archive/archive_header.html`.
- **Section `18c405ca`:**
  - padding changed from 40px 40px 40px 40px to 0px 20px 40px 20px;
  - full-viewport height stayed on, because beehiiv keeps it, as on /subscribe.
- **Home block 3 `deb9370d`:** six lines of CSS were added (section 3.5). The previous version is live and in Google Drive's version history.

## 3. Changes applied to the draft, each verified by a fresh builder reload

**3.1 Header.**
- **Wording:** eyebrow "The archive"; H1 "Everything, in public."; sub "Every piece, newest first: The Signal, the Observability Digest, deep dives and byte-size explainers."
- **Style:** Home's section-head style. "In public" echoes Home's "The thinking, in public".

**3.2 List.**
- **Cards:** the Home feed's text-only card: tag, date and read time on one line in Space Mono; Montserrat title; DM Sans summary.
- **Layout:** two columns in a hairline grid, with a full-width lead card, white hover and a 1064px column, as on Home.
- **Search:** kept and restyled.
- **Load more:** now deep teal.

**3.3 Thumbnails.**
- **In the list:** gone, following Al's earlier ruling for Home (prototype text-only cards).
- **Everywhere else:** they stay as each post's social and link-preview image, on the dark asset surface.
- **Post pages:** the draft post page does not show the thumbnail at the top.
- **Full rebrand:** not done. Rebranding the thumbnails themselves would touch 11 generators and the back catalogue, and is [BRAND] proposal 7 in the second-pass handoff.

**3.4 Teal nav line.** Now on /archive too.

**3.5 Card alignment, fixed on Home as well.**
- **The fault:** beehiiv centred the tag, date and read-time line even though the card layout says left. This has been live on Home since the first publish.
- **The fix:** in both blocks, new rules put that line on the left and stop titles being cut off at two lines. The archive also hides the "+N" overflow chip, so each card shows one tag, as in the prototype.
- **A slip, caught and reversed:** the same one-tag rule briefly hid Home's only tag, because on Home the real tag sits second in its group, behind an invisible link. It was taken back out of Home and checked by reload. Home never shows a "+N" chip, so it doesn't need the rule.

**3.6 Verification.**
- **Fingerprints.** The stored code of both blocks, with line endings normalised, matches the G: files byte for byte:
  - archive header: SHA-256 `8cad246f…1f05`, 4,871 characters;
  - Home block 3: `f6b82d12…c6f4`, 12,401 characters, after the one-tag rule was taken back out.
- **beehiiv's draft preview:**
  - at 375px: the meta line starts on the left, one chip shows, titles are in full, there are no images in the grid, and no sideways scrolling;
  - at 1440px: two-column hairline grid, lead card full width, deep-teal Load more.

## 4. Open rulings, all Al's

1. **Publish /archive and Home.** Home is included because of the block 3 alignment fix.
2. **Page title and description.** Proposed:
   - title "The archive", which becomes "The archive | Mastering Observability";
   - description "Every issue of The Signal, the Observability Digest, deep dives and byte-size explainers from Allan Mann: observability strategy, incident leadership and AI operations, vendor-neutral."

   Not applied, because the connector's page-metadata edits may apply live.
3. **Tag names.** The chips show raw tag slugs: "newsletter", "observability-strategy", "aiops". Content tags are site-wide, so renaming them or choosing which tag leads each card is a content decision.
4. **Post pages come next.** They have the same theme problems:
   - IBM Plex Sans headings;
   - "ByAllan Mann" with no space;
   - share icons in #2F8F8B;
   - a stock breadcrumb.

   They would be fixed in the Post template, or through the site theme (item 5).
5. **Site theme.** Changing beehiiv's global fonts and colours to the brand would align post, tag, author and login pages in one place: IBM Plex Sans to DM Sans and Montserrat, primary #2F8F8B to #17695C, text #1F2A2E to #16282D, borders #E6ECEB to #DCE7E5. It is site-wide on publish. Proposed here; the settings were not opened.
6. **Phones.** The meta line wraps: tag and date, then read time on a second line. It reads fine. Shortening it would mean dropping the read time on phones.
