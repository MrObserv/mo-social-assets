# Favicon switched to the light ring mark, 2026-09-17 (fourteenth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. This is a new file for work done after `2026-09-16_menu-spacing-cards-pack.md`. It adds to that file and corrects nothing in it.

**Scope taken:** Al, in session: "upload the light profile riing mark". The request came straight after he was asked to keep the dark favicon or switch to a light one.

**Applied, live, approved by Al:**
- **What:** the publication logo, which beehiiv also uses as the favicon and app icon, is now `Pages/brand/ring_mark/mo_ring_mark_avatar_light_800.png`: the small light ring mark on the light ground, 800 × 800.
- **How:** uploaded through Publication settings, General, "Publication logo".

**Verified:**
- `get_publication_settings` shows the new logo;
- the live icon link points to its 200px copy, checked by eye.

**Record:** `45_` section 5, which also holds the rollback address for the dark disc.

**Not done, and why:**
- **The corrupt test upload** (asset `7a382b8b-…`, made when the connector's inline upload cut the data short) was left in the media library. It is not used, and removing it is Al's to do.

**Questions, all Al's:**
- If the mark looks too small in a browser tab, should the favicon use a tighter light version?
- Still open from `45_`:
  - approve the eight v2 share cards;
  - publish the pages and the menu.

**Lessons:**
- **Inline image data.** Inline image data sent through `save_image` survived at about 4KB (the 104px mark) but was cut short at about 20KB, and the stored image was corrupt. Upload anything larger through the Chrome file input, and check the stored copy's size against the file.

## Ops_Log line

Appended by this session directly to `00_Command_Center/Ops_Log.md` "Job runs" on 2026-09-17: the line beginning `| 2026-09-17 | website-build-satellite fourteenth pass (Al present) |`.
