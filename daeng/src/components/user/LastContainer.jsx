import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3%;
  margin-left: 4%;
  margin-top: 10px;
`
const DeleteUserBtn = styled.button`
  width:45%;
  height:44px;
  border: 0.5px solid #E4E4E4;
  background-color: white;
  font-size: 12px;
  border-radius:5px;
  color: #B3B3B3;
  cursor: pointer;

  &:hover {
    background-color: #F8F8F8;
  }
`
const DivisionLine = styled.div`
  width:1px;
  height: 50px;  
  background-color:#E4E4E4;
  margin-left:4%;
  margin-right: 4%;
`

const LogoutBtn = styled.button`
width:45%;
height:44px;
border: 0.5px solid #E4E4E4;
background-color: white;
font-size: 12px;
border-radius:5px;
color: #B3B3B3;
cursor: pointer;

&:hover {
  background-color: #F8F8F8;
}
`
function LastContainer() {
  return (
    <Container>
      <DeleteUserBtn>회원탈퇴</DeleteUserBtn>
      <DivisionLine />
      <LogoutBtn>로그아웃</LogoutBtn>
    </Container>
  )
}

export default LastContainer
