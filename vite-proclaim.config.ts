import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        "assets/manifest-icon-192.maskable.png",
        "assets/manifest-icon-512.maskable.png",
      ],
      manifest: {
        short_name: "Proclaimer",
        name: "Proclaimer",
        icons: [
          {
            src: "assets/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "assets/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "assets/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "assets/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#5b3c88",
        background_color: "#d8d8d8",
      },
    }),
  ],
  resolve: {
    alias: {
      "@inputs": path.resolve(__dirname, "./src/common/components/inputs")
    }
  },
  root: "src/proclaim",
});
 