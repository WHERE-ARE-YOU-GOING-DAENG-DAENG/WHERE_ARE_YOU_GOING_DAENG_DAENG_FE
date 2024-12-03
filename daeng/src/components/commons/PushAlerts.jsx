import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import alarm from "../../assets/icons/alarm.svg";
import x from "../../assets/icons/x.svg";

const PushAlerts = ({ message, dateTime, notificationId, onNotificationClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = async () => {
    try {
      await axios.put(
        `https://www.daengdaeng-where.link/api/v1/notifications/${notificationId}`,
        {},
        { withCredentials: true }
      );
      setIsVisible(false); 
      onNotificationClose(notificationId); 
    } catch (error) {
      console.error("알림 삭제 요청 실패:", error);
      alert("알림 삭제에 실패했습니다.");
    }
  };

  if (!isVisible) return null;

  return (
    <Card>
      <Icon>
        <img src={alarm} alt="alert" />
      </Icon>
      <Content>
        <Message>{message}</Message>
        <DateTime>{dateTime}</DateTime>
      </Content>
      <CloseButton onClick={handleClose}>
        <img src={x} alt="닫기" />
      </CloseButton>
    </Card>
  );
};

PushAlerts.propTypes = {
  message: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  notificationId: PropTypes.number.isRequired,
  onNotificationClose: PropTypes.func.isRequired,
};

export default PushAlerts;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  margin: 10px 0;
  width: 487px;
  height: 151px;
  text-align: left;
  @media (max-width: 554px) {
    width: 320px;
    height: 100px;
  }
`;

const Icon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9;
  @media (max-width: 554px) {
    width: 50px;
    height: 50px;

    img {
      width: 25px;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const Message = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  @media (max-width: 554px) {
    font-size: 11px;
  }
`;

const DateTime = styled.p`
  margin: 0;
  font-size: 13px;
  color: #ff69a9;
  font-weight: bold;
  @media (max-width: 554px) {
    font-size: 9px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }

  &:hover {
    opacity: 0.8;
  }
`;
