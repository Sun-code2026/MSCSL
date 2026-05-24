const CACHE_NAME = 'mscsl-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/mscsl_logo.png'
];

// 서비스 워커 설치 및 핵심 자산 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching core assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// 활성화 시 기존 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 캐시 우선(Cache-First) 네트워크 폴백 전략으로 파일 로딩 속도 최적화
self.addEventListener('fetch', (event) => {
  // 외부 API 호출(Gemini 등)은 캐싱에서 제외
  if (event.request.url.includes('googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // 캐시된 자산 반환
        }
        return fetch(event.request).then((networkResponse) => {
          // 새로운 자산을 원격에서 가져온 뒤 동적 캐싱 필요시 추가 가능
          return networkResponse;
        });
      })
      .catch(() => {
        // 네트워크와 캐시 모두 실패 시 오프라인 페이지 등으로 폴백 가능
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});
