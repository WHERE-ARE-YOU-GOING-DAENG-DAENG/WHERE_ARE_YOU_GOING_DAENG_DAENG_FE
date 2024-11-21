import React from 'react'
import styled from 'styled-components'
import arrow from '../../assets/icons/arrow.svg';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top:10px;
  justify-content: space-between;
  margin-bottom:3%;
  padding:3%;
  margin-left: 4%;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 500;

  username{
    font-size:15px;
    display: block;
  }

  useremail{
    font-size:13px;
    color: #818181;
    margin-top: 10px;
  }
`
const ArrowImg = styled.img`
  margin-right: 2%;
  cursor: pointer;
`
function UserContainer() {
  return (
    <Container>
      <UserInfo>
        <username>내가 진짜임</username>
        <useremail>이메일</useremail>
      </UserInfo>
      <ArrowImg src={arrow} alt="유저 정보 자세히 보기 화살표" />
    </Container>
  )
}

export default UserContainer
