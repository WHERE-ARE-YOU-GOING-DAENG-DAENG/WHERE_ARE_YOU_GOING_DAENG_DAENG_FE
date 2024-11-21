import styled from "styled-components";

const DogPlacesWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 554px) {
    margin-top: 10px;
  }
`;

const DogTitle = styled.h2`
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

const DogLinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 20px;

  @media (max-width: 554px) {
    padding: 0 20px;
    gap: 10px;
  }
`;

const DogLinkBox = styled.div`
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

function HomeDogPlaces() {
  return (
    <DogPlacesWrapper>
      <DogTitle>우리 댕댕이가 좋아할 것 같아요! 💖</DogTitle>
      <DogLinkContainer>
        <DogLinkBox />
        <DogLinkBox />
        <DogLinkBox />
      </DogLinkContainer>
    </DogPlacesWrapper>
  );
}

export default HomeDogPlaces;
