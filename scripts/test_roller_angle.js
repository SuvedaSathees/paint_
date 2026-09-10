import sharp from "sharp";

async function testAngles() {
  const angles = [-90, -75, -45, 75];
  for (const angle of angles) {
    await sharp("public/akshara-paint-roller.png")
      .rotate(angle, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(`public/roller_angle_${angle}.png`);
  }
  console.log("Created test angles!");
}

testAngles().catch(console.error);
