import sharp from "sharp";

async function renderPerfectMatch() {
  const inputPath = "public/akshara-paint-can-empty-backup.png";
  const outputPath = "public/akshara-paint-can.png";

  // SVG overlay exactly 1200x1408 with EXACT splash color palette (HSL 28 deg)
  const svg = `
<svg width="1200" height="1408" viewBox="0 0 1200 1408" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Liquid paint pool radial gradient: exact match to akshara-paint-splash.png -->
    <radialGradient id="paintPool" cx="48%" cy="42%" r="56%" fx="44%" fy="36%">
      <stop offset="0%" stop-color="#f58b27" />
      <stop offset="25%" stop-color="#dc6e10" />
      <stop offset="55%" stop-color="#b85408" />
      <stop offset="82%" stop-color="#933e05" />
      <stop offset="100%" stop-color="#602402" />
    </radialGradient>

    <!-- Liquid surface gloss highlight -->
    <linearGradient id="surfaceGloss" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
      <stop offset="28%" stop-color="#ffffff" stop-opacity="0.5" />
      <stop offset="68%" stop-color="#ffffff" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>

    <!-- Drip 3D volume gradient matching splash -->
    <linearGradient id="dripVol" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea7a15" />
      <stop offset="35%" stop-color="#f89932" />
      <stop offset="70%" stop-color="#be5808" />
      <stop offset="100%" stop-color="#803403" />
    </linearGradient>

    <!-- Drop highlight specular matching splash -->
    <radialGradient id="dropHighlight" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
      <stop offset="30%" stop-color="#fca83e" stop-opacity="0.9" />
      <stop offset="70%" stop-color="#c25a0a" stop-opacity="1" />
      <stop offset="100%" stop-color="#702a03" stop-opacity="1" />
    </radialGradient>

    <!-- Drop shadow for thick paint drips -->
    <filter id="dripShadow" x="-30%" y="-20%" width="160%" height="150%">
      <feDropShadow dx="3" dy="5" stdDeviation="4.5" flood-color="#050b14" flood-opacity="0.65" />
    </filter>

    <!-- Droplet soft shadow -->
    <filter id="dropletShadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="2" dy="4" stdDeviation="3.5" flood-color="#050b14" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- 1. LIQUID PAINT POOL INSIDE THE CAN OPENING -->
  <g id="paint-pool">
    <!-- Main liquid pool filling the inner rim seamlessly -->
    <ellipse cx="593" cy="138" rx="368" ry="34" fill="url(#paintPool)" />

    <!-- Liquid surface gloss highlight crescent -->
    <path d="M 320,136 Q 590,158 860,136 Q 590,147 320,136 Z" fill="url(#surfaceGloss)" opacity="0.8" />
    
    <!-- Secondary delicate rim specular reflection -->
    <path d="M 280,130 Q 590,165 900,130 Q 590,162 280,130 Z" fill="#ffffff" opacity="0.35" />
  </g>

  <!-- 2. WET PAINT DRIPPING OUTSIDE OVER THE FRONT RIM -->
  <g id="paint-drips" filter="url(#dripShadow)">
    <!-- Organic continuous paint overflow apron with smooth natural drips -->
    <path d="
      M 395,166
      C 420,166 430,172 445,178
      C 455,183 458,210 460,225
      C 462,236 478,236 480,225
      C 482,210 488,180 505,176
      C 515,174 522,195 528,235
      C 532,265 540,285 550,285
      C 560,285 566,265 570,235
      C 574,195 585,178 605,178
      C 620,178 626,192 632,220
      C 636,242 648,245 652,235
      C 658,208 668,185 680,180
      C 690,176 695,198 702,235
      C 708,265 715,278 724,278
      C 733,278 738,260 742,230
      C 748,190 758,175 775,172
      C 790,170 800,166 820,166
      C 800,162 420,162 395,166 Z
    " fill="url(#dripVol)" />

    <!-- Glossy specular sheen highlight on the drips -->
    <path d="
      M 464,182 Q 463,205 465,225 Q 468,225 467,184 Z
      M 534,185 Q 533,235 542,275 Q 546,275 541,185 Z
      M 636,188 Q 635,215 640,235 Q 643,235 641,188 Z
      M 708,188 Q 707,235 714,270 Q 718,270 715,188 Z
    " fill="#ffffff" opacity="0.55" />
  </g>

  <!-- 3. AIRBORNE FLYING PAINT DROPLETS OUTSIDE THE CAN -->
  <g id="paint-droplets" filter="url(#dropletShadow)">
    <!-- Drops splashing to the left -->
    <ellipse cx="165" cy="118" rx="8" ry="11" transform="rotate(-25 165 118)" fill="url(#dropHighlight)" />
    <ellipse cx="205" cy="85" rx="10" ry="14" transform="rotate(-35 205 85)" fill="url(#dropHighlight)" />
    <ellipse cx="255" cy="58" rx="8" ry="11" transform="rotate(-30 255 58)" fill="url(#dropHighlight)" />
    <ellipse cx="320" cy="42" rx="11" ry="15" transform="rotate(-18 320 42)" fill="url(#dropHighlight)" />
    <ellipse cx="385" cy="30" rx="7" ry="9" transform="rotate(-10 385 30)" fill="url(#dropHighlight)" />

    <!-- Drops splashing to the right -->
    <ellipse cx="805" cy="28" rx="7" ry="9" transform="rotate(10 805 28)" fill="url(#dropHighlight)" />
    <ellipse cx="875" cy="42" rx="11" ry="14" transform="rotate(20 875 42)" fill="url(#dropHighlight)" />
    <ellipse cx="940" cy="65" rx="12" ry="16" transform="rotate(32 940 65)" fill="url(#dropHighlight)" />
    <ellipse cx="995" cy="102" rx="9" ry="12" transform="rotate(40 995 102)" fill="url(#dropHighlight)" />
    <ellipse cx="1035" cy="142" rx="7" ry="9" transform="rotate(45 1035 142)" fill="url(#dropHighlight)" />

    <!-- Droplets falling in mid-air below the drips -->
    <ellipse cx="550" cy="312" rx="7" ry="9" fill="url(#dropHighlight)" />
    <ellipse cx="724" cy="304" rx="6" ry="8" fill="url(#dropHighlight)" />
    <ellipse cx="472" cy="252" rx="5" ry="6" fill="url(#dropHighlight)" />
    <ellipse cx="646" cy="260" rx="5" ry="6" fill="url(#dropHighlight)" />
  </g>
</svg>
`;

  await sharp(inputPath)
    .composite([{ input: Buffer.from(svg), blend: "over" }])
    .png()
    .toFile(outputPath);

  console.log("Successfully rendered exact-color paint can!");
}

renderPerfectMatch().catch(console.error);
