import styled from "styled-components";
import logo from "../../assets/icons/logo.svg";
import alarmIcon from "../../assets/icons/home_alarm.svg";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../../components/commons/SweetAlert"; 
import userStore from '../../stores/userStore';

function HomeHeader() {
  const navigate = useNavigate();
  const { userId } = userStore(); 

  const handleAlarm = () => {
    if (userId) {
      navigate("/alarm");
    } else {
      AlertDialog({
        mode: "confirm",
        title: "로그인 필요",
        text: "알림 페이지에 접근하려면 로그인이 필요합니다.<br/>로그인페이지로 이동하시겠습니까?",
        confirmText: "네",
        cancelText: "아니오",
        onConfirm: () => navigate("/login"), 
      });
    }
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <HeaderWrapper>
      <Logo src={logo} alt="로고" onClick={handleLogoClick} />
      <AlarmIcon src={alarmIcon} alt="알림" onClick={handleAlarm} />
    </HeaderWrapper>
  );
}

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

const AlarmIcon = styled.img`
  width: 20px;
  height: 23px;
  cursor: pointer;

  @media (max-width: 554px) {
    width: 18px;
    height: 21px;
  }
`;

export default HomeHeader;
