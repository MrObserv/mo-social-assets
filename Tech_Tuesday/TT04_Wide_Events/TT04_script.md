# Tech Tuesday #4 — Wide Events: What Observability 2.0 Actually Means — RECORD-READY SCRIPT

**Status:** RECORD-READY (built 2026-07-18, Podcast Ideas). Built to Voice Codex **v1.9.34**. **Register:** codex §1.5 Fifth Gear (Explainer), Six-Beat, **NO Hard Stop, NO Q&A**.
**Length:** ~2,200 spoken words, **~16-17 minutes** at Allan's read pace (~133 wpm) — meets the >=15 min rule (PI-2026-07-15-04), dense, promise-first.
**§5 self-lint:** 0 em dashes · UK English · no "page/paged/pager" · no vendor numbers stated as Allan's fact.
**Signature moves deployed (v1.9.34 catalogue of 12):** 1 Teacher stance · 2 "still with me?" check-in · 3 Analogy as workhorse (**returns at the close**) · 4 Named parts · 5 Honest caveat · 6 Audience split · 7 Generous close · 8 Zero Hard Stop · 9 Progressive Disclosure (beat 4 names each part before unpacking) · **10 Recursive Refinement** (beat 5) · **11 Contrarian Consensus by name** (public positions only) · **12 Builder-shape close**.
**On-turf gate (§1.5):** PASSES natively. This is the observability data model itself, and the cost-versus-flexibility call at the table is the leadership hook.
**§11 honesty boundary:** this is a LIVE, contested argument, not settled fact. Allan's authority is the operational trade-off read, never a partisan "the pillars are dead" claim. Move 11 guardrail observed: only publicly stated positions are cited, credited by name, disagreeing with the position and not the person.
**Trio lock:** title "Wide Events: What Observability 2.0 Actually Means" · A/B alt "Are the Three Pillars Dead?" · thumbnail = three pillars collapsing into one wide record, **ONE WIDE EVENT**, mint payoff word **WIDE EVENTS**.

---

## DELIVERY (read this before you record)

Riverside teleprompter + spacebar. This is a read, not a recital — let it breathe.

- **Only the cold open, the locked intro, and the locked outro are verbatim.** Everything between is shape + anchors: say it in your own words if a phrase feels stiff, the meaning is what matters.
- **Record in 1-2 minute chunks.** Each `▌BEAT▌` marker is a clean stopping point — pause the prompter, reset, carry on. No need to nail 16 minutes in one take.
- **Look away at every `⟢`** and at each `▌BEAT▌` boundary. Drop your eyes off the prompter, say the line to the camera, come back. The blank lines are your breath points.
- **Read ahead, then deliver.** Eyes take the next line, then look up and say it — don't read and speak at the same time.
- **Keep a few ums.** One stumble left in reads as human; a flawless read reads as AI. Don't scrub every breath.
- **Slow right down on cardinality** (Beat 4, part two). It is the concept the whole argument turns on.

---

# THE SCRIPT

```
▌COLD OPEN — 0:00, ~20s ▌
Right.
You were taught to instrument with three pillars. Metrics, logs and traces.
And at three in the morning, the question you did not predict is scattered across three tools that do not talk to each other.
Today I want to show you the argument that says those three pillars were never the right primitive in the first place.
And then I want to tell you honestly whether I think the people making it are right.
```

**[LOCKED TT INTRO, ~10s]**

You're listening to Tech Tuesday from Metrics and Mayhem.

Ten minutes to make sense of one thing that landed this week.

Whether you're in the pit or at the table.

---

▌BEAT 1 — Problem-first setup ▌

*Spoken transition label:* So here is where we are.

It is three in the morning and something is wrong. Not catastrophically wrong. Wrong in the way that is much harder to deal with.

Your error rate is up. Not everywhere. Just up.

And the question you actually need answered is a very specific one. Is this hitting every customer, or a handful? Is it only on the new checkout path? Only on mobile? Only in one region? Only for accounts created since the migration?

And here is the thing about that question. It was not on any dashboard.

Nobody predicted it, because nobody could have. That is the nature of the interesting failures. They arrive as a combination nobody thought to graph in advance.

So you do what we all do. You go to your logs, and you grep, and you find something that looks suspicious. Then you go to your tracing tool and hunt for a slow span that might be related. Then back to metrics to see whether the shape matches.

Three tools. Three query languages. Three browser tabs.

And you are the integration layer. You are holding the customer ID in your head, copying it between windows, trying to keep the thread of a story that is scattered across three systems that were never designed to talk to each other.

But that is not even the worst part.

The worst part is that your metrics already threw away the answer.

Because somewhere along the line, somebody looked at the cost of your metrics and did the responsible thing. They stripped out the high-cardinality fields. The customer ID. The build version. The region. The feature flag.

Perfectly sensible cost decision. And it means the detail you now desperately need was in the data at the moment it was collected, and got deleted before it was ever stored.

You are not missing the answer because nobody looked. You are missing it because it was aggregated away in a cost review eight months ago.

---

▌BEAT 2 — The one belief-line ▌

*Spoken transition label:* So here is the sentence the whole argument rests on.

The primitive should be one wide, structured event per unit of work.

And the pillars should be derived from it, not collected separately.

---

▌BEAT 3 — The load-bearing analogy ▌

*Spoken transition label:* Now let me give you the picture, because this is the one that makes it click.

Imagine something goes badly wrong in a building, and there were three witnesses.

The first one only watched the doors. She can tell you exactly how many people went in and out, and how fast. That is your metrics. Counts and rates, very precise, no context.

The second one only heard what was shouted. He can tell you what was said, at what time, but not who was where. That is your logs. Rich in detail, but only the details somebody chose to say out loud.

The third only tracked how people moved from room to room. She can tell you the path, and where things slowed down. That is your traces.

Now, every one of those witnesses is honest. Every one is accurate. And every one saw a fragment.

So to work out what actually happened, you interview all three, you write it down, and you try to stitch three partial accounts into one story. And you can only ever ask each witness the questions their vantage point allows.

Now imagine instead you had one witness who saw the whole thing. Start to finish. Who noticed who was there, what they were carrying, what time it was, which door they used, and how it ended.

And crucially, a witness you can keep questioning. Ask one question, hear the answer, and let that answer suggest the next question.

That is a wide event. One rich account of what happened, that you can interrogate afterwards.

Not three fragments to reconcile at three in the morning. One witness who saw the whole thing.

Hold on to that, because we are coming back to it.

⟢ *look away — land this one to camera, then pause the prompter and reset*

---

▌BEAT 4 — Named parts ▌

*Spoken transition label:* Right. Named parts. Four of them, in this order.

**One. The wide event.**

A wide event is a single structured record for one unit of work. One request, one job, one transaction.

That is the whole definition, and it is worth sitting with before we go further.

What makes it wide is how much you put on it. Not five fields. Hundreds. The customer ID, the region, the build version, every feature flag that was on, how long the database took, how long the external call took, the endpoint, the device, whether it errored and how.

Everything you knew at that moment, attached to one row.

It is not a log line, and it is not a metric. It is the full context of one thing that happened.

**Two. Cardinality.**

This is the word that decides the entire argument, so let me define it plainly.

Cardinality is simply how many distinct values a field can have. Region is low cardinality, you have a handful. Customer ID is very high cardinality, you might have millions.

And traditional metrics systems struggle badly with high cardinality, because of how they store things. They pre-aggregate. Every unique combination of labels becomes its own series to keep, and the cost climbs steeply as you add dimensions.

So teams do the rational thing and strip the high-cardinality fields out.

Which are, of course, exactly the fields that let you answer "which customer" and "which build" and "which region".

So hold both halves of this. High cardinality is where the answers live. It is also where the cost lives. That tension is the whole story.

**Three. Observability 2.0, which really means derive rather than collect.**

Here is the actual architectural claim, stripped of the marketing.

Instead of collecting three separate things, you store one thing. The wide events. And then your metrics and your traces become views computed over that store when you ask for them.

You stop collecting the pillars. You start deriving them.

That is it. That is the whole of what people mean by observability 2.0.

**Four. Query after the fact.**

And this is the payoff, the reason anybody bothers.

Because the raw detail is still sitting in the events, you can ask a question nobody designed for. At three in the morning. About a combination nobody predicted.

You do not need to have known the question in advance. That is the capability you are actually buying.

Still with me? Good. Because now I have to be honest about the other side.

⟢ *look away — this is the pivot to the honest half, say it straight to camera*

---

▌BEAT 5 — Honest caveat before the hype ▌

*Spoken transition label:* Because this is a live argument, not a settled fact, and I am not going to pretend otherwise.

Let me credit it properly first.

The clearest public advocates of this position are Charity Majors and the Honeycomb crowd. She has argued it publicly for years, in her writing, in her talks, and in the book she co-authored on the subject.

And credit where it is due. She was making this case long before it was fashionable, and a good deal of the vocabulary the rest of us now use casually came out of that work.

So when I push back, understand that I am pushing back on the position, not the person.

And here is where I differ. The framing that the three pillars are dead is, in my view, too strong for most estates I have worked in.

Now, I have to correct my own advice here too, because for years the rule I gave people was straightforward. Instrument with the three pillars. That is the standard, get on with it.

That rule has a failure mode, and the failure mode is precisely the three in the morning we opened with. You pre-aggregate for cost, you lose the high-cardinality detail, and then you cannot answer the question nobody predicted.

So the rule updated. Keep the pillars where they genuinely earn their place. But stop treating pre-aggregated metrics as the place your detail lives, because it is not, and it never was.

Wide events for the questions you cannot predict. Pillars for the ones you can.

⟢ *look away — this is the line that resolves the whole argument, let it sit*

Two more honest things, quickly.

The first is cost. Wide events are not free. Storing a rich record for every single request has a real bill, and it is worth noticing that the vendors making this argument most loudly are also, generally, the people who would store it for you. That does not make them wrong. It just means you should do your own maths.

The second is maturity. If your team knows Prometheus and Grafana and nothing else, moving to an events-first model is a retraining project, not a configuration change. Budget for the people, not just the platform.

---

▌BEAT 6 — Audience-split takeaway + generous close ▌

*Spoken transition label:* So what do you actually do with this?

**If you are in the pit.**

Do not rewrite your instrumentation. That is a two-year project and it will die in month four.

Take one endpoint. Your most critical one. And emit one wide event per request alongside what you already have. Everything you know about that request, on one row, high-cardinality fields included.

Then the next time you have an incident on that path, try to answer it from the events alone.

That one experiment will teach you more than any amount of arguing about data models on the internet.

**If you are at the table.**

This is a cost-versus-flexibility decision, and it is not a religion.

Pre-aggregated metrics are cheap and they answer questions you already knew to ask. Wide events cost more and they answer the ones you did not.

So the question to put to your team is simply this. What fraction of our three in the morning hours goes on questions nobody designed a dashboard for?

Because if the honest answer is most of them, you are already paying for that flexibility. You are just paying for it in engineer hours instead of storage, and engineer hours at three in the morning are the most expensive hours you buy.

**And if you took this seriously, here is what you would actually build.**

Not a migration. A default.

You would decide that every new service emits one wide event per unit of work from the day it is written. Not retrofitted later, not as a special project. As the shape of how you instrument, by default.

You would keep the high-cardinality fields on it, deliberately, because those are the fields that answer the questions that matter.

And you would put one rule around cost, because cost is what erodes this. You never strip a field to save money without writing down which question you have just made unanswerable.

Do that, and you stop having to choose sides in this argument at all. You have the raw material for both.

**And take the analogy with you.**

Because you are not really choosing between tools here.

You are choosing how many witnesses you get, and how long you get to question them.

Three witnesses who each saw a fragment. Or one who saw the whole thing, and will still answer questions at three in the morning.

Steal that framing for your next architecture review. You do not have to credit me.

⟢ *look away — warm, generous close to camera, then a beat of silence before the outro*

---

**[LOCKED OUTRO — read verbatim]**

That's Tech Tuesday.

I'm Allan Mann.

If you liked this, the book is out. Metrics and Mayhem, a CTO's guide to observability that actually works.

Kindle, paperback, hardback, all live.

Free chapter at masteringobservability.com slash subscribe.

See you next Tuesday.

---

## Production notes

- **Fairness is the credibility of this episode.** Beat 5 must not read as a hit piece. Credit the public advocates warmly, then differ on the position only.
- **Move 11 guardrail:** only publicly stated positions cited. No private interactions, no imputed positions, no confidential sources.
- **Pace:** slow down on cardinality (beat 4, part two). It is the concept the entire argument turns on and the one a mixed audience most often loses.
- **Thumbnail:** terminal-motif default, three pillars collapsing into one wide record, mint payoff word WIDE EVENTS.
- **Waterfall:** clips + a YouTube **Community poll** ("three pillars or wide events?") — debate posts drive community-tab impressions.
- **Cross-link:** TT03 (Profiles) and the written anchor `what-is-observability-2-0`.
