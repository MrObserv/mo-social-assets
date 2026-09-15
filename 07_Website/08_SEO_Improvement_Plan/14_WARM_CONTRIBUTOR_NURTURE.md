# Warm Contributors nurture (draft for review)

**Owner:** Growth (drafted 2026-07-08). **Audience:** the `Warm Contributors` segment `seg_dcd86d30` (59 active: 27 said "Yes", 36 "Maybe" to contributing). **Status:** DRAFT copy for Al's review; publishing the live beehiiv automation is Al's call (Growth does not publish subscriber-facing flows). Filed alongside CR `GR-2026-07-08-03`.

**Why:** the first Warm-only Digest (`post_b75f259d`, 2026-07-01) got 40.35% open but **0.00% click** on 57 delivered. The segment likes Al enough to open; nothing pulled them to act. This flow converts the stated willingness into a real action, with ONE ask per email. **Reply-first by design** (a warm B2B segment converts on replies, not link clicks); Email 2 carries the single trackable link.

## Flow structure
- **Trigger:** subscriber enters `Warm Contributors` (or a one-time manual enrol of the 59).
- **Steps:** Email 1 (Day 0) -> wait 4 days -> Email 2 (Day 4) -> wait 6 days -> Email 3 (Day 10).
- **Exit:** if the subscriber replies or books, stop the sequence and tag `contributor-engaged`.
- **Cap:** max 1 enrolment; §5, §11 honesty, zero commercial heat.

## Email 1 — the easy ask (share a story)
**Subject:** You said you would help. Here is the easy bit.
**Preview:** One 3am story. That is the whole ask.

Hi {{first_name}},

When you subscribed you said you would be up for contributing. Thank you, that means a lot, and I have not made it easy to actually do it. Let me fix that.

The easiest way to help, and the most useful to me: tell me one story. A 3am incident, a call you had to make, a tool that saved you or let you down. Two lines is plenty.

Just reply to this email. I read every one, and the best ones shape a future Signal Drop or Digest, with your name on it or not, your call.

Allan

## Email 2 — the topic ask + call (Day 4)
**Subject:** What should I dig into next?
**Preview:** Pick a topic, or grab 15 minutes.

Hi {{first_name}},

A quick one. I am planning the next run of Tech Tuesday explainers and Digest deep dives, and I would rather cover what you actually need than what I assume.

So: what is the one observability topic you wish someone would explain properly, or the one you are wrestling with right now?

Reply with a word or two. If it is easier to talk it through, grab fifteen minutes with me here: [book a slot -> https://calendar.app.google/y2wSmwhGrkf8r5Xv5].

Either way, it goes straight into the plan.

Allan

## Email 3 — the article invite (Day 10)
**Subject:** Fancy your name on a piece?
**Preview:** A short guest contribution, done properly.

Hi {{first_name}},

Last one from me on this. A few of you said you would be up for writing or collaborating, so here is the offer, plainly.

If you have a lesson worth sharing, I will help you turn it into a short piece for the newsletter, with your name and a link to your work. You bring the experience, I do the shaping and the editing. No big commitment, a few hundred words is enough.

If that is you, reply with the rough idea and I will take it from there.

And if now is not the time, no problem at all. You are still exactly the kind of reader I write for.

Allan

---
§5-lint clean (0 em dashes). To go live: build as a beehiiv automation on `seg_dcd86d30` (Al publishes), or send Email 1 as a one-off to the segment to test reply rate first.
