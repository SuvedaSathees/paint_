import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { BIRLA_OPUS_COLORS, PaintColor } from "./color-data";

interface ColorPaletteDrawerProps {
  selectedColor: PaintColor;
  onSelectColor: (color: PaintColor) => void;
  onOpenEstimate?: (color: PaintColor) => void;
}

type CategoryTab = "all" | "interior" | "accents" | "neutrals" | "pastels" | "exterior";

const CATEGORY_TABS: { id: CategoryTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "interior", label: "Interior" },
  { id: "neutrals", label: "Neutrals" },
  { id: "pastels", label: "Pastels" },
  { id: "accents", label: "Bold" },
  { id: "exterior", label: "Exterior" },
];

export function ColorPaletteDrawer({ selectedColor, onSelectColor }: ColorPaletteDrawerProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customHex, setCustomHex] = useState("#2D5A40");

  const filteredColors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return BIRLA_OPUS_COLORS.filter((color) => {
      const matchesCategory = activeTab === "all" || color.category === activeTab;
      const matchesSearch =
        q === "" ||
        color.name.toLowerCase().includes(q) ||
        color.code.toLowerCase().includes(q) ||
        color.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const applyCustom = (hex: string) => {
    setCustomHex(hex);
    onSelectColor({
      id: `custom-${hex}`,
      name: `Custom ${hex.toUpperCase()}`,
      code: "CUSTOM",
      hex,
      category: "interior",
      sheen: "Silk Sheen",
      product: "Birla Opus custom tint",
      description: "Custom shade mixed by computer at Akshara Paints.",
    });
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-stone-900">Birla Opus colours</p>
        <p className="text-xs text-stone-500">
          {filteredColors.length} {filteredColors.length === 1 ? "shade" : "shades"}
        </p>
      </div>

      <div className="relative mt-3">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name or code"
          aria-label="Search colours"
          className="h-10 w-full rounded-full border border-stone-200 bg-white pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-[#F05323] focus:ring-4 focus:ring-[#F05323]/10 [&::-webkit-search-cancel-button]:hidden"
        />
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isActive}
              className={`h-8 shrink-0 rounded-full border px-3.5 text-xs font-semibold transition-colors cursor-pointer ${
                isActive
                  ? "border-[#0A2234] bg-[#0A2234] text-white"
                  : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid max-h-[300px] grid-cols-4 gap-x-2.5 gap-y-3 overflow-y-auto p-1 sm:max-h-[340px]">
        {filteredColors.map((color) => {
          const isSelected = selectedColor.id === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onSelectColor(color)}
              aria-pressed={isSelected}
              title={`${color.name} · ${color.code} · ${color.sheen}`}
              className="group min-w-0 text-left cursor-pointer"
            >
              <span
                className={`block aspect-square w-full rounded-xl border border-black/10 transition ${
                  isSelected ? "ring-2 ring-[#F05323] ring-offset-2" : "group-hover:scale-[1.05]"
                }`}
                style={{ backgroundColor: color.hex }}
              />
              <span
                className={`mt-1.5 block truncate text-[11px] leading-tight ${
                  isSelected ? "font-semibold text-stone-900" : "font-medium text-stone-700"
                }`}
              >
                {color.name}
              </span>
              <span className="block text-[10px] text-stone-400">{color.code}</span>
            </button>
          );
        })}

        {filteredColors.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-stone-500">
            No shades match &ldquo;{searchQuery}&rdquo;.
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
        <span className="text-sm text-stone-600">Need another shade?</span>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-stone-200 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-stone-700 transition hover:border-stone-300">
          <input
            type="color"
            value={customHex}
            onChange={(e) => applyCustom(e.target.value)}
            aria-label="Pick a custom colour"
            className="size-6 cursor-pointer rounded-full border-0 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
          />
          Custom colour
        </label>
      </div>
    </div>
  );
}
