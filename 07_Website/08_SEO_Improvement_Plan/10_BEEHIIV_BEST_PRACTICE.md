# Beehiiv Best Practice (grounded in our numbers)

**Written 2026-06-23 by the branding chat.** The reference that was missing. Best practice for the **Mastering Observability** beehiiv publication, mapped to what we actually have, not generic advice. Pairs with `09_BEEHIIV_TEMPLATES.md` (the v2.0 templates), `05_SEO_TO_REVENUE_MODEL.md` (the funnel), `06_CTA_LIBRARY.md` (routing). UK English, no em dashes.

## Where we are (live, last 3 months, pulled 2026-06-23)
- **543 active subscribers.** +3 net over 3 months (14 new, 11 churned). Effectively flat.
- **Open rate 31.9%** (healthy for a senior B2B list). **Click rate 3.82%** (the problem: people open and read, almost nobody clicks through).
- **Earnings $0.** Top acquisition source is **recommendations** (project-overwatch referral), then direct, Reddit, Perplexity, Google, ChatGPT.

The read: engagement is fine, **conversion is the gap**. Blogs had no CTA, newsletters under-routed, click rate is 3.8%. The v2.0 templates with baked-in CTAs are the first fix. The rest of this doc is how to compound it.

## 1. Deliverability (protect the 31.9% open rate)
- **Authenticate the sending domain.** SPF, DKIM and DMARC on masteringobservability.com. (You already saw a DMARC report land in Gmail, so DMARC is at least partly set; confirm SPF and DKIM are aligned in beehiiv's domain settings.) In 2026, engagement signals plus authentication decide inbox placement.
- **Let beehiiv warm the domain** if sending volume rises (e.g. a report launch blast).
- **Keep the list clean.** 11 churned in 3 months is normal; the bigger risk is silent disengagement dragging open rates down. See re-engagement (§5).

## 2. Design (now solved at template level)
- Use the three **v2.0 templates** for every send; never start from a blank post or an old template. That keeps the brand consistent and the CTA present by default.
- **Aim for a rough 50:50 text-to-visual rhythm** in longer pieces: a brand diagram (Diagram Standard), a pull quote, a table. Beehiiv has no drag-and-drop, so visuals come from image blocks and the themed table/quote styles now set to v2.0.
- **One idea per section, scannable.** Senior readers skim first. Bold the turn, not everything.

## 3. CTA and funnel (the 3.82% fix)
- **Every post carries a CTA, routed by intent** (per `06_CTA_LIBRARY.md`): commercial blog → advisory (Block A); informational / bite-size → newsletter (Block B); every newsletter → footer (Block C, book first). Baked into the templates.
- **One primary CTA per post.** Competing CTAs split the click. The secondary link (free chapter) is a softer fallback, not a second ask.
- **Canonical links only** (Codex §26.1). The book is `amzn.eu/d/0cAuR2K1`, not a raw Amazon link.
- **Measure the click rate per post** monthly; the goal is to move 3.82% upward. If a CTA block underperforms, change the headline wording before the design.

## 3a. Email capture on web: popup, never gated (Al, 2026-06-26)
- **Standard for every web blog and web newsletter: email capture = popup, not gated.** Gated walls the body off behind an email form, which kills the read and is actively bad for SEO and AI-answer surfacing (the crawler and the human both hit a wall instead of the content). Popup still grows the list, it just asks after the reader can see the value.
- **Root cause:** the publication default capture type is currently **gated**, so any new post inherits gated unless overridden. Al flipped the five back-catalogue companions to popup by hand after they published. To stop that recurring, Growth now sets `email_capture_type_override: "popup"` on every post it builds via the API, and the build checklist below carries it.
- **The clean fix is at source:** change the publication-level default from gated to popup so nothing inherits the wall. That is an account setting (Al/Control to action), filed via the Growth inbox. Per-post override is the interim guard.
- **Exception:** genuine lead-magnet pages built to gate (e.g. the Independent Observability Report landing) stay gated on purpose. The popup rule is for editorial content (blogs, newsletters, byte-size, episode companions), not deliberate gated assets.

## 4. Growth (lean into what already works)
- **Recommendations are our number-one source.** Double down: beehiiv's recommendation network and reciprocal recommends with adjacent observability / SRE / platform newsletters. This is the cheapest qualified growth we have.
- **Cross-promotions / partnerships** are the fastest organic channel in 2026 (cross-promo subs open at 60-70% vs 30-40% for paid). A 50-150 word swap with one clear CTA. Same warm-vendor muscle as the survey amplification ask.
- **The Independent Observability Survey and Report** (`08_Revenue/03_...`) is the big list-growth play: gated report = qualified subscribers at scale. The beehiiv native survey, landing page, segments and welcome automation are the build.
- **AI-surface referrals are real** (Perplexity, ChatGPT both sent subs). The SEO work that makes pages answer questions cleanly is also feeding AI answer engines. Keep the evergreen/bite-size pages sharp.

## 5. Segmentation, welcome and re-engagement (the compounding layer)
- **Welcome flow.** The v3 welcome email is built; make sure it is wired as the beehiiv welcome automation and carries the funnel. First impression sets the open-rate habit.
- **Segment by behaviour.** Beehiiv lets you combine attributes with AND/OR. Tag by industry (FS / gov / other), seniority, and the survey maturity score when it lands. Then the advisory CTA can target only the senior / high-maturity-gap segment, and the rest get newsletter nurture.
- **Re-engagement campaign.** Identify subscribers who have not opened in N sends and run a short win-back, then sunset the truly dead. Protects deliverability and makes the open rate honest.
- **Reward the loyal.** Highest open/click subscribers are the warmest advisory and review-copy leads; a periodic "leaders' cut" or first look keeps them close.

## The one-line operating rule
Every send starts from a v2.0 template, carries exactly one intent-routed CTA on canonical links, and is measured on click rate, not opens. Growth comes from recommendations, cross-promos and the report; retention comes from the welcome flow and re-engagement.

## Sources
- [beehiiv: The State of Newsletters 2026](https://www.beehiiv.com/blog/beehiiv-the-state-of-newsletters-2026)
- [beehiiv: Creating a High-Performance Newsletter](https://www.beehiiv.com/blog/email-newsletter-tutorial)
- [beehiiv: Re-Engagement Campaigns](https://www.beehiiv.com/blog/re-engagement-campaigns)
- [beehiiv: How Creator Partnerships Accelerate Growth](https://www.beehiiv.com/blog/creator-partnerships)
- [beehiiv: How To Measure Real Email Engagement in 2026](https://www.beehiiv.com/blog/email-engagement-metrics)
