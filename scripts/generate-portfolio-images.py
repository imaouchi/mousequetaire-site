"""
Génère les visuels du portfolio (couvertures 3:4 façon Instagram, slides de
galerie 4:3 et images Open Graph) à partir des captures brutes rangées dans
public/images/projets/.

    pip install pillow
    python scripts/generate-portfolio-images.py

Les fichiers produits sont écrits dans public/images/portfolio/<slug>/ :
    cover.webp  1080x1440  vignette de la grille
    01.webp...  1600x1200  slides du carrousel
    og.jpg      1200x630   partage réseaux sociaux
"""

import os
import random

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "images", "projets")
OUT = os.path.join(ROOT, "public", "images", "portfolio")

BASE = (6, 7, 13)

# crop = (gauche, haut, droite, bas) en fractions de l'image source
PROJECTS = [
    {
        "slug": "murder-party",
        "colors": ((212, 167, 58), (153, 27, 27)),
        "shots": [
            ("app-murder party/menueprincipal.png", None),
            ("app-murder party/classement.png", None),
            ("app-murder party/chat.png", None),
            ("app-murder party/connexion.png", None),
        ],
    },
    {
        "slug": "rackoon-streaming",
        "colors": ((217, 70, 239), (37, 99, 235)),
        "icon": "application-rackoon-streaming/icon.png",
    },
    {
        "slug": "cci-reservation-bureaux",
        "colors": ((109, 93, 252), (59, 130, 246)),
        "shots": [
            ("Application-teams/accueillereservbureau.png", None),
            ("Application-teams/reservationsalle.png", None),
            ("Application-teams/menuereservation.png", None),
        ],
    },
    {
        "slug": "lingua-gem",
        "colors": ((79, 70, 229), (6, 182, 212)),
        "shots": [
            ("apprentisage-langueia/langue.png", (0, 0, 0.62, 1)),
            ("apprentisage-langueia/quizecrit.png", (0.15, 0.05, 0.85, 0.95)),
            ("apprentisage-langueia/quizzselection.png", (0.15, 0.05, 0.85, 0.95)),
        ],
    },
    {
        "slug": "conges-chartrettes",
        "colors": ((37, 99, 235), (22, 163, 74)),
        "shots": [
            ("conge-chartrettes/accueil-reservationmairie.png", None),
            ("conge-chartrettes/imagemesreservation.png", None),
            ("conge-chartrettes/image-mon-compte.png", None),
        ],
    },
    {
        "slug": "pokemon-battle-detector",
        "colors": ((6, 182, 212), (168, 85, 247)),
        "icon": "IA-pokemon/icon.png",
    },
    {
        "slug": "ia-detection-objets",
        "colors": ((34, 211, 238), (139, 92, 246)),
        "shots": [
            ("IA-recconaissance-objet/reconaissance-telephone.png", (0.397, 0.39, 0.727, 0.86)),
            ("IA-recconaissance-objet/reconaissance-fourchettte.png", (0.399, 0.425, 0.736, 0.88)),
            ("IA-recconaissance-objet/reconnaisance-gateau.png", (0.398, 0.424, 0.732, 0.875)),
        ],
    },
    {
        "slug": "ia-langue-des-signes",
        "colors": ((59, 130, 246), (236, 72, 153)),
        "shots": [
            ("IA-reconnaissancelanguedessignes/montrelettre.png", (0.004, 0.0, 0.426, 0.612)),
            ("IA-reconnaissancelanguedessignes/ecritlettre.png", (0.519, 0.004, 0.94, 0.618)),
        ],
    },
    {
        "slug": "mousequetaire-shop",
        "colors": ((56, 189, 248), (30, 58, 138)),
        "shots": [
            ("MousequetaireShop/icon.png", None),
            ("MousequetaireShop/magasin.png", None),
            ("MousequetaireShop/adminboard.png", None),
        ],
    },
    {
        "slug": "pizzeria-dolce-vita",
        "colors": ((220, 38, 38), (245, 158, 11)),
        "shots": [
            ("pizzeria/accueil pizzeria.png", None),
            ("pizzeria/menue-pizza.png", None),
            ("pizzeria/infopizza.png", None),
        ],
    },
    {
        "slug": "reservation-salles-chartrettes",
        "colors": ((37, 99, 235), (96, 165, 250)),
        "shots": [
            ("reservation-chartrettes/connexion.jpg", None),
            ("reservation-chartrettes/ecrancalendrier.png", None),
            ("reservation-chartrettes/selectionbatiment.png", None),
            ("reservation-chartrettes/selectionsalle.png", None),
            ("reservation-chartrettes/guide.jpg", None),
        ],
    },
    {
        "slug": "yodea",
        "colors": ((249, 115, 22), (14, 165, 233)),
        "shots": [
            ("sitevitrine-yodea/ecran-accueil.png", (0, 0, 1, 0.928)),
            ("sitevitrine-yodea/livre2.png", (0, 0, 1, 0.928)),
            ("sitevitrine-yodea/livre1.png", (0, 0, 1, 0.928)),
            ("sitevitrine-yodea/livre3.png", (0, 0, 1, 0.928)),
        ],
    },
    {
        "slug": "vektroid",
        "colors": ((255, 60, 172), (120, 75, 160)),
        "shots": [
            ("vektroid/icon.png", None),
            ("vektroid/lecteurvektroid.png", None),
            ("vektroid/creationdesign.png", None),
        ],
    },
    {
        "slug": "liying-xie",
        "colors": ((192, 57, 43), (196, 165, 122)),
        "shots": [
            ("liying-xie/accueil.jpg", None),
            ("liying-xie/oeuvres.jpg", None),
            ("liying-xie/expositions.jpg", None),
            ("liying-xie/dessins.jpg", None),
            ("liying-xie/frise-expositions.jpg", None),
        ],
    },
    {
        "slug": "fleurs-de-lysandre",
        "colors": ((34, 110, 60), (212, 175, 55)),
        "shots": [
            ("fleurs-lysandre/accueil.jpg", None),
            ("fleurs-lysandre/art-floral.jpg", None),
            ("fleurs-lysandre/lieux.jpg", None),
            ("fleurs-lysandre/galerie-evenementiel.jpg", None),
            ("fleurs-lysandre/deuil.jpg", None),
        ],
    },
    {
        "slug": "ariane-thomas-psychomotricienne",
        "colors": ((37, 99, 235), (34, 197, 94)),
        "shots": [
            ("ariane-psychomotricienne/accueil.jpg", None),
            ("ariane-psychomotricienne/parcours.jpg", None),
            ("ariane-psychomotricienne/pehp.jpg", None),
            ("ariane-psychomotricienne/experience.jpg", None),
            ("ariane-psychomotricienne/contact.jpg", None),
        ],
    },
    {
        "slug": "site-mousequetaire",
        "colors": ((0, 106, 158), (56, 189, 248)),
        "shots": [
            ("site-mousequetaire/home.png", None),
            ("site-mousequetaire/services.png", None),
            ("site-mousequetaire/tarifs.png", None),
            ("site-mousequetaire/apropos.png", None),
        ],
    },
]


# ---------------------------------------------------------------- helpers


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius, fill=255)
    return mask


def trim_borders(im, tol=12):
    """Retire les bandes unies (noires ou blanches) autour d'une capture."""
    rgb = im.convert("RGB")
    for last in (False, True):
        corner = (rgb.width - 1, rgb.height - 1) if last else (0, 0)
        bg = Image.new("RGB", rgb.size, rgb.getpixel(corner))
        diff = ImageChops.difference(rgb, bg).convert("L").point(lambda p: 255 if p > tol else 0)
        box = diff.getbbox()
        if box and (box[2] - box[0]) * (box[3] - box[1]) > 0.5 * rgb.width * rgb.height:
            rgb = rgb.crop(box)
    return rgb


def load_shot(path, crop):
    im = Image.open(os.path.join(SRC, path)).convert("RGB")
    if crop:
        w, h = im.size
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    return trim_borders(im)


def extract_icon(path):
    """Isole l'icône d'app arrondie posée sur un fond clair."""
    im = Image.open(os.path.join(SRC, path)).convert("RGB")
    small = im.resize((im.width // 8, im.height // 8))
    gray = small.convert("L")
    w, h = small.size
    px = gray.load()
    cols = [sum(1 for y in range(h) if px[x, y] < 225) for x in range(w)]
    rows = [sum(1 for x in range(w) if px[x, y] < 225) for y in range(h)]
    cmax, rmax = max(cols), max(rows)
    xs = [i for i, v in enumerate(cols) if v > cmax * 0.35]
    ys = [i for i, v in enumerate(rows) if v > rmax * 0.35]
    box = (xs[0] * 8, ys[0] * 8, (xs[-1] + 1) * 8, (ys[-1] + 1) * 8)
    icon = im.crop(box)
    side = min(icon.size)
    icon = icon.crop(((icon.width - side) // 2, (icon.height - side) // 2,
                      (icon.width + side) // 2, (icon.height + side) // 2))
    inset = int(side * 0.015)
    icon = icon.crop((inset, inset, side - inset, side - inset))
    return icon


def background(size, colors, seed=0):
    w, h = size
    rnd = random.Random(seed)
    c1, c2 = colors
    canvas = Image.new("RGB", size, BASE)
    glow = Image.new("RGB", size, BASE)
    d = ImageDraw.Draw(glow)
    blobs = [
        (0.12, 0.08, 0.62, c1),
        (0.95, 0.55, 0.55, c2),
        (0.25, 1.02, 0.5, c1),
    ]
    for fx, fy, fr, c in blobs:
        cx, cy = fx * w + rnd.uniform(-0.05, 0.05) * w, fy * h
        r = fr * max(w, h) * 0.55
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=c)
    glow = glow.filter(ImageFilter.GaussianBlur(max(w, h) * 0.14))
    canvas = Image.blend(canvas, glow, 0.55)

    # grille technique discrète
    grid = Image.new("RGBA", size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    step = max(w, h) // 18
    for x in range(0, w, step):
        gd.line((x, 0, x, h), fill=(255, 255, 255, 9))
    for y in range(0, h, step):
        gd.line((0, y, w, y), fill=(255, 255, 255, 9))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), grid)

    # grain
    noise = Image.effect_noise(size, 40).convert("RGB")
    canvas = Image.blend(canvas.convert("RGB"), noise, 0.035)
    return canvas.convert("RGBA")


def window(shot, width):
    """Capture posée dans une fenêtre de navigateur sombre et arrondie."""
    bar = max(22, int(width * 0.038))
    body_h = int(shot.height * width / shot.width)
    win = Image.new("RGBA", (width, bar + body_h), (21, 22, 31, 255))
    win.paste(shot.resize((width, body_h), Image.LANCZOS), (0, bar))
    d = ImageDraw.Draw(win)
    r = bar * 0.17
    for i, c in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
        cx, cy = bar * 0.62 + i * bar * 0.55, bar / 2
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=c)
    pill_w = width * 0.34
    d.rounded_rectangle(
        (width / 2 - pill_w / 2, bar * 0.24, width / 2 + pill_w / 2, bar * 0.76),
        bar * 0.26, fill=(255, 255, 255, 16),
    )
    radius = max(10, int(width * 0.022))
    mask = rounded_mask(win.size, radius)
    out = Image.new("RGBA", win.size, (0, 0, 0, 0))
    out.paste(win, (0, 0), mask)
    border = Image.new("RGBA", win.size, (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle(
        (0, 0, win.width - 1, win.height - 1), radius, outline=(255, 255, 255, 38), width=2
    )
    return Image.alpha_composite(out, border)


def fit_window(shot, box_w, box_h):
    bar_ratio = 0.038
    width = box_w
    height = shot.height * width / shot.width + width * bar_ratio
    if height > box_h:
        width = int(box_w * box_h / height)
    return window(shot, int(width))


def drop(canvas, layer, pos, shadow=0.55):
    x, y = pos
    pad = int(max(layer.size) * 0.12)
    sh = Image.new("RGBA", (layer.width + pad * 2, layer.height + pad * 2), (0, 0, 0, 0))
    alpha = layer.split()[3].point(lambda a: int(a * shadow))
    sh.paste((0, 0, 0, 255), (pad, pad), alpha)
    sh = sh.filter(ImageFilter.GaussianBlur(pad * 0.35))
    canvas.alpha_composite(sh, (x - pad, y - pad + int(pad * 0.3)))
    canvas.alpha_composite(layer, (x, y))


def app_icon(icon, size, colors):
    icon = icon.resize((size, size), Image.LANCZOS).convert("RGBA")
    mask = rounded_mask(icon.size, int(size * 0.225))
    out = Image.new("RGBA", icon.size, (0, 0, 0, 0))
    out.paste(icon, (0, 0), mask)
    ring = Image.new("RGBA", icon.size, (0, 0, 0, 0))
    ImageDraw.Draw(ring).rounded_rectangle(
        (0, 0, size - 1, size - 1), int(size * 0.225), outline=(255, 255, 255, 50), width=3
    )
    return Image.alpha_composite(out, ring)


def glow_behind(canvas, center, size, color):
    g = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    r = size * 0.62
    ImageDraw.Draw(g).ellipse(
        (center[0] - r, center[1] - r, center[0] + r, center[1] + r), fill=color + (150,)
    )
    canvas.alpha_composite(g.filter(ImageFilter.GaussianBlur(size * 0.28)))


def bottom_fade(canvas, strength=210, portion=0.3):
    w, h = canvas.size
    fade = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(fade)
    start = int(h * (1 - portion))
    for y in range(start, h):
        a = int(strength * ((y - start) / (h - start)) ** 1.6)
        d.line((0, y, w, y), fill=BASE + (a,))
    canvas.alpha_composite(fade)


# ---------------------------------------------------------------- compositions


def compose_cover(p, shots, icon, seed):
    W, H = 1080, 1440
    c = background((W, H), p["colors"], seed)
    if icon is not None:
        size = 600
        center = (W // 2, int(H * 0.44))
        glow_behind(c, center, size, p["colors"][0])
        drop(c, app_icon(icon, size, p["colors"]), (center[0] - size // 2, center[1] - size // 2), 0.7)
    else:
        a = fit_window(shots[0], 960, 700)
        b = fit_window(shots[1] if len(shots) > 1 else shots[0], 880, 640)
        overlap = 120
        top = max(90, (H - (a.height + b.height - overlap)) // 2 - 40)
        drop(c, a, (W - a.width + 90 if a.width > 820 else W - a.width - 60, top))
        drop(c, b, (-90 if b.width > 820 else 60, top + a.height - overlap), 0.7)
    bottom_fade(c)
    return c.convert("RGB")


def compose_slide(p, shot, icon, seed, size=(1600, 1200), box=(1400, 1000)):
    W, H = size
    c = background(size, p["colors"], seed)
    if icon is not None:
        s = int(min(W, H) * 0.62)
        center = (W // 2, H // 2)
        glow_behind(c, center, s, p["colors"][0])
        drop(c, app_icon(icon, s, p["colors"]), (center[0] - s // 2, center[1] - s // 2), 0.7)
    else:
        win = fit_window(shot, *box)
        drop(c, win, ((W - win.width) // 2, (H - win.height) // 2 + int(H * 0.01)))
    return c.convert("RGB")


def avatar():
    """Photo de profil : la souris du logo sur fond blanc."""
    logo = Image.open(os.path.join(ROOT, "public", "logo.png")).convert("RGBA")
    mark = logo.crop((0, 0, logo.height, logo.height))
    out = Image.new("RGBA", mark.size, (255, 255, 255, 255))
    out.alpha_composite(mark)
    out.convert("RGB").resize((320, 320), Image.LANCZOS).save(
        os.path.join(OUT, "avatar.webp"), quality=90
    )


def main():
    os.makedirs(OUT, exist_ok=True)
    avatar()
    for i, p in enumerate(PROJECTS):
        dest = os.path.join(OUT, p["slug"])
        os.makedirs(dest, exist_ok=True)
        for f in os.listdir(dest):
            os.remove(os.path.join(dest, f))
        icon = extract_icon(p["icon"]) if "icon" in p else None
        shots = [load_shot(s, crop) for s, crop in p.get("shots", [])]

        compose_cover(p, shots, icon, i).save(os.path.join(dest, "cover.webp"), quality=84, method=6)
        slides = shots or [None]
        for n, shot in enumerate(slides, 1):
            compose_slide(p, shot, icon, i * 10 + n).save(
                os.path.join(dest, f"{n:02d}.webp"), quality=86, method=6
            )
        compose_slide(p, slides[0], icon, i, (1200, 630), (1040, 520)).save(
            os.path.join(dest, "og.jpg"), quality=86, optimize=True, progressive=True
        )
        print(f"{p['slug']}: cover + {len(slides)} slides")


if __name__ == "__main__":
    main()
