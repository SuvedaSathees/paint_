import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { HomeContent } from "@/components/home-content";
import { SiteHeader, navItems as heroNavItems } from "@/components/site-header";
import { createRollerReveal } from "@/components/paint-roller-reveal";

export { heroNavItems };

const SCROLL_DISTANCE = 3800;

const DESKTOP_STATS = [
  { value: 5000, suffix: "+", label: "Colours in Stock" },
  { value: 15, suffix: "+", label: "Years in Erode" },
  { value: 1200, suffix: "+", label: "Projects Done" },
  { value: 98, suffix: "%", label: "Satisfaction" },
] as const;

const formatStat = (n: number) => Math.round(n).toLocaleString("en-IN");

function HeroNav({ onNavigate }: { onNavigate: (toEnd: boolean) => void }) {
  return (
    <SiteHeader
      variant="hero"
      onNavigate={onNavigate}
      className="hero-nav absolute inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5 lg:px-8 opacity-0 pointer-events-none will-change-[transform,opacity]"
    />
  );
}

export function AksharaHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const desktopFrameRef = useRef<HTMLElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const wallCanvasRef = useRef<HTMLCanvasElement>(null);
  const rollerRef = useRef<HTMLDivElement>(null);
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);

  useEffect(() => {
    // Safety fallback: reveal text after 4.8s even if mobile browser delays autoplay
    const timer = setTimeout(() => {
      setIsAnimationEnded(true);
    }, 4800);
    return () => clearTimeout(timer);
  }, []);

  const handleReplayAnimation = () => {
    const video = mobileVideoRef.current;
    if (video) {
      setIsAnimationEnded(false);
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const smoothScrollTo = (targetY: number, duration = 1000) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 5) return;

    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!rootRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      rootRef.current.classList.add("is-reduced-motion");
      if (wallCanvasRef.current) wallCanvasRef.current.style.display = "none";
      if (rollerRef.current) rollerRef.current.style.display = "none";
      if (desktopVideoRef.current) {
        desktopVideoRef.current.currentTime = 4.5;
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // ==========================================================
    // DESKTOP (min-width: 768px): Scroll-driven frame scrub & pin
    // ==========================================================
    mm.add("(min-width: 768px)", () => {
      const video = desktopVideoRef.current;
      let isSeeking = false;
      let pendingSeek: number | null = null;

      const performSeek = (targetTime: number) => {
        if (!video || !video.duration || isNaN(video.duration)) return;
        const safeTime = Math.min(Math.max(0, targetTime), Math.max(0, video.duration - 0.04));
        if (!isSeeking) {
          if (Math.abs(video.currentTime - safeTime) > 0.015) {
            isSeeking = true;
            video.currentTime = safeTime;
          }
        } else {
          pendingSeek = safeTime;
        }
      };

      const handleSeeked = () => {
        isSeeking = false;
        if (pendingSeek !== null) {
          const nextTime = pendingSeek;
          pendingSeek = null;
          performSeek(nextTime);
        }
      };

      const onMeta = () => {
        if (video) {
          video.currentTime = 0.001;
        }
      };

      if (video) {
        video.pause();
        if (video.readyState >= 1) {
          onMeta();
        } else {
          video.addEventListener("loadedmetadata", onMeta, { once: true });
        }
        video.addEventListener("seeked", handleSeeked);
      }

      // ==========================================================
      // OPENING: a real paint roller paints the scene onto the wall
      // ==========================================================
      const reveal =
        wallCanvasRef.current && rollerRef.current
          ? createRollerReveal({ canvas: wallCanvasRef.current, roller: rollerRef.current, passes: 3 })
          : null;
      const rollerState = { p: 0 };
      const PASSES = 3;

      gsap.set(".hero-badge", { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(".hero-wet-title", { clipPath: "inset(-20% 100% -20% 0%)", y: 10 });
      gsap.set(".scroll-cue-inner", { opacity: 0, y: 12 });

      const opening = gsap.timeline({ delay: 0.35 });
      for (let i = 0; i < PASSES; i++) {
        opening.to(
          rollerState,
          {
            p: (i + 1) / PASSES,
            duration: 0.78,
            ease: "power1.inOut",
            onUpdate: () => reveal?.render(rollerState.p),
          },
          i === 0 ? 0 : ">+0.06"
        );
      }
      opening
        .to(".hero-badge", { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power2.out" }, ">-0.1")
        .to(
          ".hero-wet-title",
          { clipPath: "inset(-20% 0% -20% 0%)", y: 0, duration: 0.9, ease: "power3.inOut" },
          ">-0.25"
        )
        .to(".scroll-cue-inner", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, ">-0.3");

      // Visitor wants in: fast-forward the opening instead of making them wait
      const skipOpening = () => {
        if (opening.progress() < 1) opening.timeScale(6);
      };
      if (window.scrollY > 20 || window.location.hash === "#finale") {
        opening.progress(1);
        reveal?.finish();
      }
      window.addEventListener("wheel", skipOpening, { passive: true, once: true });
      window.addEventListener("keydown", skipOpening, { once: true });
      window.addEventListener("pointerdown", skipOpening, { once: true });

      const videoTrack = { progress: 0 };
      const statNodes = Array.from(
        desktopFrameRef.current?.querySelectorAll<HTMLElement>("[data-stat-target]") ?? []
      );
      const statCounter = { value: 0 };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: desktopFrameRef.current || ".hero-frame",
          start: "top top",
          end: `+=${SCROLL_DISTANCE}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        // Stage 01: Fade intro copy and scroll cue smoothly
        .to(".intro-copy", { opacity: 0, y: -45, duration: 0.6 }, 0.15)
        .to(".scroll-cue", { opacity: 0, duration: 0.25 }, 0.05)

        // Stage 02: Scrub video frame by frame in exact sync with scroll
        .to(
          videoTrack,
          {
            progress: 1,
            ease: "none",
            duration: 4.6,
            onUpdate: () => {
              if (video && video.duration) {
                performSeek(videoTrack.progress * video.duration);
              }
            },
          },
          0.05
        )

        // Stage 03: Navigation header slides down and stays active
        .fromTo(
          ".hero-nav",
          { opacity: 0, y: -25, pointerEvents: "none" },
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.35,
            ease: "power2.out",
          },
          1.5
        )

        // Stage 04: Soft backdrop illumination
        .to(".scene-wash", { opacity: 0.45, duration: 1.0 }, 2.8)

        // Stage 05: Three primer-white brush strokes are painted on behind the copy
        .fromTo(
          ".hero-primer-stroke",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", stagger: 0.14, duration: 0.55, ease: "power2.inOut" },
          3.05
        )

        // Stage 06: Finale composition
        .fromTo(
          ".final-copy > *",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.75, ease: "power3.out" },
          3.5
        )
        // Orange brush stroke swipes under "Paints,"
        .fromTo(
          ".final-paint-swipe",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power2.inOut" },
          3.85
        )
        // Trust stats count up
        .fromTo(
          statCounter,
          { value: 0 },
          {
            value: 1,
            duration: 0.8,
            ease: "power2.out",
            onUpdate: () => {
              statNodes.forEach((node) => {
                node.textContent = formatStat(Number(node.dataset.statTarget || 0) * statCounter.value);
              });
            },
          },
          4.0
        );

      return () => {
        if (video) {
          video.removeEventListener("seeked", handleSeeked);
        }
        reveal?.destroy();
        window.removeEventListener("wheel", skipOpening);
        window.removeEventListener("keydown", skipOpening);
        window.removeEventListener("pointerdown", skipOpening);
      };
    });

    // ==========================================================
    // MOBILE (max-width: 767px): Cinematic video (single play, no looping)
    // ==========================================================
    mm.add("(max-width: 767px)", () => {
      const mobileVideo = mobileVideoRef.current;
      if (mobileVideo) {
        mobileVideo.currentTime = 0;
        mobileVideo.loop = false;
        mobileVideo.play().catch(() => {
          // Autoplay fallback on user interaction
          const playOnTouch = () => {
            mobileVideo.play().catch(() => {});
            window.removeEventListener("touchstart", playOnTouch);
          };
          window.addEventListener("touchstart", playOnTouch, { once: true });
        });
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#finale") {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        if (isMobile) {
          const el = document.getElementById("finale-mobile") || document.getElementById("products-showcase");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
          setTimeout(() => {
            smoothScrollTo(SCROLL_DISTANCE, 800);
          }, 120);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleNavigate = (toEnd: boolean) => {
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      if (toEnd) {
        const el = document.getElementById("products-showcase");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      smoothScrollTo(toEnd ? SCROLL_DISTANCE : 0, 1000);
    }
  };

  return (
    <main ref={rootRef} id="top" className="relative bg-background">
      {/* ========================================================================= */}
      {/* MOBILE HERO (< 768px): Full-bleed cinematic video with finale text reveal */}
      {/* ========================================================================= */}
      <section
        className="block md:hidden relative w-full min-h-[100dvh] h-[100dvh] overflow-hidden bg-[#071624] text-white select-none flex flex-col justify-between"
        aria-label="Akshara Paints and Hardware mobile introduction"
      >
        {/* Full-bleed Mobile Video Background */}
        <video
          ref={mobileVideoRef}
          src="/hero-frames/mobile_gwr_video_mvp.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setIsAnimationEnded(true)}
          onTimeUpdate={() => {
            const v = mobileVideoRef.current;
            if (v && v.duration && v.currentTime >= v.duration - 0.25) {
              setIsAnimationEnded(true);
            }
          }}
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
        />

        {/* Ambient Dark Gradient Wash for Text Readability & Focus */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none ${
            isAnimationEnded
              ? "opacity-100 bg-gradient-to-t from-[#071624]/98 via-[#071624]/80 to-transparent"
              : "opacity-40 bg-gradient-to-t from-black/60 via-transparent to-black/25"
          }`}
        />

        {/* Floating Mobile Header (Icon Navbar) */}
        <div className="relative z-30 pt-3 px-3.5 sm:px-6 w-full">
          <SiteHeader variant="hero" onNavigate={handleNavigate} />
        </div>

        {/* Tap to skip hint while animation is playing */}
        {!isAnimationEnded && (
          <button
            type="button"
            onClick={() => setIsAnimationEnded(true)}
            className="absolute bottom-6 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white/90 hover:text-white transition-all shadow-lg active:scale-95"
            aria-label="Skip animation and display details"
          >
            <span>Skip</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        )}

        {/* Revealed Finale Text & Actions (Revealed at the end of animation) */}
        <div
          className={`relative z-20 mt-auto flex flex-col items-center text-center px-4 pb-6 transition-all duration-700 ease-out ${
            isAnimationEnded
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          {/* Brand Title (Dealer badge removed as requested) */}
          <h1 className="font-display text-[1.6rem] sm:text-[1.85rem] font-extrabold leading-tight tracking-[0.02em] text-white drop-shadow-md">
            AKSHARA PAINTS &amp; HARDWARE
          </h1>

          {/* Headline & Value Proposition */}
          <div id="finale-mobile" className="w-full max-w-md mt-1.5">
            <h2 className="font-display text-[1.15rem] sm:text-[1.35rem] font-serif font-semibold leading-snug text-white/95">
              Paints, Electrical &amp; Construction Supplies.
            </h2>
            <p className="mt-1 text-xs sm:text-sm leading-relaxed text-white/80 font-medium px-1">
              Signature Birla Opus computerized tinting, ISI rigid conduit pipes, industrial fasteners &amp; site hardware delivered direct to your job site in Erode.
            </p>

            {/* Mobile Action Buttons */}
            <div className="mt-3.5 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button
                variant="hero"
                size="default"
                className="w-full sm:w-auto text-sm font-semibold py-2.5 shadow-lg bg-gradient-to-r from-[#F05323] via-[#F26438] to-[#E8592A] hover:from-[#E04818] hover:to-[#F05323] text-white border-0"
                asChild
              >
                <a href="#products-showcase">
                  Explore Divisions
                </a>
              </Button>
              <Button
                variant="heroOutline"
                size="default"
                className="w-full sm:w-auto text-sm font-semibold py-2.5 bg-white/10 hover:bg-white/20 text-white border-white/25 backdrop-blur-md"
                asChild
              >
                <a href="#estimator">
                  Instant Paint Calculator
                </a>
              </Button>
            </div>

            {/* Mobile Trust Metrics Grid (4 items in a clean row) */}
            <div className="mt-3.5 pt-3 border-t border-white/15 grid grid-cols-4 gap-2 text-center">
              <div className="flex flex-col">
                <span className="font-display text-sm sm:text-base font-bold text-white">5000+</span>
                <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white/70 mt-0.5">Colours</span>
              </div>
              <div className="flex flex-col border-l border-white/15 pl-1">
                <span className="font-display text-sm sm:text-base font-bold text-white">15+</span>
                <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white/70 mt-0.5">Years</span>
              </div>
              <div className="flex flex-col border-l border-white/15 pl-1">
                <span className="font-display text-sm sm:text-base font-bold text-white">1200+</span>
                <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white/70 mt-0.5">Projects</span>
              </div>
              <div className="flex flex-col border-l border-white/15 pl-1">
                <span className="font-display text-sm sm:text-base font-bold text-white">98%</span>
                <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white/70 mt-0.5">Rating</span>
              </div>
            </div>

            {/* Replay Animation Option */}
            <div className="mt-2.5 flex items-center justify-center">
              <button
                type="button"
                onClick={handleReplayAnimation}
                className="text-[10px] text-white/60 hover:text-white/95 underline underline-offset-2 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Replay 3D Intro</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DESKTOP HERO (>= 768px): Theatrical scroll-driven 3D scrub animation     */}
      {/* ========================================================================= */}
      <section
        ref={desktopFrameRef}
        className="hidden md:block hero-frame hero-studio relative h-screen min-h-[640px] overflow-hidden bg-[#e8e9ec]"
        aria-label="Akshara Paints and Hardware desktop introduction"
      >
        <HeroNav onNavigate={handleNavigate} />

        {/* Ambient studio backdrop */}
        <div className="scene-wash absolute inset-0 bg-background/88 opacity-0 pointer-events-none transition-opacity duration-300" />
        <div className="camera-halo absolute left-[60%] top-[42%] size-[min(62vw,800px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-studio-white/70 opacity-40 blur-3xl pointer-events-none" />

        {/* Initial Stage Intro Copy: brushed-on badge + wet-paint title */}
        <div className="intro-copy absolute left-1/2 top-[calc(1rem+12px)] sm:top-[calc(1.5rem+12px)] z-20 w-max max-w-[96vw] -translate-x-1/2 px-2 sm:px-4 text-center pointer-events-none">
          <p className="hero-badge mx-auto mb-2 w-max px-6 py-1.5 text-[0.62rem] sm:text-[0.7rem] font-black uppercase tracking-[0.26em] text-white whitespace-nowrap">
            Authorised Birla Opus Dealer &middot; Erode
          </p>
          <h1 className="hero-wet-title font-display text-[clamp(1.1rem,3.1vw,2.35rem)] font-bold leading-tight tracking-[0.03em] whitespace-nowrap">
            AKSHARA PAINTS &amp; HARDWARE
          </h1>
        </div>

        {/* Scroll-Driven Frame-by-Frame 3D Video Stage */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <video
            ref={desktopVideoRef}
            src="/akshara-hero-video.mp4"
            playsInline
            muted
            preload="auto"
            tabIndex={-1}
            aria-hidden="true"
            className="h-full w-full min-w-full min-h-full object-cover pointer-events-none select-none"
          />
        </div>

        {/* Finale backdrop: three primer-white brush strokes painted on behind the copy */}
        <div aria-hidden="true" className="hero-primer pointer-events-none absolute left-[-3vw] top-1/2 z-30 w-[min(50vw,720px)] -translate-y-1/2">
          <span className="hero-primer-stroke" />
          <span className="hero-primer-stroke" />
          <span className="hero-primer-stroke" />
        </div>

        {/* Opening: primed wall that the paint roller paints away */}
        <canvas
          ref={wallCanvasRef}
          aria-hidden="true"
          className="hero-wall pointer-events-none absolute inset-0 z-[70] h-full w-full"
        />
        <div ref={rollerRef} aria-hidden="true" className="hero-roller pointer-events-none absolute left-0 top-0 z-[71]">
          <img src="/akshara-roller-side.png" alt="" draggable={false} className="h-full w-full select-none" />
        </div>

        {/* Finale: Brand Message & CTA Buttons */}
        <div
          id="finale"
          className="final-copy absolute left-[7vw] top-[50%] z-40 w-[min(86vw,560px)] -translate-y-1/2 sm:left-[8vw]"
        >
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#E03A00] opacity-0">
            &mdash; AUTHORISED BIRLA OPUS DEALER &middot; ERODE &mdash;
          </p>
          <h2 className="text-balance font-display text-[clamp(2.1rem,4.5vw,4.1rem)] font-serif font-semibold leading-[0.96] text-primary opacity-0">
            <span className="relative inline-block">
              <span aria-hidden="true" className="final-paint-swipe" />
              <span className="relative">Paints,</span>
            </span>{" "}
            Electrical &amp; Construction Supplies.
          </h2>
          <p className="mt-3.5 max-w-md text-sm leading-relaxed text-[#0E2838] font-semibold opacity-0 sm:text-[0.95rem] drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">
            From signature Birla Opus computerized color tinting to ISI rigid conduit pipes, industrial fasteners, and site hardware supplies &mdash; delivered direct to your job site in Erode.
          </p>
          <div className="mt-6 flex flex-col gap-3 opacity-0 sm:flex-row sm:items-center">
            <Button variant="hero" size="hero" asChild>
              <a href="#products-showcase">
                Explore Divisions
              </a>
            </Button>
            <Button variant="heroOutline" size="hero" asChild>
              <a href="#estimator">
                Instant Paint Calculator
              </a>
            </Button>
          </div>

          {/* Compact Trust Stats Row (numbers count up as the finale lands) */}
          <div className="mt-5 pt-4 border-t border-primary/12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg opacity-0">
            {DESKTOP_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col ${i > 0 ? "sm:border-l sm:border-primary/10 sm:pl-3" : ""}`}
              >
                <span className="font-display text-base sm:text-lg font-bold text-primary leading-tight tabular-nums">
                  <span data-stat-target={stat.value}>{formatStat(stat.value)}</span>
                  {stat.suffix}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Cue (at opening stage) */}
        <button
          type="button"
          onClick={() => handleNavigate(true)}
          className="scroll-cue absolute bottom-3 sm:bottom-4 left-1/2 z-40 -translate-x-1/2 cursor-pointer"
          aria-label="Scroll to discover"
        >
          <span className="scroll-cue-inner flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md px-3.5 py-1.5 border border-stone-200/80 shadow-xs text-primary hover:bg-white transition-colors">
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em]">Scroll to discover</span>
            <span aria-hidden="true" className="scroll-drip" />
          </span>
        </button>
      </section>

      {/* Extended Rich Home Content */}
      <HomeContent />

      <SiteFooter />
    </main>
  );
}