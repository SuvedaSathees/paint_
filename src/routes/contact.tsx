import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import {
  Phone,
  MapPin,
  PackageCheck,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Truck,
  RotateCcw,
} from "lucide-react";

// ── LocalBusiness JSON-LD Schema ──────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  name: "Akshara Paints & Hardware",
  description:
    "Official Birla Opus dealer in Erode offering computerized shade tinting, PVC conduit pipes, bolts & nuts, waterproofing products, and bulk contractor delivery across Erode district.",
  url: "https://aksharapaints.in/contact",
  telephone: "+919443722255",
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
  sameAs: ["https://wa.me/919443722255"],
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
          "Contact Akshara Paints & Hardware – Erode's official Birla Opus dealer. Instant WhatsApp, Call Desk, live stock checks, and quick quote inquiries.",
      },
      {
        name: "keywords",
        content:
          "Akshara Paints Erode, Birla Opus dealer Erode, paint shop Erode, PVC conduit Erode, hardware store Erode, contact paint store",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Contact Akshara Paints & Hardware | Erode" },
      {
        property: "og:description",
        content:
          "Quick WhatsApp, direct phone call, live stock check, or Google Maps directions to Akshara Paints & Hardware in Erode.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://aksharapaints.in/contact" },
    ],
    links: [{ rel: "canonical", href: "https://aksharapaints.in/contact" }],
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
    phone: "+91 94437 22255",
    timing: "Mon – Sat: 8:30 AM – 8:30 PM • Sun: 9:00 AM – 2:00 PM",
    features: ["Computerized Tinting Lab", "Color Fan Decks", "Ample Customer Parking"],
    mapUrl: "https://maps.google.com/?q=Akshara+Paints+and+Hardware+Erode",
  },
  {
    id: "depot",
    name: "Industrial Conduit & Hardware Depot",
    badge: "Wholesale & Logistics Yard",
    address: "Shed 18-B, SIPCOT Industrial Phase II, Logistics Hub Road, Perundurai, Erode - 638052",
    phone: "+91 94437 22255",
    timing: "Mon – Sat: 8:00 AM – 7:30 PM • Sun: Site Deliveries Only",
    features: ["50,000m PVC Conduits in Stock", "Digital Weighment Scale", "Heavy Truck Bay"],
    mapUrl: "https://maps.google.com/?q=Akshara+Industrial+Hardware+Depot+Erode",
  },
  {
    id: "express",
    name: "Market Square Retail Express Outlet",
    badge: "City Center Quick Counter",
    address: "Shop 7 & 8, Old Market Square, Near Central Clock Tower, Agraharam, Erode - 638001",
    phone: "+91 94437 22255",
    timing: "Mon – Sun: 9:00 AM – 9:00 PM (Open All 7 Days)",
    features: ["Ready-Stock 1L & 4L Cans", "Fast Touch-Up Counter", "Electrician Supplies"],
    mapUrl: "https://maps.google.com/?q=Akshara+Paints+Market+Square+Erode",
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
    note: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setSubmitted(true);
  };

  const getWhatsAppPrefillUrl = () => {
    const text = encodeURIComponent(
      `Hello Akshara Paints,\n\nI submitted an inquiry:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Category: ${selectedCategory}${
        formData.note ? `\n• Note: ${formData.note}` : ""
      }`
    );
    return `https://wa.me/919443722255?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between selection:bg-accent/20">
      {/* ── Top Navigation Bar ────────────────────────────────────────── */}
      <SiteHeader />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Contact Akshara Paints &amp; Hardware Erode</h1>

      {/* ================================================================ */}
      {/* 1. MOBILE-ONLY VIEW (< md): Compact Single-Page Layout          */}
      {/* ================================================================ */}
      <div className="block md:hidden pt-14 pb-24 px-3.5 max-w-lg mx-auto w-full my-auto flex-1 flex flex-col justify-center">
        {/* Header Intro */}
        <div className="text-center mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F05323] block mb-1 select-none">
            — WE ARE READY TO HELP YOU —
          </span>
          <h2 className="font-serif text-2xl text-stone-900 font-normal tracking-tight">
            Contact &amp; Quick Enquiry
          </h2>
          <p className="text-xs text-stone-600 mt-0.5 line-clamp-1">
            Official Birla Opus Dealer • Computerized Tinting • Site Dispatch Erode
          </p>
        </div>

        {/* Single-Line 4-Action Row */}
        <div className="grid grid-cols-4 gap-1.5 mb-3.5">
          {/* WhatsApp */}
          <a
            href="https://wa.me/919443722255?text=Hello%20Akshara%20Paints,%20I%20would%20like%20to%20inquire%20about%20paints%20and%20materials."
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white hover:bg-emerald-50/70 border border-emerald-200/80 shadow-2xs transition-all text-center cursor-pointer active:scale-95"
          >
            <div className="size-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
              <WhatsAppIcon className="size-4" />
            </div>
            <span className="text-[11px] font-bold text-stone-900 leading-tight">
              WhatsApp
            </span>
          </a>

          {/* Call */}
          <a
            href="tel:+919443722255"
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white hover:bg-orange-50/70 border border-orange-200/80 shadow-2xs transition-all text-center cursor-pointer active:scale-95"
          >
            <div className="size-8 rounded-full bg-orange-100 text-[#F05323] flex items-center justify-center mb-1">
              <Phone className="size-3.5" />
            </div>
            <span className="text-[11px] font-bold text-stone-900 leading-tight">
              Call Desk
            </span>
          </a>

          {/* Stock */}
          <a
            href="https://wa.me/919443722255?text=Hello%20Akshara%20Paints,%20please%20check%20stock%20availability%20for:"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white hover:bg-amber-50/70 border border-amber-200/80 shadow-2xs transition-all text-center cursor-pointer active:scale-95"
          >
            <div className="size-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-1">
              <PackageCheck className="size-3.5" />
            </div>
            <span className="text-[11px] font-bold text-stone-900 leading-tight">
              Stock
            </span>
          </a>

          {/* Direction */}
          <a
            href="https://maps.google.com/?q=Akshara+Paints+and+Hardware+Erode"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white hover:bg-sky-50/70 border border-sky-200/80 shadow-2xs transition-all text-center cursor-pointer active:scale-95"
          >
            <div className="size-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mb-1">
              <MapPin className="size-3.5" />
            </div>
            <span className="text-[11px] font-bold text-stone-900 leading-tight">
              Direction
            </span>
          </a>
        </div>

        {/* Central Card: Send a Quick Enquiry */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm">
          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="size-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="size-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-stone-900 font-normal">
                  Enquiry Received!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1 leading-relaxed">
                  Thank you, <strong className="text-stone-900">{formData.name}</strong>. We will call or WhatsApp you at{" "}
                  <strong className="text-stone-900">{formData.phone}</strong> shortly.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={getWhatsAppPrefillUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xs"
                >
                  <WhatsAppIcon className="size-4" />
                  <span>Chat on WhatsApp Now</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", phone: "", note: "" });
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-stone-600 text-xs font-semibold px-4 py-2 rounded-full border border-stone-200"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Send Another</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div>
                  <h3 className="font-serif text-base text-stone-900 font-normal">
                    Send a Quick Enquiry
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Get pricing, color advice, or stock confirmation in minutes.
                  </p>
                </div>
              </div>

              {/* Requirement Selector */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1.5">
                  I need:
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`py-1 px-3 rounded-full text-[11px] font-semibold transition-all cursor-pointer border whitespace-nowrap shrink-0 ${
                          isSelected
                            ? "bg-stone-900 text-white border-stone-900 shadow-2xs"
                            : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full h-9 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#F05323]/20 focus:border-[#F05323] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="e.g. 94437 22255"
                    className="w-full h-9 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#F05323]/20 focus:border-[#F05323] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Note / Quantity (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                    placeholder="e.g. Need Birla Opus estimate or 20mm conduits"
                    className="w-full h-9 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#F05323]/20 focus:border-[#F05323] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full justify-center rounded-xl bg-[#F05323] hover:bg-[#e04006] text-white text-xs font-bold h-10 shadow-xs cursor-pointer"
              >
                <span>Submit Quick Enquiry</span>
                <ArrowRight className="size-3.5 ml-1.5" />
              </Button>
            </form>
          )}
        </div>

        {/* Compact Location Line */}
        <div className="mt-3 text-center">
          <div className="inline-flex items-center justify-center gap-1.5 text-[11px] text-stone-600 bg-white/70 border border-stone-200/60 rounded-xl px-3 py-1.5 shadow-2xs">
            <MapPin className="size-3 text-[#F05323]" />
            <span>Plot 42, Highway Bypass Rd, Opp. Collectorate Ring, Erode</span>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. DESKTOP WEBSITE VIEW (md+): Previous Comprehensive Experience */}
      {/* ================================================================ */}
      <main className="hidden md:block pt-16 pb-14 px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1 space-y-8">
        {/* Header Intro */}
        <div className="text-center max-w-2xl mx-auto pt-2">
          <span className="text-[0.74rem] font-bold uppercase tracking-[0.22em] text-[#F05323] block mb-1 select-none">
            — WE ARE READY TO HELP YOU —
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
            Contact Akshara Paints &amp; Hardware
          </h2>
          <p className="text-sm text-stone-600 mt-1 leading-relaxed">
            Official Birla Opus Dealer • Computerized Tinting • Site Dispatch Across Erode
          </p>
        </div>

        {/* 2-Column Section: 3 Stores (Left) & Form (Right) */}
        <div className="grid grid-cols-12 gap-5 items-start max-w-6xl mx-auto pt-2">
          {/* Left Column (5 Cols): 3 Store Locations */}
          <div className="col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-stone-900 font-normal">
                Our 3 Store Hubs in Erode
              </h3>
              <a
                href="/branches"
                className="text-xs font-bold text-[#F05323] hover:underline inline-flex items-center gap-0.5"
              >
                <span>Details &rarr;</span>
              </a>
            </div>

            <div className="space-y-2.5">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C7A6B] block">
                        {store.badge}
                      </span>
                      <h4 className="text-stone-900 font-bold text-sm leading-tight mt-0.5">
                        {store.name}
                      </h4>
                    </div>
                    <a
                      href={store.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-[11px] font-bold text-stone-700 hover:text-[#F05323] inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-full"
                    >
                      <MapPin className="size-3 text-[#F05323]" />
                      <span>Map</span>
                    </a>
                  </div>

                  <p className="text-[11.5px] text-stone-600 leading-snug">
                    {store.address}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2 text-xs font-medium">
                    <a
                      href={`tel:${store.phone.replace(/\s+/g, "")}`}
                      className="text-stone-900 hover:text-[#F05323] font-bold inline-flex items-center gap-1 text-[11.5px]"
                    >
                      <Phone className="size-3 text-[#F05323]" />
                      <span>{store.phone}</span>
                    </a>
                    <span className="text-stone-500 text-[10.5px]">
                      {store.timing.split("•")[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (7 Cols): Inquiry Form */}
          <div className="col-span-7">
            <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs space-y-3.5">
              <div>
                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#8C7A6B] block mb-0.5">
                  EASY 1-MINUTE FORM
                </span>
                <h3 className="font-serif text-2xl text-stone-900 font-normal tracking-tight">
                  Send a Quick Inquiry
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Tell us what you need and our technical team will call or WhatsApp you within 2 hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="size-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h4 className="font-serif text-xl text-stone-900">
                    Message Received!
                  </h4>
                  <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-stone-900">{formData.name}</strong>. We will contact <strong className="text-stone-900">{formData.phone}</strong> shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", note: "" });
                    }}
                    className="rounded-full px-5 text-xs cursor-pointer"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Step 1: Category Chips */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-800 mb-1.5">
                      1. What do you need?
                    </label>
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                      {categories.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`py-1 px-3 rounded-full text-[11px] font-semibold transition-all cursor-pointer border whitespace-nowrap shrink-0 ${
                              isSelected
                                ? "bg-stone-900 text-white border-stone-900 shadow-2xs"
                                : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Name & Phone */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh"
                        className="w-full h-9 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#F05323]/20 focus:border-[#F05323] focus:bg-white transition-all"
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
                        placeholder="e.g. 94437 22255"
                        className="w-full h-9 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#F05323]/20 focus:border-[#F05323] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Step 3: Short Message */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Project Note / Quantity (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="e.g. Need paint estimate for 2BHK, or 100m PVC conduit pipes."
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#F05323]/20 focus:border-[#F05323] focus:bg-white transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full justify-center rounded-full bg-[#F05323] hover:bg-[#e04006] text-white text-xs font-bold h-10 shadow-xs cursor-pointer transition-all active:scale-95"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight className="size-3.5 ml-1.5" />
                  </Button>
                </form>
              )}

              {/* Quick Trust Badges */}
              <div className="pt-2.5 border-t border-stone-100 flex items-center justify-around text-center text-[10.5px] text-stone-500">
                <span className="flex items-center gap-1">
                  <Zap className="size-3 text-[#F05323]" /> Fast Callback
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Truck className="size-3 text-stone-700" /> Site Dispatch
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="size-3 text-emerald-600" /> Authorized Dealer
                </span>
              </div>
            </div>
          </div>

          {/* Row 2 Left (5 Cols): Direct WhatsApp Quick Card */}
          <div className="col-span-5 h-full">
            <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/70 via-white to-stone-50/60 p-5 shadow-2xs hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-100/90 text-emerald-800 border border-emerald-200/80 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Instant Desk Active</span>
                  </div>
                  <span className="text-[10.5px] text-stone-500 font-medium">
                    Replies in ~5 mins
                  </span>
                </div>

                <h4 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                  Prefer Direct WhatsApp?
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Skip the form and connect directly with our technical showroom team for instant support.
                </p>

                {/* Helpful prompt chips */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  <span className="inline-flex items-center rounded-lg bg-white/90 border border-emerald-200/70 px-2.5 py-1 text-[11px] font-medium text-stone-700 shadow-2xs">
                    📸 Room Wall Photos
                  </span>
                  <span className="inline-flex items-center rounded-lg bg-white/90 border border-emerald-200/70 px-2.5 py-1 text-[11px] font-medium text-stone-700 shadow-2xs">
                    📋 Contractor BOQ
                  </span>
                  <span className="inline-flex items-center rounded-lg bg-white/90 border border-emerald-200/70 px-2.5 py-1 text-[11px] font-medium text-stone-700 shadow-2xs">
                    🎨 Shade Tinting Inquiry
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-emerald-100/80">
                <Button
                  asChild
                  className="w-full justify-center rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs h-10 cursor-pointer shadow-[0_4px_14px_rgba(37,211,102,0.28)] transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <a
                    href="https://wa.me/919443722255?text=Hello%20Akshara%20Paints%20%26%20Hardware,%20I%20would%20like%20to%20request%20a%20quote%20for%20my%20project."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="size-4 shrink-0 fill-white" />
                    <span>Chat on WhatsApp (+91 94437 22255)</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Row 2 Right (7 Cols): Google Maps Embed & Location Details */}
          <div className="col-span-7 h-full">
            <div className="rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all h-full flex flex-col sm:flex-row items-stretch gap-4">
              <div className="flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center gap-1.5 text-[#F05323] mb-1">
                    <MapPin className="size-3.5 shrink-0" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D97706]">
                      Live Showroom Location
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                    Flagship Showroom &amp; Color Lab
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    Plot 42, Highway Bypass Rd, Opp. Collectorate Ring, Erode – 638002
                  </p>
                  <div className="mt-2 text-[11px] text-stone-500 font-medium">
                    <span className="text-stone-700 font-semibold">Timings:</span> Mon – Sat: 8:30 AM – 8:30 PM
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <a
                    href="https://maps.google.com/?q=Akshara+Paints+and+Hardware+Erode"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold px-3.5 py-1.5 transition-all shadow-2xs"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="size-3" />
                  </a>
                  <span className="text-[10.5px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    Customer Parking Available
                  </span>
                </div>
              </div>

              <div className="w-full sm:w-[280px] lg:w-[310px] h-[170px] sm:h-auto min-h-[170px] rounded-xl overflow-hidden border border-stone-200/90 shadow-inner shrink-0 relative">
                <iframe
                  title="Akshara Paints & Hardware – Erode Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.0!2d77.7272!3d11.3424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDIwJzMyLjYiTiA3N8KwNDMnMzguMCJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="w-full h-full object-cover"
                  style={{ border: 0, minHeight: "170px" }}
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
