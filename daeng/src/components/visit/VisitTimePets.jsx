import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import leftArrow from "../../assets/icons/reversearrow.svg";
import rightArrow from "../../assets/icons/arrow.svg";
import joinIcon from "../../assets/icons/join.svg";
import ReviewKeywords from "../../components/commons/ReviewKeywords";
import noImage from "../../assets/icons/reviewDefaultImg.svg"

const VisitTimePets = ({ visitAt, pets, onVisitClick }) => {
  const sliderRef = useRef(null);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const updateScrollState = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    setIsLeftVisible(scrollLeft > 0);
    setIsRightVisible(scrollLeft + clientWidth < scrollWidth);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateScrollState();

    slider.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      slider.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleVisitClick = () => {
    const visitDate = new Date(visitAt).toISOString().split('T')[0];
    const visitTime = visitAt.split("T")[1].slice(0, 5);
    onVisitClick(visitDate, visitTime);
  }

  return (
    <TimeContainer>
      <TimeTitle>
        <div>
            {new Date(visitAt).toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            <PetsCount>- {pets.length}마리 방문 예정</PetsCount>
        </div>
        <ReviewKeywords label="방문하고 싶어요" icon={joinIcon} onClick={handleVisitClick}/>
      </TimeTitle>
      <PetsWrapper>
        <LeftArrow onClick={scrollLeft} disabled={!isLeftVisible} $visible={isLeftVisible}>
          <img src={leftArrow} alt="왼쪽화살표" />
        </LeftArrow>
        <PetsContainer ref={sliderRef}>
          {pets.map((pet) => (
            <PetCard key={pet.petId}>
              <PetImage src={pet.petImg? pet.petImg : noImage} alt={pet.petName} />
              <PetName>{pet.petName}</PetName>
            </PetCard>
          ))}
        </PetsContainer>
        <RightArrow onClick={scrollRight} disabled={!isRightVisible} $visible={isRightVisible}>
            <img src={rightArrow} alt="오른쪽화살표" />
        </RightArrow>
      </PetsWrapper>
    </TimeContainer>
  );
};

const TimeContainer = styled.div`
  margin-bottom: 16px;
  text-align: left;
`;

const TimeTitle = styled.h3`
  font-size: 18px;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PetsCount = styled.span`
  font-size: 14px;
  color: #888;
  margin-left: 8px;
`;

const PetsWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
  font-size: 20px;
  color: #888;
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: -30px;
`;

const RightArrow = styled(ArrowButton)`
  right: -30px;
`;

const PetsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  overflow: hidden;
  scroll-behavior: smooth;
`;

const PetCard = styled.div`
  text-align: center;
  flex-shrink: 0;
  min-width: 60px;
`;

const PetImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const PetName = styled.p`
  margin-top: 5px;
  font-size: 14px;
  color: #333;
`;

export default VisitTimePets;
