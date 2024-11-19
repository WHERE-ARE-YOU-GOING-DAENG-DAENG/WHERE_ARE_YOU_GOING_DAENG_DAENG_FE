import React from 'react'
import styled from "styled-components";
import AddPicture from '../../components/pet/AddPicture'
import Header from '../../components/Header'
import InputBox from '../../components/pet/InputBox';
import EditInputForm from '../../components/pet/EditInputForm';

const FirstContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
`

function PetEditPage() {
  return (
    <>
    <Header label="댕댕이 수정" />
    <FirstContainer>
      <AddPicture />
      <InputBox />
    </FirstContainer>
    <EditInputForm />
    </>
  )
}

export default PetEditPage
