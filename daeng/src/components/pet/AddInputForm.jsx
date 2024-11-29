import React, { useState } from "react";
import styled from "styled-components";
import SelectLabel from "../../components/commons/SelectLabel";
import SelectBtn from "../commons/SelectBtn";
import ConfirmBtn from "../commons/ConfirmBtn";
import footerSearch from "../../assets/icons/footer_search.svg"; 
import { useNavigate } from "react-router-dom"; 
import AlertDialog from "../../components/commons/SweetAlert";
import axios from 'axios';
import { genderOptions, petSizeOptions, petTypeOptions } from "../../data/CommonCode";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: 4%;  
  
  @media (max-width: 554px) {
    margin-top:3%;
  }
`;

const FirstInputContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 554px) {
    margin-bottom:5%;
  }
`;

const PetImg = styled.div`
  width: 135px;
  height: 135px;
  margin-right: 20px;
  border-radius: 100px;
  background-color: #fbc9e4;
  background-image: url(${(props) => props.src || "none"});
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
      
    &::placeholder {
      color: #b3b3b3; 
    }
  }
`;

const InputAlert = styled.p`
  color: #ff69a9;
  font-size: 10px;
  margin-top: -1px;
  margin-right: 23%;
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


  &:focus {
    outline: none;
    border-color: #ff69a9; 
  }
`;

const BirthInput = styled.input`
  width: 96%;
  height: 44px;
  margin-right:10%;
  border: 0.5px solid #e4e4e4;
  border-radius: 5px;
  padding: 10px;
  font-size: 13px;
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
`    
const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`

const SelectWeight = styled.button`
  width: 90px;
  height : 44px;
  margin-right: 12px;
  background-color: white;
  border : 0.5px solid #E4E4E4;
  border-radius: 5px;
  font-size: 10px;
  cursor: pointer;
  color:  #B3B3B3;

  @media (max-width: 554px) {
    margin-bottom:3%;
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

const NextRegisterBtn = styled.button`
  background-color: white;
  color:#B3B3B3;
  font-size:14px;
  border:none;
  cursor: pointer;
  text-align: center;
  margin-right:20px;
  margin-bottom: 20px;

  @media (max-width: 554px) {
    margin-top:1%;
    margin-right:5%;
  }

  &:hover{
    font-weight: bold;
  }
`
//퍼블리싱 

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
  const [selectedPetBirth, setSelectedPetBirth] = useState(""); //반려동물 생일
  const [selectedPetType, setSelectedPetType] = useState(""); //반려동물 종
  const [selectedWeight, setSelectedWeight] = useState(""); // 반려동물 사이즈
  const [selectedGender, setSelectedGender] = useState(""); //성별
  const [selectedNeutering, setSelectedNeutering] = useState(""); //중성화 

  
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

  const handleWeightClick = (weightCode) => {
    setSelectedWeight(weightCode); 
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
    if (!selectedWeight || !petSizeOptions.some(option => option.code === selectedWeight)) {
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
  

    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const petData = {
      petName: petName,
      petType: selectedPetType,
      petBirth: selectedPetBirth,
      neutering: selectedNeutering === "했어요",
      gender: selectedGender,
      weight: selectedWeight, 
    };

    for (const key in petData) {
      if (petData.hasOwnProperty(key)) {
        formData.append(key, petData[key]);
      }
    }

    try {
      const response = await axios.post("/api/v1/pets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        navigate(`/mypage/${localUserId}`);
      } else {
        alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("서버와 통신 중 오류가 발생했습니다.");
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
        <PetNameInfoContainer>
          <SelectLabel label="댕댕이 이름" />
          <PetNameInput
            value={petName}
            onChange={handlePetNameChange}
            placeholder="반려동물 이름을 입력해주세요"
            required />
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
      <BirthContainer>
        <SelectLabel label="생년월일" />
        <BirthInput
          type="date"
          value={selectedPetBirth}
          max={getTodayDate()} 
          onChange={handlePetBirthChange}
          placeholder="우리 댕댕일 생일을 알려주세요!"
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
          selected={selectedWeight === option.code}
          onClick={() => handleWeightClick(option.code)}
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
