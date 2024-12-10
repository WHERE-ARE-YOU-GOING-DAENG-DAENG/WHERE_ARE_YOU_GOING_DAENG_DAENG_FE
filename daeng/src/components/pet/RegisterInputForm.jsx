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

  const [preview, setPreview] = useState(null); 
  const [imageFile, setImageFile] = useState(null); 
  const [petName, setPetName] = useState(""); 
  const [selectedPetBirth, setSelectedPetBirth] = useState(null); 
  const [selectedPetType, setSelectedPetType] = useState(""); 
  const [selectedSize, setSelectedSize] = useState(""); 
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedNeutering, setSelectedNeutering] = useState(""); 

  const handlePetNameChange = (e) => {
    setPetName(e.target.value);
  };

  const handlePetBirthChange = (e) => {
    setSelectedPetBirth(e.target.value);
  }; 

  const handlePetTypeChange = (e) => {
    setSelectedPetType(e.target.value);
  };

  const handleNeuteringClick = (status) => {
    setSelectedNeutering(status); 
  }; 

  const handleSizeClick = (sizeCode) => {
    setSelectedSize(sizeCode); 
  }; 


  const handleFocus = (e) => {
    e.target.showPicker();
  };

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


  const handleSubmit = async (event) => {
  event.preventDefault();
  
  if (!validateForm()) return;

  let imageUrl = ''; 

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
        throw new Error('Presigned URL이 없습니다.');
      }

      const imageUploadResponse = await axios.put(presignedUrl, imageFile, {
        headers: {
          'Content-Type': imageFile.type,
        },
        withCredentials: true,
      });
  
      if (imageUploadResponse.status === 200) {
        imageUrl = presignedUrl.split("?")[0];
      } else {
        console.error("이미지 업로드 실패:", imageUploadResponse);
        return;
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      return; 
    }
  }
  
  const petData = {
    name: petName, 
    image: imageUrl,  
    gender: selectedGender,
    birthday: selectedPetBirth,
    species: selectedPetType, 
    size: selectedSize, 
    neutering: selectedNeutering === "했어요", 
  };

  try {
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
      AlertDialog({
        mode: "alert", 
        title: "실패",
        text: "등록 중 오류가 발생했습니다. 다시 시도해주세요",
        confirmText: "닫기"
      });
    }
  } catch (error) {
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