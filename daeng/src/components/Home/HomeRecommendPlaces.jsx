import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useLocationStore from "../../stores/useLocationStore"; 
import axios from "axios";
import HomeRecommendIcon from "../../assets/icons/home_recommend.svg";

function HomeRecommendPlaces() {
  const [recommendedPlaces, setRecommendedPlaces] = useState([]); 
  const userLocation = useLocationStore((state) => state.userLocation); 
  const navigate = useNavigate();

  const defaultLocation = {
    lat: 37.5666, //실시간 위치를 허용하지 않았을 경우
    lng: 126.9782, //서울시청 위도 경도
  };

  useEffect(() => {
    const fetchRecommendedPlaces = async () => {
      try {
        const locationToUse = userLocation.lat && userLocation.lng
          ? userLocation
          : defaultLocation;

        const response = await axios.post(
          "https://www.daengdaeng-where.link/api/v1/places/topscore",
          {
            latitude: locationToUse.lat, 
            longitude: locationToUse.lng,
          },
          {
            withCredentials: true,
          }
        );
        setRecommendedPlaces(response.data.data); 
      } catch (error) {
        console.error("추천 장소 데이터 가져오기 실패:", error);
      }
    };

    fetchRecommendedPlaces();
  }, [userLocation]);

  const handleRecommendPlaceClick = (placeId) => {
    navigate(`/search/${placeId}`); 
  };

  return (
    <RecommendPlacesWrapper>
      <RecommendTitle>
        댕댕어디가 추천 장소
        <img src={HomeRecommendIcon} alt="Recommend Icon" />
      </RecommendTitle>
      <RecommendLinkContainer>
        {recommendedPlaces.slice(0, 3).map((place) => (
          <RecommendPlaceWrapper key={place.placeId}>
            <RecommendLinkBox
              onClick={() => handleRecommendPlaceClick(place.placeId)}
            >
              <RecommendImage src={place.imageurl || "default-image-path.jpg"} alt={place.name} />
            </RecommendLinkBox>
            <PlaceName>{place.name}</PlaceName>
          </RecommendPlaceWrapper>
        ))}
      </RecommendLinkContainer>
    </RecommendPlacesWrapper>
  );
}

const RecommendPlacesWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 554px) {
    margin-top: 10px;
  }
`;

const RecommendTitle = styled.h3`
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

const RecommendLinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 20px;

  @media (max-width: 554px) {
    padding: 0 20px;
    gap: 10px;
  }
`;

const RecommendPlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 152px;

  @media (max-width: 554px) {
    width: 100%;
  }
`;

const RecommendLinkBox = styled.div`
  width: 100%;
  height: 174px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const RecommendImage = styled.img`
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

export default HomeRecommendPlaces;