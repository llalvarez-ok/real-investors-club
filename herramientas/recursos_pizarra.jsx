/* Genera los recursos de las escenas de pizarra (herramientas/animaciones/recursos/):
   personajes de Open Peeps (CC0, https://www.openpeeps.com) en SVG, cada uno con cara feliz y cara preocupada,
   y objetos de Fluent Emoji de Microsoft (MIT, https://github.com/microsoft/fluentui-emoji).
   Se corre una vez, con las dependencias en una carpeta aparte (<libs>):
     npm i @opeepsfun/open-peeps @iconify-json/fluent-emoji react@18.3.1 react-dom@18.3.1 esbuild@0.24.0
     Open Peeps carga cada parte con require dinámico: hay que pasarlo a CommonJS archivo por archivo.
     npx esbuild $(find node_modules/@opeepsfun/open-peeps/build -name '*.js') --format=cjs --platform=node \
       --outdir=peeps-cjs --outbase=node_modules/@opeepsfun/open-peeps/build
     NODE_PATH=<libs>/node_modules npx esbuild herramientas/recursos_pizarra.jsx --bundle --platform=node \
       --external:./peeps-cjs/* --outfile=<libs>/r.cjs && node <libs>/r.cjs herramientas/animaciones/recursos */
import fs from "fs";
import path from "path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
const { Effigy } = require("./peeps-cjs/Effigy.js");
import fluent from "@iconify-json/fluent-emoji/icons.json";

const SALIDA = path.join(process.argv[2] || "herramientas/animaciones/recursos");
const TINTA = "#14213d";
// nombre: [cuerpo, pelo, colores, accesorio]
const PERSONAJES = {
  ana: ["Jacket", "MediumStraight", { skinColor: "#F2C9A0", jacketColor: "#C7A35E", topColor: "#C7A35E" }],
  bruno: ["ButtonShirt", "ShortTwo", { skinColor: "#D9A47A", shirtColor: "#5B8FD8", topColor: "#5B8FD8" }],
  carla: ["Tee", "Bun", { skinColor: "#E8B48F", topColor: "#E27FA6" }],
  diego: ["Hoodie", "ShortFour", { skinColor: "#B97D55", hoodieColor: "#4FB286", topColor: "#4FB286" }],
  marta: ["Tee", "LongHair", { skinColor: "#F0C29B", topColor: "#F09A5B" }],
  julian: ["ButtonShirt", "ShortOne", { skinColor: "#E3AC85", topColor: "#8E7DD8" }, "Glasses"],
  camila: ["Tee", "LongCurly", { skinColor: "#C98B62", topColor: "#4CC3C9" }],
};
const CARAS = { feliz: "Smile", preocupada: "Concerned" };

fs.mkdirSync(SALIDA, { recursive: true });
for (const [nombre, [cuerpo, pelo, col, acc]] of Object.entries(PERSONAJES)) {
  for (const [estado, cara] of Object.entries(CARAS)) {
    const o = { ...col, outlineColor: TINTA, hairColor: TINTA };
    const svg = renderToStaticMarkup(React.createElement(Effigy, {
      body: { type: cuerpo, options: o }, head: { type: pelo, options: o }, face: { type: cara, options: o },
      accessory: acc ? { type: acc, options: o } : undefined,
    }));
    fs.writeFileSync(path.join(SALIDA, `peep-${nombre}-${estado}.svg`), svg);
  }
}
const OBJETOS = ["money-bag", "coin", "dollar-banknote", "money-with-wings", "chart-increasing", "chart-decreasing", "cross-mark",
  "check-mark-button", "warning", "chicken", "egg", "nest-with-eggs", "mobile-phone", "robot", "hourglass-not-done", "bank",
  "magnifying-glass-tilted-left", "house", "writing-hand-light", "stop-sign", "alarm-clock",
  // P09
  "balance-scale", "brain", "fire", "meat-on-bone", "mammoth", "bell", "memo", "seedling", "scissors", "package", "shopping-cart",
  "sleeping-face", "bed", "glowing-star", "ladder", "hourglass-done", "thinking-face", "anxious-face-with-sweat", "relieved-face",
  "light-bulb", "spiral-calendar", "collision"];
for (const n of OBJETOS) {
  const i = fluent.icons[n];
  const w = i.width || fluent.width, h = i.height || fluent.height;
  fs.writeFileSync(path.join(SALIDA, `obj-${n}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${i.body}</svg>`);
}
// El logo oficial, tal cual (nunca redibujarlo), para que la mano lo trace en las escenas
fs.copyFileSync(path.join(path.dirname(SALIDA), "..", "..", "marca", "logo.svg"), path.join(SALIDA, "marca-logo.svg"));
// Todo junto en recursos.js (window.RECURSOS), para que las escenas lo carguen con <script> desde file://
const todos = {};
for (const f of fs.readdirSync(SALIDA).filter((f) => f.endsWith(".svg")).sort()) todos[f.slice(0, -4)] = fs.readFileSync(path.join(SALIDA, f), "utf8");
fs.writeFileSync(path.join(SALIDA, "recursos.js"), "window.RECURSOS = " + JSON.stringify(todos) + ";\n");
console.log("recursos en", SALIDA);
