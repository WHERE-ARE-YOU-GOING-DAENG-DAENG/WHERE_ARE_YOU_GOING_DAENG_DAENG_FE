import React from "react";
import BannerSlider from "./style/BannerSlider";
import king_banner1 from "../../assets/icons/banner/king_banner1.webp";
import king_banner2 from "../../assets/icons/banner/king_banner2.webp";
import king_banner3 from "../../assets/icons/banner/king_banner3.webp";
import king_banner4 from "../../assets/icons/banner/king_banner4.webp";
import king_banner5 from "../../assets/icons/banner/king_banner5.webp";

const banners = [
  king_banner1,
  king_banner2,
  king_banner3,
  king_banner4,
  king_banner5,
];

function LastBanner() {
  return <BannerSlider banners={banners} />;
}

export default LastBanner;
