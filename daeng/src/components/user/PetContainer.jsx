import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import arrow from '../../assets/icons/arrow.svg';
import addImg from '../../assets/icons/addImg.svg';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import reviewDefaultImg from '../../assets/icons/reviewDefaultImg.svg'
import AlertDialog from "../../components/commons/SweetAlert";
import genderW from '../../assets/icons/genderW.svg'
import genderM from '../../assets/icons/genderM.svg'

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
`;

const ArrowButton = styled.img`
  width: 24px;
  height: 24px;
  margin-right:30px;
  margin-top:30px;
  margin-bottom: 30px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  @media (max-width: 554px) {
    position: relative;
    margin: 0 10px; 
    margin-top: 3%;
    margin-left:3%;
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
  margin-left: 10px;  
  margin-top:5%;
  background-color: #FDF2F8;
  width:310px;
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
  const [petData, setPetData] = useState([]); 
  const [startIndex, setStartIndex] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get("https://www.daengdaeng-where.link/api/v1/pets",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );
        const petData = response.data.data;
    
        setPetData(petData.map(pet => ({
          ...pet,
          gender: pet.gender,  
          size: pet.size,     
          species: pet.species,
        })));
      } catch (error) {
        console.error("펫 정보 불러오기 실패:", error);
        AlertDialog({
          mode: "alert", 
          title: "오류",
          text: "펫 정보 불러오기 실패",
          confirmText: "닫기"
        });
        if (error.response) {
          console.error('서버 상태 코드:', error.response.status);
        } else if (error.request) {
          console.error('요청 오류:', error.request);
        } else {
          console.error('요청 설정 오류:', error.message);
        }
        console.error('전체 오류 객체:', error);
      }
    };
    fetchPetData();
  }, []); 

  const handleToPetAdd  = () => {
    navigate("/pet-add");
};

const handleToPetEdit = (petId) => {
  navigate(`/pet-edit/${petId}`);
};

const handlePrev = () => {
  if (startIndex > 0) {
    setStartIndex((prevIndex) => prevIndex - 1); // 1씩 이동
  }
};

const handleNext = () => {
  if (startIndex + 1 < petData.length) {
    setStartIndex((prevIndex) => prevIndex + 1); // 1씩 이동
  }
};
const visiblePets = petData.slice(startIndex, startIndex + 1);

if (!petData) {
  return <div>펫 정보 불러오는중</div>;
}

  return (
    <PetTotalContainer>
      <TitleInfo>
        <Title>우리집 댕댕이</Title>
        <AddPetImg src={addImg} alt="반려동물 추가" onClick={handleToPetAdd} />
        <PetAdd onClick={handleToPetAdd} > 추가</PetAdd>
      </TitleInfo>
      <PetCarouselContainer>
      <ArrowButton
        src={arrow}
        alt="이전"
        onClick={handlePrev}
        style={{
          visibility: startIndex > 0 ? "visible" : "hidden",
          transform: "rotate(180deg)", 
        }}
      />
        <PetListContainer>
          {visiblePets.map((pet) => (
            <PetInfoContainer key={pet.petId}>
              <PetImage src={pet.image || reviewDefaultImg} alt="펫 이미지" />
              <PetDetailInfoContainer>
                <PetFirstContainer>
                <PetName>{pet.name}</PetName>
                <img
                  src={pet.gender === "여자" ? genderW : genderM} 
                  alt={pet.gender}
                />
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
        <ArrowButton src={arrow} alt="다음" onClick={handleNext} />
      </PetCarouselContainer>
    </PetTotalContainer>
  );
}

export default PetContainer;