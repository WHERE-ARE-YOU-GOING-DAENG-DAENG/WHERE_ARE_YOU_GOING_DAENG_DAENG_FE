import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 알림 권한 요청 및 FCM 토큰 가져오기
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한 허용");
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (token) {
        console.log("FCM 토큰:", token);
        return token;
      } else {
        console.error("토큰 가져오기 실패");
      }
    } else {
      console.error("알림 권한 거부됨");
    }
  } catch (error) {
    console.error("알림 권한 요청 실패:", error);
  }
};

// 포그라운드에서 푸시 알림 수신 처리
export const setupOnMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);

    const notificationData = {
      title: payload.notification?.title || "알림 제목 없음",
      body: payload.notification?.body || "알림 내용 없음",
      icon: payload.notification?.icon || "/default-icon.png",
    };

    // 알림 표시
    const notification = new Notification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
    });

    notification.onclick = (event) => {
      event.preventDefault();
      console.log("Notification clicked!");
      notification.close();
    };
  });
};

setupOnMessageHandler();

export { app, messaging };
