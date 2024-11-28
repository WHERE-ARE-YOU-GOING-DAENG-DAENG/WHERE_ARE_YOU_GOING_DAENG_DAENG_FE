// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from 'firebase/messaging';

// Firebase 설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Messaging 초기화
const messaging = getMessaging(app);

// 포그라운드에서 푸시 알림을 수신하고 처리하는 핸들러
onMessage(messaging, (payload) => {
  console.log("푸시 알림 받음: ", payload);

  // 알림 정보 추출
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon, // 알림 아이콘 (선택 사항)
  };

  // 알림을 화면에 표시 (브라우저 알림으로)
  new Notification(notificationTitle, notificationOptions);
});

export { messaging };
