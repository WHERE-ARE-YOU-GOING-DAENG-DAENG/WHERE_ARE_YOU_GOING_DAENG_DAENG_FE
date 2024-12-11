import { useParams } from "react-router-dom";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import VisitScheduleList from "../../components/visit/VisitScheduleList";
import styled from "styled-components";
import AlertDialog from "../../components/commons/SweetAlert";
import { useEffect, useState } from "react";
import banner from "../../assets/icons/visitbanner.jpg"
import axiosInstance from "../../services/axiosInstance";

const VisitBanner = styled.img`
    width: 100%;
    height: 50%;
    object-fit: cover;
`;

const PlaceVisitList = () => {
    const { id } = useParams();
    const [list, setList] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);

    useEffect(()=>{
        const fetchPlaceVisit = async() => {
            try{
                const response = await axiosInstance.get(`https://dev.daengdaeng-where.link/api/v1/visit/place/${id}`,{
                    withCredentials: true
                })
                setList(response.data.data);
            }catch(error){
                if(error.response){
                    AlertDialog({
                    mode: "alert",
                    title: "방문예정목록 조회",
                    text: "방문예정목록 조회에 실패하였습니다.",
                    confirmText: "확인",
                });
              }
            }
        }
        fetchPlaceVisit();
    },[reloadTrigger])

    return (
        <>
            <Header label="방문예정목록" />
            <VisitBanner src={banner} alt="배너" />
            <VisitScheduleList data={list} placeId={id} setReloadTrigger={setReloadTrigger}/>
            <Footer />
        </>
    )
};

export default PlaceVisitList;