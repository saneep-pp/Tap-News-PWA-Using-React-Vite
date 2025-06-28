import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // Enable SW in dev
      },
      includeAssets: [
        "favicon.svg",
        "logo192.png",
        "logo512.png",
        "offline.html",
      ],
      manifest: {
        name: "TAP_NEWS",
        short_name: "TAP_NEWS",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        navigateFallback: "/offline.html",
        runtimeCaching: [
          // ✅ News API caching (example for newsdata.io or any API you use)
          {
            urlPattern: /^https:\/\/newsdata\.io\/api\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "news-api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // ✅ News images caching
          {
            urlPattern: /\.(?:jpg|jpeg|png|gif|webp|svg|ico)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "news-image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // ✅ Google Fonts (already fine)
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
              },
            },
          },

          // ✅ JSONPlaceholder API (already in use)
          {
            urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400, // 1 day
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
