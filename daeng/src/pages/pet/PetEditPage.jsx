import React from 'react'
import Header from '../../components/commons/Header'
import EditInputForm from '../../components/pet/EditInputForm';
import styled from "styled-components";

const PetContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  overflow: auto; 
  align-items: center;
`;

function PetEditPage() {
  return (
    <>
    <PetContainer>
      <Header label="댕댕이 수정" />
      <EditInputForm />
    </PetContainer>
    </>
  )
}

export default PetEditPage
