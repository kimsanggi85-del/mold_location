/* 금형 위치 현황판 서비스워커
   - 캐시를 두지 않는 통과(pass-through) 방식 : 항상 최신 index.html 을 서버에서 받는다
   - 설치형 웹앱(PWA) 요건을 채워, NTFY 알림 클릭 시 홈 화면에 설치한 앱으로 바로 열리게 하기 위한 용도 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
/* 화면(HTML) 요청은 항상 서버에 재확인해서 받는다 — GitHub Pages 의 10분 캐시 때문에 배포 직후 옛 버전이 보이는 일을 막는다.
   서버가 '변경 없음'이면 그대로 쓰고, 오프라인이면 브라우저 캐시본으로 대체한다 */
self.addEventListener('fetch', e => {
  const r = e.request;
  const isPage = r.mode === 'navigate' || (r.destination === 'document') || /\/(index\.html)?(\?.*)?$/.test(new URL(r.url).pathname);
  if (isPage && r.method === 'GET' && new URL(r.url).origin === self.location.origin) {
    e.respondWith(fetch(r, { cache: 'no-cache' }).catch(() => caches.match(r).then(x => x || fetch(r))));
    return;
  }
  e.respondWith(fetch(r));
});
