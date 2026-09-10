import sharp from "sharp";

async function createFlawlessSplash() {
  const inputPath = "public/akshara-paint-splash-raw-backup.png";
  const outputPath = "public/akshara-paint-splash.png";

  console.log("Loading raw splash backup...");
  const rawImage = sharp(inputPath);
  const rawMeta = await rawImage.metadata();
  const { width: srcW, height: srcH, channels } = rawMeta;

  const { data: rawBuf } = await rawImage.raw().toBuffer({ resolveWithObject: true });

  // 1. Taper and round off the cut plume at the top of the raw image (x: 750-835, y: 0-60)
  // In the raw AI image, this plume was sliced horizontally flat at y = 0.
  const tipCenterX = 790;
  const tipMaxY = 44;
  const tipRadius = 24;

  for (let y = 0; y < 65; y++) {
    for (let x = 740; x < 840; x++) {
      const idx = (y * srcW + x) * channels;
      if (rawBuf[idx + 3] === 0) continue;

      if (y < tipMaxY) {
        const dx = (x - tipCenterX) / tipRadius;
        const dy = (y - tipMaxY) / tipRadius;
        const dist = Math.hypot(dx, dy);

        if (dist > 1.0) {
          rawBuf[idx + 3] = 0; // erase the flat edge pixels
        } else if (dist > 0.75) {
          const alpha = (1.0 - dist) / 0.25;
          rawBuf[idx + 3] = Math.round(rawBuf[idx + 3] * alpha);
        }
      }
    }
  }

  // 2. Add airborne flying droplet beads above the rounded tip so the liquid looks 100% natural
  const airBeads = [
    { x: 791, y: 16, r: 7.5 },
    { x: 794, y: 4, r: 4.5 },
    { x: 808, y: 20, r: 3.5 },
    { x: 777, y: 24, r: 4.0 },
  ];

  for (const b of airBeads) {
    for (let y = Math.floor(b.y - b.r - 2); y <= Math.ceil(b.y + b.r + 2); y++) {
      for (let x = Math.floor(b.x - b.r - 2); x <= Math.ceil(b.x + b.r + 2); x++) {
        if (x < 0 || x >= srcW || y < 0 || y >= srcH) continue;
        const idx = (y * srcW + x) * channels;
        const d = Math.hypot(x - b.x, y - b.y);
        if (d <= b.r) {
          const alpha = d > b.r - 1.2 ? (b.r - d) / 1.2 : 1.0;
          const hl = Math.hypot((x - (b.x - b.r * 0.3)) / b.r, (y - (b.y - b.r * 0.3)) / b.r);
          let cr = 240, cg = 130, cb = 20;
          if (hl < 0.45) {
            cr = 255; cg = 190; cb = 60;
          } else if (hl > 0.85) {
            cr = 175; cg = 78; cb = 8;
          }
          rawBuf[idx] = cr;
          rawBuf[idx + 1] = cg;
          rawBuf[idx + 2] = cb;
          rawBuf[idx + 3] = Math.round(255 * alpha);
        }
      }
    }
  }

  // 3. Scale and center into a spacious 1200x1200 canvas
  // This guarantees generous margins on all 4 sides so NO DROPLET IS EVER CUT AT ANY BORDER!
  const canvasW = 1200;
  const canvasH = 1200;
  const outBuf = Buffer.alloc(canvasW * canvasH * channels, 0);

  // Scale factor: 0.88 ensures the entire splash has plenty of room
  const scale = 0.88;
  // In the raw buffer, the base center (where liquid emerges at the bottom) is at x = 425
  // We want the base center to land at exactly canvasW / 2 = 600!
  const targetBaseX = 600;
  const targetBaseY = 1180; // near the bottom of the 1200 canvas

  const srcBaseX = 425;
  const srcBaseY = 1010;

  const offsetX = Math.round(targetBaseX - srcBaseX * scale);
  const offsetY = Math.round(targetBaseY - srcBaseY * scale);

  console.log(`Mapping with scale ${scale}, offsetX: ${offsetX}, offsetY: ${offsetY}`);

  // Bilinear/nearest sampling onto the new canvas
  for (let dy = 0; dy < canvasH; dy++) {
    const sy = (dy - offsetY) / scale;
    if (sy < 0 || sy >= srcH - 1) continue;

    const sy0 = Math.floor(sy);
    const fy = sy - sy0;

    for (let dx = 0; dx < canvasW; dx++) {
      const sx = (dx - offsetX) / scale;
      if (sx < 0 || sx >= srcW - 1) continue;

      const sx0 = Math.floor(sx);
      const fx = sx - sx0;

      // 4 neighbors
      const idx00 = (sy0 * srcW + sx0) * channels;
      const idx10 = (sy0 * srcW + (sx0 + 1)) * channels;
      const idx01 = ((sy0 + 1) * srcW + sx0) * channels;
      const idx11 = ((sy0 + 1) * srcW + (sx0 + 1)) * channels;

      const a00 = rawBuf[idx00 + 3] / 255;
      const a10 = rawBuf[idx10 + 3] / 255;
      const a01 = rawBuf[idx01 + 3] / 255;
      const a11 = rawBuf[idx11 + 3] / 255;

      const a = (1 - fx) * (1 - fy) * a00 + fx * (1 - fy) * a10 + (1 - fx) * fy * a01 + fx * fy * a11;
      if (a < 0.01) continue;

      const r = (1 - fx) * (1 - fy) * rawBuf[idx00] + fx * (1 - fy) * rawBuf[idx10] + (1 - fx) * fy * rawBuf[idx01] + fx * fy * rawBuf[idx11];
      const g = (1 - fx) * (1 - fy) * rawBuf[idx00 + 1] + fx * (1 - fy) * rawBuf[idx10 + 1] + (1 - fx) * fy * rawBuf[idx01 + 1] + fx * fy * rawBuf[idx11 + 1];
      const b = (1 - fx) * (1 - fy) * rawBuf[idx00 + 2] + fx * (1 - fy) * rawBuf[idx10 + 2] + (1 - fx) * fy * rawBuf[idx01 + 2] + fx * fy * rawBuf[idx11 + 2];

      const outIdx = (dy * canvasW + dx) * channels;
      outBuf[outIdx] = Math.round(r);
      outBuf[outIdx + 1] = Math.round(g);
      outBuf[outIdx + 2] = Math.round(b);
      outBuf[outIdx + 3] = Math.round(a * 255);
    }
  }

  // 4. Softly curved meniscus fade at the bottom base (y = 1120 to 1195)
  // This ensures the liquid base blends smoothly into the inside paint pool with no hard cutoff
  const fadeH = 75;
  const fadeStartY = targetBaseY - fadeH;

  for (let y = fadeStartY; y < canvasH; y++) {
    const normY = (y - fadeStartY) / fadeH;
    for (let x = 0; x < canvasW; x++) {
      const idx = (y * canvasW + x) * channels;
      const a = outBuf[idx + 3];
      if (a === 0) continue;

      const dx = Math.abs(x - targetBaseX) / 260;
      const curveFactor = Math.max(0.1, 1 - dx * dx * 0.45);
      const effectiveNormY = Math.min(1, normY / curveFactor);
      const fade = Math.max(0, 1 - Math.pow(effectiveNormY, 1.4));

      outBuf[idx + 3] = Math.round(a * fade);
    }
  }

  // Save the result
  await sharp(outBuf, {
    raw: {
      width: canvasW,
      height: canvasH,
      channels,
    },
  })
    .png()
    .toFile(outputPath);

  console.log(`Flawless splash saved to ${outputPath} (1200x1200)!`);
}

createFlawlessSplash().catch(console.error);
