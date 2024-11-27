import React from 'react';
import { requestNotificationPermission } from '../../firebase/firebaseMessaging';
import styled from "styled-components";


const TestButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 20px;
`

function TestBtn() {
  const handleNotificationRequest = async () => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        console.log('FCM 토큰 발급 성공:', token);
        alert('알림 권한이 설정되었습니다.');
        // 서버로 토큰을 보내거나 저장하는 로직 추가 가능
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
    <TestButton onClick={handleNotificationRequest}>
      알림 권한 설정
    </TestButton>
  );
}

export default TestBtn;