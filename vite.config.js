import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Pocket Guide",
        short_name: "PocketGuide",
        theme_color: "#1B6B57",
        background_color: "#F2E8D5",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "osm-tiles",
              expiration: { maxEntries: 500 },
            },
          },
          {
            urlPattern: /^https:\/\/api\.airtable\.com\/.*/i,
            handler: "NetworkFirst",
            options: { cacheName: "airtable-data" },
          },
        ],
      },
    }),
  ],
  preview: {
    host: true,
    allowedHosts: [".ngrok-free.dev", ".ngrok-free.app"],
  },
});
