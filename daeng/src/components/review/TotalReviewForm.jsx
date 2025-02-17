import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import star from '../../assets/icons/star.svg';
import notfillstar from "../../assets/icons/notfillstar.svg";
import ReviewKeywords from '../../components/commons/ReviewKeywords';
import ReviewSorting from './ReviewSorting';
import AiReviewSummary from './AIReview';
import axiosInstance from "../../services/axiosInstance";
import reviewDefaultImg from '../../assets/icons/reviewDefaultImg.svg'
import ReviewSlideshow from './ReviewSlideshow';
import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/icons/arrow.svg'
import Loading from '../../components/commons/Loading'; 
import { 
  TotalReviewContainer, 
  ReviewPlaceTitle, 
  PreferenceContainer, 
  ReviewSummaryContainer, 
  TotalStarPoint, 
  TotalReviewCount, 
  StarImg, 
  DivisionLine, 
  TotalUserInfoContainer, 
  UserStarImg, 
  ReviewUserContainer, 
  UserPhoto, 
  CommentContainer, 
  UserId, 
  PetType, 
  PostDate, 
  StyledArrow, 
  ReviewContent, 
  UserSecondInfoContainer, 
  DescriptionContainer, 
  VisitDate, 
  NoReview, 
  ReadMoreButton, 
  LastReview
} from "./total/TotalReviewStyle";

const TotalReviewForm = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [bestKeywords, setBestKeywords] = useState([]);
  const [score, setScore] = useState(0);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedType, setSortedType] = useState("LATEST");
  const [placeName, setPlaceName] = useState("");
  const [isExpanded, setIsExpanded] = useState({});
  const observerRef = useRef(null); 

  useEffect(() => {
    if (!placeId) return;
    axiosInstance
      .get(`/api/v1/places/${placeId}`)
      .then((res) => setPlaceName(res.data?.data?.name || "장소 정보가 없습니다."))
      .catch(() => setPlaceName("장소 정보가 없습니다."));
  }, [placeId]);

  const fetchReviews = async (currentPage) => {
    if (isLoading || isLast) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/v1/reviews/place/${placeId}/${sortedType}`,
        { params: { page: currentPage, size: 15 } }
      );

      const data = response.data.data;

      setReviews((prev) => (currentPage === 0 ? data.reviews : [...prev, ...data.reviews]));
      setTotal(data.total);
      setBestKeywords(data.bestKeywords);
      setScore(data.score);
      setIsLast(data.isLast);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    setReviews([]);
    setIsLast(false);
    fetchReviews(0);
  }, [placeId, sortedType]);


  useEffect(() => {
    if (placeId) {
      fetchReviews(placeId); 
    }
  }, [placeId, fetchReviews]);

  const handleSortChange = (index) => {
    const newSortedType = ['LATEST', 'HIGH_SCORE', 'LOW_SCORE'][index];
    setSortedType(newSortedType);
    setPage(0);
    setReviews([]);
    setIsLast(false);
    fetchReviews(0);
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

  const observeLastItem = useCallback(
    (node) => {
      if (isLoading || isLast) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isLast]
  );

  useEffect(() => {
    if (page > 0) fetchReviews(page);
  }, [page]);


  if (isLoading && reviews.length === 0) {
    return <Loading label="리뷰를 불러오는 중입니다..." />;
  }

  if (!placeId) return <div>장소 정보를 가져올 수 없습니다.</div>;

  return (
    <TotalReviewContainer>
      <DescriptionContainer>
        <ReviewPlaceTitle>{placeName}</ReviewPlaceTitle>
        <StyledArrow src={arrow} alt="장소 상세보기"onClick={navigateToPlace} />
      </DescriptionContainer>
      <PreferenceContainer>
        {bestKeywords.map((keyword, index) => (
          <ReviewKeywords key={index} label={keyword} />
        ))}
      </PreferenceContainer>
      <DivisionLine />
  
      <AiReviewSummary placeId={placeId} />
  
      <ReviewSummaryContainer>
          <StarImg src={star} alt="별점"/>
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
                  <div>
                    <UserId>{review.nickname}</UserId>
                    <PetType>({review.pets?.join(", ")})</PetType>
                  </div>
                  <PostDate>{new Date(review.createdAt).toLocaleDateString()}</PostDate>
                </CommentContainer>
                  <UserSecondInfoContainer>
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
      ) :!isLoading ? (
        <NoReview>리뷰가 없습니다.</NoReview>
      ) : null}
  
      {isLoading && reviews.length > 0 && <Loading label="리뷰를 추가로 불러오는 중입니다..." />}
      {!isLoading && isLast && reviews.length > 0 && <LastReview>더이상 리뷰가 없습니다.</LastReview>}
    </TotalReviewContainer>
  );
};

export default TotalReviewForm;
  