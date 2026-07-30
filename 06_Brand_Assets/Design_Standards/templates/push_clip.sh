#!/usr/bin/env bash
# push_clip.sh — push a short-form clip MP4 to the public asset repo and print its raw URL.
# Sibling to push_card.sh; same auth + mechanism, different subdir (clips/), for video.
# Flow: clip mp4 (override-mapped clean name) -> push_clip.sh (host) -> Buffer create_post assets.video.url.
#
# HOST REPO: MrObserv/mo-social-assets (public). AUTH: fine-grained PAT from $GH_TOKEN
#   (Contents read/write on that repo). NEVER hardcode; scheduled runs get it from the task
#   secret store. Token "mo-social-assets-buffer" expires 2026-09-18 — rotate before then.
# USAGE: GH_TOKEN=xxxx ./push_clip.sh /path/NN_clip_a_<slug>.mp4 [more.mp4 ...]
#   Filenames must be clean (no spaces/apostrophes) so the raw URL is clean.
set -euo pipefail
: "${GH_TOKEN:?Set GH_TOKEN to the fine-grained PAT for MrObserv/mo-social-assets}"
REPO="MrObserv/mo-social-assets"; BRANCH="main"
WORK="$(mktemp -d)"; trap 'rm -rf "$WORK"' EXIT
for f in "$@"; do case "$(basename "$f")" in *" "*|*"'"*) echo "REFUSING dirty filename: $f" >&2; exit 2;; esac; done
git clone -q "https://x-access-token:${GH_TOKEN}@github.com/${REPO}.git" "$WORK/repo"
mkdir -p "$WORK/repo/clips"
for f in "$@"; do cp "$f" "$WORK/repo/clips/"; done
cd "$WORK/repo"
git config user.email "allan@masteringobservability.com"; git config user.name "MrObserv"
git add clips
git commit -q -m "Add clip(s): $(for f in "$@"; do basename "$f"; done | tr '\n' ' ')" || echo "(nothing new to commit)"
git push -q origin "$BRANCH"
for f in "$@"; do echo "https://raw.githubusercontent.com/${REPO}/${BRANCH}/clips/$(basename "$f")"; done
