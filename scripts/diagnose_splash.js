import sharp from "sharp";
import fs from "fs";

async function diagnose() {
  const rawMeta = await sharp("public/akshara-paint-splash-raw-backup.png").metadata();
  const rawImg = await sharp("public/akshara-paint-splash-raw-backup.png").raw().toBuffer({ resolveWithObject: true });
  
  const curMeta = await sharp("public/akshara-paint-splash.png").metadata();
  const curImg = await sharp("public/akshara-paint-splash.png").raw().toBuffer({ resolveWithObject: true });

  function analyze(name, buffer, width, height, channels) {
    let minX = width, maxX = 0, minY = height, maxY = 0;
    let baseMinX = width, baseMaxX = 0, baseSumX = 0, baseCount = 0;
    let rightEdgeTouches = 0, topEdgeTouches = 0, leftEdgeTouches = 0, bottomEdgeTouches = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const a = buffer[(y * width + x) * channels + 3];
        if (a > 15) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;

          if (x >= width - 3) rightEdgeTouches++;
          if (x <= 2) leftEdgeTouches++;
          if (y <= 2) topEdgeTouches++;
          if (y >= height - 3) bottomEdgeTouches++;

          // Look at bottom 60px of the visible content
          if (y > height - 120) {
            if (x < baseMinX) baseMinX = x;
            if (x > baseMaxX) baseMaxX = x;
            baseSumX += x;
            baseCount++;
          }
        }
      }
    }

    const baseCenter = baseCount > 0 ? (baseSumX / baseCount).toFixed(1) : "N/A";
    const overallCenter = ((minX + maxX) / 2).toFixed(1);

    const report = {
      name,
      dimensions: `${width}x${height}`,
      bounds: { minX, maxX, minY, maxY, width: maxX - minX + 1, height: maxY - minY + 1 },
      overallCenter,
      base: { baseMinX, baseMaxX, baseCenter, width: baseMaxX - baseMinX + 1 },
      edgeTouches: { top: topEdgeTouches, right: rightEdgeTouches, bottom: bottomEdgeTouches, left: leftEdgeTouches }
    };
    return report;
  }

  const rawReport = analyze("RAW_BACKUP", rawImg.data, rawMeta.width, rawMeta.height, rawMeta.channels);
  const curReport = analyze("CURRENT_SPLASH", curImg.data, curMeta.width, curMeta.height, curMeta.channels);

  console.log(JSON.stringify({ rawReport, curReport }, null, 2));
}

diagnose().catch(console.error);
