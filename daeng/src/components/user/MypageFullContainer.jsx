import React from 'react'
import UserContainer from './UserContainer'
import DivisionLine from './DivisionLine'
import PetContainer from './PetContainer'
import RoutePage from './RoutePage'
import PetService from './PetService'
import LastContainer from './LastContainer'


function MypageFullContainer() {
  return (
  <>
    <UserContainer/>
    <DivisionLine />
    <PetContainer />
    <DivisionLine />
    <RoutePage />
    <DivisionLine />
    <PetService />
    <DivisionLine />
    <LastContainer />
  </>
  )
}

export default MypageFullContainer
