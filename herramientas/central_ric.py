#!/usr/bin/env python3
"""Datos de la Central RIC (dashboard de agentes: https://claude.ai/artifact/Q21K4SwkZ9arx72G6cqrjv).

    python herramientas/central_ric.py

Escribe en datos/central/:
  kpis.json        suscriptores, horas de videos largos (12 meses), vistas y seguidores de Instagram (API)
  videos.json      los videos públicos con más vistas (API de YouTube)
  calendario.json  lo publicado en los últimos 7 días y lo programado (API de YouTube) + datos/central/eventos.json (a mano: vivos, Reels)
Los agentes (agentes.json) y las decisiones pendientes (pendientes.json) se editan a mano en la misma carpeta.
Después, cada archivo se sube a la Central (ver datos/central/LEEME.md). No imprime respuestas de las API (tienen tokens).
"""
import datetime as dt
import json
import os
import re
import urllib.parse
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(RAIZ, "datos", "central")
ART = dt.timezone(dt.timedelta(hours=-3))
AHORA = dt.datetime.now(ART)


def token():
    d = urllib.parse.urlencode({"client_id": os.environ["RIC_YT_CLIENT_ID"], "client_secret": os.environ["RIC_YT_CLIENT_SECRET"],
                                "refresh_token": os.environ["RIC_YT_REFRESH_TOKEN"], "grant_type": "refresh_token"}).encode()
    return json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", d))["access_token"]


TK = token()


def get(url, **p):
    r = urllib.request.Request(url + "?" + urllib.parse.urlencode(p), headers={"Authorization": "Bearer " + TK})
    return json.load(urllib.request.urlopen(r))


def segundos(iso):
    m = re.match(r"P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", iso)
    d, h, mi, s = [int(x or 0) for x in m.groups()]
    return d * 86400 + h * 3600 + mi * 60 + s


def local(iso):
    return dt.datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(ART)


Y = "https://www.googleapis.com/youtube/v3/"
canal = get(Y + "channels", part="statistics,contentDetails", mine="true")["items"][0]
subidas = canal["contentDetails"]["relatedPlaylists"]["uploads"]
ids, pag = [], None
while True:
    kw = dict(part="contentDetails", playlistId=subidas, maxResults=50)
    if pag:
        kw["pageToken"] = pag
    r = get(Y + "playlistItems", **kw)
    ids += [x["contentDetails"]["videoId"] for x in r["items"]]
    pag = r.get("nextPageToken")
    if not pag:
        break
vids = []
for i in range(0, len(ids), 50):
    vids += get(Y + "videos", part="snippet,status,contentDetails,statistics,liveStreamingDetails", id=",".join(ids[i:i + 50]))["items"]

# Horas de reproducción de videos largos (más de 60 s) en los últimos 365 días, de Analytics
fin, ini = AHORA.date(), AHORA.date() - dt.timedelta(days=365)
an = get("https://youtubeanalytics.googleapis.com/v2/reports", ids="channel==MINE", startDate=str(ini), endDate=str(fin),
         metrics="estimatedMinutesWatched", dimensions="video", maxResults=200, sort="-estimatedMinutesWatched")
dur = {v["id"]: segundos(v["contentDetails"]["duration"]) for v in vids}
min_largos = sum(m for vid, m in an.get("rows", []) if dur.get(vid, 0) > 60)

ig = {}
tok_ig = os.environ.get("RIC_IG_TOKEN_IG") or os.environ.get("RIC_IG_TOKEN")
if tok_ig and os.environ.get("RIC_IG_USER_ID"):
    base = "https://graph.instagram.com/v21.0/" if tok_ig.startswith("IGAA") else "https://graph.facebook.com/v21.0/"
    try:
        ig = json.load(urllib.request.urlopen(base + os.environ["RIC_IG_USER_ID"] + "?" + urllib.parse.urlencode(
            {"fields": "followers_count,media_count", "access_token": tok_ig})))
    except Exception as e:  # sin detalles: la URL lleva el token
        print("Instagram no respondió:", type(e).__name__)

hoy = AHORA.strftime("%Y-%m-%d %H:%M")
st = canal["statistics"]
kpis = [
    {"id": "suscriptores", "metrica": "Suscriptores de YouTube", "valor": int(st["subscriberCount"]), "meta": 1000, "fecha": hoy},
    {"id": "horas", "metrica": "Horas de videos largos (12 meses)", "valor": round(min_largos / 60, 1), "meta": 4000, "fecha": hoy},
    {"id": "vistas", "metrica": "Vistas totales de YouTube", "valor": int(st["viewCount"]), "meta": None, "fecha": hoy},
]
ig_manual = os.path.join(DIR, "instagram.json")  # último dato bueno, por si la API de Instagram no responde
if ig.get("followers_count") is not None:
    json.dump({"valor": int(ig["followers_count"]), "fecha": hoy}, open(ig_manual, "w"))
if os.path.exists(ig_manual):
    m = json.load(open(ig_manual))
    kpis.append({"id": "instagram", "metrica": "Seguidores de Instagram", "valor": m["valor"], "meta": None, "fecha": m["fecha"]})

def tipo(v):
    if v.get("liveStreamingDetails"):
        return "Vivo"
    return "Short" if dur[v["id"]] <= 180 and "#short" in (v["snippet"]["title"] + v["snippet"].get("description", "")).lower() or dur[v["id"]] <= 60 else "Video"

videos = sorted([{"id": v["id"], "titulo": v["snippet"]["title"], "tipo": tipo(v), "vistas": int(v["statistics"].get("viewCount", 0)),
                  "me_gusta": int(v["statistics"].get("likeCount", 0)), "comentarios": int(v["statistics"].get("commentCount", 0)),
                  "publicado": local(v["snippet"]["publishedAt"]).strftime("%Y-%m-%d")}
                 for v in vids if v["status"]["privacyStatus"] == "public" and dur[v["id"]] > 0], key=lambda x: -x["vistas"])[:12]

cal = []
for v in vids:
    s = v["status"]
    if s["privacyStatus"] == "private" and s.get("publishAt"):
        f, estado = local(s["publishAt"]), "programado"
    elif s["privacyStatus"] == "public":
        f, estado = local(v["snippet"]["publishedAt"]), "publicado"
        if f < AHORA - dt.timedelta(days=7) or dur[v["id"]] == 0:
            continue
    else:
        continue
    cal.append({"id": v["id"], "fecha": f.strftime("%Y-%m-%d %H:%M"), "plataforma": "YouTube", "tipo": tipo(v),
                "titulo": v["snippet"]["title"], "estado": estado})
extra = os.path.join(DIR, "eventos.json")
if os.path.exists(extra):
    cal += json.load(open(extra))
cal.sort(key=lambda x: x["fecha"])

for nombre, filas in [("kpis", kpis), ("videos", videos), ("calendario", cal)]:
    json.dump(filas, open(os.path.join(DIR, nombre + ".json"), "w"), ensure_ascii=False, indent=1)
print("Central RIC:", ", ".join(f"{k['metrica']} {k['valor']}" for k in kpis), f"· {len(videos)} videos · {len(cal)} en el calendario")
