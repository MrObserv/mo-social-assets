# Google Search Console Snapshot — 2026-06-30

**Property:** https://www.masteringobservability.com/ (URL-prefix)
**Window:** last 3 months (2026-03-29 to 2026-06-28, GSC default)
**Captured:** 2026-06-30 via Claude in Chrome (Browser 2, signed in as allan@masteringobservability.com)

## Site totals
| Metric | Value | Baseline (02_..BASELINE) | Move |
|---|---|---|---|
| Total clicks | 45 | 49 | -4 |
| Total impressions | 9,380 (9.38k) | 9,880 | -500 |
| Average CTR | 0.5% | 0.5% | flat |
| Average position | 19.9 | 19.5 | +0.4 (slightly worse) |
| Queries | 261 | 261 | flat |
| Pages (with impressions) | 114 | n/a | n/a |

Note: baseline window was 2026-03-20 to 06-19; this is 2026-03-29 to 06-28. The two windows overlap but are not identical, so the small click/impression dips are partly the rolling window dropping the earliest days, not a real decline.

## Top queries (by impressions) with position
- grafana alloy — pos 20.1
- what is grafana alloy — pos 9.6
- sunny mattu — pos 7.4
- hybrid cloud operations — pos 50.0
- observability strategy — pos 44.5
- signal drop — pos 6.3
- opentelemetry collector — pos 72.5
- what is grafana alloy? — pos 8.9
- mainframe observability — pos 33.4
- shift left observability — pos 24.2

Queries on or near page one (position <= ~10):
- signal drop — 6.3 (page one)
- sunny mattu — 7.4 (page one)
- what is grafana alloy? — 8.9 (page one, bottom)
- what is grafana alloy — 9.6 (page one, bottom)

## Top pages by impressions (clicks / impressions / avg position)
- /p/building-a-comprehensive-cost-effective-observability-strategy — 1 / 2,186 / 12.8
- /p/what-is-grafana-alloy — 4 / 1,269 / 10.7
- /p/navigating-the-complexities-of-hybrid-cloud-operations-a-comprehensive-guide — 0 / 692 / 52.9
- /p/the-observability-cost-conundrum — 1 / 624 / 12.1
- /p/opentelemetry-collector-implementation-guide — 0 / 513 / 37.5
- /p/leveraging-open-source-for-cost-efficient-observability — 1 / 365 / 29.0
- /p/2024-observability-recap-trends-insights-future — 0 / 316 / 11.4

Top pages by clicks (clicks / impressions):
- / (home) — 15 / 151
- /p/what-is-grafana-alloy — 4 / 1,269
- /metrics-and-mayhem/podcast — 4 / 82
- /authors/allan-mann (+ author uuid page) — 4 / 18 (and 4 / 45)
- /t/newsletter — 3 / 198
- /t/observability — 3 / 75
- /p/sunny-mattu-capgemini — 2 / 75

## Money pages (commercial intent)
- **Free-chapter** (`/metrics-and-mayhem/free-chapter`): **0 clicks, 0 impressions**. Page does not appear in search for this window (not in the 114-page impression list; page filter confirms 0/0).
- **Advisory** (`/advisory`): **0 clicks, 0 impressions**. Same: zero search presence this window (page filter confirms 0/0).

## Movers vs baseline
- Totals essentially flat to slightly down, explained mostly by the rolling-window shift. CTR held at 0.5%, position held near 19.5-19.9.
- "what is grafana alloy" still hovering at the page-one boundary (9.6 / 8.9). CHG-006 strengthened that title; it has not broken decisively above the fold yet.
- The cost-strategy page is the single biggest impression sink: 2,186 impressions, 1 click, position 12.8. Still the top CTR-recovery opportunity (CHG-005 description + CHG-008 CTA are live but unmeasured in this window since they shipped 24 Jun).
- Two money pages remain at zero search presence. The advisory and free-chapter funnels are getting no organic search traffic at all; every advisory or free-chapter signup is coming from owned channels (newsletter, links, direct), not Google. If advisory is a revenue priority, these pages need indexable, query-targeted content. They currently rank for nothing.
