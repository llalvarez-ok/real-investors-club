// Motor del estilo «expediente cine» (Reels y Shorts verticales 1080x1920, 30 fps).
// Junta tres capas: fotos reales con cámara (Ken Burns, gradación, profundidad), partículas doradas que toman forma
// (texto, íconos, barras o la misma foto, que se deshace en partículas) y el expediente en DOM (recortes, sellos,
// polaroids, contadores), más grano de película, viñeta, destellos y subtítulos palabra por palabra.
// window.cuadro(t) deja la página en el segundo t; window.EVENTOS lista los efectos de sonido para la mezcla.
//
// La escena define antes de cargar este archivo:
//   window.T   tiempos de la voz (herramientas/cine/voz.py): {total, bloques: [{id, ini, dur, palabras, subs}]}
//   window.ESC = {fotos: {nombre: 'fotos/x.jpg'}, planos: [...], particulas: [...], clave: /regex/}
//     plano:     {b, w | o, hasta: {b, w | o} | dur, foto, kb: [cx0, cy0, z0, cx1, cy1, z1], look, blur: [a, b], caja}
//     partícula: {b, w | o, forma, x, y, s, color, txt, alfa}
//   y en el DOM elementos con data-b + data-w | data-o, data-e (efecto), data-s (sonido), data-hb/data-hw (hasta).
(function () {
  const W = 1080, H = 1920, N = 4200, T = window.T, E = window.ESC;
  const B = {}; T.bloques.forEach((b, i) => { B[b.id] = b; b.fin = i + 1 < T.bloques.length ? T.bloques[i + 1].ini : T.total; });
  const cl = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const eo = x => 1 - Math.pow(1 - x, 3), eio = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const back = x => { const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const lerp = (a, b, p) => a + (b - a) * p;
  // números pseudoaleatorios fijos: el mismo cuadro sale igual en cualquier proceso
  let sem = 7; const rnd = () => { sem = (sem * 16807) % 2147483647; return (sem - 1) / 2147483646; };
  const tde = (r, def) => {  // tiempo de una referencia {b, w, o}
    if (!r) return def; const b = B[r.b]; if (!b) return def;
    if (r.w !== undefined) { const w = b.palabras[Math.min(r.w, b.palabras.length - 1)]; return w[0] + (r.o || 0); }
    return b.ini + (r.o || 0);
  };
  const $ = s => document.querySelector(s);
  const bg = $('#bg').getContext('2d'), pc = $('#pt').getContext('2d'), fx = $('#fx').getContext('2d');
  const glow = document.createElement('canvas'); glow.width = W / 4; glow.height = H / 4; const gc = glow.getContext('2d');
  const IMG = {}; Object.entries(E.fotos || {}).forEach(([k, src]) => { const i = new Image(); i.src = src; IMG[k] = i; });

  // ---------- fotos (planos) ----------
  const PL = (E.planos || []).map(p => ({ ...p, t0: tde(p), t1: p.hasta ? tde(p.hasta) : tde(p) + (p.dur || 3) }));
  const LOOK = {  // gradación: filtro de canvas y un tinte encima
    noche: ['saturate(.6) contrast(1.2) brightness(.8)', 'rgba(10,22,48,.42)'],
    frio: ['saturate(.4) contrast(1.15) brightness(.8)', 'rgba(8,24,52,.45)'],
    rojo: ['saturate(.4) contrast(1.3) brightness(.55)', 'rgba(90,10,14,.38)'],
    oro: ['saturate(.6) contrast(1.15) brightness(.7)', 'rgba(70,48,8,.3)'],
    doc: ['saturate(.2) contrast(1.15) brightness(.75)', 'rgba(14,20,34,.3)'],
  };
  function rectFoto(p, t) {  // dónde queda la foto en el cuadro (cubre la caja con zoom y paneo)
    const im = IMG[p.foto], c = p.caja || [0, 0, W, H], k = p.kb || [.5, .5, 1.08, .5, .5, 1.18];
    const q = eio(cl((t - p.t0) / Math.max(.1, p.t1 - p.t0)));
    const cx = lerp(k[0], k[3], q), cy = lerp(k[1], k[4], q), z = lerp(k[2], k[5], q);
    const s = Math.max(c[2] / im.naturalWidth, c[3] / im.naturalHeight) * z, w = im.naturalWidth * s, h = im.naturalHeight * s;
    const x = c[0] + c[2] / 2 - cx * w + (w - c[2]) * 0 , y = c[1] + c[3] / 2 - cy * h;
    return [cl(x, c[0] + c[2] - w, c[0]), cl(y, c[1] + c[3] - h, c[1]), w, h, c];
  }
  function dibujaPlanos(t) {
    bg.globalCompositeOperation = 'source-over'; bg.filter = 'none';
    bg.fillStyle = '#05070c'; bg.fillRect(0, 0, W, H);
    // grilla tenue de terminal (la del estilo de partículas)
    bg.fillStyle = 'rgba(226,183,74,.035)';
    for (let x = 0; x < W; x += 90) bg.fillRect(x, 0, 1, H);
    for (let y = 30; y < H; y += 90) bg.fillRect(0, y, W, 1);
    for (const p of PL) {
      if (t < p.t0 - .35 || t > p.t1 + .35 || !IMG[p.foto] || !IMG[p.foto].complete) continue;
      let a = cl((t - p.t0 + .35) / .35) * cl((p.t1 + .35 - t) / .35);
      if (p.sale === 'disuelve') a = cl((t - p.t0 + .35) / .35) * cl((p.t1 - t) / .6);
      const [x, y, w, h, c] = rectFoto(p, t), L = LOOK[p.look || 'noche'];
      const bl = p.blur ? lerp(p.blur[0], p.blur[1], eio(cl((t - p.t0) / Math.max(.1, p.t1 - p.t0)))) : 0;
      bg.save(); bg.globalAlpha = a * (p.alfa || 1); bg.beginPath(); bg.rect(c[0], c[1], c[2], c[3]); bg.clip();
      bg.filter = L[0] + (bl > .2 ? ` blur(${bl.toFixed(1)}px)` : ''); bg.drawImage(IMG[p.foto], x, y, w, h); bg.filter = 'none';
      bg.fillStyle = L[1]; bg.fillRect(c[0], c[1], c[2], c[3]);
      // degradé abajo y arriba para que el texto se lea
      const g = bg.createLinearGradient(0, c[1], 0, c[1] + c[3]);
      g.addColorStop(0, 'rgba(5,7,12,.75)'); g.addColorStop(.22, 'rgba(5,7,12,0)'); g.addColorStop(.6, 'rgba(5,7,12,.15)'); g.addColorStop(1, 'rgba(5,7,12,.95)');
      bg.fillStyle = g; bg.fillRect(c[0], c[1], c[2], c[3]); bg.restore();
    }
  }

  // ---------- partículas ----------
  const off = document.createElement('canvas'); off.width = W; off.height = H; const oc = off.getContext('2d', { willReadFrequently: true });
  const COL = { oro: [226, 183, 74], oro2: [255, 222, 140], rojo: [235, 77, 75], hielo: [120, 190, 255], blanco: [245, 245, 242], gris: [120, 124, 132], verde: [60, 200, 130] };
  function muestras(dibuja, n, semilla, umbral = 0) {  // puntos al azar dentro de lo que dibuja la función (en un canvas oculto)
    oc.clearRect(0, 0, W, H); oc.fillStyle = '#fff'; oc.strokeStyle = '#fff'; dibuja(oc);
    const d = oc.getImageData(0, 0, W, H).data, pts = [];
    for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) { const i = (y * W + x) * 4; if (d[i + 3] > 128 && d[i] + d[i + 1] + d[i + 2] >= umbral * 3) pts.push(x, y, d[i], d[i + 1], d[i + 2]); }
    sem = semilla; const out = new Float32Array(n * 5), m = pts.length / 5;
    for (let i = 0; i < n; i++) { const j = Math.floor(rnd() * m) * 5; out.set([pts[j] + rnd() * 2, pts[j + 1] + rnd() * 2, pts[j + 2], pts[j + 3], pts[j + 4]], i * 5); }
    return out;
  }
  const FORMAS = {
    texto: (c, k) => { c.font = `900 ${k.tam || 170}px "Inter Display", Inter, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(k.txt, k.x, k.y); },
    mira: (c, k) => { c.lineWidth = 14; const r = 190 * k.s; c.beginPath(); c.arc(k.x, k.y, r, 0, 7); c.stroke(); c.beginPath(); c.arc(k.x, k.y, r * .5, 0, 7); c.stroke();
      c.beginPath(); c.arc(k.x, k.y, 18, 0, 7); c.fill(); [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([a, b]) => c.fillRect(k.x + a * r * 1.25 - 7 + (a ? -a * 40 : 0), k.y + b * r * 1.25 - 7 + (b ? -b * 40 : 0), a ? 80 : 14, b ? 80 : 14)); },
    misil: (c, k) => { c.save(); c.translate(k.x, k.y); c.scale(k.s, k.s); c.beginPath(); c.moveTo(0, -260); c.quadraticCurveTo(48, -170, 46, -60);
      c.lineTo(46, 150); c.lineTo(100, 230); c.lineTo(46, 215); c.lineTo(28, 250); c.lineTo(-28, 250); c.lineTo(-46, 215); c.lineTo(-100, 230); c.lineTo(-46, 150);
      c.lineTo(-46, -60); c.quadraticCurveTo(-48, -170, 0, -260); c.fill(); c.globalAlpha = .55; for (let i = 0; i < 9; i++) { c.beginPath(); c.arc((i % 3 - 1) * 22, 300 + i * 34, 30 - i * 2, 0, 7); c.fill(); } c.restore(); },
    pregunta: (c, k) => { c.font = `900 ${520 * k.s}px "Inter Display", Inter, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', k.x, k.y); },
    btc: (c, k) => { c.lineWidth = 26; c.beginPath(); c.arc(k.x, k.y, 230 * k.s, 0, 7); c.stroke(); c.font = `900 ${300 * k.s}px "Inter Display", Inter, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('₿', k.x, k.y + 8); },
    anillo: (c, k) => { const r = 250 * k.s; c.lineWidth = 46; c.beginPath(); c.arc(k.x, k.y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (k.v || 1)); c.stroke(); },
    barras: (c, k) => { const max = k.max || Math.max(...k.v); k.v.forEach((v, i) => { const h = 560 * v / max, x = k.x + (i - (k.v.length - 1) / 2) * 300; c.fillRect(x - 95, k.y - h, 190, h); }); },
    candado: (c, k) => { c.save(); c.translate(k.x, k.y); c.scale(k.s, k.s); c.lineWidth = 40; c.beginPath(); c.arc(k.ab ? -70 : 0, -90, 110, Math.PI, 0); c.lineTo(k.ab ? 40 : 110, -20); c.stroke();
      c.beginPath(); c.roundRect(-170, -30, 340, 260, 30); c.fill(); c.globalCompositeOperation = 'destination-out'; c.beginPath(); c.arc(0, 70, 34, 0, 7); c.fill(); c.fillRect(-14, 70, 28, 80); c.restore(); },
    nube: (c, k) => { sem = 99; for (let i = 0; i < 260; i++) { const a = rnd() * 7, r = Math.sqrt(rnd()) * (k.r || 520); c.beginPath(); c.arc(k.x + Math.cos(a) * r, k.y + Math.sin(a) * r * (k.e || 1.5), 6, 0, 7); c.fill(); } },
    circulo: (c, k) => { c.beginPath(); c.arc(k.x, k.y, 260 * k.s, 0, 7); c.fill(); },
    clic: (c, k) => { c.save(); c.translate(k.x, k.y); c.scale(k.s, k.s); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 300); c.lineTo(70, 235); c.lineTo(120, 350); c.lineTo(170, 330); c.lineTo(120, 215); c.lineTo(210, 215); c.closePath(); c.fill(); c.restore(); },
    imagen: (c, k) => { if (IMG[k.img]) c.drawImage(IMG[k.img], k.x - k.w / 2, k.y - k.h / 2, k.w, k.h); },
  };
  const KF = (E.particulas || []).map((k, i) => ({ x: W / 2, y: 980, s: 1, color: 'oro', alfa: 1, ...k, t: tde(k) }));
  const ALL = new Float32Array(N * 8);  // por partícula: retardo, fase, frecuencia, amplitud de la curva, tamaño, brillo
  sem = 3; for (let i = 0; i < N; i++) ALL.set([rnd() * .38, rnd() * 6.28, .6 + rnd() * 1.6, (rnd() - .5) * 260, .8 + rnd() * 1.5, .45 + rnd() * .55], i * 8);
  function preparar() {
    KF.forEach((k, j) => {
      if (k.forma === 'foto') {  // la foto del plano, tal como se ve en ese momento, hecha partículas con sus colores
        const p = PL.find(p => p.foto === k.foto); const tt = k.t;
        k.pts = muestras(c => { const [x, y, w, h, cj] = rectFoto(p, tt); c.save(); c.beginPath(); c.rect(...cj); c.clip(); c.filter = 'saturate(1.2) brightness(1.6)'; c.drawImage(IMG[p.foto], x, y, w, h); c.restore(); }, N, 50 + j, k.umbral ?? 90);
        k.foto_col = true;
      } else if (k.forma === 'disperso') {
        sem = 70 + j; k.pts = new Float32Array(N * 5); for (let i = 0; i < N; i++) { const a = rnd() * 6.28, r = 300 + rnd() * 900; k.pts.set([k.x + Math.cos(a) * r, k.y + Math.sin(a) * r * 1.4, 0, 0, 0], i * 5); }
      } else k.pts = muestras(c => FORMAS[k.forma](c, k), N, 50 + j);
    });
  }
  // posición de cada partícula: viaja de la forma anterior a la nueva por una curva, con un temblor leve
  const PX = new Float32Array(N), PY = new Float32Array(N), PR = new Float32Array(N), PG = new Float32Array(N), PB = new Float32Array(N), PA = new Float32Array(N);
  function particulas(t) {
    pc.clearRect(0, 0, W, H); gc.clearRect(0, 0, W / 4, H / 4);
    let j = -1; for (let i = 0; i < KF.length; i++) if (KF[i].t <= t) j = i;
    if (j < 0) return;
    const D = 1.05;
    for (let i = 0; i < N; i++) {
      const o = i * 8, dl = ALL[o], ph = ALL[o + 1], fq = ALL[o + 2], cu = ALL[o + 3];
      // arranque: la forma del primer cuadro clave; después, cada transición sale de donde estaba
      let x = KF[0].pts[i * 5], y = KF[0].pts[i * 5 + 1], ca = KF[0], al = KF[0].alfa;
      for (let m = 1; m <= j; m++) {
        const k = KF[m], tEnd = m < j ? KF[m + 1].t : t, p = k.inst ? (tEnd >= k.t ? 1 : 0) : eio(cl((tEnd - k.t - dl * (k.dl ?? 1)) / (k.D || D)));
        const tx = k.pts[i * 5], ty = k.pts[i * 5 + 1], dx = tx - x, dy = ty - y, len = Math.hypot(dx, dy) + 1;
        const curva = Math.sin(Math.PI * p) * cu * Math.min(1, len / 600);
        x = x + dx * p - dy / len * curva; y = y + dy * p + dx / len * curva;
        if (m === j) { ca = p > .5 ? k : KF[m - 1]; al = lerp(KF[m - 1].alfa, k.alfa, p); } else { ca = k; al = k.alfa; }
      }
      const kk = KF[j], deriva = kk.forma === 'disperso' ? (t - kk.t) * 22 : 0;
      x += Math.sin(t * fq + ph) * 2.2 + Math.cos(ph) * deriva; y += Math.cos(t * fq * .8 + ph) * 2.2 + Math.sin(ph) * deriva - (kk.sube || 0) * (t - kk.t);
      PX[i] = x; PY[i] = y;
      let c = ca.foto_col ? [ca.pts[i * 5 + 2], ca.pts[i * 5 + 3], ca.pts[i * 5 + 4]] : COL[ca.color] || COL.oro;
      if (ca.color === 'mix' && ca.v2) c = (i % 100) < ca.v2 * 100 ? COL.oro : COL.gris;
      PR[i] = c[0]; PG[i] = c[1]; PB[i] = c[2]; PA[i] = al * ALL[o + 5];
    }
    pc.globalCompositeOperation = 'lighter';
    for (let i = 0; i < N; i++) {
      const s = ALL[i * 8 + 4] * 1.6, a = PA[i]; if (a < .02) continue;
      pc.fillStyle = `rgba(${PR[i] | 0},${PG[i] | 0},${PB[i] | 0},${a.toFixed(2)})`; pc.fillRect(PX[i] - s / 2, PY[i] - s / 2, s, s);
      if (i % 3 === 0) { gc.fillStyle = `rgba(${PR[i] | 0},${PG[i] | 0},${PB[i] | 0},${(a * .5).toFixed(2)})`; gc.fillRect(PX[i] / 4 - 1, PY[i] / 4 - 1, 2.2, 2.2); }
    }
    // brillo: copia chica, borrosa y sumada
    pc.filter = 'blur(5px)'; pc.globalAlpha = .9; pc.drawImage(glow, 0, 0, W, H); pc.filter = 'blur(18px)'; pc.globalAlpha = .55; pc.drawImage(glow, 0, 0, W, H);
    pc.filter = 'none'; pc.globalAlpha = 1; pc.globalCompositeOperation = 'source-over';
  }

  // ---------- polvo dorado en el aire (profundidad) ----------
  const POLVO = []; sem = 21; for (let i = 0; i < 46; i++) POLVO.push([rnd() * W, rnd() * H, 2 + rnd() * 9, rnd() * 6.28, .2 + rnd() * .8]);
  // ---------- grano de película: 6 texturas de ruido que se alternan ----------
  const GR = [...Array(6)].map(() => { const c = document.createElement('canvas'); c.width = 540; c.height = 960; const x = c.getContext('2d'), d = x.createImageData(540, 960);
    for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (rnd() - .5) * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; } x.putImageData(d, 0, 0); return c; });
  let flash = []; // destellos en los cambios de bloque y los golpes
  function efectos(t) {
    fx.clearRect(0, 0, W, H);
    fx.globalCompositeOperation = 'lighter';
    for (const [x0, y0, r, ph, v] of POLVO) {
      const x = (x0 + t * 14 * v) % W, y = (y0 - t * 20 * v + H) % H, a = .08 + .08 * Math.sin(t * v * 2 + ph);
      const g = fx.createRadialGradient(x, y, 0, x, y, r * 3); g.addColorStop(0, `rgba(255,214,130,${a})`); g.addColorStop(1, 'rgba(255,214,130,0)');
      fx.fillStyle = g; fx.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
    }
    // luz que se filtra (fuga de luz cálida que recorre el borde)
    const lx = W * (.5 + .55 * Math.sin(t * .23)), ly = H * (.15 + .1 * Math.cos(t * .17));
    const lg = fx.createRadialGradient(lx, ly, 0, lx, ly, 700); lg.addColorStop(0, 'rgba(255,170,60,.10)'); lg.addColorStop(1, 'rgba(255,170,60,0)');
    fx.fillStyle = lg; fx.fillRect(0, 0, W, H);
    // destellos
    let fl = 0; for (const f of flash) { const d = t - f.t; if (d >= 0 && d < f.d) fl = Math.max(fl, f.a * (1 - d / f.d)); }
    if (fl > 0) { fx.fillStyle = `rgba(255,240,220,${fl})`; fx.fillRect(0, 0, W, H); }
    fx.globalCompositeOperation = 'source-over';
    // viñeta
    const vg = fx.createRadialGradient(W / 2, H * .47, H * .28, W / 2, H * .5, H * .78); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.62)');
    fx.fillStyle = vg; fx.fillRect(0, 0, W, H);
    // grano
    fx.globalCompositeOperation = 'overlay'; fx.globalAlpha = .16; fx.drawImage(GR[Math.floor(t * 30) % 6], 0, 0, W, H); fx.globalAlpha = 1; fx.globalCompositeOperation = 'source-over';
  }

  // ---------- expediente (DOM) ----------
  const els = [...document.querySelectorAll('[data-e]')].map(el => {
    const r = { b: el.dataset.b, w: el.dataset.w !== undefined ? +el.dataset.w : undefined, o: +el.dataset.o || 0 };
    const h = el.dataset.hb ? { b: el.dataset.hb, w: el.dataset.hw !== undefined ? +el.dataset.hw : undefined, o: +el.dataset.ho || 0 } : null;
    return { el, t0: el.dataset.o === 'ya' ? -1 : tde(r, 0), e: el.dataset.e, d: +el.dataset.d || ({ escribe: .8, cuenta: 1.1, barra: .8, tacha: .5 }[el.dataset.e] || .45),
      txt: el.textContent, hasta: h ? tde(h) : null };
  });
  const golpes = els.filter(x => /impacto|sello/.test(x.el.dataset.s || '')).map(x => x.t0);
  flash = T.bloques.slice(1).map(b => ({ t: b.ini - .03, d: .16, a: .22 })).concat(golpes.map(t => ({ t, d: .12, a: .18 })));
  window.EVENTOS = els.filter(x => x.el.dataset.s).map(x => ({ t: Math.max(0, x.t0), s: x.el.dataset.s }))
    .concat(T.bloques.slice(1).map(b => ({ t: b.ini - .12, s: 'whoosh' })))
    .concat(KF.slice(1).filter(k => k.son).map(k => ({ t: k.t, s: k.son })));
  const fmt = (v, el) => { const dec = +el.dataset.dec || 0, s = v.toFixed(dec).replace('.', ',');
    return (el.dataset.pre || '') + s.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (el.dataset.suf || ''); };

  // ---------- subtítulos: hasta 3 grupos de voz por línea, la palabra que suena se enciende ----------
  const subs = []; T.bloques.forEach(b => { let g = [];
    b.subs.forEach((w, i) => { g.push(w); const sig = b.subs[i + 1];
      if (!sig || /[.,?:!]$/.test(w[2]) || g.length >= 3 || w[2].length > 8 && g.length >= 2 || (sig[0] - w[1] > .25)) { subs.push(g); g = []; } }); });
  const CLAVE = E.clave || /x^/; const sub = $('#sub');

  window.cuadro = function (t) {
    $('#progreso').style.width = (100 * cl(t / T.total)) + '%';
    let bq = T.bloques[0]; T.bloques.forEach(b => { if (t >= b.ini - .05) bq = b; });
    document.querySelectorAll('.blq').forEach(el => { const b = B[el.dataset.b]; el.style.display = b && (t >= b.ini - .05 || b === T.bloques[0]) && t < b.fin - .02 ? 'block' : 'none'; });
    $('#etiqueta').textContent = bq.etiqueta;
    // cámara: zoom lento por bloque, golpe de zoom al entrar y temblor en los impactos
    const pb = cl((t - bq.ini) / Math.max(.1, bq.fin - bq.ini)), entra = bq === T.bloques[0] ? 1 : cl((t - bq.ini + .05) / .35);
    let z = 1 + .03 * pb + .07 * (1 - eo(entra)), sx = 0, sy = 0, rot = 0;
    for (const g of golpes) { const d = t - g; if (d >= 0 && d < .35) { const a = (1 - d / .35) * 14; sx += Math.sin(d * 90) * a; sy += Math.cos(d * 75) * a * .7; rot += Math.sin(d * 60) * a * .02; } }
    $('#cam').style.transform = `translate(${sx}px,${sy}px) rotate(${rot}deg) scale(${z})`;
    const desen = 1 - eo(entra); $('#cam').style.filter = desen > .05 ? `blur(${(desen * 10).toFixed(1)}px)` : 'none';
    dibujaPlanos(t); particulas(t); efectos(t);
    for (const x of els) {
      const el = x.el, p = cl((t - x.t0) / x.d), e = eo(p); let op = t < x.t0 && !el.dataset.fijo && x.e !== 'tacha' ? 0 : 1, tr = '';
      if (x.hasta !== null && t > x.hasta) op = Math.max(0, 1 - (t - x.hasta) / .25);
      const r = +el.dataset.r || 0;
      switch (x.e) {
        case 'sube': op *= e; tr = `translateY(${(1 - e) * 80}px)`; break;
        case 'pop': op *= cl(p * 3); tr = `scale(${.3 + .7 * back(p)})`; break;
        case 'golpe': op *= cl(p * 4); tr = `scale(${2.4 - 1.4 * eo(p)})`; break;
        case 'sello': op *= cl(p * 4); tr = `scale(${2.8 - 1.8 * eo(p)}) rotate(${r || -8}deg)`; break;
        case 'foto': op *= cl(p * 2.5); tr = `perspective(1400px) translateY(${(1 - e) * -300}px) rotateX(${(1 - e) * 35}deg) rotate(${r + (1 - e) * 12}deg) scale(${1 + .03 * cl((t - x.t0) / 5)})`; break;
        case 'tres': op *= cl(p * 2); tr = `perspective(1200px) rotateY(${(1 - e) * -50 + (+el.dataset.ry || 0)}deg) translateZ(${(1 - e) * -300}px)`; break;
        case 'izq': op *= e; tr = `translateX(${(1 - e) * -180}px)`; break;
        case 'der': op *= e; tr = `translateX(${(1 - e) * 180}px)`; break;
        case 'escribe': el.textContent = t < x.t0 ? '' : x.txt.slice(0, Math.round(x.txt.length * p)); break;
        case 'cuenta': { const d0 = +el.dataset.desde || 0; el.textContent = fmt(d0 + (+el.dataset.v - d0) * eo(p), el); if (!el.dataset.fijo) op *= cl(p * 4); } tr = `scale(${1 + .15 * (1 - eo(p))})`; break;
        case 'barra': el.style.width = (cl(p) * (+el.dataset.v)) + 'px'; break;
        case 'tacha': el.style.setProperty('--tacha', (100 * eo(p)) + '%'); break;
        case 'aparece': op *= cl(p * 3); break;
        case 'glitch': { op *= cl(p * 4); const g = p < 1 ? Math.sin(t * 120) * 14 * (1 - p) : 0; tr = `translateX(${g}px) skewX(${g * .6}deg)`;
          el.style.textShadow = `${3 + g / 2}px 0 rgba(255,40,60,.8), ${-3 - g / 2}px 0 rgba(60,200,255,.8)`; break; }
      }
      el.style.opacity = op; if (tr) el.style.transform = tr;
    }
    const g = subs.find(g => t >= g[0][0] - .06 && t < g[g.length - 1][1] + .22);
    sub.innerHTML = g ? g.map(w => { const on = t >= w[0] - .03, k = CLAVE.test(w[2]);
      return `<span class="${on ? (k ? 'k on' : 'on') : ''}" style="${on && t < w[0] + .12 ? 'transform:scale(1.12)' : ''}">${w[2]}</span>`; }).join(' ') : '';
  };
  window.listo = Promise.all(Object.values(IMG).map(i => i.decode().catch(() => 0))).then(() => document.fonts.ready).then(preparar);
})();
