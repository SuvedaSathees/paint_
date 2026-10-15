import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { MovablePaintRibbon } from "./movable-paint-ribbon";
import { BrandMark } from "./site-header";
import { MAIN_BRANCH, STORE_EMAIL, STORE_PHONE, whatsappLink } from "@/lib/store-info";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Visualizer", href: "/visualizer" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Blog & Guides", href: "/blog" },
  { label: "Branches", href: "/branches" },
  { label: "Contact Us", href: "/contact" },
];

const PRODUCT_LINES = [
  "Birla Opus paints",
  "Conduit pipes & fittings",
  "Bolts, nuts & fasteners",
  "Building materials",
  "Waterproofing & primers",
];

const headingClass = "text-xs font-bold uppercase tracking-[0.18em] text-stone-900";

export function SiteFooter({ className }: { className?: string } = {}) {
  const whatsappUrl = whatsappLink(
    "Hello Akshara Paints & Hardware Erode, I am inquiring about Birla Opus paints and hardware supplies.",
  );

  return (
    <footer
      role="contentinfo"
      className={`relative w-full mt-8 sm:mt-[80px] overflow-hidden select-none ${className || ""}`}
    >
      {/* ── MOBILE FOOTER (< md) ── */}
      <div className="block md:hidden border-t border-stone-200/80 bg-[#FAF8F5] px-4 pt-4 pb-5 text-center">
        {/* Brand Logo & Wordmark */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 group select-none mb-1"
          aria-label="Akshara Paints & Hardware home"
        >
          <div className="size-7 rounded-full bg-[#0E2838] flex items-center justify-center text-white font-serif font-bold text-xs shadow-xs">
            A
          </div>
          <div className="leading-none text-left">
            <span className="block font-serif text-[14px] font-bold tracking-[0.14em] text-[#0E2838]">
              AKSHARA
            </span>
            <span className="mt-0.5 block text-[6px] font-extrabold tracking-[0.22em] text-stone-500 uppercase">
              PAINTS &amp; HARDWARE
            </span>
          </div>
        </Link>

        {/* 1-Line Description */}
        <p className="text-[10.5px] text-stone-600 font-medium max-w-xs mx-auto leading-tight mb-2.5">
          Authorized Birla Opus Paint Dealer &amp; Site Hardware &middot; Erode
        </p>

        {/* Quick Action Pills Row */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <a
            href={`tel:${STORE_PHONE.tel}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-800 px-3 py-1 text-[10.5px] font-semibold shadow-2xs transition-colors"
          >
            <Phone className="size-3 text-[#C9842C]" />
            <span>{STORE_PHONE.display}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0F5132] hover:bg-[#0A3D24] text-white px-3 py-1 text-[10.5px] font-semibold shadow-2xs transition-colors"
          >
            <WhatsAppIcon className="size-3" />
            <span>WhatsApp us</span>
          </a>
        </div>

        {/* Ultra-neat 1-Line Copyright */}
        <div className="pt-2 border-t border-stone-200/70 text-[9.5px] text-stone-400">
          © 2026 Akshara Paints &amp; Hardware, Erode. All rights reserved.
        </div>
      </div>

      {/* ── DESKTOP & TABLET FOOTER (≥ md) ── */}
      {/* Transparent at the top so the page colour runs into the curve, then fades into the footer colour behind it */}
      <div className="hidden md:block bg-[linear-gradient(to_bottom,transparent_0px,transparent_48px,var(--color-background)_170px)]">
        <MovablePaintRibbon />

        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14 pt-4 pb-12">
          <div
            className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.4fr_0.6fr_1fr_1.1fr] xl:gap-x-12"
            itemScope
            itemType="https://schema.org/HardwareStore"
          >
            <meta itemProp="name" content="Akshara Paints & Hardware" />

            {/* 1 ── Brand & quick contact */}
            <div className="col-span-2 lg:col-span-1">
              <BrandMark />
              <p className="mt-5 max-w-[22rem] text-sm leading-relaxed text-stone-600" itemProp="description">
                Authorised Birla Opus paint dealer and building-supplies store in Erode. Paints, conduits,
                fasteners and site materials under one roof.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={`tel:${STORE_PHONE.tel}`}
                  itemProp="telephone"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-stone-300 bg-white px-3.5 text-[13px] font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
                >
                  <Phone className="size-4 text-[#F05323]" aria-hidden="true" />
                  {STORE_PHONE.display}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Akshara Paints on WhatsApp"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1DAA61] px-3.5 text-[13px] font-semibold text-white transition hover:bg-[#178F51]"
                >
                  <WhatsAppIcon variant="inverted" className="size-[18px]" />
                  WhatsApp us
                </a>
              </div>
            </div>

            {/* 2 ── Site links */}
            <nav aria-label="Footer navigation">
              <h3 className={headingClass}>Explore</h3>
              <ul className="mt-5 space-y-3">
                {FOOTER_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-stone-600 transition-colors hover:text-[#F05323]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 3 ── Product lines */}
            <nav aria-label="Product categories">
              <h3 className={headingClass}>Products</h3>
              <ul className="mt-5 space-y-3">
                {PRODUCT_LINES.map((label) => (
                  <li key={label}>
                    <Link
                      to="/products"
                      className="text-sm text-stone-600 transition-colors hover:text-[#F05323]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 4 ── Flagship showroom */}
            <div className="col-span-2 lg:col-span-1">
              <h3 className={headingClass}>Visit our showroom</h3>
              <ul className="mt-5 space-y-3.5 text-sm text-stone-600">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[#F05323]" aria-hidden="true" />
                  <span itemProp="address">{MAIN_BRANCH.address}</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-[#F05323]" aria-hidden="true" />
                  <dl className="w-full max-w-[15rem] space-y-1">
                    {MAIN_BRANCH.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-3">
                        <dt className="whitespace-nowrap">{h.days}</dt>
                        <dd className="whitespace-nowrap font-medium text-stone-800">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                  <meta itemProp="openingHours" content={MAIN_BRANCH.openingHours.join(", ")} />
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-[#F05323]" aria-hidden="true" />
                  <a
                    href={`mailto:${STORE_EMAIL}`}
                    itemProp="email"
                    className="transition-colors hover:text-stone-900"
                  >
                    {STORE_EMAIL}
                  </a>
                </li>
              </ul>
              <a
                href={MAIN_BRANCH.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#F05323] transition-colors hover:text-[#dd4615]"
              >
                Get directions
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div className="w-full border-t border-stone-200/80">
          <p className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14 py-5 text-center text-[13px] text-stone-500">
            © 2026 Akshara Paints &amp; Hardware, Erode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
