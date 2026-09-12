import sharp from "sharp";
import fs from "fs";

async function makeTransparentEmeraldCan() {
  const inputPath = "C:/Users/Admin/.gemini/antigravity-ide/brain/cf1a1398-98a0-4669-9875-ec84cd01eace/can_emerald_gold_1789188942604.jpg";
  const outputPath = "public/akshara-paint-can.png";
  const backupOriginal = "public/akshara-paint-can-navy-backup.png";

  // Backup existing can if not already backed up
  if (!fs.existsSync(backupOriginal) && fs.existsSync(outputPath)) {
    fs.copyFileSync(outputPath, backupOriginal);
    console.log("Backed up original navy can to:", backupOriginal);
  }

  console.log("Loading emerald can image:", inputPath);
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  const { data } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Flood fill from outer borders to identify white background
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

    // Check if near white background
    const isBg = r > 240 && g > 240 && b > 240 && Math.max(r, g, b) - Math.min(r, g, b) < 16;

    if (isBg) {
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
            if (nr > 230 && ng > 230 && nb > 230 && Math.max(nr, ng, nb) - Math.min(nr, ng, nb) < 22) {
              queue.push(nx, ny);
            }
          }
        }
      }
    }
  }

  // Set smooth alpha transition on visited background pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      const idx = pos * 4;

      if (visited[pos]) {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const maxC = Math.max(r, g, b);

        if (maxC >= 250) {
          data[idx + 3] = 0;
        } else if (maxC > 230) {
          const alpha = (250 - maxC) / 20;
          data[idx + 3] = Math.round(alpha * 255);
        }
      }
    }
  }

  // Save the transparent emerald can
  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);

  console.log("Successfully generated transparent emerald & amber gold paint can at:", outputPath);
}

makeTransparentEmeraldCan().catch(console.error);
