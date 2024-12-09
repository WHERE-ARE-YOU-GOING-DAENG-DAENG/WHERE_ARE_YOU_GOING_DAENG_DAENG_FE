import React, { useState } from "react";
import SelectLabel from "../../components/commons/SelectLabel";
import SelectBtn from "../commons/SelectBtn";
import ConfirmBtn from "../commons/ConfirmBtn";
import { useNavigate } from "react-router-dom"; 
import AlertDialog from "../../components/commons/SweetAlert";
import axios from 'axios';
import { genderOptions, petSizeOptions, petTypeOptions } from "../../data/CommonCode";
import { 
  Container, 
  FirstInputContainer, 
  PetImg, 
  HiddenInput, 
  PetNameInput, 
  InputAlert, 
  PetTypeOption, 
  PetTypeContainer, 
  BirthInput, 
  BirthContainer, 
  SelectContainer, 
  SelectWeight, 
  NextRegisterBtn 
} from './CommonStyle';



function RegisterInputForm() {
  const navigate = useNavigate(); 
    
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const [preview, setPreview] = useState(null); // 이미지 미리보기 
  const [imageFile, setImageFile] = useState(null); //이미지 
  const [petName, setPetName] = useState(""); //반려동물 이름
  const [selectedPetBirth, setSelectedPetBirth] = useState(null); //반려동물 생일
  const [selectedPetType, setSelectedPetType] = useState(""); //반려동물 종
  const [selectedSize, setSelectedSize] = useState(""); // 반려동물 사이즈
  const [selectedGender, setSelectedGender] = useState(""); //성별
  const [selectedNeutering, setSelectedNeutering] = useState(""); //중성화 

  const handlePetNameChange = (e) => {
    setPetName(e.target.value);
  }; //이름 

  const handlePetBirthChange = (e) => {
    setSelectedPetBirth(e.target.value);
  }; //생일 

  const handlePetTypeChange = (e) => {
    setSelectedPetType(e.target.value);
  };//종 

  const handleNeuteringClick = (status) => {
    setSelectedNeutering(status); 
  }; //중성화

  const handleSizeClick = (sizeCode) => {
    setSelectedSize(sizeCode); 
  }; //사이즈 


  const handleFocus = (e) => {
    e.target.showPicker();
  };

  //오늘 이후로는 날짜 선택 못하게
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); 
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }; 
  
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

    if(!selectedPetBirth) {
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
    if (!selectedSize|| !petSizeOptions.some(option => option.code === selectedSize)) {
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
  const handleSubmit = async (event) => {
  event.preventDefault();
  
  if (!validateForm()) return;

  let imageUrl = ''; // 이미지 URL을 저장할 변수

  if (imageFile) {
    try {
      // Presigned URL 요청
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
  
      console.log('Presign Response:', presignResponse.data);

  
      // 업로드 성공 시 처리
      if (imageUploadResponse.status === 200) {
        imageUrl = presignedUrl.split("?")[0]; // 이미지 URL 저장
        console.log("최종 이미지 URL:", imageUrl);
      } else {
        console.error("이미지 업로드 실패:", imageUploadResponse);
        return; // 실패 시 종료
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      return; // 실패 시 종료
    }
  }
  
  const petData = {
    name: petName, // 반려동물 이름
    image: imageUrl,  // 업로드한 이미지 URL
    gender: selectedGender, // 성별
    birthday: selectedPetBirth, // 생년월일
    species: selectedPetType, // 품종
    size: selectedSize, // 크기
    neutering: selectedNeutering === "했어요", // 중성화 여부
  };

  try {
    console.log('보내는 Payload:', petData);

    const response = await axios.post(
      "https://www.daengdaeng-where.link/api/v1/pets", 
      petData, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log('성공! 응답 데이터',response.data );
      AlertDialog({
        mode: "alert", 
        title: "성공",
        text: "댕댕어디가 회원이 되신걸 축하드려요",
        confirmText: "닫기",
        icon: "success",
        onConfirm: () => {
          navigate("/"); 
        }
      });

    } else {
      console.log('응답 데이터:', response.data);
      AlertDialog({
        mode: "alert", 
        title: "실패",
        text: "등록 중 오류가 발생했습니다. 다시 시도해주세요",
        confirmText: "닫기"
      });
    }
  } catch (error) {
    console.log('에러 전체 정보:', error);
    AlertDialog({
      mode: "alert", 
      title: "실패",
      text: "등록 중 오류가 발생했습니다. 다시 시도해주세요",
      confirmText: "닫기"
    });
  }
};

  const handleNextRegisterClick = () => {
    navigate("/"); 
  };

  return (
    <Container>
      <FirstInputContainer>
        <label htmlFor="file-input">
          <PetImg src={preview} />
        </label>
        <HiddenInput
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </FirstInputContainer>
      <PetTypeContainer>
          <SelectLabel label="댕댕이 이름" />
          <PetNameInput
            value={petName}
            onChange={handlePetNameChange}
            placeholder="댕댕이 이름을 입력해주세요"
            required />
          <InputAlert>*한글, 영문만 사용 가능합니다</InputAlert>
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
      <BirthContainer>
        <SelectLabel label="생년월일" />
        <BirthInput
          type="date"
          value={selectedPetBirth}
          max={getTodayDate()} 
          onChange={handlePetBirthChange}
          onFocus={handleFocus}  
          placeholder="우리 댕댕이 생일을 알려주세요!"
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
      <ConfirmBtn onClick={handleSubmit} label="완료" />
      <NextRegisterBtn onClick={handleNextRegisterClick}>나중에 등록할게요</NextRegisterBtn>
    </Container>
  );
}

export default RegisterInputForm;