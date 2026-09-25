/**
 * Hero atmosphere — a lightweight canvas layer that renders:
 *  - floating studio dust motes caught in the key light (depth-sorted, soft bokeh)
 *  - a handful of large out-of-focus pigment bokeh discs in the Akshara palette
 *
 * Particles drift with the mouse (parallax by depth) and get "stirred" by scroll
 * velocity so the air in the studio reacts when the user scrubs the 3D film.
 * Desktop only. Pauses itself when off-screen or when the tab is hidden.
 */

type Mote = {
  x: number;
  y: number;
  z: number; // 0 = far, 1 = near
  r: number;
  vx: number;
  vy: number;
  phase: number;
  twinkle: number;
  hue: "dust" | "blue" | "orange" | "gold" | "rose";
};

const PIGMENTS: Record<Exclude<Mote["hue"], "dust">, [number, number, number]> = {
  blue: [31, 79, 160],
  orange: [240, 83, 35],
  gold: [245, 181, 46],
  rose: [226, 64, 110],
};

export type HeroAtmosphere = {
  setPointer: (nx: number, ny: number) => void;
  stir: (velocity: number) => void;
  destroy: () => void;
};

export function createHeroAtmosphere(canvas: HTMLCanvasElement): HeroAtmosphere {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) {
    return { setPointer: () => {}, stir: () => {}, destroy: () => {} };
  }

  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let running = false;
  let visible = true;
  let last = performance.now();

  // pointer (smoothed)
  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;

  // scroll energy (decays)
  let energy = 0;

  const motes: Mote[] = [];

  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  const spawn = (initial: boolean): Mote => {
    const pigmentRoll = Math.random();
    const isBokeh = pigmentRoll < 0.11;
    const hue: Mote["hue"] = isBokeh
      ? (["blue", "orange", "gold", "rose"] as const)[Math.floor(Math.random() * 4)]
      : "dust";
    const z = isBokeh ? rand(0.75, 1) : Math.pow(Math.random(), 1.6);
    return {
      x: rand(0, width),
      y: initial ? rand(0, height) : height + rand(10, 60),
      z,
      r: isBokeh ? rand(26, 64) : 0.5 + z * 2.4,
      vx: rand(-4, 4),
      vy: -(isBokeh ? rand(2, 5) : rand(4, 14) * (0.4 + z)),
      phase: rand(0, Math.PI * 2),
      twinkle: rand(0.6, 1.6),
      hue,
    };
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.round(Math.min(120, Math.max(55, (width * height) / 14000)));
    while (motes.length < target) motes.push(spawn(true));
    motes.length = target;
  };

  const draw = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    px += (tx - px) * 0.06;
    py += (ty - py) * 0.06;
    energy *= 0.94;

    ctx.clearRect(0, 0, width, height);

    // far → near so near particles overlap
    motes.sort((a, b) => a.z - b.z);

    for (const m of motes) {
      const boost = 1 + energy * (0.6 + m.z * 1.6);
      m.phase += dt * m.twinkle;
      m.x += (m.vx + Math.sin(m.phase) * 6 * (0.3 + m.z)) * dt * boost;
      m.y += m.vy * dt * boost;

      if (m.y < -80 || m.x < -90 || m.x > width + 90) {
        Object.assign(m, spawn(false));
      }

      const parallax = 10 + m.z * 38;
      const x = m.x + px * parallax;
      const y = m.y + py * parallax * 0.7;

      if (m.hue === "dust") {
        // dust is brightest inside the key-light cone (upper centre-right of the frame)
        const lx = (x / width - 0.58) / 0.42;
        const ly = (y / height - 0.4) / 0.55;
        const inLight = Math.max(0, 1 - Math.sqrt(lx * lx + ly * ly));
        const flicker = 0.55 + 0.45 * Math.sin(m.phase * 2.3);
        const alpha = (0.1 + inLight * 0.7) * flicker * (0.35 + m.z * 0.65);
        if (alpha < 0.02) continue;

        const r = m.r * (m.z > 0.8 ? 2.2 : 1);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.2);
        g.addColorStop(0, `rgba(255, 252, 244, ${alpha})`);
        g.addColorStop(0.45, `rgba(255, 246, 230, ${alpha * 0.45})`);
        g.addColorStop(1, "rgba(255, 246, 230, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const [r, gC, b] = PIGMENTS[m.hue];
        const alpha = 0.075 + 0.04 * Math.sin(m.phase);
        const g = ctx.createRadialGradient(x, y, m.r * 0.15, x, y, m.r);
        g.addColorStop(0, `rgba(${r}, ${gC}, ${b}, ${alpha * 1.2})`);
        g.addColorStop(0.7, `rgba(${r}, ${gC}, ${b}, ${alpha})`);
        g.addColorStop(0.92, `rgba(${r}, ${gC}, ${b}, ${alpha * 1.35})`); // lens bokeh rim
        g.addColorStop(1, `rgba(${r}, ${gC}, ${b}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (running) raf = requestAnimationFrame(draw);
  };

  const start = () => {
    if (running || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(draw);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    },
    { threshold: 0 }
  );
  io.observe(canvas);

  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  start();

  return {
    setPointer: (nx, ny) => {
      tx = nx;
      ty = ny;
    },
    stir: (velocity) => {
      energy = Math.min(3.5, energy + Math.abs(velocity) / 1400);
    },
    destroy: () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    },
  };
}
