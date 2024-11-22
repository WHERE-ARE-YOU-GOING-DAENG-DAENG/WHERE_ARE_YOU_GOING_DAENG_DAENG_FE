import { useState } from "react";
import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";
import Map from "../components/map/Map"
import BookMarkList from "../components/bookmark/BookMarkList";
import styled from "styled-components";
import pinIcon from "../assets/icons/pin.svg"

const OpenModalButton = styled.button`
    position: fixed;
	left: 50%;
    bottom: 76px;
	transform: translateX(-50%);
    width: 555px;
    height: 80px;
    background-color: white;
    border: none;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    cursor: pointer;
	position: relative;


	img{
		position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
	}

	p{	
		font-weight: bold;
		font-size: 20px;
		margin: 20px 0 0; 
	}

    @media (max-width: 554px) {
        width: 100%;
        bottom: 64px;
    }

`;
const Bookmark = () => {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [center, setCenter] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

	const handlePlaceClick = (latitude, longitude) => {
		setCenter({ lat: latitude, lng: longitude });
	  };

    return(
        <>  
            <Header label="즐겨찾기"/>
            <Map data={data} removeUi={true} externalCenter={center}/>
            <Footer></Footer>
			<OpenModalButton onClick={toggleModal}>
				<img src={pinIcon} alt="즐겨찾기" />
				<p>즐겨찾기한 장소</p>
            </OpenModalButton>
			<BookMarkList isOpen={isModalOpen} onClose={toggleModal} data={data} onPlaceClick={handlePlaceClick}/>
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
	    "startTime": "09:00",
	    "endTime": "21:00"
	  },
	  {
		"favoriteId": 34,
		"placeId": 2,
        "name": "댕댕이동산",
  	    "streetAddresses": "서울특별시 강남구 테헤란로 123",
		"latitude": 35.136080,
		"longitude": 129.104060,
	    "startTime": "09:00",
	    "endTime": "21:00"
	  },
	  {
		"favoriteId": 35,
		"placeId": 3,
        "name": "댕댕이동산",
  	    "streetAddresses": "서울특별시 강남구 테헤란로 123",
		"latitude": 35.456080,
		"longitude": 129.104060,
	    "startTime": "09:00",
	    "endTime": "21:00"
	  },
	  {
		"favoriteId": 36,
		"placeId": 4,
        "name": "댕댕이동산",
  	    "streetAddresses": "서울특별시 강남구 테헤란로 123",
		"latitude": 35.123080,
		"longitude": 129.104060,
	    "startTime": "09:00",
	    "endTime": "21:00"
	  },
	]
export default Bookmark;