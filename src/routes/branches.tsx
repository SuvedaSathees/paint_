import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Car, 
  Truck, 
  Palette, 
  CheckCircle2, 
  PhoneCall,
  ShieldCheck,
  Building,
  Sparkles,
  Star,
  Zap,
  Store
} from "lucide-react";



export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Store Branches & Locations | Akshara Paints & Hardware" },
      { name: "description", content: "Locate Akshara Paints & Hardware flagship Birla Opus showroom, industrial electrical conduit warehouse, and retail express counters in Erode." },
      { property: "og:title", content: "Store Branches & Locations | Akshara Paints & Hardware" },
      { property: "og:description", content: "Find addresses, working hours, and contact details for all Akshara branches in Erode." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BranchesPage,
});

interface Branch {
  id: string;
  name: string;
  type: string;
  image: string;
  icon: typeof Palette;
  iconBg: string;
  rating: string;
  reviewsCount: string;
  status: string;
  isOpen: boolean;
  address: string;
  landmark: string;
  phone: string[];
  timing: string;
  sundayTiming: string;
  features: string[];
  badge: string;
  mapUrl: string;
  popular?: boolean;
}

const branchList: Branch[] = [
  {
    id: "flagship-experience-center",
    name: "Flagship Showroom & Birla Opus Studio",
    type: "Experience Center & Retail",
    image: "/branch-flagship.jpg",
    icon: Palette,
    iconBg: "#FCE7DF",
    rating: "4.9",
    reviewsCount: "1,420+",
    status: "Open Now • Closes 8:30 PM",
    isOpen: true,
    address: "Plot 42, Akshara Commercial Complex, Main Highway Junction, Bypass Road",
    landmark: "Directly opposite Metro Pillar 118, Beside City Bank",
    phone: ["+91 98765 43210", "+91 98765 43211"],
    timing: "Mon – Sat: 8:30 AM – 8:30 PM",
    sundayTiming: "Sunday: 9:00 AM – 2:00 PM",
    badge: "Official Birla Opus Studio",
    features: [
      "Digital Spectrophotometer Tinting Lab (3-min mixing)",
      "Full Architectural Color Wall & Tactile Swatch Gallery",
      "Contractor, Builder & Architect Consultation Lounge",
      "Spacious Paved Customer Parking & Rapid Trunk Loading"
    ],
    mapUrl: "https://maps.google.com/?q=Akshara+Paints+and+Hardware",
    popular: true,
  },
  {
    id: "industrial-hardware-depot",
    name: "Industrial Conduit & Heavy Fastener Depot",
    type: "Bulk Supply & Logistics Hub",
    image: "/branch-depot.jpg",
    icon: Truck,
    iconBg: "#E0F2FE",
    rating: "4.8",
    reviewsCount: "860+",
    status: "Open Now • Closes 7:30 PM",
    isOpen: true,
    address: "Shed No. 12-B, Industrial Estate Phase II, Logistics Hub Road",
    landmark: "Next to National Freight Terminal Gate 3",
    phone: ["+91 98765 43212", "+91 98765 43213"],
    timing: "Mon – Sat: 8:00 AM – 7:30 PM",
    sundayTiming: "Sunday: Closed (Emergency Site Delivery on Request)",
    badge: "Wholesale & Logistics Hub",
    features: [
      "Over 50,000 meters of Rigid PVC Conduits in Stock",
      "Digital Weighment Scale for High-Tensile Bolts & Nuts",
      "Heavy Truck & LCV Loading Bays with Overhead Crane",
      "Immediate GST B2B Invoicing & Commercial Credit Desk"
    ],
    mapUrl: "https://maps.google.com/?q=Akshara+Industrial+Hardware+Depot",
  },
  {
    id: "town-central-express",
    name: "Market Square Retail Express Outlet",
    type: "City Center Quick Counter",
    image: "/branch-express.jpg",
    icon: Store,
    iconBg: "#FEF0D4",
    rating: "4.9",
    reviewsCount: "940+",
    status: "Open Now • Closes 9:00 PM",
    isOpen: true,
    address: "Shop 7 & 8, Old Market Square, Near Central Clock Tower",
    landmark: "Adjacent to Royal Gold Plaza, Agraharam Street",
    phone: ["+91 98765 43214"],
    timing: "Mon – Sun: 9:00 AM – 9:00 PM (All 7 Days)",
    sundayTiming: "Open Full Day on Sundays",
    badge: "Fast Retail Express",
    features: [
      "Ready-stock Interior & Exterior 1L & 4L Paint Cans",
      "Fast Wall Touch-up, Putty & Waterproofing Counter",
      "Electrical Wiring Accessories, Switchgear & Conduits",
      "Walk-in Trade Tools & Premium Roller Brushes"
    ],
    mapUrl: "https://maps.google.com/?q=Akshara+Paints+Market+Square",
  },
];

function BranchesPage() {
  const [activeBranchId, setActiveBranchId] = useState<string>(branchList[0].id);
  const activeBranch = branchList.find((b) => b.id === activeBranchId) || branchList[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col selection:bg-accent/20">
      <SiteHeader />

      {/* Hero Header */}
      <section className="relative pt-12 pb-14 px-4 sm:px-7 lg:px-10 border-b border-primary/10 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-[#FAF8F5]">
        <div className="absolute -right-24 -top-24 size-96 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />
        <div className="absolute left-10 top-1/2 size-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Centered Kicker */}
          <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.26em] text-accent block mb-3.5 select-none">
            &mdash; STRATEGIC ERODE NETWORK &amp; FACTORY LOGISTICS &mdash;
          </span>

          {/* Centered Serif Main Heading */}
          <h1 className="font-display font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-primary font-normal leading-[1.12] mb-4 sm:mb-5">
            Our Store Locations &amp; Warehouses
          </h1>

          {/* Centered Subtitle Paragraph */}
          <p className="text-xs sm:text-sm md:text-[15px] text-muted-foreground tracking-wide leading-relaxed max-w-3xl mx-auto">
            Whether you need a luxury Birla Opus color consultation, truckload conduit pipe dispatch, or quick fasteners on the go &mdash; our purpose-built branch facilities are fully staffed and equipped to serve you.
          </p>

          {/* Centered Authority Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-semibold text-muted-foreground select-none">
            <span className="inline-flex items-center gap-1.5">
              <Building className="size-3.5 text-accent" /> 3 Strategic Erode Showrooms
            </span>
            <span className="hidden sm:inline opacity-40">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <Car className="size-3.5 text-accent" /> Customer &amp; Contractor Parking
            </span>
            <span className="hidden sm:inline opacity-40">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <Palette className="size-3.5 text-emerald-600" /> In-Store Computerized Tinting
            </span>
            <span className="hidden sm:inline opacity-40">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-3.5 text-primary" /> Same-Day 35km Fleet Dispatch
            </span>
            <span className="hidden sm:inline opacity-40">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="size-3.5 text-accent" /> Instant GST Invoicing
            </span>
          </div>
        </div>
      </section>

      {/* Branch Cards List - Luxury Architectural Visual Cards */}
      <section className="py-12 sm:py-16 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-serif text-2xl sm:text-3xl text-primary font-normal tracking-tight">
              Select a Branch
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Click on any location below for live operating hours, directions, and direct trade desk contacts.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
            </span>
            All 3 Branches Open Today
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 sm:gap-8 items-stretch">
          {branchList.map((branch) => {
            const isSelected = activeBranchId === branch.id;
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
              `Hello Akshara Paints & Hardware, I am inquiring with your ${branch.name}. Please share stock availability and directions.`
            )}`;

            return (
              <div
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`group relative flex flex-col justify-between rounded-[32px] border bg-[#FAF8F5] overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 shadow-xl"
                    : "border-[#E7E2D6] hover:border-primary/30"
                }`}
              >
                <div>
                  {/* Visual Header with Real Architectural Photograph */}
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-stone-100">
                    <img
                      src={branch.image}
                      alt={branch.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[0.66rem] font-bold uppercase tracking-wider text-primary shadow-xs">
                        {branch.badge}
                      </span>
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[0.66rem] font-semibold text-emerald-400 border border-emerald-400/30 flex items-center gap-1.5 shadow-xs">
                        <span className="relative flex size-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500" />
                        </span>
                        OPEN NOW
                      </span>
                    </div>

                    {/* Featured Ribbon */}
                    {branch.popular && (
                      <div className="absolute top-12 left-3.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 text-stone-950 font-extrabold text-[0.62rem] uppercase tracking-wider px-2.5 py-0.5 shadow-md">
                          <Sparkles className="size-3" /> Flagship Experience
                        </span>
                      </div>
                    )}

                    {/* Bottom Image Overlay: Reviews & Type */}
                    <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span>{branch.rating}</span>
                        <span className="text-white/70 text-[11px]">({branch.reviewsCount})</span>
                      </div>
                      <span className="text-[11px] font-mono text-white/80 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg">
                        {branch.type}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-[#8C7A6B]">
                        {branch.type}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                        <Clock className="size-3" /> {branch.status.split("•")[0].trim()}
                      </span>
                    </div>

                    <h3 className="font-display font-serif text-2xl font-normal text-primary tracking-tight leading-snug group-hover:text-paint-deep transition-colors">
                      {branch.name}
                    </h3>

                    <div className="mt-4 space-y-3.5 text-xs text-muted-foreground border-t border-stone-200/80 pt-4">
                      {/* Address */}
                      <div className="flex items-start gap-2.5">
                        <MapPin className="size-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-foreground font-semibold leading-relaxed">{branch.address}</p>
                          <p className="text-[11.5px] text-stone-500 mt-0.5 flex items-center gap-1">
                            <span className="text-accent font-bold">Landmark:</span> {branch.landmark}
                          </p>
                        </div>
                      </div>

                      {/* Timings */}
                      <div className="flex items-start gap-2.5">
                        <Clock className="size-4 text-accent shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="text-foreground font-semibold">{branch.timing}</p>
                          <p className="text-[11.5px] text-stone-500">{branch.sundayTiming}</p>
                        </div>
                      </div>

                      {/* Direct Phone Numbers */}
                      <div className="flex items-start gap-2.5">
                        <Phone className="size-4 text-accent shrink-0 mt-0.5" />
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {branch.phone.map((ph) => (
                            <a
                              key={ph}
                              href={`tel:${ph.replace(/\s+/g, "")}`}
                              className="text-foreground hover:text-primary transition-colors font-semibold"
                            >
                              {ph}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Facilities Checklist */}
                    <div className="mt-5 border-t border-stone-200/70 pt-4 space-y-2">
                      <p className="text-[0.68rem] font-bold uppercase tracking-wider text-primary">
                        Branch Highlights &amp; Amenities:
                      </p>
                      {branch.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground/85">
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="p-6 sm:p-7 pt-0">
                  <div className="pt-4 border-t border-stone-200/80 flex items-center gap-2.5">
                    <Button
                      variant="hero"
                      size="sm"
                      asChild
                      className="flex-1 justify-center cursor-pointer rounded-full text-xs font-semibold shadow-xs"
                    >
                      <a href={branch.mapUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center">
                        <span>Get Directions</span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="shrink-0 cursor-pointer rounded-full border-stone-300 bg-white hover:bg-stone-50 px-3.5"
                      title="Direct WhatsApp"
                    >
                      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center text-xs font-semibold text-emerald-700">
                        <span>WhatsApp</span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="shrink-0 cursor-pointer rounded-full border-stone-300 bg-white hover:bg-stone-50"
                      title="Call Store"
                    >
                      <a href={`tel:${branch.phone[0].replace(/\s+/g, "")}`}>
                        <PhoneCall className="size-3.5 text-primary" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Facilities & Amenities Matrix */}
      <section className="py-14 sm:py-16 px-4 sm:px-7 lg:px-10 bg-stone-100/70 border-t border-b border-primary/10">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-2 select-none">
              &mdash; THE AKSHARA NETWORK PROMISE &mdash;
            </span>
            <h2 className="font-display font-serif text-3xl sm:text-4xl text-primary font-normal tracking-tight">
              Showroom &amp; Warehouse Amenities
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Every facility is customized to give builders, contractors, and homeowners the fastest, most reliable service in Erode.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-[24px] border border-[#E7E2D6] bg-[#FAF8F5] p-6 shadow-xs hover:shadow-md transition-all">
              <div className="size-12 rounded-2xl bg-amber-100 text-amber-900 grid place-items-center mb-3">
                <Palette className="size-6" />
              </div>
              <h3 className="font-display font-bold text-base text-primary">Instant Color Tinting</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Computerized Datacolor dispensers match and dispense custom Birla Opus shades in under 3 minutes.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#E7E2D6] bg-[#FAF8F5] p-6 shadow-xs hover:shadow-md transition-all">
              <div className="size-12 rounded-2xl bg-sky-100 text-sky-900 grid place-items-center mb-3">
                <Truck className="size-6" />
              </div>
              <h3 className="font-display font-bold text-base text-primary">Site Dispatch Logistics</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Dedicated fleet transporting 3m conduit bundles, bulk 20L paint pails, and fastener boxes directly to site gates.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#E7E2D6] bg-[#FAF8F5] p-6 shadow-xs hover:shadow-md transition-all">
              <div className="size-12 rounded-2xl bg-emerald-100 text-emerald-900 grid place-items-center mb-3">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="font-display font-bold text-base text-primary">Certified Quality</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Authorized dealer certificates, authentic batch test reports, and ISI-certified electrical conduits.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#E7E2D6] bg-[#FAF8F5] p-6 shadow-xs hover:shadow-md transition-all">
              <div className="size-12 rounded-2xl bg-stone-200 text-stone-900 grid place-items-center mb-3">
                <Car className="size-6" />
              </div>
              <h3 className="font-display font-bold text-base text-primary">Easy Access &amp; Parking</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Spacious highway-front parking bays, wide gates, and covered loading ramps for quick vehicle trunk loading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advance Order Callout */}
      <section className="py-14 sm:py-16 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full">
        <div className="rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#0A0F1A] text-white p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-amber-300 block mb-2 select-none">
            &mdash; FAST-TRACK EXPRESS PROCUREMENT &mdash;
          </span>
          <h2 className="font-display font-serif text-2xl sm:text-4xl font-normal tracking-tight text-white">
            Call Ahead for Pre-Mixed Paint or Ready Hardware Bundles
          </h2>
          <p className="text-xs sm:text-sm text-white/75 mt-3 max-w-xl mx-auto leading-relaxed">
            Short on time? Phone your nearest branch with your shade codes or conduit quantities. Our team will keep your order packed and billed for lightning-fast drive-through pickup.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="hero" size="default" asChild className="rounded-full cursor-pointer shadow-md px-6">
              <a href="tel:+919876543210" className="flex items-center justify-center">
                <span>Call Flagship Store: +91 98765 43210</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="default"
              asChild
              className="rounded-full bg-white/10 hover:bg-white/20 border-white/25 text-white cursor-pointer px-6"
            >
              <a
                href="https://wa.me/919876543210?text=Hello%20Akshara%20Paints%20%26%20Hardware,%20I%20would%20like%20to%20place%20a%20pre-mixed%20paint%20or%20hardware%20order%20for%20pickup."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center"
              >
                <span>WhatsApp Pre-Order Desk</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
