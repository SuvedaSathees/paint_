import { useState, useEffect, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";

export const leftNavItems = [
  { label: "Home", href: "/" },
  { label: "Visualizer", href: "/visualizer" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
];

export const rightNavItems = [
  { label: "Blog", href: "/blog" },
  { label: "Branches", href: "/branches" },
];

export const navItems = [...leftNavItems, ...rightNavItems];

export function BrandMark({
  onClick,
  className,
  light = false,
}: {
  onClick?: () => void;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`relative z-10 flex flex-col text-left select-none group shrink-0 ${className || ""}`}
      aria-label="Akshara Paints & Hardware home"
    >
      <span
        className={`font-serif text-[1.45rem] sm:text-[1.65rem] font-semibold tracking-tight leading-none transition-colors ${
          light
            ? "text-white group-hover:text-amber-300"
            : "text-stone-900 group-hover:text-stone-700"
        }`}
      >
        Akshara
        <sup
          className={`text-[10px] font-sans font-medium ml-0.5 ${
            light ? "text-amber-400" : "text-stone-600"
          }`}
        >
          ™
        </sup>
      </span>
      <span
        className={`mt-0.5 block text-[7px] sm:text-[7.5px] font-extrabold tracking-[0.24em] uppercase leading-none ${
          light ? "text-[#E59B38]" : "text-stone-700"
        }`}
      >
        PAINTS &amp; HARDWARE
      </span>
    </Link>
  );
}

interface SiteHeaderProps {
  onNavigate?: (toEnd: boolean) => void;
  className?: string;
  variant?: "default" | "hero";
}

export function SiteHeader({
  onNavigate,
  className,
  variant = "default",
}: SiteHeaderProps = {}) {
  const isHero = variant === "hero";
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Smart auto-hide on scroll down, smooth reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always visible near top of page (within 60px)
      if (currentScrollY < 60) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Keep visible if mobile dropdown menu is open
      if (open) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scrolling down -> hide navbar smoothly
      if (currentScrollY > lastScrollY.current + 8) {
        setIsVisible(false);
      }
      // Scrolling up -> reveal navbar smoothly
      else if (currentScrollY < lastScrollY.current - 8) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  const isLinkActive = (href: string) => {
    return href === "/" ? currentPath === "/" : currentPath.startsWith(href);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-4 z-50 px-3 sm:px-6 lg:px-8 transition-all duration-300 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
        } ${className || ""}`}
      >
        <div className="relative mx-auto w-full lg:w-fit max-w-[1240px]">
          {/* Main Floating Capsule */}
          <div
            className={`relative flex h-[58px] sm:h-[64px] items-center justify-between lg:justify-start gap-2.5 sm:gap-3 lg:gap-3.5 rounded-full px-4 sm:px-5 lg:px-6 z-10 transition-colors duration-300 ${
              isHero
                ? "bg-gradient-to-r from-[#071624]/95 via-[#0D2538]/92 to-[#071624]/95 backdrop-blur-xl border border-white/15 shadow-[0_16px_40px_rgba(7,20,32,0.42),0_0_0_1px_rgba(255,255,255,0.08)]"
                : "bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-[0_6px_30px_rgba(0,0,0,0.06)]"
            }`}
          >
            {/* Left: Brand Logo & Continuous Navigation Links */}
            <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
              <BrandMark
                onClick={onNavigate ? () => onNavigate(false) : undefined}
                light={isHero}
              />

              {/* Desktop Navigation Links (Home, Products, Services, Blog, Branches) */}
              <nav className="hidden lg:flex items-center gap-1 sm:gap-1.5" aria-label="Main navigation">
                {navItems.map((item, index) => {
                  const active = isLinkActive(item.href);
                  const activeClass = isHero
                    ? "bg-gradient-to-r from-[#F05323] to-[#FF6B3D] text-white font-semibold px-4 py-1.5 rounded-full shadow-[0_2px_14px_rgba(240,83,35,0.45)]"
                    : "bg-[#FFF0EB] text-[#F05323] font-semibold px-4 py-1.5 rounded-full shadow-2xs";

                  const inactiveClass = isHero
                    ? "text-stone-200 hover:text-white hover:bg-white/10 font-medium px-2.5 sm:px-3 py-1.5 rounded-full transition-all"
                    : "text-stone-700 hover:text-stone-950 font-medium px-2.5 sm:px-3 py-1.5 transition-all";

                  return (
                    <div key={item.label} className="flex items-center">
                      {item.href === "/" && onNavigate ? (
                        <button
                          type="button"
                          onClick={() => onNavigate(false)}
                          className={`text-[0.92rem] cursor-pointer ${
                            active ? activeClass : inactiveClass
                          }`}
                        >
                          <span>{item.label}</span>
                        </button>
                      ) : (
                        <Link
                          to={item.href}
                          className={`text-[0.92rem] cursor-pointer ${
                            active ? activeClass : inactiveClass
                          }`}
                        >
                          <span>{item.label}</span>
                        </Link>
                      )}
                      {index < navItems.length - 1 && (
                        <span
                          className={`font-light text-xs mx-1.5 sm:mx-2 select-none ${
                            isHero ? "text-white/20" : "text-stone-300"
                          }`}
                        >
                          |
                        </span>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Desktop Right: Contact Us CTA Pill with Arrow Circle */}
            <div className="hidden lg:flex items-center shrink-0">
              <Link
                to="/contact"
                className={`group inline-flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full text-white font-medium text-[0.88rem] sm:text-[0.92rem] transition-all cursor-pointer ${
                  isHero
                    ? "bg-gradient-to-r from-[#F05323] via-[#F26438] to-[#E8592A] hover:from-[#E04818] hover:to-[#F05323] shadow-[0_4px_20px_rgba(240,83,35,0.45)] hover:shadow-[0_6px_28px_rgba(240,83,35,0.6)] hover:scale-[1.02] ring-1 ring-white/20"
                    : "bg-gradient-to-r from-[#F05323] to-[#E8592A] hover:from-[#E04818] hover:to-[#D44012] shadow-[0_4px_16px_rgba(240,83,35,0.32)] hover:shadow-[0_6px_22px_rgba(240,83,35,0.42)] hover:scale-[1.01]"
                }`}
              >
                <span>Contact Us</span>
                <span className="size-7 sm:size-7.5 rounded-full bg-white flex items-center justify-center text-[#F05323] shadow-xs transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="size-3.5 stroke-[2.5]" />
                </span>
              </Link>
            </div>

            {/* Mobile Right Controls: Contact Icon & Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/contact"
                className="size-9 rounded-full bg-[#F05323] text-white flex items-center justify-center shadow-xs"
                aria-label="Contact Us"
              >
                <ArrowRight className="size-4 stroke-[2.5]" />
              </Link>

              <button
                type="button"
                className={`size-9 place-items-center rounded-full grid cursor-pointer transition-colors ${
                  isHero
                    ? "bg-white/10 hover:bg-white/15 border border-white/20 text-white shadow-xs"
                    : "bg-white shadow-xs border border-stone-200/70 text-stone-700"
                }`}
                onClick={() => setOpen((value) => !value)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <nav
            className={`mx-auto mt-2 grid max-w-[1240px] gap-1 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl lg:hidden animate-in fade-in slide-in-from-top-2 z-50 ${
              isHero
                ? "border border-white/15 bg-[#081824]/98 text-white"
                : "border border-white/80 bg-white/95 text-stone-800"
            }`}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              const activeMobileClass = isHero
                ? "bg-gradient-to-r from-[#F05323] to-[#FF6B3D] text-white font-semibold shadow-sm"
                : "bg-[#FFEFEA] text-[#F05323] font-semibold border border-[#FED7C7]/50";

              const inactiveMobileClass = isHero
                ? "text-stone-200 hover:bg-white/10"
                : "text-stone-800 hover:bg-stone-100/70";

              if (item.href === "/" && onNavigate) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onNavigate(false);
                    }}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors w-full text-left ${
                      active ? activeMobileClass : inactiveMobileClass
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className={`size-2 rounded-full ${isHero ? "bg-white" : "bg-[#F05323]"}`} />
                    )}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    active ? activeMobileClass : inactiveMobileClass
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className={`size-2 rounded-full ${isHero ? "bg-white" : "bg-[#F05323]"}`} />
                  )}
                </Link>
              );
            })}

            <div className={`pt-3 mt-1 border-t ${isHero ? "border-white/10" : "border-stone-100"}`}>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-between pl-5 pr-1.5 py-1.5 rounded-full bg-gradient-to-r from-[#F05323] to-[#E8592A] text-white font-medium text-sm shadow-md"
              >
                <span>Contact Us</span>
                <span className="size-8 rounded-full bg-white flex items-center justify-center text-[#F05323] shadow-sm">
                  <ArrowRight className="size-3.5 stroke-[2.5]" />
                </span>
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
