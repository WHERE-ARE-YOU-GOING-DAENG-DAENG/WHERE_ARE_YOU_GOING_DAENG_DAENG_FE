import badge from "../../assets/icons/badge.svg"
import styled from "styled-components";

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #FDF2F8;
  border-radius: 10px;
  width: fit-content;
  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  img{
    width: 35px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

const MyLandLabel = ({ region, subRegion, onClick }) => {
  const [firstPart, ...remainingParts] = subRegion.split(" ");
  const remainingPart = remainingParts.join(" ");

  return (
    <LabelContainer onClick={onClick}>
      <Icon>
        <img src={badge} alt="뱃지" />
      </Icon>
      <TextContainer>
        {region}
        {remainingPart ? ` ${firstPart}` : null}
        <br />
        {remainingPart || firstPart}
      </TextContainer>
    </LabelContainer>
  );
};

export default MyLandLabel;
