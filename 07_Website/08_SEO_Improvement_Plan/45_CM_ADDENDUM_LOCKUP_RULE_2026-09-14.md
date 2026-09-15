# ADDENDUM — Al's universal card rule, 2026-09-14. **This supersedes the lockup lanes.**

## The rule, as Al gave it

> **Top corner:** TECHNICAL · LEADERSHIP · THE SIGNAL · BYTE-SIZE · and **METRICS & MAYHEM when it is a podcast**.
> **Bottom, always:** **MASTERING OBSERVABILITY** and **MASTERINGOBSERVABILITY.COM**.

Two slots, one job each. **The top corner says what this piece is. The bottom says who we are.**

## Why this is bigger than an eyebrow vocabulary

**It retires the lockup-lane concept.** `lockup.podcast_lane` and `lockup.house_lane` exist to decide
*which wordmark an asset's footer carries*. Under this rule the footer is a constant, so that decision
no longer exists. **METRICS & MAYHEM moves from the footer to the top corner**, where it becomes one
eyebrow value among five rather than a competing wordmark.

**It also resolves the endorsement question more cleanly than the bolt-on we were speccing.** Al ruled
earlier that podcast assets should carry a small endorsement of the parent. This *is* that endorsement,
using the structure already on every card instead of adding a sixth element. The four open questions
from that ruling — form, placement, size floor, and the §4 "never pair the ring mark with a second mark"
clause — **mostly dissolve**, because the endorsement is type in an existing footer slot, not a mark.

**Token-file consequence:** `lockup` collapses to a constant and a new `eyebrow` map replaces it as the
per-surface lookup. `lockupFor()` keeps its throw-on-unknown behaviour but should now be `eyebrowFor()`.
The surface keys stay needed — just for the eyebrow rather than the wordmark.

## What already complies

- **`blogthumb`** — already exact. Eyebrow at (60,66), footer `lockupFor("blog_og")` left and
  `MASTERINGOBSERVABILITY.COM` right at `H-44`. **No change beyond swapping the lookup.**
- **`Blog_Thumbnail_Standard.md`** footer already reads `MASTERING OBSERVABILITY · MASTERINGOBSERVABILITY.COM`.
- **`YouTube_Thumbnail_Standard.md`** already puts METRICS & MAYHEM in a top corner.
- **`Quote_Card_Standard.md`** already has METRICS & MAYHEM as the top label.

## Three collisions with ratified standards. None is fatal, all need a decision.

### 1. `The_Signal_Card_Standard.md` — the layout inverts

It currently specifies, and Al approved this on 2026-08-21:

> **House lockup = MASTERING OBSERVABILITY** (top-left, MO lens + wordmark) … The Signal is a
> newsletter under the house brand.
> 1. **House lockup** — MO lens + `MASTERING OBSERVABILITY` (Space Mono, mint), **top-left**.

**Under the new rule the top-left becomes THE SIGNAL and MASTERING OBSERVABILITY moves to the footer.**
That is a straight inversion of a ratified layout. The standard's *intent* survives untouched — Metrics
& Mayhem still must not appear on it — but the placement does not. **Needs amending, not reinterpreting.**

### 2. `OG_Card_Standard.md` — the footer-left slot is already occupied

Its footer is `EPISODE n • ALLAN MANN • MASTERINGOBSERVABILITY.COM` left, `MASTERINGOBSERVABILITY.COM`
right. **MASTERING OBSERVABILITY now wants the left slot.** So where do `EPISODE n` and `ALLAN MANN` go?

Worth care: that same standard records a v1.3.0 bug where a stale builder **doubled the footer domain**,
and its QA gate explicitly checks "the footer shows the domain ONCE". Whatever is chosen should not
reintroduce that.

### 3. `ytthumb` has no footer at all, and it is the worst surface to add one to

`mo_visual_kit.js` line 222 draws only the top-corner lockup for YouTube. There is no footer element.
Adding one is easy; making it legible is not. **A YouTube browse grid renders a thumbnail near 168px
wide, so footer type at the blog card's 17px scales to about 2px.** This is the same size-floor problem
already open on the ring mark, and it now has a second instance. **All three floors — ring mark,
endorsement, footer type — should be set in one pass.**

## Two things the ruling does not cover

**1. The Digest has no eyebrow.** Al listed TECHNICAL, LEADERSHIP, THE SIGNAL, BYTE-SIZE and
METRICS & MAYHEM. The monthly Observability Digest is a distinct product from the weekly Signal and has
its own card. It currently defaults to `THE OBSERVABILITY DIGEST`, which is the producer's old default.
**Put to Al: does the Digest keep `THE OBSERVABILITY DIGEST`, or fold under `THE SIGNAL`?** They are
different products, so Content's read is that it keeps its own, but it is his call.

**2. byte-size loses its stream signal.** Under the ruling a byte-size card carries `BYTE-SIZE`, not
`TECHNICAL` or `LEADERSHIP`. That is consistent with how Al resolved the Tech Tuesday question — the
format wins the top corner — but it means byte-size amplification cannot lean on the card to say which
stream it is. **Flagging it against GR-2026-09-14-02, the amplification stream-signal rule**, not
objecting to it.

## Effect on the sweep

**Evergreen winner #6, `what-is-grafana-alloy`, is settled by this: eyebrow `BYTE-SIZE`.** The other
five are unchanged, TECHNICAL for the OpenTelemetry Collector guide and LEADERSHIP for the four
strategy and cost pieces. **All six already have the correct footer under the existing blogthumb code**,
so the sweep needs no footer work.
