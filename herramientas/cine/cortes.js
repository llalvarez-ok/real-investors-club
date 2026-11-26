// Biblioteca «expediente cine con cortes» (Renata, 26/11/2026) para Reels y Shorts verticales 1080x1920 en un solo canvas.
// Nace del rechazo de «Bitcoin y el oro cayeron juntos» (una sola toma, gráficos chicos, títulos repetidos, media pantalla
// vacía) y de lo que Lean aprobó (Corea y Bitcoin dos zonas: fotos y gráficos reales, cifra en el cuadro 0).
//
// Idea: la escena es una lista de PLANOS. Cada plano empieza atado a una palabra de la voz (W(bloque, 'frase')) y dura hasta
// el siguiente: entre plano y plano hay un CORTE de verdad (otra composición, otro fondo, otro título), con golpe de zoom y
// un destello corto. Dentro de cada plano la cámara nunca está quieta (empuje lento + elementos que entran con la voz).
//
// Contrato de la escena (herramientas/cine/LEEME.md): window.cuadro(t) determinista, window.listo, window.EVENTOS (sonidos
// para mezcla.py), window.TEXTOS (textos visibles, para lectura.js) y window.SUBS (trozos de subtítulo).
//
// Uso en la escena (después de cargar los tiempos en window.T):
//   <script src="../../herramientas/cine/cortes.js"></script>
//   const P = [ plano(W('01','dije'), 'gancho', (t, k, q) => {...}), ... ];   // k = segundos desde el corte, q = 0..1 del plano
//   arrancar({ planos: P, fotos: {...}, claves: [...], etiqueta: t => '...', pie: [...], creditos: t => '...' });
/* eslint-disable no-unused-vars */
const C = { f1: '#071426', f2: '#0d2142', oro: '#e2c68c', oro2: '#c7a35e', oro3: '#8e7140', txt: '#ecf1f9', txt2: '#a3b5d1',
  verde: '#3dd68c', rojo: '#ff6b6b', borde: '#274a80', negro: '#03080f' };
const TIT = 'Archivo, sans-serif', SANS = '"IBM Plex Sans", sans-serif', MONO = '"IBM Plex Mono", monospace';
const ZX0 = 140, ZX1 = 870, ZY0 = 250, ZY1 = 1440, ZC = 505;   // zona segura (centro x 505)
const cv = document.getElementById('c'), X = cv.getContext('2d');
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const io = k => (k = cl(k), k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const out3 = k => 1 - Math.pow(1 - cl(k), 3);
const back = k => { k = cl(k); const s = 1.4; return 1 + (s + 1) * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2); };
const ramp = (t, a, d = .35) => cl((t - a) / d);
const pulso = (t, a, d = .25) => { const k = (t - a) / d; return k < 0 || k > 1 ? 0 : Math.sin(Math.PI * k); };
const hex = (c, a) => { const n = parseInt(c.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const fmt = (n, dec = 0) => { const s = Math.abs(n).toFixed(dec).split('.'); return (n < 0 ? '−' : '') + s[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (s[1] ? ',' + s[1] : ''); };
const pct = (v, dec = 0) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(dec).replace('.', ',') + ' %';
function rr(x, y, w, h, r) { X.beginPath(); X.moveTo(x + r, y); X.arcTo(x + w, y, x + w, y + h, r); X.arcTo(x + w, y + h, x, y + h, r);
  X.arcTo(x, y + h, x, y, r); X.arcTo(x, y, x + w, y, r); X.closePath(); }
// pseudoaleatorio fijo por semilla (el mismo cuadro sale igual en cualquier proceso)
const azar = (i, n = 0) => { const s = Math.sin(i * 127.1 + n * 311.7) * 43758.5453; return s - Math.floor(s); };

// ───────────────────────── tiempos de la voz (buscar la palabra por texto dentro del bloque) ─────────────────────────
const T = window.T, B = {}; T.bloques.forEach((b, i) => { B[b.id] = b; b.fin = i + 1 < T.bloques.length ? T.bloques[i + 1].ini : T.total; });
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿?¡!.,:;«»"()…]/g, '').trim();
const FALTAN = [];
// W(bloque, 'frase', n, fin): arranque (o final) de la n-ésima aparición de la frase; si no está, una posición aproximada
function W(id, frase, n = 0, fin = false, def = .5) {
  const b = B[id]; if (!b) { FALTAN.push(id + ': sin bloque'); return 0; }
  const ws = frase.split(' ').map(norm), P = b.palabras;
  for (let i = 0; i + ws.length <= P.length; i++)
    if (ws.every((w, j) => norm(P[i + j][2]) === w)) { if (n-- === 0) return fin ? P[i + ws.length - 1][1] : P[i][0]; }
  FALTAN.push(`${id}: «${frase}»`); return b.ini + def * (b.fin - b.ini); }
const INI = id => B[id] ? B[id].ini : 0, FIN = id => B[id] ? B[id].fin : T.total;
// la primera frase que aparezca de una lista (la voz real puede cambiar una palabra)
function Wq(id, frases, def = .5, n = 0) { for (const f of frases) { const ln = FALTAN.length, t = W(id, f, n, false, def); if (FALTAN.length === ln) return t; FALTAN.pop(); }
  FALTAN.push(`${id}: «${frases.join(' / ')}» (aprox.)`); return B[id] ? B[id].ini + def * (B[id].fin - B[id].ini) : 0; }

// ───────────────────────── textos con registro para lectura.js ─────────────────────────
let TX = [];
function caja(x0, y0, x1, y1, id, text, pass) { const m = X.getTransform();
  const p = [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].map(([u, v]) => [m.a * u + m.c * v + m.e, m.b * u + m.d * v + m.f]);
  TX.push({ id, text, pass: !!pass, x0: Math.min(...p.map(q => q[0])), y0: Math.min(...p.map(q => q[1])), x1: Math.max(...p.map(q => q[0])), y1: Math.max(...p.map(q => q[1])) }); }
function texto(s, x, y, font, color, align = 'left', a = 1, opt = {}) {
  if (a <= 0 || !s) return 0; const ga = X.globalAlpha; X.globalAlpha = ga * a; X.font = font; X.fillStyle = color; X.textAlign = align;
  X.textBaseline = 'middle';
  if (opt.sombra !== false) { X.shadowColor = 'rgba(0,0,0,.7)'; X.shadowBlur = opt.blur ?? 18; X.shadowOffsetY = 4; }
  X.fillText(s, x, y); X.shadowColor = 'transparent';
  const w = X.measureText(s).width;
  if (X.globalAlpha >= .9 && !opt.noLeer && (opt.listo ?? true)) { const fs = parseFloat(font.match(/(\d+)px/)[1]);
    const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; caja(x0, y - fs * .5, x0 + w, y + fs * .5, opt.id || s, s, opt.pass); }
  X.globalAlpha = ga; return w; }
// ajusta el tamaño para que el texto entre en un ancho
function ajusta(s, peso, fs, ancho, fam = TIT) { X.font = `${peso} ${fs}px ${fam}`; const w = X.measureText(s).width; return w > ancho ? Math.floor(fs * ancho / w) : fs; }
function chip(s, x, y, color, a = 1, opt = {}) {
  if (a <= 0) return 0; X.save(); X.globalAlpha *= a; const fs = opt.fs || 26; X.font = `600 ${fs}px ${MONO}`;
  const w = X.measureText(s).width + 40, h = fs + 26, x0 = opt.izq ? x : opt.der ? x - w : x - w / 2;
  X.shadowColor = 'rgba(0,0,0,.5)'; X.shadowBlur = 18; X.shadowOffsetY = 6;
  rr(x0, y - h / 2, w, h, 8); X.fillStyle = opt.relleno || 'rgba(3,8,15,.9)'; X.fill(); X.fillStyle = hex(color, .14); X.fill(); X.shadowColor = 'transparent';
  X.lineWidth = 2.5; X.strokeStyle = color; X.stroke();
  texto(s, x0 + 20, y + 1, `600 ${fs}px ${MONO}`, opt.tc || color, 'left', 1, { ...opt, sombra: false, listo: a >= .95 }); X.restore(); return w; }
// título de una idea: líneas [[texto, color], ...] (una por renglón), entra con un rebote corto; registra el título completo
function titulo(lineas, y, fs, k, opt = {}) {
  if (k <= 0) return; X.save(); const e = back(k); X.globalAlpha *= cl(k * 2.5) * (opt.a ?? 1);
  const x = opt.x ?? ZC, ancho = opt.ancho || 660, lh = fs * (opt.lh || 1.0);
  const L = lineas.map(l => Array.isArray(l[0]) ? l : [l]);
  let f = fs; for (const l of L) f = Math.min(f, ajusta(l.map(p => p[0]).join(''), 900, fs, ancho));
  X.translate(x, y + 34 * (1 - e)); X.scale(.92 + .08 * e, .92 + .08 * e);
  X.font = `900 ${f}px ${TIT}`; X.textBaseline = 'middle'; X.shadowColor = 'rgba(0,0,0,.75)'; X.shadowBlur = 26; X.shadowOffsetY = 6;
  let ymin = 1e9, ymax = -1e9, xmin = 1e9, xmax = -1e9;
  L.forEach((l, i) => { const ws = l.map(p => X.measureText(p[0]).width), tot = ws.reduce((a, b) => a + b, 0); let xx = opt.izq ? -ancho / 2 : -tot / 2;
    const yy = (i - (L.length - 1) / 2) * lh;
    l.forEach((p, j) => { X.fillStyle = p[1] || C.txt; X.textAlign = 'left'; X.fillText(p[0], xx, yy); xx += ws[j]; });
    xmin = Math.min(xmin, opt.izq ? -ancho / 2 : -tot / 2); xmax = Math.max(xmax, opt.izq ? -ancho / 2 + tot : tot / 2); ymin = Math.min(ymin, yy - f * .5); ymax = Math.max(ymax, yy + f * .5); });
  if (X.globalAlpha >= .9 && k >= 1) caja(xmin, ymin, xmax, ymax, 'tit', L.map(l => l.map(p => p[0]).join('')).join(' / '));
  X.restore(); }
// número gigante con brillo: entra grande y se acomoda; los dígitos se ordenan uno por uno
function numero(s, x, y, fs, color, k, opt = {}) {
  if (k <= 0) return; X.save(); X.globalAlpha *= cl(k * 2.5);
  const z = lerp(1.35, 1, out3(k)) * (opt.s || 1); X.translate(x, y); X.scale(z, z);
  let txt = s; if (k < .5 && opt.mezcla !== false) { const n = Math.floor(k / .5 * s.length); txt = s.split('').map((ch, i) => i < n || !/\d/.test(ch) ? ch : String((i * 7 + Math.floor(k * 50)) % 10)).join(''); }
  const f = ajusta(s, 900, fs, (opt.ancho || 660) / (opt.s || 1));
  X.font = `900 ${f}px ${TIT}`; X.textAlign = opt.align || 'center'; X.textBaseline = 'middle';
  X.shadowColor = hex(color, .5); X.shadowBlur = 60; X.fillStyle = color; X.fillText(txt, 0, 0);
  X.shadowColor = 'rgba(0,0,0,.8)'; X.shadowBlur = 22; X.shadowOffsetY = 8; X.fillText(txt, 0, 0);
  if (k >= 1 && X.globalAlpha >= .9 && !opt.noLeer) { const w = X.measureText(s).width, x0 = opt.align === 'left' ? 0 : opt.align === 'right' ? -w : -w / 2; caja(x0, -f * .45, x0 + w, f * .45, opt.id || 'num:' + s, s); }
  X.restore(); }
// sello con doble borde que golpea (rotado); lineas: ['TEXTO GRANDE', 'texto chico']
function sello(lineas, x, y, color, k, opt = {}) {
  if (k <= 0) return; X.save(); const e = out3(k); X.globalAlpha *= cl(k * 4) * (opt.a ?? 1);
  X.translate(x, y); X.rotate((opt.rot ?? -6) * Math.PI / 180); X.scale(lerp(2.6, 1, e), lerp(2.6, 1, e));
  const fs = opt.fs || 64, f = ajusta(lineas[0], 900, fs, opt.ancho || 560);
  X.font = `900 ${f}px ${TIT}`; const w1 = X.measureText(lineas[0]).width;
  X.font = `600 ${Math.round(f * .36)}px ${MONO}`; const w2 = lineas[1] ? X.measureText(lineas[1]).width : 0;
  const w = Math.max(w1, w2) + 70, h = f * 1.05 + (lineas[1] ? f * .5 : 0) + 34;
  X.fillStyle = hex(color, .16); X.fillRect(-w / 2, -h / 2, w, h);
  X.strokeStyle = color; X.lineWidth = 7; X.strokeRect(-w / 2, -h / 2, w, h); X.lineWidth = 2.5; X.strokeRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24);
  X.fillStyle = color; X.textAlign = 'center'; X.textBaseline = 'middle'; X.shadowColor = hex(color, .4); X.shadowBlur = 24;
  X.font = `900 ${f}px ${TIT}`; X.fillText(lineas[0], 0, lineas[1] ? -f * .26 : 4);
  if (lineas[1]) { X.font = `600 ${Math.round(f * .36)}px ${MONO}`; X.fillText(lineas[1], 0, f * .5); }
  if (k >= 1 && X.globalAlpha >= .9) caja(-w / 2, -h / 2, w / 2, h / 2, 'sello:' + lineas[0], lineas[0]);
  X.restore(); }
// raya roja que tacha (de izquierda a derecha)
function tacha(x0, x1, y, k, color = C.rojo, gr = 16) { if (k <= 0) return; X.save(); X.strokeStyle = color; X.lineWidth = gr; X.lineCap = 'round';
  X.shadowColor = hex(color, .6); X.shadowBlur = 20; X.beginPath(); X.moveTo(x0, y + 8); X.lineTo(lerp(x0, x1, out3(k)), y - 8); X.stroke(); X.restore(); }
// tilde verde en un círculo que se dibuja
function tilde(x, y, r, k, color = C.verde) { if (k <= 0) return; X.save(); X.translate(x, y); X.scale(lerp(1.6, 1, out3(k)), lerp(1.6, 1, out3(k)));
  X.globalAlpha *= cl(k * 3); X.fillStyle = hex(color, .18); X.beginPath(); X.arc(0, 0, r, 0, 7); X.fill(); X.strokeStyle = color; X.lineWidth = r * .12; X.stroke();
  X.lineWidth = r * .2; X.lineCap = 'round'; X.lineJoin = 'round'; X.shadowColor = hex(color, .7); X.shadowBlur = 30; const q = cl(k * 1.4);
  X.beginPath(); X.moveTo(-r * .45, 0); X.lineTo(lerp(-r * .45, -r * .1, cl(q * 2)), lerp(0, r * .35, cl(q * 2)));
  if (q > .5) X.lineTo(lerp(-r * .1, r * .5, cl(q * 2 - 1)), lerp(r * .35, -r * .38, cl(q * 2 - 1))); X.stroke(); X.restore(); }
// flecha gruesa con volumen (para tasa ↑, caminos, etc.)
function flecha(x0, y0, x1, y1, color, k, gr = 22) { if (k <= 0) return; const e = out3(k), x = lerp(x0, x1, e), y = lerp(y0, y1, e), a = Math.atan2(y - y0, x - x0);
  X.save(); X.strokeStyle = color; X.fillStyle = color; X.lineWidth = gr; X.lineCap = 'round'; X.shadowColor = hex(color, .55); X.shadowBlur = 26;
  X.beginPath(); X.moveTo(x0, y0); X.lineTo(x - Math.cos(a) * gr * 1.2, y - Math.sin(a) * gr * 1.2); X.stroke();
  X.translate(x, y); X.rotate(a); X.beginPath(); X.moveTo(gr * .6, 0); X.lineTo(-gr * 1.9, -gr * 1.5); X.lineTo(-gr * 1.9, gr * 1.5); X.closePath(); X.fill(); X.restore(); }

// ───────────────────────── fotos ─────────────────────────
const IMG = {};
function carga(k, src) { return new Promise(r => { const i = new Image(); i.onload = () => { IMG[k] = i; r(); }; i.onerror = () => { console.error('sin foto ' + src); r(); }; i.src = src; }); }
const LOOK = { noche: ['saturate(.65) contrast(1.15) brightness(.78)', 'rgba(7,20,38,.38)'], oro: ['saturate(.9) contrast(1.12) brightness(.82)', 'rgba(60,40,6,.18)'],
  rojo: ['saturate(.45) contrast(1.25) brightness(.6)', 'rgba(90,10,14,.34)'], frio: ['saturate(.45) contrast(1.15) brightness(.75)', 'rgba(8,24,52,.42)'],
  limpio: ['none', 'rgba(0,0,0,0)'], retrato: ['saturate(.95) contrast(1.08) brightness(1.02)', 'rgba(0,0,0,0)'] };
// foto que cubre una caja con cámara (cx, cy, zoom del inicio al final del plano); oscuro = velo negro
function foto(k, caja0, kb, q, look = 'noche', oscuro = .25) {
  const im = IMG[k]; if (!im) return; const [bx, by, bw, bh] = caja0 || [0, 0, 1080, 1920];
  const e = io(q), cx = lerp(kb[0], kb[3], e), cy = lerp(kb[1], kb[4], e), z = lerp(kb[2], kb[5], e);
  const s = Math.max(bw / im.naturalWidth, bh / im.naturalHeight) * z, w = im.naturalWidth * s, h = im.naturalHeight * s;
  const x = cl(bx + bw / 2 - cx * w, bx + bw - w, bx), y = cl(by + bh / 2 - cy * h, by + bh - h, by), L = LOOK[look] || LOOK.noche;
  X.save(); X.beginPath(); X.rect(bx, by, bw, bh); X.clip(); X.filter = L[0]; X.drawImage(im, x, y, w, h); X.filter = 'none';
  X.fillStyle = L[1]; X.fillRect(bx, by, bw, bh); if (oscuro) { X.fillStyle = `rgba(3,8,15,${oscuro})`; X.fillRect(bx, by, bw, bh); } X.restore(); }
// degradé arriba y abajo para que se lean el título y los subtítulos sobre una foto
function velos(arriba = .8, abajo = .92) { const g = X.createLinearGradient(0, 0, 0, 1920);
  g.addColorStop(0, `rgba(3,8,15,${arriba})`); g.addColorStop(.24, 'rgba(3,8,15,0)'); g.addColorStop(.56, 'rgba(3,8,15,0)'); g.addColorStop(.66, `rgba(3,8,15,${abajo * .55})`);
  g.addColorStop(.76, `rgba(3,8,15,${abajo})`); g.addColorStop(1, `rgba(3,8,15,${abajo})`); X.fillStyle = g; X.fillRect(0, 0, 1080, 1920); }
// retrato de Lean (PNG con borde suave) grande, con luz dorada de contorno
function retrato(k, cx, cy, d, q, opt = {}) {
  const im = IMG[k]; if (!im) return; X.save(); X.globalAlpha *= opt.a ?? 1; const z = lerp(opt.z0 || 1, opt.z1 || 1.06, io(q)), D = d * z;
  const sx = opt.sx || 0, sy = opt.sy || 0, sz = opt.sz || 1;   // recorte: centro relativo (sx, sy) y fracción del lado (sz)
  const g = X.createRadialGradient(cx, cy, D * .2, cx, cy, D * .75); g.addColorStop(0, hex(C.oro, .22)); g.addColorStop(1, hex(C.oro, 0));
  X.fillStyle = g; X.fillRect(cx - D, cy - D, D * 2, D * 2);
  X.filter = LOOK.retrato[0]; const w = im.naturalWidth * sz;
  X.drawImage(im, im.naturalWidth * (.5 + sx) - w / 2, im.naturalHeight * (.5 + sy) - w / 2, w, w, cx - D / 2, cy - D / 2, D, D); X.filter = 'none'; X.restore(); }

// ───────────────────────── fondos ─────────────────────────
const FONDO = document.createElement('canvas'); FONDO.width = 1080; FONDO.height = 1920;
(() => { const g = FONDO.getContext('2d'), lg = g.createLinearGradient(0, 0, 0, 1920); lg.addColorStop(0, C.f1); lg.addColorStop(1, C.f2);
  g.fillStyle = lg; g.fillRect(0, 0, 1080, 1920); g.strokeStyle = 'rgba(163,181,209,.05)'; g.lineWidth = 1;
  for (let x = 0; x <= 1080; x += 60) { g.beginPath(); g.moveTo(x + .5, 0); g.lineTo(x + .5, 1920); g.stroke(); }
  for (let y = 0; y <= 1920; y += 60) { g.beginPath(); g.moveTo(0, y + .5); g.lineTo(1080, y + .5); g.stroke(); } })();
function fondo(t) { X.drawImage(FONDO, 0, 0); if (CFG.fantasma) CFG.fantasma(t); }
const POLVO = [...Array(40)].map((_, i) => ({ x: azar(i, 1) * 1080, y: azar(i, 2) * 1920, v: 10 + azar(i, 3) * 30, s: 1.2 + azar(i, 4) * 2.6, f: azar(i, 5) * 6 }));
function polvo(t, a = 1) { X.save(); for (const p of POLVO) { const y = ((p.y - p.v * t) % 1920 + 1920) % 1920;
  X.globalAlpha = a * (.2 + .2 * Math.sin(t * 1.3 + p.f)); X.fillStyle = C.oro; X.beginPath(); X.arc(p.x + 16 * Math.sin(t * .4 + p.f), y, p.s, 0, 7); X.fill(); } X.restore(); }
function vineta() { const g = X.createRadialGradient(540, 860, 520, 540, 900, 1250); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); X.fillStyle = g; X.fillRect(0, 0, 1080, 1920); }

// ───────────────────────── gráficos reales ─────────────────────────
// datos: [{f, o, h, l, c}] (velas) o [[f, v]] (línea). vista: {i0, i1, v0, v1} (índices y precios visibles).
// Devuelve {x(i), y(v)} para dibujar encima. opt: {caja, tipo, log, hasta (índice revelado), color, area, ejes, fechas}
function grafico(datos, vista, opt = {}) {
  const [bx, by, bw, bh] = opt.caja || [100, 420, 880, 800], lg = !!opt.log;
  const V = v => lg ? Math.log(v) : v, a = V(vista.v0), b = V(vista.v1);
  const gx = i => bx + (i - vista.i0) / (vista.i1 - vista.i0) * bw, gy = v => by + bh - (V(v) - a) / (b - a) * bh;
  X.save();
  if (opt.panel !== false) { X.fillStyle = 'rgba(3,8,15,.55)'; X.fillRect(bx - 20, by - 20, bw + 40, bh + 40); }
  if (opt.ejes !== false) { X.strokeStyle = 'rgba(163,181,209,.12)'; X.lineWidth = 1.5;
    const pasos = opt.niveles || (() => { const r = vista.v1 - vista.v0, p = Math.pow(10, Math.floor(Math.log10(r / 4))), m = [1, 2, 2.5, 5, 10].find(m => r / (p * m) <= 6) * p;
      const o = []; for (let v = Math.ceil(vista.v0 / m) * m; v <= vista.v1; v += m) o.push(v); return o; })();
    for (const v of pasos) { const y = gy(v); if (y < by - 2 || y > by + bh + 2) continue; X.beginPath(); X.moveTo(bx, y); X.lineTo(bx + bw, y); X.stroke();
      texto(fmt(v), bx + bw - 6, y - 16, `500 20px ${MONO}`, 'rgba(163,181,209,.7)', 'right', 1, { pass: true, sombra: false }); } }
  X.beginPath(); X.rect(bx - 20, by - 20, bw + 40, bh + 40); X.clip();
  const hasta = opt.hasta ?? datos.length - 1, i0 = Math.max(0, Math.floor(vista.i0) - 1), i1 = Math.min(Math.floor(hasta), Math.ceil(vista.i1) + 1);
  if (opt.tipo === 'linea') {
    const val = i => datos[i][1] ?? datos[i].c, col = opt.color || C.oro;
    if (opt.area) { X.beginPath(); X.moveTo(gx(i0), by + bh); for (let i = i0; i <= i1; i++) X.lineTo(gx(i), gy(val(i))); X.lineTo(gx(i1), by + bh); X.closePath();
      const g = X.createLinearGradient(0, by, 0, by + bh); g.addColorStop(0, hex(col, .32)); g.addColorStop(1, hex(col, 0)); X.fillStyle = g; X.fill(); }
    X.beginPath(); for (let i = i0; i <= i1; i++) { const x = gx(i), y = gy(val(i)); i === i0 ? X.moveTo(x, y) : X.lineTo(x, y); }
    if (hasta % 1 && i1 + 1 < datos.length) { const f = hasta % 1; X.lineTo(lerp(gx(i1), gx(i1 + 1), f), lerp(gy(val(i1)), gy(val(i1 + 1)), f)); }
    X.strokeStyle = col; X.lineWidth = opt.grosor || 5; X.lineJoin = 'round'; X.shadowColor = hex(col, .5); X.shadowBlur = 16; X.stroke(); X.shadowBlur = 0;
  } else {
    const ancho = Math.max(2, bw / (vista.i1 - vista.i0) * .64);
    for (let i = i0; i <= i1; i++) { const d = datos[i], up = d.c >= d.o, col = up ? C.verde : C.rojo, x = gx(i);
      X.strokeStyle = col; X.fillStyle = col; X.lineWidth = Math.max(1.5, ancho * .16);
      X.beginPath(); X.moveTo(x, gy(d.h)); X.lineTo(x, gy(d.l)); X.stroke();
      const y0 = gy(Math.max(d.o, d.c)), y1 = gy(Math.min(d.o, d.c)); X.fillRect(x - ancho / 2, y0, ancho, Math.max(2, y1 - y0)); }
  }
  for (const m of opt.medias || []) { X.beginPath(); let ok = false;
    for (let i = i0; i <= Math.min(i1, Math.floor(m.hasta ?? i1)); i++) { const v = datos[i][m.campo]; if (v == null) continue; const x = gx(i), y = gy(v); ok ? X.lineTo(x, y) : X.moveTo(x, y); ok = true; }
    X.strokeStyle = m.color || C.oro; X.lineWidth = m.grosor || 5; X.shadowColor = hex(m.color || C.oro, .6); X.shadowBlur = 14; X.stroke(); X.shadowBlur = 0; }
  X.restore();
  if (opt.fechas) for (const [i, s] of opt.fechas) { const x = gx(i); if (x < bx - 5 || x > bx + bw + 5) continue;
    texto(s, x, by + bh + 28, `500 20px ${MONO}`, 'rgba(163,181,209,.75)', 'center', 1, { pass: true, sombra: false }); }
  return { x: gx, y: gy, caja: [bx, by, bw, bh] };
}
// línea horizontal de precio con rótulo (se dibuja de izquierda a derecha con k)
function nivel(G, v, color, k, rotulo, opt = {}) { if (k <= 0) return; const [bx, , bw] = G.caja, y = G.y(v), x1 = bx + bw * out3(k);
  X.save(); X.strokeStyle = color; X.lineWidth = opt.grosor || 4; if (opt.punteada) X.setLineDash([18, 12]); X.shadowColor = hex(color, .6); X.shadowBlur = 14;
  X.beginPath(); X.moveTo(bx, y); X.lineTo(x1, y); X.stroke(); X.restore();
  if (rotulo && k > .6) chip(rotulo, opt.izq ? bx + 10 : bx + bw - 10, y + (opt.abajo ? 40 : -40), color, cl((k - .6) * 3), { fs: opt.fs || 28, izq: opt.izq, der: !opt.izq }); }
// punto que late sobre el gráfico
function punto(x, y, color, k, r = 14) { if (k <= 0) return; X.save(); X.globalAlpha *= cl(k * 3); const p = (k * 1.6) % 1;
  X.strokeStyle = hex(color, 1 - p); X.lineWidth = 4; X.beginPath(); X.arc(x, y, r + p * 40, 0, 7); X.stroke();
  X.fillStyle = color; X.shadowColor = color; X.shadowBlur = 20; X.beginPath(); X.arc(x, y, r, 0, 7); X.fill(); X.restore(); }

// ───────────────────────── objetos con volumen (vector) ─────────────────────────
// calendario de escritorio en 3D con la hoja que cae
function calendario(cx, cy, s, mes, dia, pie, k, t) {
  X.save(); X.translate(cx, cy); X.scale(s, s); const e = back(k); X.globalAlpha *= cl(k * 3);
  X.rotate(-.06 + .02 * Math.sin(t * .8)); X.scale(.85 + .15 * e, .85 + .15 * e);
  X.shadowColor = 'rgba(0,0,0,.6)'; X.shadowBlur = 60; X.shadowOffsetY = 30;
  rr(-230, -250, 460, 520, 34); X.fillStyle = '#e9edf3'; X.fill(); X.shadowColor = 'transparent';
  const g = X.createLinearGradient(0, -250, 0, 270); g.addColorStop(0, 'rgba(255,255,255,.0)'); g.addColorStop(1, 'rgba(0,0,0,.14)'); X.fillStyle = g; rr(-230, -250, 460, 520, 34); X.fill();
  X.save(); rr(-230, -250, 460, 150, 34); X.clip(); X.fillStyle = '#c62f3a'; X.fillRect(-230, -250, 460, 150); X.restore();
  for (const x of [-120, 120]) { X.fillStyle = '#5a6577'; rr(x - 16, -290, 32, 90, 14); X.fill(); X.fillStyle = 'rgba(255,255,255,.35)'; rr(x - 8, -284, 8, 70, 4); X.fill(); }
  X.fillStyle = '#fff'; X.font = `800 64px ${TIT}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(mes, 0, -176);
  X.fillStyle = '#0d2142'; X.font = `900 270px ${TIT}`; X.fillText(dia, 0, 40);
  X.fillStyle = '#8e7140'; X.font = `700 40px ${MONO}`; X.fillText(pie, 0, 205);
  X.restore();
  if (k >= 1) caja(cx - 230 * s, cy - 250 * s, cx + 230 * s, cy + 270 * s, 'cal', `${mes} ${dia} ${pie}`); }
// moneda de oro con volumen que gira (cara: símbolo)
function moneda(cx, cy, r, ang, simbolo, opt = {}) {
  X.save(); X.translate(cx, cy); const c = Math.cos(ang), esp = r * .14, sx = Math.max(.04, Math.abs(c));
  for (let i = 10; i >= 1; i--) { X.save(); X.translate(Math.sin(ang) * esp * i / 10, 0); X.scale(sx, 1); X.beginPath(); X.arc(0, 0, r, 0, 7);
    X.fillStyle = i % 2 ? '#8a672a' : '#6f521f'; X.fill(); X.restore(); }
  X.scale(sx, 1); const g = X.createRadialGradient(-r * .35, -r * .4, r * .1, 0, 0, r * 1.05);
  g.addColorStop(0, '#fff1c4'); g.addColorStop(.35, '#e8c56d'); g.addColorStop(.8, '#b38a37'); g.addColorStop(1, '#7a5a22');
  X.shadowColor = 'rgba(0,0,0,.6)'; X.shadowBlur = 50; X.shadowOffsetY = 24; X.beginPath(); X.arc(0, 0, r, 0, 7); X.fillStyle = g; X.fill(); X.shadowColor = 'transparent';
  X.lineWidth = r * .06; X.strokeStyle = 'rgba(122,90,34,.9)'; X.beginPath(); X.arc(0, 0, r * .86, 0, 7); X.stroke();
  for (let i = 0; i < 60; i++) { const a = i / 60 * 6.283; X.fillStyle = 'rgba(122,90,34,.6)'; X.fillRect(Math.cos(a) * r * .93 - 2, Math.sin(a) * r * .93 - 2, 4, 4); }
  X.fillStyle = 'rgba(110,78,24,.95)'; X.font = `900 ${r * 1.05}px ${TIT}`; X.textAlign = 'center'; X.textBaseline = 'middle';
  X.fillText(c >= 0 ? simbolo : (opt.dorso || simbolo), 0, r * .04);
  X.fillStyle = 'rgba(255,248,220,.55)'; X.fillText(c >= 0 ? simbolo : (opt.dorso || simbolo), -r * .025, -r * .015);
  const br = X.createLinearGradient(-r, -r, r, r); const p = (ang * .3) % 1; br.addColorStop(cl(p - .1), 'rgba(255,255,255,0)'); br.addColorStop(cl(p), 'rgba(255,255,255,.35)'); br.addColorStop(cl(p + .1), 'rgba(255,255,255,0)');
  X.fillStyle = br; X.beginPath(); X.arc(0, 0, r, 0, 7); X.fill(); X.restore(); }
// lingote de oro con volumen (isométrico), con grabado
function lingote(cx, cy, w, grabado, opt = {}) {
  X.save(); X.translate(cx, cy); const h = w * .42, d = w * .3, inset = w * .12;
  const cara = (pts, col) => { X.beginPath(); pts.forEach((p, i) => i ? X.lineTo(...p) : X.moveTo(...p)); X.closePath(); X.fillStyle = col; X.fill(); };
  X.shadowColor = 'rgba(0,0,0,.65)'; X.shadowBlur = 60; X.shadowOffsetY = 30;
  cara([[-w / 2, 0], [w / 2, 0], [w / 2 - inset, -h], [-w / 2 + inset, -h]], '#b8913f'); X.shadowColor = 'transparent';
  const gt = X.createLinearGradient(0, -h - d, 0, -h); gt.addColorStop(0, '#fff0bd'); gt.addColorStop(1, '#e2c068');
  cara([[-w / 2 + inset, -h], [w / 2 - inset, -h], [w / 2 - inset - d * .5, -h - d], [-w / 2 + inset + d * .5, -h - d]], gt);
  const gf = X.createLinearGradient(0, -h, 0, 0); gf.addColorStop(0, '#d9b25a'); gf.addColorStop(1, '#9b7630'); cara([[-w / 2, 0], [w / 2, 0], [w / 2 - inset, -h], [-w / 2 + inset, -h]], gf);
  cara([[w / 2, 0], [w / 2 - inset, -h], [w / 2 - inset - d * .5, -h - d], [w / 2 - d * .3, -d * .4]], '#8a672a');
  X.fillStyle = 'rgba(90,62,18,.9)'; X.font = `800 ${w * .11}px ${MONO}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(grabado, 0, -h * .5);
  X.fillStyle = 'rgba(255,245,210,.5)'; X.fillText(grabado, -1.5, -h * .5 - 1.5);
  X.restore(); }

// ───────────────────────── subtítulos palabra por palabra ─────────────────────────
// Trozos de idea completa: se corta en la puntuación; si una frase es larga, se parte donde no queda colgada una palabra de
// enlace («de», «la», «que», «si»…), nunca a mitad de idea («SI TU PLATA ESTÁ EN» no puede pasar).
const ENLACE = new Set(['de', 'la', 'el', 'los', 'las', 'que', 'en', 'a', 'y', 'o', 'su', 'sus', 'un', 'una', 'con', 'por', 'para', 'si', 'no', 'se', 'lo', 'al', 'del', 'mis', 'mi', 'tu', 'es', 'muy', 'hasta', 'ante', 'más', 'casi', 'cada', 'pero', 'aun', 'largo', 'corto', 'mediano', 'este', 'esta']);
let SUBS = [];
const CORTA_ANTES = new Set(['y', 'ya', 'que', 'si', 'hasta', 'salvo', 'del', 'en', 'el', 'aun', 'pero', 'porque', 'cuando', 'mientras', 'como', 'o', 'antes', 'para']);
function armarSubs(maxL = 30) {
  SUBS = [];
  for (const b of T.bloques) { const s = b.subs, frases = []; let f = [];
    s.forEach((w, i) => { f.push(w); if (/[.:;?!…]$/.test(w[2]) || i === s.length - 1) { frases.push(f); f = []; } });
    for (const fr of frases) { let cur = [];
      const largo = a => a.reduce((p, w) => p + w[2].length + 1, -1);
      for (let i = 0; i < fr.length; i++) { cur.push(fr[i]);
        // si la coma o el punto llegan en una o dos palabras más y no se pasa mucho, se espera
        let fin = -1; for (let j = i + 1; j <= Math.min(fr.length - 1, i + 2); j++) if (/[,.:;?!…]$/.test(fr[j][2])) { fin = j; break; }
        if (largo(cur) > maxL && fin > 0 && largo(cur.concat(fr.slice(i + 1, fin + 1))) <= maxL + 13) continue;
        if (largo(cur) > maxL && cur.length > 2) {
          // mejor corte dentro del trozo: después de una coma o antes de un conector, nunca dejando colgada una palabra de enlace
          let mejor = cur.length - 1, pm = -99;
          for (let j = 2; j <= cur.length; j++) { const ant = cur[j - 1][2], sig = j < cur.length ? norm(cur[j][2]) : ''; if (j === cur.length && !/,$/.test(ant)) continue; let p = 0;
            if (/,$/.test(ant)) p += 4; if (CORTA_ANTES.has(sig)) p += 3; if (ENLACE.has(norm(ant)) && !/,$/.test(ant)) p -= 6;
            p -= Math.abs(largo(cur.slice(0, j)) - maxL * .85) / 8; if (p > pm) { pm = p; mejor = j; } }
          SUBS.push({ p: cur.slice(0, mejor) }); cur = cur.slice(mejor); } }
      if (cur.length) SUBS.push({ p: cur }); } }
  // trozos muy cortos (menos de 1,8 s): se juntan con el siguiente si entran en dos renglones y no cruzan un punto
  for (let i = 0; i < SUBS.length - 1; i++) { const c = SUBS[i], d = SUBS[i + 1], txt = c.p.concat(d.p).map(w => w[2]).join(' ');
    const ult = c.p[c.p.length - 1];
    if (d.p[d.p.length - 1][1] - c.p[0][0] < 1.8 + 1.4 && (c.p[c.p.length - 1][1] - c.p[0][0] < 1.8) && txt.length <= 40 && !/[.?!…]$/.test(ult[2]) && d.p[0][0] - ult[1] < .6) {
      c.p = c.p.concat(d.p); SUBS.splice(i + 1, 1); i--; } }
  // la puntuación de pantalla: sin punto y coma (queda raro en mayúsculas)
  SUBS.forEach(c => c.p = c.p.map(w => [w[0], w[1], w[2].replace(/;$/, ',')]));
  SUBS.forEach(c => { c.a = c.p[0][0] - .04; c.fin = c.p[c.p.length - 1][1]; });
  SUBS.forEach((c, i) => { c.b = i + 1 < SUBS.length ? Math.min(SUBS[i + 1].a, c.fin + 1.0) : c.fin + .8; });
  window.SUBS = SUBS.map(c => ({ a: c.a, b: c.b, texto: c.p.map(s => s[2]).join(' ') })); }
let CLAVES = new Set();
function subtitulos(t) {
  const c = SUBS.find(c => t >= c.a && t < c.b); if (!c) return;
  // dos renglones como máximo: si no entra, baja el tamaño
  let fs = 66, ws, an, lin, esp;
  for (; fs >= 46; fs -= 4) { X.font = `900 ${fs}px ${TIT}`; esp = fs * .27; ws = c.p.map(s => s[2].toUpperCase()); an = ws.map(w => X.measureText(w).width);
    lin = [[]]; let ac = 0; ws.forEach((w, i) => { if (ac + an[i] > 700 && lin[lin.length - 1].length) { lin.push([]); ac = 0; } lin[lin.length - 1].push(i); ac += an[i] + esp; });
    if (lin.length <= 2) break; }
  const y0 = lin.length > 1 ? 1286 : 1318;
  X.save(); const g = X.createLinearGradient(0, y0 - 70, 0, y0 + 70 + (lin.length - 1) * 78); g.addColorStop(0, 'rgba(3,8,15,0)'); g.addColorStop(.3, 'rgba(3,8,15,.55)'); g.addColorStop(.7, 'rgba(3,8,15,.55)'); g.addColorStop(1, 'rgba(3,8,15,0)');
  X.fillStyle = g; X.fillRect(0, y0 - 70, 1080, 140 + (lin.length - 1) * 78); X.restore();
  lin.forEach((ln, li) => { const tot = ln.reduce((p, i) => p + an[i] + esp, -esp); let x = ZC - tot / 2;
    ln.forEach(i => { const s = c.p[i], dicha = t >= s[0] - .03, ahora = dicha && t < s[1] + .05, clave = norm(s[2]).split(' ').some(p => CLAVES.has(p)) || CLAVES.has(norm(s[2]));
      X.save(); X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = `900 ${fs}px ${TIT}`; X.shadowColor = 'rgba(0,0,0,.9)'; X.shadowBlur = 16; X.shadowOffsetY = 4;
      X.fillStyle = dicha ? (clave ? C.oro : C.txt) : 'rgba(163,181,209,.4)'; X.fillText(ws[i], x, y0 + li * fs * 1.16 - (ahora ? 5 : 0)); X.restore(); x += an[i] + esp; }); }); }

// ───────────────────────── planos y cortes ─────────────────────────
const EV = []; const ev = (t, s) => { if (t >= 0 && t < T.total) EV.push({ t: +t.toFixed(3), s }); };
function plano(t0, nombre, dibuja, opt = {}) { return { t0, nombre, dibuja, ...opt }; }
let CFG = {};
function arrancar(cfg) {
  CFG = cfg; CLAVES = new Set((cfg.claves || []).map(norm));
  const P = cfg.planos.filter(Boolean).sort((a, b) => a.t0 - b.t0);
  P.forEach((p, i) => { p.t1 = i + 1 < P.length ? P[i + 1].t0 : T.total; if (i && p.son !== false) ev(p.t0 - .08, i % 2 ? 'whoosh' : 'cinta'); });
  CFG.P = P; armarSubs(cfg.maxSub || 34);
  EV.sort((a, b) => a.t - b.t); window.EVENTOS = EV;
  window.PLANOS = P.map(p => ({ t0: +p.t0.toFixed(2), t1: +p.t1.toFixed(2), nombre: p.nombre }));
  window.FALTAN = FALTAN; if (FALTAN.length) console.warn('palabras no encontradas: ' + FALTAN.join(' | '));
  window.cuadro = cuadro;
  window.listo = (async () => {
    await Promise.all([`900 80px Archivo`, `800 40px Archivo`, `700 40px Archivo`, `600 30px "IBM Plex Mono"`, `500 20px "IBM Plex Mono"`, `700 30px "IBM Plex Mono"`,
      `500 24px "IBM Plex Sans"`, `600 24px "IBM Plex Sans"`, `700 24px "IBM Plex Sans"`].map(f => document.fonts.load(f)));
    await Promise.all(Object.entries(cfg.fotos || {}).map(([k, s]) => carga(k, s)));
    cuadro(0); return true; })();
}
function cuadro(t) {
  t = +t; TX = []; X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.filter = 'none'; X.shadowColor = 'transparent';
  const P = CFG.P; let i = 0; for (let j = 0; j < P.length; j++) if (t >= P[j].t0) i = j;
  const p = P[i], k = t - p.t0, q = cl(k / Math.max(.1, p.t1 - p.t0));
  fondo(t);
  // golpe de zoom al entrar y empuje lento todo el plano (la cámara nunca queda quieta)
  X.save(); const z = 1 + .035 * (1 - out3(k / .32)) * (i ? 1 : 0) + .05 * q * (p.empuje ?? 1);
  X.translate(ZC + 10 * Math.sin(t * .9), 845 + 8 * Math.cos(t * .7)); X.scale(z, z); X.rotate((p.giro ?? 0) * io(q) * Math.PI / 180); X.translate(-ZC, -845);
  p.dibuja(t, k, q, p); X.restore();
  polvo(t, .7); vineta();
  // destello del corte
  if (i) { const f = pulso(t, p.t0 - .02, .22); if (f > 0) { X.fillStyle = `rgba(255,244,220,${.22 * f})`; X.fillRect(0, 0, 1080, 1920); } }
  window.PLANO = p.nombre; hud(t); subtitulos(t);
  window.TEXTOS = TX;
}
// barra de progreso, marca, etiqueta del bloque, aviso y créditos
function hud(t) {
  X.fillStyle = 'rgba(255,255,255,.12)'; X.fillRect(0, 0, 1080, 8); X.fillStyle = C.oro; X.fillRect(0, 0, 1080 * cl(t / T.total), 8);
  texto('REAL INVESTORS CLUB', 60, 150, `800 24px ${TIT}`, C.oro, 'left', .9, { pass: true, noLeer: true });
  const et = CFG.etiqueta ? CFG.etiqueta(t) : null;
  if (et) chip(et.txt, et.x ?? ZX0 + 10, et.y ?? 300, et.color || C.oro, 1, { izq: true, fs: et.fs || 24 });
  const pie = CFG.pie || ['Contenido educativo. No constituye recomendación de inversión.'];
  pie.forEach((s, i) => texto(s, ZC, 1406 + i * 24, `500 20px ${SANS}`, C.txt2, 'center', .85, { id: 'pie' + i, sombra: false, pass: false, noLeer: i > 0 }));
  const cr = CFG.creditos ? CFG.creditos(t) : ''; if (cr) texto(cr, ZC, 1470, `500 16px ${MONO}`, 'rgba(163,181,209,.6)', 'center', 1, { pass: true, sombra: false });
}
