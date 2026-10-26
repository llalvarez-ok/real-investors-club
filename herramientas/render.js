/* Captura a PNG las láminas HTML que generó diseno/generar.js (Chrome headless vía Playwright).
     node herramientas/render.js <dir con laminas.json>
   Espera a que cada lámina termine de ajustar el texto (document.title === "listo"). */
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");

(async () => {
  const dir = path.resolve(process.argv[2]);
  const indice = JSON.parse(fs.readFileSync(path.join(dir, "laminas.json"), "utf8"));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const l of indice) {
    if (l.tipo === "animacion") continue;
    await page.goto("file://" + path.resolve(l.html));
    await page.waitForFunction(() => document.title === "listo", null, { timeout: 15000 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: l.png });
    if (l.tipo === "grafico") {
      // zona a la que hace zoom el montaje: la barra destacada (o el gráfico entero)
      l.foco = await page.evaluate(() => {
        const e = document.querySelector('.graf rect[fill="url(#oro)"]') || document.querySelector(".graf svg");
        const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height };
      });
    }
    console.log("ok", path.relative(dir, l.png));
  }
  await browser.close();
  fs.writeFileSync(path.join(dir, "laminas.json"), JSON.stringify(indice, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
