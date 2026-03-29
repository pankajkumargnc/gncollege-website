self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        return caches.delete(key);
      }));
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Do nothing. Let the browser handle the fetch.
});
