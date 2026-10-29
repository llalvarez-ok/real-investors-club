const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const [f, o, w, h] = process.argv.slice(2);
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  await p.goto('file://' + f); await p.waitForTimeout(1500); await p.screenshot({ path: o }); await b.close(); })();
