// mo_episode_square.js v1.0.0 (2026-10-31)
// Square episode art for both podcast series, built to the MO Design System
// spec Al approved on 31 Oct: one layout, two motifs (Signal Drop waveform +
// FRI, Tech Tuesday terminal + TUE), headshot-free, ghost numeral.
// Declares no colour: every value is a token read through mo-tokens.js.
// Two deliberate departures from the spec page, both contrast fixes: muted
// lines on the dark ground use on-dark-soft (the light-mode soft fails AA
// there), and the display weight comes from mo_diagram (800, not 900).
//
//   node mo_episode_square.js check <spec.json>
//   node mo_episode_square.js build <spec.json> --out <dir>
// Writes <NN>_episode_art.jpg (3000) and <NN>_episode_art_beehiiv_1400x1400.jpg.
"use strict";
const fs = require("fs");
const path = require("path");
const T = require(path.join(__dirname, "mo-tokens.js"));
const Dm = require(path.join(__dirname, "mo_diagram.js"));
const S = require(path.join(__dirname, "mo_social.js"));
if (!Dm.METRICS || !Dm.MO_DIAGRAM_VERSION) throw new Error("mo_episode_square: needs producers/mo_diagram.js 2.0.0 or later.");
T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_episode_square.js");
const VERSION = "1.0.0";

const W = 3000, PX = 190, PY = 200, INNER = W - 2 * PX;
const C = {
  ground: T.dark["dark-ground"], panel: T.dark["dark-panel"], motif: T.dark["dark-motif"],
  accent: T.dark["teal-bright"], teal: T.dark.teal, body: T.dark["on-dark-body"],
  soft: T.dark["on-dark-soft"], title: T.light.panel, dot: T.light.muted,
};
const F = {
  mono: { font: Dm.FONT.mono, weight: 700 }, monoR: { font: Dm.FONT.mono, weight: 400 },
  display: { font: Dm.FONT.display, weight: Dm.DISPLAY_WEIGHT },
};
const SERIES = {
  signal_drop: { chip: "FRI", glow: [0.72, 0.16, 0.20], foot: ["ALLAN MANN", "EVERY FRIDAY"] },
  tech_tuesday: { chip: "TUE", glow: [0.26, 0.18, 0.22], foot: ["TECH TUESDAY", "ONE THING, EXPLAINED WELL"] },
};
const TITLE = { max: 210, min: 150, lh: 1.03, ls: -8 };
const WAVE = [[0.22, "panel"], [0.44, "panel"], [0.70, "teal"], [1, "accent"], [0.62, "teal"], [0.34, "panel"],
  [0.54, "panel"], [0.86, "teal"], [0.40, "panel"], [0.18, "panel"], [0.58, "panel"], [0.28, "panel"]];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const txt = (x, y, s, size, fill, f, ls = 0, anchor) =>
  anchor === "end" ? Dm.line(x - Dm.wpx(s, size, Object.assign({ ls }, f)), y, s, Object.assign({ size, fill, ls }, f))
                   : Dm.line(x, y, s, Object.assign({ size, fill, ls }, f));

function validate(spec) {
  const se = SERIES[spec && spec.series];
  if (!se) throw new Error("mo_episode_square: series must be signal_drop or tech_tuesday");
  const n = Number(spec.number);
  if (!Number.isInteger(n) || n < 1 || n > 999) throw new Error("mo_episode_square: number must be a whole episode number");
  const lines = S.assertCopy(spec.title, "title").split("/").map((s) => s.trim()).filter(Boolean);
  if (lines.length !== 2) throw new Error("mo_episode_square: title needs exactly two lines split by \"/\", got " + lines.length);
  if (lines.join(" ").split(/\s+/).length > 6) throw new Error("mo_episode_square: title is over 6 words");
  let size = TITLE.max;
  const wide = (sz) => Math.max(...lines.map((l) => Dm.wpx(l, sz, Object.assign({ ls: TITLE.ls }, F.display))));
  while (size > TITLE.min && wide(size) > INNER) size -= 2;
  if (wide(size) > INNER) throw new Error(`mo_episode_square: title line is ${Math.round(wide(size))}px at the ${TITLE.min}px floor, box is ${INNER}px. Shorten it.`);
  let label, term;
  if (spec.series === "signal_drop") {
    label = "SIGNAL DROP " + n + (spec.runtime ? " · " + S.assertCopy(spec.runtime, "runtime").toUpperCase() : "");
  } else {
    label = "EPISODE " + String(n).padStart(2, "0");
    term = { topic: S.assertCopy(spec.topic, "topic").toLowerCase(), runtime: spec.runtime ? S.assertCopy(spec.runtime, "runtime") : "" };
  }
  if (Dm.wpx(label, 58, Object.assign({ ls: 12 }, F.monoR)) > INNER) throw new Error("mo_episode_square: label too long");
  return { se, n, lines, size, label, term, series: spec.series };
}

function svg(v) {
  const se = v.se, [gx, gy, ga] = se.glow;
  let m = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}" viewBox="0 0 ${W} ${W}">` +
    `<defs><radialGradient id="g" cx="${gx * W}" cy="${gy * W}" r="${0.62 * W}" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0" stop-color="${C.teal}" stop-opacity="${ga}"/><stop offset="1" stop-color="${C.teal}" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="${W}" height="${W}" fill="${C.ground}"/><rect width="${W}" height="${W}" fill="url(#g)"/>`;
  // ghost numeral: right 150, bottom 300
  const num = v.series === "tech_tuesday" ? String(v.n).padStart(2, "0") : String(v.n);
  m += `<g opacity="0.05">${txt(W - 150, W - 300 - 0.06 * 900, num, 900, C.accent, F.display, -40, "end")}</g>`;
  // header
  const chipW = Dm.wpx(se.chip, 62, Object.assign({ ls: 10 }, F.mono)) + 88, chipH = 126, chipX = W - PX - chipW;
  m += txt(PX, PY + 63 + 26, "METRICS & MAYHEM", 74, C.accent, F.mono, 20);
  m += `<rect x="${chipX}" y="${PY}" width="${chipW}" height="${chipH}" rx="10" fill="${C.accent}"/>` + txt(chipX + 44, PY + 63 + 22, se.chip, 62, C.ground, F.mono, 10);
  // footer
  const ruleY = W - PY - 75 - 80;
  m += `<rect x="${PX}" y="${ruleY}" width="${INNER}" height="3" fill="${C.body}" opacity="0.2"/>`;
  m += txt(PX, W - PY - 16, se.foot[0], 62, C.soft, F.monoR, 12) + txt(W - PX, W - PY - 16, se.foot[1], 62, C.soft, F.monoR, 12, "end");
  // middle block, centred between header and rule
  const titleH = v.size * TITLE.lh * 2;
  const motifH = v.series === "signal_drop" ? 420 : 106 + 56 * 2 + Math.round(66 * 1.7 * 3); // bar + padding + three lines
  const H = motifH + 110 + 70 + 26 + titleH + (v.series === "tech_tuesday" ? 68 : 0);
  let y = PY + chipH + (ruleY - PY - chipH - H) / 2;
  if (v.series === "signal_drop") {
    const bw = (INNER - 11 * 20) / 12;
    WAVE.forEach(([h, c], i) => { const bh = 420 * h; m += `<rect x="${PX + i * (bw + 20)}" y="${y + 420 - bh}" width="${bw}" height="${bh}" rx="8" fill="${C[c]}"/>`; });
  } else {
    m += `<rect x="${PX + 2}" y="${y + 2}" width="${INNER - 4}" height="${motifH - 4}" rx="22" fill="${C.motif}" stroke="${C.panel}" stroke-width="4"/>`;
    m += `<path d="M${PX + 4} ${y + 106} V${y + 24} a20 20 0 0 1 20 -20 H${W - PX - 24} a20 20 0 0 1 20 20 V${y + 106} Z" fill="${C.panel}"/>`;
    for (let i = 0; i < 3; i++) m += `<circle cx="${PX + 61 + i * 60}" cy="${y + 55}" r="17" fill="${C.dot}"/>`;
    m += txt(PX + 44 + 3 * 34 + 2 * 26 + 32, y + 75, "~/mo/tech_tuesday", 58, C.soft, F.monoR, 4);
    const ty = y + 106 + 56, lh = 66 * 1.7;
    m += txt(PX + 48, ty + 60, ">", 66, C.accent, F.monoR) + txt(PX + 48 + 80, ty + 60, "tech_tuesday explain --slowly", 66, C.body, F.monoR);
    m += txt(PX + 48, ty + 60 + lh, "topic: " + v.term.topic, 66, C.soft, F.monoR);
    const okW = Dm.wpx("ok", 66, F.monoR), rt = v.term.runtime ? "· runtime " + v.term.runtime : "";
    m += txt(PX + 48, ty + 60 + 2 * lh, "ok", 66, C.accent, F.monoR) + (rt ? txt(PX + 48 + okW + 16, ty + 60 + 2 * lh, rt, 66, C.soft, F.monoR) : "");
    const cx = PX + 48 + okW + 16 + (rt ? Dm.wpx(rt, 66, F.monoR) + 16 : 0);
    m += `<rect x="${cx}" y="${ty + 2 * lh + 4}" width="32" height="66" fill="${C.accent}"/>`;
    if (Dm.wpx("topic: " + v.term.topic, 66, F.monoR) > INNER - 96) throw new Error("mo_episode_square: topic too long for the terminal");
  }
  y += motifH + 110 + 58;
  m += txt(PX, y, v.label, 58, C.soft, F.monoR, 12);
  y += 26 + v.size * 0.95;
  m += txt(PX, y, v.lines[0], v.size, C.title, F.display, TITLE.ls);
  m += txt(PX, y + v.size * TITLE.lh, v.lines[1], v.size, C.accent, F.display, TITLE.ls);
  if (v.series === "tech_tuesday") m += `<rect x="${PX}" y="${y + v.size * TITLE.lh + v.size * 0.3 + 52}" width="420" height="16" fill="${C.teal}"/>`;
  return m + "</svg>";
}

async function build(spec, out) {
  const v = validate(spec), s = svg(v), sharp = require("sharp");
  fs.mkdirSync(out, { recursive: true });
  const nn = v.series === "tech_tuesday" ? "TT" + String(v.n).padStart(2, "0") : String(v.n);
  const big = path.join(out, nn + "_episode_art.jpg"), small = path.join(out, nn + "_episode_art_beehiiv_1400x1400.jpg");
  const buf = await sharp(Buffer.from(s)).flatten({ background: C.ground }).jpeg({ quality: 92, chromaSubsampling: "4:4:4" }).toBuffer();
  fs.writeFileSync(big, buf);
  await sharp(buf).resize(1400, 1400).jpeg({ quality: 90 }).toFile(small);
  return { big, small, title_px: v.size };
}

module.exports = { VERSION, validate, svg, build };

if (require.main === module) {
  const a = S.args(process.argv.slice(2)), [cmd, file] = a._;
  if (!["check", "build"].includes(cmd) || !file) { console.error("usage: node mo_episode_square.js check|build <spec.json> [--out <dir>]"); process.exit(2); }
  const spec = JSON.parse(fs.readFileSync(file, "utf8"));
  (async () => {
    if (cmd === "check") { const v = validate(spec); svg(v); console.log(`mo_episode_square ${VERSION}: ${v.series} ${v.n} passes (title ${v.size}px)`); return; }
    if (!a.out) throw new Error("build needs --out <dir>");
    const r = await build(spec, a.out);
    console.log(`mo_episode_square ${VERSION}: wrote ${r.big} and ${r.small}`);
  })().catch((e) => { console.error(e.message); process.exit(1); });
}
