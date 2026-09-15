# Share titles and descriptions: draft for Al's approval, 2026-09-11

**Written by:** the website build satellite, a Claude Code session on Al's PC with the beehiiv connector.

**Status: approved by Al ("approve all, apply them") and applied on 2026-09-11.** Details are in "Applied" at the end. These are page settings with no draft stage: they go live the moment they are saved in beehiiv.

## Why now

- Four pages have blank share fields, so beehiiv falls back to the page name:
  - Home shares on LinkedIn as "Home";
  - Subscribe as "Subscribe";
  - Archive as "Archive | Mastering Observability";
  - the Metrics & Mayhem page as "Metrics and Mayhem".
- The Free Chapter's share text still promises "the free first chapter", but it is Chapter 4.
  - `29_BRAND_SAFE_WEBSITE_CHANGE_PACK_2026-07-26.md` (WEB-003) called this "a trust problem before it is an SEO problem".
  - The search text was corrected afterwards; the share text never was.

## Rules followed

- **Title roles.** Search titles lead with the keyword; share titles (LinkedIn, Facebook, X) carry the hook, in Al's voice. This follows the house rule in `11_FORWARD_SEO_STEP6.md`.
- **Lengths:**
  - search titles at most 60 characters, including any brand beehiiv appends;
  - share titles at most 70, so LinkedIn does not cut them;
  - descriptions at most 160.

  Every proposal below was measured.
- **Search titles change only where they are wrong or stale.** Most pages sit around position 27 (`2026-08-23_GR07_impression_pages_sprint.md`), where rewriting a title moves little.
- **Wording.**
  - It reuses copy Al has already approved on the site wherever it can.
  - No subscriber counts or open rates, because they date.
  - No em dashes; Voice Codex §5 checked.
- **Naming.** "Metrics & Mayhem" appears only for the book and the podcast, as the Claude Design brand system sets out.

## Proposed values, page by page

Each item gives the beehiiv field, then **now** (the rollback value) and **proposed**. "Share" means both the Facebook fields (used by LinkedIn) and the X fields.

### Home `/` (`7e4166fc`)
- **Share title.** Now: blank, which renders "Home". Proposed: `Own the signal. Rent the platform.`
- **Share description.** Now: blank. Proposed: `Observability strategy, incident leadership and AI operations for the people who are accountable when it breaks. Vendor-neutral, by Allan Mann.`
- **Search title and description:** unchanged. They were set on purpose in July (`29_` WEB-001).
- **X handle.** Now: blank. Proposed: `@masteringobserv`, as on the other pages.

### Subscribe `/subscribe` (`6bd0e0b8`)
- **Share title.** Now: blank, which renders "Subscribe". Proposed: `One email a week. No vendor pitch at the end of it.`
- **Share description.** Now: blank. Proposed: `The Signal, from Allan Mann: one observability idea every Friday, argued properly, for the people who have to make the call on Monday. Free.`
- **Search: unchanged for now.** Its description says "most weeks" and "Metrics and Mayhem", and names Signal Drop and Tech Tuesday. It should follow Al's ruling on cadence and naming (`36_` §6, item 3).
- **X handle:** proposed `@masteringobserv`.

### Archive `/archive` (`d734748d`)
- **Search title.** Now: `The Observability Digest Archive`, with the brand appended. Proposed: `Observability Blog and Archive`, with the brand appended (56 characters in all).
- **Search description.** Now: `Browse every issue of the Observability Digest from Metrics & Mayhem: monthly observability signals, deep dives, and the few reads worth your time.` Proposed: `Every piece, newest first: The Signal, the Observability Digest, deep dives and byte-size explainers on observability, incident leadership and AI operations.`
- **Share title.** Now: blank. Proposed: `Everything, in public: the Mastering Observability archive`
- **Share description.** Now: blank. Proposed: `Every piece, newest first: The Signal, the Observability Digest, deep dives and byte-size explainers.`
- **X handle:** proposed `@masteringobserv`.

### Advisory `/advisory` (`b9ce0cab`)
- **Share title.** Now: Facebook `Observability Advisory & Maturity Assessments`, X `Observability Advisory | Allan Mann`. Proposed, for both: `Observability advisory: an outside read, at a fixed fee`
- **Share description.** Now:
  - Facebook: `An outside read on where your observability actually stands, and the shortest path to the level that changes your incidents and your spend.`
  - X: `Independent, vendor-neutral observability advisory for IT and engineering leaders in regulated enterprises. Start with a fixed-scope Assessment.`, with a stray line break at the end.

  Proposed, for both: `Vendor-neutral advice for IT leaders in regulated enterprises. Start with a fixed-fee review of one platform, one service domain or one set of questions.`
- **Search:** unchanged.

### Metrics & Mayhem `/metrics-and-mayhem` (`5e90b6a5`)
- **Share title.** Now: blank, which renders "Metrics and Mayhem". Proposed: `Metrics & Mayhem: the book and podcast for IT leaders`
- **Share description.** Now: blank (the X field is an empty string). Proposed: `For IT leaders living the MTTR paradox: more tools, slower recovery. The book and the podcast from Allan Mann.`
- **Search:** unchanged.

### Podcast `/metrics-and-mayhem/podcast` (`0077e2e0`)
- **Search title.** Now: `Metrics & Mayhem Podcast | Allan Mann`, with the brand also appended, so it carries two suffixes. Proposed: `Observability Podcast: Metrics & Mayhem with Allan Mann`, with the brand not appended.
- **Share title.** Now: Facebook `Metrics & Mayhem Podcast`, X `Metrics & Mayhem Podcast | Allan Mann`. Proposed, for both: `Metrics & Mayhem: the podcast. One lesson, one habit, no theatre.`
- **Share description.** Now:
  - Facebook: `Signal Drops on what changes outcomes in IT Ops: clarity, control, and decision-making under pressure. Hosted by Allan Mann.`
  - X: `Short Signal Drops on IT Ops and observability. One lesson, one habit, no theatre.`

  Proposed, for both: `Short Signal Drops on IT operations, observability and leadership under pressure. Hosted by Allan Mann.`
- **Search description:** unchanged.

### Book `/metrics-and-mayhem/book` (`d13034a7`)
- **Search title.** Now: `Metrics & Mayhem: A CTO guide`, with the brand appended. Proposed: `Metrics & Mayhem: A CTO's Guide to Observability`, with the brand not appended.
- **Search description.** Now: `A CTO guide to observability for reliable payments. Learn the people and process that turn system signals into clear decisions. Get a free chapter today.` Proposed: `A CTO's guide to observability that actually works: the people and process that turn system signals into clear decisions. Read Chapter 4 free.`
- **Share title.** Now: Facebook `Metrics & Mayhem: A CTO's Guide to Observability`, X blank. Proposed, for both: `Metrics & Mayhem: a CTO's guide to observability that actually works`
- **Share description.** Now:
  - Facebook: `Metrics & Mayhem is a practical CTO guide to observability, the people and process behind reliable payments and clear decisions. Get a free chapter.`
  - X: `When payments fail, dashboards lie. Metrics & Mayhem helps CTOs build observability, the people and process behind clear decisions. Free chapter available.`

  Proposed, for both: `Eleven chapters on the people and process behind observability that works. Chapter 4 is free, and it stands on its own.`

### Free chapter `/metrics-and-mayhem/free-chapter` (`a6f07b92`)
- **Search title:** unchanged (`Free Chapter: Who Owns What When It Breaks | Metrics & Mayhem`).
- **Search description.** Now: 190 characters, which Google cuts off before its last word, "Free". Proposed: `Why one airline recovered from the CrowdStrike outage in a day and another took five, from the same fault. The ownership model from Chapter 4. Free.`
- **Share title.** Now: `Free Chapter: Metrics & Mayhem, Chapter 4`. Proposed: `Who owns what when it breaks: Chapter 4, free`
- **Share description.** Now: `The free first chapter of the CTO's guide to observability that actually works. Real signals, clear decisions.`, which is wrong. Proposed: `Why one airline recovered from the CrowdStrike outage in a day and another took five. Chapter 4 of Metrics & Mayhem, free.`

### Thank-you `/metrics-and-mayhem/thank-you` (`01184ac5`)
- **Search indexing.** Now: allowed. Proposed: switch on noindex. It is the after-signup page and has no reason to appear in Google.

## Not in this draft

- **Share images.** Home, Subscribe, Archive and the podcast still fall back to the Advisory card. They wait for the light share-card template in the Claude Design system, and will then be built page by page.
- **Posts.** Each post carries its own share title and image.
- **Default pages** (Authors, Tags, Recommendations, Login, passwords): left as they are.

## Applying it

1. **Apply:** once Al approves, set the fields with the beehiiv connector's `edit_page`.
2. **Verify:** re-read each page with `get_page`, then fetch each live page and check its `og:` and `twitter:` tags.
3. **Record:** write the change record and the Ops_Log line.

**Rollback:** every "now" value above.

## Applied, 2026-09-11

- **Applied:** all nine page edits, with the beehiiv connector's `edit_page`, between 13:19 and 13:20 UTC. beehiiv returned each record with the new values.
- **Verified:**
  - each live page shows the new `og:title`, `twitter:title` and `og:description`;
  - the thank-you page carries `robots: noindex`;
  - the search titles for Archive, Podcast and Book render as proposed.
- **One correction, at 13:21 UTC.** The Archive share title rendered as "Everything, in public: the Mastering Observability archive | Mastering Observability", because the page had "append publication name to title" switched on, and that suffix also lands on the share title.
  - **Fix:** switched the append off and wrote the name into the search title instead (`Observability Blog and Archive | Mastering Observability`), so the approved wording shows unchanged in search.
  - **Rollback for Archive:** meta title `The Observability Digest Archive`, append on.
