import React, { useState } from 'react';
import styled from 'styled-components';
import star from '../../assets/icons/star.svg';
import DeleteBtn from "../commons/DeleteBtn";


const TotalReviewContainer = styled.div`
  display: block;
  padding:3%;
  margin-left:4%;

  @media (max-width: 554px) {
    padding:4%;
    margin-left:1%;
  }
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
  margin-right: 84%;

  @media (max-width: 554px) {
  display: flex;
  margin-top: 5px;
  margin-right: 76%;
  }
`

const ReviewUserContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const UserPhoto = styled.div`
  width: 60px;
  height: 60px;
  background-color: #FF69A9;
  border-radius: 50%;
  margin-left: 3%;
  margin-top: 20px;
  margin-right: 3%;

  @media (max-width: 554px) {
  width: 53px;
  height: 53px;
  margin-left: 1px;
  margin-right: 5%;
  }
`

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`

const UserId = styled.span`
  font-size:20px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 5px;

  @media (max-width: 554px) {
    font-size: 10px;
    margin-top:5px;
  }
`
const PetType = styled.span`
  font-size: 13px;
  margin-left: 5px;
  color:#B3B3B3;
  margin-top:8px;

  @media (max-width: 554px) {
    font-size: 9px;
    margin-top:5px;
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
    margin-top:5px;
    margin-bottom:5px;
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

const ReviewPicture = styled.div`
  display: block;
  width: 100px;
  height:103px;
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

function TotalReviewForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = "강아지와 함께하는 첫 펜션 여행, 정말 즐거웠어요! 🐾펜션이 너무 깔끔하고, 강아지를 위한 편의시설도 잘 갖춰져 있어서 걱정 없이 머물 수 있었어요. 넓은 정원에서 강아지가 자유롭게 뛰어놀 수 있었고, 바닥도 미끄럽지 않아 안전하게 놀 수 있었습니다. 주인분도 친절하게 강아지용 식사와 편안한 침구도 준비해주셔서 정말 감사했어요. 강아지가 너무 편안해 보였고, 우리도 마음 놓고 힐링할 수 있었답니다.강아지와 함께 여행 가기에 정말 좋은 곳이었어요. 다음에도 꼭 다시 오고 싶어요! 🐕💖"; //더미데이터 일단 넣어둠

  const maxLength = 200;
  const displayedText = isExpanded ? text : text.slice(0, maxLength);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TotalReviewContainer>
      <DivisionLine />
        <ReviewUserContainer>
          <UserPhoto />
          <TotalUserInfoContainer>
          <CommentContainer>
            <UserId>내가 진짜</UserId>
            <PetType>시츄</PetType>
            <PostDate>2024.10.11</PostDate>
          </CommentContainer>
          <UserSecondInfoContainer>
            <UserStarImg src={star} alt='유저별 장소에 남긴 별점' />
            <DeleteBtn label='삭제' />
          </UserSecondInfoContainer>
          </TotalUserInfoContainer>
        </ReviewUserContainer>
        <VisitDate>방문날짜 2024.05.29</VisitDate>
        <ReviewContent>
          {displayedText}
          {text.length > maxLength && (
          <ReadMoreButton onClick={toggleText}>
          {isExpanded ? '접기' : '더보기'}
        </ReadMoreButton>
          )}
        </ReviewContent>
        <ReviewPictureContainer>
          <ReviewPicture /><ReviewPicture /><ReviewPicture />
        </ReviewPictureContainer>
      </TotalReviewContainer>
  )
}

export default TotalReviewForm;
