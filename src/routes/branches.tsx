import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HelpStrip } from "@/components/help-strip";
import { MapPin, Phone, Clock, Navigation, Store } from "lucide-react";
import { BRANCHES, STORE_PHONE } from "@/lib/store-info";

const SITE = "https://aksharapaints.in";

// ── Schema.org: one entry per branch (built from the shared store data) ──────
const multiLocationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Akshara Paints & Hardware Store Locations in Erode",
  url: `${SITE}/branches`,
  numberOfItems: BRANCHES.length,
  itemListElement: BRANCHES.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": b.schema.type,
      name: `Akshara Paints & Hardware – ${b.name}`,
      image: `${SITE}${b.image}`,
      url: `${SITE}/branches#${b.id}`,
      telephone: STORE_PHONE.tel,
      priceRange: "₹₹",
      openingHours: b.openingHours,
      address: {
        "@type": "PostalAddress",
        streetAddress: b.schema.streetAddress,
        addressLocality: b.schema.locality,
        addressRegion: "Tamil Nadu",
        postalCode: b.schema.postalCode,
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: b.schema.lat, longitude: b.schema.lng },
      hasMap: b.mapUrl,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Branches", item: `${SITE}/branches` },
  ],
};

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Our Stores in Erode | Akshara Paints & Hardware" },
      {
        name: "description",
        content:
          "Addresses, opening hours and directions for Akshara Paints & Hardware's three stores in Erode: Bypass Road showroom, Perundurai depot and Old Market Square outlet.",
      },
      {
        name: "keywords",
        content:
          "paint shops Erode, Birla Opus store Erode, hardware depot Perundurai, electrical conduit supplier Erode, Akshara Paints branches",
      },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: "Our Stores in Erode | Akshara Paints & Hardware" },
      {
        property: "og:description",
        content: "Addresses, opening hours and directions for all three Akshara stores in Erode.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/branches` },
      { property: "og:image", content: `${SITE}/branch-flagship.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Stores in Erode | Akshara Paints & Hardware" },
      { name: "twitter:image", content: `${SITE}/branch-flagship.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/branches` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(multiLocationSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
    ],
  }),
  component: BranchesPage,
});

function BranchesPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col">
      <SiteHeader />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-7 sm:pt-16 pb-6 sm:pb-8">
        {/* Title */}
        <header className="text-center max-w-xl mx-auto">
          <p className="flex items-center justify-center gap-2.5 sm:gap-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#F05323] sm:text-xs sm:tracking-[0.22em]">
            <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
            Branches
            <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
          </p>
          <h1 className="mt-1.5 sm:mt-2 font-serif text-[2rem] leading-tight sm:text-5xl text-stone-900">
            Our stores in Erode
          </h1>
          <p className="mx-auto mt-2 max-w-[310px] sm:mt-3 sm:max-w-none text-[14px] sm:text-base leading-relaxed text-stone-600">
            Visit any of our three stores, or call ahead and we&rsquo;ll keep your order ready.
          </p>
        </header>

        {/* Branch cards */}
        <ul className="mt-6 sm:mt-10 grid gap-4 md:grid-cols-3">
          {BRANCHES.map((b) => (
            <li
              key={b.id}
              id={b.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_1px_2px_rgba(14,40,56,0.04)] scroll-mt-28"
            >
              <div className="relative">
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  className="h-40 w-full object-cover sm:h-44"
                />
                <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-stone-700 shadow-sm backdrop-blur sm:hidden">
                  {b.kind}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="hidden text-xs font-semibold uppercase tracking-wider text-stone-500 sm:block">{b.kind}</p>
                <h2 className="font-serif text-[19px] leading-snug text-stone-900 sm:mt-1 sm:text-xl">{b.name}</h2>

                <ul className="mt-3 space-y-2.5 rounded-xl bg-[#FAF8F5] p-3 text-[13.5px] text-stone-700 sm:mt-4 sm:space-y-3 sm:rounded-none sm:bg-transparent sm:p-0 sm:text-sm">
                  <li className="flex gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-[#F05323]" />
                    <span>{b.address}</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Clock className="mt-0.5 size-4 shrink-0 text-[#F05323]" />
                    <dl className="w-full space-y-0.5">
                      {b.hours.map((h) => (
                        <div key={h.days} className="flex justify-between gap-3">
                          <dt className="text-stone-500">{h.days}</dt>
                          <dd className="text-right font-medium text-stone-800">{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </li>
                </ul>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-4 sm:pt-5">
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 sm:h-10 items-center justify-center gap-1.5 rounded-full bg-[#F05323] text-sm font-semibold text-white transition hover:bg-[#dd4615]"
                  >
                    <Navigation className="size-4" />
                    Directions
                  </a>
                  <a
                    href={`tel:${STORE_PHONE.tel}`}
                    className="inline-flex h-11 sm:h-10 items-center justify-center gap-1.5 rounded-full border border-stone-300 bg-white text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
                  >
                    <Phone className="size-4" />
                    Call
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Help strip */}
        <HelpStrip
          className="mt-6 sm:mt-8"
          icon={Store}
          title="Not sure which store to visit?"
          text="Tell us what you need and we’ll point you to the right one."
          whatsappText="Hello Akshara Paints, which store should I visit?"
        />
      </main>

      <SiteFooter className="mt-0! sm:mt-0!" />
    </div>
  );
}
