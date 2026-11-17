// Gráfico real de BTC-USD (velas de 15 min, Yahoo Finance) del 30/09/2026 con su volumen relativo.
// Bloque 01: velas hasta la de las 13:00 UTC (×9,9, no se movió), resaltada desde el cuadro 0.
// Bloque 06: la de las 12:45 (×11,3, sí subió) como contraste y lo que pasó después (mínimo 83.328, −2,4 %).
(function () {
  const cv = document.getElementById('graf'), x = cv.getContext('2d'), Wc = cv.width, Hc = cv.height;
  const V = window.BTC.velas.map(([f, o, h, l, c, vr]) => ({ f: f.slice(11, 16), o, h, l, c, vr })), N = V.length;
  const iA = V.findIndex(v => v.f === '13:00'), iP = V.findIndex(v => v.f === '12:45');
  const iMin = V.reduce((m, v, i) => (i > iA && v.l < V[m].l ? i : m), iA + 1);
  const B = {}; T.bloques.forEach(b => { B[b.id] = b; });
  const tw = (b, w = 0, o = 0) => { const bb = B[b]; return bb.palabras[Math.min(w, bb.palabras.length - 1)][0] + o; };
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), eo = v => 1 - Math.pow(1 - v, 3), pr = (t, a, b) => cl((t - a) / (b - a));
  const P0 = 82900, P1 = 86000, X0 = 16, X1 = Wc - 92, Y0 = 70, Y1 = Hc - 230, VY1 = Hc - 30, VH = 170;
  const cw = (X1 - X0) / N, gx = i => X0 + (i + .5) * cw, gy = p => Y0 + (P1 - p) / (P1 - P0) * (Y1 - Y0);
  const C = { v: '#3dd68c', r: '#ff6b6b', oro: '#e2c68c', oro2: '#ffde8c', grid: 'rgba(226,198,140,.10)' };
  const f = (px, w = 800) => `${w} ${px}px "JetBrains Mono", monospace`;
  function tag(txt, px, py, col, a) {
    if (a <= 0) return; x.save(); x.globalAlpha = a; x.font = f(22); const w = x.measureText(txt).width + 22, h = 38, lx = cl(px - w / 2, 4, Wc - w - 4);
    x.fillStyle = 'rgba(7,20,38,.92)'; x.fillRect(lx, py, w, h); x.strokeStyle = col; x.lineWidth = 2.5; x.strokeRect(lx, py, w, h);
    x.fillStyle = col; x.textBaseline = 'middle'; x.fillText(txt, lx + 11, py + h / 2 + 1); x.restore();
  }
  function graf(t) {
    const en01 = cl((B['02'].ini + .2 - t) / .3), b6 = B['06'], en06 = cl((t - b6.ini + .2) / .35) * cl((B['07'].ini + .3 - t) / .3);
    const a = Math.max(en01, en06); cv.style.opacity = a; if (a <= 0) return;
    const fase6 = t >= b6.ini - .2;
    x.clearRect(0, 0, Wc, Hc); x.fillStyle = 'rgba(7,20,38,.93)'; x.fillRect(0, 0, Wc, Hc);
    x.strokeStyle = '#274a80'; x.lineWidth = 3; x.strokeRect(1.5, 1.5, Wc - 3, Hc - 3);
    x.font = f(20, 700); x.fillStyle = C.oro; x.fillText('BTC-USD · VELAS DE 15 MIN · 30/09/2026 (UTC) · DATOS REALES', 18, 38);
    x.font = f(16, 500);
    for (let p = 83000; p <= 86000; p += 1000) { x.fillStyle = C.grid; x.fillRect(X0, gy(p), X1 - X0, 1); x.fillStyle = 'rgba(236,241,249,.45)'; x.fillText((p / 1000) + 'k', Wc - 70, gy(p) + 5); }
    x.fillStyle = 'rgba(236,241,249,.35)'; x.fillText('VOLUMEN (× EL PROMEDIO)', 18, VY1 - VH - 10);
    // cuántas velas: hasta la de las 13:00 en el gancho; en el bloque 06 se completa el resto
    const nFin = fase6 ? iA + 1 + (N - iA - 1) * eo(pr(t, tw('06', 26, -.2), tw('06', 26, 1.6))) : iA + 1;
    for (let i = 0; i < Math.ceil(nFin); i++) {
      const v = V[i], al = Math.min(1, nFin - i), col = v.c >= v.o ? C.v : C.r, cx = gx(i);
      const foco = (i === iA || (fase6 && i === iP)) ? 1 : (fase6 || t > tw('01', 10)) ? .45 : .8;
      x.globalAlpha = al * foco; x.strokeStyle = col; x.fillStyle = col; x.lineWidth = 2;
      x.beginPath(); x.moveTo(cx, gy(v.h)); x.lineTo(cx, gy(v.l)); x.stroke();
      x.fillRect(cx - cw * .35, gy(Math.max(v.o, v.c)), cw * .7, Math.max(2, Math.abs(gy(v.o) - gy(v.c))));
      const vh = Math.min(VH, v.vr * VH / 11.5); x.globalAlpha = al * (i === iA || (fase6 && i === iP) ? 1 : .4);
      x.fillStyle = i === iA ? C.oro2 : (fase6 && i === iP) ? C.v : 'rgba(163,181,209,.8)'; x.fillRect(cx - cw * .38, VY1 - vh, cw * .76, vh);
    }
    x.globalAlpha = 1;
    // la vela clave: halo y etiquetas
    const pulso = .5 + .5 * Math.sin(t * 5), cxA = gx(iA);
    x.save(); x.strokeStyle = C.oro2; x.lineWidth = 3; x.globalAlpha = .6 + .4 * pulso; x.shadowColor = C.oro2; x.shadowBlur = 20;
    x.strokeRect(cxA - cw * 1.1, gy(V[iA].h) - 16, cw * 2.2, gy(V[iA].l) - gy(V[iA].h) + 32); x.restore();
    tag('×9,9 VOLUMEN · 13:00', cxA - 70, VY1 - VH - 64, C.oro2, 1);
    tag('ABRIÓ 85.300 · CERRÓ 85.367', cxA - 120, gy(V[iA].h) - 64, '#ecf1f9', t > tw('01', 22) || fase6 ? 1 : 0);
    if (fase6) {
      const q = eo(pr(t, tw('06', 9), tw('06', 9, .6)));
      tag('12:45 · ×11,3 · SÍ SUBIÓ', gx(iP) - 150, gy(V[iP].l) + 20, C.v, q);
      const tm = tw('06', 30), qm = eo(pr(t, tm, tm + .6));
      if (qm > 0) { x.save(); x.globalAlpha = qm; x.fillStyle = C.r; x.shadowColor = C.r; x.shadowBlur = 16; x.beginPath(); x.arc(gx(iMin), gy(V[iMin].l), 9, 0, 7); x.fill(); x.restore();
        tag('14:30 · 83.328 · −2,4 %', gx(iMin) + 40, gy(V[iMin].l) + 14, C.r, qm); }
    }
  }
  const base = window.cuadro; window.cuadro = function (t) { base(t); graf(t); };
})();
