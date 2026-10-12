# Quote Card Standard v3.0

**v3.0, 2026-10-12.** Rebuilt on the v3 system. The producer is `producers/mo_quote_card.js`. `templates/mo_quote_card.js` is retired and refuses to run. Colours come from `design-tokens.json` through `mo-tokens.js` and are named here by role only.

Branded quote cards for social: one producer, one look, every channel.

---

## Rulings (2026-10-12, Design, for Content)

- **Mode: light only.** The tokens disagreed with themselves: `mode.rule` said feed cards for non-writing assets render dark, `mode.dark_surfaces` left `quote_card` out so `modeFor` returned light, v1.0 of this standard said dark, and Brand v3 §2 said light. The §2 test decides it: a quote card does not render inside someone else's dark UI. `mode.rule` now says so, `mode.quote_card_mode` records the ruling, and `quote_card` is not dual-mode, so there is no dark variant to ask for. The 26 Sep Stoic set shipped dark and is not re-rendered.
- **Wordmark:** `T.lockupFor("quote_card")`, MASTERING OBSERVABILITY. Never typed.
- **Attribution.** Somebody else's words (`kind: "quote"`) MUST carry an attribution, and the producer throws without one. Under the quote: a short teal-deep rule, the name in DM Sans Bold 36px ink, the source (book, show, paper) in DM Sans 32px muted. House lines (`kind: "line"`) take an attribution only if one is given.

## The look

- Ground: light, with the house radial wash from `structure.wash`.
- Ring mark top left. `n / N` counter top right in a set. Wordmark centred in the footer, teal-deep.
- Optional eyebrow (kicker rule and mono label, teal-deep), for example `4.30AM THOUGHTS`.
- **Quote:** Montserrat ExtraBold in ink, left aligned, auto-fitted from the size's maximum (square 96, portrait 104, Pinterest 100) down to the 56px floor; at most 7 lines. A `kind: "quote"` card gets curly quotation marks from the template; put none in the copy, or it throws.
- The group (eyebrow, quote, rule, attribution) is centred in the band between the top row and the footer.
- **Retired from v1.0:** the dark gradient ground, the grid, the old display face, the mint final line. The final-line colour change is dropped: which words land on the last line depends on the wrap, so it emphasised the wrong words as often as the right ones.

## Sizes

| Size | Canvas token | Pixels | Use |
|---|---|---|---|
| `square` | `quote_card` | 1080 x 1080 | LinkedIn single image, X, fallback |
| `portrait` | `quote_card_portrait` | 1080 x 1350 | Instagram feed, LinkedIn |
| `pinterest` | `quote_card_pinterest` | 1000 x 1500 | Pinterest pins |

## Gates (the producer throws)

Text fit measured from the repo fonts; floors from `canvas.floors.quote_card` at a 375px phone; 4.5:1 contrast against the real ground under every string; no em dashes; `assertNoRetired` on source, `assertRenderClean` on every SVG, PNG byte 25 must be 2 or 6.

## Production

```
node 06_Brand_Assets/Design_Standards/producers/mo_quote_card.js build <spec.json> --out <dir> [--size square|portrait|pinterest|all]
node 06_Brand_Assets/Design_Standards/producers/mo_quote_card.js check <spec.json>
node 06_Brand_Assets/Design_Standards/producers/mo_quote_card.js sample --out <dir>
```

```json
{
  "slug": "2026-10-14_quotes_example",
  "size": "all",
  "eyebrow": "optional",
  "uniform": false,
  "cards": [
    { "kind": "quote", "text": "Somebody else's words, no quotation marks.",
      "attribution": { "name": "Their name", "source": "optional work" } },
    { "kind": "line", "text": "A house line." }
  ]
}
```

`uniform: true` gives every card in a set the smallest fitted size, for sets posted side by side. **Out:** `<slug>[_n]_<size>_<WxH>.png` per card and size, and `<slug>_manifest.json` with alt text (the line plus its attribution), fitted size, line count and gate results.

Specs live with the post, not in the repo; the repo holds only `producers/samples/quote_card_sample.json`, placeholder copy.

---

## Standing rule: every 4:30am post ships with a card

The default 4:30am Thoughts deliverable is text plus a portrait card built from the Closing Declarative. Pull-quotes from Substantive Nuclears get the same treatment when the close stands alone.

- LinkedIn: the text post with the portrait or square card. Via Buffer.
- Instagram: the portrait card, caption = the 4:30am text plus IG hashtags, 4:5 crop.
- X: text post, card optional.

### Hub-ready step (daily-ops-hub skill, MODE B)

1. Write a one-card spec: `{"slug": "<date>_<slug>", "size": "all", "eyebrow": "4.30AM THOUGHTS", "cards": [{"kind": "line", "text": "<the closing line>"}]}`.
2. `node .../producers/mo_quote_card.js build <spec.json> --out 05_Social_Media/<date>_<slug>`.
3. Upload the portrait card to Instagram with the manifest's alt text.
4. Log the card filenames in the post draft and the day file.

## Multi-card sets

A set of 2 to 10 cards carries an `n / N` counter. For a swipeable multi-part argument (setup, turn, close), use a carousel instead: that is what `mo_carousel.js` is for, and it writes the LinkedIn PDF.

## Pinterest

Quote cards are native Pinterest content and a pin keeps surfacing for months. Each pin carries a destination link and sits on a themed board. Build with `--size pinterest`. Channel route is still Al's call: manual pins through the extension (recommended to start), or a paid Buffer tier as a fourth channel.

---

**Last updated:** 2026-10-12, v3.0. v1.0 (2026-06-17, dark, `templates/mo_quote_card.js`) is superseded. Its layout rule (top row fixed, footer fixed, the group centred between them, the quote auto-sized to width and height) carries over.
