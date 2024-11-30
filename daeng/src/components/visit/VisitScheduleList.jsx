import styled from "styled-components";
import VisitDateSection from "./VisitDateSection";
import ConfirmBtn from "../../components/commons/ConfirmBtn";
import VisitModal from "./VisitModal";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 250px);
  padding: 20px 44px;
  padding-bottom: 47px;
`;

const NoVisit = styled.div`
  padding-top: 15vh;
  font-weight: bold;
`
const FixedButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const VisitScheduleList = ({ data, placeId, setReloadTrigger }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
  };

  const openModal = (initDate = null , initTime = null) => {
    const userPets = [
      {petId:32, petName: "이보리"},
      {petId:33, petName: "지연우"},
    ]

    setModalProps({
      initDate,
      initTime,
      userPets
    })
    setIsModalOpen(true);
  }

  return (
    <>
      <Container>
        {data.length > 0 ? (data.map((visit) => (
          <VisitDateSection
            key={visit.visitDate}
            visitDate={visit.visitDate}
            petsAtVisitTimes={visit.petsAtVisitTimes}
            onVisitClick={openModal}
          />
        ))): (<NoVisit>일주일간 등록된 방문예정이 없습니다.</NoVisit>)}
        <FixedButtonWrapper>
          <ConfirmBtn label="등록" onClick={() => openModal()} />
        </FixedButtonWrapper>
      </Container>
      
      <VisitModal placeId={placeId} isOpen={isModalOpen} onClose={toggleModal} setReloadTrigger={setReloadTrigger} {...modalProps} />
    </>
  );
};

export default VisitScheduleList;
