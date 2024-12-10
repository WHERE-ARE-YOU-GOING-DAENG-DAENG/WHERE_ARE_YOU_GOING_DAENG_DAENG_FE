import React, { useState } from "react";
import styled from "styled-components";
import x from "../../assets/icons/x.svg";
import {
  VideoContainer,
  CloseButton,
  TextContainer,
  ImageContainer,
  BottomBar,
  Location,
} from './StoryCommonStyle';
import AlertDialog from '../../components/commons/SweetAlert';
import deleteDot from "../../assets/icons/deleteDot.svg";

//내 스토리조회 컴포넌트

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


function ShowMyStory({ onClose }) {
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  const handleDeleteDotClick = () => {
    setShowDeleteMenu(!showDeleteMenu); 
  };

  const handleDelete = () => {
    AlertDialog({
      mode: "alert",
      title: "성공",
      text: `스토리가 성공적으로 삭제되었습니다.`,
      confirmText: "닫기" 
    });
    setShowDeleteMenu(false); 
  };

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
              <DeleteMenuButton onClick={handleDelete}>삭제</DeleteMenuButton>
            </DeleteMenu>
          )}
        </DeleteDotContainer>
        <span>이미지 영역</span>
      </ImageContainer>
      <BottomBar>
        <Location>
          <span>👑</span> 
          서울 강남구 
        </Location>
        <span>내가 진짜님</span>
      </BottomBar>
    </VideoContainer>
  );
}

export default ShowMyStory;
