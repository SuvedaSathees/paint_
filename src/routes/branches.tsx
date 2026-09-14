import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
  ShieldCheck,
  Building,
  Star,
  Zap,
  Store,
  ChevronDown
} from "lucide-react";



// ── Multi-Location Schema.org JSON-LD ──────────────────────────────────────
const multiLocationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Akshara Paints & Hardware Store Locations in Erode",
  description:
    "Official Birla Opus paint studio, industrial conduit logistics depot, and market retail counters across Erode district.",
  url: "https://aksharapaints.in/branches",
  numberOfItems: 3,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "PaintStore",
        name: "Akshara Paints & Hardware – Flagship Showroom & Birla Opus Studio",
        description:
          "Experience center with digital spectrophotometer tinting lab, full architectural color wall, and contractor consultation lounge.",
        image: "https://aksharapaints.in/branch-flagship.jpg",
        url: "https://aksharapaints.in/branches#flagship-experience-center",
        telephone: "+919876543210",
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Card, Net Banking",
        openingHours: ["Mo-Sa 08:30-20:30", "Su 09:00-14:00"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot 42, Akshara Commercial Complex, Main Highway Junction, Bypass Road",
          addressLocality: "Erode",
          addressRegion: "Tamil Nadu",
          postalCode: "638002",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 11.3424,
          longitude: 77.7272,
        },
        hasMap: "https://maps.google.com/?q=Akshara+Paints+and+Hardware",
        areaServed: [
          "Collectorate",
          "Sampath Nagar",
          "Thindal",
          "Veerappanchatiram",
          "Bypass Road",
          "Erode",
        ],
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "HardwareStore",
        name: "Akshara Industrial Conduit & Heavy Fastener Depot",
        description:
          "Wholesale supply hub with 50,000m+ rigid PVC conduits, high-tensile fasteners, and heavy truck bay dispatch.",
        image: "https://aksharapaints.in/branch-depot.jpg",
        url: "https://aksharapaints.in/branches#industrial-hardware-depot",
        telephone: "+919876543212",
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Card, RTGS/NEFT",
        openingHours: ["Mo-Sa 08:00-19:30"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shed No. 12-B, Industrial Estate Phase II, Logistics Hub Road",
          addressLocality: "Perundurai, Erode",
          addressRegion: "Tamil Nadu",
          postalCode: "638052",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 11.278,
          longitude: 77.584,
        },
        hasMap: "https://maps.google.com/?q=Akshara+Industrial+Hardware+Depot",
        areaServed: [
          "Perundurai",
          "SIPCOT Industrial Phase II",
          "Chennimalai",
          "Vijayamangalam",
          "Erode West",
        ],
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "HardwareStore",
        name: "Akshara Paints Market Square Retail Express Outlet",
        description:
          "Quick retail counter with ready-stock 1L & 4L paint cans, wall touch-up counter, and electrical wiring accessories.",
        image: "https://aksharapaints.in/branch-express.jpg",
        url: "https://aksharapaints.in/branches#town-central-express",
        telephone: "+919876543214",
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Card",
        openingHours: ["Mo-Su 09:00-21:00"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shop 7 & 8, Old Market Square, Near Central Clock Tower, Agraharam",
          addressLocality: "Erode",
          addressRegion: "Tamil Nadu",
          postalCode: "638001",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 11.341,
          longitude: 77.717,
        },
        hasMap: "https://maps.google.com/?q=Akshara+Paints+Market+Square",
        areaServed: [
          "Agraharam",
          "Clock Tower",
          "Erode Fort",
          "Cauvery Road",
          "Bhavani Road",
          "Central Erode",
        ],
      },
    },
  ],
};

// ── Breadcrumb Schema.org JSON-LD ──────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://aksharapaints.in/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Branches & Stores",
      item: "https://aksharapaints.in/branches",
    },
  ],
};

// ── Local Store FAQ Schema.org JSON-LD ─────────────────────────────────────
export const branchFaqList = [
  {
    num: "01",
    tag: "Paint Studio",
    question: "Which Akshara Paints branch offers computerized Birla Opus paint tinting?",
    highlight: "3-Minute Datacolor Mixing • Digital Spectrophotometer Precision",
    answer:
      "Our Flagship Showroom on Bypass Road features an in-store Datacolor computerized tinting lab that mixes custom Birla Opus shades in under 3 minutes with digital spectrophotometer accuracy.",
  },
  {
    num: "02",
    tag: "Site Logistics",
    question: "Can contractors order bulk PVC conduits and heavy fasteners for direct site delivery?",
    highlight: "50,000m Stock • Same-Day 35km Fleet Dispatch",
    answer:
      "Yes. Our Industrial Conduit & Fastener Depot in Perundurai (SIPCOT Phase II) stocks over 50,000 meters of ISI-certified rigid conduits and provides dedicated same-day fleet dispatch across a 35km radius in Erode district.",
  },
  {
    num: "03",
    tag: "Store Hours",
    question: "Which Akshara Paints branch is open on Sundays?",
    highlight: "Market Square: Open 7 Days • Flagship: Sun Mornings",
    answer:
      "Our Market Square Express Counter near the Central Clock Tower is open all 7 days a week from 9:00 AM to 9:00 PM. The Flagship Showroom on Bypass Road is open Sundays from 9:00 AM to 2:00 PM.",
  },
  {
    num: "04",
    tag: "Express Pickup",
    question: "Can I call ahead or WhatsApp to have materials packed before pickup?",
    highlight: "Advance Invoicing • Rapid Drive-Through Trunk Loading",
    answer:
      "Yes. You can phone or WhatsApp any of our 3 branches with your Birla Opus shade codes or conduit quantities. Our counter teams will invoice and package your order for quick trunk loading when you arrive.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: branchFaqList.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      {
        title:
          "3 Paint & Hardware Stores in Erode | Akshara Paints – Birla Opus Showrooms & Depots",
      },
      {
        name: "description",
        content:
          "Visit Akshara Paints & Hardware branches across Erode: Flagship Birla Opus Color Lab (Bypass Rd), Industrial Conduit Depot (Perundurai SIPCOT), & Market Square Express.",
      },
      {
        name: "keywords",
        content:
          "paint shops Erode, Birla Opus store Erode, hardware depot Perundurai, electrical conduit supplier Erode, paint dealer Bypass Road, Agraharam hardware, Akshara Paints branches",
      },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      {
        property: "og:title",
        content:
          "3 Paint & Hardware Stores in Erode | Akshara Paints – Birla Opus Showrooms & Depots",
      },
      {
        property: "og:description",
        content:
          "Find addresses, working hours, directions, and direct trade desk contacts for all Akshara branches in Erode.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://aksharapaints.in/branches" },
      { property: "og:image", content: "https://aksharapaints.in/branch-flagship.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "675" },
      { property: "og:image:alt", content: "Akshara Paints Flagship Birla Opus Studio & Showroom in Erode" },
      // Twitter / X Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "3 Paint & Hardware Stores in Erode | Akshara Paints" },
      {
        name: "twitter:description",
        content:
          "Official Birla Opus studio, industrial conduit logistics depot, and market retail counters across Erode.",
      },
      { name: "twitter:image", content: "https://aksharapaints.in/branch-flagship.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://aksharapaints.in/branches" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(multiLocationSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema),
      },
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
      "Full Architectural Color Wall & Swatch Gallery",
      "Contractor & Architect Consultation Lounge",
      "Paved Customer Parking & Rapid Trunk Loading"
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
      "Over 50,000m Rigid PVC Conduits in Stock",
      "Digital Weighment Scale for High-Tensile Bolts",
      "Heavy Truck & LCV Loading Bays with Crane",
      "Immediate GST B2B Invoicing & Credit Desk"
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
      "Ready-stock Interior & Exterior Paint Cans",
      "Fast Wall Touch-up, Putty & Waterproofing",
      "Electrical Wiring Accessories & Switchgear",
      "Walk-in Trade Tools & Premium Roller Brushes"
    ],
    mapUrl: "https://maps.google.com/?q=Akshara+Paints+Market+Square",
  },
];

function BranchesPage() {
  const [activeBranchId, setActiveBranchId] = useState<string>(branchList[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const activeBranch = branchList.find((b) => b.id === activeBranchId) || branchList[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col selection:bg-accent/20">
      <SiteHeader />

      {/* Hero Header */}
      <section className="relative pt-10 sm:pt-16 pb-5 sm:pb-14 px-3 sm:px-7 lg:px-10 border-b border-primary/10 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-[#FAF8F5]">
        <div className="absolute -right-24 -top-24 size-96 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />
        <div className="absolute left-10 top-1/2 size-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Centered Kicker */}
          <span className="text-[9px] sm:text-[0.74rem] font-bold uppercase tracking-[0.22em] text-accent block mb-1.5 sm:mb-3.5 select-none">
            &mdash; STRATEGIC ERODE NETWORK &amp; FACTORY LOGISTICS &mdash;
          </span>

          {/* Centered Serif Main Heading */}
          <h1 className="font-display font-serif text-2xl sm:text-5xl lg:text-6xl tracking-tight text-primary font-normal leading-tight mb-1.5 sm:mb-5">
            Our Store Locations &amp; Warehouses in Erode
          </h1>

          {/* Centered Subtitle Paragraph */}
          <p className="text-xs sm:text-sm md:text-[15px] text-muted-foreground tracking-wide leading-relaxed max-w-xl mx-auto">
            Visit our luxury Birla Opus studio, bulk conduit logistics depot, or central market counter across Erode.
          </p>

          {/* Centered Authority Badges (Hidden on mobile to eliminate clutter) */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-semibold text-muted-foreground select-none mt-6">
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
      <section className="py-6 sm:py-16 px-3 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full flex-1">
        <div className="text-center mb-5 sm:mb-9 max-w-xl mx-auto">
          <h2 className="font-display font-serif text-xl sm:text-3xl text-primary font-normal tracking-tight">
            Select a Branch
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
            Direct phone lines, Google Maps navigation, and WhatsApp trade desks for each hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch max-w-[1080px] mx-auto">
          {branchList.map((branch) => {
            const isSelected = activeBranchId === branch.id;
            const primaryPhone = branch.phone[0]?.replace(/\s+/g, "") || "919876543210";
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
              `Hello Akshara Paints & Hardware, I am inquiring with your ${branch.name}. Please share stock availability and directions.`
            )}`;

            return (
              <div
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`group relative flex flex-col rounded-2xl border bg-[#FAF8F5] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 shadow-sm"
                    : "border-[#E7E2D6] hover:border-primary/30"
                }`}
              >
                {/* Visual Header with Real Architectural Photograph */}
                <div className="relative h-32 sm:h-42 w-full overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                  {/* Bottom Image Overlay: Reviews & Type */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[10.5px] font-semibold">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span>{branch.rating}</span>
                      <span className="text-white/70 text-[10px]">({branch.reviewsCount})</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/80 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded">
                      {branch.type}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8C7A6B]">
                        {branch.badge}
                      </span>
                      <span className="text-[10.5px] sm:text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                        <Clock className="size-3" /> {branch.status.split("•")[0].trim()}
                      </span>
                    </div>

                    <h3 className="font-display font-serif text-base sm:text-[20px] font-normal text-primary tracking-tight leading-snug group-hover:text-paint-deep transition-colors">
                      {branch.name}
                    </h3>

                    {/* Essential Local SEO Info */}
                    <div className="mt-2.5 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs text-muted-foreground border-t border-stone-200/80 pt-2.5 sm:pt-3">
                      {/* Address & Landmark */}
                      <div className="flex items-start gap-2">
                        <MapPin className="size-3.5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-foreground font-semibold text-[11.5px] sm:text-[12px] leading-snug">{branch.address}</p>
                          <p className="text-[10.5px] sm:text-[11px] text-stone-500 mt-0.5">
                            <span className="text-accent font-bold">Landmark:</span> {branch.landmark}
                          </p>
                        </div>
                      </div>

                      {/* Timings */}
                      <div className="flex items-start gap-2">
                        <Clock className="size-3.5 text-accent shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="text-foreground font-semibold text-[11px] sm:text-[11.5px] leading-snug">{branch.timing}</p>
                          <p className="text-[10.5px] text-stone-500">{branch.sundayTiming}</p>
                        </div>
                      </div>

                      {/* Direct Phone Numbers */}
                      <div className="flex items-start gap-2">
                        <Phone className="size-3.5 text-accent shrink-0 mt-0.5" />
                        <div className="flex flex-wrap gap-x-2.5 text-[11px] sm:text-[11.5px]">
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
                  </div>

                  {/* Clean 3-Button Action Bar: Call, Directions & WhatsApp */}
                  <div className="pt-2.5 sm:pt-3 mt-3 sm:mt-4 border-t border-stone-200/80 grid grid-cols-3 gap-1.5">
                    <a
                      href={`tel:${primaryPhone}`}
                      className="inline-flex items-center justify-center gap-1 h-8 sm:h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                    >
                      <Phone className="size-3 text-[#F05323]" />
                      <span>Call</span>
                    </a>
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1 h-8 sm:h-9 rounded-full bg-[#F05323] hover:bg-[#E04006] text-white text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                    >
                      <MapPin className="size-3" />
                      <span>Map</span>
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1 h-8 sm:h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Facilities & Amenities Matrix - Flipkart Style 2-in-a-Row on Mobile */}
      <section className="py-8 sm:py-16 px-3 sm:px-7 lg:px-10 bg-stone-100/70 border-t border-b border-primary/10">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-[9px] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-1.5 select-none">
              &mdash; THE AKSHARA NETWORK PROMISE &mdash;
            </span>
            <h2 className="font-display font-serif text-xl sm:text-4xl text-primary font-normal tracking-tight">
              Showroom &amp; Warehouse Amenities
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl mx-auto leading-relaxed">
              Every facility is customized to give builders, contractors, and homeowners the fastest, most reliable service in Erode.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            <div className="rounded-2xl border border-[#E7E2D6] bg-[#FAF8F5] p-3.5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="size-9 sm:size-12 rounded-xl sm:rounded-2xl bg-amber-100 text-amber-900 grid place-items-center mb-2.5 sm:mb-3">
                  <Palette className="size-4.5 sm:size-6" />
                </div>
                <h3 className="font-display font-bold text-xs sm:text-base text-primary leading-snug">Instant Color Tinting</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-snug sm:leading-relaxed">
                  Computerized Datacolor dispensers match and dispense custom Birla Opus shades in under 3 minutes.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E7E2D6] bg-[#FAF8F5] p-3.5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="size-9 sm:size-12 rounded-xl sm:rounded-2xl bg-sky-100 text-sky-900 grid place-items-center mb-2.5 sm:mb-3">
                  <Truck className="size-4.5 sm:size-6" />
                </div>
                <h3 className="font-display font-bold text-xs sm:text-base text-primary leading-snug">Site Dispatch Logistics</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-snug sm:leading-relaxed">
                  Dedicated fleet transporting 3m conduit bundles, bulk 20L paint pails, and fastener boxes directly to site gates.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E7E2D6] bg-[#FAF8F5] p-3.5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="size-9 sm:size-12 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-900 grid place-items-center mb-2.5 sm:mb-3">
                  <ShieldCheck className="size-4.5 sm:size-6" />
                </div>
                <h3 className="font-display font-bold text-xs sm:text-base text-primary leading-snug">Certified Quality</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-snug sm:leading-relaxed">
                  Authorized dealer certificates, authentic batch test reports, and ISI-certified electrical conduits.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E7E2D6] bg-[#FAF8F5] p-3.5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="size-9 sm:size-12 rounded-xl sm:rounded-2xl bg-stone-200 text-stone-900 grid place-items-center mb-2.5 sm:mb-3">
                  <Car className="size-4.5 sm:size-6" />
                </div>
                <h3 className="font-display font-bold text-xs sm:text-base text-primary leading-snug">Easy Access &amp; Parking</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-snug sm:leading-relaxed">
                  Spacious highway-front parking bays, wide gates, and covered loading ramps for quick vehicle trunk loading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Store & Services FAQ Section (Balanced Split 2-Column Layout) */}
      <section className="py-8 sm:py-18 px-3 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full border-t border-[#E7E2D6]/70">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start max-w-[1080px] mx-auto">
          
          {/* Left Column (5 Cols): Editorial Title, Context & Direct Support */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-3">
            <span className="text-[9px] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block select-none">
              &mdash; STORE &amp; SERVICES FAQS &mdash;
            </span>
            <h2 className="font-display font-serif text-xl sm:text-4xl text-primary font-normal tracking-tight leading-[1.15]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Everything you need to know about custom Birla Opus tinting, industrial fleet dispatch, and weekend store hours across Erode.
            </p>

            {/* Quick Helpline Box */}
            <div className="pt-2">
              <div className="rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white to-stone-50 p-4 sm:p-5 shadow-2xs space-y-2">
                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#8C7A6B] block">
                  TRADE COUNTER DESK
                </span>
                <p className="text-xs font-semibold text-primary">
                  Have a specific tint code or bulk inquiry?
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Call directly to speak with our technical tinting specialists or dispatch coordinators.
                </p>
                <div className="pt-1.5">
                  <a
                    href="tel:+919443722255"
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto h-9 px-4 rounded-full bg-[#F05323] hover:bg-[#E04006] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    <Phone className="size-3.5" />
                    <span>Call Central Desk: +91 94437 22255</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Compact Accordions (Zero Empty Horizontal Desert) */}
          <div className="lg:col-span-7 space-y-3">
            {branchFaqList.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-primary/40 bg-white shadow-xs ring-1 ring-primary/10"
                      : "border-[#E7E2D6] bg-white hover:border-primary/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left py-4 px-4.5 sm:px-5 flex items-start justify-between gap-3 cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1 min-w-0 pr-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-accent select-none">
                          {faq.num}
                        </span>
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          {faq.tag}
                        </span>
                      </div>
                      <h3 className="font-display font-serif text-[15px] sm:text-[16px] font-normal text-primary group-hover:text-paint-deep transition-colors leading-snug pt-0.5">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`size-7 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all duration-300 ${
                        isOpen
                          ? "bg-primary text-white shadow-xs"
                          : "bg-stone-100 text-stone-500 group-hover:bg-accent group-hover:text-white"
                      }`}
                    >
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4.5 sm:px-5 pb-4 pt-0 border-t border-stone-100 mt-1 pt-3">
                      <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 bg-[#FAF8F5] border border-stone-200/80 px-3 py-1 rounded-full text-[11px] font-semibold text-stone-700">
                        <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>{faq.highlight}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
