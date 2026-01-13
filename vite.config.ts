import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // สำหรับ GitHub Pages - เปลี่ยน 'portfolio' เป็นชื่อ repo ของคุณ
  base: process.env.GITHUB_ACTIONS ? "/portfolio/" : "/",
});
