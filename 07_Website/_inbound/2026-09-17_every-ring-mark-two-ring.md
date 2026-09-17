# Every ring mark back to the two-ring light mark, 2026-09-17 (sixteenth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome, the in-app Browser pane and the beehiiv connector. This is a new file for work done after `2026-09-17_two-ring-mark-revert.md`. It adds to that file and corrects nothing in it.

**Scope taken.** Al, in session, as five steps:
- **Favicon:** upload the original `mo_ring_mark_avatar_light_800.png` as the publication logo, then check the live icon.
- **Menu logo:** put back its image from before `44_`. Change only the logo; Al publishes.
- **Subscribe header mark:** back to the light mark.
- **Share cards:** the new colours with the original 34px light footer mark, shown to him before any upload.
- **Records:** correct the memory and `45_`. "Light" means the two-ring mark, never the small bold one, overriding the token file's below-40px rule, for Al to route.

Every image was checked by eye before use.

**Read:**
- `ring_mark/_before_2026-09-16/` and the repo copy of the ring mark folder (byte-identical originals);
- `44_`, `mo_navbar_rollback_desktop_2026-09-16b` and the repo's 2026-09-15 `subscribe_page.html`;
- the card sources and their before copies.

**Applied:**
- **Favicon (live):** the original light profile image, uploaded as `mo_ring_mark_avatar_light_800_two_ring.png`. That is a byte-identical copy under a new name, so it cannot collide with the bold file of the old name.
- **Menu logo (draft):** the navbar logo `src` is back to asset `e654294e-…/upload_3a8adbceab20cc26.png`. Only the logo changed.
- **Subscribe header (draft):**
  - `Pages/subscribe/subscribe_page.html` has the two-ring SVG again (SHA-256 `54adaf29…` before, `66602083…` after);
  - the builder code matches the file;
  - a before copy is in `Pages/subscribe/_before_2026-09-17/`.
- **Share cards:** the v3 renders from the fifteenth pass follow-up already match the brief, and all eight were checked by eye and shown to Al. Not uploaded.
- **Records:**
  - `45_` sections 3, 5 and 6 corrected, and section 8 added;
  - a note in `44_` section 2;
  - this file;
  - the Ops_Log line;
  - the `favicon-light-decision` memory.

**Verified:**
- **Favicon:** the settings read back the new file, and the live icon link is `thumb_mo_ring_mark_avatar_light_800_two_ring.png`, checked by eye.
- **Menu logo:** desktop and phone navbar documents after reload, and the draft preview of Home, checked by eye. The live site keeps the small mark until Al publishes.
- **Subscribe header:** the builder code after reload (`66602083…`), and the draft preview of /subscribe, checked by eye, with no one-ring mark left.
- **Cards:** each footer mark matches its pre-2026-09-16 card, with no retired colours.

**Questions, all Al's:**
- Approve the eight v3 share cards for upload.
- Publish the menu, to put the logo live. The Subscribe page publishes with its other drafts.
- Route the token file change: the below-40px rule and the favicon note.
- Should the pack files in `Pages/brand/ring_mark/`, which still hold the bold rebuilds under the original names, be restored from the originals?

**Lessons:**
- **beehiiv re-encodes logo uploads and keeps the file name in the address.** Compare the stored image by eye, not by hash. Upload a changed image under a new name, so an old address cannot serve a cached copy.
- **The Subscribe page has no global menu.** Its MASTERING OBSERVABILITY header and mark sit in its own Custom HTML block.
- **The Browser pane's zoom does not crop.** Enlarge a small mark with a CSS transform on the document (translate and scale from the element's position), then take a screenshot.

## Ops_Log line

Appended by this session directly to `00_Command_Center/Ops_Log.md` "Job runs" on 2026-09-17: the line beginning `| 2026-09-17 | website-build-satellite sixteenth pass (Al present) |`.
