"""Genera escena-cine.html (v2) desde textos-voz.json: cada efecto se ata a una palabra buscada en el texto."""
import json, re, unicodedata
TX = json.load(open('textos-voz.json'))
def nz(s): return ''.join(c for c in unicodedata.normalize('NFD', s.lower()) if c.isalnum())
def W(b, palabra, n=1):
    ws = [nz(w) for w in TX[b if b in TX else b + 'ig'].split()]; k = 0
    for i, w in enumerate(ws):
        if w.startswith(nz(palabra)):
            k += 1
            if k == n: return i
    raise SystemExit(f'no encuentro «{palabra}» en {b}')
def el(cls, b, w, e, txt, style='', extra=''):
    return f'<div class="abs {cls}" style="{style}" data-b="{b}" {w} data-e="{e}" {extra}>{txt}</div>'
def at(b, palabra, n=1, o=None): return f'data-w="{W(b, palabra, n)}"' + (f' data-o="{o}"' if o is not None else '')

# --- 02: últimos 8 reportes de Nvidia (día siguiente, cierre a cierre) ---
N8 = [('NOV 24', .5), ('FEB 25', -8.5), ('MAY 25', 3.2), ('AGO 25', -.8), ('NOV 25', -3.2), ('FEB 26', -5.5), ('MAY 26', -1.8), ('AGO 26', 8.7)]
cajas8 = ''.join(f'<div class="cj {"v" if v > 0 else "r"}" data-b="02" {at("02", "últimas", 1, round(.12 * i, 2))} data-e="pop" data-s="{"tic" if i % 2 == 0 else ""}"><b>{("+" if v > 0 else "") + str(v).replace(".", ",")} %</b><i>{m}</i></div>' for i, (m, v) in enumerate(N8))
checks15 = ''.join(f'<span data-b="02" {at("02", "superó", 1, round(.05 * i, 2))} data-e="pop">✓</span>' for i in range(15))
# --- 03: 12 veces que el dato salió arriba, el S&P ese día ---
VM = [-1.32, -.39, .41, .54, -.13, -.53, -1.33, .72, -.63, -1.21, -.45, .33]
VM = sorted(VM)  # primero las bajas
pts12 = ''.join(f'<i class="{"v" if v > 0 else "r"}" data-b="03" {at("03", "ocho", 1, round(.07 * i, 2))} data-e="pop"></i>' for i, v in enumerate(VM))
VB = sorted([-.21, -.01, .64, -.84, .91, -.24, -.33, -.17])
pts8 = ''.join(f'<i class="{"v" if v > 0 else "r"}" data-b="03" {at("03", "seis", 1, round(.07 * i, 2))} data-e="pop"></i>' for i, v in enumerate(VB))
# --- 05: últimos 3 reportes de Walmart ---
WM = [('FEB 26', -1.4), ('MAY 26', -7.3), ('AGO 26', -9.2)]
caj3 = ''.join(f'<div class="cj r" style="width:230px" data-b="05" {at("05", "últimos", 1, round(.25 * i, 2))} data-e="golpe" data-s="impacto"><b>{str(v).replace(".", ",")} %</b><i>{m} · SUPERÓ</i></div>' for i, (m, v) in enumerate(WM))

B01 = f'''
  <div class="blq" data-b="01">
    {el('tag rojo', '01', 'data-o="ya"', 'aparece', '● Alerta · semana del 16 al 20/11', 'left:140px;top:250px')}
    {el('titulo', '01', 'data-o="ya"', 'glitch', 'No inviertas<br>esta semana', 'top:330px;font-size:112px;left:110px;right:110px')}
    {el('titulo oro', '01', 'data-o="ya"', 'aparece', 'sin conocer esto', 'top:575px;font-size:76px')}
    <div class="abs cal" style="top:1010px">
      <div data-b="01" {at('01', 'cuatro', 1, 0)} data-e="tres" data-ry="-8" data-s="whoosh"><b>MAR 17</b><span>Nvidia</span></div>
      <div data-b="01" {at('01', 'cuatro', 1, .18)} data-e="tres" data-ry="-3"><b>MAR 17</b><span>Ventas</span></div>
      <div data-b="01" {at('01', 'cuatro', 1, .36)} data-e="tres" data-ry="3"><b>MIÉ 18</b><span>Fed</span></div>
      <div data-b="01" {at('01', 'cuatro', 1, .54)} data-e="tres" data-ry="8"><b>JUE 19</b><span>Walmart</span></div>
    </div>
    {el('sello', '01', at('01', 'precio'), 'sello', 'Qué pasó<small>cada vez · datos reales</small>', 'left:300px;top:1250px;font-size:44px', 'data-r="-5" data-s="sello"')}
  </div>'''
B02 = f'''
  <div class="blq" data-b="02">
    {el('tag rojo', '02', 'data-o="0"', 'izq', 'Martes 17 · después del cierre', 'left:140px;top:250px')}
    {el('titulo', '02', at('02', 'envidia'), 'golpe', 'Nvidia <span class="gris" style="font-size:.55em">sin</span> Jensen Huang', 'top:320px;font-size:80px;left:120px;right:120px', 'data-s="impacto"')}
    <div class="abs ficha" style="top:500px" data-b="02" {at('02', 'esperan')} data-e="tres"><b>VENTAS ESPERADAS DEL TRIMESTRE</b>
      <div class="big">US$ <span data-b="02" {at('02', 'esperan')} data-e="cuenta" data-v="109000" data-d="1.4" data-fijo="1">0</span> M</div></div>
    <img class="abs gpu" src="fotos/gpu.png" style="left:160px;top:760px" data-b="02" data-o="0.3" data-e="tres" data-ry="-25" data-hb="02" {at('02', 'superó').replace('data-w', 'data-hw')} data-s="whoosh">
    <div class="abs fila15" style="top:760px">{checks15}</div>
    {el('rot', '02', at('02', 'superó'), 'sube', 'Superó lo esperado <b class="verde">15 de 15</b>', 'top:820px')}
    {el('rot', '02', at('02', 'subió'), 'golpe', 'Al otro día: <b class="verde">subió 8</b> · <b class="rojo">bajó 7</b>', 'top:900px;font-size:50px', 'data-s="impacto"')}
    <div class="abs grid8" style="top:1000px">{cajas8}</div>
    {el('rot', '02', at('02', 'cinco'), 'golpe', 'Últimas 8: <b class="rojo">bajó 5</b>', 'top:1250px;font-size:56px', 'data-s="impacto"')}
    {el('credito', '02', at('02', 'últimas'), 'aparece', 'DÍA SIGUIENTE, CIERRE A CIERRE · MAYOR CAÍDA −8,5 % (27/02/2025) · NVDA, YAHOO FINANCE', 'left:140px;top:1380px')}
  </div>'''
B03 = f'''
  <div class="blq" data-b="03">
    {el('tag oro', '03', 'data-o="0"', 'izq', 'Martes 17 · 10:30 (Argentina)', 'left:140px;top:250px')}
    {el('titulo', '03', 'data-o="0"', 'sube', 'Ventas <span class="oro">minoristas</span>', 'top:330px;font-size:84px')}
    <div class="abs ficha" style="top:470px" data-b="03" {at('03', 'espera')} data-e="tres"><b>¿CUÁNTO GASTÓ LA GENTE? · ESPERADO</b>
      <div class="big"><span data-b="03" {at('03', 'espera')} data-e="cuenta" data-v="0.1" data-dec="1" data-pre="+" data-suf=" %" data-fijo="1">0</span></div></div>
    <div class="abs split" style="top:730px">
      <div data-b="03" {at('03', 'encima')} data-e="izq"><small>SALIÓ POR ENCIMA</small><b class="rojo">BAJÓ 8/12</b></div>
      <div data-b="03" {at('03', 'debajo')} data-e="der"><small>SALIÓ POR DEBAJO</small><b class="rojo">BAJÓ 6/8</b></div>
    </div>
    <div class="abs pts12" style="top:930px">{pts12}</div>
    <div class="abs pts12" style="top:1010px">{pts8}</div>
    {el('rot', '03', at('03', 'seis', 1, .7), 'golpe', 'Salga como salga,<br>la bolsa <b class="rojo">bajó la mayoría</b>', 'top:1120px;font-size:52px', 'data-s="impacto"')}
    {el('credito', '03', at('03', 'encima'), 'aparece', 'S&amp;P 500 EL DÍA DEL DATO · 11/2024 A 10/2026 · CÁLCULO PROPIO', 'left:140px;top:1380px')}
  </div>'''
B04 = f'''
  <div class="blq" data-b="04">
    {el('tag oro', '04', 'data-o="0"', 'izq', 'Miércoles 18 · 16:00 (Argentina)', 'left:140px;top:250px')}
    {el('titulo', '04', 'data-o="0"', 'golpe', 'Minutas de la <span class="oro">Fed</span>', 'top:330px;font-size:88px', 'data-s="impacto"')}
    {el('rot', '04', at('04', 'minutas', 1, .4), 'sube', 'El acta de su última reunión', 'top:450px;color:#cfd3da')}
    {el('cifra', '04', at('04', 'subió'), 'golpe', '15 de 23', 'top:540px;font-size:120px;color:#3dd68c', 'data-s="impacto"')}
    {el('rot', '04', at('04', 'subió', 1, .3), 'sube', 'veces <b class="verde">subió</b> la bolsa', 'top:700px')}
    <div class="abs barras2" style="top:860px">
      <div><small>DÍA CUALQUIERA</small><i data-b="04" {at('04', 'cuarenta')} data-e="barra" data-v="470"></i><b>±0,66 %</b></div>
      <div><small>DÍA DE MINUTAS</small><i class="oroi" data-b="04" {at('04', 'cuarenta', 1, .3)} data-e="barra" data-v="670"></i><b class="oro">±0,94 %</b></div>
    </div>
    {el('cifra', '04', at('04', 'cualquiera'), 'golpe', '+42 %', 'top:1150px', 'data-s="impacto"')}
    {el('credito', '04', at('04', 'cuarenta'), 'aparece', 'MOVIMIENTO DEL S&amp;P 500 · 23 MINUTAS DESDE 2024 · FOTO: EDIFICIO ECCLES, WIKIMEDIA COMMONS, CC BY-SA', 'left:140px;top:1380px')}
  </div>'''
B05 = f'''
  <div class="blq" data-b="05">
    {el('tag oro', '05', 'data-o="0"', 'izq', 'Jueves 19 · antes de la apertura', 'left:140px;top:250px')}
    <div class="abs polaroid" style="left:170px;top:330px;width:740px;height:500px" data-b="05" data-o="0" data-e="foto" data-r="-3" data-s="cinta"><img src="fotos/walmart.jpg"><div class="pie">WALMART · ESPERADO: US$ 0,64 POR ACCIÓN</div></div>
    {el('rot', '05', at('05', 'superó'), 'sube', 'Superó lo esperado <b class="verde">10 de 11</b>', 'top:900px')}
    {el('rot', '05', at('05', 'seis'), 'golpe', 'pero <b class="rojo">bajó 6</b>', 'top:970px;font-size:56px', 'data-s="impacto"')}
    <div class="abs grid3" style="top:1070px">{caj3}</div>
    {el('credito', '05', 'data-o="0.3"', 'aparece', 'DÍA DEL REPORTE · WMT, YAHOO FINANCE · FOTO: JARED C. BENEDICT, CC BY-SA', 'left:140px;top:1380px')}
  </div>'''
B06 = f'''
  <div class="blq" data-b="06">
    {el('titulo', '06', 'data-o="0"', 'golpe', 'Un buen número<br><span class="rojo">no garantiza</span><br>que suba', 'top:280px;font-size:88px', 'data-s="impacto"')}
    {el('sello', '06', at('06', 'pasó'), 'sello', 'Es lo que pasó<small>no lo que va a pasar</small>', 'left:210px;top:610px;font-size:44px;color:#9fd0ff;border-color:#9fd0ff;background:rgba(4,20,40,.85)', 'data-r="-3" data-s="sello"')}
    <div class="abs ag" style="top:800px;gap:12px">
      <div data-b="06" {at('06', 'regla', 1, 0)} data-e="izq"><b>MAR 17 · 10:30 · VENTAS MINORISTAS</b></div>
      <div data-b="06" {at('06', 'regla', 1, .15)} data-e="izq" style="border-left-color:#ff5a55"><b style="color:#ff8a85">MAR 17 · DESPUÉS DEL CIERRE · NVIDIA</b></div>
      <div data-b="06" {at('06', 'regla', 1, .3)} data-e="izq"><b>MIÉ 18 · 16:00 · MINUTAS DE LA FED</b></div>
      <div data-b="06" {at('06', 'regla', 1, .45)} data-e="izq"><b>JUE 19 · ANTES DE LA APERTURA · WALMART</b></div>
    </div>
    {el('sello', '06', at('06', 'achico'), 'sello', 'Achico el riesgo<small>o espero</small>', 'left:200px;top:1180px;font-size:46px', 'data-r="-4" data-s="sello"')}
    {el('credito', '06', at('06', 'achico'), 'aparece', 'ASÍ LO HAGO YO · NO ES RECOMENDACIÓN DE INVERSIÓN', 'left:140px;top:1380px')}
  </div>'''
B07 = '''
  <div class="blq" data-b="07">
    <div class="abs titulo" style="top:250px;font-size:96px" data-b="07" data-o="0" data-e="golpe" data-s="impacto">Guardalo<br><span class="oro">para el martes</span></div>
    <div class="abs marcador" style="left:440px;top:500px;width:200px;height:220px" data-b="07" data-o="0.3" data-e="pop" data-s="clic"></div>
    <div class="abs rot" style="top:740px;font-size:48px" data-b="07" data-o="1.0" data-e="sube">Comentá <b class="oro">qué fecha vas a mirar</b></div>
    <div class="abs tarjeta" style="top:840px" data-b="07" data-o="0.5" data-e="sube" id="tarjeta"></div>
  </div>'''
plantilla = open('escena-plantilla.html').read()
html = plantilla.replace('<!--BLOQUES-->', B01 + B02 + B03 + B04 + B05 + B06 + B07)
open('escena-cine.html', 'w').write(html); print('ok')
