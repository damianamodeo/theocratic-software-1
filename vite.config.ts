import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default ({mode}) => {

  process.env = {...process.env, ...loadEnv(mode, process.cwd())}

  return defineConfig({
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
          short_name: "Orderly",
          name: "Orderly",
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
        "@INPUTS": path.resolve(__dirname, "./src/common/components/inputs"),
        "@FIREBASE": path.resolve(__dirname, "./src/common/services/firebase"),
        "@test-googleMaps": path.resolve(__dirname, "./src/test/googleMaps"),
        "@test-firebase": path.resolve(__dirname, "./src/test/firebase")
      },
    },
    root: "src/" + process.env.VITE_APP_TITLE,
  });
};
