import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HomeKeywordIcon from "../../assets/icons/home_keyword.svg";

// 키워드 배열 (각 행에 해당하는 키워드를 중첩 배열로 관리)
const keywordRows = [
  ["음식점", "카페", "공원", "숙소", "미술관"],
  ["놀이터", "여행지", "박물관", "문예회관", ""],
];

function HomeKeywordPlaces() {
  const navigate = useNavigate();

  const handleKeywordClick = (keyword) => {
    navigate("/search", { state: { placeType: keyword } });
  };

  return (
    <>
      <Divider />
      <KeywordPlacesWrapper>
        <KeywordTitle>
          이런 키워드는 어때요?
          <img src={HomeKeywordIcon} alt="Keyword Icon" />
        </KeywordTitle>
        <KeywordContainer>
          {keywordRows.map((row, rowIndex) => (
            <KeywordRow key={rowIndex}>
              {row.map((keyword, index) => (
                <KeywordItem
                  key={index}
                  onClick={() => handleKeywordClick(keyword)}
                >
                  {keyword}
                </KeywordItem>
              ))}
            </KeywordRow>
          ))}
        </KeywordContainer>
      </KeywordPlacesWrapper>
    </>
  );
}

const KeywordPlacesWrapper = styled.div`
  @media (max-width: 554px) {
    margin-top: 10px;
  }
`;

const KeywordTitle = styled.h3`
  display: flex;
  align-items: center;
  text-align: left;
  margin: 10px 30px;
  font-size: 20px;
  font-weight: 600;
  color: black;

  @media (max-width: 554px) {
    margin: 10px 20px;
    font-size: 15px;
  }

  img {
    margin-left: 5px;
    width: 20px;
    height: 20px;
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
  font-size: 16px;
  font-weight: 500;
  color: #ff69b4;
  text-align: center;
  padding: 10px;
  width: 100px;
  height: 40px;
  margin-bottom: 10px;
  cursor: pointer;
  word-break: keep-all;
  white-space: nowrap;

  @media (max-width: 554px) {
    font-size: 14px;
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

export default HomeKeywordPlaces;
