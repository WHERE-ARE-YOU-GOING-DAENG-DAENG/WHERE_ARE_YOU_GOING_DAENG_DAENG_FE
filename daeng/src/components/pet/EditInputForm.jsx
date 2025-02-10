import React, { useState, useEffect } from "react";
import SelectLabel from "../../components/commons/SelectLabel";
import { useParams } from 'react-router-dom';
import reviewDefaultImg from "../../assets/icons/reviewDefaultImg.svg";
import SelectBtn from "../commons/SelectBtn";
import ConfirmBtn from "../commons/ConfirmBtn";
import AlertDialog from "../../components/commons/SweetAlert";
import axiosInstance from "../../services/axiosInstance";
import DeletePetData from "./DeletePetData";
import { genderOptions, petSizeOptions, petTypeOptions } from "../../data/CommonCode";
import { useNavigate } from "react-router-dom";
import usePetStore from "../../stores/usePetStore";
import upload from '../../assets/icons/upload.svg';
import useImageUpload  from "../../hooks/useImageUpload";
import Loading from '../../components/commons/Loading';
import { handleFocus } from "../../utils/inputUtils"; 
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


function EditInputForm() {
  const { petId } = useParams();
  const { uploadImageToS3, isUploading } = useImageUpload();
  const { petInfo, fetchPetData, isLoading, error } = usePetStore(); 
  const [petName, setPetName] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedPetType, setSelectedPetType] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedNeutering, setSelectedNeutering] = useState(""); 
  const [petPicture, setPetPicture] = useState("");
  const [imageFile, setImageFile] = useState(null); 
  const [petBirth, setPetBirth] = useState(""); 

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
  }; 

  const handlePetTypeChange = (e) => {
    setSelectedPetType(e.target.value);  
  };
  
  const handlePetBirthChange = (e) => {
    setPetBirth(e.target.value);
  };

  const handleNeuteringClick = (status) => {
    setSelectedNeutering(status); 
  };

  const handleSizeClick = (sizeCode) => {
    setSelectedSize(sizeCode); 
  }; 

  const handlePetDataUpdate = async (event) => {
    event.preventDefault();

    const isValid = validatePetForm({
      petName,
      selectedPetType,
      petBirth,
      selectedGender,
      selectedNeutering,
      selectedSize,
    });

    if (!isValid) return;
    setIsSubmitting(true);

    let imageUrl = petPicture;

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
        setIsSubmitting(false);
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
    const response = await axiosInstance.put(
      `/api/v1/pets/${petId}`,
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
        text: "정상적으로 수정되었습니다.",
        confirmText: "확인",
        icon: "success", 
      });
      navigate("/my-page");
    }
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "실패",
        text: "알 수 없는 문제가 발생했습니다. 관리자에게 문의해주세요.",
        confirmText: "확인",
      });
      console.error("수정 실패:", error);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (isSubmitting) return <Loading label="댕댕이 정보를 수정 중입니다..." />; 
  if (error) return <p>{error}</p>;

  return (
  <Container>
    <FirstInputContainer> 
    <label htmlFor="file-input">
      <PetImg src={preview || petPicture || reviewDefaultImg}>
      {(preview || petPicture) && (
          <CancelPetImg
            onClick={(e) => {
              e.stopPropagation(); 
              setPreview(null);
              setImageFile(null); 
              setPetPicture(""); 
            }}>
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
        <SelectLabel label="댕댕이 이름" htmlFor="petName" />
          <PetNameInput 
            id="petName"
            value={petName} 
            onChange={handlePetNameChange} 
            aria-label="댕댕이 이름"
          />
          <InputAlert>*한글, 영문만 사용 가능합니다</InputAlert>
        <SelectLabel label="견종" htmlFor="petType" />
        <PetTypeOption id="petType" value={selectedPetType} onChange={handlePetTypeChange}>
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
        placeholder="우리 댕댕이 생일을 알려주세요!"
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