/* 금형 위치 현황판 서비스워커
   - 캐시를 두지 않는 통과(pass-through) 방식 : 항상 최신 index.html 을 서버에서 받는다
   - 설치형 웹앱(PWA) 요건을 채워, NTFY 알림 클릭 시 홈 화면에 설치한 앱으로 바로 열리게 하기 위한 용도 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => { e.respondWith(fetch(e.request)); });
