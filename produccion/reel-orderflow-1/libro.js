// Libro de órdenes ilustrativo («la góndola»): estantes de precios, órdenes de venta limitadas como mercadería (rojo),
// de compra limitadas (verde), y órdenes de mercado apuradas como fichas doradas que se llevan lo que hay.
// Bloque 03: aparecen las dos clases de orden. Bloque 04: se vacía el mejor precio de venta y el precio sube un escalón.
// Bloque 05: siguen comprando, pero un vendedor grande repone el estante (absorción) y el precio no se mueve.
(function () {
  const cv = document.getElementById('libro'), x = cv.getContext('2d'), Wc = cv.width, Hc = cv.height;
  const B = {}; T.bloques.forEach(b => { B[b.id] = b; });
  const tw = (b, w = 0, o = 0) => { const bb = B[b]; return bb.palabras[Math.min(w, bb.palabras.length - 1)][0] + o; };
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), eo = v => 1 - Math.pow(1 - v, 3), pr = (t, a, b) => cl((t - a) / (b - a));
  const C = { v: '#3dd68c', r: '#ff6b6b', oro: '#e2c68c', oro2: '#ffde8c', borde: '#274a80', txt: '#ecf1f9', txt2: '#a3b5d1' };
  const f = (px, w = 800, fam = '"JetBrains Mono", monospace') => `${w} ${px}px ${fam}`;
  const FILAS = 9, RH = 74, TOP = 120, MID = Wc / 2, PRE = n => (100 + n).toFixed(0);  // precios ilustrativos 96–104
  const ASK0 = { 101: 6, 102: 5, 103: 7, 104: 4 }, BID0 = { 100: 5, 99: 6, 98: 4, 97: 7, 96: 5 };
  function estado(t) {
    // devuelve: mejor venta (precio), cantidades en venta por precio, cuántas compras van, fase de reposición
    const ask = { ...ASK0 }; let mejor = 101, compras = 0, repone = 0, sube = 0;
    const a4 = B['04'].ini, f4 = B['05'].ini - .3;
    if (t >= a4) { const p = pr(t, a4 + .3, a4 + (f4 - a4) * .55); compras = Math.floor(p * 6); ask[101] = 6 - compras; if (p >= 1) { mejor = 102; sube = eo(pr(t, a4 + (f4 - a4) * .55, a4 + (f4 - a4) * .55 + .5)); } }
    if (t >= B['05'].ini - .3) {  // absorción: compran sin parar en 102 y el estante se repone
      const d = t - (B['05'].ini - .3); compras = 6 + Math.floor(d * 2.6); mejor = 102; sube = 1;
      const ciclo = (d * 2.6) % 5; ask[102] = Math.max(1, 5 - Math.floor(ciclo)); repone = d > 1.2 ? 1 : d / 1.2;
    }
    return { ask, mejor, compras, repone, sube };
  }
  function libro(t) {
    const b3 = B['03'], fin = B['06'].ini;
    const a = cl((t - B['03'].ini + .2) / .35) * cl((fin + .2 - t) / .3); cv.style.opacity = a; if (a <= 0) return;
    const e = estado(t), apL = eo(pr(t, tw('03', 2), tw('03', 2, .8))), apM = eo(pr(t, tw('03', 15), tw('03', 15, .6)));
    x.clearRect(0, 0, Wc, Hc); x.fillStyle = 'rgba(7,20,38,.94)'; x.fillRect(0, 0, Wc, Hc); x.strokeStyle = C.borde; x.lineWidth = 3; x.strokeRect(1.5, 1.5, Wc - 3, Hc - 3);
    x.font = f(19, 700); x.fillStyle = C.oro; x.fillText('LIBRO DE ÓRDENES · EJEMPLO ILUSTRATIVO', 20, 40);
    x.font = f(17, 700); x.fillStyle = C.v; x.fillText('COMPRAS LIMITADAS', 24, 84); x.fillStyle = C.r; x.textAlign = 'right'; x.fillText('VENTAS LIMITADAS (LA GÓNDOLA)', Wc - 24, 84); x.textAlign = 'left';
    for (let k = 0; k < FILAS; k++) {
      const p = 104 - k, y = TOP + k * RH;
      x.fillStyle = k % 2 ? 'rgba(255,255,255,.025)' : 'rgba(255,255,255,.05)'; x.fillRect(12, y, Wc - 24, RH - 6);
      const esMejor = p === e.mejor; x.font = f(34, 800); x.textAlign = 'center';
      x.fillStyle = esMejor ? C.oro2 : C.txt2; x.fillText('$' + PRE(p - 100), MID, y + RH / 2 + 10); x.textAlign = 'left';
      const qa = e.ask[p] || 0, qb = BID0[p] || 0;
      for (let u = 0; u < qa; u++) {  // cajas de mercadería a la derecha
        const bx = MID + 90 + u * 44; x.globalAlpha = apL; x.fillStyle = (p === 102 && e.repone > 0 && u === qa - 1) ? C.oro2 : C.r;
        x.fillRect(bx, y + 14, 36, RH - 34); x.globalAlpha = 1;
      }
      for (let u = 0; u < qb; u++) { const bx = MID - 126 - u * 44; x.globalAlpha = apL; x.fillStyle = C.v; x.fillRect(bx, y + 14, 36, RH - 34); x.globalAlpha = 1; }
      if (esMejor) { x.strokeStyle = C.oro2; x.lineWidth = 3; x.strokeRect(14, y + 1, Wc - 28, RH - 8); }
    }
    // órdenes de mercado: fichas doradas que vuelan desde la izquierda al mejor precio de venta
    if (t >= B['04'].ini - .1 || apM > 0) {
      const yM = TOP + (104 - e.mejor) * RH + RH / 2 - 3, fase = (t * 2.6) % 1;
      x.save(); x.globalAlpha = Math.max(apM, t >= B['04'].ini ? 1 : 0); x.fillStyle = C.oro2; x.shadowColor = C.oro2; x.shadowBlur = 22;
      for (let j = 0; j < 3; j++) { const fx = 30 + ((fase + j / 3) % 1) * (MID + 60); x.beginPath(); x.arc(fx, yM, 15, 0, 7); x.fill(); }
      x.restore(); x.font = f(18, 800); x.fillStyle = C.oro2; x.fillText('COMPRAS A MERCADO →', 24, yM - 26);
    }
    // contador de compras y carteles
    x.font = f(22, 800); x.fillStyle = C.txt; x.fillText('COMPRAS A MERCADO: ' + e.compras, 20, Hc - 24);
    if (e.sube > 0 && t < B['05'].ini - .3) { x.save(); x.globalAlpha = e.sube; x.font = f(30, 900); x.fillStyle = C.v; x.textAlign = 'right'; x.fillText('▲ UN ESCALÓN MÁS ARRIBA', Wc - 20, Hc - 24); x.restore(); }
    if (e.repone > 0) { x.save(); x.globalAlpha = e.repone; x.font = f(26, 900); x.fillStyle = C.oro2; x.textAlign = 'right'; x.fillText('VENDEDOR GRANDE REPONE · PRECIO QUIETO', Wc - 20, Hc - 62); x.restore(); }
  }
  const base = window.cuadro; window.cuadro = function (t) { base(t); libro(t); };
})();
