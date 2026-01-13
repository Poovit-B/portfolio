/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // สำหรับ GitHub Pages - เปลี่ยน 'portfolio' เป็นชื่อ repo ของคุณ
  base: process.env.GITHUB_ACTIONS ? "/portfolio/" : "/",

  // Vitest configuration
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/index.ts",
      ],
    },
  },
});
