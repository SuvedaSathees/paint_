import { useState, useRef, useCallback, useEffect } from "react";
import { Paintbrush, CheckCircle2, MoveHorizontal, RefreshCw } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  title?: string;
  subtitle?: string;
}

export function BeforeAfterSlider({
  beforeImage = "/akshara-before-room.jpg",
  afterImage = "/akshara-after-room.jpg",
  title = "Real Room Transformation",
  subtitle = "Drag the brush across to compare moisture-damaged weathered plaster with an immaculate 2-coat Birla Opus Baby Rose luxury finish.",
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const clampedPercentage = Math.max(2, Math.min(98, (x / width) * 100));
    setSliderPos(clampedPercentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(5, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(95, prev + 5));
    }
  };

  return (
    <section className="pt-[50px] pb-[50px] px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full">
      {/* Header matching reference aesthetic */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent block mb-2">
          &mdash; PROVEN SURFACE EXCELLENCE &mdash;
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-primary">
          {title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground tracking-wide leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Main Interactive Comparison Card */}
      <div className="relative rounded-3xl border border-primary/15 bg-card/60 p-4 sm:p-7 shadow-2xl backdrop-blur-sm">
        {/* Comparison Stage Container */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Before and after transformation slider"
          className="relative aspect-[16/9] w-full max-h-[640px] overflow-hidden rounded-2xl shadow-inner select-none cursor-ew-resize touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {/* 1. Base Layer: BEFORE AKSHARA (Full frame) */}
          <div className="absolute inset-0 w-full h-full bg-stone-900">
            <img
              src={beforeImage}
              alt="Living room before painting - worn out peeling wall with damp stains"
              className="w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />
            {/* Dark vignette gradient for cinematic feel */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>

          {/* 2. Top Clipped Layer: AFTER AKSHARA (Revealed from sliderPos to right) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-none"
            style={{
              clipPath: `inset(0 0 0 ${sliderPos}%)`,
            }}
          >
            <img
              src={afterImage}
              alt="Living room after painting with Birla Opus luxury emulsion - pristine satin baby rose walls"
              className="w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          </div>

          {/* 3. Badges */}
          {/* "BEFORE AKSHARA" Badge (pinned to top-left) */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none">
            <div className="flex items-center gap-2 rounded-full bg-black/75 backdrop-blur-md px-4 py-1.5 border border-white/20 text-white shadow-xl">
              <span className="size-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider">
                Before Akshara
              </span>
              <span className="hidden md:inline text-[0.65rem] text-white/70 font-normal">
                (Damp &amp; Peeling)
              </span>
            </div>
          </div>

          {/* "AFTER AKSHARA" Badge (pinned to top-right) */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 pointer-events-none">
            <div className="flex items-center gap-2 rounded-full bg-primary/90 backdrop-blur-md px-4 py-1.5 border border-white/25 text-white shadow-xl">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider text-white">
                After Akshara
              </span>
              <span className="hidden md:inline text-[0.65rem] text-white/85 font-normal">
                (Birla Opus Luxury)
              </span>
            </div>
          </div>

          {/* 4. Draggable Divider Line & Brush Handle */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{
              left: `${sliderPos}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* Vertical Line */}
            <div className="h-full w-[2.5px] bg-gradient-to-b from-white/90 via-accent to-white/90 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

            {/* Brush Drag Handle Button */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex items-center justify-center">
              <div className="group/handle relative flex items-center justify-center size-12 sm:size-14 rounded-full bg-gradient-to-br from-white via-stone-100 to-amber-100 text-stone-900 border-2 border-accent shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-transform duration-150 hover:scale-110 active:scale-95">
                {/* Horizontal Drag Arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-1.5 text-stone-400">
                  <span className="text-[0.6rem] font-bold select-none">&lt;</span>
                  <span className="text-[0.6rem] font-bold select-none">&gt;</span>
                </div>

                {/* Center Brush Icon */}
                <div className="flex flex-col items-center justify-center">
                  <Paintbrush className="size-5 text-accent fill-accent/20" />
                </div>

                {/* Subtle outer pulsing ring */}
                <div className="absolute inset-0 rounded-full border-2 border-accent/50 animate-ping opacity-40 pointer-events-none" />
              </div>
            </div>

            {/* Drag Cue Bubble under brush */}
            <div className="absolute top-[calc(50%+36px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/80 backdrop-blur-md px-3 py-1 text-[0.62rem] sm:text-[0.68rem] font-semibold text-white/90 border border-white/20 shadow-lg pointer-events-none">
              Drag brush to paint
            </div>
          </div>
        </div>

        {/* Quick Transformation Highlights */}
        <div className="mt-6 pt-5 border-t border-primary/10">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
            <div className="inline-flex items-center gap-2.5 rounded-2xl bg-secondary/60 hover:bg-secondary/90 px-4 py-2.5 border border-primary/10 shadow-xs transition-all hover:scale-[1.02]">
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <div className="text-left">
                <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-primary leading-tight">
                  Teflon™ Shield
                </span>
                <span className="block text-[0.62rem] text-muted-foreground leading-tight mt-0.5">
                  Stains wipe off easily
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2.5 rounded-2xl bg-secondary/60 hover:bg-secondary/90 px-4 py-2.5 border border-primary/10 shadow-xs transition-all hover:scale-[1.02]">
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <div className="text-left">
                <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-primary leading-tight">
                  100k Scrub Life
                </span>
                <span className="block text-[0.62rem] text-muted-foreground leading-tight mt-0.5">
                  High abrasion tested
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2.5 rounded-2xl bg-secondary/60 hover:bg-secondary/90 px-4 py-2.5 border border-primary/10 shadow-xs transition-all hover:scale-[1.02]">
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <div className="text-left">
                <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-primary leading-tight">
                  Micro-Crack Seal
                </span>
                <span className="block text-[0.62rem] text-muted-foreground leading-tight mt-0.5">
                  Flawless plaster hide
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2.5 rounded-2xl bg-secondary/60 hover:bg-secondary/90 px-4 py-2.5 border border-primary/10 shadow-xs transition-all hover:scale-[1.02]">
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <div className="text-left">
                <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-primary leading-tight">
                  Zero Odor VOC
                </span>
                <span className="block text-[0.62rem] text-muted-foreground leading-tight mt-0.5">
                  Move-in same evening
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
