// node herramientas/cine/render.js <escena.html?v=ig> <dir salida> <segundos> [procesos] [desde] [hasta]
// Cuadros JPEG a 30 fps con window.cuadro(t), repartidos en varias páginas; guarda eventos.json para la mezcla.
// Con "foto" en lugar de los segundos saca solo los cuadros pedidos: render.js <url> <prefijo> foto 3 12,5 30
const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const [url, out, dur, np = '4', desde = '0', hasta] = process.argv.slice(2);
  const b = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });
  const abre = async () => { const p = await b.newPage({ viewport: { width: 1080, height: 1920 } }); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(url.startsWith('/') ? 'file://' + url : url); await p.evaluate(() => window.listo); p.errs = errs; return p; };
  if (dur === 'foto') {
    const p = await abre();
    for (const t of process.argv.slice(5)) { await p.evaluate(t => window.cuadro(t), +t.replace(',', '.')); await p.screenshot({ path: `${out}_${t}.jpg`, type: 'jpeg', quality: 85 }); }
    if (p.errs.length) console.log(p.errs.join('\n')); await b.close(); return;
  }
  fs.mkdirSync(out, { recursive: true });
  const n0 = Math.round(+desde * 30), n1 = Math.round(+(hasta || dur) * 30), P = +np;
  await Promise.all([...Array(P).keys()].map(async k => {
    const p = await abre();
    if (k === 0) fs.writeFileSync(out + '/eventos.json', JSON.stringify(await p.evaluate(() => window.EVENTOS)));
    for (let i = n0 + k; i < n1; i += P) {
      await p.evaluate(t => window.cuadro(t), i / 30);
      const png = process.env.FORMATO === 'png', q = +(process.env.CALIDAD || 93);  // PNG sin pérdida (~4 MB por cuadro) o JPEG (CALIDAD=100 para el render final)
      await p.screenshot(png ? { path: `${out}/${String(i).padStart(5, '0')}.png`, type: 'png' } : { path: `${out}/${String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: q });
    }
    if (p.errs.length) console.log(p.errs.slice(0, 5).join('\n'));
  }));
  await b.close();
})();
