# Search Console Report - 2026-09-07

**Property:** `https://www.masteringobservability.com/` (URL prefix).
**Window:** 6 Jun 2026 to 5 Sep 2026 (rolling 3 months).
**Read:** LIVE via Claude in Chrome (browser connected, Allan already signed in as allan@masteringobservability.com). No sign-in screen shown, none attempted, no credentials entered.
**Previous live read:** 2026-08-24 (window 22 May to 21 Aug). The 08-31 run was blind.
**Baseline:** `02_SEARCH_CONSOLE_BASELINE.md` - 49 clicks, 9,880 impressions, 0.5% CTR, avg position 19.5 (20 Mar to 19 Jun 2026).

---

## Method note, keep this

The Search Console URL "contains" filter is **`page=~<value>`**. The wildcard form `page=*<value>*` **silently returns "No data"** rather than erroring, which reads as a genuine zero and will make live money pages look dead.

This run initially read `/advisory`, `/free-chapter` and `/book` as zero impressions using the wildcard form. The filter was then validated against `metrics-and-mayhem`, a path already known to carry traffic from the unfiltered top-pages table, which also returned zero and proved the filter wrong rather than the pages dead. **Any future run using a URL filter must validate it against a known-good page before trusting a zero.**

---

## Site totals

| Metric | 2026-09-07 | 2026-08-24 | Baseline | vs baseline |
|---|---|---|---|---|
| Total clicks | **55** | 53 | 49 | +12.2% |
| Total impressions | **6,300** | ~5,900 | 9,880 | -36.2% |
| Average CTR | **0.9%** | 0.9% | 0.5% | +0.4pt |
| Average position | **25.9** | 27.6 | 19.5 | -6.4 places |
| Queries | **321** | 279 | n/a | n/a |
| Pages | **184** | n/a | n/a | n/a |

**Movers vs the last live read:** clicks +2, impressions +400, queries +42, and **average position improved 1.7 places, the first position gain recorded in this log.** CTR held at 0.9%, which is nearly double the baseline's 0.5%.

**Movers vs baseline:** clicks and CTR are both ahead. Impressions remain a third below baseline and position six places worse. The query surface has widened from the baseline period (321 queries now) faster than the site ranks for the new terms, which drags the average position down while the click and CTR trend improves. That is the expected shape of a broadening estate and is not read as a regression.

---

## Top queries by impressions

| Query | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| opentelemetry collector | 0 | 241 | 0% | 69.4 |
| **bmc helix** | **0** | **221** | **0%** | **5.0** |
| observability cost | 0 | 179 | 0% | 25.6 |
| what is grafana alloy | 0 | 112 | 0% | 10.8 |
| **signal drop** | **0** | **97** | **0%** | **5.3** |
| alloy observability | 1 | 75 | 1.3% | 8.5 |
| grafana alloy | 1 | 75 | 1.3% | 23.8 |
| hybrid cloud operations | 0 | 74 | 0% | 50.0 |
| sunny mattu | 1 | 34 | 2.9% | 6.2 |
| observability maturity assessment | 1 | 11 | 9.1% | 20.5 |

### Movement against the SEO plan's target keywords

- **Five queries are now at or inside page one:** bmc helix **5.0**, signal drop **5.3**, sunny mattu **6.2**, alloy observability **8.5**, what is grafana alloy **10.8**.
- **Three of those five return zero clicks.** `bmc helix` in particular ranks **5.0** across **221 impressions** and has never been clicked. **That is the largest single CTR gap on the property.**
- `observability maturity assessment` holds the best CTR on the board at **9.1%** and continues to earn its target term (was 20% CTR on 5 impressions on 08-24; the CTR fell because impressions more than doubled, which is the right direction).
- `opentelemetry collector` is the largest impression pool at 241 and sits at position **69.4**, page seven. Google Trends this run shows `opentelemetry` **rising +200%** (see the health check Section 6). Demand is climbing on a term the site already appears for and ranks badly on.

---

## Top pages by impressions

| Page | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| **/p/what-is-grafana-alloy** | **4** | **694** | **0.6%** | 13.2 |
| **/p/what-is-bmc-helix** | **2** | **450** | **0.4%** | **6.4** |
| /p/data-federation-scalable-observability-guide | 1 | 226 | 0.4% | 49.4 |
| / (home) | 15 | 139 | 10.8% | 9.7 |
| /metrics-and-mayhem/podcast | 6 | 91 | 6.6% | 6.5 |
| /p/observability-maturity-assessment | 2 | 81 | 2.5% | 22.0 |
| /p/sunny-mattu-capgemini | 2 | 64 | 3.1% | 7.3 |
| **/authors/allan-mann** | **13** | **55** | **23.6%** | **6.5** |
| /t/observability_digest | 2 | 53 | 3.8% | 6.2 |
| /podcast/wide-events-observability-2-0-without-the-hype | 2 | 39 | 5.1% | 11.4 |

**The two byte-size pages hold 1,144 impressions, 18% of the whole property, and produce 6 clicks between them.** Both rank respectably (13.2 and 6.4). This is a title and snippet problem on the largest available click pool, and it has never been prioritised in the plan.

**The author page is the site's second-largest click source:** 13 of 55 clicks, **23.6% of everything the property earns from search**, at a 23.6% CTR. It still carries no CTA and is still duplicated. Flagged for a 4th consecutive run.

---

## Money pages

| Page | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| **`/advisory`** | **0** | **28** | **0%** | **12.0** |
| **`/metrics-and-mayhem/free-chapter`** | **0** | **6** | **0%** | **43.3** |
| `/metrics-and-mayhem/book` | 0 | **0** | n/a | n/a |
| `/products/metrics-mayhem-chapter-4` | 0 | **0** | n/a | n/a |

### `/advisory` - the five-reading series

| Read | Impressions | Clicks | Position |
|---|---|---|---|
| 2026-08-01 | 5 | 0 | n/a |
| 2026-08-17 | 12 | 0 | 10.2 |
| 2026-08-23 | 19 | 0 | 7.6 |
| 2026-08-24 | 23 | 0 | 10.1 |
| **2026-09-07** | **28** | **0** | **12.0** |

Impressions have risen every single reading. Position has never left the 7.6 to 12.0 band. Clicks have been zero throughout. **The page is being shown, on or near page one, to a steadily growing audience, and nobody clicks it. This is a title and snippet problem, not a ranking problem, and the evidence is now five readings deep.** The position slip 10.1 to 12.0 sits inside noise on 28 impressions and is not the finding.

### `/free-chapter`

0 clicks / 6 impressions / position **43.3**, worsened from 29.8 on 08-24 while impressions rose 4 to 6. Deep on page four; effectively invisible.

### The two pages with no search presence at all

`/metrics-and-mayhem/book` and `/products/metrics-mayhem-chapter-4` return **zero impressions over three months**. They are not ranking badly, Google is not surfacing them. **This was not previously measured** because earlier runs read only the two named money pages. The book page is the commercial endpoint of the entire content estate and it has no organic surface whatsoever.

---

## Read against the beehiiv on-site figures

Sessions rose **+106.1%** over the same period while `/advisory` on-site views **halved, 16 to 8**, and `/free-chapter` fell **16 to 7**. The traffic that arrived came for `/p/autonomous-sre-agents-where-the-gate-lives` (114 page views, up from 32) and did not reach a commercial page.

This corroborates proposal **P4** in `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md`: with `show_footer: false` on both Home and `/advisory`, no page on the site carries a standing route to advisory, the book or the free chapter. Doubling traffic into an estate with no internal route to the money pages produces exactly this shape.
