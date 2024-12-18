import React, { useState, useEffect } from "react";
import PreferenceFavoriteOptionList from "./PreferenceFavoriteOptionList";
import addImg from "../../assets/icons/addImg.svg";
import useUserStore from "../../stores/userStore";
import axios from "axios";
import axiosInstance from "../../services/axiosInstance";
import StarRating from "./write/StarRating";
import ConfirmBtn from '../../components/commons/ConfirmBtn';
import AlertDialog from '../../components/commons/SweetAlert';
import usePetStore from "../../stores/usePetStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select from "react-select";
import validateReview from "./write/ValidateReview";
import Loading from "../../components/commons/Loading";
import { handleFocus } from "../../utils/inputUtils"; 
import reviewDefaultImg from '../../assets/icons/reviewDefaultImg.svg'
import { 
  TotalReviewContainer, 
  WriteReviewContainer,
  PlaceTitle,
  WriteReviewDate,
  SelectPlaceOptionContainer,
  WhatPointLike,
  SelectWarning,
  UserInfoContainer,
  UserImg,
  UserNickname,
  UserQuestionContainer,
  RemoveButton,
  AddImgContainer,
  AddImg,
  TextArea,
  Question,
  SecondContainer,
  LastContainer,
  DateSelection,
  CountText,
  TextDescriptionContainer,
  DivisionLine,
  AddImgPlus,
  QuestionBox,
  selectStyles
} from './write/WriteStyleComponent';
import { getTodayDate } from "../../utils/dateUtils";

function WriteReview({ review = {} }) {
  const {nickname} = useUserStore.getState();
  const { placeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [placeName, setPlaceName] = useState("장소 이름 없음");
  const { pets, fetchPetList } = usePetStore();
  const [selectPet, setSelectPet] = useState([]);
  const [ratings, setRatings] = useState([false, false, false, false, false]);
  const [previews, setPreviews] = useState([]);
  const [placeImgs, setPlaceImgs] = useState([]);
  const [selectKeywords, setSelectKeywords] = useState([]);
  const [text, setText] = useState("");
  const [visitedAt, setVisitedAt] = useState("");
  const [selectedPetImage, setSelectedPetImage] = useState("");
  const location = useLocation();
  const {type} = location.state || {};
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchPetList(); 
  }, [fetchPetList]);

  useEffect(() => {
    if (placeId) {
      axiosInstance
        .get(`/api/v1/places/${placeId}`)
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

  if (!placeId) {
    return <div>장소 정보를 불러오는 데 실패했습니다.</div>;
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = previews.length + files.length;
  
    if (totalImages > 5) {
      AlertDialog({
        mode: "alert",
        title: "이미지 업로드 제한",
        text: "최대 5개의 이미지만 업로드할 수 있습니다.",
        confirmText: "확인",
      });
      return;
    }
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith("video/")) {
          setPreviews((prev) => [
            ...prev,
            { type: "video", src: reader.result, name: file.name },
          ]);
        } else if (file.type.startsWith("image/")) {
          setPreviews((prev) => [
            ...prev,
            { type: "image", src: reader.result, name: file.name },
          ]);
        }
      };
      reader.readAsDataURL(file);
  
      setPlaceImgs((prev) => [...prev, file]);
    });
  };

  const handleStarClick = (index) => {
    const newRatings = ratings.map((_, i) => i <= index);
    setRatings(newRatings);
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
    const isValid = validateReview({ selectKeywords, selectPet, visitedAt, ratings, text });
    if (!isValid) return; 
  };

  const uploadMedia = async (files) => {
  const uploadedUrls = [];
  for (const file of files) {
    try {
      const presignResponse = await axiosInstance.post(
        '/api/v1/S3',
        {
          prefix: 'REVIEW',
          fileNames: [file.name]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      const presignedUrl = presignResponse.data?.data?.[file.name];
      if (!presignedUrl) {
        throw new Error("Presigned URL을 받지 못했습니다");
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
      }
    }catch(error) {
        console.error(`파일 업로드 실패: ${file.name}`, error);
      }
  }
    return uploadedUrls;
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    let media = [];
    if (placeImgs.length > 0) {
      media = await uploadMedia(placeImgs);
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
      reviewType: type === "realtime" ? "REVIEW_TYP_02" : "REVIEW_TYP_01"
    };

    try {
      const response = await axiosInstance.post("/api/v1/review", reviewData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
      });

      AlertDialog({
        mode: "alert",
        title: "성공",
        text: `리뷰가 성공적으로 등록되었습니다.`,
        confirmText: "닫기",
        icon: "success",
        onConfirm: () => {
          setIsLoading(false); 
          navigate(`/total-review/${placeId}`);
          setTimeout(() => {
            window.location.reload(); 
          }, ); 
        },
      });
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "실패",
        text: `리뷰 등록에 실패했습니다.`,
        confirmText: "닫기" 
      });
      console.error("리뷰 등록 실패:", error);
    }finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading label="리뷰를 등록 중입니다..." />;
  }

  return (
    <TotalReviewContainer>
      <WriteReviewContainer>
      <PlaceTitle>{placeName}</PlaceTitle>
        <WriteReviewDate>{getTodayDate()}</WriteReviewDate>
      </WriteReviewContainer>
      <SelectPlaceOptionContainer>
        <WhatPointLike>어떤 점이 좋았나요?</WhatPointLike>
        <br />
        <SelectWarning>*이 장소에 맞는 키워드를 골라주세요 (1개~3개)</SelectWarning>
      <PreferenceFavoriteOptionList
        selectedOptions={selectKeywords}
        onSelectOptions={setSelectKeywords}
      />
      </SelectPlaceOptionContainer>
      <SecondContainer>
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
          styles={selectStyles}
          placeholder="댕댕이를 선택해주세요"
        />
        </UserQuestionContainer>

        <UserQuestionContainer>
          <Question>방문한 날짜를 선택해주세요</Question>
          <DateSelection
            type="date"
            max={getTodayDate()}
            value={visitedAt} 
            onFocus={handleFocus}  
            onChange={(e) => setVisitedAt(e.target.value)} 
          />
          </UserQuestionContainer>
          <UserQuestionContainer>
            <Question>별점을 눌러 만족도를 공유해주세요</Question>
            <StarRating ratings={ratings} onStarClick={handleStarClick} />
            </UserQuestionContainer>
          <UserQuestionContainer>
            <Question>사진 / 동영상 업로드 <p>(선택)</p></Question>
          </UserQuestionContainer>
          <AddImgContainer>
          {previews.map((preview, index) => (
            <AddImg key={index} src={preview.src}>
              {preview.type === "video" ? (
                <video width="130" height="130" controls>
                  <source src={preview.src} type="video/mp4" />
                </video>
              ) : (
                <img src={preview.src} alt={`미리보기 이미지 ${index}`} />
              )}
              <RemoveButton onClick={() => handleRemoveImage(index)}>X</RemoveButton>
              </AddImg>
            ))}
            <AddImg>
              <label htmlFor="file-upload">
                <br />
                <AddImgPlus src={addImg} alt="이미지 업로드"/>
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
      <LastContainer>
      <ConfirmBtn onClick={handleSubmit}  label="작성 완료" />
      </LastContainer>
      </SecondContainer>
    </TotalReviewContainer>
    );
  }

export default WriteReview;