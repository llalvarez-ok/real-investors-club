#!/usr/bin/env python3
"""Guion por escena para generar los clips del avatar en HeyGen.

    python herramientas/guion_heygen.py produccion/<id>/spec.json produccion/<id>/heygen.txt

Escribe, por escena, el texto para pegar (con los cambios de pronunciación) y la duración que se espera al ritmo del
avatar de Lean (medido en los clips de la 0-1-1: ~2,8 palabras por segundo de voz).
"""
import json
import re
import sys

PALABRAS_POR_SEGUNDO = 2.8
PRONUNCIACION = [
    (r"S&P quinientos", "ese ande pi quinientos"),
    (r"realinvestors punto club", "real investors punto club"),
    (r"\bRealy\b", "Reali"),
]
NOMBRES = {"portada": "Gancho", "agenda": "Qué vas a aprender", "pregunta": "Pregunta", "concepto": "Concepto",
           "definicion": "Definición", "comparacion": "Comparación", "pasos": "Pasos", "dato": "Dato", "tabla": "Tabla",
           "ejemplo": "Ejemplo", "grafico": "Gráfico", "error": "Error común", "ric": "Así lo hacemos en RIC",
           "actividad": "Actividad", "resumen": "Resumen", "cierre": "Cierre", "animacion": "Animación"}


def pron(t):
    for a, b in PRONUNCIACION:
        t = re.sub(a, b, t)
    return t


def mmss(s):
    return f"{int(s // 60)}:{int(round(s % 60)):02}"


def main():
    spec_path, destino = sys.argv[1:3]
    lec = json.load(open(spec_path, encoding="utf-8"))["lecciones"][0]
    palabras = [len(l["voz"].split()) for l in lec["laminas"]]
    total = sum(palabras) / PALABRAS_POR_SEGUNDO
    out = [f"RIC · Lección {lec['id']} · {lec['titulo']}", "GUION PARA HEYGEN, ESCENA POR ESCENA", "",
           "=" * 69, "CÓMO GENERARLO", "=" * 69,
           f"1. Un clip por escena: {len(palabras)} clips, 01.mp4 a {len(palabras):02}.mp4, en la carpeta RIC/videos/{lec['id']} de Drive.",
           "2. Pega SOLO el texto entre >>> y <<<. Ya está escrito como se pronuncia. No lo corrijas.",
           "3. Si improvisas o agregas algo, que sea con \"tú\" (nada de \"podés\", \"preguntate\" ni \"recordad\"):",
           "   las lecciones van en español neutro.",
           "4. Mismo avatar y encuadre que en la 0-1-1 (vertical 1080x1920 está bien). Fondo como quieras.",
           "5. Revisa que no haya saltos o cuadros borrosos (en la 0-1-1 los hubo en la escena 07).",
           "",
           f"Duración total esperada: ~{mmss(total)} · {sum(palabras)} palabras · {len(palabras)} escenas.",
           "Las duraciones son orientativas: el montaje se adapta a lo que dure cada clip.", ""]
    for i, (l, n) in enumerate(zip(lec["laminas"], palabras), 1):
        out += ["=" * 69,
                f"ESCENA {i:02} · {NOMBRES.get(l['tipo'], l['tipo'])}  [{l['escena']}]  ·  ~{n / PALABRAS_POR_SEGUNDO:.0f} s  ·  {n} palabras  ·  archivo: {i:02}.mp4",
                ">>>", pron(l["voz"]), "<<<", ""]
    open(destino, "w", encoding="utf-8").write("\n".join(out))
    print(destino, f"{sum(palabras)} palabras, ~{mmss(total)}")


if __name__ == "__main__":
    main()
