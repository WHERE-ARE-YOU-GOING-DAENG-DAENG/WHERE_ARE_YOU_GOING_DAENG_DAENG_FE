import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import x from "../../assets/icons/x.svg";
import crown from "../../assets/icons/crown.svg";
import rightArrow from "../../assets/icons/arrow.svg";
import leftArrow from "../../assets/icons/reversearrow.svg";
import styled from "styled-components";
import {
  VideoContainer,
  CloseButton,
  TextContainer,
  ImageContainer,
  ShowStoryBottomBar,
  Location,
  ProgressBar,
  ProgressItem,
} from "./StoryCommonStyle";

function OtherUserStory({ onClose, nickname, city, cityDetail }) {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedStories, setViewedStories] = useState(new Set());

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const userResponse = await axios.get(
          `https://dev.daengdaeng-where.link/api/v2/story`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const user = userResponse.data.data.find(
          (u) =>
            u.nickname === nickname && u.city === city && u.cityDetail === cityDetail
        );

        if (user) {
          const storyResponse = await axios.get(
            `https://dev.daengdaeng-where.link/api/v2/story/${user.landOwnerId}?city=${city}&cityDetail=${cityDetail}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          setStories(storyResponse.data.data.content);
        }
      } catch (error) {
        console.error("스토리를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchStories();
  }, [nickname, city, cityDetail]);

  const markStoryAsViewed = useCallback(async (storyId) => {
    if (!viewedStories.has(storyId)) {
      try {
        await axios.put(
          `https://dev.daengdaeng-where.link/api/v2/story/${storyId}/viewed`,
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setViewedStories(prev => new Set(prev).add(storyId));
        console.log(`스토리 ${storyId}가 확인 처리되었습니다.`);
      } catch (error) {
        console.error(`스토리 ${storyId} 확인 처리에 실패했습니다:`, error);
      }
    }
  }, [viewedStories]);

  useEffect(() => {
    if (stories.length > 0 && currentIndex < stories.length) {
      const currentStoryId = stories[currentIndex].storyId;
      const timer = setTimeout(() => markStoryAsViewed(currentStoryId), 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, stories, markStoryAsViewed]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (stories.length === 0) {
    return (
      <VideoContainer>
        <TextContainer>스토리가 없습니다.</TextContainer>
        <CloseButton src={x} alt="팝업 닫기" onClick={onClose} />
      </VideoContainer>
    );
  }

  const currentStory = stories[currentIndex];

  return (
    <VideoContainer>
      <ProgressBar>
        {stories.map((_, index) => (
          <ProgressItem
            key={index}
            isActive={index === currentIndex} 
            isCompleted={index <= currentIndex} // 현재까지 스토리 색상 주기 
          />
        ))}
      </ProgressBar>
      <TextContainer>스토리는 24시간 동안 업로드 됩니다.</TextContainer>
      <CloseButton
        src={x}
        alt="팝업 닫기"
        onClick={() => {
          onClose();
          window.location.reload();
        }}
      />
      <ImageContainer>
        <StyledImage src={currentStory.path} alt={`스토리 ${currentStory.storyId}`} />

        {currentIndex > 0 && (
          <NavigationButton
            src={leftArrow}
            alt="이전 스토리"
            className="left"
            onClick={handlePrev}
          />
        )}

        {currentIndex < stories.length - 1 && (
          <NavigationButton
            src={rightArrow}
            alt="다음 스토리"
            className="right"
            onClick={handleNext}
          />
        )}
      </ImageContainer>
      <ShowStoryBottomBar>
        <Location>
          <img src={crown} alt="왕관" style={{ marginRight: "5px" }} />
          {city} {cityDetail}
        </Location>
        <span>{nickname}</span>
      </ShowStoryBottomBar>
    </VideoContainer>
  );
}

const NavigationButton = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 10;

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default OtherUserStory;