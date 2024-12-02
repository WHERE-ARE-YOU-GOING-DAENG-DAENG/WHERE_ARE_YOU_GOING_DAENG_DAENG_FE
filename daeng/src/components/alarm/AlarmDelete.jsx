import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const CancelButton = styled.button`
  width: 153px;
  height: 54px;
  border-radius: 10px;
  background-color: #FF6347; 
  color: #FFFFFF;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-top: 10px;

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
        "https://www.daengdaeng-where.link/api/v1/notifications"
      );

      if (response.status === 200) {
        alert("알림 받기가 성공적으로 취소되었습니다.");
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
