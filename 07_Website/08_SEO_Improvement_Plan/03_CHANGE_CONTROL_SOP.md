> **SUBORDINATE to the canonical change control** (Content_System_Governance §3 + `00_Command_Center/Change_Requests.md` + `Ops_Log.md`). SEO structural changes go through the Control chat via a **[SEO]** Change Request; this file is an SEO-local working note only, not a parallel change-control system. (Recorded by Control 2026-06-22.)

# Content Change Control — SOP

**Purpose:** every content or SEO change to masteringobservability.com is proposed, recorded, applied, verified, and reversible. The project files are the system of record (no Slack/ticketing by choice).

**Scope:** meta titles and descriptions, OG/Twitter fields, on-page content, episode titles, and new posts or pages. Anything that changes what is published or how it appears in search.

**Roles (solo operator):**
- Allan: owner, approver, implementer (changes are applied by hand in the beehiiv dashboard; the connector is read-only for posts).
- The agent: proposes drafts, captures rollback values, verifies live state, writes the log.

## The process (every change follows these 5 steps)
1. **Propose** — draft the change in the plan folder (e.g. `01_Evergreen_Winners/`). Title/description must pass the tracker limits (title <=60, description 120-160).
2. **Record rollback** — before changing anything, capture the current live value into `CHANGE_LOG.md` (the "Old value" column). This is the rollback.
3. **Apply** — make the change in beehiiv.
4. **Verify** — re-pull the post via the beehiiv connector (and check Search Console over the following weeks) to confirm the live value matches the approved draft.
5. **Log** — set the `CHANGE_LOG.md` row to Verified, and mark the matching row in `00_SEO_Metadata_Tracker.xlsx` as Done.

## Rollback
To revert any change, paste the "Old value" from its `CHANGE_LOG.md` row back into the relevant beehiiv field. No change is applied without its old value recorded first.

## Cadence
Changes are batched and actioned in the **Monday 09:00-10:00 SEO & Content block** and logged in the same session. The Monday ~07:00 automated check supplies the week's data (beehiiv + Search Console).

## Definition of done (per change)
Live value matches the approved draft, the tracker row is marked Done, and the change-log entry is Verified.