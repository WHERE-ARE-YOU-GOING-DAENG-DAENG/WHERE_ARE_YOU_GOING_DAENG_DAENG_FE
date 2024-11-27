import styled from "styled-components";
import VisitDateSection from "./VisitDateSection";
import ConfirmBtn from "../../components/commons/ConfirmBtn";
import VisitModal from "./VisitModal";
import { useState } from "react";

const Container = styled.div`
  padding: 20px 44px;
  padding-bottom: 77px;
`;

const VisitScheduleList = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
  };

  const openModal = (initDate = null , initTime = null) => {
    const userPets = [
      {petId:1, petName: "Buddy"},
      {petId:2, petName: "Mittens"},
    ]

    setModalProps({
      initDate,
      initTime,
      userPets
    })
    alert(initDate+initTime)
    setIsModalOpen(true);
  }

  return (
    <>
      <Container>
        {data.map((visit) => (
          <VisitDateSection
            key={visit.visitDate}
            visitDate={visit.visitDate}
            petsAtVisitTimes={visit.petsAtVisitTimes}
            onVisitClick={openModal}
          />
        ))}
        <ConfirmBtn label="등록" onClick={()=> openModal()}/>
      </Container>
  
      <VisitModal isOpen={isModalOpen} onClose={toggleModal} {...modalProps} />
    </>
  );
};

export default VisitScheduleList;
