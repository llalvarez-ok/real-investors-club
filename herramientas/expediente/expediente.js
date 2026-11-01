// Motor del estilo «expediente» para Reels y Shorts verticales (1080x1920).
// La página define bloques (.blq data-b="03") y elementos con data-b + data-w (índice de palabra del bloque) o data-o
// (segundos desde el inicio del bloque) y un efecto en data-e. window.cuadro(t) deja la página en el segundo t.
// Los tiempos vienen de window.T = {total, bloques: [{id, ini, dur, etiqueta, palabras: [[ini, fin, texto], ...]}]}.
(function () {
  const T = window.T, B = {};
  T.bloques.forEach((b, i) => { B[b.id] = b; b.fin = i + 1 < T.bloques.length ? T.bloques[i + 1].ini : T.total; });
  const cl = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const eo = x => 1 - Math.pow(1 - x, 3);
  const back = x => { const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const tiempo = el => {
    const b = B[el.dataset.b]; if (!b) return 0;
    if (el.dataset.w !== undefined) return b.palabras[+el.dataset.w][0] + (+el.dataset.o || 0);
    return b.ini + (+el.dataset.o || 0);
  };
  const els = [...document.querySelectorAll('[data-e]')].map(el => ({ el, t0: tiempo(el), e: el.dataset.e,
    d: +el.dataset.d || ({ escribe: 0.9, cuenta: 1.2, barra: 0.8 }[el.dataset.e] || 0.45), txt: el.textContent,
    fin: el.dataset.fin ? B[el.dataset.b].palabras[+el.dataset.fin][0] : null }));
  window.EVENTOS = els.filter(x => x.el.dataset.s).map(x => ({ t: x.t0, s: x.el.dataset.s }))
    .concat(T.bloques.slice(1).map(b => ({ t: b.ini - 0.15, s: 'whoosh' })));
  const fmt = (v, el) => {
    const dec = +el.dataset.dec || 0, s = v.toFixed(dec).replace('.', ',');
    return (el.dataset.pre || '') + s.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (el.dataset.suf || '');
  };
  // subtítulos: grupos de hasta 3 palabras, cortados en pausas y signos
  const subs = [];
  T.bloques.forEach(b => {
    let g = [];
    b.palabras.forEach((w, i) => {
      if (!w[2]) return; g.push(w); const sig = b.palabras[i + 1];
      if (!sig || /[.,?:!]$/.test(w[2]) || g.length >= 3 || (sig && sig[0] - w[1] > 0.3)) { subs.push(g); g = []; }
    });
  });
  const CLAVE = /(binance|fbi|corea|norte|misil|plata|40|%|81|cripto|récord|2\.000|tres|drift|6|meses|285|clic|vos|ellos|6\.300)/i;
  const sub = document.getElementById('sub');
  window.cuadro = function (t) {
    document.getElementById('progreso').style.width = (100 * cl(t / T.total)) + '%';
    T.bloques.forEach(b => {
      const el = document.querySelector(`.blq[data-b="${b.id}"]`); if (!el) return;
      const on = t >= b.ini - 0.05 && t < b.fin - 0.02, p = cl((t - b.ini) / Math.max(0.1, b.fin - b.ini));
      el.style.display = on ? 'block' : 'none';
      el.style.transform = `scale(${1 + 0.035 * p})`;  // zoom lento: siempre hay movimiento
      if (on) document.getElementById('etiqueta').textContent = b.etiqueta;
    });
    for (const x of els) {
      const el = x.el, p = cl((t - x.t0) / x.d), e = eo(p);
      let op = t < x.t0 ? 0 : 1, tr = '';
      if (x.fin !== null && t > x.fin) op = Math.max(0, 1 - (t - x.fin) / 0.25);
      switch (x.e) {
        case 'sube': op *= e; tr = `translateY(${(1 - e) * 70}px)`; break;
        case 'pop': op *= cl(p * 3); tr = `scale(${0.3 + 0.7 * back(p)})`; break;
        case 'golpe': op *= cl(p * 4); tr = `scale(${2.3 - 1.3 * eo(p)})`; break;
        case 'sello': op *= cl(p * 4); tr = `scale(${2.6 - 1.6 * eo(p)}) rotate(${el.dataset.r || -8}deg)`; break;
        case 'foto': op *= cl(p * 2.5); tr = `translateY(${(1 - e) * -260}px) rotate(${(+el.dataset.r || 0) + (1 - e) * 14}deg)`; break;
        case 'izq': op *= e; tr = `translateX(${(1 - e) * -160}px)`; break;
        case 'escribe': el.textContent = t < x.t0 ? '' : x.txt.slice(0, Math.round(x.txt.length * p)); break;
        case 'cuenta': el.textContent = fmt((+el.dataset.v) * eo(p), el); break;
        case 'barra': el.style.width = (cl(p) * (+el.dataset.v)) + 'px'; break;
        case 'aparece': op *= cl(p * 3); break;
      }
      el.style.opacity = op; if (tr) el.style.transform = tr + (el.dataset.extra || '');
    }
    // subtítulo vigente; la palabra que suena va en oro
    const g = subs.find(g => t >= g[0][0] - 0.05 && t < (g[g.length - 1][1] + 0.25));
    sub.innerHTML = g ? g.map(w => `<span class="${t >= w[0] ? (CLAVE.test(w[2]) ? 'k on' : 'on') : ''}">${w[2]}</span>`).join(' ') : '';
  };
})();
