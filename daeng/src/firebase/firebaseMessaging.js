import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";
// 알림 권한 요청 및 토큰 가져오기
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

// 포그라운드 메시지 수신 핸들러
export const setupOnMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log("알림 내용: ", payload);
  });
};
