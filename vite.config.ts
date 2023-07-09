/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: { outDir: "build" },
  server: { open: true },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  resolve: {
    alias: {
      "@/common": path.resolve(__dirname, "./src/common"),
      "@/screens": path.resolve(__dirname, "./src/screens"),
      "@/store": path.resolve(__dirname, "./src/store"),
    },
  },
});
