import sharp from "sharp";
import fs from "fs";

async function fillCanPaint() {
  const backupPath = "public/akshara-paint-can-empty-backup.png";
  const outputPath = "public/akshara-paint-can.png";

  const image = sharp(backupPath);
  const metadata = await image.metadata();
  const { width, height, channels } = metadata;

  const { data } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Processing image: ${width}x${height}`);

  // Inner can opening ellipse:
  // Center (593, 143), rx = 368, ry = 26
  const cx = 593;
  const cy = 143;
  const rx = 368;
  const ry = 26;

  // 1. Paint pool inside can opening
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;

      const edx = (x - cx) / rx;
      const edy = (y - cy) / ry;
      const distSq = edx * edx + edy * edy;

      if (distSq <= 1.0) {
        const dist = Math.sqrt(distSq);

        // Distance from liquid highlight hotspot (slightly up and left of center)
        const lightDx = (x - (cx - 70)) / rx;
        const lightDy = (y - (cy - 4)) / ry;
        const lightDist = Math.hypot(lightDx, lightDy);

        let r, g, b;
        if (lightDist < 0.4) {
          const t = lightDist / 0.4;
          r = Math.round(255 - t * 10);
          g = Math.round(185 - t * 48);
          b = Math.round(48 - t * 28);
        } else {
          const t = Math.min(1, (dist - 0.35) / 0.65);
          r = Math.round(245 - t * 45);
          g = Math.round(137 - t * 57);
          b = Math.round(20 - t * 12);
        }

        // Glossy specular highlight crescent along liquid surface
        if (dist > 0.55 && dist < 0.92 && x < cx + 130 && y > cy - 6) {
          const spec = Math.sin((dist - 0.55) / 0.37 * Math.PI) * 0.55;
          r = Math.min(255, Math.round(r + spec * 65));
          g = Math.min(255, Math.round(g + spec * 75));
          b = Math.min(255, Math.round(b + spec * 60));
        }

        // Clean antialiased blend into rim
        if (dist > 0.95) {
          const edgeAlpha = (1.0 - dist) / 0.05;
          data[idx] = Math.round(r * edgeAlpha + data[idx] * (1 - edgeAlpha));
          data[idx + 1] = Math.round(g * edgeAlpha + data[idx + 1] * (1 - edgeAlpha));
          data[idx + 2] = Math.round(b * edgeAlpha + data[idx + 2] * (1 - edgeAlpha));
        } else {
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
    }
  }

  // Define 4 natural, organic, viscous drips
  // Drip parameters: rootX, startY, endY, rootR, tipR, curveX
  const dripDefs = [
    { rootX: 470, startY: 165, endY: 230, rootR: 12, tipR: 8.5, curveX: -2 },
    { rootX: 550, startY: 167, endY: 275, rootR: 16, tipR: 12.0, curveX: 4 },
    { rootX: 635, startY: 166, endY: 240, rootR: 14, tipR: 9.5, curveX: -3 },
    { rootX: 725, startY: 164, endY: 218, rootR: 11, tipR: 7.5, curveX: 2 },
  ];

  function getDripDist(px, py) {
    let minDist = 9999;
    let normX = 0;
    let isBead = false;

    for (const d of dripDefs) {
      if (py < d.startY || py > d.endY + d.tipR + 2) continue;

      const t = Math.max(0, Math.min(1, (py - d.startY) / (d.endY - d.startY)));
      const curCenterX = d.rootX + t * d.curveX;

      // Bulbous bead at tip
      const beadDist = Math.hypot(px - (d.rootX + d.curveX), py - d.endY);
      if (beadDist <= d.tipR) {
        const dist = beadDist - d.tipR;
        if (dist < minDist) {
          minDist = dist;
          normX = (px - (d.rootX + d.curveX)) / d.tipR;
          isBead = true;
        }
      }

      // Stem of drip
      if (py <= d.endY) {
        let curR;
        if (t < 0.25) {
          const st = t / 0.25;
          curR = d.rootR * (1 - st) + (d.tipR * 0.7) * st;
        } else if (t < 0.75) {
          curR = d.tipR * 0.7;
        } else {
          const st = (t - 0.75) / 0.25;
          curR = (d.tipR * 0.7) * (1 - st) + d.tipR * st;
        }

        const dist = Math.abs(px - curCenterX) - curR;
        if (dist < minDist) {
          minDist = dist;
          normX = (px - curCenterX) / curR;
          isBead = false;
        }
      }
    }

    return { dist: minDist, normX, isBead };
  }

  // 2. Drop shadow under drips
  for (let y = 160; y < 310; y++) {
    for (let x = 430; x < 760; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx + 3] < 20) continue;

      // Shadow offset (dx=3, dy=4)
      const sInfo = getDripDist(x - 3, y - 4);
      if (sInfo.dist <= 6 && sInfo.dist > 0) {
        const factor = (1 - sInfo.dist / 6) * 0.48;
        data[idx] = Math.round(data[idx] * (1 - factor));
        data[idx + 1] = Math.round(data[idx + 1] * (1 - factor));
        data[idx + 2] = Math.round(data[idx + 2] * (1 - factor));
      }
    }
  }

  // 3. Render drips with rich warm tones (NO color pollution)
  for (let y = 160; y < 300; y++) {
    for (let x = 440; x < 750; x++) {
      const idx = (y * width + x) * channels;
      const dInfo = getDripDist(x, y);

      if (dInfo.dist <= 0) {
        const nx = Math.max(-1, Math.min(1, dInfo.normX));
        // Cylindrical 3D shading
        const shade = 0.90 - nx * 0.22;

        let dr = Math.round(242 * shade);
        let dg = Math.round(132 * shade);
        let db = Math.round(18 * shade);

        // Specular highlight crest
        if (nx > -0.6 && nx < -0.1) {
          const spec = Math.sin((nx - (-0.6)) / 0.5 * Math.PI);
          dr = Math.min(255, dr + Math.round(spec * 60));
          dg = Math.min(255, dg + Math.round(spec * 75));
          db = Math.min(255, db + Math.round(spec * 55));
        }

        // Extra gloss on teardrop bead
        if (dInfo.isBead) {
          dr = Math.min(255, dr + 12);
          dg = Math.min(255, dg + 15);
          db = Math.min(255, db + 8);
        }

        if (dInfo.dist > -1.2) {
          // Antialiased edge
          const alpha = -dInfo.dist / 1.2;
          data[idx] = Math.round(dr * alpha + data[idx] * (1 - alpha));
          data[idx + 1] = Math.round(dg * alpha + data[idx + 1] * (1 - alpha));
          data[idx + 2] = Math.round(db * alpha + data[idx + 2] * (1 - alpha));
        } else {
          data[idx] = dr;
          data[idx + 1] = dg;
          data[idx + 2] = db;
        }
        data[idx + 3] = 255;
      }
    }
  }

  // 4. Flying airborne droplets outside the can
  const droplets = [
    { x: 175, y: 115, r: 6.5 },
    { x: 215, y: 82, r: 9.0 },
    { x: 260, y: 55, r: 6.0 },
    { x: 325, y: 40, r: 8.5 },
    { x: 400, y: 28, r: 5.5 },
    { x: 790, y: 28, r: 6.0 },
    { x: 865, y: 44, r: 9.0 },
    { x: 935, y: 72, r: 10.0 },
    { x: 990, y: 108, r: 7.5 },
    { x: 1030, y: 145, r: 5.5 },
    // Droplets falling below drips
    { x: 554, y: 298, r: 6.0 },
    { x: 468, y: 248, r: 4.5 },
    { x: 632, y: 258, r: 5.0 },
  ];

  for (const drop of droplets) {
    const minX = Math.floor(drop.x - drop.r - 2);
    const maxX = Math.ceil(drop.x + drop.r + 2);
    const minY = Math.floor(drop.y - drop.r - 2);
    const maxY = Math.ceil(drop.y + drop.r + 2);

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (x < 0 || x >= width || y < 0 || y >= height) continue;
        const idx = (y * width + x) * channels;

        const ddist = Math.hypot(x - drop.x, y - drop.y);
        if (ddist <= drop.r) {
          const ldx = (x - (drop.x - drop.r * 0.35)) / drop.r;
          const ldy = (y - (drop.y - drop.r * 0.35)) / drop.r;
          const ldist = Math.hypot(ldx, ldy);

          let dr = 242;
          let dg = 132;
          let db = 20;

          if (ldist < 0.45) {
            const t = ldist / 0.45;
            dr = Math.round(255 - t * 10);
            dg = Math.round(210 - t * 65);
            db = Math.round(75 - t * 50);
          } else if (ldist > 0.85) {
            dr = 188;
            dg = 84;
            db = 10;
          }

          const alpha = ddist > drop.r - 1.0 ? (drop.r - ddist) / 1.0 : 1.0;
          const curA = data[idx + 3] / 255;

          data[idx] = Math.round(dr * alpha + data[idx] * (1 - alpha));
          data[idx + 1] = Math.round(dg * alpha + data[idx + 1] * (1 - alpha));
          data[idx + 2] = Math.round(db * alpha + data[idx + 2] * (1 - alpha));
          data[idx + 3] = Math.round(Math.max(curA, alpha) * 255);
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

  console.log("Successfully generated clean painted can with inside paint, drips and droplets!");
}

fillCanPaint().catch(console.error);
