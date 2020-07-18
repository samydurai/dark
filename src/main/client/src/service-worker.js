import * as navigationPreload from "workbox-navigation-preload";
import { precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { skipWaiting, clientsClaim } from "workbox-core";
import { NetworkOnly } from "workbox-strategies";

const CACHE_NAME = "offline-html";
const FALLBACK_HTML_URL = "/offline.html";
self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(FALLBACK_HTML_URL))
  );
});

navigationPreload.enable();

const networkOnly = new NetworkOnly();
const navigationHandler = async (params) => {
  try {
    return await networkOnly.handle(params);
  } catch (error) {
    return caches.match(FALLBACK_HTML_URL, {
      cacheName: CACHE_NAME,
    });
  }
};

// Register this strategy to handle all navigations.
registerRoute(new NavigationRoute(navigationHandler));
precacheAndRoute(self.__WB_MANIFEST);

clientsClaim();
skipWaiting();
