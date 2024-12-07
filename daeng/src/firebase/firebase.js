import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from 'firebase/messaging';
import { getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const processedMessages = new Set();

// 알림 권한 요청 및 토큰 발급
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

// 포그라운드 메시지 핸들러
export const setupForegroundMessageHandler = () => {
  onMessage(messaging, (payload) => {
    const messageId = payload.messageId;
    
    // 중복 메시지 체크 > 현재 계속 두 번 옴
    if (processedMessages.has(messageId)) {
      return;
    }
    
    processedMessages.add(messageId);
    
    console.log("푸시 알림 받음: ", payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
    };
    
    const notification = new Notification(notificationTitle, notificationOptions);
    
    notification.onclick = function (event) {
      event.preventDefault();
      console.log("알림 클릭됨");
      notification.close();
    };
  });
};

export { messaging };