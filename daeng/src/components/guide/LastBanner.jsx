import React, { useState, useEffect } from "react";
import king_banner1 from '../../assets/icons/banner/king_banner1.svg'
import {
  SliderContainer,
  SlidesWrapper,
  Slide,
  IndicatorWrapper,
} from "./SliderCommonStyle";

function LastBanner() {
  const banners = [king_banner1];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <SliderContainer>
      <SlidesWrapper currentBanner={currentBanner}>
        {banners.map((banner, index) => (
          <Slide key={index} src={banner} alt={`추천 배너 ${index + 1}`} />
        ))}
      </SlidesWrapper>
      <IndicatorWrapper>
        {currentBanner + 1} / {banners.length}
      </IndicatorWrapper>
    </SliderContainer>
  );
}

export default LastBanner;
