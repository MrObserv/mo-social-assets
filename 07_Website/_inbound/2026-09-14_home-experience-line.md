# Home experience list gains its starting point, 2026-09-14 (ninth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. This is a new file for work done after `2026-09-11_seven-cards-live.md`. It adds to that file and corrects nothing in it.

**Scope taken:** Al, in session:
- add his 25+ years of IT operations and SRE, running global follow-the-sun teams, to the Home experience list;
- put the twelve years before the global tier-1 bank at the top.

**Read:**
- `Pages/home/home_block1_hero_credibility.html` and the Home draft in the builder;
- the live Home page and beehiiv's draft preview.

**Produced:**
- `07_Website/Pages/home/home_block1_hero_credibility.html`: updated.
- `07_Website/08_SEO_Improvement_Plan/42_HOME_EXPERIENCE_LINE_CHANGE_RECORD_2026-09-14.md`: new.
- `07_Website/08_SEO_Improvement_Plan/41_POST_TAG_AUTHOR_BRAND_ALIGNMENT_CHANGE_RECORD_2026-09-11.md`: new, from the eighth pass on 2026-09-11. It is an interim record, because the theme is not yet saved.
- `07_Website/_inbound/2026-09-14_home-experience-line.md`: this file.

**Applied, draft:** a new first card in the Home experience list, "A global investment bank". It carries the twelve years, the 25+ years and the last five years as a practitioner. No bank is named.

**Verified:**
- builder reload, and SHA-256 against the G: file (`bb2ffa3b…9181`);
- beehiiv's draft preview at 1440px and 375px.

**Live:** unchanged until Al publishes Home. The publish will also carry the card fix from 2026-09-11 in the second Home block, which is in the draft and not yet live.

**The eighth pass, 2026-09-11, for the record:**
- **Approved:** Al approved changing beehiiv's site theme (fonts and colours) to fix the post, tag and author pages.
- **Done:** the old theme values and the post template's rollback were captured (`41_`), and the new values were entered.
- **Not saved:** the Chrome window holding the builder was minimised and the page froze, so the save did not go through. Nothing changed live.
- **Found:** the theme cannot finish the job alone. The post header, Keep Reading, comments and the tag and author pages all have IBM Plex Sans and the old colours fixed on them.

**Proposals needing a change request:** none new. Proposals 13 to 18 in the earlier files still stand.

**Questions, all Al's:**
- Publish Home?
- Should the paragraph beside the list also say "25+ years"?
- Finish the theme save now? It needs the builder window visible.

**Not done, and why:**
- **Publish.** It's Al's.
- **The theme and the post-page styling.** Waiting for a visible builder window and Al's go-ahead to resume.

**Lessons:**
- **Three blocks share one class.** Home has three Custom HTML blocks with the `.mm-home` class, so identify a block by text unique to it.
- **A minimised window freezes the builder.** A minimised Chrome window freezes the builder page, and the Chrome tools cannot restore it.
- **Diff before publishing.** Comparing the draft preview with the live page before a publish shows everything the publish will carry.

## Follow-up, same session: spacing

**Scope taken:** Al, in session: "table seem too long now, maybe review the spacing".

**Applied, draft:** the experience list's CSS was tightened, and the copy is unchanged.
- **Cause:** the card text was an inline span, so its lines took the section's taller line box.
- **Fix:** the card text now uses its own 21px lines, with less title spacing and card padding, and the list is slightly wider.

**Measured in the draft preview:**
- **Desktop:** the list went from 535px to 396px, now almost level with the 380px bio beside it.
- **Phone:** from 664px to 527px, with no sideways scroll.

**Verified:** builder reload, and SHA-256 against the G: file (`853c01d1…14af`).

**Record:** `42_` section 4.

## Follow-up, same session: the bio

**Scope taken:** Al, in session: "published, yes make the bio say 25+ years".

**Applied, draft:** the bio paragraph now opens "25+ years", in place of "Twenty-five years".

**Verified:** builder reload, and SHA-256 against the G: file (`f1e23ed6…0f2f`).

**Publish state:** when checked at 18:09 UTC, the publish had not reached the site.
- beehiiv's published Home and the live page are still the version from before today.
- The draft carries all of today's changes.
- Home needs publishing again.

**Record:** `42_` section 5.

## Ops_Log lines

Appended by this session directly to `00_Command_Center/Ops_Log.md` "Job runs" on 2026-09-14, the lines beginning:
- `| 2026-09-11 | website-build-satellite eighth pass (Al present) |`
- `| 2026-09-14 | website-build-satellite ninth pass (Al present) |`
- `| 2026-09-14 | website-build-satellite ninth pass follow-up (Al present) |`
- `| 2026-09-14 | website-build-satellite ninth pass second follow-up (Al present) |`
