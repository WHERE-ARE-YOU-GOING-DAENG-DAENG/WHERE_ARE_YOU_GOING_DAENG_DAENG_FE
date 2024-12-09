import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ReviewPictureContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  margin-left: 5px;
  padding: 20px 0;

  @media (max-width: 554px) {
    margin-left: 10px;
  }
`;

const ReviewPictureWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex, itemWidth }) =>
    `translateX(-${currentIndex * (itemWidth + 5)}px)`};
`;

const ReviewPicture = styled.img`
  width: ${({ itemWidth }) => `${itemWidth}px`};
  height: ${({ itemWidth }) => `${itemWidth}px`};
  object-fit: cover;
  margin-right: 5px;
  border-radius: 8px;

  @media (max-width: 554px) {
    margin-right: 3px;
  }
`;

const Video = styled.video`
  width: ${({ itemWidth }) => `${itemWidth}px`};
  height: ${({ itemWidth }) => `${itemWidth}px`};
  object-fit: cover;
  margin-right: 5px;
  background-color: #d9d9d9;
  border-radius: 8px;

  @media (max-width: 554px) {
    margin-right: 3px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 2;

  ${({ direction }) => (direction === 'left' ? 'left: 10px;' : 'right: 10px;')}

  @media (max-width: 554px) {
    padding: 8px;
  }
`;

const ReviewSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4); // 큰 화면에서 4개 보여줌
  const [itemWidth, setItemWidth] = useState(120);

  const totalImages = images.length;

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 554) {
        setVisibleCount(2);
        setItemWidth(90); // 작은 화면에서 이미지 크기 축소
      } else if (screenWidth <= 768) {
        setVisibleCount(3);
        setItemWidth(110); // 중간 화면
      } else {
        setVisibleCount(4); // 큰 화면에서 4개
        setItemWidth(120);
      }
    };

    handleResize(); // 초기 화면 크기 반영
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.max(totalImages - visibleCount, 0))
    );
  };

  // 화살표 표시 조건
  const canShowPrev = currentIndex > 0;
  const canShowNext = currentIndex < totalImages - visibleCount;

  return (
    <ReviewPictureContainer>
      {canShowPrev && (
        <ArrowButton direction="left" onClick={handlePrev}>
          ◀
        </ArrowButton>
      )}
      <ReviewPictureWrapper currentIndex={currentIndex} itemWidth={itemWidth}>
        {images.map((src, index) => {
          if (src.endsWith('.mp4') || src.endsWith('.mov')) {
            return (
              <Video key={index} controls itemWidth={itemWidth}>
                <source src={src} type="video/mp4" />
              </Video>
            );
          } else {
            return (
              <ReviewPicture
                key={index}
                src={src}
                alt={`리뷰 이미지 ${index + 1}`}
                itemWidth={itemWidth}
              />
            );
          }
        })}
      </ReviewPictureWrapper>
      {canShowNext && (
        <ArrowButton direction="right" onClick={handleNext}>
          ▶
        </ArrowButton>
      )}
    </ReviewPictureContainer>
  );
};

export default ReviewSlideshow;
