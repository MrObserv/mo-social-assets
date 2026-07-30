# Short-Form Video Publishing Standard

**Status:** ADOPTED 2026-06-21 (canonized by the Control chat from the Daily Ops proposal). Sibling to `Quote_Card_Standard.md`. UK English, no em dashes, no "page/pager" alerting vocab (§5).

**One line:** clips publish the same way cards do. An asset lands in a folder → gets hosted on GitHub → gets drafted to Buffer for Al's approval. Video is just another asset type. The only manual channel is the YouTube Short.

## Standards

1. **Source of truth = recording pack Part 4.** The job reads per-platform clip copy (captions, hashtags, CTA) from the episode `NN_recording_pack.docx` Part 4. It never invents copy. (`episode-asset-watcher` injects Part 4 when clips + a clean headshot land; the v1.9.24 asset-watcher fix sanitises anchors so no markup leaks.)
2. **Clip naming + role map.** Canonical filenames `NN_clip_a_<slug>.mp4` / `NN_clip_b_<slug>.mp4`, mapped in the episode `_clip_overrides.json` (exactly one file per role; no spaces/apostrophes — keeps the hosted URL clean).
3. **Hosting (supervised, not headless).** Push the override-mapped clip to `mo-social-assets/clips/` via `06_Brand_Assets/Design_Standards/templates/push_clip.sh` (same mechanism as `push_card.sh`), authenticating with Allan's **local git credential**. Cowork has NO scheduled-task secret store, and its safety guidance keeps credentialed posting out of unattended tasks — so the GitHub push runs in the **supervised Daily Ops step** (Allan present). The scheduled tasks PREPARE everything (captions, drafts, calendar reminders); the actual push + Buffer attach happen in the Daily Ops chat. The `mo-social-assets-buffer` PAT expires 2026-09-18 (`rotate-github-asset-token` reminds).
4. **Publishing (Buffer Route A).** `create_post` with `assets.video.url` = the raw URL: Instagram Reel (`metadata.instagram.type=reel`, `shouldShareToFeed=true`) + TikTok (`metadata.tiktok.title`). Captions from pack Part 4, **§5-linted (`s5_lint.py`) before posting**.
5. **Approval gate (phased — Al, 2026-06-21).** Phase 1 (now): created as DRAFTS for Al's approval every run, same as cards. Phase 2: AUTO-SCHEDULED to the §25.6 slots once Al signals he trusts it. Al flips the switch.
6. **Cadence = KEEP §25.6 (Al, 2026-06-21).** The Friday check PREPARES (host + build the Buffer posts) and SCHEDULES them to their existing slots: Clip A → Tue (T+4), Clip B → Fri (T+7). Do NOT fire all on Friday.
7. **YouTube Short = manual, with a day-of pin reminder.** The job emits a paste-ready pack (title, description, pinned comment = the Hard Stop line, hashtags, **and the comma-separated YouTube Tags field — under 500 chars, §5-clean — which is MANDATORY and never omitted; the long-form §19.6 pack carries Tags and every clip Short must too**) and flags Al; Al uploads. The job also writes one paste-ready `NN_clip_a_shortform_pack.md` / `NN_clip_b_shortform_pack.md` per clip into the episode folder (IG/TikTok caption + TikTok title, LinkedIn-native first comment, Facebook first comment for Clip B, and the full YouTube Short block incl. Tags) so the copy lives on disk, not only in chat. On each clip's rollout day it creates a Google Calendar popup reminder (Europe/London) with the exact pinned-comment text embedded, plus the standing option for Al to reply in the Daily Ops chat and have the hub post/pin the comment via the Chrome connector. This replaces the old one-off `pin-comment-epNN` scheduled tasks.
8. **Comments per channel.** IG + TikTok: no links comment (not clickable) — rely on link-in-bio + Linktree top slot. LinkedIn native video: links in first comment (channel-aware §26.3). YouTube: pinned comment, manual.
9. **Linktree top-slot rotation = via the Chrome connector (baked in, no longer "always-manual").** On Clip A's rollout day (Tue, T+4) the episode podcast hub is rotated into the Linktree top slot for 7 days. This is done through the **Claude in Chrome connector**, not by hand: open the Linktree admin (`https://linktr.ee/admin`), move/pin the Metrics & Mayhem podcast-hub link (`https://www.masteringobservability.com/metrics-and-mayhem/podcast`) to the top slot, save, then set a 7-day reminder to revert to the default top link. `friday-launch-checklist` PREPARES the action (the link + the revert reminder); `daily-ops-hub` PERFORMS it on Clip A day once a Chrome session is connected and verified as "Allan Mann" (read-the-page identity check, abort if not). If no Chrome is connected at run time, flag the one-step action to Daily Ops rather than skipping silently. After the 7 days, revert the top slot.

## Triggers

**A. Friday job (`friday-launch-checklist`).** For the relevant episode: check both clips (named + override-mapped) + clean headshot + thumbnails + bookends are present; if anything is missing, flag and stop (never post a half set). If present: read pack Part 4 → host each clip via `push_clip.sh` → create Buffer IG Reel + TikTok drafts → schedule to the §25.6 slots (Clip A Tue, Clip B Fri) → emit the YouTube paste-ready pack + pin reminder → self-record to `Ops_Log.md`, route the approval ask to Daily Ops.

**B. Daily ad-hoc (`daily-ops-hub` asset step).** Watch `00_Inbox/Shorts/`. Any clip dropped there runs the same host → Buffer-draft → approve flow (captions from the matching pack Part 4 if it's an episode clip, else ask once).

## Acceptance ("done" = a verified hands-off run)
1. A clip placed per the naming standard is auto-hosted to `mo-social-assets/clips/` by the job (committer = token identity, not a human web upload).
2. The job auto-creates the IG Reel + TikTok Buffer drafts from pack Part 4 copy, video attached + validated (duration read, thumbnail generated, no error).
3. Al approves and at least one IG and one TikTok post actually publishes.
4. The YouTube paste-ready pack is produced.
5. The run self-records to `Ops_Log.md`. Al never touched GitHub.

**Note on "hands-off":** there is no scheduled-task secret store in Cowork, so clip/card hosting is a *present-and-approve* action in the Daily Ops chat (Allan's local git credential), not a fully headless 7am job. The scheduled tasks prepare and draft; Allan triggers the push when present. Everything else in the arc is hands-off to the approval gate.
