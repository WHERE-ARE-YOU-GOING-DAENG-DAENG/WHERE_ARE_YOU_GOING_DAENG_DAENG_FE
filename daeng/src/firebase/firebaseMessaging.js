import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

// 알림 권한 요청 및 토큰 가져오기
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

// 메시지 핸들러 설정
export const setupOnMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log("알림 수신:", payload);

    // 페이지가 백그라운드 상태인지 확인
    if (document.visibilityState === "hidden") {
      console.log("백그라운드 상태에서는 알림을 표시하지 않습니다.");
      return;
    }

    // 알림 데이터 추출
    let notificationTitle = "알림";
    let notificationOptions = {
      body: "내용이 없습니다.",
      icon: "/alarm-logo.png",
      data: { url: "/" }, // 기본 URL 설정
    };

    if (payload.data) {
      // payload.data 사용
      notificationTitle = payload.data.title || notificationTitle;
      notificationOptions.body = payload.data.body || notificationOptions.body;
      notificationOptions.icon = payload.data.icon || notificationOptions.icon;
      notificationOptions.data.url = payload.data.url || notificationOptions.data.url;
    } else if (payload.notification) {
      // payload.notification Fallback 사용
      notificationTitle = payload.notification.title || notificationTitle;
      notificationOptions.body = payload.notification.body || notificationOptions.body;
      notificationOptions.icon = payload.notification.icon || notificationOptions.icon;
    }

    // 알림 생성 및 클릭 이벤트
    const notification = new Notification(notificationTitle, notificationOptions);

    notification.onclick = (event) => {
      event.preventDefault();
      const url = notificationOptions.data?.url || "/";
      window.location.href = url;
      notification.close();
    };
  });
};

// 메시지 핸들러 초기화 호출
setupOnMessageHandler();
