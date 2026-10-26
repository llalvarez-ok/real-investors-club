# Esquema de láminas de clase · Real Investors Club

Cada módulo es un archivo JSON: `spec-1-<clave>.json` con esta forma:

```json
{
  "nivel": 1, "nivelNombre": "FUNDAMENTOS",
  "modulo": 1, "moduloNombre": "Economía global para traders",
  "lecciones": [
    { "id": "1-0-0", "numero": 1, "titulo": "Título de la lección tal como está en el programa",
      "laminas": [ { "tipo": "...", ... }, ... ] }
  ]
}
```

## Criterio editorial (obligatorio)

- Idioma: español neutro con "tú" (NUNCA voseo: nada de "tenés", "podés", "mirá"). Números con coma decimal.
- Entre 9 y 12 láminas por lección. Una idea por lámina. Texto corto: se lee en 5 segundos; el resto lo dice el presentador.
- Nunca más de 4 viñetas por lámina y cada viñeta de no más de 14 palabras.
- La clase debe ser MÁS rica que la lectura: suma analogías cotidianas y ejemplos con personas con nombre (Marta, Julián, Camila, Diego…) y números concretos. No copies párrafos de la lectura.
- Secuencia sugerida: portada → gancho/pregunta → qué vas a aprender → conceptos (con analogía, comparación, pasos, gráfico, tabla) → ejemplo con persona → error común → "Así lo hacemos en RIC" (cómo se aplica al operar, gestión del riesgo) → actividad para hacer en clase → resumen → cierre.
- Contenido educativo: nunca recomendaciones de compra/venta ni promesas de ganancia. No mencionar brokers por nombre salvo que la lectura lo haga.
- No mencionar exámenes de certificación, "temario" ni "idoneidad".
- Datos y cifras: usa solo los que están en la lectura o son de conocimiento general estable (p. ej. "la FED tiene 8 reuniones por año"). Si das un número ilustrativo, que se note que es un ejemplo ("Supón que…").
- Cada lámina lleva `notas`: 2 a 4 frases con lo que el presentador dice en voz alta (frases cortas, tono cercano, como hablando con un alumno). No repitas el texto de la lámina: amplíalo.

## Tipos de lámina

Campos comunes opcionales: `notas` (string, obligatorio en la práctica), `icono` (nombre de la lista de abajo).
En cualquier texto puedes marcar 1 a 3 palabras clave con **doble asterisco** para resaltarlas en dorado.

| tipo | campos | uso |
|---|---|---|
| `portada` | `titulo`, `subtitulo`, `icono` | primera lámina de la lección (el título puede ser más corto y con gancho que el oficial) |
| `pregunta` | `texto`, `detalle` (opcional), `icono` | gancho inicial o pregunta para la clase |
| `agenda` | `titulo` (p. ej. "Hoy vas a aprender"), `puntos` [3–4 strings] | qué se aprende |
| `concepto` | `titulo`, `puntos` [2–4 strings], `icono` | idea con viñetas |
| `definicion` | `termino`, `definicion` (1–2 frases), `analogia` (1 frase "Es como…"), `icono` | definir un término |
| `comparacion` | `titulo`, `izquierda` {`titulo`, `puntos` [2–4], `tono`}, `derecha` {igual} | dos columnas. `tono`: "verde", "rojo", "oro" o "azul" |
| `pasos` | `titulo`, `pasos` [3–5 objetos {`titulo`, `texto`}] | proceso o cadena causa → efecto |
| `dato` | `numero` (texto corto, p. ej. "2 %" o "8 veces"), `etiqueta`, `detalle` | una cifra grande |
| `tabla` | `titulo`, `columnas` [2–4 strings], `filas` [[...], ...] (máx. 5 filas, celdas cortas) | comparar varios casos |
| `ejemplo` | `titulo`, `persona` (nombre), `situacion` (1–2 frases), `desarrollo` [2–3 strings], `conclusion` | caso humano con números |
| `grafico` | `titulo`, `grafico` {…ver abajo…}, `lectura` (1 frase: qué hay que mirar) | gráfico dibujado |
| `error` | `titulo`, `errores` [2–3 objetos {`mal`, `bien`}] | errores comunes y su corrección |
| `ric` | `titulo` (opcional; por defecto "Así lo hacemos en RIC"), `puntos` [2–4 strings] | aplicación práctica / reglas de riesgo |
| `actividad` | `titulo`, `consigna`, `pasos` [2–4 strings] | ejercicio para hacer en clase o en demo |
| `resumen` | `puntos` [3–5 strings] | ideas para llevarse |
| `cierre` | `frase` (1 frase), `siguiente` (título de la próxima lección, o null si es la última del módulo) | última lámina |

## Gráficos (`grafico`)

- Barras: `{ "tipo": "barras", "etiquetas": ["2021","2022"], "valores": [4.7, 8.0], "unidad": "%", "destacar": 1 }` (máx. 7 barras; `destacar` = índice opcional)
- Línea: `{ "tipo": "linea", "etiquetas": ["Ene","Feb",...], "valores": [..], "unidad": "%", "marcas": [{ "i": 3, "texto": "Sube la tasa" }] }` (5–14 puntos, máx. 3 marcas)
- Dos líneas: `{ "tipo": "lineas", "etiquetas": [...], "series": [{ "nombre": "Tasa", "valores": [...] }, { "nombre": "Inflación", "valores": [...] }] }`
- Velas: `{ "tipo": "velas", "velas": [[o,h,l,c], ...], "niveles": [{ "precio": 105, "texto": "Resistencia", "tono": "rojo" }], "marcas": [{ "i": 7, "texto": "Martillo", "lado": "abajo" }], "zonas": [{ "desde": 99, "hasta": 101, "texto": "Zona de soporte", "tono": "verde" }] }` (10–40 velas inventadas pero realistas; `niveles`, `marcas`, `zonas` opcionales, máx. 3 de cada uno)
- Vela anatómica: `{ "tipo": "vela", "velas": [{ "o": 100, "h": 112, "l": 96, "c": 108, "nombre": "Vela alcista", "partes": true }] }` (1–3 velas grandes; `partes: true` rotula apertura, cierre, máximo, mínimo, cuerpo y mechas)
- Ciclo: `{ "tipo": "ciclo", "fases": [{ "nombre": "Expansión", "texto": "Crece el empleo" }, ...] }` (3–5 fases, dibujadas sobre una onda)
- Torta: `{ "tipo": "torta", "partes": [{ "nombre": "Gastos fijos", "valor": 50 }, ...] }` (2–5 partes)
- Balanza: `{ "tipo": "balanza", "izquierda": "Riesgo", "derecha": "Beneficio", "inclinacion": "derecha" }` ("izquierda", "derecha" o "equilibrio")

Los valores de los gráficos ilustrativos deben ser coherentes con lo que se explica (una tendencia alcista debe subir, un soporte debe ser tocado varias veces, etc.).

## Iconos disponibles (`icono`)

`banco`, `moneda`, `billete`, `grafico-sube`, `grafico-baja`, `velas`, `globo`, `reloj`, `calendario`, `escudo`, `balanza`, `lupa`, `cerebro`, `cohete`, `alerta`, `bombilla`, `diana`, `llave`, `candado`, `libro`, `persona`, `personas`, `casa`, `carrito`, `fabrica`, `bitcoin`, `ethereum`, `dolar`, `porcentaje`, `flechas`, `documento`, `calculadora`, `alcancia`, `semaforo`, `brujula`, `montana`, `engranaje`, `megafono`, `termometro`, `paraguas`

## Validación

El archivo debe ser JSON válido (comillas dobles, sin comas finales, sin comentarios). Verifícalo con `node -e "JSON.parse(require('fs').readFileSync('<ruta>','utf8'))"` antes de terminar.
