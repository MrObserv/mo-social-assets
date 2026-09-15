# Google Search Console Snapshot - 2026-08-31

**Property:** https://www.masteringobservability.com/ (URL-prefix, owner allan@masteringobservability.com).

## GSC UNAVAILABLE THIS RUN

GSC could not be read this run. Both browser paths failed:
- **Claude in Chrome:** not connected (extension not reachable this session).
- **Built-in browser:** blocked from `google.com` / `search.google.com` (navigation denied).

No Google sign-in screen was shown and none was attempted; no credentials were entered, per the spec's guardrail. This is a tooling-availability gap, not a data change.

## Last-known live read (carried from 2026-08-24, flagged stale)
Window 22 May to 21 Aug. Carried so downstream references do not read a blank:

| Metric | Value |
|---|---|
| Total clicks | 53 |
| Total impressions | ~5,900 |
| Average CTR | 0.9% |
| Average position | 27.6 |
| Distinct queries | 279 |

Baseline (02_SEARCH_CONSOLE_BASELINE.md, 20 Mar to 19 Jun): 49 clicks / 9,880 impr / 0.5% CTR / avg pos 19.5.

**Top pages by clicks (08-24, carried):** / 17/130, /authors/allan-mann 11/48, podcast 7/114, what-is-grafana-alloy 3/698, UUID author page 3/18. Author pages still 14 of 53 clicks (26%) with no CTA.

**Money pages (08-24, carried, stale):** /advisory 0 clicks / 23 impr / pos 10.1; /free-chapter 0 clicks / 4 impr / pos 29.8. Not refreshed this run.

## Movers vs baseline
Not computable this run (no live read). On the last live read, clicks were up modestly from the 49-click baseline while impressions had fallen from 9,880 to ~5,900 and average position drifted out from 19.5 to 27.6. Refresh required on the next run with a working, signed-in browser.

## Action
GSC read needs either the Claude in Chrome extension reconnected, or the built-in browser signed in to the Google account with GSC access. Until then this check runs blind on search data and can only report beehiiv on-site views for the money pages.
