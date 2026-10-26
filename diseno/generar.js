/* Láminas de clase RIC (1920x1080): lee spec-<clave>.json y escribe un HTML por lámina en out/<modulo>/<leccion>/NN.html,
   más un índice (laminas.json) con rutas, títulos y notas. render.js las captura con Chrome headless. */
const fs = require("fs"), path = require("path");
const DIR = __dirname, OUT = path.join(DIR, "out");
const logo = fs.readFileSync("C:/ric/assets/logo.svg", "utf8").replace(/<\?xml[^>]*>/, "");
const G = "#c7a35e", G2 = "#e2c68c", GD = "#8e7140", V = "#3dd68c", R = "#ff6b6b", M = "#a3b5d1", AZ = "#5b9bd8", LN = "#274a80";

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const tx = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<span class="oro">$1</span>');
const slug = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 46);

/* ---------- iconos (trazo, 64x64) ---------- */
const P = {
  banco: '<path d="M8 26 32 12l24 14H8z"/><path d="M14 26v22M24 26v22M40 26v22M50 26v22M8 52h48M6 48h52"/>',
  moneda: '<circle cx="32" cy="32" r="22"/><path d="M38 24c-2-3-10-4-12 1-2 6 12 5 12 11 0 5-9 6-13 2M32 16v6M32 42v6"/>',
  billete: '<rect x="6" y="18" width="52" height="28" rx="4"/><circle cx="32" cy="32" r="8"/><path d="M14 26v12M50 26v12"/>',
  "grafico-sube": '<path d="M8 8v48h48"/><path d="M14 46l12-12 9 7 17-21"/><path d="M42 20h10v10"/>',
  "grafico-baja": '<path d="M8 8v48h48"/><path d="M14 18l12 12 9-7 17 21"/><path d="M42 44h10V34"/>',
  velas: '<path d="M16 8v48M32 12v44M48 6v46"/><rect x="11" y="20" width="10" height="22" rx="1.5"/><rect x="27" y="24" width="10" height="16" rx="1.5"/><rect x="43" y="14" width="10" height="26" rx="1.5"/>',
  globo: '<circle cx="32" cy="32" r="24"/><path d="M8 32h48M32 8c-10 8-10 40 0 48M32 8c10 8 10 40 0 48M12 20h40M12 44h40"/>',
  reloj: '<circle cx="32" cy="32" r="24"/><path d="M32 16v16l11 7"/>',
  calendario: '<rect x="8" y="12" width="48" height="44" rx="5"/><path d="M8 24h48M20 6v12M44 6v12M18 34h6M29 34h6M40 34h6M18 45h6M29 45h6"/>',
  escudo: '<path d="M32 6 10 14v16c0 14 9 23 22 28 13-5 22-14 22-28V14z"/><path d="M22 32l7 7 13-14"/>',
  balanza: '<path d="M32 8v46M18 56h28M10 18h44"/><path d="M10 18 3 36a8 8 0 0 0 14 0zM54 18l-7 18a8 8 0 0 0 14 0z"/>',
  lupa: '<circle cx="27" cy="27" r="18"/><path d="M41 41l16 16"/>',
  cerebro: '<path d="M24 10c-8 0-12 6-11 12-6 3-6 12 0 15-1 8 5 14 12 13 3 0 7-2 7-6V16c0-4-4-6-8-6zM40 10c8 0 12 6 11 12 6 3 6 12 0 15 1 8-5 14-12 13-3 0-7-2-7-6"/><path d="M22 24c3 0 5 2 5 5M42 24c-3 0-5 2-5 5M20 38c4 0 6-2 6-5M44 38c-4 0-6-2-6-5"/>',
  cohete: '<path d="M32 6c10 8 14 20 10 34H22C18 26 22 14 32 6z"/><circle cx="32" cy="24" r="5"/><path d="M22 34l-9 9 9 3M42 34l9 9-9 3M27 46c0 5 2 9 5 12 3-3 5-7 5-12"/>',
  alerta: '<path d="M32 8 4 54h56z"/><path d="M32 24v16M32 46v2"/>',
  bombilla: '<path d="M22 40c-6-5-9-11-7-19 2-8 9-13 17-13s15 5 17 13c2 8-1 14-7 19v6H22z"/><path d="M24 52h16M27 58h10M32 30v10M27 30h10"/>',
  diana: '<circle cx="30" cy="34" r="22"/><circle cx="30" cy="34" r="13"/><circle cx="30" cy="34" r="4"/><path d="M30 34 56 8M46 8h10v10"/>',
  llave: '<circle cx="20" cy="40" r="12"/><path d="M29 31 56 6M46 16l8 8M38 24l6 6"/>',
  candado: '<rect x="12" y="28" width="40" height="28" rx="5"/><path d="M20 28v-8a12 12 0 0 1 24 0v8M32 38v8"/>',
  libro: '<path d="M32 14C24 8 14 8 6 10v40c8-2 18-2 26 4 8-6 18-6 26-4V10c-8-2-18-2-26 4zM32 14v40"/>',
  persona: '<circle cx="32" cy="20" r="11"/><path d="M10 56c0-13 10-20 22-20s22 7 22 20"/>',
  personas: '<circle cx="22" cy="22" r="9"/><circle cx="44" cy="24" r="7"/><path d="M4 54c0-11 8-17 18-17s18 6 18 17M42 38c9 0 18 5 18 16"/>',
  casa: '<path d="M6 30 32 8l26 22M12 26v30h40V26M26 56V38h12v18"/>',
  carrito: '<path d="M4 10h8l8 30h30l6-22H16"/><circle cx="24" cy="50" r="4"/><circle cx="46" cy="50" r="4"/>',
  fabrica: '<path d="M6 56V30l16 10V30l16 10V18h8l4 38z"/><path d="M6 56h52M16 48h4M30 48h4M44 48h4"/>',
  bitcoin: '<circle cx="32" cy="32" r="24"/><path d="M24 18h11c8 0 8 12 0 12H24zM24 30h13c9 0 9 14 0 14H24zM24 18v26M28 12v6M36 12v6M28 44v6M36 44v6"/>',
  ethereum: '<path d="M32 4 12 32l20 12 20-12zM12 38l20 22 20-22-20 12z"/><path d="M32 4v40"/>',
  dolar: '<path d="M44 20c-3-6-20-8-22 2-3 12 22 8 22 20 0 10-18 11-25 3M32 6v52"/>',
  porcentaje: '<circle cx="18" cy="18" r="9"/><circle cx="46" cy="46" r="9"/><path d="M52 10 12 54"/>',
  flechas: '<path d="M8 22h44M40 10l12 12-12 12M56 44H12M24 32 12 44l12 12"/>',
  documento: '<path d="M14 6h26l12 12v40H14z"/><path d="M40 6v12h12M22 30h22M22 40h22M22 50h14"/>',
  calculadora: '<rect x="12" y="6" width="40" height="52" rx="5"/><rect x="19" y="13" width="26" height="11" rx="2"/><path d="M21 34h4M30 34h4M39 34h4M21 43h4M30 43h4M39 43h4M21 51h4M30 51h13"/>',
  alcancia: '<path d="M10 34c0-10 9-17 21-17 8 0 15 3 19 9l7 2v10l-6 2c-1 3-3 5-6 7v7h-8v-4h-9v4h-8v-8c-6-3-10-7-10-12z"/><path d="M26 17v-5h10M44 30v1M4 30c3 0 5 2 6 5"/>',
  semaforo: '<rect x="20" y="4" width="24" height="52" rx="8"/><circle cx="32" cy="16" r="5"/><circle cx="32" cy="30" r="5"/><circle cx="32" cy="44" r="5"/><path d="M32 56v6"/>',
  brujula: '<circle cx="32" cy="32" r="24"/><path d="M42 22 36 36 22 42l6-14z"/>',
  montana: '<path d="M4 54 24 16l10 18 6-9 20 29z"/><path d="M18 28l6 5 6-4"/>',
  engranaje: '<circle cx="32" cy="32" r="9"/><path d="M32 6v9M32 49v9M6 32h9M49 32h9M13.6 13.6l6.4 6.4M44 44l6.4 6.4M50.4 13.6 44 20M20 44l-6.4 6.4"/><circle cx="32" cy="32" r="18"/>',
  megafono: '<path d="M8 26v12h10l22 14V12L18 26zM48 22c4 4 4 16 0 20M18 38l4 16h8l-3-12"/>',
  termometro: '<path d="M26 38V12a6 6 0 0 1 12 0v26a12 12 0 1 1-12 0z"/><path d="M32 22v24"/><circle cx="32" cy="48" r="5"/>',
  paraguas: '<path d="M4 32a28 28 0 0 1 56 0z"/><path d="M32 4v4M32 32v20a6 6 0 0 1-12 0"/>',
};
const ico = (n, s = 96, c = G2) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${P[n] || P.bombilla}</svg>`;
const medalla = (n, d = 300) => `<div class="medalla" style="width:${d}px;height:${d}px">${ico(n, Math.round(d * 0.52))}</div>`;

/* ---------- gráficos SVG ---------- */
const W0 = 1680, H0 = 580;
const fmtN = (v) => (Math.abs(v) >= 1000 ? Math.round(v).toLocaleString("es-AR") : String(Math.round(v * 100) / 100).replace(".", ","));
const svg = (inner, w = W0, h = H0) => `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Sans, Segoe UI, sans-serif">${inner}</svg>`;
const tonoC = (t) => ({ verde: V, rojo: R, oro: G2, azul: AZ }[t] || G2);
function escalaLinda(min, max, n = 4) {
  const bruto = (max - min) / n || 1, pot = Math.pow(10, Math.floor(Math.log10(bruto))), f = bruto / pot;
  const paso = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * pot;
  const lo = Math.floor(min / paso) * paso; let hi = lo + paso * n; while (hi < max) hi += paso;
  return { min: lo, max: hi, n: Math.round((hi - lo) / paso) };
}
function ejes(min, max, x0, y0, w, h, unidad = "", n = 4) {
  unidad = String(unidad || "").trim().length <= 1 ? unidad : "";
  let s = "";
  for (let i = 0; i <= n; i++) { const v = min + ((max - min) * i) / n, y = y0 + h - (h * i) / n; s += `<line x1="${x0}" y1="${y}" x2="${x0 + w}" y2="${y}" stroke="${LN}" stroke-width="1.5" stroke-dasharray="${i ? "6 8" : "0"}"/><text x="${x0 - 16}" y="${y + 9}" text-anchor="end" font-size="26" fill="${M}">${fmtN(v)}${unidad ? " " + esc(unidad) : ""}</text>`; }
  return s;
}
function gBarras(g) {
  const x0 = 150, y0 = 40, w = W0 - 200, h = H0 - 130; const vals = g.valores.map(Number);
  const E = escalaLinda(Math.min(0, ...vals) * 1.12, (Math.max(...vals, 0) * 1.12) || 1), max = E.max, min = E.min;
  const y = (v) => y0 + h - ((v - min) / (max - min)) * h; const bw = Math.min(170, (w / vals.length) * 0.58);
  let s = ejes(min, max, x0, y0, w, h, g.unidad, E.n);
  vals.forEach((v, i) => { const cx = x0 + (w / vals.length) * (i + 0.5), top = Math.min(y(v), y(0)), hh = Math.abs(y(v) - y(0)); const dest = g.destacar === i;
    s += `<rect x="${cx - bw / 2}" y="${top}" width="${bw}" height="${Math.max(3, hh)}" rx="10" fill="${dest ? "url(#oro)" : v < 0 ? R : "#3a66a8"}" ${dest ? "" : 'opacity=".9"'}/>`;
    s += `<text x="${cx}" y="${(v >= 0 ? top : top + hh + 40) - 14}" text-anchor="middle" font-size="32" font-weight="700" fill="${dest ? G2 : "#ecf1f9"}">${fmtN(v)}${g.unidad ? " " + esc(g.unidad) : ""}</text>`;
    s += `<text x="${cx}" y="${y0 + h + 48}" text-anchor="middle" font-size="28" fill="${M}">${esc(g.etiquetas[i] || "")}</text>`; });
  return svg(DEFS + s);
}
function gLineas(g) {
  const series = g.series || [{ nombre: null, valores: g.valores }]; const n = series[0].valores.length;
  const x0 = 150, y0 = 50, w = W0 - 220, h = H0 - 150; const all = series.flatMap((s) => s.valores.map(Number));
  let min = Math.min(...all), max = Math.max(...all); const pad = (max - min) * 0.12 || 1; const E = escalaLinda(min >= 0 && min - pad < 0 ? 0 : min - pad, max + pad); min = E.min; max = E.max;
  const X = (i) => x0 + (w * i) / Math.max(1, n - 1), Y = (v) => y0 + h - ((v - min) / (max - min)) * h;
  const col = [G2, AZ, V]; let s = ejes(min, max, x0, y0, w, h, g.unidad, E.n), lx = x0 + 20;
  series.forEach((se, k) => { const pts = se.valores.map((v, i) => `${X(i)},${Y(v)}`).join(" ");
    if (k === 0 && series.length === 1) s += `<polygon points="${x0},${y0 + h} ${pts} ${x0 + w},${y0 + h}" fill="url(#area)"/>`;
    s += `<polyline points="${pts}" fill="none" stroke="${col[k]}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>`;
    se.valores.forEach((v, i) => (s += `<circle cx="${X(i)}" cy="${Y(v)}" r="7" fill="#071426" stroke="${col[k]}" stroke-width="4"/>`));
    if (se.nombre) { s += `<rect x="${lx}" y="6" width="34" height="10" rx="5" fill="${col[k]}"/><text x="${lx + 46}" y="20" font-size="28" font-weight="600" fill="#ecf1f9">${esc(se.nombre)}</text>`; lx += 46 + String(se.nombre).length * 15.5 + 50; } });
  const paso = Math.ceil(n / 9);
  (g.etiquetas || []).forEach((e, i) => { if (i % paso === 0 || i === n - 1) s += `<text x="${X(i)}" y="${y0 + h + 48}" text-anchor="middle" font-size="26" fill="${M}">${esc(e)}</text>`; });
  (g.marcas || []).slice(0, 3).forEach((m) => { const v = series[0].valores[m.i]; if (v == null) return; const x = X(m.i), yy = Y(v); const arriba = yy > y0 + 90;
    s += `<line x1="${x}" y1="${yy}" x2="${x}" y2="${arriba ? yy - 62 : yy + 62}" stroke="${G2}" stroke-width="2.5"/>` + etiqueta(Math.max(x, x0 + Math.min(560, String(m.texto || "").length * 15.5 + 40) / 2 + 14), arriba ? yy - 84 : yy + 84, m.texto, G2, W0); });
  return svg(DEFS + s);
}
function etiquetaDer(x, y, texto, color) {
  y = Math.max(30, Math.min(H0 - 30, y));
  const t = String(texto || ""); const fs = t.length > 18 ? 22 : 27; const w = Math.min(340, t.length * (fs * 0.6) + 36);
  return `<rect x="${x}" y="${y - 24}" width="${w}" height="48" rx="12" fill="#0d2142" stroke="${color}" stroke-width="2"/><text x="${x + w / 2}" y="${y + 9}" text-anchor="middle" font-size="${fs}" font-weight="600" fill="${color}">${esc(t)}</text>`;
}
function etiqueta(x, y, texto, color, maxW) {
  const t = String(texto || ""); const w = Math.min(560, t.length * 15.5 + 40); const xx = Math.max(w / 2 + 8, Math.min(maxW - w / 2 - 8, x));
  return `<rect x="${xx - w / 2}" y="${y - 24}" width="${w}" height="48" rx="12" fill="#0d2142" stroke="${color}" stroke-width="2"/><text x="${xx}" y="${y + 10}" text-anchor="middle" font-size="27" font-weight="600" fill="${color}">${esc(t)}</text>`;
}
function gVelas(g) {
  const vs = g.velas.map((v) => (Array.isArray(v) ? { o: +v[0], h: +v[1], l: +v[2], c: +v[3] } : v)); const n = vs.length;
  const x0 = 40, y0 = 40, w = W0 - 400, h = H0 - 80;
  let min = Math.min(...vs.map((v) => v.l), ...(g.niveles || []).map((x) => x.precio), ...(g.zonas || []).map((z) => Math.min(z.desde, z.hasta)));
  let max = Math.max(...vs.map((v) => v.h), ...(g.niveles || []).map((x) => x.precio), ...(g.zonas || []).map((z) => Math.max(z.desde, z.hasta)));
  const pad = (max - min) * 0.12 || 1; min -= pad; max += pad;
  const Y = (p) => y0 + h - ((p - min) / (max - min)) * h, paso = w / n, bw = Math.max(8, Math.min(44, paso * 0.62)), X = (i) => x0 + paso * (i + 0.5);
  let s = "", fin = ""; const ocupadas = [];
  for (let i = 0; i <= 4; i++) { const p = min + ((max - min) * i) / 4; s += `<line x1="${x0}" y1="${Y(p)}" x2="${x0 + w}" y2="${Y(p)}" stroke="${LN}" stroke-width="1.2" stroke-dasharray="5 9"/>`; }
  (g.zonas || []).slice(0, 3).forEach((z) => { const c = tonoC(z.tono), a = Y(Math.max(z.desde, z.hasta)), b = Y(Math.min(z.desde, z.hasta)); s += `<rect x="${x0}" y="${a}" width="${w}" height="${Math.max(6, b - a)}" fill="${c}" opacity=".16"/><line x1="${x0}" y1="${a}" x2="${x0 + w}" y2="${a}" stroke="${c}" stroke-width="1.5" opacity=".7"/><line x1="${x0}" y1="${b}" x2="${x0 + w}" y2="${b}" stroke="${c}" stroke-width="1.5" opacity=".7"/>` ; ocupadas.push((a + b) / 2); fin += etiquetaDer(x0 + w + 14, (a + b) / 2, z.texto, c); });
  (g.niveles || []).slice(0, 3).forEach((nv) => { const c = tonoC(nv.tono), yy = Y(nv.precio); s += `<line x1="${x0}" y1="${yy}" x2="${x0 + w}" y2="${yy}" stroke="${c}" stroke-width="3.5" stroke-dasharray="16 10"/>` ; let ye = yy; while (ocupadas.some((o) => Math.abs(o - ye) < 54)) ye -= 56; ocupadas.push(ye); fin += etiquetaDer(x0 + w + 14, ye, nv.texto, c); });
  vs.forEach((v, i) => { const alc = v.c >= v.o, c = alc ? V : R, top = Y(Math.max(v.o, v.c)), bot = Y(Math.min(v.o, v.c));
    s += `<line x1="${X(i)}" y1="${Y(v.h)}" x2="${X(i)}" y2="${Y(v.l)}" stroke="${c}" stroke-width="3"/><rect x="${X(i) - bw / 2}" y="${top}" width="${bw}" height="${Math.max(4, bot - top)}" rx="3" fill="${c}"/>`; });
  (g.diagonales || []).slice(0, 3).forEach((d) => { const c = tonoC(d.tono); s += `<line x1="${X(d.desde[0])}" y1="${Y(d.desde[1])}" x2="${X(d.hasta[0])}" y2="${Y(d.hasta[1])}" stroke="${c}" stroke-width="4" stroke-dasharray="14 9" stroke-linecap="round"/>`; if (d.texto) { let ye = Y(d.hasta[1]); while (ocupadas.some((o) => Math.abs(o - ye) < 54)) ye -= 56; ocupadas.push(ye); fin += etiquetaDer(x0 + w + 14, ye, d.texto, c); } });
  (g.marcas || []).slice(0, 3).forEach((m) => { const v = vs[m.i]; if (!v) return; const abajo = m.lado === "abajo"; const yy = abajo ? Y(v.l) + 16 : Y(v.h) - 16, ye = abajo ? Math.min(y0 + h - 4, yy + 70) : Math.max(y0 + 26, yy - 70);
    s += `<path d="M${X(m.i)} ${ye + (abajo ? -26 : 26)} L${X(m.i)} ${yy}" stroke="${G2}" stroke-width="3"/><path d="M${X(m.i) - 9} ${yy + (abajo ? 12 : -12)} L${X(m.i)} ${yy} L${X(m.i) + 9} ${yy + (abajo ? 12 : -12)}" fill="none" stroke="${G2}" stroke-width="3"/>` + etiqueta(X(m.i), ye, m.texto, G2, x0 + w); });
  return svg(DEFS + s + fin);
}
function gVela(g) {
  const vs = g.velas.slice(0, 3); const n = vs.length; const cw = W0 / n; let s = "";
  vs.forEach((v, k) => { const cx = cw * (k + 0.5) - (v.partes && n === 1 ? 0 : 0), y0 = 40, h = H0 - 130; const Y = (p) => y0 + h - ((p - v.l) / (v.h - v.l || 1)) * h;
    const alc = v.c >= v.o, c = alc ? V : R, bw = n === 1 ? 190 : 140, top = Y(Math.max(v.o, v.c)), bot = Y(Math.min(v.o, v.c));
    s += `<line x1="${cx}" y1="${Y(v.h)}" x2="${cx}" y2="${Y(v.l)}" stroke="${c}" stroke-width="7"/><rect x="${cx - bw / 2}" y="${top}" width="${bw}" height="${Math.max(8, bot - top)}" rx="8" fill="${c}"/>`;
    s += `<text x="${cx}" y="${H0 - 22}" text-anchor="middle" font-size="36" font-weight="800" font-family="Archivo, sans-serif" fill="#ecf1f9">${esc(v.nombre || (alc ? "Vela alcista" : "Vela bajista"))}</text>`;
    if (v.partes) { const R1 = cx + bw / 2 + 26, L1 = cx - bw / 2 - 26; const lab = (x, y, t, anc) => `<line x1="${anc === "start" ? x - 18 : x + 18}" y1="${y}" x2="${anc === "start" ? cx + (y > top && y < bot ? bw / 2 : 4) : cx - (y > top && y < bot ? bw / 2 : 4)}" y2="${y}" stroke="${G2}" stroke-width="2.5" stroke-dasharray="5 6"/><text x="${x}" y="${y + 10}" text-anchor="${anc}" font-size="${n === 1 ? 32 : 26}" font-weight="600" fill="${G2}">${esc(t)}</text>`;
      s += lab(R1, Y(v.h), "Máximo", "start") + lab(R1, Y(v.l), "Mínimo", "start") + lab(L1, alc ? top + 4 : bot - 4, "Cierre", "end") + lab(L1, alc ? bot - 4 : top + 4, "Apertura", "end") + lab(R1, (top + bot) / 2, "Cuerpo", "start");
      if (top - Y(v.h) > 30) s += lab(L1, Math.min((Y(v.h) + top) / 2, top - 46), "Mecha superior", "end"); if (Y(v.l) - bot > 30) s += lab(L1, Math.max((Y(v.l) + bot) / 2, bot + 46), "Mecha inferior", "end"); } });
  return svg(DEFS + s);
}
function gCiclo(g) {
  const f = g.fases.slice(0, 5), n = f.length; const x0 = 60, w = W0 - 120, my = 250, amp = 150; let d = "", s = "";
  for (let i = 0; i <= 200; i++) { const x = x0 + (w * i) / 200, y = my - Math.sin((i / 200) * Math.PI * 2 - Math.PI / 2 + Math.PI / n) * amp * -1; d += (i ? "L" : "M") + x + " " + y; }
  s += `<line x1="${x0}" y1="${my}" x2="${x0 + w}" y2="${my}" stroke="${LN}" stroke-width="2" stroke-dasharray="8 10"/><path d="${d}" fill="none" stroke="url(#oroL)" stroke-width="8" stroke-linecap="round"/>`;
  f.forEach((p, i) => { const t = (i + 0.5) / n, x = x0 + w * t, y = my + Math.sin(t * Math.PI * 2 - Math.PI / 2 + Math.PI / n) * amp; const cw = Math.min(330, w / n - 24);
    s += `<circle cx="${x}" cy="${y}" r="26" fill="#071426" stroke="${G2}" stroke-width="5"/><text x="${x}" y="${y + 11}" text-anchor="middle" font-size="30" font-weight="800" fill="${G2}">${i + 1}</text>`;
    s += `<foreignObject x="${x - cw / 2}" y="440" width="${cw}" height="160"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center;color:#ecf1f9;font-family:'IBM Plex Sans',sans-serif"><div style="font-family:Archivo,sans-serif;font-weight:800;font-size:34px;color:#e2c68c;line-height:1.1">${esc(p.nombre)}</div><div style="font-size:26px;line-height:1.25;color:#a3b5d1;margin-top:6px">${esc(p.texto || "")}</div></div></foreignObject>`; });
  return svg(DEFS + s);
}
function gTorta(g) {
  const ps = g.partes.slice(0, 5), tot = ps.reduce((a, p) => a + Number(p.valor), 0) || 1; const cx = 420, cy = 300, r = 250, ri = 130; const col = [G2, "#3a66a8", V, "#8e7140", R]; let a0 = -Math.PI / 2, s = "";
  ps.forEach((p, i) => { const a1 = a0 + (Number(p.valor) / tot) * Math.PI * 2, big = a1 - a0 > Math.PI ? 1 : 0; const pt = (a, rr) => `${cx + Math.cos(a) * rr} ${cy + Math.sin(a) * rr}`;
    s += `<path d="M${pt(a0, r)} A${r} ${r} 0 ${big} 1 ${pt(a1, r)} L${pt(a1, ri)} A${ri} ${ri} 0 ${big} 0 ${pt(a0, ri)} Z" fill="${col[i]}" stroke="#071426" stroke-width="6"/>`;
    const ly = 300 - (ps.length - 1) * 50 + i * 100; s += `<rect x="820" y="${ly - 26}" width="52" height="52" rx="12" fill="${col[i]}"/><text x="894" y="${ly + 2}" font-size="38" font-weight="700" fill="#ecf1f9">${esc(p.nombre)}</text><text x="894" y="${ly + 40}" font-size="30" fill="${M}">${fmtN((Number(p.valor) / tot) * 100)} %</text>`; a0 = a1; });
  return svg(DEFS + s);
}
function gBalanza(g) {
  const ang = g.inclinacion === "izquierda" ? -12 : g.inclinacion === "derecha" ? 12 : 0; const cx = W0 / 2, py = 150, L = 480; const rad = (ang * Math.PI) / 180; const lx = cx - Math.cos(rad) * L, ly = py - Math.sin(rad) * L, rx = cx + Math.cos(rad) * L, ry = py + Math.sin(rad) * L;
  const plato = (x, y, t, c) => `<line x1="${x}" y1="${y}" x2="${x - 130}" y2="${y + 190}" stroke="${M}" stroke-width="3"/><line x1="${x}" y1="${y}" x2="${x + 130}" y2="${y + 190}" stroke="${M}" stroke-width="3"/><path d="M${x - 170} ${y + 190} h340 a170 70 0 0 1 -340 0z" fill="${c}" opacity=".25" stroke="${c}" stroke-width="4"/><text x="${x}" y="${y + 320}" text-anchor="middle" font-size="46" font-weight="800" font-family="Archivo, sans-serif" fill="${c}">${esc(t)}</text>`;
  return svg(DEFS + `<line x1="${cx}" y1="${py}" x2="${cx}" y2="540" stroke="${G2}" stroke-width="12" stroke-linecap="round"/><path d="M${cx - 150} 560 h300" stroke="${G2}" stroke-width="12" stroke-linecap="round"/><line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="${G2}" stroke-width="10" stroke-linecap="round"/><circle cx="${cx}" cy="${py}" r="18" fill="${G2}"/>` + plato(lx, ly, g.izquierda, R) + plato(rx, ry, g.derecha, V));
}
const DEFS = `<defs><linearGradient id="oro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2c68c"/><stop offset="1" stop-color="#a98748"/></linearGradient><linearGradient id="oroL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a98748"/><stop offset=".5" stop-color="#e2c68c"/><stop offset="1" stop-color="#a98748"/></linearGradient><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7a35e" stop-opacity=".30"/><stop offset="1" stop-color="#c7a35e" stop-opacity="0"/></linearGradient></defs>`;
function grafico(g) {
  try { return ({ barras: gBarras, linea: gLineas, lineas: gLineas, velas: gVelas, vela: gVela, ciclo: gCiclo, torta: gTorta, balanza: gBalanza }[g.tipo] || (() => ""))(g); }
  catch (e) { console.warn("gráfico con error:", g.tipo, e.message); return ""; }
}

/* ---------- plantillas por tipo ---------- */
const lista = (arr, cls = "") => `<ul class="pts ${cls}">${(arr || []).map((p) => `<li><span class="bul"></span><span>${tx(p)}</span></li>`).join("")}</ul>`;
const T = {
  portada: (l, ctx) => `<div class="dos"><div class="col"><div class="kicker">Nivel ${ctx.nivel} · ${esc(ctx.nivelNombre)} — Módulo ${ctx.modulo}</div><div class="leccion-n">Lección ${ctx.numero}</div><h1 class="grande">${tx(l.titulo)}</h1>${l.subtitulo ? `<p class="sub">${tx(l.subtitulo)}</p>` : ""}<div class="modulo-n">${esc(ctx.moduloNombre)}</div></div><div class="lado">${medalla(l.icono || "libro", 430)}</div></div>`,
  pregunta: (l) => `<div class="dos"><div class="col"><div class="kicker">Para pensar</div><h1 class="preg">${tx(l.texto)}</h1>${l.detalle ? `<p class="sub">${tx(l.detalle)}</p>` : ""}</div><div class="lado"><div class="signo">?</div></div></div>`,
  agenda: (l) => `<div class="kicker">${esc(l.titulo || "Hoy vas a aprender")}</div><div class="agenda">${(l.puntos || []).map((p, i) => `<div class="ag"><span class="num">${i + 1}</span><span>${tx(p)}</span></div>`).join("")}</div>`,
  concepto: (l) => `<div class="dos"><div class="col"><h2>${tx(l.titulo)}</h2>${lista(l.puntos)}</div><div class="lado">${medalla(l.icono || "bombilla", 330)}</div></div>`,
  definicion: (l) => `<div class="dos"><div class="col"><div class="kicker">Concepto clave</div><h1 class="termino oro" style="font-size:${String(l.termino || "").length <= 12 ? 108 : String(l.termino).length <= 16 ? 88 : String(l.termino).length <= 22 ? 72 : 60}px">${esc(l.termino)}</h1><div class="card"><p>${tx(l.definicion)}</p></div>${l.analogia ? `<div class="card oro-b con-ico">${ico("bombilla", 70)}<p>${tx(l.analogia)}</p></div>` : ""}</div><div class="lado">${medalla(l.icono || "libro", 330)}</div></div>`,
  comparacion: (l) => { const c = (x) => `<div class="card alto ${x.tono === "verde" ? "verde" : x.tono === "rojo" ? "rojo" : x.tono === "azul" ? "" : "oro-b"}"><div class="tag">${tx(x.titulo)}</div>${lista(x.puntos, "chica")}</div>`; return `<h2>${tx(l.titulo)}</h2><div class="fila">${c(l.izquierda)}<div class="vs">VS</div>${c(l.derecha)}</div>`; },
  pasos: (l) => `<h2>${tx(l.titulo)}</h2><div class="pasos n${(l.pasos || []).length}">${(l.pasos || []).map((p, i, a) => `<div class="paso"><span class="num">${i + 1}</span><b>${tx(p.titulo)}</b><p>${tx(p.texto || "")}</p></div>${i < a.length - 1 ? '<div class="flecha">›</div>' : ""}`).join("")}</div>`,
  dato: (l) => `<div class="centro"><div class="mega oro">${esc(l.numero)}</div><h2>${tx(l.etiqueta)}</h2>${l.detalle ? `<p class="sub">${tx(l.detalle)}</p>` : ""}</div>`,
  tabla: (l) => `<h2>${tx(l.titulo)}</h2><table class="tb"><thead><tr>${(l.columnas || []).map((c) => `<th>${tx(c)}</th>`).join("")}</tr></thead><tbody>${(l.filas || []).map((f) => `<tr>${f.map((c, i) => `<td${i === 0 ? ' class="pri"' : ""}>${tx(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`,
  ejemplo: (l) => `<div class="dos"><div class="col"><div class="kicker">Ejemplo</div><h2>${tx(l.titulo)}</h2><div class="card"><p>${tx(l.situacion)}</p></div>${lista(l.desarrollo, "chica")}${l.conclusion ? `<div class="card oro-b"><p><b>Conclusión:</b> ${tx(l.conclusion)}</p></div>` : ""}</div><div class="lado"><div class="avatar">${esc(String(l.persona || "?").trim()[0] || "?")}</div><div class="avatar-n">${esc(l.persona || "")}</div></div></div>`,
  grafico: (l) => `<h2 class="g">${tx(l.titulo)}</h2><div class="graf">${grafico(l.grafico || {})}</div>${l.lectura ? `<p class="lectura">${ico("lupa", 44)}<span>${tx(l.lectura)}</span></p>` : ""}`,
  error: (l) => `<div class="kicker rojo-t">Errores comunes</div><h2>${tx(l.titulo)}</h2><div class="errores">${(l.errores || []).map((e) => `<div class="err"><div class="card rojo"><span class="x">✕</span><p>${tx(e.mal)}</p></div><div class="flecha">›</div><div class="card verde"><span class="ok">✓</span><p>${tx(e.bien)}</p></div></div>`).join("")}</div>`,
  ric: (l) => `<div class="dos"><div class="col"><div class="kicker">${esc(l.titulo || "Así lo hacemos en RIC")}</div><h2>Del concepto a la <span class="oro">operativa</span></h2>${lista(l.puntos, "check")}</div><div class="lado">${medalla("escudo", 330)}</div></div>`,
  actividad: (l) => `<div class="dos"><div class="col"><div class="kicker">Actividad</div><h2>${tx(l.titulo)}</h2><div class="card oro-b"><p>${tx(l.consigna)}</p></div><div class="agenda chica">${(l.pasos || []).map((p, i) => `<div class="ag"><span class="num">${i + 1}</span><span>${tx(p)}</span></div>`).join("")}</div></div><div class="lado">${medalla("diana", 300)}</div></div>`,
  resumen: (l) => `<div class="kicker">Para llevarte</div><h2>Lo que tienes que <span class="oro">recordar</span></h2>${lista(l.puntos, "check")}`,
  cierre: (l, ctx) => `<div class="centro"><div class="logo-g">${logo}</div><h1 class="frase">${tx(l.frase)}</h1><div class="card oro-b prox">${l.siguiente ? `<small>Próxima lección</small><b>${tx(l.siguiente)}</b>` : `<small>Fin del módulo ${ctx.modulo}</small><b>${esc(ctx.moduloNombre)}</b>`}</div><p class="aviso">Contenido educativo. No constituye recomendación de inversión.</p></div>`,
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1920px;height:1080px;overflow:hidden}
body{font-family:'IBM Plex Sans','Segoe UI',sans-serif;color:#ecf1f9;background:#071426;position:relative}
.bg{position:absolute;inset:0;background:radial-gradient(1500px 800px at 90% -15%,rgba(199,163,94,.15),transparent 60%),radial-gradient(1100px 800px at -10% 115%,rgba(58,102,168,.30),transparent 60%),linear-gradient(180deg,#071426 0%,#0d2142 100%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(58,102,168,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(58,102,168,.12) 1px,transparent 1px);background-size:96px 96px;-webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,.85),rgba(0,0,0,.12))}
.wrap{position:absolute;inset:0;padding:46px 80px 40px;display:flex;flex-direction:column}
.top{display:flex;align-items:center;justify-content:space-between;flex:none}
.logo svg{height:64px;width:auto;display:block}
.pill{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:22px;letter-spacing:.14em;color:#e2c68c;border:1.5px solid rgba(199,163,94,.55);border-radius:999px;padding:9px 22px;background:rgba(199,163,94,.08)}
.main{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;overflow:hidden;padding:18px 0}
.fit{display:flex;flex-direction:column;gap:26px;transform-origin:left center}
.pie{flex:none;display:flex;justify-content:space-between;align-items:center;font-family:'IBM Plex Mono',monospace;font-size:21px;letter-spacing:.12em;color:#6f88ad;border-top:1px solid rgba(58,102,168,.35);padding-top:14px}
.pie b{color:#e2c68c;font-weight:600}
.kicker{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:26px;letter-spacing:.22em;color:#e2c68c;text-transform:uppercase}
.kicker.rojo-t{color:#ff8a8a}
h1,h2{font-family:'Archivo',sans-serif;letter-spacing:-.018em}
h1.grande{font-weight:900;font-size:92px;line-height:1.03}
h1.preg{font-weight:900;font-size:84px;line-height:1.06}
h1.termino{font-weight:900;font-size:108px;line-height:1}
h1.frase{font-weight:900;font-size:70px;line-height:1.1;max-width:1500px}
h2{font-weight:800;font-size:64px;line-height:1.08}
h2.g{font-size:54px}
.mega{font-family:'Archivo',sans-serif;font-weight:900;font-size:250px;line-height:.95;letter-spacing:-.03em}
.oro{background:linear-gradient(158deg,#e2c68c 0%,#c7a35e 46%,#a98748 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{font-size:42px;line-height:1.3;color:#a3b5d1;font-weight:500}
.leccion-n{font-family:'Archivo',sans-serif;font-weight:800;font-size:40px;color:#a3b5d1}
.modulo-n{font-family:'IBM Plex Mono',monospace;font-size:26px;letter-spacing:.1em;color:#6f88ad;margin-top:8px}
.dos{display:flex;gap:56px;align-items:center}.dos>.col{flex:1;display:flex;flex-direction:column;gap:26px;min-width:0}.lado{flex:none;width:460px;display:flex;flex-direction:column;align-items:center;gap:18px}
.medalla{border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 30% 25%,rgba(226,198,140,.22),rgba(199,163,94,.06) 60%);border:3px solid rgba(199,163,94,.6);box-shadow:0 0 0 18px rgba(199,163,94,.06),0 0 90px rgba(199,163,94,.18)}
.signo{font-family:'Archivo',sans-serif;font-weight:900;font-size:520px;line-height:.8;background:linear-gradient(158deg,#e2c68c,#8e7140);-webkit-background-clip:text;background-clip:text;color:transparent;opacity:.9}
.avatar{width:300px;height:300px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Archivo',sans-serif;font-weight:900;font-size:170px;color:#071426;background:linear-gradient(158deg,#e2c68c,#a98748);box-shadow:0 0 0 16px rgba(199,163,94,.1)}
.avatar-n{font-family:'Archivo',sans-serif;font-weight:800;font-size:50px}
ul.pts{list-style:none;display:flex;flex-direction:column;gap:22px}
ul.pts li{display:flex;gap:22px;align-items:flex-start;font-size:44px;line-height:1.26;font-weight:500}
ul.pts .bul{flex:none;width:18px;height:18px;border-radius:50%;background:linear-gradient(158deg,#e2c68c,#a98748);margin-top:19px}
ul.pts.chica li{font-size:37px;gap:18px}ul.pts.chica .bul{width:14px;height:14px;margin-top:17px}
ul.pts.check .bul{width:44px;height:44px;margin-top:6px;border-radius:12px;background:rgba(61,214,140,.14);border:2px solid #3dd68c;position:relative}
ul.pts.check .bul:after{content:"✓";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#3dd68c;font-size:30px;font-weight:800}
.card{background:rgba(20,49,95,.55);border:1.5px solid #274a80;border-radius:26px;padding:26px 32px;font-size:40px;line-height:1.3}
.card b{color:#fff}
.card.oro-b{border-color:rgba(199,163,94,.7);background:rgba(199,163,94,.09)}
.card.rojo{border-color:rgba(255,107,107,.6);background:rgba(255,107,107,.08)}
.card.verde{border-color:rgba(61,214,140,.55);background:rgba(61,214,140,.08)}
.card.con-ico{display:flex;gap:24px;align-items:center}.card.con-ico svg{flex:none}
.fila{display:flex;gap:26px;align-items:stretch}.fila>.card{flex:1}
.card.alto{padding:34px 38px;display:flex;flex-direction:column;gap:20px}
.tag{font-family:'Archivo',sans-serif;font-weight:800;font-size:48px}
.rojo .tag{color:#ff8a8a}.verde .tag{color:#5fe3a4}.oro-b .tag{color:#e2c68c}
.vs{align-self:center;font-family:'Archivo',sans-serif;font-weight:900;font-size:40px;color:#6f88ad}
.agenda{display:flex;flex-direction:column;gap:20px}
.ag{display:flex;gap:26px;align-items:center;font-size:46px;line-height:1.22;font-weight:500;background:rgba(20,49,95,.5);border:1.5px solid #274a80;border-radius:24px;padding:22px 30px}
.agenda.chica .ag{font-size:36px;padding:16px 26px}
.num{flex:none;width:68px;height:68px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Archivo',sans-serif;font-weight:900;font-size:36px;color:#071426;background:linear-gradient(158deg,#e2c68c,#a98748)}
.agenda.chica .num{width:52px;height:52px;font-size:28px}
.pasos{display:flex;align-items:stretch;gap:12px}
.paso{flex:1;background:rgba(20,49,95,.55);border:1.5px solid #274a80;border-radius:26px;padding:28px 26px;display:flex;flex-direction:column;gap:14px}
.paso b{font-family:'Archivo',sans-serif;font-weight:800;font-size:40px;line-height:1.1;color:#e2c68c}
.paso p{font-size:32px;line-height:1.28;color:#d5deee}
.pasos.n5 .paso b{font-size:33px}.pasos.n5 .paso p{font-size:27px}.pasos.n5 .paso{padding:22px 18px}
.flecha{align-self:center;font-family:'Archivo',sans-serif;font-weight:900;font-size:70px;color:#c7a35e;flex:none}
.centro{display:flex;flex-direction:column;align-items:center;text-align:center;gap:26px}
table.tb{width:100%;border-collapse:separate;border-spacing:0;font-size:35px;line-height:1.24;border:1.5px solid #274a80;border-radius:24px;overflow:hidden}
.tb th{font-family:'IBM Plex Mono',monospace;font-size:25px;letter-spacing:.12em;text-transform:uppercase;color:#e2c68c;text-align:left;padding:20px 26px;background:rgba(199,163,94,.10)}
.tb td{padding:19px 26px;border-top:1px solid #274a80;background:rgba(20,49,95,.45);vertical-align:top}
.tb td.pri{font-family:'Archivo',sans-serif;font-weight:800;color:#fff}
.graf{display:flex;justify-content:center}.graf svg{max-width:100%;height:auto}
.lectura{display:flex;gap:16px;align-items:center;font-size:34px;line-height:1.25;color:#d5deee;background:rgba(199,163,94,.08);border:1.5px solid rgba(199,163,94,.5);border-radius:20px;padding:14px 24px}
.lectura svg{flex:none}
.errores{display:flex;flex-direction:column;gap:20px}
.err{display:flex;gap:14px;align-items:stretch}.err .card{flex:1;display:flex;gap:20px;align-items:center;font-size:35px;padding:20px 26px}
.x,.ok{flex:none;width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:30px}
.x{background:rgba(255,107,107,.18);color:#ff8a8a;border:2px solid #ff6b6b}.ok{background:rgba(61,214,140,.16);color:#5fe3a4;border:2px solid #3dd68c}
.logo-g svg{height:120px;width:auto}
.prox{display:flex;flex-direction:column;gap:6px;padding:24px 46px}.prox small{font-family:'IBM Plex Mono',monospace;font-size:24px;letter-spacing:.2em;text-transform:uppercase;color:#e2c68c}.prox b{font-family:'Archivo',sans-serif;font-size:44px}
.aviso{font-size:24px;color:#6f88ad}
`;
const AJUSTE = `<script>(function(){var m=document.querySelector('.main'),f=document.querySelector('.fit');function run(){var max=m.clientHeight-36,z=1;f.style.transform='';f.style.width='100%';f.style.marginBottom='0';var g=f.querySelector('.graf');while(f.offsetHeight*z>max&&z>0.5){z-=0.02;if(g){break;}f.style.width=(100/z)+'%';}if(g){var sv=g.querySelector('svg');if(sv){var sobra=f.offsetHeight-max;if(sobra>0){var h=sv.getBoundingClientRect().height;var k=Math.max(0.45,(h-sobra)/h);sv.style.width=(sv.getBoundingClientRect().width*k)+'px';sv.style.height='auto';}}}else{if(z>=1&&f.offsetHeight<max*0.6){var z2=Math.min(1.3,max*0.78/f.offsetHeight);for(var q=0;q<4;q++){f.style.width=(100/z2)+'%';if(f.offsetHeight*z2>max*0.92){z2-=0.06;}}z=z2;f.style.width=(100/z)+'%';}}if(!g&&z!==1){f.style.transformOrigin='left top';f.style.transform='scale('+z+')';f.style.marginBottom=(-(f.offsetHeight*(1-z)))+'px';}document.title='listo';}if(document.fonts&&document.fonts.ready){document.fonts.ready.then(run);}else{window.onload=run;}setTimeout(run,2500);})();</script>`;

function html(l, ctx, n, total) {
  const cuerpo = (T[l.tipo] || T.concepto)(l, ctx);
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${css}</style></head><body><div class="bg"></div><div class="grid"></div><div class="wrap">
<div class="top"><div class="logo">${logo}</div><div class="pill">N${ctx.nivel} · M${ctx.modulo} · L${ctx.numero} &nbsp;—&nbsp; ${String(n).padStart(2, "0")}/${String(total).padStart(2, "0")}</div></div>
<div class="main"><div class="fit">${cuerpo}</div></div>
<div class="pie"><span><b>realinvestors.club</b></span><span>${esc(ctx.moduloNombre)}</span></div>
</div>${AJUSTE}</body></html>`;
}

const specs = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(DIR).filter((f) => /^spec-.*\.json$/.test(f));
const indice = [];
for (const f of specs) {
  const S = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  const dm = `M${S.modulo}-${slug(S.moduloNombre)}`;
  for (const lec of S.lecciones) {
    const dl = path.join(OUT, dm, `L${lec.numero}-${slug(lec.titulo)}`); fs.mkdirSync(dl, { recursive: true });
    const ctx = { nivel: S.nivel, nivelNombre: S.nivelNombre, modulo: S.modulo, moduloNombre: S.moduloNombre, numero: lec.numero };
    lec.laminas.forEach((l, i) => {
      if (!T[l.tipo]) console.warn(`tipo desconocido "${l.tipo}" en ${lec.id} lámina ${i + 1}`);
      if (l.icono && !P[l.icono]) console.warn(`icono desconocido "${l.icono}" en ${lec.id} lámina ${i + 1}`);
      const nn = String(i + 1).padStart(2, "0"); const archivo = path.join(dl, nn + ".html");
      fs.writeFileSync(archivo, html(l, ctx, i + 1, lec.laminas.length));
      indice.push({ modulo: S.modulo, moduloNombre: S.moduloNombre, dirModulo: dm, leccion: lec.numero, id: lec.id, tituloLeccion: lec.titulo, n: i + 1, tipo: l.tipo, html: archivo, png: archivo.replace(/\.html$/, ".png"), titulo: l.titulo || l.termino || l.texto || l.etiqueta || l.frase || (l.tipo === "resumen" ? "Resumen" : l.tipo), notas: l.notas || "" });
    });
  }
}
fs.writeFileSync(path.join(DIR, "laminas.json"), JSON.stringify(indice, null, 1));
console.log("láminas:", indice.length, "en", new Set(indice.map((x) => x.id)).size, "lecciones");
