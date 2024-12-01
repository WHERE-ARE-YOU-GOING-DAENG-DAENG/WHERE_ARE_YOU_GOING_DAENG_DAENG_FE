import React, { useEffect } from 'react';
import styled from 'styled-components';
import star from '../../assets/icons/star.svg';
import DeleteReview from './DeleteReview';
import arrow from '../../assets/icons/arrow.svg';
import ReviewKeywords from '../../components/commons/ReviewKeywords';
import useReviewStore from '../../stores/UseReviewStore';

const ReviewWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
`;

const PlaceTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
`;

const ReviewDate = styled.span`
  font-size: 12px;
  color: #818181;
`;

const StyledArrow = styled.img`
  width: 16px;
  margin-left: 5px;
  cursor: pointer;
`;

const PetContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  margin: 20px 0;
`;

const UserImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

const PetInfoContainer = styled.div`
  flex-grow: 1;
  margin-left: 20px; 
`;

const PetName = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 43%;
`;

const StarSection = styled.div`
  display: flex;
  align-items: center;
`;

const StyledStar = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 2px;
`;

const VisitDate = styled.span`
  font-size: 12px;
  color: #818181;
  margin-left: 10px;
`;

const KeywordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ReviewContent = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333333;
  margin-top: 15px;
  text-align:left;
`;

const PictureContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const Picture = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-color: #d9d9d9;
`;

function ReviewForm() {
  const { reviews, isLoading, error, fetchUserReviews } = useReviewStore();

  useEffect(() => {
    fetchUserReviews(0, 15);
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <>
      {reviews.map((review) => (
        <ReviewWrapper key={review.reviewId}>
          <HeaderContainer>
            <TitleSection>
              <PlaceTitle>{review.placeId || "장소 불러오는 중"}</PlaceTitle>
              <StyledArrow src={arrow} alt="이동" />
            </TitleSection>
            <ReviewDate>등록 날짜 | {review.createdAt.split("T")[0]}</ReviewDate>
          </HeaderContainer>

          <PetContainer>
            <UserImg
              src={review.petImg || "default-user.jpg"}
              alt="반려동물 이미지"
            />
            <PetInfoContainer>
              <PetName>
                [{review.pets.join(" | ")}]랑 함께 방문했어요
              </PetName>
              <StarSection>
                {[...Array(review.score)].map((_, index) => (
                  <StyledStar key={index} src={star} alt={`별점 ${index + 1}`} />
                ))}
                <VisitDate>방문 날짜 | {review.visitedAt}</VisitDate>
              </StarSection>
            </PetInfoContainer>
            <DeleteReview reviewId={review.reviewId} />
          </PetContainer>

          <KeywordsContainer>
            {review.keywords.map((keyword, index) => (
              <ReviewKeywords key={index} label={keyword} />
            ))}
          </KeywordsContainer>

          <ReviewContent>{review.content}</ReviewContent>

          <PictureContainer>
            {review.media.map((mediaUrl, index) => (
              <Picture
                key={index}
                style={{ backgroundImage: `url(${mediaUrl})` }}
              />
            ))}
          </PictureContainer>
        </ReviewWrapper>
      ))}
    </>
  );
}

export default ReviewForm;
