"""Quién empezó a seguir y quién dejó de seguir a @leanalvarez.ok, con nombres de usuario.

La API de Meta solo da cantidades, no la lista de seguidores. Los nombres salen de la
descarga de datos de Instagram (Centro de cuentas → Tu información y permisos →
Descargar tu información → Seguidores y seguidos, formato JSON). Ver instagram/README.md.

Uso:
  python herramientas/seguidores_instagram.py <descarga_anterior> <descarga_nueva> [informe.md]
  python herramientas/seguidores_instagram.py <descarga> [--dias 7]      (solo los nuevos)

Cada descarga puede ser el .zip tal cual o la carpeta descomprimida.
Las listas de usuarios NO van a git (el repo es público): el informe se guarda fuera
del repo o en Drive.
"""
import argparse
import datetime as dt
import json
import zipfile
from pathlib import Path


def _leer_jsons(ruta):
    """Devuelve {nombre_de_archivo: contenido} de los JSON de seguidores/seguidos."""
    ruta = Path(ruta)
    out = {}
    if ruta.is_file() and ruta.suffix == ".zip":
        with zipfile.ZipFile(ruta) as z:
            for n in z.namelist():
                base = n.rsplit("/", 1)[-1]
                if base.endswith(".json") and (base.startswith("followers") or base.startswith("following")):
                    out[n] = json.loads(z.read(n).decode("utf-8"))
    else:
        for p in ruta.rglob("*.json"):
            if p.name.startswith("followers") or p.name.startswith("following"):
                out[str(p)] = json.loads(p.read_text(encoding="utf-8"))
    return out


def _entradas(contenido):
    """Normaliza los dos formatos que usa Instagram (lista suelta o dentro de una clave)."""
    if isinstance(contenido, dict):
        for v in contenido.values():
            if isinstance(v, list):
                yield from v
    elif isinstance(contenido, list):
        yield from contenido


def _usuario(e):
    for s in e.get("string_list_data", []):
        if s.get("value"):
            return s["value"], s.get("timestamp")
        href = s.get("href", "")
        if href:
            return href.rstrip("/").rsplit("/", 1)[-1], s.get("timestamp")
    if e.get("title"):
        ts = (e.get("string_list_data") or [{}])[0].get("timestamp")
        return e["title"], ts
    return None, None


def cargar(ruta):
    """{'seguidores': {usuario: timestamp}, 'seguidos': {...}}"""
    datos = {"seguidores": {}, "seguidos": {}}
    for nombre, cont in _leer_jsons(ruta).items():
        clave = "seguidores" if nombre.rsplit("/", 1)[-1].startswith("followers") else "seguidos"
        for e in _entradas(cont):
            u, ts = _usuario(e)
            if u:
                datos[clave][u.lower()] = ts
    if not datos["seguidores"]:
        raise SystemExit(f"No encontré la lista de seguidores en {ruta}. ¿Es la descarga en formato JSON?")
    return datos


def _fecha(ts):
    return dt.datetime.fromtimestamp(ts).strftime("%d/%m %H:%M") if ts else "—"


def _lista(usuarios, d, seguidos):
    filas = []
    for u in sorted(usuarios, key=lambda x: -(d.get(x) or 0)):
        vuelta = "sí" if u in seguidos else ""
        filas.append(f"| @{u} | {_fecha(d.get(u))} | {vuelta} |")
    return filas


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("descargas", nargs="+", help="una o dos descargas (.zip o carpeta)")
    ap.add_argument("--dias", type=int, default=7)
    ap.add_argument("--salida")
    a = ap.parse_args()
    if len(a.descargas) > 2:
        a.salida = a.descargas.pop()

    nueva = cargar(a.descargas[-1])
    seg = nueva["seguidores"]
    l = [f"# Seguidores de @leanalvarez.ok · {dt.date.today():%d/%m/%Y}", "",
         f"Seguidores en la descarga: **{len(seg)}**", ""]

    if len(a.descargas) == 2:
        vieja = cargar(a.descargas[0])
        ant = vieja["seguidores"]
        llegaron = set(seg) - set(ant)
        se_fueron = set(ant) - set(seg)
        l += [f"Descarga anterior: {len(ant)} · llegaron **{len(llegaron)}** · se fueron **{len(se_fueron)}** "
              f"· neto {len(llegaron) - len(se_fueron):+d}", "",
              "## Llegaron", "", "| Usuario | Te sigue desde | Lo seguís |", "|---|---|---|"]
        l += _lista(llegaron, seg, nueva["seguidos"]) or ["| (nadie) | | |"]
        l += ["", "## Se fueron", "",
              "Incluye cuentas borradas o desactivadas: no se puede distinguir quién dejó de seguir y quién cerró la cuenta.", "",
              "| Usuario | Te seguía desde | Lo seguís |", "|---|---|---|"]
        l += _lista(se_fueron, ant, nueva["seguidos"]) or ["| (nadie) | | |"]
    else:
        desde = dt.datetime.now().timestamp() - a.dias * 86400
        llegaron = [u for u, ts in seg.items() if ts and ts >= desde]
        l += [f"## Llegaron en los últimos {a.dias} días ({len(llegaron)})", "",
              "Para saber quién se fue hace falta comparar con la descarga anterior.", "",
              "| Usuario | Te sigue desde | Lo seguís |", "|---|---|---|"]
        l += _lista(llegaron, seg, nueva["seguidos"]) or ["| (nadie) | | |"]

    texto = "\n".join(l) + "\n"
    print(texto)
    if a.salida:
        Path(a.salida).write_text(texto, encoding="utf-8")


if __name__ == "__main__":
    main()
