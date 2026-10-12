#!/usr/bin/env node
// mo_quote_card.js v1.0.0 (2026-10-12): THE quote card producer (Quote_Card_Standard.md v3.0).
// Light only, house lane, from design-tokens.json. Declares no colour.
// Replaces templates/mo_quote_card.js (retired, retired palette) and the
// 2026-09-26 Stoic one-liners stopgap.
//
//   node mo_quote_card.js build <spec.json> --out <dir> [--size square|portrait|pinterest|all]
//   node mo_quote_card.js check <spec.json>      gates only, writes nothing
//   node mo_quote_card.js sample --out <dir>
//
// Spec:
// { "slug": "2026-10-14_quotes_example",
//   "size": "square|portrait|pinterest|all",            default square
//   "eyebrow": "optional, e.g. 4.30AM THOUGHTS",
//   "uniform": false,        true = every card in the set takes the smallest fitted size
//   "cards": [ { "text": "...", "kind": "quote|line",
//                "attribution": { "name": "...", "source": "optional" } } ] }
//
// kind "quote" is somebody else's words: the template adds the quotation marks
// and REQUIRES an attribution. kind "line" is house copy:
// no marks, attribution optional.
"use strict";
const fs = require("fs");
const path = require("path");
const S = require(path.join(__dirname, "mo_social.js"));
const { T, C } = S;
T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_quote_card.js");
const VERSION = "1.0.0";

const SURFACE = "quote_card";
if (T.modeFor(SURFACE) !== "light") throw new Error("mo_quote_card: quote_card no longer resolves light; re-read design-tokens.json mode (ruled light 2026-10-12)");
const LOCKUP = T.lockupFor(SURFACE);
if (LOCKUP !== "MASTERING OBSERVABILITY") throw new Error("mo_quote_card: quote_card must be house lane, got " + LOCKUP);
const SIZES = {
  square: { canvas: "quote_card", max: 96 },
  portrait: { canvas: "quote_card_portrait", max: 104 },
  pinterest: { canvas: "quote_card_pinterest", max: 100 },
};
const OPEN = "\u201C", CLOSE = "\u201D";

function validate(spec) {
  if (!spec || typeof spec !== "object") throw new Error("mo_quote_card: spec must be a JSON object");
  S.assertSlug(spec.slug);
  const size = spec.size || "square";
  if (size !== "all" && !SIZES[size]) throw new Error("mo_quote_card: size must be square, portrait, pinterest or all, got " + size);
  if (spec.eyebrow != null) spec.eyebrow = S.assertCopy(spec.eyebrow, "eyebrow");
  const cards = spec.cards || [];
  if (cards.length < 1 || cards.length > 10) throw new Error("mo_quote_card: a set is 1 to 10 cards, got " + cards.length);
  cards.forEach((c, i) => {
    c.text = S.assertCopy(c.text, "cards[" + i + "].text");
    if (c.kind !== "quote" && c.kind !== "line") throw new Error("mo_quote_card: cards[" + i + "].kind must be quote or line, got " + c.kind);
    if (/^["'\u201C\u2018]|["'\u201D\u2019]$/.test(c.text) && c.kind === "quote") throw new Error("mo_quote_card: cards[" + i + "].text carries its own quotation marks; kind quote adds them. Remove them.");
    const a = c.attribution;
    if (c.kind === "quote" && !(a && a.name)) throw new Error("mo_quote_card: cards[" + i + "] is somebody else's words (kind quote) and has no attribution.name");
    if (a) { a.name = S.assertCopy(a.name, "cards[" + i + "].attribution.name"); if (a.source != null) a.source = S.assertCopy(a.source, "cards[" + i + "].attribution.source"); }
  });
  return spec;
}

function geometry(sizeKey) {
  const [W, H] = T.size(SIZES[sizeKey].canvas);
  const M = Math.round(W * 0.078);
  return { W, H, M, FW: W - 2 * M, TOP: 170, BOTTOM: H - 140, max: SIZES[sizeKey].max };
}

/* Lay the group out at y=0 and return its height, so it can be measured
 * before it is placed, then centred in the band. */
function group(s, g, spec, card, z, oy) {
  const shown = card.kind === "quote" ? OPEN + card.text + CLOSE : card.text;
  let y = oy;
  if (spec.eyebrow) { S.kicker(s, g.M, y + 22, spec.eyebrow, C.deep, g.FW); y += 22 + 72; }
  const lh = Math.round(z * 1.14);
  const q = s.block(g.M, y + Math.round(z * 0.72), shown, { role: "display", size: z, fill: C.ink, maxW: g.FW, lh, ls: -1, maxLines: 7, what: "quote" });
  y = q.last + Math.round(z * 0.22) + 52;
  s.add(`<rect x="${g.M}" y="${y}" width="64" height="5" fill="${C.deep}"/>`);
  y += 5;
  const a = card.attribution;
  if (a) {
    y += 46;
    s.block(g.M, y, a.name, { role: "strong", size: 36, fill: C.ink, maxW: g.FW, lh: 46, maxLines: 1, what: "attribution name" });
    if (a.source) { const src = s.block(g.M, y + 46, a.source, { role: "small", size: 32, fill: C.muted, maxW: g.FW, lh: 44, maxLines: 2, what: "attribution source" }); y = src.last; }
    y += 10;
  }
  return { lines: q.lines, height: y - oy };
}
function fit(spec, card, g) {
  const floor = T.raw.canvas.floors[SURFACE].display_px;
  for (let z = g.max; z >= floor; z -= 2) {
    const probe = S.sheet(SURFACE, g.W, g.H, { margin: g.M });
    try { const r = group(probe, g, spec, card, z, 0); if (r.height <= g.BOTTOM - g.TOP) return z; } catch (e) { if (!/: quote wraps to/.test(e.message)) throw e; }
  }
  throw new Error("mo_quote_card: \"" + card.text + "\" does not fit even at the " + floor + "px display floor. A card is one short sentence; cut it.");
}

function compose(spec, { size } = {}) {
  validate(spec);
  const sizes = (size || spec.size || "square") === "all" ? Object.keys(SIZES) : [size || spec.size || "square"];
  const N = spec.cards.length, out = [];
  for (const k of sizes) {
    const g = geometry(k);
    let fitted = spec.cards.map((c) => fit(spec, c, g));
    if (spec.uniform) { const m = Math.min(...fitted); fitted = fitted.map(() => m); }
    spec.cards.forEach((card, i) => {
      const z = fitted[i];
      const s = S.sheet(SURFACE, g.W, g.H, { margin: g.M });
      const probe = group(S.sheet(SURFACE, g.W, g.H, { margin: g.M }), g, spec, card, z, 0);
      const oy = Math.round(g.TOP + (g.BOTTOM - g.TOP - probe.height) / 2);
      group(s, g, spec, card, z, oy);
      s.add(S.ringMark(g.M, 44, 72));
      if (N > 1) s.text(g.W - g.M, 92, `${i + 1} / ${N}`, { role: "label", size: 26, fill: C.soft, ls: 2, anchor: "end", maxW: 200, what: "counter" });
      s.text(g.W / 2, g.H - 56, LOCKUP, { role: "label", size: 26, fill: C.deep, ls: 3, anchor: "middle", maxW: g.FW, what: "wordmark" });
      const svg = s.svg();
      const check = S.gate(s, spec.slug + " card " + (i + 1) + " " + k);
      T.assertRenderClean(svg, spec.slug + " card " + (i + 1));
      const a = card.attribution;
      const shown = card.kind === "quote" ? "\"" + card.text + "\"" : S.sentence(card.text);
      const alt = shown + (a ? " " + S.sentence(a.name + (a.source ? ", " + a.source : "")) : "");
      out.push({ n: i + 1, size: k, file: `${spec.slug}${N > 1 ? "_" + (i + 1) : ""}_${k}_${g.W}x${g.H}.png`, svg, alt, quote_px: z, lines: probe.lines, check });
    });
  }
  return out;
}

async function build(spec, out, opts = {}) {
  const cards = compose(spec, opts);
  fs.mkdirSync(out, { recursive: true });
  for (const c of cards) await S.render(c.svg, path.join(out, c.file));
  const manifest = { producer: "mo_quote_card.js " + VERSION, kit: "mo_social.js " + S.VERSION, tokens: T.version, slug: spec.slug,
    cards: cards.map(({ svg, ...rest }) => rest) };
  const mf = path.join(out, `${spec.slug}_manifest.json`);
  fs.writeFileSync(mf, JSON.stringify(manifest, null, 2) + "\n");
  console.log("mo_quote_card " + VERSION + " (tokens " + T.version + "): " + cards.length + " PNGs, manifest " + mf);
  return manifest;
}

module.exports = { VERSION, SURFACE, SIZES, compose, build, validate };

if (require.main === module) {
  const o = S.args(process.argv.slice(2));
  const cmd = o._[0];
  const load = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
  const fail = (e) => { console.error(e.message); process.exit(1); };
  const size = o.size && o.size !== true ? o.size : undefined;
  if (cmd === "build" && o._[1]) build(load(o._[1]), o.out || ".", { size }).catch(fail);
  else if (cmd === "check" && o._[1]) {
    try { const d = compose(load(o._[1]), { size }); d.forEach((c) => console.log(c.file, c.quote_px + "px", JSON.stringify(c.check))); console.log("gates passed: " + d.length + " cards"); }
    catch (e) { fail(e); }
  } else if (cmd === "sample") build(load(path.join(__dirname, "samples", "quote_card_sample.json")), o.out || ".", { size: "all" }).catch(fail);
  else {
    console.log("usage: node mo_quote_card.js build <spec.json> --out <dir> [--size square|portrait|pinterest|all]");
    console.log("       node mo_quote_card.js check <spec.json>");
    console.log("       node mo_quote_card.js sample --out <dir>");
    process.exit(cmd ? 1 : 0);
  }
}
