// Gráfico real de NVDA (nvda.js: [fecha, apertura, máximo, mínimo, cierre], Yahoo Finance) para el Reel de la semana de
// Nvidia: velas diarias de agosto al 13/11/2026 con el récord (06/10), el mínimo (12/11) y el último cierre (13/11).
// Se ve en el bloque 02. Envuelve window.cuadro del motor cine.
(function () {
  const cv = document.getElementById('graf'), x = cv.getContext('2d'), Wc = cv.width, Hc = cv.height;
  const V = window.NVDA.map(([f, o, h, l, c]) => ({ f, o, h, l, c })), N = V.length;
  const B = {}; T.bloques.forEach(b => { B[b.id] = b; });
  const tw = (b, w = 0, o = 0) => { const bb = B[b]; return bb.palabras[Math.min(w, bb.palabras.length - 1)][0] + o; };
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), eo = v => 1 - Math.pow(1 - v, 3), pr = (t, a, b) => cl((t - a) / (b - a));
  const X0 = 16, X1 = Wc - 70, cw = (X1 - X0) / N, P0 = 135, P1 = 260, Y0 = 64, Y1 = Hc - 20;
  const gx = i => X0 + (i + .5) * cw, gy = p => Y0 + (P1 - p) / (P1 - P0) * (Y1 - Y0);
  const C = { oro2: '#ffde8c', v: '#3dd68c', r: '#ff5a55', grid: 'rgba(226,183,74,.10)' };
  const font = (px, w = 800) => `${w} ${px}px "JetBrains Mono", monospace`;
  const iRec = V.reduce((m, v, i) => (v.h > V[m].h ? i : m), 0), iMin = V.reduce((m, v, i) => (v.l < V[m].l ? i : m), 0);
  const fmt = n => n.toFixed(2).replace('.', ',');
  function etiqueta(txt, px, py, col, a, abajo) {
    if (a <= 0) return; x.save(); x.globalAlpha = a; x.font = font(20); const w = x.measureText(txt).width + 20, h = 34;
    const lx = cl(px - w / 2, 4, Wc - w - 4), ly = abajo ? py + 16 : py - 16 - h;
    x.fillStyle = 'rgba(5,7,12,.9)'; x.fillRect(lx, ly, w, h); x.strokeStyle = col; x.lineWidth = 2.5; x.strokeRect(lx, ly, w, h);
    x.fillStyle = col; x.textBaseline = 'middle'; x.fillText(txt, lx + 10, ly + h / 2 + 1); x.restore();
  }
  function punto(px, py, col, a, t) {
    if (a <= 0) return; x.save(); x.globalAlpha = a; x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 18; x.beginPath(); x.arc(px, py, 8, 0, 7); x.fill();
    x.globalAlpha = a * (.5 + .5 * Math.sin(t * 6)); x.strokeStyle = col; x.lineWidth = 3; x.beginPath(); x.arc(px, py, 16 + 5 * Math.sin(t * 6), 0, 7); x.stroke(); x.restore();
  }
  function graf(t) {
    const a = cl((t - B['02'].ini + .25) / .4) * cl((B['03'].ini + .1 - t) / .3); cv.style.opacity = a; if (a <= 0) return;
    x.clearRect(0, 0, Wc, Hc); x.fillStyle = 'rgba(6,9,16,.88)'; x.fillRect(0, 0, Wc, Hc);
    x.strokeStyle = 'rgba(226,183,74,.75)'; x.lineWidth = 3; x.strokeRect(1.5, 1.5, Wc - 3, Hc - 3);
    x.font = font(19, 700); x.fillStyle = '#e2b74a'; x.fillText('NVDA · DIARIO · AGO–NOV 2026 · DATOS REALES', 18, 38);
    x.font = font(16, 500);
    for (let p = 140; p <= 250; p += 20) { x.fillStyle = C.grid; x.fillRect(X0, gy(p), X1 - X0, 1); x.fillStyle = 'rgba(245,245,242,.4)'; x.fillText(p, Wc - 50, gy(p) + 5); }
    const t0 = B['02'].ini, n = N * eo(pr(t, t0, t0 + 1.6)), nv = Math.floor(n);
    for (let i = 0; i < Math.min(N, nv + 1); i++) {
      const v = V[i], al = i < nv ? 1 : n - nv; if (al <= 0) continue; const col = v.c >= v.o ? C.v : C.r, cx = gx(i);
      x.globalAlpha = al; x.strokeStyle = col; x.fillStyle = col; x.lineWidth = 1.5;
      x.beginPath(); x.moveTo(cx, gy(v.h)); x.lineTo(cx, gy(v.l)); x.stroke();
      x.fillRect(cx - cw * .34, gy(Math.max(v.o, v.c)), cw * .68, Math.max(1.5, Math.abs(gy(v.o) - gy(v.c))));
    }
    x.globalAlpha = 1;
    const tr = tw('02', 9, -.1), tm = tw('02', 11, 0);
    if (t >= tr) { const q = eo(pr(t, tr, tr + .6)); punto(gx(iRec), gy(V[iRec].h), C.oro2, q, t); etiqueta('RÉCORD ' + fmt(V[iRec].h) + ' · 06/10', gx(iRec), gy(V[iRec].h), C.oro2, q, true); }
    if (t >= tm) { const q = eo(pr(t, tm, tm + .6)); punto(gx(iMin), gy(V[iMin].l), C.r, q, t); etiqueta('MÍN. ' + fmt(V[iMin].l) + ' · 12/11', gx(iMin) - 60, gy(V[iMin].l), C.r, q, true);
      etiqueta('CIERRE ' + fmt(V[N - 1].c) + ' · 13/11', gx(N - 1) - 40, gy(V[N - 1].c) - 40, '#f5f5f2', eo(pr(t, tm + .4, tm + 1)), false); }
  }
  const base = window.cuadro;
  window.cuadro = function (t) { base(t); graf(t); };
})();
