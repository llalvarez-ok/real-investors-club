/* Motor de las escenas de pizarra (estilo de los videos pilar, ver diseno/ESTILO-PILAR.md).
   Una escena es un HTML que carga recursos/recursos.js y este archivo, y llama a Pizarra.escena({...}).
   herramientas/animar.js la renderiza llamando a window.cuadro(t), con t entre 0 y 1.

   Elementos (todas las coordenadas son del lienzo, que puede ser más grande que la pantalla):
     { tipo: "img", src: "peep-ana-feliz", x, y, w, t, d, cambios: [{ t, src }], respira: true, cae: { t } }
         Una ilustración de recursos/: la mano dibuja el contorno y después aparece el color.
         cambios: cambia la ilustración (por ejemplo la cara) en el segundo t.
     { tipo: "texto", texto, x, y, tam, color, t, d, giro, ancla: "start" | "middle" }   texto escrito a mano
     { tipo: "trazo", d: "M…", color, grosor, t, dur }                                   flecha, subrayado, tachadura
     { tipo: "viaje", src, desde: [x, y], hasta: [x, y], w, t, dur, arco }               un objeto que viaja en arco
     { tipo: "fantasma", src, x, y, w, t, d }                                           solo el contorno, punteado
   Cámara: [{ t, x, y, zoom }] (centro de la pantalla en el lienzo), con transición suave entre puntos.
   Temblor: [{ t, dur }]. */
(function () {
  const NS = "http://www.w3.org/2000/svg", W = 1920, H = 1080;
  const TINTA = "#14213d";
  const lim = (x) => Math.max(0, Math.min(1, x));
  const suave = (x) => { x = lim(x); return x * x * (3 - 2 * x); };
  const rebote = (x) => { if (x <= 0) return 0; if (x >= 1) return 1; const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const nuevo = (tag, at = {}, padre) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (padre) padre.appendChild(e); return e; };
  const GEOM = "path,circle,ellipse,rect,line,polyline,polygon";

  function parsear(nombre) {
    const txt = window.RECURSOS[nombre];
    if (!txt) throw new Error("No existe el recurso " + nombre);
    const doc = new DOMParser().parseFromString(txt, "image/svg+xml").documentElement;
    const vb = (doc.getAttribute("viewBox") || "0 0 32 32").split(/[ ,]+/).map(Number);
    return { doc, vb };
  }

  // Inserta un recurso dentro de g, escalado a ancho w y centrado en (0, 0). Devuelve las capas de color y de línea.
  function montar(g, nombre, w, grosor, punteado) {
    const { doc, vb } = parsear(nombre);
    const esc = w / vb[2], h = vb[3] * esc;
    const caja = nuevo("g", { transform: `translate(${-w / 2} ${-h / 2}) scale(${esc}) translate(${-vb[0]} ${-vb[1]})` }, g);
    const color = nuevo("g", {}, caja);
    for (const n of [...doc.childNodes]) color.appendChild(document.importNode(n, true));
    const linea = nuevo("g", { fill: "none", stroke: TINTA, "stroke-linecap": "round", "stroke-linejoin": "round" }, caja);
    const trazos = [];
    const gr = grosor || (vb[2] < 100 ? 0.45 : 5.5);
    for (const e of color.querySelectorAll(GEOM)) {
      if (e.closest("defs,clipPath,mask,linearGradient,radialGradient,pattern,filter")) continue;
      const c = e.cloneNode(false);
      ["fill", "stroke", "style", "id", "filter", "mask", "clip-path", "opacity", "fill-opacity"].forEach((a) => c.removeAttribute(a));
      // conserva las transformaciones de los grupos de arriba
      let t = "", p = e.parentNode;
      while (p && p !== color) { if (p.getAttribute && p.getAttribute("transform")) t = p.getAttribute("transform") + " " + t; p = p.parentNode; }
      if (e.getAttribute("transform")) t += " " + e.getAttribute("transform");
      if (t.trim()) c.setAttribute("transform", t.trim()); else c.removeAttribute("transform");
      c.setAttribute("stroke-width", gr);
      linea.appendChild(c);
      trazos.push(c);
    }
    return { color, linea, trazos, punteado, h, gr };
  }

  function largos(capa) {
    let total = 0;
    capa.trazos = capa.trazos.filter((c) => { try { c._largo = c.getTotalLength(); } catch (e) { c._largo = 0; } return c._largo > 0.5; });
    for (const c of capa.trazos) { c._ini = total; total += c._largo; if (!capa.punteado) c.setAttribute("stroke-dasharray", c._largo + " " + c._largo); }
    capa.total = total;
  }

  // Dibuja la capa hasta la fracción p; devuelve el punto (en pantalla) donde está la punta.
  function dibujar(capa, p) {
    const hasta = capa.total * p;
    let punta = null;
    for (const c of capa.trazos) {
      const avance = Math.max(0, Math.min(c._largo, hasta - c._ini));
      if (capa.punteado) c.setAttribute("opacity", avance > 0 ? 1 : 0);
      else c.setAttribute("stroke-dashoffset", c._largo - avance);
      if (avance > 0 && avance < c._largo) punta = [c, avance];
    }
    if (!punta) return null;
    const [c, a] = punta, pt = c.getPointAtLength(a), m = c.getScreenCTM();
    return [pt.x * m.a + pt.y * m.c + m.e, pt.x * m.b + pt.y * m.d + m.f];
  }

  window.Pizarra = {
    escena(conf) {
      const dur = +(new URLSearchParams(location.search).get("dur") || conf.dur);
      document.body.innerHTML = `
        <svg id="pantalla" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="position:absolute;inset:0">
          <defs>
            <radialGradient id="vineta" cx="50%" cy="45%" r="75%"><stop offset="70%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".08"/></radialGradient>
            <filter id="grano"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .035 0"/></filter>
          </defs>
          <rect width="${W}" height="${H}" fill="#fdfdfb"/>
          <rect width="${W}" height="${H}" filter="url(#grano)"/>
          <g id="mundo"></g>
          <rect width="${W}" height="${H}" fill="url(#vineta)"/>
          <g id="marca" opacity=".2"></g>
          <g id="mano"></g>
        </svg>
        <div id="logo" style="position:absolute;left:52px;top:40px;background:#0d2142;border-radius:16px;padding:12px 18px;box-shadow:0 6px 18px rgba(13,33,66,.25)"></div>
        <div style="position:absolute;right:60px;bottom:36px;font:600 26px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:#8e7140;opacity:.85">realinvestors.club</div>`;
      const mundo = document.getElementById("mundo"), manoG = document.getElementById("mano"), marca = document.getElementById("marca");
      // La mano: el lápiz de Fluent Emoji, con la punta en (0, 0)
      const mano = montar(nuevo("g", { transform: "translate(118 -118)" }, nuevo("g", {}, manoG)), "obj-writing-hand-light", 300);
      mano.linea.remove();
      const manoRaiz = manoG.firstChild;
      manoRaiz.setAttribute("filter", "drop-shadow(6px 10px 8px rgba(0,0,0,.18))");

      const items = conf.elementos.map((e) => {
        const g = nuevo("g", {}, mundo);
        const it = { ...e, g };
        if (e.tipo === "img" || e.tipo === "fantasma") {
          it.capas = [montar(nuevo("g", {}, g), e.src, e.w, e.grosor, e.tipo === "fantasma")];
          if (e.tipo === "fantasma") { it.capas[0].color.remove(); it.capas[0].linea.setAttribute("stroke-dasharray", "14 12"); it.capas[0].linea.setAttribute("stroke", "#7d8597"); }
          for (const c of e.cambios || []) { const capa = montar(nuevo("g", { opacity: 0 }, g), c.src, e.w); capa.linea.remove(); it.capas.push(capa); }
        } else if (e.tipo === "texto") {
          const tx = nuevo("text", { x: 0, y: 0, "text-anchor": e.ancla || "start", "font-family": "Caveat", "font-weight": 700, "font-size": e.tam || 64, fill: e.color || TINTA }, g);
          tx.textContent = e.texto;
          const id = "c" + Math.random().toString(36).slice(2);
          const clip = nuevo("clipPath", { id }, nuevo("defs", {}, g));
          it.recorte = nuevo("rect", {}, clip);
          tx.setAttribute("clip-path", `url(#${id})`);
          it.tx = tx;
        } else if (e.tipo === "trazo") {
          it.p = nuevo("path", { d: e.d, fill: "none", stroke: e.color || TINTA, "stroke-width": e.grosor || 9, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
        } else if (e.tipo === "viaje") {
          montar(g, e.src, e.w || 90).linea.remove();
        }
        return it;
      });

      let listo = false;
      function preparar() {
        for (const it of items) {
          (it.capas || []).forEach(largos);
          if (it.tx) { const b = it.tx.getBBox(); it.caja = b; it.recorte.setAttribute("y", b.y - 20); it.recorte.setAttribute("height", b.height + 40); it.recorte.setAttribute("x", b.x - 10); }
          if (it.p) { it.largo = it.p.getTotalLength(); it.p.setAttribute("stroke-dasharray", it.largo + " " + it.largo); }
        }
        listo = true;
      }

      const camara = conf.camara;
      function camaraEn(t) {
        let a = camara[0], b = camara[0];
        for (let i = 0; i < camara.length; i++) { if (camara[i].t <= t) { a = camara[i]; b = camara[i + 1] || camara[i]; } }
        const dd = b.dur || 1.2, f = suave((t - b.t + dd) / dd);
        const enTransicion = t >= b.t - dd && b !== a;
        const k = enTransicion ? f : 0;
        return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, zoom: a.zoom + (b.zoom - a.zoom) * k };
      }

      window.cuadro = function (u) {
        if (!listo) preparar();
        if (!marca.firstChild) { // la marca de agua es el logo oficial, que animar.js pone en #logo
          const svg = document.querySelector("#logo svg");
          if (svg) { const c = svg.cloneNode(true); const g = nuevo("g", { transform: `translate(${W - 560} ${H - 250})` }, marca); const s = nuevo("svg", { width: 500, height: 170, viewBox: svg.getAttribute("viewBox") }, g); for (const n of [...c.childNodes]) s.appendChild(n); }
        }
        const t = u * dur;
        const cam = camaraEn(t);
        let tx = 0, ty = 0;
        for (const s of conf.temblor || []) if (t > s.t && t < s.t + s.dur) { tx = Math.sin(t * 95) * 9; ty = Math.cos(t * 70) * 6; }
        mundo.setAttribute("transform", `translate(${W / 2 + tx} ${H / 2 + ty}) scale(${cam.zoom}) translate(${-cam.x} ${-cam.y})`);
        let punta = null;
        for (const it of items) {
          const p = lim((t - it.t) / (it.d || 1.2));
          const visible = t >= it.t;
          it.g.setAttribute("opacity", visible ? 1 : 0);
          let x = it.x || 0, y = it.y || 0, giro = it.giro || 0, esc = 1;
          if (it.respira && visible) { esc = 1 + Math.sin((t - it.t) * 2.4) * 0.012; y += Math.sin((t - it.t) * 2.4) * 3; }
          if (it.cae && t > it.cae.t) { const c = t - it.cae.t; y += 1100 * c * c; giro += (it.cae.giro || 25) * c; }
          if (it.tipo === "img" || it.tipo === "fantasma") {
            const capa = it.capas[0];
            const pl = lim(p / 0.72), pc = suave((p - 0.5) / 0.5);
            const q = dibujar(capa, pl); if (q && p < 1) punta = q;
            if (it.tipo === "img") {
              capa.color.setAttribute("opacity", pc);
              capa.linea.setAttribute("opacity", 1 - suave((p - 0.75) / 0.25));
              let actual = 0;
              (it.cambios || []).forEach((c, i) => { if (t >= c.t) actual = i + 1; });
              it.capas.forEach((c, i) => { if (i > 0) c.color.parentNode.parentNode.setAttribute("opacity", i === actual ? 1 : 0); });
              if (actual > 0) capa.color.setAttribute("opacity", 0);
            }
          } else if (it.tipo === "texto") {
            const b = it.caja, ancho = (b.width + 20) * p;
            it.recorte.setAttribute("width", ancho);
            if (p > 0 && p < 1) { const m = it.tx.getScreenCTM(), px = b.x - 10 + ancho, py = b.y + b.height * (0.62 + 0.18 * Math.sin(t * 40)); punta = [px * m.a + py * m.c + m.e, px * m.b + py * m.d + m.f]; }
          } else if (it.tipo === "trazo") {
            const pp = lim((t - it.t) / (it.dur || 0.5));
            it.p.setAttribute("stroke-dashoffset", it.largo * (1 - pp));
            if (pp > 0 && pp < 1) { const pt = it.p.getPointAtLength(it.largo * pp), m = it.p.getScreenCTM(); punta = [pt.x * m.a + pt.y * m.c + m.e, pt.x * m.b + pt.y * m.d + m.f]; }
          } else if (it.tipo === "viaje") {
            const pv = lim((t - it.t) / (it.dur || 1)), e = suave(pv);
            x = it.desde[0] + (it.hasta[0] - it.desde[0]) * e;
            y = it.desde[1] + (it.hasta[1] - it.desde[1]) * e - Math.sin(Math.PI * e) * (it.arco || 120);
            esc = rebote(lim(pv * 4)) * (1 - suave((pv - 0.85) / 0.15));
            it.g.setAttribute("opacity", pv > 0 && pv < 1 ? 1 : 0);
            giro = pv * 360;
          }
          if (it.tipo !== "viaje") {
            let o = visible ? 1 : 0;
            if (it.desaparece) o *= 1 - lim((t - it.desaparece) / 0.4);
            if (it.cae) o *= 1 - lim((t - it.cae.t - 0.35) / 0.5);
            it.g.setAttribute("opacity", o);
          }
          it.g.setAttribute("transform", `translate(${x} ${y}) rotate(${giro}) scale(${esc})`);
        }
        // La mano sigue la punta; si no dibuja nada, sale por abajo a la derecha
        if (punta) { manoRaiz._x = punta[0]; manoRaiz._y = punta[1]; manoRaiz._fuera = t; }
        const ausente = punta ? 0 : suave((t - (manoRaiz._fuera ?? -9) - 0.15) / 0.5);
        const mx = (manoRaiz._x ?? W) + ausente * 700, my = (manoRaiz._y ?? H) + ausente * 600;
        manoRaiz.setAttribute("transform", `translate(${mx} ${my})`);
        manoRaiz.setAttribute("opacity", manoRaiz._x === undefined ? 0 : 1);
      };
      document.fonts.ready.then(() => { preparar(); window.cuadro(0); document.title = "listo"; });
    },
  };
})();
