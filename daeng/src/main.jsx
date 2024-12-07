import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style/font.css'
import GlobalStyle from './style/GlobalStyles'
import { requestNotificationPermission, setupForegroundMessageHandler } from './firebase/firebase.js'

const initializeFirebase = async () => {
  await requestNotificationPermission();
  setupForegroundMessageHandler();
}

initializeFirebase();

const naverSiteId = import.meta.env.VITE_NAVER_SITE_ID;

if (naverSiteId && window.wcs) {
  // 네이버 애널리틱스 초기화
  if (!window.wcs_add) window.wcs_add = {};
  window.wcs_add['wa'] = naverSiteId;
  window.wcs_do();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
)