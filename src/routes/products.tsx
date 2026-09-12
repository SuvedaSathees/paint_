import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import {
  Gem,
  Sun,
  Paintbrush,
  Layers,
  ShieldCheck,
  Shield,
  Flame,
  Zap,
  Building2,
  Box,
  Anchor,
  Award,
  Ruler,
  Wrench,
  Sparkles,
  RefreshCw,
  Feather,
  Check,
  Search,
  CheckCircle2,
  Package,
  ArrowRight,
  Copy,
  SlidersHorizontal,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "What We Sell | Akshara Paints & Hardware" },
      {
        name: "description",
        content:
          "Explore Birla Opus decorative paints, electrical conduit pipes, industrial bolts & nuts, and construction supplies from Akshara Paints & Hardware.",
      },
      { property: "og:title", content: "What We Sell | Akshara Paints & Hardware" },
      {
        property: "og:description",
        content:
          "Birla Opus paints, electrical conduit piping, fasteners, and professional tools in a premium 3x3 showcase.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProductsPage,
});

// Custom Wood Grain / Swatch panel icon for Primer & Wood Finish
function WoodGrainIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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

interface FeatureItem {
  icon: typeof Gem | typeof WoodGrainIcon;
  name: string;
  subname?: string;
  bg: string;
}

interface ProductItem {
  id: string;
  name: string;
  category: "paints" | "pipes" | "fasteners" | "tools" | "materials" | "waterproofing";
  eyebrow: string;
  tagline: string;
  badge: string;
  image: string;
  features: FeatureItem[];
  ctaText: string;
  sloganLines: string[];
}

const productsCatalog: ProductItem[] = [
  // 1. Birla Opus Paints (Authorised Dealer)
  {
    id: "birla-opus-paints",
    name: "Birla Opus Paints",
    category: "paints",
    eyebrow: "AUTHORISED DEALER",
    tagline: "Interior & exterior emulsions, primers, textures and computerized tinting on-site.",
    badge: "OFFICIAL DEALER",
    image: "/product-paints.jpg",
    features: [
      { icon: Gem, name: "Luxury", subname: "Emulsion", bg: "#FCE7DF" },
      { icon: Sun, name: "Weather", subname: "Guard", bg: "#D8EFE4" },
      { icon: WoodGrainIcon, name: "Primer", bg: "#F3EDE2" },
      { icon: Layers, name: "Wood", subname: "Finish", bg: "#E5DEFA" },
    ],
    ctaText: "Shop Birla",
    sloganLines: ["COLOURS", "FOR A BRIGHTER", "TOMORROW"],
  },

  // 2. SmartProof Waterproofing (Advanced Polymer)
  {
    id: "smartproof-waterproofing",
    name: "SmartProof Waterproofing",
    category: "waterproofing",
    eyebrow: "BIRLA OPUS ADVANCED",
    tagline: "Liquid elastomeric polymer systems for roof slabs, terraces, basements, and retaining walls.",
    badge: "ZERO LEAKAGE",
    image: "/product-waterproofing.jpg",
    features: [
      { icon: ShieldCheck, name: "7-Bar", subname: "Proof", bg: "#E0F2FE" },
      { icon: Layers, name: "Seamless", subname: "Film", bg: "#D8EFE4" },
      { icon: Building2, name: "Slab", subname: "Sealer", bg: "#F3EDE2" },
      { icon: Sparkles, name: "UV", subname: "Stable", bg: "#E5DEFA" },
    ],
    ctaText: "Shop SmartProof",
    sloganLines: ["LIFETIME MOISTURE", "BARRIER DEFENCE", "SEALED"],
  },

  // 3. Rigid PVC Conduit Pipes (ISI 9537)
  {
    id: "rigid-pvc-conduits",
    name: "Rigid PVC Conduits",
    category: "pipes",
    eyebrow: "ISI:9537 CERTIFIED PVC",
    tagline: "High-impact unplasticised PVC conduits engineered for safe residential, commercial & slab wiring.",
    badge: "ISI:9537 APPROVED",
    image: "/product-pipes.jpg",
    features: [
      { icon: Flame, name: "Fire", subname: "Retard", bg: "#FEF3C7" },
      { icon: Zap, name: "High", subname: "Impact", bg: "#D8EFE4" },
      { icon: Building2, name: "Slab", subname: "Castable", bg: "#F3EDE2" },
      { icon: ShieldCheck, name: "Non", subname: "Corrosive", bg: "#E5DEFA" },
    ],
    ctaText: "Shop Conduits",
    sloganLines: ["ISI CERTIFIED", "CONDUIT PIPING", "SAFETY"],
  },

  // 4. Conduit Bends & Modular Fittings
  {
    id: "conduit-bends-boxes",
    name: "Conduit Bends & Boxes",
    category: "pipes",
    eyebrow: "MODULAR FITTINGS",
    tagline: "Deep inspection junction boxes, standard bends, inspection elbows, and heavy-gauge pipe saddles.",
    badge: "COMPLETE SYSTEM",
    image: "/product-pipes.jpg",
    features: [
      { icon: Box, name: "Snap-Fit", subname: "Lids", bg: "#FCE7DF" },
      { icon: Layers, name: "1–4 Way", subname: "Boxes", bg: "#D8EFE4" },
      { icon: Sun, name: "UV", subname: "Shield", bg: "#F3EDE2" },
      { icon: Zap, name: "Heavy", subname: "Gauge", bg: "#E5DEFA" },
    ],
    ctaText: "Shop Fittings",
    sloganLines: ["PRECISION FIT", "WIRING SYSTEM", "ACCESSORIES"],
  },

  // 5. High-Tensile Hex Bolts (Grade 8.8 / 10.9)
  {
    id: "high-tensile-bolts",
    name: "High-Tensile Hex Bolts",
    category: "fasteners",
    eyebrow: "INDUSTRIAL FASTENERS",
    tagline: "Cold-forged zinc-plated and hot-dip galvanised structural hex bolts with flange locking nuts.",
    badge: "GRADE 8.8 / 10.9",
    image: "/product-bolts.jpg",
    features: [
      { icon: Anchor, name: "Grade", subname: "8.8 / 10.9", bg: "#F1F5F9" },
      { icon: Shield, name: "Zinc", subname: "Coated", bg: "#E0F2FE" },
      { icon: ShieldCheck, name: "High", subname: "Shear", bg: "#F3EDE2" },
      { icon: Award, name: "DIN 931", subname: "Spec", bg: "#FCE7DF" },
    ],
    ctaText: "Shop Fasteners",
    sloganLines: ["HIGH-TENSILE", "STRUCTURAL STEEL", "FASTENERS"],
  },

  // 6. SS 304 Threaded Stud Rods (Marine Grade)
  {
    id: "stainless-threaded-rods",
    name: "SS 304 Threaded Rods",
    category: "fasteners",
    eyebrow: "A2/A4 STAINLESS STEEL",
    tagline: "Full-thread stud rods for cable tray suspension, HVAC ducting, plumbing and architectural mounts.",
    badge: "MARINE GRADE SS",
    image: "/product-threaded-rods.jpg",
    features: [
      { icon: ShieldCheck, name: "Rust", subname: "Proof", bg: "#D8EFE4" },
      { icon: Ruler, name: "1m & 2m", subname: "Lengths", bg: "#FCE7DF" },
      { icon: Wrench, name: "Tray", subname: "Hanging", bg: "#E0F2FE" },
      { icon: Sparkles, name: "SS 304", subname: "Marine", bg: "#E5DEFA" },
    ],
    ctaText: "Shop Stud Rods",
    sloganLines: ["HEAVY SUSPENSION", "CORROSION PROOF", "RODS"],
  },

  // 7. Pro Glide Paint Rollers (Contractor Pick)
  {
    id: "pro-glide-rollers",
    name: "Pro Glide Paint Rollers",
    category: "tools",
    eyebrow: "CONTRACTOR GRADE",
    tagline: "9-inch high-density lint-free microfiber sleeves with ergonomic stainless steel cage frames & trays.",
    badge: "CONTRACTOR PICK",
    image: "/product-rollers.jpg",
    features: [
      { icon: Sparkles, name: "Zero", subname: "Splatter", bg: "#FCE7DF" },
      { icon: Paintbrush, name: "Lint-Free", subname: "Fabric", bg: "#D8EFE4" },
      { icon: RefreshCw, name: "Quick", subname: "Rinse", bg: "#F3EDE2" },
      { icon: Wrench, name: "Ergo", subname: "Grip", bg: "#E5DEFA" },
    ],
    ctaText: "Shop Rollers",
    sloganLines: ["EFFORTLESS GLIDE", "MICROFIBER", "FINISH"],
  },

  // 8. Master Touch Artisan Brushes
  {
    id: "master-touch-brushes",
    name: "Master Touch Brushes",
    category: "tools",
    eyebrow: "HANDCRAFTED TOOLS",
    tagline: "Chiseled synthetic and natural tapered bristles for razor-sharp cutting-in and uniform paint laydown.",
    badge: "HANDCRAFTED WOOD",
    image: "/product-hardware.jpg",
    features: [
      { icon: Feather, name: "Sharp", subname: "Cut-In", bg: "#FCE7DF" },
      { icon: Layers, name: "Hardwood", subname: "Handle", bg: "#F3EDE2" },
      { icon: ShieldCheck, name: "Zero", subname: "Shedding", bg: "#D8EFE4" },
      { icon: Ruler, name: "1\" to 4\"", subname: "Sizes", bg: "#E5DEFA" },
    ],
    ctaText: "Shop Brushes",
    sloganLines: ["PRECISION EDGES", "SURGICAL CUT-IN", "BRUSHES"],
  },

  // 9. Building & Masonry Materials (Cement, Rebar, Blocks)
  {
    id: "building-masonry-materials",
    name: "Building Materials",
    category: "materials",
    eyebrow: "CONSTRUCTION ESSENTIALS",
    tagline: "Cement, M-sand, binding wire, TMT rebar steel rods, solid concrete blocks and structural supplies.",
    badge: "SITE DELIVERY",
    image: "/product-building.jpg",
    features: [
      { icon: Package, name: "Cement", subname: "50kg Bags", bg: "#D8EFE4" },
      { icon: Anchor, name: "TMT", subname: "Steel Rods", bg: "#FCE7DF" },
      { icon: Zap, name: "Binding", subname: "Wire Coils", bg: "#F3EDE2" },
      { icon: Building2, name: "Solid", subname: "Blocks", bg: "#FEF3C7" },
    ],
    ctaText: "Shop Materials",
    sloganLines: ["DIRECT SITE LOAD", "CONSTRUCTION", "SUPPLY"],
  },
];

function blendHexColors(hex1: string, hex2: string, ratio: number = 0.5): string {
  const cleanHex = (h: string) => (h.startsWith("#") ? h.slice(1) : h);
  const h1 = cleanHex(hex1);
  const h2 = cleanHex(hex2);

  const r1 = parseInt(h1.slice(0, 2), 16) || 0;
  const g1 = parseInt(h1.slice(2, 4), 16) || 0;
  const b1 = parseInt(h1.slice(4, 6), 16) || 0;

  const r2 = parseInt(h2.slice(0, 2), 16) || 0;
  const g2 = parseInt(h2.slice(2, 4), 16) || 0;
  const b2 = parseInt(h2.slice(4, 6), 16) || 0;

  // Gamma-corrected perceptual color blending for realistic pigment mixing
  const r = Math.round(Math.sqrt((1 - ratio) * r1 * r1 + ratio * r2 * r2));
  const g = Math.round(Math.sqrt((1 - ratio) * g1 * g1 + ratio * g2 * g2));
  const b = Math.round(Math.sqrt((1 - ratio) * b1 * b1 + ratio * b2 * b2));

  const toHex = (c: number) => Math.min(255, Math.max(0, c)).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function calculateLrv(hex: string): string {
  const clean = hex.startsWith("#") ? hex.slice(1) : hex;
  const r = (parseInt(clean.slice(0, 2), 16) || 0) / 255;
  const g = (parseInt(clean.slice(2, 4), 16) || 0) / 255;
  const b = (parseInt(clean.slice(4, 6), 16) || 0) / 255;
  const lrv = Math.round((0.2126 * r + 0.7152 * g + 0.0722 * b) * 100);
  return `${Math.max(6, Math.min(92, lrv))}%`;
}

interface MixingPigment {
  id: string;
  name: string;
  shortName: string;
  hex: string;
  code: string;
  family: string;
}

const basePigments: MixingPigment[] = [
  { id: "azure", name: "Royal Cobalt Blue", shortName: "Cobalt Blue", hex: "#1e3a8a", code: "BLU", family: "Deep Mineral" },
  { id: "gold", name: "Sunlight Ochre Yellow", shortName: "Sun Ochre", hex: "#eab308", code: "YEL", family: "Warm Earth" },
  { id: "crimson", name: "Terracotta Crimson Red", shortName: "Terracotta", hex: "#dc2626", code: "RED", family: "Warm Earth" },
  { id: "titanium", name: "Titanium Pure White", shortName: "Pure White", hex: "#f8fafc", code: "WHT", family: "Base White" },
  { id: "emerald", name: "Phthalo Botanical Green", shortName: "Phthalo Green", hex: "#059669", code: "GRN", family: "Botanical" },
  { id: "charcoal", name: "Carbon Velvet Charcoal", shortName: "Charcoal", hex: "#1e293b", code: "BLK", family: "Deep Mineral" },
  { id: "sand", name: "Raw Umber Sandstone", shortName: "Raw Umber", hex: "#d97706", code: "AMB", family: "Heritage Stone" },
  { id: "tangerine", name: "Vibrant Orange Zest", shortName: "Orange Zest", hex: "#ea580c", code: "ORG", family: "Accent Glow" },
];

interface MixPreset {
  id: string;
  name: string;
  code: string;
  pigment1Id: string;
  pigment2Id: string;
  ratio: number;
  resultHex: string;
  tagline: string;
  substrate: string;
}

const curatedPresets: MixPreset[] = [
  {
    id: "emerald-glade",
    name: "Emerald Glade",
    code: "OP-GRN-09",
    pigment1Id: "azure",
    pigment2Id: "gold",
    ratio: 0.5,
    resultHex: "#065f46",
    tagline: "Lush botanical jewel tone engineered for calming master bedrooms and feature walls.",
    substrate: "Master Bedrooms & Living Accent Walls",
  },
  {
    id: "vibrant-tangerine",
    name: "Vibrant Tangerine",
    code: "OP-ORG-07",
    pigment1Id: "crimson",
    pigment2Id: "gold",
    ratio: 0.45,
    resultHex: "#ea580c",
    tagline: "Warm sun-drenched terracotta energizing dining zones and architectural entryways.",
    substrate: "Dining Rooms & Kitchen Alcoves",
  },
  {
    id: "coastal-sky",
    name: "Coastal Sky Breeze",
    code: "OP-BLU-18",
    pigment1Id: "azure",
    pigment2Id: "titanium",
    ratio: 0.7,
    resultHex: "#38bdf8",
    tagline: "Crisp oceanic atmosphere providing spatial expansion and high daylight reflection.",
    substrate: "Living Rooms & Open Foyers",
  },
  {
    id: "heritage-sandstone",
    name: "Heritage Sandstone",
    code: "OP-WHT-14",
    pigment1Id: "sand",
    pigment2Id: "titanium",
    ratio: 0.65,
    resultHex: "#e2d7c5",
    tagline: "Timeless limestone warmth inspired by South Indian heritage stone architecture.",
    substrate: "Full Home & Hallways",
  },
  {
    id: "midnight-slate",
    name: "Midnight Slate",
    code: "OP-DK-09",
    pigment1Id: "azure",
    pigment2Id: "charcoal",
    ratio: 0.5,
    resultHex: "#0f172a",
    tagline: "Deep dramatic backdrop providing rich contrast for brass fixtures and media walls.",
    substrate: "Media Lounges & Study Nooks",
  },
  {
    id: "mint-botanical",
    name: "Fresh Mint Glade",
    code: "OP-GRN-04",
    pigment1Id: "emerald",
    pigment2Id: "titanium",
    ratio: 0.65,
    resultHex: "#6ee7b7",
    tagline: "Airy rejuvenating botanical pastel reflecting daylight with soothing clarity.",
    substrate: "Kids Bedrooms & Balconies",
  },
];

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pigment1, setPigment1] = useState<MixingPigment>(basePigments[0]); // Cobalt Blue
  const [pigment2, setPigment2] = useState<MixingPigment>(basePigments[1]); // Gold Ochre
  const [mixRatio, setMixRatio] = useState<number>(0.5); // 50:50
  const [activePresetId, setActivePresetId] = useState<string | null>("emerald-glade");
  const [selectedFinish, setSelectedFinish] = useState<string>("Satin Silk");
  const [copiedHex, setCopiedHex] = useState(false);

  // Derive blended color from either matched preset or real-time gamma-space blend
  const activePreset = useMemo(() => {
    return curatedPresets.find(
      (p) =>
        ((p.pigment1Id === pigment1.id && p.pigment2Id === pigment2.id) ||
         (p.pigment1Id === pigment2.id && p.pigment2Id === pigment1.id)) &&
        Math.abs(p.ratio - (p.pigment1Id === pigment1.id ? mixRatio : 1 - mixRatio)) < 0.08
    );
  }, [pigment1, pigment2, mixRatio]);

  const blendedHex = useMemo(() => {
    if (activePreset) return activePreset.resultHex;
    return blendHexColors(pigment1.hex, pigment2.hex, mixRatio);
  }, [pigment1, pigment2, mixRatio, activePreset]);

  const computedLrv = useMemo(() => calculateLrv(blendedHex), [blendedHex]);

  const shadeTitle = useMemo(() => {
    if (activePreset) return activePreset.name;
    if (pigment1.id === pigment2.id) return pigment1.name;
    return `${pigment1.shortName} & ${pigment2.shortName}`;
  }, [pigment1, pigment2, activePreset]);

  const shadeDescription = useMemo(() => {
    if (activePreset) return activePreset.tagline;
    return `Custom dual-pigment blend combining ${Math.round((1 - mixRatio) * 100)}% ${pigment1.name} with ${Math.round(mixRatio * 100)}% ${pigment2.name} for bespoke spatial depth.`;
  }, [pigment1, pigment2, mixRatio, activePreset]);

  const formulaCode = useMemo(() => {
    if (activePreset) return activePreset.code;
    const r1 = Math.round((1 - mixRatio) * 100);
    const r2 = Math.round(mixRatio * 100);
    return `OP-${pigment1.code}${r1}-${pigment2.code}${r2}`;
  }, [pigment1, pigment2, mixRatio, activePreset]);

  const companionAccent = useMemo(() => {
    const lrvNum = parseInt(computedLrv.replace("%", ""), 10) || 30;
    if (lrvNum < 35) {
      return { name: "Heritage Sandstone", hex: "#E2D7C5" };
    }
    return { name: "Velvet Charcoal", hex: "#1E293B" };
  }, [computedLrv]);

  const canisterBase = useMemo(() => {
    const lrvNum = parseInt(computedLrv.replace("%", ""), 10) || 30;
    if (lrvNum < 25) return "Extra-Deep Base 01";
    if (lrvNum < 55) return "Mid-Tone Base 02";
    return "Pure White Base 03";
  }, [computedLrv]);

  const handleCopyHex = (hex: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(hex);
      setCopiedHex(true);
      setTimeout(() => setCopiedHex(false), 2000);
    }
  };

  const categories = [
    { id: "all", label: "All (9)" },
    { id: "paints", label: "Birla Paints" },
    { id: "waterproofing", label: "Waterproofing" },
    { id: "pipes", label: "Conduit Pipes" },
    { id: "fasteners", label: "Fasteners" },
    { id: "tools", label: "Tools" },
    { id: "materials", label: "Materials" },
  ];

  const filteredProducts = productsCatalog.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.eyebrow.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero Header Section - Centered Luxury Architectural Showcase (Matching Reference Image 1:1) */}
      <section className="relative pt-12 sm:pt-14 pb-14 sm:pb-16 px-4 sm:px-7 lg:px-10 border-b border-primary/10 overflow-hidden bg-gradient-to-b from-stone-50/80 via-white to-background">
        <div className="absolute left-1/2 -top-28 -translate-x-1/2 size-[650px] rounded-full bg-radial from-accent/12 via-primary/5 to-transparent blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-5xl text-center relative z-10">
          {/* Centered Kicker matching Reference Image */}
          <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.26em] text-accent block mb-3.5 select-none">
            &mdash; EVERYTHING UNDER ONE ROOF &mdash;
          </span>

          {/* Centered Serif Main Heading matching Reference Image */}
          <h1 className="font-display font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-primary font-normal leading-[1.12] mb-4 sm:mb-5">
            What We Sell
          </h1>

          {/* Centered Subtitle Paragraph - Distinct from home page & balanced across 2 lines */}
          <p className="text-xs sm:text-sm md:text-[15px] text-muted-foreground tracking-wide leading-relaxed max-w-3xl mx-auto">
            Direct showroom inventory, certified Birla Opus coatings, and contractor-grade hardware under one roof.
            <br className="hidden sm:inline" />
            {" "}Explore architectural paints, electrical conduit systems, and structural fasteners with same-day site dispatch across Erode.
          </p>

          {/* Centered Authority Trust Badges Strip (Grouped with Brand Credibility) */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 text-[11px] sm:text-xs font-medium text-stone-500 select-none">
            <span className="inline-flex items-center gap-1.5">
              <Package className="size-3.5 text-accent" /> Over 450+ SKUs in stock
            </span>
            <span className="hidden sm:inline opacity-30">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-600" /> Genuine Factory Warranties
            </span>
            <span className="hidden sm:inline opacity-30">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" /> Authorized Birla Opus Dealer
            </span>
          </div>

          {/* Combined Search & Segmented Category Filter in a Single Line */}
          <div className="mt-7 flex flex-col md:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-5xl mx-auto">
            {/* Search Input Bar */}
            <div className="relative w-full md:w-64 lg:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search paints, conduits, tools..."
                className="w-full h-[40px] rounded-full border border-stone-200/90 bg-white/95 pl-9 pr-9 text-xs sm:text-[13px] text-foreground placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs hover:border-stone-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 cursor-pointer font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Segmented Category Filter Capsule */}
            <div className="inline-flex items-center p-1 rounded-full bg-stone-100/90 border border-stone-200/80 shadow-2xs max-w-full overflow-x-auto no-scrollbar shrink-0 h-[40px]">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`h-[32px] rounded-full px-3.5 sm:px-4 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center ${
                      isActive
                        ? "bg-[#0A2234] text-white shadow-xs"
                        : "text-stone-600 hover:text-stone-950 hover:bg-white/60"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main 3x3 Product Cards Section */}
      <section className="py-12 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full flex-1">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-semibold text-stone-600">
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> catalog items
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center my-12">
            <Package className="size-12 mx-auto text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-bold text-stone-900">No products match your search</h3>
            <p className="text-sm text-stone-500 mt-1">
              Try adjusting your search query or reset the category filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 cursor-pointer"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          /* 3x3 Responsive Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 justify-items-center">
            {filteredProducts.map((product) => {
              const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
                `Hello Akshara Paints & Hardware, I am interested in inquiring about ${product.name} (${product.eyebrow}). Please share current stock, trade pricing, and dispatch details.`
              )}`;

              return (
                <article
                  key={product.id}
                  className="group relative flex flex-col justify-between rounded-[32px] border border-[#EAE5DA] bg-[#FAFAF8] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden hover:-translate-y-1.5 w-[calc(100%-5px)] mx-auto"
                >
                  {/* 1 ── Upper Product Image with Organic Wave Divider */}
                  <div className="relative h-[250px] sm:h-[270px] w-full overflow-hidden bg-[#F6F3ED]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Ambient lighting gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/15 pointer-events-none" />

                    {/* Clean Status Badge (Top-Right) */}
                    <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1c1c1e]/85 backdrop-blur-md text-white font-bold text-[10px] sm:text-[10.5px] tracking-wider uppercase shadow-md border border-white/10 select-none">
                      <span className="size-3.5 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="size-2 text-white stroke-[3]" />
                      </span>
                      <span>{product.badge}</span>
                    </div>

                    {/* Organic Wave Divider (Exact Match to Reference Design) */}
                    <div className="absolute -bottom-[1px] left-0 w-full h-[40px] pointer-events-none z-10">
                      <svg
                        viewBox="0 0 500 80"
                        preserveAspectRatio="none"
                        className="w-full h-full block fill-[#FAFAF8]"
                      >
                        <path d="M 0,35 C 100,65 190,55 280,26 C 360,0 440,8 500,24 L 500,80 L 0,80 Z" />
                      </svg>
                    </div>
                  </div>

                  {/* 2 ── Card Body */}
                  <div className="px-5 sm:px-6 pt-1 pb-3 flex flex-col flex-1 relative z-20 bg-[#FAFAF8]">
                    {/* Eyebrow */}
                    <span className="text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8C7A6B] block mb-1">
                      {product.eyebrow}
                    </span>

                    {/* Main Title */}
                    <h2 className="font-display text-[21px] sm:text-[23px] font-bold text-stone-900 tracking-tight leading-snug">
                      {product.name}
                    </h2>

                    {/* Description */}
                    <p className="text-[12.5px] sm:text-[13px] text-[#59534B] leading-relaxed mt-1.5 min-h-[38px]">
                      {product.tagline}
                    </p>

                    {/* 4 Feature Circular Badges (Horizontal Row) */}
                    <div className="grid grid-cols-4 gap-1.5 pt-4 pb-2 my-auto">
                      {product.features.map((feat, idx) => {
                        const IconComp = feat.icon;
                        return (
                          <div key={idx} className="flex flex-col items-center text-center">
                            <div
                              className="size-11 sm:size-12 rounded-full flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105 shrink-0"
                              style={{ backgroundColor: feat.bg }}
                            >
                              <IconComp className="size-4 sm:size-4.5 stroke-[1.6] text-[#1C1917]" />
                            </div>
                            <span className="text-[10px] sm:text-[10.5px] font-medium text-[#292524] leading-[1.2] mt-2 block text-center min-h-[26px]">
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
                                  {/* 3 ── Bottom Bar: Dark CTA Pill + Mild Warm Sand Paint Swoosh */}
                  <div className="relative overflow-hidden pt-3 pb-4 px-5 sm:px-6 mt-auto flex items-center justify-between min-h-[58px] bg-[#FAFAF8]">
                    {/* Sweeping Mild Paint Texture Wave */}
                    <div className="absolute -bottom-1 -left-2 -right-2 h-[72px] pointer-events-none overflow-hidden select-none z-0">
                      <svg
                        viewBox="0 0 300 70"
                        preserveAspectRatio="none"
                        className="w-full h-full block"
                      >
                        <defs>
                          {/* Mild Soft Cashmere / Warm Sand Paint Gradient */}
                          <linearGradient
                            id={`yellow-base-grad-${product.id}`}
                            x1="0%"
                            y1="100%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#D5C9B7" stopOpacity="0.55" />
                            <stop offset="35%" stopColor="#E5DCce" stopOpacity="0.65" />
                            <stop offset="70%" stopColor="#EEE6DA" stopOpacity="0.75" />
                            <stop offset="100%" stopColor="#F6F0E6" stopOpacity="0.85" />
                          </linearGradient>

                          {/* Subtle Soft Glaze for Gentle Depth */}
                          <linearGradient
                            id={`yellow-glaze-grad-${product.id}`}
                            x1="20%"
                            y1="100%"
                            x2="100%"
                            y2="10%"
                          >
                            <stop offset="0%" stopColor="#C4B7A2" stopOpacity="0.18" />
                            <stop offset="50%" stopColor="#DBD0BF" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#F2ECE0" stopOpacity="0.25" />
                          </linearGradient>

                          {/* Gentle Bristle Streaks */}
                          <linearGradient
                            id={`yellow-streak-grad-${product.id}`}
                            x1="0%"
                            y1="50%"
                            x2="100%"
                            y2="50%"
                          >
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                            <stop offset="50%" stopColor="#FAF7F2" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#E8DFD0" stopOpacity="0.12" />
                          </linearGradient>
                        </defs>

                        {/* Main curved paint sweep rising from bottom-left up to top-right */}
                        <path
                          d="M 0,44 C 55,42 110,48 170,26 C 220,10 260,3 300,0 L 300,70 L 0,70 Z"
                          fill={`url(#yellow-base-grad-${product.id})`}
                        />

                        {/* Secondary glazed acrylic flow for physical paint body */}
                        <path
                          d="M 10,49 C 65,46 125,50 185,27 C 235,11 270,4 300,0 L 300,70 L 10,70 Z"
                          fill={`url(#yellow-glaze-grad-${product.id})`}
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
                          stroke={`url(#yellow-streak-grad-${product.id})`}
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

                    {/* Left Dark Action Button without Arrow */}
                    <Button
                      asChild
                      className="relative z-10 rounded-full bg-[#18181B] hover:bg-black text-white px-5 sm:px-6 py-2.5 text-xs sm:text-[13px] font-bold shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer shrink-0"
                    >
                      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center">
                        <span>{product.ctaText}</span>
                      </a>
                    </Button>

                    {/* Slogan over the mild wave on the right */}
                    <div className="relative z-10 text-right pr-1 max-w-[145px] select-none pointer-events-none">
                      <div className="text-[7.5px] sm:text-[8px] font-extrabold uppercase tracking-[0.06em] text-[#63574A] leading-[1.15] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                        {product.sloganLines.map((line, li) => (
                          <span key={li} className="block">
                            {line}
                          </span>
                        ))}
                      </div>
                      <div className="w-3.5 h-[1.5px] bg-[#8A7C6D]/40 ml-auto mt-1 rounded-full" />
                    </div>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Signature Architectural Shades & Computerized Tinting Studio */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 bg-[#FAF8F5] border-t border-b border-[#E8E2D7]">
        <div className="mx-auto max-w-[1370px]">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-2 select-none">
              &mdash; COMPUTERIZED COLOR LAB &mdash;
            </span>
            <h2 className="font-display font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-normal tracking-tight">
              Dual-Pigment Color Formulation Studio
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Blend certified Birla Opus architectural pigments in real-time. Calculate spectral recipes, light reflectance values (LRV), and dispense custom shades on demand.
            </p>
          </div>

          {/* Studio Container */}
          <div className="max-w-[1370px] mx-auto rounded-[2rem] border border-[#E6DFD5] bg-[#FCFAF7] p-5 sm:p-7 lg:p-8 shadow-2xl shadow-stone-900/5 relative overflow-hidden">
            {/* Ambient tinted background glow */}
            <div
              className="absolute -right-24 -top-24 w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none transition-colors duration-1000 opacity-15"
              style={{ backgroundColor: blendedHex }}
            />
            <div
              className="absolute -left-20 -bottom-20 w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none transition-colors duration-1000 opacity-10"
              style={{ backgroundColor: pigment1.hex }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10">
              {/* Left Column: Architectural Specimen Swatch Slab & Formulation Specs */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5 rounded-3xl border border-[#E7E0D6] bg-white p-4 sm:p-5 shadow-xs relative overflow-hidden">
                {/* Hero Swatch Canvas Slab */}
                <div
                  className="relative w-full rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between min-h-[220px] sm:min-h-[245px] transition-colors duration-500"
                  style={{ backgroundColor: blendedHex }}
                >
                  {/* Subtle directional satin sheen highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/30 pointer-events-none" />

                  {/* Top Pill Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/95 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-xs">
                        {selectedFinish}
                      </span>
                      <span className="text-[10.5px] font-mono font-medium text-white/90 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        {computedLrv} LRV
                      </span>
                    </div>

                    {/* 1-Click Copy Hex */}
                    <button
                      type="button"
                      onClick={() => handleCopyHex(blendedHex)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-mono font-bold text-white transition-all cursor-pointer border border-white/15 shadow-xs active:scale-95"
                      title="Click to copy hex code"
                    >
                      <span>{blendedHex.toUpperCase()}</span>
                      {copiedHex ? (
                        <Check className="size-3 text-emerald-400" />
                      ) : (
                        <Copy className="size-3 text-white/75" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Shade Typography */}
                  <div className="relative z-10 text-white drop-shadow-sm pt-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-1">
                      {formulaCode}
                    </span>
                    <h3 className="font-display font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight leading-tight">
                      {shadeTitle}
                    </h3>
                  </div>
                </div>

                {/* Live Proportion Formulation Ribbon */}
                <div className="bg-[#FAF8F5] rounded-2xl p-3 sm:p-3.5 border border-stone-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-stone-700">
                      <span className="size-2.5 rounded-full border border-black/15 shadow-2xs" style={{ backgroundColor: pigment1.hex }} />
                      <span className="font-semibold text-stone-900">{pigment1.name}</span>
                      <span className="text-stone-500 font-mono text-[11px]">({Math.round((1 - mixRatio) * 100)}%)</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-stone-700">
                      <span className="text-stone-500 font-mono text-[11px]">({Math.round(mixRatio * 100)}%)</span>
                      <span className="font-semibold text-stone-900">{pigment2.name}</span>
                      <span className="size-2.5 rounded-full border border-black/15 shadow-2xs" style={{ backgroundColor: pigment2.hex }} />
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden flex bg-stone-200/60 p-0.5 border border-stone-200/70">
                    <div
                      className="h-full rounded-l-full transition-all duration-300"
                      style={{
                        width: `${(1 - mixRatio) * 100}%`,
                        backgroundColor: pigment1.hex,
                      }}
                    />
                    <div
                      className="h-full rounded-r-full transition-all duration-300"
                      style={{
                        width: `${mixRatio * 100}%`,
                        backgroundColor: pigment2.hex,
                      }}
                    />
                  </div>
                </div>

                {/* Architectural Technical Specs Strip */}
                <div className="bg-[#FAF8F5] rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-2xs flex items-center gap-4">
                  <div className="relative shrink-0 w-16 sm:w-20 flex items-center justify-center">
                    <img
                      src="/akshara-paint-can.png?v=emerald-can"
                      alt="Akshara Emerald & Gold Paint Can"
                      className="relative z-10 w-16 sm:w-20 h-auto object-contain drop-shadow-md"
                    />
                  </div>

                  {/* Minimalist Spec Table with Hairline Dividers */}
                  <div className="flex-1 grid grid-cols-2 gap-x-5 gap-y-2 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-stone-400 font-mono block">
                        Canister Base
                      </span>
                      <span className="text-xs sm:text-[12.5px] font-bold text-stone-800 truncate block">
                        {canisterBase}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-stone-400 font-mono block">
                        Spreading Rate
                      </span>
                      <span className="text-xs sm:text-[12.5px] font-bold text-stone-800 truncate block">
                        140–160 sq.ft / L
                      </span>
                    </div>
                    <div className="space-y-0.5 border-t border-stone-200/60 pt-1.5">
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-stone-400 font-mono block">
                        Recoat Window
                      </span>
                      <span className="text-xs sm:text-[12.5px] font-bold text-stone-800 truncate block">
                        3–4 Hours
                      </span>
                    </div>
                    <div className="space-y-0.5 border-t border-stone-200/60 pt-1.5">
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-stone-400 font-mono block">
                        Emission Level
                      </span>
                      <span className="text-xs sm:text-[12.5px] font-bold text-stone-800 truncate block">
                        &lt; 15 g/L Low VOC
                      </span>
                    </div>
                  </div>
                </div>

                {/* Architectural Companion Trim Accent */}
                <div className="rounded-2xl bg-[#FAF8F5] border border-stone-200/80 p-3 sm:p-3.5 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-8 rounded-xl border border-black/10 shadow-xs shrink-0"
                      style={{ backgroundColor: companionAccent.hex }}
                    />
                    <div>
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-stone-400 block font-mono">
                        Recommended Companion Trim
                      </span>
                      <span className="font-semibold text-stone-900 text-xs sm:text-[13px] block">
                        {companionAccent.name}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-stone-600 bg-white px-2.5 py-1 rounded-md border border-stone-200/70">
                    {companionAccent.hex}
                  </span>
                </div>

                {/* Dispense CTA Button */}
                <div className="pt-1 space-y-2">
                  <Button
                    variant="default"
                    size="lg"
                    asChild
                    className="w-full justify-center rounded-full bg-stone-900 hover:bg-black text-white text-sm font-semibold py-3 sm:py-3.5 shadow-md hover:shadow-lg transition-all cursor-pointer tracking-wide"
                  >
                    <a
                      href={`https://wa.me/919944747199?text=${encodeURIComponent(
                        `Hello Akshara Paints, I would like to dispense the custom blend "${shadeTitle}" (${blendedHex}) created from ${pigment1.name} (${Math.round((1 - mixRatio) * 100)}%) + ${pigment2.name} (${Math.round(mixRatio * 100)}%) in ${selectedFinish} at your Perundurai Road branch. Base: ${canisterBase}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Dispense This Formulation in Store</span>
                    </a>
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-center text-[11px] text-stone-500">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Instant computerized tinting &bull; All 3 Erode branches</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Intuitive 3-Step Formulation Atelier */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                {/* 01 ── Designer Curated Formulas (Iconic Presets) */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-5 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">
                        1
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-stone-900">
                        Curated Designer Presets
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">Click any preset to load formula</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                    {curatedPresets.map((preset) => {
                      const isPresetActive = activePreset?.id === preset.id;
                      const p1 = basePigments.find((p) => p.id === preset.pigment1Id) || basePigments[0];
                      const p2 = basePigments.find((p) => p.id === preset.pigment2Id) || basePigments[1];

                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            setPigment1(p1);
                            setPigment2(p2);
                            setMixRatio(preset.ratio);
                            setActivePresetId(preset.id);
                            setCopiedHex(false);
                          }}
                          className={`p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-200 flex items-center gap-2.5 cursor-pointer border ${
                            isPresetActive
                              ? "border-stone-900 bg-white ring-2 ring-stone-900/10 shadow-sm"
                              : "border-stone-200/80 bg-white/70 hover:bg-white hover:border-stone-300 hover:shadow-xs"
                          }`}
                        >
                          <div
                            className="size-8 rounded-xl shrink-0 border border-black/10 shadow-2xs relative"
                            style={{ backgroundColor: preset.resultHex }}
                          >
                            {isPresetActive && (
                              <span className="absolute inset-0 flex items-center justify-center text-white text-[12px] font-bold drop-shadow-xs">
                                &bull;
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className={`block text-xs font-semibold truncate ${isPresetActive ? "text-stone-900 font-bold" : "text-stone-700"}`}>
                              {preset.name}
                            </span>
                            <span className="block text-[10px] font-mono text-stone-400 truncate mt-0.5">
                              {preset.code}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 02 ── Dual-Pigment Blender & Continuous Ratio Slider */}
                <div className="rounded-3xl border border-[#E7E0D6] bg-white p-4 sm:p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-5 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">
                        2
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-stone-900">
                        Dual-Pigment Blender &amp; Ratio
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-800 bg-[#FAF8F5] px-3 py-1 rounded-full border border-stone-200/80">
                      {Math.round((1 - mixRatio) * 100)}% A &bull; {Math.round(mixRatio * 100)}% B
                    </span>
                  </div>

                  {/* Dual Tone Palette Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Tone A */}
                    <div className="rounded-2xl p-3.5 bg-[#FAF8F5] border border-stone-200/70 space-y-2.5">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200/60">
                        <div className="flex items-center gap-2">
                          <span
                            className="size-3 rounded-full border border-black/15 shadow-2xs shrink-0"
                            style={{ backgroundColor: pigment1.hex }}
                          />
                          <span className="font-bold text-stone-500 uppercase text-[9.5px] tracking-wider font-mono">
                            Primary Tone A
                          </span>
                        </div>
                        <span className="font-semibold text-stone-900 text-xs truncate max-w-[130px]">
                          {pigment1.shortName}
                        </span>
                      </div>

                      <div className="grid grid-cols-8 gap-1.5 w-full py-1">
                        {basePigments.map((pig) => {
                          const isSelected = pigment1.id === pig.id;
                          return (
                            <button
                              key={`p1-${pig.id}`}
                              type="button"
                              onClick={() => {
                                setPigment1(pig);
                                setActivePresetId(null);
                                setCopiedHex(false);
                              }}
                              className={`w-full aspect-square max-w-[32px] mx-auto rounded-full border transition-all cursor-pointer relative flex items-center justify-center ${
                                isSelected
                                  ? "ring-2 ring-stone-900 ring-offset-2 scale-110 border-white shadow-sm"
                                  : "border-black/15 hover:scale-105 hover:shadow-2xs opacity-85 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: pig.hex }}
                              title={`${pig.name} (${pig.shortName})`}
                            >
                              {isSelected && (
                                <span className="size-1.5 rounded-full bg-white shadow-xs" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[10px] text-stone-400 font-mono">
                        <span className="truncate">{pigment1.family}</span>
                        <span className="shrink-0">{pigment1.hex.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Tone B */}
                    <div className="rounded-2xl p-3.5 bg-[#FAF8F5] border border-stone-200/70 space-y-2.5">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200/60">
                        <div className="flex items-center gap-2">
                          <span
                            className="size-3 rounded-full border border-black/15 shadow-2xs shrink-0"
                            style={{ backgroundColor: pigment2.hex }}
                          />
                          <span className="font-bold text-stone-500 uppercase text-[9.5px] tracking-wider font-mono">
                            Blend Tone B
                          </span>
                        </div>
                        <span className="font-semibold text-stone-900 text-xs truncate max-w-[130px]">
                          {pigment2.shortName}
                        </span>
                      </div>

                      <div className="grid grid-cols-8 gap-1.5 w-full py-1">
                        {basePigments.map((pig) => {
                          const isSelected = pigment2.id === pig.id;
                          return (
                            <button
                              key={`p2-${pig.id}`}
                              type="button"
                              onClick={() => {
                                setPigment2(pig);
                                setActivePresetId(null);
                                setCopiedHex(false);
                              }}
                              className={`w-full aspect-square max-w-[32px] mx-auto rounded-full border transition-all cursor-pointer relative flex items-center justify-center ${
                                isSelected
                                  ? "ring-2 ring-stone-900 ring-offset-2 scale-110 border-white shadow-sm"
                                  : "border-black/15 hover:scale-105 hover:shadow-2xs opacity-85 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: pig.hex }}
                              title={`${pig.name} (${pig.shortName})`}
                            >
                              {isSelected && (
                                <span className="size-1.5 rounded-full bg-white shadow-xs" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[10px] text-stone-400 font-mono">
                        <span className="truncate">{pigment2.family}</span>
                        <span className="shrink-0">{pigment2.hex.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Gradient Mix Slider */}
                  <div className="pt-1 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                      <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full" style={{ backgroundColor: pigment1.hex }} />
                        {pigment1.shortName} ({Math.round((1 - mixRatio) * 100)}%)
                      </span>
                      <span className="text-[10.5px] font-mono text-stone-400">Continuous Color Blend Track</span>
                      <span className="flex items-center gap-1.5">
                        {pigment2.shortName} ({Math.round(mixRatio * 100)}%)
                        <span className="size-2 rounded-full" style={{ backgroundColor: pigment2.hex }} />
                      </span>
                    </div>

                    <div className="relative flex items-center py-1">
                      <input
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.02"
                        value={mixRatio}
                        onChange={(e) => {
                          setMixRatio(parseFloat(e.target.value));
                          setActivePresetId(null);
                          setCopiedHex(false);
                        }}
                        className="w-full h-3 rounded-full appearance-none cursor-pointer shadow-inner border border-black/10 focus:outline-none accent-stone-900"
                        style={{
                          background: `linear-gradient(to right, ${pigment1.hex} 0%, ${blendedHex} 50%, ${pigment2.hex} 100%)`,
                        }}
                      />
                    </div>

                    {/* 3 Quick Snap Ratios */}
                    <div className="flex items-center justify-center gap-2 pt-1">
                      {[
                        { ratio: 0.3, label: "70% A : 30% B" },
                        { ratio: 0.5, label: "50% : 50% Balanced" },
                        { ratio: 0.7, label: "30% A : 70% B" },
                      ].map((opt) => {
                        const isSelectedRatio = Math.abs(mixRatio - opt.ratio) < 0.04;
                        return (
                          <button
                            key={opt.ratio}
                            type="button"
                            onClick={() => {
                              setMixRatio(opt.ratio);
                              setActivePresetId(null);
                              setCopiedHex(false);
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                              isSelectedRatio
                                ? "bg-stone-900 text-white border-stone-900 font-semibold shadow-xs"
                                : "bg-[#FAF8F5] border-stone-200/80 text-stone-700 hover:bg-stone-100 hover:border-stone-300"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 03 ── Select Sheen Finish */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-5 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">
                        3
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-stone-900">
                        Select Sheen Finish
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">Certified Birla Opus surface sheens</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "Satin Silk", label: "Satin Silk", sheen: "30% Soft Luster" },
                      { id: "Velvet Matte", label: "Velvet Matte", sheen: "5% Chalk Matte" },
                      { id: "High Gloss", label: "High Gloss", sheen: "75% Mirror Gloss" },
                      { id: "Rain-Shield", label: "Rain-Shield", sheen: "Exterior Ultra" },
                    ].map((fin) => {
                      const isSelected = selectedFinish === fin.id;
                      return (
                        <button
                          key={fin.id}
                          type="button"
                          onClick={() => setSelectedFinish(fin.id)}
                          className={`py-2.5 px-3 rounded-2xl text-center transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                              : "bg-white/80 border-stone-200/80 text-stone-700 hover:bg-white hover:border-stone-300 hover:shadow-xs"
                          }`}
                        >
                          <span className="block text-xs font-bold">{fin.label}</span>
                          <span
                            className={`block text-[10px] mt-0.5 ${
                              isSelected ? "text-stone-300" : "text-stone-400"
                            }`}
                          >
                            {fin.sheen}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Concierge Hallmark Note */}
                <div className="rounded-2xl border border-[#E7DFD4] bg-[#FAF7F2] p-3.5 sm:p-4 flex items-center gap-3 text-stone-800 shadow-2xs">
                  <div className="size-8 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0 text-accent">
                    <Sparkles className="size-4" />
                  </div>
                  <div className="text-xs leading-relaxed">
                    <span className="font-semibold text-stone-900 mr-1.5">
                      Bespoke Spectrophotometer Formulation:
                    </span>
                    <span className="text-stone-600">
                      Bring any physical sample, tile, fabric, or paint chip to our Perundurai Road laboratory for complimentary 3-minute computerized color matching.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
