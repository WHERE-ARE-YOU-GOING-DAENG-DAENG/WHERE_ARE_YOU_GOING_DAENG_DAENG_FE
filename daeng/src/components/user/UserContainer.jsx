import React from 'react'
import styled from 'styled-components'
import arrow from '../../assets/icons/arrow.svg';
import { useNavigate } from 'react-router-dom';

function UserContainer() {
  const navigate = useNavigate();

  const handleToEditUser  = () => {
    navigate("/user-edit");
};
  return (
    <Container>
      <UserInfo>
        <Username>내가 진짜임</Username>
        <UserEmail>이메일</UserEmail>
      </UserInfo>
      <ArrowImg src={arrow} alt="유저 정보 자세히 보기 화살표" onClick={handleToEditUser}/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top:10px;
  justify-content: space-between;
  margin-bottom:3%;
  padding:4%;
  margin-left: 4%;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 500;
`
const Username = styled.div`
  font-size: 15px;
  display: block;
`
const UserEmail = styled.div`
  font-size: 13px;
  color: #818181;
  margin-top: 10px;
`

const ArrowImg = styled.img`
  margin-right: 5%;
  cursor: pointer;
`

export default UserContainer
