# Video Card System Standard

**Status: v3.0, 2026-10-31.** Design, on Al's ruling of 31 Oct: the lower third is the **4b signal line**, in four uses. Replaces v2.0's strip. The rest of v2.0 stands: one card type, automated; the full card, the diagram hold and the corner insert stay retired; full-frame beats are deck slides.

**This document names tokens, never hexes.** For a value, read `design-tokens.json`.

## Producer

`producers/mo_lower_third.js` 1.0.0. It reads every colour from `mo-tokens.js`, measures text with `mo_diagram.js` 2.0.0, renders through `mo_social.js`, and runs `assertNoRetired` on its own source.

```
node mo_lower_third.js check <spec.json>
node mo_lower_third.js build <spec.json> --out <dir> [--frames]
```

The build writes `<episode>_lower_third_<slug>.png` (1920x1080 RGBA, transparent except the scrim and the card) and a manifest, `<episode>_lower_thirds.json`. `--frames` also writes the 0.5s draw-in as 15 PNGs and records in the manifest the ffmpeg line that makes a ProRes 4444 clip with alpha.

Spec:

```json
{ "episode": "tt05",
  "cards": [ { "slug": "01_name", "kind": "host", "name": "…", "line": "…" },
             { "slug": "02_guest", "kind": "guest", "panel": "right", "name": "…", "line": "Role · Company" } ] }
```

`kind` is `host`, `guest` or `term`. `panel` is `single` (default), `left` or `right`. A term card is full frame only.

## The card

Three rows, bottom-left: the name, the signal trace, then a label row. The label row holds a Space Mono label (HOST, GUEST or TERM) followed by the line.

- **Type:** the name in the display face at the display weight; the label in Space Mono Bold, tracked; the line in DM Sans Bold. Nothing under 24px at 1920x1080.
- **Colour:** `dark.on-dark-body` for the name and the line, `dark.teal-bright` for the label and the trace.
- **The ring mark** heads the name on HOST only. The ring marks the house, so guests and terms don't carry it.
- **Scrim:** `dark.dark-ground`, transparent at y 620, rising to 90 per cent at y 780 and holding to the bottom of the frame. Every string and the ring start below y 780.
- **Placement:** full frame, x 144. Two-shot, 96px inside its own panel (left panel x 0 to 956, right panel x 964 to 1920), so a card never crosses the seam. The lowest ink sits at y 930 or above, clear of YouTube's captions and player controls.
- **Length:** the line is capped at 760px full frame and 560px in a two-shot, which is about 34 characters at full frame. Too long fails the build; never shrink the type to fit.

## Gates (the build throws, listing every failure)

Fit in its box · the 24px floor · the 90px safe margin · the y 930 bottom line · start below the full scrim · AA 4.5:1 against the scrim over **white** footage, the worst case · no em dash · valid, unique slugs · a known kind and panel.

## Timing

- **HOST** once, in the first minute. **GUEST** the first time each guest speaks. **TERM** at the line it names, from the `[CARD]` cue (Codex §25.5.1).
- **Draw-in** 0.5s, ease-out: the trace grows left to right as the text fades up. **Hold** 4s. **Off** in 0.3s.
- In a two-shot, both cards come on together at the first two-shot and are not repeated.

## Guests

At booking, ask each guest for their name as they want it shown and a role with company of 34 characters or fewer. Get their approval of both before the burn.

## QA gate (two passes)

Look at every card full size over a real frame from the episode, including its brightest shot. Check the trace and text read over motion, nothing clips, the ring is not the retired eye mark, and timing matches the cues. A fresh-eyes second pass follows; only a pass that finds nothing ships.

## Changelog

### v3.0, 2026-10-31
Card redesigned as the 4b signal line, with HOST, GUEST, TERM and two-shot uses. Producer `mo_lower_third.js` 1.0.0 added. Scrim, placement, bottom line, length cap and the white-footage contrast gate written down. Replaces the v2.0 strip, which was never automated: TT05's two cards came from a one-off script.

### v2.0, 2026-09-21
Shrunk to the lower third only.

### v1.0, 2026-08-20
Four-type system.
