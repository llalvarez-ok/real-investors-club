"""Perfil de volumen — reel/short Real Investors Club."""
import sys, os, subprocess, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, "/home/claude/ric_video")
from cta import CTA

VAR = os.environ.get("VAR", "ig")
W, H, FPS = 1080, 1920, 30
N = 3200
BASE_OUT = os.path.join(HERE, "scenes")
os.makedirs(BASE_OUT, exist_ok=True); os.makedirs(BASE_OUT + "_" + VAR, exist_ok=True)

F = "/usr/share/fonts/opentype/inter/"
def font(name, size):
    return ImageFont.truetype({
        "black": F + "InterDisplay-Black.otf", "semi": F + "Inter-SemiBold.otf",
        "med": F + "Inter-Medium.otf", "bold": F + "Inter-Bold.otf",
        "mono": "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
        "monor": "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
        "dj": "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    }[name], size)

GOLD = (226, 183, 74); GOLD2 = (255, 222, 140); WHITE = (245, 245, 242)
GREY = (140, 144, 152); RED = (235, 77, 75); GREEN = (60, 200, 130)
UP = (232, 196, 100); DN = (118, 121, 132)

# ---------- background ----------
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
d_ = np.sqrt(((xx - W / 2) / W) ** 2 + ((yy - H * 0.48) / H) ** 2)
vig = np.clip(1 - d_ * 1.6, 0, 1)
BG = np.zeros((H, W, 3), np.float32)
BG[..., 0] = 6 + 14 * vig; BG[..., 1] = 7 + 12 * vig; BG[..., 2] = 10 + 10 * vig
for gx in range(0, W, 90): BG[:, gx:gx + 1] += 5
for gy in range(30, H, 90): BG[gy:gy + 1, :] += 5

# ---------- price space ----------
YT, YB = 600, 1300
def Y(p): return YB - (YB - YT) * p
POC, VAL, VAH = 0.50, 0.385, 0.615
BINS = np.linspace(0.04, 0.96, 31)
BH = (YB - YT) * (BINS[1] - BINS[0])

def prof(p, second=False):
    v = np.exp(-0.5 * ((p - POC) / 0.11) ** 2) + 0.18 * np.exp(-0.5 * ((p - 0.43) / 0.04) ** 2) + 0.05
    if second:
        v = np.where(p > 0.66, 0.03 + 0.6 * np.exp(-0.5 * ((p - 0.88) / 0.04) ** 2), v)
    return v / PMAX

PMAX = 1.0
_g = np.linspace(0, 1, 1001)
PMAX = float((np.exp(-0.5 * ((_g - POC) / 0.11) ** 2) + 0.18 * np.exp(-0.5 * ((_g - 0.43) / 0.04) ** 2) + 0.05).max())

def sh_profile(x0, maxlen, second=False):
    def f(d):
        for p in BINS:
            L = max(6, maxlen * prof(p, second))
            d.rectangle((x0, Y(p) - BH * 0.3, x0 + L, Y(p) + BH * 0.3), fill=255)
    return f

# ---------- synthetic candles ----------
def candles(path, seed, vol=0.012):
    rng = np.random.default_rng(seed)
    c = np.asarray(path) + rng.normal(0, vol, len(path))
    o = np.concatenate([[c[0] - 0.01], c[:-1]])
    hi = np.maximum(o, c) + np.abs(rng.normal(0, vol, len(c)))
    lo = np.minimum(o, c) - np.abs(rng.normal(0, vol, len(c)))
    return o, hi, lo, c

def seg(*pts):  # piecewise linear: (n, start, end) ...
    out = []
    for n, a, b in pts: out += list(np.linspace(a, b, n))
    return np.array(out)

n = 60; k = np.arange(n)
HOOK = candles(0.5 + 0.11 * np.sin(k / 5.3) + 0.06 * np.sin(k / 1.9 + 1) - 0.002 * (k - 30) * np.cos(k / 9), 11, 0.02)
k = np.arange(48)
INSIDE = candles(0.5 + 0.095 * np.sin(k / 48 * 3.4 * math.pi), 12, 0.014)
OUTSIDE = candles(np.concatenate([0.5 + 0.08 * np.sin(np.arange(24) / 3.2), seg((7, 0.6, 0.86)), 0.865 + 0.025 * np.sin(np.arange(17) / 2)]), 13, 0.012)
SIG_A = candles(np.concatenate([0.5 + 0.06 * np.sin(np.arange(14) / 2.4), seg((4, 0.58, 0.68)), 0.70 + 0.02 * np.sin(np.arange(6)) + np.linspace(0, 0.08, 6)]), 14, 0.01)
SIG_B = candles(np.concatenate([0.5 + 0.06 * np.sin(np.arange(14) / 2.4), seg((3, 0.6, 0.67)), seg((4, 0.64, 0.5)), seg((6, 0.48, 0.4))]), 15, 0.01)
BOLL = candles(np.concatenate([0.5 + 0.09 * np.sin(np.arange(18) / 2.6), 0.5 + 0.015 * np.sin(np.arange(14)), seg((3, 0.52, 0.575)), seg((4, 0.55, 0.5)), seg((8, 0.53, 0.78)), 0.78 + 0.02 * np.sin(np.arange(5))]), 16, 0.009)
WYCK = candles(np.concatenate([seg((10, 0.9, 0.46)), 0.48 + 0.085 * np.sin(np.arange(26) / 2.7), seg((3, 0.42, 0.28)), seg((3, 0.32, 0.44)), seg((6, 0.47, 0.67)), seg((4, 0.66, 0.625)), seg((7, 0.65, 0.84))]), 17, 0.011)
GOLDD = candles(np.concatenate([0.5 + 0.1 * np.sin(np.arange(27) / 3.1), [0.68, 0.69, 0.67], seg((3, 0.62, 0.55)), seg((12, 0.54, 0.38)), seg((5, 0.39, 0.43))]), 18, 0.011)

def draw_candles(d, data, x0, x1, shown, alpha=1.0, glow=True):
    o, hi, lo, c = data
    n = len(c); step = (x1 - x0) / n; bw = max(3, step * 0.62)
    m = int(shown)
    if m <= 0: return None
    a = int(255 * alpha)
    for i in range(min(m + 1, n)):
        frac = 1.0 if i < m else shown - m
        if frac <= 0: break
        cx = x0 + step * (i + 0.5)
        cc = o[i] + (c[i] - o[i]) * frac
        hh = max(o[i], cc) + (hi[i] - max(o[i], c[i])) * frac
        ll = min(o[i], cc) - (min(o[i], c[i]) - lo[i]) * frac
        col = UP if cc >= o[i] else DN
        d.line((cx, Y(hh), cx, Y(ll)), fill=col + (a,), width=2)
        y0, y1 = sorted((Y(o[i]), Y(cc)))
        d.rectangle((cx - bw / 2, y0, cx + bw / 2, max(y1, y0 + 2)), fill=col + (a,))
    i = min(m, n - 1)
    last = (x0 + step * (i + 0.5), Y(c[i] if m < n else c[-1]))
    if glow and alpha > 0.5:
        r = 9; d.ellipse((last[0] - r, last[1] - r, last[0] + r, last[1] + r), fill=GOLD2 + (int(200 * alpha),))
    return last

def cx_of(data, x0, x1, i):
    return x0 + (x1 - x0) / len(data[3]) * (i + 0.5)

def band(d, x0, x1, a, label=True, lo=VAL, hi=VAH, tag="ÁREA DE VALOR"):
    if a <= 0: return
    d.rectangle((x0, Y(hi), x1, Y(lo)), fill=GOLD + (int(34 * a),))
    for p in (lo, hi):
        for xx_ in range(int(x0), int(x1), 22):
            d.line((xx_, Y(p), min(xx_ + 12, x1), Y(p)), fill=GOLD + (int(200 * a),), width=2)
    if label:
        f = font("mono", 22)
        d.text((x0 + 8, Y(hi) - 8), tag, font=f, fill=GOLD + (int(230 * a),), anchor="lb")

# ---------- shapes per scene ----------
CH_X0, CH_X1 = 80, 770     # chart area when profile sits on the right
PR_X0, PR_LEN = 800, 200

def sh_hook(d):
    o, hi, lo, c = HOOK; n = len(c); step = 900 / n
    for i in range(n):
        cx = 90 + step * (i + 0.5)
        d.line((cx, Y(hi[i]), cx, Y(lo[i])), fill=255, width=3)
        y0, y1 = sorted((Y(o[i]), Y(c[i])))
        d.rectangle((cx - 5, y0, cx + 5, max(y1, y0 + 3)), fill=255)

def sh_signal(d):
    for x0, x1 in ((80, 520), (560, 1000)):
        d.rectangle((x0, Y(VAH), x1, Y(VAL)), outline=255, width=4)

def sh_frame(d):
    box = (40, 600, 1040, 1250) if VAR == "ig" else (40, 620, 1040, 1130)
    d.rounded_rectangle(box, radius=60, outline=255, width=5)

SCENES = [
    ("hook", 10.0, sh_hook),
    ("profile", 5.6, sh_profile(140, 800)),
    ("poc", 10.7, sh_profile(140, 800)),
    ("inside", 10.6, sh_profile(PR_X0, PR_LEN)),
    ("outside", 7.7, sh_profile(PR_X0, PR_LEN, True)),
    ("signal", 8.4, sh_signal),
    ("any", 7.8, sh_profile(380, 340)),
    ("boll", 7.0, sh_profile(PR_X0, PR_LEN)),
    ("wyck", 9.2, sh_profile(PR_X0, PR_LEN)),
    ("gold", 10.6, sh_profile(PR_X0, PR_LEN)),
    ("mantra", 9.5, sh_profile(240, 600)),
    ("cta", 8.0, sh_frame),
]
STARTS = np.cumsum([0] + [s[1] for s in SCENES]); TOTAL = STARTS[-1]

def sample(fn, seed):
    m = Image.new("L", (W, H), 0); fn(ImageDraw.Draw(m))
    pts = np.argwhere(np.array(m) > 127)
    rng = np.random.default_rng(seed)
    idx = rng.choice(len(pts), N, replace=len(pts) < N)
    return pts[idx][:, ::-1].astype(np.float32) + rng.random((N, 2)).astype(np.float32)

TARGETS = [sample(s[2], 200 + i) for i, s in enumerate(SCENES)]
# candles -> profile: each particle slides horizontally (match by height)
def match_y(prev, new):
    out = np.empty_like(new); out[np.argsort(prev[:, 1])] = new[np.argsort(new[:, 1])]; return out
TARGETS[1] = match_y(TARGETS[0], TARGETS[1]); TARGETS[2] = TARGETS[1].copy()
rng0 = np.random.default_rng(1)
DUST = np.stack([rng0.random(N) * W, rng0.random(N) * H], 1).astype(np.float32)

def p_of_y(y): return (YB - y) / (YB - YT)

def colors_for(i):
    rng = np.random.default_rng(600 + i)
    sh = 0.65 + 0.5 * rng.random((N, 1))
    c = np.tile(np.array(GOLD, np.float32), (N, 1)) * sh
    name = SCENES[i][0]
    if name in ("poc", "inside", "outside", "any", "boll", "wyck", "gold", "mantra"):
        p = p_of_y(TARGETS[i][:, 1])
        out = (p < VAL - 0.01) | (p > VAH + 0.01)
        c[out] = np.array(GREY, np.float32) * 0.75 * sh[out]
        poc = np.abs(p - POC) < 0.016
        c[poc] = np.array(GOLD2, np.float32) * 1.15
    if name == "signal":
        c = np.tile(np.array(GOLD, np.float32), (N, 1)) * sh * 0.8
    return c
COLS = [colors_for(i) for i in range(len(SCENES))]

rngp = np.random.default_rng(9)
PH = rngp.random((N, 2)).astype(np.float32) * 6.28
FR = (0.6 + rngp.random((N, 2)) * 1.4).astype(np.float32)
DELAY = (rngp.random(N) * 0.45).astype(np.float32)

def ease(x):
    x = np.clip(x, 0, 1); return x * x * (3 - 2 * x)

def particles(i, lt):
    prev = TARGETS[i - 1] if i > 0 else DUST
    pc = COLS[i - 1] if i > 0 else COLS[0] * 0.3
    name = SCENES[i][0]
    delay = DELAY if name != "profile" else DELAY * 0.2 + (TARGETS[i][:, 1] - YT) / (YB - YT) * 0.0
    k = ease((lt - delay) / (1.1 if name != "profile" else 1.4))[:, None]
    mid = np.sin(k * math.pi)
    P = prev + (TARGETS[i] - prev) * k
    if name != "profile":
        P[:, 0] += mid[:, 0] * 50 * np.sin(PH[:, 0]); P[:, 1] += mid[:, 0] * 50 * np.cos(PH[:, 1])
    t = STARTS[i] + lt
    P[:, 0] += 2.2 * np.sin(t * FR[:, 0] * 2 + PH[:, 0]); P[:, 1] += 2.2 * np.cos(t * FR[:, 1] * 2 + PH[:, 1])
    if name == "hook":  # reveal candles left to right
        vis = np.clip((lt - 0.2) * 260 - (TARGETS[0][:, 0] - 90), 0, 60) / 60
        C = COLS[0] * vis[:, None]
        P = TARGETS[0] + (DUST - TARGETS[0]) * (1 - ease(np.clip((lt - 0.2) * 260 - (TARGETS[0][:, 0] - 90), 0, 200) / 200))[:, None] * 0
        P[:, 0] += 1.5 * np.sin(t * 3 + PH[:, 0])
        return P, C
    C = pc + (COLS[i] - pc) * k
    if name == "cta":
        u = lt - (1.9 if VAR == "ig" else 1.7)
        if 0 < u < 1.6:
            c0 = np.array([540, 1100 if VAR == "ig" else 1000], np.float32)
            v = P - c0; dist = np.linalg.norm(v, axis=1, keepdims=True) + 1
            P += v / dist * (np.sin(np.clip(u / 1.6, 0, 1) * math.pi) * 110 * np.exp(-dist / 500))
    if name in ("mantra", "cta"):
        C = C * (0.85 + 0.25 * np.sin(t * 2.2 + PH[:, :1]))
    return P, C

def splat(P, C):
    can = np.zeros((H, W, 3), np.float32)
    x = P[:, 0].astype(np.int32); y = P[:, 1].astype(np.int32)
    ok = (x >= 0) & (x < W - 2) & (y >= 0) & (y < H - 2)
    x, y, C = x[ok], y[ok], C[ok]
    for dx, dy, w in ((0, 0, 1.0), (1, 0, 0.7), (0, 1, 0.7), (1, 1, 0.5)):
        np.add.at(can, (y + dy, x + dx), C * w)
    small = Image.fromarray(np.clip(can[::4, ::4] * 1.6, 0, 255).astype(np.uint8))
    glow = small.filter(ImageFilter.GaussianBlur(5)).resize((W, H), Image.BILINEAR)
    return can + np.asarray(glow, np.float32) * 0.9

# ---------- text helpers ----------
def appear(lt, at, end, out=0.35):
    a = min(ease((lt - at) / 0.45), ease((end - lt) / out))
    return float(a), float((1 - ease((lt - at) / 0.45)) * 36)

def txt(d, xy, s, f, col, a, anchor="mm", dy=0):
    if a > 0: d.text((xy[0], xy[1] + dy), s, font=f, fill=col + (int(255 * min(1, a)),), anchor=anchor)

def tracked(d, xy, s, f, col, a, track=4, anchor="l"):
    if a <= 0: return
    ws = [d.textlength(ch, font=f) for ch in s]; tot = sum(ws) + track * (len(s) - 1)
    x, y = xy
    if anchor == "r": x -= tot
    if anchor == "m": x -= tot / 2
    for ch, w in zip(s, ws):
        d.text((x, y), ch, font=f, fill=col + (int(255 * min(1, a)),), anchor="lm"); x += w + track

def chip(d, cx, y, s, f, col, a, fill=False):
    if a <= 0: return
    w = d.textlength(s, font=f) + 44; al = int(255 * a)
    d.rounded_rectangle((cx - w / 2, y - 30, cx + w / 2, y + 30), radius=30, outline=col + (al,), width=2,
                        fill=(col + (int(50 * a),)) if fill else None)
    d.text((cx, y), s, font=f, fill=col + (al,), anchor="mm")

def tag(d, x, y, s, col, a, anchor="lm", size=26):
    if a <= 0: return
    f = font("mono", size); w = d.textlength(s, font=f)
    x0 = x if anchor == "lm" else (x - w if anchor == "rm" else x - w / 2)
    d.rounded_rectangle((x0 - 12, y - 22, x0 + w + 12, y + 22), radius=8, fill=(10, 10, 12, int(220 * a)), outline=col + (int(255 * a),), width=2)
    d.text((x0, y), s, font=f, fill=col + (int(255 * a),), anchor="lm")

FH = font("black", 90); FH2 = font("black", 76); FS = font("semi", 40); FSm = font("med", 34)
FXS = font("med", 31); FTAG = font("semi", 26); FM = font("mono", 40); FMxs = font("monor", 23)
FBIG = font("black", 170); FSYM = font("dj", 40)

CTAX = CTA(VAR); CTAX.MID_T = 2.9

def head(d, lt, dur, top, title, sub=None, title_lines=None):
    if top:
        a, dy = appear(lt, 0.1, dur); tracked(d, (540, 265), top, FTAG, GOLD, a, track=6, anchor="m")
    lines = title_lines or [title]
    for j, ln in enumerate(lines):
        a, dy = appear(lt, 0.2 + 0.12 * j, dur)
        txt(d, (540, 345 + j * 88), ln, FH2 if len(lines) > 1 or len(ln) > 16 else FH, WHITE, a, dy=dy)
    if sub:
        a, dy = appear(lt, 0.5, dur); txt(d, (540, 345 + len(lines) * 88 + 10), sub, FSm, GREY, a, dy=dy)

def overlay(i, lt, d, ov):
    name, dur = SCENES[i][0], SCENES[i][1]
    gt = STARTS[i] + lt
    tracked(d, (70, 120), "REAL INVESTORS CLUB", FTAG, GOLD, 1, track=5)
    tracked(d, (1010, 120), "CLASE · PERFIL DE VOLUMEN", FTAG, GREY, 1, track=2, anchor="r")
    d.rectangle((70, 70, 1010, 73), fill=(255, 255, 255, 30))
    d.rectangle((70, 70, 70 + 940 * gt / TOTAL, 73), fill=GOLD + (255,))
    if name != "cta":
        txt(d, (540, 1650), "Gráficos ilustrativos · No es recomendación de inversión", FMxs, GREY, 0.7)
    A = lambda at, end=None: appear(lt, at, end if end else dur)

    if name == "hook":
        head(d, lt, dur, "LO QUE LAS VELAS", None, title_lines=["NO TE MUESTRAN"])
        a, dy = A(5.0); txt(d, (540, 1420), "¿Dónde se puso de acuerdo", FS, WHITE, a, dy=dy)
        a, dy = A(5.3); txt(d, (540, 1475), "el mercado?", FS, GOLD2, a, dy=dy)
    elif name == "profile":
        head(d, lt, dur, "SE LLAMA", "PERFIL DE VOLUMEN")
        a, dy = A(1.6); txt(d, (540, 1420), "Cuánto se negoció en cada precio", FS, WHITE, a, dy=dy)
        for j, p in enumerate((0.2, 0.5, 0.8)):
            a, _ = A(1.2 + 0.15 * j); txt(d, (110, Y(p)), "$", FM, GREY, a * 0.8, anchor="rm")
    elif name == "poc":
        head(d, lt, dur, "LAS DOS CLAVES", "POC Y ÁREA DE VALOR")
        L = 800 * prof(np.array([POC]))[0]
        a, _ = A(0.8)
        if a > 0:
            d.line((140 + L + 10, Y(POC), 1000, Y(POC)), fill=GOLD2 + (int(255 * a),), width=3)
        tag(d, 880, Y(POC) - 44, "POC", GOLD2, a, anchor="mm", size=30)
        a, dy = A(1.4); txt(d, (540, 1395), "POC = el precio más negociado", FS, GOLD2, a, dy=dy)
        a2, _ = A(3.6)
        if a2 > 0:
            x = 1000; d.line((x, Y(VAH), x, Y(VAL)), fill=GOLD + (int(255 * a2),), width=4)
            for p in (VAH, VAL): d.line((x - 18, Y(p), x, Y(p)), fill=GOLD + (int(255 * a2),), width=4)
            v = int(70 * ease((lt - 3.6) / 1.2))
            txt(d, (905, Y(0.27)), f"{v}%", font("black", 92), GOLD2, a2)
            txt(d, (905, Y(0.27) + 62), "del volumen", FSm, GREY, a2)
        a, dy = A(5.6); txt(d, (540, 1455), "Área de valor = el precio \"justo\"", FS, WHITE, a, dy=dy)
        a, dy = A(6.0); txt(d, (540, 1510), "que aceptó el mercado", FS, WHITE, a, dy=dy)
    elif name == "inside":
        head(d, lt, dur, "IDEA 1", "ADENTRO: EQUILIBRIO")
        band(d, CH_X0, CH_X1, ease((lt - 0.6) / 0.6))
        draw_candles(d, INSIDE, CH_X0, CH_X1, max(0, (lt - 1.0) * 6.5))
        a, dy = A(2.5); txt(d, (540, 1400), "Compradores y vendedores de acuerdo", FS, WHITE, a, dy=dy)
        a, dy = A(5.2); txt(d, (540, 1460), "El precio va de borde a borde… sin ir a ningún lado", FXS, GREY, a, dy=dy)
    elif name == "outside":
        head(d, lt, dur, "IDEA 2", "AFUERA: EL PRECIO CORRE")
        band(d, CH_X0, CH_X1, ease((lt - 0.4) / 0.5))
        lst = draw_candles(d, OUTSIDE, CH_X0, CH_X1, max(0, (lt - 0.6) * 9.5))
        a, _ = A(2.2)
        if a > 0:
            d.rectangle((PR_X0 - 6, Y(0.8), 1006, Y(0.66)), outline=RED + (int(220 * a),), width=3)
        tag(d, 1000, Y(0.73), "HUECO", RED, a, anchor="rm", size=24)
        a, _ = A(3.6); tag(d, 1000, Y(0.88) - 48, "NUEVO ACUERDO", GOLD2, a, anchor="rm", size=22)
        a, dy = A(1.5); txt(d, (540, 1400), "Donde casi no hay volumen,", FS, WHITE, a, dy=dy)
        a, dy = A(2.0); txt(d, (540, 1455), "el precio cruza rápido", FS, GOLD2, a, dy=dy)
    elif name == "signal":
        head(d, lt, dur, "LA SEÑAL", "ESTÁ EN EL BORDE")
        for (x0, x1, data, ok, at) in ((80, 520, SIG_A, True, 1.2), (560, 1000, SIG_B, False, 4.4)):
            draw_candles(d, data, x0 + 10, x1 - 10, max(0, (lt - at) * 9), glow=False)
            a, dy = A(at + 0.2)
            col = GREEN if ok else RED
            txt(d, ((x0 + x1) / 2, Y(VAL) + 70), ("✓ " if ok else "✗ ") + ("SE QUEDA AFUERA" if ok else "VUELVE A ENTRAR"), font("dj", 30), col, a, dy=dy)
            a, dy = A(at + 2.0)
            txt(d, ((x0 + x1) / 2, Y(VAL) + 120), "hay movimiento" if ok else "era una trampa", FSm, WHITE, a, dy=dy)
    elif name == "any":
        head(d, lt, dur, "Y SIRVE CON", "CUALQUIER ESTRATEGIA")
        for j, s in enumerate(("Bollinger", "Wyckoff", "Oro en NY")):
            a, _ = A(0.9 + 0.35 * j); chip(d, 540, 1300 + 0 * j, "", FSm, GOLD2, 0)
            chip(d, [250, 540, 830][j], 1310, s, FSm, GOLD2, a, fill=True)
        CTAX.mid(ov, d, lt, dur)
    elif name == "boll":
        head(d, lt, dur, "CON", "BOLLINGER")
        band(d, CH_X0, CH_X1, ease((lt - 0.3) / 0.5))
        shown = max(0, (lt - 0.5) * 11)
        o, hi, lo, c = BOLL
        m = int(min(shown, len(c)))
        if m > 3:
            sma, up, dn, xs = [], [], [], []
            for j in range(m):
                w = c[max(0, j - 9):j + 1]; s = w.mean(); sd = w.std() if len(w) > 2 else 0.04
                xs.append(cx_of(BOLL, CH_X0, CH_X1, j)); up.append(Y(s + 2 * sd + 0.004)); dn.append(Y(s - 2 * sd - 0.004))
            d.line(list(zip(xs, up)), fill=(170, 175, 190, 200), width=3)
            d.line(list(zip(xs, dn)), fill=(170, 175, 190, 200), width=3)
        draw_candles(d, BOLL, CH_X0, CH_X1, shown)
        a, _ = appear(lt, 3.6, dur); tag(d, cx_of(BOLL, CH_X0, CH_X1, 34), Y(0.66), "✗ sigue adentro", RED, a, anchor="mm", size=22)
        a, _ = appear(lt, 4.8, dur); tag(d, cx_of(BOLL, CH_X0, CH_X1, 38), Y(0.86), "✓ sale de la zona", GREEN, a, anchor="mm", size=22)
        a, dy = A(1.2); txt(d, (540, 1400), "Bandas apretadas adentro del valor", FS, WHITE, a, dy=dy)
        a, dy = A(3.4); txt(d, (540, 1455), "La ruptura que vale: la que sale de la zona", FXS, GOLD2, a, dy=dy)
    elif name == "wyck":
        head(d, lt, dur, "CON", "WYCKOFF")
        band(d, CH_X0, CH_X1, ease((lt - 0.3) / 0.5), tag="RANGO = ÁREA DE VALOR")
        draw_candles(d, WYCK, CH_X0, CH_X1, max(0, (lt - 0.5) * 9.0))
        a, _ = appear(lt, 4.3, dur); tag(d, cx_of(WYCK, CH_X0, CH_X1, 38), Y(0.2), "SPRING", GOLD2, a, anchor="mm", size=24)
        a, _ = appear(lt, 5.6, dur); tag(d, cx_of(WYCK, CH_X0, CH_X1, 44), Y(0.76), "RUPTURA", WHITE, a, anchor="mm", size=22)
        a, _ = appear(lt, 6.4, dur); tag(d, cx_of(WYCK, CH_X0, CH_X1, 52), Y(0.53), "TEST → ENTRADA", GREEN, a, anchor="mm", size=22)
        a, dy = A(4.4); txt(d, (540, 1400), "Spring: perfora y vuelve", FS, WHITE, a, dy=dy)
        a, dy = A(6.4); txt(d, (540, 1455), "Entrada: rompe y prueba el borde desde afuera", FXS, GOLD2, a, dy=dy)
    elif name == "gold":
        head(d, lt, dur, "EN EL ORO", "APERTURA DE NY")
        sx = cx_of(GOLDD, CH_X0, CH_X1, 26.5)
        band(d, CH_X0, sx, ease((lt - 0.3) / 0.5), tag="ÁREA DE VALOR · AYER")
        a = ease((lt - 0.3) / 0.5)
        if a > 0:
            for p in (VAL, VAH):
                for xx_ in range(int(sx), CH_X1, 22):
                    d.line((xx_, Y(p), min(xx_ + 10, CH_X1), Y(p)), fill=GOLD + (int(120 * a),), width=2)
        draw_candles(d, GOLDD, CH_X0, CH_X1, max(0, (lt - 0.5) * 10))
        a, _ = appear(lt, 2.9, dur)
        if a > 0:
            d.line((sx, YT - 10, sx, YB), fill=WHITE + (int(150 * a),), width=2)
            tag(d, sx + 8, YT + 10, "NY", WHITE, a, size=22)
        a, _ = appear(lt, 6.4, dur); tag(d, cx_of(GOLDD, CH_X0, CH_X1, 38), Y(0.25), "cruza al otro borde", GOLD2, a, anchor="mm", size=22)
        a, dy = A(3.6); txt(d, (540, 1400), "Abre afuera y se sostiene → continuidad", FXS, WHITE, a, dy=dy)
        a, dy = A(6.0); txt(d, (540, 1455), "Vuelve a entrar → suele ir al otro borde", FXS, GOLD2, a, dy=dy)
    elif name == "mantra":
        a, dy = A(0.3); txt(d, (540, 350), "ADENTRO,", FH, WHITE, a, dy=dy)
        a, dy = A(0.6); txt(d, (540, 445), "SE ESPERA.", FH, GREY, a, dy=dy)
        a, dy = A(1.6); txt(d, (540, 1395), "EN EL BORDE,", FH, WHITE, a, dy=dy)
        a, dy = A(1.9); txt(d, (540, 1490), "SE DECIDE.", FH, GOLD2, a, dy=dy)
        q = appear(lt, 4.0, dur)[0]
        if q > 0:
            d.rounded_rectangle((90, 1555, 990, 1615), radius=30, fill=(20, 20, 24, int(220 * q)), outline=GOLD + (int(255 * q),), width=2)
            txt(d, (540, 1585), "¿Entrás adentro o esperás que salga? 👇".replace(" 👇", ""), FSm, GOLD2, q)
    elif name == "cta":
        CTAX.end(ov, d, gt, lt, dur)

def frame(i, lt):
    P, C = particles(i, lt)
    img = BG + splat(P, C)
    base = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).convert("RGBA")
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    overlay(i, lt, d, ov)
    return Image.alpha_composite(base, ov).convert("RGB")

def render_scene(i):
    name, dur = SCENES[i][0], SCENES[i][1]
    od = BASE_OUT + "_" + VAR if name in ("any", "cta") else BASE_OUT
    tmp = os.path.join(od, f"{i:02d}_{name}.tmp.mp4"); fin = os.path.join(od, f"{i:02d}_{name}.mp4")
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                          "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
                          "-pix_fmt", "yuv420p", tmp], stdin=subprocess.PIPE)
    for f in range(int(round(dur * FPS))):
        p.stdin.write(frame(i, f / FPS).tobytes())
    p.stdin.close()
    if p.wait() == 0: os.replace(tmp, fin)

if __name__ == "__main__":
    if sys.argv[1] == "still":
        i, lt = int(sys.argv[2]), float(sys.argv[3])
        frame(i, lt).save(os.path.join(BASE_OUT, f"still_{i}.jpg"), quality=88)
    else:
        for a in sys.argv[2:]: render_scene(int(a))
