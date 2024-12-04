import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SelectLabel from "../../components/commons/SelectLabel";
import { useParams } from 'react-router-dom';
import reviewDefaultImg from '../../assets/icons/reviewDefaultImg.svg'
import SelectBtn from "../commons/SelectBtn";
import ConfirmBtn from "../commons/ConfirmBtn";
import footerSearch from "../../assets/icons/footer_search.svg"; 
import AlertDialog from "../../components/commons/SweetAlert";
import axios from 'axios';
import DeletePetData from "./DeletePetData";
import { genderOptions, petSizeOptions, petTypeOptions } from "../../data/CommonCode";
import { useNavigate } from "react-router-dom";
import usePetStore from "../../stores/usePetStore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: 4%;  
  
  @media (max-width: 554px) {
    margin-top: 3%;
  }
`;

const FirstInputContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 554px) {
    margin-bottom: 5%;
  }
`;

const PetImg = styled.div`
  width: 135px;
  height: 135px;
  margin-right: 20px;
  border-radius: 100px;
  background-image: url(${(props) => props.src || reviewDefaultImg});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PetNameInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const PetNameInput = styled.input`
  width: 191%;
  height: 44px;
  font-size: 14px;
  border-radius: 5px;
  border: 0.5px solid #e4e4e4;
  margin-bottom: 10px;
  padding: 10px;

  @media (max-width: 554px) {
    width: 185%;
    font-size: 14px;
    height: 48px;
  }
  &:focus {
    outline: none;
    border-color: #ff69a9; 
  }
`;

const InputAlert = styled.p`
  color: #ff69a9;
  font-size: 12px;
  margin-top: -1px;
  margin-right: 15%;
  margin-bottom: 4%;
`;

const PetTypeOption = styled.select`
  width: 96%;
  height: 44px;
  border: 0.5px solid #e4e4e4;
  border-radius: 5px;
  padding: 10px;
  font-size: 13px;
  color: ${(props) => (props.value === "" ? "#b3b3b3" : "#000")};
  box-sizing: border-box; 
  appearance: none; 
  -webkit-appearance: none; 
  -moz-appearance: none; 

  background: url(${footerSearch}) no-repeat right 10px center; 
  background-size: 16px; 

  &:focus {
    border-color: #FF69A9;  
    outline: none;  
  }
`;

const BirthInput = styled.input`
  width: 96%;
  height: 44px;
  margin-right: 10%;
  border: 0.5px solid #e4e4e4;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: #000; 
  cursor: pointer;

  &::placeholder {
    color: #b3b3b3; 
  }

  &:focus {
    outline: none;
    border-color: #ff69a9; 
  }
`;

const PetTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const BirthContainer = styled.div`
  margin-bottom: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const SelectWeight = styled.button`
  width: 90px;
  height: 44px;
  margin-right: 12px;
  background-color: white;
  border: 0.5px solid #E4E4E4;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  color: #B3B3B3;
  
  @media (max-width: 554px) {
    margin-bottom: 3%;
  }
  
  &:hover {
    background-color: #ff69a9;
    font-weight: bold;
    color: #ffffff;
  }

  ${(props) => props.selected && `
    background-color: #FF69A9;
    font-weight: bold;
    color: #ffffff;
  `}
`;

function EditInputForm() {
  const { petId } = useParams();
  const { petInfo, fetchPetData, isLoading, error } = usePetStore(); 
  const [petName, setPetName] = useState("");  //이름
  const [preview, setPreview] = useState(null); //미리보기
  const [selectedPetType, setSelectedPetType] = useState(""); //종
  const [selectedSize, setSelectedSize] = useState(""); // 반려동물 사이즈
  const [selectedGender, setSelectedGender] = useState(""); //성별
  const [selectedNeutering, setSelectedNeutering] = useState(""); //중성화
  const [petPicture, setPetPicture] = useState(""); //서버에서 받아온 기존 사진 URL
  const [imageFile, setImageFile] = useState(null); //사용자가 새로 업로드하려는 이미지 파일
  const [petBirth, setPetBirth] = useState(""); //생일

  const navigate = useNavigate();

  useEffect(() => {
    if (petId) {
      fetchPetData(petId);
    }
  }, [petId, fetchPetData]);

  useEffect(() => {
    if (petInfo) {
      setPetName(petInfo.name || "");
      setPetBirth(petInfo.birthday || "");
      setSelectedPetType(petInfo.species || "");
      setSelectedGender(petInfo.gender || ""); 
      setSelectedNeutering(petInfo.neutering ? "했어요" : "안 했어요");
      setSelectedSize(petInfo.size || "");
      setPetPicture(petInfo.image || "");
    }
  }, [petInfo]);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); 
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }; // 오늘 이후는 선택 불가하게

  const handleFocus = (e) => {
    e.target.showPicker();
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file); 
    }
  };

  const handlePetNameChange = (e) => {
    setPetName(e.target.value);
  }; //이름

  const handlePetTypeChange = (e) => {
    setSelectedPetType(e.target.value);  
  };
  
  const handlePetBirthChange = (e) => {
    setPetBirth(e.target.value);
  };

  const handleNeuteringClick = (status) => {
    setSelectedNeutering(status); 
  };//중성화

  const handleSizeClick = (sizeCode) => {
    setSelectedSize(sizeCode); 
  }; //사이즈 


  //유효성 검사
  const validateForm = () => {
    const nameRegex = /^[가-힣a-zA-Z\s]+$/;
  
    if (!petName || !nameRegex.test(petName)) {
      AlertDialog({
        mode: "alert", 
        title: "입력 오류",
        text: "댕댕이 이름은 한글 또는 영문만 입력 가능합니다.",
        confirmText: "확인"
      });
      return false;
    }
    if (!selectedPetType) {
      AlertDialog({
        mode: "alert", 
        title: "선택 오류",
        text: "댕댕이 견종을 선택해주세요",
        confirmText: "확인"
      })
      return false;
    }

    if(!setPetBirth) {
      AlertDialog({
        mode: "alert", 
        title: "선택 오류",
        text: "댕댕이 생일을 선택해주세요",
        confirmText: "확인"
      })
      return false;
    }

    if (!selectedGender) {
      AlertDialog({
        mode: "alert", 
        title: "선택 오류",
        text: "댕댕이 성별을 선택해주세요",
        confirmText: "확인"
      })
      return false;
    }
    if (!selectedNeutering) {
      AlertDialog({
        mode: "alert", 
        title: "선택 오류",
        text: "댕댕이 중성화 여부를 선택해주세요",
        confirmText: "확인"
      })
      return false;
    }
    if (!selectedSize || !petSizeOptions.some(option => option.code === selectedSize)) {
      AlertDialog({
        mode: "alert", 
        title: "선택 오류",
        text: "댕댕이 크기를 선택해주세요",
        confirmText: "확인"
      })
      return false;
    }
    return true;
  }; 

  //API 연동 시작

  const handlePetDataUpdate = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) return;
  
    let imageUrl = petPicture;
  
    // 새 이미지가 있을 경우에만 S3에 업로드 처리
    if (imageFile) {
      try {
        const presignResponse = await axios.post(
          'https://www.daengdaeng-where.link/api/v1/S3',
          {
            prefix: 'PET',
            fileNames: [imageFile.name]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );
      
        const presignedUrl = presignResponse.data?.data?.[imageFile.name];
        if (!presignedUrl) {
          console.error('Presigned URL이 없습니다. 응답 데이터를 확인하세요.');
          throw new Error('Presigned URL이 없습니다.');
        }
        console.log('Extracted Presigned URL:', presignedUrl);

      // 이미지 업로드
      const imageUploadResponse = await axios.put(presignedUrl, imageFile, {
        headers: {
          'Content-Type': imageFile.type, 
        },
        withCredentials: true,
      });

      if (imageUploadResponse.status === 200) {
        imageUrl = presignedUrl.split('?')[0]; // 쿼리 파라미터를 제외한 URL만 사용
      } else {
        alert('이미지 업로드에 실패했습니다.');
        return;
      }
    } catch (error) {
      console.error('Presigned URL 조회 또는 이미지 업로드 실패:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
      return;
    }
  }
  const petData = {
    name: petName,
    image: imageUrl, 
    gender: selectedGender,  
    birthday: petBirth,      
    species: selectedPetType,
    size: selectedSize,     
    neutering: selectedNeutering === "했어요",
  };

  try {
    console.log('보내는 Payload:', petData);

    const response = await axios.put(
      `https://www.daengdaeng-where.link/api/v1/pets/${petId}`,
      petData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {

      console.log("Updated pet data:", {
        petName,
        selectedPetType,
        imageUrl,
        petBirth,
        selectedGender,
        selectedNeutering,
        selectedSize
      }); 
      AlertDialog({
        mode: "alert", 
        title: "성공",
        text: "펫 정보가 성공적으로 수정되었습니다",
        confirmText: "닫기"
      });
      navigate("/my-page");
    }
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  return (
    <Container>
      <FirstInputContainer>
        <label htmlFor="file-input">
        <PetImg src={preview || petPicture || reviewDefaultImg} />
        </label>
        <HiddenInput
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <PetNameInfoContainer>
          <SelectLabel label="댕댕이 이름" />
          <PetNameInput 
            value={petName} 
            onChange={handlePetNameChange} 
          />
          <InputAlert>*한글, 영문만 사용 가능합니다</InputAlert>
        </PetNameInfoContainer>
      </FirstInputContainer>
      <PetTypeContainer>
        <SelectLabel label="견종" />
        <PetTypeOption value={selectedPetType} onChange={handlePetTypeChange}>
          <option value="" disabled>
            견종을 선택하세요
          </option>
          {petTypeOptions.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name}
            </option>
          ))}
        </PetTypeOption>
      </PetTypeContainer>
      <SelectLabel label="생일" />
      <BirthContainer>
      <BirthInput
        type="date"
        max={getTodayDate()} 
        placeholder="우리 댕댕일 생일을 알려주세요!"
        value={petBirth || ""} 
        onFocus={handleFocus}  
        onChange={handlePetBirthChange} 
      />
      </BirthContainer>
      <SelectLabel label="성별" />
      <SelectContainer>
        {genderOptions.map((option) => (
          <SelectBtn
            key={option.code}
            label={option.name}
            selected={selectedGender === option.code}
            onClick={() => setSelectedGender(option.code)}
          />
        ))}
      </SelectContainer>
      <SelectLabel label="중성화 여부" />
      <SelectContainer>
        <SelectBtn
          label="했어요"
          selected={selectedNeutering === "했어요"}
          onClick={() => handleNeuteringClick("했어요")}
        />
        <SelectBtn
          label="안 했어요"
          selected={selectedNeutering === "안 했어요"}
          onClick={() => handleNeuteringClick("안 했어요")}
        />
      </SelectContainer>
      <SelectLabel label="크기" />
      <SelectContainer>
      {petSizeOptions.map((option) => (
        <SelectWeight
          key={option.code}
          selected={selectedSize === option.code}
          onClick={() => handleSizeClick(option.code)}
        >
          {option.name}<br />({option.size})
        </SelectWeight>
      ))}
    </SelectContainer>
      <ConfirmBtn onClick={handlePetDataUpdate} label="수정 완료" />
      <DeletePetData petId={petId}/>
    </Container>
  );
}

export default EditInputForm;