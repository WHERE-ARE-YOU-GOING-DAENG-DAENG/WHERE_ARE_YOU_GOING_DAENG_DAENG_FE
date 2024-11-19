import React from 'react'
import styled from "styled-components";
import SelectLabel from "../../components/SelectLabel"

const InputAllContainer = styled.div`
  display: flex;
  flex-direction: column;
` 
const InputContainer = styled.input`
  width:323px;
  height: 44px;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;

  &:focus {
    border-color: #FF69A9;  
    outline: none;  
  }
`
const StyledParagraph = styled.p`
  font-size: 9px;
  color: #FF69A9;
  font-weight:bold;
  margin-top: 9px;
  display: flex;
`;


function InputBox() {
  return (
    <InputAllContainer>
      <SelectLabel label="댕댕이 이름" />
      <InputContainer />
      <StyledParagraph>*한글,영문만 사용이 가능합니다</StyledParagraph>
    </InputAllContainer>
  )
}

export default InputBox
