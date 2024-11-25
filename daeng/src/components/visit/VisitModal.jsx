import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import xIcon from "../../assets/icons/x.svg";
import Calendar from "./Calendar";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import ConfirmBtn from "../../components/commons/ConfirmBtn";

dayjs.extend(isBetween);

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
  gap: 20px;
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
  padding: 0px 41px;
  color: #ff69a9;
  font-size: 11px;
  text-align: left;
`;

const VisitModal = ({ isOpen, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedPet, setSelectedPet] = useState("");

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
          alert("시간을 선택하세요")
        } else (
            alert("등록불가")
        )
      };

      const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
      };
    
      const handlePetChange = (e) => {
        setSelectedPet(e.target.value);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`시간: ${selectedTime}, 댕댕이: ${selectedPet}`);
        // 등록 처리 로직 추가
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
    

    if (!isOpen) return null;
    return(
        <>
            <Overlay onClick={handleClose} />
            <Modal isClosing={isClosing}>
                <Header>
                    <h2>방문등록하기</h2>
                    <img src={xIcon} alt="닫기" onClick={handleClose}/>
                </Header>
                <Calendar onDateClick={handleDateClick}/>
                <InputAlert>*최대 일주일까지 선택이 가능합니다.</InputAlert>
                <Form onSubmit={handleSubmit}>
                    <SelectBox>
                    <Label htmlFor="time-select">원하는 시간을 선택해주세요</Label>
                    <Select id="time-select" value={selectedTime} onChange={handleTimeChange}>
                        <option value="" disabled>
                        시간을 선택하세요
                        </option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                    </Select>
                    </SelectBox>
                    <SelectBox>
                    <Label htmlFor="pet-select">참여하는 댕댕이를 선택해주세요</Label>
                    <Select id="pet-select" value={selectedPet} onChange={handlePetChange}>
                        <option value="" disabled>
                        댕댕이를 선택하세요
                        </option>
                        <option value="Buddy">펫 정보 가져오기</option>
                    </Select>
                    </SelectBox>
                    <ConfirmBtn label="등록"/>
                </Form>
            </Modal>
        </>
    )
}

export default VisitModal;