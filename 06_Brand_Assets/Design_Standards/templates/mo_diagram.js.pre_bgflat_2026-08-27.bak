#!/usr/bin/env node
/* Mastering Observability — concept / flow diagram helper
 * Companion to mo_visual_kit.js. Where mo_visual_kit renders DATA figures
 * (the bar idiom), this renders CONCEPT and FLOW diagrams: boxes, bands,
 * cards, spectrum bars, arrows — the class of diagram that embeds in blogs.
 *
 * WHY THIS EXISTS: concept diagrams used to be hand-built ad hoc, with fixed
 * strings placed by eye. Text overflowed its boxes and spacing drifted. Every
 * text element here is MEASURED and AUTO-WRAPPED so it cannot exit its box.
 * Never hand-place a fixed string in a diagram again — build it from these
 * helpers. See Diagram_Standard.md, "The text-fit rule" and "QA gate".
 *
 * THEMES (added 2026-08-23, GR-2026-07-15-01). One producer, two surfaces:
 *   theme: 'dark'   DEFAULT, unchanged. Navy + mint, the §24.11 dark visual
 *                   asset surface. Use for STANDALONE assets: OG cards,
 *                   thumbnails, social visuals, slide frames.
 *   theme: 'light'  White / near-white surface, navy ink, teal accent. Use
 *                   for IN-BODY blog and email diagrams, so a figure does not
 *                   read as a heavy dark slab inside a light article.
 *
 * The theme is a PALETTE SWITCH and nothing else. Both themes run the exact
 * same drawing and text-fit helpers below, so there is one and only one place
 * a layout or wrapping bug can live. Do NOT hand-build a bespoke light
 * producer on top of these helpers ever again: pass theme: 'light'.
 *
 * Three equivalent ways to pick a theme:
 *   1. per call    card(x, y, w, { theme: 'light', ... })
 *   2. per module  setTheme('light'), then call the helpers as normal
 *   3. bound API   const D = themed('light'); D.card(x, y, w, { ... })
 * The default stays 'dark', so every existing caller is unaffected.
 *
 * Canonical: Voice Codex §17, §24.11, §24.15; Diagram_Standard.md.
 * Palette + geometry mirror mo_visual_kit.js so the two read as one system.
 */
const sharp = require("sharp");

/* ---------- palettes ----------
 * DARK  = the §24.11 dark visual-asset palette, Diagram_Standard.md palette
 *         table. Values unchanged from the original single-theme producer.
 * LIGHT = the in-body blog / email surface registered by GR-2026-07-15-01,
 *         Diagram_Standard.md "Two-surface diagram rule". Every hex is quoted
 *         from that standard: background #ffffff to #f1f6fa, ink #12233d,
 *         teal accent #0d7377 (the standard's light-background accent),
 *         secondary teal #2f9e8d (v2.0 web/email), light-background grey
 *         #6c7a82, hairline #c2c9cc, gridlines #e9ecec, semantic green
 *         #2f9e57 and amber #b8790a. No colour here is invented.
 */
const DARK = {
  key: "dark",
  navy: "#0a0e17", navy2: "#0c1929", navy3: "#0e1f35",
  bg1: "#0a0e17", bg2: "#0c1929", bg3: "#0e1f35",
  cardBg: "#0e2038", bandBg: "#10233a",
  teal: "#14a3a8", mint: "#2dd4bf", bright: "#64ffda",
  ink: "#ffffff", grey: "#9fb0bd", greyMute: "#aab7c4",
  green: "#7bd88f",   // low / safe / success
  amber: "#ffd166",   // high / caution / warning
  arrow: "#4a6272",
  grid: "#64ffda", gridOpacity: 0.03,
  glow: "#64ffda", glowOpacity: 0.045,
  hairlineOpacity: 0.5, bandStrokeOpacity: 0.55,
};
const LIGHT = {
  key: "light",
  navy: "#ffffff", navy2: "#ffffff", navy3: "#f1f6fa",
  bg1: "#ffffff", bg2: "#ffffff", bg3: "#f1f6fa",
  cardBg: "#f1f6fa", bandBg: "#f1f6fa",
  teal: "#0d7377", mint: "#2f9e8d", bright: "#0d7377",
  ink: "#12233d", grey: "#6c7a82", greyMute: "#6c7a82",
  green: "#2f9e57",   // low / safe / success (darkened for a light surface)
  amber: "#b8790a",   // high / caution / warning (darkened for a light surface)
  arrow: "#c2c9cc",
  grid: "#e9ecec", gridOpacity: 1,
  glow: "#ffffff", glowOpacity: 0,
  hairlineOpacity: 1, bandStrokeOpacity: 0.9,
};
const PALETTES = { dark: DARK, light: LIGHT };
/* Historical export. `C` has always meant the dark palette; it still does, so
 * every existing `const { C } = require('./mo_diagram.js')` keeps working. */
const C = DARK;

let ACTIVE = "dark";
function setTheme(name) {
  if (!PALETTES[name]) throw new Error("mo_diagram: unknown theme '" + name + "' (use 'dark' or 'light')");
  ACTIVE = name;
  return PALETTES[name];
}
function getTheme() { return ACTIVE; }
function palette(t) {
  if (t && typeof t === "object") return t;      // a palette object passed straight in
  return PALETTES[t] || PALETTES[ACTIVE] || DARK;
}

const FONT = {
  display: "'Archivo Black','Arial Black','Liberation Sans',sans-serif",
  body: "'DM Sans','Liberation Sans','DejaVu Sans',sans-serif",
  mono: "'Space Mono','DejaVu Sans Mono','Noto Sans Mono',monospace",
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ff = (f) => JSON.stringify(f.replace(/"/g, "'"));

/* ---------- MEASURE + WRAP (the whole point of this file) ----------
 * Theme-independent by design. Both themes share these, so text fit can
 * never diverge between the dark asset and the light in-body render. */
function wpx(str, size) {
  let w = 0;
  for (const c of String(str)) {
    w += /[iIlj.,:!|']/.test(c) ? 0.30 * size
       : /[mMW]/.test(c) ? 0.92 * size
       : /[A-Z0-9]/.test(c) ? 0.66 * size
       : 0.55 * size;
  }
  return w;
}
function wrap(str, maxW, size) {
  const words = String(str).split(/\s+/);
  const lines = []; let cur = "";
  for (const wd of words) {
    const t = cur ? cur + " " + wd : wd;
    if (wpx(t, size) > maxW && cur) { lines.push(cur); cur = wd; }
    else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}

function background(w, h, { theme } = {}) {
  const P = palette(theme), k = P.key || "dark";
  return `<defs>
    <linearGradient id="bg-${k}" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${P.bg1}"/><stop offset="0.6" stop-color="${P.bg2}"/><stop offset="1" stop-color="${P.bg3}"/>
    </linearGradient>
    <radialGradient id="glow-${k}" cx="0.5" cy="0.42" r="0.55">
      <stop offset="0" stop-color="${P.glow}" stop-opacity="${P.glowOpacity}"/><stop offset="0.7" stop-color="${P.glow}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid-${k}" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0 L0 0 0 60" fill="none" stroke="${P.grid}" stroke-opacity="${P.gridOpacity}" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg-${k})"/>
  <rect width="${w}" height="${h}" fill="url(#grid-${k})"/>
  <ellipse cx="${w / 2}" cy="${h * 0.42}" rx="${h * 0.7}" ry="${h * 0.7}" fill="url(#glow-${k})"/>`;
}

function line(x, y, str, { size = 22, fill = null, font = FONT.body, weight = 400, ls = 0, anchor = "start", italic = false, theme } = {}) {
  const col = fill == null ? palette(theme).ink : fill;
  return `<text x="${x}" y="${y}" font-family=${ff(font)} font-size="${size}" fill="${col}" font-weight="${weight}" letter-spacing="${ls}" text-anchor="${anchor}"${italic ? ' font-style="italic"' : ""}>${esc(str)}</text>`;
}
function label(x, y, str, { size = 20, fill = null, ls = 3, anchor = "start", theme } = {}) {
  const col = fill == null ? palette(theme).bright : fill;
  return line(x, y, str, { size, fill: col, font: FONT.mono, weight: 700, ls, anchor, theme });
}
function paragraph(x, y, str, maxW, { size = 22, fill = null, font = FONT.body, weight = 400, lh = null, anchor = "start", theme } = {}) {
  const col = fill == null ? palette(theme).ink : fill;
  const lineH = lh || Math.round(size * 1.4);
  const lines = wrap(str, maxW, size);
  let svg = "";
  lines.forEach((ln, i) => { svg += line(x, y + i * lineH, ln, { size, fill: col, font, weight, anchor, theme }); });
  return { svg, height: lines.length * lineH, lines: lines.length };
}

function card(x, y, w, { accent = null, eyebrow = "", heading = "", body = "", pad = 28, headSize = 26, bodySize = 21, minH = 0, theme } = {}) {
  const P = palette(theme);
  const acc = accent == null ? P.teal : accent;
  const innerX = x + pad + 8;
  const innerW = w - pad * 2 - 8;
  let cy = y + pad;
  let inner = "";
  if (eyebrow) { cy += 18; inner += label(innerX, cy, eyebrow, { size: 15, fill: acc, ls: 2, theme }); cy += 16; }
  if (heading) {
    const h = paragraph(innerX, cy + headSize, heading, innerW, { size: headSize, fill: P.ink, weight: 700, lh: Math.round(headSize * 1.25), theme });
    inner += h.svg; cy += headSize + h.height - Math.round(headSize * 1.25) + 14;
  }
  if (body) {
    const b = paragraph(innerX, cy + bodySize, body, innerW, { size: bodySize, fill: P.grey, lh: Math.round(bodySize * 1.45), theme });
    inner += b.svg; cy += bodySize + b.height - Math.round(bodySize * 1.45);
  }
  const natural = (cy + pad) - y;
  const h = Math.max(natural, minH);
  let svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${P.cardBg}" stroke="${P.arrow}" stroke-opacity="${P.hairlineOpacity}" stroke-width="1"/>`;
  svg += `<rect x="${x}" y="${y}" width="6" height="${h}" rx="3" fill="${acc}"/>`;
  return { svg: svg + inner, height: h, natural };
}
function cardRow(y, w, specs, { theme } = {}) {
  const natural = specs.map((s) => card(s.x, y, w, { theme, ...s }).natural);
  const minH = Math.max(...natural);
  let svg = ""; specs.forEach((s) => { svg += card(s.x, y, w, { theme, ...s, minH }).svg; });
  return { svg, height: minH };
}

function band(x, y, w, str, { pad = 26, size = 30, fill = null, accent = null, theme } = {}) {
  const P = palette(theme);
  const col = fill == null ? P.ink : fill;
  const acc = accent == null ? P.bright : accent;
  const innerW = w - pad * 2;
  const p = paragraph(x + pad, y + pad + size, str, innerW, { size, fill: col, weight: 700, lh: Math.round(size * 1.28), theme });
  const h = pad * 2 + size + (p.height - Math.round(size * 1.28)) + 4;
  let svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${P.bandBg}" stroke="${acc}" stroke-opacity="${P.bandStrokeOpacity}" stroke-width="1.5"/>`;
  return { svg: svg + p.svg, height: h };
}

function spectrum(x, y, w, { h = 18, lowLabel = "", highLabel = "", size = 16, theme } = {}) {
  const P = palette(theme), k = P.key || "dark";
  let svg = `<defs><linearGradient id="spec-${k}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${P.green}"/><stop offset="1" stop-color="${P.amber}"/>
    </linearGradient></defs>`;
  svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="url(#spec-${k})"/>`;
  if (lowLabel) svg += label(x, y + h + size + 8, lowLabel, { size, fill: P.green, ls: 2, theme });
  if (highLabel) svg += label(x + w, y + h + size + 8, highLabel, { size, fill: P.amber, ls: 2, anchor: "end", theme });
  return svg;
}

function arrow(x1, y1, x2, y2, { color = null, width = 2.4, theme } = {}) {
  const P = palette(theme), k = P.key || "dark";
  const col = color == null ? P.arrow : color;
  return `<defs><marker id="ah-${k}" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill="${col}"/></marker></defs>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${width}" marker-end="url(#ah-${k})"/>`;
}

function footer(w, h, { theme } = {}) {
  const P = palette(theme);
  return label(w / 2, h - 34, "MASTERING OBSERVABILITY  ·  MASTERINGOBSERVABILITY.COM", { size: 16, fill: P.teal, ls: 3, anchor: "middle", theme });
}

async function render(svg, out) {
  await sharp(Buffer.from(svg), { density: 96 }).png({ quality: 92 }).toFile(out);
  console.log("written:", out);
}
function canvas(w, h, inner, { theme } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${background(w, h, { theme })}${inner}${footer(w, h, { theme })}</svg>`;
}

/* Bound API: `const D = themed('light')` gives the whole helper set with the
 * theme pre-applied, so a build script never repeats `theme:` on every call.
 * It binds THESE functions, it does not copy them. */
function themed(t) {
  const P = palette(t);
  const inj = (o) => Object.assign({}, o, { theme: (o && o.theme) || t });
  return {
    theme: t, C: P, P, FONT, wpx, wrap, render,
    background: (w, h, o) => background(w, h, inj(o)),
    line: (x, y, s, o) => line(x, y, s, inj(o)),
    label: (x, y, s, o) => label(x, y, s, inj(o)),
    paragraph: (x, y, s, mw, o) => paragraph(x, y, s, mw, inj(o)),
    card: (x, y, w, o) => card(x, y, w, inj(o)),
    cardRow: (y, w, specs, o) => cardRow(y, w, specs, inj(o)),
    band: (x, y, w, s, o) => band(x, y, w, s, inj(o)),
    spectrum: (x, y, w, o) => spectrum(x, y, w, inj(o)),
    arrow: (x1, y1, x2, y2, o) => arrow(x1, y1, x2, y2, inj(o)),
    footer: (w, h, o) => footer(w, h, inj(o)),
    canvas: (w, h, inner, o) => canvas(w, h, inner, inj(o)),
  };
}

module.exports = {
  C, DARK, LIGHT, PALETTES, palette, setTheme, getTheme, themed,
  FONT, wpx, wrap, background, line, label, paragraph, card, cardRow,
  band, spectrum, arrow, footer, render, canvas,
};

if (require.main === module) {
  const argv = process.argv.slice(2);
  const o = {}; for (let i = 0; i < argv.length; i++) if (argv[i].startsWith("--")) { o[argv[i].slice(2)] = argv[i + 1]; i++; }
  const cmd = argv[0];
  const th = String(o.theme || "dark").toLowerCase();
  if (!PALETTES[th]) { console.error("mo_diagram: unknown theme '" + th + "' (use dark or light)"); process.exit(1); }
  const K = PALETTES[th];
  const W = 1200, H = 680;
  if (cmd === "concept-sample") {
    const x0 = 60, colW = 340, gap = 30, fullW = W - 120;
    let inner = "";
    inner += label(x0, 74, "DIAGRAM STANDARD", { size: 20, fill: K.bright, ls: 3, theme: th });
    inner += line(x0, 116, "Auto-wrap in action: this text is measured, never hand-placed", { size: 26, fill: K.ink, weight: 700, theme: th });
    inner += line(x0, 148, "Every string wraps to its box. Nothing overflows. That is the whole rule.", { size: 18, fill: K.grey, theme: th });
    inner += spectrum(x0, 186, fullW, { lowLabel: "SAFE TO AUTOMATE", highLabel: "DECIDE BY HAND", theme: th });
    const row = cardRow(250, colW, [
      { x: x0, accent: K.green, eyebrow: "LOW BLAST RADIUS", heading: "Automate the action", body: "Reversible, well-scoped changes. Let the system act and log it." },
      { x: x0 + colW + gap, accent: K.amber, eyebrow: "HIGH BLAST RADIUS", heading: "Human in the loop", body: "Wide, hard-to-reverse changes. A named person makes the call." },
      { x: x0 + 2 * (colW + gap), accent: K.teal, eyebrow: "ALWAYS", heading: "Own the outcome", body: "Automation moves the work, never the responsibility for it." },
    ], { theme: th });
    inner += row.svg;
    const b = band(x0, 250 + row.height + 30, fullW, "Automate the action. Never automate the accountability.", { theme: th });
    inner += b.svg;
    render(canvas(W, H, inner, { theme: th }), o.out || (th === "dark" ? "concept_sample.png" : "concept_sample_light.png"));
  } else {
    console.log("usage: node mo_diagram.js concept-sample [--theme dark|light] [--out file.png]");
  }
}
