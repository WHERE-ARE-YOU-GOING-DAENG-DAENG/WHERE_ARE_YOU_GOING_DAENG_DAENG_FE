import Header from '../../components/commons/Header'
import styled from "styled-components";
import preferenceDog from "../../assets/icons/user_logo.svg";
import UserRegister from '../../components/user/UserRegister';

function UserRegisterPage() {
  return (
    <UserContainer>
      <Header label='보호자 정보 등록'/>
      <ImgLogo src={preferenceDog} alt='임시로고' />
      <UserRegister />
    </UserContainer>
  )
}

const UserContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  overflow: auto; 
`;

const ImgLogo = styled.img`
  width: 400px;
  margin: 20px auto 0px auto;

    @media (max-width: 554px) {
    width: 70%; 
  }
`;

export default UserRegisterPage
