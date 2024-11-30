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
      
    useEffect(() => {
      const fetchPlaceDetail = async () => {
        try {
          const placeResponse = await axios.get(`https://www.daengdaeng-where.link/api/v1/places/${id}`, {
            withCredentials: true,
          });
          const placeData = placeResponse.data.data;
    
          let reviewData = {};
          try {
            const reviewResponse = await axios.get(
              `https://www.daengdaeng-where.link/api/v1/reviews/place/${id}/LATEST?page=0&size=3`,
              { withCredentials: true }
            );
            reviewData = reviewResponse.data.data;
          } catch (reviewError) {
            if (reviewError.response) {
              AlertDialog({
                mode: "alert",
                title: "리뷰 데이터 오류",
                text: reviewError.response.data.message || "리뷰 데이터를 불러오는 데 실패했습니다.",
                confirmText: "확인",
                onConfirm: () => console.log("리뷰 요청 오류 확인됨"),
              });
            }
          }
    
          const combinedData = {
            ...placeData,
            reviews: reviewData.reviews || [],
            total: reviewData.total || 0,
            page: reviewData.page || 0,
            size: reviewData.size || 0,
            isFirst: reviewData.isFirst || true,
            isLast: reviewData.isLast || true,
            score: reviewData.score || 0,
            bestKeywords: reviewData.bestKeywords || [],
          };
    
          console.log(combinedData); // 로그 삭제
          setData(combinedData);
        } catch (placeError) {
          if (placeError.response) {
            AlertDialog({
              mode: "alert",
              title: "시설 데이터 오류",
              text: placeError.response.data.message || "시설 데이터를 불러오는 데 실패했습니다.",
              confirmText: "확인",
              onConfirm: () => console.log("시설 요청 오류 확인됨"),
            });
          }
        }
      };
    
      fetchPlaceDetail();
    }, [id]);
    

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