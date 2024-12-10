import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import Calendar from "../../components/visit/Calendar";
import ScheduleTable from "../../components/visit/ScheduleTable";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import useVisitStore from "../../stores/useVisitStore";
import useUserStore from "../../stores/userStore";

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
    @media(max-width:554px){
    margin-left: 8%;
    }
`

const MyVisitList = () => {
  const fetchVisits = useVisitStore((state)=>state.fetchVisits);
  const nickname = useUserStore((state)=> state.nickname);
  const [name, setName] = useState(nickname || '')
  useEffect(()=>{
    const fetchmyVisits = async () => {
        await fetchVisits();
    };
    
    fetchmyVisits();
  },[])

  return (
    <>
      <Header label="방문일정" />
      <Calendar dot={true}/>
      <Division />
      {name? (<Text><span>{name}</span>님 방문일정 알려드려요!</Text> ): (<Text>로그인 후 방문일정을 확인해보세요!</Text>)}
      <ScheduleTable />
      <Footer />
    </>
  );
};

export default MyVisitList;
