import styled from "styled-components";
import PreferenceFavoriteOptionList from "../review/PreferenceFavoriteOptionList";
import ConfirmBtn from "../commons/ConfirmBtn";
import { useNavigate } from "react-router-dom";

function PreferenceOptions() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/");
  };

  return (
    <Wrap>
      <Title>어떤 부분이 중요하신가요?</Title>
      <StyledParagraph>* 최소 1개 ~ 3개 선택가능</StyledParagraph>
      <OptionList>
        <PreferenceFavoriteOptionList />
      </OptionList>
      <StyledParagraph2>보호자님과 우리 댕댕이 맞춤 장소 추천을 위해 필요한 정보입니다.</StyledParagraph2>
      <FooterConfirmBtn>
        <ConfirmBtn label="완료" onClick={handleConfirm} />
      </FooterConfirmBtn>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin-left: 5px;
  margin-right: 18px;
`;

const Title = styled.h3`
  text-align: left;
  margin-left: 30px;
  font-size: 16px;
  margin-bottom: 10px;

  @media (max-width: 554px) {
    font-size: 14px;
    margin-left: 20px;
  }
`;

const StyledParagraph = styled.p`
  font-size: 9px;
  color: #FF69A9;
  font-weight: bold;
  margin-top: 9px;
  margin-left: 30px;
  display: flex;

  @media (max-width: 554px) {
    font-size: 8px;
    margin-left: 20px;
  }
`;

const OptionList = styled.div`
  margin-left: 30px;
  margin-bottom: 60px;

  @media (max-width: 554px) {
    margin-left: 20px;
    margin-bottom: 30px;
  }
`;

const StyledParagraph2 = styled.p`
  font-size: 8px;
  color: red;
  font-weight: bold;
  margin-top: 90px;
  margin-left: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;


  @media (max-width: 554px) {
    font-size: 7px;
    margin-left: 10px;
    text-align: center;
  }
`;

const FooterConfirmBtn = styled.div`
  margin-left: 35px;
  padding-bottom: 10px;

  @media (max-width: 554px) {
    margin-left: 20px;
  }
`;

export default PreferenceOptions;
