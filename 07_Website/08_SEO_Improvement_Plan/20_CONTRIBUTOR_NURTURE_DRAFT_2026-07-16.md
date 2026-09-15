# Contributor Nurture + Lead-Magnet Email — Growth Draft

**Run:** 2026-07-16 (Growth). **Source CR:** GR-2026-07-08-03. **Status:** DRAFT copy for Al/Control to load as a Beehiiv automation. Growth drafts; publishing the live automation is Al's call. Do NOT auto-send.

**Audience:** the Warm Contributors segment (`seg_dcd86d30`, ~59 members) = the 27 "Yes" + 36 "Maybe" who said they would contribute, **minus** anyone in `15_WARM_CONTRIBUTOR_TRACKER.md` (Ahmed Elbendary, Sunil Pandit, Nagasivakumar, Carlos Romero). Those four had a 1:1 note and must be excluded from this blast per the tracker rule.

**The problem this fixes:** the first Warm-only Digest was 40.35% open, **0.00% click**. They open and read, then nothing asks them to act, or too many things do. The fix is one email, one ask, one link, no digest clutter.

---

## Why the click was zero (the design rule)

A digest gives ten things to maybe do, so the reader does none. A nurture email gives **one** thing, framed as easy, with the ask in the first two lines and again at the end. Every email below carries a single CTA and nothing competing with it. No newsletter footer, no "read more" list, no book plug stacked on top. One job per send.

---

## Flow A — Contributor invite (2 emails)

### Email A1 — "The three-minute version"

**Send:** to the segment (excluding the tracker four).
**Subject:** The war story you said you'd share
**Preview text:** No essay. Three minutes and a reply.

Hi {{first_name}},

A while back you said you would share something from the trenches. I never made it easy, so here is the easy version.

I am collecting the failures that do not show up on the dashboard. The ones where every graph was green and the system was quietly on fire. If you have one, I want it.

You do not need to write it up. Just reply to this email with the shape of it:

- what looked fine
- what was actually happening
- how you found out

Three lines is plenty. I will do the writing, send you the draft to approve, and it goes out with your name on it if you want the byline, or unattributed if you would rather.

That is the whole ask. Reply to this email.

Al

*Single CTA: reply. No link to not-click. Byline offered as the payoff.*

---

### Email A2 — the nudge (+5 days, to non-repliers only)

**Send:** 5 days after A1, to anyone in the segment who has not replied.
**Subject:** Still after your green-dashboard story
**Preview text:** One reply, three lines, your name on the result.

Hi {{first_name}},

Quick nudge on this one. I am still short a few real stories of the kind where the dashboard lied and someone paid for it later.

If one came to mind when you read the last note, send me the three-line version now and I will turn it into a piece with your name on it. If nothing fits, no problem at all, and I will stop asking.

Reply here whenever it lands.

Al

*Same single CTA. The "I will stop asking" line respects them and lifts reply rate.*

---

## Flow B — Lead-magnet email (free chapter)

Separate, lighter-touch send for the warm list who are not ready to contribute but will take something of value. One link, click-tracked, so it also repairs the measured 0% click.

### Email B1 — "The chapter, free"

**Subject:** The chapter people keep emailing me about
**Preview text:** Free, no gate, one link.

Hi {{first_name}},

The part of Metrics and Mayhem that gets the most replies is the chapter on why healthy dashboards and unhealthy systems live side by side. I have put it up free, no form, no catch.

If you read one thing this week, read this:

**[Read the free chapter]({{free_chapter_url}})**

If it lands, the rest of the book is where that came from. If it does not, you have lost five minutes and gained one idea.

Al

*Single CTA button, one tracked link. `{{free_chapter_url}}` = the /subscribe free-chapter lead-magnet page (confirm the canonical URL with the conversion-gap work, doc 18).*

---

## Load notes for Al / Control

1. **Automation shape:** trigger on entry to `seg_dcd86d30`; A1 immediately, A2 at +5 days gated on "has not replied". Flow B can run as a one-off broadcast to the warm segment, or as a third step for anyone who did not reply to A1/A2.
2. **Exclusion:** add the four tracker contacts to the automation's exclude set (or exclude by a "personally-outreached" custom field). This is the standing rule from `15_WARM_CONTRIBUTOR_TRACKER.md` and GR-2026-07-08-04.
3. **Reply handling:** every A-flow reply is a live contributor. Log it in `15_WARM_CONTRIBUTOR_TRACKER.md` at receipt (per GR-2026-07-08-04) so a reply never gets a follow-up blast on top of a personal thread.
4. **Measurement:** watch reply rate on Flow A (the real success metric, not click) and click rate on Flow B (the tracked-link repair). Fold both into the Growth Health Check.
5. **§5:** UK English, no em dashes, defensible. "Gets the call" vocabulary respected. Voice is Allan's Conversational register.

---

*Copy is paste-ready. No live automation created; that is Al's publish decision on the Beehiiv account.*
