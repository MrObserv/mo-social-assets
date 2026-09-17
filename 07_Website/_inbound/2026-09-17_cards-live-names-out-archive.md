# Share cards live, client names out of the repo, old logos archived, 2026-09-17 (seventeenth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC. This is a new file for work done after `2026-09-17_every-ring-mark-two-ring.md`. It adds to that file and corrects nothing in it.

**Al's decisions, in session:**
- the eight v3 share cards are approved;
- take client naming out of the design standards and the website folder in the GitHub repo;
- keep the repo public, since the names are out;
- bring GitHub up to date from G:;
- archive old logo and favicon material.

Al removed `08_SEO_Improvement_Plan` from the repo himself; it stays private on G:.

**Done:**
- **Share cards (live):** all eight uploaded to the X and Open Graph image fields in beehiiv, and the live tags were checked on every page.
- **Client names:** removed from 12 repo files (commit 42ec47f). No tracked file names a client now. The names remain in git history.
- **Archive:** `07_Website/_archive/2026-09-17_old_logos_and_favicons/` in the repo and on G:, each with a do-not-use README (commit 6e5c7be). The light two-ring originals stay in `Pages/brand/ring_mark/`.
- **Sync:** G: work since 2026-09-15 was copied into the repo, and Al committed it in 9c33c0f.

**Rule for every session:**
- The website folder lives in the public repo, except `08_SEO_Improvement_Plan`, which is on G: only.
- Never put a client name, or the SEO folder, into the repo.
- The mark is the light two-ring mark: never the small bold mark, the eye logo or the dark rings.

**Open, Al's to decide:**
- **The eye logo files in `06_Brand_Assets/`.** Three tools still load them: the thumbnail builder, the slide template and the visual kit.
- **The design system's small and dark marks.**
- **A "moved" note** in the G: website folder.
- **A `.gitignore` guard** for the SEO folder.

**Lessons:**
- **beehiiv share images:** the builder's page settings dialog (`?page_settings=open`) switches between pages in its left list, and uploads save straight to live. In a hidden window, the page's "…" menu opens with pointer events sent from page JS.
- **Before committing to a shared repo, check `git status` and the log again.** Al committed the same working tree mid-pass.