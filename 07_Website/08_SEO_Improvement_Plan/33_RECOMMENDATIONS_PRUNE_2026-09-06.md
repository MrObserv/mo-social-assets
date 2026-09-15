# Recommendations prune

**Written 2026-09-06 by the website build satellite, per `07_Website/_WEBSITE_BUILD_BRIEF.md`.**
**Decision by Al, 2026-09-06: keep three, remove the rest, decline the pending invite.**

Nothing has been applied. Al applies every change in beehiiv. Section 3 is the rollback: it records the complete live state of all 16 outgoing recommendations as read on 2026-09-06, per `03_CHANGE_CONTROL_SOP.md` step 2.

---

## 1. Why this is a prune and not a switch-off

The post-signup recommendations step was first flagged in `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md` as a possible leak, on the reasoning that new subscribers were being shown other publications before receiving anything. Al's initial call was to turn it off. A live read of the outgoing recommendations changed that decision, and the reasoning is recorded here because the earlier framing was wrong.

**Both incoming recommendation partners are reciprocal.**

| Partner | Referred out by Al | Referred in to Al | Net |
|---|---|---|---|
| Project Overwatch | 23 | 66 | +43 |
| Ins7ghts (7wdata) | 0 | 4 | +4 |

Project Overwatch alone accounts for roughly 12% of the 561-strong list, at nearly three subscribers received for every one sent. Switching the step off removes Al's side of both arrangements.

**It is also the only revenue line.** Boosted recommendations have earned 4,472 cents ($44.72) lifetime. The $12.47 recorded against the publication for the trailing three months comes from here. There is one other product in beehiiv, Chapter 4, priced at £0.

**The welcome path is unaffected either way.** `aut_fdd8e3d1` delivers Chapter 4 by email 15 minutes after signup regardless of what the signup flow shows.

So the problem was never that recommendations are shown. It is that 16 recommendations, most of them dead or off-audience AI newsletters, were the first thing an observability subscriber saw.

---

## 2. The change

**Keep (3), resequenced to positions 1 to 3:**

| Position | Publication | Recommendation ID | Rationale |
|---|---|---|---|
| 1 | Project Overwatch | `62f3fc7c-6008-46b9-afc2-10b3d3f87013` | Reciprocal, highest yield, on-audience (CISO, resilience). Carries Al's own written reason. |
| 2 | Ins7ghts | `0e35450c-6a11-44d4-97ca-af7fbbc57b3e` | Reciprocal, on-audience (data and AI for business leaders). |
| 3 | Leadership Pulse | `3b431496-3308-4f73-af04-74950fb5fde0` | On-audience ("for leaders under pressure in high-stakes industries"), 2 referred. |

**Decline (1):** Inside/VC, `c643d1b2-7546-490f-950e-7823c6c2038c`, status `invited`. A venture capital newsletter, off-audience for IT and engineering leaders.

**Remove (10):** every remaining row in section 3 not listed above. Two further rows already carry status `removed` and need no action.

**Cost of the change, stated for the record.** Removing MGMT Playbook gives up the largest single boost earner: `active`, 13 referred, 2,240 cents earned, 200 cents per lead. That is roughly half of all boost income to date. Al was shown this figure before deciding and chose to remove it on audience-fit grounds. Recorded as intended, not as an oversight.

Expected revenue effect: boost income falls towards zero, since the three kept recommendations are all unboosted. Expected acquisition effect: neutral to positive, because the two reciprocal relationships that supply incoming subscribers are preserved and the list a new subscriber sees becomes relevant.

---

## 3. Rollback: complete live state, 2026-09-06

To revert, restore these rows with these statuses and positions.

| # | Publication | Recommendation ID | Status | Boosted | Pos | Referred | CPL (cents) | Earned (cents) | Action |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Inside/VC | `c643d1b2-7546-490f-950e-7823c6c2038c` | invited | no | 1 | 0 | n/a | n/a | **Decline** |
| 2 | Leadership Pulse | `3b431496-3308-4f73-af04-74950fb5fde0` | active | no | 2 | 2 | n/a | n/a | **Keep, pos 3** |
| 3 | Techpresso | `b78b10b6-4084-4dd0-9494-a3649b5faed5` | active | no | 3 | 0 | n/a | n/a | Remove |
| 4 | Ins7ghts | `0e35450c-6a11-44d4-97ca-af7fbbc57b3e` | active | no | 4 | 0 | n/a | n/a | **Keep, pos 2** |
| 5 | Mindstream | `445373a8-d41b-4b6c-97a8-e0b7db347a03` | insufficient_funds | yes | 2 | 1 | 300 | 240 | Remove |
| 6 | Turing Post | `5d5d034d-7f9e-4ceb-a73d-9222c9574def` | paused_by_you | yes | 4 | 0 | 100 | 0 | Remove |
| 7 | BuzzRobot | `8679e7be-259e-4040-840f-5b455fda907a` | insufficient_funds | yes | 6 | 0 | 250 | 0 | Remove |
| 8 | Connecting Dots | `8984d5f4-c1c3-4071-9b1b-1c3e968530ae` | insufficient_funds | yes | 5 | 1 | 300 | 240 | Remove |
| 9 | simple.ai | `e91d86d2-7444-4bf1-b652-893760cd7f49` | insufficient_funds | yes | 5 | 2 | 300 | 480 | Remove |
| 10 | RoverLead AI | `5147b4da-0f5f-4800-8002-fe72c94c4904` | paused_by_them | yes | 1 | 2 | 120 | 288 | Remove |
| 11 | The Artificially Intelligent Enterprise | `10f9e877-f676-4c59-84bc-b90c56a8b795` | paused_by_you | yes | 7 | 1 | 125 | 100 | Remove |
| 12 | MGMT Playbook | `104829d9-a8e9-4e46-a781-587b60c4148c` | active | yes | 1 | 13 | 200 | 2240 | Remove |
| 13 | A Byte of Coding | `33e0f141-1b44-47f9-8d90-0724c0ce6010` | insufficient_funds | yes | 3 | 1 | 200 | 160 | Remove |
| 14 | LLMs Research | `d4310314-0043-4be6-9bd8-c60fe555c150` | removed | yes | 9 | 1 | 205 | 164 | None, already removed |
| 15 | Daily AI Brief | `4d9204e6-e718-4e5e-b58e-9bc6cdc4e884` | removed | yes | 8 | 14 | 50 | 560 | None, already removed |
| 16 | Project Overwatch | `62f3fc7c-6008-46b9-afc2-10b3d3f87013` | active | no | 6 | 23 | n/a | n/a | **Keep, pos 1** |

Project Overwatch's reason text, to preserve verbatim if the row is ever rebuilt:

> Simon is a great writer and well respected in the CISO community a must read.

**Incoming recommendations, unchanged by this and recorded for completeness:**

| Recommending publication | ID | Status | Referred in |
|---|---|---|---|
| Project Overwatch | `487e4ce7-5547-4d6b-b5aa-f7e20392a8e6` | active | 66 |
| Ins7ghts | `501aed9f-f5bb-43d2-9aa5-a7b241eb5920` | active | 4 |

**Signup flow, unchanged by this and recorded for completeness:**

`f4d90f63-ff08-4acf-9353-9e6a1e2a3ba5`, "Recommendations Flow", default true, one step: `https://www.masteringobservability.com/?modal=recommendations`, `external: false`, `modal_param: recommendations`, `show_navigation: false`, `redirect_back_to_start: false`. **This flow stays as it is.** The decision changes what the modal contains, not whether it runs.

---

## 4. Verify (SOP step 4)

After Al applies the change, re-pull `list_recommendations` with `direction: outgoing` and confirm:

- Exactly three rows return `status: active`: Project Overwatch, Ins7ghts, Leadership Pulse
- Inside/VC no longer returns `status: invited`
- `list_recommendations` with `direction: incoming` still returns Project Overwatch and Ins7ghts as `active`

That last check matters most. If either incoming partner flips to `removed` or `paused_by_them` in the weeks after this change, the reciprocity assumption was wrong and the prune should be reconsidered.

---

## 5. Not done, and why

- **Not applied.** House rule: nothing sends, publishes, schedules, deletes or spends. Al holds every irreversible action. Removing a recommendation affects a third-party publisher relationship, so it is his to make.
- **Not run:** `s5_lint.py`, since `G:` does not mount in this container's shell. Em dashes checked by hand across this file: zero.
- **Not reconciled** against `28_WEBSITE_BASELINE_AUDIT_2026-07-26.md`, `29_BRAND_SAFE_WEBSITE_CHANGE_PACK_2026-07-26.md` or `04_CHANGE_LOG.md`, which remain unread by this session.
- **Note for `00_FUNNEL_MAP_AND_TRACKER.md`:** its ACQUIRE section records "The 'recommendation' acquisitions are beehiiv Boosts, not this" against the referral program row. That is accurate for the referral programme (`mile_48d50b8e`), but the two incoming recommendations recorded above are unboosted, so they are recommendations rather than paid Boosts. Worth a correction in that row when the Growth lane next touches it.
