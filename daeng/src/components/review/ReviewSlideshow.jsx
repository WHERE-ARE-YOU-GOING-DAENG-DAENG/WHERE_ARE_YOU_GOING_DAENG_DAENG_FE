import React, { useState } from 'react';
import styled from 'styled-components';

const ReviewPictureContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  padding: 10px 0;
`;

const ReviewPictureWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 25}%)`};
`;

const ReviewPicture = styled.img`
  width: 25%;
  height: auto;
  object-fit: cover;
  margin-right: 5px;
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
`;

const ReviewSlideshow = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, images.length - visibleCount));
  };

  return (
    <ReviewPictureContainer>
      {currentIndex > 0 && (
        <ArrowButton direction="left" onClick={handlePrev}>
          ◀
        </ArrowButton>
      )}
      <ReviewPictureWrapper currentIndex={currentIndex}>
        {media.map((item, index) => {
          // 동영상인지 확인
          const isVideo = item.includes('.mp4') || item.includes('.mov') || item.includes('.avi');
          
          return (
            <div key={index}>
              {isVideo ? (
                // 동영상 처리
                <ReviewVideo controls>
                  <source src={item} type="video/mp4" />
                </ReviewVideo>
              ) : (
                // 이미지 처리
                <ReviewPicture src={item} alt={`리뷰 이미지 ${index + 1}`} />
              )}
            </div>
          );
        })}
      </ReviewPictureWrapper>
      {/* 다음 화살표 버튼 */}
      {currentIndex < media.length - visibleCount && (
        <ArrowButton direction="right" onClick={handleNext}>
          ▶
        </ArrowButton>
      )}
    </ReviewPictureContainer>
  );
};

export default ReviewSlideshow;
