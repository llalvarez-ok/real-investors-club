#!/usr/bin/env python3
"""Datos del canal de RIC para auditarlo, con la API de YouTube y solo lectura.

    python herramientas/auditar_canal.py [salida.json]

Usa RIC_YT_CLIENT_ID, RIC_YT_CLIENT_SECRET y RIC_YT_REFRESH_TOKEN del entorno. Imprime un resumen (videos,
configuración, métricas, fuentes de tráfico y retención) y guarda todas las respuestas en salida.json.
Las métricas de Analytics llegan con 2 o 3 días de atraso.
"""
import datetime
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

INICIO = "2026-04-19"  # creación del canal
Y = "https://www.googleapis.com/youtube/v3/"
A = "https://youtubeanalytics.googleapis.com/v2/reports"


def token():
    datos = urllib.parse.urlencode({
        "client_id": os.environ["RIC_YT_CLIENT_ID"], "client_secret": os.environ["RIC_YT_CLIENT_SECRET"],
        "refresh_token": os.environ["RIC_YT_REFRESH_TOKEN"], "grant_type": "refresh_token"}).encode()
    return json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", datos))["access_token"]


def pedir(t, url, **p):
    r = urllib.request.Request(url + "?" + urllib.parse.urlencode(p), headers={"Authorization": "Bearer " + t})
    try:
        return json.load(urllib.request.urlopen(r))
    except urllib.error.HTTPError as e:
        return {"error": e.code, "detalle": e.read().decode()[:400]}


def segundos(iso):
    m = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", iso)
    return int(m[1] or 0) * 3600 + int(m[2] or 0) * 60 + int(m[3] or 0)


def main():
    t = token()
    hoy = datetime.date.today().isoformat()
    base = dict(ids="channel==MINE", startDate=INICIO, endDate=hoy)
    d = {"canal": pedir(t, Y + "channels", part="snippet,statistics,brandingSettings,status,contentDetails", mine="true")}
    subidas = d["canal"]["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]
    ids = [i["contentDetails"]["videoId"] for i in
           pedir(t, Y + "playlistItems", part="contentDetails", playlistId=subidas, maxResults=50).get("items", [])]
    d["videos"] = pedir(t, Y + "videos", part="snippet,statistics,contentDetails,status", id=",".join(ids))
    d["playlists"] = pedir(t, Y + "playlists", part="snippet,status,contentDetails", mine="true", maxResults=50)
    d["secciones"] = pedir(t, Y + "channelSections", part="snippet", mine="true")
    informes = {
        "por_video": dict(dimensions="video", sort="-views", maxResults=50, metrics="views,estimatedMinutesWatched,"
                          "averageViewPercentage,likes,subscribersGained,subscribersLost,comments"),
        "por_dia": dict(dimensions="day", sort="day", metrics="views,estimatedMinutesWatched,subscribersGained,subscribersLost"),
        "trafico": dict(dimensions="insightTrafficSourceType", sort="-views", metrics="views,estimatedMinutesWatched"),
        "externo": dict(dimensions="insightTrafficSourceDetail", filters="insightTrafficSourceType==EXT_URL",
                        sort="-views", maxResults=25, metrics="views"),
        "busqueda": dict(dimensions="insightTrafficSourceDetail", filters="insightTrafficSourceType==YT_SEARCH",
                         sort="-views", maxResults=25, metrics="views"),
        "pais": dict(dimensions="country", sort="-views", maxResults=15, metrics="views,estimatedMinutesWatched"),
        "dispositivo": dict(dimensions="deviceType", sort="-views", metrics="views"),
        "suscripcion": dict(dimensions="subscribedStatus", metrics="views"),
    }
    for k, p in informes.items():
        d[k] = pedir(t, A, **base, **p)
    for v in ids:
        d["retencion_" + v] = pedir(t, A, **base, dimensions="elapsedVideoTimeRatio", filters="video==" + v,
                                    metrics="audienceWatchRatio,relativeRetentionPerformance")

    if len(sys.argv) > 1:
        json.dump(d, open(sys.argv[1], "w"), ensure_ascii=False, indent=1)

    c = d["canal"]["items"][0]
    print(f"Canal: {c['statistics']['subscriberCount']} suscriptores, {c['statistics']['viewCount']} vistas, "
          f"{c['statistics']['videoCount']} videos")
    ch = c["brandingSettings"]["channel"]
    print(f"  idioma {ch.get('defaultLanguage')}, país {ch.get('country')}, palabras clave {ch.get('keywords')!r}, "
          f"tráiler {ch.get('unsubscribedTrailer')}, secciones {len(d['secciones'].get('items', []))}")
    print("\nVideos (estado, duración, vistas, categoría, idioma, audio, etiquetas, sintético):")
    duracion = {}
    for v in d["videos"]["items"]:
        s, st = v["snippet"], v["status"]
        duracion[v["id"]] = segundos(v["contentDetails"]["duration"])
        estado = st["privacyStatus"] + (f" → {st['publishAt']}" if st.get("publishAt") else "")
        print(f"  {v['id']} {estado:12} {v['contentDetails']['duration']:8} {v['statistics'].get('viewCount', 0):>4} "
              f"cat {s['categoryId']} {s.get('defaultLanguage')} {s.get('defaultAudioLanguage')} "
              f"{len(s.get('tags', []))} {st.get('containsSyntheticMedia')}  {s['title'][:70]}")
    for k in list(informes)[:1] + list(informes)[2:]:
        r = d[k]
        print(f"\n{k}: {[h['name'] for h in r.get('columnHeaders', [])]}" + (f" ERROR {r}" if "error" in r else ""))
        for fila in r.get("rows", []):
            print("  ", fila)
    print("\nRetención (% del público a 30 s, a la mitad; entre paréntesis la relativa a videos parecidos):")
    for v, largo in duracion.items():
        filas = d["retencion_" + v].get("rows", [])
        if not filas:
            continue
        def en(seg):
            f = min(filas, key=lambda x: abs(x[0] - seg / largo))
            return f"{round(f[1] * 100)} % ({f[2]:.2f})"
        print(f"  {v}: 30 s {en(30)}, mitad {en(largo / 2)}")


if __name__ == "__main__":
    main()
