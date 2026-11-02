#!/usr/bin/env python3
"""Transcripción de videos de YouTube, Instagram, TikTok, X o Facebook con Supadata (plan gratis: 100 consultas por mes).

    python herramientas/supadata.py <url> [--lang es] [--ia] [--forzar]
    python herramientas/supadata.py --uso

- Usa RIC_SUPADATA_KEY del entorno (y `api.supadata.ai` habilitado en la red). Nunca imprime la clave.
- Por defecto pide solo subtítulos que ya existen (mode=native, 1 crédito). Con --ia deja que Supadata transcriba con IA
  si no hay subtítulos (mode=auto, ~2 créditos por minuto): usarlo solo cuando haga falta (por ejemplo, Reels de Instagram).
- Cada consulta (incluidas las de seguimiento de un trabajo largo) se anota en datos/supadata-uso.json, por mes. Ese archivo
  sí va a git (solo tiene números): cada chat tiene que subirlo a main para que el contador siga entre sesiones.
  Al llegar a 95 en el mes, el script se niega a seguir (margen para no pasarnos de 100).
- Caché en datos/transcripciones/<id>.json: si el video ya se transcribió, no se gasta otra consulta (salvo --forzar).
  datos/transcripciones/ está en .gitignore: el repo es público y estas transcripciones son de contenido de terceros.
"""
import argparse, datetime, hashlib, json, os, sys, time, urllib.parse, urllib.request

BASE = "https://api.supadata.ai/v1/"
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "datos")
USO, CACHE = os.path.join(RAIZ, "supadata-uso.json"), os.path.join(RAIZ, "transcripciones")
TOPE = 95


def uso():
    try: return json.load(open(USO))
    except Exception: return {}


def contar():
    u = uso(); mes = datetime.date.today().strftime("%Y-%m"); u[mes] = u.get(mes, 0) + 1
    os.makedirs(RAIZ, exist_ok=True); json.dump(u, open(USO, "w"), indent=1); return u[mes]


def pedir(ruta, **p):
    mes = datetime.date.today().strftime("%Y-%m")
    if uso().get(mes, 0) >= TOPE: raise SystemExit(f"Tope del mes alcanzado ({TOPE} consultas). No se hace la consulta.")
    n = contar()
    r = urllib.request.Request(BASE + ruta + ("?" + urllib.parse.urlencode(p) if p else ""), headers={"x-api-key": os.environ["RIC_SUPADATA_KEY"]})
    try:
        with urllib.request.urlopen(r, timeout=120) as h: return h.status, json.load(h), n
    except urllib.error.HTTPError as e:
        return e.code, {"error": e.read().decode()[:400]}, n


def main():
    a = argparse.ArgumentParser(); a.add_argument("url", nargs="?"); a.add_argument("--lang", default="es")
    a.add_argument("--ia", action="store_true"); a.add_argument("--forzar", action="store_true"); a.add_argument("--uso", action="store_true")
    o = a.parse_args()
    if o.uso or not o.url:
        print(json.dumps(uso(), indent=1) or "{}"); return
    clave = hashlib.sha1(o.url.encode()).hexdigest()[:12]; dest = os.path.join(CACHE, clave + ".json")
    if os.path.exists(dest) and not o.forzar:
        d = json.load(open(dest)); print(f"(de la caché, sin gastar consulta) {dest}\n"); print(d.get("texto", "")); return
    est, d, n = pedir("transcript", url=o.url, lang=o.lang, text="true", mode="auto" if o.ia else "native")
    if est == 202 and d.get("jobId"):  # trabajo largo (transcripción con IA): se consulta el estado pocas veces
        jid = d["jobId"]
        for espera in (20, 40, 60, 90):
            time.sleep(espera); est, d, n = pedir(f"transcript/{jid}")
            if d.get("content") or d.get("status") == "failed": break
    print(f"[consulta {n} de 100 este mes · HTTP {est}]", file=sys.stderr)
    if "content" not in d:
        raise SystemExit(f"Sin transcripción: {json.dumps(d, ensure_ascii=False)[:400]}")
    texto = d["content"] if isinstance(d["content"], str) else " ".join(x.get("text", "") for x in d["content"])
    os.makedirs(CACHE, exist_ok=True)
    json.dump({"url": o.url, "lang": d.get("lang"), "fecha": datetime.date.today().isoformat(), "texto": texto}, open(dest, "w"), ensure_ascii=False, indent=1)
    print(texto)


if __name__ == "__main__":
    main()
