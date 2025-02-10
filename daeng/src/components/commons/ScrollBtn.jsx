import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import top from "../../assets/icons/scrollup.svg";
import land from "../../assets/icons/hopscotchbtn.svg";
import { useNavigate } from 'react-router-dom';

const ScrollTop = styled.button`
  position: fixed;
  background-color: transparent;
  bottom: 90px;
  right: 50%;
  transform: translateX(500%);
  z-index: 900;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: ${(props) => (props.$visible ? 'auto' : 'none')};
  transition: opacity 0.3s ease;

  img {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 554px) {
    right: 10px;
    transform: translateZ(0);
    bottom: 65px;
    img {
      width: 45px;
      height: 45px;
    }
  }
`;

const BookmarkButton = styled.button`
  position: fixed;
  background-color: transparent;
  right: 50%;
  transform: translateX(500%);
  z-index: 999;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: bottom 0.3s ease;
  
  img {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 554px) {
    right: 10px;
    bottom: ${(props) => (props.$visible ? '115px !important' : '65px!important')};
    transform: translateZ(0);
    img {
      width: 45px;
      height: 45px;
    }
  }
`;

const ScrollBtn = () => {
  const navigate = useNavigate();
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
      behavior: 'smooth',
    });
  };

  const handleBookmarkClick = () => {
    navigate("/hopscotch");
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* 즐겨찾기 버튼 */}
      <BookmarkButton $visible={isVisible}
        style={{
          bottom: isVisible ? '150px' : '90px',
        }}
        onClick={handleBookmarkClick}
      >
        <img src={land} alt="즐겨찾기" />
      </BookmarkButton>

      {/* 맨위로 버튼 */}
      <ScrollTop onClick={scrollToTop} $visible={isVisible} >
        <img src={top} alt="맨위로" />
      </ScrollTop>
    </>
  );
};

export default ScrollBtn;
