import { useState, useEffect } from "react";
import styled from "styled-components";
import festival_banner1 from "../../assets/icons/festival_banner1.svg";

function HomeSlider() {
  const slides = [festival_banner1]; // 단일 배너
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <SliderWrapper>
      <SlidesContainer currentSlide={currentSlide}>
        {slides.map((slide, index) => (
          <Slide key={index} src={slide} alt={`Slide ${index + 1}`} />
        ))}
      </SlidesContainer>
      <DotsWrapper>
        {slides.map((_, index) => (
          <Dot
            key={index}
            isActive={currentSlide === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsWrapper>
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  width: 100%;
  height: 189px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;

  @media (max-width: 554px) {
    height: 120px;
  }
`;

const SlidesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentSlide }) => `translateX(-${currentSlide * 100}%)`};
`;

const Slide = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
`;

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;

  @media (max-width: 554px) {
    gap: 5px;
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "#ff69b4" : "#ffffff")};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff69b4;
  }

  @media (max-width: 554px) {
    width: 6px;
    height: 6px;
  }
`;

export default HomeSlider;
