import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import arrow from '../../assets/icons/arrow.svg';
import addImg from '../../assets/icons/addImg.svg';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AlertDialog from "../../components/commons/SweetAlert";

const PetTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: 4%;
`;

const TitleInfo = styled.div`
  display: flex;
  flex-direction: row;
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
  margin-top: 20px;
`;

const ArrowButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const PetListContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  overflow: hidden;
  width: 100%;
`;

const PetAdd = styled.span`
  font-size: 11px;
  display: flex;
  margin-top: 19px;
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
`

const PetImage = styled.img`
  width: 70px;
  height: 70px;
  margin-top: 6%;
  border-radius:100%;
  background-color: #FBC9E4;
`;

const PetDetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;  
  margin-top:5%;
  background-color: #FDF2F8;
  width:139px;
  padding:3%;
  padding-right:2%;
  height: 77px;
  border-radius: 10px;
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
  font-size: 12px;
  font-weight: 400;
  margin-top: 5px;
  font-weight: 300;
`

const PetType = styled.span`
  font-size: 12px;
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

function PetContainer() {
  const [petData, setPetData] = useState([]); 
  const [startIndex, setStartIndex] = useState(0); // 시작 인덱스
  const petsPerPage = 2;
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
          species: pet.species 
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
    setStartIndex((prevIndex) => prevIndex - petsPerPage);
  }
};

const handleNext = () => {
  if (startIndex + petsPerPage < petData.length) {
    setStartIndex((prevIndex) => prevIndex + petsPerPage);
  }
};

const visiblePets = petData.slice(startIndex, startIndex + petsPerPage);

if (!petData) {
  return <div>Loading...</div>;
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
              <PetImage src={pet.image || "default-image.jpg"} alt="펫 이미지" />
              <PetDetailInfoContainer>
                <PetName>{pet.name}</PetName>
                <PetTypeContainer>
                  <PetWeight>{pet.size}</PetWeight>
                  <PetType>{pet.species}</PetType>
                </PetTypeContainer>
                <StyleArrow
                  src={arrow}
                  alt="반려동물 정보 자세히 보기"
                  onClick={() => handleToPetEdit(pet.petId)}
                />
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