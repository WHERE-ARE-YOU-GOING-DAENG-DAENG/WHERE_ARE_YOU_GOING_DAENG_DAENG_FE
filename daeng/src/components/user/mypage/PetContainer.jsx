import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import arrow from '../../../assets/icons/arrow.svg';
import reversearrow from '../../../assets/icons/reversearrow.svg';
import addImg from '../../../assets/icons/addImg.svg';
import { useNavigate } from "react-router-dom";
import reviewDefaultImg from '../../../assets/icons/reviewDefaultImg.svg';
import AlertDialog from "../../commons/SweetAlert";
import genderW from '../../../assets/icons/genderW.svg';
import genderM from '../../../assets/icons/genderM.svg';
import usePetStore from "../../../stores/usePetStore"; 

const PetTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: -5px;
  width: 100%; 
`;

const TitleInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-left:6%;
  `;
  
const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-left:0.5%;
  display: flex;
  justify-content:flex-start;
`;

const PetCarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 10px; 
  margin-left:10px;

  @media (max-width: 554px) {
    gap: 5px;
  }
`;


const ArrowButton = styled.img`
  width: 24px;
  height: 24px;
  margin: 0 15px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  transform: ${(props) => (props.rotate ? "rotate(180deg)" : "none")};

  @media (max-width: 554px) {
    margin: 0 8px; 
    margin-top:10px;
  }
`;


const PetListContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  overflow: hidden;
  width: 100%;

  @media (max-width: 554px) {
    width: 100%; 
    flex-wrap: nowrap; 
    justify-content: center; 
  }
`;

const PetAdd = styled.span`
  font-size: 15px;
  display: flex;
  margin-top: 17px;
  margin-left:5px;
  color: #B3B3B3;
  cursor: pointer;
`

const AddPetImg = styled.img`
  width: 15px;
  display: block;
  margin-left:2%;
  cursor: pointer;
`

const PetInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  @media (max-width: 554px) {
    width: 100%; 
    margin: 0 auto;
    justify-content: center;
  }
`

const PetImage = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 6%;
  border-radius:100%;

  @media (max-width: 554px) {
    width: 80px;
    height: 80px;
    margin-top: 6%;
  }
`;

const PetDetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;  
  margin-top:5%;
  background-color: #FDF2F8;
  width:280px;
  padding:6%;
  padding-right:2%;

  border-radius: 10px;

  @media (max-width: 554px) {
    width:300px;
    padding:5%;
    margin-left: 20px; 
  }
`;

const PetName = styled.span`
  font-size: 15px;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 554px) {
  font-size:13px;
  }
`;

const PetTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  justify-content: flex-start;
`;

const PetWeight = styled.span`
  font-size: 13px;
  font-weight: 400;
  margin-top: 5px;
  font-weight: 300;
`

const PetType = styled.span`
  font-size: 13px;
  font-weight: 400;
  margin-top: 5px;
  font-weight: 300;
  margin-left: 3px;
`
const PetFirstContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`
const PetEditButton = styled.button`
  font-size:10px;
  width: 50px;
  height: 20px;
  cursor: pointer;
  border-radius: 30px;
  background-color: #D9D9D9;
  border: none;
  position: absolute;
  color: black;
  margin-left: 75%;

  @media (max-width: 554px) {
    margin-left: 60%;
  }
`

function PetContainer() {
  const navigate = useNavigate();
  const { pets, fetchPetList, isLoading, error } = usePetStore();
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetchPetList(); 
  }, [fetchPetList]);

  const handleToPetAdd = () => {
    navigate("/pet-add");
  };

  const handleToPetEdit = (petId) => {
    navigate(`/pet-edit/${petId}`);
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + 1 < pets.length) setStartIndex((prevIndex) => prevIndex + 1);
  };

  const visiblePets = pets.slice(startIndex, startIndex + 1);

  if (isLoading) {
    return <div>펫 정보 불러오는 중...</div>;
  }

  if (error) {
    AlertDialog({
      mode: "alert",
      title: "오류",
      text: error,
      confirmText: "닫기",
    });
    return null;
  }

  return (
    <PetTotalContainer>
      <TitleInfo>
        <Title>우리집 댕댕이</Title>
        <AddPetImg src={addImg} alt="반려동물 추가" onClick={handleToPetAdd} />
        <PetAdd onClick={handleToPetAdd}>추가</PetAdd>
      </TitleInfo>
      <PetCarouselContainer>
      <ArrowButton
        src={reversearrow}
        alt="이전"
        onClick={handlePrev}
        style={{
          visibility: startIndex > 0 ? "visible" : "hidden",
        }}
      />
        <PetListContainer>
          {visiblePets.map((pet) => (
            <PetInfoContainer key={pet.petId}>
              <PetImage src={pet.image || reviewDefaultImg} alt="펫 이미지" loading="lazy"/>
              <PetDetailInfoContainer>
                <PetFirstContainer>
                  <PetName>{pet.name}</PetName>
                  <img src={pet.gender === "여자" ? genderW : genderM} alt={pet.gender} />
                  <PetEditButton onClick={() => handleToPetEdit(pet.petId)}>수정</PetEditButton>
                </PetFirstContainer>
                <PetTypeContainer>
                  <PetWeight>{pet.size} | </PetWeight>
                  <PetType>{pet.species}</PetType>
                </PetTypeContainer>
              </PetDetailInfoContainer>
            </PetInfoContainer>
          ))}
        </PetListContainer>
        <ArrowButton
        src={arrow} 
        alt="다음"
        onClick={handleNext}
        disabled={startIndex + 1 >= pets.length}
      />
      </PetCarouselContainer>
    </PetTotalContainer>
  );
}

export default PetContainer;
