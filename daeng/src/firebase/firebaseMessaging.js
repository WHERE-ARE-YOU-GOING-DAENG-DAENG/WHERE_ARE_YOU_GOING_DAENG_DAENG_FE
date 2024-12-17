import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (token) {
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

export const setupOnMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log("알림 수신:", payload);

      if (document.visibilityState === "hidden") {
        console.log("백그라운드 상태에서는 알림을 표시하지 않습니다.");
        return;
        }
  
    if (payload && payload.data) {
      const { title, body, image, icon} = payload.data;

      console.log("수신된 URL:", url); 
      const notificationTitle = title || "알림";
      const notificationOptions = {
        body: body || "내용이 없습니다.",
        image: image || null,
        icon: icon || "/alarm-logo.png",
      };

      const notification = new Notification(notificationTitle, notificationOptions);

      notification.onclick = function (event) {
        const url = payload.data.url; 
        event.preventDefault();
        if (url) {
          console.log("이동할 URL:", url);
          window.location.href = url; 
        } else {
          console.error("URL 데이터가 없습니다.");
        }
        notification.close();
      };
    } else {
      console.log("페이지가 백그라운드 상태입니다. 포그라운드 상태에서만 알림을 표시합니다.");
    }
  });
};

setupOnMessageHandler();
