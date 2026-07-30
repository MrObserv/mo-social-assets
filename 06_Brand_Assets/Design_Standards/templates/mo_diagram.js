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
 * Canonical: Voice Codex §17, §24.11, §24.15; Diagram_Standard.md.
 * Palette + geometry mirror mo_visual_kit.js so the two read as one system.
 */
const sharp = require("sharp");

/* ---------- palette (dark blog/slide variant, §24.11) ---------- */
const C = {
  navy: "#0a0e17", navy2: "#0c1929", navy3: "#0e1f35",
  cardBg: "#0e2038", bandBg: "#10233a",
  teal: "#14a3a8", mint: "#2dd4bf", bright: "#64ffda",
  ink: "#ffffff", grey: "#9fb0bd", greyMute: "#aab7c4",
  green: "#7bd88f",   // low / safe / success
  amber: "#ffd166",   // high / caution / warning
  arrow: "#4a6272",
};
const FONT = {
  display: "'Archivo Black','Arial Black','Liberation Sans',sans-serif",
  body: "'DM Sans','Liberation Sans','DejaVu Sans',sans-serif",
  mono: "'Space Mono','DejaVu Sans Mono','Noto Sans Mono',monospace",
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ff = (f) => JSON.stringify(f.replace(/"/g, "'"));

/* ---------- MEASURE + WRAP (the whole point of this file) ---------- */
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

function background(w, h) {
  return `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${C.navy}"/><stop offset="0.6" stop-color="${C.navy2}"/><stop offset="1" stop-color="${C.navy3}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.55">
      <stop offset="0" stop-color="${C.bright}" stop-opacity="0.045"/><stop offset="0.7" stop-color="${C.bright}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0 L0 0 0 60" fill="none" stroke="${C.bright}" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <ellipse cx="${w / 2}" cy="${h * 0.42}" rx="${h * 0.7}" ry="${h * 0.7}" fill="url(#glow)"/>`;
}

function line(x, y, str, { size = 22, fill = C.ink, font = FONT.body, weight = 400, ls = 0, anchor = "start", italic = false } = {}) {
  return `<text x="${x}" y="${y}" font-family=${ff(font)} font-size="${size}" fill="${fill}" font-weight="${weight}" letter-spacing="${ls}" text-anchor="${anchor}"${italic ? ' font-style="italic"' : ""}>${esc(str)}</text>`;
}
function label(x, y, str, { size = 20, fill = C.bright, ls = 3, anchor = "start" } = {}) {
  return line(x, y, str, { size, fill, font: FONT.mono, weight: 700, ls, anchor });
}
function paragraph(x, y, str, maxW, { size = 22, fill = C.ink, font = FONT.body, weight = 400, lh = null, anchor = "start" } = {}) {
  const lineH = lh || Math.round(size * 1.4);
  const lines = wrap(str, maxW, size);
  let svg = "";
  lines.forEach((ln, i) => { svg += line(x, y + i * lineH, ln, { size, fill, font, weight, anchor }); });
  return { svg, height: lines.length * lineH, lines: lines.length };
}

function card(x, y, w, { accent = C.teal, eyebrow = "", heading = "", body = "", pad = 28, headSize = 26, bodySize = 21, minH = 0 } = {}) {
  const innerX = x + pad + 8;
  const innerW = w - pad * 2 - 8;
  let cy = y + pad;
  let inner = "";
  if (eyebrow) { cy += 18; inner += label(innerX, cy, eyebrow, { size: 15, fill: accent, ls: 2 }); cy += 16; }
  if (heading) {
    const h = paragraph(innerX, cy + headSize, heading, innerW, { size: headSize, fill: C.ink, weight: 700, lh: Math.round(headSize * 1.25) });
    inner += h.svg; cy += headSize + h.height - Math.round(headSize * 1.25) + 14;
  }
  if (body) {
    const b = paragraph(innerX, cy + bodySize, body, innerW, { size: bodySize, fill: C.grey, lh: Math.round(bodySize * 1.45) });
    inner += b.svg; cy += bodySize + b.height - Math.round(bodySize * 1.45);
  }
  const natural = (cy + pad) - y;
  const h = Math.max(natural, minH);
  let svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${C.cardBg}" stroke="${C.arrow}" stroke-opacity="0.5" stroke-width="1"/>`;
  svg += `<rect x="${x}" y="${y}" width="6" height="${h}" rx="3" fill="${accent}"/>`;
  return { svg: svg + inner, height: h, natural };
}
function cardRow(y, w, specs) {
  const natural = specs.map((s) => card(s.x, y, w, s).natural);
  const minH = Math.max(...natural);
  let svg = ""; specs.forEach((s) => { svg += card(s.x, y, w, { ...s, minH }).svg; });
  return { svg, height: minH };
}

function band(x, y, w, str, { pad = 26, size = 30, fill = C.ink, accent = C.bright } = {}) {
  const innerW = w - pad * 2;
  const p = paragraph(x + pad, y + pad + size, str, innerW, { size, fill, weight: 700, lh: Math.round(size * 1.28) });
  const h = pad * 2 + size + (p.height - Math.round(size * 1.28)) + 4;
  let svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${C.bandBg}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>`;
  return { svg: svg + p.svg, height: h };
}

function spectrum(x, y, w, { h = 18, lowLabel = "", highLabel = "", size = 16 } = {}) {
  let svg = `<defs><linearGradient id="spec" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.green}"/><stop offset="1" stop-color="${C.amber}"/>
    </linearGradient></defs>`;
  svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="url(#spec)"/>`;
  if (lowLabel) svg += label(x, y + h + size + 8, lowLabel, { size, fill: C.green, ls: 2 });
  if (highLabel) svg += label(x + w, y + h + size + 8, highLabel, { size, fill: C.amber, ls: 2, anchor: "end" });
  return svg;
}

function arrow(x1, y1, x2, y2, { color = C.arrow, width = 2.4 } = {}) {
  return `<defs><marker id="ah" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill="${color}"/></marker></defs>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" marker-end="url(#ah)"/>`;
}

function footer(w, h) {
  return label(w / 2, h - 34, "METRICS & MAYHEM  ·  MASTERINGOBSERVABILITY.COM", { size: 16, fill: C.teal, ls: 3, anchor: "middle" });
}

async function render(svg, out) {
  await sharp(Buffer.from(svg), { density: 96 }).png({ quality: 92 }).toFile(out);
  console.log("written:", out);
}
function canvas(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${background(w, h)}${inner}${footer(w, h)}</svg>`;
}

module.exports = { C, FONT, wpx, wrap, background, line, label, paragraph, card, cardRow, band, spectrum, arrow, footer, render, canvas };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const o = {}; for (let i = 0; i < argv.length; i++) if (argv[i].startsWith("--")) { o[argv[i].slice(2)] = argv[i + 1]; i++; }
  const cmd = argv[0];
  const W = 1200, H = 680;
  if (cmd === "concept-sample") {
    const x0 = 60, colW = 340, gap = 30, fullW = W - 120;
    let inner = "";
    inner += label(x0, 74, "DIAGRAM STANDARD", { size: 20, fill: C.bright, ls: 3 });
    inner += line(x0, 116, "Auto-wrap in action: this text is measured, never hand-placed", { size: 26, fill: C.ink, weight: 700 });
    inner += line(x0, 148, "Every string wraps to its box. Nothing overflows. That is the whole rule.", { size: 18, fill: C.grey });
    inner += spectrum(x0, 186, fullW, { lowLabel: "SAFE TO AUTOMATE", highLabel: "DECIDE BY HAND" });
    const row = cardRow(250, colW, [
      { x: x0, accent: C.green, eyebrow: "LOW BLAST RADIUS", heading: "Automate the action", body: "Reversible, well-scoped changes. Let the system act and log it." },
      { x: x0 + colW + gap, accent: C.amber, eyebrow: "HIGH BLAST RADIUS", heading: "Human in the loop", body: "Wide, hard-to-reverse changes. A named person makes the call." },
      { x: x0 + 2 * (colW + gap), accent: C.teal, eyebrow: "ALWAYS", heading: "Own the outcome", body: "Automation moves the work, never the responsibility for it." },
    ]);
    inner += row.svg;
    const b = band(x0, 250 + row.height + 30, fullW, "Automate the action. Never automate the accountability.");
    inner += b.svg;
    render(canvas(W, H, inner), o.out || "concept_sample.png");
  } else {
    console.log("usage: node mo_diagram.js concept-sample [--out file.png]");
  }
}
