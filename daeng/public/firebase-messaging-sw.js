importScripts("https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.24.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 알림 처리
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
