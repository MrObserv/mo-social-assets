# Growth Pipeline Execution Pack

**Built:** 2026-07-24 (Growth console). **Purpose:** clear the whole consultancy-pipeline backlog in one reviewable pack. Every item below is either DONE, STAGED (built, waiting on your go for a send/publish), or DRAFT (copy ready for your review before I build it in Beehiiv).

**Voice:** all copy here is written to Voice Codex §5 (no em dashes, UK English, no page/pager vocab, defensible numbers only). Read the codex from `02_Voice_Codex/Current/` before any final ship.

**Standing safety rule (unchanged):** I do not send, publish, or enrol anyone without your explicit "go". Booking links stay gated. Every send below tells you exactly how many people it hits.

---

## 1. P3a — Warm nurture (live but 0 enrolled) — DIAGNOSED, fix STAGED

**Root cause:** the automation is fine. Beehiiv's `segment_action` trigger only enrols a subscriber who *enters* the segment *after* the automation went live (14 Jul). All 59 Warm Contributors were already in the segment on that date, so none ever triggered. That is why it reads 0 enrolled, not a broken flow.

**The 3 emails** (reviewed, send-ready, §5-clean):
1. "You said you would help. Here is the easy bit." — one 3am story, reply-first.
2. "What should I dig into next?" — pick a topic, or a 15-min booking slot (canonical: `https://calendar.app.google/y2wSmwhGrkf8r5Xv5`; Calendly is retired).
3. "Fancy your name on a piece?" — short bylined guest contribution.

**Fix (needs your go — this is a real send):**
- Enrol the **55 nurture-eligible** warm contributors: the 59-member segment `seg_dcd86d30` **minus the 4 already in personal outreach** (Ahmed Elbendary, Sunil Pandit, Nagasivakumar, Carlos Romero — per `15_WARM_CONTRIBUTOR_TRACKER.md`, which excludes tracker rows from the generic blast).
- Mechanism: I will build a one-off segment `Warm Contributors (nurture-eligible)` = `(role Yes/Maybe) AND active AND email NOT IN (the 4)`, then bulk-enrol its members into the automation (enrolment bypasses the trigger). If Beehiiv has no bulk "enrol segment" action, I enrol them individually via the Subscribers page, same method used for the 7 free-chapter buyers.
- Going forward the automation keeps working for anyone who *newly* says Yes/Maybe, so this is a one-time catch-up only.

**Your call:** go / hold / small test batch first (5-10, then the rest).

---

## 2. P1b — Signup leak — DIAGNOSED, folds into P4 + welcome

**Root cause:** you have exactly one signup flow (the post-subscribe *recommendations modal*) and one subscribe form (the good v2 one with the role field). The leak is structural: subscribers who arrive through Beehiiv's **recommendations / boosts network** are added with no form at all, so they can never be asked their role at signup. Nothing to fix on the form itself.

**Fix:** catch them downstream, two ways, both already in this pack:
- The **welcome sequence** (§4) branches on role at email 5 and can ask role directly for anyone who arrived without it.
- The **P4 re-ask** (§3) sweeps the existing unprofiled base.

No separate build for P1b. Closing it as "resolved by design: captured downstream" once §3 and §4 ship.

---

## 3. P4 — One-question role re-ask (backfill the unprofiled base) — DRAFT

**Who:** active subscribers with no `role` custom field set. Only ~11% of the list is profiled, so this is the single biggest lever on segmentation. **This is a large send (hundreds of people). Staged for your go.**

**Mechanism:** three role links in the email, each wired to a link-click automation that stamps the `role` custom field, so one tap sets their role with zero form friction. I build the 3-link automation once; the email just carries the links.

**Subject:** So I send you the right things
**Preview:** One tap. Takes five seconds.

> Hi {{first_name|there}},
>
> Quick one, and useful to both of us.
>
> Mastering Observability now runs on two tracks: the hands-on technical side, and the leadership side. I would rather send you the half you actually want than fill your inbox with both.
>
> So, one tap. Which are you?
>
> - I build it: **[Engineer / SRE / DevOps →]**
> - I lead it: **[Manager / Head / Director →]**
> - Bit of both: **[Both →]**
>
> That is the whole email. Tap one and you are sorted. Skip it and you keep getting everything, no harm done.
>
> Allan

**Note:** no book link, no podcast link, no PS. One job: get the tap. Keeps CTR clean as the success metric.

**Your call:** standalone send (recommended, highest response) / fold the same three links into the next Signal Drop newsletter / both.

---

## 4. Welcome sequence emails 2-5 + role branch — DRAFT

**Where it lives:** the live welcome runs in automation `aut_fdd8e3d1` ("Survey Follow up", trigger = signup, 301 enrolled, 53.9% open). Email 1 (the Chapter 4 free-chapter welcome) is live. I will read the current step order and slot 2-5 after it, once you approve the copy. Target: ~5 emails over ~2 weeks, value-first, role branch at email 5.

**Email 2 (day 2) — the one belief.**
Subject: The dashboard was green. The system was not.
> Hi {{first_name|there}},
> One idea underpins everything here: green dashboards do not mean a healthy system, they mean your dashboards are green. The gap between those two is where the 3am calls live.
> This week's Signal Drop sits right on that gap. Twelve minutes, no filler: [listen here].
> Allan

**Email 3 (day 5) — proof you can use.**
Subject: The five-hour outage that should have been one
> Hi {{first_name|there}},
> A quick, real one. Two airlines, the same software fault, the same day. One was back in a day, the other took five. The difference was not the code, it was whether they could see what was actually happening.
> That is the whole argument for observability that you can act on, and it is Chapter 4 of the book, which you already have. Worth a re-read if it has been sitting in your downloads: [open Chapter 4].
> Allan

**Email 4 (day 9) — the format map.**
Subject: What you actually get from me
> Hi {{first_name|there}},
> So you know what is coming: a short Signal Drop most weeks (the podcast plus a written companion), a plain-English Tech Tuesday explainer every other week, and the odd deeper piece when something is worth it. No link dumps, no vendor noise.
> If you only ever open one, make it the Tech Tuesday. Latest one is here: [latest Tech Tuesday].
> Allan

**Email 5 (day 14) — role branch.**
*Branches on the `role` field. If role is unset, this email asks for it (closing the P1b gap for recommendations-network joiners).*

Role = Engineer/SRE/DevOps:
> Subject: The technical half, aimed at you
> Hi {{first_name|there}}, you told me you build it, so here is where the hands-on material lives: the Tech Tuesday explainers and the deep dives. [Start here]. If you ever want a second pair of eyes on a real observability problem, just reply. Allan

Role = Manager/Head/Director:
> Subject: The leadership half, aimed at you
> Hi {{first_name|there}}, you told me you lead it, so here is the material for the people who carry the budget, not just the pager: the operating-model and maturity pieces. [Start here]. If you are weighing up where your observability actually stands, reply and I will point you at the self-assessment. Allan

Role = unset (the P1b catch):
> Subject: One tap so I aim this right
> Hi {{first_name|there}}, one thing I never asked: do you build it or lead it? [I build it] / [I lead it] / [Both]. Tap one and the next things I send will actually fit. Allan

---

## 5. Podcast guest funnel (Track A + Track B) — DRAFT

**Design:** two tracks, one bar. Track A = you invite senior practitioners / founders you already rate (a Dotan). Track B = active listeners/contributors apply. Everyone, invited or applied, clears the same screen so it never becomes "anyone with a mic". Premium, formal feel.

### 5a. The bar (screening standard)
A guest passes if they are **operator-credible** (has actually run or built observability at real scale, or has a distinct, defensible point of view), **specific** (brings one concrete story or argument, not vendor talking points), and **additive** (says something our audience has not already heard from us). Vendors pitching product do not pass; practitioners from a vendor who will talk craft do.

### 5b. Five screening questions (Track B application form + Track A pre-call)
1. In one line, what do you do and where have you run observability at scale?
2. What is one thing about observability you believe that most of your peers do not?
3. Tell me about one 3am incident or hard call that shaped how you work.
4. What would you want listeners to walk away able to *do* differently?
5. Anything you would not want to discuss on air? (so we brief it right)

### 5c. Track B — inbound application form
Build as a Beehiiv form / simple hosted form: Name, Email, Role/title, Company (optional), LinkedIn or site, + the 5 questions above, + "How did you hear about the show?". Route submissions to a `podcast-guest-applicant` tag and the tracker below. Gate: no auto-booking; you review every applicant.

### 5d. Track A — outbound invite template (for a Dotan)
> Subject: Signal Drop, and a proper conversation
> Hi {{name}},
> I have been reading/listening to your work on {{their thing}} and it lines up with what we are trying to say on Signal Drop: observability you can actually act on, minus the vendor gloss.
> Would you come on? Short, sharp, properly produced, and I do the heavy lifting on prep. I would want to get into {{the specific angle}}, because I think our audience needs to hear it from someone who has actually done it.
> If you are up for it, I will send three times and a one-page brief. No slides, no script, just the conversation.
> Allan

### 5e. Guest tracker (new file: `16_PODCAST_GUEST_TRACKER.md`)
Columns: Name | Track (A/B) | Role/credibility | Source | Screen result (pass/hold/no) | Status (invited / applied / booked / recorded / live) | Next action | Notes. Same discipline as the warm-contributor tracker: this is the source of truth, not Gmail.

---

## 6. P5 — Ungate the free chapter for crawlability — DRAFT (recommended: teaser)

**Problem:** the free chapter sits fully behind the email gate, so search engines and AI crawlers see nothing indexable. That is lost organic reach on the exact "CrowdStrike outage recovery" hook that pulls buyers.

**Recommended: crawlable teaser + gated full.**
- Build a public, indexable page at `/metrics-and-mayhem/free-chapter` (or a `/p/` article) carrying: the chapter's hook, a 300-400 word summary of the CrowdStrike recovery-gap argument, one diagram, and clear "read the full chapter free" capture. Search and AI crawlers index the argument; the full PDF still asks for an email.
- Set **AI Crawl Control** (Beehiiv Settings) to allow indexing of that page.
- Net: SEO + AI-answer visibility gained, lead capture kept.
- Alternative if you want maximum reach over capture: fully ungate (whole chapter public). Your call.

---

## Execution order once you greenlight

1. **P3a** — build the nurture-eligible segment, enrol the 55 (your go on the send).
2. **P4** — build the 3-link role automation, stage the re-ask email (your go on the send).
3. **Welcome 2-5** — slot into `aut_fdd8e3d1` after you approve copy (your go to publish).
4. **Podcast funnel** — build Track B form + tracker, stage Track A template (no send; forms only).
5. **P6 maturity self-assessment** — next pack, wired to the leadership branch + 45-min call.
6. **P5** — build the teaser page (Web/Brand console coordination).

**Nothing above has been sent, published, or enrolled.** Tell me which to fire and I go.
