import { useState } from "react";
import styled from "styled-components";
import joinIcon from "../../assets/icons/join.svg"
import ReviewKeywords from "../../components/commons/ReviewKeywords";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import filledbookmarkIcon from "../../assets/icons/filledbookmark.svg";
import starIcon from "../../assets/icons/star.svg"
import { useNavigate, useParams } from "react-router-dom";
import useFavoriteStore from "../../stores/useFavoriteStore";
import useUserStore from "../../stores/userStore";
import AlertDialog from "../commons/SweetAlert";
import SquareBtn from "../commons/SquareBtn";
import useLocationStore from "../../stores/useLocationStore";
import axios from "axios";

const Container = styled.div`
  padding: 0px 44px;
  @media(max-width: 554px){
    padding: 0px 8%;
  }
`

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  text-align: left;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 3px;
    text-align:left;

    @media(max-width: 554px){
    font-size: 20px;
  }

`;

const SubTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 15px;
  aling-items: center;

  .detail-category{
    color: #FF69A9;
    margin-right: 5px;
  }

  img{
    margin: 0 5px;
    width: 15px;
    cursor:pointer;
  }

  .detail-reviewcnt{
    margin-left: 2px;
    color: #808080;
    font-weight: normal;
    cursor:pointer;
  }
`

const PlaceTitle = ({ data, setData }) => {
    const navigate = useNavigate();
    const { userId } = useUserStore.getState();
    const userLocation = useLocationStore((state)=>state.userLocation);
    
    const toggleBookmark = async (placeId, isFavorite) => {
      const favoriteStore = useFavoriteStore.getState();
      
      try {
        if (isFavorite) {
          const favoriteId = favoriteStore.getFavoriteId(placeId);
          if (favoriteId) {
            await favoriteStore.removeFavorite(favoriteId);
            setData((prevData) => ({
              ...prevData,
              isFavorite: false,
            }));
          } else {
            console.warn(`장소ID로 즐겨찾기 ID찾을 수 없음음: ${placeId}`);
          }
        } else {
          await favoriteStore.addFavorite(placeId);
          setData((prevData) => ({
            ...prevData,
            isFavorite: true,
          }));
        }
      } catch (error) {
        console.error("즐겨찾기 상태 바꾸는 중 에러러:", error);
      }
    };

    const handleVisitListClick = (placeId) => {
      if (userId) {
        navigate(`/visit-list/${placeId}`);
      } else {
        AlertDialog({
          mode: "confirm",
          title: "로그인 필요",
          text: `방문등록을 하시려면 로그인이 필요합니다.<br/>로그인페이지로 이동하시겠습니까?`,
          confirmText: "네",
          cancelText: "아니오",
          onConfirm: ()=> navigate('/login')
        });
      }
    }

    const handleReviewClick = async(placeId) => {
      if (userId) {
        if(userLocation.lat !== 0 || userLocation.lng !== 0){
          try{
            const payload = {
              placeId,
              latitude: userLocation.lat,
              longitude: userLocation.lng
            }
            const response = await axios.post("https://dev.daengdaeng-where.link/api/v2/review/realtime",payload,{
              withCredentials: true
            });
            if(response.data.message === "success"){
              navigate(`/write-review/${placeId}`, { state: { type: "realtime" } });
            }
          }catch(error){
            if(error.response && error.response.data){
              AlertDialog({
                mode: "alert",
                title: "위치확인필요",
                text: error.response.data.message,
                confirmText: "닫기",
              });
            }else{
              console.error("실시간리뷰 판별 중 오류발생", error)
            }
          }
        }else{
          AlertDialog({
            mode: "alert",
            title: "위치동의 필요",
            text: "땅따먹기 리뷰를 작성하려면 위치동의가 필요합니다.",
            confirmText: "확인",
          });
        }
      } else {
        AlertDialog({
          mode: "confirm",
          title: "로그인 필요",
          text: `땅따먹기리뷰를 작성하시려면 로그인이 필요합니다.<br/>로그인페이지로 이동하시겠습니까?`,
          confirmText: "네",
          cancelText: "아니오",
          onConfirm: ()=> navigate('/login')
        });
      }
    };
  
    return(
        <Container>
            <TitleSection>
                <h1>{data.name}</h1>
                <SquareBtn mode="visit" onClick={()=>handleVisitListClick(data.placeId)}/>
            </TitleSection>
            <SubTitleSection>
                <Info>
                  <p className="detail-category">{data.placeType}</p>
                  <p>| 평점</p>
                  <img src={starIcon} alt="평점" />
                  <p>{data.score}</p>
                  <p className="detail-reviewcnt" onClick={()=>navigate(`/total-review/${data.placeId}`)}>({data.total})</p>
                  <img
                      src={data.isFavorite ? filledbookmarkIcon : bookmarkIcon}
                      alt="Favorite"
                      className="favorite-button"
                      onClick={()=>toggleBookmark(data.placeId, data.isFavorite)}
                  />
                </Info>
                <SquareBtn mode="review" onClick={()=>handleReviewClick(data.placeId)}/>
            </SubTitleSection>
        </Container>
    )
}

export default PlaceTitle;