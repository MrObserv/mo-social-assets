# Favicon and share cards back to the two-ring light mark, 2026-09-17 (fifteenth pass follow-up)

**Written by:** the website build satellite, a Claude Code session on Al's PC with the beehiiv and Google Drive connectors. This is a new file for work done after `2026-09-17_publish-check-home-feed.md`. It adds to that file and corrects nothing in it.

**Scope taken.** Al, in session, after opening the eight v2 share cards: "these all have the hard logo/favcon i wanted to revert to the previous light one".

**What "light" means.** Al's light mark is the two-ring mark: two pale rings around a deep teal centre. The small variant, with one heavy ring, is the one he calls "hard". This morning's favicon upload used the small variant, because the pack rebuild of 2026-09-16 had replaced the old light profile image under the same file name.

**Read:**
- the old light profile image in `ring_mark/_before_2026-09-16/`;
- the original publication logo on beehiiv;
- the v1 and v2 card sources and renders.

**Applied:**
- **Favicon (live):** the publication logo is back to the original `mo_ring_mark_104.png`, set through `save_publication_settings`.
- **Share cards v3 (not uploaded):** all eight sources now have the footer mark the cards carried before 2026-09-16, at 34px, with the v2 colours kept. The renders are `og_<page>_1200x630_v3.png`, and the v2 sources and renders are in `og_cards/_before_2026-09-17/`.
- **Records:**
  - `45_` section 7;
  - this file;
  - the Ops_Log line.

**Verified:**
- **Favicon:** the settings read back `mo_ring_mark_104.png`, and the live icon link is `thumb_mo_ring_mark_104.png`, checked by eye.
- **Cards:**
  - all eight rendered at 1200 × 630 and synced to Drive;
  - eight sources carry the two-ring mark and none the one-ring mark;
  - Home and Book were checked by eye.

**Questions, all Al's:**
- Approve the eight v3 share cards for upload?
- Revert the other places that still use the one-ring mark?
  - the menu logo, live;
  - the Subscribe header, in draft;
  - the rebuilt profile picture pack.
- The token file's crossover rule says to use the small variant below 40px, and the favicon note says the favicon is owed from small_on_dark. Both now differ from Al's decision and need a Growth change request.

**Lessons:**
- **Before rebuilding brand images under the same names, ask which look is the preferred one.** A file name can then point at a different design than the person remembers. Here "the light profile ring mark" meant the old image, not its rebuild.
- **Check a script's anchor text in every file before a batch edit.** The card sources did not share a header layout. The script skipped the seven files without the anchor before writing anything, so nothing was half-edited.

## Ops_Log line

Appended by this session directly to `00_Command_Center/Ops_Log.md` "Job runs" on 2026-09-17: the line beginning `| 2026-09-17 | website-build-satellite fifteenth pass follow-up (Al present) |`.
