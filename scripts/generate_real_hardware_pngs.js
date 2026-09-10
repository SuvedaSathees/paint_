import sharp from "sharp";
import fs from "fs";

async function sliceRealTools() {
  const inputPath = "C:/Users/Admin/.gemini/antigravity-ide/brain/8f4a6f34-1b93-4729-b795-993d6729a858/akshara_hardware_tools_1789040671046.jpg";

  console.log("Loading high-res real hardware tools image...");
  const src = sharp(inputPath);
  const meta = await src.metadata();
  const { width, height } = meta;

  // Function to remove white background with flood fill from corners
  async function makeTransparent(imageBuffer, w, h) {
    const { data } = await sharp(imageBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const visited = new Uint8Array(w * h);
    const queue = [];

    // Seed edges
    for (let x = 0; x < w; x++) {
      queue.push(x, 0, x, h - 1);
      visited[x] = 1;
      visited[(h - 1) * w + x] = 1;
    }
    for (let y = 0; y < h; y++) {
      queue.push(0, y, w - 1, y);
      visited[y * w] = 1;
      visited[y * w + (w - 1)] = 1;
    }

    let head = 0;
    while (head < queue.length) {
      const cx = queue[head++];
      const cy = queue[head++];
      const cidx = (cy * w + cx) * 4;

      const r = data[cidx];
      const g = data[cidx + 1];
      const b = data[cidx + 2];

      const isBg = r > 235 && g > 235 && b > 235 && Math.max(r, g, b) - Math.min(r, g, b) < 22;

      if (isBg) {
        const neighbors = [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1],
        ];

        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const npos = ny * w + nx;
            if (!visited[npos]) {
              visited[npos] = 1;
              const nidx = npos * 4;
              const nr = data[nidx];
              const ng = data[nidx + 1];
              const nb = data[nidx + 2];
              if (nr > 220 && ng > 220 && nb > 220 && Math.max(nr, ng, nb) - Math.min(nr, ng, nb) < 26) {
                queue.push(nx, ny);
              }
            }
          }
        }
      }
    }

    // Apply alpha
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const pos = y * w + x;
        const idx = pos * 4;
        if (visited[pos]) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const maxC = Math.max(r, g, b);
          if (maxC > 246) {
            data[idx + 3] = 0;
          } else if (maxC > 228) {
            data[idx + 3] = Math.round(((246 - maxC) / 18) * 255);
          }
        }
      }
    }

    return sharp(data, {
      raw: { width: w, height: h, channels: 4 },
    })
      .png()
      .toBuffer();
  }

  // 1. Steel Hex Bolt & Nut (Upper Left)
  // In the photo: x from 90 to 360, y from 40 to 420
  console.log("Extracting real bolt...");
  const boltCrop = await sharp(inputPath)
    .extract({ left: 90, top: 40, width: 280, height: 380 })
    .toBuffer();
  const boltPng = await makeTransparent(boltCrop, 280, 380);
  await sharp(boltPng).toFile("public/akshara-real-bolt.png");
  console.log("Saved public/akshara-real-bolt.png");

  // 2. Steel Hex Nuts & Washers (Top Center-Left)
  // In the photo: x from 220 to 560, y from 80 to 430
  console.log("Extracting real nuts...");
  const nutsCrop = await sharp(inputPath)
    .extract({ left: 210, top: 80, width: 340, height: 340 })
    .toBuffer();
  const nutsPng = await makeTransparent(nutsCrop, 340, 340);
  await sharp(nutsPng).toFile("public/akshara-real-nuts.png");
  console.log("Saved public/akshara-real-nuts.png");

  // 3. Blue & Grey PVC Electrical Conduit Pipe with Elbow (Middle-Left)
  // In the photo: x from 70 to 680, y from 220 to 730
  console.log("Extracting real pipe...");
  const pipeCrop = await sharp(inputPath)
    .extract({ left: 70, top: 220, width: 610, height: 510 })
    .toBuffer();
  const pipePng = await makeTransparent(pipeCrop, 610, 510);
  await sharp(pipePng).toFile("public/akshara-real-pipe.png");
  console.log("Saved public/akshara-real-pipe.png");

  // 4. Chrome Adjustable Wrench (Right Side)
  // In the photo: x from 550 to 920, y from 160 to 730
  console.log("Extracting real wrench...");
  const wrenchCrop = await sharp(inputPath)
    .extract({ left: 550, top: 160, width: 370, height: 570 })
    .toBuffer();
  const wrenchPng = await makeTransparent(wrenchCrop, 370, 570);
  await sharp(wrenchPng).toFile("public/akshara-real-wrench.png");
  console.log("Saved public/akshara-real-wrench.png");

  // 5. Masonry Trowel (Lower-Right)
  // In the photo: x from 490 to 930, y from 470 to 930
  console.log("Extracting real trowel...");
  const trowelCrop = await sharp(inputPath)
    .extract({ left: 490, top: 470, width: 440, height: 460 })
    .toBuffer();
  const trowelPng = await makeTransparent(trowelCrop, 440, 460);
  await sharp(trowelPng).toFile("public/akshara-real-trowel.png");
  console.log("Saved public/akshara-real-trowel.png");

  console.log("All real photorealistic hardware tools extracted successfully!");
}

sliceRealTools().catch(console.error);
