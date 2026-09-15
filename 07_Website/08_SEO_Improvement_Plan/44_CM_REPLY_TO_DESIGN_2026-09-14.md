# Content Management → Design. Answers to your six.

All read from source at `mo-social-assets` @ `424839f` and from the live site, not from memory.
**Item 4 turned up a live defect while I was verifying it. See the note under the table.**

---

## 1. The two §3 paragraphs, verbatim

### `Brand_Design_System_v3.md` — §3 "Rules that are not obvious", the whole block

The wash line is the fourth bullet. Giving you all four, because they are a set and the fourth
reads differently on its own:

```markdown
### Rules that are not obvious

- **teal is not a text colour on light.** It measures 3.08:1 on ground. Text and links use teal-deep.
- **soft is light-mode only.** On dark use on-dark-soft.
- **Semantic pairs are mode-dependent.** Same meaning, different hex. Using #FFD166 on a light ground is a fail.
- **One radial teal wash per dark canvas**, 10 to 22 per cent. Never two, never on light.
```

Line 83. Immediately after it comes `### Retired, do not use`.

### `Logo_and_Marks_Standard.md` — §3 complete

```markdown
## 3. The lens wash — texture

A single radial teal wash, and at larger scale the concentric rings bleeding off an edge.

- Dark surfaces only. One per canvas, 10 to 22 per cent opacity.
- Decoration. It carries no meaning, so nothing important sits on it and nothing is read through it.
- **The faint mint grid is retired** (Al, 2026-09-11). It came from the pre-v2.0 dark surface and does nothing the wash does not do better. Producers still drawing it need updating.

## 4. Never
```

**Note the second bullet survives the amendment unchanged and is now load-bearing.** "Nothing
important sits on it and nothing is read through it" is exactly the constraint the contrast
measurement needs, so the light-mode amendment can lean on wording that is already ratified rather
than inventing new.

---

## 2. Nothing pins PNG output. There is no ceiling anywhere. Go ahead.

I grepped every standard for file size, quality, compression and format. **No blog, OG or thumbnail
standard specifies a PNG mode, a quality value, or a maximum file size.** `Blog_Thumbnail_Standard.md`
pins only dimensions, 1200x630. The producer's `quality: 90` came from the code, not from a standard,
so dropping it breaks nothing written down.

The only size constraint in the entire standards set is unrelated:
`Episode_Launch_Pack_Standard.md` line 20, "A 2160×2160 / 96 MB square will NOT ingest; re-encode to
1080 / ~18 MB" — that is LinkedIn video/square ingest, not OG cards.

**Empirically, 14 live 1200x630 PNG cards in `Thumbnails/`:**

| | bytes |
|---|---|
| smallest | 49,353 (`wide-events_og_1200x630.png`) |
| median | 91,401 |
| largest | **251,309** (`observability-rollout-blockers_og_1200x630.png`) |

Modes are already mixed: 11 RGB, 2 palette, 1 RGBA. **So truecolour is not a new regime, it is
already the majority.**

Four to eight times the current 71,884-byte card is roughly **290KB to 575KB**. The upper end is
about twice the largest card already live and serving. Beehiiv accepted a 71KB upload today and
hosts a 615KB asset in the same library. **No objection from Content. Take the banding fix.**

If you want a ceiling written down rather than left open, I would suggest 1MB as a smoke alarm
rather than a target — high enough never to bind on a real card, low enough to catch a producer
bug that emits something absurd.

---

## 3. `mo_diagram.js` — the full colour map, because the retired list badly undercounts it

`templates/mo_diagram.js`, 15,077 bytes, 288 lines. It does **not** require `mo-tokens.js` at all.

**The v3 consumer table says "10 retired-token hits". The real picture is worse, and this is the
thing that would have made a blind repoint go wrong:**

| category | distinct hexes | occurrences |
|---|---|---|
| **RETIRED, must change** | 6 | 13 |
| already a v3 token | 5 | 12 |
| **UNDECLARED — no v3 equivalent exists** | **14** | **23** |
| white | 1 | 7 |

**Fourteen colours in that file have no v3 token to map to.** So the repoint is not a find-and-replace
of ten values; it is fourteen mapping decisions, each of which is either "this folds into an existing
token" or "this needs adding to `design-tokens.json`", and both are CRs rather than edits.

### The two palette objects, verbatim (lines 49-75)

```js
const DARK = {
  key: "dark",
  navy: "#0a0e17", navy2: "#0c1929", navy3: "#0e1f35",     // navy RETIRED
  bg1: "#0a0e17", bg2: "#0c1929", bg3: "#0e1f35",          // bg1 RETIRED
  cardBg: "#0e2038", bandBg: "#10233a",                     // both UNDECLARED
  teal: "#14a3a8", mint: "#2dd4bf", bright: "#64ffda",      // mint + bright RETIRED, teal UNDECLARED
  ink: "#ffffff", grey: "#9fb0bd", greyMute: "#aab7c4",     // grey = dark.on-dark-soft; greyMute UNDECLARED
  green: "#7bd88f",   // = dark.semantic-low, correct
  amber: "#ffd166",   // = dark.semantic-high, correct
  arrow: "#4a6272",                                          // UNDECLARED
  grid: "#64ffda", gridOpacity: 0.03,                        // RETIRED, and the mint grid is itself retired
  glow: "#64ffda", glowOpacity: 0.045,                       // RETIRED
  hairlineOpacity: 0.5, bandStrokeOpacity: 0.55,
};
const LIGHT = {
  key: "light",
  navy: "#ffffff", navy2: "#ffffff", navy3: "#f1f6fa",      // f1f6fa UNDECLARED
  bg1: "#ffffff", bg2: "#ffffff", bg3: "#f9fbfd",           // f9fbfd UNDECLARED
  cardBg: "#f1f6fa", bandBg: "#f1f6fa",                     // UNDECLARED
  teal: "#0d7377", mint: "#2f9e8d", bright: "#0d7377",      // teal + bright RETIRED; mint = light.teal
  ink: "#12233d", grey: "#5f6d75", greyMute: "#5f6d75",     // ink UNDECLARED; grey RETIRED (folded into soft)
  green: "#2f9e57",   // RETIRED -> light.semantic-low #237A45
  amber: "#b8790a",   // UNDECLARED, and close to the retired #A8720B -> light.semantic-high #8F6109
  arrow: "#c2c9cc",                                          // UNDECLARED, near light.border #C9DCDC
  grid: "#e9ecec", gridOpacity: 0.3,                         // UNDECLARED, near light.hairline #DCE7E5
  glow: "#ffffff", glowOpacity: 0,
  hairlineOpacity: 1, bandStrokeOpacity: 0.9,
};
```

### The six retired hexes with line numbers

| hex | occurrences | lines | v3 replacement |
|---|---|---|---|
| `#64ffda` | 3 | 53, 58, 59 | dark: `teal-bright` `#74DDCD` |
| `#0d7377` | 3 | 43 (comment), 67 ×2 | light: `teal-deep` `#17695C` |
| `#5f6d75` | 2 | 68 ×2 | light: `soft` `#5A6E72` — **v3 §3 states this was folded into soft as a duplicate** |
| `#2f9e57` | 2 | 46 (comment), 69 | light: `semantic-low` `#237A45` |
| `#0a0e17` | 2 | 50, 51 | dark: `dark-ground` `#0D2127` |
| `#2dd4bf` | 1 | 53 | dark: `teal` `#2F9E8D` or `teal-bright` — your call |

**Three of those replacements matter for the published diagram**, since `#5f6d75`, `#2f9e57` and
`#b8790a` are the light-surface grey and semantics, and the live four-rungs figure is a light diagram.

**One thing v3 already rules, so you do not have to:** §3 says of `#5f6d75`, *"It passed AA, so the
twelve shipped light diagrams are not re-rendered and the 2026-09-01 acceptance holds."* So the
repoint is forward-looking; only the one live figure on the published post needs a re-render, and
that is a Content ask rather than a sweep.

---

## 4. The six evergreen winners — live-verified, not from the planning record

I pulled the H1, og:title and og:image live off each page rather than trusting the May records.
**The May proposals were all applied, so those records are reliable**, with one exception noted below.

| # | slug | `--surface` | `--eyebrow` | `--title` (the card line) | words |
|---|---|---|---|---|---|
| 1 | `opentelemetry-collector-implementation-guide` | `blog_og` | **TECHNICAL** | `OpenTelemetry Collector Implementation Guide` | 4 |
| 2 | `mastering-it-observability` | `blog_og` | **LEADERSHIP** | `Crafting an Observability Strategy Like a Symphony` | 7 |
| 3 | `the-power-of-business-aligned-observability` | `blog_og` | **LEADERSHIP** | `Aligning IT Metrics With Business Goals` | 6 |
| 4 | `the-observability-cost-conundrum` | `blog_og` | **LEADERSHIP** | `Are We Paying Too Much for Observability?` | 7 |
| 5 | `building-a-comprehensive-cost-effective-observability-strategy` | `blog_og` | **LEADERSHIP** | `The Complete Guide to Observability Cost Optimisation` | 7 |
| 6 | `what-is-grafana-alloy` | `byte_size` | **see question below** | `What is Grafana Alloy?` | 4 |

Output path per `Blog_Thumbnail_Standard.md`: these six have no per-post folder, so their established
home is `07_Website/08_SEO_Improvement_Plan/01_Evergreen_Winners/og_cards/`, filenames
`evg_otel_collector_og.png`, `evg_harmonising_it_og.png`, `evg_business_aligned_og.png`,
`evg_cost_conundrum_og.png`, `evg_cost_strategy_og.png`, `evg_grafana_alloy_og.png`.

**Why the card line is the og:title and not the H1.** In all six the og:title is already the distilled
line and the H1 is the full headline — "Are We Paying Too Much for Observability?" against "The
Observability Cost Conundrum: Are We Paying Too Much for Visibility?". **Every og:title is 4 to 7
words, inside the standard's 12. Three of the six H1s are 9 to 11 words and would wrap to three
lines.** Using og:title also means the card and the share preview say the same thing. That is Al's
"insight where it earns it" applied, and here it earns it six times out of six.

### LIVE DEFECT found while verifying #6

**`what-is-grafana-alloy` is not serving its evergreen card.** Its live og:image is
`GrafanaAlloy.png?t=1712821704` — a 2024 asset. The evergreen card `evg_grafana_alloy_og.png` exists
in both `og_cards/` and `Thumbnails/` at 69,210 bytes and **was never attached to the post.** So one
of the six winners has been running on the wrong image since the evergreen pass. Not yours to fix;
flagging it because the sweep would otherwise re-render a card that is not actually in use and nobody
would notice. **I will attach the new one when the sweep lands.**

### Stream skew, for information

Four of the six are leadership, two technical. That is a fair reflection of what the winners are,
not a selection error.

---

## 5. `Blog_Thumbnail_Standard.md` — the title line, in context

The "one insight" rule is in **§Spec**, not §4, and it is one bullet inside the spec list:

```markdown
## Spec

- **Size:** 1200x630px (doubles as the OG image; always set OG title, description and image in Beehiiv).
- **Canvas:** navy gradient (`#0a0e17` to `#0c1929` to `#0e1f35`), faint mint grid pattern (~2% opacity), soft mint radial glow off one side.
- **Eyebrow:** mono caps, bright mint `#64ffda`, letterspaced, top left (e.g. THE OBSERVABILITY DIGEST, or the series name).
- **Title:** display font, white, bold, left-aligned, 2 lines preferred, 3 maximum. One insight, ≤12 words (§24.11).
- **Subtitle:** optional, one line, grey `#9fb0bd`, body font.
- **Footer:** mono caps, mid teal: MASTERING OBSERVABILITY · MASTERINGOBSERVABILITY.COM. (Blog OG is a cross-property asset, so it carries the house brand, realigned 2026-08-24; podcast YouTube/episode art keep METRICS & MAYHEM.)
- **Logo:** lens mark bottom right at 40-60% opacity (§40-60% opacity).
- **No:** icons, emojis, stock humans, gradients on text, more than one message.
```

**Amend the Title bullet only.** But be aware the whole Spec block is stale beyond that one line, and
amending the title in isolation leaves a standard that still specifies a navy gradient, the retired
mint grid, `#64ffda`, `#9fb0bd`, and a lens mark at 40-60% opacity — **all of which v3 and the ratified
light-mode flip have superseded.** The Production block still points at `templates/mo_visual_kit.js`,
which no longer exists.

**Content's recommendation: rewrite the Spec block wholesale against v3 rather than patch one bullet.**
Otherwise the next person reads a standard that contradicts the producer in six places instead of five.

Proposed Title wording, to replace the bullet:

> **Title:** display face, left-aligned, 2 lines preferred, 3 maximum. **Use the post's og:title.**
> Where the headline is long or buries the point, write a distilled line instead, one insight,
> ≤12 words. Card and share preview should say the same thing wherever the headline already is
> the insight. (Al, 2026-09-14.)

---

## 6. `monthly_digest` — you invented it, and it does not collide. But it is not the obvious choice.

**`monthly_digest` appears nowhere:** not in `design-tokens.json`, not in any of the 30+ standards,
not as a Beehiiv content tag. There is also **no Digest surface key of any kind**, and no Digest entry
in `canvas`, so a Digest card currently renders through `og_card` by default.

Two things to weigh:

- **It matches the token file's convention.** Every surface key there is snake_case:
  `blog_og`, `the_signal`, `tech_tuesday`, `signal_drop`, `episode_square`, `youtube_thumbnail`.
  So `monthly_digest` is consistent.
- **But the Beehiiv content tag is `monthly-digest`, with a hyphen.** That is what is on the live
  posts. `byte_size` has no such problem — the Beehiiv tag is `byte_size`, underscore, so your
  `byte_size` matches both conventions exactly.

**Content's call: keep `monthly_digest`.** The token file's surface keys are an internal namespace and
should follow the token file's convention, not Beehiiv's tag slugs, which are a different namespace
with different rules. But **write the Beehiiv slug into the token entry as a cross-reference** so the
next person does not trip over the mismatch, the way the `LG-` inbox outage happened.

---

## Two questions back, one of which is yours and one of which is Al's

**Yours:** `--surface` is now required with no default. For the six winners above, five are `blog_og`
and one is `byte_size`. **Does `byte_size` exist as a surface key yet, or does it need adding to
`canvas` and the lockup lanes before the sweep can run?** It is in neither today.

**Al's, and you are right that it is his and not mine:** the eyebrow vocabulary. I proposed
TECHNICAL / LEADERSHIP / THE SIGNAL / BYTE-SIZE / THE OBSERVABILITY DIGEST and he has not ruled.
**Winner #6 is the case that forces it** — it is both technical and a byte-size, so it wants either
`TECHNICAL` for the stream signal or `BYTE-SIZE` for the series, and it cannot have both.
It is the same shape as the Tech Tuesday question he already ruled on, where he chose the stream.
I have put it to him.
