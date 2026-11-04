# TT05 YouTube thumbnail A/B plan

**Ruling: Greg via Al, 4 Nov.** Run the two TT05 thumbnails head to head on the live video and let CTR decide, rather than argue it in the chat.

## The test

| Leg | Window | Thumbnail | File |
|---|---|---|---|
| **A (photo)** | Days 1 to 7 from upload | The photo version (Allan on the right) | `TT05_youtube_1280x720.png` (photo leg; needs a clean headshot cut-out finalised before it goes up, the open blocker from 31 Oct) |
| **B (v3 kit)** | Days 8 to 14 | The clean v3 kit, no photo | `TT05_youtube_1280x720_v3kit.png` |

One thumbnail at a time, seven full days each, same title and description throughout so the only variable is the image.

## The metric

**CTR with impressions, read from vidIQ** (not views alone). A thumbnail can win on CTR and still have had far fewer impressions, so both numbers are recorded for each leg:

- Impressions (vidIQ), each 7-day window
- Click-through rate (vidIQ), each 7-day window
- Average view duration, each window (a high-CTR thumbnail that drops retention is a net loss, so this is the guardrail)

Pull with `vidiq_video_stats` / the channel analytics for the TT05 video once it is live and has a video id.

## Reading it

- Compare CTR **at similar impression volumes**. YouTube front-loads impressions in the first days, so leg A (days 1 to 7) will usually see more impressions than leg B (days 8 to 14); weight for that rather than comparing raw clicks.
- The winner is the one with the higher CTR **without a worse average view duration**. If CTR is a wash (within about half a point), keep the v3 kit, because it is the on-system, reproducible one and the photo leg needs a manual cut-out each time.
- Record the result in this file and feed it back into the next TT thumbnail decision.

## Status

- **Not started.** Starts the day TT05 goes up. The photo leg is blocked until the headshot cut-out is finalised (transparent PNG; the v3 kit fades the left edge but cannot remove a background). Flagged to Al 31 Oct and again here.
- Results table to be filled after each 7-day window:

| Window | Leg | Impressions | CTR | Avg view duration |
|---|---|---|---|---|
| Days 1-7 | A photo | | | |
| Days 8-14 | B v3 kit | | | |
