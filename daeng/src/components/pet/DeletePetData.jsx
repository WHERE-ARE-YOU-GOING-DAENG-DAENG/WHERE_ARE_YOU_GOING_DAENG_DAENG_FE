import React from "react";
import styled from "styled-components";
import AlertDialog from "../../components/commons/SweetAlert";
import axios from 'axios'; 

const DeletePet = styled.button`
  background-color: white;
  color:#B3B3B3;
  font-size:14px;
  border:none;
  cursor: pointer;
  text-align: center;
  margin-right:23px;
  margin-bottom: 20px;

  &:hover{
    font-weight: bold;
  }
`

const handleDelete = async () => {
  AlertDialog({
    mode: "confirm",
    title: "삭제 확인",
    text: "정말로 이 펫 정보를 삭제하시겠습니까?" + "\n" + "삭제된 정보는 복구할 수 없습니다.",
    cancelText: "취소",
    icon: "warning",  //아이콘 색상 수정이 안되고 있음.. + text 줄바꿈 수정해야함
    confirmText: "삭제",

    onConfirm: async () => {
      try {
        const response = await axios.delete(`http://54.180.234.13:8080/api/v1/pets/${petId}`);
        if (response.status === 204) {
          AlertDialog({
            mode: "alert",
            title: "성공",
            text: "작업이 성공적으로 완료되었습니다.",
            confirmText: "확인",
            onConfirm: () => { console.log("확인 클릭"); }
          });
          navigate("/my-page");
        }
      } catch (error) {
        console.error("삭제 실패:", error);
        AlertDialog({
          mode: "alert",
          title: "삭제 실패",
          text: "삭제 중 문제가 발생했습니다. 다시 시도해주세요.",
          confirmText: "확인",
        });
      }
    },
  });
};

function DeletePetData() {
  return (
    <DeletePet onClick={handleDelete}>삭제하기</DeletePet>
  )
}

export default DeletePetData
