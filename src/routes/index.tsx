import { createFileRoute } from "@tanstack/react-router";
import { AksharaHero } from "@/components/akshara-hero";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akshara Paints & Hardware | Bring Spaces to Life" },
      { name: "description", content: "Discover premium paints, professional tools and trusted hardware from Akshara Paints & Hardware." },
      { property: "og:title", content: "Akshara Paints & Hardware" },
      { property: "og:description", content: "Premium paints and professional tools for spaces built to inspire." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <AksharaHero />;
}
