import { useEffect, useState } from "react";
import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";
import Map from "../components/map/Map"
import BookMarkList from "../components/bookmark/BookMarkList";
import styled from "styled-components";
import pinIcon from "../assets/icons/pin.svg";
import useFavoriteStore from "../stores/useFavoriteStore";

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
	const [page, setPage] = useState(0); //불러올 페이지 번호

	const favorites = useFavoriteStore((state) => state.favorites);
	const fetchFavorites = useFavoriteStore((state) => state.fetchFavorites);
	const hasMore = useFavoriteStore((state) => state.hasMore);

	useEffect(() => {
		const fetchData = async () => {
		  await fetchFavorites(page);
		};
	
		fetchData();
	  }, [page]);

	  const fetchNextPage = () => {
		if (hasMore) {
		  setPage((prevPage) => prevPage + 1); // 다음 페이지 로드
		}
	  };

	  useEffect(() => {
		console.log("Updated favorites:", favorites); // 상태 변경 확인
	  }, [favorites]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

	const handlePlaceClick = (latitude, longitude) => {
		setCenter({ lat: latitude, lng: longitude });
	  };

    return(
        <>  
            <Header label="즐겨찾기"/>
            <Map data={favorites} removeUi={true} externalCenter={center}/>
            <Footer/>
			<OpenModalButton onClick={toggleModal}>
				<img src={pinIcon} alt="즐겨찾기" />
				<p>즐겨찾기한 장소</p>
            </OpenModalButton>
			<BookMarkList
				isOpen={isModalOpen} 
				onClose={toggleModal} 
				data={favorites} 
				onPlaceClick={handlePlaceClick}
				fetchNextPage={fetchNextPage}
				page={page}
			/>
        </>
    )
};

export default Bookmark;