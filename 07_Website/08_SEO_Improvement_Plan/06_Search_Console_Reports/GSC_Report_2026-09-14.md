# Google Search Console Report - 2026-09-14

**Property:** URL-prefix `https://www.masteringobservability.com/`
**Window:** 12 Jun to 11 Sep 2026 (last 3 months). Previous run's window was 6 Jun to 5 Sep, so the window advanced one week.
**Read:** LIVE. **Route: the built-in browser pane, NOT Claude in Chrome.** `list_connected_browsers` returned an empty list, so the extension is not connected. The pane was already signed in as allan@masteringobservability.com. **No sign-in screen was shown, none was attempted, no credentials were entered.**
**Baseline for comparison:** `02_SEARCH_CONSOLE_BASELINE.md` (49 clicks, 9,880 impressions, 0.5% CTR, average position 19.5, 20 Mar to 19 Jun 2026).

> **METHOD, RE-VALIDATED THIS RUN.** The Search Console URL "contains" filter is `page=~<value>`. The wildcard form `page=*<value>*` silently returns "No data", which reads as a genuine zero. Before any money-page figure below was trusted, the filter was tested against `what-is-bmc-helix`, a page known to carry traffic. It returned 2 clicks / 925 impressions / position 6.6, matching the unfiltered table exactly. **The filter is proved good, so the zeros in this report are real zeros.**

---

## Site totals

| Metric | 2026-09-14 | 2026-09-07 | 2026-08-24 | Baseline |
|---|---|---|---|---|
| Total clicks | **54** | 55 | 53 | 49 |
| Total impressions | **7,100** | 6,300 | ~5,900 | 9,880 |
| Average CTR | **0.8%** | 0.9% | 0.9% | 0.5% |
| Average position | **23.6** | 25.9 | 27.6 | 19.5 |
| Queries | **339** | 321 | 279 | n/a |

**Movers vs baseline and vs last run.**

- **Average position improved 2.3 places, a second consecutive gain** (27.6, then 25.9, now 23.6). Position remains 4.1 places behind the baseline because the query surface has broadened from 261 to 339 queries faster than the site ranks for them. That is expected and not a defect.
- **Impressions rose 12.7% in one week**, the largest single-week impression gain in this log, and are now 72% of the baseline level.
- **Clicks fell by one and CTR fell from 0.9% to 0.8%.** More impressions, better positions, fewer clicks. **That divergence is the finding of this report** and it repeats on the email side, where open rate hit a log high of 40.25% while click rate hit a log low of 2.77%.

## Top queries (clicks / impressions / CTR / position)

| Query | Clicks | Impr | CTR | Position | vs 09-07 |
|---|---|---|---|---|---|
| alloy observability | 1 | 81 | 1.2% | 8.4 | impr 75 to 81, pos 8.5 to 8.4 |
| grafana alloy | 1 | 80 | 1.2% | 23.8 | impr 75 to 80, pos flat |
| sunny mattu | 1 | 36 | 2.8% | 6.3 | impr 34 to 36 |
| observability maturity assessment | 1 | 11 | 9.1% | 20.5 | unchanged |
| **bmc helix** | **0** | **393** | **0%** | **4.7** | **impr 221 to 393 (+78%), pos 5.0 to 4.7** |
| opentelemetry collector | 0 | 243 | 0% | 69.4 | impr 241 to 243 |
| observability cost | 0 | 190 | 0% | 25.5 | impr 179 to 190 |
| what is grafana alloy | 0 | 111 | 0% | 10.8 | impr 112 to 111 |
| **signal drop** | 0 | 83 | 0% | 5.4 | impr 97 to 83, pos 5.3 to 5.4 |
| observability vs monitoring | 0 | 64 | 0% | 36.4 | new to top 10 (hybrid cloud operations dropped out) |

**Five queries sit at or near page one: bmc helix 4.7, signal drop 5.4, sunny mattu 6.3, alloy observability 8.4, what is grafana alloy 10.8. Three of the five produce zero clicks.** Same five as last run; `bmc helix` improved its position while nearly doubling its impressions and still returned nothing.

## Top pages (clicks / impressions / CTR / position)

| Page | Clicks | Impr | CTR | Position |
|---|---|---|---|---|
| `/` | 15 | 136 | 11% | 10.2 |
| **`/authors/allan-mann`** | **13** | 59 | **22%** | 6.5 |
| `/metrics-and-mayhem/podcast` | 5 | 83 | 6% | 7.2 |
| **`/p/what-is-grafana-alloy`** | 4 | **742** | **0.5%** | 13.0 |
| **`/p/what-is-bmc-helix`** | 2 | **925** | **0.2%** | 6.6 |
| `/p/observability-maturity-assessment` | 2 | 82 | 2.4% | 21.8 |
| `/p/sunny-mattu-capgemini` | 2 | 66 | 3% | 7.3 |
| `/t/observability_digest` | 2 | 54 | 3.7% | 6.3 |
| `/podcast/wide-events-observability-2-0-...` | 2 | 47 | 4.3% | 12.2 |
| `/p/data-federation-scalable-observability-guide` | 1 | 214 | 0.5% | 47.1 |

### The byte-size pool grew by half in one week and the CTR got worse

| Page | Impr 09-07 | Impr 09-14 | Change | Clicks | CTR | Position |
|---|---|---|---|---|---|---|
| `/p/what-is-bmc-helix` | 450 | **925** | **+106%** | 2 | **0.2%** | 6.6 |
| `/p/what-is-grafana-alloy` | 694 | **742** | +7% | 4 | 0.5% | 13.0 |
| **Combined** | **1,144** | **1,667** | **+46%** | **6** | **0.36%** | |

**1,667 impressions is 23% of the entire property, up from 18% a week ago, and it yields 6 of the site's 54 clicks.** The BMC Helix page alone is **13% of all impressions the property earns**, ranks **6.6**, and converts **0.2%**. Both pages already rank. Only the title and snippet are failing. **This pool is larger than every money page combined by roughly forty to one, and it is growing while unactioned.**

### The author page, 5th consecutive flag

`/authors/allan-mann` earns **13 of 54 clicks, 24.1% of everything the site gets from search**, at a **22% CTR** and position 6.5, and still carries **no CTA** and a duplicate URL. It is the second-best click source on the property and it routes nowhere.

## Money pages

| Page | Clicks | Impressions | CTR | Position | Prior run |
|---|---|---|---|---|---|
| `/advisory` | **0** | **32** | 0% | **10.8** | 0 / 28 / 12.0 |
| `/metrics-and-mayhem/free-chapter` | **0** | 7 | 0% | **38.3** | 0 / 6 / 43.3 |
| `/metrics-and-mayhem/book` | 0 | **1** | 0% | **4.0** | 0 / 0 / n/a |
| `/products/metrics-mayhem-chapter-4` | 0 | **0** | n/a | n/a | 0 / 0 / n/a |

1. **`/advisory` is a SIXTH consecutive reading of rising impressions and zero clicks: 5, 12, 19, 23, 28, 32.** Position improved to 10.8 and has never left the 7.6 to 12.0 band across the entire series. The page is shown, near page one, to a steadily growing audience, and has never been clicked. **Title and snippet problem, not a ranking problem. There is nothing further to measure before acting.**
2. **`/metrics-and-mayhem/book` earned its FIRST organic impression, at position 4.0.** One impression is not traffic and it is reported as a first, not a result. It does retire last run's finding that the book page has no organic surface at all.
3. **`/products/metrics-mayhem-chapter-4` remains at a genuine zero** over three months, verified through the validated filter.
4. `/free-chapter` position improved 43.3 to 38.3 on 7 impressions. Inside noise, recorded for the series.

## Conversion signals for the funnel

| Signal | This run | Last run | Direction |
|---|---|---|---|
| Free-chapter GSC clicks | 0 | 0 | flat, 6th zero |
| Free-chapter on-site views (4wk) | **13** | 7 | **up 86%** |
| Advisory GSC clicks | 0 | 0 | flat, 6th zero |
| Advisory on-site views (4wk) | **17** | 8 | **up 113%** |
| Top signup source | website direct (3 of 5) | website direct (4 of 7) | unchanged leader |

**On-site money-page views recovered sharply this run, reversing last run's halving**, and did so while total sessions were roughly flat (476 to 471). That weakens, but does not resolve, last run's finding that the site converts traffic into readers and not into leads. The search-side zero on `/advisory` is the harder number and it is unchanged.

## Notes for the next run

- Try the **built-in browser pane first** if Claude in Chrome is still showing an empty browser list. It worked cleanly this run and was already signed in.
- The `page=~` filter check against a known-good page **must be repeated every run** before any money-page zero is reported.
- `bmc helix` impressions are the fastest-moving number on this property. Watch whether the next reading continues past 393.
- Category context, from Google Trends the same run: worldwide search interest in "observability" is at a **12-month low**, down roughly two thirds from its 31 May peak. These impression gains were earned against a shrinking pool.
