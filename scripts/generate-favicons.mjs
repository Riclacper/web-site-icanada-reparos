import sharp from "sharp";
import pngToIco from "png-to-ico";
import fs from "node:fs/promises";

const input = "assets/img/favicon.svg";

const sizes = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
];

for (const [file, size] of sizes) {
  await sharp(input)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(file);
}

const ico = await pngToIco(["favicon-16x16.png", "favicon-32x32.png"]);
await fs.writeFile("favicon.ico", ico);

console.log("Favicons gerados com sucesso.");
