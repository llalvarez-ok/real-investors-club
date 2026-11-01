"""Mid-video and end CTAs (Instagram personal account / YouTube channel)."""
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

F = "/usr/share/fonts/opentype/inter/"
def fnt(n, s):
    return ImageFont.truetype(F + {"b": "Inter-Bold.otf", "sb": "Inter-SemiBold.otf",
                                   "r": "Inter-Regular.otf", "m": "Inter-Medium.otf"}[n], s)

AV = Image.open(__file__.rsplit("/", 1)[0] + "/avatar.png").convert("RGBA")
AV_RIC = Image.open(__file__.rsplit("/", 1)[0] + "/avatar_ric.png").convert("RGBA")
IG_BLUE = (0, 149, 246)
YT_RED = (255, 0, 51)
INK = (18, 18, 20)
MUTED = (115, 115, 120)
BTN_GREY = (239, 239, 239)

def avatar(size, ring=None, src=None):
    a = (src or AV).resize((size, size), Image.LANCZOS)
    if src is AV_RIC:
        o = Image.new("RGBA", a.size, (0, 0, 0, 0)); ImageDraw.Draw(o).ellipse((0, 0, size - 1, size - 1), outline=(220, 220, 225, 255), width=2)
        a = a.copy(); a.alpha_composite(o)
    if not ring:
        return a
    pad = 8
    out = Image.new("RGBA", (size + 2 * pad, size + 2 * pad), (0, 0, 0, 0))
    d = ImageDraw.Draw(out)
    d.ellipse((0, 0, size + 2 * pad - 1, size + 2 * pad - 1), fill=ring)
    d.ellipse((4, 4, size + 2 * pad - 5, size + 2 * pad - 5), fill=(255, 255, 255))
    out.alpha_composite(a, (pad, pad))
    return out

def check(d, cx, cy, s, col, w=4):
    d.line((cx - s, cy, cx - s * 0.3, cy + s * 0.7, cx + s, cy - s * 0.7), fill=col, width=w, joint="curve")

def verified(d, cx, cy, r=15):
    pts = []
    for k in range(16):
        ang = k * math.pi / 8
        rr = r if k % 2 == 0 else r * 0.82
        pts.append((cx + rr * math.cos(ang), cy + rr * math.sin(ang)))
    d.polygon(pts, fill=IG_BLUE)
    check(d, cx, cy, r * 0.45, (255, 255, 255), 3)

def bell(d, cx, cy, s, col, fill=False):
    w = 6 if not fill else 0
    box = (cx - s * 0.62, cy - s * 0.75, cx + s * 0.62, cy + s * 0.75)
    if fill:
        d.pieslice((box[0], box[1], box[2], box[3] + s * 0.4), 180, 360, fill=col)
        d.rectangle((box[0], cy - s * 0.55 + s * 0.2, box[2], cy + s * 0.45), fill=col)
    else:
        d.arc((box[0], box[1], box[2], box[3] + s * 0.4), 180, 360, fill=col, width=5)
        d.line((box[0] + 2, cy - 0.05 * s, box[0] + 2, cy + s * 0.45), fill=col, width=5)
        d.line((box[2] - 2, cy - 0.05 * s, box[2] - 2, cy + s * 0.45), fill=col, width=5)
    d.line((cx - s * 0.85, cy + s * 0.48, cx + s * 0.85, cy + s * 0.48), fill=col, width=6)
    d.ellipse((cx - s * 0.18, cy + s * 0.58, cx + s * 0.18, cy + s * 0.9), fill=col)

# ---------------- end-card: Instagram ----------------
CARD_X, CARD_W = 70, 940
IG_Y, IG_H = 640, 560
def ig_card(followed, followers):
    c = Image.new("RGBA", (CARD_W, IG_H), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle((0, 0, CARD_W - 1, IG_H - 1), radius=38, fill=(255, 255, 255))
    d.text((40, 58), "‹", font=fnt("m", 46), fill=INK, anchor="lm")
    d.text((76, 58), "leanalvarez.ok", font=fnt("b", 36), fill=INK, anchor="lm")
    tw = d.textlength("leanalvarez.ok", font=fnt("b", 36))
    verified(d, 76 + tw + 26, 60)
    c.alpha_composite(avatar(190, ring=(214, 41, 118)), (32, 104))
    for cx, num, lab in ((440, "27", "publicaciones"), (640, followers, "seguidores"), (830, "19", "seguidos")):
        d.text((cx, 180), num, font=fnt("b", 46), fill=INK, anchor="mm")
        d.text((cx, 226), lab, font=fnt("r", 25), fill=INK, anchor="mm")
    d.text((40, 345), "Lean Alvarez | Trading & Finanzas", font=fnt("b", 32), fill=INK, anchor="lm")
    d.text((40, 390), "Trader en XAUUSD y Cripto · Opera de la forma correcta", font=fnt("r", 27), fill=INK, anchor="lm")
    d.text((40, 432), "realinvestors.club", font=fnt("sb", 27), fill=(0, 55, 107), anchor="lm")
    by0, by1 = 470, 530
    if followed:
        d.rounded_rectangle((40, by0, 455, by1), radius=16, fill=BTN_GREY)
        d.text((232, (by0 + by1) / 2), "Siguiendo", font=fnt("sb", 30), fill=INK, anchor="mm")
        check(d, 345, (by0 + by1) / 2, 11, INK, 4)
    else:
        d.rounded_rectangle((40, by0, 455, by1), radius=16, fill=IG_BLUE)
        d.text((247, (by0 + by1) / 2), "Seguir", font=fnt("sb", 30), fill=(255, 255, 255), anchor="mm")
    d.rounded_rectangle((475, by0, 900, by1), radius=16, fill=BTN_GREY)
    d.text((687, (by0 + by1) / 2), "Mensaje", font=fnt("sb", 30), fill=INK, anchor="mm")
    return c
IG_BTN = (CARD_X + 247, IG_Y + 500)
IG_FOLLOWERS = (CARD_X + 640, IG_Y + 180)

# ---------------- end-card: YouTube ----------------
YT_Y, YT_H = 660, 430
def yt_card(state):  # 0 = subscribe, 1 = subscribed, 2 = bell on
    c = Image.new("RGBA", (CARD_W, YT_H), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle((0, 0, CARD_W - 1, YT_H - 1), radius=38, fill=(255, 255, 255))
    c.alpha_composite(avatar(200, src=AV_RIC), (40, 44))
    d.text((280, 144), "Real Investors Club", font=fnt("b", 50), fill=INK, anchor="lm")
    by0, by1 = 300, 384
    cy = (by0 + by1) / 2
    if state == 0:
        d.rounded_rectangle((40, by0, 900, by1), radius=42, fill=YT_RED)
        d.text((470, cy), "Suscribirme", font=fnt("b", 36), fill=(255, 255, 255), anchor="mm")
    else:
        d.rounded_rectangle((40, by0, 900, by1), radius=42, fill=BTN_GREY)
        d.text((500, cy), "Suscripto", font=fnt("b", 36), fill=INK, anchor="mm")
        bell(d, 335, cy - 8, 26, (230, 170, 30) if state == 2 else INK, fill=(state == 2))
    return c
YT_BTN = (CARD_X + 470, YT_Y + 342)
YT_BELL = (CARD_X + 335, YT_Y + 334)

# ---------------- mid pill ----------------
PILL = (140, 1415, 940, 1545)
def pill(variant, done):
    w, h = PILL[2] - PILL[0], PILL[3] - PILL[1]
    c = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle((0, 0, w - 1, h - 1), radius=h // 2, fill=(22, 22, 26, 235), outline=(226, 183, 74, 255), width=3)
    c.alpha_composite(avatar(92, src=None if variant == "ig" else AV_RIC), (20, 19))
    name = "leanalvarez.ok" if variant == "ig" else "Real Investors Club"
    if variant == "ig":
        d.text((130, 50), name, font=fnt("b", 32), fill=(245, 245, 242), anchor="lm")
        verified(d, 130 + d.textlength(name, font=fnt("b", 32)) + 22, 51, 13)
        d.text((130, 88), "Trading & Finanzas", font=fnt("r", 25), fill=(160, 160, 166), anchor="lm")
    else:
        d.text((130, h / 2), name, font=fnt("b", 32), fill=(245, 245, 242), anchor="lm")
    bx0, bx1, by0, by1 = w - 270, w - 24, 30, h - 30
    if not done:
        col = IG_BLUE if variant == "ig" else YT_RED
        lab = "Seguir" if variant == "ig" else "Suscribirme"
        d.rounded_rectangle((bx0, by0, bx1, by1), radius=18 if variant == "ig" else 36, fill=col)
        d.text(((bx0 + bx1) / 2, h / 2), lab, font=fnt("b", 29), fill=(255, 255, 255), anchor="mm")
    else:
        lab = "Siguiendo" if variant == "ig" else "Suscripto"
        d.rounded_rectangle((bx0, by0, bx1, by1), radius=18 if variant == "ig" else 36, fill=(60, 60, 66))
        d.text(((bx0 + bx1) / 2 - 14, h / 2), lab, font=fnt("b", 29), fill=(245, 245, 242), anchor="mm")
        check(d, bx1 - 34, h / 2, 9, (245, 245, 242), 4)
    return c
PILL_BTN = (PILL[2] - 147, (PILL[1] + PILL[3]) // 2)

# ---------------- cursor ----------------
def cursor(scale=1.0):
    s = 3.0 * scale
    pts = [(0, 0), (0, 17), (4.5, 13), (8, 20.5), (10.5, 19.5), (7, 12.5), (12.5, 12.5)]
    pts = [(x * s + 8, y * s + 8) for x, y in pts]
    im = Image.new("RGBA", (int(60 * scale) + 20, int(80 * scale) + 20), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    sh = Image.new("RGBA", im.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).polygon([(x + 3, y + 4) for x, y in pts], fill=(0, 0, 0, 120))
    im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(3)))
    d.polygon(pts, fill=(255, 255, 255), outline=(0, 0, 0))
    d.line(pts + [pts[0]], fill=(0, 0, 0), width=3)
    return im
CUR = cursor(1.0); CUR_PRESS = cursor(0.85)

def ease(x):
    x = max(0.0, min(1.0, x)); return x * x * (3 - 2 * x)

def back(x):  # ease-out back
    x = max(0.0, min(1.0, x)); c = 1.7
    return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2

def place(ov, img, x, y, alpha=1.0, scale=1.0, blur=0):
    if alpha <= 0: return
    if scale != 1.0:
        img = img.resize((max(1, int(img.width * scale)), max(1, int(img.height * scale))), Image.BILINEAR)
    if blur > 0.3:
        img = img.filter(ImageFilter.GaussianBlur(blur))
    if alpha < 1:
        a = img.getchannel("A").point(lambda v: int(v * alpha)); img = img.copy(); img.putalpha(a)
    ov.alpha_composite(img, (int(x), int(y)))

def ring(d, cx, cy, p, col):
    if 0 < p < 1:
        r = 20 + 70 * p
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=col + (int(200 * (1 - p)),), width=5)

def move(lt, t0, t1, a, b):
    k = ease((lt - t0) / (t1 - t0))
    return a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k

class CTA:
    def __init__(self, variant):
        self.v = variant
        self.pill = [pill(variant, False), pill(variant, True)]
        if variant == "ig":
            self.cards = [ig_card(False, "3.734"), ig_card(True, "3.735")]
        else:
            self.cards = [yt_card(0), yt_card(1), yt_card(2)]

    # ----- mid CTA inside the "nets" scene -----
    MID_T = 7.1
    def mid(self, ov, d, lt, dur):
        t = lt - self.MID_T
        if t < 0: return
        a = min(ease(t / 0.4), ease((dur - lt) / 0.35))
        dy = (1 - back(t / 0.55)) * 90
        done = t > 1.75
        place(ov, self.pill[1 if done else 0], PILL[0], PILL[1] + dy, alpha=a)
        ring(d, *PILL_BTN, (t - 1.7) / 0.5, (226, 183, 74))
        # cursor taps the button
        if 0.6 < t < 3.2:
            ca = min(ease((t - 0.6) / 0.3), ease((3.2 - t) / 0.3)) * a
            x, y = move(t, 0.6, 1.5, (PILL_BTN[0] + 160, PILL_BTN[1] + 200), PILL_BTN)
            press = 1.6 < t < 1.8
            place(ov, CUR_PRESS if press else CUR, x - 8, y - 8, alpha=ca)

    # ----- end card -----
    def end(self, ov, d, t, lt, dur):
        if self.v == "ig":
            head, card_y = "SEGUÍ ESTA CUENTA", IG_Y
            click1, btn = 1.9, IG_BTN
        else:
            head, card_y = "SUSCRIBITE AL CANAL", YT_Y
            click1, btn = 1.7, YT_BTN
        # headline punches in
        k = back((lt - 0.15) / 0.5)
        if lt > 0.15:
            sz = 104
            while True:
                fH = ImageFont.truetype("/usr/share/fonts/opentype/inter/InterDisplay-Black.otf", sz)
                if ImageDraw.Draw(Image.new("L", (1, 1))).textlength(head, font=fH) <= 930: break
                sz -= 4
            a = int(255 * ease((lt - 0.15) / 0.3))
            tmp = Image.new("RGBA", (1080, 170), (0, 0, 0, 0))
            ImageDraw.Draw(tmp).text((540, 85), head, font=fH, fill=(245, 245, 242, a), anchor="mm")
            sc = 0.6 + 0.4 * k
            place(ov, tmp, 540 - 540 * sc, 380 - 85 * sc, scale=sc)
            uw = 360 * ease((lt - 0.5) / 0.5)
            d.rectangle((540 - uw, 470, 540 + uw, 476), fill=(226, 183, 74, a))
        # card: blurred & small -> sharp
        p = ease((lt - 0.3) / 0.6)
        if self.v == "ig":
            card = self.cards[1 if lt > click1 + 0.1 else 0]
        else:
            st = 0 if lt < click1 + 0.1 else (1 if lt < 3.3 else 2)
            card = self.cards[st]
        pop = 1.0
        if click1 + 0.1 < lt < click1 + 0.45:
            pop = 1 + 0.025 * math.sin((lt - click1 - 0.1) / 0.35 * math.pi)
        sc = (0.88 + 0.12 * p) * pop
        cw, ch = card.width * sc, card.height * sc
        place(ov, card, 540 - cw / 2, card_y + card.height / 2 - ch / 2 + (1 - p) * 60,
              alpha=p, scale=sc, blur=(1 - p) * 10)
        ring(d, *btn, (lt - click1) / 0.55, (226, 183, 74))
        if self.v == "ig":  # +1 follower
            u = lt - (click1 + 0.15)
            if 0 < u < 1.3:
                fa = int(255 * min(1, ease(u / 0.2), ease((1.3 - u) / 0.4)))
                d.text((IG_FOLLOWERS[0] + 70, IG_FOLLOWERS[1] - 30 - 60 * ease(u / 1.3)), "+1",
                       font=fnt("b", 44), fill=(226, 183, 74, fa), anchor="mm")
        else:
            ring(d, *YT_BELL, (lt - 3.25) / 0.55, (226, 183, 74))
        # cursor
        ca = min(ease((lt - 0.9) / 0.3), ease((dur - 0.6 - lt) / 0.4))
        if ca > 0:
            if self.v == "ig" or lt < 2.4:
                x, y = move(lt, 0.9, click1 - 0.15, (900, 1560), btn)
                press = click1 - 0.05 < lt < click1 + 0.12
            else:
                x, y = move(lt, 2.4, 3.15, btn, YT_BELL)
                press = 3.2 < lt < 3.37
            place(ov, CUR_PRESS if press else CUR, x - 8, y - 8, alpha=ca)
        # tagline + chip
        fS = fnt("sb", 42)
        ty = card_y + (IG_H if self.v == "ig" else YT_H) + 90
        ta = ease((lt - (click1 + 0.6)) / 0.45)
        if ta > 0:
            d.text((540, ty + (1 - ta) * 30), "y entendé el mercado", font=fS, fill=(245, 245, 242, int(255 * ta)), anchor="mm")
            d.text((540, ty + 56 + (1 - ta) * 30), "antes que el resto", font=fS, fill=(255, 222, 140, int(255 * ta)), anchor="mm")
        chip = "Compartilo con quien tenga cripto en un exchange" if self.v == "ig" else "Activá la campanita y no te perdés nada"
        ca2 = ease((lt - (click1 + 1.8)) / 0.4)
        if ca2 > 0:
            f = fnt("m", 30); w = d.textlength(chip, font=f) + 50; y = ty + 150
            d.rounded_rectangle((540 - w / 2, y - 32, 540 + w / 2, y + 32), radius=32,
                                outline=(226, 183, 74, int(255 * ca2)), width=2, fill=(226, 183, 74, int(40 * ca2)))
            d.text((540, y), chip, font=f, fill=(255, 222, 140, int(255 * ca2)), anchor="mm")
