import styled from "styled-components";
import logo from "../../assets/icons/logo.svg";
import alertIcon from "../../assets/icons/home_alert.svg";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 35px;

  @media (max-width: 554px) {
    padding: 20px 25px;
  }
`;

const Logo = styled.img`
  width: 136px;
  height: 35px;
  cursor: pointer;

  @media (max-width: 554px) {
    width: 120px;
    height: 30px;
  }
`;

const AlertIcon = styled.img`
  width: 20px;
  height: 23px;

  @media (max-width: 554px) {
    width: 18px;
    height: 21px;
  }
`;

function HomeHeader() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <HeaderWrapper>
      <Logo src={logo} alt="로고" onClick={handleLogoClick} />
      <AlertIcon src={alertIcon} alt="알림" />
    </HeaderWrapper>
  );
}

export default HomeHeader;
