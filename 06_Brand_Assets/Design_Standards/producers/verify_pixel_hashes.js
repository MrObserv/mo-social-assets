#!/usr/bin/env node
// verify_pixel_hashes.js — Content's no-regression acceptance, run on Al's machine.
// Hashes DECODED RGB pixels (not file bytes) of every 4:5 carousel PNG in the
// repo's Carousels/ against a fresh build, and prints the 9:16 hashes for the
// handback. Needs sharp, which the producers already need.
//
//   node verify_pixel_hashes.js <repo>/Carousels <fresh-build-dir>
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto"), sharp = require("sharp");
const [ref, fresh] = process.argv.slice(2);
if (!ref || !fresh) { console.error("usage: node verify_pixel_hashes.js <repo>/Carousels <fresh-build-dir>"); process.exit(1); }
const SLUGS = ["2026-10-12_carousel_just-flaky", "2026-10-12_carousel_confidence-evidence", "2026-10-12_carousel_runbook-if-then"];
const pix = async (f) => { const { data, info } = await sharp(f).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { h: crypto.createHash("sha256").update(data).digest("hex"), w: info.width, ht: info.height, ct: fs.readFileSync(f)[25] }; };
(async () => {
  let bad = 0, n = 0;
  const want = fs.readdirSync(ref).filter((f) => SLUGS.some((s) => f.startsWith(s)) && f.endsWith("_1080x1350.png")).sort();
  console.log("NO REGRESSION, 4:5, decoded-RGB sha256:");
  for (const f of want) {
    n++;
    const nf = path.join(fresh, f);
    if (!fs.existsSync(nf)) { console.log("  MISSING  " + f); bad++; continue; }
    const a = await pix(path.join(ref, f)), b = await pix(nf);
    const same = a.h === b.h;
    if (!same) bad++;
    console.log("  " + (same ? "SAME    " : "CHANGED ") + f + "  " + a.h.slice(0, 16));
  }
  console.log("\nTIKTOK 9:16, for the handback:");
  const tt = fs.readdirSync(fresh).filter((f) => f.endsWith("_1080x1920.png")).sort();
  for (const f of tt) {
    const p = await pix(path.join(fresh, f));
    const ok = p.w === 1080 && p.ht === 1920 && (p.ct === 2 || p.ct === 6);
    if (!ok) bad++;
    console.log("  " + (ok ? "OK  " : "BAD ") + f + "  " + p.w + "x" + p.ht + " type " + p.ct + "  " + p.h);
  }
  console.log("\n" + n + " 4:5 compared, " + tt.length + " 9:16 checked. " + (bad ? bad + " PROBLEM(S)" : "ALL GOOD"));
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e.message); process.exit(1); });
