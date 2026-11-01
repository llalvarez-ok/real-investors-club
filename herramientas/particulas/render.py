import sys, os, subprocess, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS = 1080, 1920, 30
N = 3200
VAR = os.environ.get("VAR", "ig")
BASE_OUT = os.path.join(os.path.dirname(__file__), "scenes")
OUT = BASE_OUT
os.makedirs(BASE_OUT + "_" + VAR, exist_ok=True)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cta import CTA
CTAX = CTA(VAR)
os.makedirs(OUT, exist_ok=True)

F = "/usr/share/fonts/opentype/inter/"
def font(name, size):
    return ImageFont.truetype({
        "black": F + "InterDisplay-Black.otf",
        "xbold": F + "InterDisplay-ExtraBold.otf",
        "semi": F + "Inter-SemiBold.otf",
        "med": F + "Inter-Medium.otf",
        "reg": F + "Inter-Regular.otf",
        "mono": "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
        "monor": "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    }[name], size)

GOLD = (226, 183, 74)
GOLD2 = (255, 222, 140)
WHITE = (245, 245, 242)
GREY = (140, 144, 152)
RED = (235, 77, 75)
ICE = (120, 190, 255)
GREEN = (60, 200, 130)

# ---------------- background ----------------
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
d = np.sqrt(((xx - W / 2) / W) ** 2 + ((yy - H * 0.48) / H) ** 2)
vig = np.clip(1 - d * 1.6, 0, 1)
BG = np.zeros((H, W, 3), np.float32)
BG[..., 0] = 6 + 14 * vig
BG[..., 1] = 7 + 12 * vig
BG[..., 2] = 10 + 10 * vig
# faint terminal grid
for gx in range(0, W, 90):
    BG[:, gx:gx + 1] += 5
for gy in range(30, H, 90):
    BG[gy:gy + 1, :] += 5

# ---------------- shapes ----------------
def sample(draw_fn, seed, n=N):
    m = Image.new("L", (W, H), 0)
    draw_fn(ImageDraw.Draw(m))
    pts = np.argwhere(np.array(m) > 127)
    rng = np.random.default_rng(seed)
    idx = rng.choice(len(pts), n, replace=len(pts) < n)
    p = pts[idx][:, ::-1].astype(np.float32) + rng.random((n, 2)).astype(np.float32)
    return p

CY = 1000  # center of particle stage

def sh_disc(d):
    d.ellipse((540 - 290, CY - 290, 540 + 290, CY + 290), fill=255)

def sh_bars(d):
    base = 1330
    d.rectangle((250, base - 150, 450, base), fill=255)
    d.rectangle((630, base - 630, 830, base), fill=255)

def sh_laptop(d):
    w = 9
    d.rounded_rectangle((250, 770, 830, 1130), radius=26, outline=255, width=w)
    d.rounded_rectangle((285, 805, 795, 1095), radius=8, outline=255, width=3)
    d.polygon([(190, 1150), (890, 1150), (850, 1185), (230, 1185)], fill=255)
    # tiny "signature" stamp on screen
    d.line((380, 1010, 430, 960, 470, 1020, 520, 950, 560, 1010), fill=255, width=6)

TL_Y = [640, 860, 1080, 1300]
def sh_timeline(d):
    d.line((150, 560, 150, 1400), fill=255, width=5)
    for i, y in enumerate(TL_Y):
        r = [26, 34, 56, 22][i]
        d.ellipse((150 - r, y - r, 150 + r, y + r), fill=255)

NETS = [("ETHEREUM", 3770), ("BITCOIN", 1480), ("TRON · USDT", 628), ("XRP", 300), ("OTRAS 5 REDES", 145)]
BAR_Y0, BAR_DY, BAR_X0, BAR_W = 640, 150, 90, 900
def sh_netbars(d):
    for i, (_, v) in enumerate(NETS):
        y = BAR_Y0 + i * BAR_DY + 52
        L = max(14, BAR_W * v / 3770)
        d.rectangle((BAR_X0, y, BAR_X0 + L, y + 40), fill=255)

def sh_question(d):
    f = font("black", 640)
    d.text((540, 1020), "?", font=f, fill=255, anchor="mm")

def sh_split(d):
    d.ellipse((90, 860, 500, 1270), fill=255)
    d.ellipse((560, 840, 1010, 1290), fill=255)

def price_path():
    rng = np.random.default_rng(7)
    xs = np.linspace(110, 970, 60)
    base = np.concatenate([np.linspace(780, 760, 35), np.linspace(760, 1250, 10), np.linspace(1250, 1190, 15)])
    ys = base + rng.normal(0, 14, 60)
    return list(zip(xs, ys))
PRICE = price_path()
def sh_price(d):
    d.line(PRICE, fill=255, width=9, joint="curve")

def sh_lock(d):
    d.rounded_rectangle((360, 960, 720, 1250), radius=34, fill=255)
    d.arc((410, 750, 670, 1060), 180, 360, fill=255, width=40)
    d.line((410, 905, 410, 965), fill=255, width=40)
    d.line((670, 905, 670, 965), fill=255, width=40)
    d.ellipse((515, 1060, 565, 1110), fill=0)
    d.rectangle((530, 1090, 550, 1160), fill=0)

def sh_frame(d):
    box = (40, 600, 1040, 1250) if VAR == "ig" else (40, 620, 1040, 1130)
    d.rounded_rectangle(box, radius=60, outline=255, width=5)

def sh_ric(d):
    f = font("black", 400)
    d.text((540, 960), "RIC", font=f, fill=255, anchor="mm")

# ---------------- scenes ----------------
SCENES = [  # name, duration, shape fn, color fn
    ("hook", 10.2, sh_disc),
    ("record", 6.9, sh_bars),
    ("laptop", 11.4, sh_laptop),
    ("timeline", 16.1, sh_timeline),
    ("nets", 12.6, sh_netbars),
    ("who", 10.1, sh_question),
    ("money", 7.0, sh_split),
    ("market", 9.8, sh_price),
    ("lesson", 10.8, sh_lock),
    ("cta", 8.0, sh_frame),
]
ORIG = [6.0, 5.5, 7.5, 8.0, 11.8, 7.0, 6.5, 7.0, 6.5, 8.0]
STARTS = np.cumsum([0] + [s[1] for s in SCENES])
TOTAL = STARTS[-1]

TARGETS = [sample(s[2], 100 + i) for i, s in enumerate(SCENES)]
# start shape: scattered dust
rng0 = np.random.default_rng(1)
DUST = np.stack([rng0.random(N) * W, rng0.random(N) * H], 1).astype(np.float32)

def colors_for(i):
    c = np.tile(np.array(GOLD, np.float32), (N, 1))
    rng = np.random.default_rng(500 + i)
    c *= (0.65 + 0.5 * rng.random((N, 1)))
    name = SCENES[i][0]
    P = TARGETS[i]
    if name == "money":
        m = P[:, 0] < 530
        c[m] = np.array(ICE) * (0.6 + 0.5 * rng.random((m.sum(), 1)))
    if name == "market":
        c[:] = np.array(RED) * (0.7 + 0.4 * rng.random((N, 1)))
    if name == "record":
        m = P[:, 0] < 540
        c[m] = np.array(GREY) * 0.9
    return c
COLS = [colors_for(i) for i in range(len(SCENES))]

rngp = np.random.default_rng(9)
PH = rngp.random((N, 2)).astype(np.float32) * 6.28
FR = (0.6 + rngp.random((N, 2)) * 1.4).astype(np.float32)
DELAY = (rngp.random(N) * 0.5).astype(np.float32)

def ease(x):
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)

def particles(i, lt):
    prev = TARGETS[i - 1] if i > 0 else DUST
    pc = COLS[i - 1] if i > 0 else COLS[0] * 0.3
    k = ease((lt - DELAY) / 1.1)[:, None]
    # swirl mid-flight
    mid = np.sin(k * math.pi)
    P = prev + (TARGETS[i] - prev) * k
    P[:, 0] += mid[:, 0] * 60 * np.sin(PH[:, 0])
    P[:, 1] += mid[:, 0] * 60 * np.cos(PH[:, 1])
    t = STARTS[i] + lt
    amp = 2.5
    name = SCENES[i][0]
    if name == "money":  # free funds keep scattering
        m = TARGETS[i][:, 0] >= 530
        s = np.clip((lt - 2.0) / 4.0, 0, 1)
        P[m] += (TARGETS[i][m] - np.array([785, 1065])) * 0.55 * s
        P[m, 0] += np.sin(t * 3 + PH[m, 0]) * 25 * s
    P[:, 0] += amp * np.sin(t * FR[:, 0] * 2 + PH[:, 0])
    P[:, 1] += amp * np.cos(t * FR[:, 1] * 2 + PH[:, 1])
    C = pc + (COLS[i] - pc) * k
    if name == "cta":  # burst when the button is clicked
        u = lt - (1.9 if VAR == "ig" else 1.7)
        if 0 < u < 1.6:
            c0 = np.array([540, 1100 if VAR == "ig" else 1000], np.float32)
            v = P - c0; dist = np.linalg.norm(v, axis=1, keepdims=True) + 1
            P += v / dist * (np.sin(np.clip(u / 1.6, 0, 1) * math.pi) * 110 * np.exp(-dist / 500))
    if name == "cta" or name == "hook":
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

# ---------------- text helpers ----------------
class T:
    def __init__(self, draw):
        self.d = draw
    def text(self, xy, s, f, col, a, anchor="la", dy=0):
        if a <= 0: return
        x, y = xy
        self.d.text((x, y + dy), s, font=f, fill=col + (int(255 * min(1, a)),), anchor=anchor)
    def tracked(self, xy, s, f, col, a, track=4, anchor="l"):
        if a <= 0: return
        widths = [self.d.textlength(ch, font=f) for ch in s]
        total = sum(widths) + track * (len(s) - 1)
        x, y = xy
        if anchor == "r": x -= total
        if anchor == "m": x -= total / 2
        for ch, w in zip(s, widths):
            self.d.text((x, y), ch, font=f, fill=col + (int(255 * min(1, a)),), anchor="lm")
            x += w + track

def appear(lt, at, dur, end, out=0.35):
    a = ease((lt - at) / 0.45)
    a = min(a, ease((end - lt) / out))
    return float(a), float((1 - ease((lt - at) / 0.45)) * 36)

def wrap_center(t, lines, y, f, col, lt, at, dur, lh):
    pass
    for j, ln in enumerate(lines):
        a, dy = appear(lt, at + j * 0.12, dur, dur)
        t.text((540, y + j * lh), ln, f, col, a, anchor="mm", dy=dy)

def money(v):
    return f"{int(round(v)):,}".replace(",", ".")

def chip(t, d, cx, y, s, f, col, a, fillcol=None):
    if a <= 0: return
    w = d.textlength(s, font=f) + 44
    al = int(255 * a)
    d.rounded_rectangle((cx - w / 2, y - 30, cx + w / 2, y + 30), radius=30,
                        outline=col + (al,), width=2, fill=(fillcol + (int(60 * a),)) if fillcol else None)
    d.text((cx, y), s, font=f, fill=col + (al,), anchor="mm")

FH = font("black", 92); FH2 = font("black", 76); FBIG = font("black", 150)
FS = font("semi", 40); FSm = font("med", 34); FXS = font("med", 31)
FM = font("mono", 40); FMs = font("mono", 30); FMxs = font("monor", 24)
FTAG = font("semi", 26)

def overlay(i, lt, d, t):
    name, dur = SCENES[i][0], SCENES[i][1]
    gt = STARTS[i] + lt
    # chrome (always)
    t.tracked((70, 120), "REAL INVESTORS CLUB", FTAG, GOLD, 1, track=5)
    t.tracked((1010, 120), "MERCADOS · 31.10.26", FTAG, GREY, 1, track=3, anchor="r")
    d.rectangle((70, 70, 1010, 73), fill=(255, 255, 255, 30))
    d.rectangle((70, 70, 70 + 940 * gt / TOTAL, 73), fill=GOLD + (255,))
    t.text((540, 1625), "Fuentes: Binance · Chainalysis · TRM Labs", FMxs, GREY, 0.7, anchor="mm")
    t.text((540, 1660), "Arkham · Bitquery · CoinDesk · Infobae", FMxs, GREY, 0.7, anchor="mm")

    K = dur / ORIG[i]
    A = lambda at, end=None: appear(lt, at * K if at > 0.5 else at, dur, end if end else dur)
    if name == "hook":
        a, dy = A(0.1); t.tracked((540, 260), "BINANCE · 29 OCT 2026", FTAG, GREY, a, track=6, anchor="m")
        wrap_center(t, ["EL MAYOR ROBO", "CRIPTO DE LA HISTORIA"], 360, FH2, WHITE, lt, 0.3, dur, 92)
        v = 6300 * ease((lt - 0.8) / 2.6)
        a, dy = A(0.8)
        t.text((540, 1000), "US$ " + money(v) + " M", FBIG, GOLD2, a, anchor="mm", dy=dy)
        a, dy = A(3.4); t.text((540, 1400), "robados en menos de 4 horas", FS, WHITE, a, anchor="mm", dy=dy)
    elif name == "record":
        wrap_center(t, ["4 VECES", "EL RÉCORD ANTERIOR"], 330, FH, WHITE, lt, 0.1, dur, 104)
        a, dy = A(1.0)
        t.text((350, 1150), "US$ 1.500 M", FMs, GREY, a, anchor="mm", dy=dy)
        t.text((350, 1380), "Bybit · 2025", FSm, GREY, a, anchor="mm")
        a, dy = A(1.3)
        t.text((730, 670), "US$ 6.300 M", FM, GOLD2, a, anchor="mm", dy=dy)
        t.text((730, 1380), "Binance · 2026", FS, WHITE, a, anchor="mm")
    elif name == "laptop":
        wrap_center(t, ["TODO EMPEZÓ", "CON UNA LAPTOP"], 330, FH, WHITE, lt, 0.1, dur, 104)
        steps = ["Hackean la laptop de un ingeniero DevOps",
                 "Entran al sistema que firma los retiros",
                 "Cada retiro sale con firma VÁLIDA de Binance"]
        for j, s in enumerate(steps):
            a, dy = A(1.4 + j * 1.3)
            t.text((90, 1280 + j * 70), f"0{j+1}", FMs, GOLD, a, anchor="lm", dy=dy)
            t.text((160, 1280 + j * 70), s, FSm, WHITE, a, anchor="lm", dy=dy)
        a, dy = A(5.6)
        t.text((540, 1520), "Binance después admitió \"puntos de intrusión adicionales\"", FXS, GREY, a, anchor="mm", dy=dy)
    elif name == "timeline":
        a, dy = A(0.1); t.text((540, 340), "LAS 4 HORAS DEL GOLPE", FH2, WHITE, a, anchor="mm", dy=dy)
        a, dy = A(0.3); t.text((540, 430), "29 de octubre · hora argentina", FSm, GREY, a, anchor="mm", dy=dy)
        rows = [("17:04", "Primer retiro: 233,5 M de XRP", WHITE),
                ("17:20", "18.270 BTC salen en un solo bloque", WHITE),
                ("17:24", "Golpe principal: US$ 2.530 M en ETH", GOLD2),
                ("19:15", "Binance frena los retiros", RED)]
        for j, (h, s, c) in enumerate(rows):
            a, dy = A(1.2 + j * 1.35)
            t.text((230, TL_Y[j] - 26), h, FM, GOLD, a, anchor="lm", dy=dy)
            t.text((230, TL_Y[j] + 30), s, FSm, c, a, anchor="lm", dy=dy)
    elif name == "nets":
        a, dy = A(0.1); t.text((540, 340), "¿QUÉ SE LLEVARON?", FH2, WHITE, a, anchor="mm", dy=dy)
        a, dy = A(0.3); t.text((540, 430), "En millones de dólares, por red", FSm, GREY, a, anchor="mm", dy=dy)
        for j, (nm, v) in enumerate(NETS):
            a, dy = A(1.0 + j * 0.3)
            y = BAR_Y0 + j * BAR_DY
            t.text((BAR_X0, y + 20), nm, FTAG, WHITE, a, anchor="lm", dy=dy)
            t.text((990, y + 20), "US$ " + money(v * ease((lt - 1.0 - j * 0.3) / 1.2)) + " M", FMs, GOLD2, a, anchor="rm", dy=dy)
    elif name == "who":
        a, dy = A(0.1); t.tracked((540, 270), "¿QUIÉN FUE?", FTAG, GREY, a, track=6, anchor="m")
        wrap_center(t, ["COREA DEL NORTE"], 360, FH, WHITE, lt, 1.6, dur, 100)
        a, dy = A(2.0); t.text((540, 450), "Grupo TraderTraitor (Lazarus)", FS, GOLD, a, anchor="mm", dy=dy)
        a, _ = A(3.0); chip(t, d, 540, 1330, "TRM Labs · \"alta confianza\"", FSm, WHITE, a)
        a, _ = A(3.5); chip(t, d, 540, 1420, "Chainalysis · \"probable\"", FSm, WHITE, a)
        a, dy = A(4.3); t.text((540, 1520), "Binance y el FBI todavía no lo confirmaron", FXS, GREY, a, anchor="mm", dy=dy)
    elif name == "money":
        a, dy = A(0.1); t.text((540, 340), "¿DÓNDE ESTÁ LA PLATA?", FH2, WHITE, a, anchor="mm", dy=dy)
        a, dy = A(1.2)
        t.text((295, 740), "~US$ 3.000 M", FM, ICE, a, anchor="mm", dy=dy)
        t.text((295, 800), "CONGELADOS", FTAG, ICE, a, anchor="mm", dy=dy)
        a, dy = A(1.6)
        t.text((785, 720), "US$ 2.400–3.200 M", FMs, GOLD2, a, anchor="mm", dy=dy)
        t.text((785, 780), "SIGUEN LIBRES", FTAG, GOLD2, a, anchor="mm", dy=dy)
        a, dy = A(2.6); t.text((540, 1420), "Tether, Circle, Ripple y Paxos bloquearon fondos", FXS, WHITE, a, anchor="mm", dy=dy)
        a, dy = A(3.2); t.text((540, 1480), "El BTC quedó repartido en 19 billeteras", FXS, GREY, a, anchor="mm", dy=dy)
    elif name == "market":
        a, dy = A(0.1); t.tracked((540, 270), "IMPACTO EN EL MERCADO", FTAG, GREY, a, track=6, anchor="m")
        wrap_center(t, ["BITCOIN SE HUNDIÓ"], 360, FH, WHITE, lt, 0.2, dur, 100)
        a, dy = A(1.4); t.text((540, 470), "a US$ 76.400 · mínimo desde el 18/9", FS, RED, a, anchor="mm", dy=dy)
        stats = [("US$ 1.570 M", "liquidados"), ("BNB −8%", "a ~US$ 693")]
        for j, (big, sm) in enumerate(stats):
            a, dy = A(2.6 + j * 0.6)
            x = 300 + j * 480
            t.text((x, 1380), big, FM, WHITE, a, anchor="mm", dy=dy)
            t.text((x, 1440), sm, FSm, GREY, a, anchor="mm", dy=dy)
    elif name == "lesson":
        a, dy = A(0.1); t.tracked((540, 270), "LO QUE TENÉS QUE SABER", FTAG, GOLD, a, track=6, anchor="m")
        wrap_center(t, ["NO SON TUS CLAVES,", "NO SON TUS MONEDAS"], 360, FH2, WHITE, lt, 0.2, dur, 92)
        pts = [("Binance cubre las pérdidas: fondo propio de US$ 6.340 M", GREEN),
               ("Retiros pausados unas 45 h · depósitos funcionan", GOLD2),
               ("Lo que no usás para operar → a tu wallet propia", WHITE)]
        for j, (s, c) in enumerate(pts):
            a, dy = A(1.6 + j * 1.1)
            y = 1340 + j * 66
            if a > 0:
                d.ellipse((92, y - 9 + dy, 110, y + 9 + dy), fill=c + (int(255 * a),))
            t.text((132, y), s, FXS, WHITE, a, anchor="lm", dy=dy)
    elif name == "cta":
        pass

def frame(i, lt):
    P, C = particles(i, lt)
    img = BG + splat(P, C)
    # cta fade to black in last 0.4s handled by nothing (hold)
    base = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).convert("RGBA")
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    overlay(i, lt, d, T(d))
    name, dur = SCENES[i][0], SCENES[i][1]
    if name == "nets":
        CTAX.mid(ov, d, lt, dur)
    elif name == "cta":
        CTAX.end(ov, d, STARTS[i] + lt, lt, dur)
    return Image.alpha_composite(base, ov).convert("RGB")

def render_scene(i):
    name, dur = SCENES[i][0], SCENES[i][1]
    od = BASE_OUT + "_" + VAR if name in ("nets", "cta") else BASE_OUT
    tmp = os.path.join(od, f"{i:02d}_{name}.tmp.mp4")
    fin = os.path.join(od, f"{i:02d}_{name}.mp4")
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
                          "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264",
                          "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", tmp],
                         stdin=subprocess.PIPE)
    n = int(round(dur * FPS))
    for f in range(n):
        p.stdin.write(frame(i, f / FPS).tobytes())
    p.stdin.close()
    if p.wait() == 0:
        os.replace(tmp, fin)

if __name__ == "__main__":
    if sys.argv[1] == "still":
        i, lt = int(sys.argv[2]), float(sys.argv[3])
        frame(i, lt).save(os.path.join(OUT, f"still_{i}_{lt}.jpg"), quality=88)
    else:
        for a in sys.argv[2:]:
            render_scene(int(a))
