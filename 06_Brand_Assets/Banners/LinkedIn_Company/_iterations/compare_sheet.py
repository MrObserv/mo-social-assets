# Comparison sheet for the v1.2.0 Company Page banner variants: each drawn as the LinkedIn phone app
# shows it (whole width, logo x71..308 from y122, measured from Al's screenshot of 7 Oct) and as
# desktop web shows it (804x134, logo 128px at 24,70). Logo stood in by the repo ring mark on white.
# Usage, from this folder: python3 _iterations/compare_sheet.py ../../Design_Standards/marks A B C
# B is the live file one level up; A and C sit in _iterations/.
import sys, io
from PIL import Image, ImageDraw, ImageFont
import cairosvg
marks, variants = sys.argv[1], sys.argv[2:]
svg = open(marks + '/mo_ring_mark_on_light.svg', 'rb').read()
def logo(px):
    im = Image.new('RGB', (px, px), 'white')
    m = Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg, output_width=int(px * 0.8), output_height=int(px * 0.8)))).convert('RGBA')
    im.paste(m, (int(px * 0.1), int(px * 0.1)), m)
    ImageDraw.Draw(im).rectangle([0, 0, px - 1, px - 1], outline=(214, 218, 220), width=max(1, px // 80))
    return im
B = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 30)
R = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 22)
H1 = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 44)
labels = {'A': 'A  Pale teal ground, same layout, bigger type (on the design system)',
          'B': 'B  Pale teal ground, the offer line as a bold headline (chosen 7 Oct; a recorded deviation)',
          'C': 'C  Navy ground, same layout, bigger type (breaks "LinkedIn is light")'}
def phone(b):
    w = 824; s = w / 1128
    p = Image.new('RGB', (w, 520), 'white')
    p.paste(b.resize((w, round(191 * s)), Image.LANCZOS), (0, 40))
    p.paste(logo(round(237 * s)), (round(71 * s), 40 + round(122 * s)))
    d = ImageDraw.Draw(p)
    d.text((32, 40 + round(122 * s) + round(237 * s) + 26), 'Mastering Observability', fill=(20, 20, 20), font=H1)
    return p
def desktop(b):
    p = Image.new('RGB', (804, 300), 'white')
    p.paste(b.resize((804, 136), Image.LANCZOS).crop((0, 1, 804, 135)), (0, 0))
    p.paste(logo(128), (24, 70))
    ImageDraw.Draw(p).text((28, 214), 'Mastering Observability', fill=(20, 20, 20), font=B)
    return p
rows = []
for v in variants:
    b = Image.open('linkedin_company_banner_1128x191.png' if v == 'B' else f'_iterations/linkedin_company_banner_option{v}_1128x191.png').convert('RGB')
    ph, de = phone(b), desktop(b)
    row = Image.new('RGB', (40 + ph.width + 40 + de.width + 40, 70 + max(ph.height, de.height) + 30), (243, 242, 239))
    d = ImageDraw.Draw(row)
    d.text((40, 18), labels[v], fill=(30, 30, 30), font=B)
    row.paste(ph, (40, 70)); row.paste(de, (40 + ph.width + 40, 70))
    d.text((40 + 4, 70 + ph.height + 2), 'phone app', fill=(110, 110, 110), font=R)
    d.text((40 + ph.width + 44, 70 + de.height + 2), 'desktop web', fill=(110, 110, 110), font=R)
    rows.append(row)
sheet = Image.new('RGB', (max(r.width for r in rows), sum(r.height for r in rows)), (243, 242, 239)); y = 0
for r in rows: sheet.paste(r, (0, y)); y += r.height
sheet.save('_iterations/compare_options_ABC.png'); print(sheet.size)
