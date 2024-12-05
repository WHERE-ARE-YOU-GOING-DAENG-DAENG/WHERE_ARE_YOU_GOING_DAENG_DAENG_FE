import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteBtn from '../../components/commons/DeleteBtn';
import AlertDialog from '../commons/SweetAlert';

function DeleteReview({ reviewId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    AlertDialog({
      mode: "confirm",
      title: "삭제 확인",
      text: "삭제된 리뷰는 복구할 수 없습니다.",
      cancelText: "취소",
      icon: "warning",
      confirmText: "삭제",

      onConfirm: async () => {
        try {
          const response = await axios.delete(`https://www.daengdaeng-where.link/api/v1/review/${reviewId}`);
          if (response.status === 200) {
            AlertDialog({
              mode: "alert",
              title: "성공",
              text: "성공적으로 삭제되었습니다.",
              icon: "success",
              confirmText: "확인",
              onConfirm: () => {
                navigate(0); 
              },
            });
          }
        } catch (error) {
          console.error("삭제 실패:", error);
          AlertDialog({
            mode: "alert",
            title: "오류",
            text: "삭제 중 문제가 발생했습니다.",
            confirmText: "확인",
          });
        }
      },
    });
  };

  return (
    <>
      <DeleteBtn onClick={handleDelete} label="삭제" />
    </>
  );
}

export default DeleteReview;
