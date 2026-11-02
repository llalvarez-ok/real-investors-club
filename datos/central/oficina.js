/* La oficina de la Central RIC: cada agente en su escritorio; cada pocos segundos uno camina hasta otro y le dice algo
   (las frases salen del dataset «charlas»). Tocar a un personaje muestra qué está haciendo (dataset «agentes»). */
(() => {
  const NS = "http://www.w3.org/2000/svg";
  const W = 1200, H = 620;
  const LUGAR = {
    youtube: [130, 250], instagram: [320, 250], editor: [510, 250], disenadora: [700, 250], analista: [900, 250], auditora: [1080, 250],
    pizarra: [130, 500], investigador: [320, 500], comunidad: [510, 500], coordinadora: [900, 500],
  };
  const ICONO = { trabajando: "···", esperando: "?", bloqueado: "!", listo: "✓", nuevo: "★" };
  const quieto = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const n = (tag, at = {}, padre) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (padre) padre.append(e); return e; };
  const cara = (id, estado) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent((window.AVATARES || {})[`${id}-${estado === "bloqueado" ? "preocupada" : "feliz"}`] || "");
  const datos = (id) => { const r = dash.data(id); return r.status === "ok" ? r.data : []; };
  const partir = (texto, max = 30) => {
    const lineas = []; let l = "";
    for (const p of String(texto).split(/\s+/)) { if ((l + " " + p).trim().length > max && l) { lineas.push(l); l = p; } else l = (l + " " + p).trim(); }
    if (l) lineas.push(l);
    return lineas.slice(0, 4);
  };

  function escena(el) {
    el.replaceChildren();
    const svg = n("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "Oficina de los agentes de RIC" }, el);
    // pared, piso y decoración
    n("rect", { x: 0, y: 0, width: W, height: 150, class: "pared" }, svg);
    n("rect", { x: 0, y: 146, width: W, height: 4, class: "zocalo" }, svg);
    n("rect", { x: 0, y: 150, width: W, height: H - 150, class: "piso" }, svg);
    for (let x = 0; x <= W; x += 80) n("line", { x1: x, y1: 150, x2: x, y2: H, class: "baldosa" }, svg);
    for (let y = 230; y <= H; y += 80) n("line", { x1: 0, y1: y, x2: W, y2: y, class: "baldosa" }, svg);
    if (window.AVATARES && window.AVATARES.logo) n("image", { href: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(window.AVATARES.logo), x: 40, y: 30, width: 150, height: 82 }, svg);
    const pz = n("g", { transform: "translate(420 18)" }, svg);
    n("rect", { x: 0, y: 0, width: 360, height: 112, rx: 6, class: "pizarron" }, pz);
    n("text", { x: 16, y: 26, class: "pz-tit" }, pz).textContent = "Camino a la monetización";
    const pzS = n("text", { x: 16, y: 52, class: "pz-txt" }, pz), pzH = n("text", { x: 16, y: 86, class: "pz-txt" }, pz);
    n("rect", { x: 16, y: 58, width: 328, height: 8, rx: 4, class: "pz-fondo" }, pz); const bS = n("rect", { x: 16, y: 58, width: 0, height: 8, rx: 4, class: "pz-barra" }, pz);
    n("rect", { x: 16, y: 92, width: 328, height: 8, rx: 4, class: "pz-fondo" }, pz); const bH = n("rect", { x: 16, y: 92, width: 0, height: 8, rx: 4, class: "pz-barra" }, pz);
    for (const [x, y] of [[1150, 140], [40, 600]]) { n("rect", { x: x - 16, y: y - 26, width: 32, height: 26, rx: 4, class: "maceta" }, svg); n("circle", { cx: x, cy: y - 44, r: 24, class: "planta" }, svg); n("circle", { cx: x - 14, cy: y - 58, r: 14, class: "planta" }, svg); }
    n("ellipse", { cx: 700, cy: 520, rx: 95, ry: 38, class: "mesa" }, svg);
    n("text", { x: 700, y: 525, class: "cartel" }, svg).textContent = "Sala de reuniones";
    n("rect", { x: 1060, y: 440, width: 70, height: 96, rx: 8, class: "cafe" }, svg);
    n("text", { x: 1095, y: 495, class: "cartel" }, svg).textContent = "Café";
    // capas: sentados (detrás de los escritorios), escritorios, caminando y globos (delante)
    const sentados = n("g", {}, svg), muebles = n("g", {}, svg), arriba = n("g", {}, svg), globos = n("g", {}, svg);
    const gente = {};
    for (const [id, [x, y]] of Object.entries(LUGAR)) {
      const p = n("g", { class: "persona", tabindex: 0, role: "button" }, sentados);
      n("ellipse", { cx: 0, cy: 6, rx: 46, ry: 10, class: "sombra" }, p);
      const img = n("image", { x: -46, y: -100, width: 92, height: 104, preserveAspectRatio: "xMidYMax meet" }, p);
      const ic = n("g", { class: "icono", transform: "translate(38 -96)" }, p);
      n("rect", { x: -14, y: -12, width: 28, height: 22, rx: 11 }, ic); const icT = n("text", { x: 0, y: 4 }, ic);
      const titulo = n("title", {}, p);
      n("rect", { x: x - 68, y: y - 14, width: 136, height: 40, rx: 5, class: "escritorio" }, muebles);
      n("line", { x1: x - 58, y1: y + 26, x2: x - 58, y2: y + 46, class: "pata" }, muebles); n("line", { x1: x + 58, y1: y + 26, x2: x + 58, y2: y + 46, class: "pata" }, muebles);
      n("rect", { x: x + 22, y: y - 44, width: 46, height: 32, rx: 3, class: "monitor" }, muebles);
      n("rect", { x: x + 26, y: y - 40, width: 38, height: 22, class: "pantalla" }, muebles);
      const nom = n("text", { x, y: y + 64, class: "nombre" }, muebles), rol = n("text", { x, y: y + 80, class: "rol" }, muebles);
      gente[id] = { id, g: p, img, ic, icT, titulo, nom, rol, casa: [x, y], pos: [x, y], dir: 1, fase: Math.random() * 6 };
    }
    return { svg, sentados, arriba, globos, gente, pzS, pzH, bS, bH };
  }

  function globo(m, texto, x, y) {
    m.globos.replaceChildren();
    const lineas = partir(texto), alto = 16 + lineas.length * 19, ancho = Math.max(...lineas.map((l) => l.length)) * 7.6 + 26;
    const gx = Math.max(10, Math.min(W - ancho - 10, x - ancho / 2)), gy = Math.max(6, y - 118 - alto);
    const g = n("g", { class: "globo" }, m.globos);
    n("rect", { x: gx, y: gy, width: ancho, height: alto, rx: 12 }, g);
    n("path", { d: `M${x - 8} ${gy + alto - 1} L${x} ${gy + alto + 12} L${x + 8} ${gy + alto - 1}` }, g);
    lineas.forEach((l, i) => { const t = n("text", { x: gx + 13, y: gy + 24 + i * 19 }, g); t.textContent = l; });
  }

  function info(el, m, a) {
    let box = el.querySelector(".of-info");
    if (!box) { box = document.createElement("div"); box.className = "of-info"; el.append(box); }
    box.replaceChildren();
    const b1 = document.createElement("div"); b1.className = "bloque";
    const b2 = document.createElement("div"); b2.className = "bloque";
    if (!a) { const t = document.createElement("span"); t.className = "muted"; t.textContent = "Tocá a un personaje para ver en qué está y qué espera de Lean."; b1.append(t); box.append(b1); return; }
    const s = document.createElement("strong"); s.textContent = `${a.nombre} · ${a.rol}`;
    const e = document.createElement("span"); e.className = "pill " + a.estado; e.textContent = a.estado;
    const h = document.createElement("span"); h.textContent = a.haciendo;
    b1.append(s, e, h);
    const et = document.createElement("span"); et.className = "muted"; et.textContent = "Espera de vos";
    const ev = document.createElement("span"); ev.textContent = a.espera;
    b2.append(et, ev);
    box.append(b1, b2);
  }

  dash.draw("oficina", {
    mount(el) {
      const m = escena(el);
      m.el = el; m.sel = null; m.cola = 0; m.t0 = performance.now(); m.paso = { tipo: "pausa", hasta: 1500 };
      for (const p of Object.values(m.gente)) {
        const elegir = () => {
          m.sel = p.id;
          for (const q of Object.values(m.gente)) q.g.classList.toggle("sel", q.id === p.id);
          info(el, m, datos("agentes").find((a) => a.id === p.id));
          for (const c of document.querySelectorAll(".ag")) c.classList.toggle("resalta", c.id === "ag-" + p.id);
        };
        p.g.addEventListener("click", elegir);
        p.g.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); elegir(); } });
      }
      info(el, m, null);
      const cuadro = (ahora) => {
        m.raf = requestAnimationFrame(cuadro);
        if (window.ricPausa) { m.t0 = ahora - (m.tPausa ?? 0); return; }
        const t = ahora - m.t0; m.tPausa = t;
        mover(m, t);
      };
      m.raf = requestAnimationFrame(cuadro);
      return m;
    },
    update(el, m) {
      const ags = datos("agentes"), kp = datos("kpis");
      for (const p of Object.values(m.gente)) {
        const a = ags.find((x) => x.id === p.id);
        const estado = a ? a.estado : "esperando";
        p.img.setAttribute("href", cara(p.id, estado));
        p.ic.setAttribute("class", "icono " + estado); p.icT.textContent = ICONO[estado] || "";
        p.titulo.textContent = a ? `${a.nombre} · ${a.rol}: ${a.estado}` : "";
        p.nom.textContent = a ? a.nombre : ""; p.rol.textContent = a ? a.rol : "";
      }
      const k = (id) => kp.find((r) => r.id === id);
      const s = k("suscriptores"), h = k("horas"), f = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 });
      m.pzS.textContent = s ? `Suscriptores: ${f.format(s.valor)} de ${f.format(s.meta)}` : "Suscriptores: —";
      m.pzH.textContent = h ? `Horas de videos largos: ${f.format(h.valor)} de ${f.format(h.meta)}` : "Horas de videos largos: —";
      m.bS.setAttribute("width", s ? Math.max(3, 328 * Math.min(1, s.valor / s.meta)) : 0);
      m.bH.setAttribute("width", h ? Math.max(3, 328 * Math.min(1, h.valor / h.meta)) : 0);
      if (m.sel) info(el, m, ags.find((a) => a.id === m.sel));
    },
    unmount(el, m) { if (m && m.raf) cancelAnimationFrame(m.raf); },
  });

  // Máquina de la charla: pausa → camina hasta el otro → habla → vuelve → pausa
  function mover(m, t) {
    const charlas = datos("charlas").filter((c) => m.gente[c.de] && m.gente[c.a] && c.de !== c.a);
    const lento = quieto();
    for (const p of Object.values(m.gente)) {
      if (p === m.caminante) continue;
      const bob = lento ? 0 : Math.sin(t / 420 + p.fase) * 1.6;
      p.g.setAttribute("transform", `translate(${p.casa[0]} ${p.casa[1] + bob})`);
    }
    const paso = m.paso;
    if (!charlas.length) return;
    if (paso.tipo === "pausa" && t > paso.hasta) {
      const c = charlas[m.cola % charlas.length]; m.cola++;
      const de = m.gente[c.de], a = m.gente[c.a];
      const lado = a.casa[0] > de.casa[0] ? -1 : 1;
      const destino = [a.casa[0] + lado * 96, a.casa[1] + 40];
      if (lento) { globo(m, c.texto, de.casa[0], de.casa[1]); m.paso = { tipo: "habla", c, hasta: t + 5200, quieto: true, de }; return; }
      m.caminante = de; m.arriba.append(de.g);
      const dist = Math.hypot(destino[0] - de.casa[0], destino[1] - de.casa[1]);
      m.paso = { tipo: "ida", c, de, desde: de.casa, hacia: destino, ini: t, dur: Math.max(900, dist / 0.17) };
    } else if (paso.tipo === "ida" || paso.tipo === "vuelta") {
      const u = Math.min(1, (t - paso.ini) / paso.dur), e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      const x = paso.desde[0] + (paso.hacia[0] - paso.desde[0]) * e, y = paso.desde[1] + (paso.hacia[1] - paso.desde[1]) * e;
      const dir = paso.hacia[0] < paso.desde[0] ? -1 : 1;
      const salto = Math.abs(Math.sin(t / 110)) * 6, giro = Math.sin(t / 110) * 3;
      paso.de.g.setAttribute("transform", `translate(${x} ${y - salto}) rotate(${giro}) scale(${dir} 1)`);
      paso.de.icT.parentNode.setAttribute("transform", `translate(${38 * dir} -96) scale(${dir} 1)`);
      if (u >= 1) {
        if (paso.tipo === "ida") { globo(m, paso.c.texto, x, y); m.paso = { tipo: "habla", c: paso.c, de: paso.de, pos: [x, y], mira: Math.sign(m.gente[paso.c.a].casa[0] - x) || 1, hasta: t + 5200 }; }
        else { paso.de.icT.parentNode.setAttribute("transform", "translate(38 -96)"); m.sentados.append(paso.de.g); m.caminante = null; m.paso = { tipo: "pausa", hasta: t + 1800 }; }
      }
    } else if (paso.tipo === "habla") {
      if (paso.pos) { paso.de.g.setAttribute("transform", `translate(${paso.pos[0]} ${paso.pos[1] + Math.sin(t / 300) * 1.5}) scale(${paso.mira} 1)`); paso.de.icT.parentNode.setAttribute("transform", `translate(${38 * paso.mira} -96) scale(${paso.mira} 1)`); }
      if (t > paso.hasta) {
        m.globos.replaceChildren();
        if (paso.quieto) { m.paso = { tipo: "pausa", hasta: t + 1500 }; return; }
        const dist = Math.hypot(paso.pos[0] - paso.de.casa[0], paso.pos[1] - paso.de.casa[1]);
        m.paso = { tipo: "vuelta", de: paso.de, desde: paso.pos, hacia: paso.de.casa, ini: t, dur: Math.max(900, dist / 0.17) };
      }
    }
  }

  for (const b of document.querySelectorAll(".of-pausa")) {
    b.addEventListener("click", () => {
      window.ricPausa = !window.ricPausa;
      b.setAttribute("aria-pressed", String(!!window.ricPausa));
    });
  }
})();
