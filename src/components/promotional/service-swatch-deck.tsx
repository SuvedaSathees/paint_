import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCard {
  id: string;
  num: string;
  title: string;
  category: string;
  color: string;
  accentBg: string;
  tagline: string;
  summary: string;
  features: { title: string; badge: string }[];
  specs: { label: string; value: string }[];
  ctaText: string;
  rotationClass: string;
  translateHover: string;
  link: string;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: "dealer",
    num: "NO. 01 · AUTHORIZED DEALER",
    title: "Birla Opus Paints",
    category: "Decorative & Protective Paints",
    color: "#567761",
    accentBg: "rgba(86, 119, 97, 0.12)",
    tagline: "Official Birla Dealer · Tinting Lab",
    summary: "Authorized dealer offering verified factory-sealed paints, precision color tinting, and official warranties.",
    features: [
      { title: "Factory Sealed", badge: "Genuine" },
      { title: "Tinting Lab", badge: "In-Store" },
      { title: "Stain Defense", badge: "Teflon™" },
      { title: "Warranty Cover", badge: "5-Year" },
    ],
    specs: [
      { label: "SHADES", value: "5000+" },
      { label: "TINTING", value: "On-Site" },
      { label: "WARRANTY", value: "5 Years" },
    ],
    ctaText: "Explore Birla Paints",
    rotationClass: "-rotate-4 sm:-rotate-6",
    translateHover: "hover:-translate-y-6 sm:hover:-translate-y-10",
    link: "/products",
  },
  {
    id: "conduits",
    num: "NO. 02 · ISI CERTIFIED",
    title: "Electrical Conduits",
    category: "Concealed & Surface Wiring Safety",
    color: "#C66E53",
    accentBg: "rgba(198, 110, 83, 0.12)",
    tagline: "ISI:9537 Rigid PVC & Junction Boxes",
    summary: "High-impact rigid PVC pipes and fittings engineered for residential wiring and commercial job sites.",
    features: [
      { title: "Heavy Gauge PVC", badge: "ISI:9537" },
      { title: "Thermal Safety", badge: "Fire Safe" },
      { title: "Junction Boxes", badge: "Full Stock" },
      { title: "Site Bundles", badge: "3m Pipes" },
    ],
    specs: [
      { label: "STANDARD", value: "ISI:9537" },
      { label: "LENGTH", value: "3 Metres" },
      { label: "MATERIAL", value: "PVC" },
    ],
    ctaText: "Explore Conduits",
    rotationClass: "-rotate-1 sm:-rotate-2",
    translateHover: "hover:-translate-y-6 sm:hover:-translate-y-10",
    link: "/products",
  },
  {
    id: "fasteners",
    num: "NO. 03 · INDUSTRIAL GRADE",
    title: "Bolts & Fasteners",
    category: "Structural & Engineering Hardware",
    color: "#4A6B82",
    accentBg: "rgba(74, 107, 130, 0.12)",
    tagline: "High-Tensile Grade 8.8 & SS 304/316",
    summary: "Precision fasteners designed for structural steel framing, civil construction, and marine durability.",
    features: [
      { title: "Hex Head Bolts", badge: "Gr. 8.8" },
      { title: "Stainless Steel", badge: "SS 316" },
      { title: "Masonry Anchors", badge: "Structural" },
      { title: "Contractor Sacks", badge: "Wholesale" },
    ],
    specs: [
      { label: "GRADES", value: "8.8 / SS" },
      { label: "SIZES", value: "M6-M36" },
      { label: "SUPPLY", value: "Wholesale" },
    ],
    ctaText: "Explore Fasteners",
    rotationClass: "rotate-1 sm:rotate-2",
    translateHover: "hover:-translate-y-6 sm:hover:-translate-y-10",
    link: "/products",
  },
  {
    id: "delivery",
    num: "NO. 04 · SAME-DAY DISPATCH",
    title: "Job-Site Delivery",
    category: "Direct Supply to Project Sites",
    color: "#D8A343",
    accentBg: "rgba(216, 163, 67, 0.12)",
    tagline: "Direct Delivery for Drums & Bundles",
    summary: "Dedicated transport fleet delivering 3m conduit bundles, 20L paint drums, and heavy cargo direct to your site.",
    features: [
      { title: "Prompt Dispatch", badge: "Same-Day" },
      { title: "Bulk Cargo Fleet", badge: "Direct" },
      { title: "GST Invoicing", badge: "Official" },
      { title: "Network Reach", badge: "All Sites" },
    ],
    specs: [
      { label: "DISPATCH", value: "Same-Day" },
      { label: "FLEET", value: "Express" },
      { label: "INVOICE", value: "GST Ready" },
    ],
    ctaText: "Order Site Delivery",
    rotationClass: "rotate-4 sm:rotate-6",
    translateHover: "hover:-translate-y-6 sm:hover:-translate-y-10",
    link: "/branches",
  },
];

export function ServiceSwatchDeck() {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const handleCardClick = (cardId: string) => {
    setFlippedCardId((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <section className="pt-[60px] pb-6 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent block mb-2">
          &mdash; THE GOLD STANDARD IN PAINTS &amp; HARDWARE &mdash;
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-primary">
          Why Choose Akshara
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground tracking-wide leading-relaxed">
          Combining official Birla Opus color excellence with an unmatched industrial hardware supply chain built for residential and commercial sites. Click any card to flip and inspect full specifications.
        </p>
      </div>

      {/* Fanned Cards Display with 3D Flip */}
      <div className="relative pt-6 pb-12 sm:pb-20 max-w-6xl mx-auto flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 w-full place-items-center">
          {SERVICE_CARDS.map((card) => {
            const isFlipped = flippedCardId === card.id;

            return (
              <div
                key={card.id}
                className="perspective-1000 w-full max-w-[295px] sm:max-w-[305px] h-[490px] sm:h-[510px]"
              >
                {/* Flippable Card Container */}
                <div
                  onClick={() => handleCardClick(card.id)}
                  className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-out cursor-pointer select-none ${
                    isFlipped
                      ? "rotate-y-180 rotate-0 -translate-y-2 z-40"
                      : `${card.rotationClass} ${card.translateHover} z-10 hover:z-30`
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    WebkitFontSmoothing: "antialiased",
                    textRendering: "geometricPrecision",
                  }}
                >
                  {/* ==================================================== */}
                  {/* FRONT FACE OF CARD (Paint Swatch Look - HD)         */}
                  {/* ==================================================== */}
                  <div
                    className="backface-hidden absolute inset-0 w-full h-full flex flex-col justify-between rounded-3xl overflow-hidden border border-stone-200/90 bg-[#FAF7F2] text-stone-950 shadow-xl transition-shadow duration-300 hover:shadow-2xl hd-text"
                    style={{
                      transform: "translateZ(1px)",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                      textRendering: "optimizeLegibility",
                    }}
                  >
                    {/* Top Colored Swatch Section (approx 65% of card height) */}
                    <div
                      className="relative p-6 flex flex-col justify-between flex-1 text-white transition-transform duration-300 hover:brightness-105"
                      style={{ backgroundColor: card.color }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[0.65rem] font-bold tracking-widest uppercase text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
                          {card.num}
                        </span>

                        {/* Flip Hint Pill */}
                        <div className="flex items-center gap-1.5 rounded-full bg-black/20 backdrop-blur-md px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-white border border-white/30 shadow-sm">
                          <RotateCw className="size-2.5 stroke-[2.2]" />
                          <span>Flip</span>
                        </div>
                      </div>

                      {/* Subtitle tag */}
                      <div className="mt-auto">
                        <span className="text-[0.7rem] tracking-wider uppercase font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] block">
                          {card.category}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Cream Card Section (approx 35% of card height - HD Text) */}
                    <div className="p-5 sm:p-6 bg-[#FAF7F2] border-t border-stone-200/90 flex flex-col justify-between hd-text">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-950 antialiased">
                          {card.title}
                        </h3>
                        <p className="text-[12px] sm:text-[12.5px] font-semibold text-stone-800 mt-1.5 leading-snug antialiased">
                          {card.tagline}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs font-bold text-accent antialiased">
                        <span className="tracking-wide font-bold">Flip for details</span>
                        <RotateCw className="size-3.5 text-accent stroke-[2.2]" />
                      </div>
                    </div>
                  </div>

                  {/* ==================================================== */}
                  {/* BACK FACE OF CARD (Crisp HD Designer Back)          */}
                  {/* ==================================================== */}
                  <div
                    className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full flex flex-col justify-between rounded-3xl overflow-hidden border border-stone-300/80 bg-[#FCFBF8] p-4 sm:p-5 shadow-2xl text-stone-950 hd-text"
                    style={{
                      transform: "rotateY(180deg) translateZ(1px)",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                      textRendering: "geometricPrecision",
                      boxShadow: `0 20px 40px -10px ${card.color}30, 0 10px 20px -5px rgba(0,0,0,0.08)`,
                    }}
                  >
                    {/* Header: Tag + Sleek Close/Flip Button */}
                    <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                      <span
                        className="text-[0.62rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: card.accentBg,
                          borderColor: `${card.color}50`,
                          color: card.color,
                        }}
                      >
                        {card.num}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(card.id);
                        }}
                        className="flex items-center gap-1 size-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer justify-center"
                        title="Flip back to front"
                      >
                        <RotateCw className="size-3" />
                      </button>
                    </div>

                    {/* Title & High-Contrast Summary */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="size-2 rounded-full shrink-0"
                          style={{ backgroundColor: card.color }}
                        />
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-950 leading-tight">
                          {card.title}
                        </h4>
                      </div>
                      <p className="text-xs text-stone-700 font-medium leading-relaxed pt-0.5">
                        {card.summary}
                      </p>
                    </div>

                    {/* Clean Key Feature Highlights List */}
                    <div className="space-y-1.5 my-auto">
                      {card.features.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-stone-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        >
                          <div className="flex items-center gap-2 pr-1">
                            <span
                              className="size-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: card.color }}
                            />
                            <span className="text-xs font-semibold text-stone-900 whitespace-nowrap">
                              {feat.title}
                            </span>
                          </div>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap"
                            style={{
                              backgroundColor: card.accentBg,
                              color: card.color,
                            }}
                          >
                            {feat.badge}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 3-Column Horizontal Specs Strip */}
                    <div className="rounded-xl bg-stone-100/90 px-2 py-2 border border-stone-200/80 grid grid-cols-3 gap-1 text-center">
                      {card.specs.map((spec, i) => (
                        <div
                          key={i}
                          className={i > 0 ? "border-l border-stone-300/80 pl-1" : ""}
                        >
                          <span className="block text-[9px] font-bold tracking-wider text-stone-500 uppercase">
                            {spec.label}
                          </span>
                          <strong className="block text-[11px] font-bold text-stone-900 mt-0.5 whitespace-nowrap">
                            {spec.value}
                          </strong>
                        </div>
                      ))}
                    </div>

                    {/* Bottom CTA Action Button (No Arrow) */}
                    <div className="pt-2">
                      <Button
                        size="sm"
                        asChild
                        className="w-full justify-center rounded-full text-xs font-bold cursor-pointer h-9 text-white shadow-md transition-all hover:brightness-110 active:scale-98"
                        style={{ backgroundColor: card.color }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link to={card.link}>
                          <span>{card.ctaText}</span>
                        </Link>
                      </Button>

                      <div className="mt-2 text-center">
                        <span className="text-[11px] text-stone-400 font-medium select-none">
                          Click anywhere to flip back
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
