import { useState, useEffect } from "react";
import styled from "styled-components";
import festival_banner from "../../assets/icons/festival_banner.jpg";
import banner1 from '../../assets/icons/banner1.jpg';
import banner2 from "../../assets/icons/banner2.jpg";
import banner3 from "../../assets/icons/banner3.jpg";
import { useNavigate } from "react-router-dom";

function HomeSlider() {
  const navigate = useNavigate();
  const slides = [festival_banner, banner1, banner2, banner3]; 
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

  const handleSlideClick = (index) => {
    if (
      slides[index] === banner1 || 
      slides[index] === banner2 || 
      slides[index] === banner3
    ) {
      navigate("/how-to-guide"); 
    } else {
      navigate("/event"); 
    }
  };
  

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <SliderWrapper>
      <SlidesContainer currentSlide={currentSlide}>
        {slides.map((slide, index) => (
          <Slide key={index} src={slide} alt={`Slide ${index + 1}`} onClick={() => handleSlideClick(index)} />
        ))}
      </SlidesContainer>
      <ArrowButton direction="left" onClick={handlePrev}>
        &#8592;
      </ArrowButton>
      <ArrowButton direction="right" onClick={handleNext}>
        &#8594;
      </ArrowButton>
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
  height: auto;
  position: relative;
  overflow: hidden;
  margin-top: 80px;

  aspect-ratio: 554 / 189;

  @media (max-width: 554px) {
    aspect-ratio: 414 / 140;
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
  object-fit: contain;
  flex-shrink: 0;
  cursor: pointer;
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
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "#ff69b4" : "#D0D0D8")};
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

const ArrowButton = styled.button`
  position: absolute;
  top: 40%;
  ${({ direction }) => (direction === "left" ? "left: 10px;" : "right: 10px;")}
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: #fff;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 554px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
`;

export default HomeSlider;
