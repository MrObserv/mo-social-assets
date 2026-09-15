# Growth Health Check - 2026-09-14

**Task:** growth-health-check (twice weekly, Mon + Thu). Spec of record: `13_GROWTH_HEALTH_CHECK.md` (GR-2026-07-08-02).
**Publication:** Mastering Observability (`pub_51d69527-d6a4-44db-9fca-9b6cf2fee3e4`).
**Run type:** silent worker, headless. No DM to Allan; flags routed to `Ops_Log.md` "Needs Allan" and self-recorded to "Job runs". No Daily Ops chat push (headless, per DO-2026-08-14-01).

> **GSC AND GOOGLE TRENDS WERE BOTH READ LIVE THIS RUN, but not through the route the spec names.** Claude in Chrome returned an EMPTY browser list (`list_connected_browsers` = `[]`), so the extension is not connected. The read was done through the **built-in browser pane** instead, which was already signed in as Allan. **No sign-in screen was shown, none was attempted and no credentials were entered.** Recording the route because the spec assumes Chrome and the next run should try the pane first if Chrome is still dark.
>
> **The bash sandbox did not start, for the fifth consecutive run across the estate.** Virtiofs mount failure, tool named a Windows update of 8 September as the cause. Everything in this report was produced with file tools and connectors only. **No arithmetic was scripted; all deltas were computed by hand and are stated with their source.**
>
> **Method note carried forward and re-validated this run.** The GSC URL "contains" filter is `page=~<value>`, not `page=*<value>*`. Before trusting any money-page zero, the filter was tested against `what-is-bmc-helix`, a page known to have traffic, which returned 2 clicks / 925 impressions / position 6.6, matching the unfiltered table exactly. **The filter is proved good, so the zeros below are real zeros.**
>
> Companion files: `06_Search_Console_Reports/GSC_Report_2026-09-14.md`, `05_Weekly_Beehiiv_Reports/Beehiiv_Report_2026-09-14.md`. Cadence: Monday run, 7 days after the 09-07 run, so beehiiv 4-week deltas are trend rather than noise. GSC window advanced a week (was 6 Jun to 5 Sep, now 12 Jun to 11 Sep).

---

## Section 1 - Subscribers and growth

- Active subscribers **562** (561 on 09-07), recovering the 1 lost last run. Net reads **+3** (5 new, 2 churned), down from +5 and before that +7. **Net has fallen on three consecutive runs: +7, +5, +3.** Churn is steady at 2; it is acquisition that is thinning.
- Open rate **40.25%** (38.98%), **a fourth consecutive rise and the first reading above 40% in this log.**
- Click rate **2.77%** (3.83%), **a third consecutive fall and the lowest in this log.** See the divergence note below, which is the most interesting thing in this section.
- Earnings **$6.37**, flat for a fourth consecutive read.
- Acquisition sources (4wk): **website direct 3, LinkedIn referral 2, reddit.com referral 1.**
  - **Recommendations contributed ZERO this run**, after 4 last month and 1 last run. The 08-30 finding that recommendations out-convert LinkedIn is now contradicted on two consecutive reads. `crm-pipeline-harvest` recorded the same reversal today from the same numbers, so **this is not re-escalated here.**
  - **`reddit.com` appears as a signup source for the first time in this log.** Reddit referral sessions also rose 2 to 3. One subscriber is not a channel, but it is a first, and it is recorded so a second reading has something to compare against.
  - **DATA CAVEAT, and it is stated rather than smoothed over: the source counts sum to 6 while `new_subscribers` reads 5.** Both come from the same `get_publication_stats` call. Last run the two reconciled exactly. The discrepancy is one subscriber and does not change any conclusion, but the breakdown should not be treated as exact.
- **THE OPEN AND CLICK RATES ARE MOVING IN OPPOSITE DIRECTIONS AND HAVE BEEN FOR THREE RUNS.** Open 36.97 to 38.98 to 40.25, all rising. Click 3.93 to 3.83 to 2.77, all falling, and the last step is the largest. **More people are opening than at any point in this log, and fewer of them are clicking than at any point in this log.** That is a subject-line success sitting on top of a body-copy or CTA failure, and it is the only metric pair in this report that has moved cleanly and consistently for three readings. It is new; no prior run has had three points to draw the line through.
- Published posts **150** (148). Two new since 09-07.
- **Beehiiv holds ZERO scheduled posts and exactly ONE draft.** Checked against a working `published` call returning 150, so both are proved zeros rather than failed calls. The single draft is "Somebody Turned It On" (`post_3d02feb7`, created 09-11, updated 09-12). `social-daily-drive` raised the empty pipeline as a Needs-Allan item this morning; **not re-escalated here**, but it bears directly on Section 7.
- Signal Drop pages: **23 tagged (`signal_drop`), 22 unique.** The duplicate "Your Role Changes Every Hour" is still live on two IDs, **8th run flagged.** Plan target 17, met. Raw title-match count is 20 published titles containing "Signal Drop", one of which is the generic landing page; the tag count is the methodology of record per the 08-03 correction.

## Section 2 - Website and SEO traffic

**Beehiiv website analytics (4wk vs prior 4wk):** unique visitors **337** (+79.3%), sessions **471** (+65.3%), page views **753** (+27.2%), bounce rate **49.04%** (prior period 48.42%), session duration **207.77s** (prior period 73.74s, +181.8%).

Against LAST RUN's absolute readings: visitors 346 to 337, sessions 476 to 471, page views 699 to 753, bounce 48.32% to 49.04%, duration 168.86s to 207.77s. **So the traffic surge has plateaued rather than continued, while attention deepened again: session duration is the highest in this log and has now more than doubled twice in a row.** Bounce crept up 0.7pt but stayed under 50% for a second consecutive run, so the 08-24 "conversion quality degrading" row remains eased.

Top referrers (sessions): Direct 259, **LinkedIn 135 combined** (linkedin.com 104 + android app 31, down from 146), google.com 25 (29), masteringobservability.com self 17, atlassian.net 7, beehiiv 6, cto.academy 4, static.microsoft 3 (new), reddit 3, facebook 3, gmail 3, t.co 2, slack app 1 (new).

Top pages (page views): / 158, **/p/autonomous-sre-agents-where-the-gate-lives 123** (114, still the engine), /p/the-signal-2026-08-21 69, podcast 33, /p/what-is-a-wide-event 33, **book 32**, /p/ai-sre-inefficient-queries 22, /subscribe 20, /p/observability-maturity-assessment 19, /p/the-signal-2026-08-28 19, **/p/what-is-bmc-helix 18**, **/advisory 17**, /archive 16, own-the-signal 13, **/metrics-and-mayhem/free-chapter 13**, lead-with-the-promise 10, **/authors/allan-mann 10**, observability-rollout-blockers 10, **/products/metrics-mayhem-chapter-4 9**.

**Google Search Console, LIVE (window 12 Jun to 11 Sep 2026):**

| Metric | This run | 09-07 | 08-24 | Baseline (20 Mar to 19 Jun) |
|---|---|---|---|---|
| Total clicks | **54** | 55 | 53 | 49 |
| Total impressions | **7,100** | 6,300 | ~5,900 | 9,880 |
| Average CTR | **0.8%** | 0.9% | 0.9% | 0.5% |
| Average position | **23.6** | 25.9 | 27.6 | 19.5 |
| Queries | **339** | 321 | 279 | n/a |

**Average position improved 2.3 places, a second consecutive gain, and the query surface widened again (321 to 339).** Impressions rose 12.7% in a single week. **Clicks did not follow: they fell by one, and CTR fell with them.** The property is being shown to more people, on better positions, and converting a smaller fraction of them than last week. That is the same shape as the open-versus-click divergence in Section 1, on a different surface.

**Top queries (clicks / impressions / CTR / position):** alloy observability 1/81/1.2%/8.4 · grafana alloy 1/80/1.2%/23.8 · sunny mattu 1/36/2.8%/6.3 · observability maturity assessment 1/11/9.1%/20.5 · **bmc helix 0/393/0%/4.7** · opentelemetry collector 0/243/0%/69.4 · observability cost 0/190/0%/25.5 · what is grafana alloy 0/111/0%/10.8 · **signal drop 0/83/0%/5.4** · observability vs monitoring 0/64/0%/36.4.

**The same five queries sit at or near page one, and three of the five still produce zero clicks:** bmc helix 4.7, signal drop 5.4, sunny mattu 6.3, alloy observability 8.4, what is grafana alloy 10.8.

**Top pages (clicks / impressions / CTR / position):** / 15/136/11%/10.2 · **authors/allan-mann 13/59/22%/6.5** · podcast 5/83/6%/7.2 · **/p/what-is-grafana-alloy 4/742/0.5%/13.0** · **/p/what-is-bmc-helix 2/925/0.2%/6.6** · observability-maturity-assessment 2/82/2.4%/21.8 · sunny-mattu-capgemini 2/66/3%/7.3 · t/observability_digest 2/54/3.7%/6.3 · podcast wide-events 2/47/4.3%/12.2 · data-federation guide 1/214/0.5%/47.1.

**THE BYTE-SIZE CLICK POOL DID NOT JUST STAY BIG, IT GREW BY HALF IN ONE WEEK, AND THE CTR GOT WORSE.**

| Page | Impressions 09-07 | Impressions 09-14 | Change | Clicks | CTR | Position |
|---|---|---|---|---|---|---|
| `/p/what-is-bmc-helix` | 450 | **925** | **+106%** | 2 | **0.2%** | 6.6 |
| `/p/what-is-grafana-alloy` | 694 | **742** | +7% | 4 | 0.5% | 13.0 |
| **Combined** | 1,144 | **1,667** | **+46%** | **6** | **0.36%** | |

**1,667 impressions is 23% of the entire property, up from 18% last week, and it produces 6 of 54 clicks.** The BMC Helix page on its own is now **13% of all impressions the site earns**, ranks **6.6**, and converts **0.2%**. On the query side `bmc helix` went 221 to **393 impressions** while improving from position 5.0 to **4.7**, and still returns **zero clicks**. **Google is pushing this page harder every week and nobody clicks it. This is the largest and fastest-growing CTR gap on the site and it has now been flagged twice without action.**

**The author page is the site's second-best click source for a 5th consecutive run, still with no CTA:** 13 of 54 clicks (**24.1% of everything search earns**) at 22% CTR, position 6.5.

## Section 3 - Lead magnets and funnel (SEO to revenue)

**Money-page GSC lines (window 12 Jun to 11 Sep, filter validated against a known-good page first):**

| Page | Clicks | Impressions | CTR | Position | On-site views (4wk) |
|---|---|---|---|---|---|
| `/advisory` | **0** | **32** (was 28) | 0% | **10.8** (was 12.0) | **17** (was 8) |
| `/metrics-and-mayhem/free-chapter` | **0** | 7 (was 6) | 0% | **38.3** (was 43.3) | **13** (was 7) |
| `/metrics-and-mayhem/book` | 0 | **1** (was 0) | 0% | **4.0** | **32** (was 24) |
| `/products/metrics-mayhem-chapter-4` | 0 | **0** | n/a | n/a | 9 (was 10) |

Three findings.

1. **`/advisory` is now SIX consecutive readings of rising impressions and zero clicks: 5, 12, 19, 23, 28, 32.** Position improved back to 10.8 and has never left the 7.6 to 12.0 band across the whole series. **Nothing has changed in the diagnosis and nothing needs to: the page is shown, near page one, to a growing audience, and has never been clicked once in three months.** The title and meta edit has been the top open lever since 08-24 and is now three weeks old as an unactioned ask.
2. **`/metrics-and-mayhem/book` earned its FIRST organic impression, at position 4.0.** One impression is not traffic, and it is reported as a first rather than a result. But it does retire last run's statement that the book page has no organic surface at all: it now has one, and it is ranking fourth for whatever query produced it. `/products/metrics-mayhem-chapter-4` remains at a true zero.
3. **The money pages reversed last run's collapse and moved WITH the site this time.** `/advisory` on-site views doubled 8 to 17, `/free-chapter` nearly doubled 7 to 13, and the book page went 24 to 32, all while sessions were roughly flat. **Last run's "the site converts traffic into readers and not into leads" finding is weakened, not confirmed.** It is recorded as a single contrary reading, not as a resolution, because the search-side zero on `/advisory` is unchanged and that is the harder number.

**Newsletter signups by source:** website direct 3, LinkedIn 2, reddit 1. See Section 1 for the reconciliation caveat.

**Lead-magnet capture: the 09-07 flag is CLEARED, and only half of it.** Subscribe form `310e7847` "Free Chapter 4 (lead magnet, LinkedIn + gated)" now reads **`has_draft_theme_changes: false`**, so the unpublished theme draft that sat on the live form from 01 to 07 September is gone. **But `updated_at` is still identical to `created_at` (2026-09-01T08:03:08Z), so the form itself has never been edited.** The theme draft was discarded rather than published. **Consequence: the form still captures email only, so the LinkedIn gated-asset surface still feeds none of the seven idle role routers, and P1 of `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md` is still the outstanding fix.**

**Carried leaks, unchanged:** `/free-chapter` still has no dedicated nurture automation (GR-13-02, the one true funnel leak). The live Lead magnet automation still delivers and converts nobody (9/9 sends, 11.11% open, 0% click).

## Section 4 - Automations health

**18 total: 14 live / 4 draft.** **One counter moved, after a fortnight in which none did.**

- **Survey Follow up (signup welcome) `aut_fdd8e3d1`:** **314 enrolled / 1 in progress / 313 completed** (was 313/1/312), open **53.25%** (53.42%), click 16.46% unchanged. Live since 2026-08-24. **This is the first enrolment movement anywhere in the automation estate since 08-31, and it confirms the welcome flow is firing on new signups.** Still the best-performing flow on the account.
- **Role routers (7, all live):** Architect / Specialist 1/1; the other six still **0**. Unchanged for a fourth run. They need a role poll or a role field to feed them, and Section 3 explains why neither exists yet.
- **Stream routers:** Both 5/5 60% open; Leadership 3/3 66.67% open 100% click; Technical 4/4 50% open. All unchanged.
- **Warm Contributors nurture:** 7/7, 33.33% open, **0% click**, live. Unchanged.
- **Lead magnet automation `aut_84fd88d8`:** 9/9, 11.11% open, 0% click. Unchanged. `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md` P2 proposes retiring it.
- **Send Sub Form:** 0/0, live, manual trigger, dormant.
- **Drafts (4):** New 2025 Survey, Test, Follow up on Data, Test. All legacy 2024/2025 test flows, none tied to a live capture page, so clutter rather than leaks. Unchanged for the ninth run.

**DRAFT-automation leak check: no automation is in DRAFT behind a live capture page.** The leak in this estate is still not a draft flow. It is the **absence** of a `/free-chapter` nurture flow, plus the email-only Chapter 4 form in Section 3.

## Section 5 - Surveys and feedback

3 surveys, all live, **no new responses since the last run.**

- Welcome / subscribe survey (`832c3443`): 73 responses, last **2026-04-16**, now **4.9 months dry, 8th run flagged.** Serve and placement gap, not disinterest.
- Shape Our Future (`8e556859`): 3 responses, last 2025-02-03.
- Unsubscribe survey (`3d21b2b4`): 5 responses, last 2026-07-20.

**Contributor / collaboration pool:** `Warm Contributors` reads **59 active members** live, unchanged. Related segments unchanged: `Want help (declared a need)` 57, `High-intent (raised their hand)` 26. The nurture has 7/7 completed at **0% click**.

**Not re-escalated.** `crm-pipeline-harvest` carries this pool with a specific action and re-derived all six intent segments unchanged this morning (57 / 26 / 2 / 2 / 9 / 59). Repeating it here would add a row without adding a fact.

**Segment snapshot (live):** buyer segment `seg_05110b93` **2** (unmoved since 08-23). `Stream: preference not set` **549** (unmoved across seven reads). Both already carried by open rows; suppressed.

## Section 6 - Rising themes / Google Trends

**Google Trends read LIVE, second consecutive success.** Term: `observability`, worldwide, past 12 months, read through the built-in browser pane.

**Rising related queries:** walmart near me (breakout, noise, discarded) · **opentelemetry +200%** · ai news +150% (generic, discarded) · **security observability +130%** (was +140%) · **observability engineering +120% (NEW to this radar)**.

**THE MORE IMPORTANT TRENDS FINDING IS THE SERIES ITSELF, AND NO PRIOR RUN HAS LOOKED AT IT.** Interest in `observability` peaked at **100 on 31 May 2026** and reads **19 for the week of 13 September**, the lowest point in the entire 12-month window. The decline is sustained rather than a single dip: 92 (28 Jun), 76, 52, 62, 51, then 36, 36, 33, 30, 32, 29, 19 through August and September. **Category search demand has fallen by roughly two thirds since the early-summer peak.** The final data point is usually partial in Trends and should be discounted, but the August plateau in the low 30s is not partial and is less than half the June level.

**Why that matters here, and it is a genuinely useful piece of context rather than a scare:** MO's own impressions rose 12.7% and its average position improved 2.3 places **while the category's search interest was falling.** The site is taking a larger share of a smaller pool. It also means an impressions rise this autumn is a stronger result than the same rise in June would have been, and that a flat month should not automatically be read as a content failure.

**WebSearch supplement (run regardless, per spec):** the dominant 2026 cluster is unchanged and consistent across sources: predictive rather than reactive operations, closed-loop autonomous remediation (detect, diagnose, act, verify), platform and tool consolidation onto unified data architectures, **OpenTelemetry as the consolidating open standard**, and cost management as a core platform feature rather than an add-on.

**Top 2 for the SEO plan radar / Tech Tuesday / byte-size ideation, unchanged from last run and now corroborated twice:**

1. **OpenTelemetry Collector refresh.** `opentelemetry` rising +200% for a second consecutive read; the query "opentelemetry collector" carries **243 impressions at position 69.4** with zero clicks, the site's second-largest single-query impression pool. Rising demand on a term the site already appears for on page seven. **A refresh of the existing guide, not a new piece.** Cheapest available win and it has now survived two independent readings.
2. **Security observability** (+130%, unclaimed, fits the regulated-enterprise positioning). **New alternative this run: `observability engineering` +120%**, which is a discipline term rather than a product term and sits closer to the book's territory than to the byte-size series.

## Section 7 - Actions and flags

**Change control (`04_CHANGE_LOG.md`): one long-carried open item is PROVABLY STALE and should be closed.**

**CHG-014 says "10 of 11 Signal Drop drafts unpublished". That has been carried in the change log, in `01_PROGRESS_TRACKER.md` step 3.3, and in every health check since 2026-08-01. It was never measured; it was read from the file. It was measured this run and it is wrong.**

- `list_posts` with `status=draft` returns **total 1**, and that one draft is **"Somebody Turned It On"** (`post_3d02feb7`), the 13 September blog. It is not a Signal Drop post.
- All eleven CHG-014 titles resolve to **published** posts, including "Anger Is Just Fear in a Hi-Vis Vest", confirmed by a direct match against the published-post set.
- The `signal_drop` tag returns **23 published** posts, consistent with every run since 08-01.

**So there are no unpublished Signal Drop drafts. The open item has been re-reported for six weeks against a state that no longer exists.** This worker does not edit the change log; **Allan closes the CHG-014 row and the matching 01_PROGRESS_TRACKER step 3.3 line.**

**CHG-002 and CHG-005 remain confirmed live-correct** from the 09-07 spot-check and are still awaiting Allan's flip to Verified. Not re-verified this run; nothing suggests drift and the 09-07 row already carries the ask.

**Still open, carried:** CHG-016, dormant publication delete awaiting Allan. Crossed slugs on "Control Beats Perfection" / "The Last Person in the Queue". No rows literally marked "Pending fix" or "Proposed".

**Metadata drift check: not run this run.** A full `00_SEO_Metadata_Tracker.xlsx` versus live pass needs the bash sandbox to read the workbook, and the sandbox has not started for five consecutive runs. **Reported as NOT CHECKED, not as a pass.** This is the second distinct check the sandbox outage has now blocked in this lane.

### Prioritised actions

1. **Do the title and meta pass on `/p/what-is-bmc-helix` and `/p/what-is-grafana-alloy`, and do it before `/advisory`.** The pool grew 46% in one week to **1,667 impressions, 23% of the entire property**, and returns 6 clicks. BMC Helix alone doubled to 925 impressions at position 6.6 with a 0.2% CTR. **Every week this waits, Google shows it to more people and the same number of them click.** It is a bigger pool than every money page combined by a factor of roughly forty, and it is the only item in this report whose cost of delay is measurably rising.
2. **Ship the `/advisory` title and meta edit.** Sixth consecutive reading of rising impressions with zero clicks (5, 12, 19, 23, 28, 32) at a position that has never left the 7.6 to 12.0 band. Carried since 08-24. The only page on the site with an explicit commercial offer behind it.
3. **Close CHG-014 and the matching tracker line.** Measured this run: one draft on the account and it is not a Signal Drop. This costs a minute and removes a false open item that three separate files have been repeating for six weeks.
4. **Add a CTA to `/authors/allan-mann` and de-duplicate the author pages.** 13 of 54 site clicks, 24.1% of everything search earns, landing on a page with no route anywhere. Flagged a 5th run. Still the cheapest conversion win on the board.
5. **Look at why opens are rising and clicks are falling.** Open rate up three runs to a record 40.25%; click rate down three runs to a record low 2.77%; and the same divergence appears on the search side (impressions +12.7%, clicks -1). Two independent surfaces are saying the same thing about what happens after the headline. **This is a new pattern with three data points, offered as a question rather than a diagnosis.**

**Eased or resolved this run:** CHG-014's 10 unpublished drafts proved not to exist. The Chapter 4 form's unpublished theme draft is cleared. `/metrics-and-mayhem/book` earned its first organic impression. Money-page on-site views all recovered sharply, reversing last run's halving. GSC average position improved a second consecutive run (25.9 to 23.6) with the query surface widening again. Open rate above 40% for the first time. Session duration at a log high. Automation estate showed its first movement in a fortnight. Active subscribers recovered the lost 1.

**Worsened this run:** click rate fell a third run to a log low. GSC clicks and CTR both fell while impressions rose. The BMC Helix CTR gap doubled in size. Net subscriber growth fell for a third consecutive run (+7, +5, +3). Recommendation-network signups reached zero. LinkedIn referral sessions fell 146 to 135. Bounce crept up 0.7pt. Category search demand for "observability" is at a 12-month low.

## Skipped / unavailable this run

- **GSC: available and read LIVE**, window 12 Jun to 11 Sep 2026, via the built-in browser pane. **Claude in Chrome was NOT available** (`list_connected_browsers` returned an empty list). No sign-in screen shown, none attempted, no credentials entered.
- **Google Trends: available and read LIVE**, second consecutive success. WebSearch supplement also run, as the spec requires either way.
- **Bash sandbox: DOWN for a fifth consecutive run across the estate** (virtiofs mount failure, Windows update of 8 September named by the tool). No scripted checks ran anywhere in this report.
- **Full metadata drift pass: NOT RUN**, blocked by the sandbox outage above, because it needs to read `00_SEO_Metadata_Tracker.xlsx`. Reported as not checked.
- **Per-automation `get_automation_stats`: not called individually.** `list_automations` returned state, enrolled, in-progress, completed, open and click for all 18 on one page, which covers the spec's data need (matches 08-24, 08-31 and 09-07 precedent).
- **Acquisition-source breakdown: available but does not reconcile** (sums to 6 against a stated 5 new subscribers). Recorded as a caveat rather than dropped.
- **Contributor-pool composition:** segment membership read live (59 active); the all-time 27 Yes / 36 Maybe split is carried from the subscribe survey, which is static at 73 responses.
- No Daily Ops chat push (headless, per DO-2026-08-14-01); delivery is this report plus the `Ops_Log.md` "Needs Allan" queue.
