import { useState, useEffect, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Palette,
  Layers,
  Wrench,
  BookOpen,
  MapPin,
  Phone,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

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

export const mobileNavItems = [
  { label: "Home", href: "/", icon: Home, subtitle: "Showcase & Interactive Hub" },
  { label: "Birla Opus Studio", href: "/visualizer", icon: Palette, subtitle: "Virtual Wall Color Simulator", badge: "3D Paint" },
  { label: "Products & Materials", href: "/products", icon: Layers, subtitle: "Paints, Pipes, Fasteners & Hardware" },
  { label: "Contractor Services", href: "/services", icon: Wrench, subtitle: "Site Consultation & Tinting" },
  { label: "Blog & Paint Guides", href: "/blog", icon: BookOpen, subtitle: "Technical Selection & Tips" },
  { label: "Branches & Showrooms", href: "/branches", icon: MapPin, subtitle: "Flagship & Warehouses in Erode" },
  { label: "Contact Us", href: "/contact", icon: Phone, subtitle: "Instant Quotes & Site Dispatch" },
];

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
      className={`relative z-10 flex items-center select-none group shrink-0 ${className || ""}`}
      aria-label="Akshara Paints & Hardware home"
    >
      <div className="flex items-center gap-2">
        {/* Monogram Circle Icon */}
        <div
          className={`flex items-center justify-center size-8 sm:size-9 lg:size-10 rounded-full shadow-xs transition-all shrink-0 ${
            light
              ? "bg-[#071624]/90 backdrop-blur-md border border-white/20 text-white group-hover:border-[#F05323]/70"
              : "bg-white/95 backdrop-blur-md border border-stone-200 text-stone-900 shadow-2xs group-hover:border-[#F05323]/50"
          }`}
        >
          <span className="font-serif text-[1rem] sm:text-[1.15rem] font-bold tracking-tight">
            A
          </span>
          <span className="size-1 sm:size-1.5 rounded-full bg-[#F05323] ml-0.5 mb-0.5" />
        </div>

        {/* Wordmark Typography */}
        <div className="flex flex-col text-left">
          <span
            className={`font-serif text-[1.15rem] sm:text-[1.35rem] lg:text-[1.65rem] font-semibold tracking-tight leading-none transition-colors ${
              light
                ? "text-white group-hover:text-amber-300"
                : "text-stone-900 group-hover:text-stone-700"
            }`}
          >
            Akshara
            <sup
              className={`text-[8.5px] sm:text-[10px] font-sans font-medium ml-0.5 ${
                light ? "text-amber-400" : "text-stone-600"
              }`}
            >
              ™
            </sup>
          </span>
          <span
            className={`mt-0.5 block text-[6px] sm:text-[7px] lg:text-[7.5px] font-extrabold tracking-[0.2em] uppercase leading-none ${
              light ? "text-[#E59B38]" : "text-stone-500"
            }`}
          >
            PAINTS &amp; HARDWARE
          </span>
        </div>
      </div>
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
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Auto-close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

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

      // Scrolling down -> hide navbar smoothly (unless mobile menu is open)
      if (currentScrollY > lastScrollY.current + 8 && !mobileMenuOpen) {
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
  }, [mobileMenuOpen]);

  const isLinkActive = (href: string) => {
    return href === "/" ? currentPath === "/" : currentPath.startsWith(href);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-2 sm:top-4 z-50 px-2 sm:px-6 lg:px-8 transition-all duration-300 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
        } ${className || ""}`}
      >
        {/* ======================================================= */}
        {/* MOBILE LUXURY NAVIGATION BAR (< lg)                     */}
        {/* Brand Logo + Studio Shortcut + Clean Animated Drawer   */}
        {/* ======================================================= */}
        <div className="lg:hidden relative w-full max-w-[480px] mx-auto">
          {/* Top Glass Pill Bar */}
          <div
            className={`flex items-center justify-between h-13 px-3.5 rounded-2xl transition-all duration-300 select-none ${
              isHero
                ? "bg-[#071624]/92 backdrop-blur-2xl border border-white/20 shadow-[0_12px_36px_rgba(7,20,32,0.5)] text-white"
                : "bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-[0_6px_24px_rgba(0,0,0,0.08)] text-stone-900"
            }`}
          >
            {/* Left: Brand Identity */}
            <BrandMark
              onClick={onNavigate ? () => onNavigate(false) : undefined}
              light={isHero}
            />

            {/* Right: Clean Menu Button */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`size-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 ${
                  isHero
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-xs"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 shadow-2xs"
                }`}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="size-4.5 stroke-[2.5]" />
                ) : (
                  <Menu className="size-4.5 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>

          {/* Backdrop Blur to close when clicking outside */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 top-18 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Luxury Slide-Down Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-[58px] inset-x-0 z-50 animate-in fade-in slide-in-from-top-3 duration-250">
              <div
                className={`rounded-3xl p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] border backdrop-blur-2xl transition-all ${
                  isHero
                    ? "bg-[#071624]/98 border-white/20 text-white"
                    : "bg-white/98 border-stone-200/90 text-stone-900"
                }`}
              >
                {/* Navigation Links with Icons and Descriptions */}
                <div className="space-y-1">
                  {mobileNavItems.map((item) => {
                    const active = isLinkActive(item.href);
                    const Icon = item.icon;

                    const activeStyle = isHero
                      ? "bg-gradient-to-r from-[#F05323] to-[#FF6B3D] text-white shadow-md font-bold"
                      : "bg-[#FFF0EB] text-[#F05323] font-bold border border-[#F05323]/30";

                    const inactiveStyle = isHero
                      ? "text-stone-200 hover:bg-white/10 hover:text-white"
                      : "text-stone-700 hover:bg-stone-50 hover:text-stone-900";

                    if (item.href === "/" && onNavigate) {
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onNavigate(false);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                            active ? activeStyle : inactiveStyle
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`size-8.5 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-white/20 text-white" : "bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-stone-200"}`}>
                              <Icon className="size-4.5" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-semibold truncate">{item.label}</span>
                              <span className="text-[10px] opacity-70 truncate">{item.subtitle}</span>
                            </div>
                          </div>
                          <ChevronRight className="size-4 opacity-50 shrink-0 ml-2" />
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                          active ? activeStyle : inactiveStyle
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`size-8.5 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-white/20 text-white" : "bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-stone-200"}`}>
                            <Icon className="size-4.5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold truncate">{item.label}</span>
                              {item.badge && (
                                <span className="text-[8.5px] font-extrabold uppercase tracking-wider bg-[#F05323] text-white px-1.5 py-0.5 rounded-full shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] opacity-70 truncate">{item.subtitle}</span>
                          </div>
                        </div>
                        <ChevronRight className="size-4 opacity-50 shrink-0 ml-2" />
                      </Link>
                    );
                  })}
                </div>

                {/* Bottom Quick Action Desk Bar */}
                <div className="mt-3.5 pt-3 border-t border-stone-200/60 dark:border-white/10 grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/919443722255?text=Hello%20Akshara%20Paints%20Erode%2C%20I%20am%20inquiring%20about%20Birla%20Opus%20paints."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-transform"
                  >
                    <WhatsAppIcon className="size-4" />
                    <span>WhatsApp Desk</span>
                  </a>

                  <a
                    href="tel:+919443722255"
                    className="flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 active:scale-98 text-stone-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white font-bold text-xs py-2.5 rounded-xl border border-stone-200/80 dark:border-white/15 transition-transform"
                  >
                    <Phone className="size-3.5 text-[#F05323]" />
                    <span>Call Store</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================= */}
        {/* DESKTOP CAPSULE NAVIGATION (>= lg)                     */}
        {/* ======================================================= */}
        <div className="hidden lg:block relative mx-auto w-fit max-w-[1240px]">
          {/* Main Floating Capsule */}
          <div
            className={`relative flex h-[64px] items-center justify-start gap-3.5 rounded-full px-6 transition-colors duration-300 ${
              isHero
                ? "bg-gradient-to-r from-[#071624]/95 via-[#0D2538]/92 to-[#071624]/95 backdrop-blur-xl border border-white/15 shadow-[0_16px_40px_rgba(7,20,32,0.42),0_0_0_1px_rgba(255,255,255,0.08)]"
                : "bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-[0_6px_30px_rgba(0,0,0,0.06)]"
            }`}
          >
            {/* Left: Brand Logo & Continuous Navigation Links */}
            <div className="flex items-center gap-3.5 shrink-0">
              <BrandMark
                onClick={onNavigate ? () => onNavigate(false) : undefined}
                light={isHero}
              />

              {/* Desktop Navigation Links */}
              <nav className="flex items-center gap-1.5" aria-label="Main navigation">
                {navItems.map((item, index) => {
                  const active = isLinkActive(item.href);
                  const activeClass = isHero
                    ? "bg-gradient-to-r from-[#F05323] to-[#FF6B3D] text-white font-semibold px-4 py-1.5 rounded-full shadow-[0_2px_14px_rgba(240,83,35,0.45)]"
                    : "bg-[#FFF0EB] text-[#F05323] font-semibold px-4 py-1.5 rounded-full shadow-2xs";

                  const inactiveClass = isHero
                    ? "text-stone-200 hover:text-white hover:bg-white/10 font-medium px-3 py-1.5 rounded-full transition-all"
                    : "text-stone-700 hover:text-stone-950 font-medium px-3 py-1.5 transition-all";

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
                          className={`font-light text-xs mx-2 select-none ${
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
            <div className="flex items-center shrink-0">
              <Link
                to="/contact"
                className={`group inline-flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full text-white font-medium text-[0.92rem] transition-all cursor-pointer ${
                  isHero
                    ? "bg-gradient-to-r from-[#F05323] via-[#F26438] to-[#E8592A] hover:from-[#E04818] hover:to-[#F05323] shadow-[0_4px_20px_rgba(240,83,35,0.45)] hover:shadow-[0_6px_28px_rgba(240,83,35,0.6)] hover:scale-[1.02] ring-1 ring-white/20"
                    : "bg-gradient-to-r from-[#F05323] to-[#E8592A] hover:from-[#E04818] hover:to-[#D44012] shadow-[0_4px_16px_rgba(240,83,35,0.32)] hover:shadow-[0_6px_22px_rgba(240,83,35,0.42)] hover:scale-[1.01]"
                }`}
              >
                <span>Contact Us</span>
                <span className="size-7.5 rounded-full bg-white flex items-center justify-center text-[#F05323] shadow-xs transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="size-3.5 stroke-[2.5]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
