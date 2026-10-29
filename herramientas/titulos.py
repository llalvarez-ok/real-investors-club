#!/usr/bin/env python3
"""Revisa un título de YouTube junto con el texto de su miniatura, como una sola pieza.

    python herramientas/titulos.py --titulo "Por qué vendes justo cuando baja (y cómo evitarlo)" --miniatura "×2 de dolor"
    python herramientas/titulos.py --titulo "..." --html produccion/<id>/miniatura.html   # lee el texto de la miniatura
    python herramientas/titulos.py --archivo titulos.txt [--miniatura "..."]               # varias versiones, de mejor a peor
    agregar --json para la salida en JSON

Chequea: largo (YouTube corta cerca de 60 caracteres en computadora y de 40 en el celular; el límite es 100),
si lleva un número, un nombre o una fecha, adjetivos vacíos, mayúsculas de más, si las primeras palabras dicen
algo, voseo, y que la miniatura NO repita las palabras del título (tiene que decir lo que el título no dice)
y tenga como mucho 4 palabras. Idea tomada de youtube-agent-skill (MIT), reescrita para español.
"""
import html as html_mod
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import es_texto as es  # noqa: E402

COMPU, CELULAR, LIMITE = 60, 40, 100


def texto_miniatura(ruta):
    """El texto visible de produccion/<id>/miniatura.html, sin la web ni el logo."""
    h = open(ruta, encoding="utf-8").read()
    cuerpo = h.split("<body", 1)[-1].split(">", 1)[-1]
    cuerpo = re.sub(r"<script.*?</script>|<style.*?</style>", " ", cuerpo, flags=re.S)
    cuerpo = re.sub(r'<div class="url">.*?</div>', " ", cuerpo, flags=re.S)
    return " ".join(html_mod.unescape(re.sub(r"<[^>]+>", " ", cuerpo)).split())


def revisar(titulo, mini=None):
    t = titulo.strip()
    sin_tag = re.sub(r"\s*#shorts\b", "", t, flags=re.I)
    n = len(t)
    malo, bueno, avisos = [], [], []
    if n > LIMITE:
        malo.append(("largo", f"{n} caracteres: el límite de YouTube es {LIMITE}"))
    elif len(sin_tag) > COMPU:
        malo.append(("largo", f"{len(sin_tag)} caracteres: en computadora se corta cerca de {COMPU}"))
    else:
        bueno.append(f"{len(sin_tag)} caracteres: entra entero en computadora")
    if len(sin_tag) > CELULAR:
        visto = sin_tag[:CELULAR].rsplit(" ", 1)[0]
        avisos.append(f"en el celular se ve «{visto}…»: ¿se entiende el tema con eso?")
    mayus = [w for w in t.split() if len(w) > 2 and w.isupper() and not w.startswith("#")]
    if len(mayus) > 2:
        malo.append(("gritos", f"{len(mayus)} palabras en mayúsculas: más de dos parece spam"))
    p = es.limpias(sin_tag)
    vagas = sorted({x for x in p if x in es.VAGAS})
    if vagas:
        malo.append(("vago", f"{', '.join(vagas)}: cambiar por un número, un nombre o una fecha"))
    if re.search(r"\d", sin_tag) or any(w[:1].isupper() for w in sin_tag.split()[1:] if w.isalpha()):
        bueno.append("lleva un número, un nombre o una fecha")
    else:
        malo.append(("sin-dato", "no lleva número, nombre ni fecha: es el arreglo más confiable"))
    if sin_tag.rstrip().endswith("?") or sin_tag.lstrip().startswith("¿"):
        bueno.append("es una pregunta abierta")
    if not [x for x in p[:3] if x not in es.VACIAS]:
        malo.append(("arranque", "las tres primeras palabras no dicen nada: adelantar el tema"))
    if es.VOSEO.search(es.sin_tildes(t.lower())) or es.VOSEO_TILDE.search(t):
        malo.append(("voseo", "las piezas van con «tú»"))
    if mini:
        tp = {x for x in p if x not in es.VACIAS and len(x) > 2}
        mp = {x for x in es.limpias(mini) if x not in es.VACIAS and len(x) > 2}
        repetidas = sorted(tp & mp)
        if repetidas:
            malo.append(("repite", f"la miniatura repite «{', '.join(repetidas)}» del título: tiene que decir lo que el título no dice"))
        else:
            bueno.append("título y miniatura dicen cosas distintas")
        nm = len(es.limpias(mini))
        if nm > 4:
            malo.append(("miniatura-larga", f"{nm} palabras en la miniatura: más de 4 no se leen en el celular"))
    puntaje = max(0, min(100, 100 - 14 * len(malo) + 4 * len(bueno)))
    return {"titulo": t, "miniatura": mini, "caracteres": n, "puntaje": puntaje, "problemas": malo, "bien": bueno, "avisos": avisos}


def mostrar(r):
    print(f"\n  «{r['titulo']}»" + (f"\n  miniatura: «{r['miniatura']}»" if r["miniatura"] else ""))
    print(f"  {r['caracteres']} caracteres · puntaje {r['puntaje']}/100")
    for k, m in r["problemas"]:
        print(f"    ✗ {k:<16} {m}")
    for m in r["bien"]:
        print(f"    ✓ {m}")
    for m in r["avisos"]:
        print(f"    · {m}")


def main():
    a = sys.argv[1:]
    como_json = "--json" in a
    a = [x for x in a if x != "--json"]
    val = lambda k: a[a.index(k) + 1] if k in a else None  # noqa: E731
    mini = val("--miniatura") or (texto_miniatura(val("--html")) if val("--html") else None)
    if val("--titulo"):
        titulos = [val("--titulo")]
    elif val("--archivo"):
        titulos = [l.strip() for l in open(val("--archivo"), encoding="utf-8") if l.strip()]
    else:
        print(__doc__)
        sys.exit(1)
    res = sorted((revisar(t, mini) for t in titulos), key=lambda r: -r["puntaje"])
    if como_json:
        print(json.dumps(res, ensure_ascii=False, indent=1))
    else:
        for r in res:
            mostrar(r)


if __name__ == "__main__":
    main()
