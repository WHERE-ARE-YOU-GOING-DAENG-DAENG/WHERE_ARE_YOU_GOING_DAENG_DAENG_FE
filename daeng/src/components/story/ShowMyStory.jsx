import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import x from "../../assets/icons/x.svg";
import rightArrow from "../../assets/icons/arrow.svg";
import leftArrow from "../../assets/icons/reversearrow.svg";
import deleteDot from "../../assets/icons/deleteDot.svg";
import DeleteStory from "./DeleteStory";
import { useNavigate } from "react-router-dom"; 
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
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          "https://dev.daengdaeng-where.link/api/v2/story/mystory"
        );
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

  if (stories.length === 0) {
    return <div>스토리를 불러오는 중...</div>;
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
            alt="스토리 안의 삭제 버튼"
            onClick={handleDeleteDotClick}
          />
            {showDeleteMenu && (
              <DeleteStory
                storyId={currentStory.storyId} 
                setShowDeleteMenu={setShowDeleteMenu} // 삭제 메뉴 닫기 함수 전달
                stories={stories} // 현재 스토리 배열 전달
                setStories={setStories} // 상태 업데이트 함수 전달 > 삭제하면 바로 다음 스토리를 보여주기 위해 필요~
              />
            )}
        </DeleteDotContainer>
        <img
          src={currentStory.path}
          alt={`스토리 ${currentStory.storyId}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
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
