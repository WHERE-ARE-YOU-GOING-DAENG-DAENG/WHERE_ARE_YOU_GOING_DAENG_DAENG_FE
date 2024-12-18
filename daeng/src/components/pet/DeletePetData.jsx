import React, { useState } from "react";
import styled from "styled-components";
import AlertDialog from "../../components/commons/SweetAlert";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import Loading from '../../components/commons/Loading';

const DeletePet = styled.button`
  background-color: white;
  color:#B3B3B3;
  font-size:14px;
  border:none;
  cursor: pointer;
  text-align: center;
  margin-right:23px;

  @media (max-width: 554px) {
    margin-top:1%;
    margin-right:5%;
  }

  &:hover{
    font-weight: bold;
  }
`

function DeletePetData({ petId }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    AlertDialog({
      mode: "confirm",
      title: "삭제 확인",
      text: "삭제된 정보는 복구할 수 없습니다.",
      cancelText: "취소",
      icon: "warning",
      confirmText: "삭제",

      onConfirm: async () => {
        setIsDeleting(true);
        try {
          const response = await axiosInstance.delete(
            `/api/v1/pets/${petId}`,
            {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
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
                navigate("/my-page"); 
              }
            });
          }
        } catch (error) {
          console.error("삭제 실패:", error);
        }finally {
          setIsDeleting(false); 
        }
      },
    });
  };

  if (isDeleting) {
    return <Loading label="삭제 중입니다..." />;
  }

  return (
    <DeletePet onClick={handleDelete}>
      반려동물 정보 삭제하기
    </DeletePet>
  );
}
export default DeletePetData
