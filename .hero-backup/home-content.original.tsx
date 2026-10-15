import { BeforeAfterSlider } from "@/components/promotional/before-after-slider";
import { RoomVisualizer } from "@/components/promotional/room-visualizer";
import { ServiceSwatchDeck } from "@/components/promotional/service-swatch-deck";
import { PaintEstimator } from "@/components/promotional/paint-estimator";
import { ProductCatalogSection } from "@/components/promotional/product-catalog-section";
export function HomeContent() {
  return (
    <div id="experience" className="relative bg-background text-foreground z-20">
      {/* 0. Product Categories — 5 Core Divisions */}
      <ProductCatalogSection />

      {/* 1. Interactive Service & Finish Swatch Deck ("pick a card, any card") */}
      <div id="swatch-deck">
        <ServiceSwatchDeck />
      </div>

      {/* 2. Interactive Room Color Visualizer ("tap a sample card") */}
      <div id="visualizer">
        <RoomVisualizer />
      </div>

      {/* 3. Draggable Realistic Before/After Transformation ("drag the brush") */}
      <div id="transformation">
        <BeforeAfterSlider />
      </div>

      {/* 4. Instant Paint Calculator ("four taps. one price.") */}
      <div id="estimator">
        <PaintEstimator />
      </div>
    </div>
  );
}
