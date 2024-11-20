import React from 'react'
import styled from 'styled-components'
import DeleteBtn from '../../components/commons/DeleteBtn'
import star from '../../assets/icons/star.svg'

const ReviewDivision = styled.div`
  height: 1px;
  width:100%;
  background-color: #E5E5E5;
  margin-top: 17px;
`

const ReviewContainer = styled.div`
  display: flex;
  padding:5%;
  margin-left:4%;
  flex-direction: row;
`

const PlaceTitle = styled.span`
  font-size:20px;
  font-weight: bold;
  display: block;
  margin-right: 60%;
`
const ReviewDate = styled.span`
  font-size:12px;
  font-weight: bold;
  color: #818181;
`
const ReviewContent = styled.span`
  

`

const ReviewPicture = styled.div`
  

`

const StyledStar = styled.img`
  width: 10%;
  height: auto;
  display: block; 
  margin-bottom: 30px; 
`;


function ReviewForm() {
  return (
  <>
    <ReviewDivision />
    <ReviewContainer>
      <PlaceTitle>가평 트리하우스</PlaceTitle>
      <DeleteBtn label="삭제" />
    </ReviewContainer>
    <ReviewDate/>
    <StyledStar src={star} alt="별점" />
    <ReviewContent>
    강아지와 함께하는 첫 펜션 여행, 정말 즐거웠어요! 🐾펜션이 너무 깔끔하고, 강아지를 위한 편의시설도 잘 갖춰져 있어서 걱정 없이 머물 수 있었어요. 넓은 정원에서 강아지가 자유롭게 뛰어놀 수 있었고, 바닥도 미끄럽지 않아 안전하게 놀 수 있었습니다. 주인분도 친절하게 강아지용 식사와 편안한 침구도 준비해주셔서 정말 감사했어요. 강아지가 너무 편안해 보였고, 우리도 마음 놓고 힐링할 수 있었답니다. 강아지와 함께 여행 가기에 정말 좋은 곳이었어요. 다음에도 꼭 다시 오고 싶어요! 🐕💖
    </ReviewContent>
    <ReviewPicture/>
  </>
  )
}

export default ReviewForm
