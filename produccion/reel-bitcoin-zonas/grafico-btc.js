// Gráfico real de BTC-USD (btc.js) dentro del expediente: velas diarias desde junio de 2026, la suba de julio a
// septiembre con su Fibonacci, el promedio de 200 semanas, el cierre que rompería y la opinión de Lean (marcada como opinión).
// Envuelve window.cuadro del motor cine.
(function () {
  const cv = document.getElementById('graf'), x = cv.getContext('2d'), Wc = cv.width, Hc = cv.height;
  const D = window.BTC, V = D.velas.map(v => ({ ...v })), N = V.length, F = D.fib, MIN = D.minimo_13_11;
  V[N - 1].l = Math.min(V[N - 1].l, MIN);  // la vela diaria todavía no trae el mínimo de 15 min
  const B = {}; T.bloques.forEach(b => { B[b.id] = b; });
  const tw = (b, w = 0, o = 0) => { const bb = B[b]; return bb.palabras[Math.min(w, bb.palabras.length - 1)][0] + o; };
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), eo = v => 1 - Math.pow(1 - v, 3), pr = (t, a, b) => cl((t - a) / (b - a));
  const fi = f => V.findIndex(v => v.f === f), IL = fi(F.desde[0]), IH = fi(F.hasta[0]);
  const X0 = 20, X1 = 880, SL = N + 34, cw = (X1 - X0) / SL, P0 = 54000, P1 = 92000, Y0 = 70, Y1 = 560;
  const gx = i => X0 + (i + .5) * cw, gy = p => Y0 + (P1 - p) / (P1 - P0) * (Y1 - Y0);
  const C = { oro: '#e2b74a', oro2: '#ffde8c', v: '#3dd68c', r: '#ff5a55', az: '#9fd0ff', grid: 'rgba(226,183,74,.10)' };
  const font = (px, w = 800, f) => `${w} ${px}px ${f === 'mono' ? '"JetBrains Mono", monospace' : '"Inter Display", Inter, sans-serif'}`;
  const miles = p => Math.round(p).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  function etiqueta(txt, px, py, col, a, abajo) {
    if (a <= 0) return; x.save(); x.globalAlpha = a; x.font = font(22, 800, 'mono'); const w = x.measureText(txt).width + 24, h = 38;
    if (!abajo && py - 60 < 50) abajo = true;
    const lx = cl(px - w / 2, 4, Wc - w - 4), ly = abajo ? py + 20 : py - 20 - h;
    x.fillStyle = 'rgba(5,7,12,.88)'; x.fillRect(lx, ly, w, h); x.strokeStyle = col; x.lineWidth = 2.5; x.strokeRect(lx, ly, w, h);
    x.fillStyle = col; x.textBaseline = 'middle'; x.fillText(txt, lx + 12, ly + h / 2 + 1); x.restore();
  }
  function punto(px, py, col, a, t) {
    if (a <= 0) return; x.save(); x.globalAlpha = a; x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 18; x.beginPath(); x.arc(px, py, 9, 0, 7); x.fill();
    x.globalAlpha = a * (.5 + .5 * Math.sin(t * 6)); x.strokeStyle = col; x.lineWidth = 3; x.beginPath(); x.arc(px, py, 18 + 6 * Math.sin(t * 6), 0, 7); x.stroke(); x.restore();
  }
  function linea(p, col, txt, a, hasta = 1, dash = [14, 10], abajo) {
    if (a <= 0) return; x.save(); x.globalAlpha = a; x.strokeStyle = col; x.lineWidth = 3; x.setLineDash(dash); x.beginPath(); x.moveTo(X0, gy(p)); x.lineTo(X0 + (X1 - X0) * hasta, gy(p)); x.stroke();
    x.setLineDash([]); x.font = font(20, 800, 'mono'); x.fillStyle = col; x.fillText(txt, X0 + 8, gy(p) + (abajo ? 24 : -10)); x.restore();
  }
  function camino(pts, q, col, ancho, dash) {
    const tot = pts.length - 1, hasta = q * tot; x.save(); x.strokeStyle = col; x.lineWidth = ancho; x.setLineDash(dash); x.shadowColor = col; x.shadowBlur = 12; x.beginPath();
    pts.forEach(([i, p], k) => { if (k === 0) x.moveTo(gx(i), gy(p)); else if (k <= hasta) x.lineTo(gx(i), gy(p)); else if (k - 1 < hasta) { const f = hasta - (k - 1), [i0, p0] = pts[k - 1]; x.lineTo(gx(i0 + (i - i0) * f), gy(p0 + (p - p0) * f)); } });
    x.stroke(); x.restore();
  }
  function graf(t) {
    const ini = B['03'].ini - .25, fin = B['07'].ini;
    const a = cl((t - ini) / .4) * cl((fin + .25 - t) / .3); cv.style.opacity = a; if (a <= 0) return;
    const n = N * eo(pr(t, B['03'].ini, B['03'].ini + 1.6));
    x.clearRect(0, 0, Wc, Hc);
    x.fillStyle = 'rgba(6,9,16,.86)'; x.fillRect(0, 0, Wc, Hc);
    x.strokeStyle = 'rgba(226,183,74,.75)'; x.lineWidth = 3; x.strokeRect(1.5, 1.5, Wc - 3, Hc - 3);
    x.fillStyle = 'rgba(226,183,74,.9)'; [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([u, v]) => { x.fillRect(u * (Wc - 46), v * (Hc - 8), 46, 8); x.fillRect(u * (Wc - 8), v * (Hc - 46), 8, 46); });
    x.font = font(22, 700, 'mono'); x.fillStyle = C.oro; x.textBaseline = 'alphabetic'; x.fillText('BTC-USD · DIARIO · JUN–NOV 2026 · DATOS REALES', 22, 40);
    x.font = font(18, 500, 'mono');
    for (let p = 60000; p <= 90000; p += 10000) { x.fillStyle = C.grid; x.fillRect(X0, gy(p), X1 - X0, 1); x.fillStyle = 'rgba(245,245,242,.35)'; x.fillText(p / 1000 + 'k', Wc - 56, gy(p) + 6); }
    // banda de Fibonacci (61,8 a 65 %)
    const tb = tw('03', 18, -.1);
    if (t >= tb) { const q = eo(pr(t, tb, tb + .6)); x.save(); x.globalAlpha = q * (.28 + .08 * Math.sin(t * 4)); x.fillStyle = C.oro; x.fillRect(X0, gy(F['618']), (X1 - X0) * q, gy(F['65']) - gy(F['618'])); x.restore();
      if (t < tw('05', 18, -.1)) etiqueta('FIBONACCI 61,8 % · ' + miles(F['618']), gx(40), gy(F['618']), C.oro2, q, false); }
    // velas
    const nv = Math.floor(n);
    for (let i = 0; i < Math.min(N, nv + 1); i++) {
      const v = V[i], al = i < nv ? 1 : n - nv; if (al <= 0) continue; const up = v.c >= v.o, col = up ? C.v : C.r, cx = gx(i);
      x.globalAlpha = al; x.strokeStyle = col; x.fillStyle = col; x.lineWidth = 1.3;
      x.beginPath(); x.moveTo(cx, gy(v.h)); x.lineTo(cx, gy(v.l)); x.stroke();
      x.fillRect(cx - cw * .36, gy(Math.max(v.o, v.c)), cw * .72, Math.max(1.5, Math.abs(gy(v.o) - gy(v.c))));
    }
    x.globalAlpha = 1;
    // la suba de julio a septiembre
    const ts = tw('03', 3, -.1);
    if (t >= ts) { const q = eo(pr(t, ts, ts + 1.2)); camino([[IL, F.desde[1]], [IH, F.hasta[1]]], q, C.oro2, 4, [10, 8]);
      punto(gx(IL), gy(F.desde[1]), C.oro2, q, t); punto(gx(IH), gy(F.hasta[1]), C.oro2, eo(pr(t, ts + .8, ts + 1.2)), t);
      if (t < B['04'].ini) { etiqueta('01/07 · ' + miles(F.desde[1]), gx(IL), gy(F.desde[1]), C.oro2, q, true); etiqueta('21/09 · ' + miles(F.hasta[1]), gx(IH), gy(F.hasta[1]), C.oro2, eo(pr(t, ts + .8, ts + 1.2)), false); } }
    // promedio de 200 semanas
    const tm = tw('04', 2, -.1);
    if (t >= tm) { const q = eo(pr(t, tm, tm + 1)); x.save(); x.strokeStyle = C.az; x.lineWidth = 3.5; x.shadowColor = C.az; x.shadowBlur = 10; x.beginPath();
      let ok = false; for (let i = 0; i < N * q; i++) { if (!V[i].ma200s) continue; const yy = gy(V[i].ma200s); ok ? x.lineTo(gx(i), yy) : x.moveTo(gx(i), yy); ok = true; } x.stroke(); x.restore();
      if (t < tw('05', 18, -.1)) etiqueta('PROMEDIO 200 SEMANAS · ' + miles(V[N - 1].ma200s), gx(70), gy(V[N - 1].ma200s), C.az, q, true); }
    // el mínimo del viernes 13
    const tl = tw('03', 31, -.2);
    if (t >= tl && t < B['06'].ini) { const q = eo(pr(t, tl, tl + .4)); punto(gx(N - 1), gy(MIN), C.r, q, t); etiqueta('13/11 · ' + miles(MIN), gx(N - 1), gy(MIN), C.r, q, true); }
    // cierre semanal que rompería
    const tr = tw('05', 18, -.1);
    if (t >= tr && t < B['06'].ini) linea(68000, C.r, 'CIERRE SEMANAL ABAJO DE 68.000 = SE ROMPIERON', eo(pr(t, tr, tr + .5)), eo(pr(t, tr, tr + .8)), [14, 10], true);
    // opinión de Lean (no es un dato: va punteada y rotulada)
    const to = tw('06', 4, -.1);
    if (t >= to) { const q = eo(pr(t, to, to + 2.4)), c0 = V[N - 1].c;
      camino([[N - 1, c0], [N + 6, 64500], [N + 11, 62000], [N + 14, 60500], [N + 22, 68500], [N + 31, 75000]], q, C.az, 4.5, [12, 9]);
      const t62 = tw('06', 8, -.1), t75 = tw('06', 21, -.1);
      if (t >= t62) { punto(gx(N + 11), gy(62000), C.az, eo(pr(t, t62, t62 + .3)), t); etiqueta('62.000', gx(N + 11), gy(62000), C.az, eo(pr(t, t62, t62 + .3)), true); }
      if (t >= t75) { punto(gx(N + 31), gy(75000), C.az, eo(pr(t, t75, t75 + .3)), t); etiqueta('75.000', gx(N + 26), gy(75000), C.az, eo(pr(t, t75, t75 + .3)), false); }
      etiqueta('OPINIÓN DE LEAN · NO ES UN DATO', gx(N - 50), gy(86000), C.az, q, false); }
  }
  const base = window.cuadro;
  window.cuadro = function (t) { base(t); graf(t); };
})();
