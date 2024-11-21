import styled from "styled-components";

const RecommendPlacesWrapper = styled.div`
    margin-top: 20px;

    @media (max-width: 554px) {
        margin-top: 10px;
    }
`;

const RecommendTitle = styled.h3`
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

const RecommendLinkContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 0 20px;

    @media (max-width: 554px) {
        padding: 0 20px;
        gap: 10px;
    }
`;

const RecommendLinkBox = styled.div`
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

function HomeRecommendPlaces() {
    return (
        <RecommendPlacesWrapper>
        <RecommendTitle>댕댕어디가 추천 장소 😄</RecommendTitle>
        <RecommendLinkContainer>
            <RecommendLinkBox />
            <RecommendLinkBox />
            <RecommendLinkBox />
        </RecommendLinkContainer>
        </RecommendPlacesWrapper>
    );
}

export default HomeRecommendPlaces;
