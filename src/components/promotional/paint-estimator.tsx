import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  RotateCcw,
  Home,
  Building2,
  Castle,
  Sun,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Truck,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpaceOption {
  id: string;
  name: string;
  subtitle: string;
  sqft: number;
  icon: typeof Home;
}

interface FinishOption {
  id: string;
  name: string;
  badge: string;
  type: string;
  rateMultiplier: number;
}

interface ConditionOption {
  id: string;
  name: string;
  multiplier: number;
  desc: string;
}

interface ToneOption {
  id: string;
  name: string;
  hex: string;
  roomImage: string;
  code: string;
}

function PaintRollerIcon({
  isSelected = false,
  className = "size-7",
}: {
  isSelected?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="6"
        width="13"
        height="6.5"
        rx="1.75"
        fill={isSelected ? "#E6BA8B" : "#B58A63"}
        stroke={isSelected ? "#FFFFFF" : "#26211C"}
        strokeWidth="1.6"
      />
      <path
        d="M17 9.25 H 20 C 20.8 9.25 21.5 9.95 21.5 10.75 V 13 C 21.5 13.8 20.8 14.5 20 14.5 H 12 C 11.2 14.5 10.5 15.2 10.5 16 V 17.5"
        stroke={isSelected ? "#FFFFFF" : "#26211C"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="9"
        y="17.5"
        width="3"
        height="6.5"
        rx="1"
        fill={isSelected ? "#FFFFFF" : "#26211C"}
      />
    </svg>
  );
}

function BrickWallIcon({
  isSelected = false,
  className = "size-7",
}: {
  isSelected?: boolean;
  className?: string;
}) {
  const strokeColor = isSelected ? "#FFFFFF" : "#1D4A38";
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke={strokeColor}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3.5" y="5.5" width="21" height="17" rx="2" />
      <line x1="3.5" y1="11.2" x2="24.5" y2="11.2" />
      <line x1="3.5" y1="16.8" x2="24.5" y2="16.8" />
      <line x1="10.5" y1="5.5" x2="10.5" y2="11.2" />
      <line x1="17.5" y1="5.5" x2="17.5" y2="11.2" />
      <line x1="7" y1="11.2" x2="7" y2="16.8" />
      <line x1="14" y1="11.2" x2="14" y2="16.8" />
      <line x1="21" y1="11.2" x2="21" y2="16.8" />
      <line x1="10.5" y1="16.8" x2="10.5" y2="22.5" />
      <line x1="17.5" y1="16.8" x2="17.5" y2="22.5" />
    </svg>
  );
}

const SPACES: SpaceOption[] = [
  { id: "room", name: "Single Room", subtitle: "~250 sq.ft wall area", sqft: 250, icon: Home },
  { id: "2bhk", name: "2BHK Full Apartment", subtitle: "~900 sq.ft wall area", sqft: 900, icon: Building2 },
  { id: "villa", name: "3BHK Villa / Duplex", subtitle: "~1,800 sq.ft wall area", sqft: 1800, icon: Castle },
  { id: "exterior", name: "Exterior Elevation", subtitle: "~1,500 sq.ft exterior", sqft: 1500, icon: Sun },
  { id: "commercial", name: "Commercial Site", subtitle: "~3,500+ sq.ft • 20L Drums", sqft: 3500, icon: Truck },
];

const FINISHES: FinishOption[] = [
  {
    id: "standard",
    name: "Standard — Trade Quality",
    badge: "Trade Grade",
    type: "Washable Matte Emulsion • Reliable contractor spec",
    rateMultiplier: 1.0,
  },
  {
    id: "premium",
    name: "Premium — Designer Paints",
    badge: "Birla Opus Luxury",
    type: "Teflon™ Stain-Shield Satin • 100k+ Wash Cycles",
    rateMultiplier: 1.45,
  },
  {
    id: "bulk-drum",
    name: "Wholesale Bulk — 20L Drums",
    badge: "Contractor Wholesale",
    type: "Commercial tier pricing • Same-day truck delivery",
    rateMultiplier: 0.82,
  },
];

const CONDITIONS: ConditionOption[] = [
  {
    id: "repaint",
    name: "Repainting / Refresh",
    multiplier: 1.0,
    desc: "Existing sound walls • 2 coats topcoat directly",
  },
  {
    id: "fresh",
    name: "Fresh Plaster / New Build",
    multiplier: 1.35,
    desc: "Bare substrate • 1 coat primer sealer + 2 coats topcoat",
  },
];

const TONES: ToneOption[] = [
  { id: "linen", name: "Warm Linen Cream", hex: "#D6CBB7", roomImage: "/room-linen.jpg", code: "BO-0012" },
  { id: "forest", name: "Opus Forest Sage", hex: "#567761", roomImage: "/room-sage.jpg", code: "BO-5284" },
  { id: "terracotta", name: "Warm Terracotta", hex: "#BD644B", roomImage: "/room-terracotta.jpg", code: "BO-2118" },
  { id: "ocean", name: "Monsoon Blue", hex: "#52758B", roomImage: "/room-ocean.jpg", code: "BO-4412" },
  { id: "ochre", name: "Marigold Ochre", hex: "#D49E35", roomImage: "/room-ochre.jpg", code: "BO-1185" },
  { id: "rose", name: "Baby Rose Petal", hex: "#C98E87", roomImage: "/room-rose.jpg", code: "BO-3388" },
  { id: "slate", name: "Heritage Slate", hex: "#485460", roomImage: "/room-slate.jpg", code: "BO-7790" },
  { id: "emerald", name: "Emerald Forest", hex: "#2D4A3E", roomImage: "/room-forest.jpg", code: "BO-6622" },
];

export function PaintEstimator() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSpace, setSelectedSpace] = useState<SpaceOption>(SPACES[1]!); // 2BHK default
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISHES[1]!); // Premium
  const [selectedCondition, setSelectedCondition] = useState<ConditionOption>(CONDITIONS[1]!); // Fresh Plaster
  const [selectedTone, setSelectedTone] = useState<ToneOption>(TONES[0]!); // Warm Linen Cream

  // Calculate Liters: (sqft / 115 sqft per liter per 2 coats) * conditionMultiplier
  const baseLiters = Math.ceil((selectedSpace.sqft / 115) * selectedCondition.multiplier);
  const totalLiters = Math.max(3, baseLiters);

  // Price estimate (Standard ~ ₹285/L, Premium Birla Opus ~ ₹415/L, Bulk 20L ~ ₹235/L)
  const baseRatePerLiter =
    selectedFinish.id === "premium" ? 415 : selectedFinish.id === "bulk-drum" ? 235 : 285;
  const estimatedMin = Math.round((totalLiters * baseRatePerLiter * 0.95) / 100) * 100;
  const estimatedMax = Math.round((totalLiters * baseRatePerLiter * 1.08) / 100) * 100;

  // Percentage filled based on step (28% -> 52% -> 78% -> 100%)
  const tinFillPercentage =
    currentStep === 1 ? 28 : currentStep === 2 ? 52 : currentStep === 3 ? 78 : 100;

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedSpace(SPACES[0]!);
    setSelectedFinish(FINISHES[1]!);
    setSelectedCondition(CONDITIONS[0]!);
    setSelectedTone(TONES[0]!);
  };

  return (
    <section className="pt-6 sm:pt-[50px] pb-6 sm:pb-0 px-3 sm:px-7 lg:px-10 mx-auto max-w-[1360px] w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-12">
        <span className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.24em] text-accent block mb-1">
          &mdash; INSTANT PAINT CALCULATOR &mdash;
        </span>
        <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-primary">
          Precision Paint Estimator
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground tracking-wide leading-relaxed max-w-2xl mx-auto">
          Calculate exact paint liters, primer requirements, and budget estimates tailored to your project.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE ONE-PAGE ESTIMATOR (< lg): Fits completely on 1 screen, 0 scrolling */}
      {/* ========================================================================= */}
      <div className="block lg:hidden rounded-2xl bg-white border border-stone-200/90 shadow-md p-3 sm:p-4">
        {/* Step Indicator Pills in 1 Single Line */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100/90 rounded-xl mb-3">
          {[
            { step: 1, label: "Space", val: selectedSpace.name.replace("Single ", "").split(" ")[0] },
            { step: 2, label: "Finish", val: selectedFinish.badge.replace("Birla ", "").split(" ")[0] },
            { step: 3, label: "Surface", val: selectedCondition.name.split(" ")[0] },
            { step: 4, label: "Shade", val: selectedTone.name.split(" ")[0], hex: selectedTone.hex },
          ].map(({ step, label, val, hex }) => {
            const isCurrent = currentStep === step;
            const isPassed = currentStep > step;
            return (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(step)}
                className={`py-1 px-0.5 rounded-lg text-center transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#1D4A38] text-white shadow-xs font-bold"
                    : isPassed
                    ? "bg-white text-emerald-800 font-semibold"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {hex && <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: hex }} />}
                  <span className="text-[0.6rem] uppercase tracking-wider block leading-tight">
                    0{step} {label}
                  </span>
                </div>
                <span className="text-[0.55rem] block opacity-85 mt-0.5 leading-tight whitespace-nowrap overflow-hidden">
                  {val}
                </span>
              </button>
            );
          })}
        </div>

        {/* Step Content Area (Compact height ~155px) */}
        <div className="min-h-[155px] flex flex-col justify-center">
          {/* Step 1: Space */}
          {currentStep === 1 && (
            <div className="grid grid-cols-2 gap-1.5">
              {SPACES.map((space) => {
                const Icon = space.icon;
                const isSelected = selectedSpace.id === space.id;
                const isCommercial = space.id === "commercial";
                return (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => {
                      setSelectedSpace(space);
                      setCurrentStep(2);
                    }}
                    className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                      isCommercial ? "col-span-2" : ""
                    } ${
                      isSelected
                        ? "bg-[#1D4A38] text-white border-[#1D4A38] shadow-xs"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-900 border-stone-200/80"
                    }`}
                  >
                    <div
                      className={`size-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-white text-stone-700 border border-stone-200"
                      }`}
                    >
                      <Icon className="size-3" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[0.66rem] font-bold leading-tight break-words">
                        {space.name}
                      </span>
                      <span
                        className={`block text-[0.55rem] font-mono leading-tight mt-0.5 ${
                          isSelected ? "text-white/75" : "text-stone-500"
                        }`}
                      >
                        {space.subtitle.split("•")[0]?.trim()}
                      </span>
                    </div>
                    {isSelected && <Check className="size-3 stroke-[3] shrink-0 text-white" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2: Finish */}
          {currentStep === 2 && (
            <div className="space-y-1.5">
              {FINISHES.map((finish) => {
                const isSelected = selectedFinish.id === finish.id;
                return (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => {
                      setSelectedFinish(finish);
                      setCurrentStep(3);
                    }}
                    className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-[#1D4A38] text-white border-[#1D4A38] shadow-xs"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-900 border-stone-200/80"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[0.58rem] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                            isSelected ? "bg-white/20 text-white" : "bg-stone-200 text-stone-700"
                          }`}
                        >
                          {finish.badge}
                        </span>
                        <strong className="text-[0.72rem] font-bold truncate">
                          {finish.name.split("—")[0]?.trim()}
                        </strong>
                      </div>
                      <p
                        className={`text-[0.6rem] truncate mt-0.5 ${
                          isSelected ? "text-white/80" : "text-stone-500"
                        }`}
                      >
                        {finish.type.split("•")[0]?.trim()}
                      </p>
                    </div>
                    {isSelected && <Check className="size-3.5 stroke-[3] shrink-0 text-white" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 3: Condition */}
          {currentStep === 3 && (
            <div className="space-y-2">
              {CONDITIONS.map((cond) => {
                const isSelected = selectedCondition.id === cond.id;
                return (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => {
                      setSelectedCondition(cond);
                      setCurrentStep(4);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-[#1D4A38] text-white border-[#1D4A38] shadow-xs"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-900 border-stone-200/80"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <strong className="block text-[0.78rem] font-bold leading-tight">
                        {cond.name}
                      </strong>
                      <p
                        className={`text-[0.62rem] mt-0.5 ${
                          isSelected ? "text-white/80" : "text-stone-500"
                        }`}
                      >
                        {cond.desc.split("•")[0]?.trim()}
                      </p>
                    </div>
                    {isSelected && <Check className="size-3.5 stroke-[3] shrink-0 text-white" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 4: Shade */}
          {currentStep === 4 && (
            <div className="grid grid-cols-4 gap-1.5">
              {TONES.map((tone) => {
                const isSelected = selectedTone.id === tone.id;
                return (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => setSelectedTone(tone)}
                    className={`p-1 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "border-stone-900 ring-2 ring-stone-900/20 bg-stone-50 shadow-xs"
                        : "border-stone-200 hover:border-stone-300 bg-white"
                    }`}
                  >
                    <span
                      className="h-6 w-full rounded-lg block shadow-2xs border border-black/10 relative"
                      style={{ backgroundColor: tone.hex }}
                    >
                      {isSelected && (
                        <Check className="size-2.5 stroke-[3] text-white absolute inset-0 m-auto drop-shadow-xs" />
                      )}
                    </span>
                    <span className="block text-[0.52rem] font-mono uppercase text-stone-400 mt-0.5 truncate">
                      {tone.code}
                    </span>
                    <strong className="block text-[0.6rem] font-bold text-stone-900 truncate">
                      {tone.name.split(" ")[0]}
                    </strong>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Compact Estimate Bar & Action Buttons */}
        <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[0.62rem] text-stone-500">Volume:</span>
              <strong className="font-mono font-bold text-xs text-amber-900">~{totalLiters}L</strong>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[0.62rem] text-stone-500">Est. Price:</span>
              <strong className="font-serif font-bold text-xs sm:text-sm text-stone-900">
                ₹{estimatedMin.toLocaleString("en-IN")} – ₹{estimatedMax.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded-full text-[0.65rem] font-medium border border-stone-300 text-stone-600 bg-white cursor-pointer hover:bg-stone-50"
              >
                Back
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((p) => Math.min(4, p + 1))}
                className="px-3.5 py-1.5 rounded-full text-[0.68rem] font-bold bg-[#1D4A38] text-white shadow-xs cursor-pointer hover:bg-[#15382b]"
              >
                Next
              </button>
            ) : (
              <Button
                size="sm"
                asChild
                className="rounded-full text-[0.68rem] font-bold bg-[#E03A00] hover:bg-[#c83400] text-white h-7 px-3.5 shadow-xs"
              >
                <a
                  href={`https://wa.me/919443722255?text=Hello%20Akshara%20Paints,%20I%20used%20your%20Instant%20Paint%20Calculator:%0A- Space: ${encodeURIComponent(selectedSpace.name)}%0A- Finish: ${encodeURIComponent(selectedFinish.name)}%0A- Condition: ${encodeURIComponent(selectedCondition.name)}%0A- Shade: ${encodeURIComponent(selectedTone.name)} (${selectedTone.code})%0A- Est. Volume: ~${totalLiters}L%0A- Est. Price: ₹${estimatedMin.toLocaleString("en-IN")} - ₹${estimatedMax.toLocaleString("en-IN")}%0APlease provide an official quote.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Quote &rarr;</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP STUDIO CALCULATOR (≥ lg): Full 2-column showcase layout            */}
      {/* ========================================================================= */}
      <div className="hidden lg:block w-full rounded-3xl bg-white border border-stone-200/90 shadow-xl overflow-hidden">
        {/* Top 4-Step Interactive Studio Stepper */}
        <div className="py-2.5 px-3 sm:py-3 sm:px-4 bg-gradient-to-b from-stone-50 via-stone-50/50 to-white border-b border-stone-200/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full items-stretch">
            {[
              {
                step: 1,
                label: "Space",
                preview: selectedSpace.name,
              },
              {
                step: 2,
                label: "Finish",
                preview: selectedFinish.badge.replace("Birla ", ""),
              },
              {
                step: 3,
                label: "Surface",
                preview: selectedCondition.name.split("/")[0].trim(),
              },
              {
                step: 4,
                label: "Shade",
                preview: selectedTone.name,
                hex: selectedTone.hex,
              },
            ].map(({ step, label, preview, hex }) => {
              const isPassed = currentStep > step;
              const isCurrent = currentStep === step;

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCurrentStep(step)}
                  className={`text-left group cursor-pointer focus:outline-none transition-all duration-200 rounded-2xl p-2.5 sm:px-3 sm:py-2.5 flex items-center gap-2.5 sm:gap-3 border h-[64px] w-full min-w-0 ${
                    isCurrent
                      ? "bg-[#1D4A38] text-white shadow-sm border-[#1D4A38]"
                      : isPassed
                      ? "bg-white text-stone-900 border-emerald-200 shadow-2xs hover:border-emerald-300 hover:bg-emerald-50/30"
                      : "bg-white text-stone-400 border-stone-200 shadow-2xs hover:text-stone-700 hover:border-stone-300"
                  }`}
                >
                  <div
                    className={`size-7 sm:size-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs transition-all ${
                      isCurrent
                        ? "bg-white text-[#1D4A38] border border-white/20 shadow-sm font-extrabold"
                        : isPassed
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-stone-100 text-stone-500 border border-stone-200/80 group-hover:bg-stone-200 group-hover:text-stone-800"
                    }`}
                  >
                    {isPassed ? (
                      <Check className="size-3.5 stroke-[3]" />
                    ) : (
                      <span>0{step}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] block leading-tight ${
                          isCurrent
                            ? "text-white font-bold"
                            : isPassed
                            ? "text-stone-900"
                            : "text-stone-500 group-hover:text-stone-800"
                        }`}
                      >
                        {label}
                      </span>
                      {isCurrent && (
                        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {hex && (
                        <span
                          className="size-2 rounded-full shrink-0 border border-black/20"
                          style={{ backgroundColor: hex }}
                        />
                      )}
                      <span
                        className={`text-[10px] sm:text-[11px] truncate block ${
                          isCurrent
                            ? "text-white/85 font-medium"
                            : isPassed
                            ? "text-emerald-700 font-semibold"
                            : "text-stone-400 font-normal"
                        }`}
                      >
                        {preview}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Desktop Body */}
        <div className="flex flex-row items-stretch w-full min-h-[420px]">
          {/* Left Column: Interactive Wizard Steps (56% width) */}
          <div className="w-[56%] py-6 px-8 flex flex-col justify-between min-w-0">
            <div>
              {/* Step 1: Space */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in min-h-[430px] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent block">
                      TAP 1 OF 4
                    </span>
                    <h3 className="font-serif text-[30px] text-[#0A2234] font-normal tracking-tight mt-1">
                      Which space are you painting?
                    </h3>
                    <p className="text-[13.5px] text-stone-500 mt-1">
                      Choose the area to calculate square footage and coverage requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {SPACES.map((space) => {
                      const Icon = space.icon;
                      const isSelected = selectedSpace.id === space.id;
                      const isCommercial = space.id === "commercial";
                      return (
                        <button
                          key={space.id}
                          type="button"
                          onClick={() => {
                            setSelectedSpace(space);
                            setCurrentStep(2);
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 h-[118px] ${
                            isSelected
                              ? "bg-[#1D4A38] border-[#1D4A38] text-white shadow-md"
                              : "bg-[#FAF9F6] hover:bg-[#F4F2EC] border-[#E8E6E0] hover:border-stone-300 text-stone-900"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`size-8 rounded-xl flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? "bg-[#295F4A] border border-white/10 text-white shadow-inner"
                                    : isCommercial
                                    ? "bg-amber-100 text-amber-900 border border-amber-200"
                                    : "bg-white text-stone-700 border border-stone-200 shadow-2xs"
                                }`}
                              >
                                <Icon className="size-4" />
                              </div>
                              {isCommercial && (
                                <span
                                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                    isSelected
                                      ? "bg-[#295F4A] text-white border border-white/15"
                                      : "bg-amber-100 text-amber-900 border border-amber-200"
                                  }`}
                                >
                                  Bulk Site &amp; Contractor Spec
                                </span>
                              )}
                            </div>
                            <div
                              className={`size-7 rounded-full shrink-0 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-white text-[#1D4A38] shadow-sm"
                                  : "bg-white border border-stone-300 shadow-sm"
                              }`}
                            >
                              {isSelected ? (
                                <Check className="size-4 stroke-[3]" />
                              ) : null}
                            </div>
                          </div>
                          <div>
                            <strong
                              className={`block text-base font-bold tracking-tight leading-tight ${
                                isSelected ? "text-white" : "text-stone-900"
                              }`}
                            >
                              {space.name}
                            </strong>
                            <span
                              className={`block text-[11px] mt-0.5 font-mono ${
                                isSelected ? "text-white/80" : "text-stone-500"
                              }`}
                            >
                              {space.subtitle}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Finish */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in min-h-[430px] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent block">
                      TAP 2 OF 4
                    </span>
                    <h3 className="font-serif text-[30px] text-[#0A2234] font-normal tracking-tight mt-1">
                      Which finish formulation?
                    </h3>
                    <p className="text-[13.5px] text-stone-500 mt-1">
                      Pick between trade-grade durable emulsion or Birla Opus designer luxury.
                    </p>
                  </div>

                  <div className="space-y-3 pt-1.5">
                    {FINISHES.map((finish) => {
                      const isSelected = selectedFinish.id === finish.id;
                      const isPremium = finish.id === "premium";
                      const isBulk = finish.id === "bulk-drum";

                      return (
                        <button
                          key={finish.id}
                          type="button"
                          onClick={() => {
                            setSelectedFinish(finish);
                            setCurrentStep(3);
                          }}
                          className={`w-full px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3.5 h-[78px] ${
                            isSelected
                              ? "bg-[#1D4A38] border-[#1D4A38] text-white shadow-md ring-1 ring-[#1D4A38]/30"
                              : "bg-[#FAF9F6] hover:bg-[#F4F2EC] border-[#E8E6E0] hover:border-stone-300 text-stone-900"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div
                              className={`size-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-[#295F4A] border border-white/10 text-white shadow-inner"
                                  : isPremium
                                  ? "bg-amber-100 text-amber-900 border border-amber-200"
                                  : isBulk
                                  ? "bg-blue-100 text-blue-900 border border-blue-200"
                                  : "bg-stone-100 text-stone-700 border border-stone-200"
                              }`}
                            >
                              {isPremium ? (
                                <Sparkles className="size-4.5" />
                              ) : isBulk ? (
                                <Truck className="size-4.5" />
                              ) : (
                                <Shield className="size-4.5" />
                              )}
                            </div>

                            <div className="space-y-0.5 min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`inline-block px-2 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                                    isSelected
                                      ? "bg-[#295F4A] border border-white/15 text-white"
                                      : "bg-stone-200/90 text-stone-700"
                                  }`}
                                >
                                  {finish.badge}
                                </span>
                                <strong
                                  className={`block text-sm font-bold tracking-tight truncate ${
                                    isSelected ? "text-white" : "text-stone-900"
                                  }`}
                                >
                                  {finish.name}
                                </strong>
                              </div>
                              <p
                                className={`text-xs leading-tight truncate ${
                                  isSelected ? "text-white/80" : "text-stone-500"
                                }`}
                              >
                                {finish.type}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`size-7 rounded-full shrink-0 flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-white text-[#1D4A38] shadow-sm"
                                : "bg-white border border-stone-300 shadow-sm"
                            }`}
                          >
                            {isSelected ? (
                              <Check className="size-4 stroke-[3]" />
                            ) : null}
                          </div>
                        </button>
                      );
                    })}

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 text-xs text-stone-700 mt-3 space-y-2.5">
                      <div className="flex items-center justify-between font-mono font-semibold text-[10.5px] uppercase text-stone-500 tracking-wider">
                        <span>Formulation Specification</span>
                        <span className="text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-bold text-[10px]">
                          {selectedFinish.badge}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                          <span className="text-[9.5px] text-stone-400 font-mono block uppercase">Scrub Durability</span>
                          <strong className="text-stone-900 text-xs font-semibold block mt-0.5 truncate">
                            Class 1 (10,000+ Wash)
                          </strong>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                          <span className="text-[9.5px] text-stone-400 font-mono block uppercase">Surface Sheen</span>
                          <strong className="text-stone-900 text-xs font-semibold block mt-0.5 truncate">
                            Velvet Satin Luxury
                          </strong>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                          <span className="text-[9.5px] text-stone-400 font-mono block uppercase">Warranty</span>
                          <strong className="text-stone-900 text-xs font-semibold block mt-0.5 truncate">
                            5-Yr Verified
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Condition */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in min-h-[430px] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent block">
                      TAP 3 OF 4
                    </span>
                    <h3 className="font-serif text-[30px] text-[#0A2234] font-normal tracking-tight mt-1">
                      What is the wall condition?
                    </h3>
                    <p className="text-[13.5px] text-stone-500 mt-1">
                      Fresh plaster absorbs more paint and requires primer, while repainting needs less.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {CONDITIONS.map((cond) => {
                      const isSelected = selectedCondition.id === cond.id;
                      const isRepaint = cond.id === "repaint";

                      return (
                        <button
                          key={cond.id}
                          type="button"
                          onClick={() => {
                            setSelectedCondition(cond);
                            setCurrentStep(4);
                          }}
                          className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                            isSelected
                              ? "bg-[#1D4A38] border-[#1D4A38] text-white shadow-md ring-1 ring-[#1D4A38]/30"
                              : "bg-[#FAF9F6] hover:bg-[#F4F2EC] border-[#E8E6E0] hover:border-stone-300 text-stone-900"
                          }`}
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div
                              className={`size-13 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-[#295F4A] border border-white/10 shadow-inner"
                                  : isRepaint
                                  ? "bg-[#FEF9EE] border border-[#F5E8C7]"
                                  : "bg-[#EAF3EE] border border-[#D0E2D7]"
                              }`}
                            >
                              {isRepaint ? (
                                <PaintRollerIcon
                                  isSelected={isSelected}
                                  className="size-8"
                                />
                              ) : (
                                <BrickWallIcon
                                  isSelected={isSelected}
                                  className="size-7"
                                />
                              )}
                            </div>

                            <div className="space-y-0.5 min-w-0 flex-1">
                              <strong
                                className={`block text-base font-bold tracking-tight ${
                                  isSelected ? "text-white" : "text-stone-900"
                                }`}
                              >
                                {cond.name}
                              </strong>
                              <p
                                className={`text-[13px] leading-snug ${
                                  isSelected ? "text-white/80" : "text-stone-500"
                                }`}
                              >
                                {cond.desc}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`size-7 rounded-full shrink-0 flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-white text-[#1D4A38] shadow-sm"
                                : "bg-white border border-stone-300 shadow-sm"
                            }`}
                          >
                            {isSelected ? (
                              <Check className="size-4 stroke-[3]" />
                            ) : null}
                          </div>
                        </button>
                      );
                    })}

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 text-xs text-stone-700 mt-3 space-y-2.5">
                      <div className="flex items-center justify-between font-mono font-semibold text-[10.5px] uppercase text-stone-500 tracking-wider">
                        <span>Application Protocol</span>
                        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                          {selectedCondition.id === "fresh" ? "Primer Mandatory" : "Direct Topcoat"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                          <span className="text-[10px] text-stone-400 font-mono block uppercase">Coating Protocol</span>
                          <strong className="text-stone-900 text-xs font-semibold block mt-0.5">
                            {selectedCondition.id === "fresh"
                              ? "1 Coat Primer Sealer + 2 Topcoats"
                              : "2 Coats Direct Topcoat"}
                          </strong>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                          <span className="text-[10px] text-stone-400 font-mono block uppercase">Optimal Coverage</span>
                          <strong className="text-stone-900 text-xs font-semibold block mt-0.5">
                            {selectedCondition.id === "fresh"
                              ? "90 – 110 sq.ft / Liter"
                              : "120 – 140 sq.ft / Liter"}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Shade */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-fade-in min-h-[430px] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent block">
                      TAP 4 OF 4 &bull; FINAL STEP
                    </span>
                    <h3 className="font-serif text-[30px] text-[#0A2234] font-normal tracking-tight mt-1">
                      Which shade palette?
                    </h3>
                    <p className="text-[13.5px] text-stone-500 mt-1">
                      Select your intended shade to tint your batch in our computerized lab.
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-3 pt-2">
                    {TONES.map((tone) => {
                      const isSelected = selectedTone.id === tone.id;
                      return (
                        <button
                          key={tone.id}
                          type="button"
                          onClick={() => setSelectedTone(tone)}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-white border-2 border-stone-900 ring-4 ring-stone-900/10 shadow-md scale-[1.02]"
                              : "bg-[#FAF9F6] hover:bg-white border-[#E8E6E0] hover:border-stone-300 text-stone-900 shadow-2xs"
                          }`}
                        >
                          <div className="relative">
                            <span
                              className="h-12 w-full rounded-lg block mb-2 shadow-xs border border-black/15 ring-1 ring-black/5"
                              style={{ backgroundColor: tone.hex }}
                            />
                            {isSelected && (
                              <span className="absolute top-1.5 right-1.5 size-5 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-md font-bold">
                                <Check className="size-3 stroke-[3]" />
                              </span>
                            )}
                          </div>
                          <span
                            className={`block text-[10px] font-mono uppercase font-semibold ${
                              isSelected ? "text-amber-800 font-bold" : "text-stone-400"
                            }`}
                          >
                            {tone.code}
                          </span>
                          <strong
                            className={`block text-xs font-bold truncate mt-0.5 ${
                              isSelected ? "text-stone-950 font-extrabold" : "text-stone-800"
                            }`}
                          >
                            {tone.name}
                          </strong>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/90 flex items-center justify-between text-xs mt-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-amber-600 shrink-0" />
                      <span className="text-[11.5px] text-stone-600">
                        <strong>Official Computerized Tinting:</strong> Zero tinting charges &bull; Exact formula match
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                      100% Match
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="size-3" />
                <span>Start Over</span>
              </button>

              <div className="flex items-center gap-2">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                    className="rounded-full text-xs cursor-pointer border-stone-300 text-stone-700 hover:bg-stone-100 h-8 px-3.5"
                  >
                    Back
                  </Button>
                )}

                {currentStep < 4 ? (
                  <Button
                    size="sm"
                    onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                    className="rounded-full text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white h-8 px-4 cursor-pointer"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    asChild
                    className="rounded-full text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white h-8 px-4 cursor-pointer shadow-sm transition-all duration-200"
                  >
                    <Link to="/contact" className="inline-flex items-center gap-1.5">
                      <span>Get Official Quote</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Studio Showcase & Output (44% width) */}
          <div className="w-[44%] bg-stone-50 border-l border-stone-200 py-6 px-7 flex flex-col justify-between gap-4 min-w-0">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 shrink-0">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                Automated Tin Fill
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200 shadow-2xs">
                {tinFillPercentage}% Complete
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-200/90 w-full min-h-[300px] flex-1 flex flex-col justify-end bg-stone-200 group">
              <img
                src={selectedTone.roomImage}
                alt={selectedTone.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />

              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10.5px] font-mono tracking-wider uppercase border border-white/20 shadow-sm select-none">
                  <span
                    className="size-2 rounded-full border border-white/60 shadow-xs"
                    style={{ backgroundColor: selectedTone.hex }}
                  />
                  <span>{selectedTone.code}</span>
                </span>
              </div>

              <div className="relative z-10 p-4 text-white">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="size-2.5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: selectedTone.hex }}
                  />
                  <span className="text-[10.5px] font-mono tracking-widest uppercase font-bold text-amber-300">
                    PAINTING IN
                  </span>
                </div>
                <h4 className="text-2xl font-serif font-medium leading-tight drop-shadow-md">
                  {selectedTone.name}
                </h4>
                <p className="text-xs text-white/80 mt-0.5 font-sans leading-normal">
                  Birla Opus &bull; {selectedFinish.name} &bull; {selectedSpace.name}
                </p>
              </div>
            </div>

            <div className="rounded-xl p-3.5 bg-white border border-stone-200 shadow-sm space-y-2 shrink-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Required Volume:</span>
                <strong className="font-mono font-bold text-amber-800 text-sm">
                  ~{totalLiters} Liters
                  {totalLiters >= 20 && (
                    <span className="text-[11px] font-normal text-stone-500 ml-1">
                      ({Math.ceil(totalLiters / 20)} × 20L drums)
                    </span>
                  )}
                </strong>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-stone-100 pt-2">
                <span className="text-stone-500">Estimated Price:</span>
                <strong className="text-lg font-serif font-bold text-stone-900 tracking-tight">
                  ₹{estimatedMin.toLocaleString("en-IN")} &ndash; ₹{estimatedMax.toLocaleString("en-IN")}*
                </strong>
              </div>

              <p className="text-[10px] text-stone-400 text-center border-t border-stone-100 pt-1 leading-normal">
                *Includes GST &bull; 2-coat full opacity guarantee &bull; Same-day dispatch
              </p>
            </div>

            <div className="mt-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center shrink-0">
                  <Truck className="size-3.5" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-stone-900 leading-tight">
                    Bulk Site Supply &bull; 4-Hr Dispatch
                  </h5>
                  <p className="text-[9.5px] text-stone-500 leading-tight">
                    GST Invoices &bull; Contractor Credit Terms
                  </p>
                </div>
              </div>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-white hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300 transition-colors shadow-2xs"
              >
                <PhoneCall className="size-3" />
                Trade Desk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
