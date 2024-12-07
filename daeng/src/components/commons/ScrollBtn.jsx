import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import top from "../../assets/icons/scrollup.svg";
import list from "../../assets/icons/bookmarklist.svg";
import { useNavigate } from 'react-router-dom';

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
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')}; /* 클릭 가능 여부 */
  transition: opacity 0.3s ease;

  @media (max-width: 554px) {
    right: 10px;
    transform: translateZ(0);
    bottom: 65px;
    img {
      width: 45px;
    }
  }
`;

const BookmarkButton = styled.button`
  position: fixed;
  background-color: transparent;
  right: 50%;
  transform: translateX(500%);
  z-index: 999; /* 맨위로 버튼 바로 아래 */
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: bottom 0.3s ease;

  @media (max-width: 554px) {
    right: 10px;
    bottom: 115px !important;
    transform: translateZ(0);
    img {
      width: 45px;
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
    navigate("/bookmark");
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
      <BookmarkButton visible={isVisible}
        style={{
          bottom: isVisible ? '150px' : '90px', // 맨위로 버튼 여부에 따라 위치 변경
        }}
        onClick={handleBookmarkClick}
      >
        <img src={list} alt="즐겨찾기" />
      </BookmarkButton>

      {/* 맨위로 버튼 */}
      <ScrollTop onClick={scrollToTop} visible={isVisible} hasList>
        <img src={top} alt="맨위로" />
      </ScrollTop>
    </>
  );
};

export default ScrollBtn;
