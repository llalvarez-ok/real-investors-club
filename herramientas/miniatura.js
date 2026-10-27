/* Renderiza la miniatura (1280x720) de una lección desde su HTML.
     node herramientas/miniatura.js produccion/<id>/miniatura.html <salida.png> [ancho alto]
   También sirve para las plantillas de los Shorts (1080x1920).
   El HTML puede tener un elemento #logo: se completa con marca/logo.svg. */
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");

(async () => {
  const [html, out, ancho = 1280, alto = 720] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: Number(ancho), height: Number(alto) } });
  await page.goto("file://" + path.resolve(html));
  const logo = fs.readFileSync(path.join(__dirname, "..", "marca", "logo.svg"), "utf8").replace(/<\?xml[^>]*>/, "");
  await page.evaluate((svg) => { const l = document.getElementById("logo"); if (l) l.innerHTML = svg; }, logo);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: out });
  await browser.close();
  console.log("miniatura", out);
})().catch((e) => { console.error(e); process.exit(1); });
