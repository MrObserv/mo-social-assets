/* Mastering Observability — brand slide system + FAB teaser deck
 * One script, two themes (dark master, light variant).
 * Fonts: Arial Black (display), Calibri (body), Consolas (mono labels).
 * Brand fonts Archivo Black / DM Sans / Space Mono map to these for portability.
 */
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const fs = require("fs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const {
  FaEye, FaLayerGroup, FaBrain, FaBullseye, FaUsers, FaShieldAlt, FaCheckCircle,
} = require("react-icons/fa");

const BRAND = "/sessions/dazzling-sharp-thompson/mnt/Projects/Metrics And Mayhem/06_Brand_Assets";

const THEMES = {
  dark: {
    name: "Dark",
    bg: "0A0E17", panel: "0F2B2D", panel2: "0C1929", border: "0F3D3F",
    ink: "E8E8E8", muted: "A8D8EA", faint: "7F94A8",
    teal: "0D7377", mid: "14A3A8", mint: "2DD4BF", bright: "64FFDA",
    amber: "FFD166", amberInk: "0F2B2D", legendG: "FFD166",
    iconCircle: "0F3D3F", icon: "#64ffda", check: "#2dd4bf",
    rings: ["0F3D3F", "0D7377", "14A3A8"],
    logo: `${BRAND}/logo-on-dark.svg`,
    statNum: "64FFDA",
  },
  light: {
    name: "Light",
    bg: "FFFFFF", panel: "F2F7F7", panel2: "F7FAFA", border: "C9DCDC",
    ink: "0F2B2D", muted: "44595B", faint: "6E8486",
    teal: "0D7377", mid: "0D7377", mint: "0A5C5E", bright: "0A5C5E",
    amber: "FFD166", amberInk: "0F2B2D", legendG: "A8761B",
    iconCircle: "DDEEED", icon: "#0d7377", check: "#0d7377",
    rings: ["C5DEDD", "8FC4C2", "4E9E9B"],
    logo: `${BRAND}/logo-on-light.svg`,
    statNum: "0D7377",
  },
};

const F = { display: "Arial Black", body: "Calibri", mono: "Consolas" };
const PW = 10, PH = 5.625, M = 0.42;
const CW = 2.92, CGAP = 0.20; // 3-col grid: 3*2.92 + 2*0.20 = 9.16, ends at 9.58
const COLX = [M, M + CW + CGAP, M + 2 * (CW + CGAP)];
const BUL = () => ({ bullet: { indent: 8 } });

async function iconPng(Icon, color) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Icon, { color, size: "256" }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
async function logoPng(path) {
  const buf = await sharp(fs.readFileSync(path), { density: 300 }).resize(540, 540).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

function chrome(slide, T, label) {
  slide.addShape("line", { x: 9.28, y: 0.36, w: 0.26, h: 0, line: { color: T.mint, width: 1.5 } });
  slide.addShape("line", { x: 9.41, y: 0.23, w: 0, h: 0.26, line: { color: T.mint, width: 1.5 } });
  slide.addText("ALLAN MANN   ·   MASTERINGOBSERVABILITY.COM", {
    x: M, y: 5.30, w: 4.8, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: T.faint, margin: 0, valign: "middle",
  });
  slide.addText(label, {
    x: 5.4, y: 5.30, w: 4.16, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: T.faint, align: "right", margin: 0, valign: "middle",
  });
}

function kicker(slide, T, text, y = 0.34) {
  slide.addText(text, { x: M, y, w: 8.6, h: 0.28, fontFace: F.mono, fontSize: 9, color: T.mid, margin: 0, valign: "top" });
}
function slideTitle(slide, T, text, y = 0.62) {
  slide.addText(text, { x: M, y, w: 9.16, h: 0.46, fontFace: F.display, fontSize: 23, color: T.ink, margin: 0, valign: "top" });
}

async function buildDeck(themeKey, outFile) {
  const T = THEMES[themeKey];
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Allan Mann";
  pres.title = "FAB Observability & AIOps: the plan for the seat";

  const logo = await logoPng(T.logo);
  const ic = {};
  for (const [k, Icon] of Object.entries({ eye: FaEye, layers: FaLayerGroup, brain: FaBrain, target: FaBullseye, users: FaUsers, shield: FaShieldAlt })) {
    ic[k] = await iconPng(Icon, T.icon);
  }
  const check = await iconPng(FaCheckCircle, T.check);

  /* ---------- S1 TITLE ---------- */
  let s = pres.addSlide();
  s.background = { color: T.bg };
  // lens rings motif, anchored far right so nothing crosses the text column
  const rc = { cx: 9.95, cy: 2.1 };
  [[1.75, T.rings[0], 2.5], [1.38, T.rings[1], 2], [1.02, T.rings[2], 1.5]].forEach(([r, col, wd]) => {
    s.addShape("ellipse", { x: rc.cx - r, y: rc.cy - r, w: r * 2, h: r * 2, fill: { type: "none" }, line: { color: col, width: wd } });
  });
  s.addShape("line", { x: rc.cx - 0.16, y: rc.cy + 1.85, w: 0.32, h: 0, line: { color: T.mint, width: 2 } });
  s.addShape("line", { x: rc.cx - 2.05, y: rc.cy, w: 0.32, h: 0, line: { color: T.mint, width: 2 } });
  s.addImage({ data: logo, x: M, y: 0.42, w: 0.85, h: 0.85 });
  s.addText("FIRST ABU DHABI BANK   ·   PRINCIPAL LEAD, OBSERVABILITY & AI OPS", {
    x: M, y: 1.62, w: 7.4, h: 0.3, fontFace: F.mono, fontSize: 10, color: T.mid, margin: 0, valign: "top",
  });
  s.addText("One version of operational truth", {
    x: M, y: 1.98, w: 7.5, h: 0.6, fontFace: F.display, fontSize: 30, color: T.ink, margin: 0, valign: "top",
  });
  s.addText([
    { text: "Year one: ", options: { bold: true, color: T.mint } },
    { text: "a single operational truth and a defended platform decision. ", options: {} },
    { text: "Year two: ", options: { bold: true, color: T.mint } },
    { text: "the bank stops finding out about incidents from customers. ", options: {} },
    { text: "Year three: ", options: { bold: true, color: T.mint } },
    { text: "the converged platform is the regulator's favourite exhibit, not its concern.", options: {} },
  ], { x: M, y: 3.05, w: 6.3, h: 1.15, fontFace: F.body, fontSize: 12.5, color: T.ink, margin: 0, lineSpacingMultiple: 1.15, valign: "top" });
  s.addText("Allan Mann   ·   Author, Metrics & Mayhem (Cleartext Press, 2026)", {
    x: M, y: 4.45, w: 6.4, h: 0.3, fontFace: F.mono, fontSize: 9.5, color: T.muted, margin: 0, valign: "top",
  });
  chrome(s, T, "FOR DISCUSSION · JUNE 2026");

  /* ---------- S2 SIX OUTCOMES ---------- */
  s = pres.addSlide();
  s.background = { color: T.bg };
  kicker(s, T, "THE SPEC, READ AS OUTCOMES");
  slideTitle(s, T, "What success in this seat is");
  const cards = [
    ["eye", "One framework", "A single version of operational truth across infrastructure, apps, cloud and third parties."],
    ["layers", "A rationalised toolset", "A defended platform decision out of the live RFI/RFP. The cost curve bends down."],
    ["brain", "AIOps inside MIM", "Measurable P1/P2 and MTTD/MTTR improvement, governed for the second line and CBUAE."],
    ["target", "SLI/SLOs that hold", "Critical business services measured end to end, jointly owned with engineering."],
    ["users", "A product team", "Observability run as a product, not a project. Built by uplift, not greenfield."],
    ["shield", "Regulator-grade reporting", "Executive and risk-committee reporting that stands up in front of auditors."],
  ];
  const ch = 1.40, rowY = [1.32, 1.32 + ch + 0.20];
  cards.forEach(([icn, h, d], i) => {
    const x = COLX[i % 3], y = rowY[Math.floor(i / 3)];
    s.addShape("rect", { x, y, w: CW, h: ch, fill: { color: T.panel }, line: { color: T.border, width: 0.75 } });
    s.addShape("ellipse", { x: x + 0.14, y: y + 0.13, w: 0.38, h: 0.38, fill: { color: T.iconCircle } });
    s.addImage({ data: ic[icn], x: x + 0.22, y: y + 0.21, w: 0.22, h: 0.22 });
    s.addText(h, { x: x + 0.60, y: y + 0.13, w: CW - 0.72, h: 0.38, fontFace: F.body, fontSize: 11.5, bold: true, color: T.ink, margin: 0, valign: "middle" });
    s.addText(d, { x: x + 0.14, y: y + 0.58, w: CW - 0.28, h: 0.76, fontFace: F.body, fontSize: 9, color: T.muted, margin: 0, lineSpacingMultiple: 1.05, valign: "top" });
  });
  const arc = [
    ["Y1 · SEE", "One estate, one platform decision, first SLI/SLOs"],
    ["Y2 · UNDERSTAND", "AIOps through the explainability gate"],
    ["Y3 · ACT", "Bounded autonomy, converged platform"],
  ];
  arc.forEach(([y1, d], i) => {
    const x = COLX[i];
    s.addShape("rect", { x, y: 4.50, w: CW, h: 0.58, fill: { color: T.panel2 }, line: { color: T.border, width: 0.75 } });
    s.addText(y1, { x: x + 0.12, y: 4.57, w: CW - 0.24, h: 0.2, fontFace: F.mono, fontSize: 8.5, bold: true, color: T.mint, margin: 0, valign: "top" });
    s.addText(d, { x: x + 0.12, y: 4.78, w: CW - 0.24, h: 0.26, fontFace: F.body, fontSize: 8.5, color: T.muted, margin: 0, valign: "top" });
  });
  chrome(s, T, "02");

  /* ---------- S3 TRUST-GATED MATURITY MODEL ---------- */
  s = pres.addSlide();
  s.background = { color: T.bg };
  kicker(s, T, "THE DIFFERENTIATOR");
  slideTitle(s, T, "The Trust-Gated AIOps Maturity Model");
  s.addText([
    { text: "THE GATES   ", options: { bold: true, color: T.faint } },
    { text: "G1 ", options: { bold: true, color: T.legendG } }, { text: "Data quality     ", options: {} },
    { text: "G2 ", options: { bold: true, color: T.legendG } }, { text: "Explainability     ", options: {} },
    { text: "G3 ", options: { bold: true, color: T.legendG } }, { text: "Accountability     ", options: {} },
    { text: "G4 ", options: { bold: true, color: T.legendG } }, { text: "Track record", options: {} },
  ], { x: M, y: 1.12, w: 9.16, h: 0.24, fontFace: F.mono, fontSize: 8.5, color: T.muted, margin: 0, valign: "top" });
  const stages = [
    ["Reactive", "Static thresholds, firefighting"],
    ["Correlated", "Noise down, one telemetry estate"],
    ["Assisted", "AI-suggested RCA, human decides"],
    ["Bounded autonomy", "Pre-approved, reversible actions"],
    ["Supervised at scale", "Earned, not bought. Not yet."],
  ];
  const notes = [null, "Done well, the big wins live here", null, "The year-3 target", null];
  const bw = 1.46, bgap = 0.465, baseY = 4.34, x0 = M;
  const heights = [1.30, 1.66, 2.02, 2.38, 2.74];
  stages.forEach(([nm, d], i) => {
    const x = x0 + i * (bw + bgap), h = heights[i], y = baseY - h;
    const isLast = i === 4;
    s.addShape("rect", { x, y, w: bw, h, fill: { color: T.panel }, line: { color: T.border, width: 0.75, dashType: isLast ? "dash" : "solid" } });
    s.addShape("rect", { x, y, w: bw, h: 0.06, fill: { color: T.mint } });
    s.addText(nm, { x: x + 0.1, y: y + 0.14, w: bw - 0.2, h: 0.58, fontFace: F.body, fontSize: 10.5, bold: true, color: T.ink, margin: 0, valign: "top" });
    s.addText(d, { x: x + 0.1, y: y + 0.74, w: bw - 0.2, h: 0.5, fontFace: F.body, fontSize: 8, color: T.muted, margin: 0, lineSpacingMultiple: 1.0, valign: "top" });
    if (notes[i]) s.addText(notes[i], { x: x - 0.22, y: y - 0.32, w: bw + 0.44, h: 0.26, fontFace: F.mono, fontSize: 7.5, italic: true, color: T.mint, align: "center", margin: 0, valign: "top" });
    if (i < 4) {
      const gx = x + bw + bgap / 2 - 0.19;
      const gy = (baseY - heights[i + 1]) + 0.34;
      s.addShape("ellipse", { x: gx, y: gy, w: 0.38, h: 0.38, fill: { color: T.amber } });
      s.addText("G" + (i + 1), { x: gx, y: gy, w: 0.38, h: 0.38, fontFace: F.display, fontSize: 9, color: T.amberInk, align: "center", valign: "middle", margin: 0 });
    }
  });
  s.addShape("rect", { x: M, y: 4.60, w: 9.16, h: 0.50, fill: { color: T.panel2 }, line: { color: T.border, width: 0.75 } });
  s.addText("The regulator is not the brake on AIOps. It is the design spec. Every gate maps to a control the second line already requires.", {
    x: M + 0.15, y: 4.60, w: 8.86, h: 0.50, fontFace: F.body, fontSize: 10.5, italic: true, color: T.ink, margin: 0, valign: "middle",
  });
  chrome(s, T, "03");

  /* ---------- S4 BLUEPRINT + PLATFORM DECISION ---------- */
  s = pres.addSlide();
  s.background = { color: T.bg };
  kicker(s, T, "ARCHITECTURE AND THE FIRST BIG CALL");
  slideTitle(s, T, "Own the pipes, decide the platform");
  s.addText("The blueprint: three layers", { x: M, y: 1.32, w: 4.5, h: 0.3, fontFace: F.body, fontSize: 12, bold: true, color: T.ink, margin: 0, valign: "top" });
  const layers = [
    ["ENGAGEMENT", "ServiceNow as the workflow spine. Exec and risk reporting from one curated metrics store."],
    ["INTELLIGENCE", "The chosen platform plus the AIOps engine: correlation, anomaly detection, assisted RCA. Governed by the gates."],
    ["TELEMETRY · THE FOUNDATION", "OTel as the ingestion standard. A governed pipeline: routing, retention, residency. The bank's asset, not a vendor's."],
  ];
  layers.forEach(([nm, d], i) => {
    const y = 1.72 + i * 0.99;
    s.addShape("rect", { x: M, y, w: 4.5, h: 0.87, fill: { color: T.panel }, line: { color: T.border, width: 0.75 } });
    s.addShape("rect", { x: M, y, w: 0.07, h: 0.87, fill: { color: T.mint } });
    s.addText(nm, { x: M + 0.18, y: y + 0.09, w: 4.2, h: 0.22, fontFace: F.mono, fontSize: 8.5, bold: true, color: T.mint, margin: 0, valign: "top" });
    s.addText(d, { x: M + 0.18, y: y + 0.33, w: 4.18, h: 0.5, fontFace: F.body, fontSize: 9, color: T.muted, margin: 0, lineSpacingMultiple: 1.0, valign: "top" });
  });
  s.addText("Foundation first: everything above the pipes inherits their quality.", { x: M, y: 4.72, w: 4.5, h: 0.26, fontFace: F.body, fontSize: 8.5, italic: true, color: T.faint, margin: 0, valign: "top" });
  s.addShape("rect", { x: 5.25, y: 1.32, w: 4.33, h: 3.66, fill: { color: T.panel2 }, line: { color: T.border, width: 0.75 } });
  s.addText("The platform decision", { x: 5.45, y: 1.46, w: 3.95, h: 0.3, fontFace: F.body, fontSize: 12, bold: true, color: T.ink, margin: 0, valign: "top" });
  s.addText([
    { text: "Two-platform target state: one observability and AIOps platform plus ServiceNow. Everything else scheduled for decommission.", options: { ...BUL(), breakLine: true } },
    { text: "Criteria ratified before vendor conversations resume. Procurement and the CISO co-own.", options: { ...BUL(), breakLine: true } },
    { text: "Causal RCA and topology-aware correlation weighted over feature checklists.", options: { ...BUL(), breakLine: true } },
    { text: "Sovereignty and deployability scored as hard gates, not negotiables.", options: { ...BUL(), breakLine: true } },
    { text: "Shortlist tested by day 100. Decision inside month six.", options: { ...BUL(), breakLine: true } },
    { text: "Consolidation savings part-fund the programme.", options: BUL() },
  ], { x: 5.50, y: 1.84, w: 3.93, h: 3.05, fontFace: F.body, fontSize: 10, color: T.muted, margin: 0, paraSpaceAfter: 9, valign: "top" });
  chrome(s, T, "04");

  /* ---------- S5 FIRST 100 DAYS ---------- */
  s = pres.addSlide();
  s.background = { color: T.bg };
  kicker(s, T, "EXECUTION, SEQUENCED");
  slideTitle(s, T, "The first 100 days");
  const phases = [
    ["DAYS 0-30", "Listen and map", ["One-to-ones across I&O, Security, EA, the second line", "Inventory the estate: tools, contracts, renewals, team", "Read the March 2026 post-incident material cold"]],
    ["DAYS 31-60", "Baseline and frame", ["Publish baseline metrics and coverage gaps", "Design authority with Security; RFP criteria ratified", "Noise-reduction sprint on top three alert-storm sources"]],
    ["DAYS 61-100", "Commit", ["Strategy paper to Ali and the risk committee", "Shortlist tested; first exec dashboard live", "SLI/SLO pilot started; team structure agreed"]],
  ];
  phases.forEach(([lbl, nm, items], i) => {
    const x = COLX[i];
    s.addShape("rect", { x, y: 1.32, w: CW, h: 2.04, fill: { color: T.panel }, line: { color: T.border, width: 0.75 } });
    s.addShape("rect", { x, y: 1.32, w: CW, h: 0.06, fill: { color: T.mint } });
    s.addText(lbl, { x: x + 0.14, y: 1.46, w: CW - 0.28, h: 0.22, fontFace: F.mono, fontSize: 8.5, bold: true, color: T.mint, margin: 0, valign: "top" });
    s.addText(nm, { x: x + 0.14, y: 1.68, w: CW - 0.28, h: 0.3, fontFace: F.body, fontSize: 12.5, bold: true, color: T.ink, margin: 0, valign: "top" });
    s.addText(items.map((t, j) => ({ text: t, options: { ...BUL(), breakLine: j < items.length - 1 } })),
      { x: x + 0.18, y: 2.02, w: CW - 0.34, h: 1.26, fontFace: F.body, fontSize: 8.5, color: T.muted, margin: 0, paraSpaceAfter: 5, valign: "top" });
  });
  s.addShape("rect", { x: M, y: 3.62, w: 9.16, h: 1.46, fill: { color: T.panel2 }, line: { color: T.border, width: 0.75 } });
  s.addText("Day-100 exit criteria, stated up front", { x: M + 0.16, y: 3.74, w: 8.8, h: 0.26, fontFace: F.body, fontSize: 11.5, bold: true, color: T.ink, margin: 0, valign: "top" });
  const exits = [
    "Estate map and baseline published", "Strategy and budget ratified", "RFP criteria locked, shortlist in evaluation",
    "One visible noise-reduction win", "One SLI/SLO pilot live", "Team org confirmed, first re-badges moving",
  ];
  exits.forEach((t, i) => {
    const x = M + 0.16 + (i % 2) * 4.5, y = 4.10 + Math.floor(i / 2) * 0.34;
    s.addImage({ data: check, x, y: y + 0.04, w: 0.17, h: 0.17 });
    s.addText(t, { x: x + 0.27, y, w: 4.15, h: 0.26, fontFace: F.body, fontSize: 9.5, color: T.muted, margin: 0, valign: "middle" });
  });
  chrome(s, T, "05");

  /* ---------- S6 TEAM, MONEY, PROOF ---------- */
  s = pres.addSlide();
  s.background = { color: T.bg };
  kicker(s, T, "RESOURCED AND EVIDENCED");
  slideTitle(s, T, "The team, the money, the receipts");
  const stats = [
    ["20 FTE", "by month 12. Ramp 12 by day 100, 22 steady state. Built by re-badge and uplift, not greenfield."],
    ["AED 59m → 34m", "year 1 with transition overlap, falling to steady state just below today's assumed fragmented spend."],
    ["Month 6", "platform decision. Criteria by day 100; remembered as fair by the losers and cheap by the CFO."],
  ];
  stats.forEach(([n, d], i) => {
    const x = COLX[i];
    s.addShape("rect", { x, y: 1.32, w: CW, h: 1.42, fill: { color: T.panel }, line: { color: T.border, width: 0.75 } });
    s.addText(n, { x: x + 0.14, y: 1.44, w: CW - 0.28, h: 0.42, fontFace: F.display, fontSize: 20, color: T.statNum, margin: 0, valign: "top" });
    s.addText(d, { x: x + 0.14, y: 1.92, w: CW - 0.28, h: 0.74, fontFace: F.body, fontSize: 8.5, color: T.muted, margin: 0, lineSpacingMultiple: 1.05, valign: "top" });
  });
  s.addShape("rect", { x: M, y: 3.00, w: 9.16, h: 1.60, fill: { color: T.panel2 }, line: { color: T.border, width: 0.75 } });
  s.addText("The receipts (confirmed figures only)", { x: M + 0.14, y: 3.12, w: 8.8, h: 0.26, fontFace: F.body, fontSize: 11.5, bold: true, color: T.ink, margin: 0, valign: "top" });
  const proofs = [
    ["TAMM, ABU DHABI", "45% alert noise down, 50% MTTR down, 99.99% uptime. Team of ~15 built from scratch. UN WSIS Prize 2025."],
    ["STANDARD CHARTERED", "Monitoring modernised across 40+ countries. Around £8m operational savings. Zero MAS and ASIC audit findings."],
    ["LLOYDS BANKING GROUP", "Important Business Services observability under PRA, FCA and Bank of England scrutiny. Payments resilience."],
  ];
  proofs.forEach(([nm, d], i) => {
    const x = COLX[i] + 0.14;
    s.addText(nm, { x, y: 3.48, w: CW - 0.28, h: 0.22, fontFace: F.mono, fontSize: 8, bold: true, color: T.mint, margin: 0, valign: "top" });
    s.addText(d, { x, y: 3.72, w: CW - 0.28, h: 0.82, fontFace: F.body, fontSize: 8.5, color: T.muted, margin: 0, lineSpacingMultiple: 1.05, valign: "top" });
  });
  s.addText("One avoided March-2026-class event carries the case.", {
    x: M, y: 4.76, w: 9.16, h: 0.32, fontFace: F.body, fontSize: 12, italic: true, color: T.ink, margin: 0, valign: "top",
  });
  chrome(s, T, "06");

  await pres.writeFile({ fileName: outFile });
  console.log("written:", outFile);
}

(async () => {
  await buildDeck("dark", "FAB Observability and AIOps - Teaser (Dark).pptx");
  await buildDeck("light", "FAB Observability and AIOps - Teaser (Light).pptx");
})().catch((e) => { console.error(e); process.exit(1); });