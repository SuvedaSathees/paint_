import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Professional Services & Contractor Solutions | Akshara Paints & Hardware Erode" },
      {
        name: "description",
        content:
          "Computerized Birla Opus paint tinting in under 3 mins, free wall dampness site diagnostics, scheduled fleet logistics across Erode & Perundurai, custom fastener sizing, and contractor BOQ estimations.",
      },
      { property: "og:title", content: "Professional Services & Contractor Solutions | Akshara Paints & Hardware Erode" },
      {
        property: "og:description",
        content:
          "Expert computerized color tinting, same-day job-site delivery across Erode, complimentary dampness audits, and structural fastener sizing.",
      },
      { property: "og:type", content: "website" },
      {
        name: "keywords",
        content:
          "Birla Opus paint tinting Erode, computerized paint mixing, paint delivery Erode, wall dampness check Erode, anchor bolts Erode, contractor paint supply, Perundurai SIPCOT materials, building material supplier Erode",
      },
    ],
  }),
  component: ServicesPage,
});

type ServiceCategory = "all" | "paints" | "logistics" | "structural";

interface ServiceItem {
  id: string;
  category: "paints" | "logistics" | "structural";
  highlight: string;
  title: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  description: string;
  ctaLabel: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "tinting",
    category: "paints",
    highlight: "Under 3 Mins | 99.8% Match",
    title: "Computerized Birla Opus Color Tinting",
    image: "/product-paints.jpg",
    description:
      "Digital spectrophotometer lab dispensing exact Birla Opus formulations in under 3 minutes.",
    ctaLabel: "Book Color Trial",
  },
  {
    id: "waterproofing",
    category: "paints",
    highlight: "Complimentary | RF Scanning",
    title: "Moisture & Waterproofing Site Assessment",
    image: "/product-waterproofing.jpg",
    beforeImage: "/akshara-before-room.jpg",
    afterImage: "/akshara-after-room.jpg",
    description:
      "Non-destructive RF diagnostics for persistent dampness, efflorescence, and slab cracks.",
    ctaLabel: "Schedule Dampness Audit",
  },
  {
    id: "delivery",
    category: "logistics",
    highlight: "Daily 8:00 AM | 35km Radius",
    title: "Scheduled Job-Site Material Delivery",
    image: "/product-pipes.jpg",
    description:
      "Direct site delivery of 3-meter conduit bundles, 20L paint drums, and hardware across Erode.",
    ctaLabel: "Request Site Delivery",
  },
  {
    id: "fasteners",
    category: "structural",
    highlight: "Grade 8.8 & 10.9 | M6 to M36",
    title: "Fastener Customization & Structural Sizing",
    image: "/product-bolts.jpg",
    description:
      "Precision stud cutting, galvanizing, and custom foundation anchor sizing for structural projects.",
    ctaLabel: "Order Custom Sizing",
  },
  {
    id: "estimation",
    category: "logistics",
    highlight: "4-6 Hr Turnaround | Zero-Waste",
    title: "Contractor BOQ & Material Estimation",
    image: "/product-hardware.jpg",
    description:
      "Fast blueprint takeoffs calculating paint literage, primer requirements, and conduit quantities.",
    ctaLabel: "Submit BOQ for Estimate",
  },
  {
    id: "contractors",
    category: "structural",
    highlight: "30+ Teams | Airless Certified",
    title: "Turnkey Painting Contractor Recommendations",
    image: "/product-building.jpg",
    description:
      "Direct connections with vetted master painting crews trained in Birla Opus application standards.",
    ctaLabel: "Hire a Vetted Applicator",
  },
  {
    id: "spray-equipment",
    category: "paints",
    highlight: "Graco & Wagner | Commercial Duty",
    title: "Airless Paint Sprayer Rental & Servicing",
    image: "/product-rollers.jpg",
    description:
      "High-pressure airless spray machine rentals with on-site nozzle calibration and spray tip maintenance.",
    ctaLabel: "Rent Spray Equipment",
  },
  {
    id: "conduit-fabrication",
    category: "logistics",
    highlight: "IS:9537 Standard | 20mm to 50mm",
    title: "Precision Conduit Cutting & Offset Bending",
    image: "/product-pipes.jpg",
    description:
      "Custom conduit lengths, factory 90-degree saddle bends, and threaded steel couplings for raceways.",
    ctaLabel: "Order Custom Conduits",
  },
  {
    id: "anchor-testing",
    category: "structural",
    highlight: "Hydraulic Dial | On-Site Proof Load",
    title: "Structural Anchor Proof-Load Testing",
    image: "/product-threaded-rods.jpg",
    description:
      "Certified pull-out tension testing for post-installed rebar and chemical anchor studs in cracked concrete.",
    ctaLabel: "Request Proof-Load Test",
  },
  {
    id: "shade-sampling",
    category: "paints",
    highlight: "200ml Test Pots | Daylight Review",
    title: "On-Wall Shade Mockups & Color Sampling",
    image: "/room-sage.jpg",
    description:
      "Direct on-plaster test patches across natural daylight and warm LED lighting before full volume supply.",
    ctaLabel: "Order Color Samples",
  },
  {
    id: "site-staging",
    category: "logistics",
    highlight: "Secure Warehousing | Phased Release",
    title: "Phased Material Staging & Buffer Warehousing",
    image: "/product-hardware.jpg",
    description:
      "Secure warehouse staging for bulk orders with scheduled gate delivery aligned with your floor-by-floor site progress.",
    ctaLabel: "Plan Phased Staging",
  },
  {
    id: "galvanizing-coating",
    category: "structural",
    highlight: "ASTM A153 | 65-Micron Shield",
    title: "Hot-Dip Galvanizing & Zinc Passivation",
    image: "/product-bolts.jpg",
    description:
      "High-spec sacrificial zinc baths and passivation coatings protecting structural bolts from tropical moisture and corrosion.",
    ctaLabel: "Request Coating Sizing",
  },
];

function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewStates, setViewStates] = useState<Record<string, "before" | "after">>({});

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: "all", label: `All (${servicesData.length})` },
    { id: "paints", label: `Color & Waterproofing (${servicesData.filter((s) => s.category === "paints").length})` },
    { id: "logistics", label: `Fleet & Estimation (${servicesData.filter((s) => s.category === "logistics").length})` },
    { id: "structural", label: `Hardware & Labor (${servicesData.filter((s) => s.category === "structural").length})` },
  ];

  const filteredServices = servicesData.filter((s) => {
    const matchesCategory = selectedCategory === "all" || s.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.highlight.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero Header Section - Centered Luxury Architectural Layout */}
      <section className="relative pt-12 sm:pt-14 pb-12 sm:pb-14 px-4 sm:px-7 lg:px-10 border-b border-primary/10 overflow-hidden bg-gradient-to-b from-stone-50/80 via-white to-background">
        <div className="absolute left-1/2 -top-28 -translate-x-1/2 size-[650px] rounded-full bg-radial from-accent/12 via-primary/5 to-transparent blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.26em] text-accent block mb-3.5 select-none">
            &mdash; EXPERT CRAFTSMANSHIP &amp; CONTRACTOR SERVICES &mdash;
          </span>

          <h1 className="font-display font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-primary font-normal leading-[1.12] mb-4 sm:mb-5">
            Professional Services
          </h1>

          <p className="text-xs sm:text-sm md:text-[15px] text-muted-foreground tracking-wide leading-relaxed max-w-3xl lg:max-w-4xl mx-auto">
            From 3-minute computerized Birla Opus shade dispensing and non-destructive dampness audits
            to custom fastener sizing and scheduled job-site logistics &mdash; we back every project with master technical precision.
          </p>

          <p className="mt-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent/90">
            Serving Erode / Perundurai SIPCOT / Bhavani / Modakkurichi
          </p>

          {/* Compact 1-Row Proof Metric Ribbon */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-stone-200/80 bg-white/95 p-3 text-center shadow-2xs">
              <span className="font-serif text-xl sm:text-2xl font-bold text-primary block">2,200+</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Opus Shades</span>
            </div>
            <div className="rounded-2xl border border-stone-200/80 bg-white/95 p-3 text-center shadow-2xs">
              <span className="font-serif text-xl sm:text-2xl font-bold text-primary block">&lt; 3 Mins</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Dosing Speed</span>
            </div>
            <div className="rounded-2xl border border-stone-200/80 bg-white/95 p-3 text-center shadow-2xs">
              <span className="font-serif text-xl sm:text-2xl font-bold text-primary block">35 km</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Fleet Coverage</span>
            </div>
            <div className="rounded-2xl border border-stone-200/80 bg-white/95 p-3 text-center shadow-2xs">
              <span className="font-serif text-xl sm:text-2xl font-bold text-primary block">M6–M36</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Bolt Sizing</span>
            </div>
          </div>

          {/* Search Input & Category Filter Tabs */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3 w-full max-w-4xl mx-auto">
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services"
                className="w-full h-[36px] rounded-full border border-stone-200/90 bg-white/95 pl-9 pr-4 text-xs sm:text-[13px] text-foreground placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-stone-100/90 border border-stone-200/80 shadow-2xs">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`h-[30px] rounded-full px-3.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center ${
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

      {/* 12 Core Services Showcase - Clean Minimal Architectural Cards */}
      <section className="py-12 sm:py-16 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full flex-1">
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 rounded-[28px] border border-stone-200 bg-[#FAF8F5] p-8 max-w-md mx-auto">
            <h3 className="font-display font-serif text-lg font-normal text-primary">No services found</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Try a different keyword or reset your category filters
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 rounded-full"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {filteredServices.map((srv) => (
              <article
                key={srv.id}
                className="group relative flex flex-col justify-between rounded-[28px] sm:rounded-[32px] border border-[#E7E2D6] bg-[#FAF8F5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Visual Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
                  <img
                    src={
                      srv.beforeImage && srv.afterImage
                        ? (viewStates[srv.id] ?? "after") === "before"
                          ? srv.beforeImage
                          : srv.afterImage
                        : srv.image
                    }
                    alt={srv.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Interactive Before / After Visual Toggle */}
                  {srv.beforeImage && srv.afterImage && (
                    <>
                      <div className="absolute top-3 right-3 z-20 flex items-center rounded-full bg-stone-900/80 p-0.5 backdrop-blur-md border border-white/25 text-[10px] font-semibold text-white shadow-md">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setViewStates((prev) => ({ ...prev, [srv.id]: "before" }));
                          }}
                          className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                            viewStates[srv.id] === "before"
                              ? "bg-white text-stone-950 shadow-xs"
                              : "text-white/80 hover:text-white"
                          }`}
                        >
                          Before
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setViewStates((prev) => ({ ...prev, [srv.id]: "after" }));
                          }}
                          className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                            (viewStates[srv.id] ?? "after") === "after"
                              ? "bg-white text-stone-950 shadow-xs"
                              : "text-white/80 hover:text-white"
                          }`}
                        >
                          After
                        </button>
                      </div>

                      <div className="absolute bottom-2.5 left-3 z-10 pointer-events-none">
                        <span className="inline-block rounded-md bg-black/60 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                          {viewStates[srv.id] === "before" ? "Damp Wall Damage" : "Opus Restored"}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Card Body */}
                <div className="px-[15px] py-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Subtle Turnaround Indicator Tag */}
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent block mb-1">
                      {srv.highlight}
                    </span>

                    <h3
                      className="font-display font-serif text-lg sm:text-xl font-normal text-primary tracking-tight leading-snug group-hover:text-paint-deep transition-colors"
                    >
                      {srv.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="mt-6 pt-4 border-t border-stone-200/80">
                    <Button
                      variant="hero"
                      size="sm"
                      asChild
                      className="w-full rounded-full text-xs font-semibold cursor-pointer shadow-xs justify-center"
                    >
                      <a
                        href={`https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20I%20would%20like%20to%20inquire%20about%20your%20service:%20${encodeURIComponent(
                          srv.title
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center"
                      >
                        <span>{srv.ctaLabel}</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Streamlined Bottom Consultation Strip */}
      <section className="pb-16 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full">
        <div className="rounded-[28px] border border-[#E7E2D6] bg-gradient-to-r from-stone-50 via-white to-stone-50 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-display font-serif text-xl sm:text-2xl font-normal text-primary">
              Need a Custom Site Service or Bulk Contractor Quote?
            </h3>
            <p className="text-xs sm:text-[13px] text-muted-foreground">
              Speak directly with our senior technical desk for project scheduling and material takeoff assistance
            </p>
          </div>
          <Button
            variant="hero"
            size="default"
            asChild
            className="rounded-full px-7 py-2.5 text-xs font-semibold cursor-pointer shadow-md shrink-0"
          >
            <a
              href="https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20I%20have%20a%20custom%20service%20inquiry%20regarding%20my%20project%20in%20Erode"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center"
            >
              <span>Consult Technical Desk</span>
            </a>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
