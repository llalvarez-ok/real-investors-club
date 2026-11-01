"""Revisión de @leanalvarez.ok por la API de Meta (solo lectura).

Uso: python herramientas/revisar_instagram.py [salida.json]
Necesita RIC_IG_TOKEN_IG (o RIC_IG_TOKEN) y RIC_IG_USER_ID en el entorno (ver CLAUDE.md).
Imprime un resumen de los últimos 30 días y la tabla de publicaciones; con un
argumento, guarda además todos los datos crudos en ese JSON.
"""
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

G = "https://graph.facebook.com/v21.0/"
T = os.environ.get("RIC_IG_TOKEN_IG") or os.environ["RIC_IG_TOKEN"]
U = os.environ["RIC_IG_USER_ID"]
HISPANOS = {"AR", "CO", "MX", "PE", "VE", "ES", "EC", "CL", "UY", "PY", "BO", "DO",
            "HN", "GT", "SV", "NI", "CR", "PA", "CU", "PR", "US"}


def get(path, **p):
    p["access_token"] = T
    try:
        return json.load(urllib.request.urlopen(G + path + "?" + urllib.parse.urlencode(p)))
    except urllib.error.HTTPError as e:
        return {"error": json.load(e).get("error", {}).get("message")}


def desglose(r):
    try:
        res = r["data"][0]["total_value"]["breakdowns"][0]["results"]
    except (KeyError, IndexError):
        return {}
    return {x["dimension_values"][0]: x["value"] for x in res}


def main():
    now = int(time.time())
    since = now - 30 * 86400 + 3600
    rango = dict(period="day", metric_type="total_value", since=since, until=now)
    datos = {"fecha": time.strftime("%Y-%m-%d")}

    datos["perfil"] = get(U, fields="username,followers_count,follows_count,media_count,biography")
    datos["alcance_por_seguidor"] = desglose(get(U + "/insights", metric="reach", breakdown="follow_type", **rango))
    datos["alcance_por_formato"] = desglose(get(U + "/insights", metric="reach", breakdown="media_product_type", **rango))
    datos["altas_bajas"] = desglose(get(U + "/insights", metric="follows_and_unfollows", breakdown="follow_type", **rango))
    tot = get(U + "/insights", metric="accounts_engaged,total_interactions,likes,comments,shares,saves,replies,profile_links_taps", **rango)
    datos["totales_30d"] = {x["name"]: x.get("total_value", {}).get("value") for x in tot.get("data", [])}
    for b in ("country", "age", "gender"):
        datos["seguidores_" + b] = desglose(get(U + "/insights", metric="follower_demographics", period="lifetime",
                                                metric_type="total_value", timeframe="this_month", breakdown=b))
        datos["activos_" + b] = desglose(get(U + "/insights", metric="engaged_audience_demographics", period="lifetime",
                                             metric_type="total_value", timeframe="this_month", breakdown=b))

    media = get(U + "/media", fields="id,caption,media_type,media_product_type,timestamp,permalink", limit=100).get("data", [])
    for m in media:
        mets = "views,reach,saved,shares,total_interactions,likes,comments"
        if m["media_product_type"] == "REELS":
            mets += ",ig_reels_avg_watch_time,reels_skip_rate,reposts"
        r = get(m["id"] + "/insights", metric=mets)
        m["ins"] = {x["name"]: x["values"][0]["value"] for x in r.get("data", [])}
    datos["publicaciones"] = media

    historias = get(U + "/stories", fields="id,timestamp,media_type").get("data", [])
    for s in historias:
        r = get(s["id"] + "/insights", metric="reach,views,replies,shares,total_interactions")
        s["ins"] = {x["name"]: x["values"][0]["value"] for x in r.get("data", [])}
    datos["historias"] = historias

    # Resumen
    p = datos["perfil"]
    seg = p.get("followers_count", 0)
    a = datos["alcance_por_seguidor"]
    print(f"@{p.get('username')} · {seg} seguidores · {p.get('media_count')} publicaciones · {datos['fecha']}")
    print(f"Alcance 30 días: {a.get('FOLLOWER', 0)} seguidores ({a.get('FOLLOWER', 0) * 100 // max(seg, 1)} % de la base) "
          f"y {a.get('NON_FOLLOWER', 0)} no seguidores")
    print("Por formato:", datos["alcance_por_formato"])
    print("Totales 30 días:", datos["totales_30d"])
    ab = datos["altas_bajas"]
    print(f"Seguidores nuevos: {ab.get('FOLLOWER')} · dejaron de seguir: {ab.get('NON_FOLLOWER')}")
    pais = datos["seguidores_country"]
    tp = sum(pais.values()) or 1
    print(f"Seguidores de Argentina: {pais.get('AR', 0) * 100 // tp} % · de países hispanos: "
          f"{sum(v for k, v in pais.items() if k in HISPANOS) * 100 // tp} %")
    act = datos["activos_country"]
    ta = sum(act.values()) or 1
    print(f"Público activo de Argentina: {act.get('AR', 0) * 100 // ta} % ({ta} cuentas)")
    for s in historias:
        print("Historia", s["timestamp"][:16], s["ins"])
    print("\nfecha       tipo   alcance vistas interac. %inter. guard. comp. coment. seg.vistos %saltan  texto")
    for m in media:
        i = m["ins"]
        alc = i.get("reach", 0)
        ti = i.get("total_interactions", 0)
        w = i.get("ig_reels_avg_watch_time")
        print(f"{m['timestamp'][:10]}  {m['media_type'][:5]:5}  {alc:7} {i.get('views', 0):6} {ti:8} "
              f"{ti * 100 / max(alc, 1):6.1f} {i.get('saved', 0):6} {i.get('shares', 0):5} {i.get('comments', 0):7} "
              f"{(w / 1000 if w else 0):9.1f} {str(i.get('reels_skip_rate', '')):>7}  {(m.get('caption') or '')[:50].replace(chr(10), ' ')}")

    if len(sys.argv) > 1:
        with open(sys.argv[1], "w", encoding="utf-8") as f:
            json.dump(datos, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
