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

// 백그라운드에서 푸시 알림 받기
messaging.onBackgroundMessage(function (payload) {
  console.log("백그라운드에서 푸시 알림 받음:", payload);

  // payload.data에서 title, body, icon, url 가져오기
  const { title, body, icon, url } = payload.data;

  const notificationTitle = title || "새 알림";
  const notificationOptions = {
    body: body || "내용이 없습니다.",
    icon: icon || "/alarm_logo.png",
    data: { url: url }, // 데이터로 URL 전달
  };

  // 알림 표시
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 푸시 알림 클릭 처리
self.addEventListener("notificationclick", (event) => {
  console.log("알림 클릭 이벤트 발생:", event);
  event.notification.close(); // 알림 닫기

  // data.url을 통해 URL 가져오기
  const landing_url = event.notification.data ? event.notification.data.url : null;
  const newPath = landing_url ? landing_url : "/";

  const urlToOpen = new URL(newPath, self.location.origin);

  event.waitUntil(
    self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    }).then((windowClients) => {
      let foundWindowClient = null;

      // 이미 열려있는 창을 확인
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen.href && "focus" in client) {
          foundWindowClient = client;
          break;
        }
      }

      // 창이 이미 열려 있으면 focus
      if (foundWindowClient) {
        return foundWindowClient.focus();
      }

      // 열려있지 않으면 새 창 열기
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen.href);
      }
    })
  );
});
