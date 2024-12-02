import React, { useState } from "react";
import styled from "styled-components";
import { requestNotificationPermission } from '../../firebase/firebaseMessaging';
import axios from 'axios';
import { pushAgree } from '../../data/CommonCode';
import AlarmDelete from "./AlarmDelete";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 43px;
`;

const Dropdown = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const AgreeButton = styled.button`
  width: 153px;
  height: 54px;
  border-radius: 10px;
  background-color: #FF69A9;
  color: #FFFFFF;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;


function AlarmButton() {
  const [selectedPushType] = useState(pushAgree[0].code); // 항상 "PUSH_TYP_01"로 설정

  const handleNotificationRequest = async () => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        console.log('FCM 토큰 발급 성공:', token);
        alert('알림 권한이 설정되었습니다.');

        const response = await axios.post('https://www.daengdaeng-where.link/api/v1/notifications/pushToken', {
          token,
          pushType: selectedPushType, // 항상 "PUSH_TYP_01" 사용
        });

        if (response.status === 200) {
          console.log('서버에 FCM 토큰 전송 성공:', response.data);
          alert('서버에 알림 토큰이 성공적으로 전송되었습니다.');
        } else {
          console.error('서버에 FCM 토큰 전송 실패:', response);
          alert('서버로 토큰 전송에 실패했습니다.');
        }
      } else {
        console.error('알림 권한 요청 실패');
        alert('알림 권한 요청이 거부되었습니다.');
      }
    } catch (error) {
      console.error('알림 권한 요청 중 오류 발생:', error);
      alert('알림 권한 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <ButtonContainer>
      <AgreeButton onClick={handleNotificationRequest}>알림 받기</AgreeButton>
      <AlarmDelete />
    </ButtonContainer>
  );
}

export default AlarmButton;
