import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style/font.css'
import GlobalStyle from './style/GlobalStyles'

const naverSiteId = import.meta.env.VITE_NAVER_SITE_ID;

if (naverSiteId && window.wcs) {
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