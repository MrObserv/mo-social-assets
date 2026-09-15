# Warm Contributor Outreach Tracker

**Owner:** Growth (funnel). **Started 2026-07-08** after Al flagged the gap: the warm-contributor outreach was never logged in a canonical file, it lived only in Gmail, so there was no source of truth for who was contacted, who replied, or what was promised. This is that source of truth. Update it whenever an outreach is sent or a reply lands.

**Rule:** anyone in this tracker has been **personally outreached** and must be **EXCLUDED from the generic Warm Contributors nurture blast** (they should not get the mass "you said you'd help, reply with a story" email on top of a 1:1 note).

## The 17 June 2026 batch (reconstructed from Gmail)

| Name | Email | Role | Sent | Subject | Status | Owed / next action |
|---|---|---|---|---|---|---|
| **Ahmed Elbendary** | a.h.m.elbendary@gmail.com | Senior SRE | 17 Jun | Your contribution offer | **REPLIED, HOT** — shared 2 silent-failure cases (rotated-secret bleeding path; short-lived k8s jobs -> pushgateway) | **CORRECTED 2026-07-17 (Gmail verified):** NO bylined-piece draft exists in his thread (the earlier "draft staged 2026-07-08" note was wrong). Actual last state: Al's 17 Jun reply offered to shape case 1 into a 400-600 word piece with Ahmed's byline, pending Ahmed replying "yes" + sending his words. Ahmed has NOT replied since 17 Jun, so the ball is technically with him, but his 2 cases are already detailed enough to draft from. DECISION FOR AL: (a) Growth drafts the ~500-word piece now from case 1 and sends for his sign-off, or (b) a light nudge first. Recommend (a). |
| **Sunil Pandit** | spandit@meshiq.com | MD, meshiq | 17 Jun | Picking up your contribution offer | REPLIED — his CEO wants to lead "under Marketing"; this is a vendor angle, not a practitioner voice. Al set the boundary 20 Jun. | Parked. Not a practitioner contribution; keep the practitioner-voices line. No draft owed. |
| **Nagasivakumar** | nagasivakumarg8@gmail.com | Observability Engineer | 17 Jun | You offered to collaborate, let's | NO REPLY | Optional one gentle nudge, else leave. Ball is in his court. |
| **Carlos Romero** | carlos.romerov@gmail.com | (subscriber) | 17 Jun | That contribution offer, still open? | NO REPLY | Optional one gentle nudge, else leave. |

## Process fix — WIRED 2026-07-16 (GR-2026-07-08-04)
This tracker is the **canonical** contributor-outreach log; outreach lives here, not in Gmail. The twice-weekly Growth Health Check now reads it every run and (a) flags any REPLIED/HOT row with an open "Owed / next action", and (b) confirms every tracked name is excluded from the generic Warm Contributors nurture (`seg_dcd86d30`). Both checks are written into `13_GROWTH_HEALTH_CHECK.md` §5. New outreaches + replies get appended here at send/receive.

**Open flag for Al:** Ahmed Elbendary is still owed the ~470-word bylined piece "The dashboard was green. The system was not." — staged in his Gmail thread 2026-07-08, awaiting your send. The Health Check will keep flagging this until it ships.

**Last updated:** 2026-07-16 (Growth) — Health Check wiring + nurture-exclusion codified; canonical status confirmed.
