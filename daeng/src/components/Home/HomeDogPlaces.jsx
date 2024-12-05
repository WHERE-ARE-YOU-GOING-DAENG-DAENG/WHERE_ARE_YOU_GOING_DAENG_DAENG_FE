import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useLocationStore from "../../stores/useLocationStore"; 
import axios from "axios";
import HomeDogLoveIcon from "../../assets/icons/home_doglove.svg";
import HomeNoImage from "../../assets/icons/home_noimage.svg";

function HomeDogPlaces() {
  const [dogPlaces, setDogPlaces] = useState([]); 
  const userLocation = useLocationStore((state) => state.userLocation); 
  const navigate = useNavigate();

  const defaultLocation = {
    lat: 0.0, // 실시간 위치를 허용하지 않았을 경우
    lng: 0.0, //위도, 경도 모두 0.0
  };

  useEffect(() => {
    const fetchDogPlaces = async () => {
      try {
        const locationToUse = userLocation.lat && userLocation.lng
          ? userLocation
          : defaultLocation;

        const response = await axios.post(
          "https://www.daengdaeng-where.link/api/v1/places/recommend",
          {
            latitude: locationToUse.lat,
            longitude: locationToUse.lng,
          },
          {
            withCredentials: true,
          }
        );
        setDogPlaces(response.data.data.map((item) => item.placeRcommendDto));
      } catch (error) {
        console.error("추천 장소 데이터 가져오기 실패:", error);
      }
    };

    fetchDogPlaces();
  }, [userLocation]);

  const handleDogPlaceClick = (placeId) => {
    navigate(`/search/${placeId}`);
  };

  return (
    <DogPlacesWrapper>
      <DogTitle>
        우리 댕댕이가 좋아할 것 같아요 !
        <img src={HomeDogLoveIcon} alt="Dog Love Icon" />
      </DogTitle>
      <DogLinkContainer>
        {dogPlaces.map((place) => (
          <DogPlaceWrapper key={place.placeId}>
            <DogLinkBox onClick={() => handleDogPlaceClick(place.placeId)}>
              <DogImage src={place.imageurl ? place.imageurl : HomeNoImage} 
              alt={place.name || "이미지 없음"} />
            </DogLinkBox>
            <PlaceName>{place.name}</PlaceName>
          </DogPlaceWrapper>
        ))}
      </DogLinkContainer>
    </DogPlacesWrapper>
  );
}

const DogPlacesWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 554px) {
    margin-top: 10px;
  }
`;

const DogTitle = styled.h2`
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

const DogPlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 152px;

  @media (max-width: 554px) {
    width: 100%;
  }
`;

const DogLinkBox = styled.div`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  aspect-ratio: 150 / 173;

  @media (max-width: 554px) {
    aspect-ratio: 150 / 173;
  }
`;

const DogImage = styled.img`
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

export default HomeDogPlaces;