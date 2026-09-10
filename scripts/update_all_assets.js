import sharp from "sharp";
import fs from "fs";

async function processHardwareTools() {
  const inputPath = "C:/Users/Admin/.gemini/antigravity-ide/brain/8f4a6f34-1b93-4729-b795-993d6729a858/akshara_hardware_tools_1789040671046.jpg";
  const outputPath = "public/akshara-tools.png";

  console.log("Processing hardware tools image...");
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  const { data } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Flood fill from borders to only remove background and protect white reflections inside metal
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Seed boundary pixels
  for (let x = 0; x < width; x++) {
    queue.push(x, 0);
    queue.push(x, height - 1);
    visited[x] = 1;
    visited[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y);
    queue.push(width - 1, y);
    visited[y * width] = 1;
    visited[y * width + (width - 1)] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const cidx = (cy * width + cx) * 4;

    const r = data[cidx];
    const g = data[cidx + 1];
    const b = data[cidx + 2];

    // Background threshold (near white)
    const isBg = r > 238 && g > 238 && b > 238 && Math.max(r, g, b) - Math.min(r, g, b) < 18;

    if (isBg) {
      // 4 neighbors
      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1],
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const npos = ny * width + nx;
          if (!visited[npos]) {
            visited[npos] = 1;
            const nidx = npos * 4;
            const nr = data[nidx];
            const ng = data[nidx + 1];
            const nb = data[nidx + 2];
            if (nr > 225 && ng > 225 && nb > 225 && Math.max(nr, ng, nb) - Math.min(nr, ng, nb) < 22) {
              queue.push(nx, ny);
            }
          }
        }
      }
    }
  }

  // Set alpha based on background mask with soft edge
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      const idx = pos * 4;

      if (visited[pos]) {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const maxC = Math.max(r, g, b);

        if (maxC > 248) {
          data[idx + 3] = 0;
        } else if (maxC > 232) {
          const alpha = (248 - maxC) / 16;
          data[idx + 3] = Math.round(alpha * 255);
        }
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);

  console.log("Successfully saved transparent hardware tools to:", outputPath);
}

async function processFlawlessSplash() {
  const inputPath = "public/akshara-paint-splash-raw-backup.png";
  const outputPath = "public/akshara-paint-splash.png";

  console.log("Processing paint splash...");
  const rawImage = sharp(inputPath);
  const rawMeta = await rawImage.metadata();
  const { width: srcW, height: srcH, channels } = rawMeta;

  const { data: rawBuf } = await rawImage.raw().toBuffer({ resolveWithObject: true });

  // 1. Taper and round off the cut plume at the top of the raw image (x: 750-835, y: 0-60)
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
          rawBuf[idx + 3] = 0;
        } else if (dist > 0.75) {
          const alpha = (1.0 - dist) / 0.25;
          rawBuf[idx + 3] = Math.round(rawBuf[idx + 3] * alpha);
        }
      }
    }
  }

  // 2. Add airborne flying droplet beads above the rounded tip
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

  // 3. Scale and center into 1200x1200 canvas
  const canvasW = 1200;
  const canvasH = 1200;
  const outBuf = Buffer.alloc(canvasW * canvasH * channels, 0);

  const scale = 0.88;
  const targetBaseX = 600;
  const targetBaseY = 1180;

  const srcBaseX = 425;
  const srcBaseY = 1010;

  const offsetX = Math.round(targetBaseX - srcBaseX * scale);
  const offsetY = Math.round(targetBaseY - srcBaseY * scale);

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

  // 4. Softly curved meniscus fade at the bottom base
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

  await sharp(outBuf, {
    raw: {
      width: canvasW,
      height: canvasH,
      channels,
    },
  })
    .png()
    .toFile(outputPath);

  console.log("Successfully saved flawless splash to:", outputPath);
}

async function main() {
  await processHardwareTools();
  await processFlawlessSplash();
}

main().catch(console.error);
