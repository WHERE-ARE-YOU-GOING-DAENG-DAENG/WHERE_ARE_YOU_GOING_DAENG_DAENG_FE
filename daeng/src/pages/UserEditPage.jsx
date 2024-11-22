import Header from '../components/commons/Header'
import styled from "styled-components";
import preferenceDog from "../assets/icons/preferenceDog.svg";
import UserEdit from '../components/user/UserEdit'

function UserEditPage() {
  return (
    <UserContainer>
      <Header label='보호자 정보 수정'/>
      <ImgLogo src={preferenceDog} alt='임시로고' />
      <UserEdit />
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
  width: 300px;
  margin-top: 50px;
  margin-left: 25%;
`;

export default UserEditPage
