# Post, tag and author pages on the brand: change record, 2026-09-11 (eighth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. Continues `40_BOOK_AND_PODCAST_PAGES_CHANGE_RECORD_2026-09-11.md`.

**Trigger.** Al, in session, answering "Changing beehiiv's site-wide font and colour settings would fix posts, tags and author pages together. Shall I do that next?": "yes".

**Status:** in progress. This interim version is written first because beehiiv does not version themes: its help says "Theme changes aren't versioned". The old values are recorded here before the change lands.

## 1. The site theme

**Where:** Site settings, Themes, Primary Theme ("Untitled theme"), Edit. That opens the theme panel inside the builder.

| Setting | Before (rollback) | New |
|---|---|---|
| Background | #F6F8F7 | #F6F8F7, unchanged |
| Text on background | #1F2A2E | #16282D, ink |
| Primary | #2F8F8B | #17695C, teal-deep, the brand button colour |
| Text on primary | #FFFFFF | #FFFFFF, unchanged |
| Border | #E6ECEB | #DCE7E5, hairline |
| Header font | IBM Plex Sans | Montserrat |
| Body font | IBM Plex Sans | DM Sans |
| Button font | IBM Plex Sans | DM Sans |

**Also in the live CSS, not shown in the panel, unchanged:**
- secondary #88d4f2;
- tertiary #65bfaf;
- corner radius 6px;
- text on secondary and on tertiary #222222.

**Save dialog settings:** Existing theme; "Untitled theme"; "Apply theme sitewide" on. Sitewide is beehiiv's default, and its help says it pushes the theme to all pages.

**State at the time of writing:**
- the new values are entered in the theme panel, but not yet saved;
- the Chrome window holding the builder is minimised, and the builder page stops responding while hidden, so the dialog's Update has not gone through;
- the live site still shows the old theme.

**2026-09-14:** still not saved. The live site still carries the old theme (IBM Plex Sans, #2F8F8B), checked that day. Finishing it needs the builder window visible on screen, and Al's go-ahead to resume.

**What the theme reaches, and what it does not.** Only settings linked to the theme follow it. Much of the post, tag and author pages carries fixed values instead:
- **post header** (title, subtitle, breadcrumbs, byline, date, read time): fixed IBM Plex Sans and #1F2A2E in its layout document;
- **"Keep Reading"**: the heading and the recommended-post cards are fixed IBM Plex Sans;
- **comments block**: fixed #1F2A2E, #E6ECEB and #2F8F8B;
- **tag and author pages**: header blocks and post feeds are fixed IBM Plex Sans, with #1F2A2E text, #E6ECEB borders and #2F8F8B buttons.

These are edited block by block, in the sections that follow.

## 2. The byline ("ByAllan Mann")

**Cause.** beehiiv renders the byline word and the author link as two spans side by side, with no space between them.

**Fix.** Set the byline word to "By" followed by a non-breaking space, in the post header's byline paragraph.

## Rollback

- **Theme:** re-enter the "Before" column above, in the same panel.
- **Post template:**
  - the full document, saved as JSON in Al's Chrome (localStorage `mo_post_template_rollback_2026-09-11` on app.beehiiv.com, 134,081 characters);
  - the builder's version history.
