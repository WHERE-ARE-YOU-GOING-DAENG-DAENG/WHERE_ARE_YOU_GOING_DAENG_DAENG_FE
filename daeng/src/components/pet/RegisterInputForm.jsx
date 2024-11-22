import React, { useState } from "react";
import styled from "styled-components";
import SelectLabel from "../../components/commons/SelectLabel";
import { PetType } from "../../data/PetType";
import SelectBtn from "../commons/SelectBtn";
import ConfirmBtn from "../commons/ConfirmBtn";
import footerSearch from "../../assets/icons/footer_search.svg"; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: 4%;
`;

const FirstInputContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  width: 194%;
  height: 44px;
  font-size: 13px;
  border-radius: 5px;
  border: 0.5px solid #e4e4e4;
  margin-bottom: 10px;
  padding: 10px;

  &:focus {
    outline: none;
    border-color: #ff69a9; 
  }


  @media (max-width: 554px) {
    max-width: 150%;
    font-size: 14px;
    height: 48px;
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


function RegisterInputForm() {
  const [preview, setPreview] = useState(null);
  const [selectedPetType, setSelectedPetType] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedGender, setSelectedGender] = useState(""); 
  const [selectedNeutering, setSelectedNeutering] = useState(""); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePetTypeChange = (e) => {
    setSelectedPetType(e.target.value);
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(gender); 
  };

  const handleNeuteringClick = (status) => {
    setSelectedNeutering(status); 
  };

  const handleWeightClick = (weight) => {
    setSelectedWeight(weight); 
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); 
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
          <PetNameInput />
          <InputAlert>*한글, 영문만 사용 가능합니다</InputAlert>
        </PetNameInfoContainer>
      </FirstInputContainer>
      <PetTypeContainer>
        <SelectLabel label="견종" />
        <PetTypeOption value={selectedPetType} onChange={handlePetTypeChange}>
          <option value="" disabled>
            견종을 선택하세요
          </option>
          {PetType.map((breed, index) => (
            <option key={index} value={breed.value}>
              {breed.label}
            </option>
          ))}
        </PetTypeOption>
      </PetTypeContainer>
      <BirthContainer>
        <SelectLabel label="생년월일" />
        <BirthInput
          type="date"
          max={getTodayDate()} 
          placeholder="우리 댕댕일 생일을 알려주세요!"
        />
      </BirthContainer>
      <SelectLabel label="성별" />
      <SelectContainer>
        <SelectBtn
          label="남아"
          selected={selectedGender === "남아"}
          onClick={() => handleGenderClick("남아")}
        />
        <SelectBtn
          label="여아"
          selected={selectedGender === "여아"}
          onClick={() => handleGenderClick("여아")}
        />
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
        <SelectWeight
          selected={selectedWeight === "초소형견(3kg 미만)"}
          onClick={() => handleWeightClick("초소형견(3kg 미만)")}
        >
          초소형견<br />(3kg 미만)
        </SelectWeight>
        <SelectWeight
          selected={selectedWeight === "소형견(3kg ~ 7kg)"}
          onClick={() => handleWeightClick("소형견(3kg ~ 7kg)")}
        >
          소형견<br />(3kg ~ 7kg)
        </SelectWeight>
        <SelectWeight
          selected={selectedWeight === "중형견(7kg ~ 12kg)"}
          onClick={() => handleWeightClick("중형견(7kg ~ 12kg)")}
        >
          중형견<br />(7kg ~ 12kg)
        </SelectWeight>
        <SelectWeight
          selected={selectedWeight === "중대형견(12kg ~ 20kg)"}
          onClick={() => handleWeightClick("중대형견(12kg ~ 20kg)")}
        >
          중대형견<br />(12kg ~ 20kg)
        </SelectWeight>
        <SelectWeight
          selected={selectedWeight === "대형견(20kg 이상)"}
          onClick={() => handleWeightClick("대형견(20kg 이상)")}
        >
          대형견<br />(20kg 이상)
        </SelectWeight>
      </SelectContainer>
      <ConfirmBtn label="완료" />
    </Container>
  );
}

export default RegisterInputForm;
