const CACHE_NAME = 'mpower-cache-v2';
const urlsToCache = [
  '/app/',
  '/app/index.html',
  '/app/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Bypass Service Worker for video/audio range requests and static assets to prevent ERR_ABORTED
  if (
    event.request.headers.get('range') ||
    url.pathname.endsWith('.mp4') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/app/assets/')
  ) {
    return; // Let the browser handle it directly
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
