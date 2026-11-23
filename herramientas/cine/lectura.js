// Chequeo de lectura de una escena con window.cuadro(t) (idea de readcheck.mjs de Lemo-Opuscar, MIT, adaptada a nuestro contrato).
//   node herramientas/cine/lectura.js "<escena.html?v=ig>" [--paso 0.04] [--cps 15] [--margen 1.5] [--minimo 1.5] [--sub 1.8]
// La página expone, después de cada cuadro(t):
//   window.TEXTOS = [{id, text, x0, y0, x1, y1, pass}]  textos visibles casi opacos y en su escala final (caja en píxeles de pantalla)
//   window.SUBS   = [{a, b, texto}]                     trozos de subtítulo (desde a hasta b, en segundos)
// Reglas:
//   - cada texto (id + texto) tiene que quedar en pantalla, de corrido, al menos max(minimo, letras / cps + margen) s;
//   - su caja tiene que estar dentro de la zona segura (x 140–870, y 250–1440), salvo los marcados pass (pie, rótulos de ejes);
//   - cada trozo de subtítulo dura al menos --sub s (1,8 por defecto).
// Salida: una línea por texto (OK / MAL) y un resumen. Código 0 si todo pasa, 1 si algo falla, 2 si no se pudo chequear.
const { chromium } = require('playwright');
const args = process.argv.slice(2), url = args[0], op = (k, d) => { const i = args.indexOf(k); return i >= 0 ? +args[i + 1] : d; };
const PASO = op('--paso', .04), CPS = op('--cps', 15), MARGEN = op('--margen', 1.5), MINIMO = op('--minimo', 1.5), SUB = op('--sub', 1.8);
const ZX0 = 140, ZX1 = 870, ZY0 = 250, ZY1 = 1440;
(async () => {
  if (!url) { console.error('uso: node herramientas/cine/lectura.js "<escena.html?v=ig>"'); process.exit(2); }
  const b = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto(url.startsWith('/') ? 'file://' + url : url); await p.evaluate(() => window.listo);
  const res = await p.evaluate(({ PASO }) => {
    if (typeof window.cuadro !== 'function') return { error: 'sin window.cuadro' };
    const total = window.T.total, vistos = {}, fuera = {};
    for (let t = 0; t <= total; t += PASO) {
      window.cuadro(t); const vis = new Set();
      for (const x of window.TEXTOS || []) {
        if (x.pass) continue; const k = x.id + '\u0000' + x.text; vis.add(k);
        const s = vistos[k] ??= { id: x.id, text: x.text, t0: t, dur: 0, cerrado: false };
        if (!s.cerrado) s.dur = t + PASO - s.t0;
        if ((x.x0 < 140 - .5 || x.x1 > 870 + .5 || x.y0 < 250 - .5 || x.y1 > 1440 + .5)) fuera[k] ??= { ...x, t };
      }
      for (const k in vistos) if (!vis.has(k)) vistos[k].cerrado = true;
    }
    return { vistos: Object.values(vistos), fuera: Object.values(fuera), subs: window.SUBS || [], total };
  }, { PASO });
  await b.close();
  if (res.error || !res.vistos.length) { console.error('lectura: NO SE PUDO CHEQUEAR — ' + (res.error || 'window.TEXTOS nunca devolvió textos')); process.exit(2); }
  let mal = 0;
  console.log('TEXTOS EN PANTALLA (necesita = letras/' + CPS + ' + ' + MARGEN + ' s)');
  for (const s of res.vistos.sort((a, b) => a.t0 - b.t0)) {
    const letras = [...s.text].filter(c => !/\s/.test(c)).length, nec = Math.max(MINIMO, letras / CPS + MARGEN), ok = s.dur >= nec - 1e-6;
    if (!ok) mal++;
    console.log(`${ok ? 'OK ' : 'MAL'} ${s.t0.toFixed(2).padStart(6)} s  ${String(letras).padStart(3)} letras  necesita ${nec.toFixed(2)}  tuvo ${s.dur.toFixed(2)}  ${JSON.stringify(s.text.slice(0, 40))}`);
  }
  for (const f of res.fuera) { mal++; console.log(`MAL ${f.t.toFixed(2).padStart(6)} s  fuera de la zona segura (${Math.round(f.x0)}–${Math.round(f.x1)}, ${Math.round(f.y0)}–${Math.round(f.y1)})  ${JSON.stringify(f.text.slice(0, 40))}`); }
  console.log('SUBTÍTULOS (mínimo ' + SUB + ' s por trozo)');
  let malS = 0;
  for (const s of res.subs) { const d = s.b - s.a, ok = d >= SUB - 1e-6 || s.b >= res.total - .05; if (!ok) { malS++; console.log(`MAL ${s.a.toFixed(2).padStart(6)} s  ${d.toFixed(2)} s  ${JSON.stringify(s.texto)}`); } }
  console.log(`subtítulos: ${res.subs.length} trozos, ${malS} cortos; textos: ${res.vistos.length}, ${mal} con problemas`);
  process.exit(mal + malS ? 1 : 0);
})();
