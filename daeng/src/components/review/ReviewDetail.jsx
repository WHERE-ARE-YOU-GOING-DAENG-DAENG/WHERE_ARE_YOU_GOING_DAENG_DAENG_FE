import React from 'react'
import styled from 'styled-components';
import star from '../../assets/icons/star.svg';
import badcomment from '../../assets/icons/badcomment.svg';
import goodcomment from '../../assets/icons/goodcomment.svg';
import ReviewKeywords from '../../components/commons/ReviewKeywords';
import Sorting from '../../components/commons/Sorting';

const TotalReviewContainer = styled.div`
  display: block;
  padding:3%;
  margin-left: 4%;
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
  margin-top: 37px;
  margin-bottom: -30px;
`;

const TotalStarPoint = styled.span`
  font-size:15px;
  font-weight: bold;
  display: block;
  margin-left: 8px;
  margin-right: 12px;
`

const TotalReviewCount = styled.span`
  color: #B3B3B3;
  font-size:11px;
  display: block;
  margin-right: 165px;

  @media (max-width: 554px) {
    font-size: 10px;
    margin-right:180px;
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
const CommentAi = styled.span`
  font-size: 20px;
  font-weight: bold;
  display: block; 
  text-align: left;
  margin-top: 5%;
  margin-bottom:22px;
`;

const DivisionLine = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  margin-top:20px;
  margin-right:20px;
`;

function ReviewDetail() {

  return (
    <TotalReviewContainer>
    <ReviewPlaceTitle>가평 트리하우스</ReviewPlaceTitle>
    <PreferenceContainer>
      <ReviewKeywords label='배변봉투가 있어요' />
      <ReviewKeywords label='급수대가 있어요' />
      <ReviewKeywords label='뛰어놀기 좋아요' />
    </PreferenceContainer>
    <DivisionLine />
    <CommentAi>AI로 리뷰 요약본을 확인해보세요 !</CommentAi>
    <AiCommentContainer>
      <StyleImg src={goodcomment} alt="AI가 남겨주는 장소의 좋은 점"/>좋아요 !
    </AiCommentContainer>
    <AiCommentContainer><StyleImg src={badcomment} alt="AI가 남겨주는 장소의 안 좋은점"/>싫어요 !</AiCommentContainer>
    <ReviewSummaryContainer>
    <StarImg src={star} alt="별점" />
      <TotalStarPoint>4.8/5</TotalStarPoint>
      <TotalReviewCount>총 12개</TotalReviewCount>
      <Sorting
        mode="list"
        sortingOptions={["최신순", "평점 높은순", "평점 낮은순"]}
        activeIndex={0}
        onSortChange={(index) => console.log(`선택한 옵션 인덱스: ${index}`)} 
      />
    </ReviewSummaryContainer>
    </TotalReviewContainer>
  )
}

export default ReviewDetail
