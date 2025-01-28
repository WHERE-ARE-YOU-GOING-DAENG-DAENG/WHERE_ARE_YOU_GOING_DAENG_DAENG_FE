import React, { useState } from "react";
import king_banner1 from "../../assets/icons/banner/king_banner1.jpg";
import king_banner2 from "../../assets/icons/banner/king_banner2.jpg";
import king_banner3 from "../../assets/icons/banner/king_banner3.jpg";
import king_banner4 from "../../assets/icons/banner/king_banner4.jpg";
import king_banner5 from "../../assets/icons/banner/king_banner5.jpg";
import {
  SliderContainer,
  SlidesWrapper,
  Slide,
  IndicatorWrapper,
  ArrowButton,
} from "./SliderCommonStyle";

function LastBanner() {
  const banners = [king_banner1, king_banner2, king_banner3, king_banner4, king_banner5];
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

export default LastBanner;
