import React, { useState } from "react";
import styled from "styled-components";
import { requestNotificationPermission } from '../../firebase/firebaseMessaging';
import axios from 'axios';
import { pushAgree } from '../../data/CommonCode';
import AlertDialog from "../commons/SweetAlert";
import AlarmDelete from './AlarmDelete';

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
  background-color: #FF69A9;
  color: #FFFFFF;
  border: none;
  margin-right: 20%;
  font-size: 20px;
  cursor: pointer;
`;


function AlarmButton() {
  const [selectedPushType] = useState(pushAgree[0].code);

  const handleNotificationRequest = async () => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        console.log('FCM 토큰 발급 성공:', token);
        AlertDialog({
          mode: "alert",
          title: "알림 허용",
          text: "알림 허용이 완료되었습니다.",
          confirmText: "확인",
          icon: "success", 
        });

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
          console.log('서버에 FCM 토큰 전송 성공:', response.data);
        } else {
          console.error('서버에 FCM 토큰 전송 실패:', response);
        }
      } else {
        console.error('알림 권한 요청 실패');
      }
    } catch (error) {
      console.error('알림 권한 요청 중 오류 발생:', error);
      AlertDialog({
        mode: "alert",
        title: "오류",
        text: "이미 알림을 활성화 했어요",
        confirmText: "닫기",
      });
    }
  };

  return (
    <ButtonContainer>
      <AgreeButton onClick={handleNotificationRequest}>알림 받기</AgreeButton>
      <AlarmDelete>알림 취소</AlarmDelete>
    </ButtonContainer>
  );
}

export default AlarmButton;
