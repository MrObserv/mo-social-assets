# Reply / Click Keyword Flow — Design Spec

**Filed:** 2026-08-01 (Growth). **Why:** captures the "reader signals a word, a flow runs hands-off" idea that has only ever lived in chat, so it stops evaporating and can actually be built. Covers the two-stream split (Technical / Leadership) and the podcast guest funnel on the same mechanism. **Status:** design for Al's review; self-challenged (see §7) before hand-off.

---

## 1. What we want
A reader on the newsletter signals an intent with the least possible effort, and it runs a flow with no manual step from us:
- **Stream:** "give me the technical cut" / "give me the leadership cut".
- **Guest:** "I'd like to come on the podcast".

## 2. The constraint that shapes everything
Beehiiv automations trigger on only three things: **signup**, **segment membership change** (`segment_action`), and **purchased_product**. There is **no native "reply/click contains a keyword" trigger**, and Beehiiv does not expose inbound email replies to automations at all. So a reply or click can never *directly* run a Beehiiv flow. Every option below therefore needs a **bridge** that sits outside Beehiiv. This is also the exact reason the two stream segments are still empty (1 and 1): the bridge was never built, only the segments were.

## 3. The bridge (how a signal becomes a flow)
One mechanism, reused for every input method:

`reader signal → Gmail (allan@masteringobservability.com) → a Gmail filter labels it (Stream/Tech, Stream/Leadership, Podcast/Apply) → a scheduled task reads the labelled messages, matches sender email → Beehiiv subscriber, sets a custom field via the connector → the field change moves them into a segment → a segment_action automation runs the flow → the task marks the message handled.`

## 4. Three ways to capture the signal (a friction ladder)
1. **Reply a word** (TECH / LEADERSHIP / GUEST). Zero build, works in every mail client, but the reader has to type and send, and free text is messy to parse ("I work in a technical role" is a false positive for "TECH"). Keep it as the always-works fallback, not the primary.
2. **Pre-filled mailto link (recommended primary — Al's idea).** A button whose link is `mailto:allan@masteringobservability.com?subject=TECH`. Tapping it opens the reader's mail app with the subject already filled; they just hit send. The Gmail filter keys on the **exact subject**, so there is nothing to parse and no false positives. For the guest button, pre-fill the body too: `?subject=GUEST&body=Name:%0ARole:%0AOne topic I'd bring:%0AWhy it fits:`. Caveat: mailto opens the default mail app, which a minority of pure-webmail users have not set up; the reply-word fallback covers them.
3. **One-click form / page (most robust, most clicks).** A link carrying the reader's identity via Beehiiv's `{{email}}` merge tag to a small form or page that sets the field directly, no inbox round-trip. Cleanest data, but it is a page load plus a submit, i.e. more friction than a mailto. Treat as a phase-2 upgrade.
4. **In-email Beehiiv poll (native, one click — best for the binary stream choice).** Embed a poll: "Which cut do you want? Technical / Leadership / Both." One tap inside the email, no mail app, no typing, fully native to the newsletter. It does not fire an automation by itself, but the same bridge task reads the responses (`list_poll_responses`), sets `sub_stream`, and the `segment_action` flow runs. Cleaner input than a reply or a mailto. It cannot capture free text, so it suits the stream choice, not the guest application.

**Decision:** **stream → a poll** (lowest friction, native, no mail-app dependency); **guest → a pre-filled mailto** (it needs the free-text name / topic / why), with the **reply-word line** as the universal fallback for both; hold the standalone form as phase 2.

## 5. How the newsletter presents it
- **Stream (every send, in the "set your stream" block):** a Beehiiv poll — "Which cut do you want? Technical / Leadership / Both" — with the existing reply-word line underneath as the fallback for anyone who misses it.
- **Guest (podcast issues + episode outros):** one button — "Apply to come on the podcast →" (`subject=GUEST`, body pre-filled with the four questions) — or, once built, a link to the guest page.

## 6. Backend pieces
- **Custom fields:** `sub_stream` (exists: Technical & Practitioner / Leadership & Strategy / Both) already feeds the stream segments; add `guest_interest` (new) to feed a Podcast Guests segment.
- **Segments:** the two existing stream segments; a new Podcast Guests segment.
- **Automations:** a "welcome to your stream" `segment_action` flow per stream; a "podcast guest intake" `segment_action` flow (thank-you + what-to-expect + book-a-slot) that also creates a tracker row.
- **Scheduled worker:** fold into an existing daily task to save cost — read the newsletter **poll responses** (`list_poll_responses`, for the stream choice) **and** the Gmail labels (for guest applies + reply-word fallback), resolve responder → subscriber (`list_subscriptions` by email), set the field, mark handled. Idempotent; flags unmatched senders for a human glance rather than dropping them.

## 7. Self-challenge — what could break (reviewed before hand-off)
- **The whole thing hinges on the Gmail bridge task.** No task, nothing fires. This is the single point of failure and the reason the streams are empty today. Build the bridge or none of the pretty buttons do anything.
- **mailto reliability:** webmail-only and some mobile clients; mitigated by the reply-word fallback, not eliminated.
- **Sender-address mismatch:** a reader who replies from a different address than they subscribed with will not match a subscriber. The task must flag these, not silently drop them.
- **Reply-word false positives:** "contains TECH" catches "technical" in a sentence. The mailto/subject path avoids this entirely — the strongest argument for leading with it.
- **Double-processing:** the task must mark messages handled so a re-run does not re-fire the flow.
- **Privacy / scope:** the task reads only the Stream/* and Podcast/* labels, nothing else in the inbox; scope the Gmail filter tightly.
- **Honest "is it worth it?" check:** the streams have had zero new survey responses since April and the list is ~89% anonymous, so this flow refines a small, already-engaged tail — it is **not** the main growth lever. The bigger lever is still fixing signup inflow (P1b). So: ship the mailto buttons now (cheap, no backend), but sequence the bridge task **after** or alongside the inflow fix, not before it. Do not let this become a shiny distraction from the leak that actually matters.

## 8. Build order + ownership
1. Add the **stream poll** + the **guest APPLY mailto button** to the newsletter/digest template. **Growth.** Cheap, no backend, ships value immediately (readers can at least send the signal; poll responses accrue in Beehiiv ready for the bridge).
2. Create the Gmail filters + labels (Stream/Tech, Stream/Leadership, Podcast/Apply). **Al**, one-time.
3. Build the scheduled bridge task (labels → fields). **Control** (scheduled-task roster).
4. Create `guest_interest` field + Podcast Guests segment + the intake automation. **Growth** builds; **Al** approves live.
5. Wire the guest tracker to the intake. **Growth.**

The podcast guest funnel's **inbound leg is this flow** (GUEST signal → intake → tracker); the outbound leg (targeting the 63 warm yes/maybe pool, outreach template) runs alongside it.
