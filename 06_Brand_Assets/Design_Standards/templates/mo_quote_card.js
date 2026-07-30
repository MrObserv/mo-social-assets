#!/usr/bin/env node
/* Mastering Observability - quote card generator
 * Branded quote cards for Instagram, LinkedIn (single + carousel), Pinterest.
 * Brand source of truth: 06_Brand_Assets (mo_visual_kit.js palette/fonts), Voice Codex §8.2.
 *
 * Layout: brand + counter chrome are fixed top; footer is fixed bottom; the
 * eyebrow + quote + accent-bar are stacked as ONE group and the group is
 * vertically centred in the band between them, so spacing is even at every
 * text length and nothing can collide with the footer. The quote auto-sizes to
 * fit both width and the band height.
 *
 * USAGE
 *   Single card (last wrapped line goes mint):
 *     node mo_quote_card.js --line "You cannot debug a system through a panicking room." \
 *        --eyebrow "4.30AM THOUGHTS" --format portrait --out card.png
 *   Formats: square (1080x1080) | portrait (1080x1350) | pinterest (1000x1500) | all
 *   Carousel (pipe-separated cards; last card mint; adds "n / N" counter):
 *     node mo_quote_card.js --carousel "Setup line|The turn line|The closing punch" \
 *        --eyebrow "4.30AM THOUGHTS" --slug panicking_room --outdir ./out [--pdf]
 *   --pdf assembles the carousel into a swipeable LinkedIn document post (needs pdfkit).
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const C = { navy:"#0a0e17", navy2:"#0c1929", navy3:"#0e1f35", teal:"#0d7377", mid:"#14a3a8", mint:"#2dd4bf", bright:"#64ffda", ink:"#ffffff", grey:"#9fb0bd" };
const FONT = { display:"'Archivo Black','Arial Black','Liberation Sans',sans-serif", mono:"'Space Mono','DejaVu Sans Mono','Noto Sans Mono',monospace" };
const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function bgDefs(w,h,glowCx){return `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${C.navy}"/><stop offset="0.6" stop-color="${C.navy2}"/><stop offset="1" stop-color="${C.navy3}"/></linearGradient>
  <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.bright}" stop-opacity="0.06"/><stop offset="0.7" stop-color="${C.bright}" stop-opacity="0"/></radialGradient>
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0 L0 0 0 60" fill="none" stroke="${C.bright}" stroke-opacity="0.022" stroke-width="1"/></pattern></defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/><rect width="${w}" height="${h}" fill="url(#grid)"/>
  <ellipse cx="${glowCx}" cy="${h*0.46}" rx="${h*0.5}" ry="${h*0.5}" fill="url(#glow)"/>`;}
function monoLabel(x,y,text,size,fill,anchor="middle",ls=6){return `<text x="${x}" y="${y}" font-family=${JSON.stringify(FONT.mono.replace(/"/g,"'"))} font-size="${size}" fill="${fill}" letter-spacing="${ls}" text-anchor="${anchor}" font-weight="700">${esc(text)}</text>`;}
function dline(x,y,text,size,fill){return `<text x="${x}" y="${y}" font-family=${JSON.stringify(FONT.display.replace(/"/g,"'"))} font-size="${size}" font-weight="800" fill="${fill}" text-anchor="middle">${esc(text)}</text>`;}
function wrap(text,maxChars){const words=String(text).trim().split(/\s+/);const lines=[];let cur="";for(const w of words){if((cur+" "+w).trim().length>maxChars&&cur){lines.push(cur);cur=w;}else cur=(cur+" "+w).trim();}if(cur)lines.push(cur);return lines;}
function fitQuote(quote,usableW,availableH,maxFont){let best=null;for(let maxChars=8;maxChars<=26;maxChars++){const lines=wrap(quote,maxChars);const longest=Math.max(...lines.map(l=>l.length));const fontW=usableW/(longest*0.60);const fontH=availableH/(lines.length*1.18);const font=Math.floor(Math.min(maxFont,fontW,fontH));const score=font-(lines.length<2||lines.length>6?18:0);if(!best||score>best.score)best={lines,font,score};}return best;}
const SIZES={square:[1080,1080],portrait:[1080,1350],pinterest:[1000,1500]};
function buildCard({W,H,eyebrow,quote,mintAll,counter}){
  const M=Math.round(W*0.085); const usableW=W-2*M; const maxFont=Math.round(W/9.5);
  const brandSize=Math.round(W/36), counterSize=Math.round(W/54), eyebrowSize=Math.round(W/45), footSize=Math.round(W/45), barH=6;
  const brandY=Math.round(H*0.085);
  const counterY=brandY+Math.round(brandSize*1.7);
  const footerY=H-Math.round(H*0.07);
  const bandTop=H*0.20, bandBot=H*0.855, bandH=bandBot-bandTop;
  const eyeBlock = eyebrow?eyebrowSize*1.1:0;
  const gapAfterEye = eyebrow?H*0.055:0;
  const gapBeforeBar = H*0.05;
  const availQuoteH = bandH - eyeBlock - gapAfterEye - gapBeforeBar - barH;
  const fit=fitQuote(quote,usableW,availQuoteH,maxFont);
  const lead=fit.font*1.18; const quoteH=fit.lines.length*lead;
  const groupH = eyeBlock + gapAfterEye + quoteH + gapBeforeBar + barH;
  const groupTop = bandTop + (bandH-groupH)/2;
  let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  svg+=bgDefs(W,H,W/2);
  svg+=monoLabel(W/2,brandY,"METRICS & MAYHEM",brandSize,C.bright,"middle",10);
  if(counter)svg+=monoLabel(W/2,counterY,counter,counterSize,C.grey,"middle",6);
  let y=groupTop;
  if(eyebrow){ svg+=monoLabel(W/2,y+eyebrowSize,eyebrow,eyebrowSize,C.mint,"middle",8); y+=eyeBlock+gapAfterEye; }
  fit.lines.forEach((ln,i)=>{const isLast=i===fit.lines.length-1;const fill=mintAll?C.mint:(isLast?C.mint:C.ink);svg+=dline(W/2,y+fit.font+i*lead,ln,fit.font,fill);});
  y+=quoteH;
  svg+=`<rect x="${W/2-40}" y="${Math.round(y+gapBeforeBar)}" width="80" height="${barH}" fill="${C.mint}"/>`;
  svg+=monoLabel(W/2,footerY,"MASTERINGOBSERVABILITY.COM",footSize,C.grey,"middle",6);
  svg+=`</svg>`;return svg;
}
async function renderPng(svg,out){await sharp(Buffer.from(svg),{density:96}).png({quality:95}).toFile(out);console.log("written:",out);}
function parseArgs(argv){const o={};for(let i=0;i<argv.length;i++){if(argv[i].startsWith("--")){const k=argv[i].slice(2);const v=(argv[i+1]&&!argv[i+1].startsWith("--"))?argv[++i]:true;o[k]=v;}}return o;}
(async()=>{
  const o=parseArgs(process.argv.slice(2));const eyebrow=o.eyebrow||"";const outdir=o.outdir||".";if(!fs.existsSync(outdir))fs.mkdirSync(outdir,{recursive:true});
  if(o.carousel){
    const cards=String(o.carousel).split("|").map(s=>s.trim()).filter(Boolean);const slug=o.slug||"carousel";const [W,H]=SIZES.portrait;const files=[];
    for(let i=0;i<cards.length;i++){const svg=buildCard({W,H,eyebrow:i===0?eyebrow:"",quote:cards[i],mintAll:i===cards.length-1,counter:`${i+1} / ${cards.length}`});const out=path.join(outdir,`carousel_${slug}_${i+1}.png`);await renderPng(svg,out);files.push(out);}
    if(o.pdf){const PDFDocument=require("pdfkit");const doc=new PDFDocument({size:[W,H],margin:0});const pdfOut=path.join(outdir,`carousel_${slug}.pdf`);doc.pipe(fs.createWriteStream(pdfOut));files.forEach((f,i)=>{if(i)doc.addPage({size:[W,H],margin:0});doc.image(f,0,0,{width:W,height:H});});doc.end();console.log("written:",pdfOut,"(LinkedIn document-post carousel)");}
    return;
  }
  const line=o.line||"Untitled.";const slug=o.slug||"card";const fmts=o.format==="all"||!o.format?["square","portrait","pinterest"]:[o.format];
  for(const fmt of fmts){const [W,H]=SIZES[fmt];const svg=buildCard({W,H,eyebrow,quote:line,mintAll:false});const out=o.out&&fmts.length===1?o.out:path.join(outdir,`card_${slug}_${fmt}.png`);await renderPng(svg,out);}
})().catch(e=>{console.error(e);process.exit(1);});
