# Website build brief: read this before you touch anything

**Written 2026-09-06 by the Content Management console (Growth lane), for a Claude Code or Codex session working on a masteringobservability.com redesign.**
**You are a satellite, not a console. That has consequences, and they are all in section 3.**

---

## 1. The thing you most need to know first

**This website is not a codebase. It is a beehiiv publication, and you cannot deploy it.**

Live read, 2026-09-06: `pub_51d69527-d6a4-44db-9fca-9b6cf2fee3e4` serves **23 pages**. Seven are `default` (Home, Subscribe, Archive, Authors, Tags, Login, password pages), seven are `dynamic` templates (`p/$slug`, `t/$tag`, `authors/$author`, `podcast/s/$showSlug/$episodeSlug`, `products/$slug`, `forms/$id`), and the rest are `custom` pages: `advisory`, `metrics-and-mayhem`, `metrics-and-mayhem/book`, `metrics-and-mayhem/podcast`, `metrics-and-mayhem/free-chapter`, `metrics-and-mayhem/thank-you`. Two are unpublished: `podcast` and `upgrade`.

**So there is no repository to redesign and no build to run.** Nothing you write to `G:` changes what a visitor sees. A change reaches the live site only when Al applies it in the beehiiv dashboard, or when an authorised session calls the beehiiv `edit_page` connector. **You are producing a design and a change pack. Al applies it. Do not describe your output as shipped, live, or deployed.**

`07_Website/subscribe_landing_page.html` and `07_Website/Pages/metrics-and-mayhem/` are working artefacts of this same pattern, not the served site.

## 2. Read these before proposing anything, in this order

This ground has been worked before. Starting from scratch throws away a baseline and repeats a change pack that already exists.

| File | Why |
|---|---|
| `07_Website/08_SEO_Improvement_Plan/28_WEBSITE_BASELINE_AUDIT_2026-07-26.md` | the measured starting state |
| `07_Website/08_SEO_Improvement_Plan/29_BRAND_SAFE_WEBSITE_CHANGE_PACK_2026-07-26.md` | a change pack already written to brand constraints |
| `07_Website/08_SEO_Improvement_Plan/31_POST_CHANGE_REVIEW_2026-07-26.md` | what happened when it was applied |
| `07_Website/08_SEO_Improvement_Plan/03_CHANGE_CONTROL_SOP.md` | the five-step process you must follow |
| `07_Website/08_SEO_Improvement_Plan/04_CHANGE_LOG.md` | where rollback values live |
| `07_Website/Web_Design_Best_Practices.md` | the house design rules |
| `07_Website/08_SEO_Improvement_Plan/30_WEBSITE_REVENUE_SCORECARD.csv` | what the site is supposed to earn |
| `02_Voice_Codex/Current/Allan_Mann_Voice_Codex_v1_9_*.md` | resolve by glob, never hardcode a version |

**The SOP is not optional and it is explicitly subordinate.** Its own header, recorded by Control on 2026-06-22, says it is "an SEO-local working note only, not a parallel change-control system", and that structural changes go through the Control chat as a `[SEO]` Change Request. Its five steps are: **Propose, Record rollback, Apply, Verify, Log.** The rule that matters most: **"No change is applied without its old value recorded first."** If you propose changing a live value, capture the current value in the same patch or the proposal is incomplete.

## 3. Where you record your work, and where you must never write

The Command Center runs a **single-writer invariant**. It exists because the shared change-request file was corrupted three times in June 2026 by two sessions appending while the drive synced mid-write. It is not bureaucracy, it is the fix for a real data loss.

**WRITE, and this is the only file where a worker self-records:**
- **`00_Command_Center/Ops_Log.md`, under "Job runs".** One line on completion, whatever the outcome, **including failure**. Include a `tokens: ~<n>` field; if you cannot estimate, write `tokens: unknown` rather than omitting it.
- **`Ops_Log.md` is APPEND-ONLY for every worker.** You may not edit, reword, re-status, reorder or delete any existing line in it, on any day, for any reason.
- **If your connector cannot append** (the Drive connector in these sessions cannot), **do not improvise a second file.** Put your intended log line as the last section of your inbound file and this console appends it for you, saying so in the line. Declining to improvise was the right call on 2026-09-06.

**WRITE, this is your outbound handoff. CORRECTED 2026-09-06 after the first delivery proved the original design impossible:**
- **Create a NEW file per session at `07_Website/_inbound/YYYY-MM-DD_<short-slug>.md`.** A create, not an append, because the Drive connector available to these sessions cannot append to an existing file. Each file has exactly one writer and is never written twice. To correct an earlier session, write a new file naming what it corrects; never edit one in place.
- **`07_Website/_Inbound_From_Website_Build.md` is now a standing index maintained by this console. Do not write to it.**
- **Declare EVERY file you produced, by full path.** On 2026-09-06 a substantial second output went unlisted. A file that exists and is not listed is invisible work.

**WRITE, your actual deliverables:**
- New numbered files in `07_Website/08_SEO_Improvement_Plan/`, following the existing `NN_NAME_YYYY-MM-DD.md` convention, or under `07_Website/Pages/`. **Add files. Do not restructure or rewrite the existing ones**; that folder is owned by this console.

**NEVER WRITE, no exceptions:**
- `00_Command_Center/Change_Requests_Inbox/Growth.md` or **any** file in `Change_Requests_Inbox/`. Every one has exactly one writer and none of them is you. Raise it in your handoff file instead.
- `00_Command_Center/Change_Requests.md` or `Change_Requests_Resolved.md`. Control only.
- `00_Command_Center/Content_System_Governance.md`. Control only.
- `10_Client_Work/`. **Read nothing from it and source nothing out of it, ever.** Private client material, off limits to content and to any commercial product.

## 4. House rules that apply to every word you write

- **UK English.**
- **No em dashes anywhere.** The ban is global and register-independent, and there is a linter: `python3 00_Command_Center/s5_lint.py`. Run it on anything you write.
- **Never use page, pager or paged as alerting vocabulary.** "Page one" and "page views" are fine; an alert never pages anyone.
- **Never name a client, employer or partner.** A client is "a tier-1 UK bank".
- **Defensible numbers only.** 562 active subscribers, roughly 407 genuinely engaged, verified 2026-08-31. Never "around 600".
- **Nothing sends, publishes, schedules, deletes or spends.** Drafts and proposals only. Al holds every irreversible action.

## 5. How to behave when a tool fails or a file surprises you

These are the lessons this system has paid for, so inherit them rather than repeating them.

- **An opaque tool error is a wrong argument at least as often as an outage.** Prove it with a second known-good call before declaring anything broken. A wrong id often returns a clean empty result rather than an error.
- **ZERO is not SKIPPED.** If a check returns nothing, record nothing found. Do not record "not checked", and do not treat an unchecked thing as a zero.
- **Live reads beat records.** A file that claims something is built is a claim, not a state. Verify against the live source.
- **Do not assert what another actor does. Read its prompt.** If you have not read a scheduled task's prompt, say so rather than describing its behaviour.
- **Read the whole artefact before concluding from part of it.** On 2026-09-06 an automation was assessed from its subject line and preview text, which are about the free chapter. Its body also carries both stream polls, and a record elsewhere depends on that. Subject lines are not contents.
- **`s5_lint.py` currently produces false positives on website work**, firing on the ordinary web sense of "page" (the advisory page, a tag page, archive pages). Zero em dashes is the check that matters. If the lint fails only on the word "page" in its web sense, say so and carry on; do not reword good copy to satisfy a broken gate.
- **A folder that looks like live work may be stale.** On 2026-09-04 a complete draft in a folder dated 13 September turned out to have published on 29 August. Check before building on any artefact.
- **`G:` does not mount in a shell** in some sessions. File tools reach it; bash may not. If shell globs on `G:` time out, that is expected, not a fault.

## 6. What "redesign" needs to mean before you start

Al has not yet specified scope, and the honest options are very different jobs. State which one you are doing in your first handoff entry:

1. **Visual and structural redesign** of the six custom pages plus Home, applied by hand in beehiiv.
2. **Conversion work** on the money pages. Note the standing evidence: `/metrics-and-mayhem/free-chapter` has read **zero clicks and zero impressions in Search Console across five consecutive reads**, and `/advisory` sits at 5 impressions and 0 clicks. Those are the two pages the business needs to work.
3. **SEO recovery**, which is a content and metadata job, not a design one. The lever is pages already collecting impressions and converting none.
4. **Information architecture**, for example the duplicate and unpublished `podcast` page sitting alongside the live `metrics-and-mayhem/podcast`.

**If Al has not told you which, ask him. Do not pick one and build it.**
