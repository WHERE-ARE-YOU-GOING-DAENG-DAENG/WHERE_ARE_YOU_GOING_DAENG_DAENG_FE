import styled from "styled-components";
import { useParams } from "react-router-dom";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import PlaceTitle from "../../components/detail/PlaceTitle";
import PlaceInfo from "../../components/detail/PlaceInfo";
import PlaceDescription from "../../components/detail/PlaceDescription";
import PlaceAiReview from "../../components/commons/PlaceAiReview";
import PlaceReviewList from "../../components/detail/PlaceReviewList";

const HeaderImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;

const Division = styled.div`
    height: 8px;
    background-color: #E5E5E5;
    width: 100%;
`;

const PlaceDetail = () => {
    const { id } = useParams(); //나중에 id기준으로 API 호출
      
    return(
        <>
          <Header label="시설 상세페이지" />
          <HeaderImage src={data.images[0]} alt="시설이미지" />
          <PlaceTitle data={data}/>
          <PlaceInfo data={data} />
          <Division />
          <PlaceDescription/>
          <Division />
          <PlaceAiReview />
          <Division />
          <PlaceReviewList reviews={data.reviews}/>
          <Footer />
        </>
    )
};

const data = {
    placeId: 1,
    images: ["https://via.placeholder.com/552x375"],//시설 이미지 임의로 추가
    name: "행복한 애견카페",
    address: {
      city: "서울특별시",
      district: "강남구",
      roadAddress: "테헤란로 123",
    },
    openHours: "09:00 - 21:00",
    isPetFriendly: true,
    allowedPetSize: "10kg 이하",
    categories: ["애견카페", "반려동물 동반 가능 음식점"],
    amenities: { parkingAvailable: true },
    holiday: "일요일",
    rating: 4.8,
    reviewSummary: "깨끗하고 넓은 마당이 있어요.",
    reviews: [
      {
        userId: 1351,
        nickname: "티모",
        userImg: "https://via.placeholder.com/40",
        reviewId: 342355,
        createdAt: "2024-03-24",
        content: "마당이 넓어서 좋고 깨끗해요 ~ ",
        score: 4,
        images : ["adfoughgoh2394fdsdf-"] ,
        videos : ["dfsdfjlskfjsd"],
        keywords: ["마당이 넓어요", "배변봉투가 있어요"],
        visitedCount: 1,
      },
      {
        userId: 1351,
        nickname: "티모",
        userImg: "https://via.placeholder.com/40",
        reviewId: 342355,
        createdAt: "2024-03-24",
        content: "마당이 넓어서 좋고 깨끗해요 ~ ",
        score: 4,
        images : ["adfoughgoh2394fdsdf-"] ,
        videos : ["dfsdfjlskfjsd"],
        keywords: ["마당이 넓어요", "배변봉투가 있어요"],
        visitedCount: 1,
      },
    ],
    isFavorite: true,
  };
export default PlaceDetail;