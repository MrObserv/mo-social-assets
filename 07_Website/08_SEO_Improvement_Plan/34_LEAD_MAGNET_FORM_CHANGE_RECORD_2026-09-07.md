# Lead magnet form: change record and rollback

**Written 2026-09-07 by the website build satellite, per `07_Website/_WEBSITE_BUILD_BRIEF.md`.**
**Object: subscribe form `310e7847-1bcc-43eb-9d0d-33af4a209645`, "Free Chapter 4 (lead magnet, LinkedIn + gated)".**
**This is pack 32 proposal P1, executed. Written urgently because the rollback values can no longer be recovered from the API.**

---

## 1. Why this file exists now rather than after publishing

The intention was to stage every change as a draft, hand it to Al, and record what shipped only after he published. That is not what happened, and the record is being written early to preserve the rollback.

On 2026-09-07, after four `save_subscribe_form_theme` calls, `get_subscribe_form_diff` returned only **three** pending changes rather than the expected twenty-seven, and the value it reported as **live** for `header_subtitle` was a value this session had written as a **draft** one call earlier.

**So the live form has moved off its original state.** Two candidate causes, and this session cannot distinguish them from the available tools:

1. Al published the draft in the website editor between calls, which is entirely legitimate.
2. `save_subscribe_form_theme` does not behave as draft-only in the way its tool description states, and some writes reached live directly.

This matters beyond this form. `03_CHANGE_CONTROL_SOP.md` requires the old value to be captured before a change is applied. If cause 2 is correct, then any future connector write to a subscribe form theme is a live change, not a proposal, and must be treated as such.

**There is also a documented contradiction on custom fields**, unresolved:

- `save_subscribe_form` tool description: custom_fields "Replaces the existing set in the **DRAFT** and goes live when it is published from the website editor."
- `learn_subscribe_form_authoring`: custom_fields "**takes effect immediately on the live form**".

The free-chapter surfaces are egress-blocked from this container, so live rendering could not be verified visually at any point.

**Action for Al:** confirm whether you published in the builder during this session. If you did not, raise the connector behaviour with the Growth lane, because it changes the risk profile of every remaining proposal in pack 32.

---

## 2. Rollback: the original live state before any change

Captured from `get_subscribe_form` (with `include_defaults: true`) and the first `get_subscribe_form_diff` of the session, both read on 2026-09-06 before any write. **This is the only surviving record of these values.**

### Custom fields

`custom_fields: []`. The form captured email only.

### Copy

| Token | Original live value |
|---|---|
| `header_title` | Mastering Observability |
| `header_subtitle` | Mastering Observability is for IT and engineering leaders who need clearer decisions under pressure. Allan Mann shares practical, vendor-neutral thinking on observability, incident leadership and AI operations through the newsletter, the Metrics & Mayhem podcast, the book and advisory. |
| `form_submit_text` | Subscribe |
| `form_submitting_text` | Subscribing... |
| `settings_success_message_text` | Success! Now check your email to confirm your subscription. |

### Type

| Token | Original live value |
|---|---|
| `header_title_font_family` | PT Serif |
| `header_subtitle_font_family` | PT Serif |
| `form_field_font_family` | PT Serif |
| `form_field_label_font_family` | PT Serif |
| `form_button_font_family` | PT Serif |
| `form_button_font_weight` | 400 |
| `form_tos_label_font_family` | PT Serif |

### Colour

| Token | Original live value |
|---|---|
| `header_title_font_color` | #000000 |
| `header_subtitle_font_color` | #6B7280 |
| `form_field_input_text_color` | #000000 |
| `form_field_border_color` | #000000 |
| `form_field_label_font_color` | #000000 |
| `form_field_radio_button_accent_color` | #000000 |
| `form_button_font_color` | #FFFFFF |
| `form_button_background_color` | #000000 |
| `form_tos_label_font_color` | #000000 |

### Layout

| Token | Original live value |
|---|---|
| `form_direction` | row |
| `form_show_field_labels` | false |
| `form_gap` | 0px |
| `form_field_border_thickness` | 0px |
| `form_button_border_radius` | 0px 0px 0px 0px |
| `container_padding` | 80px 80px 80px 80px |

---

## 3. What was changed, and why

### Field capture

Two existing custom fields bound, deliberately reusing the field IDs already in use on form `ad0cdd4a` so the seven live role routers match without modification and no duplicate fields were created.

| Position | Field | custom_field_id | Required | Label |
|---|---|---|---|---|
| 1 | First Name | `649b04e9-c192-4c6e-9a22-714d8bf9291f` | yes | First name |
| 2 | Role | `bf2aa5ee-cf93-4e95-a0ea-7db41ba00c7f` | no | Your role (so we send you the right things, skip it and you get everything) |

Role options, unchanged from the canonical field: Engineer / SRE / DevOps, Architect / Specialist, Team Lead or Manager, Head of / Director, C-level (CTO, CIO), Vendor Sales or Marketing, Other.

`sub_stream` was deliberately not added. This is a gated download and a third dropdown costs completions for a preference the welcome sequence can collect later.

Note: the binding row IDs changed from 133459 and 133460 to 133728 and 133729 during the session. The `custom_field_id` values did not change, so routing is unaffected. beehiiv appears to recreate binding rows on each write.

### Brand repaint

Applied `Brand_Design_System_v2.md`: Montserrat headings, DM Sans body and labels, ink `#16282D`, navy `#0D2127`, teal `#2F9E8D`. Button follows the brand doc exactly: teal background, navy text, border width 0, radius 4.

**Known deviation.** Form `ad0cdd4a` uses `form_button_border_radius: 0px`. The brand doc specifies radius 4. The brand doc was followed, so the two forms now differ by 4px. Al to decide which is canonical, and the loser should be corrected.

### Layout

`form_direction` moved from `row` to `column` with labels on and a 12px gap. This was functional rather than cosmetic: a row layout with labels hidden works for a single email input but would have crammed three inputs side by side, including a seven-option dropdown, once the fields were added.

`container_padding` reduced from 80px on all four sides to `40px 32px`. Context confirmed by Al on 2026-09-07: this form is used on LinkedIn only, standalone, so a large share of views are mobile and the original padding consumed most of the viewport before a field appeared.

### Copy

| Token | New value | Rationale |
|---|---|---|
| `header_title` | Who owns what when it breaks | Taken from the live free-chapter page's own meta title. On LinkedIn the form stands alone with no page to frame it, so the first line had to be the offer rather than the brand name. |
| `header_subtitle` | Why one airline recovered from CrowdStrike in a day and another took five, from the identical fault. Chapter 4 of Metrics & Mayhem, free. The Signal follows each Friday. | 281 characters of publication boilerplate replaced with the chapter's actual hook, sourced from the live page. Discloses the newsletter before submission rather than only after. |
| `form_submit_text` | Send me chapter 4 | "Subscribe" promised a mailing list on a form that delivers a chapter. |
| `form_submitting_text` | Sending... | Consistency with the above. |

Al's own pending edit from 2026-09-01, the success message, was already in the draft when this session started and rode along unchanged.

**Correction recorded.** An earlier draft of this work described Chapter 4 as "the one about who owns the signal". That was invented and was never written to any live object. The real subject, from the live page: the three-layer ownership model of outcome owner, indicator owner and platform owner, and why most organisations staff only the platform layer. Al supplied the page reference on 2026-09-07.

---

## 4. Still outstanding

- **Whether the two custom fields are live.** Unresolved, see section 1.
- **Three tokens were pending** at the last read: `container_padding`, `header_title`, `header_subtitle`. Whether they have since gone live depends on the answer in section 1.
- **The 4px button radius conflict** with form `ad0cdd4a`.
- **Verification.** `03_CHANGE_CONTROL_SOP.md` step 4 requires re-pulling to confirm live matches the approved draft. Do this once the publish state is understood, and record the outcome against this file.
- **Not reconciled** against `28_WEBSITE_BASELINE_AUDIT_2026-07-26.md`, `29_BRAND_SAFE_WEBSITE_CHANGE_PACK_2026-07-26.md` or `04_CHANGE_LOG.md`, which remain unread by this session.
- **Not run:** `s5_lint.py`. `G:` does not mount in this container's shell. Em dashes checked by hand across this file: zero.

## 5. Bearing on the rest of pack 32

P3 proposes re-pasting the truncated custom HTML on `/advisory`. If connector writes can reach live without an explicit publish, that proposal should be treated as a live edit to a revenue page and applied by hand in the beehiiv editor by Al, not through the connector, until the behaviour is understood.
