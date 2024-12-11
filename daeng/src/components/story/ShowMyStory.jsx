import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import x from "../../assets/icons/x.svg";
import rightArrow from "../../assets/icons/arrow.svg";
import leftArrow from "../../assets/icons/reversearrow.svg";
import AlertDialog from "../../components/commons/SweetAlert";
import deleteDot from "../../assets/icons/deleteDot.svg";
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

const DeleteMenu = styled.div`
  position: absolute;
  top: 10px;
  left: -50px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  z-index: 10;
`;

const DeleteMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #333;
  padding: 5px;
  cursor: pointer;
  width: 100%;
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
        const response = await axios.get("https://dev.daengdaeng-where.link/api/v2/story/mystory");
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

  const handleDelete = (storyId) => {
    AlertDialog({
      mode: "alert",
      title: "성공",
      text: `스토리 ID ${storyId}가 성공적으로 삭제되었습니다.`,
      confirmText: "닫기",
      icon: "success",
    });
    setShowDeleteMenu(false);
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
            <DeleteMenu>
              <DeleteMenuButton onClick={() => handleDelete(currentStory.storyId)}>
                삭제
              </DeleteMenuButton>
            </DeleteMenu>
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
