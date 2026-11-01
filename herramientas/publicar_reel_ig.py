#!/usr/bin/env python3
"""Publica un Reel en @leanalvarez.ok con la API de Instagram (Graph API v21.0). Requiere el OK de Lean para cada Reel.

    python herramientas/publicar_reel_ig.py <video.mp4 | URL pública del mp4> <caption.txt> [--portada SEG] [--audio "nombre"]

- Con un archivo local, lo sube con la subida reanudable (necesita `rupload.facebook.com` habilitado en la red de la nube).
- Con una URL pública (por ejemplo, un MP4 de menos de 100 MB en Drive con «Cualquier persona con el enlace»:
  https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t), Instagram lo baja de ahí.
- Opciones: portada en el segundo SEG del video (thumb_offset), nombre del audio original, y se comparte también en el feed.
Usa RIC_IG_TOKEN_IG (o RIC_IG_TOKEN) y RIC_IG_USER_ID del entorno. Imprime el link del Reel publicado (nunca imprimir respuestas crudas de la API:
los links de paginación traen el token).
Codificar el MP4 con bt709 y keyframe cada 2 s (ver herramientas/cine/LEEME.md); con color bt470bg Instagram no lo transcodificaba.
Estado al 01/11/2026: la subida y el procesado funcionan, pero media_publish devuelve «Fatal» (subcódigo 2207085);
según la documentación de terceros es un problema de permisos del token (ver instagram/README.md).
"""
import argparse, json, os, time, urllib.parse, urllib.request

# El endpoint sale del tipo de token, no del nombre de la variable: «IGAA…» (inicio de sesión con Instagram) va por
# graph.instagram.com; «EAA…» (usuario del sistema, inicio de sesión con Facebook) va por graph.facebook.com.
# Desde el 01/11/2026 RIC_IG_TOKEN_IG trae un token EAA de usuario del sistema con instagram_content_publish.
TOK = os.environ.get("RIC_IG_TOKEN_IG") or os.environ["RIC_IG_TOKEN"]
if TOK.startswith("IG"):
    G = "https://graph.instagram.com/v21.0/"
    IGU = json.load(urllib.request.urlopen(G + "me?fields=user_id&access_token=" + TOK))["user_id"]
else:
    G, IGU = "https://graph.facebook.com/v21.0/", os.environ["RIC_IG_USER_ID"]


def api(metodo, ruta, **p):
    p["access_token"] = TOK
    if metodo == "GET":
        r = urllib.request.Request(G + ruta + "?" + urllib.parse.urlencode(p))
    else:
        r = urllib.request.Request(G + ruta, data=urllib.parse.urlencode(p).encode(), method="POST")
    try:
        return json.load(urllib.request.urlopen(r))
    except urllib.error.HTTPError as e:
        raise SystemExit(f"Error {e.code} en {ruta}: {e.read().decode()[:500]}")


def main():
    a = argparse.ArgumentParser()
    a.add_argument("video"); a.add_argument("caption")
    a.add_argument("--portada", type=float, default=None); a.add_argument("--audio", default=None)
    o = a.parse_args()
    p = dict(media_type="REELS", caption=open(o.caption, encoding="utf-8").read().strip(), share_to_feed="true")
    if o.portada is not None: p["thumb_offset"] = int(o.portada * 1000)
    if o.audio: p["audio_name"] = o.audio
    local = not o.video.startswith("http")
    if local: p["upload_type"] = "resumable"
    else: p["video_url"] = o.video
    c = api("POST", f"{IGU}/media", **p); cid = c["id"]; print("contenedor", cid, flush=True)
    if local:
        n = os.path.getsize(o.video); datos = open(o.video, "rb").read()
        for intento in range(5):  # el primer intento suele dar 400 (el contenedor todavía no está listo): esperar y reintentar
            time.sleep(5 + 10 * intento)
            r = urllib.request.Request(f"https://rupload.facebook.com/ig-api-upload/v21.0/{cid}", data=datos, method="POST",
                                       headers={"Authorization": f"OAuth {TOK}", "offset": "0", "file_size": str(n)})
            try:
                print("subida", json.load(urllib.request.urlopen(r)), flush=True); break
            except urllib.error.HTTPError as e:
                txt = e.read().decode()[:300]
                if "not in the status to upload" in txt:  # el intento anterior sí subió (el proxy pierde la respuesta)
                    print("subida: ya estaba subido", flush=True); break
                print("subida falló", e.code, txt, flush=True)
        else:
            raise SystemExit("No se pudo subir el video")
    for _ in range(90):  # Instagram procesa el video (1 a 5 minutos)
        s = api("GET", cid, fields="status_code,status")
        print("estado", s.get("status_code"), s.get("status", ""), flush=True)
        if s.get("status_code") == "FINISHED": break
        if s.get("status_code") in ("ERROR", "EXPIRED"): raise SystemExit(f"Instagram no pudo procesar el video: {s}")
        time.sleep(10)
    for intento in range(4):  # a veces media_publish da «error interno genérico» (2207085): esperar y reintentar
        try:
            m = api("POST", f"{IGU}/media_publish", creation_id=cid); break
        except SystemExit as e:
            print("publicación falló:", e, flush=True); time.sleep(30)
    else:
        raise SystemExit(f"Instagram no publicó el contenedor {cid}")
    info = api("GET", m["id"], fields="permalink,timestamp")
    print("publicado", m["id"], info.get("permalink"))


if __name__ == "__main__":
    main()
