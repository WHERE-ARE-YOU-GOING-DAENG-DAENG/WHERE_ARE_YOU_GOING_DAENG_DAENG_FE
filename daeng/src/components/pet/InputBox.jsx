import React from 'react'
import styled from "styled-components";
import SelectLabel from "../../components/commons/SelectLabel"

const InputAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
`

const InputContainer = styled.input`
  width: 90%;  
  height: 44px;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;

  &:focus {
    border-color: #FF69A9;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 90%; 
  }
`

const StyledParagraph = styled.p`
  font-size: 9px;
  color: #FF69A9;
  font-weight: bold;
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
