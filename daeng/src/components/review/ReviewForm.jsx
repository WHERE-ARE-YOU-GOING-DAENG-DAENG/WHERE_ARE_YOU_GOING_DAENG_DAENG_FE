import React, { useEffect } from 'react';
import styled from 'styled-components';
import star from '../../assets/icons/star.svg';
import DeleteReview from './DeleteReview';
import ReviewKeywords from '../../components/commons/ReviewKeywords';
import reviewDefaultImg from '../../assets/icons/reviewDefaultImg.svg'

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

  @media (max-width: 554px) {
    font-size:10px;
    height: auto;
  }
`;

const PlaceTitle = styled.h2`
  font-size: 23px;
  font-weight: bold;
  margin-right: 10px;
`;

const ReviewDate = styled.span`
  font-size: 14px;
  color: #818181;
`;

const StyledArrow = styled.img`
  width: 16px;
  margin-left: 5px;
  cursor: pointer;

  @media (max-width: 554px) {
    width: 10px;
    margin-left: 0px;
    height: auto;
  }
`;

const PetContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  margin: 10px 0;
`;

const UserImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;

  @media (max-width: 554px) {
    width: 60px;
    height: 60px;
  }
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

  @media (max-width: 554px) {
    font-size: 11px;
    margin-right: 0%;
    text-align: left;
    margin-left:-23px;
  }
`;

const StarSection = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 554px) {
    margin-left: -23px;
  }
`;

const StyledStar = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 2px;


  @media (max-width: 554px) {
    width: 10px;
    height: 10px;
    margin-right: 0px;
  }
`;

const VisitDate = styled.span`
  font-size: 14px;
  color: #818181;
  margin-left: 10px;
  display: flex;

  @media (max-width: 554px) {
    display: flex;
    margin-left: 4px;
  }
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

function ReviewForm({ review }) {
  return (
    <ReviewWrapper>
      <HeaderContainer>
        <TitleSection>
          <PlaceTitle>{review.placeName}</PlaceTitle>
        </TitleSection>
        <ReviewDate>등록 날짜 | {review.createdAt.split("T")[0]}</ReviewDate>
      </HeaderContainer>

      <PetContainer>
        <UserImg
          src={review.petImg || reviewDefaultImg}
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
          </StarSection>
        </PetInfoContainer>
        <DeleteReview reviewId={review.reviewId} />
      </PetContainer>
      <VisitDate>방문 날짜 | {review.visitedAt}</VisitDate>
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
  );
}

export default ReviewForm;
