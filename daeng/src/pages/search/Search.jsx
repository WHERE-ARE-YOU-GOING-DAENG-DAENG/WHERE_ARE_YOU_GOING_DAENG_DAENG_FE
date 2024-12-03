import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import SearchBar from "../../components/search/SearchBar";
import Map from "../../components/map/Map";
import SearchPlaceList from "../../components/search/SearchPlaceList";
import Sorting from "../../components/commons/Sorting";
import FilterBtnList from "../../components/search/FilterBtnList";
import useLocationStore from "../../stores/useLocationStore";
import { placeTypes } from "../../data/CommonCode";
import AlertDialog from "../../components/commons/SweetAlert";
import { useLocation } from "react-router-dom";

const Search = () => {
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [places, setPlaces] = useState([]);
    const [sortIndex, setSortIndex] = useState(0);
    const [nearPlaces, setNearPlaces] = useState([]);
    const userLocation = useLocationStore((state) => state.userLocation);
    const [keywords, setKeywords] = useState({
      city: location.state? "": "서울",
      cityDetail: "",
      placeType: location.state?.placeType || "",
  });
    const [filter, setFilter] = useState(false);

    const handleSearch = (keyword) => {
        setQuery(keyword);
    };
    const handleSortChange = (index) => {
      setSortIndex(index); // 정렬 방식 변경
      sortPlaces(index); // 정렬 함수 호출
    };
  
    const sortPlaces = (index) => {
      if (index === 0) {
        // 가까운 순 정렬
        setPlaces([...nearPlaces]);
      } else if (index === 1) {
        // 별점 높은 순 정렬
        setPlaces((prevPlaces) =>
          [...prevPlaces].sort((a, b) => b.placeScore - a.placeScore)
        );
      }
    };

    useEffect(() => {
      if (location.state?.placeType) {
        setFilter(true);
      }
    }, [location.state]);

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
                withCredentials: true,
              }
              );
              setPlaces(response.data.data);
              setNearPlaces(response.data.data);
              setQuery("");
            } catch (error) {
              if (error.response) {
                AlertDialog({
                    mode: "alert",
                    title: "장소 검색 실패",
                    text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
                    confirmText: "확인",
                    onConfirm: () => console.log("서버 응답 오류 확인됨"),
                });
              }
            }
          };
    
          fetchPlaces();
        }
        if(filter && userLocation){
          const fetchPlaces = async () => {
            let matchedType = placeTypes.find((type) => type.name === keywords.placeType);
            const payload = {
              city: keywords.city || "",
              cityDetail: keywords.cityDetail?.endsWith("전체") ? "" : keywords.cityDetail || "",
              placeType: matchedType ? matchedType.codeId : "",
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
              if (error.response) {
                AlertDialog({
                    mode: "alert",
                    title: "장소 검색 실패",
                    text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
                    confirmText: "확인",
                    onConfirm: () => console.log("서버 응답 오류 확인됨"),
                });
              }
          }
          setFilter(false);
        }
          fetchPlaces();
        };
      }, [query, filter, userLocation]);

    return (
        <>
          <Header label="장소검색"/>
          <SearchBar query={query} onSearch={handleSearch} />
          <Map data={places} removeUi={false}/>
          <FilterBtnList keywords={keywords} setKeywords={setKeywords} setFilter={setFilter}/>
          <Sorting 
            mode="list" 
            label={places ? "검색결과" : "보호자님께 추천하는 장소!"} 
            sortingOptions={['가까운순', '별점 높은순']} 
            activeIndex={sortIndex}
            onSortChange={handleSortChange}
            />
          <SearchPlaceList places={places} setPlaces={setPlaces} setNearPlaces={setNearPlaces}/>
          <Footer />
        </>
    );
}

export default Search;