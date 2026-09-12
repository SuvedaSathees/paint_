import sharp from "sharp";
import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:/Users/Admin/.gemini/antigravity-ide/brain/cf1a1398-98a0-4669-9875-ec84cd01eace";

const CANS_TO_PROCESS = [
  {
    input: path.join(ARTIFACT_DIR, "can_emerald_gold_1789188942604.jpg"),
    outputName: "akshara-paint-can.png",
    alias: "akshara-paint-can-emerald.png",
  },
  {
    input: path.join(ARTIFACT_DIR, "can_navy_ivory_1789188976044.jpg"),
    outputName: "akshara-paint-can-navy.png",
  },
  {
    input: path.join(ARTIFACT_DIR, "can_obsidian_copper_1789189023528.jpg"),
    outputName: "akshara-paint-can-obsidian.png",
  },
];

export async function processAllCans() {
  for (const item of CANS_TO_PROCESS) {
    if (!fs.existsSync(item.input)) {
      console.warn("Input file not found:", item.input);
      continue;
    }

    console.log(`Processing ${path.basename(item.input)}...`);
    const image = sharp(item.input);
    const meta = await image.metadata();
    const { width, height } = meta;

    const { data } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const visited = new Uint8Array(width * height);
    const queue = [];

    // Helper to add seeds
    const addSeed = (x, y) => {
      const idx = y * width + x;
      if (!visited[idx]) {
        visited[idx] = 1;
        queue.push(x, y);
      }
    };

    // 1. Seed image outer borders
    for (let x = 0; x < width; x++) {
      addSeed(x, 0);
      addSeed(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      addSeed(0, y);
      addSeed(width - 1, y);
    }

    // 2. Seed handle interior loops (left around x=180, right around x=844)
    for (let y = 240; y <= 350; y += 10) {
      for (let x = 160; x <= 200; x += 10) {
        const cidx = (y * width + x) * 4;
        if (data[cidx] > 220 && data[cidx + 1] > 220 && data[cidx + 2] > 220) {
          addSeed(x, y);
        }
      }
      for (let x = 824; x <= 864; x += 10) {
        const cidx = (y * width + x) * 4;
        if (data[cidx] > 220 && data[cidx + 1] > 220 && data[cidx + 2] > 220) {
          addSeed(x, y);
        }
      }
    }

    // 3. Flood fill connected background
    let head = 0;
    while (head < queue.length) {
      const cx = queue[head++];
      const cy = queue[head++];
      const cidx = (cy * width + cx) * 4;

      const r = data[cidx];
      const g = data[cidx + 1];
      const b = data[cidx + 2];

      // Any pixel that is near-white or soft shadow on white
      const isBg = (r > 230 && g > 230 && b > 230) || (cy > 880 && r > 180 && g > 180 && b > 180 && Math.abs(r - g) < 15 && Math.abs(g - b) < 15);

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

              // Expand into background / shadow pixels
              if (
                (nr > 220 && ng > 220 && nb > 220) ||
                (ny > 870 && nr > 160 && ng > 160 && nb > 160 && Math.abs(nr - ng) < 20 && Math.abs(ng - nb) < 20)
              ) {
                queue.push(nx, ny);
              }
            }
          }
        }
      }
    }

    // 4. Apply alpha transparency to background
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pos = y * width + x;
        const idx = pos * 4;

        if (visited[pos]) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const maxC = Math.max(r, g, b);

          if (maxC >= 248 || y > 940) {
            data[idx + 3] = 0;
          } else if (maxC > 210) {
            // Smooth anti-aliased edge
            const a = (maxC - 210) / 38;
            data[idx + 3] = Math.round((1 - a) * 255);
          } else {
            data[idx + 3] = 0;
          }
        }
      }
    }

    // Save to public
    const outTarget = path.join("public", item.outputName);
    await sharp(data, {
      raw: { width, height, channels: 4 },
    })
      .png({ quality: 100 })
      .toFile(outTarget);

    console.log(`Saved: ${outTarget}`);

    if (item.alias) {
      const aliasTarget = path.join("public", item.alias);
      fs.copyFileSync(outTarget, aliasTarget);
      console.log(`Saved alias: ${aliasTarget}`);
      // Also update clean can
      fs.copyFileSync(outTarget, path.join("public", "akshara-paint-can-clean.png"));
    }
  }

  console.log("All paint cans processed successfully!");
}

processAllCans().catch(console.error);
