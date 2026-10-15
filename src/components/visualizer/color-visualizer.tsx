import React, { useState, useRef } from "react";
import { CanvasWorkspace } from "./canvas-workspace";
import { ColorPaletteDrawer } from "./color-palette-drawer";
import { BIRLA_OPUS_COLORS, PaintColor } from "./color-data";
import { whatsappLink } from "@/lib/store-info";

export const SAMPLE_ROOMS = [
  { id: "living-sage", name: "Living room", src: "/room-sage.jpg" },
  { id: "master-linen", name: "Bedroom", src: "/room-linen.jpg" },
  { id: "accent-rose", name: "Lounge", src: "/room-rose.jpg" },
  { id: "dining-forest", name: "Dining room", src: "/room-forest.jpg" },
  { id: "terracotta-study", name: "Study", src: "/room-terracotta.jpg" },
  { id: "ocean-suite", name: "Suite", src: "/room-ocean.jpg" },
];

const STEPS = [
  { title: "Pick a room", short: "Pick a room", text: "Use a sample room or upload a photo of your own wall." },
  { title: "Choose a colour", short: "Pick a colour", text: "Tap any Birla Opus shade — the main wall paints itself." },
  { title: "Tap to paint more", short: "Tap a wall", text: "Tap other walls, then use Before / After to compare." },
];

export function ColorVisualizer() {
  const [selectedColor, setSelectedColor] = useState<PaintColor>(BIRLA_OPUS_COLORS[4]);
  const [activeImage, setActiveImage] = useState<string>(SAMPLE_ROOMS[0].src);
  const [autoFillTrigger, setAutoFillTrigger] = useState<number>(0);
  const [saveTrigger, setSaveTrigger] = useState<number>(0);

  // Hidden file & camera inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mobileCameraInputRef = useRef<HTMLInputElement>(null);

  // Desktop webcam
  const [showWebcamModal, setShowWebcamModal] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const webcamVideoRef = useRef<HTMLVideoElement>(null);

  // Paint calculator
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);
  const [roomLength, setRoomLength] = useState(14);
  const [roomWidth, setRoomWidth] = useState(12);
  const [roomHeight, setRoomHeight] = useState(10);
  const [coatCount, setCoatCount] = useState(2);

  const isOwnPhoto = !SAMPLE_ROOMS.some((r) => r.src === activeImage);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) setActiveImage(res);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const startWebcam = async () => {
    setWebcamError(null);
    setShowWebcamModal(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      setWebcamStream(stream);
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = stream;
        webcamVideoRef.current.play();
      }
    } catch (err) {
      console.warn("Camera access error:", err);
      setWebcamError("We couldn’t open your camera. Please upload a photo instead.");
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
      setActiveImage(captureCanvas.toDataURL("image/jpeg", 0.95));
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

  // Picking a colour paints the main wall straight away
  const handleSelectColorAndPaint = (color: PaintColor) => {
    setSelectedColor(color);
    setAutoFillTrigger((prev) => prev + 1);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      document.getElementById("canvas-stage-wrapper")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Paint calculation
  const totalWallArea = Math.round(2 * (roomLength + roomWidth) * roomHeight * 0.85);
  const coveragePerLiter = 125;
  const litersNeeded = Math.ceil((totalWallArea * coatCount) / coveragePerLiter);
  const estimatedCost = litersNeeded * 380;

  const handleWhatsAppInquiry = () => {
    const text =
      `Hello Akshara Paints! I tried colours on your website visualizer.\n\n` +
      `• Shade: Birla Opus ${selectedColor.name} (${selectedColor.code})\n` +
      `• Finish: ${selectedColor.sheen}\n` +
      `• Approx. area: ${totalWallArea} sq.ft (${litersNeeded} litres)\n\n` +
      `Please share a quotation and trial availability in Erode.`;
    window.open(whatsappLink(text), "_blank");
  };

  const numberInput =
    "w-full h-11 rounded-xl border border-stone-200 bg-white px-3 text-[15px] text-stone-900 outline-none transition focus:border-[#F05323] focus:ring-4 focus:ring-[#F05323]/10";

  return (
    <div className="w-full">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
      <input
        ref={mobileCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Page header */}
      <section className="px-4 sm:px-7 lg:px-10 pt-7 sm:pt-14 pb-5 sm:pb-10 border-b border-stone-200/70">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="text-center lg:text-left">
              <p className="flex items-center justify-center gap-2.5 sm:gap-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#F05323] sm:text-xs sm:tracking-[0.22em] lg:justify-start">
                <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
                Colour visualizer
                <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
              </p>
              <h1 className="mt-1.5 font-serif text-[1.75rem] leading-tight sm:mt-2 sm:text-5xl text-primary">
                Try colours on your walls
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-center lg:justify-end">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="h-10 rounded-full bg-[#F05323] px-3 text-[13px] font-semibold text-white transition hover:bg-[#dd4615] cursor-pointer sm:h-11 sm:px-6 sm:text-sm"
              >
                <span className="sm:hidden">Upload photo</span>
                <span className="hidden sm:inline">Upload your room photo</span>
              </button>
              <button
                type="button"
                onClick={handleCameraTrigger}
                className="h-10 rounded-full border border-stone-300 bg-white px-3 text-[13px] font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50 cursor-pointer sm:h-11 sm:px-6 sm:text-sm"
              >
                Take a photo
              </button>
            </div>
          </div>

          {/* How it works */}
          <ol className="mt-4 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-1.5 py-2.5 text-center sm:flex-row sm:items-start sm:gap-3 sm:px-4 sm:py-3.5 sm:text-left"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#F05323] text-[11px] font-bold text-white sm:size-7 sm:text-xs">
                  {i + 1}
                </span>
                <span className="text-[12px] leading-tight sm:text-sm sm:leading-snug">
                  <span className="block font-semibold text-stone-900 sm:hidden">{step.short}</span>
                  <span className="hidden font-semibold text-stone-900 sm:block">{step.title}</span>
                  <span className="hidden text-stone-500 sm:inline">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Studio */}
      <section className="px-4 sm:px-7 lg:px-10 pt-4 sm:pt-8 pb-10 sm:pb-14">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* Room + canvas */}
          <div className="min-w-0 rounded-2xl border border-stone-200 bg-white p-3 sm:p-5">
            <div className="flex items-end justify-between gap-3">
              <p className="text-sm font-semibold text-stone-900">Choose a room</p>
              <p className="hidden text-xs text-stone-500 sm:block">Your photo stays on your device</p>
            </div>
            <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {SAMPLE_ROOMS.map((room) => {
                const isCurrent = activeImage === room.src;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setActiveImage(room.src)}
                    aria-pressed={isCurrent}
                    className="group w-[72px] shrink-0 text-left cursor-pointer sm:w-24"
                  >
                    <span
                      className={`block aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${
                        isCurrent ? "border-[#F05323]" : "border-transparent group-hover:border-stone-300"
                      }`}
                    >
                      <img src={room.src} alt="" loading="lazy" className="size-full object-cover" />
                    </span>
                    <span
                      className={`mt-1 block truncate text-xs ${isCurrent ? "font-semibold text-stone-900" : "text-stone-500"}`}
                    >
                      {room.name}
                    </span>
                  </button>
                );
              })}

              {isOwnPhoto && (
                <button type="button" aria-pressed className="w-[72px] shrink-0 text-left sm:w-24">
                  <span className="block aspect-[4/3] overflow-hidden rounded-lg border-2 border-[#F05323]">
                    <img src={activeImage} alt="" className="size-full object-cover" />
                  </span>
                  <span className="mt-1 block truncate text-xs font-semibold text-stone-900">Your photo</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group w-[72px] shrink-0 text-left cursor-pointer sm:w-24"
              >
                <span className="grid aspect-[4/3] place-items-center rounded-lg border-2 border-dashed border-stone-300 text-xl text-stone-400 transition group-hover:border-[#F05323] group-hover:text-[#F05323]">
                  +
                </span>
                <span className="mt-1 block truncate text-xs text-stone-500">Upload photo</span>
              </button>
            </div>

            <div className="mt-3 border-t border-stone-100 pt-3 sm:mt-4 sm:pt-4">
              <CanvasWorkspace
                imageSrc={activeImage}
                selectedColor={selectedColor}
                autoFillTrigger={autoFillTrigger}
                saveTrigger={saveTrigger}
                onImageChange={setActiveImage}
                onOpenEstimate={() => setEstimateModalOpen(true)}
              />
            </div>
          </div>

          {/* Colour panel */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Selected colour</p>
              <div className="mt-3 flex items-center gap-4">
                <span
                  className="size-14 shrink-0 rounded-xl border border-black/10 shadow-inner sm:size-16"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold leading-tight text-stone-900">{selectedColor.name}</p>
                  <p className="mt-0.5 text-sm text-stone-500">
                    {selectedColor.code} &middot; {selectedColor.sheen}
                  </p>
                  <p className="truncate text-sm text-stone-500">{selectedColor.product}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSaveTrigger((prev) => prev + 1)}
                  className="h-11 rounded-full border border-stone-300 bg-white text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50 cursor-pointer"
                >
                  Save image
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="h-11 rounded-full bg-[#1DAA61] text-sm font-semibold text-white transition hover:bg-[#178F51] cursor-pointer"
                >
                  Get a quote
                </button>
              </div>
              <button
                type="button"
                onClick={() => setEstimateModalOpen(true)}
                className="mt-3 w-full text-center text-sm font-semibold text-[#F05323] transition-colors hover:text-[#dd4615] cursor-pointer"
              >
                How much paint do I need? &rarr;
              </button>
            </div>

            <ColorPaletteDrawer
              selectedColor={selectedColor}
              onSelectColor={handleSelectColorAndPaint}
              onOpenEstimate={() => setEstimateModalOpen(true)}
            />
          </aside>
        </div>
      </section>

      {/* Camera (desktop) */}
      {showWebcamModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-900/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="webcam-title"
        >
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="webcam-title" className="text-lg font-semibold text-stone-900">
                  Take a photo of your wall
                </h3>
                <p className="mt-0.5 text-sm text-stone-500">Stand back so the whole wall is in view.</p>
              </div>
              <button
                type="button"
                onClick={stopWebcam}
                className="rounded-full border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-900 cursor-pointer"
              >
                Close
              </button>
            </div>

            {webcamError ? (
              <div className="mt-5 rounded-xl bg-stone-50 p-6 text-center">
                <p className="text-sm text-stone-700">{webcamError}</p>
                <button
                  type="button"
                  onClick={() => {
                    stopWebcam();
                    fileInputRef.current?.click();
                  }}
                  className="mt-4 h-11 rounded-full bg-[#F05323] px-6 text-sm font-semibold text-white transition hover:bg-[#dd4615] cursor-pointer"
                >
                  Upload a photo instead
                </button>
              </div>
            ) : (
              <>
                <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl bg-stone-900">
                  <video ref={webcamVideoRef} autoPlay playsInline muted className="size-full object-cover" />
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={stopWebcam}
                    className="h-11 rounded-full border border-stone-300 px-5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={captureWebcamPhoto}
                    className="h-11 rounded-full bg-[#F05323] px-6 text-sm font-semibold text-white transition hover:bg-[#dd4615] cursor-pointer"
                  >
                    Capture photo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Paint calculator */}
      {estimateModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-900/50 p-4"
          onClick={() => setEstimateModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="estimate-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="size-10 shrink-0 rounded-lg border border-black/10"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div>
                  <h3 id="estimate-title" className="text-lg font-semibold leading-tight text-stone-900">
                    Paint calculator
                  </h3>
                  <p className="text-sm text-stone-500">
                    {selectedColor.name} &middot; {selectedColor.sheen}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEstimateModalOpen(false)}
                className="rounded-full border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-900 cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="mt-5 text-sm font-medium text-stone-700">Room size (in feet)</p>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {[
                { label: "Length", value: roomLength, set: setRoomLength, min: 6, max: 50 },
                { label: "Width", value: roomWidth, set: setRoomWidth, min: 6, max: 50 },
                { label: "Height", value: roomHeight, set: setRoomHeight, min: 7, max: 20 },
              ].map((f) => (
                <label key={f.label} className="block">
                  <span className="mb-1 block text-xs text-stone-500">{f.label}</span>
                  <input
                    type="number"
                    min={f.min}
                    max={f.max}
                    value={f.value}
                    onChange={(e) => f.set(Number(e.target.value))}
                    className={numberInput}
                  />
                </label>
              ))}
            </div>

            <p className="mt-4 text-sm font-medium text-stone-700">Coats</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                { n: 2, label: "2 coats", hint: "Repaint" },
                { n: 3, label: "3 coats", hint: "New wall / deep colour" },
              ].map((c) => (
                <button
                  key={c.n}
                  type="button"
                  onClick={() => setCoatCount(c.n)}
                  aria-pressed={coatCount === c.n}
                  className={`rounded-xl border px-3 py-2.5 text-left transition cursor-pointer ${
                    coatCount === c.n
                      ? "border-[#0A2234] bg-[#0A2234] text-white"
                      : "border-stone-200 text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <span className="block text-sm font-semibold">{c.label}</span>
                  <span className={`block text-xs ${coatCount === c.n ? "text-white/70" : "text-stone-500"}`}>
                    {c.hint}
                  </span>
                </button>
              ))}
            </div>

            <dl className="mt-5 space-y-2 rounded-xl bg-stone-50 p-4 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-stone-500">Wall area</dt>
                <dd className="font-medium text-stone-900">{totalWallArea} sq.ft</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-stone-500">Approx. cost</dt>
                <dd className="font-medium text-stone-900">₹{estimatedCost.toLocaleString("en-IN")}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t border-stone-200 pt-2">
                <dt className="font-semibold text-stone-900">Paint needed</dt>
                <dd className="text-xl font-bold text-[#F05323]">{litersNeeded} litres</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-stone-400">
              A rough guide that allows for doors and windows. We’ll confirm exact quantity at the store.
            </p>

            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="mt-5 h-12 w-full rounded-full bg-[#1DAA61] text-sm font-semibold text-white transition hover:bg-[#178F51] cursor-pointer"
            >
              Get a quote on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
