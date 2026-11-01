const { chromium } = require('playwright');
(async () => { const [url, out, ...ts] = process.argv.slice(2); const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + url); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200);
  for (const t of ts) { await p.evaluate(t => window.cuadro(t), +t); await p.screenshot({ path: `${out}_${t}.jpg`, type: 'jpeg', quality: 80 }); }
  if (errs.length) console.log(errs.join('\n')); await b.close(); })();
