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
import useLocationStore from "../stores/useLocationStore";
import AlertDialog from "../components/commons/SweetAlert";
import { useEffect, useState } from "react";

function Home() {
  const userLocation = useLocationStore((state) => state.userLocation);
  const setUserLocation = useLocationStore((state) => state.setUserLocation);
  const [hasToken, setHasToken] = useState(false); 

  const checkTokensInCookie = () => {
    const cookies = document.cookie.split("; "); 
    const authorizationToken = cookies.find((cookie) => cookie.startsWith("Authorization="));
    const refreshToken = cookies.find((cookie) => cookie.startsWith("RefreshToken="));
    return authorizationToken && refreshToken; 
  };

  useEffect(() => {
    setHasToken(checkTokensInCookie());

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

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
            AlertDialog({
              mode: "alert",
              title: "위치 접근 동의",
              text: "위치 접근이 제한되었습니다.",
              confirmText: "확인",
              onConfirm: () => console.log("위치정보 비동의, 기본값:", userLocation),
            });
          }
        }
      );
    }
  }, [userLocation.latitude, userLocation.longitude, setUserLocation]);

  return (
    <Wrapper>
      <HomeHeader />
      <HomeSlider />
      {hasToken ? <HomeDogPlaces /> : <HomeLogout />}
      <HomeTrendingPlaces />
      <HomeSanta />
      <HomeRecommendPlaces />
      <HomeKeywordPlaces />
      <Footer />
    </Wrapper>
  );
}

export default Home;
