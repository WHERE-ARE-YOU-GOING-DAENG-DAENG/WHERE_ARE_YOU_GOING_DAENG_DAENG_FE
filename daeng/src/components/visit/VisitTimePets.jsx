import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import leftArrow from "../../assets/icons/reversearrow.svg";
import rightArrow from "../../assets/icons/arrow.svg";
import joinIcon from "../../assets/icons/join.svg";
import ReviewKeywords from "../../components/commons/ReviewKeywords";
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
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
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
  overflow: hidden; /* 슬라이더 영역 밖 숨김 */
  scroll-behavior: smooth; /* 부드러운 스크롤 */
`;

const PetCard = styled.div`
  text-align: center;
  flex-shrink: 0; /* 크기를 고정 */
  min-width: 60px; /* 카드 최소 크기 */
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

const VisitTimePets = ({ visitAt, pets }) => {
  const sliderRef = useRef(null);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  // 스크롤 상태를 업데이트
  const updateScrollState = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    setIsLeftVisible(scrollLeft > 0);
    setIsRightVisible(scrollLeft + clientWidth < scrollWidth);
  };

  // 좌우 스크롤 핸들러
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

  // 슬라이더 크기 및 스크롤 변경 시 상태 업데이트
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateScrollState(); // 초기 상태 업데이트

    // 스크롤 이벤트 리스너 추가
    slider.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      slider.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

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
        <ReviewKeywords label="방문하고 싶어요" icon={joinIcon} onClick={()=> navigate(`/visit-list/${data.placeId}`)}/>
      </TimeTitle>
      <PetsWrapper>
        <LeftArrow onClick={scrollLeft} disabled={!isLeftVisible} visible={isLeftVisible}>
          <img src={leftArrow} alt="왼쪽화살표" />
        </LeftArrow>
        <PetsContainer ref={sliderRef}>
          {pets.map((pet) => (
            <PetCard key={pet.petId}>
              <PetImage src={pet.petImg} alt={pet.petName} />
              <PetName>{pet.petName}</PetName>
            </PetCard>
          ))}
        </PetsContainer>
        <RightArrow onClick={scrollRight} disabled={!isRightVisible} visible={isRightVisible}>
            <img src={rightArrow} alt="오른쪽화살표" />
        </RightArrow>
      </PetsWrapper>
    </TimeContainer>
  );
};

export default VisitTimePets;
