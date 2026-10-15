import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { MAIN_BRANCH, STORE_EMAIL, STORE_PHONE, whatsappLink } from "@/lib/store-info";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  ArrowRight,
  Navigation,
  CheckCircle2,
  MessageSquareText,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NEEDS = [
  "Paints & colours",
  "Electrical pipes & fittings",
  "Bolts, nuts & fasteners",
  "Building materials",
  "Bulk order for a site",
  "Something else",
];

// ── LocalBusiness JSON-LD Schema ──────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  name: "Akshara Paints & Hardware",
  description:
    "Official Birla Opus dealer in Erode offering computerized shade tinting, PVC conduit pipes, bolts & nuts, waterproofing products, and bulk contractor delivery across Erode district.",
  url: "https://aksharapaints.in/contact",
  telephone: STORE_PHONE.tel,
  email: STORE_EMAIL,
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
  hasMap: MAIN_BRANCH.mapUrl,
  sameAs: [`https://wa.me/${STORE_PHONE.whatsapp}`],
  brand: { "@type": "Brand", name: "Birla Opus" },
  areaServed: { "@type": "City", name: "Erode" },
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Akshara Paints & Hardware | Birla Opus Dealer Erode" },
      {
        name: "description",
        content:
          "Call, WhatsApp or visit Akshara Paints & Hardware in Erode – official Birla Opus dealer for paints, electrical pipes, fasteners and building materials.",
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
        content: "Call, WhatsApp or get directions to Akshara Paints & Hardware in Erode.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://aksharapaints.in/contact" },
    ],
    links: [{ rel: "canonical", href: "https://aksharapaints.in/contact" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessSchema) }],
  }),
  component: ContactPage,
});

// ── Small building blocks ─────────────────────────────────────────────────────
const card = "rounded-2xl border border-stone-200/90 bg-white shadow-[0_1px_2px_rgba(14,40,56,0.04)]";
const inputClass =
  "w-full h-11 rounded-xl border border-stone-200 bg-white px-3.5 text-[15px] text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-[#F05323] focus:ring-4 focus:ring-[#F05323]/10";
const labelClass = "block text-sm font-medium text-stone-700 mb-1.5";

function ContactOption({
  href,
  external,
  icon,
  iconClass,
  label,
  value,
  hint,
}: {
  href: string;
  external?: boolean;
  icon: ReactNode;
  iconClass: string;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${card} group flex items-center gap-4 p-4 shortlg:py-3 transition hover:border-[#F05323]/40 hover:shadow-md`}
    >
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold uppercase tracking-wider text-stone-500">{label}</span>
        <span className="mt-0.5 block text-base font-semibold text-stone-900">{value}</span>
        <span className="mt-0.5 block text-[13px] text-stone-500 shortlg:hidden">{hint}</span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-stone-300 transition group-hover:translate-x-0.5 group-hover:text-[#F05323]" />
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", need: NEEDS[0], message: "" });
  const [sentLink, setSentLink] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    const text = [
      "Hello Akshara Paints,",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `I need: ${form.need}`,
      form.message.trim() ? `Message: ${form.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const link = whatsappLink(text);
    window.open(link, "_blank", "noopener,noreferrer");
    setSentLink(link);
  };

  return (
    <div className="min-h-[100dvh] lg:h-[100dvh] bg-[#FAF8F5] text-stone-900 flex flex-col">
      <SiteHeader />

      <main className="flex-1 lg:min-h-0 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-7 sm:pt-12 lg:pt-14 pb-8 sm:pb-10 lg:pb-6 shortlg:pt-10 shortlg:pb-4 flex flex-col">
        {/* Title */}
        <header className="text-center shrink-0">
          <p className="flex items-center justify-center gap-2.5 sm:gap-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#F05323] sm:text-xs sm:tracking-[0.22em]">
            <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
            Contact us
            <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
          </p>
          <h1 className="mt-1.5 sm:mt-1 font-serif text-[2rem] leading-tight sm:text-[2.6rem] shortlg:text-[2.1rem] text-stone-900">
            We&rsquo;re here to help
          </h1>
        </header>

        {/* 1. Three simple ways to reach us */}
        {/* Phones: two quick actions */}
        <section aria-label="Ways to contact us" className="mt-5 shrink-0 sm:hidden">
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${STORE_PHONE.tel}`}
              className={`${card} flex flex-col gap-2.5 rounded-[18px] p-3.5 transition active:scale-[0.98]`}
            >
              <span className="grid size-10 place-items-center rounded-xl bg-[#F05323] text-white shadow-sm">
                <Phone className="size-[18px]" />
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-stone-900">Call us</span>
                <span className="block text-[12px] text-stone-500">{STORE_PHONE.display}</span>
              </span>
            </a>
            <a
              href={whatsappLink("Hello Akshara Paints, I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`${card} flex flex-col gap-2.5 rounded-[18px] p-3.5 transition active:scale-[0.98]`}
            >
              <span className="grid size-10 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm">
                <MessageSquareText className="size-[18px]" />
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-stone-900">WhatsApp</span>
                <span className="block text-[12px] text-stone-500">Chat with us</span>
              </span>
            </a>
          </div>
        </section>

        <section aria-label="Ways to contact us" className="mt-5 shortlg:mt-3 hidden gap-3 sm:grid sm:grid-cols-3 shrink-0">
          <ContactOption
            href={`tel:${STORE_PHONE.tel}`}
            icon={<Phone className="size-5" />}
            iconClass="bg-orange-50 text-[#F05323]"
            label="Call us"
            value={STORE_PHONE.display}
            hint={`${MAIN_BRANCH.hours[0].days}, ${MAIN_BRANCH.hours[0].time}`}
          />
          <ContactOption
            href={whatsappLink("Hello Akshara Paints, I have a question.")}
            external
            icon={<MessageSquareText className="size-5" />}
            iconClass="bg-emerald-50 text-emerald-600"
            label="WhatsApp"
            value="Chat with us"
            hint="Send photos or your list"
          />
          <ContactOption
            href={MAIN_BRANCH.mapUrl}
            external
            icon={<MapPin className="size-5" />}
            iconClass="bg-sky-50 text-sky-700"
            label="Visit us"
            value={MAIN_BRANCH.area}
            hint="Open in Google Maps"
          />
        </section>

        {/* 2. Message form + main shop details */}
        <section className="mt-3 grid gap-3 lg:grid-cols-5 lg:flex-1 lg:min-h-0">
          {/* Form */}
          <div className={`${card} rounded-[20px] sm:rounded-2xl p-4 sm:p-6 lg:col-span-3 lg:min-h-0 flex flex-col`}>
            <h2 className="shrink-0 font-serif text-[22px] sm:text-2xl text-stone-900">Send us a message</h2>
            <p className="shrink-0 mt-1 text-[13.5px] sm:text-sm text-stone-500">
              <span className="sm:hidden">We’ll reply on WhatsApp during shop hours.</span>
              <span className="hidden sm:inline">Fill this in and WhatsApp will open with your message ready to send.</span>
            </p>

            {sentLink ? (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 text-center">
                <CheckCircle2 className="mx-auto size-8 text-emerald-600" />
                <p className="mt-2 font-semibold text-stone-900">WhatsApp is opening with your message</p>
                <p className="mt-1 text-sm text-stone-600">Just press send. We&rsquo;ll reply during shop hours.</p>
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <a
                    href={sentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white hover:bg-[#1fb957]"
                  >
                    Open WhatsApp again
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSentLink(null);
                      setForm({ name: "", phone: "", need: NEEDS[0], message: "" });
                    }}
                    className="inline-flex h-10 items-center rounded-full border border-stone-200 bg-white px-5 text-sm font-medium text-stone-700 hover:bg-stone-50"
                  >
                    Write a new message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex flex-1 min-h-0 flex-col gap-3">
                <div className="shrink-0 grid grid-cols-2 gap-3 lg:grid-cols-[1fr_1fr_1.6fr]">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ramesh"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>
                      Phone number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="tel"
                      required
                      minLength={10}
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Mobile number"
                      className={inputClass}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label htmlFor="contact-need" className={labelClass}>
                      What do you need?
                    </label>
                    <Select value={form.need} onValueChange={(need) => setForm({ ...form, need })}>
                      <SelectTrigger
                        id="contact-need"
                        className="h-11 rounded-xl border-stone-200 bg-white px-3.5 text-[15px] text-stone-900 shadow-none transition focus:border-[#F05323] focus:ring-4 focus:ring-[#F05323]/10 data-[state=open]:border-[#F05323] data-[state=open]:ring-4 data-[state=open]:ring-[#F05323]/10"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        sideOffset={4}
                        className="w-(--radix-select-trigger-width) rounded-xl border-stone-200 bg-white p-1 shadow-[0_8px_24px_rgba(14,40,56,0.10)]"
                      >
                        {NEEDS.map((label) => (
                          <SelectItem
                            key={label}
                            value={label}
                            className="cursor-pointer rounded-lg px-3 py-2 text-[15px] text-stone-700 focus:bg-stone-100 data-[state=checked]:font-medium data-[state=checked]:text-[#F05323] [&>span:first-child]:hidden"
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-1 min-h-0 flex-col">
                  <label htmlFor="contact-message" className={labelClass}>
                    Message <span className="font-normal text-stone-400">(optional)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="e.g. Paint for a 2BHK, or 100 m of 20 mm conduit pipe"
                    className={`${inputClass} h-auto min-h-[72px] shortlg:min-h-[56px] flex-1 py-2.5 resize-none leading-relaxed`}
                  />
                </div>

                <button
                  type="submit"
                  className="shrink-0 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#F05323] text-[15px] font-semibold text-white shadow-sm transition hover:bg-[#dd4615] active:scale-[0.99] cursor-pointer"
                >
                  Send on WhatsApp
                </button>
              </form>
            )}
          </div>

          {/* Main shop details */}
          <aside className={`${card} rounded-[20px] sm:rounded-2xl p-4 sm:p-6 lg:col-span-2 lg:min-h-0 flex flex-col`}>
            <h2 className="shrink-0 font-serif text-[22px] sm:text-2xl text-stone-900"><span className="sm:hidden">Visit our shop</span><span className="hidden sm:inline">Main shop</span></h2>
            <p className="shrink-0 mt-1 text-[13.5px] sm:text-sm font-medium text-stone-700">{MAIN_BRANCH.name}</p>

            <ul className="shrink-0 mt-3 space-y-2.5 rounded-xl bg-[#FAF8F5] p-3 text-[13.5px] sm:mt-4 sm:space-y-3 sm:rounded-none sm:bg-transparent sm:p-0 sm:text-[15px] shortlg:mt-3 shortlg:space-y-2 text-stone-700">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-[18px] shrink-0 text-[#F05323]" />
                <span>{MAIN_BRANCH.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-[18px] shrink-0 text-[#F05323]" />
                <dl className="w-full space-y-1">
                  {MAIN_BRANCH.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-3">
                      <dt className="text-stone-500">{h.days}</dt>
                      <dd className="text-right font-medium text-stone-800">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </li>
              <li className="flex gap-3 max-sm:hidden">
                <Phone className="mt-0.5 size-[18px] shrink-0 text-[#F05323]" />
                <a href={`tel:${STORE_PHONE.tel}`} className="font-medium text-stone-900 hover:text-[#F05323]">
                  {STORE_PHONE.display}
                </a>
              </li>
              <li className="flex gap-3 max-sm:hidden">
                <Mail className="mt-0.5 size-[18px] shrink-0 text-[#F05323]" />
                <a href={`mailto:${STORE_EMAIL}`} className="font-medium text-stone-900 hover:text-[#F05323] break-all">
                  {STORE_EMAIL}
                </a>
              </li>
            </ul>

            {/* Map fills the remaining space in the card */}
            <div className="mt-3 sm:mt-4 shortlg:mt-3 relative min-h-[170px] lg:min-h-[96px] shortlg:min-h-[40px] flex-1 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
              <iframe
                title={`Map showing ${MAIN_BRANCH.name}`}
                src={MAIN_BRANCH.mapEmbedUrl}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href={MAIN_BRANCH.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mt-3 sm:mt-4 shortlg:mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
            >
              <Navigation className="size-4" />
              Get directions
            </a>
          </aside>
        </section>

      </main>
    </div>
  );
}
