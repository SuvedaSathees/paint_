import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Truck,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Building2,
  Palette,
  Layers,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Project Inquiries | Akshara Paints & Hardware" },
      {
        name: "description",
        content:
          "Contact Akshara Paints & Hardware in Erode for certified Birla Opus paint orders, computerized shade matching, electrical conduit piping, and fast job-site delivery.",
      },
      { property: "og:title", content: "Contact & Project Inquiries | Akshara Paints & Hardware" },
      {
        property: "og:description",
        content:
          "Speak directly with our paint chemists and hardware engineers. Showrooms, phone helplines, WhatsApp desks, and BOQ estimation.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  {
    q: "Are you an official authorized dealer for Birla Opus Paints?",
    a: "Yes, Akshara Paints & Hardware is an official, fully authorized Birla Opus Paints dealer in Erode. We operate in-house computerized spectrophotometer dispensers, provide original factory warranty certificates, and stock the entire color fan-deck catalog.",
  },
  {
    q: "Can you match an exact paint shade from a small physical sample?",
    a: "Yes. Bring any painted drywall chip, ceramic tile, fabric swatch, or competitor paint chip to our showroom. Our digital spectrophotometer measures the spectral curve and dispenses an exact 100% color match in under 3 minutes.",
  },
  {
    q: "Do you offer job-site delivery for heavy conduit pipes and bulk paint drums?",
    a: "Yes, we operate our own dedicated logistics vehicles equipped with pipe transport racks. We deliver 3m rigid PVC conduit bundles, 20L paint pails, and structural anchor bolts directly to job sites across Erode, Perundurai SIPCOT, and Bhavani.",
  },
  {
    q: "Do you provide credit terms and volume rebates for builders and contractors?",
    a: "Yes, we offer structured B2B commercial accounts for registered contractors, civil engineers, and interior designers with tiered volume rebates and consolidated monthly GST invoices.",
  },
];

const categories = [
  { id: "paints", label: "Birla Opus Paints", icon: Palette },
  { id: "pipes", label: "Electrical Conduits", icon: Zap },
  { id: "fasteners", label: "Bolts & Fasteners", icon: Layers },
  { id: "waterproofing", label: "Waterproofing", icon: ShieldCheck },
  { id: "bulk", label: "Contractor BOQ", icon: Building2 },
];

function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "paints",
    branch: "flagship",
    location: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between selection:bg-accent/20">
      <SiteHeader />

      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-2 select-none">
            &mdash; DIRECT CLIENT CONCIERGE &mdash;
          </span>
          <h1 className="font-display font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-normal tracking-tight">
            Contact &amp; Project Inquiries
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Speak directly with our paint chemists, electrical conduit specialists, and hardware engineers. Same-day site estimates and computerized shade tinting in Erode.
          </p>

          {/* Quick Connect Floating Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-semibold text-stone-700 select-none">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 bg-white border border-stone-200/90 rounded-full px-4 py-1.5 shadow-2xs hover:border-primary transition-colors cursor-pointer"
            >
              <Phone className="size-3.5 text-accent" />
              <span>+91 98765 43210</span>
            </a>

            <a
              href="https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20I%20am%20inquiring%20about%20materials%20and%20color%20tinting"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-stone-200/90 rounded-full px-4 py-1.5 shadow-2xs hover:border-emerald-600 transition-colors cursor-pointer text-emerald-800"
            >
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
              </span>
              <span>WhatsApp Desk (Live)</span>
            </a>

            <span className="inline-flex items-center gap-2 bg-white border border-stone-200/90 rounded-full px-4 py-1.5 shadow-2xs text-stone-600">
              <MapPin className="size-3.5 text-primary" />
              <span>Perundurai Rd &bull; Bypass Rd, Erode</span>
            </span>
          </div>
        </div>

        {/* Main 2-Column Showcase: Showroom Desks (Left) + Bespoke Quote Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (5 Cols): Showrooms, WhatsApp Card & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showrooms & Physical Hubs Card */}
            <div className="rounded-3xl border border-[#E2DBD0] bg-white p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <Building2 className="size-4 text-accent" /> Showrooms &amp; Trade Desks
                </span>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10.5px] font-bold px-2.5 py-0.5">
                  Open Today
                </span>
              </div>

              {/* Branch 1: Flagship */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-stone-900 font-bold text-sm">
                    Flagship Showroom &amp; Color Lab
                  </strong>
                  <a
                    href="https://maps.google.com/?q=Akshara+Paints+and+Hardware"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
                  >
                    <span>Directions</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Plot 42, Akshara Commercial Complex, Highway Bypass Road, Opp. Collectorate Ring, Erode - 638002
                </p>
                <div className="pt-1 flex items-center gap-3 text-xs text-stone-700 font-medium">
                  <a href="tel:+919876543210" className="hover:text-accent font-bold">
                    +91 98765 43210
                  </a>
                  <span className="text-stone-300">&bull;</span>
                  <span className="text-stone-500">Retail &bull; Tinting Lab</span>
                </div>
              </div>

              {/* Branch 2: Industrial Depot */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-stone-900 font-bold text-sm">
                    Industrial Conduit &amp; Hardware Depot
                  </strong>
                  <a
                    href="https://maps.google.com/?q=Akshara+Industrial+Hardware+Depot"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
                  >
                    <span>Directions</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Shed 18-B, SIPCOT Industrial Phase II, Perundurai Road, Near Transport Terminal, Erode - 638052
                </p>
                <div className="pt-1 flex items-center gap-3 text-xs text-stone-700 font-medium">
                  <a href="tel:+919876543212" className="hover:text-accent font-bold">
                    +91 98765 43212
                  </a>
                  <span className="text-stone-300">&bull;</span>
                  <span className="text-stone-500">Heavy Conduits &bull; Logistics Dock</span>
                </div>
              </div>

              {/* Operating Hours Strip */}
              <div className="flex items-center gap-2.5 pt-1 text-xs text-stone-600">
                <Clock className="size-4 text-accent shrink-0" />
                <span>Mon – Sat: 7:30 AM – 9:00 PM &bull; Sun: 8:00 AM – 2:00 PM</span>
              </div>
            </div>

            {/* Instant WhatsApp Concierge Card */}
            <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-stone-50 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-emerald-600 text-white grid place-items-center shrink-0 shadow-xs">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Prefer Instant WhatsApp?
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Send wall photos, blueprint takeoffs, or paint shade codes.
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Our in-store technical team reviews your list and responds with exact paint tin counts, conduit diameters, and discounted trade quotes within 15 minutes.
              </p>

              <Button
                asChild
                className="w-full justify-center rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs cursor-pointer h-10"
              >
                <a
                  href="https://wa.me/919876543210?text=Hello%20Akshara%20Paints%20%26%20Hardware,%20I%20would%20like%20to%20request%20a%20quote%20for%20my%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp Desk</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </Button>
            </div>

            {/* Trade & Service Guarantees */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-stone-200/80 bg-white p-3 shadow-2xs">
                <Zap className="size-4 text-accent mx-auto mb-1.5" />
                <span className="block text-xs font-bold text-stone-900">&lt;2h Response</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">Itemized Quotes</span>
              </div>
              <div className="rounded-2xl border border-stone-200/80 bg-white p-3 shadow-2xs">
                <Truck className="size-4 text-primary mx-auto mb-1.5" />
                <span className="block text-xs font-bold text-stone-900">Site Fleet</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">Same-Day Dispatch</span>
              </div>
              <div className="rounded-2xl border border-stone-200/80 bg-white p-3 shadow-2xs">
                <ShieldCheck className="size-4 text-emerald-600 mx-auto mb-1.5" />
                <span className="block text-xs font-bold text-stone-900">100% Genuine</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">Birla Opus Sealed</span>
              </div>
            </div>

          </div>

          {/* Right Column (7 Cols): Elegant Interactive Project Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E2DBD0] bg-white p-6 sm:p-8 lg:p-9 shadow-sm">
              <div className="mb-6 pb-4 border-b border-stone-100 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-display font-serif text-2xl sm:text-3xl text-primary font-normal tracking-tight">
                    Request a Project Trade Quote
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Complimentary technical advice, computerized shade recipes, and itemized contractor pricing.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  100% FREE BOQ
                </span>
              </div>

              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto grid place-items-center shadow-xs">
                    <CheckCircle2 className="size-9" />
                  </div>
                  <h3 className="font-display font-serif text-2xl font-normal text-primary">
                    Inquiry Received Successfully!
                  </h3>
                  <div className="max-w-md mx-auto space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <p>
                      Thank you, <strong className="text-primary font-bold">{formData.name}</strong>. Inquiry Reference:{" "}
                      <span className="font-mono font-bold text-accent">#AK-{Math.floor(1000 + Math.random() * 9000)}</span>.
                    </p>
                    <p>
                      Our technical sales advisor will call <strong className="text-primary font-bold">{formData.phone}</strong> with stock availability and trade pricing within 2 hours.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          category: "paints",
                          branch: "flagship",
                          location: "",
                          message: "",
                        });
                      }}
                      className="rounded-full cursor-pointer px-5"
                    >
                      Submit Another Inquiry
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="rounded-full bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer shadow-xs px-5"
                    >
                      <a
                        href={`https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(
                          formData.category
                        )}%20under%20the%20name%20${encodeURIComponent(formData.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2"
                      >
                        <span>Ping Live Desk on WhatsApp</span>
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Category Selection Pills */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Select Requirement Category *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = formData.category === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, category: cat.id })}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                              isSelected
                                ? "bg-primary text-white border-primary shadow-xs"
                                : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300"
                            }`}
                          >
                            <Icon className={`size-3.5 ${isSelected ? "text-accent" : "text-stone-500"}`} />
                            <span>{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Sundaram"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Preferred Hub */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ramesh@example.com"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Preferred Branch Hub
                      </label>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                      >
                        <option value="flagship">Flagship Showroom (Bypass Road)</option>
                        <option value="depot">Industrial Depot (Perundurai Road)</option>
                        <option value="delivery">Direct Site Dispatch (Across Erode)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Site Location */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Site Location / Project Area in Erode
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Perundurai SIPCOT, Bhavani Road, Kollampalayam"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                    />
                  </div>

                  {/* Row 4: Material Quantities & Project Details */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Material Quantities &amp; Project Specifications *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify approximate wall area (sq.ft), desired Birla Opus finishes (Satin Silk / Velvet Matte), conduit pipe gauges (20mm / 25mm), anchor bolt diameters, or required delivery timeframe..."
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all leading-relaxed"
                    />
                  </div>

                  <Button
                    variant="hero"
                    size="default"
                    type="submit"
                    className="w-full justify-center cursor-pointer rounded-full py-3.5 text-sm font-bold shadow-md hover:scale-[1.01] transition-transform"
                  >
                    <span>Submit Project Inquiry &amp; Request Trade Quote</span>
                    <ArrowRight className="size-4 ml-2" />
                  </Button>

                  <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1.5">
                    <span>🔒 Official commercial billing. Your details are strictly used by our technical sales engineers.</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Dedicated Frequently Asked Questions Section */}
        <section className="mt-16 sm:mt-20 pt-12 border-t border-[#E8E2D7]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-2 select-none">
              &mdash; CLEAR ANSWERS &mdash;
            </span>
            <h2 className="font-display font-serif text-2xl sm:text-3xl text-primary font-normal tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Common inquiries regarding computerized shade tinting, job-site conduit transport, and contractor credit terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 p-5 ${
                    isOpen
                      ? "border-primary/40 bg-white shadow-sm ring-1 ring-primary/10"
                      : "border-stone-200/90 bg-white/70 hover:bg-white hover:border-stone-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-start justify-between text-left gap-3 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-stone-900 leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`size-4 text-stone-400 shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="text-xs text-stone-600 leading-relaxed mt-3 pt-3 border-t border-stone-100">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
