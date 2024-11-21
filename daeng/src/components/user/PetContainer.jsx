import React from 'react'
import styled from 'styled-components'
import arrow from '../../assets/icons/arrow.svg';
import addImg from '../../assets/icons/addImg.svg';
import { useNavigate } from "react-router-dom";


const PetTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: 4%;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-left:0.5%;
  display: flex;
  justify-content:flex-start;
`;

const PetInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom:30px;
`

const PetImage = styled.img`
  width: 60px;
  height: 60px;
  margin-top:3%;
  border-radius:100%;
  margin-right: 10px;
  background-color: #FBC9E4;
`;

const PetDetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;  
  margin-top:5%;
`;

const PetName = styled.span`
  font-size: 15px;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
`;


const PetTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  justify-content: flex-start;
`;

const PetWeight = styled.span`
  font-size: 11px;
  font-weight: 400;
  margin-top: 5px;
  font-weight: 300;
`

const PetType = styled.span`
  font-size: 11px;
  font-weight: 400;
  margin-top: 5px;
  font-weight: 300;
  margin-left: 3px;
`
const PetDetailInfo = styled.div`
  display: flex;
  flex-direction: row;

`
const StyleArrow = styled.img`
  width:5px;
  margin-left: 20px;
  color: black;
  cursor: pointer;
`

const AddPetContainer = styled.div`
  display: flex;
  flex-direction:column;
  margin-left:50%;
  margin-top: 20px;

  span{
    font-size:10px;
    display: flex;
    margin-top:5px;
    color:#B3B3B3;
  }
`

const AddPet = styled.img`
  width: 20px;
  display: block;
  margin-left:30%;
  cursor: pointer;
`
function PetContainer() {

  const navigate = useNavigate();

  const handleToPetAdd  = () => {
    navigate("/pet-add");
};

  const handleToPetEdit  = () => {
    navigate("/pet-edit");
};
  return (
    <PetTotalContainer>
      <Title>우리집 댕댕이</Title>
      <PetInfoContainer>
        <PetImage />
        <PetDetailInfoContainer>
          <PetDetailInfo>
            <PetName>보리</PetName>
            <StyleArrow src={arrow} alt="반려동물 정보 자세히 보기" onClick={handleToPetEdit} />
          </PetDetailInfo>
          <PetTypeContainer>
            <PetWeight>대형견 |  </PetWeight>
            <PetType> 말티즈</PetType>
          </PetTypeContainer>
        </PetDetailInfoContainer>
        <AddPetContainer>
          <AddPet src={addImg} alt="반려동물 추가" onClick={handleToPetAdd}/>
          <span>반려동물 추가</span>
        </AddPetContainer>
      </PetInfoContainer>
    </PetTotalContainer>
  );
}

export default PetContainer;
