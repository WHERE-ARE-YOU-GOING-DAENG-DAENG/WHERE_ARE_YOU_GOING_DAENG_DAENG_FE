import styled from "styled-components";
import { useParams } from "react-router-dom";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import PlaceTitle from "../../components/detail/PlaceTitle";
import PlaceInfo from "../../components/detail/PlaceInfo";
import PlaceDescription from "../../components/detail/PlaceDescription";
import PlaceAiReview from "../../components/commons/PlaceAiReview";
import PlaceReviewList from "../../components/detail/PlaceReviewList";
import AlertDialog from "../../components/commons/SweetAlert";
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
    const [data, setData] = useState("");
      useEffect(()=>{
        const fetchPlaceDetail = async () => {
          try{
            const placeResponse = await axios.get(`https://www.daengdaeng-where.link/api/v1/places/${id}`,{
              withCredentials: true,
            });
            const reviewResponse = await axios.get(`https://www.daengdaeng-where.link/api/v1/reviews/place/${id}/LATEST?page=0&size=3`)
            
            const placeData = placeResponse.data.data;
            const reviewData = reviewResponse.data.data;

            const combinedData = {
              ...placeData,
              reviews: reviewData.reviews,
              total: reviewData.total,
              page: reviewData.page,
              size: reviewData.size,
              isFirst: reviewData.isFirst,
              isLast: reviewData.isLast,
              score: reviewData.score,
              bestKeywords: reviewData.bestKeywords,
            }
            console.log(combinedData) //로그 삭제
            setData(combinedData);
          }catch(error){
            if (error.response) {
              AlertDialog({
                  mode: "alert",
                  title: "시설 상세 데이터 오류",
                  text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
                  confirmText: "확인",
                  onConfirm: () => console.log("서버 응답 오류 확인됨"),
              });
            }
          }
        }
        fetchPlaceDetail();
      },[id]);
    return(
        <>
          <Header label="시설 상세페이지" />
          <HeaderImage src={ data.img_path ? data.img_path : "https://via.placeholder.com/552x375"} alt="시설이미지" />
          <PlaceTitle data={data} setData={setData}/>
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

export default PlaceDetail;