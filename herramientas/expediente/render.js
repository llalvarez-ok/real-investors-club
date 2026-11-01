// node render.js <escena.html?v=ig> <dir salida> <segundos> [procesos] [desde] [hasta]
// Saca los cuadros JPEG a 30 fps llamando a window.cuadro(t), repartidos en varias páginas, y guarda eventos.json.
const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const [url, out, dur, np = '4', desde = '0', hasta] = process.argv.slice(2);
  fs.mkdirSync(out, { recursive: true });
  const n0 = Math.round(+desde * 30), n1 = Math.round(+(hasta || dur) * 30), P = +np;
  const b = await chromium.launch();
  await Promise.all([...Array(P).keys()].map(async k => {
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
    await p.goto(url.startsWith('/') ? 'file://' + url : url); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200);
    if (k === 0) fs.writeFileSync(out + '/eventos.json', JSON.stringify(await p.evaluate(() => window.EVENTOS)));
    for (let i = n0 + k; i < n1; i += P) {
      await p.evaluate(t => window.cuadro(t), i / 30);
      await p.screenshot({ path: `${out}/${String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
    }
  }));
  await b.close();
})();
