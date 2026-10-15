import React, { useRef, useEffect, useState, useCallback } from "react";
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
    eCtx.font = "bold 15px Manrope, sans-serif";
    eCtx.fillText(selectedColor.name, bx + 84, by + 34);

    eCtx.fillStyle = "#F5D061";
    eCtx.font = "600 11px Manrope, sans-serif";
    eCtx.fillText(`Birla Opus ${selectedColor.code} • ${selectedColor.sheen}`, bx + 84, by + 52);

    eCtx.fillStyle = "rgba(255, 255, 255, 0.7)";
    eCtx.font = "10px Manrope, sans-serif";
    eCtx.fillText("Akshara Paints & Hardware • Erode", bx + 84, by + 68);

    eCtx.restore();

    // Trigger download
    const link = document.createElement("a");
    link.download = `akshara-${selectedColor.name.toLowerCase().replace(/\s+/g, "-")}-room.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  const tools: { id: ToolMode; label: string }[] = [
    { id: "smart-fill", label: "Tap to paint" },
    { id: "brush", label: "Brush" },
    { id: "eraser", label: "Eraser" },
  ];
  const hint = isComparing
    ? "Drag the handle to compare before and after."
    : activeTool === "smart-fill"
      ? "Tap any wall to paint it."
      : activeTool === "brush"
        ? "Drag over the wall to paint by hand."
        : "Drag to remove paint from furniture or windows.";
  const smallBtn =
    "h-9 rounded-full border border-stone-200 bg-white px-2 text-[13px] font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer sm:border-transparent sm:bg-transparent sm:px-3 sm:text-sm";

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Toolbar */}
      <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <div className="grid grid-cols-3 rounded-full border border-stone-200 bg-stone-50 p-1 sm:inline-flex" role="group" aria-label="Painting tool">
          {tools.map((t) => {
            const isActive = activeTool === t.id && !isComparing;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setActiveTool(t.id);
                  setIsComparing(false);
                }}
                aria-pressed={isActive}
                className={`h-8 rounded-full px-2 text-[13px] font-semibold transition cursor-pointer sm:px-3.5 sm:text-sm ${
                  isActive ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-4 items-center gap-1 sm:flex sm:flex-wrap">
          <button
            type="button"
            onClick={() => setIsComparing(!isComparing)}
            aria-pressed={isComparing}
            className={`h-9 rounded-full border px-2 text-[13px] font-semibold transition cursor-pointer sm:px-4 sm:text-sm ${
              isComparing
                ? "border-[#0A2234] bg-[#0A2234] text-white"
                : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
            }`}
          >
            <span className="sm:hidden">Compare</span>
            <span className="hidden sm:inline">Before / After</span>
          </button>
          <button type="button" disabled={history.length <= 1} onClick={handleUndo} className={smallBtn}>
            Undo
          </button>
          <button type="button" disabled={redoStack.length === 0} onClick={handleRedo} className={smallBtn}>
            Redo
          </button>
          <button type="button" onClick={handleReset} className={smallBtn}>
            Reset
          </button>
        </div>
      </div>

      {/* Tool setting */}
      {!isComparing && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl bg-stone-50 px-3.5 py-2 sm:px-4 sm:py-2.5">
          <label className="flex w-full items-center gap-3 text-[13px] font-medium text-stone-700 sm:w-auto sm:text-sm">
            <span className="shrink-0">{activeTool === "smart-fill" ? "Fill sensitivity" : "Brush size"}</span>
            {activeTool === "smart-fill" ? (
              <input
                type="range"
                min="10"
                max="55"
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-full min-w-0 flex-1 cursor-pointer accent-[#F05323] sm:w-40 sm:flex-none"
              />
            ) : (
              <input
                type="range"
                min="10"
                max="90"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full min-w-0 flex-1 cursor-pointer accent-[#F05323] sm:w-40 sm:flex-none"
              />
            )}
          </label>
          <span className="hidden text-xs text-stone-500 sm:ml-auto sm:inline">
            {activeTool === "smart-fill" ? "Raise it if paint misses parts of the wall." : hint}
          </span>
        </div>
      )}

      {/* Canvas */}
      <div
        id="canvas-stage-wrapper"
        ref={containerRef}
        className="relative flex min-h-[220px] max-h-[46vh] w-full items-center justify-center overflow-hidden rounded-xl bg-stone-100 touch-none sm:min-h-[380px] sm:max-h-[62vh] lg:min-h-[480px] lg:max-h-[70vh]"
      >
        {isLoadingImage && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/85">
            <div className="size-8 animate-spin rounded-full border-[3px] border-[#F05323] border-t-transparent" />
            <p className="mt-3 text-sm font-medium text-stone-600">Loading room…</p>
          </div>
        )}

        {tapRipple && (
          <span
            key={tapRipple.id}
            className="pointer-events-none absolute z-20 size-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[#F05323]/30 ring-4 ring-[#F05323]"
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
          className={`mx-auto block h-auto max-h-[46vh] w-auto max-w-full select-none touch-none sm:max-h-[62vh] lg:max-h-[70vh] ${
            isComparing ? "cursor-ew-resize" : activeTool === "smart-fill" ? "cursor-crosshair" : "cursor-pointer"
          }`}
        />

        {isComparing && (
          <div
            className="pointer-events-none absolute inset-0"
            onPointerMove={(e) => {
              if (isDraggingSlider) handleSliderDrag(e.clientX);
            }}
            onPointerUp={() => setIsDraggingSlider(false)}
          >
            <div
              className="pointer-events-auto absolute bottom-0 top-0 z-20 flex w-8 -translate-x-1/2 cursor-ew-resize touch-none select-none items-center justify-center"
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
              <div className="pointer-events-none h-full w-0.5 bg-white shadow-xl" />
              <div className="pointer-events-none absolute grid size-9 place-items-center rounded-full border border-stone-200 bg-white text-xs font-bold text-stone-700 shadow-lg">
                &#8596;
              </div>
            </div>

            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-stone-800 shadow-sm">
              Before
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-[#F05323] px-3 py-1 text-xs font-semibold text-white shadow-sm">
              After &middot; {selectedColor.name}
            </span>
          </div>
        )}

        {!isComparing && !isLoadingImage && (
          <div className="pointer-events-none absolute bottom-2.5 left-1/2 max-w-[92%] -translate-x-1/2 whitespace-nowrap rounded-full bg-stone-900/70 px-3 py-1.5 text-[11px] font-medium text-white sm:bottom-3 sm:px-3.5 sm:text-xs">
            {hint}
          </div>
        )}
      </div>
    </div>
  );
}
