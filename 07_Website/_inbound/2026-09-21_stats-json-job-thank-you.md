# Stats file and weekly job; Thank-you redesign draft, 2026-09-21 (eighteenth pass)

**Written by:** the website build satellite. The full record is `07_Growth/08_SEO_Improvement_Plan/50_STATS_FILE_JOB_AND_THANK_YOU_REDESIGN_2026-09-21.md`, on G: (private).

**Done:**
- **The stats file:** `07_Website/data/stats.json` holds the four home page figures, read from beehiiv: 562 subscribers, 40.7% open rate (last 4 weeks), 152 pieces and 105 Signal issues.
- **The weekly job:** the scheduled task `website-stats-refresh` (Mondays, 07:00) refreshes the file and pushes only that path. Its first run is waiting for Al to approve its tools.
- **Home figures:** block 1's four figures are updated to today's values in the Home draft, each with a `data-stat` attribute.
- **Thank-you redesign:** `Pages/thank-you/thank_you_page.html` is an on-brand light redesign with corrected copy. It waits for Al's approval and is not applied in beehiiv.

**Finding:** beehiiv does not run scripts in Custom HTML blocks, so the page cannot read `stats.json` itself.
- A script in block 1 made the block vanish from the draft preview.
- A script-only block did nothing.

Both test changes were removed.

**Open, Al's to decide:**
- How to keep the home figures current: refresh them when publishing, use figures that stay true, or not at all.
- Approve the Thank-you redesign.
- Publish Home, to show today's figures.