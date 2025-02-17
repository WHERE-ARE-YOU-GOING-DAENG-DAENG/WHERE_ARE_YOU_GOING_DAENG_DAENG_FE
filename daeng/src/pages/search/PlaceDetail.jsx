import styled from "styled-components";
import { useParams } from "react-router-dom";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import PlaceTitle from "../../components/detail/PlaceTitle";
import PlaceInfo from "../../components/detail/PlaceInfo";
import PlaceDescription from "../../components/detail/PlaceDescription";
import AiReviewSummary from '../../components/review/AIReview';
import PlaceReviewList from "../../components/detail/PlaceReviewList";
import AlertDialog from "../../components/commons/SweetAlert";
import Loading from "../../components/commons/Loading";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import PlaceDetailNoImage from "../../assets/icons/placeDetail_noimage.svg";

const PlaceDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
      
    useEffect(() => {
      const fetchPlaceDetail = async () => {
        try {
          setIsLoading(true);
          const placeResponse = await axiosInstance.get(`/api/v1/places/${id}`, {
            withCredentials: true,
          });
          const placeData = placeResponse.data.data;
    
          let reviewData = {};
          try {
            const reviewResponse = await axiosInstance.get(
              `/api/v1/reviews/place/${id}/LATEST?page=0&size=3`,
            );
            reviewData = reviewResponse.data.data;
          } catch (reviewError) {
            if (reviewError.response && reviewError.response.status !== 404) { //404는 리뷰없을때 뜸뜸
              AlertDialog({
                mode: "alert",
                title: "리뷰 데이터 오류",
                text: reviewError.response.data.message || "리뷰 데이터를 불러오는 데 실패했습니다.",
                confirmText: "확인",
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
    
          setData(combinedData);
        } catch (placeError) {
          if (placeError.response) {
            AlertDialog({
              mode: "alert",
              title: "시설 데이터 오류",
              text: placeError.response.data.message || "시설 데이터를 불러오는 데 실패했습니다.",
              confirmText: "확인",
            });
          }
        } finally{
          setIsLoading(false);
        }
      };
    
      fetchPlaceDetail();
    }, [id]);
    

    return(
        <>
          <Header label="시설 상세페이지" />
          {isLoading ? <Loading lable="로딩 중입니다..." />:
            <>
            <HeaderImage src={data.imageurl ? data.imageurl : PlaceDetailNoImage} alt="시설이미지"/>
            <PlaceTitle data={data} setData={setData}/>
            <PlaceInfo data={data} />
            <Division />
            <PlaceDescription data={data}/>
            <Division />
            <AiReview><AiReviewSummary placeId={id} /></AiReview>
            <Division />
            <PlaceReviewList data={data}/>
            </>
          }
          <Footer />
        </>
    )
};

const AiReview = styled.div`
  max-width: 554px;
  margin-left: 8%;
  margin-right: 3%;

  @media(max-width: 554px){
    margin-left: 8%;
    margin-right: 0;
  }
`
const HeaderImage = styled.img`
  width: 100%;
  max-width: 554px;
  height: 375px;
  object-fit: cover;
`;

const Division = styled.div`
    height: 8px;
    background-color: #E5E5E5;
    width: 100%;
`;

export default PlaceDetail;