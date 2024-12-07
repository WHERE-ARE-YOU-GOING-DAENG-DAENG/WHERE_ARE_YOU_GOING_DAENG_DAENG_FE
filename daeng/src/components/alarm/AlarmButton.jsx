import React from "react";
import styled from "styled-components";
import { requestNotificationPermission } from "../../firebase/firebase";
import axios from "axios";
import AlertDialog from "../commons/SweetAlert";
import { pushAgree } from '../../data/CommonCode';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 43px;
`;

const AgreeButton = styled.button`
  width: 130px;
  height: 54px;
  border-radius: 10px;
  background-color: #ff69a9;
  color: #ffffff;
  border: none;
  margin-right: 20%;
  font-size: 20px;
  cursor: pointer;
`;

function AlarmButton() {
  const selectedPushType = pushAgree[0]?.code || "DEFAULT_TYPE";
  
  const handleNotificationRequest = async () => {
    try {
      // 1. 서비스 워커 중복 등록 방지
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        const alreadyRegistered = registrations.some(
          (registration) => registration.active?.scriptURL === `${location.origin}/firebase-messaging-sw.js`
        );

        if (!alreadyRegistered) {
          const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
          console.log("서비스 워커 등록 성공:", registration);
        } else {
          console.log("이미 등록된 서비스 워커가 있습니다.");
        }
      } else {
        console.warn("서비스 워커를 지원하지 않는 브라우저입니다.");
        return;
      }

      // 2. 알림 권한 요청 및 토큰 발급
      const token = await requestNotificationPermission();
      if (!token) {
        console.error("FCM 토큰 발급 실패");
        return;
      }
      console.log("FCM 토큰 발급 성공:", token);

      // 3. 서버로 토큰 전송
      const response = await axios.post(
        'https://www.daengdaeng-where.link/api/v1/notifications/pushToken',
        {
          token,
          pushType: selectedPushType,
        },
        {
          withCredentials: true,  
        }
      );

      if (response.status === 200) {
        console.log("서버로 FCM 토큰 전송 성공:", response.data);
        AlertDialog({
          mode: "alert",
          title: "알림 활성화",
          text: "알림이 성공적으로 활성화되었습니다.",
          confirmText: "확인",
          icon: "success",
        });
      } else {
        console.error("서버로 FCM 토큰 전송 실패:", response);
      }
    } catch (error) {
      console.error("알림 요청 중 오류 발생:", error);
      AlertDialog({
        mode: "alert",
        title: "오류",
        text: "알림 활성화 중 오류가 발생했습니다.",
        confirmText: "닫기",
      });
    }
  };

  return (
    <ButtonContainer>
      <AgreeButton onClick={handleNotificationRequest}>알림 받기</AgreeButton>
    </ButtonContainer>
  );
}

export default AlarmButton;
