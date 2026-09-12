import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";

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
      className={`relative w-full bg-background mt-[100px] overflow-hidden select-none ${className || ""}`}
    >
      {/* ── 1. REALISTIC ARCHITECTURAL PAINT BRUSH STROKE RIBBON (Matching Reference Wave) ── */}
      <div className="relative w-full overflow-hidden select-none bg-transparent -mb-1">
        <svg
          viewBox="0 0 1440 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-22 lg:h-28 block"
          aria-hidden="true"
        >
          <defs>
            {/* Main Gradient: Terracotta Crimson -> Birla Opus Orange -> Golden Amber */}
            <linearGradient id="paintRibbonBodyGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#C2410C" stopOpacity="0.8" />
              <stop offset="10%" stopColor="#D9531E" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#EA580C" stopOpacity="1" />
              <stop offset="50%" stopColor="#EB6014" stopOpacity="1" />
              <stop offset="70%" stopColor="#F97316" stopOpacity="0.98" />
              <stop offset="85%" stopColor="#F59E0B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0.8" />
            </linearGradient>

            {/* Top Gloss Highlight Gradient */}
            <linearGradient id="paintRibbonGlossGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.25" />
              <stop offset="20%" stopColor="#FFF7ED" stopOpacity="0.85" />
              <stop offset="48%" stopColor="#FFEDD5" stopOpacity="0.7" />
              <stop offset="78%" stopColor="#FEF08A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FED7AA" stopOpacity="0.3" />
            </linearGradient>

            {/* Deep Warm Shadow Gradient */}
            <linearGradient id="paintRibbonShadowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C2D12" stopOpacity="0.12" />
              <stop offset="25%" stopColor="#9A3412" stopOpacity="0.25" />
              <stop offset="55%" stopColor="#C2410C" stopOpacity="0.3" />
              <stop offset="85%" stopColor="#EA580C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.08" />
            </linearGradient>

            {/* Soft Diffuse Shadow Filter */}
            <filter id="ribbonDropShadow" x="-5%" y="-30%" width="110%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Deep Soft Blurred Underbody Drop Shadow (Offset dy=6) */}
          <path
            d="M -20,62 C 100,26 190,20 270,20 C 420,20 540,94 720,94 C 900,94 1020,26 1170,26 C 1280,26 1380,56 1460,68"
            stroke="url(#paintRibbonShadowGrad)"
            strokeWidth="28"
            strokeLinecap="round"
            filter="url(#ribbonDropShadow)"
            opacity="0.75"
          />

          {/* 2. Main Filled Dynamic Ribbon Body (Thinner at crests, broader juicy paint in central dip) */}
          <path
            d="M -20,53 C 100,19 190,12 270,12 C 420,12 540,73 720,73 C 900,73 1010,15 1170,15 C 1280,15 1380,48 1460,56 L 1460,68 C 1380,60 1280,33 1170,33 C 1010,33 900,103 720,103 C 540,103 420,26 270,26 C 190,26 100,33 -20,65 Z"
            fill="url(#paintRibbonBodyGrad)"
          />

          {/* 3. Authentic Bristle Filaments (Layer A: Deep Sienna Grain) */}
          <path
            d="M -15,59 C 102,23 192,18 270,18 C 420,18 540,86 720,86 C 900,86 1015,22 1170,22 C 1280,22 1380,54 1455,62"
            stroke="#9A3412"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* 4. Authentic Bristle Filaments (Layer B: Mid Terracotta) */}
          <path
            d="M -10,61 C 104,25 194,22 270,22 C 420,22 540,92 720,92 C 900,92 1015,27 1170,27 C 1280,27 1380,58 1450,65"
            stroke="#C2410C"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* 5. Top Crest Specular Highlight (Fresh Wet Paint Luminous Sheen) */}
          <path
            d="M 50,42 C 120,21 195,14 270,14 C 420,14 540,75 720,75 C 900,75 1012,17 1170,17 C 1280,17 1360,38 1420,52"
            stroke="url(#paintRibbonGlossGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* 6. Razor-Sharp Fine Ridge Core Light */}
          <path
            d="M 120,31 C 170,18 220,14 270,14 C 380,14 500,60 620,75 M 820,75 C 940,60 1060,18 1170,18 C 1240,18 1300,28 1360,40"
            stroke="#FFF7ED"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* 7. Flared Dry-Brush Whisps on Left Entry */}
          <path d="M -25,48 C 15,48 55,42 95,35" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
          <path d="M -20,54 C 20,52 60,46 105,38" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <path d="M -30,62 C 10,64 50,58 90,48" stroke="#D9531E" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          <path d="M -15,70 C 25,72 65,65 110,55" stroke="#9A3412" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />

          {/* 8. Tapered Brush Exit Whisps on Right Edge */}
          <path d="M 1370,44 C 1400,48 1430,54 1465,60" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <path d="M 1385,48 C 1410,52 1435,58 1460,64" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
          <path d="M 1400,54 C 1420,58 1445,64 1470,70" stroke="#FB923C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>

      {/* ── MAIN 4-COLUMN BODY (Warm Ivory Canvas #FAF8F5) ── */}
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
    </footer>
  );
}
