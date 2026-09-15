import React, { useRef, useEffect, useState, useCallback } from "react";
import {
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
  saveTrigger?: number;
  onImageChange: (src: string) => void;
  onOpenEstimate: (color: PaintColor) => void;
}

export function CanvasWorkspace({
  imageSrc,
  selectedColor,
  autoFillTrigger,
  saveTrigger,
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
  const [tapRipple, setTapRipple] = useState<{ x: number; y: number; id: number } | null>(null);

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
    if (!imageSrc.startsWith("data:")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => {
      if (!isMounted) return;

      const isMobile =
        typeof window !== "undefined" &&
        (window.innerWidth < 768 || /Android|iPhone|iPad/i.test(navigator.userAgent));
      const maxDim = isMobile ? 1000 : 1440;
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

  // Convert pointer coords to canvas internal bitmap coords
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const relX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const relY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.round(relX * scaleX);
    const y = Math.round(relY * scaleY);

    return {
      x: Math.max(0, Math.min(canvas.width - 1, x)),
      y: Math.max(0, Math.min(canvas.height - 1, y)),
    };
  };

  // SMART FLOOD FILL: Luminance-preserved wall detection with fast TypedArray BFS
  const performSmartFill = (startX: number, startY: number, colorOverride?: PaintColor) => {
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

    const activeColor = colorOverride || selectedColor;
    const targetColor = hexToRgb(activeColor.hex);

    // Color distance function (Euclidean in RGB with perceptual luminance weighting)
    const colorDist = (idx: number) => {
      const dr = oD[idx] - sr;
      const dg = oD[idx + 1] - sg;
      const db = oD[idx + 2] - sb;
      return Math.sqrt(dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11);
    };

    const visited = new Uint8Array(w * h);
    const queue = new Int32Array(w * h);
    let head = 0;
    let tail = 0;

    const startPos = startY * w + startX;
    queue[tail++] = startPos;
    visited[startPos] = 1;

    const tol = Math.max(16, tolerance * 1.75);

    while (head < tail) {
      const pos = queue[head++];
      const cx = pos % w;
      const cy = (pos / w) | 0;
      const cIdx = pos * 4;

      // Calculate original surface luminance (0 to 255)
      const r = oD[cIdx];
      const g = oD[cIdx + 1];
      const b = oD[cIdx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Authentic architectural paint lighting simulation:
      // Preserves original room shadows, ambient light, and wall texture
      const lightingMultiplier = 0.35 + 0.65 * (lum / 255);
      const nr = Math.min(255, Math.max(0, Math.round(targetColor.r * lightingMultiplier)));
      const ng = Math.min(255, Math.max(0, Math.round(targetColor.g * lightingMultiplier)));
      const nb = Math.min(255, Math.max(0, Math.round(targetColor.b * lightingMultiplier)));

      pD[cIdx] = nr;
      pD[cIdx + 1] = ng;
      pD[cIdx + 2] = nb;
      pD[cIdx + 3] = 230; // 90% opacity for natural depth & trim preservation

      // 4-way neighbors with inlined boundary checks
      if (cx + 1 < w) {
        const nPos = pos + 1;
        if (!visited[nPos] && colorDist(nPos * 4) <= tol) {
          visited[nPos] = 1;
          queue[tail++] = nPos;
        }
      }
      if (cx - 1 >= 0) {
        const nPos = pos - 1;
        if (!visited[nPos] && colorDist(nPos * 4) <= tol) {
          visited[nPos] = 1;
          queue[tail++] = nPos;
        }
      }
      if (cy + 1 < h) {
        const nPos = pos + w;
        if (!visited[nPos] && colorDist(nPos * 4) <= tol) {
          visited[nPos] = 1;
          queue[tail++] = nPos;
        }
      }
      if (cy - 1 >= 0) {
        const nPos = pos - w;
        if (!visited[nPos] && colorDist(nPos * 4) <= tol) {
          visited[nPos] = 1;
          queue[tail++] = nPos;
        }
      }
    }

    pCtx.putImageData(paintData, 0, 0);
    saveState();
    renderComposite();
  };

  // Find the primary unobstructed wall seed location for any room
  const getWallSeedPoint = useCallback((src: string, w: number, h: number) => {
    if (src.includes("linen")) return { x: Math.round(w * 0.5), y: Math.round(h * 0.24) };
    if (src.includes("terracotta")) return { x: Math.round(w * 0.45), y: Math.round(h * 0.25) };
    if (src.includes("forest")) return { x: Math.round(w * 0.5), y: Math.round(h * 0.26) };
    if (src.includes("rose")) return { x: Math.round(w * 0.5), y: Math.round(h * 0.28) };
    if (src.includes("ocean")) return { x: Math.round(w * 0.5), y: Math.round(h * 0.25) };
    // Living room or uploaded custom photo: upper 26% center safely above furniture
    return { x: Math.round(w * 0.5), y: Math.round(h * 0.26) };
  }, []);

  // 1-Click Wall Auto-Fill Trigger from Step 3 or "Paint Wall" button
  useEffect(() => {
    if (autoFillTrigger && autoFillTrigger > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const seed = getWallSeedPoint(imageSrc, canvas.width, canvas.height);
      performSmartFill(seed.x, seed.y, selectedColor);
    }
  }, [autoFillTrigger, imageSrc, getWallSeedPoint, selectedColor]);

  // Download Trigger from external mobile action button
  useEffect(() => {
    if (saveTrigger && saveTrigger > 0) {
      handleDownload();
    }
  }, [saveTrigger]);

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

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isComparing) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const coords = getCanvasCoords(e);
    if (!coords) return;

    if (activeTool === "smart-fill") {
      performSmartFill(coords.x, coords.y);
      // Trigger tap ripple animation for immediate mobile touch feedback
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        setTapRipple({
          x: e.clientX - containerRect.left,
          y: e.clientY - containerRect.top,
          id: Date.now(),
        });
        setTimeout(() => setTapRipple(null), 600);
      }
    } else {
      setIsDrawing(true);
      drawStroke(coords.x, coords.y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isComparing) return;
    const coords = getCanvasCoords(e);
    if (!coords) return;
    drawStroke(coords.x, coords.y);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  // Before / After Slider dragging with bounds clamping
  const handleSliderDrag = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
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

      {/* 1. Mobile-Only Clean Action Bar (< sm) */}
      <div className="flex sm:hidden items-center justify-between gap-1 rounded-xl border border-stone-200/90 bg-white p-1 shadow-2xs">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setActiveTool("smart-fill");
              setIsComparing(false);
            }}
            className={`flex items-center justify-center rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-all cursor-pointer ${
              activeTool === "smart-fill" && !isComparing
                ? "bg-[#071624] text-white shadow-2xs"
                : "text-stone-600 hover:text-stone-900 bg-stone-100"
            }`}
          >
            <span>Tap Wall</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTool("brush");
              setIsComparing(false);
            }}
            className={`flex items-center justify-center rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-all cursor-pointer ${
              activeTool === "brush" && !isComparing
                ? "bg-[#071624] text-white shadow-2xs"
                : "text-stone-600 hover:text-stone-900 bg-stone-100"
            }`}
          >
            <span>Brush</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsComparing(!isComparing)}
            className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-bold transition-all cursor-pointer border ${
              isComparing
                ? "bg-stone-900 text-white border-stone-900 shadow-2xs"
                : "bg-stone-50 text-stone-700 border-stone-200"
            }`}
          >
            <SplitSquareVertical className="size-3 text-[#F05323]" />
            <span>Compare</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-100 border border-stone-200 bg-stone-50 cursor-pointer"
            title="Reset paint"
          >
            <RotateCcw className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold bg-emerald-700 text-white shadow-2xs cursor-pointer"
            title="Save photo"
          >
            <Download className="size-3" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* 2. Desktop Full Action Ribbon (>= sm) */}
      <div className="hidden sm:flex items-center justify-between gap-2 rounded-2xl border border-stone-200/80 bg-white/95 p-2.5 shadow-2xs backdrop-blur-md">
        {/* Desktop-only secondary input buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="h-8 gap-1.5 rounded-xl border-stone-200 px-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 shrink-0 cursor-pointer"
          >
            <Upload className="size-3.5 text-[#F05323]" />
            <span>Upload</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
                cameraInputRef.current?.click();
              } else {
                startCamera();
              }
            }}
            className="h-8 gap-1.5 rounded-xl border-stone-200 px-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 shrink-0 cursor-pointer"
          >
            <Camera className="size-3.5 text-stone-600" />
            <span>Camera</span>
          </Button>
        </div>

        {/* Primary Tool selector */}
        <div className="flex items-center gap-1 rounded-xl bg-stone-100/90 p-1 border border-stone-200/50">
          <button
            type="button"
            onClick={() => {
              setActiveTool("smart-fill");
              setIsComparing(false);
            }}
            className={`flex items-center justify-center rounded-lg px-3 py-1 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTool === "smart-fill" && !isComparing
                ? "bg-white text-stone-900 shadow-2xs border border-stone-200 font-bold"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Tap any wall to intelligently fill with selected paint color"
          >
            <span>Smart Tap</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTool("brush");
              setIsComparing(false);
            }}
            className={`flex items-center justify-center rounded-lg px-3 py-1 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTool === "brush" && !isComparing
                ? "bg-white text-stone-900 shadow-2xs border border-stone-200 font-bold"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Paint walls manually with a roller brush"
          >
            <span>Brush</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTool("eraser");
              setIsComparing(false);
            }}
            className={`flex items-center justify-center rounded-lg px-3 py-1 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTool === "eraser" && !isComparing
                ? "bg-white text-stone-900 shadow-2xs border border-stone-200 font-bold"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Erase paint from window frames or furniture"
          >
            <span>Eraser</span>
          </button>
        </div>

        {/* Secondary controls: Compare, Undo, Redo, Reset, Save */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          <Button
            variant={isComparing ? "default" : "outline"}
            size="sm"
            onClick={() => setIsComparing(!isComparing)}
            className={`h-8 gap-1 rounded-xl px-2.5 text-xs font-semibold shrink-0 cursor-pointer ${
              isComparing ? "bg-stone-900 text-white" : "border-stone-200 text-stone-700 hover:bg-stone-50"
            }`}
            title="Split comparison: Slide left/right to see before vs. after"
          >
            <SplitSquareVertical className="size-3.5 text-[#F05323]" />
            <span>Compare</span>
          </Button>

          <div className="flex items-center gap-0.5 border-l border-stone-200 pl-1 shrink-0">
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
            className="h-8 gap-1 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-2xs px-3 shrink-0 cursor-pointer"
          >
            <Download className="size-3.5" />
            <span>Save</span>
          </Button>
        </div>
      </div>

      {/* Dynamic Tool Adjusters Bar: Desktop Only (Hidden on Mobile) */}
      <div className="hidden sm:flex flex-wrap items-center justify-between gap-2 rounded-xl border border-stone-200/60 bg-stone-50/80 px-3.5 py-2 text-xs text-stone-600">
        <div className="flex items-center gap-4 shrink-0">
          {activeTool === "smart-fill" && (
            <div className="flex items-center gap-2">
              <Sliders className="size-3.5 text-[#F05323]" />
              <span className="font-semibold text-stone-700 text-xs">Wall Tolerance:</span>
              <input
                type="range"
                min="10"
                max="55"
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-28 accent-[#F05323] cursor-pointer"
              />
              <span className="text-stone-500 font-mono text-[11px] w-5">{tolerance}</span>
            </div>
          )}

          {(activeTool === "brush" || activeTool === "eraser") && (
            <div className="flex items-center gap-2">
              <Sliders className="size-3.5 text-stone-800" />
              <span className="font-semibold text-stone-700 text-xs">Size:</span>
              <input
                type="range"
                min="10"
                max="90"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-28 accent-stone-900 cursor-pointer"
              />
              <span className="text-stone-500 font-mono text-[11px] w-7">{brushSize}px</span>
            </div>
          )}
        </div>

        {/* Selected Color Chip preview */}
        <div className="flex items-center gap-2 ml-auto">
          <div
            className="size-4 rounded-full border border-black/20 shadow-inner shrink-0"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <span className="font-semibold text-stone-800 text-xs truncate">
            {selectedColor.name}
          </span>
          <button
            type="button"
            onClick={() => onOpenEstimate(selectedColor)}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 cursor-pointer underline shrink-0 ml-1"
          >
            Estimate &rarr;
          </button>
        </div>
      </div>

      {/* Main Canvas Stage: Adaptive Mobile Height */}
      <div
        id="canvas-stage-wrapper"
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-stone-200/90 bg-stone-900/5 shadow-inner flex items-center justify-center min-h-[220px] max-h-[46vh] sm:min-h-[380px] sm:max-h-[62vh] lg:min-h-[500px] lg:max-h-[72vh] touch-none"
      >
        {isLoadingImage && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="size-8 animate-spin rounded-full border-3 border-[#F05323] border-t-transparent" />
            <p className="mt-3 text-xs font-semibold text-stone-700">Loading Room Canvas...</p>
          </div>
        )}

        {/* Mobile Tap Feedback Ripple */}
        {tapRipple && (
          <span
            key={tapRipple.id}
            className="pointer-events-none absolute z-25 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-[#F05323] bg-[#F05323]/30 animate-ping size-8 sm:size-10"
            style={{ left: tapRipple.x, top: tapRipple.y }}
          />
        )}

        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: "none" }}
          className={`max-w-full max-h-[46vh] sm:max-h-[62vh] lg:max-h-[70vh] w-auto h-auto block mx-auto rounded-xl select-none touch-none ${
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
            onPointerMove={(e) => {
              if (isDraggingSlider) handleSliderDrag(e.clientX);
            }}
            onPointerUp={() => setIsDraggingSlider(false)}
          >
            {/* Split Handle Bar */}
            <div
              className="absolute top-0 bottom-0 w-8 -translate-x-1/2 flex items-center justify-center cursor-ew-resize touch-none select-none z-20 pointer-events-auto"
              style={{ left: `${sliderPos}%` }}
              onPointerDown={(e) => {
                try {
                  e.currentTarget.setPointerCapture(e.pointerId);
                } catch {}
                setIsDraggingSlider(true);
              }}
              onPointerMove={(e) => {
                if (isDraggingSlider) handleSliderDrag(e.clientX);
              }}
              onPointerUp={(e) => {
                try {
                  if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                    e.currentTarget.releasePointerCapture(e.pointerId);
                  }
                } catch {}
                setIsDraggingSlider(false);
              }}
              onPointerCancel={() => setIsDraggingSlider(false)}
            >
              <div className="w-0.5 h-full bg-white shadow-xl pointer-events-none" />
              <div className="absolute size-7 sm:size-8 rounded-full bg-white shadow-lg border border-stone-300 flex items-center justify-center text-stone-700 font-bold text-xs pointer-events-none">
                ⇄
              </div>
            </div>

            {/* Badges */}
            <span className="absolute top-3 sm:top-4 left-3 sm:left-4 rounded-lg bg-black/60 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              Original
            </span>
            <span className="absolute top-3 sm:top-4 right-3 sm:right-4 rounded-lg bg-emerald-900/80 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-100 backdrop-blur-md border border-emerald-400/30">
              Birla Opus {selectedColor.name}
            </span>
          </div>
        )}

        {/* Usage hint overlay */}
        {!isComparing && (
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 pointer-events-none rounded-lg sm:rounded-xl bg-black/60 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-white/95 backdrop-blur-md">
            {activeTool === "smart-fill"
              ? "Tap wall to paint"
              : activeTool === "brush"
              ? "Drag to paint"
              : "Drag to erase"}
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
