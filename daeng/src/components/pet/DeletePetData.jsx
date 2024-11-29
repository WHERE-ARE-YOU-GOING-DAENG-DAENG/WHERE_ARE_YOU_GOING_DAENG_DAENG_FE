import React from "react";
import styled from "styled-components";
import AlertDialog from "../../components/commons/SweetAlert";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";


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

  const handleDelete = async () => {
    AlertDialog({
      mode: "confirm",
      title: "삭제 확인",
      text: "정말로 이 펫 정보를 삭제하시겠습니까?\n삭제된 정보는 복구할 수 없습니다.",
      cancelText: "취소",
      icon: "warning",
      confirmText: "삭제",

      onConfirm: async () => {
        try {
          const response = await axios.delete(`https://www.daengdaeng-where.link/api/v1/pets/${petId}`);
          if (response.status === 200) {
            AlertDialog({
              mode: "alert",
              title: "성공",
              text: "작업이 성공적으로 완료되었습니다.",
              confirmText: "확인",
              onConfirm: () => {
                navigate("/my-page"); 
              }
            });
          }
        } catch (error) {
          console.error("삭제 실패:", error);
        }
      },
    });
  };

  return (
    <DeletePet onClick={handleDelete}>
      삭제하기
    </DeletePet>
  );
}
export default DeletePetData
