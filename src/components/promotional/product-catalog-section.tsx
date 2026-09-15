import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Paintbrush,
  Sun,
  Gem,
  Layers,
  ShieldCheck,
  Box,
  CornerDownRight,
  Zap,
  Wrench,
  Hexagon,
  CircleDot,
  Anchor,
  Package,
  Hammer,
  Activity,
  Grid,
  Cpu,
  ToggleRight,
  Shield,
} from "lucide-react";

// ─── Data Exactly from User Screenshot ────────────────────────────────────────

const CATEGORIES = [
  {
    id: "paints",
    badge: "• OFFICIAL DEALER",
    image: "/product-paints.jpg",
    eyebrow: "AUTHORISED DEALER",
    title: "Birla Opus Paints",
    desc: "Interior & exterior emulsions, primers, textures and computerized tinting on-site.",
    features: [
      { line1: "Luxury", line2: "Emulsion", icon: Gem },
      { line1: "Weather", line2: "Guard", icon: Sun },
      { line1: "Primer", line2: "", icon: Paintbrush },
      { line1: "Wood", line2: "Finish", icon: Layers },
    ],
    ctaText: "Shop Birla",
    microcopy: ["COLOURS", "FOR A BRIGHTER", "TOMORROW"],
    link: "/products",
  },
  {
    id: "pipes",
    badge: "• ISI CERTIFIED",
    image: "/product-pipes.jpg",
    eyebrow: "ISI:9537 CERTIFIED PVC",
    title: "Electrical Conduit Pipes",
    desc: "Rigid PVC conduit pipes, junction boxes and fittings for concealed wiring.",
    features: [
      { line1: "Rigid", line2: "PVC", icon: ShieldCheck },
      { line1: "Junction", line2: "Boxes", icon: Box },
      { line1: "Conduit", line2: "Elbows", icon: CornerDownRight },
      { line1: "Heavy", line2: "Gauge", icon: Zap },
    ],
    ctaText: "Shop Electrical",
    microcopy: ["ISI CERTIFIED", "CONDUIT PIPING", "SAFETY"],
    link: "/products",
  },
  {
    id: "bolts",
    badge: "• BULK SUPPLY",
    image: "/product-bolts.jpg",
    eyebrow: "INDUSTRIAL FASTENERS",
    title: "Bolt And Nuts",
    desc: "Hex bolts, hex nuts, washers and anchor fasteners in zinc-plated and SS.",
    features: [
      { line1: "Hex", line2: "Bolts", icon: Wrench },
      { line1: "Hex", line2: "Nuts", icon: Hexagon },
      { line1: "Spring", line2: "Washers", icon: CircleDot },
      { line1: "Anchor", line2: "Bolts", icon: Anchor },
    ],
    ctaText: "Shop Bolt",
    microcopy: ["HIGH-TENSILE", "INDUSTRIAL", "FASTENERS"],
    link: "/products",
  },
  {
    id: "building",
    badge: "• SITE DELIVERY",
    image: "/product-building.jpg",
    eyebrow: "CONSTRUCTION ESSENTIALS",
    title: "Building Materials",
    desc: "Cement, sand, binding wire, steel rods, solid blocks and structural supplies.",
    features: [
      { line1: "Cement", line2: "Supply", icon: Package },
      { line1: "Steel", line2: "Rods", icon: Hammer },
      { line1: "Binding", line2: "Wire", icon: Activity },
      { line1: "Solid", line2: "Blocks", icon: Grid },
    ],
    ctaText: "Shop Building",
    microcopy: ["DIRECT SITE", "CONSTRUCTION", "SUPPLY"],
    link: "/products",
  },
  {
    id: "hardware",
    badge: "• IN STOCK",
    image: "/akshara-tools.png",
    eyebrow: "SWITCHGEAR & FITTINGS",
    title: "Electrical & Hardware",
    desc: "Distribution boxes, MCBs, modular switches, hand tools and job accessories.",
    features: [
      { line1: "MCB", line2: "Boxes", icon: Cpu },
      { line1: "Modular", line2: "Switches", icon: ToggleRight },
      { line1: "Steel", line2: "Trowels", icon: Shield },
      { line1: "Hand", line2: "Tools", icon: Wrench },
    ],
    ctaText: "Shop Hardware",
    microcopy: ["JOB-SITE READY", "TOOLS & GEAR", "FITTINGS"],
    link: "/products",
  },
];

// ─── Hook: scroll reveal ──────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    // Check if already in or near viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "80px" }
    );
    obs.observe(el);

    // Fallback: reveal after 600ms so content is never stuck hidden
    const timer = setTimeout(() => {
      setInView(true);
    }, 600);

    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, [threshold]);
  return { ref, inView };
}

// ─── Exact Category Card Matching User Screenshot Pixel-For-Pixel ─────────────

function CategoryCard({
  cat,
  index,
  inView,
}: {
  cat: (typeof CATEGORIES)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <article
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms`,
      }}
      className="group relative flex flex-col overflow-hidden rounded-[26px] xl:rounded-[28px] border border-stone-200/90 bg-white shadow-[0_4px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.11)] transition-all duration-300 w-full h-fit"
      aria-label={cat.title}
    >
      {/* 1 ── Product Image Block with Signature Organic Wave Divider */}
      <div className="relative h-[190px] xl:h-[210px] w-full overflow-hidden bg-[#F6F3ED]">
        <img
          src={cat.image}
          alt={`${cat.title} at Akshara Paints & Hardware`}
          width={380}
          height={210}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Ambient top/bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/30 pointer-events-none" />

        {/* Status Badge */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center bg-black/80 backdrop-blur-sm text-white rounded-full px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider shadow-sm border border-white/10 select-none">
          <span>{cat.badge}</span>
        </div>

        {/* Signature Organic Wave Divider merging image into white card body */}
        <svg
          className="absolute -bottom-[1px] left-0 right-0 w-full h-6 xl:h-7 text-white pointer-events-none"
          viewBox="0 0 400 36"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,18 C90,32 170,6 260,20 C320,30 365,14 400,22 L400,36 L0,36 Z" />
        </svg>
      </div>

      {/* 2 ── Content Block: Snug and compact, matching screenshot pixel-for-pixel */}
      <div className="flex flex-col p-3.5 xl:p-4 bg-white relative">
        {/* Subtle Warm Beige Accent Wave in Bottom-Right Corner (Exact from Screenshot) */}
        <div className="absolute bottom-0 right-0 w-[65%] h-[42px] pointer-events-none overflow-hidden rounded-br-[26px] xl:rounded-br-[28px] z-0">
          <svg
            viewBox="0 0 160 42"
            fill="none"
            className="w-full h-full text-[#F5EFE8]"
            preserveAspectRatio="none"
          >
            <path d="M0,42 C45,36 85,10 160,2 L160,42 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative z-10">
          {/* Eyebrow in warm ochre/amber */}
          <span className="text-[8px] xl:text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-[#C0772C] block mb-1">
            {cat.eyebrow}
          </span>
          {/* Title */}
          <h3 className="font-display font-bold text-[#0F1E36] text-[15px] xl:text-[16px] leading-tight tracking-tight mb-1">
            {cat.title}
          </h3>
          {/* Description */}
          <p className="text-[9.5px] xl:text-[10px] text-stone-500 leading-snug mb-2.5 line-clamp-2 min-h-[28px]">
            {cat.desc}
          </p>

          {/* 4 Micro-Feature Icons with Labels */}
          <div className="grid grid-cols-4 gap-1 py-0.5 mb-2 text-center">
            {cat.features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="flex flex-col items-center justify-start min-w-0">
                  <div className="size-7 xl:size-7.5 rounded-full bg-[#F5F4F0] border border-stone-200/80 flex items-center justify-center text-stone-700 shadow-2xs mb-1 group-hover:border-amber-400/50 group-hover:bg-amber-50/50 group-hover:text-amber-800 transition-colors">
                    <Icon className="size-3.5 xl:size-3.5 stroke-[1.75]" />
                  </div>
                  <span className="text-[7.5px] xl:text-[8px] font-semibold text-stone-600 leading-[1.15] text-center">
                    {feat.line1}
                    {feat.line2 ? (
                      <>
                        <br />
                        {feat.line2}
                      </>
                    ) : (
                      <span className="invisible select-none">
                        <br />
                        &nbsp;
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 ── Action Button Strip: Sits right below the icons without spacious gap */}
        <div className="flex items-center justify-between mt-2.5 pt-1 relative z-10">
          <Link
            to={cat.link}
            className="inline-flex items-center justify-center bg-[#111827] hover:bg-black active:scale-[0.97] text-white rounded-full py-1.5 px-3.5 xl:px-4 text-[9.5px] xl:text-[10.5px] font-bold tracking-wide shadow-xs transition-all duration-200 cursor-pointer"
          >
            <span>{cat.ctaText}</span>
          </Link>
          <div className="text-[7px] xl:text-[7.5px] font-bold text-stone-400 uppercase tracking-tight text-right leading-[1.15] max-w-[85px]">
            {cat.microcopy.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Mobile Category Card: Clean Small Box Like Service ───────────────────────

function MobileCategoryCard({
  cat,
  index,
  inView,
  isLastOdd = false,
}: {
  cat: (typeof CATEGORIES)[0];
  index: number;
  inView: boolean;
  isLastOdd?: boolean;
}) {
  return (
    <article
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
        transition: `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 50}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 50}ms`,
      }}
      className={`group relative flex flex-col justify-between rounded-[18px] sm:rounded-[22px] border border-[#E7E2D6] bg-[#FAF8F5] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 w-full ${
        isLastOdd ? "col-span-2 justify-self-center w-[calc(50%-5px)] max-w-[calc(50%-5px)]" : ""
      }`}
      aria-label={cat.title}
    >
      {/* Visual Header - compact like service */}
      <div className="relative h-[115px] sm:h-[135px] w-full overflow-hidden bg-stone-100">
        <img
          src={cat.image}
          alt={`${cat.title} at Akshara Paints`}
          width={280}
          height={135}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20 pointer-events-none" />

        {/* Compact Status Badge */}
        <div className="absolute top-2 right-2 z-10 flex items-center bg-black/80 backdrop-blur-xs text-white rounded-full px-2 py-0.5 text-[7px] sm:text-[8px] font-extrabold uppercase tracking-wider shadow-xs border border-white/10 select-none">
          <span>{cat.badge}</span>
        </div>
      </div>

      {/* Card Body - clean small box like service */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Eyebrow */}
          <span className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-[#C0772C] block mb-0.5 truncate">
            {cat.eyebrow}
          </span>
          <h3 className="font-display font-serif text-[12.5px] sm:text-sm font-bold text-[#0F1E36] tracking-tight leading-tight line-clamp-1 group-hover:text-[#F05323] transition-colors">
            {cat.title}
          </h3>
          <p className="mt-1 text-[9px] sm:text-[10px] text-stone-500 leading-snug line-clamp-2">
            {cat.desc}
          </p>
        </div>

        {/* Card Action - clean compact button like service */}
        <div className="mt-2.5 pt-2 border-t border-stone-200/80">
          <Button
            variant="hero"
            size="sm"
            asChild
            className="w-full h-7 rounded-full text-[10px] font-semibold cursor-pointer shadow-xs justify-center"
          >
            <Link to={cat.link} className="flex items-center justify-center">
              <span>{cat.ctaText} &rarr;</span>
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function ProductCatalogSection() {
  const { ref: gridRef, inView: gridInView } = useInView(0.05);
  const { ref: headerRef, inView: headerInView } = useInView(0.2);

  return (
    <section
      id="products-showcase"
      aria-label="Akshara Paints & Hardware product categories"
      className="relative bg-[#FCFCFA] overflow-hidden"
    >
      {/* 1 ── Section Header + Product Grid */}
      <div className="mx-auto max-w-[1580px] px-3 sm:px-5 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-12">
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 mt-2 sm:mt-4"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#D97706] block mb-1.5">
            &mdash; EVERYTHING UNDER ONE ROOF &mdash;
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#0F1E36] mb-2.5">
            What We Sell
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 tracking-wide leading-relaxed">
            From Birla Opus paints to industrial fasteners, conduit piping, and building materials &mdash; Akshara is Erode's one-stop destination for construction, renovation, and fine architectural finishing.
          </p>
        </div>

        {/* 2 ── Product Grids Container (Wrapper ensures IntersectionObserver fires on desktop & mobile) */}
        <div ref={gridRef} className="w-full">
          {/* Mobile Grid: Small boxes like service (< 860px) */}
          <div
            className="grid min-[860px]:hidden grid-cols-2 gap-2.5 sm:gap-3.5 max-w-xl mx-auto w-full px-1 justify-items-stretch"
          >
            {CATEGORIES.map((cat, i) => (
              <MobileCategoryCard
                key={cat.id}
                cat={cat}
                index={i}
                inView={gridInView}
                isLastOdd={i === CATEGORIES.length - 1 && CATEGORIES.length % 2 !== 0}
              />
            ))}
          </div>

          {/* Desktop Grid: Strictly 5 in a Row matching screenshot (>= 860px) */}
          <div
            className="hidden min-[860px]:grid min-[860px]:grid-cols-5 website-5-cols gap-2.5 sm:gap-3 lg:gap-3 xl:gap-3.5 max-w-[1360px] mx-auto w-full px-1 sm:px-0 justify-items-stretch"
          >
            {CATEGORIES.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                index={i}
                inView={gridInView}
              />
            ))}
          </div>
        </div>

        {/* 3 ── Browse Full Catalogue Button */}
        <div
          className="mt-8 sm:mt-12 flex items-center justify-center"
          style={{
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <Button variant="hero" size="hero" asChild>
            <Link to="/products">
              Browse Full Catalogue
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}