import styled from "styled-components";
import HomeHotIcon from "../../assets/icons/home_hot.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function HomeTrendingPlaces() {
  const [trendingPlaces, setTrendingPlaces] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingPlaces = async () => {
      try {
        const response = await axios.get(
          "https://www.daengdaeng-where.link/api/v1/places/topfavorites",
          {
            withCredentials: true, 
          }
        );
        setTrendingPlaces(response.data.data); 
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchTrendingPlaces();
  }, []);

  const handleTrendingPlaceClick = (placeId) => {
    navigate(`/search/${placeId}`); 
  };

  return (
    <TrendingPlacesWrapper>
      <TrendingTitle>
        요즘 뜨는 장소 알려드려요
        <img src={HomeHotIcon} alt="Hot Icon" />
      </TrendingTitle>
      <TrendingLinkContainer>
        {trendingPlaces.slice(0, 3).map((place) => (
          <TrendingLinkBox
            key={place.placeId} 
            onClick={() => handleTrendingPlaceClick(place.placeId)}
          >
          </TrendingLinkBox>
        ))}
      </TrendingLinkContainer>
    </TrendingPlacesWrapper>
  );
}

const TrendingPlacesWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 554px) {
    margin-top: 10px;
  }
`;

const TrendingTitle = styled.h3`
  display: flex;
  align-items: center;
  text-align: left;
  margin: 20px 30px;
  font-size: 15px;
  font-weight: 600;
  color: black;

  @media (max-width: 554px) {
    margin: 10px 20px;
    font-size: 13px;
  }

  img {
    margin-left: 3px;
    width: 20px;
    height: 20px;
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
  cursor: pointer;

  @media (max-width: 554px) {
    width: 90%;
    height: 140px;
  }
`;

export default HomeTrendingPlaces;
