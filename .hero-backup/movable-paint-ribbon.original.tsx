import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * MovablePaintRibbon Component
 * 
 * High-performance, physics-based interactive architectural paint ribbon.
 * Features:
 *  1. Autonomous organic fluid wave undulation (living liquid paint).
 *  2. Interactive pointer drag & pull (elastic spring physics).
 *  3. Dynamic hover wake & ripples.
 *  4. Hardware-accelerated 60/120fps direct SVG path mutation without React re-renders.
 */
export function MovablePaintRibbon({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG Path references for 60fps direct DOM updates
  const shadowPathRef = useRef<SVGPathElement>(null);
  const bodyPathRef = useRef<SVGPathElement>(null);
  const bristleAPathRef = useRef<SVGPathElement>(null);
  const bristleBPathRef = useRef<SVGPathElement>(null);
  const glossPathRef = useRef<SVGPathElement>(null);
  const ridgePathRef = useRef<SVGPathElement>(null);
  const whispLeft1Ref = useRef<SVGPathElement>(null);
  const whispLeft2Ref = useRef<SVGPathElement>(null);
  const whispLeft3Ref = useRef<SVGPathElement>(null);
  const whispLeft4Ref = useRef<SVGPathElement>(null);
  const whispRight1Ref = useRef<SVGPathElement>(null);
  const whispRight2Ref = useRef<SVGPathElement>(null);
  const whispRight3Ref = useRef<SVGPathElement>(null);

  // Interactive Physics State (kept in refs for zero-overhead animation loop)
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef<{ x: number; y: number; svgX: number }>({ x: 0, y: 0, svgX: 720 });
  const dragXRef = useRef(720);
  const currentDragYRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const wavePhaseRef = useRef(0);
  const isHoveredRef = useRef(false);
  const mouseXRef = useRef(720);
  const ripplesRef = useRef<Array<{ originX: number; startTime: number; amp: number }>>([]);
  const [isCurrentlyDragging, setIsCurrentlyDragging] = useState(false);

  // Base Curve Geometry (viewBox: 0 0 1440 110)
  // Top curve control points
  const topBase = useRef({
    p0: { x: -20, y: 53 },
    c0a: { x: 100, y: 19 },
    c0b: { x: 190, y: 12 },
    p1: { x: 270, y: 12 },
    c1a: { x: 420, y: 12 },
    c1b: { x: 540, y: 73 },
    p2: { x: 720, y: 73 },
    c2a: { x: 900, y: 73 },
    c2b: { x: 1010, y: 15 },
    p3: { x: 1170, y: 15 },
    c3a: { x: 1280, y: 15 },
    c3b: { x: 1380, y: 48 },
    p4: { x: 1460, y: 56 },
  });

  // Bottom curve control points (reverse direction: right to left)
  const botBase = useRef({
    p4: { x: 1460, y: 68 },
    c3b: { x: 1380, y: 60 },
    c3a: { x: 1280, y: 33 },
    p3: { x: 1170, y: 33 },
    c2b: { x: 1010, y: 33 },
    c2a: { x: 900, y: 103 },
    p2: { x: 720, y: 103 },
    c1b: { x: 540, y: 103 },
    c1a: { x: 420, y: 26 },
    p1: { x: 270, y: 26 },
    c0b: { x: 190, y: 26 },
    c0a: { x: 100, y: 33 },
    p0: { x: -20, y: 65 },
  });

  // Main animation and physics loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap delta time to avoid jumps
      lastTime = now;
      const t = now / 1000;

      // 1. Update Spring Physics for Drag Displacement
      if (!isDraggingRef.current) {
        const springK = 85; // spring stiffness
        const damping = 8.5; // damping ratio
        const force = -springK * currentDragYRef.current - damping * dragVelocityRef.current;
        dragVelocityRef.current += force * dt;
        currentDragYRef.current += dragVelocityRef.current * dt;

        // Clean up when almost stationary
        if (Math.abs(currentDragYRef.current) < 0.05 && Math.abs(dragVelocityRef.current) < 0.05) {
          currentDragYRef.current = 0;
          dragVelocityRef.current = 0;
        }
      }

      // 2. Clean up expired ripples
      ripplesRef.current = ripplesRef.current.filter((r) => now - r.startTime < 2000);

      // 3. Displacement function for any x coordinate
      const getDy = (x: number): number => {
        // Natural ambient liquid wave undulation
        const ambient =
          Math.sin(t * 1.6 + x * 0.0032 + wavePhaseRef.current) * 7.5 +
          Math.cos(t * 1.1 + x * 0.002) * 4.2;

        // Pointer drag deformation (bell curve around drag point)
        const dragDist = Math.abs(x - dragXRef.current);
        const dragInfluence = Math.exp(-Math.pow(dragDist / 420, 2));
        const drag = currentDragYRef.current * dragInfluence;

        // Hover reactive wake (subtle pull towards cursor)
        let hover = 0;
        if (isHoveredRef.current && !isDraggingRef.current) {
          const hoverDist = Math.abs(x - mouseXRef.current);
          const hoverInfluence = Math.exp(-Math.pow(hoverDist / 280, 2));
          hover = Math.sin(t * 3.5 + x * 0.008) * 3.2 * hoverInfluence;
        }

        // Active fluid ripples
        let ripples = 0;
        for (const ripple of ripplesRef.current) {
          const elapsed = (now - ripple.startTime) / 1000;
          const dist = Math.abs(x - ripple.originX);
          const waveFront = elapsed * 750; // ripple speed: 750px/sec
          const waveDist = Math.abs(dist - waveFront);
          if (waveDist < 160) {
            const decay = Math.exp(-elapsed * 2.2);
            const pulse = Math.cos((dist - waveFront) * 0.035) * Math.exp(-Math.pow(waveDist / 70, 2));
            ripples += pulse * ripple.amp * decay;
          }
        }

        return ambient + drag + hover + ripples;
      };

      // Format point with displacement
      const pt = (basePt: { x: number; y: number }, extraY = 0) => {
        const dy = getDy(basePt.x);
        return `${basePt.x.toFixed(1)},${(basePt.y + dy + extraY).toFixed(1)}`;
      };

      const top = topBase.current;
      const bot = botBase.current;

      // ── UPDATE MAIN RIBBON BODY PATH ──
      if (bodyPathRef.current) {
        const bodyD = `M ${pt(top.p0)} C ${pt(top.c0a)} ${pt(top.c0b)} ${pt(top.p1)} C ${pt(top.c1a)} ${pt(top.c1b)} ${pt(top.p2)} C ${pt(top.c2a)} ${pt(top.c2b)} ${pt(top.p3)} C ${pt(top.c3a)} ${pt(top.c3b)} ${pt(top.p4)} L ${pt(bot.p4)} C ${pt(bot.c3b)} ${pt(bot.c3a)} ${pt(bot.p3)} C ${pt(bot.c2b)} ${pt(bot.c2a)} ${pt(bot.p2)} C ${pt(bot.c1b)} ${pt(bot.c1a)} ${pt(bot.p1)} C ${pt(bot.c0b)} ${pt(bot.c0a)} ${pt(bot.p0)} Z`;
        bodyPathRef.current.setAttribute("d", bodyD);
      }

      // ── UPDATE DEEP BLURRED DROP SHADOW ──
      if (shadowPathRef.current) {
        const shadowD = `M ${pt({ x: -20, y: 62 }, 6)} C ${pt({ x: 100, y: 26 }, 6)} ${pt({ x: 190, y: 20 }, 6)} ${pt({ x: 270, y: 20 }, 6)} C ${pt({ x: 420, y: 20 }, 6)} ${pt({ x: 540, y: 94 }, 6)} ${pt({ x: 720, y: 94 }, 6)} C ${pt({ x: 900, y: 94 }, 6)} ${pt({ x: 1020, y: 26 }, 6)} ${pt({ x: 1170, y: 26 }, 6)} C ${pt({ x: 1280, y: 26 }, 6)} ${pt({ x: 1380, y: 56 }, 6)} ${pt({ x: 1460, y: 68 }, 6)}`;
        shadowPathRef.current.setAttribute("d", shadowD);
      }

      // ── UPDATE BRISTLE FILAMENT LAYER A (Deep Sienna) ──
      if (bristleAPathRef.current) {
        const bristleAD = `M ${pt({ x: -15, y: 59 })} C ${pt({ x: 102, y: 23 })} ${pt({ x: 192, y: 18 })} ${pt({ x: 270, y: 18 })} C ${pt({ x: 420, y: 18 })} ${pt({ x: 540, y: 86 })} ${pt({ x: 720, y: 86 })} C ${pt({ x: 900, y: 86 })} ${pt({ x: 1015, y: 22 })} ${pt({ x: 1170, y: 22 })} C ${pt({ x: 1280, y: 22 })} ${pt({ x: 1380, y: 54 })} ${pt({ x: 1455, y: 62 })}`;
        bristleAPathRef.current.setAttribute("d", bristleAD);
      }

      // ── UPDATE BRISTLE FILAMENT LAYER B (Mid Terracotta) ──
      if (bristleBPathRef.current) {
        const bristleBD = `M ${pt({ x: -10, y: 61 })} C ${pt({ x: 104, y: 25 })} ${pt({ x: 194, y: 22 })} ${pt({ x: 270, y: 22 })} C ${pt({ x: 420, y: 22 })} ${pt({ x: 540, y: 92 })} ${pt({ x: 720, y: 92 })} C ${pt({ x: 900, y: 92 })} ${pt({ x: 1015, y: 27 })} ${pt({ x: 1170, y: 27 })} C ${pt({ x: 1280, y: 27 })} ${pt({ x: 1380, y: 58 })} ${pt({ x: 1450, y: 65 })}`;
        bristleBPathRef.current.setAttribute("d", bristleBD);
      }

      // ── UPDATE TOP CREST SPECULAR HIGHLIGHT ──
      if (glossPathRef.current) {
        const glossD = `M ${pt({ x: 50, y: 42 })} C ${pt({ x: 120, y: 21 })} ${pt({ x: 195, y: 14 })} ${pt({ x: 270, y: 14 })} C ${pt({ x: 420, y: 14 })} ${pt({ x: 540, y: 75 })} ${pt({ x: 720, y: 75 })} C ${pt({ x: 900, y: 75 })} ${pt({ x: 1012, y: 17 })} ${pt({ x: 1170, y: 17 })} C ${pt({ x: 1280, y: 17 })} ${pt({ x: 1360, y: 38 })} ${pt({ x: 1420, y: 52 })}`;
        glossPathRef.current.setAttribute("d", glossD);
      }

      // ── UPDATE RAZOR-SHARP RIDGE CORE LIGHT ──
      if (ridgePathRef.current) {
        const ridgeD = `M ${pt({ x: 120, y: 31 })} C ${pt({ x: 170, y: 18 })} ${pt({ x: 220, y: 14 })} ${pt({ x: 270, y: 14 })} C ${pt({ x: 380, y: 14 })} ${pt({ x: 500, y: 60 })} ${pt({ x: 620, y: 75 })} M ${pt({ x: 820, y: 75 })} C ${pt({ x: 940, y: 60 })} ${pt({ x: 1060, y: 18 })} ${pt({ x: 1170, y: 18 })} C ${pt({ x: 1240, y: 18 })} ${pt({ x: 1300, y: 28 })} ${pt({ x: 1360, y: 40 })}`;
        ridgePathRef.current.setAttribute("d", ridgeD);
      }

      // ── UPDATE ENTRY & EXIT WHISPS ──
      if (whispLeft1Ref.current) whispLeft1Ref.current.setAttribute("d", `M ${pt({ x: -25, y: 48 })} C ${pt({ x: 15, y: 48 })} ${pt({ x: 55, y: 42 })} ${pt({ x: 95, y: 35 })}`);
      if (whispLeft2Ref.current) whispLeft2Ref.current.setAttribute("d", `M ${pt({ x: -20, y: 54 })} C ${pt({ x: 20, y: 52 })} ${pt({ x: 60, y: 46 })} ${pt({ x: 105, y: 38 })}`);
      if (whispLeft3Ref.current) whispLeft3Ref.current.setAttribute("d", `M ${pt({ x: -30, y: 62 })} C ${pt({ x: 10, y: 64 })} ${pt({ x: 50, y: 58 })} ${pt({ x: 90, y: 48 })}`);
      if (whispLeft4Ref.current) whispLeft4Ref.current.setAttribute("d", `M ${pt({ x: -15, y: 70 })} C ${pt({ x: 25, y: 72 })} ${pt({ x: 65, y: 65 })} ${pt({ x: 110, y: 55 })}`);

      if (whispRight1Ref.current) whispRight1Ref.current.setAttribute("d", `M ${pt({ x: 1370, y: 44 })} C ${pt({ x: 1400, y: 48 })} ${pt({ x: 1430, y: 54 })} ${pt({ x: 1465, y: 60 })}`);
      if (whispRight2Ref.current) whispRight2Ref.current.setAttribute("d", `M ${pt({ x: 1385, y: 48 })} C ${pt({ x: 1410, y: 52 })} ${pt({ x: 1435, y: 58 })} ${pt({ x: 1460, y: 64 })}`);
      if (whispRight3Ref.current) whispRight3Ref.current.setAttribute("d", `M ${pt({ x: 1400, y: 54 })} C ${pt({ x: 1420, y: 58 })} ${pt({ x: 1445, y: 64 })} ${pt({ x: 1470, y: 70 })}`);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Map pointer client coordinates to SVG coordinate space (1440x110)
  const getSvgPoint = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 720, y: 55 };
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(-50, Math.min(1490, ((clientX - rect.left) / rect.width) * 1440));
    const y = Math.max(0, Math.min(110, ((clientY - rect.top) / rect.height) * 110));
    return { x, y };
  }, []);

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    setIsCurrentlyDragging(true);
    setHasInteracted(true);

    const svgPt = getSvgPoint(e.clientX, e.clientY);
    pointerStartRef.current = { x: e.clientX, y: e.clientY, svgX: svgPt.x };
    dragXRef.current = svgPt.x;
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const svgPt = getSvgPoint(e.clientX, e.clientY);
    mouseXRef.current = svgPt.x;

    if (isDraggingRef.current) {
      // Calculate delta in pixels
      const deltaY = e.clientY - pointerStartRef.current.y;
      const deltaX = e.clientX - pointerStartRef.current.x;

      // Drag displacement clamped to safe physical limits (±45px)
      currentDragYRef.current = Math.max(-45, Math.min(45, deltaY * 0.7));

      // Horizontal dragging moves wave phase
      wavePhaseRef.current += deltaX * 0.0004;

      // Slightly shift drag anchor point along cursor
      dragXRef.current = svgPt.x;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsCurrentlyDragging(false);

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore if already released
      }

      // Trigger release ripple pulse based on drag intensity
      if (Math.abs(currentDragYRef.current) > 3) {
        ripplesRef.current.push({
          originX: dragXRef.current,
          startTime: performance.now(),
          amp: Math.max(5, Math.min(20, Math.abs(currentDragYRef.current) * 0.6)),
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerEnter={() => {
        isHoveredRef.current = true;
      }}
      onPointerLeave={() => {
        isHoveredRef.current = false;
      }}
      className={`relative w-full overflow-hidden select-none bg-transparent -mb-1 touch-none group ${
        isCurrentlyDragging ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
      aria-label="Architectural paint wave"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1440 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-22 lg:h-28 block pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          {/* Main Gradient: Terracotta Crimson -> Birla Opus Orange -> Golden Amber */}
          <linearGradient id="movableRibbonBodyGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#C2410C" stopOpacity="0.8" />
            <stop offset="10%" stopColor="#D9531E" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#EA580C" stopOpacity="1" />
            <stop offset="50%" stopColor="#EB6014" stopOpacity="1" />
            <stop offset="70%" stopColor="#F97316" stopOpacity="0.98" />
            <stop offset="85%" stopColor="#F59E0B" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FB923C" stopOpacity="0.8" />
          </linearGradient>

          {/* Top Gloss Highlight Gradient */}
          <linearGradient id="movableRibbonGlossGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.25" />
            <stop offset="20%" stopColor="#FFF7ED" stopOpacity="0.85" />
            <stop offset="48%" stopColor="#FFEDD5" stopOpacity="0.7" />
            <stop offset="78%" stopColor="#FEF08A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FED7AA" stopOpacity="0.3" />
          </linearGradient>

          {/* Deep Warm Shadow Gradient */}
          <linearGradient id="movableRibbonShadowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C2D12" stopOpacity="0.12" />
            <stop offset="25%" stopColor="#9A3412" stopOpacity="0.25" />
            <stop offset="55%" stopColor="#C2410C" stopOpacity="0.3" />
            <stop offset="85%" stopColor="#EA580C" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.08" />
          </linearGradient>

          {/* Soft Diffuse Shadow Filter */}
          <filter id="movableRibbonDropShadow" x="-5%" y="-30%" width="110%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Deep Soft Blurred Underbody Drop Shadow (Offset dy=6) */}
        <path
          ref={shadowPathRef}
          d="M -20,68 C 100,32 190,26 270,26 C 420,26 540,100 720,100 C 900,100 1020,32 1170,32 C 1280,32 1380,62 1460,74"
          stroke="url(#movableRibbonShadowGrad)"
          strokeWidth="28"
          strokeLinecap="round"
          filter="url(#movableRibbonDropShadow)"
          opacity="0.75"
        />

        {/* 2. Main Filled Dynamic Ribbon Body */}
        <path
          ref={bodyPathRef}
          d="M -20,53 C 100,19 190,12 270,12 C 420,12 540,73 720,73 C 900,73 1010,15 1170,15 C 1280,15 1380,48 1460,56 L 1460,68 C 1380,60 1280,33 1170,33 C 1010,33 900,103 720,103 C 540,103 420,26 270,26 C 190,26 100,33 -20,65 Z"
          fill="url(#movableRibbonBodyGrad)"
        />

        {/* 3. Authentic Bristle Filaments (Layer A: Deep Sienna Grain) */}
        <path
          ref={bristleAPathRef}
          d="M -15,59 C 102,23 192,18 270,18 C 420,18 540,86 720,86 C 900,86 1015,22 1170,22 C 1280,22 1380,54 1455,62"
          stroke="#9A3412"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* 4. Authentic Bristle Filaments (Layer B: Mid Terracotta) */}
        <path
          ref={bristleBPathRef}
          d="M -10,61 C 104,25 194,22 270,22 C 420,22 540,92 720,92 C 900,92 1015,27 1170,27 C 1280,27 1380,58 1450,65"
          stroke="#C2410C"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* 5. Top Crest Specular Highlight (Fresh Wet Paint Luminous Sheen) */}
        <path
          ref={glossPathRef}
          d="M 50,42 C 120,21 195,14 270,14 C 420,14 540,75 720,75 C 900,75 1012,17 1170,17 C 1280,17 1360,38 1420,52"
          stroke="url(#movableRibbonGlossGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 6. Razor-Sharp Fine Ridge Core Light */}
        <path
          ref={ridgePathRef}
          d="M 120,31 C 170,18 220,14 270,14 C 380,14 500,60 620,75 M 820,75 C 940,60 1060,18 1170,18 C 1240,18 1300,28 1360,40"
          stroke="#FFF7ED"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* 7. Flared Dry-Brush Whisps on Left Entry */}
        <path ref={whispLeft1Ref} d="M -25,48 C 15,48 55,42 95,35" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <path ref={whispLeft2Ref} d="M -20,54 C 20,52 60,46 105,38" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path ref={whispLeft3Ref} d="M -30,62 C 10,64 50,58 90,48" stroke="#D9531E" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
        <path ref={whispLeft4Ref} d="M -15,70 C 25,72 65,65 110,55" stroke="#9A3412" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />

        {/* 8. Tapered Brush Exit Whisps on Right Edge */}
        <path ref={whispRight1Ref} d="M 1370,44 C 1400,48 1430,54 1465,60" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path ref={whispRight2Ref} d="M 1385,48 C 1410,52 1435,58 1460,64" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <path ref={whispRight3Ref} d="M 1400,54 C 1420,58 1445,64 1470,70" stroke="#FB923C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    </div>
  );
}
