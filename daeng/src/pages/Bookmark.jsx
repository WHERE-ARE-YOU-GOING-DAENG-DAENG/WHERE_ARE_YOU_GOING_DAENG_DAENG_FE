import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";
import Map from "../components/commons/Map"
import styled from "styled-components";

const Bookmark = () => {

    return(
        <>  
            <Header label="즐겨찾기"/>
            <Map data={data}/>
            <Footer />
        </>
    )
};

const data = [
    {
		"favoriteId": 32,
	    "placeId": 1,
	    "name": "댕댕이카페",
	    "streetAddresses": "서울특별시 강남구 테헤란로 123",
		"latitude": 35.13710340299098,
		"longitude": 129.10329727721913,
	    "openHours": "09:00 - 21:00"
	  },
	  {
		"favoriteId": 4,
		"placeId": 2,
        "name": "댕댕이동산",
  	    "streetAddresses": "서울특별시 강남구 테헤란로 123",
		"latitude": 35.136080,
		 "longitude": 129.104060,
	    "openHours": "09:00 - 21:00"
	  },
	]
export default Bookmark;