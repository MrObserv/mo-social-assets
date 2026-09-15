# /archive aligned to the new direction in the beehiiv draft, 2026-09-11 (fourth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. This is a new file for work done after `2026-09-11_names-nav-subscribe.md`. It adds to that file and corrects nothing in it.

**Scope taken:** Al, in session: "i dont like this page [/archive], the thumbnails and the brand is not right review it and align to the new direction".

**Read:**
- the live /archive: desktop through headless Chrome, and phone width in the Browser pane;
- its builder document, including the archive block's settings;
- the Home feed block's settings, reused as the model;
- beehiiv's draft preview of /archive, Home and one post page (the last to scope the next pass);
- `get_page` metadata for /archive.

**Produced:**
- `G:\My Drive\Metrics And Mayhem\07_Website\08_SEO_Improvement_Plan\37_ARCHIVE_ALIGNMENT_CHANGE_RECORD_2026-09-11.md`: new. It holds the review, the rollback (every changed setting with old and new values), the changes, the verification and the open rulings.
- `G:\My Drive\Metrics And Mayhem\07_Website\Pages\archive\archive_header.html`: new; the archive heading plus the page-wide styling for the archive block.
- `G:\My Drive\Metrics And Mayhem\07_Website\Pages\home\home_block3_why_and_freechapter.html`: edited. The card meta line is now left-aligned and titles show in full.
- `G:\My Drive\Metrics And Mayhem\07_Website\_inbound\2026-09-11_archive-alignment.md`: this file.
- Outside the workspace:
  - the archive block's previous settings, kept as JSON in Al's Chrome (localStorage `mo_archive_rollback_2026-09-11` on app.beehiiv.com);
  - the Claude auto-memory note, updated.

**Changes applied to the beehiiv draft,** each confirmed by a fresh builder reload (details in `37_`):
- **Header.**
  - Removed: beehiiv's "Archive / All of our previous posts".
  - Now: Home's section-head style, reading "The archive" and "Everything, in public.", with one line saying what is in it.
- **Cards.**
  - The Home feed's text-only card: tag, date and read time, then a Montserrat title and DM Sans summary.
  - Laid out in a two-column hairline grid with a full-width lead card.
  - Search is kept and restyled; Load more is now deep teal.
  - The archive keeps its own mode, all posts, 9 per page, search and pagination.
- **Thumbnails.**
  - Gone from the list, following Al's Home ruling for text-only cards.
  - Still each post's social and link-preview image, on the dark asset surface.
- **Teal nav line:** now on /archive too.
- **Home fix, found on the way:**
  - The fault: beehiiv centres the card meta line even though the card layout says left, and this is live on Home now.
  - The fix: both blocks now put it on the left and show full titles.
  - A slip: the first version also hid Home's only tag. The draft preview caught it and it was reversed.

**Live state checked:**
- **Fingerprints.** SHA-256 of both blocks' stored code, with line endings normalised, matches the G: files: archive header `8cad246f…`, Home block 3 `f6b82d12…`.
- **Draft preview at 375px and 1440px:**
  - the archive shows no images, one tag per card, the meta line on the left, full titles, and no sideways scrolling on phones;
  - Home's feed has its tags back and its rows aligned.
- **Nothing is published.**

**Proposals needing a change request,** numbered after the twelve in the earlier files:
13. **[Content] Tag display names.** Raw slugs show on the cards on Home and the archive ("newsletter", "observability-strategy", "aiops", "byte_size"). Rename the tags, or choose which tag leads each card.
14. **[BRAND] beehiiv's site theme to the brand.** IBM Plex Sans to DM Sans and Montserrat, primary #2F8F8B to #17695C, text #1F2A2E to #16282D, borders #E6ECEB to #DCE7E5.
    - One change would align post, tag and author pages.
    - Post pages also show "ByAllan Mann" with no space, and share icons in #2F8F8B.
15. **/archive page title and description.** They still say "The Observability Digest Archive" and "monthly". Proposed text is in `37_` §4.

**Questions, all Al's:** listed in `37_` §4:
- publish (Home too, for the fix);
- the title and description;
- tag names;
- post pages next;
- the site theme;
- the meta line wrapping on phones.

**Not done, and why:**
- **Publish.** It's Al's.
- **Page metadata.** The connector's writes may go live, so it needs Al.
- **Post pages and the site theme.** Beyond this pass; proposed.
- **Tag names.** A content decision.

**Lessons:**
- A post block's look can be moved between pages by copying its settings. Keep the target's own post data, mode, audience, count, search and pagination.
- beehiiv's card markup differs by block type:
  - on Home, the real tag sits second in its group, behind an invisible link;
  - on the archive, the "+N" overflow chip sits second.

  A rule written for one page hid the other page's tag. Check any CSS aimed at card paths on every page that shows those cards.
- Editing a Custom HTML block's code through the editor document avoids the upload-and-paste cycle. Prove it matches the file with a SHA-256 of the stored code.

## Ops_Log line

Appended by this session directly to `00_Command_Center/Ops_Log.md` "Job runs" on 2026-09-11: the line beginning `| 2026-09-11 | website-build-satellite fourth pass (Al present) |`.
