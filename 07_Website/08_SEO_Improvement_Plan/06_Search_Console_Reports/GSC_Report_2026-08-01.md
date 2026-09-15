# Google Search Console Snapshot — 2026-08-01

**Property:** https://www.masteringobservability.com/ (URL-prefix)
**Window:** last 3 months (2026-04-30 to 2026-07-29, GSC default)
**Captured:** 2026-08-01 via Claude in Chrome (signed in as allan@masteringobservability.com)

## Site totals
| Metric | Value | Last logged (07-06) | Baseline (02_..BASELINE) | Move vs last logged |
|---|---|---|---|---|
| Total clicks | 47 | 51 | 49 | -4 |
| Total impressions | 6,210 (6.21k) | 8,930 | 9,880 | -2,720 |
| Average CTR | 0.8% | 0.6% | 0.5% | +0.2 pt |
| Average position | 25.4 | 20.6 | 19.5 | -4.8 (worse) |
| Queries | 246 | 257 | 261 | -11 |
| Pages (with impressions) | 153 | 117 | 108 | +36 |

## Top queries by impressions
| Query | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| opentelemetry collector | 0 | 192 | 0% | 71.8 |
| hybrid cloud operations | 0 | 187 | 0% | 51.0 |
| signal drop | 0 | 140 | 0% | 5.8 |
| observability cost | 0 | 110 | 0% | 28.3 |
| observability strategy | 0 | 95 | 0% | 44.9 |
| observability vs monitoring | 0 | 95 | 0% | 46.8 |
| what is grafana alloy | 0 | 83 | 0% | 10.4 |
| observability news | 0 | 83 | 0% | 48.3 |
| grafana alloy | 1 | 61 | 1.6% | 25.1 |
| sunny mattu | 1 | 39 | 2.6% | 6.9 |

Queries on or near page one (position <= ~10):
- signal drop — 5.8 (was 6.2)
- sunny mattu — 6.9 (was 7.3)
- what is grafana alloy — **10.4 (slipped off page one; was ~9.5)** — watch, this had held page-one range for several consecutive runs.

## Top pages by clicks (clicks / impressions / CTR / avg position)
- / (home) — 14 / 117 / 12% / 5.6
- /authors/allan-mann — 9 / 36 / 25% / 4.1
- /metrics-and-mayhem/podcast — 7 / 108 / 6.5% / 5.3
- /authors/{uuid} — 4 / 27 / 14.8% / 5.0
- /p/what-is-grafana-alloy — 3 / 665 / 0.5% / 12.9
- /p/sunny-mattu-capgemini — 2 / 69 / 2.9% / 6.6
- /t/observability — 2 / 64 / 3.1% / 17.7
- /p/building-a-comprehensive-cost-effective-observability-strategy — 1 / 925 / 0.1% / 15.1
- /p/the-observability-cost-conundrum — 1 / 562 / 0.2% / 15.7
- /p/leveraging-open-source-for-cost-efficient-observability — 1 / 204 / 0.5% / 24.7

## Money pages (commercial intent)
- **Free-chapter** (`/metrics-and-mayhem/free-chapter`): **0 clicks, 0 impressions.** Does not appear anywhere in the full 153-page impression list. Unchanged — fourth straight zero read.
- **Advisory** (`/advisory`): **0 clicks, 5 impressions, 0% CTR, position 7.2.** First organic search presence in four straight reads (was 0/0 on 07-06, 06-30, and the prior baseline window). Small movement, but new.

## Movers vs last read / baseline
- Clicks eased 51→47 (-4), now -2 vs baseline (49).
- Impressions dropped 8,930→6,210 (-2,720), now -3,670 vs baseline. Largest single-run impression drop logged so far — worth watching next run to see if it's a rolling-window artefact (older strong weeks aging out of the 3-month window) or a genuine regression.
- Average position worsened 20.6→25.4 (-4.8), now -5.9 vs baseline (19.5). Continues the drift flagged in the 07-06 report.
- CTR improved to 0.8% (best in the log), consistent with fewer-but-more-relevant impressions.
- "what is grafana alloy" slipped from page-one range (~9.5) to 10.4 — the first of the four near-page-one queries to move backward rather than hold flat.
- Free-chapter remains fully invisible to organic search (4th straight zero read). Advisory picked up its first-ever 5 impressions this run — still negligible, but the first non-zero reading logged for either money page since tracking started.
