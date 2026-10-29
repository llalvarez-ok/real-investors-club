#!/usr/bin/env python3
"""Dónde se va la gente de un video de RIC y qué decía la voz en ese momento.

    python herramientas/retencion.py <id del video> [--tiempos produccion/<id>/tiempos.js] [--json]

Pide a YouTube Analytics (credenciales RIC_YT_* del entorno) la curva de retención del video (100 puntos) y
reporta tres problemas distintos, con arreglos distintos:
  FUGA DEL GANCHO  lo que se pierde en los primeros 30 segundos. Menos de 25 % está bien; si es más, se arregla
                   en los primeros 15 segundos del guion, no en la edición.
  CAÍDAS           bajadas bruscas en un punto. Son un momento: un cambio de tema sin aviso, una explicación
                   larga, un bloque que no aporta. Con --tiempos (los de herramientas/tiempos_pizarra.py) dice qué
                   palabras sonaban ahí.
  GOTEO            la pérdida pareja en el medio del video. Es ritmo: se arregla cortando, no reescribiendo.
Con pocas vistas la curva es ruido: el informe avisa si el video tiene menos de 100 vistas.
Idea tomada de youtube-agent-skill (MIT); acá los datos vienen de la API y no de un CSV exportado a mano.
"""
import json
import os
import re
import sys
import urllib.parse
import urllib.request


def token():
    d = urllib.parse.urlencode({"client_id": os.environ["RIC_YT_CLIENT_ID"], "client_secret": os.environ["RIC_YT_CLIENT_SECRET"],
                                "refresh_token": os.environ["RIC_YT_REFRESH_TOKEN"], "grant_type": "refresh_token"}).encode()
    return json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", d))["access_token"]


def get(t, base, **p):
    r = urllib.request.Request(base + "?" + urllib.parse.urlencode(p), headers={"Authorization": "Bearer " + t})
    return json.load(urllib.request.urlopen(r))


def segundos(iso):
    m = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", iso)
    return sum(int(x or 0) * k for x, k in zip(m.groups(), (3600, 60, 1)))


def palabras_en(tiempos, t0, t1):
    if not tiempos:
        return ""
    ps = [p["p"] for e in tiempos["escenas"] for p in e["palabras"] if t0 - 1.5 <= p["t"] <= t1 + 0.5]
    return " ".join(ps[:24])


def escena_en(tiempos, t):
    if not tiempos:
        return None
    for i, e in enumerate(tiempos["escenas"]):
        if e["ini"] <= t < e["ini"] + e["dur"]:
            return i + 1
    return None


def main():
    a = sys.argv[1:]
    if not a:
        print(__doc__)
        sys.exit(1)
    como_json = "--json" in a
    vid = a[0]
    tiempos = None
    if "--tiempos" in a:
        txt = open(a[a.index("--tiempos") + 1], encoding="utf-8").read()
        tiempos = json.loads(txt.split("=", 1)[1].strip().rstrip(";"))
    t = token()
    v = get(t, "https://www.googleapis.com/youtube/v3/videos", part="contentDetails,statistics,snippet", id=vid)["items"][0]
    dur = segundos(v["contentDetails"]["duration"])
    vistas = int(v["statistics"].get("viewCount", 0))
    r = get(t, "https://youtubeanalytics.googleapis.com/v2/reports", ids="channel==MINE", startDate="2026-01-01",
            endDate="2030-12-31", dimensions="elapsedVideoTimeRatio", metrics="audienceWatchRatio,relativeRetentionPerformance",
            filters="video==" + vid)
    filas = r.get("rows", [])
    if not filas:
        print(f"Sin datos de retención todavía para {vid} ({vistas} vistas). Analytics tarda 2 o 3 días.")
        sys.exit(0)
    pts = [(f[0] * dur, f[1] * 100, f[2]) for f in filas]  # segundo, % que sigue, relativo a videos parecidos
    en30 = min(pts, key=lambda p: abs(p[0] - 30))
    fuga = 100 - en30[1]
    caidas = []
    for (s0, r0, _), (s1, r1, _) in zip(pts, pts[1:]):
        if s0 < 10 or s1 > 0.96 * dur:  # el arranque y el cierre no son fugas
            continue
        baja = r0 - r1
        if baja >= 3:
            caidas.append({"desde_s": round(s0), "hasta_s": round(s1), "baja_pp": round(baja, 1),
                           "escena": escena_en(tiempos, s0), "decia": palabras_en(tiempos, s0, s1)})
    caidas.sort(key=lambda c: -c["baja_pp"])
    medio = [p for p in pts if 0.2 * dur <= p[0] <= 0.8 * dur]
    goteo = (medio[0][1] - medio[-1][1]) / max(1, (medio[-1][0] - medio[0][0]) / 60) if len(medio) > 1 else 0
    res = {"video": vid, "titulo": v["snippet"]["title"], "vistas": vistas, "duracion_s": dur,
           "fuga_gancho_pct": round(fuga, 1), "queda_al_final_pct": round(pts[-1][1], 1),
           "relativo_a_30s": round(en30[2], 2), "caidas": caidas[:5], "goteo_pp_por_minuto": round(goteo, 1)}
    if como_json:
        print(json.dumps(res, ensure_ascii=False, indent=1))
        return
    print(f"\n  {res['titulo']}  ({vid}, {vistas} vistas, {dur // 60}:{dur % 60:02})")
    if vistas < 100:
        print("  · menos de 100 vistas: la curva todavía es ruido; tomarlo como pista, no como conclusión")
    print(f"  FUGA DEL GANCHO  {fuga:.0f} % se fue antes de los 30 s  "
          + ("(bien: menos de 25 %)" if fuga < 25 else "(alto: el arreglo está en los primeros 15 s del guion)")
          + f" · frente a videos parecidos: {en30[2]:.2f} (0,5 es la media)")
    print(f"  GOTEO            {goteo:.1f} puntos por minuto en el medio del video")
    print(f"  AL FINAL         sigue el {pts[-1][1]:.0f} %")
    if caidas:
        print("  CAÍDAS (las más grandes)")
        for c in caidas[:5]:
            donde = f" (escena {c['escena']})" if c["escena"] else ""
            print(f"    −{c['baja_pp']} pp entre {c['desde_s'] // 60}:{c['desde_s'] % 60:02} y {c['hasta_s'] // 60}:{c['hasta_s'] % 60:02}"
                  f"{donde}" + (f"\n       decía: «{c['decia']}»" if c["decia"] else ""))
    else:
        print("  CAÍDAS           ninguna de más de 3 puntos")


if __name__ == "__main__":
    main()
