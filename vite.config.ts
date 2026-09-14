import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "node:fs";
import path from "node:path";

const srcVideo = path.resolve("scripts/video (7)_gwr_video_mvp.mp4");
const destVideo = path.resolve("public/akshara-hero-video.mp4");
try {
  if (fs.existsSync(srcVideo) && !fs.existsSync(destVideo)) {
    fs.copyFileSync(srcVideo, destVideo);
    console.log("Copied hero video to public/akshara-hero-video.mp4");
  }
} catch (e) {
  console.error("Error copying hero video:", e);
}

export default defineConfig({
  vite: {
    server: {
      host: "0.0.0.0",
      port: 8080,
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});










