import { useState } from "react";

const useBannerSlider = (banners) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return { currentBanner, handleNext, handlePrev };
};

export default useBannerSlider;
