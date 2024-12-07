import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import top from "../../assets/icons/scrollup.svg"
const ScrollTop = styled.button`
  position: fixed;
  background-color: transparent;
  bottom: 90px; 
  right: 50%;
  transform: translateX(500%);
  z-index: 1000; /* 다른 요소보다 위에 표시 */
  border: none;
  border-radius: 50%; /* 둥근 버튼 */
  width: 50px;
  height: 50px;
  cursor: pointer;
  opacity: ${(props) => (props.visible ? 1 : 0)}; /* 스크롤 위치에 따라 투명도 변경 */
  pointer-events: ${(props) => (props.visible ? "auto" : "none")}; /* 클릭 가능 여부 */
  transition: opacity 0.3s ease;

  @media(max-width:554px){
    right: 10px;
    transform: translateZ(0);
    bottom: 60px;
    img{
      width: 45px;
    }
  }
`;

const ScrollBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 감지 핸들러
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true); // 스크롤 위치가 300px 이상일 때 버튼 표시
    } else {
      setIsVisible(false); // 그렇지 않으면 버튼 숨김
    }
  };

  // 클릭 시 최상단으로 이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드러운 스크롤
    });
  };

  // 스크롤 이벤트 등록 및 해제
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollTop onClick={scrollToTop} visible={isVisible}>
      <img src={top} alt="맨위로" />
    </ScrollTop>
  );
};

export default ScrollBtn;
