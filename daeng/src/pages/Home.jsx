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



function Home() {
  

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
