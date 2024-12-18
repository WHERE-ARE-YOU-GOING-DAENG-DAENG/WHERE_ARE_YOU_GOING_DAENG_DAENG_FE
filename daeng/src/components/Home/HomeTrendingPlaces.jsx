import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import HomeHotIcon from "../../assets/icons/home_hot.svg";
import HomeNoImage from "../../assets/icons/home_noimage.svg";
import PlacesSection from "./PlacesSection";

function HomeTrendingPlaces() {
  const [trendingPlaces, setTrendingPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingPlaces = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/places/topfavorites",
          {
            withCredentials: true,
          }
        );
        const placesData = response.data.data.slice(0, 3).map((place) => ({
          id: place.placeId,
          name: place.name,
          image: place.imageurl || HomeNoImage,
        }));
        setTrendingPlaces(placesData);
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
    <PlacesSection
      title="요즘 뜨는 장소 알려드려요"
      icon={HomeHotIcon}
      places={trendingPlaces}
      onItemClick={handleTrendingPlaceClick}
    />
  );
}

export default HomeTrendingPlaces;
