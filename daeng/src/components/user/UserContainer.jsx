import { useState, useEffect } from 'react';
import styled from 'styled-components';
import userDetailBtn from '../../assets/icons/userDetailBtn.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function UserContainer() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://dev.daengdaeng-where.link/api/v1/user/adjust', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        
        const { nickname, email } = response.data.data.user; 
        setNickname(nickname);
        setEmail(email);
        setLoading(false);
      } catch (error) {
        console.error('유저 정보를 가져오는 중 오류 발생:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleToEditUser = () => {
    navigate('/user-edit');
  };

  return (
    <Container>
      <UserInfo>
      <Username>{loading ? '닉네임을 가져오는 중...' : nickname || '닉네임 없음'}</Username>
      <UserEmail>{loading ? '이메일을 가져오는 중...' : email || '이메일 없음'}</UserEmail>
      </UserInfo>
      <UserEditBtn src={userDetailBtn} alt="유저 수정 아이콘" onClick={handleToEditUser} />
    </Container>
  );
}


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
`;

const Username = styled.div`
  font-size: 18px;
  display: block;
`;

const UserEmail = styled.div`
  font-size: 15px;
  color: #818181;
  margin-top: 10px;
`;

const UserEditBtn = styled.img`
  margin-right: 6%;
  cursor: pointer;
`;

export default UserContainer;
