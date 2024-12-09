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

messaging.onBackgroundMessage(function(payload) {
  console.log('백그라운드에서 푸시 알림 받음:', payload);

  const { title, body } = payload.notification;
  const icon = payload.notification.icon || '/alarm_logo.png';

  self.registration.showNotification(title, {
    body: body,
    icon: icon,
  });
});
