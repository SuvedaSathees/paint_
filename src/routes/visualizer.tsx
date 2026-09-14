import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ColorVisualizer } from "@/components/visualizer/color-visualizer";

export const Route = createFileRoute("/visualizer")({
  head: () => ({
    meta: [
      {
        title: "Virtual Wall Color Visualizer & Room Paint Simulator | Akshara Paints Erode",
      },
      {
        name: "description",
        content:
          "Upload your room photo or take a picture to test authentic Birla Opus paints on real walls with true shadows, textures, and lighting. Computerized color tinting in Erode.",
      },
      {
        property: "og:title",
        content: "Virtual Wall Color Visualizer | Akshara Paints & Hardware Erode",
      },
      {
        property: "og:description",
        content:
          "Interactive Birla Opus room paint visualizer. Snap a photo or choose a sample room to test wall colors with real-time shadow & texture blend.",
      },
      { property: "og:type", content: "website" },
      {
        name: "keywords",
        content:
          "paint visualizer Erode, wall color simulator, Birla Opus virtual studio, room paint preview, paint color test photo, computerized paint mixing Erode, Akshara Paints",
      },
    ],
  }),
  component: VisualizerPage,
});

function VisualizerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-accent/30 selection:text-stone-900">
      <SiteHeader />
      <main className="flex-1 pt-14 sm:pt-20 pb-20 sm:pb-16 overflow-x-hidden">
        <ColorVisualizer />
      </main>
      <SiteFooter />
    </div>
  );
}
