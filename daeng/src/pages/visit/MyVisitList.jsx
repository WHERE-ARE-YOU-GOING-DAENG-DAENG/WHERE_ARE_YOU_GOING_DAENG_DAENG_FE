import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import Calendar from "../../components/visit/Calendar";
import ScheduleTable from "../../components/visit/ScheduleTable";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const Division = styled.div`
    height: 1px;
    background-color: #E5E5E5;
    width: 100%;
    margin: 20px 0px;
`;

const Text = styled.div`
    display: flex;
    font-weight: bold;
    font-size: 20px;
    margin-left: 40px;
    margin-bottom: 20px;
    span{
    color: #FF4B98;
}
`

const MyVisitList = () => {
  const [schedules, setSchedules] = useState([]);
  const [allSchedules, setAllSchedules] = useState([]);

  const mockData = {
    visitHops: [
      {
        visitTime: "2024-11-22T10:40:00",
        placeId: 3,
        pets: [
          { petId: 2, name: "푸", petImg: "/path" },
          { petId: 3, name: "꼬", petImg: "/path" },
        ],
      },
      {
        visitTime: "2024-11-27T10:50:00",
        placeId: 3,
        pets: [{ petId: 4, name: "루루", petImg: "/path" }],
      },
      {
        visitTime: "2024-11-29T15:30:00",
        placeId: 5,
        pets: [{ petId: 5, name: "미미", petImg: "/path" }],
      },
    ],
  };

  const filterWeeklySchedules = () => {
    const startDate = dayjs().format("YYYY-MM-DD");
    const endDate = dayjs().add(6, "day").format("YYYY-MM-DD");

    const weeklySchedules = mockData.visitHops.filter((schedule) => {
      const visitDate = dayjs(schedule.visitTime).format("YYYY-MM-DD");
      return visitDate >= startDate && visitDate <= endDate;
    });

    setSchedules(weeklySchedules);
  };

  const filterPastSchedules = () => {
    const today = dayjs().format("YYYY-MM-DD");

    const pastSchedules = mockData.visitHops.filter((schedule) => {
      const visitDate = dayjs(schedule.visitTime).format("YYYY-MM-DD");
      return visitDate < today;
    });

    const sortedSchedules = pastSchedules.sort(
      (a, b) => new Date(b.visitTime) - new Date(a.visitTime)
    );

    setSchedules(sortedSchedules);
  };

  const handleDateClick = (date) => {
    const today = dayjs().format("YYYY-MM-DD");
    const startDate = dayjs().format("YYYY-MM-DD");
    const endDate = dayjs().add(6, "day").format("YYYY-MM-DD");

    // 클릭된 날짜가 오늘 이전인지, 오늘부터 일주일 구간인지 확인
    if (dayjs(date).isBefore(today, "day")) {
      filterPastSchedules(); // 이전 날짜 클릭
    } else if (dayjs(date).isBetween(startDate, endDate, "day", "[]")) {
      filterWeeklySchedules(); // 당일부터 일주일 클릭
    }
  };

  useEffect(() => {
    setAllSchedules(mockData.visitHops);
    filterWeeklySchedules(); // 초기화 시 당일 기준 일주일 일정
  }, []);

  return (
    <>
      <Header label="방문일정" />
      <Calendar
        onDateClick={handleDateClick}
        allSchedules={allSchedules}
      />
      <Division />
      <Text><span>내가진짜</span>님 방문일정 알려드려요</Text>
      <ScheduleTable schedules={schedules} />
      <Footer />
    </>
  );
};

export default MyVisitList;
