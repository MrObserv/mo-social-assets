# Harvest and verification: website satellite, 2026-09-06

**Written by the Content Management console (Growth lane), which owns `07_Website/08_SEO_Improvement_Plan/` under `Shared_State_Contract.md`.**
**Subject: the website build satellite's first delivery, `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md` and `33_RECOMMENDATIONS_PRUNE_2026-09-06.md`.**

**Verdict: good work, verified where it matters, and the two process failures are mine to fix rather than the satellite's.**

---

## 1. What I verified independently, and what it came back as

A satellite correction that contradicts an existing record does not get propagated on its say-so. These were re-read live by this console.

| Claim | Result |
|---|---|
| `aut_fdd8e3d1` has `has_changes: false`, so staging equals live | **CONFIRMED.** `changes_count: 0`, no steps, no triggers pending. |
| Its live flow is trigger `signup`, wait 900s, one `send_email` | **CONFIRMED.** Published `2026-08-24T10:15:40Z`. |
| Therefore Funnel Map open leak P1 is stale and should close | **CONFIRMED, and it should close.** |

**So the satellite's correction stands, and the Funnel Map has carried a fixed leak as open for thirteen days.**

### 1.1 Why that row was probably wrong, offered as inference and labelled as such

The Funnel Map described the live automation as "the stale 2024 survey nudge". The live automation is **named "Survey Follow up"** and its `created_at` is **2024-06-15**. Its steps deliver Chapter 4.

**The name and creation date match the Funnel Map's description exactly, and the steps do not.** The most economical explanation is that the row was written from the automation's name and age rather than its flow. I did not watch it being written, so this is a hypothesis with two supporting facts, not a finding.

**Either way there is a real defect underneath it: the automation's name is a 2024 leftover that actively misdescribes what it does.** Renaming it is a one-field change and it removes the trap for the next reader.

### 1.2 One thing the satellite read partially, corrected here rather than left to stand

The pack reports the welcome email by its subject and preview, both of which are about Chapter 4. On that basis it would be reasonable to conclude the stream poll had been replaced on 24 August.

**It has not.** I pulled the live email body. It carries the Chapter 4 link **and** both polls: *"Which do you want more of? One tap sets what I send you"* and *"so I know who I am writing for, what is your role?"*

**This matters beyond tidiness.** `GR-2026-09-04-03`, the stream-bucket handoff to Lead Generation, rests on the claim that new subscribers are bucketed at signup by this automation. **That claim is verified and holds.** Had the poll been dropped on 24 August, the entire new-arrival half of that handoff would have been wrong.

---

## 2. A finding of my own, from the same read, and it closes a question this folder has carried for months

The live welcome email delivers the free chapter like this:

> Read Chapter 4 free (`https://raw.githubusercontent.com/MrObserv/mo-social-assets/main/Free_Chapter/metrics-and-mayhem-free-chapter-ch4.pdf`)

**It is a raw file link into the public assets repository. It does not route through `/metrics-and-mayhem/free-chapter` at all.**

Search Console has now reported that page at **zero clicks and zero impressions across five consecutive reads**, and every previous note has treated this as a discovery problem to be solved with metadata and internal links.

**It is not a discovery problem. The page is not in the path.** The one automation that reaches every new subscriber sends them to a PDF on a raw GitHub URL instead. Nobody arrives at the page because nothing sends them there.

Consequences worth stating plainly:

- **No landing page means no onward journey.** A reader who opens the PDF has no route to advisory, the book, or anything else. The page that would carry those CTAs is bypassed.
- **A raw repository link earns nothing in search**, and it puts a commercial asset on a URL shape that looks like infrastructure rather than a product.
- The product object `/products/metrics-mayhem-chapter-4` took **63 page views** over the trailing three months, so there is demand arriving by some other route while the dedicated page sits at zero.

**Proposed as P7, and it is the highest-value item on either pack:** point the welcome email at `/metrics-and-mayhem/free-chapter`, and have that page carry the PDF plus the onward routes. **Rollback: the current raw URL is recorded verbatim above.**

This is a proposal. Nothing has been changed.

---

## 3. The lint the satellite could not run. I ran it, and the gate is wrong rather than the pack

The satellite could not run `s5_lint.py` because `G:` does not mount in its shell, and said so. That is the documented constraint, and declaring it was the right call.

**I ran it here by staging both the linter and the packs into a container that does have a shell.**

| File | Result |
|---|---|
| `33_RECOMMENDATIONS_PRUNE_2026-09-06.md` | **clean** |
| `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md` | **16 violations, and all 16 are false positives** |

**Zero em dashes in either file, so the satellite's hand-check was correct.**

Every one of the 16 is the alerting-vocabulary rule firing on the ordinary web sense of the word: "the advisory page", "the money page", "a `/t/<tag>` page", "a public page", "the two pages", "archive pages". The linter's allowlist covers *company, linkedin, facebook, web, landing, home, profile, wiki, confluence, notion* before the word, and *rule, policy, system, count, view, load, title, number* after it. **It does not cover the vocabulary of a website project**, so any website work trips the gate on every sentence that names a page.

**This is a defect in the gate, filed for Control.** Suggested minimum additions to `_ALLOWED_BEFORE`: advisory, money, tag, archive, subscribe, product, custom, default, dynamic, error, upgrade, login, podcast, book, author. Better still, allow a bare "page" immediately followed by a backticked identifier, which is how every one of these reads.

**Until it is fixed, a website pack failing this lint means nothing on its own and someone has to read all sixteen by hand, as I just did.** That is the kind of gate that gets ignored, and then gets ignored on the day it is right.

---

## 4. Two process failures. Both are mine

### 4.1 The handoff file I designed cannot be written by the session it was designed for

`_Inbound_From_Website_Build.md` is still **1,573 bytes with the exact timestamp I created it**. Nothing was appended. The satellite explained why, and the explanation is correct and well judged:

> "The Google Drive connector available to this session can create files and change file metadata, but it cannot append to or rewrite an existing file's content. Given the single-writer invariant exists because of append corruption, creating a duplicate file was the wrong fix."

**It was right not to improvise.** A satellite inventing a second file is exactly how the June corruption pattern repeats.

**The design was mine and it assumed an append the satellite cannot perform.** Fixed as follows, and the brief and the handoff file are both updated: **the satellite writes a NEW file per session**, `07_Website/_inbound/YYYY-MM-DD_<slug>.md`, which is a create rather than an append. `_Inbound_From_Website_Build.md` becomes a standing index that this console maintains and points at those files.

Same fix applies to the `Ops_Log.md` line, which is also an append and also impossible for that session. **Until the satellite has an append-capable path, this console writes its Ops_Log job-run line on its behalf and says so in the line.** That is a deviation from the self-record convention and it is recorded here rather than done quietly.

### 4.2 The brief told it to read seven files first and it read none of them

The satellite declared this honestly in its own section 5: it did not read the baseline audit, the brand-safe change pack, the post-change review, the change log, the search console baseline, the web design best practices, or the Voice Codex, and it flagged that sections 2 to 4 may duplicate them.

**Declaring the gap is the right behaviour and it is what the brief asked for.** But the whole point of listing those files was to stop the ground being reworked, and it did not work.

**Reconciliation against `28_`, `29_` and `31_` is owed before any of P1 to P6 is actioned**, and it is on this console, not the satellite.

### 4.3 One output was not declared

`33_RECOMMENDATIONS_PRUNE_2026-09-06.md`, 8,072 bytes, does not appear in the handoff entry's "Produced" line. It is substantial, it records a decision by Al, and it is good. It is only a bookkeeping miss, but the whole value of the handoff is that it lists everything.

---

## 5. Routing: what goes where

| Item | Route |
|---|---|
| P1 Chapter 4 form field capture | change request, filed |
| P2 retire `aut_84fd88d8` | change request, filed |
| P3 repair truncated `/advisory` HTML | change request, filed, **treat as the most urgent: it is the page carrying the paid offer** |
| P4 re-enable footers on Home and `/advisory` | change request, filed |
| P5 home feed mislabel | change request, filed |
| P6 advisory click tracking | change request, filed, carried forward unchanged |
| **P7 free chapter bypasses its own page** | **change request, filed, new this pass** |
| Tag estate merge and noindex | change request, filed, but reconcile against `29_` first |
| Recommendations prune, Al decided | Al applies in beehiiv; rollback is section 3 of `33_` |
| Home page headline decision | recorded to `Ops_Log.md` Decisions |
| Redesign prototype | holds until the conversion items land, per the satellite's own sequencing, which is correct |

---

## 6. The four questions, answered where I can answer them

**Q1, the signup flow redirect.** Al has already answered this by deciding the prune. `33_` records the reciprocal figures: Project Overwatch 66 in against 23 out, Ins7ghts 4 in against 0 out. **It is a deliberate trade, not a leak**, and the satellite's own second read reached that conclusion and corrected its first. Nothing further needed.

**Q2, which subscriber number is public.** Neither, and the question underneath it is the one worth answering. The standing rule is **562 active, roughly 407 genuinely engaged, verified 2026-08-31, and never "around 600"**. The satellite read 561 today, which is drift of one and consistent. **But the real question is whether a subscriber count belongs on a public page at all.** At this size the number argues against the offer: 561 is small, and a reader who is deciding whether to trust an advisory practice does not need it. **Recommendation: no count on the page.** Lead with the argument, not the audience size. Al rules.

**Q3, which headline leads.** Closed by Al on 2026-09-06. Home leads with "Own the signal. Rent the platform." The 2:47am line is reserved for the book. The advisory block on the home page leads with "More tools. More dashboards. Worse recovery." **Still open: whether the `/advisory` hero itself moves off the 2:47am line.**

**Q4, client naming, and this needs care rather than a reflex.** The house rule names three clients and says a client is "a tier-1 UK bank". **The three clients named on the live site are not on that list.** The rule as written does not forbid them, and they are already published on Al's own live page, so the satellite carrying them into the prototype was reasonable and it was right to flag it rather than assume.

**What I will not do is silently widen the rule to cover three more names, or silently narrow it to a literal three.** This is Al's to rule on, and it is worth ruling once: either the prohibition is those three specific relationships for specific reasons, or it is a general principle about naming clients, in which case the live page needs changing and not just the prototype.

---

## 7. What is now owed, in order

1. **Al: rule on Q4**, because it governs both the live page and the prototype.
2. **Al: rule on Q2**, whether any subscriber count is public.
3. **This console: reconcile the pack against `28_`, `29_` and `31_`** before anything is actioned.
4. **Al: apply P3 first.** A truncated HTML block on the page carrying the £5,000 assessment is the only item here that is actively costing something.
5. **Control: fix the `s5_lint.py` allowlist**, and decide on renaming `aut_fdd8e3d1`.
6. **Al: close Funnel Map open leak P1**, verified fixed.
