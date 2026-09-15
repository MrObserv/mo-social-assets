# Pull-Quote Standard — APPROVED 2026-07-16

**Run:** 2026-07-16 (Growth). **Trigger:** Al 2026-07-16 — our blog and newsletter bodies carry no pull-quotes; wants them as a styled code snippet, ≥2 per blog, ~1 per newsletter (the hook). **Status: APPROVED by Al 2026-07-16.**

**Decisions locked:**
1. Quote type = **pull-quotes, verbatim from the body, no external quotes**. Pick the right line (a real belief/POV line), never a third-party quote.
2. **Blogs (Conviction): ≥2. Newsletters: 1** (the hook).
3. **Byte-sizes: EXEMPT from pull-quotes.** Instead, byte-sizes carry **≥2 diagrams** going forward (Al: byte-sizes are diagram-heavy so the concept lands; supersedes the old ≥1-diagram rule). Baked into `12_BYTESIZE_SERIES.md`.
4. Block Q styling **approved as shown** (teal left-rule, light panel). Placement is Growth's call.

Baked in 2026-07-16: Block Q added to `08_CTA_HTML_SNIPPETS.md`; counts into `BLOG_PUBLISH_QA_GATE.md` + `12_BYTESIZE_SERIES.md`; hook quote into `Observability_Digest_TEMPLATE.md`. Filed to Control/Voice Codex to register as a standard.

## What the research says
- **Pull-quotes are a scannability + dwell device, not an SEO trick.** They break text walls and give a skimmer a visual anchor; ~73% of readers bail fast on hard-to-scan pages, and a highlighted takeaway line is one of the cheapest ways to hold them. They also give AI answer engines a clean, emphasised statement of the piece's core claim.
- **Accessibility is the reason to standardise it as a block.** A visual pull-quote that repeats a line already in the body is duplicate text to a screen reader. Best practice: mark the block `role="presentation" aria-hidden="true"` so assistive tech skips the repeat. Hand-formatting misses this every time; a standard snippet bakes it in.
- **On our two-surface model, the pull-quote lives on the LIGHT in-body surface** (white/near-white, ink text, teal accent), exactly like the white content panel of Blocks A/B/E, not the dark asset surface.

## Recommendation

### 1. Quote type — pull-quotes (Allan's own lines), not third-party quotes
The standard quote is a **verbatim line lifted from the body** and set large, the way "the hook as an example" implies for newsletters. Rationale: always available, zero §11 attribution risk, and it reinforces Allan's belief/Nuclear one-liners, which are already a brand asset. External attributed quotes stay **optional/additional** when a genuinely strong, verifiable one exists, never required (they carry attribution risk and are not always to hand).

### 2. Counts by format
- **Blog (Conviction): minimum 2.** #1 in the top third = the thesis / belief line (gives the scanner the payoff early). #2 in the back half = the turn or the memorable close line.
- **Byte-size (Explainer): 1** — the core definitional / belief line. (Proposed; byte-sizes are short, so one is right. Al to confirm.)
- **Newsletter (weekly companion + monthly Digest): 1** — the hook / POV line, placed after the intro, before the podcast player.

### 3. Selection rules
- Must be a **verbatim** line from the body (so `aria-hidden` is honest and there is no double-read).
- On-voice: prefer a belief / Conviction one-liner; ≤ ~20 words.
- §5 clean (UK English, **no em dash**, no page/pager vocab).
- Not adjacent to a diagram or the CTA block (avoid visual crowding); never the very first or last line of the body.

### 4. The code snippet — "Block Q", light in-body surface
Added to the snippet library alongside Blocks A–E. Email-safe table, inline hex, DM Sans, teal left-rule, `aria-hidden` for the repeat.

```html
<!-- M&M PULL-QUOTE (Block Q). v2.0 brand, LIGHT in-body surface. Email-safe. aria-hidden: the quote is a verbatim line from the body, so screen readers skip the repeat. -->
<table role="presentation" aria-hidden="true" width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:26px auto;">
  <tbody><tr>
    <td style="background-color:#F5FAF9;border-left:5px solid #2F9E8D;padding:18px 24px;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
      <p style="margin:0;font-size:21px;line-height:1.4;color:#0D2127;font-weight:700;">[The verbatim line lifted from the body goes here.]</p>
    </td>
  </tr></tbody>
</table>
```
(Teal left-rule signals the quote; no decorative dash, keeping it §5-clean.)

### 5. Where it is baked in (on approval)
- Snippet library `08_CTA_HTML_SNIPPETS.md` gains a "Content blocks" section with Block Q.
- Blog QA gate `BLOG_PUBLISH_QA_GATE.md` + the byte-size standard `12_BYTESIZE_SERIES.md` + the Diagram/blog standards get the count rule.
- Newsletter templates (weekly companion + `Observability_Digest_TEMPLATE.md`) get the 1-quote hook placement.
- Filed to Control/Voice Codex to register as a template/§ standard so it does not drift.

### 6. Retrofit — DONE 2026-07-16 (beehiiv, the publishing artifact)
All five scheduled blogs got 2 verbatim Block Q pull-quotes each (edits land in the scheduled post; they send on their existing dates, no re-publish needed). The two byte-sizes and the five live byte-sizes are EXEMPT (diagram-heavy), so no quote retrofit there.

- **No Agreed Pattern** (post_1f106988, sched 19 Jul): "We do not yet have an agreed way to run these things safely." / "An agent is that failure with the brakes off and nobody obviously holding the responsibility."
- **Causal** (post_9b9e9c05, sched 22 Jul): "The confident wrong answer does not look wrong. It reads like your best engineer wrote it." / "It hurts the moment you let it be the last question as well as the first."
- **Incident Response** (post_9250cbd7, sched 26 Jul): "An outcome owned by everyone is owned by no one." / "Heroism is the polite word for a system that was never positioned."
- **Ops Comms** (post_5f02c5d4, sched 2 Aug): "The message you send is not the message people receive." / "More communication is not better communication."
- **Maturity** (post_a43239b3, sched 9 Aug): "Maturity is not what you have installed. It is what you can actually do when it matters." / "A tool can hand you the raw material for a level. It cannot hand you the level."

Each quote is a verbatim body line, placed top-third (thesis) + back-half (turn/close), not adjacent to a diagram or the CTA, with `aria-hidden` on the block. Newsletter hook-quote placement is baked into the Digest template. Small follow-up: mirror the quotes into the `.md` source drafts so source-of-truth matches beehiiv (optional).

## Open decisions for Al
1. Quote type: pull-quotes (own lines) as the standard, external attributed quotes optional — yes?
2. Byte-size count: 1 pull-quote (vs exempt / vs 2)?
3. The Block Q styling (teal left-rule, light panel) — approve the vibe, or adjust?
