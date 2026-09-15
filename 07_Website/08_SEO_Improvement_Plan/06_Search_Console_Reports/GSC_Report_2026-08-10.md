# Google Search Console Report - 2026-08-10

**Property:** URL-prefix `https://www.masteringobservability.com/`
**Read:** live via Claude in Chrome, no sign-in required (session already authenticated).
**Window:** rolling 3 months, 9 May 2026 to 8 August 2026.
**Baseline for comparison:** `02_SEARCH_CONSOLE_BASELINE.md` (49 clicks, 9,880 impressions, 0.5% CTR, avg position 19.5, 2026-03-20 to 06-19).

---

## Site totals

| Metric | This run (08-10) | Last run (08-03) | Baseline |
|---|---|---|---|
| Total clicks | **51** | 48 | 49 |
| Total impressions | **5,990** | 6,169 | 9,880 |
| Average CTR | **0.9%** | 0.8% | 0.5% |
| Average position | **26.7** | 25.9 | 19.5 |
| Queries | **272** | 254 | 261 |

Clicks up 3 and CTR up 0.1pt. Impressions down another 179 and average position slipped 0.8 further from baseline. The pattern holds from the last three reads: a smaller but better-converting impression base. Query count grew 254 to 272, so the site is surfacing for a wider spread of terms even as total impressions shrink.

## Top queries (by clicks, then impressions)

| Query | Clicks | Impr | CTR | Position |
|---|---|---|---|---|
| sunny mattu | 1 | 34 | 2.9% | 6.9 |
| opentelemetry collector | 0 | 219 | 0% | 70.8 |
| hybrid cloud operations | 0 | 175 | 0% | 50.7 |
| signal drop | 0 | 127 | 0% | 5.6 |
| observability cost | 0 | 127 | 0% | 28.1 |
| observability vs monitoring | 0 | 95 | 0% | 46.8 |
| observability news | 0 | 83 | 0% | 49.4 |
| observability strategy | 0 | 78 | 0% | 43.2 |
| what is grafana alloy | 0 | 69 | 0% | 10.8 |
| data federation | 0 | 62 | 0% | 82.5 |

**Movers vs the 08-03 read:**

- **signal drop** improved 5.8 to **5.6**, holding page one. Still 0 clicks against 127 impressions, which is the single largest wasted page-one position on the site.
- **what is grafana alloy** slipped 10.5 to **10.8**, third consecutive read just off page one. It has now drifted away from page one for three runs running.
- **opentelemetry collector** worsened 71.5 to **70.8** in position terms only marginally, still buried, still bleeding 219 impressions at zero clicks.
- **grafana alloy** (the short-tail variant, 1 click / 59 impr / pos 25.3 last run) has dropped out of the top ten entirely.
- **data federation** is new to the top ten (62 impr, position 82.5). Not a target keyword; likely an accidental surface.

## Top pages (by clicks)

| Page | Clicks | Impr | CTR | Position |
|---|---|---|---|---|
| / | 17 | 132 | 12.9% | 6.0 |
| /authors/allan-mann | 11 | 42 | 26.2% | 5.4 |
| /metrics-and-mayhem/podcast | 7 | 110 | 6.4% | 5.5 |
| /authors/67e0a785-1bb4-4379-9114-3c93e9cc8c92 | 4 | 24 | 16.7% | 5.1 |
| /p/what-is-grafana-alloy | 2 | 622 | 0.3% | 13.2 |
| /p/sunny-mattu-capgemini | 2 | 69 | 2.9% | 7.4 |
| /p/building-a-comprehensive-cost-effective-observability-strategy | 1 | 732 | 0.1% | 16.1 |
| /p/leveraging-open-source-for-cost-efficient-observability | 1 | 195 | 0.5% | 27.9 |
| /t/observability | 1 | 67 | 1.5% | 21.7 |
| /t/observability_digest | 1 | 43 | 2.3% | 6.5 |

Note the two biggest impression sinks are both evergreen posts converting at near zero: the cost-strategy post (732 impressions, 0.1% CTR, position 16.1) and Grafana Alloy (622 impressions, 0.3% CTR, position 13.2). Between them they carry 23% of all site impressions and return 3 clicks.

Also worth noting: **two author pages together produce 15 of the site's 51 clicks (29%)**, at CTRs of 26.2% and 16.7%. People are searching for Allan by name and finding him. There is no CTA path built for that traffic. The duplicate author page (`/authors/67e0a785...`) is a data-hygiene item; it splits the same intent across two URLs.

## Money pages

Read by exact-URL filter, not by scanning the top-pages table.

| Page | Clicks | Impr | CTR | Position | vs 08-03 |
|---|---|---|---|---|---|
| **/metrics-and-mayhem/free-chapter** | 0 | **2** | 0% | 39.5 | **First-ever organic impressions** (5 straight zero reads before this) |
| **/advisory** | 0 | **12** | 0% | 10.2 | Impressions 5 to 12, more than doubled; position 7.2 to 10.2, slipped off page one |
| /metrics-and-mayhem/book | 0 | 0 | 0% | n/a | No change, still invisible |
| /products/metrics-mayhem-chapter-4 | 0 | 0 | 0% | n/a | No change, still invisible |

Both headline money pages are now visible to Google search for the first time in this plan's history. Neither converts yet, but the advisory page at position 10.2 with 12 impressions is the first genuinely actionable organic signal the commercial funnel has produced.

## Methodology note (important for future runs)

The GSC deep-link page filter must use the **exact-URL** form:

```
&page=!<url-encoded-full-url>
```

The `&page=*substring*` "contains" form silently applies a filter that matches nothing and returns "No data". This was verified this run against a control page (`/p/what-is-grafana-alloy`, known to have 2 clicks / 622 impressions): the contains form returned "No data", the exact form returned the correct row. Any past or future run using the contains form would report a false zero on the money pages. Use the exact form.
