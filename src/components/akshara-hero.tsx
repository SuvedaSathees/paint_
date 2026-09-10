import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlyingHardware } from "@/components/flying-hardware";

const navItems = ["Home", "About", "Products", "Services", "Projects", "Contact"];
const SCROLL_DISTANCE = 3800;

function BrandMark() {
  return (
    <a href="#top" className="relative z-10 flex items-center gap-3" aria-label="Akshara home">
      <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground shadow-sm">
        A
      </span>
      <span className="leading-none">
        <strong className="block font-display text-sm tracking-[0.16em] text-primary">AKSHARA</strong>
        <span className="mt-1 block text-[0.5rem] font-semibold tracking-[0.2em] text-muted-foreground">
          PAINTS &amp; HARDWARE
        </span>
      </span>
    </a>
  );
}

function HeroNav({ onNavigate }: { onNavigate: (toEnd: boolean) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="hero-nav absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-7 sm:pt-6 lg:px-10 opacity-0 pointer-events-none will-change-[transform,opacity]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between rounded-full border border-primary/10 bg-background/80 px-4 shadow-sm backdrop-blur-xl sm:px-6">
        <BrandMark />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => onNavigate(index !== 0)}
              className={`text-[0.68rem] font-semibold uppercase tracking-[0.13em] transition-colors hover:text-paint-deep cursor-pointer ${
                index === 0 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <Button
          variant="hero"
          size="default"
          type="button"
          onClick={() => onNavigate(true)}
          className="hidden h-10 px-5 lg:inline-flex cursor-pointer"
        >
          <span>Let&apos;s talk</span>
          <ArrowRight className="size-3.5" />
        </Button>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-primary lg:hidden cursor-pointer"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav
          className="mx-auto mt-2 grid max-w-[1440px] gap-1 rounded-2xl border border-primary/10 bg-background/95 p-3 shadow-lg backdrop-blur-xl lg:hidden animate-in fade-in slide-in-from-top-2"
          aria-label="Mobile navigation"
        >
          {navItems.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onNavigate(index !== 0);
                setOpen(false);
              }}
              className="text-left rounded-xl px-4 py-3 text-sm font-semibold text-primary hover:bg-secondary cursor-pointer"
            >
              {item}
            </button>
          ))}
          <div className="pt-2">
            <Button
              variant="hero"
              size="default"
              type="button"
              onClick={() => {
                onNavigate(true);
                setOpen(false);
              }}
              className="w-full justify-center cursor-pointer"
            >
              Let&apos;s talk
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function AksharaHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const smoothScrollTo = (targetY: number, duration = 3400) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic easeInOut
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isAnimatingRef.current = false;
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!rootRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      rootRef.current.classList.add("is-reduced-motion");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${SCROLL_DISTANCE}`,
          scrub: 1.15,
          pin: ".hero-frame",
          anticipatePin: 1,
        },
      });

      timeline
        // Stage 01: Fade intro copy and cue
        .to(".intro-copy", { opacity: 0, y: -45, duration: 0.7 }, 0.35)
        .to(".scroll-cue", { opacity: 0, duration: 0.3 }, 0.2)

        // Stage 02: Can rotates 360 degrees while scrolling, glint shines
        .to(".can-wrap", { xPercent: 20, scale: 1.12, rotate: 360, duration: 1.1, ease: "power2.inOut" }, 0.25)
        .to(".can-glint", { xPercent: 260, opacity: 0.8, duration: 1.1 }, 0.35)

        // Stage 03: Rich architectural paint splash bursts forth dynamically from inside the can
        .fromTo(
          ".paint-splash",
          {
            opacity: 0,
            scale: 0.15,
            yPercent: 18,
            xPercent: -41.5,
            rotate: -3,
          },
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            xPercent: -41.5,
            rotate: 1,
            duration: 1.45,
            ease: "power2.out",
          },
          1.28
        )
        // Emerging 3D floating hardware: tools float outwards around the paint box
        .fromTo(
          ".flying-hardware",
          { opacity: 0, scale: 0.72 },
          { opacity: 1, scale: 1, duration: 1.35, ease: "power2.out" },
          1.38
        )

        // Stage 04: Camera focus and halo lighting expand
        .to(".camera-halo", { scale: 1.25, opacity: 0.85, duration: 1.1 }, 1.2)

        // Stage 05: Can and splashing paint shift right, roller sweeps paint stroke across
        .to(".can-wrap", { xPercent: 40, yPercent: 14, scale: 0.86, duration: 1.25 }, 3.1)
        .to(".paint-splash", { scale: 0.96, xPercent: -41.5, yPercent: 0, rotate: 1, duration: 1.25 }, 3.1)

        // Orange paint stroke reveals from left to right across the screen
        .fromTo(
          ".paint-reveal",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.45, ease: "power1.inOut" },
          3.7
        )
        // Keep navigation bar fully visible when this roller animation starts
        .fromTo(
          ".hero-nav",
          { opacity: 0, y: -25, pointerEvents: "none" },
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.3,
            ease: "power2.out",
          },
          3.45
        )

        // Real paint roller rotates left, rolls across screen from left to right end in exact sync
        .fromTo(
          ".roller-action",
          {
            x: "-16vw",
            y: "3vh",
            rotate: -78,
            scale: 0.95,
            opacity: 0,
            transformOrigin: "45% 20%",
          },
          {
            x: "96vw",
            y: "-3vh",
            rotate: -84,
            duration: 1.45,
            ease: "power1.inOut",
          },
          3.7
        )
        // Quick smooth fade-in as roller starts sweeping from the left edge
        .to(
          ".roller-action",
          {
            opacity: 1,
            scale: 1,
            duration: 0.16,
            ease: "power1.out",
          },
          3.7
        )
        // Vanish the roller completely right as it hits the right end of the orange stroke
        .to(
          ".roller-action",
          {
            opacity: 0,
            scale: 0.75,
            duration: 0.18,
            ease: "power2.in",
          },
          4.97
        )

        // Stage 06: Background soft wash
        .to(".scene-wash", { opacity: 1, duration: 1 }, 4.35)

        // Stage 07: Finale composition (can rests on right with open lid and splash, copy reveals on left)
        .to(".can-wrap", { xPercent: 61, yPercent: 22, scale: 0.7, rotate: 360, duration: 1.2 }, 4.7)
        .to(".paint-splash", { scale: 0.86, xPercent: -41.5, yPercent: -3, rotate: 1, opacity: 0.95, duration: 1.2 }, 4.7)
        .fromTo(
          ".final-copy > *",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.75, ease: "power3.out" },
          5.05
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleNavigate = (toEnd: boolean) => {
    smoothScrollTo(toEnd ? SCROLL_DISTANCE : 0, 2000);
  };

  return (
    <main ref={rootRef} id="top" className="relative bg-background">
      <section
        className="hero-frame hero-studio relative h-screen min-h-[640px] overflow-hidden"
        aria-label="Akshara Paints and Hardware introduction"
      >
        <HeroNav onNavigate={handleNavigate} />

        {/* Ambient studio backdrop */}
        <div className="scene-wash absolute inset-0 bg-background/88 opacity-0 pointer-events-none transition-opacity duration-300" />
        <div className="camera-halo absolute left-[60%] top-[42%] size-[min(62vw,800px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-studio-white/70 opacity-40 blur-3xl pointer-events-none" />

        {/* Initial Stage Intro Copy */}
        <div className="intro-copy absolute left-1/2 top-[calc(19%-50px)] z-10 w-full -translate-x-1/2 px-5 text-center sm:top-[calc(18%-50px)] pointer-events-none">
          <p className="mb-3 text-[0.63rem] font-bold uppercase tracking-[0.32em] text-paint-deep">
            Built for beautiful spaces
          </p>
          <h1 className="font-display text-[clamp(2.7rem,8vw,7.2rem)] font-semibold leading-[0.86] tracking-[0.02em] text-primary">
            AKSHARA
          </h1>
          <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-navy-soft sm:text-xs">
            Paints &amp; Hardware
          </p>
        </div>

        {/* Product Stage: Paint Can, Open Lid, Splashing Paint, and Emerging Tools */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="can-wrap absolute left-1/2 top-[calc(56%+30px)] w-[min(54vw,410px)] -translate-x-1/2 -translate-y-1/2 will-change-transform sm:top-[calc(59%+30px)] sm:w-[min(31vw,430px)]">
            
            {/* Dynamic Photorealistic Orange Paint Splash naturally emerging from inside the can opening */}
            <div
              className="paint-splash absolute left-1/2 bottom-[83%] z-20 w-[108%] aspect-square overflow-visible opacity-0 pointer-events-none will-change-transform origin-[41.5%_98%] [mask-image:linear-gradient(to_top,transparent_0%,transparent_5%,black_15%,black_100%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,transparent_5%,black_15%,black_100%)]"
            >
              <img
                src="/akshara-paint-splash.png?v=15"
                alt="Vibrant architectural orange paint splashing naturally out of the Akshara paint can"
                loading="eager"
                width={1024}
                height={1024}
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] saturate-[1.2] contrast-[1.05] brightness-[1.02]"
              />
            </div>

            {/* The Akshara Paint Can */}
            <img
              src="/akshara-paint-can.png?v=4"
              alt="Akshara premium architectural paint can"
              width={1200}
              height={1408}
              fetchPriority="high"
              className="relative z-10 w-full object-contain product-glow"
            />

            {/* Specular can glint */}
            <span className="can-glint absolute left-[24%] top-[14%] z-20 h-[70%] w-[8%] -skew-x-6 rounded-full bg-studio-white/30 opacity-0 blur-md" />
            {/* Contact floor shadow */}
            <span className="absolute -bottom-[2%] left-[10%] -z-20 h-[8%] w-[80%] rounded-full bg-primary/25 blur-xl" />

            {/* Curated 3D Floating Hardware & Tools Orbiting the Paint Box */}
            <FlyingHardware />
          </div>
        </div>

        {/* The Orange Paint Stroke Reveal */}
        <div className="paint-reveal absolute inset-x-[-8%] top-[42%] z-10 h-[36%] rotate-[-2deg] will-change-[clip-path] sm:top-[34%] sm:h-[46%] pointer-events-none">
          <img
            src="/akshara-paint-stroke.png"
            alt="Akshara textured wet paint stroke"
            loading="eager"
            width={1600}
            height={704}
            className="h-full w-full object-fill drop-shadow-xl"
          />
        </div>

        {/* Real Paint Roller rolling out the orange paint stroke */}
        <div className="roller-action absolute left-0 top-[38%] sm:top-[35%] z-30 w-[145px] sm:w-[175px] lg:w-[200px] opacity-0 will-change-transform pointer-events-none filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] origin-[45%_20%]">
          <img
            src="/akshara-paint-roller.png?v=2"
            alt="Professional paint roller rolling orange paint"
            loading="eager"
            width={572}
            height={1042}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Finale: Brand Message & CTA Buttons */}
        <div
          id="finale"
          className="final-copy absolute left-[7vw] top-1/2 z-40 w-[min(86vw,610px)] -translate-y-1/2 sm:left-[8vw]"
        >
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-paint-deep opacity-0">
            Paints · Electrical Pipes · Bolts &amp; Nuts · Building Materials
          </p>
          <h2 className="text-balance font-display text-[clamp(2.8rem,6.6vw,6.5rem)] font-semibold leading-[0.92] text-primary opacity-0">
            Bring Your Space to Life.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-navy-soft opacity-0 sm:text-base">
            Authorised dealer for Birla Opus Paints, electrical conduit pipes, heavy-duty bolts &amp; nuts, and reliable building supplies.
          </p>
          <div className="mt-8 flex flex-col gap-3 opacity-0 sm:flex-row">
            <Button variant="hero" size="hero" asChild>
              <a href="mailto:hello@aksharapaints.com">
                Explore our products <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button variant="heroOutline" size="hero" asChild>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer">
                Visit our store
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll Cue (at opening stage) */}
        <button
          type="button"
          onClick={() => handleNavigate(true)}
          className="scroll-cue absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 text-primary sm:bottom-9 cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Scroll to discover"
        >
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.26em]">Scroll to discover</span>
          <ArrowDown className="size-4 animate-bounce" />
        </button>
      </section>
    </main>
  );
}