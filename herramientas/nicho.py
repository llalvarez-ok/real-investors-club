#!/usr/bin/env python3
"""Qué está funcionando en el nicho de RIC: videos que superaron por mucho a su propio canal.

    python herramientas/nicho.py [--consultas "inversiones para principiantes" "estafas financieras" ...]
                                 [--dias 365] [--min 2] [--top 25] [--salida analisis/nicho.json]

Busca videos en español con la API de YouTube (credenciales RIC_YT_* del entorno), junta los canales que
aparecen, mira los últimos 50 videos de cada uno y calcula cuántas veces cada video superó la MEDIANA de su
canal. Así se compara la idea, no el tamaño del canal: 50.000 vistas en un canal que suele hacer 5.000 dicen
más que 500.000 en uno que suele hacer 400.000.

- Separa videos largos (más de 3 minutos) y Shorts, porque tienen medianas distintas.
- No cuenta videos de menos de 14 días (sus vistas todavía no se asentaron) para la mediana.
- Hace falta un mínimo de 5 videos del mismo tipo por canal; si no, el canal se saltea.
- Para cada video muestra qué fórmula de diseno/ganchos.json usa su título (describe el título, no explica por qué
  funcionó).
Gasta unas 100 unidades de cuota por consulta más ~3 por canal (el límite diario es 10.000).
Idea del múltiplo sobre la mediana: youtube-agent-skill (MIT).
"""
import argparse
import datetime as dt
import json
import os
import re
import statistics
import sys
import urllib.error
import urllib.parse
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gancho import formula  # noqa: E402
import es_texto as es  # noqa: E402

CONSULTAS = ["educación financiera", "inversiones para principiantes", "trading para principiantes",
             "psicología del dinero", "estafas financieras", "cómo invertir mi dinero",
             "finanzas personales", "esquema ponzi"]
Y = "https://www.googleapis.com/youtube/v3/"
# Para listar, el título tiene que ser del tema de RIC (la mediana del canal se calcula con todos sus videos)
TEMA = re.compile(r"dinero|financ|invert|inversi|ahorr|deuda|rico|riqueza|millonari|pobre|trading|trader|bolsa|accion|"
                  r"cripto|bitcoin|estafa|ponzi|piramide|interes|inflacion|presupuesto|sueldo|salario|gast|jubil|"
                  r"negocio|economi|mercado|dolar|libertad financiera|habitos")


def token():
    d = urllib.parse.urlencode({"client_id": os.environ["RIC_YT_CLIENT_ID"], "client_secret": os.environ["RIC_YT_CLIENT_SECRET"],
                                "refresh_token": os.environ["RIC_YT_REFRESH_TOKEN"], "grant_type": "refresh_token"}).encode()
    return json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", d))["access_token"]


def get(t, url, **p):
    r = urllib.request.Request(Y + url + "?" + urllib.parse.urlencode(p, doseq=True), headers={"Authorization": "Bearer " + t})
    try:
        return json.load(urllib.request.urlopen(r))
    except urllib.error.HTTPError as e:
        raise SystemExit(f"Error de la API ({e.code}) en {url}: {e.read().decode()[:300]}")


def segundos(iso):
    m = re.match(r"P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", iso or "")
    d, h, mi, s = (int(x or 0) for x in m.groups()) if m else (0, 0, 0, 0)
    return d * 86400 + h * 3600 + mi * 60 + s


def videos(t, ids):
    out = []
    for i in range(0, len(ids), 50):
        out += get(t, "videos", part="snippet,statistics,contentDetails", id=",".join(ids[i:i + 50]), maxResults=50).get("items", [])
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--consultas", nargs="+", default=CONSULTAS)
    ap.add_argument("--dias", type=int, default=365, help="buscar videos publicados en los últimos N días")
    ap.add_argument("--min", type=float, default=2.0, help="múltiplo mínimo para listar")
    ap.add_argument("--top", type=int, default=25)
    ap.add_argument("--max-canales", type=int, default=60)
    ap.add_argument("--salida")
    ap.add_argument("--todo", action="store_true", help="no filtrar por tema ni por idioma")
    a = ap.parse_args()
    t = token()
    desde = (dt.datetime.now(dt.timezone.utc).replace(tzinfo=None) - dt.timedelta(days=a.dias)).strftime("%Y-%m-%dT00:00:00Z")
    canales = {}
    for q in a.consultas:
        r = get(t, "search", part="snippet", q=q, type="video", relevanceLanguage="es", order="viewCount",
                publishedAfter=desde, maxResults=50)
        for it in r.get("items", []):
            canales.setdefault(it["snippet"]["channelId"], set()).add(q)
        print(f"  «{q}»: {len(r.get('items', []))} videos", file=sys.stderr)
    ids = list(canales)[: a.max_canales]
    info = {}
    for i in range(0, len(ids), 50):
        for c in get(t, "channels", part="snippet,statistics,contentDetails", id=",".join(ids[i:i + 50])).get("items", []):
            info[c["id"]] = c
    hoy = dt.datetime.now(dt.timezone.utc).replace(tzinfo=None)
    filas, salteados = [], []
    for cid, c in info.items():
        subidas = c["contentDetails"]["relatedPlaylists"]["uploads"]
        pl = get(t, "playlistItems", part="contentDetails", playlistId=subidas, maxResults=50).get("items", [])
        vs = videos(t, [x["contentDetails"]["videoId"] for x in pl])
        for tipo, es_tipo in (("largo", lambda s: s > 180), ("short", lambda s: 0 < s <= 180)):
            grupo = [v for v in vs if es_tipo(segundos(v["contentDetails"].get("duration")))]
            asentados = [v for v in grupo if (hoy - dt.datetime.fromisoformat(v["snippet"]["publishedAt"].replace("Z", ""))).days >= 14]
            vistas = [int(v["statistics"].get("viewCount", 0)) for v in asentados]
            if len(vistas) < 5:
                if grupo:
                    salteados.append(f"{c['snippet']['title']} ({tipo}: {len(vistas)} videos)")
                continue
            med = max(statistics.median(vistas), 1)
            for v in asentados:
                vis = int(v["statistics"].get("viewCount", 0))
                titulo = v["snippet"]["title"]
                idioma = (v["snippet"].get("defaultAudioLanguage") or v["snippet"].get("defaultLanguage") or "es")[:2]
                if not a.todo and (idioma != "es" or not TEMA.search(es.sin_tildes(titulo.lower()))):
                    continue
                filas.append({
                    "multiplo": round(vis / med, 1), "vistas": vis, "mediana_canal": int(med), "tipo": tipo,
                    "titulo": titulo, "formula": formula(es.sin_tildes(titulo.lower()))[0],
                    "canal": c["snippet"]["title"], "pais": c["snippet"].get("country", "?"),
                    "suscriptores": int(c["statistics"].get("subscriberCount", 0)),
                    "fecha": v["snippet"]["publishedAt"][:10], "duracion_s": segundos(v["contentDetails"].get("duration")),
                    "url": "https://youtu.be/" + v["id"], "consultas": sorted(canales.get(cid, [])),
                })
    filas.sort(key=lambda f: -f["multiplo"])
    sel = [f for f in filas if f["multiplo"] >= a.min]
    if a.salida:
        json.dump({"fecha": hoy.strftime("%Y-%m-%d"), "consultas": a.consultas, "canales": len(info),
                   "videos": filas, "salteados": salteados}, open(a.salida, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"\n{len(info)} canales, {len(filas)} videos con mediana válida, {len(sel)} con múltiplo ≥ {a.min}\n")
    for tipo in ("largo", "short"):
        top = [f for f in sel if f["tipo"] == tipo][: a.top]
        print(f"== {'Videos largos' if tipo == 'largo' else 'Shorts'} ({len(top)})")
        for f in top:
            print(f"  ×{f['multiplo']:<5} {f['vistas']:>9,} vistas  (mediana {f['mediana_canal']:,}) · {f['canal']} [{f['pais']}, "
                  f"{f['suscriptores']:,} subs] · {f['fecha']}\n         «{f['titulo']}» · {f['formula']}")
        print()
    formulas = {}
    for f in sel:
        formulas[f["formula"]] = formulas.get(f["formula"], 0) + 1
    print("Fórmulas de título entre los que superaron a su canal:",
          ", ".join(f"{k} ({v})" for k, v in sorted(formulas.items(), key=lambda x: -x[1])))


if __name__ == "__main__":
    main()
