import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import xIcon from "../../assets/icons/x.svg";
import Calendar from "./Calendar";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ConfirmBtn from "../../components/commons/ConfirmBtn";
import ReactSelect from "react-select" // 다중선택 select라이브러리
import AlertDialog from "../commons/SweetAlert";
import axios from "axios";
import axiosInstance from "../../services/axiosInstance";
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
const slideUp = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100%);
    }
`;

const Modal = styled.div`
    position: fixed;
    bottom: 76px;
    width: 555px;
    height: 80%;
    background-color: white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    animation: ${({ isClosing }) => (isClosing ? slideDown : slideUp)} 0.4s ease-out;
    z-index: 999;
    overflow-y: auto; /* 모달 내부에서 스크롤 가능 */
    -webkit-overflow-scrolling: touch; /* 모바일 스크롤 부드럽게 */
    @media (max-width: 554px) {
        width: 100%;
        bottom: 64px;
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    width: 554px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    @media (max-width: 554px) {
        width: 100%;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 41px;

    h2 {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
    }

    img {
        cursor: pointer;
        width: 20px;
    }
`;

const Form = styled.div`
  padding: 0px 41px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const SelectBox = styled.div`
  display:flex;
  flex-direction: column;
  text-align: left;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
`;

const InputAlert = styled.p`
  color: #ff69a9;
  font-size: 11px;
  text-align: left;
  gap: 1px;
`;

// select css
const selectStyles = {
    control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? "0.5px solid #ff69a9" : "0.5px solid #d9d9d9",
        borderRadius: "5px",
        padding: "2px",
        cursor: "pointer",
        fontSize: "15px",
        boxShadow: state.isFocused ? "none" : "none",
        "&:hover": {
          borderColor: "#ff69a9",
        },
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#ffcee1",
        borderRadius: "3px",
        padding: "2px",
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#ff4b98",
          color: "white", 
        },
      }),
      menu: (provided) => ({
        ...provided,
        borderRadius: "5px",
        borderColor: "#ff69a9",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#f4f4f4" : "white",
        color: "#333",
        cursor: "pointer",
      }),
}

const VisitModal = ({ placeId, isOpen, onClose, setReloadTrigger, initDate = null, initTime = null, pets = []  }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [selectedDate, setSelectedDate] = useState(initDate);
    const [selectedTime, setSelectedTime] = useState(initTime || "");
    const [selectedPets, setSelectedPets] = useState([]);
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("24:00") ;

    useEffect(()=>{
        const fetchTime = async () => {
            try{const response = await axios.get(`https://www.daengdaeng-where.link/api/v1/places/${placeId}`,{
                withCredentials: true,
            });
            setStartTime(response.data.data.startTime);
            setEndTime(response.data.data.endTime);
            console.log(response.data.data.startTime, response.data.data.endTime)
        }catch(error){
            if(error.response){
                AlertDialog({
                mode: "alert",
                title: "영업시간 조회",
                text: "영업시간 조회에 실패하였습니다.",
                confirmText: "확인",
                onConfirm: () => console.log("영업시간 조회 실패"),
            });
          }
        }
        }
        fetchTime();
    },[])

    const generateTimeOptions = (startTime, endTime) => {
        const options = [];
        const start = dayjs(startTime, "HH:mm");
        const end = dayjs(endTime, "HH:mm");
    
        if (start.isAfter(end)) {
            let currentTime = dayjs("00:00", "HH:mm");
            const nextDay = dayjs("23:59", "HH:mm"); // 하루의 마지막 시간을 설정
            while (currentTime.isBefore(nextDay) || currentTime.isSame(nextDay)) {
                options.push({
                    value: currentTime.format("HH:mm"),
                    label: currentTime.format("HH:mm"),
                });
                currentTime = currentTime.add(30, "minute");
            }
        } else {
            let currentTime = start;
            while (currentTime.isBefore(end) || currentTime.isSame(end)) {
                options.push({
                    value: currentTime.format("HH:mm"),
                    label: currentTime.format("HH:mm"),
                });
                currentTime = currentTime.add(30, "minute");
            }
        }
    
        return options;
    };
    const timeOptions = generateTimeOptions(startTime, endTime);

    useEffect(() => {
        if (isOpen) {
            setSelectedDate(initDate || "");
            setSelectedTime(initTime || "");
        }
    }, [isOpen, initDate, initTime]);
    
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 400);
    };

    const handleDateClick = (date) => {
        const today = dayjs().format("YYYY-MM-DD");
        const startDate = dayjs().format("YYYY-MM-DD");
        const endDate = dayjs().add(6, "day").format("YYYY-MM-DD");
    
        if (dayjs(date).isBefore(today, "day")) {
          alert("등록불가")
        } else if (dayjs(date).isBetween(startDate, endDate, "day", "[]")) {
          if(initDate){
            return;
          }else {
            setSelectedDate(date);
          }
        } else (
            alert("등록불가")
        )
      };

      const handleTimeChange = (selectedOption) => {
        if(initTime){
            return;
        }
        setSelectedTime(selectedOption.value);
      };
    
      const handlePetChange = (selectedOptions) => {
        const petIds = selectedOptions.map((option) => option.value);
        setSelectedPets(petIds);
      };

      const validateInputs = () => {
        if (!selectedDate) {
            AlertDialog({
                mode: "alert",
                title: "",
                text: "날짜를 선택해주세요.",
                confirmText: "확인",
                onConfirm: () => console.log("날짜 선택 누락"),
            });
            return false;
        }
    
        if (!selectedTime) {
            AlertDialog({
                mode: "alert",
                title: "",
                text: "시간을 선택해주세요.",
                confirmText: "확인",
                onConfirm: () => console.log("시간 선택 누락"),
            });
            return false;
        }
    
        if (selectedPets.length === 0) {
            AlertDialog({
                mode: "alert",
                title: "",
                text: "반려동물을 선택해주세요.",
                confirmText: "확인",
                onConfirm: () => console.log("반려동물 선택 누락"),
            });
            return false;
        }
    
        return true;
    };

      const handleSubmit = async () => {
        if (!validateInputs()) {
            return;
        }
        const payload = {
            placeId,
            petIds: selectedPets,
            visitAt: `${selectedDate}T${selectedTime}:00`,
        }
        console.log(payload) //로그 삭제
        try{
          await axiosInstance.post("https://www.daengdaeng-where.link/api/v1/visit", payload,{
          withCredentials: true
        })
        setReloadTrigger((prev) => !prev);
        }catch(error){
            if (error.response && error.response.status === 409) {
                AlertDialog({
                mode: "alert",
                title: "방문예정 등록",
                text: "이미 등록된 반려동물입니다.",
                confirmText: "확인",
                onConfirm: () => console.log("방문예정 중복 등록"),
            });
            } else {
                if(error.response){
                    AlertDialog({
                    mode: "alert",
                    title: "방문예정등록",
                    text: "방문예정 등록에 실패하였습니다.",
                    confirmText: "확인",
                    onConfirm: () => console.log("방문예정 등록 실패"),
                });
              }
            }
        }
        setSelectedDate("");
        setSelectedTime("");
        setSelectedPets([]);
        handleClose();
      };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; 
        };
    }, [isOpen]);

    const petOptions = pets.map((pet) => ({
        value: pet.petId,
        label: pet.name,
    }));

    if (!isOpen) return null;
    return(
        <>
            <Overlay onClick={handleClose} />
            <Modal isClosing={isClosing}>
                <Header>
                    <h2>방문등록하기</h2>
                    <img src={xIcon} alt="닫기" onClick={handleClose}/>
                </Header>
                <Form>
                    <SelectBox>
                    <Label>원하는 날짜를 선택해주세요</Label>
                    <Calendar onDateClick={handleDateClick} selectedDate={selectedDate} dot={false}/>
                    {initDate ? <InputAlert>*방문참여시 날짜 변경이 불가합니다.</InputAlert> : <InputAlert>*최대 일주일까지 선택이 가능합니다.</InputAlert>}
                    </SelectBox>
                    <SelectBox>
                    <Label htmlFor="time-select">원하는 시간을 선택해주세요</Label>
                    <ReactSelect
                            options={timeOptions}
                            onChange={handleTimeChange}
                            placeholder="시간을 선택하세요"
                            value={timeOptions.find((option) => option.value === selectedTime)}
                            styles={selectStyles}
                        />
                    {initTime && <InputAlert>*방문참여시 시간 변경이 불가합니다.</InputAlert>}
                    </SelectBox>
                    <SelectBox>
                    <Label htmlFor="pet-select">참여하는 댕댕이를 선택해주세요</Label>
                        <ReactSelect id="pet-select" options={petOptions} onChange={handlePetChange} placeholder="댕댕이를 선택하세요" isMulti styles={selectStyles}/>
                    <InputAlert>*여러 마리 선택이 가능합니다.</InputAlert>
                    </SelectBox>
                    <ConfirmBtn label="등록" onClick={handleSubmit}/>
                </Form>
            </Modal>
        </>
    )
}

export default VisitModal;