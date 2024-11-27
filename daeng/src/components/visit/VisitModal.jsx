import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import xIcon from "../../assets/icons/x.svg";
import Calendar from "./Calendar";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ConfirmBtn from "../../components/commons/ConfirmBtn";
import ReactSelect from "react-select"

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

const Form = styled.form`
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

const Select = styled.select`
  padding: 10px;
  border: 0.5px solid #d9d9d9;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;

  &:focus {
    border-color: #ff69a9;
    outline: none;
  }
`;

const InputAlert = styled.p`
  color: #ff69a9;
  font-size: 11px;
  text-align: left;
  gap: 1px;
`;

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

const VisitModal = ({ isOpen, onClose, initDate = null, initTime = null, userPets = []  }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [selectedDate, setSelectedDate] = useState(initDate);
    const [selectedTime, setSelectedTime] = useState(initTime || "");
    const [selectedPets, setSelectedPets] = useState([]);

    const generateTimeOptions = (startTime, endTime) => {
        const options = [];
        let currentTime = dayjs(startTime, "HH:mm"); // 시작 시간 파싱
        const end = dayjs(endTime, "HH:mm"); // 끝 시간 파싱
        while (currentTime.isBefore(end) || currentTime.isSame(end)) {
            options.push({
                value: currentTime.format("HH:mm"),
                label: currentTime.format("HH:mm"),
            });
            currentTime = currentTime.add(30, "minute"); // 30분 증가
        }
    
        return options;
    };

    const startTime = "09:00"; // 시작 시간
    const endTime = "18:00"; // 끝 시간
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
    
        // 클릭된 날짜가 오늘 이전인지, 오늘부터 일주일 구간인지 확인
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

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime || selectedPets.length === 0) {
            alert("모두 선택해주세요");
            return;
        }
        alert(`날짜: ${selectedDate}, 시간: ${selectedTime}, 펫: ${selectedPets.join(", ")}`);
        setSelectedDate("");
        setSelectedTime("");
        setSelectedPets([]);
        handleClose();
      };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Body 스크롤 잠금
        } else {
            document.body.style.overflow = 'auto'; // Body 스크롤 복원
        }

        return () => {
            document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 복원
        };
    }, [isOpen]);

    const petOptions = userPets.map((pet) => ({
        value: pet.petId,
        label: pet.petName,
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
                <Form onSubmit={handleSubmit}>
                    <SelectBox>
                    <Label>원하는 날짜를 선택해주세요</Label>
                    <Calendar onDateClick={handleDateClick} selectedDate={selectedDate}/>
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
                    <ConfirmBtn label="등록"/>
                </Form>
            </Modal>
        </>
    )
}

export default VisitModal;