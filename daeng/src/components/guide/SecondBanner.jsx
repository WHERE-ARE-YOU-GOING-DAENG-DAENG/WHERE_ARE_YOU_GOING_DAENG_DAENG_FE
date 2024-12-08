import React, { useState, useEffect } from "react";
import {
  SliderContainer,
  SlidesWrapper,
  Slide,
  IndicatorWrapper,
} from "./SliderCommonStyle";
import visit_banner1 from '../../assets/icons/banner/visit_banner1.svg'
import visit_banner2 from '../../assets/icons/banner/visit_banner2.svg'
import visit_banner3 from '../../assets/icons/banner/visit_banner3.svg'
import visit_banner4 from '../../assets/icons/banner/visit_banner4.svg'
import visit_banner5 from '../../assets/icons/banner/visit_banner5.svg'
import visit_banner6 from '../../assets/icons/banner/visit_banner6.svg'

function SecondBanner() {
  const banners = [visit_banner1, visit_banner2, visit_banner3, visit_banner4, visit_banner5, visit_banner6];
  const [currentBanner, setCurrentBanner] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleBannerClick = (index) => {
    setCurrentBanner(index);
  };

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

export default SecondBanner;
