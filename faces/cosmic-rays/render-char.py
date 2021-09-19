from PIL import Image, ImageFont, ImageDraw
import sys

CHAR = sys.argv[1]
GLYPH_SIZE = 100
FONT_COLOR = (255, 255, 255)
OFFSET = (25, -12)

out = Image.new('RGBA', (GLYPH_SIZE, GLYPH_SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(out)

ttf = ImageFont.truetype('hemi head bd it.ttf', GLYPH_SIZE)
draw.text(OFFSET, CHAR, font=ttf, fill=FONT_COLOR)

out.save(f"resources/font/{CHAR}.png")
