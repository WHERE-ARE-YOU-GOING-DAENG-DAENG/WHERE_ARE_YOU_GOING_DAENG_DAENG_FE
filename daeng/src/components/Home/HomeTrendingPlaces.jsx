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
          <TrendingPlaceWrapper key={place.placeId}>
            <TrendingLinkBox
              onClick={() => handleTrendingPlaceClick(place.placeId)}
            >
              <TrendingImage src={place.imageurl || "default-image-path.jpg"} alt={place.name} />
            </TrendingLinkBox>
            <PlaceName>{place.name}</PlaceName>
          </TrendingPlaceWrapper>
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
  font-size: 20px;
  font-weight: 600;
  color: black;

  @media (max-width: 554px) {
    margin: 10px 20px;
    font-size: 15px;
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

const TrendingPlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 152px;

  @media (max-width: 554px) {
    width: 100%;
  }
`;

const TrendingLinkBox = styled.div`
  width: 100%;
  height: 152px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const TrendingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceName = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: center;

  @media (max-width: 554px) {
    font-size: 12px;
  }
`;

export default HomeTrendingPlaces;