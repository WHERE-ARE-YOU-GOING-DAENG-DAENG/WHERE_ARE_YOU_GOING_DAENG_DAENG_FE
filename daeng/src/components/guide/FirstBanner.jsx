import React from "react";
import BannerSlider from "./style/BannerSlider";
import recommend_banner1 from "../../assets/icons/banner/recommend_banner1.webp";
import recommend_banner2 from "../../assets/icons/banner/recommend_banner2.webp";
import recommend_banner3 from "../../assets/icons/banner/recommend_banner3.webp";

const banners = [recommend_banner1, recommend_banner3, recommend_banner2];
function FirstBanner() {
  return <BannerSlider banners={banners} />;
}

export default FirstBanner;
