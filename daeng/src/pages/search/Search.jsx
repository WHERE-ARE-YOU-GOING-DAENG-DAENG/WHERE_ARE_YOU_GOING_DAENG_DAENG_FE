import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import SearchBar from "../../components/search/SearchBar";
import Map from "../../components/map/Map";
import SearchPlaceList from "../../components/search/SearchPlaceList";
import Sorting from "../../components/commons/Sorting";
import FilterBtnList from "../../components/search/FilterBtnList";

const Search = () => {
    const [query, setQuery] = useState("");
    const [places, setPlaces] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    const handleSearch = (keyword) => {
        setQuery(keyword); // 검색 키워드 전달
    };

    useEffect(() => {
        if (query && userLocation) {
          const fetchPlaces = async () => {
            console.log(userLocation)
            try {
              // document.cookie = 'RefreshToken=eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImRhZW5nZGFlbmdAbmF2ZXIuY29tIiwiaWF0IjoxNzMyNTk0NjEzLCJleHAiOjE3MzI2ODEwMTN9.lGfjguThgKs3YNu5aZkShfM3BRTQ7MfLCkSJasf76nAVDfk4nqZiDqfA5TPQjoVEWacqTWboSvyo_4qDEqOpbA; Path=/; Domain=54.180.234.13; SameSite=None; Expires=Thu, 27 Nov 2025 10:46:25 GMT;'
              // document.cookie = 'Authorization=eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImRhZW5nZGFlbmdAbmF2ZXIuY29tIiwiaWF0IjoxNzMyNjA3NTM1LCJleHAiOjE3MzI2MDc3NTF9.aoQj5Myxt0tnaD9a1spPf7zQDXd4xFZ4V41KHeqGMU6LQ_oXg-O3Myy9wsbwkYnQhYZ4meaVFgsQwXUVArEtrw; Path=/; Domain=54.180.234.13; SameSite=None; Expires=Thu, 28 Nov 2024 19:52:15 GMT;'/
              // const response = await axios.post("http://54.180.234.13:8080/api/v1/places/search/keyword", {
              //   keyword: query,
              //   latitude: userLocation.lat,
              //   longitude: userLocation.lng,
              //   userId: 1,
              // },
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
        }
      }, [query, userLocation]);

    return (
        <>
            <Header label="장소검색"/>
            <SearchBar onSearch={handleSearch} />
            <Map userLocation={setUserLocation}/>
            <FilterBtnList />
            <Sorting mode="list" label={places ? "검색결과" : "보호자님께 추천하는 장소!"} sortingOptions={['가까운순', '별점 높은순']} activeIndex={0}/>
            <SearchPlaceList list={places}/>
            <Footer />
        </>
    );
}

export default Search;