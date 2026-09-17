# Publish checked, remaining drafts compared, the home feed explained, 2026-09-17 (fifteenth pass)

**Written by:** the website build satellite, a Claude Code session on Al's PC with the beehiiv and Google Drive connectors. This is a new file for work done after `2026-09-17_light-favicon.md`. It adds to that file and corrects nothing in it.

**Scope taken.** Al's questions in session:
- how the home page's recent writing section picks its posts, since the newest blog post is missing;
- why the Asana, Atlassian, Notion and Slack connectors keep asking to be connected;
- links to the drafts, and to what needs his approval;
- the favicon: the light one stands, because he does not like the dark one;
- links to the eight v2 share cards.

**Read, all read only:**
- the live site and beehiiv's draft preview for Home, Advisory, Book, Podcast, Subscribe, Archive and the Metrics & Mayhem hub;
- the newest posts, and the settings of four of them, through the beehiiv connector;
- this session's connector and plugin lists;
- the og_cards folder in Google Drive.

**Found:**
- **Published by Al this morning:** the menu, now on every page, plus Home and Archive. Recorded in `43_` section 6 and `45_` section 6.
- **Still unpublished:** Advisory, Book, Podcast, Subscribe and the hub. Only Advisory's wording changes: **the live Advisory page still names three clients**, and the draft names none (`45_` section 6).
- **The home feed** is beehiiv's native post block. It is set to the latest 5 posts tagged blog, the-signal, byte_size, deep_dive, deep-dive or articles, **with its audience set to free**.
  - "Somebody Turned It On" (published 2026-09-14) carries the blog tag, but it was published on the web to free and premium subscribers, so the block leaves it out. "What I'd Spin Up First" (2026-09-06) is left out for the same reason.
  - "Autonomous SRE Agents" (2026-08-29) is left out for a different reason: it carries none of the six tags.
  - The Archive block is set to all audiences and shows both posts.
- **The connector prompts** come from the "operations" plugin. It bundles its own Slack, Notion, Asana and Atlassian servers, plus Gmail and Google Calendar copies that fail to start. Al's own Slack, Notion, Gmail and Google Calendar connectors are already connected. Nothing in the estate uses Asana or Atlassian; the only mention is Atlassian as the sponsor inside the WebMCP piece.

**Changed:** nothing on the site. Records only.

**Questions, all Al's:**
- Set the home feed's audience to all, as on Archive, so posts published to both audiences show? That is a draft change, then a Home publish.
- Publish Advisory, which takes the client names off the live site, then Book, Podcast, Subscribe and the hub.
- Approve the eight v2 share cards.
- Route the token file's favicon note (`45_` section 6).
- Keep the operations plugin, or switch it off to stop the connector prompts.

**Lessons:**
- **The post block's audience filter.** `postsAudience: "free"` shows only posts whose web audience is free alone, so a post published to free and premium subscribers is left out. When a post is missing from a feed, compare its `audience` (from `get_post`) and tags with the block's `postsAudience` and `postsCategory`, which can be read from the page's HTML.
- **Re-check the live site just before reporting.** Al published between this session's morning check and its draft comparison, about 30 minutes apart, and the first comparison read as if Home had no changes.
- **The menu is site-wide once published.** It showed on pages whose own drafts were still unpublished.

## Ops_Log line

Appended by this session directly to `00_Command_Center/Ops_Log.md` "Job runs" on 2026-09-17: the line beginning `| 2026-09-17 | website-build-satellite fifteenth pass (Al present) |`.
