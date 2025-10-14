// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Convenience alias used by some example imports
      "three/addons": "three/examples/jsm",

      // Critical: point the problematic three subpaths to our local shims
      "three/webgpu": path.resolve(__dirname, "src/shims/three-webgpu.js"),
      "three/tsl": path.resolve(__dirname, "src/shims/three-tsl.js"),
    },
  },
  // Prevent Netlify/SSR from externalizing these during prerender/build preview
  ssr: {
    noExternal: ["react-globe.gl", "three-globe"],
  },
});
