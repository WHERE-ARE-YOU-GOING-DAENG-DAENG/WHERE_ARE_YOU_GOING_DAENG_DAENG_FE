import styled from "styled-components";
import logoutImage from "../../assets/icons/home_logout.svg";

const LogoutImage = styled.img`
  width: 90%;
  height: 148px;
  margin-top: 10px;

  @media (max-width: 554px) {
    height: 50%;
    margin-top: 20px;
  }
`;

function HomeLogout() {
  return <LogoutImage src={logoutImage} alt="로그아웃 이미지" />;
}

export default HomeLogout;
