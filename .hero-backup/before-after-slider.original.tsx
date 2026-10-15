import { useState, useRef, useCallback } from "react";
import { Paintbrush, CheckCircle2 } from "lucide-react";

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
    if (containerRef.current) {
      try {
        containerRef.current.setPointerCapture(e.pointerId);
      } catch {
        // ignore fallback
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // ignore fallback
      }
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
    <section className="pt-8 sm:pt-[50px] pb-8 sm:pb-[50px] px-3 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
        <span className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.24em] text-accent block mb-1.5">
          &mdash; PROVEN SURFACE EXCELLENCE &mdash;
        </span>
        <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-primary">
          {title}
        </h2>
        <p className="mt-2 text-xs sm:text-sm md:text-base text-muted-foreground tracking-wide leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Main Interactive Comparison Card */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-primary/15 bg-card/75 p-3 sm:p-6 lg:p-7 shadow-xl backdrop-blur-sm">
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
          className="relative aspect-[4/3] sm:aspect-[16/9] w-full max-h-[600px] overflow-hidden rounded-xl sm:rounded-2xl shadow-inner select-none cursor-ew-resize touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
          <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-5 z-20 pointer-events-none">
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-1 sm:px-4 sm:py-1.5 border border-white/20 text-white shadow-lg">
              <span className="size-1.5 sm:size-2 rounded-full bg-red-400 animate-pulse shrink-0" />
              <span className="text-[0.6rem] sm:text-xs font-bold uppercase tracking-wider">
                Before
              </span>
              <span className="hidden sm:inline text-[0.65rem] text-white/70 font-normal">
                (Damp &amp; Peeling)
              </span>
            </div>
          </div>

          {/* "AFTER AKSHARA" Badge (pinned to top-right) */}
          <div className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 z-20 pointer-events-none">
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-primary/95 backdrop-blur-md px-2.5 py-1 sm:px-4 sm:py-1.5 border border-white/25 text-white shadow-lg">
              <span className="size-1.5 sm:size-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[0.6rem] sm:text-xs font-bold uppercase tracking-wider text-white">
                After
              </span>
              <span className="hidden sm:inline text-[0.65rem] text-white/85 font-normal">
                (Birla Opus)
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
            <div className="h-full w-[2px] sm:w-[2.5px] bg-gradient-to-b from-white/90 via-accent to-white/90 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

            {/* Brush Drag Handle Button */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex items-center justify-center">
              <div className="group/handle relative flex items-center justify-center size-10 sm:size-14 rounded-full bg-gradient-to-br from-white via-stone-100 to-amber-100 text-stone-900 border-2 border-accent shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-transform duration-150 hover:scale-105 active:scale-95">
                {/* Horizontal Drag Arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-1 sm:px-1.5 text-stone-400">
                  <span className="text-[0.55rem] sm:text-[0.65rem] font-bold select-none">&lt;</span>
                  <span className="text-[0.55rem] sm:text-[0.65rem] font-bold select-none">&gt;</span>
                </div>

                {/* Center Brush Icon */}
                <div className="flex flex-col items-center justify-center">
                  <Paintbrush className="size-4 sm:size-5 text-accent fill-accent/20" />
                </div>

                {/* Subtle outer pulsing ring */}
                <div className="absolute inset-0 rounded-full border-2 border-accent/50 animate-ping opacity-30 pointer-events-none" />
              </div>
            </div>

            {/* Drag Cue Bubble under brush */}
            <div className="absolute top-[calc(50%+28px)] sm:top-[calc(50%+36px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/85 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 text-[0.55rem] sm:text-[0.68rem] font-semibold text-white/90 border border-white/20 shadow-md pointer-events-none">
              Drag to compare
            </div>
          </div>
        </div>

        {/* Mobile Quick Tap Controls */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-2.5">
          <button
            type="button"
            onClick={() => setSliderPos(5)}
            className={`px-2.5 py-1 rounded-full text-[0.62rem] font-bold border transition-colors cursor-pointer ${
              sliderPos < 25 ? "bg-primary text-white border-primary" : "bg-stone-100 text-stone-700 border-stone-200"
            }`}
          >
            Show Before
          </button>
          <button
            type="button"
            onClick={() => setSliderPos(50)}
            className={`px-2.5 py-1 rounded-full text-[0.62rem] font-bold border transition-colors cursor-pointer ${
              sliderPos >= 25 && sliderPos <= 75 ? "bg-accent text-white border-accent shadow-xs" : "bg-stone-100 text-stone-700 border-stone-200"
            }`}
          >
            50/50 Split
          </button>
          <button
            type="button"
            onClick={() => setSliderPos(95)}
            className={`px-2.5 py-1 rounded-full text-[0.62rem] font-bold border transition-colors cursor-pointer ${
              sliderPos > 75 ? "bg-primary text-white border-primary" : "bg-stone-100 text-stone-700 border-stone-200"
            }`}
          >
            Show After
          </button>
        </div>

        {/* Transformation Highlights (Clean 2x2 Grid on Mobile, 4-Column on Desktop) */}
        <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-5 border-t border-primary/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 w-full">
            <div className="flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-secondary/50 p-2.5 sm:p-3 border border-primary/10 shadow-2xs">
              <CheckCircle2 className="size-3.5 sm:size-4 text-accent shrink-0" />
              <div className="text-left min-w-0">
                <span className="block text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider text-primary leading-tight truncate">
                  Teflon™ Shield
                </span>
                <span className="block text-[0.58rem] sm:text-[0.65rem] text-muted-foreground leading-tight mt-0.5 truncate">
                  Stains wipe off easily
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-secondary/50 p-2.5 sm:p-3 border border-primary/10 shadow-2xs">
              <CheckCircle2 className="size-3.5 sm:size-4 text-accent shrink-0" />
              <div className="text-left min-w-0">
                <span className="block text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider text-primary leading-tight truncate">
                  100k Scrub Life
                </span>
                <span className="block text-[0.58rem] sm:text-[0.65rem] text-muted-foreground leading-tight mt-0.5 truncate">
                  High abrasion tested
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-secondary/50 p-2.5 sm:p-3 border border-primary/10 shadow-2xs">
              <CheckCircle2 className="size-3.5 sm:size-4 text-accent shrink-0" />
              <div className="text-left min-w-0">
                <span className="block text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider text-primary leading-tight truncate">
                  Micro-Crack Seal
                </span>
                <span className="block text-[0.58rem] sm:text-[0.65rem] text-muted-foreground leading-tight mt-0.5 truncate">
                  Flawless plaster hide
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-secondary/50 p-2.5 sm:p-3 border border-primary/10 shadow-2xs">
              <CheckCircle2 className="size-3.5 sm:size-4 text-accent shrink-0" />
              <div className="text-left min-w-0">
                <span className="block text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider text-primary leading-tight truncate">
                  Zero Odor VOC
                </span>
                <span className="block text-[0.58rem] sm:text-[0.65rem] text-muted-foreground leading-tight mt-0.5 truncate">
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
