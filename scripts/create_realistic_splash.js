import sharp from "sharp";
import fs from "fs";

async function run() {
  const splashInput = "C:/Users/Admin/.gemini/antigravity-ide/brain/8f4a6f34-1b93-4729-b795-993d6729a858/real_orange_splash_1789052738444.jpg";
  const splashOutput = "public/akshara-paint-splash-real.png";
  const canInput = "public/akshara-paint-can.png";
  const rimOutput = "public/akshara-can-front-rim.png";

  console.log("1. Processing realistic orange paint splash...");
  const splashImg = sharp(splashInput);
  const { width: sw, height: sh } = await splashImg.metadata();
  const { data: sdata } = await splashImg.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // Flood fill white background from border
  const visited = new Uint8Array(sw * sh);
  const queue = [];

  for (let x = 0; x < sw; x++) {
    queue.push(x, 0, x, sh - 1);
    visited[x] = 1;
    visited[(sh - 1) * sw + x] = 1;
  }
  for (let y = 0; y < sh; y++) {
    queue.push(0, y, sw - 1, y);
    visited[y * sw] = 1;
    visited[y * sw + (sw - 1)] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const cidx = (cy * sw + cx) * 4;

    const r = sdata[cidx];
    const g = sdata[cidx + 1];
    const b = sdata[cidx + 2];

    const isWhite = r > 235 && g > 235 && b > 235 && Math.max(r, g, b) - Math.min(r, g, b) < 22;

    if (isWhite) {
      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1],
      ];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < sw && ny >= 0 && ny < sh) {
          const npos = ny * sw + nx;
          if (!visited[npos]) {
            visited[npos] = 1;
            const nidx = npos * 4;
            const nr = sdata[nidx];
            const ng = sdata[nidx + 1];
            const nb = sdata[nidx + 2];
            if (nr > 230 && ng > 230 && nb > 230 && Math.max(nr, ng, nb) - Math.min(nr, ng, nb) < 25) {
              queue.push(nx, ny);
            }
          }
        }
      }
    }
  }

  // Set alpha = 0 for visited background pixels
  for (let i = 0; i < sw * sh; i++) {
    if (visited[i]) {
      sdata[i * 4 + 3] = 0;
    } else {
      const idx = i * 4;
      const r = sdata[idx];
      const g = sdata[idx + 1];
      const b = sdata[idx + 2];
      
      // Soft antialiasing for near-white boundary
      if (r > 230 && g > 230 && b > 230) {
        const whiteness = (r + g + b) / (3 * 255);
        const alpha = Math.max(0, Math.min(255, Math.round((1 - whiteness) * 5 * 255)));
        sdata[idx + 3] = alpha;
      }
      
      // Enhance vibrant orange tone to match the Birla Opus paint brand (#ea580c / #f97316)
      // Boost saturation slightly and eliminate any white fringe
      if (sdata[idx + 3] > 0) {
        // Despill white: if r, g, b are high and pale, restore rich orange hue
        if (r > 200 && g > 150 && b > 100) {
          sdata[idx + 2] = Math.round(b * 0.45); // reduce blue fringe
        }
      }
    }
  }

  // Soft bottom taper: at the bottom 4% of the splash, taper into an elliptical curve
  // so the base sits naturally inside the paint can opening without any sharp edge
  const baseY = Math.round(sh * 0.94);
  for (let y = baseY; y < sh; y++) {
    const factor = (sh - y) / (sh - baseY);
    for (let x = 0; x < sw; x++) {
      const idx = (y * sw + x) * 4;
      sdata[idx + 3] = Math.round(sdata[idx + 3] * Math.pow(factor, 1.4));
    }
  }

  await sharp(sdata, { raw: { width: sw, height: sh, channels: 4 } })
    .png()
    .toFile(splashOutput);
  console.log("Saved realistic splash to:", splashOutput);

  // 2. Extract the front rim of akshara-paint-can.png
  console.log("2. Extracting front rim overlay from paint can...");
  const canImg = sharp(canInput);
  const { width: cw, height: ch } = await canImg.metadata();
  const { data: cdata } = await canImg.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // In akshara-paint-can.png (1200 x 1408):
  // The top rim is around y = 78 to y = 250.
  // The front rim lip is from y = 140 to y = 210, and drips extend down to y = 350.
  // We keep only the front rim and front drips (y from 142 to 420, x from 120 to 1080),
  // and everything else has alpha = 0.
  // For y between 142 and 165 (the boundary inside the bucket), we smoothly fade alpha in.
  const rimData = Buffer.from(cdata);
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const idx = (y * cw + x) * 4;
      if (y < 140 || y > 420) {
        rimData[idx + 3] = 0;
      } else if (y < 165) {
        // Smooth transition inside the liquid level so the splash emerges seamlessly from behind
        const blend = (y - 140) / 25;
        rimData[idx + 3] = Math.round(rimData[idx + 3] * blend);
      }
      // Beyond x = 120 and 1080 is outside the can
      if (x < 100 || x > 1100) {
        rimData[idx + 3] = 0;
      }
    }
  }

  await sharp(rimData, { raw: { width: cw, height: ch, channels: 4 } })
    .png()
    .toFile(rimOutput);
  console.log("Saved front rim overlay to:", rimOutput);
  console.log("Done!");
}

run().catch(console.error);
