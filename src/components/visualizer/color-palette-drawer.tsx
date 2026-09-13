import React, { useState, useMemo } from "react";
import { Search, Pipette, Check, LayoutGrid, Grid3X3 } from "lucide-react";
import { BIRLA_OPUS_COLORS, PaintColor } from "./color-data";
import { Button } from "@/components/ui/button";

interface ColorPaletteDrawerProps {
  selectedColor: PaintColor;
  onSelectColor: (color: PaintColor) => void;
  onOpenEstimate: (color: PaintColor) => void;
}

type CategoryTab = "all" | "interior" | "accents" | "neutrals" | "pastels" | "exterior";

const CATEGORY_TABS: { id: CategoryTab; label: string }[] = [
  { id: "all", label: "All 40+ Shades" },
  { id: "interior", label: "Interior Living" },
  { id: "accents", label: "Deep Accents" },
  { id: "neutrals", label: "Neutrals & Whites" },
  { id: "pastels", label: "Pastels & Calming" },
  { id: "exterior", label: "Exterior Weatherproof" },
];

export function ColorPaletteDrawer({
  selectedColor,
  onSelectColor,
  onOpenEstimate,
}: ColorPaletteDrawerProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customHex, setCustomHex] = useState("#2D5A40");
  const [viewMode, setViewMode] = useState<"cards" | "compact">("cards");

  const filteredColors = useMemo(() => {
    return BIRLA_OPUS_COLORS.filter((color) => {
      const matchesCategory = activeTab === "all" || color.category === activeTab;
      const matchesSearch =
        color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        color.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        color.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleCustomColorApply = (hex: string) => {
    setCustomHex(hex);
    onSelectColor({
      id: `custom-${hex}`,
      name: `Custom Shade ${hex.toUpperCase()}`,
      code: "CUSTOM",
      hex: hex,
      category: "interior",
      sheen: "Silk Sheen",
      product: "Birla Opus Custom Tint",
      description: "Custom formulated computerized shade dispensed at Akshara Paints.",
    });
  };

  const handleEyeDropper = async () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          handleCustomColorApply(result.sRGBHex);
        }
      } catch {
        // user canceled eyedropper
      }
    }
  };

  return (
    <div className="flex flex-col gap-3.5 rounded-2xl border border-stone-200/80 bg-white p-3.5 shadow-xs">
      {/* Search & Custom Color Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[170px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search shade name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50/70 pl-8 pr-2.5 py-1.5 text-xs text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-[#F05323] focus:outline-none focus:ring-1 focus:ring-[#F05323]"
          />
        </div>

        {/* Custom Color Input */}
        <div className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50/70 px-2 py-1 text-xs">
          <input
            type="color"
            value={customHex}
            onChange={(e) => handleCustomColorApply(e.target.value)}
            className="size-5 cursor-pointer rounded border-0 bg-transparent"
            title="Choose custom HEX color"
          />
          <span className="font-mono text-[10px] font-bold text-stone-700 uppercase">
            {customHex}
          </span>
          {typeof window !== "undefined" && "EyeDropper" in window && (
            <button
              type="button"
              onClick={handleEyeDropper}
              className="rounded p-0.5 text-stone-500 hover:bg-stone-200 hover:text-stone-800 cursor-pointer"
              title="Pick color from screen"
            >
              <Pipette className="size-3" />
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-xl bg-stone-100 p-0.5 border border-stone-200/70">
          <button
            type="button"
            onClick={() => setViewMode("cards")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "cards" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-800"
            }`}
            title="Card View (Shade Name & Code)"
          >
            <LayoutGrid className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("compact")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "compact" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-800"
            }`}
            title="Compact Palette Dots"
          >
            <Grid3X3 className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-stone-100">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#F05323] text-white shadow-2xs"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* MODE 1: ARCHITECTURAL PAINT CHIP CARDS (Vibrant, Clear, Well-Spaced) */}
      {/* =================================================================== */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
          {filteredColors.map((color) => {
            const isSelected = selectedColor.id === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onSelectColor(color)}
                className={`group relative flex flex-col rounded-2xl border p-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#F05323] bg-[#FFF9F6] ring-2 ring-[#F05323]/30 shadow-sm scale-[1.01]"
                    : "border-stone-200/90 bg-white hover:border-stone-300 hover:bg-stone-50/60 hover:shadow-xs"
                }`}
              >
                {/* Generous Color Swatch Area */}
                <div
                  className="relative w-full aspect-[1.25/1] rounded-xl border border-black/10 shadow-xs flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.02]"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <span className="size-6 rounded-full bg-white/95 shadow-md flex items-center justify-center text-[#F05323]">
                      <Check className="size-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Typography: Clean, Un-squished Name & Code */}
                <div className="mt-2 px-0.5 min-w-0 w-full">
                  <p className="truncate font-bold text-stone-900 text-xs leading-tight">
                    {color.name}
                  </p>
                  <div className="flex items-center justify-between mt-1 text-[10px]">
                    <span className="font-mono font-bold text-stone-600 tracking-wide">
                      {color.code}
                    </span>
                    <span className="text-[9px] text-stone-400 font-medium truncate">
                      {color.sheen.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}

          {filteredColors.length === 0 && (
            <div className="col-span-full py-8 text-center text-stone-400 text-xs">
              No shades match &quot;{searchQuery}&quot;. Try another name or code.
            </div>
          )}
        </div>
      ) : (
        /* =================================================================== */
        /* MODE 2: COMPACT SWATCH GRID (All 40+ Colors at a Glance)             */
        /* =================================================================== */
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-[380px] overflow-y-auto p-1">
          {filteredColors.map((color) => {
            const isSelected = selectedColor.id === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onSelectColor(color)}
                title={`${color.name} (${color.code}) - ${color.sheen}`}
                className={`group relative flex flex-col items-center gap-1 rounded-xl p-1.5 transition-all cursor-pointer ${
                  isSelected ? "bg-[#FFF0EB] ring-2 ring-[#F05323]" : "hover:bg-stone-100"
                }`}
              >
                <div
                  className="relative size-10 rounded-xl border border-black/15 shadow-xs flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <span className="size-4 rounded-full bg-white/95 shadow-xs flex items-center justify-center text-[#F05323]">
                      <Check className="size-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <span className="font-mono text-[9px] font-bold text-stone-600 truncate max-w-[48px]">
                  {color.code.replace("BO-", "")}
                </span>
              </button>
            );
          })}

          {filteredColors.length === 0 && (
            <div className="col-span-full py-8 text-center text-stone-400 text-xs">
              No shades match &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      )}

      {/* Footer Helper */}
      <div className="flex items-center justify-center border-t border-stone-100 pt-2 text-[11px] text-stone-500 font-medium">
        <span>Showing {filteredColors.length} Birla Opus Shades</span>
      </div>
    </div>
  );
}
