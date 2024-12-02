import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useLocationStore from "../../stores/LocationStore"; 
import axios from "axios";
import HomeRecommendIcon from "../../assets/icons/home_recommend.svg";

function HomeRecommendPlaces() {
  const [recommendedPlaces, setRecommendedPlaces] = useState([]); 
  const userLocation = useLocationStore((state) => state.userLocation); 
  const navigate = useNavigate();

  const defaultLocation = {
    latitude: 37.497942,
    longitude: 127.027621,
  };

  useEffect(() => {
    const fetchRecommendedPlaces = async () => {
      try {
        const locationToUse = userLocation.latitude && userLocation.longitude
          ? userLocation
          : defaultLocation;

        const response = await axios.post(
          "https://www.daengdaeng-where.link/api/v1/places/topscore",
          {
            latitude: locationToUse.latitude, 
            longitude: locationToUse.longitude,
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
          <RecommendLinkBox
            key={place.placeId}
            onClick={() => handleRecommendPlaceClick(place.placeId)}
          >
          </RecommendLinkBox>
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
  margin: 15px 30px;
  font-size: 15px;
  font-weight: 600;
  color: black;

  @media (max-width: 554px) {
    margin: 10px 20px;
    font-size: 13px;
  }

  img {
    margin-left: 5px;
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

const RecommendLinkBox = styled.div`
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

export default HomeRecommendPlaces;
