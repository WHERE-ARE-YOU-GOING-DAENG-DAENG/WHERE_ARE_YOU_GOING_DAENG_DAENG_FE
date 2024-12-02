import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import star from '../../assets/icons/star.svg';
import notfillstar from "../../assets/icons/notfillstar.svg";
import ReviewKeywords from '../../components/commons/ReviewKeywords';
import Sorting from '../../components/commons/Sorting';
import useTotalReviewStore from '../../stores/UseTotalReviewStore';
import AiReviewSummary from './AIReview';

const TotalReviewContainer = styled.div`
  display: block;
  padding:3%;
  margin-left:4%;

  @media (max-width: 554px) {
    padding:4%;
    margin-left:1%;
  }
`

const ReviewPlaceTitle = styled.span`
  font-size:25px;
  font-weight:bold;
  display: block;
  text-align: left;
`
const PreferenceContainer = styled.div`
  display: flex;
  margin-top: 3%;
  flex-direction: row;
  margin-bottom:3%;
`

const AiCommentContainer = styled.div`
  display: flex;
  width: 95%;
  height: 48px;
  margin-bottom:18px;
  background-color: rgba(247, 247, 247, 0.78);  
  color:#FF69A9;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  align-items: center; 
  padding: 5px 0; 

  @media (max-width: 554px) {
    width: 91%;
    height: 40px;
    font-size: 9px;
  }
`;

const ReviewSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
`;

const TotalStarPoint = styled.span`
  font-size:15px;
  font-weight: bold;
  display: block;
  margin-left: 2%;
  margin-right: 3%;
`

const TotalReviewCount = styled.span`
  color: #B3B3B3;
  font-size:11px;
  display: block;
  margin-right: 165px;

  @media (max-width: 554px) {
    font-size: 11px;
    margin-right:160px;
  }
`

const StyleImg = styled.img`
  width: 20px; 
  height: 20px; 
  margin-right: 10px; 
  margin-left:37px;
`

const StarImg = styled.img`
  width: 15px; 
  height: 15px; 
  border-radius:100px;
`

const DivisionLine = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  margin-top:-2px;
  margin-right:40px;
`;

const TotalUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const UserStarImg = styled.img`
  width:10px;
  height:10px;
  display: flex;
  margin-top: 5px;
`

const ReviewUserContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 554px) {
  margin-top: 5px;
  }
`

const UserPhoto = styled.img`
  width: 60px;
  height: 60px;
  background-color: #FF69A9;
  border-radius: 50%;
  margin-left: 2%;
  margin-top: 20px;
  margin-right: 2%;

  @media (max-width: 554px) {
  width: 53px;
  height: 53px;
  margin-left: 5px;
  margin-right: 3%;
  }
`

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;

  @media (max-width: 554px) {
    margin-top: -10px;
  }
`

const UserId = styled.span`
  font-size:20px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 5px;

  @media (max-width: 554px) {
    font-size: 13px;
    margin-top: 10px;
  }
`
const PetType = styled.span`
  font-size: 13px;
  margin-left: 5px;
  color:#B3B3B3;
  margin-top:8px;

  @media (max-width: 554px) {
    font-size: 9px;
    margin-top:13px;
    margin-right:120px;
  }
`

const PostDate = styled.span`
  font-size: 13px;
  color: #B3B3B3;
  margin-left:200px;
  margin-top: 8px;
  margin-bottom: 3px;

  @media (max-width: 554px) {
    font-size: 11px;
    margin-bottom:10px;
    margin-left:130px;
  }
`

const ReviewContent = styled.span`
  font-size: 13px;
  display: block; 
  padding-left: 3%;
  padding-right: 9%;
  text-align: justify;  
  line-height: 1.5;  
  word-break: break-word;  
  margin-top: 20px;

  @media (max-width: 554px) {
    padding-left: 1%;
    font-size: 11px;
  }
`;

const UserSecondInfoContainer = styled.div`
  display: flex;
  flex-direction: row;  
`

const VisitDate = styled.span`
  font-size: 13px;
  color: #B3B3B3;
  display: flex;
  flex-direction: flex-start;
  margin-top:3%;
  margin-left: 3%;

  @media (max-width: 554px) {
    font-size: 11px;
    margin-top:4%;
    margin-bottom:5px;
    margin-left:1%;
  }
`

const ReviewPictureContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 554px) {
    margin-left:-2%;
  }
`

const ReviewPicture = styled.img`
  display: block;
  width: 120px;
  height:120px;
  background-color: #D9D9D9;
  border-radius:5px;
  margin-left: 10px; 
  margin-top: 3%;

  @media (max-width: 554px) {
    width: 80px;
    height:90px;
  }
`
const ReadMoreButton = styled.button`
  color: #FF69A9;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;

  @media (max-width: 554px) {
    font-size: 10px; 
  }
`;

function TotalReviewForm({ review }) {
  const { placeId } = useParams();
  const {
    reviews,
    total,
    bestKeywords,
    score,
    fetchReviews,
    setSortedType,
    isLoading,
    isLast,
    sortedType,
  } = useTotalReviewStore();


  const [isExpanded, setIsExpanded] = useState({});


  useEffect(() => {
    if (placeId) {
      fetchReviews(placeId); 
    }
  }, [placeId, fetchReviews]);

  const handleSortChange = (index) => {
    const sortTypes = ['LATEST', 'HIGH_SCORE', 'LOW_SCORE'];
    setSortedType(sortTypes[index]); 
    if (placeId) {
      fetchReviews(placeId); 
    }
  };

  const toggleText = (reviewId) => {
    setIsExpanded((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (!placeId) return <div>장소 정보를 가져올 수 없습니다.</div>;
  if (reviews.length === 0) return <div>리뷰가 없습니다.</div>;

  return (
  <TotalReviewContainer>
  <ReviewPlaceTitle>{review?.placeId || "장소 정보가 없습니다."}</ReviewPlaceTitle>

  <PreferenceContainer>
    {bestKeywords.map((keyword, index) => (
      <ReviewKeywords key={index} label={keyword} />
    ))}
  </PreferenceContainer>
  <DivisionLine />

  <AiReviewSummary placeId={placeId} />

  <ReviewSummaryContainer>
  <div>
    <StarImg src={star}/>
  </div>
  <TotalStarPoint>      
    {reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + (review.score || 0), 0) / reviews.length).toFixed(0)
        : 0}
      /5</TotalStarPoint>
    <TotalReviewCount>총 {total}개</TotalReviewCount>
    <Sorting
      mode="list"
      sortingOptions={['최신순', '평점 높은순', '평점 낮은순']}
      activeIndex={['LATEST', 'HIGH_SCORE', 'LOW_SCORE'].indexOf(sortedType)}
      onSortChange={handleSortChange}
    />
    </ReviewSummaryContainer>
    <DivisionLine />
    {Array.isArray(reviews) && reviews.length > 0 ? (
    reviews.map((review) => {
      console.log("리뷰 데이터 구조:", review);
      const maxLength = 200;
      const isExpandedForReview = isExpanded[review.reviewId] || false;
      const displayedText = isExpandedForReview
        ? review.content
        : review.content.slice(0, maxLength);
        
      return (
        <div key={review.reviewId}>
          <ReviewUserContainer>
            <UserPhoto
              src={review.petImg || "default-user.jpg"} 
              alt="반려동물 이미지"
            />
            <TotalUserInfoContainer>
              <CommentContainer>
                <UserId>{review.nickname}</UserId>
                <PetType>{review.pets?.join(", ") || "등록된 반려동물이 없습니다."}</PetType>
                <PostDate>
                  {new Date(review.createdAt).toLocaleDateString()}
                </PostDate>
              </CommentContainer>
              <UserSecondInfoContainer>
                {Array.from({ length: 5 }).map((_, index) => (
                  <UserStarImg
                    key={index}
                    src={index < review.score ? star : notfillstar} 
                    alt={index < review.score ? `별점 ${index + 1}` : "빈 별"}
                  />
                ))}
              </UserSecondInfoContainer>
            </TotalUserInfoContainer>
          </ReviewUserContainer>
          <VisitDate>
            방문날짜 {new Date(review.visitedAt).toLocaleDateString()}
          </VisitDate>
          <ReviewContent>
            {displayedText}
            {review.content.length > maxLength && (
              <ReadMoreButton onClick={() => toggleText(review.reviewId)}>
                {isExpandedForReview ? "접기" : "더보기"}
              </ReadMoreButton>
            )}
          </ReviewContent>
          <ReviewPictureContainer>
            {Array.isArray(review.media) &&
              review.media.map((mediaUrl, index) => (
                <ReviewPicture key={index} src={mediaUrl} alt={`리뷰 이미지 ${index + 1}`} />
              ))}
          </ReviewPictureContainer>
        </div>
            );
          })
        ) : (
          <div>리뷰가 없습니다.</div>
        )}
      </TotalReviewContainer>

  );
}

export default TotalReviewForm;