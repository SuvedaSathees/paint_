import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HelpStrip } from "@/components/help-strip";
import { ArrowRight, Search, Wrench } from "lucide-react";
import { whatsappLink } from "@/lib/store-info";

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

  const categories: { id: ServiceCategory; label: string; count: number }[] = [
    { id: "all", label: "All", count: servicesData.length },
    { id: "paints", label: "Color & Waterproofing", count: servicesData.filter((x) => x.category === "paints").length },
    { id: "logistics", label: "Fleet & Estimation", count: servicesData.filter((x) => x.category === "logistics").length },
    { id: "structural", label: "Hardware & Labor", count: servicesData.filter((x) => x.category === "structural").length },
  ];
  const categoryLabel = (id: ServiceItem["category"]) => categories.find((c) => c.id === id)?.label ?? "";

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

  const gridHeading = searchQuery.trim()
    ? `Results for “${searchQuery.trim()}”`
    : selectedCategory === "all"
      ? "All services"
      : categoryLabel(selectedCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Page header: title on the left, search & filters on the right */}
      <section className="px-4 sm:px-7 lg:px-10 pt-7 sm:pt-14 pb-5 sm:pb-10 border-b border-stone-200/70">
        <div className="mx-auto max-w-[1440px] flex flex-col gap-4 sm:gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-8">
          <div className="text-center xl:text-left">
            <p className="flex items-center justify-center xl:justify-start gap-2.5 sm:gap-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#F05323] sm:text-xs sm:tracking-[0.22em]">
              <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
              <span className="sm:hidden">Expert contractor services</span>
              <span className="hidden sm:inline">Expert craftsmanship &amp; contractor services</span>
              <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
            </p>
            <h1 className="mt-1.5 sm:mt-2 font-serif text-[2rem] leading-tight sm:text-5xl text-primary">
              Professional Services
            </h1>
          </div>

          <div className="flex w-full flex-col gap-3 xl:w-auto xl:shrink-0">
            <div className="relative mx-auto w-full max-w-xl xl:max-w-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-stone-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                aria-label="Search services"
                className="w-full h-11 rounded-full border border-stone-200 bg-white pl-11 pr-16 text-sm text-foreground placeholder:text-stone-400 outline-none transition focus:border-[#F05323] focus:ring-4 focus:ring-[#F05323]/10 [&::-webkit-search-cancel-button]:hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-800 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center xl:justify-end">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    aria-pressed={isActive}
                    className={`h-9 shrink-0 rounded-full border px-3.5 sm:px-4 text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center ${
                      isActive
                        ? "bg-[#0A2234] text-white border-[#0A2234]"
                        : "bg-white text-stone-600 border-stone-200 hover:text-stone-900 hover:border-stone-300"
                    }`}
                  >
                    {cat.label}
                    <span className={`ml-1.5 text-[11px] ${isActive ? "text-white/70" : "text-stone-400"}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="px-4 sm:px-7 lg:px-10 pt-4 sm:pt-14 pb-10 mx-auto max-w-[1440px] w-full flex-1">
        <div className="mb-3 sm:mb-6 flex items-end justify-between gap-4">
          <h2 className={`font-serif text-lg sm:text-3xl text-primary ${searchQuery.trim() ? "" : "hidden sm:block"}`}>{gridHeading}</h2>
          <p className="shrink-0 text-[13px] sm:text-sm text-stone-500">
            {filteredServices.length} {filteredServices.length === 1 ? "service" : "services"}
          </p>
        </div>

        {filteredServices.length === 0 ? (
          <div className="rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center">
            <h3 className="font-serif text-xl text-primary">No services found</h3>
            <p className="mt-2 text-sm text-stone-500">Try a different word, or show all services.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-5 inline-flex h-10 items-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50 cursor-pointer"
            >
              Show all services
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3 ${filteredServices.length % 4 === 0 ? "xl:grid-cols-4" : ""}`}
          >
            {filteredServices.map((srv) => {
              const hasCompare = Boolean(srv.beforeImage && srv.afterImage);
              const view = viewStates[srv.id] ?? "after";
              return (
                <article
                  key={srv.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,40,56,0.08)]"
                >
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={hasCompare ? (view === "before" ? srv.beforeImage : srv.afterImage) : srv.image}
                      alt={srv.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />

                    {hasCompare && (
                      <div className="absolute right-1.5 top-1.5 flex rounded-full bg-white/95 p-0.5 text-[10px] sm:text-xs font-semibold shadow-sm sm:right-3 sm:top-3">
                        {(["before", "after"] as const).map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setViewStates((prev) => ({ ...prev, [srv.id]: v }))}
                            aria-pressed={view === v}
                            className={`rounded-full px-2 py-0.5 sm:px-3 sm:py-1 capitalize transition-colors cursor-pointer ${
                              view === v ? "bg-[#0A2234] text-white" : "text-stone-600 hover:text-stone-900"
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-3 sm:p-6">
                    <p className="truncate text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-[#F05323]">
                      {categoryLabel(srv.category)}
                    </p>
                    <h3 className="mt-1 sm:mt-2 line-clamp-2 min-h-[2.5em] sm:min-h-0 sm:line-clamp-none font-serif text-[14.5px] sm:text-xl leading-snug text-primary">{srv.title}</h3>
                    <p className="mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-none text-[11.5px] sm:text-sm leading-snug sm:leading-relaxed text-stone-600">{srv.description}</p>
                    <p className="mt-3 text-[13px] font-medium text-stone-500 max-sm:hidden">{srv.highlight.replace(/\s*\|\s*/g, " · ")}</p>

                    <div className="mt-auto pt-2.5 sm:pt-5">
                      <a
                        href={whatsappLink(`Hello Akshara Paints, I would like to know about your service: ${srv.title}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 sm:gap-3 border-t border-stone-100 pt-2.5 sm:pt-4 text-[12px] sm:text-sm font-semibold text-stone-900 transition-colors hover:text-[#F05323]"
                      >
                        {srv.ctaLabel}
                        <ArrowRight className="size-3.5 sm:size-4 shrink-0 text-[#F05323] transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Help strip */}
      <section className="px-4 sm:px-7 lg:px-10 pb-6 sm:pb-8 mx-auto max-w-[1440px] w-full">
        <HelpStrip
          icon={Wrench}
          title="Need a custom service or a bulk quote?"
          text="Talk to our team about site schedules, quantities and delivery across Erode."
          whatsappText="Hello Akshara Paints, I have a custom service enquiry for my project in Erode."
        />
      </section>

      <SiteFooter className="mt-0! sm:mt-0!" />
    </div>
  );
}
