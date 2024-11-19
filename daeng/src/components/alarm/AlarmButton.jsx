import React from 'react'
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 43px;
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
  margin-right: 68px;
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
  return (
    <ButtonContainer>
      <NextButton>다음에</NextButton>
      <AgreeButton>알림 받기 </AgreeButton>
    </ButtonContainer>
  )
}

export default AlarmButton
