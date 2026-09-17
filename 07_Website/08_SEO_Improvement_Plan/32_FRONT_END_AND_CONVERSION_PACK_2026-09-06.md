# Front end and conversion pack

**Written 2026-09-06 by the website build satellite (Claude Code session), per `07_Website/_WEBSITE_BUILD_BRIEF.md`.**
**Scope taken: option 2 (conversion work on the money pages) first, option 1 (visual and structural redesign) second. Al set that order on 2026-09-06.**

Nothing in this file has been applied. Beehiiv serves the site and Al applies every change. Every proposal below carries the current live value for rollback, per `03_CHANGE_CONTROL_SOP.md` step 2.

---

## 1. Corrections to the record

Live reads taken 2026-09-06 against `pub_51d69527-d6a4-44db-9fca-9b6cf2fee3e4`. Three of these contradict documents in this folder, so they are stated first.

### 1.1 The P1 welcome path is fixed, and the Funnel Map row is stale

`00_FUNNEL_MAP_AND_TRACKER.md` records, as open leak P1: "a redesign was built but never published", "the LIVE `aut_fdd8e3d1` still runs the stale 2024 survey nudge", "FIX = Al publishes the staging automation".

Live read says otherwise. `get_automation_workspace_diff` on `aut_fdd8e3d1` returns `has_changes: false`, so staging and live are identical. The published live flow is:

| Position | Step | Detail |
|---|---|---|
| trigger | `signup` | published |
| 0 | `wait_for` | 900 seconds |
| 1 | `send_email` | subject "You're in. Here's the best thing I've got.", preview "Chapter 4, free, and what to expect." |

`published_at: 2026-08-24T10:15:40Z`. Performance: 313 enrolled, 1 in progress, 53.42% open, 16.46% click.

**So the staging redesign was published on the morning of 2026-08-24, the same day the Funnel Map was built.** The P1 row was written from the pre-publish state and has read as an open leak for thirteen days. It should be closed. This is the exact failure mode the build brief warns about: a file that claims something is broken is a claim, not a state.

### 1.2 Role capture on the main inline form is working

The Funnel Map is correct and an earlier finding of mine was wrong. Subscribe form `ad0cdd4a-bf3c-493a-90e1-9b7209f2cf9a` carries three custom fields, verified live:

- **First Name**, string, required
- **Role**, dropdown, optional, `custom_field_id bf2aa5ee-cf93-4e95-a0ea-7db41ba00c7f`, options: Engineer / SRE / DevOps, Architect / Specialist, Team Lead or Manager, Head of / Director, C-level (CTO, CIO), Vendor Sales or Marketing, Other
- **sub_stream**, dropdown, optional, options: Leadership & Strategy, Technical & Practitioner, Both equally

I had reported that no subscribe form captures Role. That was drawn from one form only and is withdrawn.

### 1.3 A new form exists that is not yet in the Funnel Map

Subscribe form `310e7847-1bcc-43eb-9d0d-33af4a209645`, named "Free Chapter 4 (lead magnet, LinkedIn + gated)", created **2026-09-01**, after the last funnel audit. Live state:

- `custom_fields: []`, so it captures email only
- `theme: {}` with `has_draft_theme_changes: true`, so a theme edit has sat unpublished since 1 September
- `success_message_text`: "Chapter 4 is on its way to your inbox. You will also get The Signal each Friday: one short, practical read for people who run observability, no vendor noise."

This looks like the per-asset Chapter 4 form that the Funnel Map's open decision (c) asked for an owner for. The object now exists. It is unconfigured.

---

## 2. Proposals

Each carries the live value to restore if reverted.

### P1. Add field capture to the Chapter 4 form
- **Object:** subscribe form `310e7847-1bcc-43eb-9d0d-33af4a209645`
- **Old value (rollback):** `custom_fields: []`; `theme: {}`; `has_draft_theme_changes: true`
- **Proposed:** add First Name (required) and Role (optional dropdown), reusing `custom_field_id bf2aa5ee-cf93-4e95-a0ea-7db41ba00c7f` and the exact seven options above so the seven live role routers fire without change. Leave `sub_stream` off to keep the gate short. Resolve the pending theme draft, publish it or discard it.
- **Why:** this is the LinkedIn gated-asset surface. Role captured here feeds the role routers and the Vendor and Sales exclusion segment `seg_b49b5921`, which is what keeps vendors out of advisory targeting.

### P2. Retire the overlapping lead-magnet automation
- **Object:** `aut_84fd88d8-b552-4a07-b2da-7010fe503900`, "Lead magnet automation"
- **Old value (rollback):** `state: live`, trigger `purchased_product`, enrolment conditional, 9 enrolled, 9 completed, 11.11% open, 0% click, published 2026-07-23T15:09:25Z
- **Proposed:** set inactive.
- **Why:** the Funnel Map already records the intent to retire it. What is new is that the replacement is now verified live and healthy (1.1 above), so retiring costs nothing. It currently duplicates the welcome path at roughly a fifth of its open rate.

### P3. Repair the truncated advisory page HTML
- **Object:** page `b9ce0cab-6190-4823-a104-8f9c0effbdf1`, slug `advisory`
- **Old value (rollback):** export the complete current custom HTML block before editing. The published block terminates inside an attribute at `<a href="https://amzn.eu/d/0cAuR2` followed by beehiiv embed attributes. The closing `mm-links` footer list is cut off, losing the trailing links and the closing tags.
- **Proposed:** re-paste the complete block from the `07_Website` source.
- **Why:** this is the page carrying the £5,000 assessment and the booking link.

### P4. Re-enable footers on the two pages that need them most
- **Object and old value (rollback):** page `7e4166fc-59b0-4c14-a667-f23eb2640b9f` (Home) `customization.show_footer: false`; page `b9ce0cab-6190-4823-a104-8f9c0effbdf1` (advisory) `customization.show_footer: false`
- **Proposed:** set both to `true`.
- **Why:** with footers off, no page carries a standing route to advisory, the book or the free chapter. beehiiv page views over the trailing three months show `/advisory` at 71 and `/subscribe` at 32, so people are reaching the money page without any navigation helping them.

### P5. The home page feed labelled "Most Recent Signals" does not show The Signal
- **Object:** page `7e4166fc`, post block `5cc96306-8d02-4128-8079-2337c82f55ce`
- **Old value (rollback):** `data-posts-category: ["signal_drop"]`, `data-posts-offset: 1`, `data-posts-count: 6`, heading text "Most Recent Signals"
- **Proposed:** either retitle the block to name the podcast series it actually shows, or repoint it. `signal_drop` holds 23 posts and is the podcast clip series. The weekly newsletter is tagged `the-signal` and holds 3. The Signal currently has no feed on the home page.
- **Related:** sibling block `a9f9afa0-adc7-4844-bc2a-8d18308d0563` filters `["articles","deep_dive","byte_size"]`, where `articles` holds 4 posts and `deep_dive` holds 1, so it is effectively a `byte_size` feed.

### P6. Advisory click tracking is still not wired
Carried forward from the Funnel Map MEASURE section unchanged. Until it is wired, no proposal here can be judged on revenue, only on subscriber movement.

---

## 3. Tag estate

Not covered in the Funnel Map, and it bears directly on why `/metrics-and-mayhem/free-chapter` reads zero impressions. 118 content tags across 147 posts. Every tag is an indexable `/t/<tag>` page.

Confirmed duplicate pairs, where beehiiv appended a UUID on a name collision:

| Kept | Duplicate | Posts |
|---|---|---|
| `observability-strategy` | `observability-strategy-74549763-3834-42cd-b93f-aa7802963439` | 7 vs 2 |
| `incident-response` | `incident-response-59b77356-f8de-4580-abe9-c5cc8caa256a` | 8 vs 4 |
| `signal_drop` | `signal-drop` | 23 vs 4 |
| `wide-events` | `wide-events-acc6614e-9ca0-48e2-bec4-70c7223e4012` | 1 vs 0 |
| `observability-2-0` | `observability-2-0-9cd74aa4-31ff-4113-8bca-5372f723233b` | 1 vs 0 |
| `deep-dive` | `deep_dive` | 1 vs 1 |

Two further defects: `metric_&_mayhem` carries the malformed slug `metric_-_mayhem` on 12 posts, and `artificial_intelligence ` has a trailing space in its display name on 26 posts.

Separately, `newsletter` is applied to 118 posts and `observability` to 116. Tags applied to almost everything carry no signal and generate near-duplicate archive pages.

**Proposed:** merge the duplicate pairs, retire the two universal tags, and noindex tag pages below roughly five posts. Rollback is the tag-to-post mapping above, captured here.

---

## 4. Redesign, the second priority

Al has seen and approved the visual direction of a home page prototype built in this session. It resolves a brand split that is currently live across three surfaces:

- Home page renders `#2F8F8B` with IBM Plex Sans
- `/advisory` renders `#5fd0c0` and `#f5f3ec` with **Space Grotesk and Inter**, the pairing `Brand_Design_System_v2.md` records as replaced
- The ratified web surface is `#2F9E8D` with Montserrat, DM Sans and Space Mono
- Every OG card and diagram uses the dark navy `#0a0e17` and mint `#64ffda` asset surface

The prototype puts the dark asset surface on the site and uses the ratified web tokens for light mode, so the two documented surfaces become the two themes rather than competing. It also adds what the live home page has none of: an H1 that states the positioning, a credibility section, and a route to advisory. The live home page's first `h1` is the words "Latest Articles".

This is a design proposal only. Applying it means rebuilding blocks by hand in the beehiiv website editor, and it should follow the four conversion items above, not precede them.

---

## 5. Not done, and why

- **Not read:** `28_WEBSITE_BASELINE_AUDIT_2026-07-26.md`, `29_BRAND_SAFE_WEBSITE_CHANGE_PACK_2026-07-26.md`, `31_POST_CHANGE_REVIEW_2026-07-26.md`, `04_CHANGE_LOG.md`, `02_SEARCH_CONSOLE_BASELINE.md`, `Web_Design_Best_Practices.md`, and the Voice Codex. Sections 2, 3 and 4 above may duplicate ground those already own. They should be reconciled before any of this is actioned.
- **Not run:** `s5_lint.py`. `G:` does not mount in this container's shell, which the brief flags as expected. Em dashes were checked by hand across this file and the two prototype artifacts: zero.
- **Not written:** no entry appended to `_Inbound_From_Website_Build.md` and no line appended to `Ops_Log.md`. The Google Drive connector available to this session can create files and change file metadata, but it cannot append to or rewrite an existing file's content. Given the single-writer invariant exists because of append corruption, creating a duplicate file was the wrong fix. The two entries are supplied to Al verbatim to paste.
- **Not changed:** nothing live, in beehiiv or anywhere else.

---

## 6. Questions for Al

1. **The signup flow redirect.** The only signup flow, "Recommendations Flow" (`f4d90f63-ff08-4acf-9353-9e6a1e2a3ba5`), sends every new subscriber to `/?modal=recommendations`. I first read that as a leak. Given incoming recommendations drove 9 of 31 subscribers in the 29 May to 28 Aug window, and Project Overwatch has driven 66 all time, it may be a deliberate reciprocal trade. If it is, say so and I will stop calling it a leak and record it as intended behaviour.
2. **Which subscriber number is public.** 561 active on today's live read, roughly 407 genuinely engaged per the 2026-08-31 verification. The prototype currently shows 561. Confirm which figure, if either, belongs on a public page.
3. **Which headline leads.** `/advisory` opens with "You bought the tools. You still can't get a straight answer at 2:47am." The prototype home page opens with "Own the signal. Rent the platform." The first sells the assessment, the second grows the list. They should not both be the primary.
4. **Client naming.** The live `/advisory` page names three clients. The build brief's house rules say a client is "a tier-1 UK bank". Those names are already published on your own page, so I have carried them into the prototype, but confirm that is intended rather than an inconsistency to fix.
