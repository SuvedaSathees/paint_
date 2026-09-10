import sharp from "sharp";
import fs from "fs";

async function refineTint() {
  const inputPath = "public/akshara-paint-roller-white-backup.png";
  const outputPath = "public/akshara-paint-roller.png";

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height, channels } = metadata;

  const { data } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Dimensions: ${width}x${height}`);

  // Cylinder is located between:
  // y: 0 to 196 (fleece cylinder)
  // x: 14 to 535
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = channels === 4 ? data[idx + 3] : 255;

      if (a < 15) continue;

      // The roller cylinder is purely within y <= 198
      // and x >= 12 and x <= 538
      if (y <= 196 && x >= 12 && x <= 538) {
        // Left end cap: dark pixels (r < 75, g < 75, b < 90)
        const isEndCap = x < 26 && r < 90 && g < 90 && b < 110;
        
        // Metal rod emerging from right center:
        // Rod is at x > 528 and y > 85 and is metallic grey (low saturation: |r-g| < 12, |g-b| < 12)
        const isRod = x > 528 && y > 85 && Math.abs(r - g) < 12 && Math.abs(g - b) < 12;

        if (!isEndCap && !isRod) {
          // Calculate brightness (0 to 1)
          const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Paint color palette matching wet Akshara orange paint:
          // Highlights: bright golden orange #fca311 (252, 163, 17)
          // Mid-bright: vibrant orange #f58220 (245, 130, 32)
          // Midtones: deep rich orange #e66a0a (230, 106, 10)
          // Shadows: rich terracotta #b84c05 (184, 76, 5)

          let targetR, targetG, targetB;
          if (luma > 0.72) {
            const t = (luma - 0.72) / 0.28;
            targetR = Math.round(245 + t * (255 - 245));
            targetG = Math.round(135 + t * (175 - 135));
            targetB = Math.round(22 + t * (50 - 22));
          } else if (luma > 0.40) {
            const t = (luma - 0.40) / 0.32;
            targetR = Math.round(225 + t * (245 - 225));
            targetG = Math.round(102 + t * (135 - 102));
            targetB = Math.round(10 + t * (22 - 10));
          } else {
            const t = Math.max(0, luma / 0.40);
            targetR = Math.round(170 + t * (225 - 170));
            targetG = Math.round(65 + t * (102 - 65));
            targetB = Math.round(5 + t * (10 - 5));
          }

          data[idx] = Math.min(255, Math.max(0, targetR));
          data[idx + 1] = Math.min(255, Math.max(0, targetG));
          data[idx + 2] = Math.min(255, Math.max(0, targetB));
        }
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
    .toFile(outputPath);

  console.log("Refined roller tint successfully!");
}

refineTint().catch(console.error);
