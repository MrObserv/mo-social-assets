# Hero Thumbnail — Reverse-Engineering Spec (from the Gemini reference set)

**Author:** Control, 2026-07-24 (from Al's Gemini-generated examples: Ep 24 "Quiet Isn't Good", Ep 25 "The Gate Stays Human", Tech Tuesday "The Fourth Signal — Profiles").
**Status:** SPEC ONLY. Build is PARKED to Wed next week (scheduled task `build-hero-thumbnail-poc`). Not to be produced now (Al's weekly credit limit).
**Un-parks:** GR-2026-07-13-03 (Hero Thumbnail Standard) + the 2026-07-14 hero-thumbnail SKILL row. Those were parked because AI subject-matting was the blocker. **Gemini removes that blocker** by scanning the full episode video and returning the best expressive cut-out. So the hero thumbnail is now buildable.
**Design lane:** ratification is Growth's; the producer build is Control's.

---

## 1. The division of labour (the whole point)

The Gemini image is TWO kinds of work fused together. Separate them:

- **Gemini owns the HEADSHOT** — it scans the full video, picks the most expressive frame (pointing, wide eyes, hands up), and cuts the subject cleanly off the background. This is the part we were stuck on for weeks (`rembg` proxy-blocked, hand-frame-grabbing painful). Keep Gemini (or any matting tool) for this. Its only output we consume: **a transparent PNG of Allan, alpha-cut.**
- **A `hero_thumbnail.py` producer owns EVERYTHING ELSE** — the branded composite around the headshot. Deterministic, on-brand, identical every week.

**Why a producer beats re-generating with Gemini each time:** look at the diagram in the Gemini renders — it wrote `SHEDHIS`, `SHCDILIB`, a misspelled `REDIS`. It hallucinates node labels, and the layout drifts render to render. A producer built from the episode's real node set is accurate, typo-free, pixel-consistent, and costs no per-render AI.

---

## 2. Canvas + export
- **1280×720** (16:9), sRGB, ship < 2MB. Master at **2560×1440** (2×), downscale for upload.
- Dark-asset surface (navy `#0a0e17`→`#0f2137`) with a mint glow behind the subject and a faint tech/particle texture. NOT flat black — there is a subtle radial mint bloom centre-right (behind the shoulder).

## 3. Two layouts (pick by content, both share the frame)

**Layout A — SIMPLE (Ep 24 "Quiet Isn't Good").** Top branding bar (wordmark + `SIGNAL DROP NN` badge), a big two-tier title left (white hook line + mint-gradient payoff word), a faint supporting graphic low-left (a ghosted dashboard/chart), headshot right. No terminal, no diagram. Use when the episode has no clean explainer object.

**Layout B — EXPLAINER (Ep 25, Tech Tuesday Profiles).** The rich one. Three-tier title top-left (white context line → huge mint-gradient keyword → white subtitle), a **terminal window** mid-left, an **explainer diagram** centre, headshot right, branding bar along the bottom. Use when the episode has a real technical object to show (blast-radius gate, flamegraph).

Default to A when in doubt; B when the episode's concept is a diagram.

## 4. Zones + geometry (Layout B, 1280×720)
- **Title block:** top-left, ~x60 down, spanning ~55–60% width. Three tiers stacked tight.
- **Terminal window:** left, roughly y380–560, ~440 wide.
- **Explainer diagram:** centre, roughly x560–920, vertically mid — connectors run left→right into a central **HUMAN GATE** node.
- **Headshot:** right ~38–42% of the width, bleeds off the right + bottom edges, subject **gazing/pointing INTO the frame (leftward)** per §24.15. Mint rim-light along the subject edge.
- **Branding bar:** bottom-left, full-width-ish strip.
- **Sparkle mark** (four-point star) bottom-right near the shoulder — a small brand furniture accent seen in every example.

## 5. Typography + the signature mint-gradient keyword
- **Display:** heavy geometric sans, ALL CAPS — Montserrat ExtraBold (brand; Archivo Black if/when the TTF lands). Tight leading, lines almost touching.
- **Context/hook line + subtitle:** solid **white**, smaller than the keyword.
- **THE PAYOFF KEYWORD** (`AI-OPS`, `GOOD`, `PROFILES`): the hero move — a **mint vertical gradient** (light mint `#9dffe4` top → deep teal/green `#1f9e6f` bottom) with a subtle bevel/inner-light so it reads slightly 3-D and metallic. This is the single most recognisable element; get the gradient + bevel right.
- **Subtitle** (`DECIDE BY BLAST RADIUS`): white, ~third the keyword size, directly under the keyword.

## 6. Terminal window
- Rounded rect, three traffic-light dots, optional titlebar (`chrome` tab on the TT flamegraph one). A mono command in **mint** on near-black inner fill: `> agent: rollback deploy?`, `> view profiles --flamegraph`. Space Mono. Some renders add a brushed-metal frame — optional; the clean navy terminal (matching the square art) is preferred for consistency with `sd_terminal_square.py`.

## 7. Explainer diagram (deterministic — this is where the producer earns its keep)
- Node boxes: rounded, mint outline, small glyph icon + label, on the dark surface. Mint connector lines with rounded elbows.
- A central emphasised node — **HUMAN GATE** (Signal Drop blast-radius) — heavier mint fill/outline.
- **Node set comes from the episode, not from AI guessing.** For Ep 25 blast-radius: DATABASE, STATELESS WORKER, CACHE SERVICE, CACHE, (REDIS — spelled correctly), a `blast radius high/low` label, and the central HUMAN GATE. The producer takes the node list + edges as data (`--diagram` JSON or a per-episode brief), so labels are always correct.
- Tech Tuesday variant swaps the diagram for the episode's object (e.g. a flamegraph terminal). Same slot, different content.

## 8. Branding bar + day chip
- Bottom-left: **`metrics & mayhem`** (lowercase, white/mint) `|` **`> signal_drop NN`** (mono, mint prompt) then a **day chip** — a mint pill: **`FRI`** for Signal Drop, **`TUE`** for Tech Tuesday (`> tech_tuesday`). Matches the square's chip logic exactly.
- Series switch drives: the prompt word (`signal_drop` vs `tech_tuesday`), the day chip (FRI vs TUE), and whether the episode-number shows.

## 9. Producer interface (build target for next week)
`hero_thumbnail.py` args:
- `--headshot <cutout.png>` — the Gemini/matte transparent PNG (required; the one external input).
- `--series signal_drop|tech_tuesday` — drives prompt + day chip (FRI/TUE).
- `--episode NN`
- `--hook "THE GATE STAYS HUMAN"` (white context line)
- `--keyword "AI-OPS ACCOUNTABILITY"` (the mint-gradient payoff; may wrap to 2 tiers)
- `--subtitle "DECIDE BY BLAST RADIUS"`
- `--command "> agent: rollback deploy?"` (terminal; omit for Layout A)
- `--diagram <nodes.json>` (Layout B; omit → Layout A simple)
- `--layout A|B` (or inferred: B if `--diagram` present, else A)
- `--outdir`, fonts via `MO_FONTS`.
Output: `NN_thumbnail_hero_1280x720.png` (+ a `_qa` contact sheet at full + 160×90).

## 10. Palette + fonts
- Navy `#0a0e17`/`#0f2137`; mint `#64ffda`; keyword gradient `#9dffe4`→`#1f9e6f`; teal `#14a3a8`; white ink; near-black terminal fill.
- Montserrat ExtraBold (display) + Space Mono (mono/labels). Same as the square.

## 11. Build plan (PARKED → Wed next week)
1. Build `hero_thumbnail.py` — Layout B first (the Ep 25 reference), then Layout A.
2. **Proof of concept:** Al drops a random raw video; Gemini (or the matte path) returns a cut-out PNG; run the producer against it and eyeball vs the Gemini reference.
3. Two-pass brand QA (§19.6), route the design standard to Growth to ratify, then wire an optional `--hero` mode into `episode-asset-watcher` so a hero thumbnail can be generated when a cut-out PNG is dropped in the episode folder.

## 12. Open questions for Growth (at ratification)
- Hero vs terminal-square vs standard YouTube thumbnail: when is each used? (Hero is heavier; likely the selective "big" episodes, terminal square = Spotify/Beehiiv, standard YT = default.)
- Terminal frame style: clean navy (consistent with the square) vs brushed-metal (Gemini's variant).
- Do we keep the mint-gradient keyword bevel exactly, or flatten it to match the rest of the dark-asset system?

---

**Next step (Wed):** `build-hero-thumbnail-poc` fires; Control builds `hero_thumbnail.py` to this spec and runs the POC on Al's supplied cut-out. Nothing renders before then.
