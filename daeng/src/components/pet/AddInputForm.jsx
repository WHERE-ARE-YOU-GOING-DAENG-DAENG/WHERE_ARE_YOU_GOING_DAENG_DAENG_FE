import React, { useState } from "react";
import SelectLabel from "../../components/commons/SelectLabel";
import SelectBtn from "../commons/SelectBtn";
import ConfirmBtn from "../commons/ConfirmBtn";
import AlertDialog from "../../components/commons/SweetAlert";
import axios from 'axios';
import useImageUpload  from "../../hooks/useImageUpload";
import { genderOptions, petSizeOptions, petTypeOptions } from "../../data/CommonCode";
import { useNavigate } from "react-router-dom";
import upload from '../../assets/icons/upload.svg';
import Loading from '../../components/commons/Loading';
import { getTodayDate } from '../../utils/dateUtils'; 
import { validatePetForm } from '../../utils/petValidation';
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
  CancelPetImg,
} from './CommonStyle';


function RegisterInputForm() {
  const navigate = useNavigate(); 
  const { uploadImageToS3, isUploading } = useImageUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); 
  const [petName, setPetName] = useState("");
  const [selectedPetBirth, setSelectedPetBirth] = useState(""); 
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
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validatePetForm({
      petName,
      selectedPetType,
      petBirth: selectedPetBirth,
      selectedGender,
      selectedNeutering,
      selectedSize,
    });

    if (!isValid) return;
    setIsLoading(true);

    let imageUrl = ''; 
  
    if (imageFile) {
      try {
        imageUrl = await uploadImageToS3(imageFile); 
      } catch (error) {
        AlertDialog({
          mode: "alert",
          title: "이미지 업로드 실패",
          text: "이미지를 업로드하는 중 문제가 발생했습니다. 다시 시도해주세요.",
          confirmText: "확인",
        });
        setIsLoading(false);
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
      "https://dev.daengdaeng-where.link/api/v1/pets", 
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
  finally {
    setIsLoading(false); 
  }
};

if (isLoading) {
    return <Loading label="등록 중입니다..." />; 
  }

  return (
    <Container>
      <FirstInputContainer>
      <label htmlFor="file-input">
        <PetImg src={preview}>
          {preview && (
            <CancelPetImg
              onClick={(e) => {
                e.stopPropagation(); 
                setPreview(null);
                setImageFile(null); 
              }}
            >
              <img src={upload} alt="업로드 버튼" />
            </CancelPetImg>
          )}
        </PetImg>
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
    </Container>
  );
}

export default RegisterInputForm;
