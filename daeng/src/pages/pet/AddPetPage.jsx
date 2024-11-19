import React from 'react'
import styled from "styled-components";
import AddPicture from '../../components/pet/AddPicture'
import Header from '../../components/Header'
import InputBox from '../../components/pet/InputBox';
import AddInputForm from '../../components/pet/AddInputForm';

const FirstContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
`

function AddPetPage() {
  return (
    <>
    <Header label="댕댕이 추가" />
    <FirstContainer>
      <AddPicture />
      <InputBox />
    </FirstContainer>
    <AddInputForm />
    </>
  )
}

export default AddPetPage
