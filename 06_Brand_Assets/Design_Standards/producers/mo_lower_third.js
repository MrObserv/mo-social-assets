// mo_lower_third.js v1.0.0 (2026-10-31)
// The one video card type (Video_Card_System_Standard.md v3.0): the 4b signal
// line lower third. Four uses, one structure: HOST, GUEST, TERM, and either
// of the first two inside a two-shot panel.
//
// Declares no colour: every value comes from design-tokens.json through
// mo-tokens.js. Text is measured with mo_diagram.js 2.0.0's advance tables.
// Output is a 1920x1080 RGBA PNG, transparent except the scrim and the card,
// for burning over video with ffmpeg. --frames adds the 0.5s draw-in as a PNG
// sequence plus the ffmpeg line that turns it into a ProRes 4444 clip.
//
//   node mo_lower_third.js check <spec.json>
//   node mo_lower_third.js build <spec.json> --out <dir> [--frames]
"use strict";
const fs = require("fs");
const path = require("path");

const T = require(path.join(__dirname, "mo-tokens.js"));
const Dm = require(path.join(__dirname, "mo_diagram.js"));
const S = require(path.join(__dirname, "mo_social.js"));
if (!Dm.METRICS || !Dm.MO_DIAGRAM_VERSION) throw new Error(
  "mo_lower_third: needs producers/mo_diagram.js 2.0.0 or later (measured text widths).");
T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_lower_third.js");
const VERSION = "1.0.0";

const W = 1920, H = 1080;
// Geometry from the standard, not from tokens: these are layout rules.
const RULE = {
  floor_px: 24,        // nothing below 24px at 1920x1080 (standard, Type)
  bottom_max: 930,     // clear of YouTube captions and player controls (bottom 14%)
  scrim_from: 620,     // scrim starts transparent here...
  scrim_full: 780,     // ...reaches its peak here and holds to the bottom
  scrim_peak: 0.9,     // "a bottom gradient to 90 per cent navy" (motion rules)
  worst_footage: "#FFFFFF", // contrast is gated as if the footage were white
};
const KINDS = { host: "HOST", guest: "GUEST", term: "TERM" };
const PANEL = {
  single: { x: 144, x1: W - 144, lineMax: 760, name: 62, line: 30, label: 24, ring: 52, trace: 460, gap: 16, dot: 14 },
  left:   { x: 96, x1: 956 - 96, lineMax: 560, name: 52, line: 26, label: 24, ring: 44, trace: 340, gap: 14, dot: 12 },
  right:  { x: 964 + 96, x1: W - 96, lineMax: 560, name: 52, line: 26, label: 24, ring: 44, trace: 340, gap: 14, dot: 12 },
};
const C = {
  ground: T.dark["dark-ground"],
  name: T.dark["on-dark-body"],
  line: T.dark["on-dark-body"],
  accent: T.dark["teal-bright"],
};
const F = {
  name: { font: Dm.FONT.display, weight: Dm.DISPLAY_WEIGHT },
  line: { font: Dm.FONT.body, weight: 700 },
  label: { font: Dm.FONT.mono, weight: 700 },
};
const LABEL_LS = 3;

function scrimAlphaAt(y) {
  if (y <= RULE.scrim_from) return 0;
  if (y >= RULE.scrim_full) return RULE.scrim_peak;
  return RULE.scrim_peak * (y - RULE.scrim_from) / (RULE.scrim_full - RULE.scrim_from);
}

/* Lay one card out. Pure: returns geometry and the ledger the gates read. */
function layout(card) {
  const kind = String(card.kind || "");
  if (!KINDS[kind]) throw new Error("mo_lower_third: kind must be host, guest or term, got \"" + kind + "\"");
  const panel = card.panel || "single";
  const P = PANEL[panel];
  if (!P) throw new Error("mo_lower_third: panel must be single, left or right, got \"" + panel + "\"");
  if (kind === "term" && panel !== "single") throw new Error("mo_lower_third: a TERM card is full frame only");
  const name = S.assertCopy(card.name, "name"), line = S.assertCopy(card.line, "line");
  const ring = kind === "host";
  const indent = P.ring + 18;              // label row and ring offset share one measure

  // Built from the bottom up, so the lowest ink sits on bottom_max.
  const row = Math.max(P.line, P.label);   // the label row's tallest string sets its edges
  const yLine = RULE.bottom_max - Math.ceil(row * 0.24);
  const yTrace = yLine - Math.round(row * 0.78) - P.gap - P.dot / 2;
  const yName = yTrace - P.dot / 2 - P.gap - Math.ceil(P.name * 0.24);
  const nameX = ring ? P.x + indent : P.x;
  const labelX = P.x + indent;
  const labelW = Dm.wpx(KINDS[kind], P.label, Object.assign({ ls: LABEL_LS }, F.label));
  const lineX = labelX + labelW + 18;

  const items = [
    { what: "name", str: name, x: nameX, y: yName, size: P.name, fill: C.name, maxW: P.x1 - nameX, f: F.name, ls: 0 },
    { what: "label", str: KINDS[kind], x: labelX, y: yLine, size: P.label, fill: C.accent, maxW: labelW + 1, f: F.label, ls: LABEL_LS },
    { what: "line", str: line, x: lineX, y: yLine, size: P.line, fill: C.line, maxW: Math.min(P.lineMax, P.x1 - lineX), f: F.line, ls: 0 },
  ];
  const marks = ring ? [{ what: "ring", x0: P.x, y0: yName - Math.round(P.name * 0.39) - P.ring / 2, size: P.ring }] : [];
  marks.forEach((m) => { m.x1 = m.x0 + m.size; m.y1 = m.y0 + m.size; });
  return { kind, panel, P, items, marks, yTrace, ring };
}

/* Gates: fit, floor, frame and bottom rule, contrast against worst footage
 * under the scrim at each string's top edge. Throws listing every failure. */
function gate(L, label) {
  const bad = [];
  let minC = Infinity, low = 0;
  for (const it of L.items) {
    const w = Dm.wpx(it.str, it.size, Object.assign({ ls: it.ls }, it.f));
    const y0 = it.y - it.size * 0.78, y1 = it.y + it.size * 0.24;
    if (w > it.maxW + 0.5) bad.push(`fit: "${it.str}" is ${Math.round(w)}px in a ${Math.round(it.maxW)}px box (${it.what}). Shorten it.`);
    if (it.size < RULE.floor_px) bad.push(`floor: "${it.str}" is ${it.size}px, under ${RULE.floor_px}px (${it.what})`);
    if (it.x < 90 || it.x + w > W - 90) bad.push(`frame: "${it.str}" leaves the 90px safe margin (${it.what})`);
    if (y1 > RULE.bottom_max + 0.5) bad.push(`bottom: "${it.str}" ends at y${Math.round(y1)}, under the y${RULE.bottom_max} line (${it.what})`);
    if (y0 < RULE.scrim_full) bad.push(`scrim: "${it.str}" starts at y${Math.round(y0)}, above the full scrim at y${RULE.scrim_full} (${it.what})`);
    const g = S.blend(C.ground, RULE.worst_footage, scrimAlphaAt(y0));
    const c = S.contrast(it.fill, g);
    minC = Math.min(minC, c);
    if (c < 4.5) bad.push(`contrast: "${it.str}" ${it.fill} on ${g} is ${c.toFixed(2)}:1 (${it.what})`);
    low = Math.max(low, y1);
  }
  for (const m of L.marks) if (m.y0 < RULE.scrim_full - 0.5) bad.push(`scrim: ring mark starts at y${m.y0}, above y${RULE.scrim_full}`);
  if (bad.length) throw new Error("mo_lower_third: " + label + " failed " + bad.length + " gate(s):\n  " + bad.join("\n  "));
  return { strings: L.items.length, min_contrast: +minC.toFixed(2), lowest_ink_y: Math.round(low) };
}

/* Two-shot panels must not share a side, and only HOST and GUEST go in them. */
function validate(spec) {
  if (!spec || !Array.isArray(spec.cards) || !spec.cards.length) throw new Error("mo_lower_third: spec needs a non-empty cards array");
  S.assertSlug(spec.episode);
  const seen = new Set();
  return spec.cards.map((c, i) => {
    S.assertSlug(c.slug);
    if (seen.has(c.slug)) throw new Error("mo_lower_third: duplicate slug " + c.slug);
    seen.add(c.slug);
    const L = layout(c);
    return { slug: c.slug, L, report: gate(L, "card " + (i + 1) + " (" + c.slug + ")") };
  });
}

function ringHref(px) {
  const v = px < T.raw.marks.ring_mark.crossover_px ? "small_on_dark" : "on_dark";
  return "data:image/svg+xml;base64," + fs.readFileSync(T.mark("ring_mark", v)).toString("base64");
}

/* p = draw-in progress 0..1. 1 is the held frame. */
function svg(L, p = 1) {
  const P = L.P, ease = 1 - Math.pow(1 - p, 3), op = Math.min(1, p * 1.6).toFixed(3);
  const sid = "s" + L.panel, tid = "t" + L.panel;
  const x0 = L.panel === "right" ? 964 : 0, x1 = L.panel === "left" ? 956 : W;
  let m = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<defs><linearGradient id="${sid}" x1="0" y1="${RULE.scrim_from}" x2="0" y2="${RULE.scrim_full}" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0" stop-color="${C.ground}" stop-opacity="0"/><stop offset="1" stop-color="${C.ground}" stop-opacity="${RULE.scrim_peak}"/></linearGradient>` +
    `<linearGradient id="${tid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.accent}"/><stop offset="1" stop-color="${C.accent}" stop-opacity="0"/></linearGradient></defs>` +
    `<rect x="${x0}" y="${RULE.scrim_from}" width="${x1 - x0}" height="${H - RULE.scrim_from}" fill="url(#${sid})" opacity="${op}"/>`;
  const lead = 52 * (P.dot / 14), tw = Math.round(P.trace * ease), ty = L.yTrace;
  m += `<rect x="${P.x}" y="${ty - 1.5}" width="${Math.round(lead * Math.min(1, ease * 4))}" height="3" fill="${C.accent}"/>`;
  if (ease > 0.25) m += `<circle cx="${P.x + lead + P.dot / 2 - 2}" cy="${ty}" r="${P.dot / 2}" fill="${C.accent}"/>`;
  if (tw > 0) m += `<rect x="${P.x + lead + P.dot - 2}" y="${ty - 1.5}" width="${tw}" height="3" fill="url(#${tid})"/>`;
  m += `<g opacity="${op}">`;
  for (const mk of L.marks) m += `<image href="${ringHref(mk.size)}" x="${mk.x0}" y="${mk.y0}" width="${mk.size}" height="${mk.size}"/>`;
  for (const it of L.items) m += Dm.line(it.x, it.y, it.str, Object.assign({ size: it.size, fill: it.fill, ls: it.ls }, it.f));
  return m + "</g></svg>";
}

async function build(spec, out, { frames = false } = {}) {
  const cards = validate(spec);
  fs.mkdirSync(out, { recursive: true });
  const manifest = { producer: "mo_lower_third.js " + VERSION, tokens: T.raw.meta ? T.raw.meta.version : T.raw.version, episode: spec.episode, cards: [] };
  for (const c of cards) {
    const base = spec.episode + "_lower_third_" + c.slug;
    const file = path.join(out, base + ".png");
    await S.render(svg(c.L, 1), file);
    const entry = Object.assign({ slug: c.slug, kind: c.L.kind, panel: c.L.panel, png: path.basename(file) }, c.report);
    if (frames) {
      const dir = path.join(out, base + "_in");
      fs.mkdirSync(dir, { recursive: true });
      const n = 15; // 0.5s at 30fps
      for (let i = 0; i < n; i++) await S.render(svg(c.L, i / (n - 1)), path.join(dir, String(i).padStart(3, "0") + ".png"));
      entry.clip_cmd = `ffmpeg -framerate 30 -i "${dir}${path.sep}%03d.png" -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le "${path.join(out, base + "_in.mov")}"`;
    }
    manifest.cards.push(entry);
  }
  fs.writeFileSync(path.join(out, spec.episode + "_lower_thirds.json"), JSON.stringify(manifest, null, 2) + "\n");
  return manifest;
}

module.exports = { VERSION, RULE, PANEL, KINDS, layout, gate, validate, svg, build, scrimAlphaAt };

if (require.main === module) {
  const a = S.args(process.argv.slice(2));
  const [cmd, file] = a._;
  if (!["check", "build"].includes(cmd) || !file) {
    console.error("usage: node mo_lower_third.js check <spec.json>\n       node mo_lower_third.js build <spec.json> --out <dir> [--frames]");
    process.exit(2);
  }
  const spec = JSON.parse(fs.readFileSync(file, "utf8"));
  (async () => {
    if (cmd === "check") {
      for (const c of validate(spec)) console.log(`  ${c.slug}: ${c.L.kind}/${c.L.panel}, min contrast ${c.report.min_contrast}:1, lowest ink y${c.report.lowest_ink_y}`);
      console.log(`mo_lower_third ${VERSION}: ${spec.cards.length} card(s) pass every gate`);
      return;
    }
    if (!a.out) throw new Error("build needs --out <dir>");
    const m = await build(spec, a.out, { frames: !!a.frames });
    console.log(`mo_lower_third ${VERSION}: ${m.cards.length} card(s) written to ${a.out}`);
  })().catch((e) => { console.error(e.message); process.exit(1); });
}
