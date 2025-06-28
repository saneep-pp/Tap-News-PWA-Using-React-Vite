import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";
import { Queue } from "workbox-background-sync";

// Precache all assets from build
precacheAndRoute(self.__WB_MANIFEST);

// Fallback page
registerRoute(
  ({ request }) => request.mode === "navigate",
  async ({ event }) => {
    try {
      return await fetch(event.request);
    } catch (error) {
      return caches.match("/offline.html");
    }
  }
);

// API requests with background sync
const bgSyncQueue = new Queue("post-requests");

registerRoute(
  ({ url, request }) => request.method === "POST",
  async ({ request }) => {
    try {
      return await fetch(request.clone());
    } catch (error) {
      await bgSyncQueue.pushRequest({ request });
      return new Response(JSON.stringify({ offline: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
  "POST"
);

// Static files caching
registerRoute(
  ({ request }) =>
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image",
  new StaleWhileRevalidate()
);
