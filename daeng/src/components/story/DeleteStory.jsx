import React from 'react'
import axios from 'axios'
import styled from "styled-components";
import AlertDialog from '../../components/commons/SweetAlert';

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
const handleDelete = async (storyId, setShowDeleteMenu) => {
  AlertDialog({
    mode: "confirm",
    title: "삭제 확인",
    text: "삭제된 스토리는 복구할 수 없습니다.",
    cancelText: "취소",
    icon: "warning",
    confirmText: "삭제",

    onConfirm: async () => {
      try {
        const response = await axios.delete(
          `https://dev.daengdaeng-where.link/api/v2/story/${storyId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          AlertDialog({
            mode: "alert",
            title: "성공",
            text: "정상적으로 삭제되었습니다.",
            confirmText: "확인",
            icon: "success",
            onConfirm: () => {
              setShowDeleteMenu(false);
            },
          });
        }
      } catch (error) {
        AlertDialog({
          mode: "alert",
          title: "실패",
          text: "삭제에 실패했습니다. 다시 시도해주세요.",
          confirmText: "확인",
          icon: "error",
        });
        console.error("삭제 실패:", error);
      }
    },
  });
};


function DeleteStory() {
  return (
    <>
    <DeleteMenu>
      <DeleteMenuButton onClick={handleDelete}>삭제</DeleteMenuButton>
    </DeleteMenu>
    </>
  )
}

export default DeleteStory
