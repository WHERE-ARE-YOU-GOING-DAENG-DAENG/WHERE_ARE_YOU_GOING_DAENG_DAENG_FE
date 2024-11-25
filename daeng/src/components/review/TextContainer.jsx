import React, { useState } from 'react'
import styled from "styled-components";
import ConfirmBtn from '../../components/commons/ConfirmBtn';
import AlertDialog from '../../components/commons/SweetAlert';

const Question = styled.span`
  font-size: 15px;
  display: inline; 
  color: #333;

  p {
    display: inline-block;
    font-size: 13px;
    color: #D9D9D9;
    margin-left: 5px;
  }
`

const CountText = styled.span`
  font-size: 11px;
  color: #FF0000;
  margin-top:3px;
  margin-right:10px;
`

const TextDescriptionContainer = styled.div`
  margin-top: 20px;
  display: flex;
  margin-bottom: -12px;
  justify-content: space-between;  
  align-items: center;  
`
const DivisionLine = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  margin-top:20px;
  margin-right:10px;
  margin-bottom:29px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: auto;
  min-height: 400px; 
  border: none;
  padding: 5px;
  resize: none; 
  font-size:13px;
  line-height: 1.5; 

  &:focus {
    outline: none;    
    border: none;  
    box-shadow: none;
  }

  @media (max-width: 554px) {
    min-height: 50px;
  }
`;


function TextContainer() {
  const [text, setText] = useState('');
  const maxLength = 500;

  const handleChange = (e) => {
    if (e.target.value.length > maxLength) {
      AlertDialog({
        mode: "alert",
        title: "선택 제한",
        text: `최대 ${maxLength}자까지만 작성 가능합니다.`,
        confirmText: "닫기" 
      });
    } else {
      setText(e.target.value);  
    }
  };

  return (
    <>
    <TextDescriptionContainer>
      <Question>리뷰를 작성해주세요</Question>
      <CountText>{text.length}자 | 최대 500자</CountText>
    </TextDescriptionContainer>
    <DivisionLine />
    <TextArea type='text' placeholder='경험을 공유해주세요' value={text} onChange={handleChange}/>
    <DivisionLine />
    <ConfirmBtn marginBottom="29px" label="작성 완료" />
    </>
  )
}

export default TextContainer
