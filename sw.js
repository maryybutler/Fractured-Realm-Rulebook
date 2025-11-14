// Service Worker for Fractured Realm Rulebook PWA

const CACHE_NAME = 'fractured-realm-cache-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'sw.js',
  'fracturedrealmlogo.png',
  '01.png','02.png','03.png','04.png','05.png','06.png','07.png',
  '08.png','09.png','10.png','11.png','12.png','13.png','14.png',
  '15.png','16.png','17.png'
];

// Install event: cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches if necessary
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if(key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

// Fetch event: serve cached files if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

