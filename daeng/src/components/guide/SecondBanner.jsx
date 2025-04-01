import React from "react";
import BannerSlider from "./style/BannerSlider";
import visit_banner1 from "../../assets/icons/banner/visit_banner1.jpg";
import visit_banner2 from "../../assets/icons/banner/visit_banner2.jpg";
import visit_banner3 from "../../assets/icons/banner/visit_banner3.jpg";
import visit_banner4 from "../../assets/icons/banner/visit_banner4.jpg";
import visit_banner5 from "../../assets/icons/banner/visit_banner5.jpg";
import visit_banner6 from "../../assets/icons/banner/visit_banner6.jpg";

const banners = [
  visit_banner1,
  visit_banner2,
  visit_banner3,
  visit_banner4,
  visit_banner5,
  visit_banner6,
];
function SecondBanner() {
  return <BannerSlider banners={banners} />;
}

export default SecondBanner;
