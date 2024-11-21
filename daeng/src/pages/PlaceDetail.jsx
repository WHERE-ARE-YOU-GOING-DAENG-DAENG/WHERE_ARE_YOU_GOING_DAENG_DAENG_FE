import { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import bookmarkIcon from "../assets/icons/bookmark.svg";
import filledbookmarkIcon from "../assets/icons/filledbookmark.svg";
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import dogIcon from "../assets/icons/detaildog.svg"
import joinIcon from "../assets/icons/join.svg"
import ReviewKeywords from "../components/commons/ReviewKeywords";
import starIcon from "../assets/icons/star.svg"
import addressIcon from "../assets/icons/place.svg"
import hourIcon from "../assets/icons/operatingHour.svg"
import callnumberIcon from "../assets/icons/callnumber.svg"
import websiteIcon from "../assets/icons/website.svg"
import PlaceOption from "../components/commons/PlaceOption";
const PageContainer = styled.div`
  padding: 0px 44px;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 0px;
  }

`;

const SubTitleSection = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 10px;

  .detail-category{
    color: #FF69A9;
    margin-right: 5px;
  }

  img{
    margin: 0 5px;
  }

  .detail-reviewcnt{
    margin-left: 2px;
    color: #808080;
    font-weight: normal;
  }
`

const InfoCard = styled.div`
  background: #F7F7F7;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  position: relative;

  .info-title{
    display: flex;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
    span{
    color: #FF4B98;
    }
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      width: 20px;
      margin-right: 10px;
    }

    span {
      font-size: 11px;
      padding: 10px;
    }
  }
    .dog-icon {
    position: absolute;
    top: 20px;
    right: -10px;

  }
`;

const ReviewsSection = styled.div`
  margin-top: 20px;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const ReviewCard = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;

  .review-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .nickname {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .review-content {
    font-size: 14px;
  }

  .keywords {
    margin-top: 10px;

    span {
      background: #e0e0e0;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 12px;
      margin-right: 5px;
    }
  }
`;

const PlaceDetail = () => {
    const {id} = useParams();
    const [isFavorite, setIsFavorite] = useState(data.isFavorite);

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    return(
        <>
            <Header label="시설 상세페이지" />
            <HeaderImage src={data.images[0]} alt="시설이미지" />
            <PageContainer>
                <TitleSection>
                    <h1>{data.name}</h1>
                    <ReviewKeywords label="방문하고 싶어요" icon={joinIcon}/>
                </TitleSection>
                <SubTitleSection>
                  <p className="detail-category">{data.categories[0]}</p>
                  <p>| 평점</p>
                  <img src={starIcon} alt="평점" />
                  <p>{data.rating}</p>
                  <p className="detail-reviewcnt">({data.reviews.length})</p>
                  <img
                      src={isFavorite ? filledbookmarkIcon : bookmarkIcon}
                      alt="Favorite"
                      className="favorite-button"
                      onClick={toggleFavorite}
                  />
                </SubTitleSection>
                <InfoCard>
                  <div className="info-title"><span>댕댕어디가</span>가 설명드려요 !</div>
                  <div className="info-item">
                      <img src={addressIcon} alt="주소" />
                      <span> {data.address.city} {data.address.district} {data.address.roadAddress}</span>
                  </div>
                  <div className="info-item">
                      <img src={hourIcon} alt="운영시간" />
                      <span>{data.openHours}</span>
                  </div>
                  <div className="info-item">
                      <span>🚫 휴무일: {data.holiday}</span>
                  </div>
                  <img src={dogIcon} alt="강아지아이콘" className="dog-icon"/>
                </InfoCard>
        
                {/* 리뷰 섹션 */}
                <ReviewsSection>
                <h2>보호자님의 리뷰</h2>
                {data.reviews.map((review) => (
                    <ReviewCard key={review.reviewId}>
                    <div className="review-header">
                        <img src={review.userImg || "https://via.placeholder.com/40"} alt={review.nickname} />
                        <span className="nickname">{review.nickname}</span>
                    </div>
                    <div className="review-content">{review.content}</div>
                    <div className="keywords">
                        {review.keywords.map((keyword, i) => (
                        <span key={i}>{keyword}</span>
                        ))}
                    </div>
                    </ReviewCard>
                ))}
                </ReviewsSection>
            </PageContainer>
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