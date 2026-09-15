# Growth Health Check - 2026-09-07

**Task:** growth-health-check (twice weekly, Mon + Thu). Spec of record: `13_GROWTH_HEALTH_CHECK.md` (GR-2026-07-08-02).
**Publication:** Mastering Observability (`pub_51d69527-d6a4-44db-9fca-9b6cf2fee3e4`).
**Run type:** silent worker, headless. No DM to Allan; flags routed to `Ops_Log.md` "Needs Allan" and self-recorded to "Job runs". No Daily Ops chat push (headless, per DO-2026-08-14-01).

> **GSC AND GOOGLE TRENDS WERE BOTH AVAILABLE THIS RUN.** Claude in Chrome was connected (`928d33bd`, Allan already signed in), so this is the first live Search Console read since 2026-08-24 and the first live Trends read in seven runs. No sign-in screen was shown and no credentials were entered. **The money-page GSC lines are refreshed for the first time in a fortnight, and they are the most important thing in this report.**
>
> **Method correction worth keeping.** The Search Console URL "contains" filter is `page=~<value>`, not `page=*<value>*`. The wildcard form silently returns "No data" rather than erroring, which reads as a zero. This run caught it by testing the filter against a page already known to have traffic before trusting any zero. Any future run using the URL filter must do the same check, or it will report money pages as dead when they are not.
>
> Companion files: `06_Search_Console_Reports/GSC_Report_2026-09-07.md`, `05_Weekly_Beehiiv_Reports/Beehiiv_Report_2026-09-07.md`. Cadence note: Monday run, 7 days after the 08-31 run, so the beehiiv 4-week window has advanced a full week and deltas are trend rather than noise. The GSC window advanced a fortnight (was 22 May to 21 Aug, now 6 Jun to 5 Sep).

---

## Section 1 - Subscribers and growth

- Active subscribers **561** (562 on 08-31), so the headline number **fell by 1** while net reads **+5** (7 new, 2 churned). The two figures disagree because the 4-week window and the live count are measured differently; the honest reading is that growth has slowed, not reversed. Net was +7 last run.
- Open rate **38.98%** (36.97%), **a third consecutive recovery** and the highest in this log. Click rate **3.83%** (3.93%), down for a second run.
- Earnings **$6.37**, flat for a third consecutive read.
- Acquisition sources (4wk, total 7, matching the headline): **website direct 4, LinkedIn referral 2, recommendation project-overwatch 1.**
  - **The recommendation network collapsed 4 to 1, and 7wdata disappeared from the breakdown entirely.** Last run recommendations were the best converter at 4 of 10. This run they are the worst at 1 of 7. On a 7-subscriber sample this is noise-dominated, so it is recorded as movement to watch, **not** as a reversal of the 08-30 finding that recommendations out-convert LinkedIn. Two more reads are needed before that ranking is restated either way.
  - Website direct is the only source steady across both runs at 4.
- Published posts **148** (145). Three new since 08-31.
- Signal Drop pages: **23 tagged, 22 unique.** The duplicate "Your Role Changes Every Hour" is still live on two IDs, **7th run flagged.** Plan target 17, met.

## Section 2 - Website and SEO traffic

**Beehiiv website analytics (4wk vs prior 4wk):** unique visitors **346** (+126.1%), sessions **476** (+106.1%), page views **699** (+17.3%), bounce rate **48.32%** (prior-period 44.59%; vs LAST RUN 50.39%, so bounce has **dropped back under 50% for the first time since 08-17**), session duration **168.86s** (prior-period 112.88s; vs last run 76.24s, so it has **more than doubled**).

Traffic doubled and attention improved sharply. **The 08-24 Needs-Allan row "site conversion quality degrading, bounce crossed 50%" can be treated as eased on two consecutive reads.**

Top referrers (sessions): Direct 251, **LinkedIn 146 combined** (linkedin.com 107 + android app 39, up from 134), google.com 29, masteringobservability.com self 16, atlassian.net 7 (new this run), beehiiv 6, gmail 3, substack 3, cto.academy 3, facebook 3, reddit 2.

Top pages (page views): / 140, **/p/autonomous-sre-agents-where-the-gate-lives 114 (was 32, up 3.5x and the engine of this run's traffic)**, /p/the-signal-2026-08-21 68, /p/what-is-a-wide-event 35, poll results 31, /p/observability-maturity-assessment 29, /p/lead-with-the-promise 25, book 24, podcast 23, quiet-isnt-good 18, own-the-signal 14, /p/the-signal-2026-08-28 13, /p/ai-sre-inefficient-queries 13, authors/allan-mann 11, digest-july 11, **/products/metrics-mayhem-chapter-4 10, /advisory 8, /metrics-and-mayhem/free-chapter 7.**

**Google Search Console, LIVE (window 6 Jun to 5 Sep 2026):**

| Metric | This run | 08-24 (last live) | Baseline (20 Mar to 19 Jun) |
|---|---|---|---|
| Total clicks | **55** | 53 | 49 |
| Total impressions | **6,300** | ~5,900 | 9,880 |
| Average CTR | **0.9%** | 0.9% | 0.5% |
| Average position | **25.9** | 27.6 | 19.5 |
| Queries | **321** | 279 | n/a |

Clicks, impressions, CTR and query count all improved on the last live read, and **average position improved 1.7 places**, the first position gain in this log. Position remains well behind the baseline because the query surface has broadened (279 to 321 queries) faster than the site ranks for them, which is expected and not a defect.

**Top queries (clicks / impressions / CTR / position):** alloy observability 1/75/1.3%/8.5 · grafana alloy 1/75/1.3%/23.8 · sunny mattu 1/34/2.9%/6.2 · observability maturity assessment 1/11/9.1%/20.5 · opentelemetry collector 0/241/0%/69.4 · **bmc helix 0/221/0%/5.0** · observability cost 0/179/0%/25.6 · what is grafana alloy 0/112/0%/10.8 · **signal drop 0/97/0%/5.3** · hybrid cloud operations 0/74/0%/50.0.

**Five queries now sit at or near page one:** bmc helix 5.0, signal drop 5.3, sunny mattu 6.2, alloy observability 8.5, what is grafana alloy 10.8. **Three of those five produce zero clicks.**

**Top pages (clicks / impressions / CTR / position):** / 15/139/10.8%/9.7 · **authors/allan-mann 13/55/23.6%/6.5** · podcast 6/91/6.6%/6.5 · **/p/what-is-grafana-alloy 4/694/0.6%/13.2** · **/p/what-is-bmc-helix 2/450/0.4%/6.4** · observability-maturity-assessment 2/81/2.5%/22.0 · sunny-mattu-capgemini 2/64/3.1%/7.3 · t/observability_digest 2/53/3.8%/6.2 · podcast wide-events 2/39/5.1%/11.4 · data-federation guide 1/226/0.4%/49.4.

**The largest click pool on the site, and it is not the one the plan has been working.** `/p/what-is-grafana-alloy` and `/p/what-is-bmc-helix` hold **1,144 impressions between them, 18% of the entire site's impressions**, at positions 13.2 and 6.4, and produce **6 clicks**. The BMC Helix page in particular ranks **6.4** and converts **0.4%**. A page sitting on page one of Google with 450 impressions and 2 clicks has a title and snippet problem, and it is a bigger pool than every money page combined.

**The author page is still the site's second-best click source, still with no CTA:** 13 of the site's 55 clicks (**23.6% of all site clicks**) at a **23.6% CTR** and position 6.5. Flagged for a **4th consecutive run**.

## Section 3 - Lead magnets and funnel (SEO to revenue)

**Money-page GSC lines, refreshed for the first time since 24 August:**

| Page | Clicks | Impressions | CTR | Position | On-site views (4wk) |
|---|---|---|---|---|---|
| `/advisory` | **0** | **28** | 0% | **12.0** | **8** (was 16) |
| `/metrics-and-mayhem/free-chapter` | **0** | 6 | 0% | 43.3 | **7** (was 16) |
| `/metrics-and-mayhem/book` | 0 | **0** | n/a | n/a | 24 |
| `/products/metrics-mayhem-chapter-4` | 0 | **0** | n/a | n/a | 10 |

Three findings, in order of how much they matter.

1. **The `/advisory` impressions series is now five consecutive readings of rising impressions and zero clicks: 5, 12, 19, 23, 28.** Position has held between 7.6 and 12.0 throughout, so the page is being shown, on or near page one, to a growing audience, and not one person has clicked it in three months. **This is definitively a title and snippet problem, not a ranking problem.** The `/advisory` title and meta pass has been the top open lever since 08-24; this run is the first to put a hard, refreshed number behind it. Position slipped 10.1 to 12.0, which on 28 impressions is inside noise and is not the story.
2. **Two of the four money pages have no search presence at all.** `/metrics-and-mayhem/book` and `/products/metrics-mayhem-chapter-4` return **zero impressions** over three months. They are not ranking badly; Google is not showing them. This was not previously measured, because prior runs read only the two named money pages. The book page is the commercial endpoint of the whole content estate.
3. **The money pages moved in the opposite direction to the site.** Sessions doubled (+106%) while `/advisory` on-site views halved (16 to 8) and `/free-chapter` more than halved (16 to 7). The traffic that arrived this run came for the autonomous-SRE blog (114 views) and went nowhere near the commercial pages. **This is the clearest evidence yet that the site converts traffic into readers and not into leads**, and it corroborates proposal P4 in `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md`: with footers off on both Home and `/advisory`, no page carries a standing route to the money pages.

**Newsletter signups by source:** website direct 4, LinkedIn 2, recommendation 1. See Section 1 for why the recommendation collapse is not yet a reversal.

**Lead-magnet capture, new this run.** Subscribe form `310e7847-1bcc-43eb-9d0d-33af4a209645`, "Free Chapter 4 (lead magnet, LinkedIn + gated)", created **2026-09-01**, still reads `has_draft_theme_changes: true` and `updated_at` identical to `created_at`. **An unpublished theme edit has sat on the live lead-magnet form for six days and the form has not been touched since it was made.** This is the gated LinkedIn capture surface. Surfaced by the website-build satellite on 09-06 and confirmed live here; that session could not append to `Ops_Log.md`, so it has never reached the queue.

**Carried leaks, unchanged:** `/free-chapter` still has no dedicated nurture automation (GR-13-02, the one true funnel leak). The live Lead magnet automation still delivers and converts nobody (9/9 sends, 11.11% open, 0% click).

## Section 4 - Automations health

**18 total: 14 live / 4 draft.** **Every counter in this section is identical to the 08-31 read.** Nothing enrolled, completed, opened or clicked anywhere in the automation estate in seven days.

- **Survey Follow up (signup welcome) `aut_fdd8e3d1`:** 313 enrolled / 1 in progress / 312 completed / 53.42% open / 16.46% click. Live, `published_at: 2026-08-24T10:15:40Z`. Healthy and the best-performing flow on the account.
- **Role routers (7, all live):** Architect / Specialist 1/1; the other six still **0**. Unchanged.
- **Stream routers:** Both 5/5 60% open; Leadership 3/3 66.67% open 100% click; Technical 4/4 50% open. All unchanged.
- **Warm Contributors nurture:** 7/7, 33.33% open, **0% click**, live.
- **Lead magnet automation `aut_84fd88d8`:** 9/9, 11.11% open, 0% click. `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md` P2 proposes retiring it now the replacement is verified healthy.
- **Send Sub Form:** 0/0, live, manual trigger, dormant.
- **Drafts (4):** New 2025 Survey, Test, Follow up on Data, Test. All legacy 2024/2025 test flows, none tied to a live capture page, so clutter rather than leaks. Unchanged for the eighth run.

**DRAFT-automation leak check:** no automation is in DRAFT behind a live capture page. The leak in this estate is not a draft flow, it is the **absence** of a `/free-chapter` nurture flow plus the unpublished theme on the Chapter 4 form (Section 3).

## Section 5 - Surveys and feedback

3 surveys, all live, **no new responses since the last run.**

- Welcome / subscribe survey (`832c3443`): 73 responses, last **2026-04-16**, now **4.7 months dry, 7th run flagged.** Serve and placement gap, not disinterest.
- Shape Our Future (`8e556859`): 3 responses, last 2025-02-03.
- Unsubscribe survey (`3d21b2b4`): 5 responses, last 2026-07-20.

**Contributor / collaboration pool:** the `Warm Contributors` segment reads **59 active members** live (all-time pool 63: 27 Yes + 36 Maybe; 4 ever contacted). Related segments: `Want help (declared a need)` 57, `High-intent (raised their hand)` 26. The Warm Contributors nurture has 7/7 completed at **0% click**, so the pool has been touched and has not responded to what it was sent.

**Not re-escalated.** The lead-generation chat's 2026-09-04 row already carries this pool with a specific action ("email those 26 personally this week"), and it states the material fact this section would otherwise repeat: advisory revenue recorded to date is zero, ever. Re-escalation suppressed.

**Segment snapshot (live):** buyer segment `seg_05110b93` **2** (unmoved since 08-23). `Stream: preference not set` **549** (unmoved across six reads). Both already carried by open rows; suppressed here.

## Section 6 - Rising themes / Google Trends

**Google Trends read LIVE this run**, the first successful read in seven runs. Term: `observability`, worldwide, past 12 months.

**Rising related queries:** walmart near me +4,400% (noise, discarded) · **opentelemetry +200%** · ai news +150% (generic, discarded) · **security observability +140%**.

Two genuine signals, and they pair unusually well with this run's GSC data.

1. **`opentelemetry` +200% rising, and MO is already ranked for it and ranked badly.** The query "opentelemetry collector" carries **241 impressions at position 69.4** with zero clicks, the site's second-largest single-query impression pool. Demand is rising 200% on a term the site already appears for on page seven. **The play is a refresh of the existing OpenTelemetry Collector guide, not a new piece.** That is cheaper than anything currently on the content slate and it targets a measured, rising, already-earned surface.
2. **`security observability` +140% is genuinely new to this radar.** No prior health check has surfaced it and MO has no coverage of it. It is adjacent to Allan's regulated-enterprise positioning (a security-observability angle is a natural fit for a tier-1 bank audience) and it is unclaimed in the current estate.

**WebSearch supplement (scheduled, run even though Trends rendered):** the dominant 2026 cluster remains agentic AIOps moving from recommendation to autonomous diagnose-act-verify, predictive rather than reactive operations, OpenTelemetry as the consolidating open standard, and **cost management as a core platform feature** rather than an add-on. This corroborates the OTel pick above and the standing AI-SRE cluster.

**Top 1-2 for the SEO plan radar / Tech Tuesday / byte-size ideation:** (1) **OpenTelemetry collector refresh** (rising 200%, 241 impressions already earned, position 69.4, cheapest available win); (2) **security observability** (rising 140%, unclaimed, fits the regulated-enterprise positioning).

## Section 7 - Actions and flags

**Change control (`04_CHANGE_LOG.md`): two long-carried rows are now CLEARED.**

The CHG-002 and CHG-005 spot-check has been deferred for eight consecutive cycles pending a live pass. **It was performed this run** via `get_post` on the two posts, and **both are live-correct against the log:**

- **CHG-002** (`post_5be32935`, `/p/mastering-it-observability`): `default_title` = "How to Craft an Observability Strategy Like a Symphony" ✅ matches target. `default_description` matches target. `og_title` = "Crafting an Observability Strategy Like a Symphony" ✅ matches the open-issue target exactly.
- **CHG-005** (`post_a09f7913`, `/p/building-a-comprehensive-cost-effective-observability-strategy`): `default_title` = "Build a Cost-Effective Observability Strategy" ✅. `default_description` = "Benchmark your observability spend, apply the 20-30% rule, and build a strategy that controls cost without losing the visibility you need." ✅ the exact 138-char target.

**Both are ready for Allan to flip to Verified. This worker does not edit the change log; that is Allan's action.**

**Still open, carried:** CHG-014, 10 of 11 Signal Drop drafts unpublished. CHG-016, dormant publication delete awaiting Allan. Crossed slugs on "Control Beats Perfection" / "The Last Person in the Queue". No rows literally marked "Pending fix" or "Proposed".

**Metadata drift check:** partially performed. The two CHG rows above were checked live against `seo_settings` and match. A full `00_SEO_Metadata_Tracker.xlsx` versus live pass was not run. **No drift found in what was checked.**

### Prioritised actions

1. **Ship the `/advisory` title and meta edit.** Five consecutive readings of rising impressions with zero clicks (5, 12, 19, 23, 28) at a position that has never left the 7.6 to 12.0 band. There is no remaining ambiguity about the diagnosis, and this is the only page on the site with an explicit commercial offer behind it. Carried since 08-24, now evidenced.
2. **Give `/p/what-is-bmc-helix` and `/p/what-is-grafana-alloy` the same title and meta treatment, and do it in the same sitting.** 1,144 impressions between them, 18% of the site's total, positions 6.4 and 13.2, six clicks. **This is a larger click pool than every money page combined and it has never been prioritised.** BMC Helix at position 5.0 on the query with 221 impressions and 0 clicks is the single worst CTR gap on the site.
3. **Add a CTA to `/authors/allan-mann` and de-duplicate the author pages.** 13 of 55 site clicks, 23.6% of everything the site earns from search, landing on a page with no route anywhere. Cheapest conversion win on the board, flagged a 4th run.
4. **Resolve the Chapter 4 lead-magnet form.** Form `310e7847` has carried an unpublished theme draft since 01 September and captures email only. Publish or discard the theme, and add the Role field per `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md` P1 so the seven idle role routers have a source.
5. **Publish the remaining 10 Signal Drop drafts and resolve the duplicate "Your Role Changes Every Hour"** (CHG-014, duplicate now a 7th-run flag).

**Eased or resolved this run:** GSC and Google Trends both available after seven blind runs. CHG-002 and CHG-005 spot-checks completed and both PASS. Bounce rate back under 50% (50.39% to 48.32%) on a second consecutive ease. Session duration more than doubled (76.24s to 168.86s). Open rate up a third consecutive run to 38.98%, the highest in this log. GSC average position improved for the first time in this log (27.6 to 25.9), with clicks, impressions and query count all up.

**Worsened this run:** money-page on-site views halved while sessions doubled. Recommendation-network signups fell 4 to 1. Click rate fell a second run. Active subscribers fell by 1. `/free-chapter` search position worsened 29.8 to 43.3.

## Skipped / unavailable this run

- **GSC: available and read live.** Window 6 Jun to 5 Sep 2026.
- **Google Trends: available and read live.** First success in seven runs. WebSearch supplement also run, as the spec requires either way.
- **Per-automation `get_automation_stats`:** not called individually. `list_automations` returned state, enrolled, in-progress, completed, open and click for all 18 on one page, which covers the spec's data need (matches 08-24 and 08-31 precedent).
- **Full metadata drift pass:** not run. Two targeted CHG checks performed instead, both clean.
- **Contributor-pool composition:** segment membership read live (59 active); the all-time 27 Yes / 36 Maybe split is carried from the subscribe survey, which is static at 73 responses.
- **`/products/metrics-mayhem-chapter-4` and `/metrics-and-mayhem/book` GSC:** confirmed at zero impressions, verified via a filter that was itself validated against a known-good page first (see the method note at the top).
- No Daily Ops chat push (headless, per DO-2026-08-14-01); delivery is this report plus the `Ops_Log.md` "Needs Allan" queue.
