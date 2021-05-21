var cacheName = 'wideview-app';
var filesToCache = [
  '/build/images/logo.svg',
  '/build/images/apartment_sea-1920.jpg',
  '/build/images/dining-room-1920.jpg',
  '/build/images/apartment-1920.jpg',
  '/build/images/city_640.jpg',
  '/build/images/countryside_640.jpg',
  '/build/images/mountains_640.jpg',
  '/build/images/seaside_640.jpg',
  '/build/static/css/2.9233ae65.chunk.css',
  '/build/static/css/2.9233ae65.chunk.css.map',
  '/build/static/css/main.e79ae05c.chunk.css',
  '/build/static/css/main.e79ae05c.chunk.css.map',
  '/build/static/js/2.97b9c82d.chunk.js',
  '/build/static/js/2.97b9c82d.chunk.js.map',
  '/build/static/js/main.0f113a36.chunk.js',
  '/build/static/js/main.0f113a36.chunk.js.map',
  '/build/static/js/runtime-main.e923f907.js',
  '/build/static/js/runtime-main.e923f907.js.map',
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
