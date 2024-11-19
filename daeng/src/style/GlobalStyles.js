import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
      "Noto Sans KR", "Malgun Gothic", sans-serif;
    box-sizing: border-box;
  }

  svg {
    display: inline-block;
  }

  html, body {
    padding: 0;
    margin: 0;
  }

  html {
    width: 100%;
    height: 100vh;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: "Pretendard";
    border: black
  }

  #root {
    margin: 0 auto;
    box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
    min-height: 100vh;
    max-width: 554px;   
    width: 100%;        
    margin: 0 auto;     
    text-align: center; 
  }
    
  @media (min-width: 375px) {
    #root {
      width: 375px;  
    }
  }

  @media (max-width: 500px) {
    #root {
      width: 100vw;  
    }
  }

  @media (min-width: 554px) {
    #root {
      width: 554px; 
    }
  }


`;

export default GlobalStyle;
