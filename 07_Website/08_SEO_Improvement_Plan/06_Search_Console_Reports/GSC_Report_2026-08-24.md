# Google Search Console Report - 2026-08-24

**Property:** https://www.masteringobservability.com/ (URL-prefix). Read live via browser, no re-authentication wall.
**Window:** rolling 3 months, 22 May to 21 Aug 2026.
**Baseline for comparison:** `02_SEARCH_CONSOLE_BASELINE.md` (49 clicks, 9,880 impressions, 0.5% CTR, avg position 19.5, 2026-03-20 to 06-19).

> **Cadence note.** This run is Monday 2026-08-24, one day after the off-cadence Sunday 2026-08-23 run. The GSC window advanced only about six days (previous read ended 15 Aug, this one ends 21 Aug), so search figures are essentially the same read. Small per-page moves on tiny impression counts are noise, not trend. The multi-week trend is what matters.

---

## Site totals

| Metric | 2026-08-24 | 2026-08-23 | 2026-08-10 | Baseline |
|---|---|---|---|---|
| Total clicks | **53** | 53 | 51 | 49 |
| Total impressions | **~5,900** | 5,950 | 5,990 | 9,880 |
| Average CTR | **0.9%** | 0.9% | 0.9% | 0.5% |
| Average position | **27.6** | 27.3 | 26.7 | 19.5 |
| Queries | **279** | 286 | 272 | 261 |

Clicks flat at 53, CTR holding at 0.9% (near double baseline). Position drifted 0.3 further out to 27.6 and the query surface narrowed slightly (286 to 279). The multi-week pattern is unchanged: the site matches a wide query surface, most of it at poor ranks, so more matching terms keep dragging average position out even as clicks hold.

## Top queries (position)

| Query | Position | vs 08-23 |
|---|---|---|
| grafana alloy | 25.1 | 25.0, flat |
| sunny mattu | 6.3 | 6.6, improved |
| observability maturity assessment | 16.5 | 16.2, flat |
| opentelemetry collector | 69.6 | 69.9, flat |
| observability cost | 26.9 | 27.4, slight gain |
| hybrid cloud operations | 50.6 | 49.9 |
| signal drop | 5.4 | 5.4, page one, still 0 clicks |
| what is grafana alloy | 10.7 | 10.7, just off page one |
| observability vs monitoring | 46.8 | flat |
| observability news | 48.9 | 48.1 |

**Movers:**

- **"signal drop"** holds page one at 5.4 for a fourth consecutive run and still returns zero clicks against its impressions. Largest wasted page-one position on the site.
- **"what is grafana alloy"** sits at 10.7, a fifth consecutive read just off page one, zero clicks throughout.
- **"observability maturity assessment"** holds 16.5. The 08-09 assessment page continues to match its commercial-intent target term two weeks after publishing.

## Top pages by clicks

| Page | Clicks | Impr | vs 08-23 |
|---|---|---|---|
| / | 17 | 130 | 18 / 136 |
| **/authors/allan-mann** | **11** | 48 | 11 / 47 |
| /metrics-and-mayhem/podcast | 7 | 114 | 7 / 112 |
| /p/what-is-grafana-alloy | 3 | **698** | 3 / 683 |
| **/authors/67e0a785-1bb4-4379-9114-3c93e9cc8c92** | **3** | 18 | 3 / 22 |
| /p/sunny-mattu-capgemini | 2 | 66 | 2 / 67 |
| /p/observability-maturity-assessment | 2 | 58 | 1 / 5 (query) |
| /t/observability | 1 | 62 | 1 / 70 |
| /t/observability_digest | 1 | 50 | 1 / 47 |
| /subscribe | 1 | 40 | 1 / 40 |

**Author pages, third run unchanged:** 14 of 53 clicks (26%) come from two author URLs (`/authors/allan-mann` 11 clicks, and the UUID author page 3 clicks). Best-converting surface on the site, one intent split across two URLs, no CTA to newsletter, free chapter or advisory.

**Biggest impression sink:** /p/what-is-grafana-alloy at 698 impressions for 3 clicks (0.4% CTR), roughly 12% of all site impressions.

## Money pages

Read with the exact-URL filter form `&page=!<encoded-full-url>` (the `*substring*` contains form silently returns "No data").

| Page | Clicks | Impressions | CTR | Position | vs 08-23 |
|---|---|---|---|---|---|
| **/advisory** | 0 | **23** | 0% | **10.1** | 0 / 19 / 7.6 |
| **/metrics-and-mayhem/free-chapter** | 0 | **4** | 0% | **29.8** | 0 / 3 / 36.7 |
| /products/metrics-mayhem-chapter-4 | 0 | 0 | 0% | n/a | unchanged, no organic surface |
| /metrics-and-mayhem/book | 0 | 0 | 0% | n/a | unchanged, no organic surface |

**/advisory ranking queries:** "allan mann" (0 clicks / 1 impr / pos 9.0), "observability in banking" (0 clicks / 1 impr / pos 50.0).
**/free-chapter ranking queries:** "getthefreechapter" (0 clicks / 1 impr / pos 50.0).

**Advisory is the revenue line.** Impressions rose again (19 to 23) but the position read slipped 7.6 to 10.1, back off page one. On 23 impressions that swing is inside the noise band; the durable multi-week signal is impressions climbing steadily (5, 12, 19, 23 across four reads) while clicks stay at zero. At a position that hovers around page one with zero clicks, this is a title and snippet problem, not a ranking problem, and it remains the single highest-leverage edit on the board. Free-chapter improved again (3 to 4 impressions, position 36.7 to 29.8), still zero clicks and still with no nurture automation behind it.

**SEO radar:** "observability in banking" persists as an advisory query, lining up with the rising regulated-industry / agentic-AI observability themes in Section 6.
