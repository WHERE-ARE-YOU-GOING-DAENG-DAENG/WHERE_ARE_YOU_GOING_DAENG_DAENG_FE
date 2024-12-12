import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import x from "../../assets/icons/x.svg";
import rightArrow from "../../assets/icons/arrow.svg";
import leftArrow from "../../assets/icons/reversearrow.svg";
import deleteDot from "../../assets/icons/deleteDot.svg";
import DeleteStory from "./DeleteStory";
import crown from '../../assets/icons/crown.svg';
import {
  VideoContainer,
  CloseButton,
  TextContainer,
  ImageContainer,
  ShowStoryBottomBar,
  Location,
} from "./StoryCommonStyle";
import AlertDialog from "../commons/SweetAlert";

const DeleteDotContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  z-index: 10;
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
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("스토리 데이터:", response.data.data.content);
        setStories(response.data.data.content);
        setNickname(response.data.data.nickname);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            AlertDialog({
              mode: "alert",
              title: "로그인 필요",
              text: "스토리를 업로드 하기 위해서는 로그인이 필요합니다.",
              confirmText: "확인",
              icon: "warning",
              onConfirm: onClose,
            });
          } else if (error.response.status === 404) {
            if (error.response.data.message === "스토리가 존재하지 않습니다.") {
              AlertDialog({
                mode: "alert",
                title: "알림",
                text: "스토리가 없습니다. 스토리를 추가해주세요.",
                confirmText: "확인",
                icon: "warning",
                onConfirm: onClose,
              });
            } else {
              AlertDialog({
                mode: "alert",
                title: "알림",
                text: "땅따먹기 1등을 먼저 해주세요!",
                confirmText: "확인",
                icon: "warning",
              });
            }
          } else {
            console.error("데이터를 가져오는 데 실패했습니다:", error);
          }
        } else {
          console.error("알 수 없는 에러:", error);
        }
      }
    };
  
    fetchStories();
  }, [onClose]);

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

  const currentStory = stories[currentIndex];

  if (!currentStory) {
    return (
      <VideoContainer>
        <TextContainer>스토리가 없습니다. 스토리를 추가해주세요.</TextContainer>
        <CloseButton src={x} alt="팝업 닫기" onClick={onClose} />
      </VideoContainer>
    );
  }

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
            setShowDeleteMenu={setShowDeleteMenu}
            stories={stories}
            setStories={setStories}
            currentIndex={currentIndex} 
            setCurrentIndex={setCurrentIndex} 
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
          <img src={crown} alt="왕관" /> {currentStory.city} {currentStory.cityDetail}
        </Location>
        <span>{nickname}님</span>
      </ShowStoryBottomBar>
    </VideoContainer>
  );
}

export default ShowMyStory;
