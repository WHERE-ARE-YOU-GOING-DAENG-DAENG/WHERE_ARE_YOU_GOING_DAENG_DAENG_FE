importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Firebase 설정
const firebaseConfig = {
   apiKey: "AIzaSyC2msjHQWn7iopQAoOIx9Vy86X7QMK-8HQ",
   projectId: "daengdaeng-98c99",
   messagingSenderId: "495128991810",
   appId: "1:495128991810:web:9f1b33ff219866069935db"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 백그라운드 알림 처리
messaging.onBackgroundMessage(function(payload) {
  console.log('서비스 워커에서 푸시 알림 수신:', payload);

   // payload에서 실제 알림 정보 추출
  const notificationTitle = payload.notification?.title || '새로운 알림!';
  const notificationOptions = {
    body: payload.notification?.body || '새로운 알림이 도착했습니다.',
  };

   // 알림 표시
  self.registration.showNotification(notificationTitle, notificationOptions);
});