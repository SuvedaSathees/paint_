import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";
import { MovablePaintRibbon } from "./movable-paint-ribbon";

// ── BESPOKE PRODUCT OUTLINE ICONS (Matching reference design 1:1) ──

/**
 * 1. Paint Bucket / Can with arched carry handle & rim
 */
function PaintBucketIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Bucket top rim */}
      <ellipse cx="12" cy="7" rx="7" ry="2.2" />
      {/* Tapered cylindrical bucket body with rounded base */}
      <path d="M5 7v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7" />
      {/* Arched carry handle */}
      <path d="M5 7C5 3.5 8.1 2.5 12 2.5C15.9 2.5 19 3.5 19 7" />
      {/* Clean horizontal label divider */}
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/**
 * 2. Electrical Conduit Pipes & Fittings (Symmetrical conduits with channel clamps)
 */
function ConduitPipesIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Upper conduit cylinder */}
      <rect x="2" y="5" width="20" height="5" rx="2" />
      <line x1="8" y1="4" x2="8" y2="11" />
      <line x1="16" y1="4" x2="16" y2="11" />
      {/* Lower conduit cylinder */}
      <rect x="2" y="14" width="20" height="5" rx="2" />
      <line x1="8" y1="13" x2="8" y2="20" />
      <line x1="16" y1="13" x2="16" y2="20" />
    </svg>
  );
}

/**
 * 3. High-Tensile Hex Bolt & Nut (6-sided regular hexagon with rounded vertices & central bore)
 */
function HexBoltNutIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 6-sided regular hexagon with rounded vertices */}
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      {/* Central threaded bore */}
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

/**
 * 4. Core Building & Structural Materials (Running bond masonry brick wall)
 */
function BricksWallIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M12 9v6" />
      <path d="M16 15v6" />
      <path d="M16 3v6" />
      <path d="M3 15h18" />
      <path d="M3 9h18" />
      <path d="M8 15v6" />
      <path d="M8 3v6" />
    </svg>
  );
}

/**
 * 5. Waterproofing & Wall Primers (Smooth organic water droplet)
 */
function WaterDropIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

/**
 * Official WhatsApp Brand Icon with vibrant green speech bubble and crisp white telephone handset
 */
function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.83.498 3.55 1.365 5.034L2.062 21.65a.502.502 0 0 0 .618.618l4.614-1.306A9.95 9.95 0 0 0 12.004 22c5.523 0 10.003-4.48 10.003-9.996C22.007 6.48 17.527 2 12.004 2z"
        fill="#25D366"
      />
      <path
        d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.2-.35.226-.651.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.787-1.677-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.629-.927-2.23-.244-.587-.493-.507-.677-.517-.175-.008-.376-.01-.576-.01s-.526.075-.802.376c-.276.301-1.053 1.028-1.053 2.508s1.078 2.909 1.228 3.109c.15.201 2.122 3.24 5.141 4.544 3.019 1.304 3.019.869 3.57.819.551-.05 1.78-.727 2.03-1.429.25-.702.25-1.304.175-1.429-.075-.125-.276-.201-.577-.351z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function SiteFooter({ className }: { className?: string } = {}) {
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    "Hello Akshara Paints & Hardware Erode, I am inquiring about Birla Opus paints and hardware supplies."
  )}`;

  return (
    <footer
      role="contentinfo"
      className={`relative w-full bg-background mt-8 sm:mt-[80px] overflow-hidden select-none ${className || ""}`}
    >
      {/* ── MOBILE ULTRA-SIMPLE & NEAT FOOTER (< md) ── */}
      {/* Takes ~20-25% of mobile screen, zero nav bars, highly polished */}
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
            href="tel:+919876543210"
            className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-800 px-3 py-1 text-[10.5px] font-semibold shadow-2xs transition-colors"
          >
            <Phone className="size-3 text-[#C9842C]" />
            <span>+91 98765 43210</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0F5132] hover:bg-[#0A3D24] text-white px-3 py-1 text-[10.5px] font-semibold shadow-2xs transition-colors"
          >
            <WhatsAppIcon className="size-3" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Ultra-neat 1-Line Copyright */}
        <div className="pt-2 border-t border-stone-200/70 text-[9.5px] text-stone-400">
          © 2026 Akshara Paints &amp; Hardware, Erode. All rights reserved.
        </div>
      </div>

      {/* ── DESKTOP & TABLET RICH FOOTER (≥ md) ── */}
      <div className="hidden md:block">
        {/* 1. REALISTIC ARCHITECTURAL MOVABLE PAINT BRUSH STROKE RIBBON */}
        <MovablePaintRibbon />

        {/* MAIN 4-COLUMN BODY (Warm Ivory Canvas #FAF8F5) */}
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14 pt-6 pb-10 sm:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
            
            {/* 1 ── Brand, About & Action Desk (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-3" itemScope itemType="https://schema.org/HardwareStore">
              {/* Brand Logo & Wordmark */}
              <Link
                to="/"
                className="flex items-center gap-3.5 group select-none"
                aria-label="Akshara Paints & Hardware home"
              >
                <div className="size-11 sm:size-12 rounded-full bg-[#0E2838] flex items-center justify-center text-white font-serif font-black text-xl sm:text-2xl shadow-md shrink-0 group-hover:bg-[#163B52] transition-colors">
                  A
                </div>
                <div className="leading-none">
                  <span className="block font-serif text-xl sm:text-[1.35rem] font-bold tracking-[0.16em] text-[#0E2838]">
                    AKSHARA
                  </span>
                  <span className="mt-1 block text-[7.5px] font-extrabold tracking-[0.24em] text-stone-500 uppercase">
                    PAINTS &amp; HARDWARE
                  </span>
                </div>
              </Link>

              {/* Description Paragraph */}
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed max-w-sm" itemProp="description">
                Authorized Birla Opus paint dealer &amp; wholesale building materials supplier in Erode. Delivering certified paints, ISI conduits, industrial fasteners, and site supplies.
              </p>

              {/* Badges: Birla Opus Tinting Lab & WhatsApp Action (Stacked) */}
              <div className="flex flex-col items-start gap-2 pt-0.5">
                <div className="inline-flex items-center rounded-full border border-amber-300/80 bg-[#FEF3C7] px-3.5 py-1 text-[11px] font-bold text-amber-900 shadow-xs">
                  <span>Authorized Birla Opus Tinting Lab</span>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Akshara Paints via WhatsApp"
                  className="inline-flex items-center justify-center rounded-full bg-[#0F5132] hover:bg-[#0A3D24] text-white px-3.5 py-1 text-[11px] font-bold shadow-xs hover:shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Instant WhatsApp Desk</span>
                </a>
              </div>
            </div>

            {/* 2 ── Navigation Links (lg:col-span-2 lg:pl-2) */}
            <nav aria-label="Footer navigation" className="lg:col-span-2 lg:pl-2 relative md:-left-[15px]">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0E2838] mb-3">
                Navigation
              </h3>
              <ul className="space-y-1">
                {[
                  { label: "Home", href: "/" },
                  { label: "Visualizer", href: "/visualizer" },
                  { label: "Products", href: "/products" },
                  { label: "Services", href: "/services" },
                  { label: "Blog & Guides", href: "/blog" },
                  { label: "Branches", href: "/branches" },
                  { label: "Contact Us", href: "/contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="inline-flex items-center gap-1.5 py-1.5 text-[13px] sm:text-[13.5px] text-stone-700 hover:text-[#0E2838] font-medium transition-colors group"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="size-3 text-stone-400 group-hover:text-[#0E2838] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 3 ── Product Lines (lg:col-span-3 lg:pl-2) */}
            <nav aria-label="Product categories" className="lg:col-span-3 lg:pl-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0E2838] mb-3">
                Product Lines
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/products"
                    className="flex items-center gap-3 text-[13px] sm:text-[13.5px] text-stone-700 hover:text-[#0E2838] font-medium transition-colors group"
                  >
                    <PaintBucketIcon className="size-5 text-[#0E2838] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Birla Opus Decorative Paints</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="flex items-center gap-3 text-[13px] sm:text-[13.5px] text-stone-700 hover:text-[#0E2838] font-medium transition-colors group"
                  >
                    <ConduitPipesIcon className="size-5 text-[#0E2838] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Electrical Conduit Pipes &amp; Fittings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="flex items-center gap-3 text-[13px] sm:text-[13.5px] text-stone-700 hover:text-[#0E2838] font-medium transition-colors group"
                  >
                    <HexBoltNutIcon className="size-5 text-[#0E2838] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>High-Tensile Hex Bolts &amp; Nuts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="flex items-center gap-3 text-[13px] sm:text-[13.5px] text-stone-700 hover:text-[#0E2838] font-medium transition-colors group"
                  >
                    <BricksWallIcon className="size-5 text-[#0E2838] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Core Building &amp; Structural Materials</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="flex items-center gap-3 text-[13px] sm:text-[13.5px] text-stone-700 hover:text-[#0E2838] font-medium transition-colors group"
                  >
                    <WaterDropIcon className="size-5 text-[#0E2838] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Waterproofing &amp; Wall Primers</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* 4 ── Flagship Branch (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0E2838] mb-3">
                Flagship Branch
              </h3>
              <address
                className="not-italic space-y-2.5 text-[13px] text-stone-600 leading-relaxed"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-4.5 text-[#C9842C] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <span itemProp="streetAddress">Akshara Complex, Main Highway Junction</span>,{" "}
                    <span itemProp="addressLocality">Bypass Road, Erode</span> -{" "}
                    <span itemProp="postalCode">638011</span>,{" "}
                    <span itemProp="addressRegion">Tamil Nadu</span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="size-4 text-[#C9842C] shrink-0" aria-hidden="true" />
                  <a
                    href="tel:+919876543210"
                    itemProp="telephone"
                    aria-label="Call Akshara Paints Erode at +91 98765 43210"
                    className="text-stone-700 hover:text-[#0E2838] font-semibold transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="size-4 text-[#C9842C] shrink-0" aria-hidden="true" />
                  <a
                    href="mailto:info@aksharapaints.com"
                    itemProp="email"
                    aria-label="Email Akshara Paints at info@aksharapaints.com"
                    className="text-stone-700 hover:text-[#0E2838] transition-colors"
                  >
                    info@aksharapaints.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-stone-600">
                  <Clock className="size-4 text-[#C9842C] shrink-0" aria-hidden="true" />
                  <time dateTime="Mo-Sa 08:30-20:30, Su 09:00-14:00">
                    Mon - Sat : 8:30 AM - 8:30 PM (Sun : 9 AM - 2 PM)
                  </time>
                </div>
              </address>
            </div>

          </div>
        </div>

        {/* ── BOTTOM LIGHT BORDER & COPYRIGHT BAR (Matching User's Clean Reference) ── */}
        <div className="w-full border-t border-stone-200/80">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            {/* Left: Copyright */}
            <p className="text-center sm:text-left text-[11.5px] sm:text-[12.5px] text-stone-500">
              © 2026 Akshara Paints &amp; Hardware, Erode. All rights reserved.
            </p>

            {/* Right: Clean spaced legal links without pipe dividers */}
            <nav aria-label="Legal links" className="flex items-center gap-6 sm:gap-7 text-[11.5px] sm:text-[12.5px] text-stone-500">
              <Link to="/contact" className="hover:text-stone-900 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-stone-900 transition-colors">
                Terms of Supply
              </Link>
              <Link to="/branches" className="hover:text-stone-900 transition-colors">
                Store Locator
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
