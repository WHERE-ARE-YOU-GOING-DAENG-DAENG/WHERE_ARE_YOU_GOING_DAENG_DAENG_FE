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
self.addEventListener('notificationclick', (event) => {
    console.log('Notification Data:', event.notification.data);
    event.notification.close();
    const landing_url = event.notification.data ? event.notification.data.url : null;
    const newPath = landing_url ? landing_url : '/'; 

    const urlToOpen = new URL(newPath); 

    event.waitUntil(
        self.clients.matchAll({
            type: 'window',
            includeUncontrolled: true, 
        }).then((windowClients) => {
            let foundWindowClient = null;
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

            if (foundWindowClient) {
                return foundWindowClient.focus().then((focusedClient) => {
                    if ("navigate" in focusedClient) {
                        focusedClient.postMessage(urlToOpen.href);
                    }
                });

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
