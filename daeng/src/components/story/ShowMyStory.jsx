import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import x from "../../assets/icons/x.svg";
import rightArrow from "../../assets/icons/arrow.svg";
import leftArrow from "../../assets/icons/reversearrow.svg";
import deleteDot from "../../assets/icons/deleteDot.svg";
import DeleteStory from "./DeleteStory";
import {
  VideoContainer,
  CloseButton,
  TextContainer,
  ImageContainer,
  BottomBar,
  Location,
} from "./StoryCommonStyle";

const DeleteDotContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
`;

const DeleteDot = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const NavigationButton = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  cursor: pointer;

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }
`;

function ShowMyStory({ onClose }) {
  const [stories, setStories] = useState([]);
  const [nickname, setNickname] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          "https://dev.daengdaeng-where.link/api/v2/story/mystory",
          {
            withCredentials: true,
          }
        );
        console.log("스토리 데이터:", response.data.data.content);
        setStories(response.data.data.content);
        setNickname(response.data.data.nickname);
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchStories();
  }, []);

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

  const handleDeleteDotClick = () => {
    setShowDeleteMenu(!showDeleteMenu);
  };

  const handleStoryDelete = (storyId) => {
    const updatedStories = stories.filter((story) => story.storyId !== storyId);

    if (updatedStories.length === 0) {
      // 모든 스토리가 삭제된 경우
      setStories([]);
      setCurrentIndex(0);
    } else {
      // 마지막 스토리를 삭제했을 때 currentIndex를 조정
      if (currentIndex >= updatedStories.length) {
        setCurrentIndex(updatedStories.length - 1); // 배열 길이에 맞게 인덱스 조정
      }
      setStories(updatedStories);
    }
  };

  if (stories.length === 0) {
    // 스토리가 아예 없는 경우
    return <div>현재 스토리가 없습니다.</div>;
  }

  if (!stories[currentIndex]) {
    // 마지막 스토리를 삭제했지만 스토리가 남아 있는 경우
    setCurrentIndex(stories.length - 1); // currentIndex를 마지막 스토리로 조정
    return null; // 상태가 업데이트될 때까지 컴포넌트를 리렌더링
  }

  const currentStory = stories[currentIndex];

  return (
    <VideoContainer>
      <TextContainer>스토리는 24시간 동안 업로드 됩니다.</TextContainer>
      <CloseButton src={x} alt="팝업 닫기" onClick={onClose} />
      <ImageContainer>
        <DeleteDotContainer>
          <DeleteDot
            src={deleteDot}
            alt="스토리 삭제 버튼"
            onClick={handleDeleteDotClick}
          />
          {showDeleteMenu && (
            <DeleteStory
              storyId={currentStory.storyId}
              setShowDeleteMenu={setShowDeleteMenu}
              stories={stories}
              setStories={handleStoryDelete} 
            />
          )}
        </DeleteDotContainer>
        {currentStory.path.endsWith(".mp4") || currentStory.path.endsWith(".webm") ? (
          <video
            src={currentStory.path}
            controls
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <img
            src={currentStory.path}
            alt={`스토리 ${currentStory.storyId}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        <NavigationButton
          src={leftArrow}
          alt="이전 스토리"
          className="left"
          onClick={handlePrev}
        />
        <NavigationButton
          src={rightArrow}
          alt="다음 스토리"
          className="right"
          onClick={handleNext}
        />
      </ImageContainer>
      <BottomBar>
        <Location>
          <span>👑</span> {currentStory.city} {currentStory.cityDetail}
        </Location>
        <span>{nickname}님</span>
      </BottomBar>
    </VideoContainer>
  );
}

export default ShowMyStory;
