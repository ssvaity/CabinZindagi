// Generates an open-licensed dotted world map (MIT — dotted-map) into /public.
// Run with: node scripts/gen-map.mjs
import DottedMap from "dotted-map";
import { writeFileSync } from "node:fs";

const map = new DottedMap({ height: 60, grid: "diagonal" });

const svg = map.getSVG({
  radius: 0.22,
  color: "#94a3b8", // slate-400 — reads on light and dark
  shape: "circle",
  backgroundColor: "transparent",
});

writeFileSync("public/world.svg", svg);

// India centre (~lat 22, lng 79) for the "We are here" marker.
const pin = map.getPin({ lat: 22, lng: 79 });
const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
const [, , w, h] = (vb || "0 0 0 0").split(/\s+/).map(Number);
console.log("viewBox:", vb);
console.log("India pin:", pin);
console.log(
  "India %:",
  `left ${((pin.x / w) * 100).toFixed(1)}%  top ${((pin.y / h) * 100).toFixed(1)}%`
);
