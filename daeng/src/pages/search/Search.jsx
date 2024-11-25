import { useState } from "react";
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

    const handleSearch = (keyword) => {
        setQuery(keyword); // 검색 키워드 전달
    };

    return (
        <>
            <Header label="장소검색"/>
            <SearchBar onSearch={handleSearch} />
            <Map />
            <FilterBtnList />
            <Sorting mode="list" label={places ? "검색결과" : "보호자님께 추천하는 장소!"} sortingOptions={['가까운순', '별점 높은순']} activeIndex={0}/>
            <SearchPlaceList list={places}/>
            <Footer />
        </>
    );
}

export default Search;