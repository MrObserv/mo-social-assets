# Google Search Console Snapshot — 2026-07-06

**Property:** https://www.masteringobservability.com/ (URL-prefix)
**Window:** last 3 months (2026-04-05 to 2026-07-04, GSC default)
**Captured:** 2026-07-06 via Claude in Chrome, running on the Edge browser connector (signed in as allan@masteringobservability.com)

## Site totals
| Metric | Value | Prior week (06-30) | Baseline (02_..BASELINE) | Move vs prior week |
|---|---|---|---|---|
| Total clicks | 51 | 45 | 49 | +6 |
| Total impressions | 8,930 (8.93k) | 9,380 | 9,880 | -450 |
| Average CTR | 0.6% | 0.5% | 0.5% | +0.1 pt |
| Average position | 20.6 | 19.9 | 19.5 | +0.7 (worse) |
| Queries | 257 | 261 | 261 | -4 |
| Pages (with impressions) | 117 | 114 | 108 | +3 |

## Top queries by position
| Query | Avg position |
|---|---|
| grafana alloy | 21.1 |
| what is grafana alloy | 9.5 |
| sunny mattu | 7.3 |
| hybrid cloud operations | 50.5 |
| observability strategy | 44.1 |
| signal drop | 6.2 |
| opentelemetry collector | 72.3 |
| what is grafana alloy? | 8.9 |
| observability vs monitoring | 46.8 |
| observability open source | 75.1 |

Queries on or near page one (position <= ~10) — all four holding steady:
- signal drop — 6.2 (was 6.3)
- sunny mattu — 7.3 (was 7.4)
- what is grafana alloy? — 8.9 (flat)
- what is grafana alloy — 9.5 (was 9.6)

## Top pages by clicks (clicks / impressions / CTR / avg position)
- / (home) — 15 / 136 / 11% / 4.3
- /authors/allan-mann — 8 / 25 / 32% / 4.1
- /p/what-is-grafana-alloy — 5 / 1,133 / 0.4% / 11.0
- /metrics-and-mayhem/podcast — 5 / 95 / 5.3% / 5.0
- /authors/{uuid} — 4 / 39 / 10.3% / 5.7
- /t/newsletter — 3 / 195 / 1.5% / 21.9
- /t/observability — 3 / 70 / 4.3% / 6.4
- /p/sunny-mattu-capgemini — 2 / 76 / 2.6% / 6.9
- /p/building-a-comprehensive-cost-effective-observability-strategy — 1 / 2,058 / 0% / 12.5
- /p/the-observability-cost-conundrum — 1 / 675 / 0.1% / 11.9

## Money pages (commercial intent)
- **Free-chapter** (`/metrics-and-mayhem/free-chapter`): **0 clicks, 0 impressions.** Does not appear anywhere in the full 117-page impression list (checked at 500 rows/page). Unchanged from 06-30.
- **Advisory** (`/advisory`): **0 clicks, 0 impressions.** Same — no search presence at all. Unchanged from 06-30.

## Movers vs last week / baseline
- Clicks ticked up 45→51 (+6), the first uptick after two flat-to-down weeks, and now +2 above the original baseline (49).
- Impressions eased further, 9,380→8,930 (-450), now -950 vs baseline. CTR nonetheless improved to 0.6% (best in the log) — fewer impressions but a better click-through rate, consistent with the Grafana Alloy page picking up an extra click (4→5) on lower impressions (1,269→1,133).
- Average position slipped again, 19.9→20.6, now 1.1 worse than baseline (19.5). Worth watching if this keeps drifting.
- The four near-page-one queries (signal drop, sunny mattu, what is grafana alloy/?) are all essentially flat — no breakout yet, but no regression either.
- The cost-strategy page ("Putting It All Together") is still the biggest impression sink at 2,058 impressions for 1 click (0% CTR) — unmeasured payoff from the CTA/description work shipped 24 Jun.
- Free-chapter and advisory remain at zero organic search presence, third straight read. These money pages are structurally invisible to Google — no query, however small, currently surfaces them. This is the clearest unaddressed gap in the SEO-to-revenue model: CTAs and content improvements elsewhere can't compensate if the conversion pages themselves aren't indexed for anything people search.
