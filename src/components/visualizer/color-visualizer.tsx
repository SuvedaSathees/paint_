import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  Paintbrush,
  CheckCircle2,
  X,
} from "lucide-react";
import { CanvasWorkspace } from "./canvas-workspace";
import { ColorPaletteDrawer } from "./color-palette-drawer";
import { BIRLA_OPUS_COLORS, PaintColor } from "./color-data";
import { Button } from "@/components/ui/button";

export function ColorVisualizer() {
  const [selectedColor, setSelectedColor] = useState<PaintColor>(BIRLA_OPUS_COLORS[4]); // Tuscan Ochre
  const [activeImage, setActiveImage] = useState<string>("");
  const [autoFillTrigger, setAutoFillTrigger] = useState<number>(0);

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
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 py-4 space-y-5">
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

      {/* Neat & Simple Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200/80 rounded-2xl px-4 sm:px-6 py-3.5 shadow-xs">
        <div>
          <h1 className="font-display text-lg sm:text-xl font-bold text-stone-900 leading-tight">
            Virtual Wall Color Visualizer
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Upload room photo &bull; Pick Birla Opus shade &bull; Tap wall to paint
          </p>
        </div>

        {/* Primary Actions: Upload & Camera */}
        <div className="flex items-center gap-2.5 shrink-0">
          {activeImage && (
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              Room Photo Ready
            </span>
          )}

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl bg-[#F05323] hover:bg-[#E04006] text-white font-bold text-xs h-9 px-4 shadow-xs gap-2 cursor-pointer"
          >
            <Upload className="size-3.5" />
            <span>{activeImage ? "Change Photo" : "Upload Photo"}</span>
          </Button>

          <Button
            onClick={handleCameraTrigger}
            variant="outline"
            className="rounded-xl border-stone-200 hover:bg-stone-50 text-stone-800 font-bold text-xs h-9 px-4 gap-2 cursor-pointer"
          >
            <Camera className="size-3.5 text-stone-600" />
            <span>Camera</span>
          </Button>
        </div>
      </div>

      {/* Main Workspace: Canvas (Left 8 cols) + Color Palette (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ROOM CANVAS (8 COLS) */}
        <div className="lg:col-span-8 bg-white border border-stone-200/80 rounded-2xl p-3 sm:p-4 shadow-xs">
          {activeImage ? (
            <CanvasWorkspace
              imageSrc={activeImage}
              selectedColor={selectedColor}
              autoFillTrigger={autoFillTrigger}
              onImageChange={handleCustomImageChange}
              onOpenEstimate={() => setEstimateModalOpen(true)}
            />
          ) : (
            /* Minimalist Empty State when no photo uploaded yet */
            <div className="flex flex-col items-center justify-center p-8 sm:p-16 text-center rounded-xl border-2 border-dashed border-stone-200 bg-stone-50/50 min-h-[460px]">
              <div className="size-16 rounded-2xl bg-[#FFF0EB] text-[#F05323] flex items-center justify-center shadow-2xs mb-4">
                <Upload className="size-8 stroke-[2.2]" />
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-stone-900">
                Upload or Snap Your Room Photo
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm max-w-sm mt-1.5 mb-6 leading-relaxed">
                Take a picture of your room or upload any wall photo to start testing Birla Opus colors.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl bg-[#F05323] hover:bg-[#E04006] text-white font-bold text-xs h-10 px-6 shadow-xs gap-2 cursor-pointer"
                >
                  <Upload className="size-4" />
                  <span>Upload Room Photo</span>
                </Button>
                <Button
                  onClick={handleCameraTrigger}
                  variant="outline"
                  className="rounded-xl border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs h-10 px-6 gap-2 cursor-pointer"
                >
                  <Camera className="size-4" />
                  <span>Take Photo with Camera</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* COLOR PALETTE (4 COLS) */}
        <div className="lg:col-span-4 space-y-3.5 lg:sticky lg:top-24">
          {/* Active Shade & 1-Click Paint Action */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-3.5 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="size-12 rounded-xl border border-black/15 shadow-sm shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-stone-900 text-sm truncate">
                    {selectedColor.name}
                  </h3>
                  <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-mono font-bold text-stone-700 shrink-0">
                    {selectedColor.code}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                  {selectedColor.sheen} &bull; {selectedColor.product}
                </p>
              </div>
            </div>

            {/* Quick 1-Click Fill Button */}
            <Button
              onClick={handleTriggerAutoFill}
              disabled={!activeImage}
              className="w-full h-9 rounded-xl bg-gradient-to-r from-[#F05323] to-[#E04006] hover:from-[#E04006] hover:to-[#C23500] disabled:opacity-50 text-white font-bold text-xs shadow-xs cursor-pointer gap-2"
            >
              <Paintbrush className="size-3.5" />
              <span>Apply Color to Main Wall</span>
            </Button>
            <p className="text-center text-[11px] text-stone-400 font-medium">
              {activeImage
                ? "Tap any wall on the canvas to paint"
                : "Upload a room photo to start painting"}
            </p>
          </div>

          {/* Color Palette Drawer */}
          <ColorPaletteDrawer
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
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
