import sharp from "sharp";
import pngToIco from "png-to-ico";
import fs from "node:fs/promises";
import path from "node:path";

const input = "assets/img/favicon.svg";
const outputDir = "public/favicons";

await fs.mkdir(outputDir, { recursive: true });

const sizes = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
];

await fs.copyFile(input, path.join(outputDir, "favicon.svg"));

for (const [file, size] of sizes) {
  await sharp(input)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join(outputDir, file));
}

const ico = await pngToIco([
  path.join(outputDir, "favicon-16x16.png"),
  path.join(outputDir, "favicon-32x32.png"),
]);

await fs.writeFile(path.join(outputDir, "favicon.ico"), ico);

console.log("Favicons gerados em public/favicons com sucesso.");
