# Home: the experience list gains its starting point, change record, 2026-09-14 (ninth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with Claude in Chrome and the beehiiv connector. Follows `41_POST_TAG_AUTHOR_BRAND_ALIGNMENT_CHANGE_RECORD_2026-09-11.md`, which is still open.

**Trigger.** Al, in session, asked for two things:
- **Add his background to the Home experience list.** The list reads "a global tier-1 bank", "a UAE government platform", "a tier-1 UK bank". It should also carry his 25+ years of IT operations and SRE, running teams globally, follow-the-sun: "that's where it comes from", and what led to "being a practitioner for the last five years".
- **Put the earliest role at the top.** The list reads downwards in time, and before the global tier-1 bank came twelve years running IT operations at another bank.

## 1. The change

**Where:** Home, the first Custom HTML block ("Who writes this"), in the list of roles on the right.

**Added at the top of the list:**
- **Title:** "A global investment bank".
- **Text:** "Twelve years running IT operations, with teams across the globe working follow-the-sun. It is where 25+ years in IT operations and SRE began, and what the last five years as a practitioner are built on."

**Kept to the site's rules:**
- **No bank named.** The bank Al named becomes "a global investment bank", in line with the other cards.
- **The figures are Al's own:** twelve years, 25+ years, the last five years.
- **Style:** UK English, no em dashes.

**Left alone.** The paragraph beside the list still says "Twenty-five years running IT operations and observability". It sits well enough with "25+", but Al may want the two to match.

**Files:**
- `07_Website/Pages/home/home_block1_hero_credibility.html`, updated: SHA-256 `bb2ffa3b…9181`, 14,797 characters with line endings normalised.
- The previous version: SHA-256 `6bbfc0fa…d2d2`, 14,465 characters. It matched the draft before the change.

## 2. Applied in the beehiiv draft

- **How:** the block's code was edited in place in the builder. One card was inserted before "A global tier-1 bank", using beehiiv's own CRLF line endings.
- **Verified:**
  - the save requests returned 200;
  - after a builder reload, the block matches the G: file (`bb2ffa3b…9181`), and the other two Home blocks are unchanged;
  - in beehiiv's draft preview at 1440px and 375px, the card sits at the top of the list and reads cleanly, and the phone layout has no sideways scroll.
- **Live:** unchanged until Al publishes Home.

## 3. What publishing Home will also carry

A draft-to-live comparison of Home shows one other difference. It was already prepared for Al on 2026-09-11 (`37_`, fourth pass): the card fix in the second Home block, `home_block3_why_and_freechapter.html` (fingerprint `f6b82d12…c6f4`), which left-aligns the card meta row and shows post titles in full. It is in the draft but was never published, so publishing Home puts both live.

## 4. Spacing tightened, same day

**Trigger.** Al, after seeing the four cards: "table seem too long now, maybe review the spacing".

**Cause.** Each card's text was an inline span inside a block that carries the section's own type: 18px on desktop, 15px on phones, at a 1.65 line height. Inline text cannot sit tighter than its parent's line box. So every line of card text stood 30px apart on desktop and 25px on phones, not the 21px its own 14px at 1.5 intended.

**Changes, all in the block's CSS:**
- the card text is now a block, so its own 1.5 line height applies (21px lines);
- card titles take a 1.3 line height and sit 3px above the text, down from 5px;
- card padding is 14px by 20px, down from 18px by 20px, and 12px by 16px on phones;
- the columns are now .92 to 1.08, which gives the list a little more width beside the bio.

**Result, measured in beehiiv's draft preview:**

| | Before | After |
|---|---|---|
| Desktop (1440px): list height | 535px | 396px |
| Desktop: bio column beside it | 380px | 380px |
| Phone (375px): list height | 664px | 527px |

- **Desktop:** the list now ends almost level with the bio beside it.
- **Copy:** unchanged.
- **Phones:** no sideways scroll.

**Files and verification:**
- `home_block1_hero_credibility.html` now has SHA-256 `853c01d1…14af`, 14,992 characters. This replaces the fingerprint in section 1.
- After a builder reload, the block matches that fingerprint, and the other two Home blocks are unchanged.

## 5. The bio now says "25+ years", same day

**Trigger.** Al, in session: "published, yes make the bio say 25+ years".

**Change.** The paragraph beside the list now opens "25+ years running IT operations and observability across five tier-1 banks and one UAE government". It replaces "Twenty-five years", to match the new card.

**Files and verification:**
- `home_block1_hero_credibility.html` now has SHA-256 `f1e23ed6…0f2f`, 14,984 characters. This replaces the fingerprint in section 4.
- Applied in the builder draft. After a reload, the block matches that fingerprint.

**Publish state, checked at 18:09 UTC.** Al's publish had not reached the site:
- beehiiv's published copy of Home, read through the connector, still says "Twenty-five years" and has none of today's changes;
- the live page, served fresh rather than from cache, matches it;
- the draft carries all of today's changes: the new card, the spacing, the bio, and the 11 September card fix.

So Home needs publishing again.

## Rollback

- **Before the bio change:** localStorage `mo_home_rollback_2026-09-14c`, or the file at fingerprint `853c01d1…14af` in its Drive history.
- **Before the spacing change:** the Home document as JSON in localStorage `mo_home_rollback_2026-09-14b`, or the file at fingerprint `bb2ffa3b…9181` in its Drive history.
- **Previous Home document:** saved as JSON in Al's Chrome (localStorage `mo_home_rollback_2026-09-14` on app.beehiiv.com, 111,902 characters).
- **Version history:** the builder's own.
- **By hand:** remove the one card from the file and from the block.

## Open, Al's

1. Publish Home. When checked at 18:09 UTC, today's changes were not live (section 5).
2. Done: the paragraph now says "25+ years" (section 5).
3. The site theme from `41_` is still not saved, and the live site is on the old theme. Finishing it needs the builder window visible on screen.
