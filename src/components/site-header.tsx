import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";

export const leftNavItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
];

export const rightNavItems = [
  { label: "Blog", href: "/blog" },
  { label: "Brands", href: "/branches" },
];

export const navItems = [...leftNavItems, ...rightNavItems];

export function BrandMark({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`relative z-10 flex flex-col text-left select-none group shrink-0 ${className || ""}`}
      aria-label="Akshara Paints & Hardware home"
    >
      <span className="font-serif text-[1.45rem] sm:text-[1.65rem] font-semibold tracking-tight text-stone-900 leading-none group-hover:text-stone-700 transition-colors">
        Akshara<sup className="text-[10px] font-sans font-medium text-stone-600 ml-0.5">™</sup>
      </span>
      <span className="mt-0.5 block text-[7px] sm:text-[7.5px] font-extrabold tracking-[0.24em] text-stone-700 uppercase leading-none">
        PAINTS &amp; HARDWARE
      </span>
    </Link>
  );
}

interface SiteHeaderProps {
  onNavigate?: (toEnd: boolean) => void;
  className?: string;
}

export function SiteHeader({ onNavigate, className }: SiteHeaderProps = {}) {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isLinkActive = (href: string) => {
    return href === "/" ? currentPath === "/" : currentPath.startsWith(href);
  };

  return (
    <>
      <header className={className || "sticky top-4 z-50 px-3 sm:px-6 lg:px-8"}>
        <div className="relative mx-auto w-full lg:w-fit max-w-[1240px]">
          {/* Main White Floating Capsule (Matching User's Reference) */}
          <div className="relative flex h-[58px] sm:h-[64px] items-center justify-between lg:justify-start gap-2.5 sm:gap-3 lg:gap-3.5 rounded-full bg-white/95 backdrop-blur-md px-4 sm:px-5 lg:px-6 shadow-[0_6px_30px_rgba(0,0,0,0.06)] border border-stone-200/80 z-10">
            {/* Left: Brand Logo & Continuous Navigation Links */}
            <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
              <BrandMark onClick={onNavigate ? () => onNavigate(false) : undefined} />

              {/* Desktop Navigation Links (Home, Products, Services, Blog, Brands) */}
              <nav className="hidden lg:flex items-center gap-1 sm:gap-1.5" aria-label="Main navigation">
                {navItems.map((item, index) => {
                  const active = isLinkActive(item.href);
                  return (
                    <div key={item.label} className="flex items-center">
                      {item.href === "/" && onNavigate ? (
                        <button
                          type="button"
                          onClick={() => onNavigate(false)}
                          className={`text-[0.92rem] transition-all cursor-pointer ${
                            active
                              ? "bg-[#FFF0EB] text-[#F05323] font-semibold px-4 py-1.5 rounded-full shadow-2xs"
                              : "text-stone-700 hover:text-stone-950 font-medium px-2.5 sm:px-3 py-1.5"
                          }`}
                        >
                          <span>{item.label}</span>
                        </button>
                      ) : (
                        <Link
                          to={item.href}
                          className={`text-[0.92rem] transition-all cursor-pointer ${
                            active
                              ? "bg-[#FFF0EB] text-[#F05323] font-semibold px-4 py-1.5 rounded-full shadow-2xs"
                              : "text-stone-700 hover:text-stone-950 font-medium px-2.5 sm:px-3 py-1.5"
                          }`}
                        >
                          <span>{item.label}</span>
                        </Link>
                      )}
                      {index < navItems.length - 1 && (
                        <span className="text-stone-300 font-light text-xs mx-1.5 sm:mx-2 select-none">
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
                className="group inline-flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full bg-gradient-to-r from-[#F05323] to-[#E8592A] hover:from-[#E04818] hover:to-[#D44012] text-white font-medium text-[0.88rem] sm:text-[0.92rem] shadow-[0_4px_16px_rgba(240,83,35,0.32)] hover:shadow-[0_6px_22px_rgba(240,83,35,0.42)] hover:scale-[1.01] transition-all cursor-pointer"
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
                className="size-9 place-items-center rounded-full bg-white shadow-xs border border-stone-200/70 text-stone-700 grid cursor-pointer"
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
            className="mx-auto mt-2 grid max-w-[1240px] gap-1 rounded-3xl border border-white/80 bg-white/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden animate-in fade-in slide-in-from-top-2 z-50"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => {
              const active = isLinkActive(item.href);

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
                      active
                        ? "bg-[#FFEFEA] text-[#F05323] font-semibold border border-[#FED7C7]/50"
                        : "text-stone-800 hover:bg-stone-100/70"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="size-2 rounded-full bg-[#F05323]" />}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#FFEFEA] text-[#F05323] font-semibold border border-[#FED7C7]/50"
                      : "text-stone-800 hover:bg-stone-100/70"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="size-2 rounded-full bg-[#F05323]" />}
                </Link>
              );
            })}

            <div className="pt-3 mt-1 border-t border-stone-100">
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
