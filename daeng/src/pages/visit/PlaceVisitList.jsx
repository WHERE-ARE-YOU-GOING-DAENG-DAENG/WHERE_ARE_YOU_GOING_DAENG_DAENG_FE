import { useParams } from "react-router-dom";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import VisitScheduleList from "../../components/visit/VisitScheduleList";
import styled from "styled-components";
import petIcon from "../../assets/icons/user.svg"

const VisitBanner = styled.img`
    width: 100%;
    height: 50%;
    object-fit: cover;
`;

const PlaceVisitList = () => {
    const { id } = useParams();

    const mockData = [
        {
            "visitDate": "2024-11-24",
            "petsAtVisitTimes": [
                {
                    "visitAt": "2024-11-24T11:00:00",
                    "pets": [
                        {
                            "petId": 1,
                            "petName": "Buddy",
                            "petImg": petIcon
                        },
                        {
                            "petId": 2,
                            "petName": "Mittens",
                            "petImg": petIcon
                        },
                        {
                            "petId": 3,
                            "petName": "Max1",
                            "petImg": petIcon
                        },
                        {
                            "petId": 4,
                            "petName": "Max2",
                            "petImg": petIcon
                        },
                        {
                            "petId": 5,
                            "petName": "Max3",
                            "petImg": petIcon
                        },
                        {
                            "petId": 6,
                            "petName": "Max4",
                            "petImg": petIcon
                        },
                        {
                            "petId": 7,
                            "petName": "Max5",
                            "petImg": petIcon
                        },
                        {
                            "petId": 8,
                            "petName": "Max6",
                            "petImg": petIcon
                        },
                        {
                            "petId": 9,
                            "petName": "Max7",
                            "petImg": petIcon
                        },
                        {
                            "petId": 10,
                            "petName": "Max8",
                            "petImg": petIcon
                        },
                    ]
                }
            ]
        },
        {
            "visitDate": "2024-11-25",
            "petsAtVisitTimes": [
                {
                    "visitAt": "2024-11-25T10:00:00",
                    "pets": [
                        {
                            "petId": 2,
                            "petName": "Mittens",
                            "petImg": petIcon
                        },
                        {
                            "petId": 3,
                            "petName": "Max",
                            "petImg": petIcon
                        },
                        {
                            "petId": 1,
                            "petName": "Buddy",
                            "petImg": petIcon
                        },
                        {
                            "petId": 2,
                            "petName": "Mittens",
                            "petImg": petIcon
                        },
                        {
                            "petId": 3,
                            "petName": "Max1",
                            "petImg": petIcon
                        },
                        {
                            "petId": 4,
                            "petName": "Max2",
                            "petImg": petIcon
                        },
                        {
                            "petId": 5,
                            "petName": "Max3",
                            "petImg": petIcon
                        },
                        {
                            "petId": 6,
                            "petName": "Max4",
                            "petImg": petIcon
                        },
                        {
                            "petId": 7,
                            "petName": "Max5",
                            "petImg": petIcon
                        },
                        {
                            "petId": 8,
                            "petName": "Max6",
                            "petImg": petIcon
                        },
                        {
                            "petId": 9,
                            "petName": "Max7",
                            "petImg": petIcon
                        },
                        {
                            "petId": 10,
                            "petName": "Max8",
                            "petImg": petIcon
                        },
                    ]
                },
                {
                    "visitAt": "2024-11-25T11:00:00",
                    "pets": [
                        {
                            "petId": 2,
                            "petName": "Mittens",
                            "petImg": petIcon
                        },
                        {
                            "petId": 3,
                            "petName": "Max",
                            "petImg": petIcon
                        }
                    ]
                }
            ]
        }
    ]

    return (
        <>
            <Header label="방문예정목록" />
            <VisitBanner src="https://via.placeholder.com/554x242" alt="배너" />
            <VisitScheduleList data={mockData} />
            <Footer />
        </>
    )
};

export default PlaceVisitList;