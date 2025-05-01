const CACHE_NAME = 'portfolio-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/favicon.png',
  '/icons/apple-touch-icon.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install the service worker and cache the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Return from cache if available
        }
        return fetch(event.request) // Otherwise fetch from network
          .then((response) => {
            // Skip caching for API requests
            if (
              !event.request.url.includes('/api/') &&
              event.request.method === 'GET'
            ) {
              // Clone the response before returning it
              let responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return response;
          })
          .catch(() => {
            // For HTML requests, return a fallback offline page
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/');
            }
          });
      })
  );
});
