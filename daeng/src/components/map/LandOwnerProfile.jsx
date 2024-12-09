import React, { useState, useEffect } from "react";
import styled from "styled-components";
import crown from "../../assets/icons/crown.svg";
import defaultImg from "../../assets/icons/reviewDefaultImg.svg"; 

const Bubble = styled.div`
  position: relative;
  background-color: white;
  border: 5px solid #FF69A9;
  border-radius: 8px;
  padding: 10px 20px;
  color: #333;
  max-width: 600px;
  width: fit-content;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 16px 16px 0;
    border-style: solid;
    border-color: white transparent;
    display: block;
    width: 0;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -19px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 18px 18px 0;
    border-style: solid;
    border-color: #FF69A9 transparent;
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
  font-size: 15px;

  p {
    font-weight: bold;
    display: inline;
    white-space: nowrap;
  }
  img{
    width: 18px;
  }
`;

const Pink = styled.p`
  color: #FF69A9;
  display: inline;
`;

const PetsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const PetsContainer = styled.div`
  overflow: hidden;
  width: ${({ isCentered }) => (isCentered ? "auto" : "180px")}; /* 3마리 미만일 땐 자동 크기 */
`;

const PetList = styled.div`
  display: flex;
  justify-content: ${({ isCentered }) => (isCentered ? "center" : "flex-start")}; /* 중앙 정렬 */
  transform: translateX(${(props) => (props.isCentered ? 0 : props.translateX)}px); /* 3마리 미만일 땐 이동 없음 */
  transition: transform 0.5s ease;
  gap: 15px;
`;

const PetCard = styled.div`
  text-align: center;
  flex: 0 0 50px;
`;

const PetImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const LandOwnerProfile = ({ area, nickname, pets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const itemWidth = 65; // 각 카드의 너비 + 간격 (50px + 15px)
  const maxIndex = Math.ceil(pets.length / itemsPerPage) - 1;

  const isCentered = pets.length <= itemsPerPage; // 3마리 이하일 때 중앙 정렬

  useEffect(() => {
    if (!isCentered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
      }, 3000); // 3초마다 슬라이드 이동
      return () => clearInterval(interval);
    }
  }, [isCentered, maxIndex]);

  return (
    <Bubble>
      <Title>
        <Pink>{area}</Pink> 땅주인
      </Title>
      <Title>
        <img src={crown} alt="왕관" />
        <p>{nickname}</p>님
      </Title>
      <PetsWrapper>
        <PetsContainer isCentered={isCentered}>
          <PetList
            isCentered={isCentered}
            translateX={-currentIndex * itemsPerPage * itemWidth}
          >
            {pets.map((pet) => (
              <PetCard key={pet.id}>
                <PetImage src={pet.img || defaultImg} alt={`${pet.name || "기본 이미지"} 사진`} />
                <div>{pet.name}</div>
              </PetCard>
            ))}
          </PetList>
        </PetsContainer>
      </PetsWrapper>
    </Bubble>
  );
};

export default LandOwnerProfile;
