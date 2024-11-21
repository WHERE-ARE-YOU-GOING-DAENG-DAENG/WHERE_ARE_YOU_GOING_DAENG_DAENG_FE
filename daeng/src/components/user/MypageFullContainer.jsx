import React from 'react'
import UserContainer from './UserContainer'
import styled from 'styled-components'
import DivisionLine from './DivisionLine'

const FullContainer = styled.div`
  display: block;
  padding:3%;
  margin-left:5%;
`

function MypageFullContainer() {
  return (
  <>
  <FullContainer>
    <UserContainer/>
  </FullContainer>
  <DivisionLine />
  </>
  )
}

export default MypageFullContainer
