import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ShoppingBag, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShadeCard {
  id: string;
  name: string;
  code: string;
  hex: string;
  accentHex: string;
  description: string;
  sheen: string;
  image: string;
}

const SAMPLE_SHADES: ShadeCard[] = [
  {
    id: "sage",
    name: "Opus Sage",
    code: "BO-5204",
    hex: "#748E7C",
    accentHex: "#5B7362",
    description: "Earthy, calming botanical green that brings outdoor tranquility indoors.",
    sheen: "Luxury Velvet Sheen",
    image: "/room-sage.jpg"
  },
  {
    id: "terracotta",
    name: "Terracotta",
    code: "BO-2118",
    hex: "#C66E53",
    accentHex: "#A4553D",
    description: "Rich sun-baked earthen red-orange providing warmth to dining & living spaces.",
    sheen: "Soft Eggshell",
    image: "/room-terracotta.jpg"
  },
  {
    id: "ocean",
    name: "Coastal Breeze",
    code: "BO-4412",
    hex: "#648A9F",
    accentHex: "#4C6E82",
    description: "Tranquil maritime sky blue creating an airy, expansive bedroom retreat.",
    sheen: "Satin Smooth",
    image: "/room-ocean.jpg"
  },
  {
    id: "ochre",
    name: "Marigold Ochre",
    code: "BO-1185",
    hex: "#D8A343",
    accentHex: "#B8862C",
    description: "Luminous, regal gold delivering welcoming sunshine to entrance foyers.",
    sheen: "High Sheen Gloss",
    image: "/room-ochre.jpg"
  },
  {
    id: "rose",
    name: "Baby Rose Petal",
    code: "BO-3308",
    hex: "#D69F93",
    accentHex: "#B87F73",
    description: "Understated modern baby rose blush offering soothing sophistication.",
    sheen: "Velvet Matte",
    image: "/room-rose.jpg"
  },
  {
    id: "forest",
    name: "Emerald Forest",
    code: "BO-6622",
    hex: "#3F5F52",
    accentHex: "#2C453B",
    description: "Deep, stately jewel-tone green perfect for statement accent walls.",
    sheen: "Royale Luxury Sheen",
    image: "/room-forest.jpg"
  },
  {
    id: "slate",
    name: "Heritage Slate",
    code: "BO-7790",
    hex: "#445263",
    accentHex: "#313D4B",
    description: "Contemporary dark charcoal-slate with blue undertones for modern minimalism.",
    sheen: "Matte Finish",
    image: "/room-slate.jpg"
  },
  {
    id: "linen",
    name: "Warm Linen",
    code: "BO-0012",
    hex: "#EAE2D2",
    accentHex: "#D3C8B3",
    description: "Warm, cozy neutral that maximizes ambient natural light without feeling sterile.",
    sheen: "Soft Pearl Sheen",
    image: "/room-linen.jpg"
  },
];

export function RoomVisualizer() {
  const [selectedShade, setSelectedShade] = useState<ShadeCard>(SAMPLE_SHADES[0]);

  return (
    <section className="pt-6 sm:pt-10 pb-10 sm:pb-14 px-3 sm:px-6 lg:px-8 mx-auto max-w-[1360px] w-full">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-9">
        <span className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.24em] text-accent block mb-1.5">
          &mdash; ARCHITECTURAL COLOR STUDIO &mdash;
        </span>
        <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-primary">
          Live Room Color Visualizer
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground tracking-wide leading-relaxed max-w-lg mx-auto">
          Experience certified Birla Opus designer shades against natural daylight and room textures before tinting in our computerized lab.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center rounded-2xl sm:rounded-3xl border border-primary/12 bg-card/75 p-3.5 sm:p-6 lg:p-8 shadow-lg backdrop-blur-sm">
        {/* Left: Realistic Room Preview Canvas (Preserved Living Room Experience) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-primary/15 bg-stone-900 shadow-xl">
            {/* Photorealistic Living Room Images with Smooth Cross-Fade */}
            {SAMPLE_SHADES.map((shade) => (
              <img
                key={shade.id}
                src={shade.image}
                alt={`${shade.name} painted on living room walls`}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-600 ease-in-out ${
                  selectedShade.id === shade.id ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                loading="eager"
              />
            ))}

            {/* Top-Left Live Color HUD Indicator */}
            <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-20 flex items-center gap-2 rounded-xl bg-black/75 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 text-white shadow-lg border border-white/20">
              <span
                className="size-3.5 sm:size-4 rounded-full border-2 border-white/80 shadow-xs shrink-0"
                style={{ backgroundColor: selectedShade.hex }}
              />
              <div className="text-left">
                <span className="block text-[0.58rem] sm:text-[0.62rem] uppercase font-bold tracking-wider text-white/70">
                  {selectedShade.code}
                </span>
                <span className="block text-[0.72rem] sm:text-xs font-bold text-white leading-tight">
                  {selectedShade.name}
                </span>
              </div>
            </div>

            {/* Top-Right Photorealistic Badge */}
            <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 hidden sm:flex items-center rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-white border border-white/15 text-[0.62rem] font-semibold">
              <span>Living Room Preview</span>
            </div>

            {/* Bottom-Right Sheen Badge */}
            <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 z-20 rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white/20 text-white shadow-md">
              <span className="text-[0.6rem] sm:text-[0.68rem] font-bold uppercase tracking-wider text-white">
                {selectedShade.sheen}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Compact & Responsive Swatch Box */}
        <div className="lg:col-span-5 space-y-2.5 sm:space-y-3.5">
          {/* Swatches Header */}
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[0.72rem] sm:text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Birla Opus Designer Swatches:
            </span>
            <span className="text-[0.68rem] sm:text-xs text-muted-foreground font-medium">
              Tap any chip to apply
            </span>
          </div>

          {/* Compact 4-Column Swatch Grid (Zero Ellipsis Dots, Full Names Cleanly Wrapped) */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {SAMPLE_SHADES.map((shade) => {
              const isSelected = selectedShade.id === shade.id;
              return (
                <button
                  key={shade.id}
                  type="button"
                  onClick={() => setSelectedShade(shade)}
                  className={`group relative flex flex-col overflow-hidden rounded-xl border text-center transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-primary ring-2 ring-accent ring-offset-1 shadow-md scale-[1.02]"
                      : "border-primary/12 hover:border-primary/30 hover:scale-[1.01] bg-card"
                  }`}
                  aria-label={`Select shade ${shade.name} (${shade.code})`}
                  aria-pressed={isSelected}
                >
                  {/* Swatch Color Block */}
                  <div
                    className="h-8 sm:h-11 w-full relative flex items-center justify-center transition-transform"
                    style={{ backgroundColor: shade.hex }}
                  >
                    {/* Subtle top shine */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-white/15 pointer-events-none" />

                    {isSelected && (
                      <div className="size-4 sm:size-4.5 rounded-full bg-black/50 backdrop-blur-xs text-white grid place-items-center shadow-xs">
                        <Check className="size-2.5 sm:size-3 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Swatch Code & Full Name Label (No dots / truncation) */}
                  <div className="bg-card px-1 py-1 sm:py-1.5 border-t border-primary/10 min-h-[38px] sm:min-h-[44px] flex flex-col justify-center">
                    <span className="block text-[0.5rem] sm:text-[0.56rem] font-mono text-muted-foreground leading-none">
                      {shade.code}
                    </span>
                    <strong className="block text-[0.58rem] sm:text-[0.68rem] font-bold text-primary leading-tight mt-0.5 break-words">
                      {shade.name}
                    </strong>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Simple & Neat Selected Shade Box */}
          <div className="rounded-xl sm:rounded-2xl bg-secondary/50 p-2.5 sm:p-3.5 border border-primary/10">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="size-3.5 rounded-full border border-primary/25 shadow-xs shrink-0"
                  style={{ backgroundColor: selectedShade.hex }}
                />
                <div className="flex items-baseline gap-1.5 min-w-0">
                  <strong className="font-display text-xs sm:text-sm font-bold text-primary">
                    {selectedShade.name}
                  </strong>
                  <span className="font-mono text-[0.68rem] sm:text-xs text-muted-foreground">
                    ({selectedShade.code})
                  </span>
                </div>
              </div>
              <span className="text-[0.58rem] sm:text-[0.65rem] rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 font-bold uppercase tracking-wider shrink-0">
                100% In Stock
              </span>
            </div>

            <p className="text-[0.72rem] sm:text-xs text-muted-foreground leading-snug mb-2.5">
              {selectedShade.description}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="hero"
                size="sm"
                asChild
                className="rounded-full cursor-pointer text-[0.72rem] sm:text-xs font-bold py-1.5 px-2 shadow-sm justify-center"
              >
                <Link to="/visualizer">
                  <Camera className="size-3 mr-1" />
                  <span>Paint Room &rarr;</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full cursor-pointer text-[0.72rem] sm:text-xs font-semibold py-1.5 px-2 border-primary/25 justify-center bg-white/70"
              >
                <a
                  href={`https://wa.me/919443722255?text=Hi%20Akshara%20Paints,%20I%20would%20like%20to%20order%20a%20tester%20or%20tin%20for%20shade%20${encodeURIComponent(selectedShade.name)}%20(${selectedShade.code})`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ShoppingBag className="size-3 mr-1" />
                  <span>Sample (₹199)</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
