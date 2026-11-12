// Gráfico real de NVDA (nvda.js) dentro del expediente: se dibuja con la voz, fase por fase.
// Envuelve window.cuadro del motor cine: primero el motor, después este lienzo (#graf, dentro de la cámara).
(function () {
  const cv = document.getElementById('graf'), x = cv.getContext('2d'), Wc = cv.width, Hc = cv.height;
  const V = window.NVDA.velas, N = V.length, PRE = 154.74;  // pre-mercado del 12/11 a las 9:10 de Nueva York
  const fi = f => V.findIndex(v => v.f === f), H = fi('2026-11-12'), L = H >= 0 ? H : N;  // L: lugar del 12/11
  const HOY = H >= 0 ? V[H].c : PRE, NOTA = fi('2026-10-29');
  const B = {}; T.bloques.forEach(b => { B[b.id] = b; });
  const tw = (b, w = 0, o = 0) => { const bb = B[b]; return bb.palabras[Math.min(w, bb.palabras.length - 1)][0] + o; };
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), eo = v => 1 - Math.pow(1 - v, 3);
  const pr = (t, a, b) => cl((t - a) / (b - a));
  // escala: 210 lugares (velas + pre-mercado + escenario), precios de 145 a 252
  const X0 = 30, X1 = 930, SL = 212, cw = (X1 - X0) / SL, P0 = 145, P1 = 252, Y0 = 70, Y1 = 455, VY0 = 480, VY1 = 600;
  const gx = i => X0 + (i + .5) * cw, gy = p => Y0 + (P1 - p) / (P1 - P0) * (Y1 - Y0);
  const vmax = Math.max(...V.map(v => v.v));
  const prom = V.map((v, i) => i < 49 ? null : V.slice(i - 49, i + 1).reduce((s, q) => s + q.v, 0) / 50);
  const C = { oro: '#e2b74a', oro2: '#ffde8c', v: '#3dd68c', r: '#ff5a55', t: '#f5f5f2', t2: '#9aa0aa', grid: 'rgba(226,183,74,.10)' };
  const font = (px, w = 800, f = 'Inter') => `${w} ${px}px ${f === 'mono' ? '"JetBrains Mono", monospace' : '"Inter Display", Inter, sans-serif'}`;
  function etiqueta(txt, px, py, col, a, abajo) {  // cartel con borde, como los del expediente
    x.save(); x.globalAlpha = a; x.font = font(24, 800, 'mono'); const w = x.measureText(txt).width + 26, h = 40;
    if (!abajo && py - 62 < 50) abajo = true;
    let lx = cl(px - w / 2, 4, Wc - w - 4), ly = abajo ? py + 22 : py - 22 - h;
    x.fillStyle = 'rgba(5,7,12,.85)'; x.fillRect(lx, ly, w, h); x.strokeStyle = col; x.lineWidth = 2.5; x.strokeRect(lx, ly, w, h);
    x.fillStyle = col; x.textBaseline = 'middle'; x.fillText(txt, lx + 13, ly + h / 2 + 1); x.restore();
  }
  function punto(px, py, col, a, t) {
    x.save(); x.globalAlpha = a; x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 18; x.beginPath(); x.arc(px, py, 9, 0, 7); x.fill();
    x.globalAlpha = a * (.5 + .5 * Math.sin(t * 6)); x.strokeStyle = col; x.lineWidth = 3; x.beginPath(); x.arc(px, py, 18 + 6 * Math.sin(t * 6), 0, 7); x.stroke(); x.restore();
  }
  function linea(p, col, txt, a, dash = [14, 10], hasta = 1) {
    x.save(); x.globalAlpha = a; x.strokeStyle = col; x.lineWidth = 3; x.setLineDash(dash); x.beginPath(); x.moveTo(X0, gy(p)); x.lineTo(X0 + (X1 - X0) * hasta, gy(p)); x.stroke();
    x.setLineDash([]); x.font = font(22, 800, 'mono'); x.fillStyle = col; x.fillText(txt, X0 + 8, gy(p) - 10); x.restore();
  }

  function graf(t) {
    const ini = B['03'].ini - .25, fin = B['10'].ini;
    const a = cl((t - ini) / .4) * cl((fin + .25 - t) / .3);
    cv.style.opacity = a; if (a <= 0) return;
    // cuántas velas se ven: cada fase revela su tramo
    const tramos = [[tw('03'), 0, 53, 1.6], [tw('04'), 53, 83, 1.2], [tw('05', 2), 83, 152, 1.8], [tw('06', 4), 152, 174, 1.1], [tw('07', 0), 174, L, .8], [tw('08', 5, -.2), L, N, .9]];
    let n = 0; for (const [t0, a0, a1, d] of tramos) if (t >= t0) n = a0 + (a1 - a0) * eo(pr(t, t0, t0 + d));
    x.clearRect(0, 0, Wc, Hc);
    // documento: fondo, borde dorado y encabezado
    x.fillStyle = 'rgba(6,9,16,.86)'; x.fillRect(0, 0, Wc, Hc);
    x.strokeStyle = 'rgba(226,183,74,.75)'; x.lineWidth = 3; x.strokeRect(1.5, 1.5, Wc - 3, Hc - 3);
    x.fillStyle = 'rgba(226,183,74,.9)'; [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([u, v]) => { x.fillRect(u * (Wc - 46), v * (Hc - 8), 46, 8); x.fillRect(u * (Wc - 8), v * (Hc - 46), 8, 46); });
    x.font = font(22, 700, 'mono'); x.fillStyle = C.oro; x.textBaseline = 'alphabetic';
    x.fillText('NVDA · DIARIO · MAR–NOV 2026 · DATOS REALES', 22, 40);
    // fases A–E de Wyckoff (bloque 08 en adelante)
    const tf = tw('08', 5, -.2);
    if (t >= tf) {
      const cortes = [[0, 82, 'A'], [83, 140, 'B'], [141, 155, 'C'], [156, 173, 'D'], [174, L + 2, 'E']];
      cortes.forEach(([i0, i1, Lt], k) => {
        const aa = eo(pr(t, tf + k * .12, tf + k * .12 + .35)), xa = gx(i0) - cw / 2, xb = gx(Math.min(i1, L + 2)) + cw / 2, E = Lt === 'E';
        x.save(); x.globalAlpha = aa * (E ? .3 + .1 * Math.sin(t * 5) : .12); x.fillStyle = E ? C.oro : '#9fd0ff'; x.fillRect(xa, Y0 - 10, xb - xa, Y1 - Y0 + 10); x.restore();
        x.save(); x.globalAlpha = aa; x.font = font(E ? 44 : 32, 900); x.fillStyle = E ? C.oro2 : 'rgba(245,245,242,.7)'; x.textAlign = 'center'; x.fillText(Lt, (xa + xb) / 2, Y0 + 34); x.restore();
      });
    }
    // grilla de precios
    x.font = font(18, 500, 'mono');
    for (let p = 150; p <= 250; p += 25) { x.fillStyle = C.grid; x.fillRect(X0, gy(p), X1 - X0, 1); x.fillStyle = 'rgba(245,245,242,.35)'; x.fillText(p, X1 - 44, gy(p) - 6); }
    // velas y volumen
    const nv = Math.floor(n), parcial = n - nv;
    const tvol3 = tw('05', 9, -.1), tvol4 = tw('06', 14, -.1), tprom = B['05'].ini;
    for (let i = 0; i < Math.min(N, nv + 1); i++) {
      const v = V[i], al = i < nv ? 1 : parcial; if (al <= 0) continue;
      const up = v.c >= v.o, col = up ? C.v : C.r, cx = gx(i);
      x.globalAlpha = al; x.strokeStyle = col; x.fillStyle = col; x.lineWidth = 1.4;
      x.beginPath(); x.moveTo(cx, gy(v.h)); x.lineTo(cx, gy(v.l)); x.stroke();
      const yb = gy(Math.max(v.o, v.c)), hb = Math.max(1.5, Math.abs(gy(v.o) - gy(v.c))); x.fillRect(cx - cw * .36, yb, cw * .72, hb);
      // volumen
      let vc = up ? 'rgba(61,214,140,.35)' : 'rgba(255,90,85,.35)';
      if (i === 151 && t >= tvol3) vc = C.oro2; if (i === 173 && t >= tvol4) vc = C.r;
      const hv = (v.v / vmax) * (VY1 - VY0); x.fillStyle = vc; x.fillRect(cx - cw * .36, VY1 - hv, cw * .72, hv);
    }
    x.globalAlpha = 1;
    // promedio de volumen de 50 días (desde la fase 3)
    if (t >= tprom) { const aa = eo(pr(t, tprom, tprom + .6)); x.save(); x.globalAlpha = aa; x.strokeStyle = 'rgba(255,222,140,.85)'; x.lineWidth = 2; x.setLineDash([6, 6]); x.beginPath();
      let ok = false; for (let i = 49; i < Math.min(N, nv); i++) { const yy = VY1 - prom[i] / vmax * (VY1 - VY0); ok ? x.lineTo(gx(i), yy) : x.moveTo(gx(i), yy); ok = true; } x.stroke();
      x.setLineDash([]); x.font = font(18, 700, 'mono'); x.fillStyle = C.oro2; x.fillText('PROMEDIO 50 DÍAS', X0 + 6, VY0 - 4); x.restore(); }
    if (t >= tvol3 && t < tvol4) etiqueta('0,84× · BAJO', gx(151), VY0 - 10, C.oro2, eo(pr(t, tvol3, tvol3 + .3)));
    if (t >= tvol4 && t < B['07'].ini) etiqueta('2,6× · FUERTE', gx(173), VY0 - 10, C.r, eo(pr(t, tvol4, tvol4 + .3)));
    // líneas: piso 190 y mínimo del año 164
    const tp = tw('04', 6, -.1); if (t >= tp) linea(190, 'rgba(159,208,255,.9)', 'PISO · 190', eo(pr(t, tp, tp + .4)), [14, 10], eo(pr(t, tp, tp + .7)));
    const tm = tw('07', 11, -.1); if (t >= tm) linea(163.9, 'rgba(255,90,85,.95)', 'MÍNIMO DEL AÑO · 163,90', eo(pr(t, tm, tm + .4)), [14, 10], eo(pr(t, tm, tm + .7)));
    // marcas de cada fase (las de los números grandes se quedan como referencia)
    const M = [[tw('03', 5, -.2), 52, 236.0, '1 · 236', C.oro2, false], [tw('04', 6, -.2), 82, 189.59, '2 · 190', '#9fd0ff', true],
               [tw('05', 5, -.2), 151, 243.37, '3 · RÉCORD 243', C.oro2, false], [tw('06', 8, -.2), 173, 181.6, '4 · −9,3 %', C.r, false]];
    for (const [t0, i, p, txt, col, abajo] of M) if (t >= t0) { const aa = eo(pr(t, t0, t0 + .3)); punto(gx(i), gy(p), col, aa, t); if (t < tf) etiqueta(txt, gx(i), gy(p), col, aa, abajo); }
    // pre-mercado del 12/11
    const tpre = tw('07', 7, -.1);
    if (t >= tpre) { const aa = eo(pr(t, tpre, tpre + .4)); const px = gx(L), py = gy(PRE);
      x.save(); x.globalAlpha = aa; x.strokeStyle = C.r; x.lineWidth = 2.5; x.setLineDash([5, 6]); x.beginPath(); x.moveTo(gx(L - 1), gy(V[L - 1].c)); x.lineTo(px, py); x.stroke(); x.restore();
      if (t < tf) { punto(px, py, C.r, aa, t); etiqueta('12/11 ANTES DE ABRIR · 154,74', px, py, C.r, aa, true); }
      else { const ab = eo(pr(t, tf + .6, tf + 1)); punto(px, gy(HOY), C.oro2, ab, t); etiqueta('ESTÁS ACÁ · CIERRE ' + HOY.toFixed(2).replace('.', ','), px, gy(HOY), C.oro2, ab, true); } }
    // fechas del escándalo sobre el gráfico
    const tfe = tw('07', 0);
    if (t >= tfe && t < tf) [[NOTA, '29/10 · 1.ª NOTA'], [L, '12/11 · RENUNCIA']].forEach(([i, txt], k) => { if (i < 0) return; const aa = eo(pr(t, tfe + k * .4, tfe + k * .4 + .4));
      x.save(); x.globalAlpha = aa * .9; x.strokeStyle = '#ff8a85'; x.lineWidth = 2; x.setLineDash([4, 6]); x.beginPath(); x.moveTo(gx(i), Y0 + 10); x.lineTo(gx(i), VY1); x.stroke(); x.restore();
      x.save(); x.globalAlpha = aa; x.font = font(17, 800, 'mono'); x.fillStyle = '#ff8a85'; x.textAlign = 'right'; x.fillText(txt, gx(i) - 6, VY0 + 22 + k * 24); x.restore(); });
    // escenario: rebote flojo hacia 190 que no lo supera; y la invalidación
    const te = tw('09', 8, -.2);
    if (t >= te) { const q = eo(pr(t, te, te + 1.6)), pts = [[L, HOY], [L + 8, 178], [L + 16, 188], [L + 22, 178], [L + 30, 160]];
      x.save(); x.strokeStyle = C.oro2; x.lineWidth = 5; x.setLineDash([16, 10]); x.shadowColor = C.oro; x.shadowBlur = 14; x.beginPath();
      const tot = pts.length - 1, hasta = q * tot;
      pts.forEach(([i, p], k) => { if (k === 0) x.moveTo(gx(i), gy(p)); else if (k <= hasta) x.lineTo(gx(i), gy(p)); else if (k - 1 < hasta) { const f = hasta - (k - 1), [i0, p0] = pts[k - 1]; x.lineTo(gx(i0 + (i - i0) * f), gy(p0 + (p - p0) * f)); } });
      x.stroke(); x.restore(); etiqueta('ESCENARIO', gx(L + 16), gy(188), C.oro2, q, false); }
    const ti = tw('09', 18, -.2);
    if (t >= ti) { const q = eo(pr(t, ti, ti + .8)); x.save(); x.globalAlpha = q; x.strokeStyle = C.v; x.lineWidth = 4; x.setLineDash([10, 8]);
      x.beginPath(); x.moveTo(gx(L), gy(HOY)); x.lineTo(gx(L + 22 * q), gy(HOY + (205 - HOY) * q)); x.stroke(); x.restore();
      etiqueta('ARRIBA DE 190 = FALLÓ', gx(N - 8), gy(205), C.v, q, false); }
  }
  const base = window.cuadro;
  window.cuadro = function (t) { base(t); graf(t); };
})();
