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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
)