const CACHE_NAME = "algebra-2025-cache-v1";
const urlsToCache = [
  "/algebra2025/",
  "/algebra2025/index.html",
  "/algebra2025/css/styles.css",
  "/algebra2025/js/script.js",
  "/algebra2025/assets/android-chrome-192x192.png",
  "/algebra2025/assets/android-chrome-512x512.png"
];

for (let i = 1; i <= 7; i++) {
  urlsToCache.push(`/algebra2025/assets/libro${i}`);
}

for (let i = 1; i <= 6; i++) {
  urlsToCache.push(`/algebra2025/assets/seg/libro${i}`);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
