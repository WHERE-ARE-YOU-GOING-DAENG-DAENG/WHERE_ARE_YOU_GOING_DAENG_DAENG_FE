import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ListContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const NotificationItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const EventType = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;

const Content = styled.div`
  font-size: 14px;
  color: #333;
`;

const CreatedDateTime = styled.div`
  font-size: 12px;
  color: #888;
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
            withCredentials: true, // 추가 설정
          }
        );
        if (response.status === 200) {
          console.log("알림 데이터:", response.data.data); // 알림 데이터를 콘솔에 출력
          setNotifications(response.data.data);
        } else {
          throw new Error("알림 데이터를 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("오류 발생:", err.message); // 오류 내용을 콘솔에 출력
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
          <NotificationItem key={notification.notificationId}>
            <EventType>{notification.eventType}</EventType>
            <Content>{notification.content}</Content>
            <CreatedDateTime>
              {notification.createdDate} {notification.createdTime}
            </CreatedDateTime>
          </NotificationItem>
        ))
      )}
    </ListContainer>
  );
}

export default AlarmList;
