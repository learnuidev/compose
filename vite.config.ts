import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tailwindcss()
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  build: {
    outDir: "dist-react",
  },
  server: {
    port: 5123,
    strictPort: true,
  },
});
