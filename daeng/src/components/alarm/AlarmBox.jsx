import React from 'react';
import styled from "styled-components";
import alarmLogo from '../../assets/icons/alarmLogo.svg';

const AlarmContainer = styled.div`
  width: 100%;
  height: 439px;
  background-color: #FF69A9;
  border-radius: 0 0 30px 30px;
  display: flex; 
  flex-direction: column;
  align-items: center; 
`;

const TextLabel = styled.p`
  margin-top:30px;
  font-size: 2rem;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 1.5;
  text-align: center; 
`;

const StyledImg = styled.img`
  width: 60%;
  height: auto;
  display: block; 
  margin-bottom: 30px; 
`;

function AlarmBox() {
  return (
    <AlarmContainer>
      <TextLabel>알림을 활성화하고<br/> 최신 소식을 바로 받아보세요</TextLabel>
      <StyledImg src={alarmLogo} alt="알림 페이지 로고" />
    </AlarmContainer>
  );
}

export default AlarmBox;
