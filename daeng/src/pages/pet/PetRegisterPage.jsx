import React from 'react'
import PetRegisterInputForm from '../../components/pet/RegisterInputForm';
import Header from '../../components/commons/Header'


function PetRegisterPage() {
  return (
    <>
      <Header label="댕댕이 등록" />
        <PetRegisterInputForm />
    </>
  )
}

export default PetRegisterPage
