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
    "data": [
          {
            "visitAt": "2024-11-21T11:00:00",
            "pets": [
                {
                    "petId": 2,
                    "petName": "Mittens",
                    "petImg": "https://example.com/image2.jpg"
                },
                {
                    "petId": 3,
                    "petName": "Max",
                    "petImg": "https://example.com/image3.jpg"
                }
            ],
            "placeId": 1,
            "visitId": 7,
            "placeName": "Gyeongbokgung"
        },
        {
            "visitAt": "2024-11-27T11:00:00",
            "pets": [
                {
                    "petId": 2,
                    "petName": "Mittens",
                    "petImg": "https://example.com/image2.jpg"
                },
                {
                    "petId": 3,
                    "petName": "Max",
                    "petImg": "https://example.com/image3.jpg"
                }
            ],
            "placeId": 1,
            "visitId": 7,
            "placeName": "Gyeongbokgung"
        },
        {
            "visitAt": "2024-11-26T12:00:00",
            "pets": [
                {
                    "petId": 1,
                    "petName": "Buddy",
                    "petImg": "https://example.com/image1.jpg"
                },
                {
                    "petId": 2,
                    "petName": "Mittens",
                    "petImg": "https://example.com/image2.jpg"
                }
            ],
            "placeId": 1,
            "visitId": 1,
            "placeName": "Gyeongbokgung"
        },
        {
            "visitAt": "2024-11-26T12:00:00",
            "pets": [
                {
                    "petId": 2,
                    "petName": "Mittens",
                    "petImg": "https://example.com/image2.jpg"
                },
                {
                    "petId": 3,
                    "petName": "Max",
                    "petImg": "https://example.com/image3.jpg"
                }
            ],
            "placeId": 1,
            "visitId": 3,
            "placeName": "Gyeongbokgung"
        },
        {
            "visitAt": "2024-11-26T12:00:00",
            "pets": [
                {
                    "petId": 2,
                    "petName": "Mittens",
                    "petImg": "https://example.com/image2.jpg"
                },
                {
                    "petId": 3,
                    "petName": "Max",
                    "petImg": "https://example.com/image3.jpg"
                }
            ],
            "placeId": 1,
            "visitId": 4,
            "placeName": "Gyeongbokgung"
        },
        {
            "visitAt": "2024-11-26T12:00:00",
            "pets": [
                {
                    "petId": 2,
                    "petName": "Mittens",
                    "petImg": "https://example.com/image2.jpg"
                },
                {
                    "petId": 3,
                    "petName": "Max",
                    "petImg": "https://example.com/image3.jpg"
                }
            ],
            "placeId": 1,
            "visitId": 5,
            "placeName": "Gyeongbokgung"
        },
        {
            "visitAt": "2024-11-26T12:00:00",
            "pets": [
                {
                    "petId": 2,
                    "petName": "Mittens",
                    "petImg": "https://example.com/image2.jpg"
                },
                {
                    "petId": 3,
                    "petName": "Max",
                    "petImg": "https://example.com/image3.jpg"
                }
            ],
            "placeId": 1,
            "visitId": 6,
            "placeName": "Gyeongbokgung"
        }
    ],
  };

  const filterWeeklySchedules = () => {
    const startDate = dayjs().format("YYYY-MM-DD");
    const endDate = dayjs().add(6, "day").format("YYYY-MM-DD");

    const weeklySchedules = mockData.data.filter((schedule) => {
      const visitDate = dayjs(schedule.visitAt).format("YYYY-MM-DD");
      return visitDate >= startDate && visitDate <= endDate;
    });

    setSchedules(weeklySchedules);
  };

  const filterPastSchedules = () => {
    const today = dayjs().format("YYYY-MM-DD");

    const pastSchedules = mockData.data.filter((schedule) => {
      const visitDate = dayjs(schedule.visitAt).format("YYYY-MM-DD");
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
    setAllSchedules(mockData.data);
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
