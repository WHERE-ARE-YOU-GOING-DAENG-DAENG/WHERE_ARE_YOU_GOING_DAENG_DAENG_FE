import { useEffect, useState } from "react";
import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";
import Map from "../components/map/Map"
import BookMarkList from "../components/bookmark/BookMarkList";
import styled from "styled-components";
import pinIcon from "../assets/icons/pin.svg";
import useFavoriteStore from "../stores/useFavoriteStore";
import useUserStore from "../stores/userStore";
import AlertDialog from "../components/commons/SweetAlert";
import { useNavigate } from "react-router-dom";

const Bookmark = () => {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [center, setCenter] = useState(false);
	const [isMapLoaded, setIsMapLoaded] = useState(false);
	const favorites = useFavoriteStore((state) => state.favorites);
	const fetchFavorites = useFavoriteStore((state) => state.fetchFavorites);
	const resetFavorites = useFavoriteStore((state) => state.resetFavorites);
	const hasMore = useFavoriteStore((state) => state.hasMore);
	const { userId } = useUserStore.getState();
	const navigate = useNavigate();
	
	useEffect(() => {
		if(!userId){
			resetFavorites();
			AlertDialog({
				mode: "confirm",
				title: "로그인 필요",
				text: `방문일정은 로그인이 필요한 기능입니다.<br/>로그인페이지로 이동하시겠습니까?`,
				confirmText: "네",
				cancelText: "아니오",
				onConfirm: ()=> navigate("/login")
			});
		}else{
			fetchData();
		}
	  }, []);

	  const fetchData = async () => {
		await fetchFavorites();
	  };
	  

	  const fetchNextPage = () => {
		if (hasMore) {
			fetchFavorites();
		}
	  };

	  useEffect(() => {
		console.log(favorites);
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
            <Map data={favorites} removeUi={true} externalCenter={center} onMapLoaded={setIsMapLoaded} isRecommend={false}/>
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
			/>
        </>
    )
};

const OpenModalButton = styled.button`
	color: black;
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

export default Bookmark;