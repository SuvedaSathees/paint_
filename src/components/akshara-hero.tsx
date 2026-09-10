import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import paintCan from "@/assets/akshara-paint-can.png";
import paintTools from "@/assets/akshara-tools.png";
import paintStroke from "@/assets/akshara-paint-stroke.png";

const navItems = ["Home", "About", "Products", "Services", "Projects", "Contact"];

function BrandMark() {
  return (
    <a href="#top" className="relative z-10 flex items-center gap-3" aria-label="Akshara home">
      <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground shadow-sm">A</span>
      <span className="leading-none">
        <strong className="block font-display text-sm tracking-[0.16em] text-primary">AKSHARA</strong>
        <span className="mt-1 block text-[0.5rem] font-semibold tracking-[0.2em] text-muted-foreground">PAINTS &amp; HARDWARE</span>
      </span>
    </a>
  );
}

function HeroNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-7 sm:pt-6 lg:px-10">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between rounded-full border border-primary/10 bg-background/75 px-4 shadow-sm backdrop-blur-xl sm:px-6">
        <BrandMark />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <a key={item} href={index === 0 ? "#top" : "#finale"} className={`text-[0.68rem] font-semibold uppercase tracking-[0.13em] transition-colors hover:text-paint-deep ${index === 0 ? "text-primary" : "text-muted-foreground"}`}>
              {item}
            </a>
          ))}
        </nav>
        <Button variant="hero" size="default" asChild className="hidden h-10 px-5 lg:inline-flex">
          <a href="#finale">Let&apos;s talk <ArrowRight /></a>
        </Button>
        <button type="button" className="grid size-10 place-items-center rounded-full text-primary lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mx-auto mt-2 grid max-w-[1440px] gap-1 rounded-2xl border border-primary/10 bg-background/95 p-3 shadow-lg backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => <a key={item} href={item === "Home" ? "#top" : "#finale"} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-primary hover:bg-secondary">{item}</a>)}
        </nav>
      )}
    </header>
  );
}

export function AksharaHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      rootRef.current.classList.add("is-reduced-motion");
      return;
    }

    let cleanup = () => {};
    void import("gsap").then(({ default: gsap }) => {
      void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        if (!rootRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const scope = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "+=5200",
              scrub: 1.15,
              pin: ".hero-frame",
              anticipatePin: 1,
            },
          });

          timeline
            .to(".intro-copy", { opacity: 0, y: -45, duration: 0.7 }, 0.35)
            .to(".scroll-cue", { opacity: 0, duration: 0.3 }, 0.2)
            .to(".can-wrap", { xPercent: 20, scale: 1.12, rotate: 2.5, duration: 1.5, ease: "power2.inOut" }, 0.25)
            .to(".can-glint", { xPercent: 260, opacity: 0.8, duration: 1.1 }, 0.35)
            .to(".can-lid", { yPercent: -125, rotate: -18, xPercent: 28, scale: 0.92, duration: 1.2, ease: "power3.inOut" }, 1.25)
            .to(".camera-halo", { scale: 1.25, opacity: 0.85, duration: 1.1 }, 1.2)
            .to(".tools", { yPercent: -56, scale: 1, opacity: 1, rotate: -2, duration: 1.55, ease: "power3.out" }, 2.05)
            .to(".can-wrap", { xPercent: 40, yPercent: 14, scale: 0.86, duration: 1.25 }, 3.1)
            .to(".tools", { xPercent: 27, yPercent: -36, rotate: 4, scale: 0.88, duration: 1.25 }, 3.1)
            .fromTo(".roller-action", { xPercent: -140, yPercent: 18, rotate: -10, opacity: 0 }, { xPercent: 85, yPercent: -12, rotate: 2, opacity: 1, duration: 1.45, ease: "power1.inOut" }, 3.7)
            .fromTo(".paint-reveal", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.35, ease: "power1.inOut" }, 3.85)
            .to(".scene-wash", { opacity: 1, duration: 1 }, 4.35)
            .to(".can-wrap", { xPercent: 61, yPercent: 22, scale: 0.7, rotate: 0, duration: 1.2 }, 4.7)
            .to(".tools", { xPercent: 47, yPercent: -13, scale: 0.69, rotate: 8, duration: 1.2 }, 4.7)
            .to(".roller-action", { opacity: 0, duration: 0.45 }, 4.8)
            .fromTo(".final-copy > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.75, ease: "power3.out" }, 5.05)
            .to(".stage-number", { textContent: "07", duration: 0.2, snap: { textContent: 1 } }, 5.15);
        }, rootRef);
        cleanup = () => scope.revert();
      });
    });
    return () => cleanup();
  }, []);

  return (
    <main ref={rootRef} id="top" className="relative h-[6200px] bg-background">
      <section className="hero-frame hero-studio relative h-screen min-h-[640px] overflow-hidden" aria-label="Akshara Paints and Hardware introduction">
        <HeroNav />
        <div className="scene-wash absolute inset-0 bg-background/88 opacity-0" />
        <div className="camera-halo absolute left-[60%] top-[42%] size-[min(62vw,800px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-studio-white/70 opacity-40 blur-3xl" />

        <div className="intro-copy absolute left-1/2 top-[19%] z-10 w-full -translate-x-1/2 px-5 text-center sm:top-[18%]">
          <p className="mb-3 text-[0.63rem] font-bold uppercase tracking-[0.32em] text-paint-deep">Built for beautiful spaces</p>
          <h1 className="font-display text-[clamp(2.7rem,8vw,7.2rem)] font-semibold leading-[0.86] tracking-[0.02em] text-primary">AKSHARA</h1>
          <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-navy-soft sm:text-xs">Paints &amp; Hardware</p>
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="can-wrap absolute left-1/2 top-[56%] w-[min(54vw,410px)] -translate-x-1/2 -translate-y-1/2 will-change-transform sm:top-[59%] sm:w-[min(31vw,430px)]">
            <div className="tools absolute left-1/2 top-[23%] -z-10 w-[106%] -translate-x-1/2 translate-y-[34%] scale-75 opacity-0 will-change-transform">
              <img src={paintTools} alt="Professional paint brush, roller, scraper and decorating tools" loading="lazy" width={1408} height={1408} className="w-full object-contain product-glow" />
            </div>
            <div className="can-lid absolute left-[3%] top-[1%] z-20 h-[13%] w-[94%] rounded-[50%] border-[5px] border-primary/30 bg-gradient-to-b from-studio-white via-muted to-primary/25 shadow-lg will-change-transform">
              <span className="absolute inset-[15%] rounded-[50%] border border-primary/20 bg-secondary" />
            </div>
            <img src={paintCan} alt="Akshara premium architectural paint can" width={1200} height={1408} fetchPriority="high" className="relative z-10 w-full object-contain product-glow" />
            <span className="can-glint absolute left-[24%] top-[14%] z-20 h-[70%] w-[8%] -skew-x-6 rounded-full bg-studio-white/20 opacity-0 blur-md" />
            <span className="absolute -bottom-[2%] left-[10%] -z-20 h-[8%] w-[80%] rounded-full bg-primary/25 blur-xl" />
          </div>
        </div>

        <div className="paint-reveal absolute inset-x-[-8%] top-[42%] z-10 h-[36%] rotate-[-2deg] will-change-[clip-path] sm:top-[34%] sm:h-[46%]">
          <img src={paintStroke} alt="" aria-hidden="true" loading="lazy" width={1600} height={704} className="h-full w-full object-fill drop-shadow-xl" />
        </div>

        <div className="roller-action absolute left-[18%] top-[38%] z-30 w-[27vw] max-w-[300px] opacity-0 will-change-transform">
          <div className="h-16 rounded-[40%] border border-primary/20 bg-studio-white shadow-lg sm:h-20" />
          <div className="ml-[78%] h-24 w-2 rounded-full bg-primary sm:h-32" />
        </div>

        <div id="finale" className="final-copy absolute left-[7vw] top-1/2 z-40 w-[min(86vw,610px)] -translate-y-1/2 sm:left-[8vw]">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-paint-deep opacity-0">Paints · Tools · Possibilities</p>
          <h2 className="text-balance font-display text-[clamp(3rem,6.6vw,6.8rem)] font-semibold leading-[0.9] text-primary opacity-0">Bring Your Space to Life.</h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-navy-soft opacity-0 sm:text-base">Professional finishes and dependable tools for homes, workspaces, and everything you&apos;re ready to transform.</p>
          <div className="mt-8 flex flex-col gap-3 opacity-0 sm:flex-row">
            <Button variant="hero" size="hero" asChild><a href="mailto:hello@aksharapaints.com">Explore our products <ArrowRight /></a></Button>
            <Button variant="heroOutline" size="hero" asChild><a href="https://maps.google.com" target="_blank" rel="noreferrer">Visit our store</a></Button>
          </div>
        </div>

        <div className="scroll-cue absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 text-primary sm:bottom-9">
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.26em]">Scroll to discover</span>
          <ArrowDown className="size-4 animate-bounce" />
        </div>
        <div className="absolute bottom-7 left-7 z-40 hidden items-center gap-3 text-primary/60 sm:flex">
          <span className="stage-number font-display text-xs font-semibold">01</span><span className="h-px w-12 bg-primary/25"/><span className="text-[0.55rem] uppercase tracking-[0.2em]">Material in motion</span>
        </div>
      </section>
    </main>
  );
}