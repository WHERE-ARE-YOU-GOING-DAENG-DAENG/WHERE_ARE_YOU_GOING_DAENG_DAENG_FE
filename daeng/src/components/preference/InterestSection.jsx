import styled from "styled-components";
import PreferencePlaceOption from "../commons/PreferencePlaceOption";
import PlaceType from "../../data/PlaceType";

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

const Place = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-bottom: 30px;
  margin-left: 25px;
  padding-right: 1px;

  @media (max-width: 554px) {
    justify-content: center;
    gap: 4px;
    margin-right: 40px;
  }
`;

function InterestSection() {
  return (
    <Wrap>
      <Title>어떤 시설에 관심이 많으신가요?</Title>
      <StyledParagraph>* 최소 1개 ~ 3개 선택가능</StyledParagraph>
      <Place>
        {PlaceType.map((place, index) => (
          <PreferencePlaceOption key={index} icon={place.icon} label={place.label} />
        ))}
      </Place>
    </Wrap>
  );
}

export default InterestSection;
