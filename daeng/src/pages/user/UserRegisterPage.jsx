import Header from '../../components/commons/Header'
import styled from "styled-components";
import preferenceDog from "../../assets/icons/preferenceDog.svg";
import UserRegister from '../../components/user/UserRegister';

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  overflow: auto; 
`;

const ImgLogo = styled.img`
  width: 300px;
  margin-top: 50px;
  margin-left: 25%;
`;

function UserRegisterPage() {
  return (
    <ReviewContainer>
      <Header label='보호자 정보 등록'/>
      <ImgLogo src={preferenceDog} alt='임시로고' />
      <UserRegister />
    </ReviewContainer>
  )
}

export default UserRegisterPage
