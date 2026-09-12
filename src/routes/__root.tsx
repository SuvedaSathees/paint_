import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://akshara-paints.com";

const LOCAL_BUSINESS_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "PaintStore",
  "name": "Akshara Paints & Hardware",
  "alternateName": "Akshara Paints",
  "url": SITE_URL,
  "logo": `${SITE_URL}/favicon.svg`,
  "image": `${SITE_URL}/akshara-paint-can.png`,
  "description": "Authorised dealer for Birla Opus Paints, electrical conduit pipes, heavy-duty bolts & nuts, and reliable building supplies in Erode.",
  "priceRange": "₹₹",
  "telephone": "+91-00000-00000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street Address",
    "addressLocality": "Erode",
    "addressRegion": "Tamil Nadu",
    "postalCode": "638001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "11.3410",
    "longitude": "77.7172"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  ],
  "sameAs": [
    "https://www.google.com/maps/search/Akshara+Paints+Erode"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Paint & Hardware Products",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Birla Opus Interior Paints" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Electrical Conduit Pipes" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Industrial Bolts & Nuts" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Building Hardware Supplies" } }
    ]
  }
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Akshara Paints & Hardware | Birla Opus Authorised Dealer – Erode" },
      {
        name: "description",
        content:
          "Akshara Paints & Hardware — authorised Birla Opus dealer in Erode. Shop premium interior & exterior paints, electrical conduits, bolts, nuts and building supplies. Fast job-site delivery.",
      },
      { name: "author", content: "Akshara Paints & Hardware" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "theme-color", content: "#f26522" },
      // Open Graph
      { property: "og:site_name", content: "Akshara Paints & Hardware" },
      { property: "og:title", content: "Akshara Paints & Hardware | Birla Opus Authorised Dealer" },
      {
        property: "og:description",
        content:
          "Premium paints, electrical conduits and hardware for spaces built to inspire. Authorised Birla Opus dealer in Erode.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/akshara-paint-can.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Akshara Paints & Hardware – Premium Birla Opus paint can" },
      { property: "og:locale", content: "en_IN" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Akshara Paints & Hardware | Birla Opus Authorised Dealer" },
      {
        name: "twitter:description",
        content: "Premium paints, electrical conduits and hardware for spaces built to inspire.",
      },
      { name: "twitter:image", content: `${SITE_URL}/akshara-paint-can.png` },
      // Geo / Local
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Erode" },
      { name: "geo.position", content: "11.3410;77.7172" },
      { name: "ICBM", content: "11.3410, 77.7172" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Sora:wght@500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "canonical", href: SITE_URL },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: LOCAL_BUSINESS_SCHEMA,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
