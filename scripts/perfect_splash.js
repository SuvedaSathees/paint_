import sharp from "sharp";
import fs from "fs";

async function makePerfectSplash() {
  const inputPath = "public/akshara-paint-splash-raw-backup.png";
  const outputPath = "public/akshara-paint-splash.png";

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height, channels } = metadata;

  const { data } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Input size: ${width}x${height}`);

  // 1. First, fix the flat cut at the top plume (x from 750 to 830, y from 0 to 60)
  // The plume at x in [760, 820] was cut flat at y = 0.
  // We will smoothly taper it into a rounded tip around y = 30-40,
  // and add airborne liquid beads flying above it.
  const tipCenterX = 790;
  const tipMaxY = 45; // taper starts below this and rounds off
  const tipRadius = 24;

  for (let y = 0; y < 65; y++) {
    for (let x = 740; x < 840; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx + 3] === 0) continue;

      // Distance from rounded tip center at (790, 42)
      if (y < tipMaxY) {
        const dx = (x - tipCenterX) / tipRadius;
        const dy = (y - tipMaxY) / tipRadius;
        const dist = Math.hypot(dx, dy);

        if (dist > 1.0) {
          // Erase the flat cut-off pixels outside the natural rounded tip
          data[idx + 3] = 0;
        } else if (dist > 0.8) {
          // Soft antialiased edge of the rounded droplet tip
          const alpha = (1.0 - dist) / 0.2;
          data[idx + 3] = Math.round(data[idx + 3] * alpha);
        }
      }
    }
  }

  // 2. Add airborne droplet beads flying above the tapered tip (y = 5 to 30, x = 785 to 795)
  // so the liquid energy continues naturally into space!
  const airBeads = [
    { x: 792, y: 15, r: 7.5 },
    { x: 795, y: 3, r: 4.5 },
    { x: 810, y: 18, r: 3.5 },
    { x: 778, y: 22, r: 4.0 },
  ];

  for (const b of airBeads) {
    for (let y = Math.floor(b.y - b.r - 2); y <= Math.ceil(b.y + b.r + 2); y++) {
      for (let x = Math.floor(b.x - b.r - 2); x <= Math.ceil(b.x + b.r + 2); x++) {
        if (x < 0 || x >= width || y < 0 || y >= height) continue;
        const idx = (y * width + x) * channels;
        const d = Math.hypot(x - b.x, y - b.y);
        if (d <= b.r) {
          const alpha = d > b.r - 1.2 ? (b.r - d) / 1.2 : 1.0;
          // Highlight
          const hl = Math.hypot((x - (b.x - b.r * 0.3)) / b.r, (y - (b.y - b.r * 0.3)) / b.r);
          let cr = 240, cg = 130, cb = 20;
          if (hl < 0.45) {
            cr = 255; cg = 190; cb = 60;
          } else if (hl > 0.85) {
            cr = 175; cg = 78; cb = 8;
          }
          data[idx] = cr;
          data[idx + 1] = cg;
          data[idx + 2] = cb;
          data[idx + 3] = Math.round(255 * alpha);
        }
      }
    }
  }

  // 3. Re-center the splash horizontally:
  // Base weighted center is at x = 433.
  // Shift entire image right by +68 pixels so base is centered at x = 501 (out of 1024).
  // Also shift down by +25 pixels to give comfortable headroom at the top!
  const shiftX = 68;
  const shiftY = 25;

  const shiftedData = Buffer.alloc(width * height * channels, 0);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * channels;
      const a = data[srcIdx + 3];
      if (a === 0) continue;

      const newX = x + shiftX;
      const newY = y + shiftY;

      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        const dstIdx = (newY * width + newX) * channels;
        shiftedData[dstIdx] = data[srcIdx];
        shiftedData[dstIdx + 1] = data[srcIdx + 1];
        shiftedData[dstIdx + 2] = data[srcIdx + 2];
        shiftedData[dstIdx + 3] = data[srcIdx + 3];
      }
    }
  }

  // 4. Softly curve and fade the base (now centered at x = 435 + 68 = 503, y = 980 to 1024)
  // so it dissolves seamlessly into the liquid paint pool in the can
  const baseCenterX = 503;
  const baseRx = 280;
  const fadeH = 80;

  for (let y = height - fadeH - 20; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const a = shiftedData[idx + 3];
      if (a === 0) continue;

      const normY = (y - (height - fadeH)) / fadeH;
      if (normY > 0) {
        const dx = Math.abs(x - baseCenterX) / baseRx;
        const curveFactor = Math.max(0, 1 - dx * dx * 0.4);
        const effectiveNormY = Math.min(1, normY / curveFactor);
        const fade = Math.max(0, 1 - Math.pow(effectiveNormY, 1.5));
        shiftedData[idx + 3] = Math.round(a * fade);
      }
    }
  }

  await sharp(shiftedData, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .png()
    .toFile(outputPath);

  console.log("Successfully created perfectly centered splash with rounded uncut top and smooth base!");
}

makePerfectSplash().catch(console.error);
