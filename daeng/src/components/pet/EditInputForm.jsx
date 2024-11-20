import React, { useState } from 'react';
import styled from "styled-components";
import SelectLabel from "../../components/commons/SelectLabel";
import { PetType } from '../../data/PetType';
import footerSearch from "../../assets/icons/footer_search.svg"; 
import SelectBtn from '../../components/commons/SelectBtn';
import ConfirmBtn from '../../components/commons/ConfirmBtn';
import { useNavigate } from 'react-router-dom'; 


const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 30px;
`;

const SelectBox = styled.select`
  width: 100%;
  height: 44px;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  border: 0.5px solid #E4E4E4;
  font-size: 12px;
  margin-bottom: 35px;
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

const DateContainer = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 5px;
  padding: 10px;
  border: 0.5px solid #E4E4E4;
  font-size: 12px;
  margin-bottom: 35px;
  cursor: pointer;

  &:focus {
    border-color: #FF69A9;  
    outline: none;  
  }
`;

const SelectBtnContainer = styled.div`
  display: flex;
  margin-bottom: 35px;
`;

const DeleteButton = styled.span`
  color: #B3B3B3;
  border: none;
  font-size: 14px;
  margin-top: 10px; 
  margin-bottom: 25px; 
  background: transparent; 
  cursor: pointer;
  text-align: center;
  display: block;  
  text-align: center; 

  &:hover {
      font-weight: bold;
  }
`;

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
    color: white;
  `}
`;

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function InputForm() {
  const navigate = useNavigate(); 

  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState(""); // 성별  
  const [neutering, setNeutering] = useState(""); // 중성화 여부
  const [selectedWeight, setSelectedWeight] = useState(""); //몸무게 

  const handleBirthdateChange = (e) => setBirthdate(e.target.value);

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender);  
  };

  const handleNeuteringClick = (status) => {
    setNeutering(status);  
  };

  const handleWeightClick = (weight) => {
    setSelectedWeight(weight); 
  };


  return (
    <SelectContainer>
      <SelectLabel label="견종" />
      <SelectBox>
        <option value="" disabled selected>
          견종을 선택해주세요
        </option>
        {PetType.map((dog, index) => (
          <option key={index} value={dog.value}>
            {dog.label}
          </option>
        ))}
      </SelectBox>

      <SelectLabel label="생년월일" />
      <DateContainer type="date" max={getCurrentDate()} onChange={handleBirthdateChange} />

      <SelectLabel label="성별" />
      <SelectBtnContainer>
        <SelectBtn
          label="남아"
          selected={gender === "남아"}
          onClick={() => handleGenderClick("남아")}
        />
        <SelectBtn
          label="여아"
          selected={gender === "여아"}
          onClick={() => handleGenderClick("여아")}
        />
      </SelectBtnContainer>

      <SelectLabel label="중성화 여부" />
      <SelectBtnContainer>
        <SelectBtn
          label="했어요"
          selected={neutering === "했어요"}
          onClick={() => handleNeuteringClick("했어요")}
        />
        <SelectBtn
          label="안 했어요"
          selected={neutering === "안 했어요"}
          onClick={() => handleNeuteringClick("안 했어요")}
        />
      </SelectBtnContainer>

      <SelectLabel label="크기" />
      <SelectBtnContainer>
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
      </SelectBtnContainer>

      <ConfirmBtn label="수정 완료" />
      <DeleteButton>댕댕이 삭제하기</DeleteButton>
    </SelectContainer>
  );
}

export default InputForm;
