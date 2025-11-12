// Service Worker for Benjamin Filler Portfolio
// Provides offline support and caching for static assets

const CACHE_VERSION = 'v1';
const CACHE_NAME = `bf-portfolio-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/fonts/space-grotesk/space-grotesk-v22-latin-regular.woff2',
  '/fonts/space-grotesk/space-grotesk-v22-latin-600.woff2',
  '/fonts/archivo-black/archivo-black-v23-latin-regular.woff2',
  '/images/BenjaminFiller2.png',
];

// Install: Pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('bf-portfolio-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: Network-first with cache fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone response and cache it
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) return cachedResponse;
            
            // No cache, return offline fallback
            return new Response('Offline - content unavailable', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});
