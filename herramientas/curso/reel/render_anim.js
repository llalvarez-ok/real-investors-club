// node render_anim.js <html> <dir salida> <segundos>  → cuadros PNG a 30 fps y eventos.json (tiempo y sonido de cada entrada)
const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const [html, out, dur] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const ev = await p.evaluate(() => {
    const evs = [];
    document.querySelectorAll('[data-t]').forEach(el => {
      const t = parseFloat(el.dataset.t);
      el.getAnimations().forEach(a => { a.__t = t; });
      el.style.opacity = '';
      if (el.dataset.s) evs.push({ t, s: el.dataset.s });
      // el brillo del pseudo-elemento arranca medio segundo después
    });
    document.getAnimations({ subtree: true }).forEach(a => a.pause());
    return evs;
  });
  const n = Math.round(parseFloat(dur) * 30);
  for (let i = 0; i < n; i++) {
    const t = i / 30;
    await p.evaluate(t => {
      document.getAnimations().forEach(a => {
        const el = a.effect && a.effect.target; let t0 = 0;
        const host = el && (el.dataset ? el : null);
        const pseudo = a.effect && a.effect.pseudoElement;
        const d = (el && el.dataset && el.dataset.t) ? parseFloat(el.dataset.t) : 0;
        t0 = d + (pseudo ? 0.45 : 0);
        a.currentTime = Math.max(0, t - t0) * 1000 - (t < t0 ? 1 : 0);
        if (t < t0 && el && el.dataset && el.dataset.t) a.currentTime = 0;
      });
      document.querySelectorAll('[data-t]').forEach(el => { el.style.visibility = t < parseFloat(el.dataset.t) ? 'hidden' : 'visible'; });
    }, t);
    await p.screenshot({ path: `${out}/${String(i).padStart(4, '0')}.png` });
  }
  fs.writeFileSync(out + '/eventos.json', JSON.stringify(ev));
  await b.close();
})();
