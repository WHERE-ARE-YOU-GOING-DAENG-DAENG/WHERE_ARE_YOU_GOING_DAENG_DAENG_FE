import React, { useEffect } from 'react';
import styled from 'styled-components';
import arrow from '../../assets/icons/arrow.svg';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';

function UserContainer() {
  const navigate = useNavigate();

  const { email, nickname } = useUserStore();

  const handleToEditUser = () => {
    navigate('/user-edit');
  };

  return (
    <Container>
      <UserInfo>
        <Username>{nickname || '닉네임을 가져오는 중...'}</Username>
        <UserEmail>{email || '이메일을 가져오는 중...'}</UserEmail>
      </UserInfo>
      <ArrowImg src={arrow} alt="유저 정보 자세히 보기 화살표" onClick={handleToEditUser} />
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
  margin-bottom: 3%;
  padding: 4%;
  margin-left: 4%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 500;
`;

const Username = styled.div`
  font-size: 15px;
  display: block;
`;

const UserEmail = styled.div`
  font-size: 13px;
  color: #818181;
  margin-top: 10px;
`;

const ArrowImg = styled.img`
  margin-right: 5%;
  cursor: pointer;
`;

export default UserContainer;
