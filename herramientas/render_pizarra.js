/* Renderiza una escena de pizarra larga en paralelo, cuadro a cuadro (JPEG), con Chrome headless.
     node herramientas/render_pizarra.js <html> <segundos> <dir salida> [procesos=4] [fps=30] [desde_s] [hasta_s]
   Reparte los cuadros en tramos contiguos, uno por página. Antes de su tramo, cada página calcula en silencio los
   cuadros de los 1,5 s anteriores, para que la mano y los elementos arranquen en el estado correcto.
   La página tiene que exponer window.cuadro(t) con t entre 0 y 1 y poner document.title = "listo" al cargar.
   desde_s y hasta_s sirven para renderizar solo un pedazo (pruebas). */
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");

(async () => {
  const [html, seg, out, procesos = "4", fpsTxt = "30", desde = "0", hasta] = process.argv.slice(2);
  const fps = Number(fpsTxt), n = Math.round(Number(seg) * fps);
  const i0 = Math.round(Number(desde) * fps), i1 = hasta ? Math.min(n, Math.round(Number(hasta) * fps)) : n;
  fs.mkdirSync(out, { recursive: true });
  const logo = fs.readFileSync(path.join(__dirname, "..", "marca", "logo.svg"), "utf8").replace(/<\?xml[^>]*>/, "");
  const browser = await chromium.launch();
  const P = Number(procesos), porTramo = Math.ceil((i1 - i0) / P);
  const inicio = Date.now();
  let hechos = 0;
  await Promise.all([...Array(P).keys()].map(async (k) => {
    const a = i0 + k * porTramo, b = Math.min(i1, a + porTramo);
    if (a >= b) return;
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto("file://" + path.resolve(html) + "?dur=" + seg);
    await page.waitForFunction(() => document.title === "listo", null, { timeout: 60000 });
    await page.evaluate((svg) => { const l = document.getElementById("logo"); if (l) l.innerHTML = svg; }, logo);
    await page.waitForTimeout(300);
    for (let i = Math.max(0, a - Math.round(1.5 * fps)); i < a; i++) await page.evaluate((t) => window.cuadro(t), i / (n - 1));
    for (let i = a; i < b; i++) {
      await page.evaluate((t) => window.cuadro(t), i / (n - 1));
      await page.screenshot({ path: path.join(out, String(i).padStart(5, "0") + ".jpg"), type: "jpeg", quality: 92 });
      if (++hechos % 300 === 0) console.log(`${hechos}/${i1 - i0} cuadros, ${((Date.now() - inicio) / 1000 / 60).toFixed(1)} min`);
    }
    await page.close();
  }));
  await browser.close();
  console.log(i1 - i0, "cuadros en", out, `(${((Date.now() - inicio) / 1000 / 60).toFixed(1)} min)`);
})().catch((e) => { console.error(e); process.exit(1); });
