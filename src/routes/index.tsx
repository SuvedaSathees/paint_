import { createFileRoute } from "@tanstack/react-router";
import { AksharaHero } from "@/components/akshara-hero";

const SITE_URL = "https://akshara-paints.com";

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are you an authorised dealer for Birla Opus Paints?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Akshara Paints & Hardware is an authorised Birla Opus Akshara Certified dealer. We stock the full range of Birla Opus interior and exterior paints with genuine product guarantee."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer a free paint estimate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Use our Instant Paint Calculator on the home page — select your space type and get a coverage estimate and price range in under a minute, with no forms or callbacks required."
      }
    },
    {
      "@type": "Question",
      "name": "What other products do you sell besides paints?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We stock electrical conduit pipes, heavy-duty industrial bolts & nuts, trowels, wrenches, and a wide range of building hardware supplies suitable for residential and commercial projects."
      }
    },
    {
      "@type": "Question",
      "name": "Do you deliver to job sites?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Akshara Paints & Hardware operates a dedicated job-site delivery fleet. We deliver bulk paint orders and hardware supplies directly to construction sites across Erode."
      }
    }
  ]
});

const BREADCRUMB_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": SITE_URL
    }
  ]
});

export const Route = createFileRoute("/")(
  {
    head: () => ({
      meta: [
        { title: "Akshara Paints & Hardware | Birla Opus Authorised Dealer in Erode" },
        {
          name: "description",
          content:
            "Akshara Paints & Hardware — authorised Birla Opus dealer in Erode. Get an instant paint estimate, shop premium colours, electrical conduits and building hardware. Same-day job-site delivery.",
        },
        {
          name: "keywords",
          content:
            "Birla Opus paints Erode, paint shop Erode, Akshara Paints, interior paint dealer, exterior paint dealer, electrical conduit pipes, bolts nuts hardware Erode, paint calculator",
        },
        { property: "og:title", content: "Akshara Paints & Hardware | Birla Opus Authorised Dealer in Erode" },
        {
          property: "og:description",
          content:
            "Authorised Birla Opus dealer in Erode. Premium interior & exterior paints, electrical pipes, bolts and building hardware with same-day delivery.",
        },
        { property: "og:url", content: SITE_URL },
        { property: "og:image", content: `${SITE_URL}/akshara-paint-can.png` },
        { name: "twitter:title", content: "Akshara Paints & Hardware | Birla Opus Dealer Erode" },
        {
          name: "twitter:description",
          content: "Get an instant paint estimate & shop Birla Opus paints, hardware and pipes in Erode.",
        },
      ],
      scripts: [
        { type: "application/ld+json", children: FAQ_SCHEMA },
        { type: "application/ld+json", children: BREADCRUMB_SCHEMA },
      ],
    }),
    component: Index,
  }
);

function Index() {
  return <AksharaHero />;
}
