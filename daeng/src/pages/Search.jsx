import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Map from "../components/Map";
import SearchPlaceList from "../components/SearchPlaceList";
import Sorting from "../components/Sorting";
import FilterBtnList from "../components/FilterBtnList";

const Search = () => {
    const [query, setQuery] = useState("");
    const [places, setPlaces] = useState("");

    const handleSearch = (keyword) => {
        setQuery(keyword); // 검색 키워드 전달
    };

    const handleSearchResults = (results) => {
        const formattedResults = results.map((result) => ({
            name: result.name,
            facilityType: result.types[0], // result.placeType
            isOpen: result.opening_hours ? result.opening_hours.open_now : null, // result.isOpen(bool)
            address: result.formatted_address,
            images: result.photos
              ? result.photos.map((photo) =>
                  photo.getUrl({ maxWidth: 108, maxHeight: 130 })
                )
              : [], //이미지는 임시로 구글 place api에서 가져옴
            bookmark: false //즐겨찾기 여부 임시로 넣음
          }));
          setPlaces(formattedResults);
      };

    return (
        <>
            <Header label="장소검색"/>
            <SearchBar onSearch={handleSearch} />
            <Map searchQuery={query} onResults={handleSearchResults}/>
            <FilterBtnList />
            <Sorting mode="list" label={places ? "검색결과" : "보호자님께 추천하는 장소!"} sortingOptions={['가까운순', '별점 높은순']} activeIndex={0}/>
            <SearchPlaceList list={places}/>
            <Footer />
        </>
    );
}

export default Search;