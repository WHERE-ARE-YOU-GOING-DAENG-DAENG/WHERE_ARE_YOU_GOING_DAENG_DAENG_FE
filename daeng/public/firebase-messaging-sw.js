importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyC2msjHQWn7iopQAoOIx9Vy86X7QMK-8HQ",
  projectId: "daengdaeng-98c99",
  messagingSenderId: "495128991810",
  appId: "1:495128991810:web:9f1b33ff219866069935db"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 푸시 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // 알림 닫기

    // 백엔드에서 넘겨준 "url" 데이터가 event.notification.data에 포함됨
    const landing_url = event.notification.data ? event.notification.data.url : null;
    const newPath = landing_url ? landing_url : '/'; 

    const urlToOpen = new URL(newPath); // 최종 URL 생성

    // 비동기 작업을 수행하기 위한 메서드로 아래 Promise가 완료될 때까지 이벤트 수명을 연장
    event.waitUntil(
        self.clients.matchAll({
            type: 'window',
            includeUncontrolled: true, // 제어하고 있지 않은 클라이언트까지 포함
        }).then((windowClients) => {
            let foundWindowClient = null;
            // 이미 열려 있는 창에서 서비스와 관련된 URL을 찾기 위한 로직
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];

                if (
                    (new URL(client.url).hostname.includes("docent")) &&
                    "focus" in client
                ) {
                    foundWindowClient = client;
                    break;
                }
            }

            // 만약 백그라운드에 해당 서비스가 있다면
            if (foundWindowClient) {
                // 해당 탭을 focus하여 이동시킴
                return foundWindowClient.focus().then((focusedClient) => {
                    if ("navigate" in focusedClient) {
                        // 원하는 주소로 이동
                        focusedClient.postMessage(urlToOpen.href);
                    }
                });

            // 그게 아니라면 새창을 열어서 원하는 URL로 이동시킴
            } else if (self.clients.openWindow) {
                return self.clients.openWindow(urlToOpen.href);
            }
        })
    );
});


messaging.onBackgroundMessage((payload) => {
    console.log("백그라운드에서 푸시 알림 수신:", payload);

    if (payload.data) {
        const { title, body, icon, url } = payload.data;

        self.registration.showNotification(title || "제목 없음", {
            body: body || "내용이 없습니다.",
            icon: icon || '/alarm_logo.png',
            data: { url: url || '/' }, 
        });
        }
    });
