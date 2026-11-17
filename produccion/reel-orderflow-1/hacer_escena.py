"""Genera escena-cine.html desde textos-voz.json y escena-plantilla.html (cada efecto atado a una palabra de la voz)."""
import json, unicodedata
TX = json.load(open('textos-voz.json'))
def nz(s): return ''.join(c for c in unicodedata.normalize('NFD', s.lower()) if c.isalnum())
def W(b, p, n=1):
    ws = [nz(w) for w in TX[b if b in TX else b + 'ig'].split()]; k = 0
    for i, w in enumerate(ws):
        if w.startswith(nz(p)):
            k += 1
            if k == n: return i
    raise SystemExit(f'no encuentro «{p}» en {b}')
def at(b, p, n=1, o=None): return f'data-w="{W(b, p, n)}"' + (f' data-o="{o}"' if o is not None else '')
def el(cls, b, w, e, txt, style='', extra=''): return f'<div class="abs {cls}" style="{style}" data-b="{b}" {w} data-e="{e}" {extra}>{txt}</div>'
H = f'''
  <div class="blq" data-b="01">
    {el('tag oro', '01', 'data-o="ya"', 'aparece', '● Lección 1 · flujo de órdenes', 'left:140px;top:250px')}
    {el('titulo', '01', 'data-o="ya"', 'aparece', 'Se negoció <span class="oro">10× más</span><br><span class="rojo">y no subió</span>', 'top:310px;font-size:76px;left:120px;right:120px')}
  </div>
  <div class="blq" data-b="02">
    {el('titulo', '02', 'data-o="0"', 'golpe', 'Cada operación', 'top:300px;font-size:84px', 'data-s="impacto"')}
    <div class="abs chips" style="top:1080px">
      <div style="border-color:#3dd68c;color:#3dd68c" data-b="02" {at('02', 'compra')} data-e="izq">1 COMPRA<small>LO QUE SE COMPRA</small></div>
      <div class="igual" style="border:0;background:none" data-b="02" {at('02', 'mismo')} data-e="pop">=</div>
      <div style="border-color:#ff6b6b;color:#ff6b6b" data-b="02" {at('02', 'vende')} data-e="der">1 VENTA<small>LO QUE SE VENDE</small></div>
    </div>
    {el('titulo', '02', at('02', 'quién'), 'golpe', 'Lo que mueve el precio:<br><span class="oro">quién tiene apuro</span>', 'top:1250px;font-size:56px', 'data-s="impacto"')}
  </div>
  <div class="blq" data-b="03">
    {el('titulo', '03', 'data-o="0"', 'sube', 'Dos tipos de orden', 'top:270px;font-size:68px')}
    <div class="abs chips" style="top:370px">
      <div style="border-color:#ff6b6b;color:#ff6b6b;font-size:34px" data-b="03" {at('03', 'limitada')} data-e="izq">LIMITADA<small>ESPERA QUIETA · LA GÓNDOLA</small></div>
      <div style="border-color:#ffde8c;color:#ffde8c;font-size:34px" data-b="03" {at('03', 'mercado')} data-e="der">A MERCADO<small>LLEGA APURADA · SE LLEVA</small></div>
    </div>
  </div>
  <div class="blq" data-b="04">
    {el('titulo', '04', 'data-o="0"', 'sube', 'Se vacía <span class="rojo">la góndola</span>', 'top:280px;font-size:72px')}
    {el('titulo', '04', at('04', 'sube'), 'golpe', '<span class="verde">▲</span> así sube el precio', 'top:390px;font-size:52px', 'data-s="impacto"')}
  </div>
  <div class="blq" data-b="05">
    {el('titulo', '05', 'data-o="0"', 'sube', 'Compran… <span class="rojo">y no sube</span>', 'top:280px;font-size:68px')}
    {el('titulo', '05', at('05', 'absorción'), 'golpe', '<span class="oro">Absorción</span>', 'top:385px;font-size:84px', 'data-s="impacto"')}
  </div>
  <div class="blq" data-b="06">
    {el('tag oro', '06', 'data-o="0"', 'izq', 'Caso real · Bitcoin · 30/09/2026', 'left:140px;top:250px')}
    <div class="abs logico" style="top:330px" data-b="06" {at('06', 'lógico')} data-e="pop" data-s="tic"><span>LO LÓGICO</span><b class="verde">Con ese volumen, seguir subiendo ▲</b></div>
    {el('titulo', '06', at('06', 'terminó'), 'golpe', '<span class="rojo">No subió</span>', 'top:395px;font-size:60px', 'data-s="impacto"')}
  </div>
  <div class="blq" data-b="07">
    {el('sello', '07', at('07', 'caso'), 'sello', 'Es un caso<small>no una regla · no es recomendación</small>', 'left:200px;top:330px;font-size:54px', 'data-r="-4" data-s="sello"')}
    <div class="abs chips" style="top:640px">
      <div style="border-color:#3dd68c;color:#3dd68c" data-b="07" {at('07', 'volumen')} data-e="izq">VOLUMEN ✓<small>LO QUE VEMOS ACÁ</small></div>
      <div style="border-color:#ff6b6b;color:#ff6b6b" data-b="07" {at('07', 'órdenes')} data-e="der">ÓRDENES ✗<small>NO SE VEN EN ESTE GRÁFICO</small></div>
    </div>
    {el('titulo', '07', at('07', 'pista'), 'sube', 'Una <span class="oro">pista</span> para mirar', 'top:880px;font-size:64px')}
    {el('titulo', '07', at('07', 'lección'), 'golpe', 'Lección 1 · <span class="oro">flujo de órdenes</span>', 'top:1060px;font-size:56px', 'data-s="impacto"')}
  </div>'''
B8 = '''
  <div class="blq" data-b="08">
    <div class="abs titulo" style="top:250px;font-size:78px;left:120px;right:120px" data-b="08" data-o="0" data-e="golpe" data-s="impacto">${V === 'ig' ? 'Comentá <span class="oro">GÓNDOLA</span>' : 'Lección 2 <span class="oro">pronto</span>'}</div>
    <div class="abs titulo" style="top:470px;font-size:48px" data-b="08" data-o="0.4" data-e="sube">${V === 'ig' ? 'y te aviso la lección 2' : 'suscribite para no perdértela'}</div>
    <div class="abs tarjeta" style="top:700px" data-b="08" data-o="0.6" data-e="sube" id="tarjeta"></div>
  </div>'''
html = open('escena-plantilla.html').read().replace('<!--BLOQUES-->', H + '\n<script>document.write(`' + B8 + '`)</script>')
open('escena-cine.html', 'w').write(html); print('ok')
