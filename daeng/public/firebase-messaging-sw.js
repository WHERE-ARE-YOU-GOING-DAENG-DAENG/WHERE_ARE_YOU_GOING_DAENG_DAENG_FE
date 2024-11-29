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

// Firebase Messaging 객체 초기화
const messaging = firebase.messaging();

// 백그라운드에서 푸시 알림 수신
messaging.onBackgroundMessage(function(payload) {
  console.log('백그라운드에서 푸시 알림 받음:', payload);

  // 푸시 메시지에서 제목과 본문을 가져옵니다.
  const { title, body, icon } = payload.notification;

  // 알림을 화면에 표시
  self.registration.showNotification(title, {
    body: body,
    icon: icon, // 필요에 따라 아이콘 추가
  });
});
