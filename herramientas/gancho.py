#!/usr/bin/env python3
"""Puntaje de un gancho en español (los primeros 5 a 15 segundos de un video, o un título).

    python herramientas/gancho.py "¿Aceptarías una apuesta en la que ganas 150 o pierdes 100?"
    python herramientas/gancho.py --archivo ganchos.txt        # uno por línea; los ordena de mejor a peor
    python herramientas/gancho.py --guion produccion/<id>/guion.json   # la primera escena del guion
    agregar --json para la salida en JSON

Mide cinco cosas, de 0 a 100: CONCRETO (números, nombres, fechas; resta adjetivos vacíos y relleno),
TÚ (le habla al espectador), RIESGO (qué está en juego), CURIOSIDAD (deja una pregunta abierta) y LARGO
(de 9 a 24 palabras, lo que entra en 5 a 8 segundos de voz). Dice qué fórmula de diseno/ganchos.json usa.
Es una heurística para comparar versiones, no un predictor de vistas. Idea tomada de youtube-agent-skill (MIT).
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import es_texto as es  # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FORMULAS = json.load(open(os.path.join(RAIZ, "diseno", "ganchos.json"), encoding="utf-8"))["formulas"]
ARREGLO = {
    "CONCRETO": "cambia un adjetivo por un número, un nombre o una fecha",
    "TÚ": "háblale al espectador con «tú» en las primeras seis palabras",
    "RIESGO": "nombra lo que pierde si sigue haciéndolo como hasta ahora",
    "CURIOSIDAD": "abre una pregunta que el video conteste, o termina en signo de pregunta",
    "LARGO": "llévalo a entre 9 y 24 palabras",
}


def concreto(t, base):
    p = es.limpias(t)
    if not p:
        return 0
    nums = len(es.CONCRETO.findall(base))
    vagas = sum(1 for x in p if x in es.VAGAS)
    relleno = sum(1 for x in p if x in es.RELLENO)
    nombres = sum(1 for x in t.split()[1:] if x[:1].isupper())
    return max(0, min(100, 34 + nums * 22 - vagas * 16 - relleno * 12 + min(18, 6 * nombres)))


def tu(base):
    n = len(es.TU.findall(base))
    al_principio = 30 if es.TU.search(" ".join(base.split()[:6])) else 0
    return max(0, min(100, 26 + n * 18 + al_principio))


def riesgo(base):
    return max(0, min(100, 22 + len(es.RIESGO.findall(base)) * 24 + (14 if es.CONCRETO.search(base) else 0)))


def curiosidad(t, base):
    n = len(es.CURIOSIDAD.findall(base))
    pregunta = 18 if t.strip().endswith("?") or t.strip().startswith("¿") else 0
    cerrada = -18 if es.CIERRA.search(base) else 0
    return max(0, min(100, 24 + n * 17 + pregunta + cerrada))


def largo(t):
    n = len(es.limpias(t))
    if n == 0:
        return 0
    if 9 <= n <= 24:
        return 100
    return max(30, 100 - (9 - n) * 11) if n < 9 else max(10, 100 - (n - 24) * 7)


def formula(base):
    mejor, aciertos = None, 0
    for f in FORMULAS:
        n = sum(1 for p in f["patrones"] if re.search(p, base))
        if n > aciertos:
            mejor, aciertos = f, n
    return (mejor["nombre"] if mejor else "Ninguna"), aciertos


def puntuar(t):
    base = es.sin_tildes(t.lower().strip())
    partes = {"CONCRETO": concreto(t, base), "TÚ": tu(base), "RIESGO": riesgo(base),
              "CURIOSIDAD": curiosidad(t, base), "LARGO": largo(t)}
    v = list(partes.values())
    total = round(0.6 * sum(v) / len(v) + 0.4 * min(v))
    nombre, aciertos = formula(base)
    alertas = []
    if es.RELLENO & set(es.limpias(" ".join(t.split()[:4]))):
        alertas.append("empieza con relleno o saludo: el gancho tiene que entrar directo")
    if es.VOSEO.search(base) or es.VOSEO_TILDE.search(t):
        alertas.append("tiene voseo: las piezas van con «tú»")
    return {"gancho": t.strip(), "partes": partes, "total": total,
            "nivel": "FUERTE" if total >= 72 else "SIRVE" if total >= 55 else "DÉBIL",
            "formula": nombre, "aciertos": aciertos, "flojo": min(partes, key=partes.get), "alertas": alertas}


def mostrar(r):
    print(f"\n  {r['gancho']}\n  {'-' * min(72, max(20, len(r['gancho'])))}")
    for k, v in r["partes"].items():
        print(f"    {k:<11} {v:3d}  {'#' * (v // 5)}")
    print(f"    {'TOTAL':<11} {r['total']:3d}  {r['nivel']}")
    print(f"    fórmula     {r['formula']}" + ("" if r["aciertos"] else "  (no encaja en ninguna: suele ser un resumen, no un gancho)"))
    print(f"    lo más flojo {r['flojo']}: {ARREGLO[r['flojo']]}")
    for a in r["alertas"]:
        print(f"    ⚠ {a}")


def main():
    a = sys.argv[1:]
    como_json = "--json" in a
    a = [x for x in a if x != "--json"]
    if not a:
        print(__doc__)
        sys.exit(1)
    if a[0] == "--archivo":
        textos = [l.strip() for l in open(a[1], encoding="utf-8") if l.strip()]
    elif a[0] == "--guion":
        textos = [json.load(open(a[1], encoding="utf-8"))["escenas"][0]["voz"].split(". ")[0] + "."]
    else:
        textos = [" ".join(a)]
    res = sorted((puntuar(t) for t in textos), key=lambda r: -r["total"])
    if como_json:
        print(json.dumps(res, ensure_ascii=False, indent=1))
    else:
        for r in res:
            mostrar(r)


if __name__ == "__main__":
    main()
