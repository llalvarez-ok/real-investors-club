/* Renderiza un tramo de cuadros de una página animada (1080x1920) con Chrome headless.
     node herramientas/render_reel.js <html> <fps> <desde> <hasta> <dir salida>
   La página expone window.cuadro(segundo) y pone document.title = "listo" al cargar. #logo se completa con marca/logo.svg. */
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");

(async () => {
  const [html, fps, desde, hasta, out] = process.argv.slice(2);
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto("file://" + path.resolve(html));
  await page.waitForFunction(() => document.title === "listo", null, { timeout: 20000 });
  const logo = fs.readFileSync(path.join(__dirname, "..", "marca", "logo.svg"), "utf8").replace(/<\?xml[^>]*>/, "");
  await page.evaluate((svg) => document.querySelectorAll(".logo").forEach((l) => (l.innerHTML = svg)), logo);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  for (let i = Number(desde); i < Number(hasta); i++) {
    await page.evaluate((s) => window.cuadro(s), i / Number(fps));
    await page.screenshot({ path: path.join(out, String(i).padStart(5, "0") + ".png") });
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
