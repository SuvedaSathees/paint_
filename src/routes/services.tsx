import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Palette,
  Truck,
  Wrench,
  Droplets,
  FileSpreadsheet,
  Building2,
  CheckCircle2,
  ArrowRight,
  Clock,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Zap,
  Layers,
  Sparkles,
  HelpCircle,
} from "lucide-react";

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

type ServiceCategory = "all" | "color" | "logistics" | "structural";

interface ServiceItem {
  id: string;
  category: "color" | "logistics" | "structural";
  icon: typeof Palette;
  iconBg: string;
  tag: string;
  badge: string;
  title: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  capabilities: string[];
  ctaLabel: string;
  serviceCode: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "tinting",
    category: "color",
    icon: Palette,
    iconBg: "#FCE7DF",
    tag: "IN-STORE LAB",
    badge: "3-Min Mixing",
    title: "Computerized Birla Opus Color Tinting",
    image: "/product-paints.jpg",
    description:
      "State-of-the-art digital spectrophotometer color matching lab. Bring any paint flake, fabric swatch, or competitor code and receive identical formulation in under 3 minutes.",
    specs: [
      { label: "Accuracy", value: "99.8% Spectral" },
      { label: "Shade Deck", value: "2,200+ Colors" },
      { label: "Batch Refill", value: "Digital Archive" },
    ],
    capabilities: [
      "Precision computerized base-to-colorant dosing",
      "Over 2,200+ Birla Opus fan-deck shades supported",
      "Record keeping for repeatable batch refills across years",
      "200ml small sample trial cans available on demand",
    ],
    ctaLabel: "Book Color Trial",
    serviceCode: "tinting",
  },
  {
    id: "waterproofing",
    category: "logistics",
    icon: Droplets,
    iconBg: "#D8EFE4",
    tag: "TECHNICAL AUDIT",
    badge: "Non-Destructive",
    title: "Moisture & Waterproofing Site Assessment",
    image: "/product-waterproofing.jpg",
    description:
      "Diagnostic inspection for persistent dampness, efflorescence, salt leaching, and terrace cracks. We supply tailored polymer-modified and crystalline waterproofing systems.",
    specs: [
      { label: "Sensors", value: "Pin-less RF Meter" },
      { label: "Depth", value: "Up to 40mm" },
      { label: "Report", value: "Within 24 Hours" },
    ],
    capabilities: [
      "Digital pin-less moisture meter wall diagnostics",
      "Terrace and parapet thermal crack evaluation",
      "Negative-side basement waterproofing recommendations",
      "Complete material schedule with step-by-step application SOPs",
    ],
    ctaLabel: "Schedule Dampness Audit",
    serviceCode: "waterproofing",
  },
  {
    id: "delivery",
    category: "logistics",
    icon: Truck,
    iconBg: "#E0F2FE",
    tag: "FLEET LOGISTICS",
    badge: "Same-Day Fleet",
    title: "Scheduled Job-Site Material Delivery",
    image: "/product-pipes.jpg",
    description:
      "Never stop site progress waiting for materials. We deliver heavy 3-meter electrical conduit bundles, bulk 20-litre paint drums, and sacks of fasteners directly to your project gate.",
    specs: [
      { label: "Dispatch", value: "Morning 8:00 AM" },
      { label: "Radius", value: "35km Around Erode" },
      { label: "Payload", value: "Up to 3.5 Tons" },
    ],
    capabilities: [
      "Same-day dispatch for local contractor accounts",
      "Careful handling with dedicated pipe racks & drum restraints",
      "Scheduled morning drop-offs before contractor shifts begin",
      "Full delivery verification and itemized gate passes",
    ],
    ctaLabel: "Request Site Delivery",
    serviceCode: "delivery",
  },
  {
    id: "fasteners",
    category: "structural",
    icon: Wrench,
    iconBg: "#F3EDE2",
    tag: "WORKSHOP SERVICE",
    badge: "Grade 8.8 / 10.9",
    title: "Fastener Customization & Structural Sizing",
    image: "/product-bolts.jpg",
    description:
      "Specialized cold and hot-dip galvanizing, stud cutting, and batch sorting for structural steel erectors, HVAC installers, and machinery builders.",
    specs: [
      { label: "Steel Grade", value: "8.8, 10.9 & SS304" },
      { label: "Thread Cut", value: "M6 to M36 Sizing" },
      { label: "Coating", value: "HDG & Zinc Yellow" },
    ],
    capabilities: [
      "Grade 8.8 and 10.9 high-tensile certified stock",
      "Custom threaded rod cutting to non-standard lengths",
      "Anchor bolt assemblies with pre-torqued nylon insert lock nuts",
      "Certificate of conformance and mill test reports available",
    ],
    ctaLabel: "Order Custom Sizing",
    serviceCode: "fasteners",
  },
  {
    id: "estimation",
    category: "color",
    icon: FileSpreadsheet,
    iconBg: "#FEF0D4",
    tag: "PROJECT PLANNING",
    badge: "Zero-Waste Math",
    title: "Contractor BOQ & Material Estimation",
    image: "/product-hardware.jpg",
    description:
      "Submit your architectural blueprints or electrical layout drawings. Our technical team calculates accurate paint coverage square footage, primer literage, and conduit pipe quantities.",
    specs: [
      { label: "Turnaround", value: "4 to 6 Hours" },
      { label: "Output", value: "Excel & PDF BOQ" },
      { label: "Fee", value: "100% Free Service" },
    ],
    capabilities: [
      "Zero-waste material optimization algorithms",
      "Side-by-side Birla Opus finish tier comparisons",
      "Combined invoice optimization for paints + electrical + hardware",
      "Tiered volume rebate structures for builders",
    ],
    ctaLabel: "Submit BOQ for Estimate",
    serviceCode: "estimation",
  },
  {
    id: "contractors",
    category: "structural",
    icon: Building2,
    iconBg: "#E5DEFA",
    tag: "VERIFIED NETWORK",
    badge: "Vetted Applicators",
    title: "Turnkey Painting Contractor Recommendations",
    image: "/product-building.jpg",
    description:
      "Need skilled painters who understand Birla Opus surface primers, putty leveling, and airless spraying? We connect you with verified, vetted master applicators.",
    specs: [
      { label: "Network", value: "30+ Vetted Teams" },
      { label: "Experience", value: "5+ Years Track" },
      { label: "Standard", value: "Airless Spray Certified" },
    ],
    capabilities: [
      "Trained in modern roller and airless spray equipment",
      "Strict timeline adherence and post-paint clean-up standards",
      "Transparent per-sq-ft labor estimates",
      "Direct oversight and technical check-ins by Akshara team",
    ],
    ctaLabel: "Hire a Vetted Applicator",
    serviceCode: "contractors",
  },
];

const steps = [
  {
    num: "01",
    turnaround: "Immediate",
    title: "Consultation & Scope",
    desc: "Call our helpline, share your project blueprint, or walk into our showroom. Our technical engineers review paint literage, electrical specs, and structural requirements.",
  },
  {
    num: "02",
    turnaround: "Under 15 Mins",
    title: "Tinting & Spec Matching",
    desc: "Our computerized lab tints exact Birla Opus shades, pulls required fastener batches, and verifies compatibility under natural and indoor lighting.",
  },
  {
    num: "03",
    turnaround: "Same-Day Dispatch",
    title: "Logistics & Site Dispatch",
    desc: "Heavy 20L paint pails, 3-meter conduit bundles, and hardware are carefully packaged onto dedicated transport trucks for direct delivery to your site gate.",
  },
  {
    num: "04",
    turnaround: "Project Duration",
    title: "Application & Oversight",
    desc: "Our technical specialists remain available throughout the project lifecycle to verify substrate moisture, check primer curing, and provide on-call support.",
  },
];

interface ServiceFaq {
  category: string;
  tag: string;
  q: string;
  a: string;
  keySpecs: string[];
  serviceCode: string;
  ctaText: string;
}

const faqs: ServiceFaq[] = [
  {
    category: "Computerized Paint Tinting",
    tag: "IN-STORE TINTING LAB · ERODE",
    q: "How fast is your computerized Birla Opus paint tinting service?",
    a: "Our in-store computerized spectrophotometer tinting lab at Akshara Paints (Erode) dispenses and tints custom shades in under 3 minutes per container with 99.8% spectral color accuracy (Delta-E < 0.5). Bring any physical paint flake, fabric swatch, or competitor shade card, and our computerized dispensers formulate an identical shade on the spot across all Birla Opus interior and exterior bases. Every custom shade formula is archived in our digital database with a permanent recipe code for seamless future batch refills.",
    keySpecs: [
      "Under 3 Minutes Per Container",
      "99.8% Spectral Accuracy (Delta-E < 0.5)",
      "2,200+ Birla Opus Fan-Deck Shades",
      "Permanent Digital Batch Archive",
    ],
    serviceCode: "tinting",
    ctaText: "Book a 3-Min Color Trial",
  },
  {
    category: "Job-Site Logistics & Fleet Transport",
    tag: "DEDICATED FLEET · 35KM RADIUS",
    q: "Do you deliver directly to job sites in and around Erode?",
    a: "Yes! Akshara Paints operates a dedicated commercial fleet equipped with specialized conduit pipe racks and heavy-drum securements to deliver 3-meter ISI:9537 electrical conduits, 20-litre bulk paint pails, and heavy fastener sacks directly to your project gate. We provide scheduled same-day morning dispatch (8:00 AM) across Erode town, Perundurai SIPCOT industrial corridor, Bhavani, Modakkurichi, Chithode, and surrounding project sites within a 35km radius, complete with itemized gate passes.",
    keySpecs: [
      "Scheduled Morning 8:00 AM Dispatch",
      "35km Radius Across Erode & Perundurai",
      "Conduit Racks for 3-Meter Pipes",
      "Direct Project Gate Delivery",
    ],
    serviceCode: "delivery",
    ctaText: "Request Job-Site Fleet Delivery",
  },
  {
    category: "Substrate Diagnostics & Waterproofing",
    tag: "TECHNICAL AUDIT · NON-DESTRUCTIVE",
    q: "Is the on-site moisture and dampness assessment free of charge?",
    a: "Yes, 100% complimentary. For building owners, architects, and civil contractors planning painting or waterproofing projects in Erode, our senior technical team conducts non-destructive site dampness audits using digital pin-less radio-frequency (RF) moisture meters and thermal crack inspections. We measure moisture penetration up to 40mm into plaster and concrete substrates to diagnose salt leaching, capillary action, and efflorescence before painting, supplying an itemized polymer or crystalline waterproofing specification within 24 hours.",
    keySpecs: [
      "100% Complimentary Technical Audit",
      "Digital Pin-Less RF Moisture Scanning",
      "Up to 40mm Substrate Depth Analysis",
      "24-Hour Comprehensive Material Report",
    ],
    serviceCode: "waterproofing",
    ctaText: "Schedule Free Dampness Audit",
  },
  {
    category: "Hardware Workshop & Fabrication",
    tag: "ENGINEERING WORKSHOP · GRADE 8.8 / 10.9",
    q: "Can you cut threaded rods and custom size anchor bolts?",
    a: "Yes. Our in-house hardware engineering workshop cuts Grade 8.8, 10.9 high-tensile carbon steel, and stainless steel (SS304/SS316) threaded rods from M6 to M36 diameters to non-standard millimeter lengths with chamfered, deburred thread entries for smooth nut engagement. We also manufacture and supply custom L-type and J-type foundation anchor bolt assemblies with pre-torqued nylon insert lock nuts, hot-dip galvanized (HDG) or yellow zinc passivation, and manufacturer mill test certificates (MTC) for structural steel erectors.",
    keySpecs: [
      "M6 to M36 Diameter Precision Sizing",
      "Grade 8.8, 10.9 & SS304 Stock",
      "Hot-Dip Galvanized (HDG) Options",
      "Mill Test Certificates (MTC) Included",
    ],
    serviceCode: "fasteners",
    ctaText: "Order Custom Fastener Sizing",
  },
  {
    category: "Contractor Accounts & Billing",
    tag: "COMMERCIAL DESK · CONSOLIDATED GST",
    q: "How do contractor credit accounts and combined billing work?",
    a: "Contractors, developers, and trade professionals can consolidate all building material purchases — decorative paints, electrical conduit piping, civil waterproofing chemicals, and structural fasteners — under a single monthly GST business account with Akshara. Benefits include priority same-day fleet dispatch, itemized site gate passes, zero-waste BOQ estimation takeoffs, and tiered volume rebates across all three Akshara branch warehouses in Erode.",
    keySpecs: [
      "Single Consolidated Monthly GST Invoice",
      "Tiered Volume Contractor Rebates",
      "Zero-Waste BOQ Takeoff Service",
      "Cross-Branch Pickup (3 Erode Warehouses)",
    ],
    serviceCode: "estimation",
    ctaText: "Open Contractor GST Account",
  },
];

function ServicesPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "tinting",
    projectType: "residential",
    notes: "",
  });

  const handleSelectServiceForBooking = (serviceCode: string) => {
    setFormData((prev) => ({ ...prev, serviceType: serviceCode }));
    const formElement = document.getElementById("book-service");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero Header Section - Centered Luxury Architectural Layout */}
      <section className="relative pt-12 sm:pt-14 pb-14 sm:pb-16 px-4 sm:px-7 lg:px-10 border-b border-primary/10 overflow-hidden bg-gradient-to-b from-stone-50/80 via-white to-background">
        <div className="absolute left-1/2 -top-28 -translate-x-1/2 size-[650px] rounded-full bg-radial from-accent/12 via-primary/5 to-transparent blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Centered Kicker matching luxury design language */}
          <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.26em] text-accent block mb-3.5 select-none">
            &mdash; EXPERT CRAFTSMANSHIP &amp; CONTRACTOR SERVICES &mdash;
          </span>

          {/* Centered Serif Main Heading */}
          <h1 className="font-display font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-primary font-normal leading-[1.12] mb-4 sm:mb-5">
            Professional Services
          </h1>

          {/* Centered Subtitle Paragraph */}
          <p className="text-xs sm:text-sm md:text-[15px] text-muted-foreground tracking-wide leading-relaxed max-w-3xl lg:max-w-4xl mx-auto">
            From 3-minute computerized Birla Opus shade dispensing and non-destructive dampness audits
            <br className="hidden md:inline" />{" "}
            to custom fastener sizing and scheduled job-site logistics &mdash; we back every project with master technical precision.
          </p>

          {/* Centered Authority Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-semibold text-muted-foreground select-none">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="size-3.5 text-accent" /> 3-Min Computerized Lab Dosing
            </span>
            <span className="hidden sm:inline opacity-40">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-600" /> Pin-Less Moisture Audits
            </span>
            <span className="hidden sm:inline opacity-40">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-3.5 text-primary" /> Same-Day Fleet Dispatch
            </span>
            <span className="hidden sm:inline opacity-40">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <FileSpreadsheet className="size-3.5 text-accent" /> Zero-Waste BOQ Takeoffs
            </span>
          </div>
        </div>
      </section>

      {/* 6 Core Services Showcase - Luxury Architectural Cards */}
      <section className="py-10 sm:py-14 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {servicesData.map((srv) => {
            return (
              <div
                key={srv.id}
                className="group relative flex flex-col justify-between rounded-[28px] sm:rounded-[32px] border border-[#E7E2D6] bg-[#FAF8F5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Visual Header with Image & Floating Badges (Height reduced by 20px) */}
                <div className="relative h-[156px] sm:h-[172px] w-full overflow-hidden bg-stone-100">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary shadow-xs">
                      {srv.tag}
                    </span>
                    <span className="rounded-full bg-accent/95 backdrop-blur-xs px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-xs">
                      {srv.badge}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl sm:text-[22px] font-bold text-primary tracking-tight leading-snug group-hover:text-paint-deep transition-colors">
                      {srv.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Technical Metric Specs Grid */}
                    <div className="mt-4 grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-white/80 border border-stone-200/80">
                      {srv.specs.map((sp, idx) => (
                        <div key={idx} className="text-center">
                          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                            {sp.label}
                          </p>
                          <p className="text-xs font-semibold text-primary mt-0.5 truncate">
                            {sp.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Capability Checklist */}
                    <div className="mt-5 space-y-2 border-t border-stone-200/70 pt-4">
                      <p className="text-[0.68rem] font-bold uppercase tracking-wider text-primary">
                        Included Deliverables:
                      </p>
                      {srv.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground/85 leading-relaxed">
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Row */}
                  <div className="mt-6 pt-4 border-t border-stone-200/80">
                    <Button
                      variant="hero"
                      size="sm"
                      onClick={() => handleSelectServiceForBooking(srv.serviceCode)}
                      className="w-full rounded-full text-xs font-semibold cursor-pointer shadow-xs justify-center"
                    >
                      <span>{srv.ctaLabel}</span>
                      <ArrowRight className="size-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Akshara Technical Advantage - Architectural Pillars */}
      <section className="py-14 sm:py-16 px-4 sm:px-7 lg:px-10 bg-stone-100/70 border-t border-b border-primary/10">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-2 select-none">
              &mdash; THE CONTRACTOR DIFFERENCE &mdash;
            </span>
            <h2 className="font-display font-serif text-3xl sm:text-4xl text-primary font-normal tracking-tight">
              The Akshara Technical Advantage
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Why builders, interior architects, and engineering contractors make Akshara their primary procurement partner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Computerized Spectrophotometer",
                desc: "Sub-0.5 Delta-E spectral color accuracy eliminates shade differences between multiple batches and expansion wings.",
              },
              {
                icon: Truck,
                title: "Dedicated Logistics Fleet",
                desc: "Custom flatbed and covered transport vehicles ensure 3m conduits and 20L paint pails arrive without bending or spills.",
              },
              {
                icon: ShieldCheck,
                title: "Direct Factory Authorisation",
                desc: "Authorized dealer for Birla Opus, Finolex, and certified fastener manufacturers ensuring genuine warranties.",
              },
              {
                icon: Layers,
                title: "Consolidated Contractor Accounts",
                desc: "A single monthly GST invoice for paints, civil chemicals, electrical conduits, and industrial hardware supplies.",
              },
            ].map((adv, idx) => {
              const AdvIcon = adv.icon;
              return (
                <div
                  key={idx}
                  className="rounded-[24px] border border-[#E7E2D6] bg-[#FAF8F5] p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="size-11 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4">
                      <AdvIcon className="size-5" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-primary mb-2">
                      {adv.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Simple 4-Step Process Section */}
      <section className="py-14 sm:py-18 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-2 select-none">
            &mdash; OUR WORKFLOW &mdash;
          </span>
          <h2 className="font-display font-serif text-3xl sm:text-4xl text-primary font-normal tracking-tight">
            Simple 4-Step Fulfillment Process
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            How we take your material needs from initial blueprint review to scheduled on-site delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st) => (
            <div
              key={st.num}
              className="relative rounded-[26px] border border-[#E7E2D6] bg-[#FAF8F5] p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-accent">
                    {st.num}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary">
                    {st.turnaround}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions Accordion - Schema.org FAQPage SEO Structured Data */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-7 lg:px-10 bg-gradient-to-b from-stone-50/70 via-white to-stone-50/50 border-t border-stone-200/80 relative overflow-hidden"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        {/* SEO JSON-LD Structured Data for Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              name: "Akshara Paints & Hardware Professional Services FAQ",
              description:
                "Frequently asked questions regarding computerized Birla Opus paint tinting, job-site delivery across Erode, complimentary dampness audits, and custom fastener sizing.",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />

        <div className="mx-auto max-w-4xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-2.5 select-none">
              &mdash; CONTRACTOR &amp; PROPERTY OWNER KNOWLEDGE BASE &mdash;
            </span>
            <h2 className="font-display font-serif text-3xl sm:text-4xl text-primary font-normal tracking-tight">
              Service Questions &amp; Answers
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Direct technical guidance on computerized Birla Opus tinting speeds, job-site delivery radius across Erode, complimentary dampness diagnostics, and custom bolt fabrication.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3.5">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="rounded-2xl border border-[#E7E2D6] bg-white px-5 sm:px-6 shadow-xs hover:border-primary/30 transition-all duration-200"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline py-4.5 gap-3 cursor-pointer group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-left">
                    <span className="inline-flex items-center self-start text-[9.5px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20 shrink-0">
                      {faq.tag}
                    </span>
                    <span
                      itemProp="name"
                      className="font-display text-sm sm:text-[15.5px] font-bold text-primary group-hover:text-accent transition-colors"
                    >
                      {faq.q}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent
                  className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed pb-5 pt-1 border-t border-stone-100 mt-1"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text" className="space-y-3.5">
                    <p className="text-stone-700 leading-relaxed font-normal">
                      {faq.a}
                    </p>

                    {/* SEO Technical Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {faq.keySpecs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-1.5 border border-stone-200/60 text-[11px] font-medium text-stone-800"
                        >
                          <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Link to Booking / Inquiry Desk */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100">
                      <span className="text-[11px] text-stone-500 font-mono">
                        Service Category: <strong className="text-primary">{faq.category}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectServiceForBooking(faq.serviceCode)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-[#C2410C] transition-colors cursor-pointer"
                      >
                        <span>{faq.ctaText}</span>
                        <ArrowRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* SEO Local Support Card */}
          <div className="mt-8 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                <Sparkles className="size-3 text-accent" /> Need Project-Specific Technical Specs in Erode?
              </span>
              <p className="text-xs text-muted-foreground max-w-xl">
                Our senior technical team reviews architectural blueprints, verifies paint coverage math, and coordinates scheduled job-site logistics daily across Erode, Perundurai SIPCOT, and Bhavani.
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href="https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20I%20have%20a%20technical%20service%20question%20regarding%20my%20project%20in%20Erode"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold shadow-xs transition-all hover:scale-105"
              >
                <MessageSquare className="size-3.5" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Booking & Contractor VIP Desk */}
      <section id="book-service" className="py-16 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center rounded-[32px] sm:rounded-[36px] border border-primary/15 bg-gradient-to-br from-card via-[#FAF8F5] to-secondary/30 p-7 sm:p-12 shadow-xl">
          {/* Left Column: Direct Contractor VIP Desk */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block">
              DIRECT TECHNICAL ASSISTANCE
            </span>
            <h2 className="font-display font-serif text-3xl sm:text-4xl text-primary font-normal tracking-tight leading-tight">
              Book a Site Inspection or Material Consultation
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Have questions regarding wall dampness, paint coverage math, conduit diameters, or structural anchor bolt sizing? Fill out the quick request and an Akshara senior technical specialist will assist you.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
                <div className="size-10 rounded-xl bg-accent/15 grid place-items-center text-accent shrink-0">
                  <PhoneCall className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Direct Contractor Helpline</p>
                  <a href="tel:+919876543210" className="text-sm font-bold text-primary hover:text-accent">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
                <div className="size-10 rounded-xl bg-emerald-100 grid place-items-center text-emerald-600 shrink-0">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Instant WhatsApp Desk</p>
                  <a
                    href="https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20I%20need%20assistance%20with%20contractor%20services"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-emerald-700 hover:underline"
                  >
                    Chat Directly with Technical Lead
                  </a>
                </div>
              </div>
            </div>

            {/* Contractor Benefits */}
            <div className="space-y-2 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-accent shrink-0" />
                <span>Rapid response under 2 business hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Zero obligation, 100% free BOQ estimates</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary shrink-0" />
                <span>Two branch hubs in Erode ready for immediate pickup &amp; fleet dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 rounded-[28px] bg-white p-6 sm:p-9 border border-stone-200/90 shadow-lg">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto grid place-items-center shadow-xs">
                  <CheckCircle2 className="size-10" />
                </div>
                <h3 className="font-display font-serif text-2xl font-normal text-primary">
                  Service Request Received!
                </h3>
                <div className="max-w-md mx-auto space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <p>
                    Thank you, <strong className="text-primary">{formData.name}</strong>. Your inquiry has been registered under ticket reference{" "}
                    <span className="font-mono font-bold text-accent">#AK-SRV-{Math.floor(1000 + Math.random() * 9000)}</span>.
                  </p>
                  <p>
                    Our service specialist will reach out to you at <strong className="text-primary">{formData.phone}</strong> within 2 hours.
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
                        serviceType: "tinting",
                        projectType: "residential",
                        notes: "",
                      });
                    }}
                    className="rounded-full cursor-pointer"
                  >
                    Book Another Service
                  </Button>
                  <Button
                    variant="hero"
                    size="sm"
                    asChild
                    className="rounded-full cursor-pointer"
                  >
                    <a
                      href={`https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20I%20just%20submitted%20a%20service%20booking%20for%20${encodeURIComponent(
                        formData.serviceType
                      )}%20under%20the%20name%20${encodeURIComponent(formData.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <MessageSquare className="size-4" />
                      <span>Ping on WhatsApp</span>
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                    >
                      <option value="tinting">Computerized Birla Opus Color Tinting</option>
                      <option value="waterproofing">Moisture &amp; Waterproofing Site Audit</option>
                      <option value="delivery">Scheduled Job-Site Material Delivery</option>
                      <option value="fasteners">Fastener Customization &amp; Sizing</option>
                      <option value="estimation">Contractor BOQ &amp; Material Estimation</option>
                      <option value="contractors">Turnkey Painter Recommendations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                    >
                      <option value="residential">Residential Home / Villa</option>
                      <option value="commercial">Commercial Building / Office</option>
                      <option value="industrial">Industrial Factory / Warehouse</option>
                      <option value="renovation">Interior Renovation</option>
                      <option value="contractor">Contractor Bulk Procurement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                    Project Location / Specific Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Provide site location (e.g. Perundurai Road, Erode), approximate room area, or required shade codes..."
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                  />
                </div>

                <Button
                  variant="hero"
                  size="default"
                  type="submit"
                  className="w-full justify-center cursor-pointer rounded-xl py-3 text-sm font-semibold shadow-md"
                >
                  <span>Submit Service Consultation Request</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>

                <p className="text-[11px] text-center text-muted-foreground">
                  🔒 We respect your privacy. Your information is only used by Akshara technical specialists to coordinate your service.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
