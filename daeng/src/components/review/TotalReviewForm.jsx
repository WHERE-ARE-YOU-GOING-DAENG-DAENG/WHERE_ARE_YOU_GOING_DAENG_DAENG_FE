import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import star from '../../assets/icons/star.svg';
import notfillstar from "../../assets/icons/notfillstar.svg";
import ReviewKeywords from '../../components/commons/ReviewKeywords';
import ReviewSorting from './ReviewSorting';
import useTotalReviewStore from '../../stores/UseTotalReviewStore';
import AiReviewSummary from './AIReview';
import axios from 'axios';
import reviewDefaultImg from '../../assets/icons/reviewDefaultImg.svg'
import ReviewSlideshow from './ReviewSlideshow';
import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/icons/arrow.svg'

//리뷰 전체보기 페이지
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

  @media (max-width: 554px) {
    font-size:23px;
    margin-left:13px;
  }
`
const PreferenceContainer = styled.div`
  display: flex;
  margin-top: 3%;
  flex-direction: row;
  margin-bottom:3%;
  gap:2px;

  @media (max-width: 554px) {
    flex-direction: column;
    gap:5px;
  }
`

const ReviewSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 6%; 
`;

const TotalStarPoint = styled.span`
  font-size:18px;
  font-weight: bold;
  display: block;
  margin-left: 2%;
  margin-right: 2%;

  @media (max-width: 554px) {
    font-size:13px;
  }
`

const TotalReviewCount = styled.span`
  color: #B3B3B3;
  font-size:13px;
  display: block;

  @media (max-width: 554px) {
    font-size: 12px;
  }
`

const StarImg = styled.img`
  width: 15px; 
  height: 15px; 
  border-radius:100px;
`

const DivisionLine = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  margin-right:40px;
  margin-top:5px;

  @media (max-width: 554px) {
    margin-left:15px;
  }
`;

const TotalUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  
`

const UserStarImg = styled.img`
  width:15px;
  height:15px;
  display: flex;
  margin-top: 10px;
  margin-left: 3%;

  @media (max-width: 554px) {
    margin-top: 13px;
    width:13px;
    height:13px;
  }
`

const ReviewUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;

  @media (max-width: 554px) {
  margin-top: 5px;
  }
`

const UserPhoto = styled.img`
  width: 60px;
  height: 60px;
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
    margin-top: -2px;
  }
`

const UserId = styled.span`
  font-size:18px;
  font-weight: bold;
  margin-right: 3px;
  margin-top: 5px;

  @media (max-width: 554px) {
    font-size: 13px;
    margin-top: 10px;
  }
`
const PetType = styled.span`
  font-size: 15px;
  margin-left: 5px;
  color:#B3B3B3;
  margin-top:8px;

  @media (max-width: 554px) {
    font-size: 11px;
    margin-top:13px;
  }
`

const PostDate = styled.span`
  font-size: 14px;
  color: #B3B3B3;
  margin-left:10px;
  margin-top: 8px;
  margin-bottom: 3px;

  @media (max-width: 554px) {
    font-size: 11px;
    margin-bottom:10px;
    margin-top: 11px;
  }
`

const StyledArrow  = styled.img`
  width: 15px;
  margin-left: 10px;
  cursor: pointer;
`

const ReviewContent = styled.span`
  font-size: 15px;
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
const DescriptionContainer = styled.div`
  display:flex;
  flex-direction: row;
`

const VisitDate = styled.span`
  font-size: 15px;
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

const NoReview = styled.div`
  font-size: 13px;
  margin-top: 10px;
  font-weight: bold;
`

const ReadMoreButton = styled.button`
  color: #FF69A9;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;

  @media (max-width: 554px) {
    font-size: 10px; 
  }
`;

const LastReview = styled.span`
  display: block;
  font-size: 13px;
  margin-top: 30px;
  font-weight: bold;
`
const TotalReviewForm = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
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

  const [placeName, setPlaceName] = useState("");
  const [isExpanded, setIsExpanded] = useState({});
  const observerRef = useRef(null);


  useEffect(() => {
    if (placeId) {
      axios
        .get(`https://www.daengdaeng-where.link/api/v1/places/${placeId}`)
        .then((response) => {
          const name = response.data?.data?.name;
          setPlaceName(name || "장소 정보가 없습니다.");
        })
        .catch((error) => {
          console.error("Failed to fetch placeName:", error);
          setPlaceName("장소 정보가 없습니다.");
        });
    }
  }, [placeId]);

  

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

  const navigateToPlace = () => {
    if (!placeId) {
      return;
    }
    navigate(`/search/${placeId}`);
  };

  // Intersection Observer로 무한 스크롤 구현
  const observeLastItem = useCallback(
    (node) => {
      if (isLoading || isLast) return; // 로딩 중이거나 마지막 페이지라면 요청하지 않음

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && placeId) {
          fetchReviews(placeId); // 마지막 아이템에 도달하면 데이터 요청
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isLast, fetchReviews, placeId]
  );

  if (isLoading && reviews.length === 0) {
    return (
      <div>
        <img src="/assets/spinner.gif" alt="로딩 중..." />
        <p>로딩 중...</p>
      </div>
    );
  }
  if (!placeId) return <div>장소 정보를 가져올 수 없습니다.</div>;

  return (
    <TotalReviewContainer>
      <DescriptionContainer>
        <ReviewPlaceTitle>{placeName}</ReviewPlaceTitle>
        <StyledArrow src={arrow} onClick={navigateToPlace} />
      </DescriptionContainer>
      <PreferenceContainer>
        {bestKeywords.map((keyword, index) => (
          <ReviewKeywords key={index} label={keyword} />
        ))}
      </PreferenceContainer>
      <DivisionLine />
  
      <AiReviewSummary placeId={placeId} />
  
      <ReviewSummaryContainer>
        <div>
          <StarImg src={star} />
        </div>
        <TotalStarPoint>
          {score}/5
        </TotalStarPoint>
        <TotalReviewCount>총 {total}개</TotalReviewCount>
        <ReviewSorting
          sortingOptions={['최신순', '평점 높은순', '평점 낮은순']}
          activeIndex={['LATEST', 'HIGH_SCORE', 'LOW_SCORE'].indexOf(sortedType)}
          onSortChange={handleSortChange}
        />
      </ReviewSummaryContainer>
      <DivisionLine />
  
      {Array.isArray(reviews) && reviews.length > 0 ? (
        reviews.map((review, index) => {
          const maxLength = 200;
          const isExpandedForReview = isExpanded[review.reviewId] || false;
          const displayedText = isExpandedForReview
            ? review.content
            : review.content.slice(0, maxLength);
  
          return (
            <div
              key={review.reviewId}
              ref={index === reviews.length - 1 ? observeLastItem : null}
            >
              <ReviewUserContainer>
                <UserPhoto
                  src={review.petImg || reviewDefaultImg}
                  alt="반려동물 이미지"
                />
                <TotalUserInfoContainer>
                  <CommentContainer>
                    <UserId>{review.nickname}</UserId>
                    <PostDate>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </PostDate>
                  </CommentContainer>
                  <UserSecondInfoContainer>
                  <PetType>
                      {review.pets?.join(", ")}
                    </PetType>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <UserStarImg
                        key={idx}
                        src={idx < review.score ? star : notfillstar}
                        alt={idx < review.score ? `별점 ${idx + 1}` : "빈 별"}
                      />
                    ))}
                  </UserSecondInfoContainer>
                </TotalUserInfoContainer>
              </ReviewUserContainer>
              <VisitDate > 
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
              {review.media && review.media.length > 0 && (
                <ReviewSlideshow images={review.media} />
              )}
              <DivisionLine /> 
            </div>
          );
        })
      ) : !isLoading ? (
        <NoReview>리뷰가 없습니다.</NoReview>
      ) : null}
  
      {isLoading && <div>로딩 중...</div>}
      {!isLoading && isLast && reviews.length > 0 && <LastReview>더이상 리뷰가 없습니다.</LastReview>}
    </TotalReviewContainer>
  );
  };
  
  export default TotalReviewForm;
  