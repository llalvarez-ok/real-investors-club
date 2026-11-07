#!/usr/bin/env python3
"""Estadísticas de YouTube e Instagram para la pestaña «Estadísticas» de la Central RIC.

    python herramientas/estadisticas_ric.py [--dias 28]

Escribe en datos/central/estadisticas/ un JSON de filas por fuente (los lee la Central):
  yt_diario.json        vistas, minutos y suscriptores por día y por tipo (Short, largo, vivo)
  yt_videos.json        cada video: vistas, minutos, % visto, suscriptores ganados (período y desde siempre)
  yt_trafico.json       de dónde llegan las vistas, por tipo de video
  yt_retencion.json     curva de retención de los videos largos con 30 vistas o más (desde siempre)
  yt_audiencia.json     países, edad y género, y suscriptos contra no suscriptos
  ig_diario.json        alcance y seguidores ganados por día
  ig_publicaciones.json cada publicación: alcance, vistas, interacciones, guardados, % que se va a los 3 s…
  ig_audiencia.json     países, edad y género de seguidores y de quienes interactúan; alcance por formato y tipo
  resumen.json          los totales del período, con el período anterior al lado cuando la API lo da
  diagnostico.json      qué está fallando y qué hacer, calculado con reglas fijas sobre los datos de arriba
Después se suben a la Central como assets (ver datos/central/LEEME.md, «Estadísticas»).
No imprime respuestas de las API (tienen tokens). Solo datos agregados: ningún nombre de usuario.
"""
import datetime as dt
import json
import os
import re
import statistics
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(RAIZ, "datos", "central", "estadisticas")
ART = dt.timezone(dt.timedelta(hours=-3))
DIAS = int(sys.argv[sys.argv.index("--dias") + 1]) if "--dias" in sys.argv else 28
HOY = dt.datetime.now(ART).date()
FIN = HOY - dt.timedelta(days=1)            # Analytics llega con uno o dos días de atraso
INI = FIN - dt.timedelta(days=DIAS - 1)
INI_ANT, FIN_ANT = INI - dt.timedelta(days=DIAS), INI - dt.timedelta(days=1)
NACIMIENTO = "2026-04-19"
TIPOS = {"shorts": "Short", "videoOnDemand": "Largo", "liveStream": "Vivo"}
TRAFICO = {"SHORTS": "Feed de Shorts", "SUBSCRIBER": "Suscriptores", "YT_SEARCH": "Búsqueda de YouTube",
           "RELATED_VIDEO": "Videos sugeridos", "YT_CHANNEL": "Página del canal", "EXT_URL": "Links externos",
           "NO_LINK_OTHER": "Directo o desconocido", "YT_OTHER_PAGE": "Otras páginas de YouTube", "PLAYLIST": "Playlists",
           "NOTIFICATION": "Notificaciones", "END_SCREEN": "Pantalla final", "HASHTAGS": "Hashtags",
           "SOUND_PAGE": "Página del sonido", "ANNOTATION": "Tarjetas", "CAMPAIGN_CARD": "Tarjetas de campaña",
           "LIVE_REDIRECT": "Redirección del vivo", "BROWSE": "Inicio de YouTube", "PRODUCT_PAGE": "Página de producto",
           "SHORTS_CONTENT_LINKS": "Links desde Shorts", "VIDEO_REMIXES": "Remixes"}


def escribir(nombre, filas):
    os.makedirs(DIR, exist_ok=True)
    with open(os.path.join(DIR, nombre), "w", encoding="utf-8") as f:
        json.dump(filas, f, ensure_ascii=False, indent=1)
    print(f"  {nombre}: {len(filas) if isinstance(filas, list) else 1} filas")


# ---------------- YouTube ----------------
def yt_token():
    d = urllib.parse.urlencode({"client_id": os.environ["RIC_YT_CLIENT_ID"], "client_secret": os.environ["RIC_YT_CLIENT_SECRET"],
                                "refresh_token": os.environ["RIC_YT_REFRESH_TOKEN"], "grant_type": "refresh_token"}).encode()
    return json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", d))["access_token"]


YTK = yt_token()


def yget(url, **p):
    r = urllib.request.Request(url + "?" + urllib.parse.urlencode(p), headers={"Authorization": "Bearer " + YTK})
    return json.load(urllib.request.urlopen(r))


def informe(ini, fin, **p):
    try:
        r = yget("https://youtubeanalytics.googleapis.com/v2/reports", ids="channel==MINE", startDate=str(ini), endDate=str(fin), **p)
    except urllib.error.HTTPError as e:
        print("  aviso: Analytics no respondió", p.get("dimensions"), e.code)
        return []
    cols = [h["name"] for h in r["columnHeaders"]]
    return [dict(zip(cols, f)) for f in r.get("rows", [])]


def segundos(iso):
    m = re.match(r"P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", iso)
    d, h, mi, s = [int(x or 0) for x in m.groups()]
    return d * 86400 + h * 3600 + mi * 60 + s


def videos_del_canal():
    Y = "https://www.googleapis.com/youtube/v3/"
    subidas = yget(Y + "channels", part="contentDetails", mine="true")["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]
    ids, pag = [], None
    while True:
        kw = dict(part="contentDetails", playlistId=subidas, maxResults=50)
        if pag:
            kw["pageToken"] = pag
        r = yget(Y + "playlistItems", **kw)
        ids += [x["contentDetails"]["videoId"] for x in r["items"]]
        pag = r.get("nextPageToken")
        if not pag:
            break
    vids = {}
    for i in range(0, len(ids), 50):
        for v in yget(Y + "videos", part="snippet,status,contentDetails,statistics,liveStreamingDetails", id=",".join(ids[i:i + 50]))["items"]:
            vids[v["id"]] = v
    return vids


def tipo_video(v):
    if v.get("liveStreamingDetails"):
        return "Vivo"
    return "Short" if segundos(v["contentDetails"]["duration"]) <= 180 else "Largo"


def youtube():
    print("YouTube…")
    vids = videos_del_canal()
    met = "views,estimatedMinutesWatched,subscribersGained,subscribersLost"

    # Diario por tipo
    diario = {}
    for r in informe(INI, FIN, metrics="views,estimatedMinutesWatched", dimensions="day,creatorContentType"):
        d = diario.setdefault(r["day"], {"dia": r["day"]})
        t = TIPOS.get(r["creatorContentType"], "Otro")
        d["vistas_" + t.lower()] = d.get("vistas_" + t.lower(), 0) + r["views"]
        d["minutos_" + t.lower()] = d.get("minutos_" + t.lower(), 0) + r["estimatedMinutesWatched"]
    for r in informe(INI, FIN, metrics=met, dimensions="day"):
        d = diario.setdefault(r["day"], {"dia": r["day"]})
        d.update(vistas=r["views"], minutos=r["estimatedMinutesWatched"], subs_ganados=r["subscribersGained"],
                 subs_perdidos=r["subscribersLost"])
    filas = []
    dia = INI
    while dia <= FIN:
        d = diario.get(str(dia), {"dia": str(dia)})
        for k in ("vistas", "minutos", "subs_ganados", "subs_perdidos", "vistas_short", "vistas_largo", "vistas_vivo",
                  "minutos_short", "minutos_largo", "minutos_vivo"):
            d.setdefault(k, 0)
        filas.append(d)
        dia += dt.timedelta(days=1)
    while filas and not any(filas[-1][k] for k in ("vistas", "minutos", "subs_ganados")):
        filas.pop()                         # días que Analytics todavía no cargó (llega con 2 o 3 días de atraso)
    escribir("yt_diario.json", filas)

    # Videos: período y desde siempre
    mv = "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained,likes,comments,shares"
    per = {r["video"]: r for r in informe(INI, FIN, metrics=mv, dimensions="video", sort="-views", maxResults=200)}
    tot = {r["video"]: r for r in informe(NACIMIENTO, FIN, metrics=mv, dimensions="video", sort="-views", maxResults=200)}
    filas = []
    for vid, v in vids.items():
        if v["status"]["privacyStatus"] == "private" and vid not in tot:
            continue
        p, t = per.get(vid, {}), tot.get(vid, {})
        vt = t.get("views", int(v.get("statistics", {}).get("viewCount", 0)))
        filas.append({
            "id": vid, "titulo": v["snippet"]["title"], "tipo": tipo_video(v),
            "publicado": (v["snippet"].get("publishedAt") or "")[:10], "privacidad": v["status"]["privacyStatus"],
            "duracion_s": segundos(v["contentDetails"]["duration"]),
            "vistas": p.get("views", 0), "minutos": p.get("estimatedMinutesWatched", 0),
            "pct_visto": round(p.get("averageViewPercentage", 0), 1), "seg_vistos": p.get("averageViewDuration", 0),
            "subs": p.get("subscribersGained", 0), "likes": p.get("likes", 0), "comentarios": p.get("comments", 0),
            "vistas_total": vt, "minutos_total": t.get("estimatedMinutesWatched", 0),
            "pct_visto_total": round(t.get("averageViewPercentage", 0), 1), "subs_total": t.get("subscribersGained", 0),
            "subs_cada_mil": round(t.get("subscribersGained", 0) * 1000 / vt, 1) if vt else 0,
        })
    filas.sort(key=lambda x: -x["vistas_total"])
    escribir("yt_videos.json", filas)
    videos = filas

    # Tráfico por tipo
    filas = []
    for r in informe(INI, FIN, metrics="views,estimatedMinutesWatched", dimensions="creatorContentType,insightTrafficSourceType"):
        filas.append({"tipo": TIPOS.get(r["creatorContentType"], "Otro"), "fuente": TRAFICO.get(r["insightTrafficSourceType"], r["insightTrafficSourceType"]),
                      "vistas": r["views"], "minutos": r["estimatedMinutesWatched"]})
    filas.sort(key=lambda x: -x["vistas"])
    escribir("yt_trafico.json", filas)
    trafico = filas

    # Retención de los largos
    filas = []
    for v in videos:
        if v["tipo"] == "Short" or v["vistas_total"] < 30:
            continue
        for r in informe(NACIMIENTO, FIN, metrics="audienceWatchRatio,relativeRetentionPerformance",
                         dimensions="elapsedVideoTimeRatio", filters="video==" + v["id"]):
            filas.append({"video": v["id"], "titulo": v["titulo"], "duracion_s": v["duracion_s"],
                          "x": round(r["elapsedVideoTimeRatio"], 2), "segundo": round(r["elapsedVideoTimeRatio"] * v["duracion_s"]),
                          "retencion": round(r["audienceWatchRatio"] * 100, 1),
                          "relativa": round(r.get("relativeRetentionPerformance", 0), 2)})
    escribir("yt_retencion.json", filas)
    retencion = filas

    # Audiencia
    filas = []
    paises = informe(INI, FIN, metrics="views", dimensions="country", sort="-views", maxResults=10)
    for r in paises:
        filas.append({"grupo": "País", "valor": r["country"], "pct": r["views"], "medida": "vistas"})
    tot_p = sum(r["pct"] for r in filas) or 1
    for r in filas:
        r["pct"] = round(r["pct"] * 100 / tot_p, 1)
    edades = {}
    for r in informe(INI, FIN, metrics="viewerPercentage", dimensions="ageGroup,gender"):
        edades[r["ageGroup"]] = edades.get(r["ageGroup"], 0) + r["viewerPercentage"]
        filas.append({"grupo": "Género", "valor": r["gender"], "pct": r["viewerPercentage"], "medida": "% de espectadores"})
    gen = {}
    for r in [f for f in filas if f["grupo"] == "Género"]:
        gen[r["valor"]] = gen.get(r["valor"], 0) + r["pct"]
    filas = [f for f in filas if f["grupo"] != "Género"]
    for g, p in gen.items():
        filas.append({"grupo": "Género", "valor": {"male": "Hombres", "female": "Mujeres"}.get(g, "Otro"), "pct": round(p, 1), "medida": "% de espectadores"})
    for e, p in sorted(edades.items()):
        filas.append({"grupo": "Edad", "valor": e.replace("age", ""), "pct": round(p, 1), "medida": "% de espectadores"})
    sus = informe(INI, FIN, metrics="views", dimensions="subscribedStatus")
    ts = sum(r["views"] for r in sus) or 1
    for r in sus:
        filas.append({"grupo": "Suscripto", "valor": "Suscriptos" if r["subscribedStatus"] == "SUBSCRIBED" else "No suscriptos",
                      "pct": round(r["views"] * 100 / ts, 1), "medida": "% de vistas"})
    escribir("yt_audiencia.json", filas)

    # Totales del período y del anterior
    act = (informe(INI, FIN, metrics=met) or [{}])[0]
    ant = (informe(INI_ANT, FIN_ANT, metrics=met) or [{}])[0]
    min_largos_12m = sum(r["estimatedMinutesWatched"] for r in informe(FIN - dt.timedelta(days=364), FIN,
                         metrics="estimatedMinutesWatched", dimensions="creatorContentType") if r["creatorContentType"] != "shorts")
    canal = yget("https://www.googleapis.com/youtube/v3/channels", part="statistics", mine="true")["items"][0]["statistics"]
    largo_per = sum(d["minutos_largo"] + d["minutos_vivo"] for d in diario.values() if "minutos_largo" in d or "minutos_vivo" in d)
    return dict(vids=videos, trafico=trafico, retencion=retencion, act=act, ant=ant, min_largos_12m=min_largos_12m,
                canal=canal, largo_per=largo_per)


# ---------------- Instagram ----------------
IGT = os.environ.get("RIC_IG_TOKEN_IG") or os.environ.get("RIC_IG_TOKEN")
IGU = os.environ.get("RIC_IG_USER_ID")
IGB = "https://graph.instagram.com/v21.0/" if (IGT or "").startswith("IGAA") else "https://graph.facebook.com/v21.0/"


def iget(path, **p):
    p["access_token"] = IGT
    try:
        return json.load(urllib.request.urlopen(IGB + path + "?" + urllib.parse.urlencode(p), timeout=60))
    except urllib.error.HTTPError as e:
        try:
            return {"error": json.load(e).get("error", {}).get("message", "")}
        except Exception:
            return {"error": str(e.code)}
    except Exception as e:
        return {"error": type(e).__name__}


def desglose(r):
    try:
        res = r["data"][0]["total_value"]["breakdowns"][0]["results"]
    except (KeyError, IndexError):
        return {}
    return {"/".join(x["dimension_values"]): x["value"] for x in res}


def totales(since, until):
    r = iget(IGU + "/insights", metric="reach,views,accounts_engaged,total_interactions,likes,comments,shares,saves,profile_links_taps",
             period="day", metric_type="total_value", since=since, until=until)
    out = {x["name"]: x.get("total_value", {}).get("value") for x in r.get("data", [])}
    pv = iget(IGU + "/insights", metric="profile_views", period="day", metric_type="total_value", since=since, until=until)
    if pv.get("data"):
        out["profile_views"] = pv["data"][0].get("total_value", {}).get("value")
    ab = desglose(iget(IGU + "/insights", metric="follows_and_unfollows", period="day", metric_type="total_value",
                       breakdown="follow_type", since=since, until=until))
    out["seguidores_nuevos"], out["dejaron_de_seguir"] = ab.get("FOLLOWER"), ab.get("NON_FOLLOWER")
    return out


def instagram():
    if not (IGT and IGU):
        print("Instagram: sin credenciales, se omite")
        return None
    print("Instagram…")
    ahora = int(time.time())
    fin = int(dt.datetime.combine(HOY, dt.time(), ART).timestamp())
    ini = fin - DIAS * 86400
    perfil = iget(IGU, fields="username,followers_count,media_count")
    if "error" in perfil:
        print("  la API de Instagram no respondió:", perfil["error"][:80])
        return None

    # Diario
    diario = {}
    for m in ("reach", "follower_count"):
        r = iget(IGU + "/insights", metric=m, period="day", since=max(ini, ahora - 29 * 86400), until=fin)
        for x in (r.get("data") or [{}])[0].get("values", []):
            d = (dt.datetime.fromisoformat(x["end_time"].replace("+0000", "+00:00")).astimezone(ART).date() - dt.timedelta(days=1))
            diario.setdefault(str(d), {"dia": str(d)})[{"reach": "alcance", "follower_count": "seguidores_ganados"}[m]] = x["value"]
    filas = sorted(diario.values(), key=lambda x: x["dia"])
    for f in filas:
        f.setdefault("alcance", 0)
        f.setdefault("seguidores_ganados", 0)
    escribir("ig_diario.json", filas)

    # Publicaciones
    media = iget(IGU + "/media", fields="id,caption,media_type,media_product_type,timestamp,permalink", limit=50).get("data", [])
    pubs = []
    for m in media:
        reel = m["media_product_type"] == "REELS"
        mets = "views,reach,saved,shares,total_interactions,likes,comments"
        mets += ",ig_reels_avg_watch_time,reels_skip_rate" if reel else ",profile_visits,follows"
        r = iget(m["id"] + "/insights", metric=mets)
        i = {x["name"]: x["values"][0]["value"] for x in r.get("data", [])}
        alc = i.get("reach", 0)
        texto = (m.get("caption") or "").split("\n")[0][:90]
        pubs.append({
            "id": m["id"], "fecha": m["timestamp"][:10], "texto": texto, "link": m.get("permalink", ""),
            "formato": {"REELS": "Reel", "FEED": "Carrusel" if m["media_type"] == "CAROUSEL_ALBUM" else "Foto"}.get(m["media_product_type"], m["media_product_type"].title()),
            "alcance": alc, "vistas": i.get("views", 0), "likes": i.get("likes", 0), "comentarios": i.get("comments", 0),
            "compartidos": i.get("shares", 0), "guardados": i.get("saved", 0), "interacciones": i.get("total_interactions", 0),
            "pct_interaccion": round(i.get("total_interactions", 0) * 100 / alc, 1) if alc else 0,
            "seg_vistos": round(i["ig_reels_avg_watch_time"] / 1000, 1) if i.get("ig_reels_avg_watch_time") else None,
            "pct_salta_3s": i.get("reels_skip_rate"),
            "visitas_perfil": i.get("profile_visits"), "seguidores": i.get("follows"),
        })
    escribir("ig_publicaciones.json", pubs)

    # Audiencia
    filas = []
    for metrica, quien in (("follower_demographics", "Seguidores"), ("engaged_audience_demographics", "Interactúan")):
        for b, grupo in (("country", "País"), ("age", "Edad"), ("gender", "Género")):
            d = desglose(iget(IGU + "/insights", metric=metrica, period="lifetime", metric_type="total_value",
                              timeframe="this_month", breakdown=b))
            t = sum(d.values()) or 1
            top = sorted(d.items(), key=lambda x: -x[1])[:10 if b == "country" else 12]
            for k, v in top:
                filas.append({"quien": quien, "grupo": grupo, "valor": {"M": "Hombres", "F": "Mujeres", "U": "Sin dato"}.get(k, k),
                              "cuentas": v, "pct": round(v * 100 / t, 1)})
    rango = dict(period="day", metric_type="total_value", since=ini, until=fin)
    for b, grupo, nombres in (("follow_type", "Alcance por tipo de cuenta", {"FOLLOWER": "Seguidores", "NON_FOLLOWER": "No seguidores", "UNKNOWN": "Sin dato"}),
                              ("media_product_type", "Alcance por formato", {"REEL": "Reels", "POST": "Publicaciones", "CAROUSEL_CONTAINER": "Carruseles", "STORY": "Historias", "AD": "Anuncios"})):
        d = desglose(iget(IGU + "/insights", metric="reach", breakdown=b, **rango))
        t = sum(d.values()) or 1
        for k, v in sorted(d.items(), key=lambda x: -x[1]):
            filas.append({"quien": "Alcance", "grupo": grupo, "valor": nombres.get(k, k.title()), "cuentas": v, "pct": round(v * 100 / t, 1)})
    escribir("ig_audiencia.json", filas)

    return dict(perfil=perfil, act=totales(ini, fin), ant=totales(ini - DIAS * 86400, ini), pubs=pubs, audiencia=filas)


# ---------------- Resumen y diagnóstico ----------------
def coma(x, d=1):
    return f"{x:,.{d}f}".replace(",", "X").replace(".", ",").replace("X", ".")


def mediana(xs):
    xs = [x for x in xs if x is not None]
    return statistics.median(xs) if xs else None


def main():
    yt = youtube()
    ig = instagram()
    periodo = f"{INI.strftime('%d/%m')} al {FIN.strftime('%d/%m/%Y')}"
    res = []

    def fila(plat, id_, metrica, valor, anterior=None, meta=None, nota=""):
        res.append({"id": id_, "plataforma": plat, "metrica": metrica, "valor": valor, "anterior": anterior, "meta": meta,
                    "periodo": periodo, "nota": nota})

    a, b = yt["act"], yt["ant"]
    fila("YouTube", "yt_suscriptores", "Suscriptores", int(yt["canal"]["subscriberCount"]), meta=1000)
    fila("YouTube", "yt_horas", "Horas de largos y vivos (12 meses)", round(yt["min_largos_12m"] / 60, 1), meta=4000,
         nota="Los minutos de los Shorts no cuentan para monetizar")
    fila("YouTube", "yt_vistas", "Vistas", a.get("views", 0), b.get("views"))
    fila("YouTube", "yt_minutos", "Minutos vistos", a.get("estimatedMinutesWatched", 0), b.get("estimatedMinutesWatched"))
    fila("YouTube", "yt_subs_netos", "Suscriptores netos", a.get("subscribersGained", 0) - a.get("subscribersLost", 0),
         (b.get("subscribersGained", 0) - b.get("subscribersLost", 0)) if b else None)
    if ig:
        p, ia, ib = ig["perfil"], ig["act"], ig["ant"]
        neto = lambda t: (t.get("seguidores_nuevos") or 0) - (t.get("dejaron_de_seguir") or 0) if t.get("seguidores_nuevos") is not None else None
        fila("Instagram", "ig_seguidores", "Seguidores", p.get("followers_count"))
        fila("Instagram", "ig_alcance", "Cuentas alcanzadas", ia.get("reach"), ib.get("reach"))
        fila("Instagram", "ig_interacciones", "Interacciones", ia.get("total_interactions"), ib.get("total_interactions"))
        fila("Instagram", "ig_visitas", "Visitas al perfil", ia.get("profile_views"), ib.get("profile_views"))
        fila("Instagram", "ig_links", "Toques en el link de la bio", ia.get("profile_links_taps"), ib.get("profile_links_taps"))
        fila("Instagram", "ig_netos", "Seguidores netos", neto(ia), neto(ib))
    escribir("resumen.json", res)

    # Diagnóstico con reglas fijas
    diag = []

    def regla(plat, estado, hallazgo, dato, que_hacer):
        diag.append({"orden": len(diag) + 1, "plataforma": plat, "estado": estado, "hallazgo": hallazgo, "dato": dato, "que_hacer": que_hacer})

    vids = yt["vids"]
    vt = a.get("views", 0) or 1
    vs = sum(v["vistas"] for v in vids if v["tipo"] == "Short")
    ritmo_h_mes = yt["largo_per"] / 60 * 30 / DIAS
    faltan = 4000 - yt["min_largos_12m"] / 60
    regla("YouTube", "mal" if ritmo_h_mes < 100 else "atencion",
          "Las horas para monetizar avanzan muy lento",
          f"{coma(ritmo_h_mes, 0)} h por mes en largos y vivos; faltan {coma(faltan, 0)} h",
          "Los vivos largos son lo que más horas suma: transmitir y dejar público cada vivo y el curso del 16/11, con capítulos.")
    regla("YouTube", "atencion" if vs * 100 / vt > 70 else "bien",
          "Casi todas las vistas son de Shorts" if vs * 100 / vt > 70 else "Las vistas están repartidas",
          f"{vs * 100 / vt:.0f} % de las vistas del período vienen de Shorts",
          "Cada Short tiene que mandar a un largo: video relacionado en Studio y comentario fijado con el link.")
    def conv(tipos):
        vv = [v for v in vids if v["tipo"] in tipos]
        n = sum(v["vistas_total"] for v in vv)
        return sum(v["subs_total"] for v in vv) * 1000 / n if n else None
    cs, cl = conv(("Short",)), conv(("Largo", "Vivo"))
    if cs is not None and cl is not None:
        regla("YouTube", "atencion", "Qué formato trae más suscriptores",
              f"Shorts: {coma(cs)} y largos y vivos: {coma(cl)} suscriptores cada 1.000 vistas (desde que se abrió el canal)",
              "Repetir el formato que más convierte y pedir la suscripción tarde, después de dar valor.")
    t_largo = [t for t in yt["trafico"] if t["tipo"] in ("Largo", "Vivo")]
    tl = sum(t["vistas"] for t in t_largo) or 1
    busq = sum(t["vistas"] for t in t_largo if t["fuente"] in ("Búsqueda de YouTube", "Videos sugeridos", "Inicio de YouTube"))
    regla("YouTube", "mal" if busq * 100 / tl < 30 else "atencion" if busq * 100 / tl < 50 else "bien",
          "YouTube casi no recomienda los largos" if busq * 100 / tl < 30 else "Recomendación de los largos",
          f"{busq * 100 / tl:.0f} % de las vistas de largos vienen de búsqueda, sugeridos o inicio",
          "Títulos con lo que la gente busca (ric-empaque) y miniaturas con una sola idea; capítulos en todos los largos.")
    largos = [v for v in vids if v["tipo"] == "Largo" and v["vistas_total"] >= 30]
    pv = mediana([v["pct_visto_total"] for v in largos])
    if pv is not None:
        regla("YouTube", "mal" if pv < 30 else "atencion" if pv < 45 else "bien",
              "Los largos se ven poco" if pv < 30 else "Cuánto se ven los largos",
              f"Mediana de {pv:.0f} % visto en los {len(largos)} largos con 30 vistas o más",
              "Ver dónde se va la gente con ric-retencion y cortar las explicaciones largas en la edición.")
    fuga = []
    for vid in {r["video"] for r in yt["retencion"]}:
        curva = sorted([r for r in yt["retencion"] if r["video"] == vid], key=lambda r: r["x"])
        if curva and curva[0]["duracion_s"] > 60:
            en30 = min(curva, key=lambda r: abs(r["segundo"] - 30))
            fuga.append(100 - en30["retencion"])
    if fuga:
        f = mediana(fuga)
        regla("YouTube", "mal" if f > 40 else "atencion" if f > 25 else "bien",
              "El gancho de los largos pierde mucha gente" if f > 25 else "El gancho de los largos funciona",
              f"Se va el {f:.0f} % en los primeros 30 segundos (mediana de {len(fuga)} largos)",
              "Arrancar con la fórmula «Dos vidas» o el detalle cotidiano de diseno/ganchos.json; nada de presentaciones.")

    if ig:
        pubs, ia = ig["pubs"], ig["act"]
        reels = [x for x in pubs if x["formato"] == "Reel" and x["pct_salta_3s"] is not None]
        sk = mediana([x["pct_salta_3s"] for x in reels[:10]])
        if sk is not None:
            regla("Instagram", "mal" if sk > 50 else "atencion" if sk > 35 else "bien",
                  "Los Reels pierden a la gente en los primeros 3 segundos" if sk > 35 else "El arranque de los Reels funciona",
                  f"Mediana de {sk:.0f} % que se va antes de los 3 s (últimos {len(reels[:10])} Reels)",
                  "Gancho visible desde el cuadro 0 y la voz en el segundo 0; Lean a cámara rinde más que los Reels de noticias.")
        vis, lk = ia.get("profile_views") or 0, ia.get("profile_links_taps") or 0
        regla("Instagram", "mal" if vis and lk * 100 / vis < 3 else "bien",
              "El perfil no convierte visitas en clics" if vis and lk * 100 / vis < 3 else "El link de la bio funciona",
              f"{vis} visitas al perfil y {lk} toques en el link",
              "Bio con una sola promesa y un solo destino (el curso del 16/11) y 3 publicaciones fijadas que lo expliquen.")
        aud = {x["valor"]: x for x in ig["audiencia"] if x["grupo"] == "Alcance por tipo de cuenta"}
        ns = aud.get("No seguidores", {}).get("pct")
        nuevos = ia.get("seguidores_nuevos")
        if ns is not None:
            regla("Instagram", "mal" if ns > 70 and (nuevos or 0) < 30 else "atencion",
                  "Llegás a gente nueva pero no te sigue" if ns > 70 else "Alcance entre seguidores y no seguidores",
                  f"{ns:.0f} % del alcance son no seguidores; {nuevos if nuevos is not None else '¿?'} seguidores nuevos y "
                  f"{ia.get('dejaron_de_seguir') if ia.get('dejaron_de_seguir') is not None else '¿?'} bajas en el período",
                  "Cerrar cada Reel con un motivo para seguir (qué vas a encontrar acá) y una serie fija que se repita.")
        car = [x for x in pubs if x["formato"] == "Carrusel"][:6]
        if car:
            gs = sum(x["guardados"] + x["compartidos"] for x in car)
            ac = sum(x["alcance"] for x in car) or 1
            regla("Instagram", "mal" if gs * 100 / ac < 2 else "atencion" if gs * 100 / ac < 5 else "bien",
                  "Los carruseles no se guardan ni se comparten" if gs * 100 / ac < 5 else "Los carruseles circulan",
                  f"{gs} guardados y compartidos sobre {coma(ac, 0)} cuentas alcanzadas en los últimos {len(car)} carruseles",
                  "Carruseles solo para datos que sirvan de referencia (algo para guardar), con la portada como gancho.")
        if pubs:
            alc = [x["alcance"] for x in pubs[:20]]
            m = mediana(alc) or 1
            mejor = max(pubs[:20], key=lambda x: x["alcance"])
            regla("Instagram", "bien", "La publicación que más funcionó",
                  f"«{mejor['texto'][:60]}» ({mejor['formato']}, {mejor['fecha'][8:10]}/{mejor['fecha'][5:7]}): {coma(mejor['alcance'], 0)} cuentas, "
                  f"{coma(mejor['alcance'] / m)} veces la mediana",
                  "Sacar una continuación con el mismo formato y la misma voz.")
    escribir("diagnostico.json", diag)


if __name__ == "__main__":
    main()
