# CTA HTML Snippets (code drops for beehiiv)

> Email-safe HTML CTA blocks. **v2.0 brand sign-off applied 2026-06-23 by the branding chat.** Repainted from the email palette to the v2.0 brand tokens so beehiiv matches the slides, site, studio/meeting backgrounds and signature. Built to `06_Brand_Assets/Design_Standards/Email_Standard.md` (tables not divs, inline hex on every element, DM Sans / Space Mono stacks, 600px fluid-hybrid, MSO ghost table, no rgba/gradients/shadows). **No price in the CTA** (the price lives on `/advisory`). Links per Voice Codex §26.1 canonical URLs. §5-clean.

## v2.0 brand tokens used (not the old email palette)
- Navy band `#0D2127` · Teal `#2F9E8D` (rule + button) · Bright teal `#74DDCD` (eyebrow on navy) · Ink `#1a1a1a` · Muted `#44595b` · White `#ffffff`.
- Button: teal `#2F9E8D` background, **dark navy `#0D2127` bold text** (passes contrast; on-brand). Inline secondary links: navy `#0D2127` underlined.
- Fonts: DM Sans (body/headline), Space Mono (eyebrow). These are beehiiv-supported Google fonts and match the v2.0 system.

## How to insert in beehiiv
The three templates (`bite-size`, `blog`, `newsletter`) already carry the right block. For a one-off post, add a **Custom HTML block** at the position below and paste the whole snippet. Test-send to Outlook (light + dark) and one consumer client before publishing, per the Email Standard checklist.

## Where it goes (routing per `06_CTA_LIBRARY.md`)
- **Commercial-intent blogs** (Cost Conundrum, Putting It All Together, Harmonising IT, Business-Aligned Observability): **Block A** at the very end of the body, before any canonical-links footer.
- **Informational blogs / bite-size** (What Is Grafana Alloy, OTel Collector guide, definitional/how-to): **Block B**.
- **Every newsletter send:** **Block D** (the canonical links hub) as the standard footer. Block C is **not used** in a send (Voice Codex v1.9.36 ruling, 2026-08-14, GR-2026-08-09-06).

---

## Block A: Advisory (commercial posts)
```html
<!-- M&M CTA: ADVISORY (Block A). v2.0 brand. Email-safe. No price (price lives on /advisory). -->
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;">
  <tr><td bgcolor="#2F9E8D" style="background-color:#2F9E8D;height:4px;line-height:4px;font-size:4px;">&nbsp;</td></tr>
  <tr><td bgcolor="#0D2127" style="background-color:#0D2127;padding:24px 24px 18px 24px;">
    <p style="margin:0 0 8px 0;font-family:'Space Mono','Courier New',monospace;font-size:12px;letter-spacing:2px;color:#74DDCD;text-transform:uppercase;">Work with me</p>
    <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">An honest read on what your observability is actually doing.</p>
  </td></tr>
  <tr><td bgcolor="#ffffff" style="background-color:#ffffff;padding:20px 24px 24px 24px;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
    <p style="margin:0 0 18px 0;font-size:16px;line-height:1.5;color:#1a1a1a;">If you lead observability in a regulated enterprise, I run a fixed-scope Observability Assessment for senior IT and engineering leaders. It ends in a written roadmap and a readout, not a sales deck.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td bgcolor="#2F9E8D" style="background-color:#2F9E8D;border-radius:4px;">
        <a href="https://www.masteringobservability.com/advisory" style="display:inline-block;padding:12px 22px;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#0D2127;text-decoration:none;">See how it works &rarr;</a>
      </td>
    </tr></table>
    <p style="margin:16px 0 0 0;font-size:14px;line-height:1.5;color:#44595b;">Not ready to talk? Start with a <a href="https://www.masteringobservability.com/metrics-and-mayhem/free-chapter" style="color:#0D2127;text-decoration:underline;">free chapter of Metrics &amp; Mayhem</a>.</p>
  </td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
```

## Block B: Newsletter (informational posts)
```html
<!-- M&M CTA: NEWSLETTER (Block B). v2.0 brand. Email-safe. -->
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;">
  <tr><td bgcolor="#2F9E8D" style="background-color:#2F9E8D;height:4px;line-height:4px;font-size:4px;">&nbsp;</td></tr>
  <tr><td bgcolor="#0D2127" style="background-color:#0D2127;padding:24px 24px 18px 24px;">
    <p style="margin:0 0 8px 0;font-family:'Space Mono','Courier New',monospace;font-size:12px;letter-spacing:2px;color:#74DDCD;text-transform:uppercase;">Get the next one</p>
    <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">One signal a week. No noise.</p>
  </td></tr>
  <tr><td bgcolor="#ffffff" style="background-color:#ffffff;padding:20px 24px 24px 24px;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
    <p style="margin:0 0 18px 0;font-size:16px;line-height:1.5;color:#1a1a1a;">If this was useful, Metrics &amp; Mayhem sends one short, practical piece like it to IT operations leaders most weeks. No fluff, no vendor noise.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td bgcolor="#2F9E8D" style="background-color:#2F9E8D;border-radius:4px;">
        <a href="https://masteringobservability.com" style="display:inline-block;padding:12px 22px;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#0D2127;text-decoration:none;">Join free &rarr;</a>
      </td>
    </tr></table>
    <p style="margin:16px 0 0 0;font-size:14px;line-height:1.5;color:#44595b;">Prefer to start with the book? Read a <a href="https://www.masteringobservability.com/metrics-and-mayhem/free-chapter" style="color:#0D2127;text-decoration:underline;">free chapter</a>.</p>
  </td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
```

## Block C: Newsletter footer — RETIRED from sends (2026-08-14) — book first, advisory for the right reader
> **Retired from newsletter sends (Voice Codex v1.9.36, 2026-08-14, GR-2026-08-09-06).** Sends use **Block D** (the canonical links hub) as the footer; Block C is not used in a send. Kept here for reference.
```html
<!-- M&M CTA: FOOTER (Block C). RETIRED from newsletter sends 2026-08-14 (Block D is the send footer per Voice Codex v1.9.36); kept for reference. v2.0 brand. Links per Codex 26.1. -->
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;">
  <tr><td bgcolor="#2F9E8D" style="background-color:#2F9E8D;height:4px;line-height:4px;font-size:4px;">&nbsp;</td></tr>
  <tr><td bgcolor="#0D2127" style="background-color:#0D2127;padding:24px;">
    <p style="margin:0 0 14px 0;font-family:'Space Mono','Courier New',monospace;font-size:12px;letter-spacing:2px;color:#74DDCD;text-transform:uppercase;">Two ways to go deeper</p>
    <p style="margin:0 0 6px 0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#ffffff;">The book</p>
    <p style="margin:0 0 16px 0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:#a8d8ea;">Metrics &amp; Mayhem: A CTO's Guide to Observability That Actually Works. Kindle, paperback and hardback are out. <a href="https://www.masteringobservability.com/metrics-and-mayhem/free-chapter" style="color:#74DDCD;text-decoration:underline;">Free chapter</a> &middot; <a href="https://amzn.eu/d/0cAuR2K1" style="color:#74DDCD;text-decoration:underline;">Get the book</a></p>
    <p style="margin:0 0 6px 0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#ffffff;">Work with me</p>
    <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:#a8d8ea;">A fixed-scope Observability Assessment for senior IT and engineering leaders. <a href="https://www.masteringobservability.com/advisory" style="color:#74DDCD;text-decoration:underline;">See how it works</a></p>
  </td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
```

## Block D: Canonical links hub (newsletter "all links" footer) — v2.0, free chapter leads
> Added 2026-06-26. **The standard footer for every newsletter send (Voice Codex v1.9.36, 2026-08-14, GR-2026-08-09-06); Block C is retired from sends.** Replaces the plain-text link list that shipped in the June Digest. Free chapter is the primary button (the acquisition pivot); book/podcast/LinkedIn are secondary. §26.3 newsletter variant below OMITS the newsletter-subscribe link (redundant inside a send); the web variant adds a "Newsletter" row. YouTube row is held until the channel URL is confirmed (one-line add).
```html
<!-- M&M CTA: CANONICAL LINKS HUB (Block D). v2.0 brand. Email-safe. Free chapter leads. Links per Codex 26.1/26.3. Newsletter variant: subscribe link omitted. -->
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;">
  <tr><td bgcolor="#2F9E8D" style="background-color:#2F9E8D;height:4px;line-height:4px;font-size:4px;">&nbsp;</td></tr>
  <tr><td bgcolor="#0D2127" style="background-color:#0D2127;padding:24px 24px 20px 24px;">
    <p style="margin:0 0 8px 0;font-family:'Space Mono','Courier New',monospace;font-size:12px;letter-spacing:2px;color:#74DDCD;text-transform:uppercase;">Everything in one place</p>
    <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">New here? Start with the free chapter.</p>
  </td></tr>
  <tr><td bgcolor="#ffffff" style="background-color:#ffffff;padding:22px 24px 24px 24px;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td bgcolor="#2F9E8D" style="background-color:#2F9E8D;border-radius:4px;">
        <a href="https://www.masteringobservability.com/metrics-and-mayhem/free-chapter" style="display:inline-block;padding:13px 24px;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#0D2127;text-decoration:none;">Read the free chapter &rarr;</a>
      </td>
    </tr></table>
    <p style="margin:20px 0 10px 0;font-family:'Space Mono','Courier New',monospace;font-size:12px;letter-spacing:2px;color:#2F9E8D;text-transform:uppercase;">More from Metrics &amp; Mayhem</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;">
      <tr><td style="padding:7px 0;color:#16282D;"><strong>The book</strong> &nbsp;&middot;&nbsp; <a href="https://amzn.eu/d/0cAuR2K1" style="color:#17695C;text-decoration:underline;">Get Metrics &amp; Mayhem &rarr;</a></td></tr>
      <tr><td style="padding:7px 0;border-top:1px solid #EAF6F3;color:#16282D;"><strong>Podcast</strong> &nbsp;&middot;&nbsp; <a href="https://www.masteringobservability.com/metrics-and-mayhem/podcast" style="color:#17695C;text-decoration:underline;">Listen on Spotify &amp; Apple &rarr;</a></td></tr>
      <tr><td style="padding:7px 0;border-top:1px solid #EAF6F3;color:#16282D;"><strong>Connect</strong> &nbsp;&middot;&nbsp; <a href="https://www.linkedin.com/in/allanmann1/" style="color:#17695C;text-decoration:underline;">Allan on LinkedIn &rarr;</a></td></tr>
    </table>
  </td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
```

---

## Block E: Book a slot (engagement / "let's talk" close)
> Added 2026-07-16. For byte-sizes and posts that close with an invitation to talk rather than a newsletter push. **Canonical calendar URL: `https://calendar.app.google/y2wSmwhGrkf8r5Xv5`** (this REPLACES the old, wrong `calendly.com/managing_observability/30min` link, which must not be used again). Free chapter is the soft secondary.
```html
<!-- M&M CTA: BOOK A SLOT (Block E). v2.0 brand. Email-safe. Canonical calendar: calendar.app.google/y2wSmwhGrkf8r5Xv5 -->
<table width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;">
  <tr><td bgcolor="#2F9E8D" style="background-color:#2F9E8D;height:4px;line-height:4px;font-size:4px;">&nbsp;</td></tr>
  <tr><td bgcolor="#0D2127" style="background-color:#0D2127;padding:24px 24px 18px 24px;">
    <p style="margin:0 0 8px 0;font-family:'Space Mono','Courier New',monospace;font-size:12px;letter-spacing:2px;color:#74DDCD;text-transform:uppercase;">Seen this yourself?</p>
    <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">Green dashboards, but customers still dropping out?</p>
  </td></tr>
  <tr><td bgcolor="#ffffff" style="background-color:#ffffff;padding:20px 24px 24px 24px;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
    <p style="margin:0 0 18px 0;font-size:16px;line-height:1.5;color:#1a1a1a;">I would like to hear it, especially from anyone running a real customer journey through this. Book a slot and tell me what you found.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td bgcolor="#2F9E8D" style="background-color:#2F9E8D;border-radius:4px;">
        <a href="https://calendar.app.google/y2wSmwhGrkf8r5Xv5" style="display:inline-block;padding:12px 22px;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#0D2127;text-decoration:none;">Book a slot &rarr;</a>
      </td>
    </tr></table>
    <p style="margin:16px 0 0 0;font-size:14px;line-height:1.5;color:#44595b;">Prefer to read first? Start with a <a href="https://www.masteringobservability.com/metrics-and-mayhem/free-chapter" style="color:#0D2127;text-decoration:underline;">free chapter of Metrics &amp; Mayhem</a>.</p>
  </td></tr>
</table>
```

---

## Content blocks (not CTAs)

### Block Q: Pull-quote (in-body, blogs + newsletters)
> Added 2026-07-16 (Al approved). A **verbatim** line lifted from the body, set large on the LIGHT in-body surface. Rule: **Conviction blogs carry ≥2; newsletters carry 1** (the hook line). **Byte-sizes are EXEMPT** (they are diagram-heavy; see `12_BYTESIZE_SERIES.md`). Selection: pick the right line — a belief / Conviction one-liner, ≤ ~20 words, §5-clean, verbatim from the body. Placement (Growth's call): blog #1 in the top third (the thesis line), #2 in the back half (the turn or close); not adjacent to a diagram or the CTA; never the first or last body line. Newsletter: after the intro, before the podcast player. **Accessibility:** the block carries `role="presentation" aria-hidden="true"` so a screen reader does not read the line twice (it is already in the body). **Render note (learned 2026-07-16):** the teal rule is a `border-left` on the single light cell, NOT a separate coloured `<td>` — a separate 6px cell renders as a large teal square in beehiiv. Always Preview the htmlSnippet in the beehiiv editor before shipping.
```html
<!-- M&M PULL-QUOTE (Block Q). v2.0 brand, LIGHT in-body surface. Email-safe. VERBATIM body line only. aria-hidden: skip the repeat for screen readers. -->
<table role="presentation" aria-hidden="true" width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:26px auto;">
  <tbody><tr>
    <td style="background-color:#F5FAF9;border-left:5px solid #2F9E8D;padding:18px 24px;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
      <p style="margin:0;font-size:21px;line-height:1.4;color:#0D2127;font-weight:700;">[The verbatim line lifted from the body goes here.]</p>
    </td>
  </tr></tbody>
</table>
```

---

## Notes
- **Two canonical booking links (Codex §26.1), do not confuse them:**
  - **Byte-size / "book a slot, tell me what you found"** (casual feedback close) = `https://calendar.app.google/y2wSmwhGrkf8r5Xv5`.
  - **Advisory "book a call"** (Block A + the /advisory page) = `https://calendar.app.google/YTbYSEJFQcdaHyAu5` (already wired throughout the advisory page; NOT changed).
  - The old `calendly.com/managing_observability/30min` was WRONG and is deprecated. **Sweep complete 2026-07-31:** all live byte-sizes (MCP, Odigos, OpenTelemetry, eBPF, Distributed Tracing) verified on the canonical link; the warm-contributor nurture + the two held vendor drafts (BMC Helix, ManageEngine) now fixed. The advisory page uses the correct Google link (never had the old one). Remaining old-link mentions in the workspace are historical records/logs + stale published-post source `.md` only (live surfaces are clean); optional hygiene follow-up to resync those source files.
- Headlines are Conviction-register first passes; tune per post.
- Canonical links only (Codex §26.1). Book = `amzn.eu/d/0cAuR2K1`. A URL change is a Codex bump, not an inline edit.
- These blocks are baked into the beehiiv templates (`bite-size` → Block B, `blog` → Block A or B by intent, `newsletter` → **Block D** the canonical links hub; Block C is retired from sends, 2026-08-14). The HTML here is the fallback for one-off web-only posts.
