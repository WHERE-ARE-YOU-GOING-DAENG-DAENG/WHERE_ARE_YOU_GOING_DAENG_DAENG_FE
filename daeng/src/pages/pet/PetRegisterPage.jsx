import React from 'react'
import styled from "styled-components";
import PetRegisterInputForm from '../../components/pet/RegisterInputForm';
import Header from '../../components/commons/Header'

const FirstContainer = styled.div`
  display: flex;
  margin-top: 10px;

`
function PetRegisterPage() {
  return (
    <>
      <Header label="댕댕이 등록" />
        <PetRegisterInputForm />
    </>
  )
}

export default PetRegisterPage
