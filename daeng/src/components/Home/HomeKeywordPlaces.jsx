import styled from "styled-components";

const KeywordPlacesWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 554px) {
    margin-top: 10px;
  }
`;

const KeywordTitle = styled.h3`
  text-align: left;
  margin: 15px 30px;
  font-size: 15px;
  font-weight: 600;
  color: black;

  @media (max-width: 554px) {
    margin: 10px 20px;
    font-size: 13px;
  }
`;

const KeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 80px;
`;

const KeywordRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding-right: 30px;
  padding-left: 30px;

  @media (max-width: 554px) {
    gap: 10px;
  }
`;

const KeywordItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #ff69b4;
  text-align: center;
  padding: 10px;
  width: 100px;
  height: 40px;
  margin-bottom: 10px;
  cursor: pointer;

  @media (max-width: 554px) {
    font-size: 10px;
    width: 80px;
    height: 35px;
  }
`;

const Divider = styled.hr`
  width: 90%;
  border: 0;
  height: 1px;
  background-color: #d9d9d9;
  margin: 20px auto;

  @media (max-width: 554px) {
    margin: 15px auto;
  }
`;

function HomeKeywordPlaces() {
  return (
    <>
      <Divider />
      <KeywordPlacesWrapper>
        <KeywordTitle>이런 키워드는 어때요? 👏</KeywordTitle>
        <KeywordContainer>
          <KeywordRow>
            <KeywordItem>음식점</KeywordItem>
            <KeywordItem>카페</KeywordItem>
            <KeywordItem>공원</KeywordItem>
            <KeywordItem>숙소</KeywordItem>
            <KeywordItem>미술관</KeywordItem>
          </KeywordRow>
          <KeywordRow>
            <KeywordItem>놀이터</KeywordItem>
            <KeywordItem>여행지</KeywordItem>
            <KeywordItem>박물관</KeywordItem>
            <KeywordItem>문예회관</KeywordItem>
            <KeywordItem />
          </KeywordRow>
        </KeywordContainer>
      </KeywordPlacesWrapper>
    </>
  );
}

export default HomeKeywordPlaces;
