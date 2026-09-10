import sharp from "sharp";
import fs from "fs";

async function makePerfectWrench() {
  const inputPath = "C:/Users/Admin/.gemini/antigravity-ide/brain/8f4a6f34-1b93-4729-b795-993d6729a858/single_real_wrench_1789044621654.jpg";
  const outputPath = "public/akshara-real-wrench.png";

  if (!fs.existsSync(inputPath)) {
    console.error("Input file not found:", inputPath);
    return;
  }

  console.log("Processing single real wrench with alpha transparency...");
  const img = sharp(inputPath);
  const { width, height } = await img.metadata();
  const { data } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const visited = new Uint8Array(width * height);
  const queue = [];

  // Seed boundary
  for (let x = 0; x < width; x++) {
    queue.push(x, 0, x, height - 1);
    visited[x] = 1;
    visited[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y, width - 1, y);
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

    // Background is near-white
    const isBg = r > 230 && g > 230 && b > 230 && Math.max(r, g, b) - Math.min(r, g, b) < 25;

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
            if (nr > 215 && ng > 215 && nb > 215 && Math.max(nr, ng, nb) - Math.min(nr, ng, nb) < 30) {
              queue.push(nx, ny);
            }
          }
        }
      }
    }
  }

  // Set alpha for visited background pixels with smooth anti-aliased feathering
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      const idx = pos * 4;
      if (visited[pos]) {
        const maxC = Math.max(data[idx], data[idx + 1], data[idx + 2]);
        if (maxC > 242) {
          data[idx + 3] = 0;
        } else if (maxC > 218) {
          data[idx + 3] = Math.round(((242 - maxC) / 24) * 255);
        }
      }
    }
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .trim()
    .png()
    .toFile(outputPath);

  console.log("Successfully created transparent public/akshara-real-wrench.png!");
}

makePerfectWrench().catch(console.error);
