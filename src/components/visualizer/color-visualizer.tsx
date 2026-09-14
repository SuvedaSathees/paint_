import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  Paintbrush,
  CheckCircle2,
  Download,
  X,
} from "lucide-react";
import { CanvasWorkspace } from "./canvas-workspace";
import { ColorPaletteDrawer } from "./color-palette-drawer";
import { BIRLA_OPUS_COLORS, PaintColor } from "./color-data";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

export const SAMPLE_ROOMS = [
  {
    id: "living-sage",
    name: "Living Room",
    src: "/room-sage.jpg",
    icon: "🛋️",
  },
  {
    id: "master-linen",
    name: "Master Suite",
    src: "/room-linen.jpg",
    icon: "🛏️",
  },
  {
    id: "accent-rose",
    name: "Accent Lounge",
    src: "/room-rose.jpg",
    icon: "🌸",
  },
  {
    id: "dining-forest",
    name: "Dining Room",
    src: "/room-forest.jpg",
    icon: "🌿",
  },
  {
    id: "terracotta-study",
    name: "Villa Study",
    src: "/room-terracotta.jpg",
    icon: "🏛️",
  },
  {
    id: "ocean-suite",
    name: "Waterfront Suite",
    src: "/room-ocean.jpg",
    icon: "🌊",
  },
];

export function ColorVisualizer() {
  const [selectedColor, setSelectedColor] = useState<PaintColor>(BIRLA_OPUS_COLORS[4]); // Tuscan Ochre
  const [activeImage, setActiveImage] = useState<string>(SAMPLE_ROOMS[0].src);
  const [autoFillTrigger, setAutoFillTrigger] = useState<number>(0);
  const [saveTrigger, setSaveTrigger] = useState<number>(0);

  // Hidden file & camera inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mobileCameraInputRef = useRef<HTMLInputElement>(null);

  // Webcam modal state
  const [showWebcamModal, setShowWebcamModal] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const webcamVideoRef = useRef<HTMLVideoElement>(null);

  // Estimator Dialog State
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);
  const [roomLength, setRoomLength] = useState(14);
  const [roomWidth, setRoomWidth] = useState(12);
  const [roomHeight, setRoomHeight] = useState(10);
  const [coatCount, setCoatCount] = useState(2);

  const handleCustomImageChange = (newSrc: string) => {
    setActiveImage(newSrc);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) {
        handleCustomImageChange(res);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const startWebcam = async () => {
    setWebcamError(null);
    setShowWebcamModal(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      setWebcamStream(stream);
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = stream;
        webcamVideoRef.current.play();
      }
    } catch (err) {
      console.warn("Camera access error:", err);
      setWebcamError("Camera access was denied or is unavailable. Please upload a photo instead.");
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
      setWebcamStream(null);
    }
    setShowWebcamModal(false);
  };

  const captureWebcamPhoto = () => {
    const video = webcamVideoRef.current;
    if (!video) return;

    const captureCanvas = document.createElement("canvas");
    captureCanvas.width = video.videoWidth || 1280;
    captureCanvas.height = video.videoHeight || 720;
    const cCtx = captureCanvas.getContext("2d");
    if (cCtx) {
      cCtx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
      const dataUrl = captureCanvas.toDataURL("image/jpeg", 0.95);
      handleCustomImageChange(dataUrl);
      stopWebcam();
    }
  };

  const handleCameraTrigger = () => {
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      mobileCameraInputRef.current?.click();
    } else {
      startWebcam();
    }
  };

  const handleTriggerAutoFill = () => {
    setAutoFillTrigger((prev) => prev + 1);
  };

  const handleSavePhoto = () => {
    setSaveTrigger((prev) => prev + 1);
  };

  // Instant 1-Tap Color Selection and Wall Painting
  const handleSelectColorAndPaint = (color: PaintColor) => {
    setSelectedColor(color);
    setAutoFillTrigger((prev) => prev + 1);

    // On mobile devices, smoothly scroll up to the canvas so the user instantly sees the painted room
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const el = document.getElementById("canvas-stage-wrapper");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  // Paint calculation
  const totalWallArea = Math.round(2 * (roomLength + roomWidth) * roomHeight * 0.85);
  const coveragePerLiter = 125;
  const litersNeeded = Math.ceil((totalWallArea * coatCount) / coveragePerLiter);
  const estimatedCost = litersNeeded * 380;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Akshara Paints! I just visualized my room using your Virtual Wall Visualizer.\n\n` +
        `• Selected Shade: Birla Opus ${selectedColor.name} (${selectedColor.code})\n` +
        `• Finish: ${selectedColor.sheen}\n` +
        `• Estimated Area: ${totalWallArea} sq.ft (${litersNeeded} Liters)\n\n` +
        `Please provide a quotation and trial availability in Erode.`
    );
    window.open(`https://wa.me/919443722255?text=${text}`, "_blank");
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2.5 sm:px-6 lg:px-8 py-2 sm:py-4 space-y-3 sm:space-y-4">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <input
        ref={mobileCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Elegant Architectural Header & Room Switcher Bar */}
      <div className="bg-white border border-stone-200/80 rounded-2xl p-2.5 sm:p-4 shadow-2xs space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#F05323] bg-[#FFF0EB] px-2 py-0.5 rounded-full">
                Birla Opus Studio
              </span>
              <span className="text-[10px] text-stone-400 font-mono hidden xs:inline">
                Real-Time Paint Simulator
              </span>
            </div>
            <h1 className="font-display font-serif text-base sm:text-2xl font-bold text-stone-900 leading-tight mt-0.5">
              Virtual Room Paint Studio
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
              className="rounded-full border-stone-200 hover:bg-stone-50 text-stone-800 font-bold text-xs h-8 px-3 gap-1.5 cursor-pointer shadow-2xs"
            >
              <Upload className="size-3.5 text-[#F05323]" />
              <span>Upload Photo</span>
            </Button>

            <Button
              onClick={handleCameraTrigger}
              variant="outline"
              size="sm"
              className="rounded-full border-stone-200 hover:bg-stone-50 text-stone-800 font-bold text-xs h-8 px-3 gap-1.5 cursor-pointer shadow-2xs"
            >
              <Camera className="size-3.5 text-stone-600" />
              <span>Camera</span>
            </Button>
          </div>
        </div>

        {/* Mobile 3-Step Simple Visual Guide */}
        <div className="flex sm:hidden items-center justify-between bg-stone-50 border border-stone-200/70 rounded-xl px-2.5 py-1.5 text-[10px] font-bold text-stone-600">
          <div className="flex items-center gap-1 text-[#F05323]">
            <span className="size-4 rounded-full bg-[#FFF0EB] text-[#F05323] flex items-center justify-center text-[9px] font-extrabold">1</span>
            <span>Camera / Upload</span>
          </div>
          <span className="text-stone-300">&bull;</span>
          <div className="flex items-center gap-1 text-[#F05323]">
            <span className="size-4 rounded-full bg-[#FFF0EB] text-[#F05323] flex items-center justify-center text-[9px] font-extrabold">2</span>
            <span>Pick Colour</span>
          </div>
          <span className="text-stone-300">&bull;</span>
          <div className="flex items-center gap-1 text-emerald-700">
            <span className="size-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[9px] font-extrabold">3</span>
            <span>Apply &amp; Save</span>
          </div>
        </div>

        {/* Mobile-Only Step 1: Camera or Upload */}
        <div className="flex sm:hidden items-center gap-2 pt-1 border-t border-stone-100">
          <button
            type="button"
            onClick={handleCameraTrigger}
            className="flex-1 h-10 rounded-xl bg-[#F05323] hover:bg-[#e04006] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-98 cursor-pointer"
          >
            <Camera className="size-4" />
            <span>Camera (Take Photo)</span>
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 font-bold text-xs flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <Upload className="size-4 text-[#F05323]" />
            <span>Upload Photo</span>
          </button>
        </div>

        {/* Desktop-Only Preset Room Switcher (Strictly hidden on mobile responsive) */}
        <div className="hidden sm:flex pt-1.5 border-t border-stone-100 items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 shrink-0 mr-0.5">
            Room:
          </span>
          {SAMPLE_ROOMS.map((room) => {
            const isCurrent = activeImage === room.src;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => handleCustomImageChange(room.src)}
                className={`h-7 sm:h-8 rounded-full px-2.5 sm:px-3 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                  isCurrent
                    ? "bg-[#071624] text-white border-[#071624] shadow-xs"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                <span>{room.icon}</span>
                <span>{room.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace: Canvas (Left 8 cols) + Color Palette (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 items-start">
        {/* ROOM CANVAS (8 COLS) */}
        <div className="lg:col-span-8 bg-white border border-stone-200/80 rounded-2xl p-2 sm:p-4 shadow-2xs">
          <CanvasWorkspace
            imageSrc={activeImage}
            selectedColor={selectedColor}
            autoFillTrigger={autoFillTrigger}
            saveTrigger={saveTrigger}
            onImageChange={handleCustomImageChange}
            onOpenEstimate={() => setEstimateModalOpen(true)}
          />
        </div>

        {/* COLOR PALETTE (4 COLS) */}
        <div className="lg:col-span-4 space-y-2.5 sm:space-y-3 lg:sticky lg:top-20">
          {/* Active Shade & 1-Click Paint Action */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-3 sm:p-3.5 shadow-2xs space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="size-10 sm:size-12 rounded-xl border border-black/15 shadow-xs shrink-0 ring-2 ring-black/5"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-stone-900 text-xs sm:text-sm truncate">
                      {selectedColor.name}
                    </h3>
                    <span className="rounded-full bg-stone-100 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold text-stone-700 shrink-0">
                      {selectedColor.code}
                    </span>
                  </div>
                  <p className="text-[10.5px] sm:text-[11px] text-stone-500 mt-0.5 truncate">
                    {selectedColor.sheen} &bull; {selectedColor.product}
                  </p>
                </div>
              </div>

              {/* Estimate Calculator button */}
              <button
                type="button"
                onClick={() => setEstimateModalOpen(true)}
                className="shrink-0 text-[10px] sm:text-[11px] font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                📐 Estimate
              </button>
            </div>

            {/* Quick Save Photo & WhatsApp Quote Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleSavePhoto}
                className="w-full h-10 sm:h-9 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs cursor-pointer gap-1.5 active:scale-98"
              >
                <Download className="size-4 text-white" />
                <span>Save Photo</span>
              </Button>

              <Button
                onClick={handleWhatsAppInquiry}
                variant="outline"
                className="w-full h-10 sm:h-9 rounded-full border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs shadow-2xs cursor-pointer gap-1.5 active:scale-98"
              >
                <WhatsAppIcon className="size-4" />
                <span>WhatsApp Quote</span>
              </Button>
            </div>

            {/* Quick Popular Shade Swatches: 1-Tap Instantly Paints the Wall */}
            <div className="pt-2 border-t border-stone-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-700 flex items-center gap-1">
                  <span>✨ Tap Any Color to Paint Room:</span>
                </span>
                <span className="text-[10px] text-stone-400 font-medium hidden xs:inline">
                  Instant Preview
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {BIRLA_OPUS_COLORS.slice(0, 10).map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => handleSelectColorAndPaint(color)}
                      className={`group flex flex-col items-center gap-1 shrink-0 p-1 rounded-xl transition-all cursor-pointer ${
                        isSelected ? "bg-[#FFF0EB] ring-2 ring-[#F05323]" : "hover:bg-stone-50"
                      }`}
                      title={`${color.name} (${color.code})`}
                    >
                      <div
                        className={`size-8 sm:size-7 rounded-full border border-black/15 shadow-xs transition-transform group-hover:scale-105 flex items-center justify-center ${
                          isSelected ? "ring-2 ring-[#F05323] ring-offset-1 scale-105 shadow-md" : ""
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && <CheckCircle2 className="size-4 text-white drop-shadow-md" />}
                      </div>
                      <span className="text-[10px] font-bold text-stone-700 truncate max-w-[56px] text-center leading-tight">
                        {color.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-center text-[10.5px] text-stone-400 font-medium">
            Tap any wall or tap any shade above to preview Birla Opus
          </p>

          {/* Color Palette Drawer */}
          <ColorPaletteDrawer
            selectedColor={selectedColor}
            onSelectColor={handleSelectColorAndPaint}
            onOpenEstimate={() => setEstimateModalOpen(true)}
          />
        </div>
      </div>

      {/* Desktop Live Camera Modal */}
      {showWebcamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-stone-900 p-5 sm:p-6 text-white shadow-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Camera className="size-5 text-[#F05323]" />
                <h3 className="font-display font-semibold text-base sm:text-lg">Take Room Photo</h3>
              </div>
              <button
                type="button"
                onClick={stopWebcam}
                className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {webcamError ? (
              <div className="rounded-2xl bg-rose-950/50 p-6 text-center border border-rose-800/40 my-4">
                <p className="text-sm text-rose-200">{webcamError}</p>
                <Button
                  onClick={() => {
                    stopWebcam();
                    fileInputRef.current?.click();
                  }}
                  className="mt-4 bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs"
                >
                  <Upload className="size-4 mr-2" /> Upload Photo Instead
                </Button>
              </div>
            ) : (
              <>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-white/10">
                  <video
                    ref={webcamVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-2xl flex items-center justify-center">
                    <span className="text-[11px] font-semibold text-white/70 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                      Point at your wall and capture
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <Button
                    onClick={captureWebcamPhoto}
                    size="lg"
                    className="rounded-full bg-[#F05323] hover:bg-[#E04006] text-white font-bold px-8 shadow-lg shadow-[#F05323]/30 cursor-pointer"
                  >
                    <Camera className="size-5 mr-2" /> Capture Wall Photo
                  </Button>
                  <Button
                    onClick={stopWebcam}
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Estimate Modal */}
      {estimateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="size-5 rounded-md border border-black/20"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <h3 className="font-display font-bold text-stone-900 text-base">
                  Paint Estimation: {selectedColor.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEstimateModalOpen(false)}
                className="rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Room Length (ft)</label>
                  <input
                    type="number"
                    min="6"
                    max="50"
                    value={roomLength}
                    onChange={(e) => setRoomLength(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-200 px-3 py-2 text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Room Width (ft)</label>
                  <input
                    type="number"
                    min="6"
                    max="50"
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-200 px-3 py-2 text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Ceiling Ht (ft)</label>
                  <input
                    type="number"
                    min="7"
                    max="20"
                    value={roomHeight}
                    onChange={(e) => setRoomHeight(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-200 px-3 py-2 text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Number of Coats</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCoatCount(2)}
                    className={`rounded-xl border py-2 font-semibold text-center cursor-pointer ${
                      coatCount === 2
                        ? "border-primary bg-primary text-white"
                        : "border-stone-200 hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    2 Coats (Standard)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoatCount(3)}
                    className={`rounded-xl border py-2 font-semibold text-center cursor-pointer ${
                      coatCount === 3
                        ? "border-primary bg-primary text-white"
                        : "border-stone-200 hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    3 Coats (Deep Tone / Fresh Wall)
                  </button>
                </div>
              </div>

              {/* Calculated Summary Box */}
              <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Net Wall Area:</span>
                  <span className="font-mono font-bold text-stone-900">{totalWallArea} sq.ft</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Recommended Product:</span>
                  <span className="font-semibold text-emerald-900">{selectedColor.product}</span>
                </div>
                <div className="flex items-center justify-between border-t border-stone-200/60 pt-2 text-sm">
                  <span className="font-bold text-stone-900">Total Paint Required:</span>
                  <span className="font-mono font-extrabold text-primary text-base">
                    {litersNeeded} Liters
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>Approximate Material Cost:</span>
                  <span className="font-mono font-semibold">₹{estimatedCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setEstimateModalOpen(false)}
                className="text-stone-600 cursor-pointer"
              >
                Close
              </Button>
              <Button
                onClick={handleWhatsAppInquiry}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
              >
                Book Paint Trial in Erode
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
