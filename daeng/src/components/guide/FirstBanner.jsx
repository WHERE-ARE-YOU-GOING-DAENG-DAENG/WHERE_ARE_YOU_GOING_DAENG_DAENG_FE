import React, { useState } from "react";
import {
  SliderContainer,
  SlidesWrapper,
  Slide,
  IndicatorWrapper,
  ArrowButton,
} from "./SliderCommonStyle";
import recommend_banner1 from "../../assets/icons/banner/recommend_banner1.svg";
import recommend_banner2 from "../../assets/icons/banner/recommend_banner2.svg";
import recommend_banner3 from "../../assets/icons/banner/recommend_banner3.svg";

function FirstBanner() {
  const banners = [recommend_banner1, recommend_banner2, recommend_banner3];
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

export default FirstBanner;
