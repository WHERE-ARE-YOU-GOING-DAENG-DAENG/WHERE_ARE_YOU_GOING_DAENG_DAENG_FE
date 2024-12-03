import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PreferenceFavoriteOptionList from "./PreferenceFavoriteOptionList";
import star from "../../assets/icons/star.svg";
import notfillstar from "../../assets/icons/notfillstar.svg";
import addImg from "../../assets/icons/addImg.svg";
import axios from "axios";
import ConfirmBtn from '../../components/commons/ConfirmBtn';
import AlertDialog from '../../components/commons/SweetAlert';
import usePetStore from "../../stores/usePetStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import Select from "react-select";
import reviewDefaultImg from '../../assets/icons/reviewDefaultImg.svg'

const WriteReviewAllContainer = styled.div`
  display: block;
  padding: 3%;
  margin-left: 2%;
`;

const WriteReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const PlaceTitle = styled.span`
  font-size: 25px;
  font-weight: bold;
  margin-right: 43%;
  margin-bottom: 27px;
  margin-left: 3%;

  @media (max-width: 554px) {
    font-size: 20px;
    margin-right: 10%;
    margin-left:10px;
    margin-bottom: 15px;
  }
`;

const WriteReviewDate = styled.span`
  color: #b3b3b3;
  font-size: 18px;
  
  @media (max-width: 554px) {
    margin-left: 20%;
  }
`;

const SelectPlaceOptionContainer = styled.div`
  width: auto;
  height: 330px;
  background-color: rgba(247, 247, 247, 0.78);
  text-align: left;
  padding: 5%;
  margin-right: 10px;

  @media (max-width: 554px) {
    padding:5%;
    height: 320px;
  }
`;

const WhatPointLike = styled.span`
  font-size: 20px;
  color: #333;
  font-weight: 600;

  @media (max-width: 554px) {
    display: flex;
    margin-left: 10px;
    font-size: 16px;
    margin-bottom: -1px;
  }
`;

const SelectWarning = styled.span`
  color: #ff69a9;
  font-size: 15px;

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


  @media (max-width: 554px) {
    margin-top: 4%;
  }
`;

const UserNickname = styled.span`
  font-size: 20px;
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
  font-size: 18px;

  p {
    display: inline-block;
    font-size: 15px;
    color: #d9d9d9;
    margin-left: 5px;
  }

  @media (max-width: 554px) {
      font-size: 14px; 
      margin-left: 0; 
      margin-right: 4px;
      display: block;
      text-wrap:nowrap;
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

const QuestionBox = styled.span`
  font-size: 18px;
  display: inline; 
  color: #333;

  p {
    display: inline-block;
    font-size: 13px;
    color: #D9D9D9;
    margin-left: 5px;
  }
`

const CountText = styled.span`
  font-size: 15px;
  color: #FF0000;
  margin-top:3px;
  margin-right:10px;
`

const TextDescriptionContainer = styled.div`
  margin-top: 20px;
  display: flex;
  margin-bottom: -12px;
  justify-content: space-between;  
  align-items: center;  
`
const DivisionLine = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  margin-top:20px;
  margin-right:10px;
  margin-bottom:29px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: auto;
  min-height: 400px; 
  border: none;
  padding: 5px;
  resize: none; 
  font-size:15px;
  line-height: 1.5; 

  &:focus {
    outline: none;    
    border: none;  
    box-shadow: none;
  }

  @media (max-width: 554px) {
    min-height: 50px;
  }
`;

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}; //오늘 날짜 가지고 오기


function WriteReview({ review = {} }) {
  const { placeId } = useParams();
  const [placeName, setPlaceName] = useState("장소 이름 없음");
  useEffect(() => {
    if (placeId) {
      axios
        .get(`https://www.daengdaeng-where.link/api/v1/places/${placeId}`)
        .then((response) => {
          const name = response.data?.data?.name; 
          setPlaceName(name || "장소 이름 없음"); 
        })
        .catch((error) => {
          console.error("Failed to fetch place name:", error);
          setPlaceName("장소 이름 없음");
        });
    }
  }, [placeId]);

  const placeIdValue = review?.placeId || placeId;

  if (!placeIdValue) {
    return <div>장소 정보를 가져올 수 없습니다.</div>;
  }

  const { nickname } = useUserStore();
  const navigate = useNavigate();
  const { pets, fetchPetList } = usePetStore();
  const [selectPet, setSelectPet] = useState([]); // 선택된 펫 목록들
  const [ratings, setRatings] = useState([false, false, false, false, false]); // 별점
  const [previews, setPreviews] = useState([]); //이미지 미리보기
  const [placeImgs, setPlaceImgs] = useState([]); // 업로드할 이미지 파일
  const [selectKeywords, setSelectKeywords] = useState([]); 
  const [text, setText] = useState(""); // 리뷰 내용 상태
  const [visitedAt, setVisitedAt] = useState(""); // 초기값을 빈 문자열로 설정
  const [selectedPetImage, setSelectedPetImage] = useState(""); //첫번째 펫 이미지

  
  useEffect(() => {
    fetchPetList(); 
  }, [fetchPetList]);

  const petOptions = pets.map((pet) => ({
    value: pet.petId,
    label: pet.name,
    image: pet.image,
  }));
  
const handlePetSelection = (selectedOptions) => {
  setSelectPet(selectedOptions);

  if (selectedOptions.length > 0) {
    setSelectedPetImage(selectedOptions[0].image); 
  } else {
    setSelectedPetImage(""); 
  }
};

  useEffect(() => {
    console.log("useParams placeId:", placeId);
  }, [placeId]);

  if (!placeId) {
    return <div>장소 정보를 불러오는 데 실패했습니다.</div>;
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
  
      setPlaceImgs((prev) => [...prev, file]); 
    });
  };

  const handleStarClick = (index) => {
    setRatings((prev) => {
      const newRatings = [...prev];
      newRatings[index] = !newRatings[index];
      return newRatings;
    });
  };

  const handleRemoveImage = (index) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const maxLength = 500;
    const value = e.target.value;
  
    if (value.length > maxLength) {
      AlertDialog({
        mode: "alert",
        title: "선택 제한",
        text: `최대 ${maxLength}자까지만 작성 가능합니다.`,
        confirmText: "닫기" 
      });
      return;
    }   
    setText(value); 
  };

  const validateForm = () => {

    if (selectKeywords.length === 0) {
      AlertDialog({
        mode: "alert",
        title: "등록 실패",
        text: "최소 하나 이상의 키워드를 선택해주세요.",
        confirmText: "확인"
      });
      return false;
    }

    if (!selectPet) {
      AlertDialog({
        mode: "alert",
        title: "등록 실패",
        text: "함께한 펫을 선택해주세요.",
        confirmText: "확인"
      });
      return false;
    }
  
    if (!visitedAt) {
      AlertDialog({
        mode: "alert",
        title: "등록 실패",
        text: "방문한 날짜를 선택해주세요.",
        confirmText: "확인"
      });
      return false;
    }
  
    if (!ratings.filter(Boolean).length) {
      AlertDialog({
        mode: "alert",
        title: "등록 실패",
        text: "별점을 선택해주세요.",
        confirmText: "확인"
      });
      return false;
    }
  
    if (!text.trim()) {
      AlertDialog({
        mode: "alert",
        title: "등록 실패",
        text: "리뷰 내용을 작성해주세요.",
        confirmText: "확인"
      });
      return false;
    }
  
    return true;
  };


 // S3 업로드 시작
  const uploadMedia = async (files) => {
  const uploadedUrls = [];
  for (const file of files) {
    try {
      const presignResponse = await axios.post(
        `https://www.daengdaeng-where.link/api/v1/S3?prefix=review&fileName=${encodeURIComponent(file.name)}`
      );

      const presignedUrl = presignResponse.data.url;
      if (!presignedUrl) {
        throw new Error("서버에서 응답 안 줌");
      }

      const uploadResponse = await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        withCredentials: true,
      });

      if (uploadResponse.status === 200) {
        const uploadedUrl = presignedUrl.split("?")[0]; 
        uploadedUrls.push(uploadedUrl); 
      } else {
      }
    } catch (error) {
    }
  }
    return uploadedUrls;
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    if (!validateForm()) return;
    
    let media = [];
    if (placeImgs.length > 0) {
      media = await uploadMedia(placeImgs);
      console.log("Uploaded media URLs:", media);
    }
  
    const pets = selectPet.map((pet) => pet.value); 

    const reviewData = {
      placeId,
      content: text.trim(), 
      score: ratings.filter(Boolean).length, 
      media, 
      keywords: selectKeywords, 
      pets,
      visitedAt, 
    };
    console.log("리뷰데이터: ", reviewData); 

    try {
      const response = await axios.post("https://www.daengdaeng-where.link/api/v1/review", reviewData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
      });
      AlertDialog({
        mode: "alert",
        title: "성공",
        text: `리뷰가 성공적으로 등록되었습니다.`,
        confirmText: "닫기" ,
        onConfirm: () => navigate("/my-page"), 
      });
      
      console.log("리뷰 등록 성공:", response.data);
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "실패",
        text: `리뷰 등록에 실패했습니다.`,
        confirmText: "닫기" 
      });
      console.error("리뷰 등록 실패:", error);
    }
  };

  return (
    <WriteReviewAllContainer>
      <WriteReviewContainer>
      <PlaceTitle>{placeName}</PlaceTitle>
        <WriteReviewDate>{getCurrentDate()}</WriteReviewDate>
      </WriteReviewContainer>
      <SelectPlaceOptionContainer>
        <WhatPointLike>어떤 점이 좋았나요?</WhatPointLike>
        <br />
        <SelectWarning>*이 장소에 맞는 키워드를 골라주세요 (1개~3개)</SelectWarning>
      <PreferenceFavoriteOptionList
        selectedOptions={selectKeywords}
        onSelectOptions={setSelectKeywords}
      />
        <UserInfoContainer>
        <UserImg
          src={selectedPetImage || reviewDefaultImg}
          alt="선택된 펫 이미지" 
        />
          <UserNickname>{nickname || '닉네임을 가져오는 중...'}</UserNickname>
        </UserInfoContainer>
        <UserQuestionContainer>
        <Question>댕댕이를 선택해주세요</Question>
        <Select
          isMulti
          options={petOptions}
          value={selectPet}
          onChange={handlePetSelection}
          placeholder="댕댕이를 선택해주세요"
        />
        </UserQuestionContainer>

        <UserQuestionContainer>
          <Question>방문한 날짜를 선택해주세요</Question>
          <DateSelection
            type="date"
            max={getCurrentDate()}
            value={visitedAt} 
            onChange={(e) => setVisitedAt(e.target.value)} 
          />
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
          <TextDescriptionContainer>
        <QuestionBox>리뷰를 작성해주세요</QuestionBox>
        <CountText>{text.length}자 | 최대 500자</CountText>
      </TextDescriptionContainer>
      <DivisionLine />
      <TextArea type='text' placeholder='경험을 공유해주세요' value={text} onChange={handleChange}/>
      <DivisionLine />
      <ConfirmBtn onClick={handleSubmit} marginBottom="29px" label="작성 완료" />
        </SelectPlaceOptionContainer>
      </WriteReviewAllContainer>
    );
  }

export default WriteReview;