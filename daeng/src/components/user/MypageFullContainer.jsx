import React from 'react'
import UserContainer from './UserContainer'
import DivisionLine from './DivisionLine'
import PetContainer from './PetContainer'
import RoutePage from './RoutePage'


function MypageFullContainer() {
  return (
  <>
    <UserContainer/>
    <DivisionLine />
    <PetContainer />
    <DivisionLine />
    <RoutePage />
    <DivisionLine />
  </>
  )
}

export default MypageFullContainer
