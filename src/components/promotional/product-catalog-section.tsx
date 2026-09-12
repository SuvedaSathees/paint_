import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Check,
  Sun,
  Gem,
  Layers,
  ShieldCheck,
  Box,
  CornerDownRight,
  Zap,
  Wrench,
  Disc,
  CircleDot,
  Anchor,
  Package,
  Hammer,
  Cable,
  Building2,
  Cpu,
  ToggleRight,
  Shield,
} from "lucide-react";

// ─── Organic Paint Swatch Blob Shapes (Matching Design) ────────────────────────

const BLOB_RADII = [
  "46% 54% 62% 38% / 48% 46% 54% 52%",
  "56% 44% 42% 58% / 54% 56% 44% 46%",
  "50% 50% 55% 45% / 44% 54% 46% 56%",
  "44% 56% 64% 36% / 56% 42% 58% 44%",
];

function WoodGrainIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <path d="M9 3v4c0 1.5.5 3 2 4.5 1.5 1.5 2 3 2 4.5v5" />
      <path d="M15 3v2c0 2-1 3.5-2 5" />
      <path d="M12 15c0 1.5.5 2.5 1.5 3.5 1 1 1.5 1.5 1.5 2.5" />
      <path d="M8 12c0 2 1 3.5 1 5" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "paints",
    badge: "OFFICIAL DEALER",
    badgeColor: "#1C1917",
    image: "/product-paints.jpg",
    eyebrow: "AUTHORISED DEALER",
    title: "Birla Opus Paints",
    desc: "Interior & exterior emulsions, primers, textures and computerized tinting on-site.",
    features: [
      { name: "Luxury", subname: "Emulsion", icon: Gem, bg: "#F5EFEB" },
      { name: "Weather", subname: "Guard", icon: Sun, bg: "#EEF3EE" },
      { name: "Primer", icon: WoodGrainIcon, bg: "#F3EEE7" },
      { name: "Wood", subname: "Finish", icon: Layers, bg: "#EFEBF4" },
    ],
    ctaText: "Shop Birla",
    sloganLines: ["COLOURS", "FOR A BRIGHTER", "TOMORROW"],
    link: "/products",
  },
  {
    id: "pipes",
    badge: "ISI CERTIFIED",
    badgeColor: "#1E3A8A",
    image: "/product-pipes.jpg",
    eyebrow: "ISI:9537 CERTIFIED PVC",
    title: "Electrical Conduit Pipes",
    desc: "Rigid PVC conduit pipes, junction boxes and fittings for concealed wiring.",
    features: [
      { name: "Rigid", subname: "PVC", icon: ShieldCheck, bg: "#EBF3F8" },
      { name: "Junction", subname: "Boxes", icon: Box, bg: "#EBF6F3" },
      { name: "Conduit", subname: "Elbows", icon: CornerDownRight, bg: "#EDF2FA" },
      { name: "Heavy", subname: "Gauge", icon: Zap, bg: "#EFF2F6" },
    ],
    ctaText: "Shop Electrical",
    sloganLines: ["ISI CERTIFIED", "CONDUIT PIPING", "SAFETY"],
    link: "/products",
  },
  {
    id: "bolts",
    badge: "BULK SUPPLY",
    badgeColor: "#581C87",
    image: "/product-bolts.jpg",
    eyebrow: "INDUSTRIAL FASTENERS",
    title: "Bolt And Nuts",
    desc: "Hex bolts, hex nuts, washers and anchor fasteners in zinc-plated and SS.",
    features: [
      { name: "Hex", subname: "Bolts", icon: Wrench, bg: "#F2EFF8" },
      { name: "Hex", subname: "Nuts", icon: Disc, bg: "#F5F0F8" },
      { name: "Spring", subname: "Washers", icon: CircleDot, bg: "#EFF2F5" },
      { name: "Anchor", subname: "Bolts", icon: Anchor, bg: "#EDF0F8" },
    ],
    ctaText: "Shop Bolt",
    sloganLines: ["HIGH-TENSILE", "INDUSTRIAL", "FASTENERS"],
    link: "/products",
  },
  {
    id: "building",
    badge: "SITE DELIVERY",
    badgeColor: "#064E3B",
    image: "/product-building.jpg",
    eyebrow: "CONSTRUCTION ESSENTIALS",
    title: "Building Materials",
    desc: "Cement, sand, binding wire, steel rods, solid blocks and structural supplies.",
    features: [
      { name: "Cement", subname: "Supply", icon: Package, bg: "#EAF6F0" },
      { name: "Steel", subname: "Rods", icon: Hammer, bg: "#F0F8F4" },
      { name: "Binding", subname: "Wire", icon: Cable, bg: "#EFF2F5" },
      { name: "Solid", subname: "Blocks", icon: Building2, bg: "#F9F5EA" },
    ],
    ctaText: "Shop Building",
    sloganLines: ["DIRECT SITE", "CONSTRUCTION", "SUPPLY"],
    link: "/products",
  },
  {
    id: "hardware",
    badge: "IN STOCK",
    badgeColor: "#78350F",
    image: "/akshara-tools.png",
    eyebrow: "SWITCHGEAR & FITTINGS",
    title: "Electrical & Hardware",
    desc: "Distribution boxes, MCBs, modular switches, hand tools and job accessories.",
    features: [
      { name: "MCB", subname: "Boxes", icon: Cpu, bg: "#F9F5EA" },
      { name: "Modular", subname: "Switches", icon: ToggleRight, bg: "#EBF4F9" },
      { name: "Steel", subname: "Trowels", icon: Shield, bg: "#F8F1EA" },
      { name: "Hand", subname: "Tools", icon: Wrench, bg: "#F7EEED" },
    ],
    ctaText: "Shop Hardware",
    sloganLines: ["JOB-SITE READY", "TOOLS & GEAR", "FITTINGS"],
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
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedStat({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return (
    <div ref={ref} className="text-center px-4">
      <div className="font-display text-3xl sm:text-4xl font-bold text-primary tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

// ─── Clean Professional Category Card ─────────────────────────────────────────

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
        transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 70}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 70}ms`,
      }}
      className="group relative flex flex-col shrink-0 w-[245px] sm:w-[255px] min-[960px]:w-[calc(100%-5px)] max-w-[283px] snap-center overflow-hidden rounded-[26px] border border-[#EAE5DA] bg-[#FAFAF8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] transition-all duration-300 mx-auto"
      aria-label={cat.title}
    >
      {/* 1 ── Upper Product Image with Organic Wave Divider */}
      <div className="relative h-[185px] sm:h-[195px] w-full overflow-hidden bg-[#F6F3ED]">
        <img
          src={cat.image}
          alt={`${cat.title} at Akshara Paints & Hardware`}
          width={300}
          height={195}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Ambient lighting gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/15 pointer-events-none" />

        {/* Clean Status Badge (Top-Right) */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-[#1C1917]/85 backdrop-blur-md text-white rounded-full px-2.5 py-0.5 text-[8px] font-extrabold tracking-[0.14em] uppercase shadow-sm border border-white/10 select-none">
          <span className="w-2 h-2 rounded-full bg-white/25 flex items-center justify-center">
            <Check className="size-1 text-white stroke-[3]" />
          </span>
          <span>{cat.badge}</span>
        </div>

        {/* Organic Wave Divider Transition */}
        <div className="absolute -bottom-[1px] left-0 w-full h-[38px] pointer-events-none z-10">
          <svg
            viewBox="0 0 500 80"
            preserveAspectRatio="none"
            className="w-full h-full block fill-[#FAFAF8]"
          >
            <path d="M 0,35 C 100,65 190,55 280,26 C 360,0 440,8 500,24 L 500,80 L 0,80 Z" />
          </svg>
        </div>
      </div>

      {/* 2 ── Lower Cream Content Section */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4 justify-between relative bg-[#FAFAF8] overflow-hidden">
        {/* Category Header: Eyebrow + Title (Full Width) */}
        <div className="mb-2">
          <span className="text-[7.5px] sm:text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#7A7268] block mb-1">
            {cat.eyebrow}
          </span>
          <h3 className="font-display font-extrabold text-neutral-900 text-[14px] sm:text-[14.5px] lg:text-[15px] leading-tight tracking-tight">
            {cat.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[11px] text-[#555048] leading-relaxed mb-3 font-normal min-h-[32px]">
          {cat.desc}
        </p>

        {/* 4 Feature Organic Paint Swatches */}
        <div className="grid grid-cols-4 gap-1 py-1 mb-2.5 mt-auto">
          {cat.features.map((feat, fi) => {
            const IconComp = feat.icon;
            return (
              <div key={fi} className="group/blob flex flex-col items-center text-center px-0.5">
                <div
                  className="w-[38px] h-[32px] sm:w-[42px] sm:h-[34px] flex items-center justify-center transition-all duration-300 group-hover/blob:scale-108 border border-black/[0.08] shadow-2xs"
                  style={{
                    backgroundColor: feat.bg,
                    borderRadius: BLOB_RADII[fi % BLOB_RADII.length],
                  }}
                >
                  <IconComp className="size-3.5 sm:size-4 stroke-[1.75] text-[#1C1917]" />
                </div>
                <span className="text-[9px] sm:text-[9.5px] font-semibold text-[#1C1917] leading-[1.2] mt-1.5 block text-center min-h-[22px]">
                  {feat.name}
                  {feat.subname && (
                    <>
                      <br />
                      {feat.subname}
                    </>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* 3 ── Golden-Yellow Acrylic Paint Swoosh Base (Matching Reference Design) */}
        <div className="relative mt-2 pt-2 pb-0.5">
          {/* Sweeping Golden-Yellow Acrylic Paint Texture Wave */}
          <div className="absolute -bottom-4 -left-4 -right-4 h-[72px] pointer-events-none overflow-hidden select-none">
            <svg
              viewBox="0 0 300 70"
              preserveAspectRatio="none"
              className="w-full h-full block"
            >
              <defs>
                {/* Mild Soft Cashmere / Warm Sand Paint Gradient */}
                <linearGradient id={`yellow-base-grad-${cat.id}`} x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D5C9B7" stopOpacity="0.55" />
                  <stop offset="35%" stopColor="#E5DCce" stopOpacity="0.65" />
                  <stop offset="70%" stopColor="#EEE6DA" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#F6F0E6" stopOpacity="0.85" />
                </linearGradient>

                {/* Subtle Soft Glaze for Gentle Depth */}
                <linearGradient id={`yellow-glaze-grad-${cat.id}`} x1="20%" y1="100%" x2="100%" y2="10%">
                  <stop offset="0%" stopColor="#C4B7A2" stopOpacity="0.18" />
                  <stop offset="50%" stopColor="#DBD0BF" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#F2ECE0" stopOpacity="0.25" />
                </linearGradient>

                {/* Gentle Bristle Streaks */}
                <linearGradient id={`yellow-streak-grad-${cat.id}`} x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#FAF7F2" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#E8DFD0" stopOpacity="0.12" />
                </linearGradient>
              </defs>

              {/* Main curved paint sweep rising from bottom-left up to top-right */}
              <path
                d="M 0,44 C 55,42 110,48 170,26 C 220,10 260,3 300,0 L 300,70 L 0,70 Z"
                fill={`url(#yellow-base-grad-${cat.id})`}
              />

              {/* Secondary glazed acrylic flow for physical paint body */}
              <path
                d="M 10,49 C 65,46 125,50 185,27 C 235,11 270,4 300,0 L 300,70 L 10,70 Z"
                fill={`url(#yellow-glaze-grad-${cat.id})`}
              />

              {/* Top rim highlight */}
              <path
                d="M 0,44 C 55,42 110,48 170,26 C 220,10 260,3 300,0"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.35"
                strokeWidth="1.2"
              />

              {/* Primary acrylic brush bristle highlight streak */}
              <path
                d="M 20,50 C 75,47 140,43 210,18 C 250,7 275,3 300,1"
                fill="none"
                stroke={`url(#yellow-streak-grad-${cat.id})`}
                strokeWidth="1.8"
              />

              {/* Secondary fine bristle streak */}
              <path
                d="M 45,59 C 105,55 175,46 240,23 C 270,12 288,7 300,5"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.2"
                strokeWidth="1"
              />

              {/* Lower soft shadow contour along the base edge */}
              <path
                d="M 0,65 C 60,63 130,57 200,43 C 250,33 280,24 300,18"
                fill="none"
                stroke="#B8AA96"
                strokeOpacity="0.15"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Foreground: CTA Pill Button + Category Slogan */}
          <div className="relative z-10 flex items-center justify-between gap-1.5 min-h-[38px]">
            <Link
              to={cat.link}
              className="inline-flex items-center justify-center bg-[#1C1917] hover:bg-[#2E2A25] active:scale-[0.98] text-white rounded-full py-2 px-4 text-[10.5px] sm:text-[11px] font-bold tracking-wide shadow-md transition-all duration-200 shrink-0"
            >
              <span>{cat.ctaText}</span>
            </Link>

            {/* Slogan over the mild wave on the right */}
            <div className="text-right leading-[1.12] pr-1 select-none pointer-events-none">
              <div className="text-[6.8px] sm:text-[7.2px] font-extrabold uppercase tracking-[0.06em] text-[#63574A] block drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                {cat.sloganLines.map((line, li) => (
                  <span key={li} className="block">
                    {line}
                  </span>
                ))}
              </div>
              <div className="w-3.5 h-[1.5px] bg-[#8A7C6D]/40 ml-auto mt-1 rounded-full" />
            </div>
          </div>
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
      className="relative bg-background overflow-hidden"
    >
      {/* 1 ── Section Header + Product Grid */}
      <div className="mx-auto max-w-[1580px] px-3 sm:px-5 lg:px-8 pt-6 sm:pt-8 pb-0">
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-[40px] mt-[20px]"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-accent block mb-[15px]">
            &mdash; EVERYTHING UNDER ONE ROOF &mdash;
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-primary mb-[20px]">
            What We Sell
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground tracking-wide leading-relaxed">
            From Birla Opus paints to industrial fasteners, conduit piping, and building materials &mdash; Akshara is Erode's one-stop destination for construction, renovation, and fine architectural finishing.
          </p>
        </div>

        {/* 3 ── Product Grid: 5 In A Single Line Across Laptops and Desktops */}
        <div
          ref={gridRef}
          className="flex flex-nowrap overflow-x-auto scrollbar-none snap-x snap-mandatory min-[960px]:grid min-[960px]:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-3.5 xl:gap-4 max-w-[1580px] mx-auto w-full pb-4 min-[960px]:pb-0 px-2 min-[960px]:px-0 justify-items-center"
        >
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} inView={gridInView} />
          ))}
        </div>

        {/* 4 ── Browse Full Catalogue Pill Button (No Arrow) */}
        <div
          className="mt-[52px] sm:mt-[60px] flex items-center justify-center"
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