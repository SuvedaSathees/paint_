import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Paintbrush,
  Wand2,
  Eraser,
  Undo2,
  Redo2,
  RotateCcw,
  Download,
  Sliders,
  SplitSquareVertical,
  Camera,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaintColor } from "./color-data";

export type ToolMode = "smart-fill" | "brush" | "eraser";

interface CanvasWorkspaceProps {
  imageSrc: string;
  selectedColor: PaintColor;
  autoFillTrigger?: number;
  onImageChange: (src: string) => void;
  onOpenEstimate: (color: PaintColor) => void;
}

export function CanvasWorkspace({
  imageSrc,
  selectedColor,
  autoFillTrigger,
  onImageChange,
  onOpenEstimate,
}: CanvasWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const paintCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeTool, setActiveTool] = useState<ToolMode>("smart-fill");
  const [brushSize, setBrushSize] = useState<number>(36);
  const [tolerance, setTolerance] = useState<number>(28);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [sliderPos, setSliderPos] = useState(50); // percentage
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  // Camera modal state
  const [showCameraModal, setShowCameraModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Native file inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Hex to RGB helper
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  // Render combined canvas
  const renderComposite = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalCanvasRef.current || !paintCanvasRef.current) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (isComparing) {
      const splitX = Math.round((w * sliderPos) / 100);

      // Left: Original
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, h);
      ctx.clip();
      ctx.drawImage(originalCanvasRef.current, 0, 0);
      ctx.restore();

      // Right: Painted
      ctx.save();
      ctx.beginPath();
      ctx.rect(splitX, 0, w - splitX, h);
      ctx.clip();
      ctx.drawImage(originalCanvasRef.current, 0, 0);
      ctx.drawImage(paintCanvasRef.current, 0, 0);
      ctx.restore();

      // Divider Line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, h);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#ffffff";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();
    } else {
      ctx.drawImage(originalCanvasRef.current, 0, 0);
      ctx.drawImage(paintCanvasRef.current, 0, 0);
    }
  }, [isComparing, sliderPos]);

  // Push paint state to undo history
  const saveState = useCallback(() => {
    if (!paintCanvasRef.current) return;
    const pCtx = paintCanvasRef.current.getContext("2d", { willReadFrequently: true });
    if (!pCtx) return;
    const imgData = pCtx.getImageData(0, 0, paintCanvasRef.current.width, paintCanvasRef.current.height);
    setHistory((prev) => [...prev.slice(-15), imgData]);
    setRedoStack([]);
  }, []);

  // Load image into canvases
  useEffect(() => {
    let isMounted = true;
    setIsLoadingImage(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!isMounted) return;

      const maxDim = 1440;
      let w = img.naturalWidth || img.width;
      let h = img.naturalHeight || img.height;

      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = w;
      canvas.height = h;

      // Create offscreen original canvas
      const origCanvas = document.createElement("canvas");
      origCanvas.width = w;
      origCanvas.height = h;
      const oCtx = origCanvas.getContext("2d", { willReadFrequently: true });
      if (oCtx) {
        oCtx.drawImage(img, 0, 0, w, h);
      }
      originalCanvasRef.current = origCanvas;

      // Create offscreen paint canvas
      const paintCanvas = document.createElement("canvas");
      paintCanvas.width = w;
      paintCanvas.height = h;
      paintCanvasRef.current = paintCanvas;

      setHistory([]);
      setRedoStack([]);
      setIsLoadingImage(false);

      // Save initial blank paint layer
      const pCtx = paintCanvas.getContext("2d", { willReadFrequently: true });
      if (pCtx) {
        setHistory([pCtx.getImageData(0, 0, w, h)]);
      }

      renderComposite();
    };

    img.onerror = () => {
      if (!isMounted) return;
      setIsLoadingImage(false);
    };

    img.src = imageSrc;

    return () => {
      isMounted = false;
    };
  }, [imageSrc, renderComposite]);

  // Update canvas on slider change
  useEffect(() => {
    renderComposite();
  }, [renderComposite]);

  // Undo / Redo
  const handleUndo = () => {
    if (history.length <= 1 || !paintCanvasRef.current) return;
    const pCtx = paintCanvasRef.current.getContext("2d", { willReadFrequently: true });
    if (!pCtx) return;

    const current = history[history.length - 1];
    const previous = history[history.length - 2];

    setRedoStack((prev) => [...prev, current]);
    setHistory((prev) => prev.slice(0, -1));

    pCtx.putImageData(previous, 0, 0);
    renderComposite();
  };

  const handleRedo = () => {
    if (redoStack.length === 0 || !paintCanvasRef.current) return;
    const pCtx = paintCanvasRef.current.getContext("2d", { willReadFrequently: true });
    if (!pCtx) return;

    const next = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setHistory((prev) => [...prev, next]);

    pCtx.putImageData(next, 0, 0);
    renderComposite();
  };

  const handleReset = () => {
    if (!paintCanvasRef.current) return;
    const pCtx = paintCanvasRef.current.getContext("2d");
    if (!pCtx) return;
    pCtx.clearRect(0, 0, paintCanvasRef.current.width, paintCanvasRef.current.height);
    saveState();
    renderComposite();
  };

  // Convert mouse/touch coords to canvas internal coords
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: Math.round((clientX - rect.left) * scaleX),
      y: Math.round((clientY - rect.top) * scaleY),
    };
  };

  // SMART FLOOD FILL: Luminance-preserved wall detection
  const performSmartFill = (startX: number, startY: number) => {
    const origCanvas = originalCanvasRef.current;
    const paintCanvas = paintCanvasRef.current;
    if (!origCanvas || !paintCanvas) return;

    const w = origCanvas.width;
    const h = origCanvas.height;

    if (startX < 0 || startX >= w || startY < 0 || startY >= h) return;

    const oCtx = origCanvas.getContext("2d", { willReadFrequently: true });
    const pCtx = paintCanvas.getContext("2d", { willReadFrequently: true });
    if (!oCtx || !pCtx) return;

    const origData = oCtx.getImageData(0, 0, w, h);
    const oD = origData.data;

    const paintData = pCtx.getImageData(0, 0, w, h);
    const pD = paintData.data;

    const startIdx = (startY * w + startX) * 4;
    const sr = oD[startIdx];
    const sg = oD[startIdx + 1];
    const sb = oD[startIdx + 2];

    const targetColor = hexToRgb(selectedColor.hex);
    // Target base luminance
    const targetLum = 0.299 * targetColor.r + 0.587 * targetColor.g + 0.114 * targetColor.b;
    const safeTargetLum = Math.max(15, targetLum);

    // Color distance function (Euclidean in RGB with luminance weight)
    const colorDist = (idx: number) => {
      const dr = oD[idx] - sr;
      const dg = oD[idx + 1] - sg;
      const db = oD[idx + 2] - sb;
      return Math.sqrt(dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11);
    };

    const visited = new Uint8Array(w * h);
    const queue = new Int32Array(w * h * 2);
    let head = 0;
    let tail = 0;

    queue[tail++] = startX;
    queue[tail++] = startY;
    visited[startY * w + startX] = 1;

    const tol = tolerance * 1.8;

    while (head < tail) {
      const cx = queue[head++];
      const cy = queue[head++];
      const cIdx = (cy * w + cx) * 4;

      // Calculate original pixel luminance
      const r = oD[cIdx];
      const g = oD[cIdx + 1];
      const b = oD[cIdx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Modulate paint color by original surface luminance to retain shadow & wall gradient
      const lumFactor = lum / safeTargetLum;
      const nr = Math.min(255, Math.max(0, Math.round(targetColor.r * lumFactor)));
      const ng = Math.min(255, Math.max(0, Math.round(targetColor.g * lumFactor)));
      const nb = Math.min(255, Math.max(0, Math.round(targetColor.b * lumFactor)));

      pD[cIdx] = nr;
      pD[cIdx + 1] = ng;
      pD[cIdx + 2] = nb;
      pD[cIdx + 3] = 230; // 90% opacity for natural blend

      // 4-way neighbors
      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1],
      ];

      for (let i = 0; i < 4; i++) {
        const [nx, ny] = neighbors[i];
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const nPos = ny * w + nx;
          if (!visited[nPos]) {
            visited[nPos] = 1;
            const nIdx = nPos * 4;
            if (colorDist(nIdx) <= tol) {
              queue[tail++] = nx;
              queue[tail++] = ny;
            }
          }
        }
      }
    }

    pCtx.putImageData(paintData, 0, 0);
    saveState();
    renderComposite();
  };

  // 1-Click Wall Auto-Fill Trigger from Step 3
  useEffect(() => {
    if (autoFillTrigger && autoFillTrigger > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Smart fill targeting the center wall region
      performSmartFill(Math.round(canvas.width / 2), Math.round(canvas.height / 2));
    }
  }, [autoFillTrigger]);

  // MANUAL BRUSH / ERASER DRAWING
  const drawStroke = (x: number, y: number) => {
    const paintCanvas = paintCanvasRef.current;
    if (!paintCanvas) return;
    const pCtx = paintCanvas.getContext("2d");
    if (!pCtx) return;

    pCtx.save();
    pCtx.beginPath();
    pCtx.arc(x, y, brushSize / 2, 0, Math.PI * 2);

    if (activeTool === "eraser") {
      pCtx.globalCompositeOperation = "destination-out";
      pCtx.fillStyle = "rgba(0,0,0,1)";
      pCtx.fill();
    } else {
      // Paint brush with smooth feathered wall coating
      pCtx.globalCompositeOperation = "source-over";
      const rgb = hexToRgb(selectedColor.hex);
      pCtx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.65)`;
      pCtx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
      pCtx.shadowBlur = brushSize * 0.3;
      pCtx.fill();
    }
    pCtx.restore();

    renderComposite();
  };

  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isComparing) return;
    const { x, y } = getCanvasCoords(e);

    if (activeTool === "smart-fill") {
      performSmartFill(x, y);
    } else {
      setIsDrawing(true);
      drawStroke(x, y);
    }
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isComparing) return;
    const { x, y } = getCanvasCoords(e);
    drawStroke(x, y);
  };

  const handlePointerUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  // Before / After Slider dragging
  const handleSliderDrag = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pos = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  // Image Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) onImageChange(res);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Live Camera Stream Handlers
  const startCamera = async () => {
    setCameraError(null);
    setShowCameraModal(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn("Camera access error:", err);
      setCameraError("Camera access denied or unavailable. Please use file upload.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setShowCameraModal(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const captureCanvas = document.createElement("canvas");
    captureCanvas.width = video.videoWidth || 1280;
    captureCanvas.height = video.videoHeight || 720;
    const cCtx = captureCanvas.getContext("2d");
    if (cCtx) {
      cCtx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
      const dataUrl = captureCanvas.toDataURL("image/jpeg", 0.95);
      onImageChange(dataUrl);
      stopCamera();
    }
  };

  // Download high-res painted room image with branded swatch card
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !originalCanvasRef.current || !paintCanvasRef.current) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const eCtx = exportCanvas.getContext("2d");
    if (!eCtx) return;

    // Draw original + paint layer
    eCtx.drawImage(originalCanvasRef.current, 0, 0);
    eCtx.drawImage(paintCanvasRef.current, 0, 0);

    // Overlay stylish Akshara Paints shade badge at bottom-right
    const badgeW = Math.min(360, exportCanvas.width * 0.35);
    const badgeH = 88;
    const pad = 24;
    const bx = exportCanvas.width - badgeW - pad;
    const by = exportCanvas.height - badgeH - pad;

    eCtx.save();
    // Glass card background
    eCtx.fillStyle = "rgba(14, 40, 56, 0.88)";
    eCtx.beginPath();
    eCtx.roundRect(bx, by, badgeW, badgeH, 12);
    eCtx.fill();
    eCtx.lineWidth = 1.5;
    eCtx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    eCtx.stroke();

    // Color swatch chip
    eCtx.fillStyle = selectedColor.hex;
    eCtx.beginPath();
    eCtx.roundRect(bx + 16, by + 16, 56, 56, 8);
    eCtx.fill();
    eCtx.lineWidth = 2;
    eCtx.strokeStyle = "#ffffff";
    eCtx.stroke();

    // Text details
    eCtx.fillStyle = "#ffffff";
    eCtx.font = "bold 15px sans-serif";
    eCtx.fillText(selectedColor.name, bx + 84, by + 34);

    eCtx.fillStyle = "#F5D061";
    eCtx.font = "600 11px sans-serif";
    eCtx.fillText(`Birla Opus ${selectedColor.code} • ${selectedColor.sheen}`, bx + 84, by + 52);

    eCtx.fillStyle = "rgba(255, 255, 255, 0.7)";
    eCtx.font = "10px sans-serif";
    eCtx.fillText("Akshara Paints & Hardware • Erode", bx + 84, by + 68);

    eCtx.restore();

    // Trigger download
    const link = document.createElement("a");
    link.download = `akshara-${selectedColor.name.toLowerCase().replace(/\s+/g, "-")}-room.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Top Action Ribbon */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar whitespace-nowrap rounded-2xl border border-stone-200/80 bg-white/95 p-2 sm:p-2.5 shadow-sm backdrop-blur-md">
        {/* Input source buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="h-8.5 gap-1.5 rounded-xl border-stone-200 px-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 shrink-0 cursor-pointer"
          >
            <Upload className="size-3.5 text-paint-deep" />
            <span>Upload Photo</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // On mobile, use native camera input; on desktop, launch live camera modal
              if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
                cameraInputRef.current?.click();
              } else {
                startCamera();
              }
            }}
            className="h-8.5 gap-1.5 rounded-xl border-stone-200 px-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 shrink-0 cursor-pointer"
          >
            <Camera className="size-3.5 text-accent" />
            <span>Snap Photo</span>
          </Button>
        </div>

        {/* Tool selector */}
        <div className="flex items-center gap-1 rounded-xl bg-stone-100/90 p-1 border border-stone-200/50 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveTool("smart-fill");
              setIsComparing(false);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTool === "smart-fill" && !isComparing
                ? "bg-white text-stone-900 shadow-sm border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Tap any wall to intelligently fill with selected paint color"
          >
            <Wand2 className="size-3.5 text-accent" />
            <span>Smart Tap</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTool("brush");
              setIsComparing(false);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTool === "brush" && !isComparing
                ? "bg-white text-stone-900 shadow-sm border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Paint walls manually with a smooth roller brush"
          >
            <Paintbrush className="size-3.5 text-paint-deep" />
            <span>Roller Brush</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTool("eraser");
              setIsComparing(false);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTool === "eraser" && !isComparing
                ? "bg-white text-stone-900 shadow-sm border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Erase paint from window frames or furniture"
          >
            <Eraser className="size-3.5 text-stone-500" />
            <span>Eraser</span>
          </button>
        </div>

        {/* Secondary controls: Compare, Undo, Redo, Download */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            variant={isComparing ? "default" : "outline"}
            size="sm"
            onClick={() => setIsComparing(!isComparing)}
            className={`h-8.5 gap-1.5 rounded-xl px-2.5 text-xs font-semibold shrink-0 cursor-pointer ${
              isComparing ? "bg-stone-900 text-white" : "border-stone-200 text-stone-700"
            }`}
            title="Split comparison: Slide left/right to see before vs. after"
          >
            <SplitSquareVertical className="size-3.5" />
            <span>Compare</span>
          </Button>

          <div className="flex items-center gap-0.5 border-l border-stone-200 pl-1.5 shrink-0">
            <button
              type="button"
              disabled={history.length <= 1}
              onClick={handleUndo}
              className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
              title="Undo last stroke"
            >
              <Undo2 className="size-4" />
            </button>
            <button
              type="button"
              disabled={redoStack.length === 0}
              onClick={handleRedo}
              className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
              title="Redo stroke"
            >
              <Redo2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-100 cursor-pointer"
              title="Reset all paint"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={handleDownload}
            className="h-8.5 gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm px-3 shrink-0 cursor-pointer"
          >
            <Download className="size-3.5" />
            <span>Save Room</span>
          </Button>
        </div>
      </div>

      {/* Dynamic Tool Adjusters Bar */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar whitespace-nowrap rounded-xl border border-stone-200/60 bg-stone-50/80 px-3.5 py-2 text-xs text-stone-600">
        <div className="flex items-center gap-4 shrink-0">
          {activeTool === "smart-fill" && (
            <div className="flex items-center gap-2">
              <Sliders className="size-3.5 text-accent" />
              <span className="font-semibold text-stone-700">Wall Detection Tolerance:</span>
              <input
                type="range"
                min="10"
                max="55"
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-28 accent-accent cursor-pointer"
              />
              <span className="text-stone-500 font-mono text-[11px] w-6">{tolerance}</span>
              <span className="text-[10px] text-stone-400 hidden md:inline">
                (Increase for shadow areas; decrease near trims)
              </span>
            </div>
          )}

          {(activeTool === "brush" || activeTool === "eraser") && (
            <div className="flex items-center gap-2">
              <Sliders className="size-3.5 text-paint-deep" />
              <span className="font-semibold text-stone-700">Brush Size:</span>
              <input
                type="range"
                min="10"
                max="90"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-28 accent-primary cursor-pointer"
              />
              <span className="text-stone-500 font-mono text-[11px] w-6">{brushSize}px</span>
            </div>
          )}
        </div>

        {/* Selected Color Chip preview */}
        <div className="flex items-center gap-2">
          <div
            className="size-4 rounded-full border border-black/20 shadow-inner"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <span className="font-semibold text-stone-800">{selectedColor.name}</span>
          <span className="font-mono text-[10px] text-stone-500">({selectedColor.code})</span>
          <button
            type="button"
            onClick={() => onOpenEstimate(selectedColor)}
            className="ml-2 underline font-semibold text-emerald-800 hover:text-emerald-900 cursor-pointer"
          >
            Calculate Paint Literage &rarr;
          </button>
        </div>
      </div>

      {/* Main Canvas Stage */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border-2 border-stone-200/90 bg-stone-900/5 shadow-inner flex items-center justify-center min-h-[460px] max-h-[82vh]"
      >
        {isLoadingImage && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="size-8 animate-spin rounded-full border-3 border-accent border-t-transparent" />
            <p className="mt-3 text-xs font-semibold text-stone-700">Preparing Room Visualizer...</p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className={`w-full max-h-[82vh] object-contain rounded-xl select-none ${
            isComparing
              ? "cursor-ew-resize"
              : activeTool === "smart-fill"
              ? "cursor-crosshair"
              : "cursor-pointer"
          }`}
        />

        {/* Before / After Draggable Split Handle */}
        {isComparing && (
          <div
            className="absolute inset-0 pointer-events-none"
            onMouseMove={(e) => {
              if (isDraggingSlider) handleSliderDrag(e.clientX);
            }}
            onMouseUp={() => setIsDraggingSlider(false)}
          >
            {/* Split Handle Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-xl pointer-events-auto cursor-ew-resize -translate-x-1/2 flex items-center justify-center"
              style={{ left: `${sliderPos}%` }}
              onMouseDown={() => setIsDraggingSlider(true)}
              onTouchMove={(e) => {
                if (e.touches[0]) handleSliderDrag(e.touches[0].clientX);
              }}
            >
              <div className="size-8 rounded-full bg-white shadow-lg border border-stone-300 flex items-center justify-center text-stone-700 font-bold text-xs">
                ⇄
              </div>
            </div>

            {/* Badges */}
            <span className="absolute top-4 left-4 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              Original Room
            </span>
            <span className="absolute top-4 right-4 rounded-lg bg-emerald-900/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-100 backdrop-blur-md border border-emerald-400/30">
              Birla Opus {selectedColor.name}
            </span>
          </div>
        )}

        {/* Usage hint overlay */}
        {!isComparing && (
          <div className="absolute bottom-3 left-3 pointer-events-none rounded-xl bg-black/50 px-3 py-1.5 text-[11px] font-medium text-white/95 backdrop-blur-md">
            {activeTool === "smart-fill"
              ? "👉 Click or tap any wall to paint with natural lighting and shadows"
              : activeTool === "brush"
              ? "🖌️ Click and drag to manually paint walls"
              : "🧹 Click and drag to erase paint from trims and furniture"}
          </div>
        )}
      </div>

      {/* Live Desktop/Webcam Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-stone-900 p-6 text-white shadow-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Camera className="size-5 text-accent" />
                <h3 className="font-display font-semibold text-lg">Snap Your Room</h3>
              </div>
              <button
                type="button"
                onClick={stopCamera}
                className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {cameraError ? (
              <div className="rounded-2xl bg-rose-950/50 p-6 text-center border border-rose-800/40 my-4">
                <p className="text-sm text-rose-200">{cameraError}</p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="mt-4 border-white/20 text-white hover:bg-white/10"
                >
                  <Upload className="size-4 mr-2" /> Upload From Computer
                </Button>
              </div>
            ) : (
              <>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-white/10">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-2xl" />
                </div>

                <div className="mt-6 flex items-center justify-center gap-4">
                  <Button
                    onClick={capturePhoto}
                    size="lg"
                    className="rounded-full bg-accent hover:bg-accent/90 text-stone-900 font-bold px-8 shadow-lg shadow-accent/20"
                  >
                    <Camera className="size-5 mr-2" /> Capture Wall Photo
                  </Button>
                  <Button
                    onClick={stopCamera}
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
