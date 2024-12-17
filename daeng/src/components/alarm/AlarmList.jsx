import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PushAlerts from "../../components/commons/PushAlerts";

const ListContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  padding-bottom: 100%;
  margin-left:20px;
  
  @media (max-width: 554px) {
    margin: 10px;
    padding: 10px;
    padding-bottom: 100%;
  }
`;

const NoAlarm = styled.span`
  font-size: 16px;
  display: flex;
  margin-left: 40%;
  margin-top: 10%;
  font-weight: bold;
`;

const NoNotification = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  margin-top: 30px;
  margin-right: 30px;
`;

function AlarmList({ activeTab }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNotificationClose = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.notificationId !== notificationId)
    );
  };

  useEffect(() => {
    if (activeTab === "subscribe") {
      const fetchNotifications = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            "https://dev.daengdaeng-where.link/api/v1/notifications",
            {
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            setNotifications(response.data.data);
          } else {
            throw new Error("알림 데이터를 불러오는 데 실패했습니다.");
          }
        } catch (err) {
          setError(err.message || "알림 데이터를 가져오는 중 오류가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    }
  }, [activeTab]);

  if (activeTab !== "subscribe") {
    return null; 
  }

  if (loading) {
    return <div>알림 데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <NoAlarm>알림이 없습니다</NoAlarm>;
  }

  return (
    <ListContainer>
      {notifications.length === 0 ? (
        <NoNotification>알림이 없습니다.</NoNotification>
      ) : (
        notifications.map((notification) => (
          <PushAlerts
            key={notification.notificationId}
            message={notification.content}
            dateTime={`${notification.createdDate} ${notification.createdTime}`}
            notificationId={notification.notificationId}
            onNotificationClose={handleNotificationClose}
          />
        ))
      )}
    </ListContainer>
  );
}

export default AlarmList;
