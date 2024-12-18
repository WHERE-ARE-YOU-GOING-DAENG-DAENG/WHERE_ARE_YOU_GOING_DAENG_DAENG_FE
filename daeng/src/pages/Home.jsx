import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import useLocationStore from "../stores/useLocationStore";
import useUserStore from "../stores/userStore";
import Wrapper from "../components/Home/HomeWrapper";
import HomeHeader from "../components/Home/HomeHeader";
import HomeSlider from "../components/Home/HomeSlider";
import HomeStory from "../components/Home/HomeStory";
import HomeDogPlaces from "../components/Home/HomeDogPlaces";
import HomeTrendingPlaces from "../components/Home/HomeTrendingPlaces";
import HomeLogout from "../components/Home/HomeLogout";
import HomeRecommendPlaces from "../components/Home/HomeRecommendPlaces";
import HomeKeywordPlaces from "../components/Home/HomeKeywordPlaces";
import Footer from "../components/commons/Footer";
import AlertDialog from "../components/commons/SweetAlert";
import Loading from "../components/commons/Loading";
import useFavoriteStore from "../stores/useFavoriteStore";

function Home() {
  const userLocation = useLocationStore((state) => state.userLocation);
  const setUserLocation = useLocationStore((state) => state.setUserLocation);
  const fetchFavorites = useFavoriteStore((state) => state.fetchFavorites);
  const favorites = useFavoriteStore((state)=>state.favorites);
  const setLoginData = useUserStore((state) => state.setLoginData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkLoginStatusInCookie = () => {
    const cookies = document.cookie.split("; ");
    const loginSuccessCookie = cookies.find((cookie) => cookie.startsWith("loginSuccess="));

    if (loginSuccessCookie) {
      const value = loginSuccessCookie.split("=")[1];
      return value === "true";
    }

    return false;
  };

  useEffect(() => {
    const loginStatus = checkLoginStatusInCookie();
    setIsLoggedIn(loginStatus);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };

          const { lat, lng, accuracy } = userLocation;
          if (
            newLocation.accuracy < accuracy &&
            (lat !== newLocation.lat || lng !== newLocation.lng)
          ) {
            setUserLocation(newLocation);
          }
        },
        () => {
          console.error("위치 권한이 거부되었습니다.");
        }
      );
    }
  }, [userLocation, setUserLocation]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
      fetchData();
    } else {
      simulateLoadingDelay();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
		await fetchFavorites();
	};

  useEffect(()=>{
		console.log(favorites);
	  },[favorites]) //테스트코드

  const fetchUserData = async () => {
    try {
      await simulateLoadingDelay();
      const response = await axiosInstance.get("/api/v1/user/adjust", {
        withCredentials: true,
      });
      const { user } = response.data.data;

      setLoginData(user);
    } catch {
      AlertDialog({
        mode: "alert",
        title: "데이터 불러오기 실패",
        text: "사용자 정보를 불러오는 데 문제가 발생했습니다.",
        confirmText: "확인",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulateLoadingDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading label="홈 화면을 불러오는 중입니다..." />;
  }

  return (
    <Wrapper>
      <HomeHeader />
      <HomeSlider />
      <HomeStory />
      {isLoggedIn ? <HomeDogPlaces /> : <HomeLogout />}
      <HomeTrendingPlaces />
      <HomeRecommendPlaces />
      <HomeKeywordPlaces />
      <Footer />
    </Wrapper>
  );
}

export default Home;
