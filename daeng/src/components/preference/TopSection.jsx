import styled from "styled-components";
import preferenceLogo from "../../assets/icons/preference_logo.webp";

function TopSection() {
  return (
    <>
      <TopContainer>
        <TextContainer>
          <h1>
            <span>어떤 장소를</span>
            <span>선호하세요?</span>
          </h1>
        </TextContainer>
        <Image src={preferenceLogo} alt="preference logo" width={240} height={240} loading="lazy" />
      </TopContainer>
      <Description>
        <p>
          <span>댕댕어디가</span>가 키워드에 맞는 장소를 추천해드릴게요.
        </p>
      </Description>
      <Division />
    </>
  );
}

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  @media (max-width: 554px) {
    padding: 0 15px;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  text-align: left;
  max-width: 300px;
  margin-bottom: 20px;

  h1 {
    font-size: 35px;
    font-weight: bold;
    line-height: 1.4;
    color: #000000;
    margin-bottom: 20px;

    span {
      display: block;
      margin-left: 25px;

      @media (max-width: 554px) {
        font-size: 27px;
        margin-left: 10px;
      }
    }
  }

  @media (max-width: 554px) {
    max-width: 100%;
    margin-bottom: 15px;
    margin-left: 20px;
  }
`;

const Image = styled.img`
  width: 240px;
  height: 240px;
  margin-right: 20px;
  object-fit: contain;

  @media (max-width: 554px) {
    width: 160px;
    height: 160px;
  }
`;


const Description = styled.div`
  text-align: center;
  min-height: 50px;

  p {
    font-size: 21px;
    color: #818181;
    font-weight: bold;

    span {
      color: #FF4B98;
      font-weight: bold;
    }

    @media (max-width: 554px) {
      font-size: 16px;
    }
  }
`;

const Division = styled.div`
  height: 8px;
  background-color: #E5E5E5;
  width: 100%;

  @media (max-width: 554px) {
    margin-bottom: 30px;
  }
`;

export default TopSection;
