import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocationStore from "../../stores/useLocationStore";
import axios from "axios";
import HomeRecommendIcon from "../../assets/icons/home_recommend.svg";
import HomeNoImage from "../../assets/icons/home_noimage.svg";
import PlacesSection from "./PlacesSection";

function HomeRecommendPlaces() {
  const [recommendedPlaces, setRecommendedPlaces] = useState([]);
  const userLocation = useLocationStore((state) => state.userLocation);
  const navigate = useNavigate();

  const defaultLocation = {
    lat: 37.5666,
    lng: 126.9782,
  };

  useEffect(() => {
    const fetchRecommendedPlaces = async () => {
      try {
        const locationToUse = userLocation.lat && userLocation.lng
          ? userLocation
          : defaultLocation;

        const response = await axios.post(
          "https://api.daengdaeng-where.link/api/v1/places/topscore",
          {
            latitude: locationToUse.lat,
            longitude: locationToUse.lng,
          },
          {
            withCredentials: true,
          }
        );

        const placesData = response.data.data.slice(0, 3).map((place) => ({
          id: place.placeId,
          name: place.name,
          image: place.imageurl || HomeNoImage,
        }));

        setRecommendedPlaces(placesData);
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
    <PlacesSection
      title="댕댕어디가 추천 장소"
      icon={HomeRecommendIcon}
      places={recommendedPlaces}
      onItemClick={handleRecommendPlaceClick}
    />
  );
}

export default HomeRecommendPlaces;
