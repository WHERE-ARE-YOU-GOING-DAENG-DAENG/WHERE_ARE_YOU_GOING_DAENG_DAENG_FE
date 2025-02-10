import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import arrowIcon from "../../assets/icons/arrow.svg"
import reversearrowIcon from "../../assets/icons/reversearrow.svg"
import useVisitStore from "../../stores/useVisitStore";
dayjs.extend(isBetween);

const Calendar = ({ onDateClick, selectedDate, dot }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const today = dayjs().format("YYYY-MM-DD");
  const myVisits = useVisitStore((state)=>state.myVisits);

  const startDate = dayjs().format("YYYY-MM-DD");
  const endDate = dayjs().add(6, "day").format("YYYY-MM-DD");

  const handlePrevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
  };

  const renderWeekdays = () => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return weekdays.map((day, index) => <Weekday key={index}>{day}</Weekday>);
  };

  const renderDays = () => {
    const daysInMonth = endOfMonth.date();
    const firstDayOfWeek = startOfMonth.day();

    const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => (
      <Day key={`blank-${i}`} />
    ));

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const date = startOfMonth.add(i, "day").format("YYYY-MM-DD");

      const isWeekly = dayjs(date).isBetween(startDate, endDate, "day", "[]");
      const isPast = dayjs(date).isBefore(today, "day");
      const isToday = date === today;

      const hasEvent = myVisits?.some(
        (schedule) => dayjs(schedule.visitAt).format("YYYY-MM-DD") === date
      );

      const isSelected = date === selectedDate;

      return (
        <Day
          key={date}
          $isWeekly={isWeekly}
          $isPast={isPast}
          $isToday={isToday}
          $hasEvent={hasEvent}
          $isSelected={isSelected}
          $dot={dot}
          onClick={() => {
            onDateClick(date);
          }}
        >
          {i + 1}
        </Day>
      );
    });

    return [...blanks, ...days];
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <MonthNavigation onClick={handlePrevMonth}>
            <img src={reversearrowIcon} alt="이전 달" />
        </MonthNavigation>
        <CurrentMonth>{currentDate.format("YYYY.MM")}</CurrentMonth>
        <MonthNavigation onClick={handleNextMonth}>
        <img src={arrowIcon} alt="다음 달" />
        </MonthNavigation>
      </CalendarHeader>
      <CalendarGrid>{renderWeekdays()}</CalendarGrid>
      <CalendarGrid>{renderDays()}</CalendarGrid>
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 554px) {
    margin: 3%;
    gap: 15px;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media (max-width: 554px) {
    margin-top: -10px;
  }
`;

const MonthNavigation = styled.button`
  border: none;
  background: transparent;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  img {
      margin-top: 5px;
    }

  @media (max-width: 554px) {
    font-size: 16px;

    img {
      width: 20px;
      height: 20px;
      margin-top: 3px;
    }
  }
`;

const CurrentMonth = styled.div`
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 554px) {
    font-size: 16px;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;

  @media (max-width: 554px) {
    gap: 1%;
  }
`;

const Weekday = styled.div`
  font-weight: bold;
  text-align: center;

  @media (max-width: 554px) {
    font-size: 12px;
  }
`;

const Day = styled.div`
  padding: 10px;
  aspect-ratio: 1;
  text-align: center;
  border-radius: 10px;
  background: ${({ $isWeekly, $isToday }) => $isWeekly && $isToday
  ? "#FFCEE1"
  : $isWeekly 
  ? "#FDF2F8"
  : "none"};
  color: ${({ $isPast }) => ($isPast ? "#aaa" : "black")};
  font-weight: ${({ $isToday }) => ($isToday ? "bold" : "normal")};
  border: ${({ $isSelected }) => ($isSelected ? "2px solid #FF4B98" : "none")};
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ $hasEvent, $dot }) =>
      $dot && $hasEvent  ? "#FF4B98" : "transparent"};
  }

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 554px) {
    font-size: 12px;
  }
`;
export default Calendar;
