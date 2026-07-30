#!/usr/bin/env bash
# push_card.sh — push generated quote-card PNG(s) to the public asset repo and print raw URLs.
# Part of the Metrics & Mayhem card-to-Buffer pipeline (see Quote_Card_Standard.md).
#
# WHY: Buffer attaches images only by public direct-image URL (it cannot take a local file).
# GitHub raw URLs (raw.githubusercontent.com) are true direct-image URLs that Buffer fetches fine.
# Flow: mo_quote_card.js (generate) -> push_card.sh (host) -> Buffer create_post assets.image.url.
#
# HOST REPO: MrObserv/mo-social-assets (public).
# AUTH: reads a fine-grained PAT (Contents: read/write on that repo) from $GH_TOKEN.
#   NEVER hardcode the token. For scheduled/automated runs the Control chat supplies it via the
#   task secret store. Token "mo-social-assets-buffer" expires 2026-09-18 — rotate before then.
#
# USAGE: GH_TOKEN=xxxx ./push_card.sh /path/card_slug_portrait.png [more.png ...]
#   Prints one raw URL per file (feed the portrait one to Buffer for IG feed).
set -euo pipefail
: "${GH_TOKEN:?Set GH_TOKEN to the fine-grained PAT for MrObserv/mo-social-assets}"
REPO="MrObserv/mo-social-assets"
BRANCH="main"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
git clone -q "https://x-access-token:${GH_TOKEN}@github.com/${REPO}.git" "$WORK/repo"
mkdir -p "$WORK/repo/cards"
for f in "$@"; do cp "$f" "$WORK/repo/cards/"; done
cd "$WORK/repo"
git config user.email "allan@masteringobservability.com"
git config user.name "MrObserv"
git add cards
git commit -q -m "Add card(s): $(for f in "$@"; do basename "$f"; done | tr '\n' ' ')" || echo "(nothing new to commit)"
git push -q origin "$BRANCH"
for f in "$@"; do
  echo "https://raw.githubusercontent.com/${REPO}/${BRANCH}/cards/$(basename "$f")"
done
