import React, { useState } from "react";
import {
  SliderContainer,
  SlidesWrapper,
  Slide,
  IndicatorWrapper,
  ArrowButton,
} from "./SliderCommonStyle";
import visit_banner1 from '../../assets/icons/banner/visit_banner1.jpg'
import visit_banner2 from '../../assets/icons/banner/visit_banner2.jpg'
import visit_banner3 from '../../assets/icons/banner/visit_banner3.jpg'
import visit_banner4 from '../../assets/icons/banner/visit_banner4.jpg'
import visit_banner5 from '../../assets/icons/banner/visit_banner5.jpg'
import visit_banner6 from '../../assets/icons/banner/visit_banner6.jpg'

function SecondBanner() {
  const banners = [
    visit_banner1,
    visit_banner2,
    visit_banner3,
    visit_banner4,
    visit_banner5,
    visit_banner6,
  ];
  const [currentBanner, setCurrentBanner] = useState(0);

  const handleNext = () => {
    setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentBanner((prevBanner) => 
      (prevBanner - 1 + banners.length) % banners.length
    );
  };

  return (
    <SliderContainer>
      <SlidesWrapper currentBanner={currentBanner}>
        {banners.map((banner, index) => (
          <Slide key={index} src={banner} alt={`추천 배너 ${index + 1}`} />
        ))}
      </SlidesWrapper>
      <ArrowButton direction="left" onClick={handlePrev}>
        &#8592; 
      </ArrowButton>
      <ArrowButton direction="right" onClick={handleNext}>
        &#8594; 
      </ArrowButton>
      <IndicatorWrapper>
        {currentBanner + 1} / {banners.length}
      </IndicatorWrapper>
    </SliderContainer>
  );
}

export default SecondBanner;
