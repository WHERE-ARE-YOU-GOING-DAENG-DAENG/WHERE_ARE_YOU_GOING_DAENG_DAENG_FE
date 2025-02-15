import React, { useEffect, useState } from "react";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import styled, { keyframes } from "styled-components";
import { requestNotificationPermission } from "../../firebase/firebaseMessaging";
import AlertDialog from "../../components/commons/SweetAlert";
import axiosInstance from "../../services/axiosInstance";
import { pushAgree } from "../../data/CommonCode";
import AlarmList from "../../components/alarm/AlarmList";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const AlarmContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: auto;
  padding: 30px 20px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #f2f2f2;
  background: linear-gradient(to bottom, #fff, #f9f9f9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  border: none;
  border-radius: 8px;
  color: #fff;
  background-color: ${({ isSubscribed }) => (isSubscribed ? "#FFC1DA" : "#FF69A9")};
  cursor: pointer;

  &:hover {
    background-color: ${({ isSubscribed }) =>
      isSubscribed ? "#FFD7EB" : "#FF4580"};
  }
`;

const skeletonAnimation = keyframes`
  0% { background-color: #e0e0e0; }
  50% { background-color: #f0f0f0; }
  100% { background-color: #e0e0e0; }
`;

const SkeletonBox = styled.div`
  width: 100%;
  height: ${({ height }) => height || "20px"};
  margin: 10px 0;
  border-radius: 8px;
  animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
`;

function AlarmSkeleton() {
  return (
    <AlarmContainer>
      <SkeletonBox height="50px" />
      <SkeletonBox height="20px" width="80%" />
    </AlarmContainer>
  );
}


function AlarmPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPushType] = useState(pushAgree[0].code);

  useEffect(() => {
    const fetchNotificationConsent = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          "/api/v1/notifications/consent",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setIsSubscribed(response.data.data.isNotificationConsent);
        } else {
          console.error("알림 활성화 상태 확인 실패:", response);
        }
      } catch (error) {
        console.error("알림 활성화 상태 요청 중 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotificationConsent();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .catch((error) => {
          console.error("Service Worker 등록 실패:", error);
        });
    } else {
      console.warn("이 브라우저는 Service Worker를 지원하지 않습니다.");
    }
  }, []); 

  const handleNotificationRequest = async () => {
    setIsLoading(true);
    try {
      const token = await requestNotificationPermission();
      if (token) {
        const response = await axiosInstance.post(
          "/api/v1/notifications/pushToken",
          {
            token,
            pushType: selectedPushType,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setIsSubscribed(true);
          AlertDialog({
            mode: "alert",
            title: "알림 활성화 성공",
            text: "알림이 성공적으로 활성화되었습니다.",
            confirmText: "확인",
            icon: "success",
          });
        }
      }
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "오류",
        text: "알림 활성화 요청 중 문제가 발생했습니다.",
        confirmText: "닫기",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelNotification = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(
        "/api/v1/notifications",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsSubscribed(false);
        AlertDialog({
          mode: "alert",
          title: "알림 비활성화 성공",
          text: "알림이 성공적으로 비활성화되었습니다.",
          confirmText: "확인",
          icon: "success",
        });
      }
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "오류",
        text: "알림 비활성화 요청 중 문제가 발생했습니다.",
        confirmText: "닫기",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Header label="알림" />
      <Content>
        {isLoading ? (
          <AlarmSkeleton /> 
        ) : (
          <AlarmContainer>
            <ToggleButton $isSubscribed={isSubscribed} onClick={isSubscribed ? handleCancelNotification : handleNotificationRequest} disabled={isLoading}>
              {isSubscribed ? "알림 그만 받기" : "알림 받기"}
            </ToggleButton>
            <p>{isSubscribed ? "현재 알림이 활성화된 상태입니다." : "현재 알림이 비활성화된 상태입니다."}</p>
          </AlarmContainer>
        )}
        {isSubscribed && <AlarmList activeTab="subscribe" />}
      </Content>
      <Footer />
    </PageContainer>
  );
}

export default AlarmPage;