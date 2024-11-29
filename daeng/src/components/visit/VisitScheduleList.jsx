import styled from "styled-components";
import VisitDateSection from "./VisitDateSection";
import ConfirmBtn from "../../components/commons/ConfirmBtn";
import VisitModal from "./VisitModal";
import { useState } from "react";

const Container = styled.div`
  padding: 20px 44px;
  padding-bottom: 77px;
`;

const VisitScheduleList = ({ data, placeId, setReloadTrigger }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
  };

  const openModal = (initDate = null , initTime = null) => {
    const userPets = [
      {petId:18, petName: "송댕댕"},
      {petId:14, petName: "김땡땡"},
      {petId:11, petName: "하이"},
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
        ))): (<div>일주일간방문예정없음</div>)}
        <ConfirmBtn label="등록" onClick={()=> openModal()}/>
      </Container>
  
      <VisitModal placeId={placeId} isOpen={isModalOpen} onClose={toggleModal} setReloadTrigger={setReloadTrigger} {...modalProps} />
    </>
  );
};

export default VisitScheduleList;
