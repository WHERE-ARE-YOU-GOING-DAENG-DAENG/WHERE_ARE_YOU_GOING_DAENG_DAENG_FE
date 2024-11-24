import React from 'react'
import Header from '../../components/commons/Header'
import EditInputForm from '../../components/pet/EditInputForm';


function PetEditPage() {
  return (
    <>
    <Header label="댕댕이 수정" />
    <EditInputForm />
    </>
  )
}

export default PetEditPage
