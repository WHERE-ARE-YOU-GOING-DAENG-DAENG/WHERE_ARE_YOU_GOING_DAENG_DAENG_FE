import React from 'react'
import styled from "styled-components";
import AddPicture from '../../components/pet/AddPicture'
import Header from '../../components/Header'
import InputForm from '../../components/pet/InputForm';
import InputBox from '../../components/pet/InputBox';

const FirstContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
`
function PetRegisterPage() {
  return (
    <>
      <Header label="댕댕이 등록" />
        <FirstContainer>
          <AddPicture />
          <InputBox />
        </FirstContainer>
        <InputForm />
    </>
  )
}

export default PetRegisterPage
