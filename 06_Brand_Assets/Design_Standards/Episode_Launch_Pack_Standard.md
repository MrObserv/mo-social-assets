# Episode-Launch Pack Standard (SOC-2026-08-08-01)

**Owner:** Podcast Ideas console + Brand/Growth (they PRODUCE the assets, upstream). **Social only STAGES + amplifies — it never produces launch assets reactively.** **Registered:** 2026-08-08. **Why:** the same failures kept recurring (coverless reels fired twice — SD25 ×5, TT03 ×4) because the fixes lived in chat and reset each session. They are now baked into this standard + the asset spec + a staging gate + a daily pre-fire sweep, per `05_Social_Media/Session_Learnings_and_Bakeins_2026-08-08.md`.

## 1. Required launch-pack deliverables (every episode, no exceptions)

Produced UPSTREAM by Pod + Brand as part of the recording-pack build, BEFORE Social stages anything:

- **Recording pack** (`NN_recording_pack.md`, record-ready, §5-clean) — per the pack standard. **Reader's Script layout is the standing render-ready pack format, adopted 2026-08-21** (Al, VC-2026-07-03-02): the pilot demonstrated on Ep 22 (`02_Voice_Codex/Drafts/22_readers_script_pilot_DRAFT.md`) is now the canonical pack shape; codex §25.5.1 reference lands in the pending v1.9.38 bump.
- **Episode art (square) + Beehiiv variant**, **OG card**, **9:16 bookends** — per `OG_Card_Standard.md` + `Shortform_Bookend_Standard.md`, via the canonical `thumbnail_builder.py` (sync the sandbox copy first — see `Canonical_Registry_2026-08-06.md`).
- **Cover-baked `reel_*` clips** — the episode's short clips, each with the cover frame BAKED IN (frame 0), never a raw `riverside_*` export.
- **One quote card** (the Hard Stop, dark-asset surface).
- **One carousel** (per `Carousel_Standard.md`).

If any of these is missing, the episode is NOT launch-ready. Social flags the gap upstream; it does not scramble to produce them.

## 2. Asset spec (Buffer + LinkedIn hard limits — learned the hard way)

- **Reels:** 1080×1920, cover baked in at frame 0.
- **LinkedIn square:** 1080×1080. A 2160×2160 / 96 MB square will NOT ingest; re-encode to 1080 / ~18 MB.
- **Keep files small.**
- **URLs:** plain public **GitHub-raw** URLs only. Buffer **rejects signed S3 URLs**, **cannot post to YouTube Community**, and **cannot set YouTube's Related Video**.

## 3. Cover gate + daily pre-fire sweep (enforced, not advisory — SOC-2026-08-01-04)

- **At staging:** the staging path REFUSES any raw `riverside_*` / non-cover-baked asset, and runs a bake-time frame-0 check (is the cover actually on the clip?). *(Wiring into the `social-daily-drive` SKILL is a protected-folder edit — Al or the efficiency rebuild; flagged.)*
- **Daily pre-fire sweep:** a standing check scans already-SCHEDULED Buffer posts for raw/uncovered assets and fixes or flags them BEFORE they fire. This is the guard that was missing — all 4 TT03 posts fired coverless because scheduled posts beat the trigger. Added to the Control Admin (Haiku) standing checks.

## 4. Link-back SOP

YouTube's **Related Video** is the only clickable back-link, and it is a manual Studio step. Everywhere else: **link-in-bio** (Linktree repointed to the newest video each launch) + the **URL in the first comment**.

## 5. Division of labour (settles "is it Social's job?" — no)

- **Pod + Brand:** produce every asset above (part of the launch pack).
- **Social:** stage + amplify, draft the daily §25.9 replies, curate news to the Company Page, run the profile cadence, and flag gaps. Social produced assets reactively this session ONLY because the pack did not include them — this standard fixes that.

## 6. Standing personal-profile native-video slots — Mon + Wed (PI-2026-07-16-09, Al 2026-07-16)

The best short of each episode is posted as **native video on Allan's personal LinkedIn (allanmann1)** — LinkedIn's highest-reach format — on two fixed weekly slots:

- **MONDAY** = the best short from Friday's **Signal Drop**.
- **WEDNESDAY** = the best short from the **Tech Tuesday**.

Rules:
- **Native upload of the 9:16 clip. Never a YouTube link** in the body (LinkedIn throttles links).
- The **full-episode link + book line go in the FIRST COMMENT** per §26.3.
- **Podcast Ideas nominates the best short** (default = the Hard Stop clip); **Social sanity-checks against vidIQ before firing**.
- **Dependency (empty-Short guard):** the 9:16 clip must be hosted with its raw URL resolving before the slot fires; the first-comment link is filled once the episode is live.
- **Growth owns the caption angle / SEO.**

Also carried in Codex §25.6 (Signal Drop launch cadence) as the Monday personal-profile native slot.

*Registered in `00_Design_Standards_Index.md`. Routed to Podcast Ideas + Growth to adopt in the recording-pack build.*
