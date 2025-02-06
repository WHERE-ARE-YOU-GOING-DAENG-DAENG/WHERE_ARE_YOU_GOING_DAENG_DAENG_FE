import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style/font.css";
import GlobalStyle from "./style/GlobalStyles";

// const naverSiteId = import.meta.env.VITE_NAVER_SITE_ID;

// function addNaverAnalyticsScript() {
//   if (naverSiteId) {
//     if (!window.wcs) {
//       const naverScript = document.createElement("script");
//       naverScript.src = "//wcs.naver.net/wcslog.js";
//       naverScript.onload = () => {
//         if (!window.wcs_add) window.wcs_add = {};
//         window.wcs_add["wa"] = naverSiteId;
//         window.wcs_do();
//       };
//       document.head.appendChild(naverScript);
//     }
//   } else {
//     console.warn("Naver Analytics Site ID가 설정되지 않았습니다.");
//   }
// }

// function addGoogleAdsScript() {
//   const gtagId = import.meta.env.VITE_GTAG_ID;

//   if (!gtagId) {
//     console.warn("Google Ads ID가 설정되지 않았습니다.");
//     return;
//   }

//   const placeholder = document.getElementById("google-ads-placeholder");
//   if (!placeholder) {
//     console.warn("Google Ads placeholder가 HTML에서 누락되었습니다.");
//     return;
//   }

//   const script1 = document.createElement("script");
//   script1.async = true;
//   script1.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
//   placeholder.parentNode.insertBefore(script1, placeholder);


//   const script2 = document.createElement("script");
//   script2.innerHTML = `
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){dataLayer.push(arguments);}
//     gtag('js', new Date());
//     gtag('config', '${gtagId}');
//   `;
//   placeholder.parentNode.insertBefore(script2, placeholder);

//   placeholder.remove();
// }

// addNaverAnalyticsScript();
// addGoogleAdsScript();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
