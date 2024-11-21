import styled from "styled-components";

const TrendingPlacesWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 554px) {
    margin-top: 10px;
  }
`;

const TrendingTitle = styled.h3`
  text-align: left;
  margin: 20px 30px;
  font-size: 15px;
  font-weight: 600;
  color: black;

  @media (max-width: 554px) {
    margin: 10px 20px;
    font-size: 13px;
  }
`;

const TrendingLinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 20px;

  @media (max-width: 554px) {
    padding: 0 20px;
    gap: 10px;
  }
`;

const TrendingLinkBox = styled.div`
  width: 152px;
  height: 174px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;

  @media (max-width: 554px) {
    width: 90%;
    height: 140px;
  }
`;

function HomeTrendingPlaces() {
  return (
    <TrendingPlacesWrapper>
      <TrendingTitle>요즘 뜨는 장소 알려드려요 🔥</TrendingTitle>
      <TrendingLinkContainer>
        <TrendingLinkBox />
        <TrendingLinkBox />
        <TrendingLinkBox />
      </TrendingLinkContainer>
    </TrendingPlacesWrapper>
  );
}

export default HomeTrendingPlaces;
