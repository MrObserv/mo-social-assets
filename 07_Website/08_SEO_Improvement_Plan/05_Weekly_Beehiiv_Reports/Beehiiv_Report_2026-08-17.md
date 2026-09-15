# Beehiiv Report - 2026-08-17

> **THE 2026-08-23 DATE CORRECTION IS WITHDRAWN (2026-08-24, Control, GR-2026-08-23-04).** A banner added on 2026-08-23 restamped this report as a 23 Aug run and asked for a rename. That was wrong. This is the **2026-08-17** on-cadence Monday run and **no rename is required**. The body settles it: the newest published post it lists is "Own the Signal, Rent the Platform" (16 Aug), so it cannot have been read on 23 Aug, by which point The Signal Issue 101 (21 Aug) and the AI SRE blog (23 Aug) had both shipped; and its 558 active subscribers is the figure the 2026-08-24 run carries as its prior, where the genuine 23 Aug reads returned 560. Segment and poll detail was extended separately in `_Health_Checks/2026-08-23_ADDENDUM_segments_and_polls.md`, which is genuine 23 Aug work and stands.

**Publication:** Mastering Observability (`pub_51d69527-d6a4-44db-9fca-9b6cf2fee3e4`).
**Window:** last 4 weeks (rolling). Previous run 2026-08-10.

---

## Subscribers and engagement

| Metric (last 4 weeks) | 2026-08-17 | 2026-08-10 | 2026-08-03 | 2026-08-01 |
|---|---|---|---|---|
| Active subscribers | **558** | 557 | 555 | 557 |
| Open rate | **35.46%** | 31.69% | 37.37% | 38.42% |
| Click rate | **5.19%** | 4.65% | 3.73% | 4.13% |
| New subscribers | 7 | 7 | 10 | 10 |
| Churned subscribers | 4 | 4 | 5 | 3 |
| Net subscribers | **+3** | +3 | +5 | +7 |
| Earnings | $6.10 | $6.10 | $6.10 | $6.10 |

**Open rate recovered 3.77 points**, clawing back two thirds of last week's 5.68 point fall and breaking the three-run decline (38.42, 37.37, 31.69, now 35.46). Click rate rose again to 5.19%, the highest reading in this log. Taken together this supports last run's read that the 08-10 drop was send-volume dilution from a three-send week rather than a content failure. Cadence moves this number.

Subscribers 558, an all-time high in this log by one. Net growth flat at +3 for a second run.

## New subscribers by acquisition source (4wk)

| Source | Count |
|---|---|
| recommendation: 7wdata.beehiiv.com / referral | 3 |
| website: direct / (none) | 2 |
| recommendation: www.project-overwatch.com / referral | 1 |
| embed: direct / (none) | 1 |
| **Total** | **7** |

**LinkedIn contributed zero signups.** It led with 5 of 10 two runs ago, fell to 2 of 7 last run, and is now 0 of 7. The **beehiiv recommendation network is 4 of 7 (57%)** and has added a second referring publication (project-overwatch, new this run).

This is not a reach problem. Beehiiv website analytics show LinkedIn referral sessions **rose** from 46 to 56 over the same period. LinkedIn is sending more people than before and converting none of them.

## Website analytics (4wk vs prior 4wk)

| Metric | Total | Previous | Change |
|---|---|---|---|
| Unique visitors | 188 | 173 | +8.7% |
| Sessions | 284 | 235 | +20.9% |
| Page views | 545 | 561 | -2.9% |
| Bounce rate | **48.59%** | 37.45% | worse |
| Avg session duration | **72.03s** | 150.53s | -52.1% |

**Bounce rate has worsened four runs running: 38.22, 41.45, 44.59, 48.59.** Session duration fell from 111.3s (as reported 08-10) to 72.03s, down 35%. Traffic up, attention down.

### Top pages by page views

/ (144), poll results (30), Ep25 Gate Stays Human podcast (30), /p/observability-maturity-assessment (25), /metrics-and-mayhem/book (23), /metrics-and-mayhem/free-chapter (22), /products/metrics-mayhem-chapter-4 (18), /metrics-and-mayhem/podcast (17), /p/quiet-isnt-good-justify-observability-spend (16), /advisory (15), /subscribe (15), /p/lead-with-the-promise (15), /p/what-is-opentelemetry-profiling (15), /p/how-to-lead-an-incident-response-team (15), /p/observability-digest-july-2026 (13), TT02 podcast (10), /p/what-is-a-wide-event (5, published 08-13).

**Money pages on-site:** free-chapter 35 to 22 (-37%), advisory 24 to 15 (-38%), chapter-4 20 to 18, book 20 to 23 (the only one up).

### Top referrers (sessions)

Direct 172, linkedin.com 33, LinkedIn Android 23, google.com 19, self-referral 8, beehiiv.com 7, reddit.com 5, ecosia.org 3, **substack.com 3 (new)**, facebook.com 2, static.microsoft 2, Gmail Android 1, google.de 1, t.co 1, cto.academy 1, youtube.com 1, bing.com 1.

## Posts

**Published posts: 137** (was 134). Three new since the last run:

- "Lead with the promise, not the plumbing" (08-10)
- "What Are Wide Events? Observability 2.0, Without the Hype" (08-13) - the TT04 written anchor, `post_8a507a98`
- "Own the Signal, Rent the Platform" (08-16) - `post_ab7858c3`

**Signal Drop: 23 posts tagged `signal_drop`, minus the still-live duplicate = 22 unique live episode pages** against a target of 17. No new Signal Drop this period. The duplicate "Your Role Changes Every Hour" (`post_0cbfa4e6` plus `post_47600cdf`) is live on both IDs, **fourth run flagged**.

## Automations

**11 automations: 7 live, 4 draft.** (Correction to the last two runs, which recorded 6 live / 5 draft. Re-derived from `list_automations` state fields.)

| Live automation | Trigger | Enrolled | Completed | Open % | Click % |
|---|---|---|---|---|---|
| Survey Follow up | signup | 308 | 306 (2 in progress) | 53.82% | 16.05% |
| Stream router: Both (poll) | poll_submission | 5 | 5 | 60.0% | 0% |
| Stream router: Technical (poll) | poll_submission | 4 | 4 | 50.0% | 0% |
| Stream router: Leadership (poll) | poll_submission | 1 | 1 | 0% | 0% |
| Lead magnet automation | purchased_product | 8 | 8 | 12.5% | 0% |
| Warm Contributors nurture | segment_action | 7 | 7 | 33.33% | 0% |
| Send Sub Form | manual | 0 | 0 | n/a | n/a |

**Drafts (4):** New 2025 Survey (2025-01-21), Test (2024-07-19), Test (2024-06-01), Follow up on Data (2024-07-19). None tied to a live capture page, so clutter rather than a funnel leak.

**Leadership router flag eases:** 0 to 1 enrolment, so the branch fires and is not dead wiring. Split is now Both 5, Technical 4, Leadership 1. Watch one more run.

**Funnel leak, carried:** `/metrics-and-mayhem/free-chapter` is live, took 22 page views and now surfaces organically, and still has **no dedicated nurture automation**. GR-13-02 open.

**Watch item, carried:** the chapter-4 lead-magnet automation delivers (8 of 8), is read occasionally (12.5% open) and converts nobody (0% click).

## Segments

| Segment | Members | Open % | CTR % |
|---|---|---|---|
| **Stream: preference not set (nudge)** | **548** | 39.56 | 4.80 |
| Profile Known (has occupation) | 59 | 36.54 | 9.19 |
| Warm Contributors | 59 | 38.13 | 8.65 |
| Practitioners (technical stream) | 26 | 39.70 | 7.21 |
| Leaders and Buyers (advisory target) | 15 | 27.58 | **16.58** |
| Stream: Technical & Practitioner | 10 | 72.51 | 20.88 |
| Vendor and Sales (EXCLUDE from advisory) | 9 | 48.80 | 6.13 |
| Stream: Leadership & Strategy | 8 | **89.02** | **22.73** |

**New flag: the stream poll has been answered by roughly 10 of 558 subscribers.** 548 sit in "preference not set" a week after the poll went live. The stream-segmentation programme (GR-08-03) is currently running on a 1.8% response rate.

**Worth noting:** the two stream segments are by far the most engaged cohorts on the list (Leadership 89% open / 22.7% CTR, Technical 72.5% / 20.9%), and "Leaders and Buyers" clicks at 16.58% against a list average of 5.19%. The people who self-select are three to four times more engaged than the list. That makes the low poll response a bigger loss than the raw number suggests.

## Surveys

3 surveys, all live. **No new responses since the last run.**

| Survey | Type | Responses | Most recent |
|---|---|---|---|
| Shape Our Future (newsletter feedback) | standalone | 3 | 2025-02-03 |
| Welcome to Mastering Observability | subscribe | 73 | **2026-04-16** |
| Unsubscribe Feedback | unsubscribe | 5 | 2026-07-20 |

**Standing flag, fourth run:** the welcome/subscribe survey has had zero responses for four months, across roughly 32 new subscribers. Set against the stream poll's 1.8% response rate, two separate subscriber-input mechanisms are both returning near-zero. More likely a serve/placement problem than two independent cases of disinterest.

**Contributor / collaboration pool:** unchanged at 27 Yes plus 36 Maybe = 63 all-time; only 4 have ever had a personal 1:1 touch (the 17 Jun batch). Warm Contributors segment 59 members. The gap between "said yes" and "got contacted" is 59 people and has not narrowed in nine weeks.
