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
import AlertDialog from "../../components/commons/SweetAlert";
import { useNavigate } from "react-router-dom";

dayjs.extend(isBetween);

const MyVisitList = () => {
  const fetchVisits = useVisitStore((state)=>state.fetchVisits);
  const setMyVisits = useVisitStore((state) => state.setMyVisits);
  const nickname = useUserStore((state)=> state.nickname);
  const { userId } = useUserStore.getState();
  const [name, setName] = useState(nickname || '');
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(!userId){
      setMyVisits([]);
      AlertDialog({
        mode: "confirm",
        title: "로그인 필요",
        text: `방문일정은 로그인이 필요한 기능입니다.<br/>로그인페이지로 이동하시겠습니까?`,
        confirmText: "네",
        cancelText: "아니오",
        onConfirm: ()=> navigate("/login")
    });
    }else{
      fetchmyVisits();
    }
  },[])

  const fetchmyVisits = async () => {
    await fetchVisits();
};

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

export default MyVisitList;
