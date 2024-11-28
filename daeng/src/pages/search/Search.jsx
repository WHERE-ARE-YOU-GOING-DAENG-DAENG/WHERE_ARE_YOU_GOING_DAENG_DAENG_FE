import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import SearchBar from "../../components/search/SearchBar";
import Map from "../../components/map/Map";
import SearchPlaceList from "../../components/search/SearchPlaceList";
import Sorting from "../../components/commons/Sorting";
import FilterBtnList from "../../components/search/FilterBtnList";
// import useFavoriteStore from "../../stores/useFavoriteStore";

const Search = () => {
    const [query, setQuery] = useState("");
    const [places, setPlaces] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [keywords, setKeywords] = useState({
      city: "서울",
      cityDetail: "",
      placeType: "",
  });
    const [filter, setFilter] = useState(false);
    // const { fetchFavorites } = useFavoriteStore();

    const handleSearch = (keyword) => {
        setQuery(keyword); // 검색 키워드 전달
    };

    useEffect(() => {
        if (query && userLocation) {
          const fetchPlaces = async () => {
            console.log(userLocation)

            const payload = {
                keyword: query,
                latitude: userLocation.lat,
                longitude: userLocation.lng,
            }
            try {
              // const response = await axios.post("https://www.daengdaeng-where.link/api/v1/places/search/keyword", payload,
              // {
              //   withCredentials: true, // 옵션 추가
              // }
              // );
            //   setPlaces(response.data);
              
              setPlaces([{
                placeId: 1929,
                name: "양재천근린공원",
                city: "서울특별시",
                cityDetail: "서초구",
                township: "양재동",
                latitude: 37.47662396,
                longitude: 127.041508,
                streetAddresses: "서울특별시 서초구 양재동",
                telNumber: "02-2155-6896",
                url: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=09d42fc7-cfd1-4af5-91ca-7d45e7bf9c36&big_category=A02&mid_category=A0202&big_area=1",
                placeType: "공원",
                description: "목줄, 배변봉투 공원",
                parking: true,
                indoor: false,
                outdoor: true,
                distance: 2.668402600535259,
                isFavorite: false,
                day_type : "월요일휴무", // 휴무일
                start_time : "09:00",
                end_time : "20:00",
                img_path : []
            }])
            } catch (error) {
              console.error("Error fetching places:", error);
            }
          };
    
          fetchPlaces();
        }else if(userLocation && filter){
          const fetchPlaces = async () => {
            const payload = {
              city: keywords.city || "",
              cityDetail: keywords.cityDetail || "",
              placeType: keywords.placeType || "",
              latitude: userLocation?.lat,
              longitude: userLocation?.lng
            }
            console.log(payload);
            try {
              // const response = await axios.post("https://www.daengdaeng-where.link/api/v1/places/search/filter", payload,
              // {
              //   withCredentials: true, // 옵션 추가
              // }
              // );
              // setPlaces(response.data);
          } catch (error) {
            console.error("Error fetching places:", error);
            
          }
          setFilter(false);
        }
          fetchPlaces();
        };
      }, [query, filter, userLocation]);

    return (
        <>
          <Header label="장소검색"/>
          <SearchBar onSearch={handleSearch} />
          <Map userLocation={setUserLocation}/>
          <FilterBtnList keywords={keywords} setKeywords={setKeywords} setFilter={setFilter}/>
          <Sorting mode="list" label={places ? "검색결과" : "보호자님께 추천하는 장소!"} sortingOptions={['가까운순', '별점 높은순']} activeIndex={0}/>
          <SearchPlaceList list={places}/>
          <Footer />
        </>
    );
}

export default Search;