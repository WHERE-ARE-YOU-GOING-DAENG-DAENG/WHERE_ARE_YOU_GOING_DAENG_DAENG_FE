importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyC2msjHQWn7iopQAoOIx9Vy86X7QMK-8HQ",
  projectId: "daengdaeng-98c99",
  messagingSenderId: "495128991810",
  appId: "1:495128991810:web:9f1b33ff219866069935db",
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 알림 수신:", payload);

  let notificationTitle = "기본 알림 제목";
  let notificationOptions = {
    body: "기본 알림 메시지",
    icon: "/alarm_logo.png",
    data: { url: "/" }, // 기본 URL 설정
  };

  // `data` 필드를 우선적으로 사용
  if (payload.data) {
    notificationTitle = payload.data.title || notificationTitle;
    notificationOptions.body = payload.data.body || notificationOptions.body;
    notificationOptions.icon = payload.data.icon || notificationOptions.icon;
    notificationOptions.data.url = payload.data.url || notificationOptions.data.url;
  } 
  // Safari, Edge 등의 브라우저에서 `notification` 필드를 사용
  else if (payload.notification) {
    notificationTitle = payload.notification.title || notificationTitle;
    notificationOptions.body = payload.notification.body || notificationOptions.body;
    notificationOptions.icon = payload.notification.icon || notificationOptions.icon;
  }

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트
self.addEventListener('notificationclick', (event) => {
  console.log('알림 클릭됨:', event.notification);

  const url = event.notification.data?.url || '/';
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (let client of clients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});
