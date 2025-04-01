import React from "react";
import {
  SliderContainer,
  SlidesWrapper,
  Slide,
  IndicatorWrapper,
  ArrowButton,
} from "./SliderCommonStyle";
import useBannerSlider from "../../../hooks/useBannerSlider";

function BannerSlider({ banners }) {
  const { currentBanner, handleNext, handlePrev } = useBannerSlider(banners);

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

export default BannerSlider;
