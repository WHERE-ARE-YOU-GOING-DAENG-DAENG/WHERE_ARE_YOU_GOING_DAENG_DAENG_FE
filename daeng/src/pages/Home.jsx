import HomeHeader from "../components/Home/HomeHeader";
import HomeSlider from "../components/Home/HomeSlider";
import HomeDogPlaces from "../components/Home/HomeDogPlaces";
import HomeTrendingPlaces from "../components/Home/HomeTrendingPlaces";
import HomeSanta from "../components/Home/HomeSanta";
import HomeLogout from "../components/Home/HomeLogout";
import HomeRecommendPlaces from "../components/Home/HomeRecommendPlaces";
import HomeKeywordPlaces from "../components/Home/HomeKeywordPlaces";
import Wrapper from "../components/Home/HomeWrapper";
import Footer from "../components/commons/Footer";
import useLocationStore from "../stores/LocationStore";
import useFavoriteStore from "../stores/useFavoriteStore";
import { useEffect } from "react";



function Home() {
  const userLocation = useLocationStore((state) => state.userLocation);
  const setUserLocation = useLocationStore((state) => state.setUserLocation);
  const fetchFavorites = useFavoriteStore((state) => state.fetchFavorites);

  useEffect(() => {
		const fetchBookmark = async () => {
		  await fetchFavorites();
		};
	
		fetchBookmark();
	  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
  
          // 위치가 변경된 경우에만 상태 업데이트
          if (
            userLocation.lat !== newLocation.lat ||
            userLocation.lng !== newLocation.lng
          ) {
            setUserLocation(newLocation);
            console.log("Location updated:", newLocation);
          }
        },
        (error) => {
          // console.error("Geolocation error:", error); 위치동의안한것도 에러로 받음
          if (!userLocation.lat && !userLocation.lng) {
            console.log("위치정보 비동의, 기본값:", userLocation);
          }
        }
      );
    }
  }, [userLocation.lat, userLocation.lng]);

  return (
    <Wrapper>
      <HomeHeader />
      <HomeSlider />
      <HomeDogPlaces />
      <HomeLogout />
      <HomeTrendingPlaces />
      <HomeSanta />
      <HomeRecommendPlaces />
      <HomeKeywordPlaces />
      <Footer />
    </Wrapper>
  );
}

export default Home;
