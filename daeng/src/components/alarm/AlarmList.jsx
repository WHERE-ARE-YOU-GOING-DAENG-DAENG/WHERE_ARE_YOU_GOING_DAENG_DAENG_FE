import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PushAlerts from '../../components/commons/PushAlerts';

const ListContainer = styled.div`
  padding-left:30px;

  @media (max-width: 554px) {
    margin: 10px;
    padding: 10px;
  }
`;

function AlarmList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://www.daengdaeng-where.link/api/v1/notifications",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("알림 데이터:", response.data.data);
          setNotifications(response.data.data);
        } else {
          throw new Error("알림 데이터를 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("오류 발생:", err.message);
        setError(err.message || "알림 데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>알림 데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error}</div>;
  }

  return (
    <ListContainer>
      {notifications.length === 0 ? (
        <div>알림이 없습니다.</div>
      ) : (
        notifications.map((notification) => (
          <PushAlerts
            key={notification.notificationId}
            message={notification.content}
            dateTime={`${notification.createdDate} ${notification.createdTime}`}
          />
        ))
      )}
    </ListContainer>
  );
}

export default AlarmList;
