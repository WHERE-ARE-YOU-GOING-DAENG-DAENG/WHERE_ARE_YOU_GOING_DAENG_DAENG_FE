import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import Calendar from "../../components/visit/Calendar";
import ScheduleTable from "../../components/visit/ScheduleTable";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import useVisitStore from "../../stores/useVisitStore";

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
  const myVisits = useVisitStore((state)=>state.myVisits);
  const fetchVisits = useVisitStore((state)=>state.fetchVisits);

  useEffect(()=>{
    const fetchmyVisits = async () => {
        await fetchVisits();
    };
    
    fetchmyVisits();
  },[])

  useEffect(() => {
    console.log("Updated visites:", myVisits);
  }, [myVisits]);

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
            "visitAt": "2024-11-25T11:00:00",
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
            "visitAt": "2024-11-26T19:00:00",
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
            "visitAt": "2024-11-27T14:00:00",
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
            "visitAt": "2024-11-28T15:00:00",
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
            "visitAt": "2024-11-29T16:00:00",
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

  return (
    <>
      <Header label="방문일정" />
      <Calendar dot={true}/>
      <Division />
      <Text><span>내가진짜</span>님 방문일정 알려드려요</Text>
      <ScheduleTable />
      <Footer />
    </>
  );
};

export default MyVisitList;
