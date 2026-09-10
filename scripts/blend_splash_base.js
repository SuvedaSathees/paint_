import sharp from "sharp";
import fs from "fs";

async function blendSplashBase() {
  const inputPath = "public/akshara-paint-splash.png";
  const backupPath = "public/akshara-paint-splash-raw-backup.png";

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
    console.log("Created backup of raw splash.");
  }

  const image = sharp(backupPath);
  const metadata = await image.metadata();
  const { width, height, channels } = metadata;

  const { data } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Processing splash: ${width}x${height}`);

  // Base of splash is at x roughly 180 to 680, y from 940 to 1024
  // We want a smooth, curved, natural meniscus fade at the bottom:
  // Instead of a flat horizontal cut at y=1023, the bottom curves naturally like liquid rising from an oval pool:
  // Center of pool base at x = 435, y = 1010
  const baseCenterX = 435;
  const baseCenterY = 960;
  const baseRx = 280;
  const fadeH = 75; // fade over the bottom 75 pixels

  for (let y = height - fadeH - 20; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const a = data[idx + 3];
      if (a === 0) continue;

      // Natural curved liquid base curve
      // Pixels closer to the bottom curve smoothly down to alpha 0
      const normY = (y - (height - fadeH)) / fadeH; // 0 at top of fade, 1 at bottom
      if (normY > 0) {
        // Curve: slightly deeper in center (curved meniscus)
        const dx = Math.abs(x - baseCenterX) / baseRx;
        const curveFactor = Math.max(0, 1 - dx * dx * 0.4);
        const effectiveNormY = Math.min(1, normY / curveFactor);

        // Smooth cubic ease-out fade
        const fade = Math.max(0, 1 - Math.pow(effectiveNormY, 1.6));
        data[idx + 3] = Math.round(a * fade);
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .png()
    .toFile(inputPath);

  console.log("Successfully smoothed splash base!");
}

blendSplashBase().catch(console.error);
