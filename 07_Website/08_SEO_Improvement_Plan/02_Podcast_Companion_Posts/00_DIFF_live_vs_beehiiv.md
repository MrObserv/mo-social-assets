# Step 2.1 — Live episodes vs beehiiv companions (diff)

**Run:** 2026-06-15 · Source: podcast feed mirrored at masteringobservability.com/podcast (anchor.fm/Spotify), reconciled against the 94 live beehiiv `/p/` posts.

## What I compared

- **Live Signal Drop audio episodes** (public feed): the `/podcast/` pages, which beehiiv auto-generates from the Spotify/anchor feed. Each already has an indexable web page.
- **Newsletter companions**: beehiiv `/p/` posts titled "Metrics & Mayhem | Signal Drop: ..." There are **12**.

## Live Signal Drop catalogue (13 episodes, Dec 2025 to Jun 2026)

| # | Episode | Date | Newsletter `/p/` companion? |
|---|---|---|---|
| 1 | Did Your Team Actually Hear You? | 2025-12-23 | Yes |
| 2 | **Context, Intent, Headline** | 2026-01-06 | **No — MISSING** |
| 3 | Control Beats Perfection | 2026-01-13 | Yes |
| 4 | The Last Person in the Queue | 2026-01-15 | Yes |
| 5 | Your Team Mirrors You | 2026-02-02 | Yes |
| 6 | Curate Who You Listen To | 2026-02-08 | Yes |
| 7 | Accountability Is the Job | 2026-02-12 | Yes |
| 8 | Your Role Changes Every Hour | 2026-02-18 | Yes |
| 9 | The Line You Won't Cross | 2026-05-15 | Yes |
| 10 | Progress Isn't Linear | 2026-05-22 | Yes |
| 11 | Position Before the Page | 2026-05-29 | Yes |
| 12 | The Alert That Just Says "We Need To Talk" | 2026-06-05 | Yes |
| 13 | The Cave You Won't Instrument | 2026-06-12 | Yes |

Note the Mar to Apr 2026 hiatus (no episodes between Feb 18 and May 15). That gap is real, not missing data.

## Deep Dives (Season 2)

| Episode | Date | Web page? |
|---|---|---|
| Deep Dive: The Midnight Pager Is Dying | 2026-02-26 | Yes — blog post "The Midnight Pager Is Dying. What Replaces It Is Harder." |
| SecOps Is Buying Observability (deep dive) | live | Yes — blog post "SecOps Is Buying Observability. That Won't Merge Your Teams." |

Both deep dives already have a web companion, just not "Signal Drop"-titled. Not missing.

## In the pipeline (will self-resolve)

Per the content calendar, these have beehiiv sends already scheduled, so they become `/p/` posts automatically:

- Ep 20 "Anger Is Just Fear in a Hi-Vis Vest" — platform launch ~Jun 19, beehiiv send Jun 22.
- Ep 21 "You're Going To Have To Suffer Today" — record Jun 24, launch ~Jun 26.

## Conclusion

**Only one live episode is missing a beehiiv companion: "Context, Intent, Headline" (Jan 6, 2026).** Draft is in `context-intent-headline.md`, paste-ready.

The plan's "12 of 17, ~5 missing" estimate (2026-06-09) looks high. The verifiable live catalogue is 13 Signal Drops plus 2 deep dives, and 12 of the 13 are already mirrored. Reaching "17" depends on the two pipeline episodes plus future releases, not on a back-catalogue of 5 missing pages.

**One caveat:** Spotify and Apple list pages are JavaScript-rendered and could not be fully scraped, so I could not 100% rule out any episode published *before* Dec 23, 2025. The `/podcast/` hub shows Dec 23 as the oldest, which suggests that is episode 1. If you know of any pre-Dec-2025 episodes, name them and I will draft those companions too.

**Numbering:** I report by title and date, not internal "pod number." Your local episode folders (15 to 21) use an internal scheme that does not match chronological position (e.g. "Your Role Changes Every Hour" aired 8th but was foldered 18 and later archived/renumbered), so internal numbers are not safe to diff against the public feed.
