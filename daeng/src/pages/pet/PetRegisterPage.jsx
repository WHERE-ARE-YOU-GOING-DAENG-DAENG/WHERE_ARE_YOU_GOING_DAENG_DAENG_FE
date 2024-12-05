import React from 'react'
import PetRegisterInputForm from '../../components/pet/RegisterInputForm';
import Header from '../../components/commons/Header'
import styled from "styled-components";

const PetContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  overflow: auto; 
`;

function PetRegisterPage() {
  return (
    <>
    <PetContainer>
      <Header label="댕댕이 등록" />
        <PetRegisterInputForm />
    </PetContainer>
    </>
  )
}

export default PetRegisterPage
