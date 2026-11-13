"""Historia de RESULTADO (2 láminas de 1080x1920) para los datos chicos del calendario del oro (PPI, Warsh, OPEP+),
según el cambio del 07/11/2026 (`analisis/2026-11-07-carruseles-sin-alcance.md`): en vez de carrusel, 1–2 historias
con encuesta. Reusa la medición y el gráfico de `resultado.py`.

Uso:
  SSL_CERT_FILE=/root/.ccr/ca-bundle.crt NODE_PATH=$(npm root -g) \
    python produccion/oro-resultados/historia.py produccion/oro-resultados/<id>.json <dir_salida>
Zona segura de historias: nada importante arriba de 250 px ni debajo de 1580 px. La encuesta se agrega en Instagram
sobre el recuadro punteado de la lámina 2.
"""
import json, subprocess, sys
from pathlib import Path
from resultado import reaccion, svg, num, RAIZ, AQUI


def html(c, r):
    head = (RAIZ / "produccion/carrusel-oro-noviembre/carrusel.html").read_text(encoding="utf-8").split("<body>")[0]
    sube = r["pct_ext"] >= 0
    css = """<style>
.h{width:1080px;height:1920px;position:relative;overflow:hidden;margin:0 0 40px;padding:250px 90px 0;
  background:linear-gradient(rgba(39,74,128,.13) 1px,transparent 1px) 0 0/54px 54px,
  linear-gradient(90deg,rgba(39,74,128,.13) 1px,transparent 1px) 0 0/54px 54px,
  radial-gradient(ellipse at 80% 0%,#12305c 0%,transparent 55%),linear-gradient(160deg,var(--noche2),var(--noche1) 70%)}
.h .top{position:absolute;top:120px;left:90px;right:90px;display:flex;justify-content:space-between;align-items:center}
.h .top img{height:58px} .h .top span{font-family:'IBM Plex Mono';font-size:24px;color:var(--oro1);letter-spacing:.1em}
.h h1{font-size:84px;margin-top:20px}
.h .dos{display:flex;gap:20px;margin-top:44px}
.h .dos div{flex:1;border:2px solid var(--borde);border-radius:22px;padding:24px 28px;background:rgba(7,20,38,.65)}
.h .dos small{display:block;font-family:'IBM Plex Mono';font-size:24px;color:var(--txt2)}
.h .dos b{font-family:'Archivo';font-weight:900;font-size:76px}
.h .caja{margin-top:40px;border:2px solid var(--borde);border-radius:22px;background:rgba(7,20,38,.65);padding:24px 26px}
.h .caja .tt{display:flex;justify-content:space-between;font-family:'IBM Plex Mono';font-size:22px;color:var(--txt2);margin-bottom:10px}
.h .ver{margin-top:36px;font-size:38px;line-height:1.3} .h .ver b{color:var(--oro1)}
.h .p{display:flex;gap:20px;align-items:flex-start;margin-top:22px;border:2px solid var(--borde);border-radius:20px;padding:22px 26px;background:rgba(7,20,38,.65);font-size:34px;line-height:1.35}
.h .p .n{flex:none;width:54px;height:54px;border-radius:50%;background:var(--oro1);color:var(--noche1);font-family:'Archivo';font-weight:900;font-size:28px;display:flex;align-items:center;justify-content:center}
.h .p b,.h .lec b,.h .prox b{color:var(--oro1)}
.h .lec{margin-top:30px;font-size:34px;line-height:1.4;color:var(--txt2)}
.h .enc{margin-top:36px;height:300px;border:3px dashed rgba(226,198,140,.55);border-radius:26px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--oro1);font-family:'IBM Plex Mono';font-size:26px;text-align:center}
.h .enc big{font-family:'Archivo';font-weight:900;font-size:46px;color:var(--txt)}
.h .prox{position:absolute;left:90px;right:90px;top:1330px;border:2px solid var(--oro2);border-radius:22px;padding:24px 28px;background:rgba(40,30,4,.35);font-size:31px;line-height:1.35}
.h .prox small{display:block;font-family:'IBM Plex Mono';font-size:23px;color:var(--oro1);margin-bottom:8px}
.h .pie2{margin-top:30px;font-family:'IBM Plex Mono';font-size:19px;color:var(--txt2);line-height:1.4}
</style>"""
    top = f'<div class="top"><img src="../../marca/logo-oro.png" alt=""><span>{c["dia"]} · {r["hora_ar"]} ARG</span></div>'
    col = "var(--verde)" if sube else "var(--rojo)"
    l1 = f'''<section class="h" id="l1">{top}
  <span class="etiqueta">RESULTADO · {c["nombre"].upper()}</span>
  <h1>{c["gancho"]}</h1>
  <div class="dos"><div><small>SE ESPERABA</small><b>{c["esperado"]}</b></div><div><small>SALIÓ</small><b class="oro">{c["salio"]}</b></div></div>
  <div class="caja"><div class="tt"><span>ORO · VELAS DE 5 MIN · HORA ARG</span><span style="color:{col}">{"+" if sube else ""}{num(r["pct_ext"], 1)} % EN 5 MIN</span></div>{svg(r)}</div>
  <div class="ver">{c.get("despues") or f'Salió <b>{c["comparacion"]}</b> de lo esperado y el oro llegó a <b>{num(r["ext"], 1)}</b>.'}</div>
  <div class="pie2">En el año: {c["anual"]}. Fuentes: {c["fuentes"]}, Yahoo Finance (GC=F).<br>Contenido educativo. No es recomendación de inversión.</div>
</section>'''
    ps = "".join(f'<div class="p"><span class="n">{i + 1}</span><div>{t}</div></div>' for i, t in enumerate(c["porque"]))
    pr = c["proxima"]
    l2 = f'''<section class="h" id="l2">{top}
  <span class="etiqueta">¿POR QUÉ NO SIGUIÓ SUBIENDO?</span>
  {ps}
  <div class="lec">{c["aprendizaje"]}</div>
  <div class="enc"><big>{c["encuesta"]}</big>{" · ".join(c["opciones"])}<br>(poné acá la encuesta)</div>
  <div class="prox"><small>PRÓXIMA · {pr["fecha"]} · {pr["nombre"].upper()}</small>{pr["regla"]}</div>
  <div class="pie2" style="position:absolute;top:1530px;left:90px;right:90px">Lean Alvarez · Real Investors Club · @leanalvarez.ok<br>Contenido educativo. No es recomendación de inversión.</div>
</section>'''
    return head + css + "</head><body>" + l1 + l2 + "</body></html>"


def main():
    c = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    salida = Path(sys.argv[2]).resolve(); salida.mkdir(parents=True, exist_ok=True)
    r = reaccion(c)
    tmp = AQUI / "_historia.html"; tmp.write_text(html(c, r), encoding="utf-8")
    js = """const { chromium } = require('playwright');
(async () => { const [url, dir, id] = process.argv.slice(1); const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1080, height: 1960 } }); await pg.goto(url, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(500);
  for (let i = 1; i <= 2; i++) { const f = `${dir}/${id}-historia-${i}.png`; await pg.locator(`#l${i}`).screenshot({ path: f }); console.log(f); }
  await b.close(); })();"""
    try:
        subprocess.run(["node", "-e", js, tmp.as_uri(), str(salida), c["id"]], check=True)
    finally:
        tmp.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
