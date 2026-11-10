#!/usr/bin/env node
// mo_event_screen.js v1.0.0 (2026-10-13): THE event screen producer.
// Desktop wallpaper, lock screen and a screensaver set for Al's laptop at
// events. Light, house lane, from design-tokens.json. Declares no colour.
//
//   node mo_event_screen.js build <spec.json> --out <dir> [--size uhd|fhd|wqxga|3k|all] [--effective-height <dip>] [--draft]
//   node mo_event_screen.js check <spec.json> [--size ...] [--effective-height <dip>] [--draft]   gates only, writes nothing
//
// Spec (see ../../Event_Screens/event_screen_kit.json):
// { "slug": "event-screen-kit",
//   "qr":   { "<key>": "https://..." },            Content supplies final URLs with UTM tags
//   "lock": { "claim": "C01", "qr": "<key>", "caption": "SCAN FOR THE SIGNAL" },
//   "screensaver": [ { "id": "01_newsletter", "kind": "newsletter|book|podcast|claim",
//                      "eyebrow": "optional", "headline": "...", "sub": "optional",
//                      "claim": "Cnn (kind claim only)", "cover": "path (kind book only)",
//                      "qr": "<key>", "caption": "SCAN TO ..." } ] }
//
// A URL containing PLACEHOLDER is refused unless --draft is passed, and a
// draft frame carries a visible DRAFT QR stamp so it cannot ship unnoticed.
"use strict";
const fs = require("fs");
const path = require("path");
const S = require(path.join(__dirname, "mo_social.js"));
const Q = require(path.join(__dirname, "mo_qr.js"));
const { T, C } = S;
T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_event_screen.js");
const VERSION = "1.0.0";

const SURFACE = { wallpaper: "event_wallpaper", lock: "event_lock_screen", saver: "event_screensaver" };
for (const s of Object.values(SURFACE)) {
  if (T.modeFor(s) !== "light") throw new Error("mo_event_screen: " + s + " no longer resolves light; re-read design-tokens.json mode (ruled light 2026-10-13)");
  if (T.lockupFor(s) !== "MASTERING OBSERVABILITY") throw new Error("mo_event_screen: " + s + " must be house lane");
}
const SIZES = { uhd: "event_screen_uhd", fhd: "event_screen_fhd", wqxga: "event_screen_wqxga", "3k": "event_screen_3k" };
const FLOOR = T.raw.canvas.floors.event_screen;
const SA = T.raw.safe_areas.event_screen;
if (!FLOOR || !SA) throw new Error("mo_event_screen: design-tokens.json lacks canvas.floors.event_screen or safe_areas.event_screen (needs 3.4.0)");
const NAVY = T.light["navy"], PANEL = T.light["panel"], BORDER = T.light["border"], HIGH = T.light["semantic-high"];
const RADIUS = parseFloat(T.structure.radius.card);
const KINDS = ["newsletter", "book", "podcast", "claim"];
const SHOW_NAME = /metrics\s*(&|and)\s*mayhem/i;
const PANEL_MM_14IN_1610 = 188;   // screen height of a 14in 16:10 panel

// ---- claims ------------------------------------------------------------------
let BANK = null;
function claimBank() {
  if (BANK) return BANK;
  const p = path.join(__dirname, "..", T.raw.copy.claim_bank);
  if (!fs.existsSync(p)) throw new Error("mo_event_screen: claim bank not found at " + p);
  return (BANK = JSON.parse(fs.readFileSync(p, "utf8")));
}
function claim(id) {
  const b = claimBank();
  const c = (b.claims || []).find((x) => x.id === id);
  if (!c) throw new Error("mo_event_screen: no claim " + id + " in claim-bank.json. A new claim is a CR, not a production decision.");
  if ((b.resting || []).some((x) => (x.id || x) === id)) throw new Error("mo_event_screen: claim " + id + " is resting");
  if (c.status !== "approved") throw new Error("mo_event_screen: claim " + id + " is " + c.status + ", not approved");
  if ((c.surfaces || []).indexOf("event screen") === -1) throw new Error("mo_event_screen: claim " + id +
    " is not permitted on \"event screen\" (surfaces: " + c.surfaces.join(", ") + "). Adding it is a claim-bank edit: CR-2026-10-13-EVENT.");
  return S.assertCopy(c.text, "claim " + id);
}

// ---- validation ----------------------------------------------------------------
function validate(spec, { draft = false } = {}) {
  if (!spec || typeof spec !== "object") throw new Error("mo_event_screen: spec must be a JSON object");
  S.assertSlug(spec.slug);
  const qr = spec.qr || {};
  const used = new Set();
  const url = (key, where) => {
    const u = qr[key];
    if (!u) throw new Error("mo_event_screen: " + where + " names QR \"" + key + "\", which is not in spec.qr");
    if (!/^https:\/\/[^\s]+$/.test(u)) throw new Error("mo_event_screen: QR \"" + key + "\" must be a full https:// URL, got " + u);
    if (/PLACEHOLDER/i.test(u) && !draft) throw new Error("mo_event_screen: QR \"" + key + "\" is still a placeholder (" + u + "). Content supplies the final URL; pass --draft to build a stamped proof.");
    used.add(key);
    return u;
  };
  const copy = (f, where, kind) => {
    for (const k of ["eyebrow", "headline", "sub", "caption"]) {
      if (f[k] == null) continue;
      f[k] = S.assertCopy(f[k], where + "." + k);
      if (SHOW_NAME.test(f[k]) && kind !== "podcast" && kind !== "book") throw new Error("mo_event_screen: " + where + "." + k +
        " names Metrics & Mayhem on a house frame. Only the podcast and book frames may name it, as copy (lockup.event_screen_lane).");
    }
    if (f.eyebrow && f.eyebrow !== f.eyebrow.toUpperCase()) throw new Error("mo_event_screen: " + where + ".eyebrow must be upper case");
    if (f.caption && f.caption !== f.caption.toUpperCase()) throw new Error("mo_event_screen: " + where + ".caption must be upper case");
  };
  if (!spec.lock || !spec.lock.claim) throw new Error("mo_event_screen: spec.lock.claim is required (a claim-bank ID)");
  spec.lock.text = claim(spec.lock.claim);
  spec.lock.url = url(spec.lock.qr, "lock");
  if (!spec.lock.caption) throw new Error("mo_event_screen: spec.lock.caption is required");
  copy(spec.lock, "lock", "claim");
  const frames = spec.screensaver || [];
  if (frames.length < 3 || frames.length > 4) throw new Error("mo_event_screen: the screensaver set is 3 or 4 frames, got " + frames.length);
  const ids = new Set();
  frames.forEach((f, i) => {
    const w = "screensaver[" + i + "]";
    if (!/^[0-9]{2}_[a-z0-9-]+$/.test(String(f.id || ""))) throw new Error("mo_event_screen: " + w + ".id must look like 01_newsletter");
    if (ids.has(f.id)) throw new Error("mo_event_screen: duplicate frame id " + f.id);
    ids.add(f.id);
    if (KINDS.indexOf(f.kind) === -1) throw new Error("mo_event_screen: " + w + ".kind must be " + KINDS.join(", ") + ", got " + f.kind);
    if (f.kind === "claim") {
      if (f.headline) throw new Error("mo_event_screen: " + w + " is a claim frame; its line comes from the bank, so it takes no headline");
      f.headline = claim(f.claim);
    } else if (f.claim) throw new Error("mo_event_screen: " + w + " carries a claim but is kind " + f.kind);
    if (!f.headline) throw new Error("mo_event_screen: " + w + ".headline is required");
    if (!f.caption) throw new Error("mo_event_screen: " + w + ".caption is required");
    if (f.kind === "podcast" && !(f.eyebrow && SHOW_NAME.test(f.eyebrow))) throw new Error("mo_event_screen: " + w +
      " is the podcast frame and must name the show in its eyebrow (carousel_lane precedent)");
    if (f.kind === "book" && !f.cover) throw new Error("mo_event_screen: " + w + " is the book frame and needs cover (a PNG path)");
    if (f.kind !== "book" && f.cover) throw new Error("mo_event_screen: " + w + " carries a cover but is kind " + f.kind);
    copy(f, w, f.kind);
    f.url = url(f.qr, w);
  });
  return spec;
}

/** Book cover: PNG only, so its size can be read without a decoder. */
function cover(p) {
  if (!fs.existsSync(p)) throw new Error("mo_event_screen: book cover not found: " + p + ". A missing cover is a build failure, not a silent skip.");
  T.assertFilesClean([p]);
  const b = fs.readFileSync(p);
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (!sig.every((v, i) => b[i] === v)) throw new Error("mo_event_screen: book cover must be a PNG: " + p);
  const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
  if (!(w > 0 && h > 0) || w / h > 1) throw new Error("mo_event_screen: book cover must be portrait, got " + w + "x" + h);
  return { w, h, href: "data:image/png;base64," + b.toString("base64") };
}

// ---- geometry --------------------------------------------------------------------
function geometry(sizeKey, effH) {
  const [W, H] = T.size(SIZES[sizeKey]);
  const u = H / FLOOR.judged_at_height_px, k = H / effH;
  const L = SA.lock, D = SA.desktop;
  const zones = {
    desktop: [
      { what: "desktop icons", x0: 0, y0: 0, x1: (D.icons_left_dip + D.clearance_dip) * k, y1: H },
      { what: "taskbar", x0: 0, y0: H - (D.taskbar_bottom_dip + D.clearance_dip) * k, x1: W, y1: H },
    ],
    lock: [
      { what: "lock clock", x0: W / 2 - (L.clock.w_dip / 2) * k, y0: 0, x1: W / 2 + (L.clock.w_dip / 2) * k, y1: L.clock.h_dip * k },
      { what: "lock bottom strip", x0: 0, y0: H - L.bottom_strip_dip * k, x1: W, y1: H },
    ],
    soft: [
      { what: "sign-in prompt (soft)", x0: W / 2 - (L.signin_soft.w_dip / 2) * k, y0: H / 2 - (L.signin_soft.h_dip / 2) * k,
        x1: W / 2 + (L.signin_soft.w_dip / 2) * k, y1: H / 2 + (L.signin_soft.h_dip / 2) * k },
    ],
  };
  const G = Math.round(0.03 * H);
  const band = { top: Math.round(zones.lock[0].y1 + G), bottom: Math.round(zones.lock[1].y0 - G) };
  const floors = {};
  for (const r of ["display_px", "text_px", "small_px", "label_px"]) floors[r] = Math.ceil(FLOOR[r] * u);
  return { W, H, u, k, effH, M: Math.round(80 * u), zones, band, floors, sizeKey,
    panelMm: Math.abs(W / H - 1.6) < 0.001 ? PANEL_MM_14IN_1610 : null };
}
function newSheet(g) {
  const s = S.sheet("event_screen", g.W, g.H, { margin: g.M });
  s.floors = g.floors;      // canvas.floors.event_screen scaled to this canvas height
  s.boxes = [];
  s.box = (what, x0, y0, x1, y1) => s.boxes.push({ what, x0, y0, x1, y1 });
  return s;
}

/* SAFE-AREA GATE. Every placed string (from the ledger) and every placed
 * object (QR, mark, cover, rule) is boxed and tested against the hard zones.
 * Soft zones are reported, never thrown. */
function safeGate(s, zones, soft, label) {
  const boxes = s.items.map((it) => {
    const w = s.width(it.str, it.role, it.size, it.ls);
    const x0 = it.anchor === "middle" ? it.x - w / 2 : it.anchor === "end" ? it.x - w : it.x;
    return { what: it.what + " \"" + it.str + "\"", x0, x1: x0 + w, y0: it.y - it.size * 0.78, y1: it.y + it.size * 0.24 };
  }).concat(s.boxes);
  const hit = (a, z) => a.x0 < z.x1 && a.x1 > z.x0 && a.y0 < z.y1 && a.y1 > z.y0;
  const bad = [], softHits = [];
  for (const b of boxes) {
    for (const z of zones) if (hit(b, z)) bad.push(b.what + " enters the " + z.what);
    for (const z of soft || []) if (hit(b, z)) softHits.push(b.what);
  }
  if (bad.length) throw new Error("mo_event_screen: " + label + " breaks the safe area (" + bad.length + "):\n  " + bad.join("\n  ") +
    "\nZones are safe_areas.event_screen at an effective height of " + s.effH + " dip.");
  return { boxes: boxes.length, soft: softHits };
}

function placeQr(s, g, url, x, y, side) {
  const q = Q.encode(url, { ecl: FLOOR.qr_ecl });
  const n = q.size + 2 * FLOOR.qr_quiet_modules;
  const min = Math.ceil(FLOOR.qr_module_min_fraction * g.H);
  // Whole-pixel modules: round UP to the floor when that grows the plate by
  // no more than 10 per cent; beyond that the URL is too long for the frame.
  const module = Math.max(Math.floor(side / n), min);
  if (module * n > side * 1.1) throw new Error("mo_event_screen: QR for " + url + " is version " + q.version + " (" + q.bytes + " bytes); at the " + min + "px module floor its plate is " +
    (module * n) + "px, over the " + Math.round(side * 1.1) + "px this frame allows. Shorten the URL (a short redirect carrying the UTM tags).");
  const real = module * n, ox = Math.round(x + (side - real) / 2), oy = Math.round(y + (side - real) / 2);
  s.add(Q.svg(q, { x: ox, y: oy, module, dark: NAVY, light: PANEL, quiet: FLOOR.qr_quiet_modules,
    radius: Math.round(RADIUS * g.u), border: BORDER, borderWidth: Math.max(1, Math.round(g.u)) }));
  s.box("QR", ox, oy, ox + real, oy + real);
  return { url, version: q.version, ecl: q.ecl, mask: q.mask, bytes: q.bytes, capacity: q.capacity, module_px: module, side_px: real,
    side_mm_on_14in: g.panelMm ? +(real / g.H * g.panelMm).toFixed(1) : null,
    module_mm_on_14in: g.panelMm ? +(module / g.H * g.panelMm).toFixed(2) : null };
}

/* The domain as a mono label: protocol stripped (contact.rules.urls) and
 * upper case, because type.label.transform is uppercase. */
function domainLabel() {
  const d = String(T.raw.contact.domain).replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  return T.type.label.transform === "uppercase" ? d.toUpperCase() : d;
}
function lockupRow(s, g, x, y, domain) {
  const u = g.u, mark = Math.round(72 * u);
  s.add(S.ringMark(Math.round(x), Math.round(y), mark));
  s.box("ring mark", x, y, x + mark, y + mark);
  const tx = x + mark + Math.round(24 * u), maxW = g.W * 0.5;
  s.text(tx, y + Math.round(31 * u), T.lockupFor(SURFACE.lock), { role: "label", size: Math.ceil(30 * u), fill: C.deep, ls: Math.round(3 * u), maxW, what: "wordmark" });
  s.text(tx, y + Math.round(67 * u), domain, { role: "label", size: Math.ceil(28 * u), fill: C.soft, ls: Math.round(2 * u), maxW, what: "domain" });
  return mark;
}

/* Balanced measure: the narrowest width that keeps the same line count, so
 * a claim breaks "It was never / the tooling." rather than after "the". A
 * width that starts a line with a numeral is skipped, so "Chapter 4" holds. */
function balance(s, str, role, size, maxW, ls) {
  const n0 = s.measure(str, role, size, maxW, ls).length;
  let best = maxW;
  if (n0 < 2) return best;
  for (let w = maxW - 8; w > maxW * 0.4; w -= 8) {
    const lines = s.measure(str, role, size, w, ls);
    if (lines.length !== n0) break;
    if (lines.slice(1).some((l) => /^\d/.test(l))) continue;
    best = w;
  }
  return best;
}

/* The text group of a lock or screensaver frame, laid out from oy. Returns
 * its height so it can be measured on a probe sheet, then centred in the band. */
function group(s, g, f, z, oy, colW, { rule }) {
  const u = g.u, x = g.M;
  let y = oy;
  if (f.eyebrow) {
    const base = y + Math.round(24 * u);
    s.add(`<rect x="${x}" y="${base - Math.round(10 * u)}" width="${Math.round(70 * u)}" height="${Math.max(2, Math.round(3 * u))}" fill="${C.deep}"/>`);
    s.text(x + Math.round(92 * u), base, f.eyebrow, { role: "label", size: Math.ceil(30 * u), fill: C.deep, ls: Math.round(3 * u), maxW: colW - Math.round(92 * u), what: "eyebrow" });
    y = base + Math.round(56 * u);
  }
  const lh = Math.round(z * 1.06), hls = -Math.round(2 * u);
  const hw = balance(s, f.headline, "display", z, colW, hls);
  const h = s.block(x, y + Math.round(z * 0.76), f.headline, { role: "display", size: z, fill: C.ink, maxW: hw, lh, ls: hls, maxLines: 3, what: "headline" });
  y = h.last + Math.round(z * 0.24);
  if (f.sub) {
    const ts = Math.ceil(44 * u);
    y += Math.round(34 * u);
    const b = s.block(x, y + Math.round(ts * 0.78), f.sub, { role: "text", size: ts, fill: C.muted, maxW: balance(s, f.sub, "text", ts, colW, 0), lh: Math.round(ts * 1.32), maxLines: 2, what: "sub" });
    y = b.last + Math.round(ts * 0.24);
  }
  if (rule) {
    y += Math.round(44 * u);
    s.add(`<rect x="${x}" y="${y}" width="${Math.round(64 * u)}" height="${Math.round(5 * u)}" fill="${C.deep}"/>`);
    s.box("rule", x, y, x + Math.round(64 * u), y + Math.round(5 * u));
    y += Math.round(5 * u);
  }
  y += Math.round(48 * u);
  y += lockupRow(s, g, x, y, domainLabel());
  return { lines: h.lines, height: y - oy };
}

function fitGroup(g, f, colW, opts) {
  const max = Math.round(0.115 * g.H), floor = g.floors.display_px, room = g.band.bottom - g.band.top;
  let last = null;
  for (let z = max; z >= floor; z -= 2) {
    try {
      const r = group(newSheet(g), g, f, z, 0, colW, opts);
      if (r.height <= room) return { z, ...r };
      last = "group is " + r.height + "px in a " + room + "px band";
    } catch (e) { if (!/wraps to/.test(e.message)) throw e; last = e.message; }
  }
  throw new Error("mo_event_screen: \"" + f.headline + "\" does not fit at " + g.W + "x" + g.H + " even at the " + floor + "px display floor (" + last + "). Cut the copy.");
}

function stamp(s, g) {
  s.text(g.M, g.M + Math.round(22 * g.u), "DRAFT QR", { role: "label", size: Math.ceil(28 * g.u), fill: HIGH, ls: Math.round(3 * g.u), maxW: g.W / 4, what: "draft stamp" });
}

// ---- composers ---------------------------------------------------------------------
function composeWallpaper(g) {
  const s = newSheet(g); s.effH = g.effH;
  const u = g.u, mark = Math.round(120 * u), cx = g.W / 2;
  const top = Math.round(0.42 * g.H - mark / 2 - 40 * u);
  s.add(S.ringMark(Math.round(cx - mark / 2), top, mark));
  s.box("ring mark", cx - mark / 2, top, cx + mark / 2, top + mark);
  s.text(cx, top + mark + Math.round(78 * u), T.lockupFor(SURFACE.wallpaper), { role: "label", size: Math.ceil(34 * u), fill: C.deep, ls: Math.round(6 * u), anchor: "middle", maxW: g.W * 0.6, what: "wordmark" });
  s.text(cx, top + mark + Math.round(128 * u), domainLabel(), { role: "label", size: Math.ceil(28 * u), fill: C.soft, ls: Math.round(3 * u), anchor: "middle", maxW: g.W * 0.6, what: "domain" });
  return { s, safe: safeGate(s, g.zones.desktop, null, "wallpaper " + g.W + "x" + g.H), qr: null };
}

function composeFrame(g, f, { rule, draft, coverImg }) {
  const u = g.u;
  const qrSide = Math.round(FLOOR.qr_side_fraction * g.H);
  const capGap = Math.round(28 * u), capSize = Math.ceil(28 * u), colH = qrSide + capGap + Math.round(capSize * 1.0);
  const room = g.band.bottom - g.band.top;
  if (colH > room) throw new Error("mo_event_screen: the QR column (" + colH + "px) does not fit the " + room + "px band at " + g.W + "x" + g.H +
    ", effective height " + g.effH + " dip. The clock and bottom strip leave too little screen at this scaling.");
  const qrX = g.W - g.M - qrSide, qrY = Math.round(g.band.top + (room - colH) / 2);
  let textRight = qrX - Math.round(72 * u), cov = null;
  if (coverImg) {
    const ch = qrSide, cw = Math.round(ch * coverImg.w / coverImg.h);
    cov = { x: qrX - Math.round(64 * u) - cw, y: qrY, w: cw, h: ch };
    textRight = cov.x - Math.round(72 * u);
  }
  const colW = textRight - g.M;
  const fit = fitGroup(g, f, colW, { rule });
  const s = newSheet(g); s.effH = g.effH;
  const oy = Math.round(g.band.top + (room - fit.height) / 2);
  group(s, g, f, fit.z, oy, colW, { rule });
  const qr = placeQr(s, g, f.url, qrX, qrY, qrSide);
  s.text(qrX + qrSide / 2, qrY + qrSide + capGap + Math.round(capSize * 0.78), f.caption, { role: "label", size: capSize, fill: C.deep, ls: Math.round(2 * u), anchor: "middle", maxW: qrSide, what: "QR caption" });
  if (cov) {
    s.add(`<image href="${coverImg.href}" x="${cov.x}" y="${cov.y}" width="${cov.w}" height="${cov.h}" preserveAspectRatio="xMidYMid slice"/>` +
      `<rect x="${cov.x}" y="${cov.y}" width="${cov.w}" height="${cov.h}" fill="none" stroke="${BORDER}" stroke-width="${Math.max(1, Math.round(u))}"/>`);
    s.box("book cover", cov.x, cov.y, cov.x + cov.w, cov.y + cov.h);
  }
  if (draft && /PLACEHOLDER/i.test(f.url)) stamp(s, g);
  return { s, safe: safeGate(s, g.zones.lock, g.zones.soft, (f.id || "lock") + " " + g.W + "x" + g.H), qr, display_px: fit.z, lines: fit.lines };
}

function compose(spec, { size = "all", effectiveHeight, draft = false, base = "." } = {}) {
  validate(spec, { draft });
  const effH = Number(effectiveHeight || SA.design_effective_height_dip);
  if (!(effH >= 600 && effH <= 2160)) throw new Error("mo_event_screen: --effective-height must be 600 to 2160 dip, got " + effectiveHeight);
  const keys = size === "all" ? Object.keys(SIZES) : [size];
  keys.forEach((k) => { if (!SIZES[k]) throw new Error("mo_event_screen: size must be " + Object.keys(SIZES).join(", ") + " or all, got " + k); });
  const covers = {};
  spec.screensaver.forEach((f) => { if (f.cover) covers[f.id] = cover(path.resolve(base, f.cover)); });
  const out = [];
  const finish = (r, g, surface, file, meta) => {
    const svg = r.s.svg();
    const check = S.gate(r.s, file);
    T.assertRenderClean(svg, file);
    out.push({ surface, size: g.W + "x" + g.H, file, svg, check, safe: r.safe, qr: r.qr, display_px: r.display_px || null, ...meta });
  };
  for (const k of keys) {
    const g = geometry(k, effH), wh = g.W + "x" + g.H;
    finish(composeWallpaper(g), g, SURFACE.wallpaper, `wallpaper/event-wallpaper_${wh}.png`, { alt: T.lockupFor(SURFACE.wallpaper) + ", " + T.raw.contact.domain });
    const L = { id: "lock", headline: spec.lock.text, caption: spec.lock.caption, url: spec.lock.url };
    finish(composeFrame(g, L, { rule: true, draft }), g, SURFACE.lock, `lock_screen/event-lock_${wh}.png`, { claim: spec.lock.claim, alt: S.sentence(spec.lock.text) });
    spec.screensaver.forEach((f) => {
      finish(composeFrame(g, f, { rule: f.kind === "claim", draft, coverImg: covers[f.id] }), g, SURFACE.saver,
        `screensaver/${wh}/${f.id}.png`, { kind: f.kind, claim: f.claim || null, alt: [f.eyebrow, f.headline, f.sub].filter(Boolean).map(S.sentence).join(" ") });
    });
  }
  return { effH, frames: out };
}

async function build(spec, outDir, opts = {}) {
  const fonts = T.assertFonts();
  const probe = await T.assertFontsProbe(require("sharp"));
  const r = compose(spec, opts);
  for (const f of r.frames) {
    const p = path.join(outDir, f.file);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    const png = await S.render(f.svg, p);
    f.png_colour_type = png[25];
    f.bytes = png.length;
  }
  const manifest = { producer: "mo_event_screen.js " + VERSION, qr: "mo_qr.js " + Q.VERSION, kit: "mo_social.js " + S.VERSION, tokens: T.version,
    claim_bank: claimBank().version, slug: spec.slug, built: new Date().toISOString(), draft: !!opts.draft,
    effective_height_dip: r.effH, safe_areas_status: SA.status, fonts, font_probe: probe,
    frames: r.frames.map(({ svg, ...rest }) => rest) };
  const mf = path.join(outDir, spec.slug + "_manifest.json");
  fs.writeFileSync(mf, JSON.stringify(manifest, null, 2) + "\n");
  console.log("mo_event_screen " + VERSION + " (tokens " + T.version + "): " + r.frames.length + " PNGs, manifest " + mf);
  return manifest;
}

module.exports = { VERSION, SURFACE, SIZES, validate, geometry, compose, build, claim, cover, safeGate };

if (require.main === module) {
  const o = S.args(process.argv.slice(2));
  const cmd = o._[0];
  const fail = (e) => { console.error(e.message); process.exit(1); };
  const opts = { size: o.size && o.size !== true ? o.size : "all", effectiveHeight: o["effective-height"], draft: !!o.draft };
  const load = (p) => { opts.base = path.dirname(path.resolve(p)); return JSON.parse(fs.readFileSync(p, "utf8")); };
  if (cmd === "build" && o._[1]) { const spec = load(o._[1]); build(spec, o.out || opts.base, opts).catch(fail); }
  else if (cmd === "check" && o._[1]) {
    try {
      const r = compose(load(o._[1]), opts);
      r.frames.forEach((f) => console.log(f.file, f.display_px ? f.display_px + "px" : "", f.qr ? "QR v" + f.qr.version + " " + f.qr.module_px + "px/module" : "",
        "AA " + f.check.min_contrast, f.safe.soft.length ? "soft: " + f.safe.soft.length : ""));
      console.log("gates passed: " + r.frames.length + " frames at effective height " + r.effH + " dip");
    } catch (e) { fail(e); }
  } else {
    console.log("usage: node mo_event_screen.js build <spec.json> --out <dir> [--size uhd|fhd|wqxga|3k|all] [--effective-height <dip>] [--draft]");
    console.log("       node mo_event_screen.js check <spec.json> [--size ...] [--effective-height <dip>] [--draft]");
    process.exit(cmd ? 1 : 0);
  }
}
