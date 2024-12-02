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
