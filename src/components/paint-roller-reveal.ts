/**
 * Paint-roller reveal for the desktop hero.
 *
 * A canvas covers the hero with a flat "primed wall". A real paint roller then
 * rolls across the wall in horizontal passes (top → middle → bottom, alternating
 * direction like a painter would) and "paints" the 3D scene into view. Each pass
 * leaves slightly ragged, dry-brushed edges so the reveal reads as real paint.
 *
 * The roller image is positioned from the same progress value that drives the
 * stroke, so the roller head always sits on the wet leading edge.
 */

export type RollerRevealOptions = {
  canvas: HTMLCanvasElement;
  roller: HTMLElement; // wrapper holding the side-on roller image (head on the right)
  wallColor?: string;
  passes?: number;
  onDone?: () => void;
};

export type RollerReveal = {
  /** Draw state for a progress value 0 → 1 across all passes. */
  render: (progress: number) => void;
  /** Instantly clear the wall (used for skip / reduced motion). */
  finish: () => void;
  destroy: () => void;
};

// Natural size of /akshara-roller-side.png and where its roller head sits.
const ROLLER_W = 1001;
const ROLLER_H = 577;
const HEAD_LEFT = 808; // x where the foam sleeve starts (head spans 808 → 1001)

export function createRollerReveal({
  canvas,
  roller,
  wallColor = "#eceef1",
  passes = 3,
  onDone,
}: RollerRevealOptions): RollerReveal {
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let dpr = 1;
  let bandH = 0;
  let overlap = 0;
  let lastProgress = 0;
  let done = false;

  // Smooth pseudo-random wobble so every pass has its own hand-painted edge.
  const seeds = Array.from({ length: passes }, () => Math.random() * 1000);
  const wobble = (pass: number, x: number) => {
    const s = seeds[pass];
    return (
      Math.sin(x * 0.006 + s) * 6 +
      Math.sin(x * 0.017 + s * 1.7) * 3 +
      Math.sin(x * 0.041 + s * 2.3) * 1.5
    );
  };

  const paintWall = () => {
    if (!ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = wallColor;
    ctx.fillRect(0, 0, width, height);

    // faint plaster texture so the wall doesn't look like a flat div
    const specks = Math.round((width * height) / 900);
    for (let i = 0; i < specks; i++) {
      const shade = Math.random() < 0.5 ? 0 : 255;
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${Math.random() * 0.035})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.4, 1.4);
    }
  };

  const setup = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

    overlap = Math.round(height * 0.05);
    bandH = Math.ceil(height / passes) + overlap * 2;

    // roller head length matches the band height
    const scale = bandH / ROLLER_H;
    roller.style.width = `${ROLLER_W * scale}px`;
    roller.style.height = `${ROLLER_H * scale}px`;

    paintWall();
    canvas.style.background = "transparent";
    // replay everything up to where we were (e.g. after a resize)
    const p = lastProgress;
    lastProgress = 0;
    render(p);
  };

  const bandTop = (pass: number) => pass * (height / passes) - overlap;

  /** Erase ("paint") a band segment from x0 to x1 with ragged dry-brush edges. */
  const stroke = (pass: number, x0: number, x1: number) => {
    if (!ctx || x1 <= x0) return;
    ctx.globalCompositeOperation = "destination-out";
    const top = bandTop(pass);
    const step = 3;
    for (let x = x0; x < x1; x += step) {
      const w = Math.min(step + 1, x1 - x + 1);
      const wob = wobble(pass, x);
      const y0 = top + wob;
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(x, y0, w, bandH);

      // dry-brush fringe on the top and bottom edges
      for (let k = 0; k < 3; k++) {
        const r = 0.6 + Math.random() * 2.4;
        ctx.fillStyle = `rgba(0,0,0,${0.35 + Math.random() * 0.65})`;
        ctx.beginPath();
        ctx.arc(x + Math.random() * w, y0 - Math.random() * 7, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + Math.random() * w, y0 + bandH + Math.random() * 7, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  /** x-range covered by a pass at local progress t (0 → 1). */
  const passSpan = (pass: number, t: number) => {
    const travel = width + 40;
    const leftToRight = pass % 2 === 0;
    const head = -20 + travel * t;
    return leftToRight ? { from: -20, to: head } : { from: width + 20 - (head + 20), to: width + 20 };
  };

  const placeRoller = (progress: number) => {
    if (progress <= 0 || progress >= 1) {
      roller.style.opacity = "0";
      return;
    }
    const scaled = progress * passes;
    const pass = Math.min(passes - 1, Math.floor(scaled));
    const t = scaled - pass;
    const leftToRight = pass % 2 === 0;
    const scale = bandH / ROLLER_H;
    const rw = ROLLER_W * scale;
    const rh = ROLLER_H * scale;
    const headW = (ROLLER_W - HEAD_LEFT) * scale;
    const span = passSpan(pass, t);
    const leading = leftToRight ? span.to : span.from;
    const y = bandTop(pass) + wobble(pass, leading) + bandH / 2 - rh / 2;
    // head's outer edge rides slightly past the painted edge so the seam is hidden
    const x = leftToRight ? leading - rw + headW * 0.55 : leading - headW * 0.45;
    // a little roll/bounce, like a hand pushing it
    const tilt = Math.sin(t * Math.PI * 6) * 0.8;
    roller.style.opacity = "1";
    roller.style.transform = `translate3d(${x}px, ${y}px, 0) scaleX(${leftToRight ? 1 : -1}) rotate(${tilt}deg)`;
  };

  function render(progress: number) {
    if (done) return;
    const p = Math.max(0, Math.min(1, progress));
    if (width === 0) {
      lastProgress = p;
      return;
    }

    // paint every pass segment between the last and the current progress
    for (let pass = 0; pass < passes; pass++) {
      const a = Math.max(0, Math.min(1, lastProgress * passes - pass));
      const b = Math.max(0, Math.min(1, p * passes - pass));
      if (b <= a) continue;
      const spanA = passSpan(pass, a);
      const spanB = passSpan(pass, b);
      if (pass % 2 === 0) stroke(pass, spanA.to - 4, spanB.to);
      else stroke(pass, spanB.from, spanA.from + 4);
    }

    lastProgress = p;
    placeRoller(p);

    if (p >= 1) {
      finish();
    }
  }

  function finish() {
    if (done) return;
    done = true;
    roller.style.opacity = "0";
    canvas.style.transition = "opacity 0.5s ease";
    canvas.style.opacity = "0";
    window.setTimeout(() => {
      canvas.style.display = "none";
      roller.style.display = "none";
    }, 520);
    onDone?.();
  }

  const ro = new ResizeObserver(() => {
    if (!done) setup();
  });
  ro.observe(canvas);
  setup();

  return {
    render,
    finish,
    destroy: () => ro.disconnect(),
  };
}
