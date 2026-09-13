import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MapPin,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Truck,
  CheckCircle2,
} from "lucide-react";

// ── LocalBusiness JSON-LD Schema ──────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  name: "Akshara Paints & Hardware",
  description:
    "Official Birla Opus dealer in Erode offering computerized shade tinting, PVC conduit pipes, bolts & nuts, waterproofing products, and bulk contractor delivery across Erode district.",
  url: "https://aksharapaints.in/contact",
  telephone: "+919876543210",
  email: "info@aksharapaints.in",
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Card",
  openingHours: ["Mo-Sa 08:30-20:30", "Su 09:00-14:00"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 42, Highway Bypass Road, Opp. Collectorate Ring",
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
  hasMap: "https://maps.google.com/?q=Akshara+Paints+and+Hardware+Erode",
  sameAs: [
    "https://wa.me/919876543210",
  ],
  brand: {
    "@type": "Brand",
    name: "Birla Opus",
  },
  areaServed: {
    "@type": "City",
    name: "Erode",
  },
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Akshara Paints & Hardware | Birla Opus Dealer Erode" },
      {
        name: "description",
        content:
          "Contact Akshara Paints & Hardware – Erode's official Birla Opus dealer. Get shade tinting, PVC conduit pipes, bolts, waterproofing, and bulk site delivery. Call or WhatsApp us today.",
      },
      {
        name: "keywords",
        content:
          "Akshara Paints Erode, Birla Opus dealer Erode, paint shop Erode, PVC conduit Erode, hardware store Erode, waterproofing Erode, contractor materials Erode",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Contact Akshara Paints & Hardware | Birla Opus Dealer Erode" },
      {
        property: "og:description",
        content:
          "Call, WhatsApp, or visit our 3 store locations across Erode. Birla Opus certified paints, conduit pipes & more.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://aksharapaints.in/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://aksharapaints.in/contact" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema),
      },
    ],
  }),
  component: ContactPage,
});

const stores = [
  {
    id: "flagship",
    name: "Flagship Showroom & Color Lab",
    badge: "Official Birla Opus Studio",
    address: "Plot 42, Highway Bypass Road, Opp. Collectorate Ring, Erode - 638002",
    phone: "+91 98765 43210",
    timing: "Mon – Sat: 8:30 AM – 8:30 PM • Sun: 9:00 AM – 2:00 PM",
    features: ["Computerized Tinting Lab", "Color Fan Decks", "Ample Customer Parking"],
    mapUrl: "https://maps.google.com/?q=Akshara+Paints+and+Hardware",
  },
  {
    id: "depot",
    name: "Industrial Conduit & Hardware Depot",
    badge: "Wholesale & Logistics Yard",
    address: "Shed 18-B, SIPCOT Industrial Phase II, Logistics Hub Road, Perundurai, Erode - 638052",
    phone: "+91 98765 43212",
    timing: "Mon – Sat: 8:00 AM – 7:30 PM • Sun: Site Deliveries Only",
    features: ["50,000m PVC Conduits in Stock", "Digital Weighment Scale", "Heavy Truck Bay"],
    mapUrl: "https://maps.google.com/?q=Akshara+Industrial+Hardware+Depot",
  },
  {
    id: "express",
    name: "Market Square Retail Express Outlet",
    badge: "City Center Quick Counter",
    address: "Shop 7 & 8, Old Market Square, Near Central Clock Tower, Agraharam, Erode - 638001",
    phone: "+91 98765 43214",
    timing: "Mon – Sun: 9:00 AM – 9:00 PM (Open All 7 Days)",
    features: ["Ready-Stock 1L & 4L Cans", "Fast Touch-Up Counter", "Electrician Supplies"],
    mapUrl: "https://maps.google.com/?q=Akshara+Paints+Market+Square",
  },
];

const categories = [
  "Birla Paints",
  "PVC Conduits",
  "Bolts & Nuts",
  "Waterproofing",
  "Contractor BOQ",
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Birla Paints");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    branch: "flagship",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col selection:bg-accent/20">
      {/* ── Top Navigation Bar ────────────────────────────────────────── */}
      <SiteHeader />

      {/* ── Main 2-Column Content Section ─────────────────────────────── */}
      <main className="pt-14 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Hidden H1 for SEO crawlers */}
        <h1 className="sr-only">Contact Akshara Paints &amp; Hardware – Official Birla Opus Dealer in Erode</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          
          {/* ── Left Column (5 Cols): 3 Store Locations ── */}
          <div className="lg:col-span-5 space-y-3.5">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal">
                  Our Stores &amp; Depots
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Walk in for live tinting or call your nearest hub.
                </p>
              </div>
              <a
                href="/branches"
                className="text-xs font-bold text-stone-900 hover:text-[#F05323] inline-flex items-center gap-1 group"
              >
                <span>View Branches</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Store 1, 2, 3 Cards */}
            <div className="space-y-3">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs hover:shadow-sm transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-[#8C7A6B] block">
                        {store.badge}
                      </span>
                      <h3 className="text-stone-900 font-bold text-sm sm:text-[15px] leading-tight mt-0.5">
                        {store.name}
                      </h3>
                    </div>
                    <a
                      href={store.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-xs font-semibold text-stone-800 hover:text-[#F05323] inline-flex items-center gap-1 bg-stone-50 border border-stone-200 px-2.5 py-0.5 rounded-full hover:bg-stone-100 transition-colors"
                    >
                      <span>Map</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {store.address}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {store.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10.5px] bg-[#FAF8F5] border border-stone-200 text-stone-700 px-2 py-0.5 rounded-full"
                      >
                        &bull; {feat}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
                    <a
                      href={`tel:${store.phone.replace(/\s+/g, "")}`}
                      className="text-stone-900 hover:text-[#F05323] font-bold inline-flex items-center gap-1"
                    >
                      <Phone className="size-3 text-[#F05323]" />
                      <span>{store.phone}</span>
                    </a>
                    <span className="text-stone-500 text-[11px]">
                      {store.timing.split("•")[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right Column (7 Cols): Complete Inquiry / Quote Form ── */}
          <div className="lg:col-span-7">
            <div className="rounded-[28px] border border-stone-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
              
              <div className="pb-3 border-b border-stone-100">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8C7A6B] block mb-0.5">
                  PROJECT TRADE ESTIMATION
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal tracking-tight">
                  Send Us a Message / Request a Quote
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Complimentary shade recipes, conduit bundle takeoffs, and contractor wholesale pricing in Erode.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="size-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900">
                    Message Received Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-stone-900">{formData.name}</strong>. Our technical team will review your specifications and contact <strong className="text-stone-900">{formData.phone}</strong> within 2 hours.
                  </p>
                  <div className="pt-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          location: "",
                          branch: "flagship",
                          message: "",
                        });
                      }}
                      className="rounded-full px-6 cursor-pointer"
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                  
                  {/* Category Selection Chips */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                      Select Material Requirement *
                    </label>
                    <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
                      {categories.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`py-1.5 px-1 sm:px-1.5 rounded-lg text-[10.5px] sm:text-xs font-semibold transition-all cursor-pointer border text-center whitespace-nowrap ${
                              isSelected
                                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                                : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Sundaram"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Preferred Hub */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ramesh@company.com"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Preferred Branch Hub
                      </label>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all"
                      >
                        <option value="flagship">Flagship Showroom (Bypass Rd)</option>
                        <option value="depot">Industrial Depot (Perundurai Rd)</option>
                        <option value="express">Market Square Express (Clock Tower)</option>
                        <option value="delivery">Direct Site Dispatch Across Erode</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Site Area in Erode */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Project Site Location in Erode
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Perundurai SIPCOT, Bhavani Road, Kollampalayam"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Row 4: Specifications & Quantities */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Project Details / Materials Needed *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you need: wall area (sq.ft), Birla Opus finishes, conduit pipe gauges (20mm/25mm), anchor bolts, or delivery timeframe."
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full justify-center rounded-full bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold py-3 shadow-md cursor-pointer transition-all hover:scale-[1.005]"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="size-3.5 ml-2" />
                  </Button>
                </form>
              )}

              {/* Guarantees Row */}
              <div className="pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-xs text-stone-600">
                <div className="flex flex-col items-center gap-0.5">
                  <Zap className="size-3.5 text-[#F05323]" />
                  <span className="font-bold text-stone-900 text-[11px] sm:text-xs">&lt;2h Callback</span>
                  <span className="text-[9.5px] text-stone-500">Fast Technical Sales</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Truck className="size-3.5 text-stone-900" />
                  <span className="font-bold text-stone-900 text-[11px] sm:text-xs">Same-Day Fleet</span>
                  <span className="text-[9.5px] text-stone-500">35km Erode Logistics</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <ShieldCheck className="size-3.5 text-emerald-600" />
                  <span className="font-bold text-stone-900 text-[11px] sm:text-xs">100% Genuine</span>
                  <span className="text-[9.5px] text-stone-500">Birla Opus Sealed</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── Row 2 Left (5 Cols): Direct WhatsApp Quick Card ── */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-stone-50 p-4 sm:p-5 shadow-sm space-y-3 h-full flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-stone-900 text-sm">
                  Prefer Direct WhatsApp?
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Send wall photos, blueprint takeoffs, or paint shade codes.
                </p>
              </div>
              <Button
                asChild
                className="w-full justify-center rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-xs h-10 cursor-pointer shadow-[0_2px_10px_rgba(37,211,102,0.3)] transition-all hover:scale-[1.01]"
              >
                <a
                  href="https://wa.me/919876543210?text=Hello%20Akshara%20Paints%20%26%20Hardware,%20I%20would%20like%20to%20request%20a%20quote%20for%20my%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center text-center"
                >
                  <span>Chat on WhatsApp (+91 98765 43210)</span>
                </a>
              </Button>
            </div>
          </div>

          {/* ── Row 2 Right (7 Cols): Google Maps Embed & Location Details ── */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-sm h-full flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 space-y-1.5 px-1 sm:px-2 w-full">
                <div className="flex items-center gap-1.5 text-[#F05323]">
                  <MapPin className="size-3.5" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500">
                    Live GPS Location
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm">
                  Flagship Showroom &amp; Color Lab
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Plot 42, Highway Bypass Rd, Opp. Collectorate Ring, Erode – 638002
                </p>
                <a
                  href="https://maps.google.com/?q=Akshara+Paints+and+Hardware+Erode"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-stone-900 hover:text-[#F05323] inline-flex items-center gap-1 pt-0.5 group"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="size-3 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
              <div className="w-full sm:w-[260px] h-[115px] rounded-xl overflow-hidden border border-stone-200 shrink-0">
                <iframe
                  title="Akshara Paints & Hardware – Erode Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.0!2d77.7272!3d11.3424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDIwJzMyLjYiTiA3N8KwNDMnMzguMCJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
