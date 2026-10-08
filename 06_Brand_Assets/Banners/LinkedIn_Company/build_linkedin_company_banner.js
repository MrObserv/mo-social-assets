// LinkedIn Company Page banner, Brand Design System v3.1 §10a. v1.2.0, 2026-10-07.
// v1.1.0 went live on 7 Oct and read badly in the phone app: a white ground on LinkedIn's white
// card shows no band at all, so the text floats over the logo, the rings look sliced, and the
// type lands at about 9dp and 6dp. v1.2.0 builds three variants; Al chose B on 7 Oct, so B is the
// live file and A and C are kept as options in _iterations/:
//   A  tint   ground (light palette `tint`), kicker-led in Space Mono, bigger    (deviation: tint ground)
//   B  tint   ground, the offer line set as a display line in Montserrat        (deviations: a title; tint ground)
//   C  navy   ground (dark palette), kicker-led in Space Mono                   (deviation: §10a mode)
// Composed only from the canonical producer helpers; every string is measured on the rendered
// pixels and every position gated before a file is accepted.
//
// Deviations, recorded in README: the safe-area note says "Drop the title entirely" and gives no
// reason; B sets the offer line as a display headline because the kicker-only layout landed at 9dp
// and 6dp on the phone. B also uses the tint ground. Chosen 7 Oct.
//
// Reproduce: node build_linkedin_company_banner.js <path-to-producers> <out_dir> [B|A|C]
const path = require("path"), fs = require("fs");
const PROD = process.argv[2], OUT = process.argv[3] || ".", VARIANT = (process.argv[4] || "B").toUpperCase();
const RULED = "B";
const Dm = require(path.join(PROD, "mo_diagram.js"));
const T = require(path.join(PROD, "mo-tokens.js"));
const sharp = require(require.resolve("sharp", { paths: [PROD] }));
const F = Dm.FONT, DW = Dm.DISPLAY_WEIGHT;
const SURFACE = "linkedin_company_banner";
const WORDMARK = T.lockupFor(SURFACE);
if (WORDMARK !== "MASTERING OBSERVABILITY") throw new Error("company banner is no longer house lane");
const [W, H] = T.size(SURFACE);
const tokens = JSON.parse(fs.readFileSync(path.join(PROD, "..", "design-tokens.json"), "utf8"));

// MEASURED, in banner pixels. Web on 2026-10-07 in the browser; the phone app from Al's screenshot
// of the live page the same day (the app draws the whole width; logo x71..308 from y122 down).
const VISIBLE = [153.5, 974.5];
const LOGOS = { desktop: [33.7, 99.7, 213.3, H], medium: [187.7, 99.8, 370.1, H], mobileWeb: [48.2, 99.5, 337.6, H], app: [71, 122, 308, H] };
const SCALE_DESK = 804 / W;
const X0 = Math.ceil(Math.max(...Object.values(LOGOS).map((b) => b[2])) + 40), X1 = Math.floor(VISIBLE[1] - 40), COL_W = X1 - X0;

const V = {
  A: { mode: "light", ground: T.light.tint, lead: { font: "mono", lines: ["OBSERVABILITY ADVISORY", "NEWSLETTER · PODCAST"], fill: T.light["teal-deep"], track: 0.12 },
       second: { font: "mono", lines: [WORDMARK], fill: T.light.soft, size: 20, track: 3 / 12 }, order: ["lead", "second"] , phoneFloor: 11.5 },
  B: { mode: "light", ground: T.light.tint, lead: { font: "display", lines: ["Observability advisory,", "newsletter and podcast."], fill: T.light.navy, track: 0 },
       second: { font: "mono", lines: [WORDMARK], fill: T.light["teal-deep"], size: 18, track: 3 / 12 }, order: ["second", "lead"] , phoneFloor: 14 },
  C: { mode: "dark", ground: T.dark["dark-ground"], lead: { font: "mono", lines: ["OBSERVABILITY ADVISORY", "NEWSLETTER · PODCAST"], fill: T.dark["teal-bright"], track: 0.12 },
       second: { font: "mono", lines: [WORDMARK], fill: T.dark["on-dark-soft"], size: 20, track: 3 / 12 }, order: ["lead", "second"], phoneFloor: 11.5 },
}[VARIANT];
// phoneFloor: the lead's size in dp on a 412dp phone, the view v1.1.0 failed. B, the live file, holds 14;
// the rejected options A and C were built to 11.5 and are kept only as a record.
if (!V) throw new Error("variant must be A, B or C");
const L = Dm.themed(V.mode);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ff = (f) => JSON.stringify(f.replace(/"/g, "'"));
const wrapSvg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`;
function text(x, y, str, b, size) {
  const ls = (b.track * size).toFixed(2);
  if (b.font === "mono") return L.label(x, y, str, { size, fill: b.fill, ls: +ls });
  return `<text x="${x}" y="${y}" font-family=${ff(F.display)} font-size="${size}" font-weight="${DW}" letter-spacing="-1.5" fill="${b.fill}">${esc(str)}</text>`;
}

// Rings (§3 texture): the ring mark by name, outer ring inside the cover height, centred past the
// right edge so only the rings bleed in. The ONE wash, from the producer's background(), centres on
// them; the ground colour is the variant's token, passed to background() as a palette object.
const RING_CY = Math.round(H / 2), RINGS = Math.floor((Math.min(RING_CY, H - RING_CY) - 10) * 24 / 10.5);
const RING_CX = W + Math.ceil(RINGS * 2.4 / 24) + 2;
const ground = () => L.background(2 * RING_CX, H, { theme: Object.assign({}, L.P, { bg1: V.ground }) });
function rings() {
  const p = T.ringMark(V.mode, RINGS);
  return `<image href="data:image/svg+xml;base64,${fs.readFileSync(p).toString("base64")}" x="${RING_CX - RINGS / 2}" y="${RING_CY - RINGS / 2}" width="${RINGS}" height="${RINGS}"/>`;
}

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const near = (c, d) => (r, g, b) => Math.abs(r - c[0]) + Math.abs(g - c[1]) + Math.abs(b - c[2]) < d;
async function ink(file, box, pred) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  let minX = W, maxX = -1, minY = H, maxY = -1;
  for (let y = Math.max(0, box[1]); y < Math.min(H, box[3]); y++) for (let x = Math.max(0, box[0]); x < Math.min(W, box[2]); x++) {
    const i = (y * info.width + x) * info.channels;
    if (pred(data[i], data[i + 1], data[i + 2])) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
  }
  return { minX, maxX, minY, maxY, w: maxX - minX + 1, h: maxY - minY + 1 };
}
async function groundIs(file, x, y, want) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const i = (y * info.width + x) * info.channels, c = hex(want);
  return [0, 1, 2].every((k) => Math.abs(data[i + k] - c[k]) <= 3);
}
async function measure(svgInner, pred) {
  const f = path.join(OUT, `.probe_${VARIANT}.png`);
  await sharp(Buffer.from(wrapSvg(ground() + svgInner)), { density: 72 }).png().toFile(f);
  const m = await ink(f, [0, 0, X1 + 200, H], pred); fs.unlinkSync(f); return m;
}

(async () => {
  await T.assertFontsProbe(sharp);
  const lead = V.lead, sec = V.second;
  const pLead = near(hex(lead.fill), 120), pSec = near(hex(sec.fill), 90);
  // Largest lead size whose every line fits the column.
  let LS = null, leadM = null;
  for (let s = lead.font === "display" ? 48 : 40; s >= 16 && !LS; s--) {
    const ms = []; for (const t of lead.lines) ms.push(await measure(text(X0, 100, t, lead, s), pLead));
    if (ms.every((m) => m.w <= COL_W)) { LS = s; leadM = ms; }
  }
  if (!LS) throw new Error("lead cannot fit the column");
  const secM = await measure(text(X0, 100, sec.lines[0], sec, sec.size), pSec);
  const leadAsc = 100 - leadM[0].minY, secAsc = 100 - secM.minY;
  const LINE = Math.round(LS * (lead.font === "display" ? 1.15 : 1.3)), GAP = lead.font === "display" ? 30 : 26;
  // Block: [second above lead] or [lead above second], centred vertically.
  let svg = "", ys = {};
  if (V.order[0] === "lead") {
    const blockH = leadAsc + LINE * (lead.lines.length - 1) + GAP + secAsc, top = Math.round((H - blockH) / 2);
    ys.lead = lead.lines.map((_, i) => top + leadAsc + i * LINE); ys.sec = ys.lead[ys.lead.length - 1] + GAP + secAsc;
  } else {
    const blockH = secAsc + GAP + leadAsc + LINE * (lead.lines.length - 1), top = Math.round((H - blockH) / 2);
    ys.sec = top + secAsc; ys.lead = lead.lines.map((_, i) => ys.sec + GAP + leadAsc + i * LINE);
  }
  lead.lines.forEach((t, i) => { svg += text(X0, ys.lead[i], t, lead, LS); });
  svg += text(X0, ys.sec, sec.lines[0], sec, sec.size);
  const stem = VARIANT === RULED ? "linkedin_company_banner" : `linkedin_company_banner_option${VARIANT}`;
  const file = path.join(OUT, `${stem}_1128x191.png`);
  await L.render(wrapSvg(ground() + rings() + svg), file);

  // Gates on the rendered pixels.
  const XT = Math.floor(VISIBLE[1]);
  const boxes = [];
  for (let i = 0; i < lead.lines.length; i++) {
    const y = ys.lead[i], top = i === 0 ? y - LS : boxes[i - 1][1].maxY + 1; // below the line above's descenders
    boxes.push([`lead line ${i + 1}`, await ink(file, [0, top, XT, y + Math.ceil(LS * 0.3)], pLead)]);
  }
  boxes.push(["second line", await ink(file, [0, ys.sec - sec.size, XT, ys.sec + 6], pSec)]);
  const ringRGB = V.mode === "light" ? [163, 213, 204] : [59, 118, 114];
  const ringInk = await ink(file, [X1 + 1, 0, W, H], near(ringRGB, 60));
  const png = fs.readFileSync(file);
  const gates = [
    ["colour type is truecolour", png[25] === 2 || png[25] === 6],
    ["ring texture found right of the text column", ringInk.maxX > 0],
    ["ring texture right of the medium crop", ringInk.minX > VISIBLE[1]],
    ["outer ring right of the medium crop (geometry)", RING_CX - RINGS * 10.5 / 24 > VISIBLE[1]],
    ["ring centre dot off canvas", RING_CX - RINGS * 2.4 / 24 > W],
    ["outer ring inside the cover height", RING_CY - RINGS * 10.5 / 24 >= 0 && RING_CY + RINGS * 10.5 / 24 <= H],
    ["lead at or over the label floor on desktop", LS * SCALE_DESK >= 10.5],
    ["second line at or over the label floor on desktop", sec.size * SCALE_DESK >= 10.5],
    ["lead at or over the phone-app floor", LS / (W / 412) >= V.phoneFloor],
    ["ground pixel is the variant's ground token", await groundIs(file, X0 - 20, 8, V.ground)],
  ];
  for (const [nm, b] of boxes) {
    gates.push([`${nm} found`, b.maxX > 0]);
    gates.push([`${nm} starts on the column`, b.minX >= X0 - 3]);
    gates.push([`${nm} ends inside the column`, b.maxX <= X1]);
    gates.push([`${nm} 12px clear of top and bottom`, b.minY >= 12 && b.maxY <= H - 12]);
    for (const [ln, r] of Object.entries(LOGOS)) gates.push([`${nm} 12px clear of the ${ln} logo`, b.minX > r[2] + 12 || b.maxY < r[1] - 12]);
  }
  const failed = gates.filter((g) => !g[1]);
  if (failed.length) throw new Error(`${VARIANT}: gates failed: ` + failed.map((g) => g[0]).join("; "));
  const app = W / 412; // a 412dp phone draws the 1128 canvas full width
  console.log(`${VARIANT}: ${gates.length} gates pass. lead ${LS}px (${(LS * SCALE_DESK).toFixed(1)} CSS px desktop, ${(LS / app).toFixed(1)}dp phone); second ${sec.size}px (${(sec.size / app).toFixed(1)}dp phone)`);
  fs.writeFileSync(path.join(OUT, `${stem}.json`), JSON.stringify({
    built: "2026-10-07", builder: "1.2.0", variant: VARIANT, ruled: VARIANT === RULED, tokens: tokens.version, mode: V.mode, ground: V.ground,
    lead: { lines: lead.lines, font: lead.font, size: LS, baselines: ys.lead }, second: { line: sec.lines[0], size: sec.size, baseline: ys.sec },
    column: [X0, X1], logos: LOGOS, rings: { size: RINGS, cx: RING_CX, cy: RING_CY }, ink: Object.fromEntries(boxes), gates: gates.length,
  }, null, 2));
})().catch((e) => { console.error(e.message); process.exit(1); });
