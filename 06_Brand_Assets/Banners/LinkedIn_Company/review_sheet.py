# Review sheet for the LinkedIn Company Page banner: the banner as LinkedIn draws it in four measured
# layouts (7 Oct 2026; the phone app from a screenshot of the live page), with the logo stood in by
# the repo ring mark on white.
# Usage: python3 review_sheet.py <marks_dir>
import sys, io
from PIL import Image, ImageDraw, ImageFont
import cairosvg
b = Image.open('linkedin_company_banner_1128x191.png').convert('RGB')
svg = open(sys.argv[1] + '/mo_ring_mark_on_light.svg', 'rb').read()
def logo(px):
    im = Image.new('RGB', (px, px), 'white')
    m = Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg, output_width=int(px * 0.8), output_height=int(px * 0.8)))).convert('RGBA')
    im.paste(m, (int(px * 0.1), int(px * 0.1)), m)
    ImageDraw.Draw(im).rectangle([0, 0, px - 1, px - 1], outline=(220, 224, 226), width=max(1, px // 64))
    return im
S = 2
f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 22)
fs = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 16)
def panel(cw, ch, scale, offx, lxy, lpx, label):
    cwS, chS = round(cw * S), round(ch * S)
    card = Image.new('RGB', (cwS, round((ch + lpx * 0.6 + 30) * S)), 'white')
    sc = b.resize((round(1128 * scale * S), round(191 * scale * S)), Image.LANCZOS)
    oy = max(0, round((sc.height - chS) / 2))
    crop = sc.crop((round(offx * S), oy, round(offx * S) + cwS, min(sc.height, oy + chS)))
    card.paste(crop, (0, 0))
    d = ImageDraw.Draw(card)
    for x in range(0, cwS, 12): d.line([(x, crop.height), (x + 5, crop.height)], fill=(200, 205, 208))
    card.paste(logo(round(lpx * S)), (round(lxy[0] * S), round(lxy[1] * S)))
    p = Image.new('RGB', (card.width + 40, card.height + 70), (243, 242, 239)); p.paste(card, (20, 50))
    ImageDraw.Draw(p).text((20, 14), label, fill=(40, 40, 40), font=f); return p
ps = [panel(804, 134, 0.7128, 0, (24, 70), 128, 'Desktop, 1440 wide (cover 804x134)'),
      panel(576, 134, 0.7016, 107.7, (24, 70), 128, 'Medium, 647 wide (cover 576x134, sides cropped)'),
      panel(374.2, 64.1, 0.3317, 0, (16, 33), 96, 'Mobile web, 375 wide (cover 374x64)'),
      panel(412, 69.8, 412 / 1128, 0, (71 * 412 / 1128, 122 * 412 / 1128), 237 * 412 / 1128, 'Phone app, 412dp wide (whole width; logo x71 to 308 from y122)')]
foot = Image.new('RGB', (ps[0].width, 40), (243, 242, 239))
ImageDraw.Draw(foot).text((20, 8), 'Simulation from geometry measured on the live page, 7 Oct 2026. Dashed line = bottom of the cover. Logo stood in by the repo ring mark.', fill=(90, 90, 90), font=fs)
ps.append(foot)
sheet = Image.new('RGB', (max(p.width for p in ps), sum(p.height for p in ps)), (243, 242, 239)); y = 0
for p in ps: sheet.paste(p, (0, y)); y += p.height
sheet.save('review_on_company_page.png'); print(sheet.size)
