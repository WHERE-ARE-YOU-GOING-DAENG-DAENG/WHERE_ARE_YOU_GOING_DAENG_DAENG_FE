import styled from "styled-components";
import { useParams } from "react-router-dom";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import PlaceTitle from "../../components/detail/PlaceTitle";
import PlaceInfo from "../../components/detail/PlaceInfo";
import PlaceDescription from "../../components/detail/PlaceDescription";
import PlaceAiReview from "../../components/commons/PlaceAiReview";
import PlaceReviewList from "../../components/detail/PlaceReviewList";
import { useEffect, useState } from "react";
import axios from "axios";

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
    // const [data, setData] = useState("");
      useEffect(()=>{
        const fetchPlaceDetail = async () => {
          try{
            const placeResponse = await axios.get(`https://www.daengdaeng-where.link/api/v1/places/${id}`,{
              withCredentials: true,
            });
            const reviewResponse = await axios.get(`https://www.daengdaeng-where.link/api/v1/reviews/${id}/LATEST?page=1&size=3`)
            
            const placeData = placeResponse.data;
            const reviewData = reviewResponse.data;

            const combinedData = {
              ...placeData,
              reviews: reviewData.reviews,
              reviewStats: { //필요없는 건 삭제하기
                total: reviewData.total,
                page: reviewData.page,
                size: reviewData.size,
                isFirst: reviewData.isFirst,
                isLast: reviewData.isLast,
                score: reviewData.score,
                bestKeywords: reviewData.bestKeywords,
              }
            }
            setData(combinedData);
          }catch(error){
            console.error("Error fetching place detail:", error)
          }
        }
        // fetchPlaceDetail();
      },[id]);
    return(
        <>
          <Header label="시설 상세페이지" />
          <HeaderImage src={data.img_path} alt="시설이미지" />
          <PlaceTitle data={data}/>
          <PlaceInfo data={data} />
          <Division />
          <PlaceDescription data={data}/>
          <Division />
          <PlaceAiReview />
          <Division />
          <PlaceReviewList reviews={data}/>
          <Footer />
        </>
    )
};

const data = {
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
  start_time: "09:00",
  end_time: "20:00",
  img_path: "https://via.placeholder.com/552x375",
  reviews: [
    {
      userId: 1,
      placeId: 1,
      nickname: "UserOne",
      petImg: "https://example.com/image1.jpg",
      reviewId: 1,
      pets: ["Max", "Mittens", "Buddy"],
      content: "마당이 넓어요",
      score: 5,
      media: ["path1"],
      keywords: ["PLACE_FTE_01", "PLACE_FTE_02", "PLACE_FTE_03"],
      visitedAt: "2024-04-10",
      createdAt: "2024-11-22T10:29:14.54327"
    },
    {
      userId: 1,
      placeId: 1,
      nickname: "UserOne",
      petImg: "https://example.com/image1.jpg",
      reviewId: 1,
      pets: ["Max", "Mittens", "Buddy"],
      content: "마당이 넓어요",
      score: 5,
      media: ["path1"],
      keywords: ["PLACE_FTE_01", "PLACE_FTE_02", "PLACE_FTE_03"],
      visitedAt: "2024-04-10",
      createdAt: "2024-11-22T10:29:14.54327"
    },
    {
      userId: 1,
      placeId: 1,
      nickname: "UserOne",
      petImg: "https://example.com/image1.jpg",
      reviewId: 1,
      pets: ["Max", "Mittens", "Buddy"],
      content: "마당이 넓어요",
      score: 5,
      media: ["path1"],
      keywords: ["PLACE_FTE_01", "PLACE_FTE_02", "PLACE_FTE_03"],
      visitedAt: "2024-04-10",
      createdAt: "2024-11-22T10:29:14.54327"
    },
  ],
  reviewStats: {
    total: 5,
    page: 0,
    size: 15,
    isFirst: true,
    isLast: true,
    score: 3,
    bestKeywords: ["PLACE_FTE_01", "PLACE_FTE_02", "PLACE_FTE_03"]
  }
}
export default PlaceDetail;