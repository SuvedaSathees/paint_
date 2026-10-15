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
    <section className="pt-12 sm:pt-[50px] pb-10 sm:pb-[50px] px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-8 shortlg:py-5">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 lg:mb-7 shortlg:mb-4">
        <span className="flex items-center justify-center gap-2.5 sm:gap-3 whitespace-nowrap text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.24em] text-accent mb-2 sm:mb-1.5">
          <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
          <span className="sm:hidden">Proven surface excellence</span>
          <span className="hidden sm:inline">PROVEN SURFACE EXCELLENCE</span>
          <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
        </span>
        <h2 className="font-display text-[1.75rem] leading-tight sm:leading-none sm:text-4xl lg:text-5xl shortlg:text-4xl font-serif font-semibold tracking-tight text-primary">
          {title}
        </h2>
        <p className="mx-auto mt-2 max-w-[300px] text-[13px] leading-relaxed text-muted-foreground sm:hidden">
          Drag the brush to compare a damp, peeling wall with a fresh Birla Opus finish.
        </p>
        <p className="hidden sm:block mt-2 text-xs sm:text-sm md:text-base text-muted-foreground tracking-wide leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Main Interactive Comparison Card */}
      <div className="relative rounded-[22px] sm:rounded-3xl border border-stone-200/90 sm:border-primary/15 bg-white sm:bg-card/75 p-3 sm:p-6 lg:p-7 shortlg:p-4 shadow-[0_2px_12px_rgba(15,30,54,0.05)] sm:shadow-xl backdrop-blur-sm">
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
          className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[min(60dvh,680px)] shortlg:h-[56dvh] w-full max-h-[680px] overflow-hidden rounded-xl sm:rounded-2xl shadow-inner select-none cursor-ew-resize touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-full bg-stone-100 p-1 sm:hidden" role="group" aria-label="Compare view">
          <button
            type="button"
            onClick={() => setSliderPos(5)}
            className={`h-8 rounded-full text-[12.5px] font-semibold transition-colors cursor-pointer ${
              sliderPos < 25 ? "bg-white text-primary shadow-sm" : "text-stone-500"
            }`}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setSliderPos(50)}
            className={`h-8 rounded-full text-[12.5px] font-semibold transition-colors cursor-pointer ${
              sliderPos >= 25 && sliderPos <= 75 ? "bg-white text-primary shadow-sm" : "text-stone-500"
            }`}
          >
            Split
          </button>
          <button
            type="button"
            onClick={() => setSliderPos(95)}
            className={`h-8 rounded-full text-[12.5px] font-semibold transition-colors cursor-pointer ${
              sliderPos > 75 ? "bg-white text-primary shadow-sm" : "text-stone-500"
            }`}
          >
            After
          </button>
        </div>

        {/* Transformation Highlights (Clean 2x2 Grid on Mobile, 4-Column on Desktop) */}
        <div className="mt-3 sm:mt-6 pt-3 sm:pt-5 shortlg:mt-3 shortlg:pt-3 border-t border-primary/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 w-full">
            <div className="flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-stone-50 sm:bg-secondary/50 p-2.5 sm:p-3 border border-stone-200/70 sm:border-primary/10 sm:shadow-2xs">
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <div className="text-left min-w-0">
                <span className="block text-[12.5px] sm:text-xs font-semibold sm:font-bold sm:uppercase sm:tracking-wider text-primary leading-tight sm:truncate">
                  Teflon™ Shield
                </span>
                <span className="block text-[11px] sm:text-[0.65rem] text-muted-foreground leading-tight mt-0.5 sm:truncate">
                  Stains wipe off easily
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-stone-50 sm:bg-secondary/50 p-2.5 sm:p-3 border border-stone-200/70 sm:border-primary/10 sm:shadow-2xs">
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <div className="text-left min-w-0">
                <span className="block text-[12.5px] sm:text-xs font-semibold sm:font-bold sm:uppercase sm:tracking-wider text-primary leading-tight sm:truncate">
                  100k Scrub Life
                </span>
                <span className="block text-[11px] sm:text-[0.65rem] text-muted-foreground leading-tight mt-0.5 sm:truncate">
                  High abrasion tested
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-stone-50 sm:bg-secondary/50 p-2.5 sm:p-3 border border-stone-200/70 sm:border-primary/10 sm:shadow-2xs">
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <div className="text-left min-w-0">
                <span className="block text-[12.5px] sm:text-xs font-semibold sm:font-bold sm:uppercase sm:tracking-wider text-primary leading-tight sm:truncate">
                  Micro-Crack Seal
                </span>
                <span className="block text-[11px] sm:text-[0.65rem] text-muted-foreground leading-tight mt-0.5 sm:truncate">
                  Flawless plaster hide
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-stone-50 sm:bg-secondary/50 p-2.5 sm:p-3 border border-stone-200/70 sm:border-primary/10 sm:shadow-2xs">
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <div className="text-left min-w-0">
                <span className="block text-[12.5px] sm:text-xs font-semibold sm:font-bold sm:uppercase sm:tracking-wider text-primary leading-tight sm:truncate">
                  Zero Odor VOC
                </span>
                <span className="block text-[11px] sm:text-[0.65rem] text-muted-foreground leading-tight mt-0.5 sm:truncate">
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
