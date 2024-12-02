import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useLocationStore from "../../stores/LocationStore"; 
import axios from "axios";
import HomeDogLoveIcon from "../../assets/icons/home_doglove.svg";

function HomeDogPlaces() {
  const [dogPlaces, setDogPlaces] = useState([]); 
  const userLocation = useLocationStore((state) => state.userLocation); 
  const navigate = useNavigate();

  const defaultLocation = {
    latitude: 0.0,
    longitude: 0.0,
  };

  useEffect(() => {
    const fetchDogPlaces = async () => {
      try {
        const locationToUse = userLocation.latitude && userLocation.longitude
          ? userLocation
          : defaultLocation;

        const response = await axios.post(
          "https://www.daengdaeng-where.link/api/v1/places/recommend",
          {
            latitude: locationToUse.latitude,
            longitude: locationToUse.longitude,
          },
          {
            withCredentials: true,
          }
        );
        setDogPlaces(response.data.data);
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
        {dogPlaces.slice(0, 3).map((place) => (
          <DogLinkBox
            key={place.placeId}
            onClick={() => handleDogPlaceClick(place.placeId)}
          >
            {/* {place.name} */}
          </DogLinkBox>
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
  cursor: pointer;

  @media (max-width: 554px) {
    width: 90%;
    height: 140px;
  }
`;

export default HomeDogPlaces;
