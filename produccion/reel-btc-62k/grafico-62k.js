// Gráfico real de BTC-USD (btc.js) para el Reel «Bitcoin llegó a 62.000»: velas diarias desde agosto de 2026, la caída
// de 74.000 a 62.000, la zona estimada de liquidaciones de compradores (abajo) y de vendedores (arriba), y la opinión
// de Lean rotulada como opinión. Se ve en los bloques 02, 04 y 05. Envuelve window.cuadro del motor cine.
(function () {
  const cv = document.getElementById('graf'), x = cv.getContext('2d'), Wc = cv.width, Hc = cv.height;
  const D = window.BTC, V = D.velas.filter(v => v.f >= '2026-08-01').map(v => ({ ...v })), N = V.length, MIN = D.minimo_hoy;
  V[N - 1].l = Math.min(V[N - 1].l, MIN);
  const B = {}; T.bloques.forEach(b => { B[b.id] = b; });
  const tw = (b, w = 0, o = 0) => { const bb = B[b]; return bb.palabras[Math.min(w, bb.palabras.length - 1)][0] + o; };
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), eo = v => 1 - Math.pow(1 - v, 3), pr = (t, a, b) => cl((t - a) / (b - a));
  const X0 = 20, X1 = 880, SL = N + 26, cw = (X1 - X0) / SL, P0 = 56000, P1 = 90000, Y0 = 70, Y1 = 590;
  const gx = i => X0 + (i + .5) * cw, gy = p => Y0 + (P1 - p) / (P1 - P0) * (Y1 - Y0);
  const C = { oro2: '#ffde8c', v: '#3dd68c', r: '#ff5a55', az: '#9fd0ff', grid: 'rgba(226,183,74,.10)' };
  const font = (px, w = 800) => `${w} ${px}px "JetBrains Mono", monospace`;
  const iMax = V.reduce((m, v, i) => (v.f >= '2026-11-12' && v.h > V[m].h ? i : m), V.findIndex(v => v.f >= '2026-11-12'));
  function etiqueta(txt, px, py, col, a, abajo) {
    if (a <= 0) return; x.save(); x.globalAlpha = a; x.font = font(21); const w = x.measureText(txt).width + 22, h = 36;
    const lx = cl(px - w / 2, 4, Wc - w - 4), ly = abajo ? py + 18 : py - 18 - h;
    x.fillStyle = 'rgba(5,7,12,.88)'; x.fillRect(lx, ly, w, h); x.strokeStyle = col; x.lineWidth = 2.5; x.strokeRect(lx, ly, w, h);
    x.fillStyle = col; x.textBaseline = 'middle'; x.fillText(txt, lx + 11, ly + h / 2 + 1); x.restore();
  }
  function banda(p0, p1, col, a, txt) {
    if (a <= 0) return; x.save(); x.globalAlpha = a * (.30 + .08 * Math.sin(performance.now ? 0 : 0)); x.fillStyle = col; x.fillRect(X0, gy(p1), X1 - X0, gy(p0) - gy(p1));
    x.globalAlpha = a; x.strokeStyle = col; x.lineWidth = 2; x.setLineDash([10, 8]); x.strokeRect(X0, gy(p1), X1 - X0, gy(p0) - gy(p1)); x.restore();
    if (txt) { x.save(); x.globalAlpha = a; x.font = font(19); x.fillStyle = col; x.fillText(txt, X0 + 10, gy(p1) - 8); x.restore(); }
  }
  function punto(px, py, col, a, t) {
    if (a <= 0) return; x.save(); x.globalAlpha = a; x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 18; x.beginPath(); x.arc(px, py, 9, 0, 7); x.fill();
    x.globalAlpha = a * (.5 + .5 * Math.sin(t * 6)); x.strokeStyle = col; x.lineWidth = 3; x.beginPath(); x.arc(px, py, 18 + 6 * Math.sin(t * 6), 0, 7); x.stroke(); x.restore();
  }
  function graf(t) {
    const vis = id => B[id] && t >= B[id].ini - .2 && t < (B[id].fin ?? 1e9);
    const en = (a, b) => cl((t - B[a].ini + .25) / .4) * cl((B[b].ini + .25 - t) / .3);
    const a = Math.max(en('02', '03'), en('04', '06')); cv.style.opacity = a; if (a <= 0) return;
    x.clearRect(0, 0, Wc, Hc);
    x.fillStyle = 'rgba(6,9,16,.86)'; x.fillRect(0, 0, Wc, Hc);
    x.strokeStyle = 'rgba(226,183,74,.75)'; x.lineWidth = 3; x.strokeRect(1.5, 1.5, Wc - 3, Hc - 3);
    x.fillStyle = 'rgba(226,183,74,.9)'; [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([u, v]) => { x.fillRect(u * (Wc - 46), v * (Hc - 8), 46, 8); x.fillRect(u * (Wc - 8), v * (Hc - 46), 8, 46); });
    x.font = font(21, 700); x.fillStyle = '#e2b74a'; x.fillText('BTC-USD · DIARIO · AGO–NOV 2026 · DATOS REALES', 22, 40);
    x.font = font(17, 500);
    for (let p = 60000; p <= 90000; p += 5000) { x.fillStyle = C.grid; x.fillRect(X0, gy(p), X1 - X0, 1); x.fillStyle = 'rgba(245,245,242,.35)'; x.fillText(p / 1000 + 'k', Wc - 52, gy(p) + 6); }
    // bandas de liquidaciones estimadas
    const tb = tw('04', 1, -.1), ta = tw('05', 11, -.1);
    if (t >= tb) banda(59500, 62600, C.r, eo(pr(t, tb, tb + .6)), 'LIQUIDACIONES DE COMPRADORES · MODELO');
    if (t >= ta) { banda(75000, 78000, C.v, eo(pr(t, ta, ta + .6)), 'LIQUIDACIONES DE VENDEDORES · MODELO'); banda(72000, 73000, C.v, .5 * eo(pr(t, ta + .4, ta + 1)), ''); }
    // velas
    const n = N * eo(pr(t, B['02'].ini, B['02'].ini + 1.4)), nv = Math.floor(n);
    for (let i = 0; i < Math.min(N, nv + 1); i++) {
      const v = V[i], al = i < nv ? 1 : n - nv; if (al <= 0) continue; const up = v.c >= v.o, col = up ? C.v : C.r, cx = gx(i);
      x.globalAlpha = al; x.strokeStyle = col; x.fillStyle = col; x.lineWidth = 1.6;
      x.beginPath(); x.moveTo(cx, gy(v.h)); x.lineTo(cx, gy(v.l)); x.stroke();
      x.fillRect(cx - cw * .36, gy(Math.max(v.o, v.c)), cw * .72, Math.max(1.5, Math.abs(gy(v.o) - gy(v.c))));
    }
    x.globalAlpha = 1;
    // la caída de los últimos días
    const tc = tw('02', 2, -.1);
    if (t >= tc) { const q = eo(pr(t, tc, tc + .9)); punto(gx(iMax), gy(V[iMax].h), C.oro2, q, t); punto(gx(N - 1), gy(MIN), C.r, eo(pr(t, tc + .6, tc + 1)), t);
      if (t < B['04'].ini) { etiqueta(V[iMax].f.slice(8) + '/11 · ' + Math.round(V[iMax].h).toLocaleString('es-AR'), gx(iMax), gy(V[iMax].h), C.oro2, q, false); etiqueta('14/11 · ' + MIN.toLocaleString('es-AR'), gx(N - 1), gy(MIN), C.r, eo(pr(t, tc + .6, tc + 1)), true); } }
    // opinión de Lean: después va a buscar los 75.000 (punteada y rotulada)
    const to = tw('05', 26, -.1);
    if (t >= to) { const q = eo(pr(t, to, to + 1.8)), c0 = V[N - 1].c, pts = [[N - 1, c0], [N + 5, 60500], [N + 13, 68000], [N + 22, 75000]];
      x.save(); x.strokeStyle = C.az; x.lineWidth = 4.5; x.setLineDash([12, 9]); x.shadowColor = C.az; x.shadowBlur = 12; x.beginPath();
      const tot = pts.length - 1, hasta = q * tot;
      pts.forEach(([i, p], k) => { if (k === 0) x.moveTo(gx(i), gy(p)); else if (k <= hasta) x.lineTo(gx(i), gy(p)); else if (k - 1 < hasta) { const f = hasta - (k - 1), [i0, p0] = pts[k - 1]; x.lineTo(gx(i0 + (i - i0) * f), gy(p0 + (p - p0) * f)); } });
      x.stroke(); x.restore(); etiqueta('OPINIÓN DE LEAN · NO ES UN DATO', gx(N - 30), gy(86500), C.az, q, false);
      if (q > .95) punto(gx(N + 22), gy(75000), C.az, 1, t); }
  }
  const base = window.cuadro;
  window.cuadro = function (t) { base(t); graf(t); };
})();
