# Beehiiv Report - 2026-08-10

**Publication:** Mastering Observability (`pub_51d69527-d6a4-44db-9fca-9b6cf2fee3e4`)
**Window:** last 4 weeks unless stated.

---

## Headline metrics

| Metric (last 4 weeks) | This run (08-10) | Last run (08-03) | Move |
|---|---|---|---|
| Active subscribers | **557** | 555 | +2 |
| Open rate | **31.69%** | 37.37% | **-5.68pt** |
| Click rate | **4.65%** | 3.73% | +0.92pt |
| New subscribers | 7 | 10 | -3 |
| Churned subscribers | 4 | 5 | -1 |
| Net subscribers | **+3** | +5 | -2 |
| Earnings | $6.10 | $6.10 | flat |

**The open-rate drop is the story of this run.** 37.37% to 31.69% in one week is the largest single-metric move since the log began, and it is a 4-week rolling figure, so a one-week effect that size means the recent sends underperformed sharply. Three sends landed in this window (the Ep 26 companion, the Maturity Assessment, and the stream poll). Click rate moved the other way, 3.73% to 4.65%, so the people who did open engaged more. The likeliest reading is send-volume dilution rather than content failure, but it needs a look rather than a shrug.

Net growth also slowed: +3 this window against +5 last run and +7 on 08-01. Churn improved (5 to 4) but new signups fell (10 to 7).

## New subscribers by acquisition source (4 weeks)

| Source | Count |
|---|---|
| recommendation: 7wdata.beehiiv.com / referral | **3** |
| website: linkedin.com / referral | 1 |
| website: linkedin.android / referral | 1 |
| website: direct | 1 |
| embed: direct | 1 |
| **Total** | **7** |

**Top source flipped.** For the last two runs LinkedIn led (5 of 10 both times). This run the **beehiiv recommendation network (7wdata) leads with 3 of 7** and LinkedIn combined drops to 2 of 7. The recommendation channel is now doing more acquisition work than the channel Allan actively posts on. Sums cleanly to 7.

## Content volume

- **Published posts: 134** (was 131 on 08-03).
- **Signal Drop pages (content-tag filter `signal_drop`): 23 published**, minus the still-unresolved duplicate "Your Role Changes Every Hour" (`post_0cbfa4e6` + `post_47600cdf`, both live) = **22 unique live episode pages.** Target is 17, so comfortably clear.
- New since last run: **Ep 26 "You Don't See the Foundation: Why AIOps Fails Before It Starts"** (`post_44813e88`), published 2026-08-09. This is the companion built on the correct Signal Drop v2.0 template per the 08-09 changelog entry.
- The stream poll "Which do you want more of?" (`post_d35e1d0c`) went live 2026-08-10 06:00.

## Website analytics (beehiiv, last 4 weeks vs prior 4 weeks)

| Metric | Value | Prior period | Change |
|---|---|---|---|
| Unique visitors | 153 | 166 | **-7.8%** |
| Sessions | 231 | 225 | +2.7% |
| Page views | 527 | 487 | +8.2% |
| Bounce rate | 44.59% | 38.22% | +6.4pt worse |
| Avg session duration | 111.3s | 133.2s | -16.4% |

Fewer people, visiting slightly more often, viewing more pages each, but bouncing more and staying less time. The 08-03 run flagged "more visits, shallower ones"; that trend continued and deepened. Bounce rate has now worsened two runs running (38.22% to 41.45% to 44.59%).

## Top pages by page views

| Page | Views | vs 08-03 |
|---|---|---|
| / | 130 | 118 |
| /metrics-and-mayhem/free-chapter | 35 | 35 (flat) |
| /podcast .. the_gate_stays_human | 25 | 20 |
| /metrics-and-mayhem/podcast | 25 | 33 |
| /podcast .. quiet_isn_t_good | 25 | 25 |
| **/advisory** | **24** | **28 (down 4)** |
| /products/metrics-mayhem-chapter-4 | 20 | 27 (down 7) |
| /metrics-and-mayhem/book | 20 | 30 (down 10) |
| /subscribe | 18 | 17 |
| /p/what-is-opentelemetry-profiling | 14 | new to top list |
| /p/how-to-lead-an-incident-response-team | 10 | new to top list |
| /p/observability-cost-is-a-design-problem | 10 | 11 |
| /p/observability-maturity-assessment | 10 | new (published 08-09) |
| /p/observability-digest-july-2026 | 8 | new to top list |

**All four commercial pages moved down on-site this run** (advisory -4, chapter-4 -7, book -10, free-chapter flat), while the homepage and the episode pages moved up. On-site attention shifted toward content and away from the money pages, exactly as the organic signal started appearing. Worth watching whether that is noise or a real routing problem.

## Top referrers (sessions)

Direct 129, linkedin.com 31, LinkedIn Android app 15, google.com 13, beehiiv.com 10, self-referral 8, reddit.com 7, facebook.com 6, ecosia.org 3, Gmail Android 2, youtube.com 1, static.microsoft 1, cto.academy 1, google.de 1, Google quick search 1.

Reddit up 5 to 7. YouTube collapsed 3 to 1. LinkedIn combined 46, still the dominant non-direct referrer for sessions even though it is no longer the top signup source.

## Automations

**11 automations total (was 8): 6 live, 5 draft.** Three new live automations appeared this run.

**Live:**

| Automation | Trigger | Enrolled | Completed | Open % | Click % | Published |
|---|---|---|---|---|---|---|
| Survey Follow up | signup | 306 | 305 | 53.67% | 16.15% | (legacy) |
| Lead magnet automation | purchased_product | 8 | 8 | **12.5%** | 0% | 2026-07-23 |
| Warm Contributors nurture | segment_action | 7 | **7** | 33.33% | 0% | 2026-07-14 |
| Stream router: Technical (poll) | poll_submission | 1 | 1 | 0% | 0% | 2026-08-09 |
| Stream router: Both (poll) | poll_submission | 1 | 1 | 0% | 0% | 2026-08-09 |
| **Stream router: Leadership (poll)** | poll_submission | **0** | 0 | 0% | 0% | 2026-08-09 |
| Send Sub Form | manual | 0 | 0 | n/a | n/a | never published |

**Two escalating flags have eased:**

1. **Chapter-4 lead-magnet automation is no longer at 0% open.** It moved to 8 enrolments, 8 completions, **12.5% open** (one open). After two runs at a flat zero across 7 sends, the first open landed. Click rate is still 0%, so it is delivering but not converting. Downgrade from "worth checking deliverability" to "watch the click rate."
2. **Warm Contributors nurture completed.** It sat at 0 of 7 completed for three weeks; it now shows **7 of 7 completed** at 33.33% open. The stalled-flow flag from the last two runs is resolved. Open rate dipped 42.86% to 33.33% as the remaining sends landed, which is normal for a completing sequence.

**New flag:** the three **Stream router** automations are live but have between them enrolled only **2 subscribers**, and the **Leadership router has zero enrolments**. The poll that feeds them only went live this morning (2026-08-10 06:00), so this is expected to be early. But the Leadership branch having exactly zero while the other two each have one is the shape a mis-wired condition makes. Verify the Leadership branch actually fires before the poll's response volume builds, otherwise the mis-routing will be baked into the segment.

**Draft (stale clutter, unchanged):** "New 2025 Survey" (2025-01-21), "Test" x2 (2024-06-01, 2024-07-19), "Follow up on Data" (2024-07-19). Four dead drafts, none tied to a live capture page, so clutter rather than a funnel leak.

**Lead-magnet coverage gap (unchanged):** `/metrics-and-mayhem/free-chapter` still has no dedicated nurture automation named for it in the account. Given free-chapter just picked up its first organic impressions, this gap now matters more than it did.

## Surveys

3 surveys, all live. **No new responses since the last run**, all three counts and most-recent dates unchanged:

| Survey | Responses | Most recent |
|---|---|---|
| Shape Our Future (newsletter feedback) | 3 | 2025-02-03 |
| Welcome to Mastering Observability (subscribe) | 73 | **2026-04-16** |
| Unsubscribe feedback | 5 | 2026-07-20 |

**Standing flag, now longer:** the welcome/subscribe survey has had zero new responses for **just under 4 months**, across roughly 25 new subscribers in that period. Two runs have now flagged it. Confirm it is still actually served on signup rather than carrying the flag indefinitely.

**Contributor / collaboration pool:** unchanged at **27 Yes + 36 Maybe = 63 all-time**, only 4 ever personally outreached (the 17 Jun batch). Carried forward rather than re-derived, which is sound this run because there were no new survey responses to change it. The dynamic Warm Contributors segment stands at 59 members against 4 real 1:1 touches.
