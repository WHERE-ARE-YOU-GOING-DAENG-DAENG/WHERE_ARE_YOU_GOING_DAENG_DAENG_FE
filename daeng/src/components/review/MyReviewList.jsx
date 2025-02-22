import { useEffect, useRef } from "react";
import styled from 'styled-components';
import star from '../../assets/icons/star.svg';
import DeleteReview from './DeleteReview';
import ReviewKeywords from '../commons/ReviewKeywords';
import reviewDefaultImg from '../../assets/icons/reviewDefaultImg.svg'
import arrow from '../../assets/icons/arrow.svg'
import Loading from "../commons/Loading";
import { useNavigate } from 'react-router-dom'; 

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
  
  @media (max-width: 554px) {
    font-size:10px;
    height: auto;
  }
`;

const PlaceTitle = styled.h2`
  font-size: 23px;
  font-weight: bold;
  text-align: left;
    
  @media (max-width: 554px) {
    font-size:20px;
  }
`;

const ReviewDate = styled.span`
  flex-shrink: 0;
  width: 160px;
  font-size: 14px;
  color: #818181;
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
`;

const PetName = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0px;
  display: flex;
  text-align: left;

  @media (max-width: 554px) {
    font-size: 15px;
    margin-right: 0%;
    text-align: left;
  }
`;

const StarSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  @media(max-width: 554px){
    margin-top : 5px;
  }
`;

const StyledStar = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 2px;
  cursor: pointer;

  @media (max-width: 554px) {
    width: 12px;
    height: 12px;
    margin-right: 1px;
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

const StyledArrow = styled.img`
  font-size: 14px;
  color: #818181;
  margin-left: 10px;
  display: flex;
  cursor: pointer;

  @media (max-width: 554px) {
    display: flex;
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
  width: 110px;
  height: 110px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-color: #d9d9d9;
`;

const Video = styled.video`
  width: 110px;
  height: 110px;
  background-color: #d9d9d9;
  border-radius: 8px;
  object-fit: cover;
`;

const InfoFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  p{
    margin: 0px;
    font-size: 14px;
    font-weight: ${({ reviewType }) => (reviewType === '실시간리뷰' ? 'bold' : 'semi-bold')};
    color: ${({ reviewType }) => (reviewType === '실시간리뷰' ? '#FF69A9' : '#B3B3B3')};

    @media(max-width: 554px){
      font-size: 12px;
    }
  }
`

function MyReviewList({ review, isLoading, fetchNextPage, page, isLast }) {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  const navigateToPlace = () => {
    navigate(`/search/${review.placeId}`);
  };

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !isLoading && !isLast) {
                fetchNextPage(); 
            }
        },
        { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => {
        if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading, fetchNextPage, isLast]);

  return (
    <ReviewWrapper>
      <HeaderContainer>
        <TitleSection>
          <PlaceTitle>{review.placeName}</PlaceTitle>
          <StyledArrow src={arrow} alt="장소 상세보기로 가는 화살표" onClick={navigateToPlace}/>
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
            {review.pets.join(" | ")}(이)랑 함께 방문했어요
          </PetName>
          <StarSection>
            {[...Array(review.score)].map((_, index) => (
              <StyledStar key={index} src={star} alt={`별점 ${index + 1}`} />
            ))}
          </StarSection>
        </PetInfoContainer>
        <InfoFlex reviewType={review.reviewType}>
          <DeleteReview reviewId={review.reviewId} reviewType={review.reviewType} />
          <p>{review.reviewType}</p>
        </InfoFlex>
      </PetContainer>
      <VisitDate>방문 날짜 | {review.visitedAt}</VisitDate>
      <KeywordsContainer>
        {review.keywords.map((keyword, index) => (
          <ReviewKeywords key={index} label={keyword} />
        ))}
      </KeywordsContainer>

      <ReviewContent>{review.content}</ReviewContent>

      <PictureContainer>
        {review.media.map((mediaUrl, index) => {
          if (mediaUrl.endsWith(".mp4") || mediaUrl.endsWith(".mov")) {
            return (
              <Video key={index} controls>
                <source src={mediaUrl} type="video/mp4" />
              </Video>
            );
          } else {
            return (
              <Picture
                key={index}
                style={{ backgroundImage: `url(${mediaUrl})` }}
              />
            );
          }
        })}
      </PictureContainer>
      
      <div ref={observerRef}>
        {isLoading && page > 0 && <Loading />}
      </div>
    </ReviewWrapper>
  );
}

export default MyReviewList;
