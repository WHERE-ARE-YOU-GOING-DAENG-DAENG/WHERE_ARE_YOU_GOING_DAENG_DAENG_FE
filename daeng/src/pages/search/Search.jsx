import { useEffect, useState } from "react";
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
import axiosInstance from "../../services/axiosInstance"

const Search = () => {
    const location = useLocation();
    const [isRecommend, setIsRecommend] = useState(false);
    const [query, setQuery] = useState("");
    const [places, setPlaces] = useState([]);
    const [sortIndex, setSortIndex] = useState(0);
    const [nearPlaces, setNearPlaces] = useState([]);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const userLocation = useLocationStore((state) => state.userLocation);
    const [keywords, setKeywords] = useState({
      city: "서울",
      cityDetail: "",
      placeType: "",
  });
    const [filter, setFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingNearPlaces, setIsFetchingNearPlaces] = useState(false);

    useEffect(()=>{
      if(isMapLoaded && location.state?.placeType){
        setKeywords({
          city:"",
          cityDetail:"",
          placeType: location.state?.placeType,
      });
        setFilter(true);
      }else if (isMapLoaded && userLocation) {
        fetchNearestPlaces();
      }
    },[userLocation, isMapLoaded, location.state?.placeType]);
  
    const fetchNearestPlaces = async () => {
      if (!userLocation) return;
      setIsFetchingNearPlaces(true);
      const payload = {
        latitude: userLocation.lat,
        longitude: userLocation.lng
      }
      try{
        const response = await axiosInstance.post("/api/v1/places/nearest",payload,{
          withCredentials: true,
        });
        setPlaces(response.data.data);
        setNearPlaces(response.data.data);
        setIsRecommend(true);
      }catch (error){
        if (error.response) {
          AlertDialog({
            mode: "alert",
            title: "조회 실패",
            text: error.response.data.message || "추천 장소를 불러올 수 없습니다",
            confirmText: "확인",
          });
        }
      }
    }

    const handleSearch = (keyword) => {
        setQuery(keyword);
    };
    const handleSortChange = (index) => {
      setSortIndex(index); 
      sortPlaces(index); 
    };
  
    const sortPlaces = (index) => {
      if (index === 0) {
        setPlaces([...nearPlaces]);
      } else if (index === 1) {
        setPlaces((prevPlaces) =>
          [...prevPlaces].sort((a, b) => b.placeScore - a.placeScore)
        );
      }
    };


    useEffect(() => {
      fetchPlaces();
    }, [query, filter]);

    const fetchPlaces = async () => {
      if (query && userLocation) {
        setIsFetchingNearPlaces(false);
        setIsLoading(true); 
        setPlaces([]);
        setIsRecommend(false);
        const payload = {
          keyword: query,
          latitude: userLocation.lat,
          longitude: userLocation.lng,
        };

        try {
          const response = await axiosInstance.post(
            "/api/v1/places/search",
            payload,
            { withCredentials: true }
          );
          setPlaces(response.data.data || []);
          setNearPlaces(response.data.data || []);
          setQuery("");
        } catch (error) {
          if (error.response) {
            AlertDialog({
              mode: "alert",
              title: "장소 검색 실패",
              text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
              confirmText: "확인",
            });
          }
        } finally {
          setIsLoading(false); 
        }
      }

      if (filter && userLocation) {
        setIsFetchingNearPlaces(false);
        setIsLoading(true); 
        setPlaces([]);
        const matchedType = placeTypes.find(
          (type) => type.name === keywords.placeType
        );
        const payload = {
          city: keywords.city || "",
          cityDetail: keywords.cityDetail?.endsWith("전체")
            ? ""
            : keywords.cityDetail || "",
          placeType: matchedType ? matchedType.codeId : "",
          latitude: userLocation.lat,
          longitude: userLocation.lng,
        };
        try {
          const response = await axiosInstance.post(
            "/api/v1/places/filter",
            payload,
            { withCredentials: true }
          );
          setPlaces(response.data.data || []);
          setNearPlaces(response.data.data || []);
        } catch (error) {
          if (error.response) {
            AlertDialog({
              mode: "alert",
              title: "장소 검색 실패",
              text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
              confirmText: "확인",
            });
          }
        } finally {
          setIsLoading(false); 
          setFilter(false);
        }
      }
    };

    return (
        <>
          <Header label="장소검색"/>
          <SearchBar query={query} onSearch={handleSearch} />
          <Map data={places} removeUi={false} isLoading={isLoading} onMapLoaded={setIsMapLoaded} isRecommend={isRecommend}/>
          <FilterBtnList keywords={keywords} setKeywords={setKeywords} setFilter={setFilter}/>
          <Sorting 
            mode="list" 
            label={isFetchingNearPlaces ? "보호자님께 추천하는 장소!" : "검색결과"} 
            sortingOptions={['가까운순', '별점 높은순']} 
            activeIndex={sortIndex}
            onSortChange={handleSortChange}
            />
          <SearchPlaceList places={places} setPlaces={setPlaces} isLoading={isLoading}/>
          <Footer />
        </>
    );
}

export default Search;