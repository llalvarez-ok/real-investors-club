"""Convierte el documento de títulos de YouTube (.docx) en youtube/metadatos.json.

    pandoc -f docx -t gfm --wrap=none youtube/RIC-YouTube-titulos-y-descripciones.docx -o /tmp/titulos.md
    python herramientas/docx_a_json.py /tmp/titulos.md youtube/metadatos.json
"""
import re, json, sys, html
md = open(sys.argv[1], encoding="utf-8").read()
partes = re.split(r"\n(?=ID en la plataforma: )", md)
out = []
for p in partes[1:]:
    m = re.match(r"ID en la plataforma: (\S+) · Módulo: (.*?) · Pilar: (.*?) · Duración estimada del video: (.*)", p)
    lid, modulo, pilar, dur = (s.strip() for s in m.groups())
    tit = re.search(r"\*\*TÍTULO.*?\*\*\s*\n\s*\n\|.*?\|\n\|[-|]+\|\n\| (.*?) +\|\n", p, re.S).group(1).replace("\\|", "|").strip()
    td = re.search(r"<td>(.*?)</td>", p, re.S).group(1)
    desc = "\n\n".join(html.unescape(re.sub(r"<[^>]+>", "", x)).strip() for x in re.findall(r"<p>(.*?)</p>", td, re.S))
    tags = re.search(r"\*\*ETIQUETAS\*\*\s*\n\s*\n\|.*?\|\n\|[-|]+\|\n\| (.*?) +\|", p, re.S).group(1).replace("\\|", "|").strip()
    out.append({"id": lid, "modulo": modulo, "pilar": pilar, "duracion_estimada": dur,
                "titulo": tit, "descripcion": desc, "etiquetas": [t.strip() for t in tags.split(",") if t.strip()]})
json.dump(out, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print(len(out), "fichas")
