#!/usr/bin/env python3
"""Revisa la voz de un guion de RIC con las reglas editoriales antes de producir.

    python herramientas/revisar_guion.py produccion/<id>/guion.json     # videos pilar (escenas[].voz)
    python herramientas/revisar_guion.py produccion/<id>/spec.json      # lecciones (lecciones[0].laminas[].voz)

Marca, escena por escena: voseo; palabras prohibidas (temario, «la IA», exámenes, promesas o recomendaciones,
regionalismos); palabras que Brian (voz multilingüe) lee en inglés o que le cambian el idioma de la frase;
saludo o relleno en el arranque; cifras escritas con dígitos en la voz. Al final: palabras totales y duración
estimada (2,53 palabras por segundo con Brian; las lecciones van de 700 a 1.000 palabras y los pilar de 900 a
1.300) y el puntaje del gancho (herramientas/gancho.py). Sale con código 1 si hay algún error (✗).
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import es_texto as es  # noqa: E402
from gancho import puntuar  # noqa: E402

PALABRAS_POR_SEG = 2.53


def escenas(ruta):
    g = json.load(open(ruta, encoding="utf-8"))
    if "escenas" in g:
        return "pilar", [(e.get("n", i + 1), e.get("titulo", ""), e["voz"]) for i, e in enumerate(g["escenas"])]
    lam = g["lecciones"][0]["laminas"]
    return "leccion", [(i + 1, l.get("tipo", ""), l.get("voz", "")) for i, l in enumerate(lam)]


def revisar_texto(voz):
    errores, avisos = [], []
    base = es.sin_tildes(voz.lower())
    for m in set(es.VOSEO.findall(base)) | {x.lower() for x in es.VOSEO_TILDE.findall(voz)}:
        errores.append(f"voseo: «{m}»")
    for frase, motivo in es.PALABRAS_PROHIBIDAS.items():
        if re.search(r"\b" + re.escape(frase) + r"\b", base):
            errores.append(f"«{frase}»: {motivo}")
    for frase, motivo in es.RIESGO_PRONUNCIACION.items():
        if re.search(r"(?<![\w&])" + re.escape(frase) + r"(?![\w&])", base):
            (errores if frase in ("resumiendo", "fear", "missing") else avisos).append(f"«{frase}»: {motivo}")
    if re.search(r"\d", voz):
        avisos.append("cifras con dígitos en la voz: escribirlas en palabras, como se pronuncian")
    return errores, avisos


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    tipo, lista = escenas(sys.argv[1])
    total_err = 0
    palabras = 0
    for n, titulo, voz in lista:
        palabras += len(voz.split())
        err, av = revisar_texto(voz)
        if n == lista[0][0] and es.RELLENO & set(es.limpias(" ".join(voz.split()[:5]))):
            err.append("arranca con saludo o relleno: el gancho entra en los primeros 5 segundos")
        if err or av:
            print(f"\n  Escena {n:02} · {titulo}")
            for e in err:
                print(f"    ✗ {e}")
            for a in av:
                print(f"    · {a}")
        total_err += len(err)
    seg = palabras / PALABRAS_POR_SEG
    rango = (700, 1000) if tipo == "leccion" else (900, 1300)
    print(f"\n  {len(lista)} escenas · {palabras} palabras · ~{int(seg // 60)}:{int(seg % 60):02} de voz"
          + ("" if rango[0] <= palabras <= rango[1] else f"  (· fuera del rango de {rango[0]} a {rango[1]} palabras)"))
    primera = re.split(r"(?<=[.?!])\s", lista[0][2].strip())
    gancho = " ".join(primera[:2])
    r = puntuar(gancho)
    print(f"  gancho: {r['total']} {r['nivel']} · {r['formula']} · lo más flojo: {r['flojo']}\n    «{gancho}»")
    print(f"\n  {'✗ ' + str(total_err) + ' error(es): corregir antes de generar la voz' if total_err else '✓ sin errores'}")
    sys.exit(1 if total_err else 0)


if __name__ == "__main__":
    main()
