importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyC2msjHQWn7iopQAoOIx9Vy86X7QMK-8HQ",
  projectId: "daengdaeng-98c99",
  messagingSenderId: "495128991810",
  appId: "1:495128991810:web:9f1b33ff219866069935db"
};


const messaging = firebase.messaging();

// 백그라운드에서 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 메시지 수신:', payload);

  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '알림 제목 없음', {
    body: body || '알림 내용 없음',
    icon: icon || '/default-icon.png',
  });
});