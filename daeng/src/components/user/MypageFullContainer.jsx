import React from 'react'
import UserContainer from './UserContainer'
import { styled } from 'styled-components'

const FullContainer = styled.div`
  display: block;
  padding:3%;
  margin-left:4%;
`

function MypageFullContainer() {
  return (
  <>
  <FullContainer>
    <UserContainer/>
  </FullContainer>
  </>
  )
}

export default MypageFullContainer
