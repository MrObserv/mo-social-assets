# Addendum: Segment Movement & Poll Replies - 2026-08-23

**Requested by Al ahead of the next scheduled Growth Health Check.** Reads segment sizes and engagement, plus every reply to the live polls, and separates what is working from what is not.

**Corrects a dating error:** the reports written earlier in this session were stamped `2026-08-17`. The actual run date is **2026-08-23** (verified against the system clock, Sunday). The run date was inferred from the Monday/Thursday cadence rather than checked. All three files have had their internal date corrected and carry a correction banner. Duplicate copies were deliberately NOT created, to avoid the two-files-one-truth drift CLAUDE.md §4 warns against.

**Action (Al): rename these three files on disk, no content change needed.**

- `_Health_Checks/2026-08-17_health_check.md` to `2026-08-23_health_check.md`
- `06_Search_Console_Reports/GSC_Report_2026-08-17.md` to `GSC_Report_2026-08-23.md`
- `05_Weekly_Beehiiv_Reports/Beehiiv_Report_2026-08-17.md` to `Beehiiv_Report_2026-08-23.md`

Note the GSC window itself genuinely ended 15 Aug, which is what Search Console returned live on a 23 Aug read. Also note this run was **off-cadence**: the spec is Monday plus Thursday, and it executed on a Sunday.

---

## 1. The finding that changes the diagnosis

Last run's flag said subscriber input is "not working" and was probably a serve problem. The poll data settles it, and the answer is better than feared.

**"Which do you want more of?" has had exactly ONE appearance.** It ran in a single send on 2026-08-10 and has not been shown since.

| When | Responses |
|---|---|
| 2026-08-10 (send day) | 8 |
| 2026-08-11 | 2 |
| 2026-08-12 to 2026-08-19 | 0 |
| 2026-08-20 | 1 |
| **Total** | **11** |

**73% of all votes arrived within 24 hours of the one time it was shown.** That is a healthy response to a single exposure, not apathy. The 1.8% "response rate" I reported against the full 558-subscriber list was measuring the wrong denominator: the poll was never put in front of 558 people.

**So the problem is exposure, not willingness.** Every conclusion built on "subscribers will not engage" needs rewriting. They engage fine when asked once. They have not been asked twice.

**Corroborating evidence:** the `Stream: preference not set (nudge)` segment was built specifically to receive a Thursday reminder to pick a stream. It has **grown** from 548 to 549, not shrunk. Two Thursdays have passed since it was built (13 and 20 Aug). The nudge send it exists for does not appear to have gone out.

## 2. Poll results

**"Which do you want more of?"** (`poll_9f31d69f`, published 2026-08-10, 1 appearance, 11 completions)

| Choice | Votes | Share |
|---|---|---|
| Both, keep them coming. | 5 | 45% |
| Technical deep-dives | 4 | 36% |
| Leadership takes | 2 | 18% |

The split is not a mandate for either stream. Nearly half explicitly want both, and Technical doubles Leadership. On this sample the honest read is that the audience does not want to be segmented as much as the programme assumes. Eleven votes is too thin to act on hard, which is another argument for re-running it rather than building on it.

**One piece of written feedback, and it is a direct product note:**

> "I would have appreciated in this email an example of articles for each option"

The reader was asked to choose between two labels with nothing attached to them. Fix before re-running: put one named piece under each option so the choice is concrete.

**"The Signal - Issue Rating (standing)"** (`poll_d99ab91d`, created 2026-08-21, 1 appearance, **0 completions**). Choices: Nailed it / Useful / Missed the mark. Too new to judge on response, but two things to note now:

1. It is already on the same track as the stream poll: created, shown once, no re-surfacing plan visible. It is named "(standing)", so it needs to actually stand.
2. **Voice flag: the poll's name contains an em-dash** ("The Signal — Issue Rating"). The §5 em-dash ban is global and register-independent. This is subscriber-visible in beehiiv. Rename to a colon or a comma.

**Router reconciliation gap:** the poll records **2 Leadership votes** (08-11 and 08-20) but the `Stream router: Leadership (poll)` automation shows **1 enrolment**. Technical shows 4 votes / 4 enrolments and Both 5 / 5, so those reconcile cleanly. One Leadership vote did not enrol. That is consistent with last week's suspicion about the Leadership branch and is worth one direct check now while the numbers are small enough to audit by hand.

## 3. Segment movement

**Read this table with a caveat.** The "move" column compares two reads taken **hours apart on the same day (2026-08-23)**, because the earlier snapshot in this session was the mis-dated one. Same-day flatness is therefore expected and is NOT by itself evidence of a stall. The genuine multi-week anchors, taken from prior health checks, are underneath the table.

| Segment | Members | Move | Open % | CTR % | CTR move |
|---|---|---|---|---|---|
| Stream: preference not set (nudge) | **549** | **+1** | 39.40 | 4.71 | -0.09 |
| Warm Contributors | 59 | flat | 37.89 | 8.49 | -0.16 |
| Profile Known (has occupation) | 59 | flat | 36.54 | 9.19 | flat |
| Practitioners (technical stream) | 26 | flat | 39.70 | 7.21 | flat |
| Leaders and Buyers (advisory target) | 15 | flat | 27.58 | **16.58** | flat |
| Stream: Technical & Practitioner | 10 | flat | 72.03 | **21.28** | **+0.40** |
| Vendor and Sales (EXCLUDE) | 9 | flat | 48.80 | 6.13 | flat |
| Stream: Leadership & Strategy | 8 | flat | **89.01** | **24.07** | **+1.34** |

**Multi-week anchors (the ones that actually carry weight):**

- **Warm Contributors has been 59 members since 2026-08-03**, across three health checks. Genuinely flat for three weeks, and its CTR is now drifting down (8.65 to 8.49).
- **The two stream segments hold 18 people between them (10 Technical, 8 Leadership) thirteen days after the poll ran.** The poll produced 11 votes; the segments are union-of-poll-preference-or-occupation-fallback, so they have barely moved beyond their occupation seed.
- **The nudge pool has never shrunk.** It was built 2026-08-09 to be drained by a Thursday reminder. Two Thursdays (13 and 20 Aug) have passed and it is larger, not smaller.

**This is the first snapshot of all eight segments recorded in a health check, so it becomes the baseline for real week-over-week movement from the next run onward.** That gap is itself worth noting: segment sizes have not been tracked run to run until now, which is why a stalled programme took three weeks to become visible.

## 4. What is working

1. **The stream segments are the most valuable audiences on the list by a distance.** Leadership & Strategy: 89.0% open, 24.1% CTR. Technical & Practitioner: 72.0% open, 21.3% CTR. Against a list average of 35.46% open and 5.19% CTR, that is roughly 2.5x the opens and 4x the clicks. Both improved their CTR this week while the broad segments drifted down. Self-selection is producing an extremely high-quality signal.
2. **Leaders and Buyers clicks at 16.58%, more than 3x the list**, on the segment explicitly built as the advisory target. The advisory audience is present and responsive inside the list. That sits alongside `/advisory` reaching GSC position 7.6 with zero clicks: the demand exists on both sides and the conversion path is what is missing.
3. **The poll mechanic itself works.** 11 votes and a written reply from one appearance, with 73% landing inside 24 hours.
4. **Vendor and Sales is correctly isolated** at 9 members with a distinct engagement profile, so advisory outreach can exclude sellers cleanly.

## 5. What is not working

1. **Nothing is being re-surfaced.** One appearance for the stream poll, one for the new rating poll, and a nudge segment that has never shrunk. This is the single root cause behind the "low response" reading, and it is a scheduling gap, not an audience gap.
2. **The Thursday stream nudge does not appear to have sent.** The segment built to receive it grew instead of shrinking across two Thursdays.
3. **The stream programme is stalled at 18 people** (10 Technical, 8 Leadership) against 549 unset, thirteen days after the poll ran. Any content decision made on an 11-vote sample is being made on 2% of the list.
3b. **Segment sizes were never tracked run to run**, which is why a three-week stall only became visible when Al asked for it directly. Fixed from here: the table above is the baseline.
4. **One Leadership poll vote did not reach its router** (2 votes, 1 enrolment).
5. **Warm Contributors flat at 59 for a fourth consecutive week**, still only 4 ever personally contacted. Its CTR is drifting down (8.65 to 8.49), which is what a nurtured-but-never-actioned list does.
6. **The new standing poll carries an em-dash in a subscriber-visible name**, against the global §5 ban.
7. **The stream poll gave readers no examples to choose between**, per the one written reply. Re-running it unchanged would repeat the flaw.

## 6. Recommended before the next scheduled run

1. **Re-surface the stream poll, with an example piece named under each option.** It is the cheapest fix available and it addresses the reader's own stated objection. Expect a similar burst per appearance.
2. **Confirm whether the Thursday nudge to `seg_b67292f1` is actually scheduled.** If it is not, that is the whole stream programme's fill mechanism missing.
3. **Reconcile the Leadership router**: 2 poll votes, 1 enrolment. Small enough to audit by hand today.
4. **Rename "The Signal — Issue Rating (standing)"** to remove the em-dash, and give it a defined re-appearance rule so "standing" is true.
5. **Treat the 11-vote split as directional only.** 45% want both and Technical doubles Leadership, which does not support a hard two-stream split yet.
6. **Stop reporting poll response as a share of total subscribers.** Report it per appearance. The current metric makes a working mechanic look broken.
