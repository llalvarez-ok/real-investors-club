/* Renderiza una animación HTML cuadro a cuadro a PNG (30 fps) con Chrome headless.
     node herramientas/animar.js <html> <segundos> <dir salida> [query string]
   La página tiene que exponer window.cuadro(t) con t entre 0 y 1 y poner document.title = "listo" al cargar. */
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");

(async () => {
  const [html, seg, out, qs = ""] = process.argv.slice(2);
  const fps = 30, n = Math.round(Number(seg) * fps);
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto("file://" + path.resolve(html) + (qs ? "?" + qs : ""));
  await page.waitForFunction(() => document.title === "listo", null, { timeout: 15000 });
  const logo = path.join(__dirname, "..", "marca", "logo.svg");
  await page.evaluate((svg) => { const l = document.getElementById("logo"); if (l) l.innerHTML = svg; }, fs.readFileSync(logo, "utf8").replace(/<\?xml[^>]*>/, ""));
  await page.waitForTimeout(400);
  for (let i = 0; i < n; i++) {
    await page.evaluate((t) => window.cuadro(t), n > 1 ? i / (n - 1) : 1);
    await page.screenshot({ path: path.join(out, String(i).padStart(5, "0") + ".png") });
  }
  await browser.close();
  console.log(n, "cuadros en", out);
})().catch((e) => { console.error(e); process.exit(1); });
