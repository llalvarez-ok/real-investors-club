"""Arma carrusel.html (versión para principiantes) a partir de los datos de abajo.

Uso: python produccion/carrusel-oro-noviembre/armar.py  →  después generar.py hace los PNG.
El estilo base (colores, tipografías, portada, cierre) está en el <head> de carrusel.html y se conserva.
"""
import re
from pathlib import Path

AQUI = Path(__file__).resolve().parent

ICO = {
    "empleo": '<rect x="6" y="15" width="36" height="25" rx="4"/><path d="M17 15v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4M6 26h36"/>',
    "carrito": '<path d="M8 12h4l5 20h20l4-14H15"/><circle cx="19" cy="38" r="2.5"/><circle cx="34" cy="38" r="2.5"/>',
    "fabrica": '<path d="M6 40V22l10 6v-6l10 6v-6l10 6V10h6v30z"/><path d="M6 40h36"/>',
    "micro": '<path d="M24 6a6 6 0 0 1 6 6v10a6 6 0 0 1-12 0V12a6 6 0 0 1 6-6z"/><path d="M12 22a12 12 0 0 0 24 0M24 34v8M17 42h14"/>',
    "banco": '<path d="M6 18 24 8l18 10M9 18v18M17 18v18M31 18v18M39 18v18M6 40h36"/>',
    "grafico": '<path d="M8 40V8M8 40h32"/><path d="M14 32l8-9 6 5 10-13"/>',
    "gota": '<path d="M24 6c7 10 12 16 12 23a12 12 0 0 1-24 0c0-7 5-13 12-23z"/>',
}

# n, día, número, hora, ícono, título, sigla, qué es, último dato (etiqueta, valor), referencia (etiqueta, valor),
# escenario que baja, escenario que sube, por qué
FECHAS = [
    dict(dia="Viernes 6", num="6", hora="<b>10:30</b> hora de Argentina", ico="empleo",
         tit='Empleo en <span class="oro">EE. UU.</span>', sigla="NFP",
         que="Cuántos puestos de trabajo nuevos se crearon en octubre.",
         ult=("Septiembre", "+29 mil"), ref=("Se espera", "~60 mil"),
         baja="Si se crean <b>más de 60 mil</b> empleos", sube="Si se crean <b>menos de 60 mil</b> empleos",
         porque="Mucho empleo = la economía aguanta tasas altas = el dólar se fortalece."),
    dict(dia="Martes 10", num="10", hora="<b>10:30</b> hora de Argentina", ico="carrito",
         tit='<span class="oro">Inflación</span> en EE. UU.', sigla="CPI",
         que="Cuánto subieron los precios del súper, la nafta y los servicios.",
         ult=("Último dato · septiembre", "3,7 %"), ref=None,
         baja="Si la inflación sale <b>más de 3,7 %</b>", sube="Si la inflación sale <b>menos de 3,7 %</b>",
         porque="Más inflación = la Fed sube la tasa = el dólar se fortalece."),
    dict(dia="Viernes 13", num="13", hora="<b>10:30</b> hora de Argentina", ico="fabrica",
         tit='Precios de <span class="oro">empresas</span>', sigla="PPI",
         que="Lo que pagan las fábricas. Si sube acá, después llega a los precios del súper.",
         ult=("Último dato · septiembre", "6,3 %"), ref=None,
         baja="Si sale <b>más de 6,3 %</b>", sube="Si sale <b>menos de 6,3 %</b>",
         porque="Costos más altos = se espera más inflación = Fed más dura."),
    dict(dia="Lunes 16", num="16", hora="Sin hora fija", ico="micro",
         tit='Habla <span class="oro">Warsh</span>', sigla="presidente de la Fed",
         que="El jefe del banco central de EE. UU. habla en público. Cada palabra se escucha.",
         ult=("Tasa hoy", "3,75–4 %"), ref=("Próxima decisión", "9 de dic."),
         baja="Si dice que <b>hay que subir la tasa</b>", sube="Si dice que <b>se puede esperar</b>",
         porque="Lo que diga hoy anticipa lo que hará en diciembre."),
    dict(dia="Miércoles 18", num="18", hora="<b>16:00</b> hora de Argentina", ico="banco",
         tit='Minutas de la <span class="oro">Fed</span>', sigla="actas",
         que="Se publica lo que se habló a puertas cerradas en la última reunión.",
         ult=("Octubre", "Pausa"), ref=("Votación", "10 a 2"),
         baja="Si <b>muchos quieren subir</b> la tasa en diciembre", sube="Si muestran <b>dudas</b> sobre subir",
         porque="En octubre 2 de los 12 ya querían subir. Se busca si son más."),
    dict(dia="Miércoles 25", num="25", hora="<b>10:30</b> hora de Argentina", ico="grafico",
         tit='La inflación de <span class="oro">la Fed</span>', sigla="PCE",
         que="La medida de precios favorita de la Fed. El jueves 26 es feriado en EE. UU. y se mueve poco.",
         ult=("Último dato · septiembre", "3,6 %"), ref=None,
         baja="Si sale <b>más de 3,6 %</b>", sube="Si sale <b>menos de 3,6 %</b>",
         porque="Es el último gran dato antes de la decisión de diciembre."),
    dict(dia="Domingo 29", num="29", hora="El oro reacciona el <b>lunes 30</b>", ico="gota",
         tit='Reunión de la <span class="oro">OPEP+</span>', sigla="petróleo",
         que="Los países que más petróleo producen deciden cuánto van a sacar en 2027.",
         ult=("Decisión para diciembre", "Sin cambios"), ref=None,
         baja="Si deciden <b>producir menos</b> petróleo", sube="Si deciden <b>producir más</b> petróleo",
         porque="Petróleo caro = nafta cara = más inflación = Fed más dura."),
]

CSS_EXTRA = """
/* Versión para principiantes */
.f2 h1{margin-top:44px;font-size:68px}
.sigla{display:inline-block;margin-left:14px;vertical-align:middle;font-family:'IBM Plex Mono';font-weight:600;font-size:24px;letter-spacing:.06em;
  color:var(--txt2);border:2px solid var(--borde);border-radius:8px;padding:4px 12px;text-transform:none}
.que{margin-top:20px;font-size:33px;line-height:1.35;color:var(--txt)}
.numeros{margin-top:30px;display:flex;gap:18px}
.num{flex:1;border:2px solid var(--borde);border-radius:18px;padding:18px 24px;background:rgba(7,20,38,.6)}
.num small{display:block;font-family:'IBM Plex Mono';font-size:20px;letter-spacing:.08em;color:var(--txt2);text-transform:uppercase}
.num b{display:block;margin-top:6px;font-family:'Archivo';font-weight:900;font-size:50px;color:var(--oro1);white-space:nowrap}
.escenarios{margin-top:30px;display:flex;flex-direction:column;gap:18px}
.esc{border-radius:22px;padding:22px 28px}
.esc.b{background:rgba(255,107,107,.10);border:2px solid rgba(255,107,107,.55)}
.esc.s{background:rgba(61,214,140,.10);border:2px solid rgba(61,214,140,.55)}
.esc .si{font-size:30px;line-height:1.3;color:var(--txt2)}
.esc .si b{font-weight:600;color:var(--txt)}
.esc .res{margin-top:8px;font-family:'Archivo';font-weight:900;font-size:44px;line-height:1.05;text-transform:uppercase}
.esc.b .res{color:var(--rojo)} .esc.s .res{color:var(--verde)}
.esc .res span{margin-right:10px}
.porque{margin-top:22px;font-size:25px;line-height:1.35;color:var(--txt2)}
.porque b{color:var(--oro1);font-family:'IBM Plex Mono';font-weight:600;font-size:21px;letter-spacing:.08em;margin-right:8px}
/* Lámina 2 */
.l2 h1{font-size:84px;margin-top:150px}
.fed{margin-top:34px;font-size:33px;line-height:1.4;color:var(--txt)}
.fed b{color:var(--oro1);font-weight:600}
.cadena{margin-top:40px;display:flex;flex-direction:column;gap:22px}
.cad{border-radius:22px;padding:26px 30px}
.cad.b{background:rgba(255,107,107,.10);border:2px solid rgba(255,107,107,.55)}
.cad.s{background:rgba(61,214,140,.10);border:2px solid rgba(61,214,140,.55)}
.cad .pasos{font-size:30px;line-height:1.45}
.cad .fin{margin-top:10px;font-family:'Archivo';font-weight:900;font-size:40px;text-transform:uppercase}
.cad.b .fin{color:var(--rojo)} .cad.s .fin{color:var(--verde)}
.ojo{margin-top:30px;font-size:26px;line-height:1.4;color:var(--txt2)}
.ojo b{color:var(--txt)}
/* Resumen */
.r2 h1{font-size:72px;margin-top:136px}
.tabla{margin-top:30px;display:flex;flex-direction:column;gap:12px}
.tf{display:grid;grid-template-columns:150px 1fr 230px;align-items:center;gap:16px;border:2px solid var(--borde);border-radius:14px;padding:13px 20px;background:rgba(7,20,38,.6)}
.tf .f{font-family:'Archivo';font-weight:900;font-size:30px;color:var(--oro1)}
.tf .q{font-size:27px;font-weight:600}
.tf .q span{display:block;font-size:19px;font-weight:400;color:var(--txt2)}
.tf .z{font-size:21px;line-height:1.3;color:var(--txt2);text-align:right}
.tf .z i{font-style:normal;color:var(--rojo);font-weight:600}
.tf.cab2{background:none;border:none;padding:0 20px}
.tf.cab2 span{font-family:'IBM Plex Mono';font-size:18px;letter-spacing:.08em;color:var(--txt2)}
"""


def marca(txt, paso):
    return (f'  <div class="marca"><img src="../../marca/logo-oro.png" alt=""><span>{txt}</span></div>\n'
            f'  <div class="paso">{paso}/11</div>\n')


PIE = ('  <div class="pie"><b>Lean Alvarez · <i>Real Investors Club</i></b><small>@leanalvarez.ok</small></div>\n'
       '</section>\n')


def lamina_fecha(i, f):
    ref = f'    <div class="num"><small>{f["ref"][0]}</small><b>{f["ref"][1]}</b></div>\n' if f['ref'] else ''
    return (f'<section class="lamina fecha f2" id="l{i + 3}">\n' + marca(f"FECHA {i + 1} DE 7", i + 3) +
            f'''  <div class="cab">
    <div class="cal"><div class="mes">NOV</div><div class="dia">{f["num"]}</div></div>
    <div class="cuando"><div class="d">{f["dia"]}</div><div class="h">{f["hora"]}</div></div>
    <div class="ico"><svg viewBox="0 0 48 48">{ICO[f["ico"]]}</svg></div>
  </div>
  <h1>{f["tit"]}<span class="sigla">{f["sigla"]}</span></h1>
  <p class="que">{f["que"]}</p>
  <div class="numeros">
    <div class="num"><small>{f["ult"][0]}</small><b>{f["ult"][1]}</b></div>
{ref}
  </div>
  <div class="escenarios">
    <div class="esc b"><div class="si">{f["baja"]}</div><div class="res"><span>🔻</span>el oro suele bajar</div></div>
    <div class="esc s"><div class="si">{f["sube"]}</div><div class="res"><span>🔺</span>el oro suele subir</div></div>
  </div>
  <p class="porque"><b>¿POR QUÉ?</b>{f["porque"]}</p>
''' + PIE)


L2 = ('<section class="lamina l2" id="l2">\n' + marca("ANTES DE EMPEZAR", 2) + '''  <h1>Cómo leer este <span class="oro">carrusel</span></h1>
  <p class="fed">La <b>Fed</b> es el banco central de EE. UU. Decide la <b>tasa de interés</b>, y eso mueve al dólar y al oro.</p>
  <div class="cadena">
    <div class="cad b"><div class="pasos">Dato <b>más alto</b> de lo esperado → la Fed sube la tasa → el dólar se fortalece</div><div class="fin">🔻 El oro suele bajar</div></div>
    <div class="cad s"><div class="pasos">Dato <b>más bajo</b> de lo esperado → la Fed no sube → el dólar se debilita</div><div class="fin">🔺 El oro suele subir</div></div>
  </div>
  <p class="ojo"><b>«Suele» no es «siempre».</b> A veces el mercado ya lo esperaba y no se mueve, o hace lo contrario. Por eso nunca se opera sin stop.</p>
''' + PIE)

FILAS = [
    ("Vie 6", "Empleo", "10:30", "más de 60 mil"),
    ("Mar 10", "Inflación (CPI)", "10:30", "más de 3,7 %"),
    ("Vie 13", "Precios empresas (PPI)", "10:30", "más de 6,3 %"),
    ("Lun 16", "Habla Warsh", "sin hora", "si dice «subir»"),
    ("Mié 18", "Minutas de la Fed", "16:00", "muchos quieren subir"),
    ("Mié 25", "Inflación PCE", "10:30", "más de 3,6 %"),
    ("Dom 29", "OPEP+", "lunes 30", "menos petróleo"),
]
L10 = ('<section class="lamina r2" id="l10">\n' + marca("GUARDALO", 10) +
       '  <h1>El mes en <span class="oro">una pantalla</span></h1>\n  <div class="tabla">\n'
       '    <div class="tf cab2"><span>FECHA</span><span>QUÉ SALE · HORA ARG</span><span style="text-align:right">🔻 EL ORO SUELE BAJAR SI…</span></div>\n' +
       "".join(f'    <div class="tf"><span class="f">{a}</span><span class="q">{b}<span>{c}</span></span><span class="z"><i>{d}</i></span></div>\n'
               for a, b, c, d in FILAS) +
       '  </div>\n  <p class="nota" style="margin-top:20px;font-size:22px">Si sale lo contrario, el oro suele subir. Las fechas pueden cambiar: confirmalas el día anterior.</p>\n' + PIE)


def main():
    p = AQUI / "carrusel.html"
    html = p.read_text(encoding="utf-8")
    head, resto = html.split("<body>", 1)
    head = re.sub(r"\n/\* Versión para principiantes \*/.*?(?=</style>)", "", head, flags=re.S)
    head = head.replace("</style>", CSS_EXTRA + "</style>")
    secciones = re.findall(r"<!-- \d+ · [^>]*-->\n<section.*?</section>\n", resto, flags=re.S)
    portada = secciones[0].replace("Con <b>hora de Argentina</b>, el último dato y qué mirar en cada una.",
                                   "Qué es cada dato, a qué hora sale y <b>qué pasa con el oro si sale alto o bajo</b>.")
    cierre = secciones[-1]
    cuerpo = (portada + "\n<!-- 2 · Cómo leerlo -->\n" + L2 +
              "".join(f"\n<!-- {i + 3} · Fecha {i + 1} -->\n" + lamina_fecha(i, f) for i, f in enumerate(FECHAS)) +
              "\n<!-- 10 · Resumen -->\n" + L10 + "\n" + cierre)
    p.write_text(head + "<body>\n\n" + cuerpo + "\n</body>\n</html>\n", encoding="utf-8")
    print("carrusel.html armado:", cuerpo.count("<section"), "láminas")


if __name__ == "__main__":
    main()
