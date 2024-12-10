import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import top from "../../assets/icons/scrollup.svg"
const ScrollTop = styled.button`
  position: fixed;
  background-color: transparent;
  bottom: 90px; 
  right: 50%;
  transform: translateX(500%);
  z-index: 1000;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? "auto" : "none")};
  transition: opacity 0.3s ease;

  @media(max-width:554px){
    right: 10px;
    transform: translateZ(0);
    bottom: 68px;
    img{
      width: 45px;
    }
  }
`;

const ScrollBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
