import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

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

// 포그라운드에서 푸시 알림을 수신하고 처리
export const setupOnMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log("알림 내용: ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      image: payload.notification.image,
      icon: payload.notification.icon || '/alarm-logo.png',  // 나중에 라이브러리로 처리할까 고민중..
    };

    const notification = new Notification(notificationTitle, notificationOptions);

    notification.onclick = function (event) {
      event.preventDefault(); 
      console.log("알림 클릭");
      notification.close(); 
    };
  });
};

setupOnMessageHandler();
