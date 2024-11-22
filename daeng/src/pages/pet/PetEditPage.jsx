import React from 'react'
import styled from "styled-components";
import Header from '../../components/commons/Header'
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

    </FirstContainer>
    <EditInputForm />
    </>
  )
}

export default PetEditPage
