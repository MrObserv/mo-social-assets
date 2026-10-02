// LinkedIn personal banner v3, Brand Design System v3.1 §10a. CENTRED text + the SIGNAL LINE motif.
// Requirement for v3 (28 Sep): fix the layout and the empty space, keep every view clean including the
// phone browser, and add a visual. v3 keeps v2's phone-safe centred text and adds the canonical signal line
// mark (marks.signal_line, "the graphic on a card that needs one"), uniformly scaled, in the space
// between the photo and the text. Its dashed threshold runs at the kicker-rule height, so the trace
// leads the eye from the photo into the words. The photo sits on top of it, as on any cover image.
//
// v2 notes follow.
// Requirement for v2 (28 Sep, on v1's left-aligned column at x665): keep the white ground, lose the
// hard left edge, close the space between the photo and the text, and centre the text. v2 centres
// every line on one axis.
//
// Composed ONLY from the canonical producer helpers, as v1. Every string is measured and every
// position is proven on the rendered pixels.
//
// Reproduce: AXIS=<centre|phone|number> node build_linkedin_banner_v2.js <producers> <out_dir> [C22|C02|C15|C01]
//   AXIS=centre  text centred on the banner (x792). Closest to the photo on desktop. On a phone
//                BROWSER the photo covers the start of the lines; reported, not failed.
//   AXIS=phone   the leftmost axis at which no text pixel touches ANY measured photo, phone browser
//                included (+16px). Computed from the rendered pixels.
const path = require("path"), fs = require("fs");
const PROD = process.argv[2], OUT = process.argv[3] || ".", CLAIM_ID = process.argv[4] || "C22";
const AXIS_MODE = process.env.AXIS || "phone";
const GRAPHIC = process.env.GRAPHIC || "signal";
const Dm = require(path.join(PROD, "mo_diagram.js"));
const T = require(path.join(PROD, "mo-tokens.js"));
const sharp = require(require.resolve("sharp", { paths: [PROD] }));
const L = Dm.themed("light"), F = Dm.FONT, DW = Dm.DISPLAY_WEIGHT;
const SURFACE = "linkedin_personal_banner";
if (T.modeFor(SURFACE) !== "light") throw new Error("banner surface no longer resolves light; re-read design-tokens.json");
if (T.lockupFor(SURFACE) !== "MASTERING OBSERVABILITY") throw new Error("banner is no longer house lane");
const [W, H] = T.size(SURFACE);

const tokens = JSON.parse(fs.readFileSync(path.join(PROD, "..", "design-tokens.json"), "utf8"));
const SA = tokens.safe_areas[SURFACE];
const SAFE_X0 = (W - SA.safe[0]) / 2, SAFE_X1 = SAFE_X0 + SA.safe[0];
const AV = SA.avatar_exclusion, AV_R = AV.d / 2;
const TOKEN_AV = { cx: AV.x + AV_R, cy: AV.half_below ? H : H - AV_R, r: AV_R };
const CROSSOVER = tokens.marks && tokens.marks.ring_mark ? tokens.marks.ring_mark.crossover_px : 40;

// MEASURED on Al's live profile, 2026-09-27 (see v1): desktop d305 at 55,211; phone browser d540 at 84,84.
const COVER_SCALE_DESK = W / 792, COVER_SCALE_MOB = W / 375.4;
const circ = (left, top, d) => ({ cx: left + d / 2, cy: top + d / 2, r: d / 2 });
const DESK = circ(27.7 * COVER_SCALE_DESK, 105.7 * COVER_SCALE_DESK, 152.6 * COVER_SCALE_DESK);
const MOB = circ(20 * COVER_SCALE_MOB, 19.8 * COVER_SCALE_MOB, 128 * COVER_SCALE_MOB);

const C = { deep: T.light["teal-deep"], navy: T.light["navy"] };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ff = (f) => JSON.stringify(f.replace(/"/g, "'"));

const bank = JSON.parse(fs.readFileSync(path.join(PROD, "..", "claim-bank.json"), "utf8"));
const claim = bank.claims.find((c) => c.id === CLAIM_ID);
if (!claim) throw new Error("claim " + CLAIM_ID + " not in the bank");
if (!(claim.surfaces || []).includes("banner")) throw new Error("claim " + CLAIM_ID + " is not permitted on a banner");
if (claim.status !== "approved") throw new Error("claim " + CLAIM_ID + " is not approved");

const KICKER = "IT OPERATIONS LEADER";
const KICKER_SIZE = 24, KICKER_LS = 8, KICKER_CAP = 18, RULE_W = 48, RULE_GAP = 22; // label token 12px/4px at 2x
const TITLE_SIZE = 52, TITLE_LH = 1.1, KICKER_TO_TITLE = 80, TITLE_MAXW = 700;
const FOOTER_TOP = H - 34 - 16;
const MARK = Math.ceil(CROSSOVER * COVER_SCALE_MOB) + 2, MARK_X = W - MARK - 36; // v1, reviewed PASS
const RIGHT_LIMIT = Math.min(SAFE_X1 - 16, MARK_X - 40);
const SIG = { w0: 320, h0: 96, threshY0: 34, scale: 2, x: 42 };            // from marks/mo_signal_line_on_light.svg
SIG.w = SIG.w0 * SIG.scale; SIG.h = SIG.h0 * SIG.scale;

function balanced(str, maxW, size) {
  const greedy = L.wrap(str, maxW, size);
  if (greedy.length !== 2) return greedy;
  const words = str.split(" ");
  let best = null;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" "), b = words.slice(i).join(" ");
    const wa = L.wpx(a, size), wb = L.wpx(b, size);
    if (wa > maxW || wb > maxW) continue;
    const score = Math.max(wa, wb);
    if (!best || score < best.score) best = { lines: [a, b], score };
  }
  return best ? best.lines : greedy;
}
const lines = balanced(claim.text, TITLE_MAXW, TITLE_SIZE);
if (lines.length > 2) throw new Error("title wraps to " + lines.length + " lines; it must hold two");
const titleBottomRel = (lines.length - 1) * TITLE_SIZE * TITLE_LH + TITLE_SIZE * 0.22;
const BLOCK_H = KICKER_CAP + KICKER_TO_TITLE + titleBottomRel;
const KICKER_Y = Math.round((FOOTER_TOP - BLOCK_H) / 2 + KICKER_CAP), TITLE_Y = KICKER_Y + KICKER_TO_TITLE;
const TITLE_BOTTOM = TITLE_Y + titleBottomRel;
const MARK_Y = Math.round((KICKER_Y - KICKER_CAP + TITLE_BOTTOM) / 2 - MARK / 2);

const wrap = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`;
const title = (ax) => lines.map((ln, i) => `<text x="${ax}" y="${TITLE_Y + i * TITLE_SIZE * TITLE_LH}" text-anchor="middle" font-family=${ff(F.display)} font-size="${TITLE_SIZE}" font-weight="${DW}" letter-spacing="-1" fill="${C.navy}">${esc(ln)}</text>`).join("");
// Kicker: the canonical label, centred, with a rule either side (a centred line cannot hang off one rule).
const kicker = (ax, mid, labelW) => L.label(ax, KICKER_Y, KICKER, { size: KICKER_SIZE, fill: C.deep, ls: KICKER_LS, anchor: "middle" }) +
  [-1, 1].map((s) => `<rect x="${s < 0 ? mid - labelW / 2 - RULE_GAP - RULE_W : mid + labelW / 2 + RULE_GAP}" y="${KICKER_Y - 9}" width="${RULE_W}" height="4" fill="${C.deep}"/>`).join("");
const signal = () => {
  // x42: the THRESHOLD label clears the frame, and the dashed threshold ends where the next dash would
  // start, so it runs on into the kicker rule (a join, not a cut). Fresh-eyes FIX, 28 Sep.
  const x = SIG.x, y = KICKER_Y - 9 + 2 - SIG.threshY0 * SIG.scale;   // threshold centred on the 4px kicker rule
  return `<image href="data:image/svg+xml;base64,${fs.readFileSync(T.mark("signal_line", "on_light")).toString("base64")}" x="${x}" y="${y}" width="${SIG.w}" height="${SIG.h}"/>`;
};
const ringImg = () => `<image href="data:image/svg+xml;base64,${fs.readFileSync(T.ringMark("light", MARK)).toString("base64")}" x="${MARK_X}" y="${MARK_Y}" width="${MARK}" height="${MARK}"/>`;
// Canonical footer, UNCHANGED, is already centred on w/2: translate it onto the axis.
const footer = (ax) => `<g transform="translate(${ax - W / 2},0)">${L.footer(W, H, { surface: SURFACE })}</g>`;

async function pixels(file, box, pred) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const out = [];
  for (let y = box[1]; y < box[3]; y++) for (let x = box[0]; x < box[2]; x++) {
    const i = (y * info.width + x) * info.channels;
    if (pred(data[i], data[i + 1], data[i + 2])) out.push([x, y]);
  }
  return out;
}
const isNavy = (r, g, b) => r < 90 && g < 90 && b < 90;
const isDeep = (r, g, b) => g - r > 40 && r < 120;
const isText = (r, g, b) => isNavy(r, g, b) || isDeep(r, g, b);
const inside = (p, c, pad) => Math.hypot(p[0] - c.cx, p[1] - c.cy) < c.r + pad;
const ext = (ps) => ps.reduce((a, [x, y]) => ({ minX: Math.min(a.minX, x), maxX: Math.max(a.maxX, x), minY: Math.min(a.minY, y), maxY: Math.max(a.maxY, y) }), { minX: W, maxX: -1, minY: H, maxY: -1 });
const TEXT_BOX = [0, 0, MARK_X - 8, H]; // everything left of the ring mark is text

async function renderAt(ax, file, withGraphic) {
  const probe = path.join(OUT, `.probe_${CLAIM_ID}.png`);
  await L.render(wrap(L.background(W, H, {}) + L.label(ax, KICKER_Y, KICKER, { size: KICKER_SIZE, fill: C.deep, ls: KICKER_LS, anchor: "middle" })), probe);
  const kp = ext(await pixels(probe, [0, KICKER_Y - KICKER_CAP - 6, W, KICKER_Y + 6], isDeep));
  fs.unlinkSync(probe);
  const labelW = kp.maxX - kp.minX + 1, labelMid = (kp.maxX + kp.minX) / 2; // rules sit on the INK, not the advance
  const svg = wrap(L.background(W, H, {}) + (withGraphic && GRAPHIC === "signal" ? signal() : "") + kicker(ax, labelMid, labelW) + title(ax) + ringImg() + footer(ax));
  await L.render(svg, file);
  return { ax, labelW };
}

(async () => {
  await T.assertFontsProbe(sharp);
  const file = path.join(OUT, `linkedin_personal_banner_v3_${CLAIM_ID}_1584x396.png`);

  let AX;
  if (AXIS_MODE === "centre") AX = W / 2;
  else if (AXIS_MODE === "phone") {
    // Render once far right, then slide the whole block left, pixel by pixel, until any text pixel
    // would enter a photo circle (+16px). Everything is centred on one axis, so it all moves together.
    const REF = 1000;
    await renderAt(REF, file, false);
    const ps = await pixels(file, TEXT_BOX, isText);
    AX = null;
    for (let ax = W / 2; ax <= REF; ax++) {
      const dx = ax - REF;
      if (ps.every(([x, y]) => [TOKEN_AV, DESK, MOB].every((c) => !inside([x + dx, y], c, 16))) && ext(ps).maxX + dx <= RIGHT_LIMIT) { AX = ax; break; }
    }
    if (AX == null) throw new Error("no axis clears every photo");
  } else AX = Number(AXIS_MODE);

  // Gates run on a TEXT-ONLY render at the final axis (the teal trace would read as text ink);
  // the file that ships is then rendered with the graphic at the identical positions.
  const textOnly = path.join(OUT, `.textonly_${CLAIM_ID}.png`);
  await renderAt(AX, textOnly, false);
  const ps = await pixels(textOnly, TEXT_BOX, isText);
  fs.unlinkSync(textOnly);
  await renderAt(AX, file, true);
  const e = ext(ps);
  const hits = (c, pad) => ps.filter((p) => inside(p, c, pad)).length;
  const report = { token: hits(TOKEN_AV, 12), desktop: hits(DESK, 12), phoneBrowser: hits(MOB, 12) };
  const gates = [
    ["text right edge clear of the ring and inside the safe area", e.maxX <= RIGHT_LIMIT],
    ["text left edge inside the safe area", e.minX >= SAFE_X0],
    ["no text pixel behind the token photo", report.token === 0],
    ["no text pixel behind the desktop photo", report.desktop === 0],
    ["ring displays >= crossover everywhere", MARK / COVER_SCALE_MOB >= CROSSOVER],
  ];
  if (AXIS_MODE === "phone") gates.push(["no text pixel behind the phone-browser photo", report.phoneBrowser === 0]);
  const failed = gates.filter((g) => !g[1]);
  if (failed.length) throw new Error("gates failed: " + failed.map((g) => g[0]).join("; "));
  // Where the phone-browser photo covers text, say how much and in which rows.
  const mob = ps.filter((p) => inside(p, MOB, 0));
  const mobExt = mob.length ? ext(mob) : null;
  console.log(`${CLAIM_ID} ${AXIS_MODE}: axis ${AX}, text x ${e.minX}..${e.maxX}, ${gates.length} gates pass; phone-browser photo covers ${mob.length} text px` + (mobExt ? ` (x ${mobExt.minX}..${mobExt.maxX}, y ${mobExt.minY}..${mobExt.maxY})` : ""));
  fs.writeFileSync(path.join(OUT, `linkedin_personal_banner_v3_${CLAIM_ID}.json`), JSON.stringify({
    claim: claim.id, text: claim.text, lines, kicker: KICKER, graphic: GRAPHIC, signal: { x: SIG.x, scale: SIG.scale, w: SIG.w, h: SIG.h }, lockup: T.lockupFor(SURFACE), axisMode: AXIS_MODE, axis: AX,
    textInk: e, phoneBrowserCoveredPx: mob.length, phoneBrowserCoveredBox: mobExt,
    kickerY: KICKER_Y, titleY: TITLE_Y, titleBottom: TITLE_BOTTOM, mark: { size: MARK, x: MARK_X, y: MARK_Y },
    avatars: { token: TOKEN_AV, desktop: DESK, phoneBrowser: MOB },
  }, null, 2));
})().catch((err) => { console.error(err.message); process.exit(1); });
