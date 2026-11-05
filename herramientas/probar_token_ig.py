"""Prueba el token de Instagram cargado en el entorno y dice qué se puede hacer con él.

Uso: python herramientas/probar_token_ig.py
Lee RIC_IG_TOKEN_IG (o RIC_IG_TOKEN). Solo lee: no publica ni responde nada.
Nunca imprime el token.
"""
import json
import os
import urllib.error
import urllib.parse
import urllib.request

TOK = os.environ.get("RIC_IG_TOKEN_IG") or os.environ.get("RIC_IG_TOKEN")


def get(base, ruta, **p):
    p["access_token"] = TOK
    try:
        return json.load(urllib.request.urlopen(base + ruta + "?" + urllib.parse.urlencode(p), timeout=30))
    except urllib.error.HTTPError as e:
        try:
            return {"error": json.load(e).get("error", {})}
        except Exception:
            return {"error": {"message": f"HTTP {e.code}"}}
    except Exception as e:
        return {"error": {"message": str(e)}}


def ok(r):
    return "error" not in r


def main():
    if not TOK:
        print("✗ No hay token: falta RIC_IG_TOKEN_IG en el entorno (las variables llegan solo a sesiones nuevas).")
        return
    tipo = "IGAA (inicio de sesión con Instagram)" if TOK.startswith("IG") else "EAA (inicio de sesión con Facebook)"
    print(f"Token: {tipo}, {len(TOK)} caracteres")

    if TOK.startswith("IG"):
        base = "https://graph.instagram.com/v21.0/"
        me = get(base, "me", fields="user_id,username,account_type,followers_count,media_count")
        if not ok(me):
            print("✗ Leer la cuenta:", me["error"].get("message"))
            return
        uid = me.get("user_id") or me.get("id")
        print(f"✓ Cuenta: @{me.get('username')} ({me.get('account_type')}), {me.get('followers_count')} seguidores, ID {uid}")
        if os.environ.get("RIC_IG_USER_ID") and str(uid) != os.environ["RIC_IG_USER_ID"]:
            print(f"  Ojo: RIC_IG_USER_ID es {os.environ['RIC_IG_USER_ID']}; con este token se usa {uid}.")
        pruebas = {
            "Estadísticas de la cuenta": (f"{uid}/insights", dict(metric="reach", period="day", metric_type="total_value")),
            "Publicaciones y comentarios": (f"{uid}/media", dict(fields="id,comments_count", limit=1)),
            "Cupo para publicar (content_publishing_limit)": (f"{uid}/content_publishing_limit", dict(fields="quota_usage,config")),
            "Mensajes directos": (f"{uid}/conversations", dict(platform="instagram", limit=1)),
        }
        for nombre, (ruta, p) in pruebas.items():
            r = get(base, ruta, **p)
            print(("✓ " if ok(r) else "✗ ") + nombre + ("" if ok(r) else ": " + str(r["error"].get("message"))))
            if nombre.startswith("Cupo") and ok(r) and r.get("data"):
                print("  ", r["data"][0])
    else:
        base = "https://graph.facebook.com/v21.0/"
        uid = os.environ.get("RIC_IG_USER_ID")
        r = get(base, uid or "me", fields="username,followers_count")
        if not ok(r):
            print("✗ Leer la cuenta:", r["error"].get("message"))
            if "blocked" in str(r["error"].get("message", "")).lower():
                print("  Meta bloqueó la app de este token. Ver instagram/README.md, «Configurar la API paso a paso».")
            return
        print(f"✓ Cuenta: @{r.get('username')}, {r.get('followers_count')} seguidores")
        pag = get(base, "me/accounts", fields="name,instagram_business_account")
        if ok(pag) and pag.get("data"):
            print("✓ Página de Facebook vinculada: se puede publicar por graph.facebook.com")
        else:
            print("✗ Sin página de Facebook: con este token no se puede publicar (error 2207085). Usar un token IGAA.")


if __name__ == "__main__":
    main()
