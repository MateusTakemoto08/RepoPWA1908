const CACHE_NAME = 'pwa-tarefas-v1';
const ASSETS = [
  '/RepoPWA1908/',
  '/RepoPWA1908/index.html',
  '/RepoPWA1908/style.css',
  '/RepoPWA1908/app.js',
  '/RepoPWA1908/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  console.log('Service Worker instalado');
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  console.log('Service Worker ativado');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request);
    })
  );
});
