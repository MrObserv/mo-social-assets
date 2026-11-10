// mo_qr.js v1.0.0 (2026-10-13): QR encoder for the house producers. No dependency.
// Byte mode, versions 1 to 10, error correction L/M/Q/H, all eight masks scored
// by the ISO 18004 penalty rules. Declares no colour: the caller passes fills
// from design-tokens.json.
//
//   const Q = require("./mo_qr.js");
//   const q = Q.encode("https://example.com", { ecl: "M" });   // { version, size, ecl, mask, modules[y][x] }
//   Q.svg(q, { x, y, module, dark, light, quiet: 4 })            // <g> markup, integer pixels
//
// Written rather than installed because the producers carry one dependency
// (sharp) and a QR library is ~400 lines we can test end to end. Verified by
// decoding its own output with an independent decoder (see the kit runbook).
"use strict";

const ECL = { L: { ord: 0, bits: 1 }, M: { ord: 1, bits: 0 }, Q: { ord: 2, bits: 3 }, H: { ord: 3, bits: 2 } };
// Index [ecl.ord][version], version 1..10 (index 0 unused).
const ECC_PER_BLOCK = [
  [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18],
  [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26],
  [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24],
  [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28],
];
const BLOCKS = [
  [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4],
  [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5],
  [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8],
  [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8],
];
const MAX_VERSION = 10;

// ---- GF(256), polynomial 0x11D ---------------------------------------------
const EXP = new Array(512), LOG = new Array(256);
(() => { let x = 1; for (let i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 0x100) x ^= 0x11d; } for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]; })();
const mul = (a, b) => (a && b ? EXP[LOG[a] + LOG[b]] : 0);
function generator(deg) {
  let p = [1];
  for (let i = 0; i < deg; i++) {
    const q = new Array(p.length + 1).fill(0);
    for (let j = 0; j < p.length; j++) { q[j] ^= p[j]; q[j + 1] ^= mul(p[j], EXP[i]); }
    p = q;
  }
  return p;
}
function remainder(data, deg) {
  const g = generator(deg), r = new Array(deg).fill(0);
  for (const b of data) {
    const f = b ^ r.shift(); r.push(0);
    for (let j = 0; j < deg; j++) r[j] ^= mul(g[j + 1], f);
  }
  return r;
}

const rawModules = (v) => {
  let r = (16 * v + 128) * v + 64;
  if (v >= 2) { const n = Math.floor(v / 7) + 2; r -= (25 * n - 10) * n - 55; if (v >= 7) r -= 36; }
  return r;
};
const dataCodewords = (v, e) => Math.floor(rawModules(v) / 8) - ECC_PER_BLOCK[e.ord][v] * BLOCKS[e.ord][v];
function alignment(v) {
  if (v === 1) return [];
  const n = Math.floor(v / 7) + 2, size = v * 4 + 17;
  const step = Math.floor((v * 8 + n * 3 + 5) / (n * 4 - 4)) * 2;
  const out = [6];
  for (let pos = size - 7; out.length < n; pos -= step) out.splice(1, 0, pos);
  return out;
}
function utf8(str) {
  const out = [];
  for (const ch of String(str)) {
    let c = ch.codePointAt(0);
    if (c < 0x80) out.push(c);
    else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
    else if (c < 0x10000) out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    else out.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
  }
  return out;
}
/** Byte capacity of a version at an error-correction level (byte mode). */
function capacity(v, ecl = "M") {
  const e = ECL[ecl]; const cc = v < 10 ? 8 : 16;
  return Math.floor((dataCodewords(v, e) * 8 - 4 - cc) / 8);
}

function encode(text, { ecl = "M", minVersion = 1, maxVersion = MAX_VERSION, mask = null } = {}) {
  const e = ECL[ecl];
  if (!e) throw new Error("mo_qr: error correction must be L, M, Q or H, got " + ecl);
  if (maxVersion > MAX_VERSION) throw new Error("mo_qr: versions above " + MAX_VERSION + " are not implemented");
  const bytes = utf8(text);
  if (!bytes.length) throw new Error("mo_qr: nothing to encode");
  let v = minVersion;
  while (v <= maxVersion && bytes.length > capacity(v, ecl)) v++;
  if (v > maxVersion) throw new Error("mo_qr: " + bytes.length + " bytes do not fit version " + maxVersion + "-" + ecl +
    " (capacity " + capacity(maxVersion, ecl) + "). Shorten the URL.");

  // Bit stream
  const bits = [];
  const put = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
  put(4, 4); put(bytes.length, v < 10 ? 8 : 16); bytes.forEach((b) => put(b, 8));
  const cap = dataCodewords(v, e) * 8;
  put(0, Math.min(4, cap - bits.length));
  put(0, (8 - (bits.length % 8)) % 8);
  for (let pad = 0xec; bits.length < cap; pad ^= 0xec ^ 0x11) put(pad, 8);
  const data = [];
  for (let i = 0; i < bits.length; i += 8) { let b = 0; for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j]; data.push(b); }

  // Blocks and interleave
  const nb = BLOCKS[e.ord][v], ecc = ECC_PER_BLOCK[e.ord][v], raw = Math.floor(rawModules(v) / 8);
  const nShort = nb - (raw % nb), shortLen = Math.floor(raw / nb);
  const blocks = [];
  for (let i = 0, k = 0; i < nb; i++) {
    const dat = data.slice(k, k + shortLen - ecc + (i < nShort ? 0 : 1)); k += dat.length;
    const r = remainder(dat, ecc);
    if (i < nShort) dat.push(0);
    blocks.push(dat.concat(r));
  }
  const cw = [];
  for (let i = 0; i < blocks[0].length; i++) blocks.forEach((b, j) => { if (i !== shortLen - ecc || j >= nShort) cw.push(b[i]); });
  if (cw.length !== raw) throw new Error("mo_qr: internal: " + cw.length + " codewords, expected " + raw);

  // Matrix
  const size = v * 4 + 17;
  const M = Array.from({ length: size }, () => new Array(size).fill(false));
  const F = Array.from({ length: size }, () => new Array(size).fill(false));
  const set = (x, y, d) => { M[y][x] = d; F[y][x] = true; };
  for (let i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
  const finder = (cx, cy) => { for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
    const x = cx + dx, y = cy + dy, d = Math.max(Math.abs(dx), Math.abs(dy));
    if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, d !== 2 && d !== 4); } };
  finder(3, 3); finder(size - 4, 3); finder(3, size - 4);
  const al = alignment(v), na = al.length;
  for (let i = 0; i < na; i++) for (let j = 0; j < na; j++) {
    if ((i === 0 && j === 0) || (i === 0 && j === na - 1) || (i === na - 1 && j === 0)) continue;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(al[i] + dx, al[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  }
  const format = (m) => {
    const d = (e.bits << 3) | m; let r = d;
    for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
    const b = ((d << 10) | r) ^ 0x5412, bit = (i) => ((b >>> i) & 1) === 1;
    for (let i = 0; i <= 5; i++) set(8, i, bit(i));
    set(8, 7, bit(6)); set(8, 8, bit(7)); set(7, 8, bit(8));
    for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
    for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(i));
    for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(i));
    set(8, size - 8, true);
  };
  format(0);
  if (v >= 7) {
    let r = v; for (let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1f25);
    const b = (v << 12) | r;
    for (let i = 0; i < 18; i++) { const d = ((b >>> i) & 1) === 1, a = size - 11 + (i % 3), c = Math.floor(i / 3); set(a, c, d); set(c, a, d); }
  }
  // Data, zigzag
  let bi = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) for (let j = 0; j < 2; j++) {
      const x = right - j, up = ((right + 1) & 2) === 0, y = up ? size - 1 - vert : vert;
      if (!F[y][x] && bi < cw.length * 8) { M[y][x] = ((cw[bi >>> 3] >>> (7 - (bi & 7))) & 1) === 1; bi++; }
    }
  }
  const MASKS = [
    (x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, (x) => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
    (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
    (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0, (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
  ];
  const apply = (m) => { for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!F[y][x] && MASKS[m](x, y)) M[y][x] = !M[y][x]; };
  let best = mask, bestScore = Infinity;
  if (best == null) for (let m = 0; m < 8; m++) {
    apply(m); format(m); const p = penalty(M); if (p < bestScore) { bestScore = p; best = m; } apply(m);
  }
  apply(best); format(best);
  return { version: v, size, ecl, mask: best, bytes: bytes.length, capacity: capacity(v, ecl), modules: M };
}

function penalty(M) {
  const n = M.length; let p = 0, dark = 0;
  const runs = (get) => { for (let a = 0; a < n; a++) { let run = 1; for (let b = 1; b <= n; b++) {
    if (b < n && get(a, b) === get(a, b - 1)) run++; else { if (run >= 5) p += 3 + (run - 5); run = 1; } } } };
  runs((y, x) => M[y][x]); runs((x, y) => M[y][x]);
  for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++) { const c = M[y][x]; if (c === M[y][x + 1] && c === M[y + 1][x] && c === M[y + 1][x + 1]) p += 3; }
  const pat = [1, 0, 1, 1, 1, 0, 1];
  const at = (get, a, b) => (b < 0 || b >= n ? 0 : get(a, b) ? 1 : 0);
  const finderLike = (get) => { for (let a = 0; a < n; a++) for (let b = 0; b <= n - 7; b++) {
    if (!pat.every((v, k) => at(get, a, b + k) === v)) continue;
    const before = [1, 2, 3, 4].every((k) => at(get, a, b - k) === 0), after = [1, 2, 3, 4].every((k) => at(get, a, b + 6 + k) === 0);
    if (before || after) p += 40; } };
  finderLike((y, x) => M[y][x]); finderLike((x, y) => M[y][x]);
  for (const row of M) for (const c of row) if (c) dark++;
  p += (Math.ceil(Math.abs(dark * 20 - n * n * 10) / (n * n)) - 1) * 10;
  return p;
}

/** SVG markup for a code, every module on an integer pixel. The light plate
 *  carries the quiet zone, so the code never depends on what is behind it. */
function svg(q, { x, y, module, dark, light, quiet = 4, radius = 0, border = null, borderWidth = 1 }) {
  if (!dark || !light) throw new Error("mo_qr: dark and light fills are required (from design-tokens.json)");
  if (!(module >= 1) || module !== Math.floor(module)) throw new Error("mo_qr: module must be a whole number of pixels, got " + module);
  if (quiet < 4) throw new Error("mo_qr: quiet zone must be at least 4 modules, got " + quiet);
  x = Math.round(x); y = Math.round(y);
  const side = (q.size + 2 * quiet) * module;
  let d = "";
  for (let r = 0; r < q.size; r++) for (let c = 0; c < q.size; c++) if (q.modules[r][c]) d += "M" + (c + quiet) + " " + (r + quiet) + "h1v1h-1z";
  const b = border ? ` stroke="${border}" stroke-width="${borderWidth}"` : "";
  return `<g><rect x="${x}" y="${y}" width="${side}" height="${side}" rx="${radius}" fill="${light}"${b}/>` +
    `<path d="${d}" fill="${dark}" transform="translate(${x} ${y}) scale(${module})" shape-rendering="crispEdges"/></g>`;
}

module.exports = { VERSION: "1.0.0", encode, svg, capacity, penalty, MAX_VERSION };
