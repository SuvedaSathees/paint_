import React, { useState, useEffect, useRef } from "react";

const BIRLA_ORANGE = {
  hex: "#f26522",
  glow: "rgba(242, 101, 34, 0.65)",
};

export function FooterPaintRoller() {
  const activeShade = BIRLA_ORANGE;
  // Start from 100% (right side) and roll towards 0% (left side)
  const [pos, setPos] = useState<number>(100);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [rollAngle, setRollAngle] = useState<number>(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Trigger auto-paint when scrolled into view (or short fallback timer)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted && !hasFinished) {
          setHasStarted(true);
          lastTimeRef.current = performance.now();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    // Fallback: start automatically after 1s if in view
    const timer = setTimeout(() => {
      if (!hasStarted && !hasFinished) {
        setHasStarted(true);
        lastTimeRef.current = performance.now();
      }
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [hasStarted, hasFinished]);

  // Rolling animation: Moves right-to-left (100% -> 0%), paints the line, and STOPS when done
  useEffect(() => {
    if (!hasStarted || hasFinished) return;

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      // Speed: ~22% per second (~4.5 seconds to paint entire border width)
      const speed = 22;

      setPos((prevPos) => {
        const nextPos = prevPos - speed * delta;
        if (nextPos <= 0) {
          setHasFinished(true); // STOP THE PROCESS COMPLETELY
          return 0;
        }
        return nextPos;
      });

      // Rotate roller cylinder backwards as it rolls right-to-left
      setRollAngle((prev) => (prev - speed * delta * 26) % 360);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, hasFinished]);

  // Replay animation on click
  const handleReplay = () => {
    setHasFinished(false);
    setPos(100);
    setHasStarted(true);
    lastTimeRef.current = performance.now();
  };

  return (
    <div className="relative w-full select-none -mb-1 z-30">
      {/* ── The Paint Roller Track & Painted Border ── */}
      <div
        ref={trackRef}
        onClick={handleReplay}
        className="relative w-full h-[46px] flex items-end pb-[2px] touch-none overflow-visible cursor-pointer group"
        title={hasFinished ? "Click to replay paint roller" : "Painting Birla Opus border..."}
      >
        {/* Base Track (Subtle translucent guide groove before being painted) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[4.5px] rounded-full transition-colors duration-500"
          style={{
            backgroundColor: `${activeShade.hex}22`,
          }}
        />

        {/* Painted Wet Color Coat (Grows from right edge to the roller's current position) */}
        <div
          className="absolute bottom-0 h-[4.5px] rounded-full transition-all duration-75 pointer-events-none"
          style={{
            left: `${Math.max(0, pos)}%`,
            right: 0,
            background: `linear-gradient(270deg, ${activeShade.hex}44 0%, ${activeShade.hex} 88%, #ffffff 100%)`,
            boxShadow: `0 0 16px ${activeShade.glow}, 0 2px 6px ${activeShade.glow}`,
          }}
        >
          {/* Fresh Gloss Sheen Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-transparent animate-pulse rounded-full" />
        </div>

        {/* Subtle Wet Paint Drips directly beneath the roller as it moves */}
        {!hasFinished && (
          <div
            className="absolute bottom-[-6px] transition-opacity duration-300 pointer-events-none"
            style={{
              left: `calc(${pos}% - 10px)`,
            }}
          >
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path
                d="M4 0C4 3 2.5 5 2.5 6.5C2.5 7.88 3.62 9 5 9C6.38 9 7.5 7.88 7.5 6.5C7.5 5 6 3 6 0H4Z"
                fill={activeShade.hex}
              />
              <circle cx="14" cy="4" r="2.2" fill={activeShade.hex} />
              <circle cx="17" cy="8" r="1.3" fill={activeShade.hex} opacity="0.8" />
            </svg>
          </div>
        )}

        {/* ── THE MINI ROLLER TOOL ── */}
        {/* 
            ORIENTATION & GEOMETRY (RIGHT TO LEFT MOVEMENT):
            - Moves from RIGHT (100%) to LEFT (0%).
            - Roller Cylinder is on the LEFT (leading edge on the line at y=42.5).
            - Metal wire curves up and to the RIGHT.
            - Ergonomic handle is on the RIGHT SIDE, trailing safely above the line!
            - When pos reaches 0, the entire line is painted and the animation STOPS.
        */}
        <div
          className={`absolute bottom-0 pointer-events-none transition-transform duration-75 ease-out ${
            hasFinished ? "transition-opacity duration-700 opacity-90" : "opacity-100"
          }`}
          style={{
            left: `${pos}%`,
            transform: "translateX(-20px)",
          }}
        >
          <div className="relative transition-transform duration-200">
            <svg
              width="72"
              height="46"
              viewBox="0 0 72 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
            >
              {/* 1. Metal Wire Arm: Curves from cylinder on left up to handle on right */}
              <path
                d="M 28 35 L 36 35 C 40 35 43 32 43 28 L 43 22 C 43 18 46 15 50 15 L 53 15"
                stroke="#94a3b8"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 28 35 L 36 35 C 40 35 43 32 43 28 L 43 22 C 43 18 46 15 50 15 L 53 15"
                stroke="#e2e8f0"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 2. Ergonomic Handle: Trailing on the RIGHT SIDE, elevated safely above line */}
              <rect x="53" y="11.5" width="16" height="7.5" rx="3.5" fill="#1c1917" />
              <rect x="56" y="10.5" width="2" height="9.5" rx="0.6" fill="#44403c" />
              <rect x="60" y="10.5" width="2" height="9.5" rx="0.6" fill="#44403c" />
              <rect x="64" y="10.5" width="2" height="9.5" rx="0.6" fill="#44403c" />
              {/* Chrome Ferrule Ring */}
              <rect x="51.5" y="12.5" width="2.5" height="5.5" rx="0.5" fill="#cbd5e1" />

              {/* 3. Plastic End Caps on Roller Cylinder */}
              <rect x="5" y="28" width="2" height="14" rx="1" fill="#475569" />
              <rect x="29" y="28" width="2" height="14" rx="1" fill="#475569" />

              {/* Central Axle Pin Wire */}
              <line x1="3" y1="35" x2="31" y2="35" stroke="#64748b" strokeWidth="1.5" />

              {/* 4. ROLLER SLEEVE CYLINDER (Birla Opus Orange) — ROLLING DIRECTLY ON THE LINE! */}
              <rect
                x="6"
                y="27.5"
                width="24"
                height="15"
                rx="4"
                fill={activeShade.hex}
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeOpacity="0.45"
              />

              {/* 3D Cylindrical Volume Shading */}
              <rect
                x="6"
                y="27.5"
                width="24"
                height="4.5"
                rx="2"
                fill="url(#rollerHighlight)"
                opacity="0.85"
              />
              <rect
                x="6"
                y="38"
                width="24"
                height="4.5"
                rx="2"
                fill="url(#rollerShadow)"
                opacity="0.45"
              />

              {/* Rotating Texture Lines (Animate backwards as roller moves right-to-left) */}
              <g opacity="0.6">
                <line
                  x1={10 + ((rollAngle % 360) / 360) * 8}
                  y1="28.5"
                  x2={8 + ((rollAngle % 360) / 360) * 8}
                  y2="41.5"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                />
                <line
                  x1={18 + ((rollAngle % 360) / 360) * 8}
                  y1="28.5"
                  x2={16 + ((rollAngle % 360) / 360) * 8}
                  y2="41.5"
                  stroke="#000000"
                  strokeWidth="1.2"
                  strokeOpacity="0.35"
                  strokeDasharray="2 2"
                />
              </g>

              {/* Wet Paint Contact Glow directly where the cylinder meets the line */}
              <ellipse
                cx="18"
                cy="42.5"
                rx="11"
                ry="2"
                fill={activeShade.hex}
                opacity="0.95"
              />
              <ellipse
                cx="18"
                cy="42.5"
                rx="8"
                ry="1"
                fill="#ffffff"
                opacity="0.85"
              />

              {/* Gradient Definitions for 3D Roller */}
              <defs>
                <linearGradient id="rollerHighlight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="rollerShadow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Trailing paint sparkles during rolling */}
            {!hasFinished && (
              <div
                className="absolute top-2 left-2 size-2 rounded-full animate-ping opacity-75 pointer-events-none"
                style={{ backgroundColor: activeShade.hex }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
