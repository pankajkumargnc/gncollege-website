// ═══════════════════════════════════════════════════════════════════════
// GNC College — Service Worker v1.1
// Strategy:
//   • App Shell (HTML/CSS/JS/fonts) → Cache First
//   • Images → Cache First with fallback
//   • Firebase API calls → Network Only (real-time data must be fresh)
//   • External URLs (YouTube, BBMKU etc.) → Network Only
// ✅ FIX v1.1: Dev server .jsx/.tsx source files bypass added
// ✅ FIX v1.1: CDN workers (unpkg, cdnjs) bypass added — CORS error fix
// ═══════════════════════════════════════════════════════════════════════

const CACHE_NAME     = 'gnc-cache-v1';
const RUNTIME_CACHE  = 'gnc-runtime-v1';
const IMAGE_CACHE    = 'gnc-images-v1';

// ── Files to cache immediately on install ────────────────────────────
const PRECACHE_URLS = [
  './',
  './index.html',
  './images/logo.webp',
  './images/college_photo.webp',
];

// ── These origins always go to network ──────────────────────────────
const NETWORK_ONLY_ORIGINS = [
  'firestore.googleapis.com',
  'firebase.googleapis.com',
  'identitytoolkit.googleapis.com',
  'securetoken.googleapis.com',
  'googleapis.com',
  'youtube.com',
  'youtu.be',
  'bbmkuniv.in',
  'mastersofterp.in',
  'jharkhanduniversities.nic.in',
  'imgbb.com',
];

// ── Offline fallback page ────────────────────────────────────────────
const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>GNC — Offline</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:system-ui,sans-serif;background:#0f2347;color:#fff;
         min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;}
    .box{max-width:400px;}
    .icon{font-size:64px;margin-bottom:20px;}
    h1{font-size:24px;font-weight:800;margin-bottom:10px;color:#f4a023;}
    p{font-size:14px;opacity:.7;line-height:1.7;margin-bottom:24px;}
    a{display:inline-block;background:#f4a023;color:#0f2347;padding:12px 28px;
      border-radius:50px;font-weight:800;text-decoration:none;font-size:14px;}
  </style>
</head>
<body>
  <div class="box">
    <div class="icon">📡</div>
    <h1>Aap Offline Hain</h1>
    <p>Internet connection nahi hai. Please internet connect karein aur page reload karein.</p>
    <a href="/gncollege-website/">🔄 Retry</a>
  </div>
</body>
</html>`;

// ════════════════════════════════════════════════════════════════════
// INSTALL — Precache app shell
// ════════════════════════════════════════════════════════════════════
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Precache failed:', err))
  );
});

// ════════════════════════════════════════════════════════════════════
// ACTIVATE — Clean old caches
// ════════════════════════════════════════════════════════════════════
self.addEventListener('activate', event => {
  const VALID_CACHES = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => !VALID_CACHES.includes(key))
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim())
  );
});

// ════════════════════════════════════════════════════════════════════
// FETCH — Smart routing
// ════════════════════════════════════════════════════════════════════
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and non-http
  if (!request.url.startsWith('http')) return;

  // ✅ FIX: Dev server source files — kabhi intercept mat karo
  // Vite dev server localhost pe .jsx/.tsx serve karta hai,
  // SW intercept se FetchEvent network error aata tha
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    if (
      url.pathname.endsWith('.jsx')         ||
      url.pathname.endsWith('.tsx')         ||
      url.pathname.endsWith('.ts')          ||
      url.pathname.includes('/@vite/')      ||
      url.pathname.includes('/@react-refresh') ||
      url.pathname.includes('/@fs/')        ||
      url.pathname.includes('/node_modules/') ||
      url.pathname.includes('?v=')          ||   // Vite versioned assets
      url.pathname.includes('?import')          // Vite import queries
    ) {
      return; // SW bilkul handle nahi karega — browser seedha fetch karega
    }
  }

  // ✅ FIX: CDN workers bypass — unpkg/cdnjs CORS block fix
  // pdfjs-dist worker inhi CDN se aata hai, SW intercept se CORS fail hota tha
  if (
    url.hostname.includes('unpkg.com')            ||
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.hostname.includes('cdn.jsdelivr.net')
  ) {
    return; // Network directly — no SW caching for CDN workers
  }

  // Network-only origins (Firebase, YouTube, external portals)
  const isNetworkOnly = NETWORK_ONLY_ORIGINS.some(origin => url.hostname.includes(origin));
  if (isNetworkOnly) {
    event.respondWith(fetch(request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Images — Cache First with long TTL
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // App shell (HTML navigation) — Network First, fallback to cache, then offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request)
            .then(cached => cached || caches.match('/gncollege-website/index.html'))
            .then(cached => cached || new Response(OFFLINE_HTML, {
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            }))
        )
    );
    return;
  }

  // JS/CSS/Fonts — Stale While Revalidate
  if (
    request.destination === 'script' ||
    request.destination === 'style'  ||
    request.destination === 'font'
  ) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
    return;
  }

  // Everything else — Network First
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// ════════════════════════════════════════════════════════════════════
// HELPER: Cache First
// ════════════════════════════════════════════════════════════════════
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 404 });
  }
}

// ════════════════════════════════════════════════════════════════════
// HELPER: Stale While Revalidate
// ════════════════════════════════════════════════════════════════════
async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  return cached || fetchPromise;
}

// ════════════════════════════════════════════════════════════════════
// PUSH NOTIFICATIONS (Firebase Cloud Messaging ready)
// ════════════════════════════════════════════════════════════════════
self.addEventListener('push', event => {
  if (!event.data) return;

  let data = {};
  try { data = event.data.json(); } catch { data = { title: 'GNC Update', body: event.data.text() }; }

  const options = {
    body:    data.body    || 'Naya update available hai',
    icon:    '/gncollege-website/images/logo.webp',
    badge:   '/gncollege-website/images/logo.webp',
    tag:     data.tag     || 'gnc-notification',
    data:    { url: data.url || '/gncollege-website/' },
    actions: [
      { action: 'open',    title: 'Open Website' },
      { action: 'dismiss', title: 'Dismiss'      },
    ],
    vibrate:   [200, 100, 200],
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '📢 Guru Nanak College', options)
  );
});

// Notification click handle
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const url = event.notification.data?.url || '/gncollege-website/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});