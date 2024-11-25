import React, { useState } from "react";
import styled from "styled-components";
import PreferenceFavoriteOptionList from "./PreferenceFavoriteOptionList";
import star from "../../assets/icons/star.svg";
import notfillstar from "../../assets/icons/notfillstar.svg";
import addImg from "../../assets/icons/addImg.svg";
import TextContainer from "./TextContainer";

const WriteReviewAllContainer = styled.div`
  display: block;
  padding: 3%;
  margin-left: 2%;
`;

const WriteReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PlaceTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-right: 50%;
  margin-bottom: 27px;
  margin-left: 10px;

  @media (max-width: 554px) {
    font-size: 15px;
    margin-right: 40%;
  }
`;

const WriteReviewDate = styled.span`
  color: #b3b3b3;
  font-size: 13px;
`;

const SelectPlaceOptionContainer = styled.div`
  width: auto;
  height: 266px;
  background-color: rgba(247, 247, 247, 0.78);
  text-align: left;
  padding: 5%;
  margin-right: 10px;
`;

const WhatPointLike = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 600;
  @media (max-width: 554px) {
    margin-left: 10px;
  }
`;

const SelectWarning = styled.span`
  font-size: 14px;
  color: #ff69a9;
  font-size: 10px;

  @media (max-width: 554px) {
    width: 95%;
    margin-left: 10px;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15%;
  align-items: center;
`;

const UserImg = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  margin-right: 10px;
  border: none;
  background-color: #ff69a9;

  @media (max-width: 554px) {
    margin-top: 4%;
  }
`;

const UserNickname = styled.span`
  font-size: 18px;
  color: #333;
  font-weight: bold;

  @media (max-width: 554px) {
    margin-top: 4%;
  }
`;

const UserQuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  justify-content: space-between;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
`;


const Question = styled.span`
  font-size: 15px;

  p {
    display: inline-block;
    font-size: 13px;
    color: #d9d9d9;
    margin-left: 5px;
  }
`;

const PetSelection = styled.select`
  width: 40%;
  height: 30px;
  padding: 10px;
  font-size: 15px;
  border: 0.5px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;

  &:focus {
    border-color: #ff69a9;
    outline: none;
  }
`;

const DateSelection = styled.input`
  width: 40%;
  height: 30px;
  padding: 10px;
  border: 0.5px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  padding-right: 1%;
  cursor: pointer;

  &:focus {
    border-color: #ff69a9;
    outline: none;
  }
`;

const StarContainer = styled.span`
  display: flex;
  flex-direction: row;
`;

const StyleStar = styled.img`
  width: 20px;
  margin-right: 5px;
  cursor: pointer;
`;

const AddImgContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const AddImg = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  border: 0.5px solid #d9d9d9;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 10px;
  color: #d9d9d9;
  background-image: url(${(props) => props.src || "none"});
  background-size: cover;
  background-position: center;

  input {
    display: none;
    cursor: pointer;
  }
`;

const AddImgButton = styled.img`
  width: 12px;
  margin-bottom: 0px;
  cursor: pointer;
`;

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function WriteReview() {
  const [ratings, setRatings] = useState([false, false, false, false, false]);
  const [previews, setPreviews] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
  
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  
    // 파일을 업로드한 후 input을 리셋
    e.target.value = null;
  };

  const handleStarClick = (index) => {
    setRatings((prevRatings) => {
      const newRatings = [...prevRatings];
      newRatings[index] = !newRatings[index];
      return newRatings;
    });
  };

  const handleRemoveImage = (index) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <WriteReviewAllContainer>
      <WriteReviewContainer>
        <PlaceTitle>가평 트리하우스</PlaceTitle>
        <WriteReviewDate>2024-06-20</WriteReviewDate>
      </WriteReviewContainer>
      <SelectPlaceOptionContainer>
        <WhatPointLike>어떤 점이 좋았나요?</WhatPointLike>
        <br />
        <SelectWarning>*이 장소에 맞는 키워드를 골라주세요 (1개~3개)</SelectWarning>
        <PreferenceFavoriteOptionList />
        <UserInfoContainer>
          <UserImg />
          <UserNickname>내가 진짜</UserNickname>
        </UserInfoContainer>
        <UserQuestionContainer>
          <Question>함께한 댕댕이를 선택해주세요</Question>
          <PetSelection />
        </UserQuestionContainer>
        <UserQuestionContainer>
          <Question>방문한 날짜를 선택해주세요</Question>
          <DateSelection type="date" max={getCurrentDate()} />
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
        <AddImgContainer>
          {previews.map((preview, index) => (
            <AddImg key={index} src={preview}>
              <RemoveButton onClick={() => handleRemoveImage(index)}>X</RemoveButton>
            </AddImg>
          ))}
          <AddImg>
            <label htmlFor="file-upload">
              <AddImgButton src={addImg} alt="이미지나 동영상 삽입" />
              <br />
              사진 / 동영상
              <br /> 업로드
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*,video/*"
              onChange={handleImageUpload}
              multiple
            />
          </AddImg>
        </AddImgContainer>
        <TextContainer />
      </SelectPlaceOptionContainer>
    </WriteReviewAllContainer>
  );
}

export default WriteReview;
