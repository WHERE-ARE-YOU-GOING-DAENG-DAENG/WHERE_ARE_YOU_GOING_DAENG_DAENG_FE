import { useParams } from "react-router-dom";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import VisitScheduleList from "../../components/visit/VisitScheduleList";
import styled from "styled-components";
import petIcon from "../../assets/icons/user.svg"
import { useEffect, useState } from "react";
import axios from "axios";

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
                const response = await axios.get(`https://www.daengdaeng-where.link/api/v1/visit/place/${id}`,{
                    withCredentials: true
                })
                console.log(response.data.data) //로그삭제
                setList(response.data.data);
            }catch(error){
                console.error("Error fetching visitlist", error)
            }
        }
        fetchPlaceVisit();
    },[reloadTrigger])

    // const mockData = [ //list넣기
    //     {
    //         "visitDate": "2024-11-29",
    //         "petsAtVisitTimes": [
    //             {
    //                 "visitAt": "2024-11-29T11:00:00",
    //                 "pets": [
    //                     {
    //                         "petId": 1,
    //                         "petName": "Buddy",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 2,
    //                         "petName": "Mittens",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 3,
    //                         "petName": "Max1",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 4,
    //                         "petName": "Max2",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 5,
    //                         "petName": "Max3",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 6,
    //                         "petName": "Max4",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 7,
    //                         "petName": "Max5",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 8,
    //                         "petName": "Max6",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 9,
    //                         "petName": "Max7",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 10,
    //                         "petName": "Max8",
    //                         "petImg": petIcon
    //                     },
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "visitDate": "2024-11-30",
    //         "petsAtVisitTimes": [
    //             {
    //                 "visitAt": "2024-11-30T10:00:00",
    //                 "pets": [
    //                     {
    //                         "petId": 2,
    //                         "petName": "Mittens",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 3,
    //                         "petName": "Max",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 1,
    //                         "petName": "Buddy",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 2,
    //                         "petName": "Mittens",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 3,
    //                         "petName": "Max1",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 4,
    //                         "petName": "Max2",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 5,
    //                         "petName": "Max3",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 6,
    //                         "petName": "Max4",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 7,
    //                         "petName": "Max5",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 8,
    //                         "petName": "Max6",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 9,
    //                         "petName": "Max7",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 10,
    //                         "petName": "Max8",
    //                         "petImg": petIcon
    //                     },
    //                 ]
    //             },
    //             {
    //                 "visitAt": "2024-11-30T11:00:00",
    //                 "pets": [
    //                     {
    //                         "petId": 2,
    //                         "petName": "Mittens",
    //                         "petImg": petIcon
    //                     },
    //                     {
    //                         "petId": 3,
    //                         "petName": "Max",
    //                         "petImg": petIcon
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]

    return (
        <>
            <Header label="방문예정목록" />
            <VisitBanner src="https://via.placeholder.com/554x242" alt="배너" />
            <VisitScheduleList data={list} placeId={id} setReloadTrigger={setReloadTrigger}/>
            <Footer />
        </>
    )
};

export default PlaceVisitList;