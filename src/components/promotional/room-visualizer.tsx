import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Palette, Check, ShoppingBag, Eye, ArrowRight, Camera } from "lucide-react";
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
    <section className="-mt-[40px] pt-[36px] pb-[50px] px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full">
      {/* Header matching reference aesthetic */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent block mb-2">
          &mdash; ARCHITECTURAL COLOR STUDIO &mdash;
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-primary">
          Live Room Color Visualizer
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground tracking-wide leading-relaxed">
          Experience certified Birla Opus designer shades against authentic natural daylight and room textures before tinting a single drop in our computerized lab.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-primary/15 bg-card/60 p-6 sm:p-10 shadow-xl backdrop-blur-sm">
        {/* Left: Realistic Room Preview Canvas */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-primary/15 bg-stone-900 shadow-2xl">
            {/* Photorealistic Living Room Images with Smooth Cross-Fade */}
            {SAMPLE_SHADES.map((shade) => (
              <img
                key={shade.id}
                src={shade.image}
                alt={`${shade.name} painted on living room walls`}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                  selectedShade.id === shade.id ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                loading="eager"
              />
            ))}

            {/* Top-Left Live Color HUD Indicator */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 rounded-2xl bg-black/75 backdrop-blur-md px-3.5 py-2 text-white shadow-xl border border-white/20">
              <span
                className="size-4 rounded-full border-2 border-white/80 shadow-sm"
                style={{ backgroundColor: selectedShade.hex }}
              />
              <div className="text-left">
                <span className="block text-[0.62rem] uppercase font-bold tracking-wider text-white/70">
                  {selectedShade.code}
                </span>
                <span className="block text-xs font-bold text-white leading-tight">
                  {selectedShade.name}
                </span>
              </div>
            </div>

            {/* Top-Right Photorealistic Badge */}
            <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-white border border-white/15 text-[0.62rem] font-semibold">
              <span>Realistic Room Preview</span>
            </div>

            {/* Bottom-Right Sheen Badge */}
            <div className="absolute bottom-4 right-4 z-20 rounded-full bg-black/75 backdrop-blur-md px-3.5 py-1.5 border border-white/20 text-white shadow-2xl">
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-white">
                {selectedShade.sheen}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Swatch Cards Grid ("Tap a Sample Card") */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Birla Opus Designer Swatches:
            </span>
            <span className="text-xs text-muted-foreground">
              Tap any chip to apply
            </span>
          </div>

          {/* 8 Color Swatch Cards (Styled like physical showroom chips) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLE_SHADES.map((shade) => {
              const isSelected = selectedShade.id === shade.id;
              return (
                <button
                  key={shade.id}
                  type="button"
                  onClick={() => setSelectedShade(shade)}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-sm ${
                    isSelected
                      ? "border-primary ring-2 ring-accent ring-offset-2 scale-104 shadow-lg"
                      : "border-primary/10 hover:border-primary/30 hover:scale-102"
                  }`}
                >
                  {/* Top Swatch Color Block */}
                  <div
                    className="h-16 w-full relative flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ backgroundColor: shade.hex }}
                  >
                    {isSelected && (
                      <div className="size-6 rounded-full bg-white/95 text-stone-900 grid place-items-center shadow-md">
                        <Check className="size-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Swatch Label */}
                  <div className="bg-card p-2.5 border-t border-primary/10">
                    <span className="block text-[0.6rem] font-mono uppercase text-muted-foreground">
                      {shade.code}
                    </span>
                    <strong className="block text-xs font-bold text-primary leading-tight">
                      {shade.name}
                    </strong>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details & CTA Box for Selected Shade */}
          <div className="rounded-2xl bg-secondary/60 p-5 border border-primary/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="size-4 rounded-full border border-primary/20"
                  style={{ backgroundColor: selectedShade.hex }}
                />
                <strong className="font-display text-sm font-bold text-primary">
                  {selectedShade.name} ({selectedShade.code})
                </strong>
              </div>
              <span className="text-[0.65rem] rounded-full bg-primary/10 text-primary px-2.5 py-0.5 font-bold uppercase tracking-wider">
                100% In Stock
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {selectedShade.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="hero"
                size="sm"
                asChild
                className="rounded-full cursor-pointer text-xs gap-1.5 font-bold shadow-sm"
              >
                <Link to="/visualizer">
                  <Camera className="size-3.5" />
                  <span>Upload &amp; Paint Your Own Room &rarr;</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full cursor-pointer text-xs gap-1 border-primary/25"
              >
                <a
                  href={`https://wa.me/919443722255?text=Hi%20Akshara%20Paints,%20I%20would%20like%20to%20order%20a%20tester%20or%20tin%20for%20shade%20${encodeURIComponent(selectedShade.name)}%20(${selectedShade.code})`}
                  target="_blank"
                  rel="noreferrer"
                  className="gap-1"
                >
                  <ShoppingBag className="size-3.5" /><span>Order Sample Pot (₹199)</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
