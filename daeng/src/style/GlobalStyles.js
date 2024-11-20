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
    width: 100%;
    max-width: 554px;   
    width: 100%;        
    margin: 0 auto;     
    text-align: center; 
  }
}

`;

export default GlobalStyle;
