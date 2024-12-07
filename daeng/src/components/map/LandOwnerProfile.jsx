import React, { useState } from "react";
import styled from "styled-components";

const Bubble = styled.div`
  position: relative;
  background-color: white;
  border: 2px solid #ff69a9;
  border-radius: 8px;
  padding: 10px 20px;
  color: #333;
  max-width: 600px;
  width: fit-content;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 20px;
    border-width: 12px 12px 0;
    border-style: solid;
    border-color: white transparent;
    display: block;
    width: 0;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -14px;
    left: 18px;
    border-width: 14px 14px 0;
    border-style: solid;
    border-color: #ff69a9 transparent;
    display: block;
    width: 0;
    z-index: -1;
  }
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  p {
    font-weight: bold;
    display: inline;
    white-space: nowrap;
  }
`;

const Pink = styled.p`
  color: #FF4B98;
  display: inline;
`;

const PetsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const PetsContainer = styled.div`
  overflow: hidden; /* 슬라이더 밖의 내용 숨기기 */
  width: 180px; /* 3개씩 표시할 너비 (50px * 3 + 간격) */
`;

const PetList = styled.div`
  display: flex;
  transform: translateX(${(props) => props.translateX}px); /* 이동 애니메이션 */
  transition: transform 0.5s ease; /* 부드럽게 이동 */
`;

const PetCard = styled.div`
  text-align: center;
  flex: 0 0 50px; /* 각 카드의 고정 너비 */
  margin-right: 15px; /* 카드 간격 */
`;

const PetImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ff69a9;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const LandOwnerProfile = ({ area, nickname, pets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const itemWidth = 65; // 각 카드의 너비 + 간격 (50px + 15px)
  const maxIndex = Math.ceil(pets.length / itemsPerPage) - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <Bubble>
      <Title>
        <Pink>{area}</Pink> 땅주인 <p>{nickname}</p>님
      </Title>
      <PetsWrapper>
        <ArrowButton onClick={handlePrev} disabled={currentIndex === 0}>
          &lt;
        </ArrowButton>
        <PetsContainer>
          <PetList translateX={-currentIndex * itemsPerPage * itemWidth}>
            {pets.map((pet) => (
              <PetCard key={pet.id}>
                <PetImage src={pet.img} alt={`${pet.name} 사진`} />
                <div>{pet.name}</div>
              </PetCard>
            ))}
          </PetList>
        </PetsContainer>
        <ArrowButton onClick={handleNext} disabled={currentIndex === maxIndex}>
          &gt;
        </ArrowButton>
      </PetsWrapper>
    </Bubble>
  );
};

export default LandOwnerProfile;
