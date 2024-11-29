import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import SearchBar from "../../components/search/SearchBar";
import Map from "../../components/map/Map";
import SearchPlaceList from "../../components/search/SearchPlaceList";
import Sorting from "../../components/commons/Sorting";
import FilterBtnList from "../../components/search/FilterBtnList";
import useLocationStore from "../../stores/LocationStore";
import { placeTypes } from "../../data/CommonCode";
// import useFavoriteStore from "../../stores/useFavoriteStore";

const Search = () => {
    const [query, setQuery] = useState("");
    const [places, setPlaces] = useState([]);
    // const [userLocation, setUserLocation] = useState(null);
    const userLocation = useLocationStore((state) => state.userLocation);
    const [keywords, setKeywords] = useState({
      city: "서울",
      cityDetail: "",
      placeType: "",
  });
    const [filter, setFilter] = useState(false);
    // const { fetchFavorites } = useFavoriteStore();

    const handleSearch = (keyword) => {
        setQuery(keyword);
    };

    useEffect(() => {
        if (query && userLocation) {
          const fetchPlaces = async () => {
            const payload = {
                keyword: query,
                latitude: userLocation.lat,
                longitude: userLocation.lng,
            }
            console.log(payload,"실행") //로그없애기
            try {
              const response = await axios.post("https://www.daengdaeng-where.link/api/v1/places/search", payload,
              {
                withCredentials: true, // 옵션 추가
              }
              );
              setPlaces(response.data.data);
            } catch (error) {
              console.error("Error fetching places:", error);
            }
          };
    
          fetchPlaces();
        }else if(filter && userLocation){
          const fetchPlaces = async () => {
            let matchedType = placeTypes.find((type) => type.name === keywords.placeType);
            const payload = {
              city: keywords.city || "",
              cityDetail: keywords.cityDetail?.endsWith("전체") ? "" : keywords.cityDetail || "",
              placeType: matchedType ? matchedType.code : "",
              latitude: userLocation?.lat,
              longitude: userLocation?.lng
            }
            console.log(payload); //로그없애기
            try {
              const response = await axios.post("https://www.daengdaeng-where.link/api/v1/places/filter", payload,
              {
                withCredentials: true, 
              }
              );
              console.log(response.data.data); //로그없애기
              setPlaces(response.data.data);
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
          <Map data={places} removeUi={false}/>
          <FilterBtnList keywords={keywords} setKeywords={setKeywords} setFilter={setFilter}/>
          <Sorting mode="list" label={places ? "검색결과" : "보호자님께 추천하는 장소!"} sortingOptions={['가까운순', '별점 높은순']} activeIndex={0}/>
          <SearchPlaceList list={places}/>
          <Footer />
        </>
    );
}

export default Search;