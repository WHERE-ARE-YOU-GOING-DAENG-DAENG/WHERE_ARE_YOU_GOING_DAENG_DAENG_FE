import React from 'react'
import Header from '../../components/commons/Header'
import AddInputForm from '../../components/pet/AddInputForm';

function AddPetPage() {
  return (
    <>
      <Header label="댕댕이 추가" />
        <AddInputForm/>
    </>
  )
}

export default AddPetPage
