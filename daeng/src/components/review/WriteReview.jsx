import React, { useState } from 'react'
import styled from "styled-components";
import PreferenceFavoriteOptionList from './PreferenceFavoriteOptionList';
import star from '../../assets/icons/star.svg';
import notfillstar from '../../assets/icons/notfillstar.svg';
import addImg from '../../assets/icons/addImg.svg';
import TextContainer from './TextContainer';

const WriteReviewAllContainer = styled.div`
  display: block;
  padding:3%;
  margin-left: 4%;
`

const WriteReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const PlaceTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-right:50%;
  margin-bottom:27px;
  margin-left: 10px;

  @media (max-width: 554px) {
    font-size: 15px;
    margin-right:40%;
  }
`

const WriteReviewDate = styled.span`
  color: #B3B3B3;
  font-size: 13px;
`

const SelectPlaceOptionContainer = styled.div`
  width: auto;
  height: 266px;
  background-color: rgba(247, 247, 247, 0.78); 
  text-align:left;
  padding: 5%; 
`

const WhatPointLike = styled.span`  
  font-size: 14px;
  color: #333;
  font-weight: 600;
  @media (max-width: 554px) {
    margin-left: 10px;
  }
`

const SelectWarning = styled.span`
  font-size: 14px;
  color: #FF69A9;
  font-size: 10px;

  @media (max-width: 554px) {
    width: 95%;
    margin-left: 10px;
  }
`

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15%;
  align-items: center; 
`

const UserImg = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  margin-right: 10px;
  border:none;
  background-color: #FF69A9;

  @media (max-width: 554px) {
    margin-top: 4%;
  }
`

const UserNickname = styled.span`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  
  @media (max-width: 554px) {
    margin-top: 4%;
  }
`

const UserQuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  margin-top: 30px;
  justify-content: space-between;
`

const Question = styled.span`
  font-size: 15px;
  
  p {
    display: inline-block;
    font-size: 13px;
    color: #D9D9D9;
    margin-left: 5px;
  }
`

const PetSelection = styled.select`
  width:40%;
  height: 30px;
  padding: 10px;
  font-size: 15px;
  border: 0.5px solid #D9D9D9;
  border-radius: 5px;
  cursor: pointer;

  &:focus {
    border-color: #FF69A9;  
    outline: none; 
  }
`

const DateSelection = styled.input`
  width:40%;
  height: 30px;
  padding: 10px;
  border: 0.5px solid #D9D9D9;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  padding-right: 1%;
  cursor: pointer;

  &:focus {
    border-color: #FF69A9;  
    outline: none; 
  }
`

const StarContainer = styled.span`
  display: flex;
  flex-direction: row;
`

const StyleStar = styled.img`
  width:20px;
  margin-right:5px;
  cursor:pointer;
`

const AddImg = styled.div`
  width: 100px;
  height: 100px;
  border: 0.5px solid #D9D9D9;
  border-radius: 5px;
  text-align: center;

  display: flex;
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
  font-size: 10px;
  color: #D9D9D9;
  cursor: pointer;

  input[type="file"] {
    display: none; 
  }

  p {
    font-size: 13px;
    color: #333;
  }
`;

const AddImgButton = styled.img`
  width:12px;
  margin-bottom:0px;
`
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function WriteReview() {
  const [ratings, setRatings] = useState([false, false, false, false, false]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
    }
  }; //이미지 첨부 부분 > 아직 구현 못함
  
  const handleStarClick = (index) => {
    setRatings(prevRatings => {
      const newRatings = [...prevRatings];
      newRatings[index] = !newRatings[index];
      return newRatings;
    });
  }; //별점 배열로 처리 

  return (
    <WriteReviewAllContainer>
      <WriteReviewContainer>
        <PlaceTitle>
          가평 트리하우스 
        </PlaceTitle>
        <WriteReviewDate>2024-06-20</WriteReviewDate>
      </WriteReviewContainer>

      <SelectPlaceOptionContainer>

        <WhatPointLike>어떤 점이 좋았나요 ?</WhatPointLike><br />
        <SelectWarning>*이 장소에 맞는 키워드를 골라주세요 (1개~3개)</SelectWarning>
        <PreferenceFavoriteOptionList />

        <UserInfoContainer>
          <UserImg/>
          <UserNickname>내가 진짜</UserNickname>
        </UserInfoContainer>

        <UserQuestionContainer>
          <Question>함께한 댕댕이를 선택해주세요</Question>
          <PetSelection />
        </UserQuestionContainer>

        <UserQuestionContainer>
          <Question>방문한 날짜를 선택해주세요</Question>
          <DateSelection type="date" max={getCurrentDate()}/>
        </UserQuestionContainer>

        <UserQuestionContainer>
          <Question>별점을 눌러 만족도를 공유해주세요</Question>
          <StarContainer>
            {[...Array(5)].map((_, index) => (
              <StyleStar
                key={index}
                src={ratings[index] ? star : notfillstar} 
                alt="리뷰 작성하기 별점"
                onClick={() => handleStarClick(index)}
              />
            ))}
          </StarContainer>
        </UserQuestionContainer>

        <UserQuestionContainer>
          <Question>사진 / 동영상 업로드 <p>(선택)</p></Question>
        </UserQuestionContainer>
        
        <AddImg>
          <input 
            type="file" 
            accept="image/*,video/*" 
            onChange={handleFileChange}
          />
          <AddImgButton src={addImg} alt="이미지나 동영상 삽입" />
          <br />
          사진 / 동영상<br/> 업로드
        </AddImg>

        <TextContainer />
        
      </SelectPlaceOptionContainer>

    </WriteReviewAllContainer>
  )
}

export default WriteReview;
