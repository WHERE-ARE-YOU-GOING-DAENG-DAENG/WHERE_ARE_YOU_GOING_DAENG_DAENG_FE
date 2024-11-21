import styled from "styled-components";
import { useParams } from "react-router-dom";
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import PlaceTitle from "../components/detail/PlaceTitle";
import PlaceInfo from "../components/detail/PlaceInfo";
const PageContainer = styled.div`
  padding: 0px 44px;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
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

const Division = styled.div`
    height: 8px;
    background-color: #E5E5E5;
    width: 100%;
`;

const PlaceDetail = () => {
    const { id } = useParams();

    return(
        <>
            <Header label="시설 상세페이지" />
            <HeaderImage src={data.images[0]} alt="시설이미지" />
            <PageContainer>
              <PlaceTitle data={data}/>
              <PlaceInfo data={data} />
            </PageContainer>
            <Division />
                <PageContainer>
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