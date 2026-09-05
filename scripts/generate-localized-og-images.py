from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "og"
LOGO_PATH = ROOT / "src" / "assets" / "winerim-logo.png"

W, H = 1200, 630

COPY = {
    "es": {
        "headline": "Carta inteligente de vinos para restaurantes",
        "subline": "Recomendaciones, margen, stock y decisión con IA",
    },
    "en": {
        "headline": "AI wine list software for restaurants",
        "subline": "Recommendations, margin, stock and smarter decisions",
    },
    "it": {
        "headline": "Software IA per carte dei vini",
        "subline": "Raccomandazioni, margine, stock e decisioni migliori",
    },
    "fr": {
        "headline": "Logiciel IA pour cartes des vins",
        "subline": "Recommandations, marge, stock et meilleures décisions",
    },
    "de": {
        "headline": "KI-Software für Weinkarten",
        "subline": "Empfehlungen, Marge, Bestand und bessere Entscheidungen",
    },
    "pt": {
        "headline": "Software IA para cartas de vinho",
        "subline": "Recomendações, margem, stock e melhores decisões",
    },
}


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Helvetica Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Helvetica.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


def wrap(draw: ImageDraw.ImageDraw, text: str, typeface: ImageFont.FreeTypeFont, width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = word if not current else f"{current} {word}"
        if draw.textbbox((0, 0), trial, font=typeface)[2] <= width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def make(lang: str, payload: dict[str, str]) -> None:
    image = Image.new("RGB", (W, H), "#111412")
    px = image.load()
    for y in range(H):
        for x in range(W):
            wine = int(34 + 72 * (x / W) * (1 - y / H))
            green = int(18 + 18 * (y / H))
            blue = int(18 + 10 * (x / W))
            px[x, y] = (wine, green, blue)

    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, W, H), outline="#31030d", width=28)
    draw.ellipse((840, -120, 1320, 360), fill="#410916")
    draw.ellipse((760, 350, 1100, 690), fill="#191d18")
    draw.rounded_rectangle((730, 160, 1040, 470), radius=28, outline="#d5cbb5", width=3)
    draw.line((790, 235, 980, 235), fill="#d5cbb5", width=5)
    draw.line((790, 300, 950, 300), fill="#9f8f73", width=4)
    draw.line((790, 365, 910, 365), fill="#9f8f73", width=4)
    draw.ellipse((940, 330, 1000, 390), fill="#99001f")

    logo = Image.open(LOGO_PATH).convert("RGBA")
    logo = logo.resize((290, 70), Image.Resampling.LANCZOS)
    image.paste(logo, (88, 76), logo)

    title_font = font(66, True)
    sub_font = font(33)
    micro_font = font(24, True)
    title_lines = wrap(draw, payload["headline"], title_font, 660)
    y = 205
    for line in title_lines:
        draw.text((88, y), line, fill="#fff8ec", font=title_font)
        y += 76
    y += 18
    for line in wrap(draw, payload["subline"], sub_font, 680):
        draw.text((92, y), line, fill="#d6cab3", font=sub_font)
        y += 44

    draw.line((92, 520, 428, 520), fill="#a70f2a", width=7)
    draw.text((92, 545), "winerim.wine", fill="#fff8ec", font=micro_font)
    draw.text((965, 545), lang.upper(), fill="#d6cab3", font=micro_font)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    image.save(OUT_DIR / f"winerim-og-{lang}.png", optimize=True)


def main() -> None:
    for lang, payload in COPY.items():
        make(lang, payload)


if __name__ == "__main__":
    main()
