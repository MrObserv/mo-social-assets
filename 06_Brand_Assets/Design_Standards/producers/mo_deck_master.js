// mo_deck_master.js v1.0.0 (2026-10-09)
// The DECK MASTER's helpers as one shared module (Deck_Master_Standard.md).
// build_master_synthetic.js and every episode deck (build_tt05_deck.js on)
// REQUIRE this file. Before it, the master's helpers ran on require and so
// were copied verbatim into each deck: two copies of a producer, the defect
// the estate has paid for three times.
//
// Three defects fixed by moving here:
//   1. Token resolution. The master resolved mo-tokens.js relative to G:,
//      which is the STALE 06_Brand_Assets copy. This module sits beside
//      mo-tokens.js in the repo and refuses to load from G: at all.
//   2. wash() drew a hard-edged ellipse. pptxgenjs has no radial gradient, so
//      the wash is now a generated PNG with a real alpha fade, from
//      structure.wash, cached per mode. Same tokens, no visible edge.
//   3. No node_modules needed here. The caller passes its pptxgenjs class to
//      newDeck(), so the module resolves nothing from disk but its tokens.
//
// Usage, from any deck script on G: or anywhere else:
//   const PRODUCERS = process.env.MO_PRODUCERS ||
//     "C:\\Users\\alman\\OneDrive\\Documents\\GitHub\\mo-social-assets\\06_Brand_Assets\\Design_Standards\\producers";
//   const M = require(path.join(PRODUCERS, "mo_deck_master.js"));
//   const pptx = M.newDeck(require("pptxgenjs"));
//   const { camGuide, wash, footer, kicker } = M.helpers({ showGuide: false });
"use strict";
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

if (/^[gG]:[\\/]/.test(__dirname)) throw new Error(
  "mo_deck_master: loaded from " + __dirname + ". G: holds the STALE brand copy. " +
  "Require it from the repo clone (set MO_PRODUCERS, or use the default path).");

const T = require(path.join(__dirname, "mo-tokens.js"));
T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_deck_master.js");
const VERSION = "1.0.0";

const un = (h) => h.replace("#", "");
const C = {
  NAVY: un(T.dark["dark-ground"]),
  CARD_DK: un(T.dark["dark-panel"]),
  DARK_TEAL: un(T.dark["teal"]),
  DARK_BORDER: un(T.dark["dark-border"]),
  TEAL_BR: un(T.dark["teal-bright"]),
  ONDARK: un(T.dark["on-dark-body"]),
  ONDARK_SOFT: un(T.dark["on-dark-soft"]),
  INK: un(T.light["ink"]),
  TEAL: un(T.light["teal"]),
  TEAL_DEEP: un(T.light["teal-deep"]),
  GROUND: un(T.light["ground"]),
  TINT: un(T.light["tint"]),
  MUTED: un(T.light["soft"]),
  BODY_MUTED: un(T.light["muted"]),
  BORDER: un(T.light["border"]),
  WHITE: un(T.light["panel"]),
};

// Geometry: pptxgenjs 16:9 = 13.333 x 7.5 in; capture 1920x1080, so
// 1px = 1/144 in and 1px = 0.5pt. Floors: body 32px, labels 24px.
const PX = 1 / 144;
const PT = 0.5;
const W = 13.333, H = 7.5;
const MARGIN = 80 * PX;
const CAM = { x: W - 480 * PX, y: H - 432 * PX, w: 480 * PX, h: 432 * PX };
const SAFE_RIGHT = CAM.x - 40 * PX;
const FONTS = { F_TITLE: "Montserrat", F_BODY: "DM Sans", F_MONO: "Space Mono" };

function newDeck(PptxGen, { author = "Allan Mann", title } = {}) {
  if (typeof PptxGen !== "function") throw new Error("mo_deck_master: newDeck needs the pptxgenjs class: newDeck(require('pptxgenjs'))");
  const pptx = new PptxGen();
  pptx.defineLayout({ name: "MO169", width: W, height: H });
  pptx.layout = "MO169";
  pptx.author = author;
  if (title) pptx.title = title;
  return pptx;
}

// ---- the wash: a real radial fade, as an RGBA PNG -------------------------
// Centre bottom-left, off the slide edge, so the glow rises from the corner
// opposite the camera zone. Alpha at the centre is structure.wash (light
// 0.12, dark 0.20) and falls smoothly to zero at the radius: no edge.
// A 2-level ordered dither stops 8-bit alpha banding on the long falloff.
const WASH_PX = { w: 960, h: 540 };
const WASH_GEOM = { cx: 0.12, cy: 1.05, r: 0.78 };   // cx, r of width; cy of height
const CRC = (() => { const t = new Int32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c; } return t; })();
function crc32(buf) { let c = -1; for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; }
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function washPNG(dark, { w = WASH_PX.w, h = WASH_PX.h } = {}) {
  const hex = dark ? C.DARK_TEAL : C.TEAL;
  const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
  const peak = dark ? T.raw.structure.wash.dark : T.raw.structure.wash.light;
  if (!(peak > 0 && peak < 1)) throw new Error("mo_deck_master: structure.wash." + (dark ? "dark" : "light") + " must be between 0 and 1, got " + peak);
  const cx = WASH_GEOM.cx * w, cyPx = WASH_GEOM.cy * h, rad = WASH_GEOM.r * w;
  const raw = Buffer.alloc((w * 4 + 1) * h);
  const D = [[0, 0.5], [0.75, 0.25]];
  for (let y = 0; y < h; y++) {
    const row = y * (w * 4 + 1); raw[row] = 0;
    for (let x = 0; x < w; x++) {
      const d = Math.hypot(x - cx, y - cyPx) / rad;
      const t = d >= 1 ? 0 : 1 - d;
      const a = peak * t * t * (3 - 2 * t) * 255;           // smoothstep falloff
      const o = row + 1 + x * 4;
      raw[o] = r; raw[o + 1] = g; raw[o + 2] = b;
      raw[o + 3] = Math.min(255, Math.floor(a + D[y & 1][x & 1]));
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;   // 8-bit RGBA
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}
const WASH_CACHE = {};
function washData(dark) {
  const k = dark ? "dark" : "light";
  if (!WASH_CACHE[k]) WASH_CACHE[k] = "image/png;base64," + washPNG(dark).toString("base64");
  return WASH_CACHE[k];
}

function helpers({ showGuide = false } = {}) {
  const { F_MONO } = FONTS;
  function camGuide(slide) {
    if (!showGuide) return;
    slide.addShape("rect", { x: CAM.x, y: CAM.y, w: CAM.w, h: CAM.h,
      fill: { color: C.TEAL, transparency: 88 },
      line: { color: C.TEAL_DEEP, width: 1.5, dashType: "dash" } });
    slide.addText("CAMERA ZONE 480x432 - CONTENT NEVER ENTERS", {
      x: CAM.x, y: CAM.y + CAM.h - 30 * PX, w: CAM.w, h: 24 * PX,
      fontFace: F_MONO, fontSize: 24 * PT * 0.75, color: C.TEAL_DEEP,
      align: "center", charSpacing: 2 });
  }
  // Flat ground + ONE wash, a full-bleed image with a real alpha fade. Added
  // first, so it sits under everything and never takes a build animation.
  function wash(slide, dark) {
    slide.background = { color: dark ? C.NAVY : C.GROUND };
    slide.addImage({ data: washData(dark), objectName: "wash", x: 0, y: 0, w: W, h: H });
  }
  function footer(slide, dark, label) {
    slide.addShape("line", { x: MARGIN, y: H - 64 * PX, w: SAFE_RIGHT - MARGIN, h: 0,
      line: { color: dark ? C.DARK_BORDER : C.BORDER, width: 1 } });
    slide.addText(label, { x: MARGIN, y: H - 56 * PX, w: SAFE_RIGHT - MARGIN, h: 28 * PX,
      fontFace: F_MONO, fontSize: 24 * PT, color: dark ? C.ONDARK_SOFT : C.MUTED,
      charSpacing: 3 });
  }
  function kicker(slide, text, dark, y) {
    slide.addText(text.toUpperCase(), { x: MARGIN, y: y, w: SAFE_RIGHT - MARGIN, h: 34 * PX,
      fontFace: F_MONO, fontSize: 24 * PT, bold: true,
      color: dark ? C.TEAL_BR : C.TEAL_DEEP, charSpacing: 4 });
    slide.addShape("rect", { x: MARGIN, y: y + 44 * PX, w: 150 * PX, h: 2 * PX,
      fill: { color: dark ? C.TEAL_BR : C.TEAL }, line: { type: "none" } });
  }
  return { camGuide, wash, footer, kicker };
}

module.exports = { VERSION, T, C, PX, PT, W, H, MARGIN, CAM, SAFE_RIGHT, ...FONTS,
  newDeck, helpers, washPNG, washData, WASH_GEOM };
