import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocationStore from "../../stores/useLocationStore";
import axios from "axios";
import HomeDogLoveIcon from "../../assets/icons/home_doglove.svg";
import HomeNoImage from "../../assets/icons/home_noimage.svg";
import PlacesSection from "./PlacesSection";

function HomeDogPlaces() {
  const [dogPlaces, setDogPlaces] = useState([]);
  const userLocation = useLocationStore((state) => state.userLocation);
  const navigate = useNavigate();

  const defaultLocation = {
    lat: 0.0,
    lng: 0.0,
  };

  useEffect(() => {
    const fetchDogPlaces = async () => {
      try {
        const locationToUse = userLocation.lat && userLocation.lng
          ? userLocation
          : defaultLocation;

        const response = await axios.post(
          "https://dev.daengdaeng-where.link/api/v1/places/recommend",
          {
            latitude: locationToUse.lat,
            longitude: locationToUse.lng,
          },
          {
            withCredentials: true,
          }
        );
        const placesData = response.data.data.map((item) => {
          const p = item.placeRcommendDto;
          return {
            id: p.placeId,
            name: p.name,
            image: p.imageUrl || HomeNoImage,
          };
        });
        setDogPlaces(placesData);
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
    <PlacesSection
      title="우리 댕댕이가 좋아할 것 같아요 !"
      icon={HomeDogLoveIcon}
      places={dogPlaces}
      onItemClick={handleDogPlaceClick}
    />
  );
}

export default HomeDogPlaces;
