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
            purpose: "any", // Pensez à ajouter une variante maskable plus tard (Sprint 2, une fois les vraies icônes reçues de l'agence) pour qu'Android n'écrase pas le logo dans un cercle qui rogne les bords
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any", //Pensez à ajouter une variante maskable plus tard (Sprint 2, une fois les vraies icônes reçues de l'agence) pour qu'Android n'écrase pas le logo dans un cercle qui rogne les bords
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
              expiration: {
                maxEntries: 2000,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours — sans ça Workbox garde les tuiles indéfiniment
              },
              cacheableResponse: {
                statuses: [0, 200], // sans ça, Workbox peut essayer de cacher des réponses opaques/erreur et planter silencieusement
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.airtable\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "airtable-data",
              networkTimeoutSeconds: 3, // bascule sur le cache si le réseau met plus de 3s à répondre, au lieu d'attendre indéfiniment
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 jours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
