#!/usr/bin/env bash
# push_asset.sh — push ANY asset file(s) to the public asset repo and print the public raw URL(s).
# Generic successor to push_card.sh / push_clip.sh: one command for cards, clips, thumbnails, OG images,
# bookends, anything Buffer or Beehiiv needs to fetch by URL.
#
# WHY: Buffer and Beehiiv attach images/video only by a public direct URL (they cannot take a local file).
#   raw.githubusercontent.com URLs are true direct URLs both fetch fine.
# FLOW: generate the asset locally -> push_asset.sh <subfolder> <file...> -> public raw URL -> Buffer/Beehiiv.
#
# HOST REPO: MrObserv/mo-social-assets (public).
# AUTH: reads a fine-grained PAT (Contents: read/write on that repo) from the environment variable $GH_TOKEN.
#   The token is NEVER hardcoded and is never passed through a chat. This is exactly why the push runs where
#   the token lives — your machine, or any runner that has the secret provisioned in its environment.
#   An interactive chat sandbox has no $GH_TOKEN and cannot run this; that is by design, not a bug
#   (there is no Cowork secret store — see System_Changelog 2026-06-22).
#
# USAGE:  GH_TOKEN=xxxx ./push_asset.sh <subfolder> /path/file1.png [/path/file2.png ...]
#   e.g.  GH_TOKEN=xxxx ./push_asset.sh thumbnails "/path/21_thumbnail_og.png"
#         GH_TOKEN=xxxx ./push_asset.sh cards "/path/card_x_portrait.png"
#         GH_TOKEN=xxxx ./push_asset.sh clips "/path/21_clip_a.mp4"
#   Prints one raw URL per file (paste it straight into Buffer/Beehiiv, or hand it back to Daily Ops).
set -euo pipefail
: "${GH_TOKEN:?Set GH_TOKEN to the fine-grained PAT for MrObserv/mo-social-assets}"
SUBDIR="${1:?Usage: push_asset.sh <subfolder> <file...>  (e.g. thumbnails, cards, clips)}"; shift
[ "$#" -ge 1 ] || { echo "No files given. Usage: push_asset.sh <subfolder> <file...>" >&2; exit 1; }
REPO="MrObserv/mo-social-assets"
BRANCH="main"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
git clone -q "https://x-access-token:${GH_TOKEN}@github.com/${REPO}.git" "$WORK/repo"
mkdir -p "$WORK/repo/$SUBDIR"
for f in "$@"; do cp "$f" "$WORK/repo/$SUBDIR/"; done
cd "$WORK/repo"
git config user.email "allan@masteringobservability.com"
git config user.name "MrObserv"
git add "$SUBDIR"
git commit -q -m "Add asset(s) to $SUBDIR: $(for f in "$@"; do basename "$f"; done | tr '\n' ' ')" || echo "(nothing new to commit)"
git push -q origin "$BRANCH"
for f in "$@"; do
  echo "https://raw.githubusercontent.com/${REPO}/${BRANCH}/${SUBDIR}/$(basename "$f")"
done
