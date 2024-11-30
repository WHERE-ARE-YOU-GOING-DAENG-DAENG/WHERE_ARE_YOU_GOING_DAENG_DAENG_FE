import React from 'react'
import styled from "styled-components";
import { requestNotificationPermission } from '../../firebase/firebaseMessaging';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 43px;
  margin-right: 10%;
  margin-left: 10%;
  justify-content: center;
`
const NextButton = styled.button`
  width: 153px;
  height:54px;
  border-radius: 10px;
  background-color: #FDF2F8;
  color: #FF69A9;
  border: none;
  font-size: 20px;
  margin-right: 14%;
  cursor: pointer;
`

const AgreeButton = styled.button`
  width: 153px;
  height:54px;
  border-radius: 10px;
  background-color: #FF69A9;
  color: #FFFFFF;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

function AlarmButton() {

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
    <ButtonContainer>
      <NextButton>다음에</NextButton>
      <AgreeButton onClick={handleNotificationRequest}>알림 받기 </AgreeButton>
    </ButtonContainer>
  )
}

export default AlarmButton
