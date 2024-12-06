import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AlertDialog from "../commons/SweetAlert";

const CancelButton = styled.button`
  width: 130px;
  height: 54px;
  border-radius: 10px;
  background-color:  #FDF2F8;
  border: solid 1px #FF69A9;
  color: #FF69A9;;
  border: none;
  font-size: 20px;
  cursor: pointer;


  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

function AlarmDelete() {
  const [loading, setLoading] = useState(false);

  const handleCancelNotification = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        "https://www.daengdaeng-where.link/api/v1/notifications",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        AlertDialog({
          mode: "alert",
          title: "알림 취소",
          text: "알림 취소가 완료되었습니다.",
          confirmText: "확인",
          icon: "success", 
        });
      } else {
        alert("알림 받기 취소에 실패했습니다.");
      }
    } catch (error) {
      alert("알림 받기 취소 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CancelButton onClick={handleCancelNotification} disabled={loading}>
        {loading ? "처리 중..." : "알림 취소"}
      </CancelButton>
    </div>
  );
}

export default AlarmDelete;
