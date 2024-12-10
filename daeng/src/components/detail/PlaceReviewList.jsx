import styled from "styled-components";
import PropTypes from "prop-types";
import star from '../../assets/icons/star.svg';
import notfillstar from "../../assets/icons/notfillstar.svg";
import writeIcon from "../../assets/icons/pen.svg";
import ReviewKeywords from "../commons/ReviewKeywords";
import AlertDialog from "../commons/SweetAlert";
import ReviewSlideshow from '../review/ReviewSlideshow';
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import defaultImage from "../../assets/icons/reviewDefaultImg.svg"

const Container = styled.div`
  margin: 10px 0px;
  padding: 0px 44px;
  h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  @media (max-width: 554px) {
  padding: 0px 8%;
  }
`;

const ReviewsSection = styled.div`
  margin: 0 25px;
  flex-direction: column;
  padding: 0px 3%;
  padding-bottom: 77px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  color: black;

  h2 {
    font-size: 20px;
    font-weight: bold;
  }
  
  button{
    border: none;
    background-color: white;
  }

  .actions {
    display: flex;
    align-items: center;

    .action {
      margin-left: 10px;
      font-size: 15px;
      cursor: pointer;

      @media(max-width:554px){
        font-size: 13px;
        margin-left: 1px;
      }

      &:hover {
        color: #666;
      }

      img {
        margin: 0px 3px;
      }
    }
  }
    @media (max-width: 554px) {
      h2 {
        font-size: 18px;
        font-weight: bold;
      }
  }
`;

const KeywordsContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-direction: column;
  .title {
    font-size: 15px;
    font-weight: semi-bold;
    margin-bottom: 12px;
    @media(max-width:554px){
      font-size: 13px;
    }
  }

  .keywords {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 5px;

    @media (max-width: 554px){
    gap: 5px;
  }
  }
  
`
const TotalUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const UserStarImg = styled.img`
  width:15px;
  height:15px;
  display: flex;
  margin-top: 5px;
  @media (max-width: 554px) {
    width: 13px;
    margin-top: 0px;
  }
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
  width: 380px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;

  @media (max-width: 554px) {
    width: 70vw;
  }
`

const UserId = styled.span`
  font-size:20px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 5px;

  @media (max-width: 554px) {
    font-size: 15px;
    margin-top: 10px;
  }
`
const PetType = styled.span`
  font-size: 15px;
  margin-left: 5px;
  color:#B3B3B3;
  margin-top:8px;

  @media (max-width: 554px) {
    font-size: 9px;
    margin-top:13px;
  }
`

const PostDate = styled.span`
  font-size: 13px;
  color: #B3B3B3;
  margin-top: 8px;
  margin-bottom: 3px;

  @media (max-width: 554px) {
    font-size: 11px;
    margin-top: 6px;
    margin-right: 20px;
    margin-bottom:10px;
  }
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
    font-size: 13px;
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
const ReadMoreButton = styled.button`
  color: #FF69A9;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;

  @media (max-width: 554px) {
    font-size: 12px; 
  }
`;

const PlaceReviewList = ({ data }) => {
  const navigate = useNavigate();
  const { id: placeId } = useParams();
  const [isExpanded, setIsExpanded] = useState({});
  const { userId } = useUserStore.getState();
  
  const toggleText = (reviewId) => {
    setIsExpanded((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleWriteReviewClick = () => {
    if (userId) {
      navigate(`/write-review/${placeId}`, { state: { type: "normal" } });
    } else {
      AlertDialog({
        mode: "alert",
        title: "로그인 필요",
        text: "리뷰를 작성하려면 로그인이 필요합니다.",
        confirmText: "확인",
      });
    }
  };

  
  return (
    <>
      <Container>
        <ReviewHeader>
          <h2>보호자님들의 리뷰</h2>
          <div className="actions">
            <button className="action" onClick={handleWriteReviewClick}>
              리뷰 작성
              <img src={writeIcon} alt="리뷰 작성" />
            </button>
            <button className="action"  onClick={() => navigate(`/total-review/${placeId}`)}>전체보기 &gt;</button>
          </div>
        </ReviewHeader>

        <KeywordsContainer>
          <div className="title">가장 많이 선택된 키워드 &gt;</div>
          <div className="keywords">
            {Array.isArray(data?.bestKeywords) &&
            data.bestKeywords.slice(0,3).map((keyword, index) => (
              <ReviewKeywords key={index} label={keyword} />
            ))}
          </div>
        </KeywordsContainer>
      </Container>
      <ReviewsSection>
      {Array.isArray(data.reviews) && data.reviews.length > 0 ? (
        data.reviews.map((review, index) => {
          const maxLength = 200;
          const isExpandedForReview = isExpanded[review.reviewId] || false;
          const displayedText = isExpandedForReview
            ? review.content
            : review.content.slice(0, maxLength);

          return (
            <div key={review.reviewId} >
              <ReviewUserContainer>
                <UserPhoto
                  src={review.petImg? review.petImg : defaultImage}
                  alt="반려동물 이미지"
                />
                <TotalUserInfoContainer>
                  <CommentContainer>
                    <div>
                      <UserId>{review.nickname}</UserId>
                      <PetType>{review.pets?.join(", ") || "등록된 반려동물이 없습니다."}</PetType>
                    </div>
                    <PostDate>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </PostDate>
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
                {review.media && review.media.length > 0 && (
                  <ReviewSlideshow images={review.media} />
                )}
              </ReviewPictureContainer>
            </div>
          );
        })
      ) : (
        <p style={{fontWeight: "bold"}}>리뷰가 없습니다.</p>
      )}
      </ReviewsSection>
    </>
  );
};

PlaceReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      userImg: PropTypes.string,
      nickname: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
      videos: PropTypes.arrayOf(PropTypes.string),
      keywords: PropTypes.arrayOf(PropTypes.string),
      placeName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PlaceReviewList;