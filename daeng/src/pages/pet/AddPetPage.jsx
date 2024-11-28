import React from 'react'
import styled from "styled-components";
import Header from '../../components/commons/Header'
import AddInputForm from '../../components/pet/AddInputForm';

const PetContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  overflow: auto; 
  align-items: center;
`;

function AddPetPage() {
  return (
    <>
    <PetContainer>
      <Header label="댕댕이 추가" />
        <AddInputForm/>
    </PetContainer>
    </>
  )
}

export default AddPetPage
